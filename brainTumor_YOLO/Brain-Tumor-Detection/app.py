from flask import Flask, request, render_template, jsonify
from ultralytics import YOLO
from PIL import Image
import os
import uuid
from flask_cors import CORS
import sqlite3
from datetime import datetime
import cv2
import numpy as np
from dateutil.parser import parse

app = Flask(__name__)
CORS(app)

# Configuration
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size
UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'uploads')
ALLOWED_EXTENSIONS = set(os.getenv('ALLOWED_EXTENSIONS', 'png,jpg,jpeg,dcm').split(','))

model = YOLO("best.pt")

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'dcm'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def is_mri_image(image_path):
    try:
        # Read the image
        img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
        if img is None:
            return False
            
        # Calculate image statistics
        mean_intensity = np.mean(img)
        std_intensity = np.std(img)
        
        # MRI images typically have specific characteristics:
        # 1. They are usually grayscale
        # 2. They have a specific range of intensity values
        # 3. They have a certain level of contrast
        
        # Check if the image meets basic MRI characteristics
        if mean_intensity < 10 or mean_intensity > 245:  # Too dark or too bright
            return False
            
        if std_intensity < 20:  # Too little contrast
            return False
            
        # Check if the image has the typical MRI-like texture
        # by analyzing the frequency domain
        f_transform = np.fft.fft2(img)
        f_shift = np.fft.fftshift(f_transform)
        magnitude_spectrum = 20 * np.log(np.abs(f_shift) + 1)
        
        # MRI images typically have a specific frequency distribution
        if np.mean(magnitude_spectrum) < 50 or np.mean(magnitude_spectrum) > 200:
            return False
            
        return True
        
    except Exception as e:
        print(f"Error validating MRI image: {str(e)}")
        return False

# Initialize SQLite database
def init_db():
    conn = sqlite3.connect('analysis_history.db')
    c = conn.cursor()
    
    # Drop the existing table
    c.execute('DROP TABLE IF EXISTS analysis_history')
    
    # Create the table with the new schema
    c.execute('''
        CREATE TABLE IF NOT EXISTS analysis_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            patient_name TEXT,
            date_of_birth TEXT,
            gender TEXT,
            contact_number TEXT,
            medical_history TEXT,
            tumor_type TEXT,
            confidence REAL,
            image_path TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

init_db()

disease_info = {
    "Glioma": {
        "description": "A type of brain tumor that starts in the glial cells.",
        "causes": "Genetic mutations, exposure to radiation.",
        "treatment": "Surgery, radiation therapy, chemotherapy."
    },
    "Meningioma": {
        "description": "A tumor that forms on the meninges, the protective layers of the brain and spinal cord.",
        "causes": "Genetic factors, hormonal factors.",
        "treatment": "Surgery, radiation therapy, observation if slow-growing."
    },
    "Pituitary": {
        "description": "Tumors that form in the pituitary gland, which controls hormones.",
        "causes": "Genetic factors, hormonal imbalances.",
        "treatment": "Surgery, radiation therapy, hormone replacement therapy."
    },
    "No Tumor": {
        "description": "No abnormal tumor detected.",
        "causes": "N/A",
        "treatment": "N/A"
    }
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return render_template("result.html", error="No image provided")
        
    file = request.files['image']
    if file.filename == '':
        return render_template("result.html", error="No image selected")
        
    if not allowed_file(file.filename):
        return render_template("result.html", error="Invalid file type. Please upload a valid image file (PNG, JPG, JPEG, DCM)")
    
    image_id = uuid.uuid4().hex + ".jpg"
    image_path = os.path.join(UPLOAD_FOLDER, image_id)
    file.save(image_path)
    
    # Validate if it's an MRI image
    if not is_mri_image(image_path):
        os.remove(image_path)  # Clean up the invalid image
        return render_template("result.html", error="The uploaded image does not appear to be a valid MRI scan. Please upload a proper MRI image.")

    results = model(image_path)

    if results[0].probs is None:
        prediction = "No Tumor"
        confidence = 0.0
    else:
        class_index = results[0].probs.top1
        prediction = results[0].names[class_index]
        confidence = results[0].probs.top1conf.item()

    return render_template("result.html", 
                           prediction=prediction,
                           confidence=round(confidence * 100, 2),
                           disease_info=disease_info.get(prediction, {}))

@app.route('/predict_api', methods=['POST'])
def predict_api():
    file = request.files.get('image')
    if not file:
        return jsonify({'error': 'No image provided'}), 400
    
    if not allowed_file(file.filename):
        return jsonify({'error': 'Invalid file type. Please upload a valid image file (PNG, JPG, JPEG, DCM)'}), 400
    
    # Validate required patient information
    required_fields = ['name', 'dateOfBirth', 'gender', 'contactNumber']
    missing_fields = [field for field in required_fields if not request.form.get(field)]
    
    if missing_fields:
        return jsonify({
            'error': 'Missing required fields',
            'missing_fields': missing_fields
        }), 400
    
    image_id = uuid.uuid4().hex + ".jpg"
    image_path = os.path.join(UPLOAD_FOLDER, image_id)
    file.save(image_path)
    
    # Validate if it's an MRI image
    if not is_mri_image(image_path):
        os.remove(image_path)  # Clean up the invalid image
        return jsonify({'error': 'The uploaded image does not appear to be a valid MRI scan. Please upload a proper MRI image.'}), 400

    # Get patient info
    patient_info = {
        'name': request.form.get('name'),
        'date_of_birth': request.form.get('dateOfBirth'),
        'gender': request.form.get('gender'),
        'contactNumber': request.form.get('contactNumber'),
        'medicalHistory': request.form.get('medicalHistory', ''),
    }

    results = model(image_path)

    if results[0].probs is None:
        prediction = "No Tumor"
        confidence = 0.0
    else:
        class_index = results[0].probs.top1
        prediction = results[0].names[class_index]
        confidence = results[0].probs.top1conf.item()

    # Save to database
    conn = sqlite3.connect('analysis_history.db')
    c = conn.cursor()
    c.execute('''
        INSERT INTO analysis_history 
        (patient_name, date_of_birth, gender, contact_number, medical_history, tumor_type, confidence, image_path)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        patient_info['name'],
        patient_info['date_of_birth'],
        patient_info['gender'],
        patient_info['contactNumber'],
        patient_info['medicalHistory'],
        prediction,
        confidence * 100,
        image_path
    ))
    conn.commit()
    conn.close()

    # Clean up the image file
    os.remove(image_path)

    return jsonify({
        'tumor_type': prediction,
        'confidence': round(confidence * 100, 2),
        'disease_info': disease_info.get(prediction, {})
    })

@app.route('/history', methods=['GET'])
def get_history():
    conn = sqlite3.connect('analysis_history.db')
    c = conn.cursor()
    c.execute('SELECT * FROM analysis_history ORDER BY timestamp DESC')
    history = c.fetchall()
    conn.close()
    
    return jsonify([{
        'id': row[0],
        'patient_name': row[1],
        'date_of_birth': row[2],
        'gender': row[3],
        'contact_number': row[4],
        'medical_history': row[5],
        'tumor_type': row[6],
        'confidence': row[7],
        'image_path': row[8],
        'timestamp': row[9]
    } for row in history])

@app.route('/history/<int:id>', methods=['DELETE'])
def delete_history(id):
    conn = sqlite3.connect('analysis_history.db')
    c = conn.cursor()
    c.execute('DELETE FROM analysis_history WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Record deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True) 
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)