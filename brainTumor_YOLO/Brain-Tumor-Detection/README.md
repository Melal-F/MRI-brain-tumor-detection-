# Brain Tumor Detection Project

This project uses a **YOLOv8** deep learning model to classify brain tumor types from MRI images into four classes: **Glioma**, **Meningioma**, **Pituitary**, and **No Tumor**. The dataset was sourced from **Kaggle**, and **Roboflow** was used for train-test-validation splitting and image resizing.

## Project Overview

Brain tumor detection is a crucial task in medical imaging. This project utilizes **YOLOv8**, a cutting-edge model for object detection and classification, to detect and classify brain tumors in MRI scans. The model is deployed on Hugging Face for real-time inference and evaluation.

### Key Features
- **Four-class classification**: Glioma, Meningioma, Pituitary, and No Tumor.
- **Model**: YOLOv8 for accurate image classification.
- **Dataset**: Sourced from Kaggle, with image processing handled through Roboflow.

## Live Demo

The model is deployed and available for testing on **Hugging Face**. You can access the live demo here:
[Brain Tumor Detection on Hugging Face](https://huggingface.co/spaces/SameenKhurram/BrainTumor)

## Dataset

The dataset was sourced from **Kaggle** and contains MRI images with bounding boxes for brain tumor classification. You can access the dataset here:
[Kaggle Brain Tumor Dataset](https://www.kaggle.com/datasets/ahmedsorour1/mri-for-brain-tumor-with-bounding-boxes)

### Dataset Processing with Roboflow

- **Roboflow** was used for:
  - Splitting the data into training, validation, and test sets.
  - Resizing images to **224x224** for model input compatibility.

The dataset was structured as follows after processing with Roboflow:


## Model

The **YOLOv8** model was used for its speed and accuracy in detecting and classifying brain tumors from MRI images.

### Model Training

- **Architecture**: YOLOv8
- **Classes**:
  - Glioma
  - Meningioma
  - Pituitary
  - No Tumor

The model was trained using the processed dataset from Roboflow, and the best-performing weights are stored in `best.pt`.

### Performance Metrics

The model's performance was evaluated using:
- **Precision**
- **Recall**
- **F1-Score**
- **Confusion Matrix**

These metrics assess the model's accuracy in correctly classifying the brain tumor types.

## Results
The model achieves high accuracy in detecting and classifying brain tumors into the four specified categories. The deployed version on Hugging Face allows for real-time interaction with the model.

## Usage

### Installation

To replicate this project locally, install the following dependencies:

```bash
pip install ultralytics
pip install roboflow
from ultralytics import YOLO

# Load the model
model = YOLO('best.pt')

# Validate the model
results = model.val(data='path_to_your_yaml.yaml')

# Print the results
print(results)

# Brain Tumor Detection Web Application

This is a Flask-based web application for detecting brain tumors in MRI images using YOLO.

## Deployment Instructions

### Option 1: PythonAnywhere (Recommended for beginners)

1. Sign up for a free account at [PythonAnywhere](https://www.pythonanywhere.com)
2. Go to the Dashboard and click on "Web" tab
3. Click "Add a new web app"
4. Choose "Manual configuration" and select Python 3.8
5. In the "Code" section, set the working directory to your project folder
6. Set the WSGI configuration file to point to `wsgi.py`
7. Upload your project files:
   - Click on "Files" tab
   - Create a new directory for your project
   - Upload all project files including:
     - app.py
     - wsgi.py
     - requirements.txt
     - best.pt (YOLO model)
     - templates/
     - static/
8. Set up a virtual environment:
   ```bash
   mkvirtualenv --python=/usr/bin/python3.8 myenv
   pip install -r requirements.txt
   ```
9. Configure the WSGI file:
   - Click on the WSGI configuration file link
   - Replace the content with:
   ```python
   import sys
   path = '/home/YOUR_USERNAME/YOUR_PROJECT_FOLDER'
   if path not in sys.path:
       sys.path.append(path)
   
   from app import app as application
   ```
10. Reload your web app

### Option 2: Heroku

1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Create a `Procfile`:
   ```
   web: gunicorn wsgi:app
   ```
3. Initialize git and deploy:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   heroku create
   git push heroku main
   ```

### Option 3: AWS Elastic Beanstalk

1. Install the [AWS CLI](https://aws.amazon.com/cli/)
2. Create a `.ebextensions/python.config` file:
   ```yaml
   option_settings:
     aws:elasticbeanstalk:container:python:
       WSGIPath: wsgi:app
   ```
3. Deploy using EB CLI:
   ```bash
   eb init
   eb create
   eb deploy
   ```

## Environment Variables

Make sure to set these environment variables in your hosting platform:
- `FLASK_ENV=production`
- `FLASK_APP=app.py`

## Important Notes

1. The YOLO model file (`best.pt`) must be included in your deployment
2. Create the `uploads` directory on your server
3. Ensure proper permissions for file uploads
4. Set up proper error logging
5. Consider using a production-grade WSGI server like Gunicorn

## Security Considerations

1. Enable HTTPS
2. Set up proper CORS policies
3. Implement rate limiting
4. Add proper authentication if needed
5. Regularly update dependencies

## Monitoring

1. Set up error logging
2. Monitor server resources
3. Set up alerts for critical errors
4. Regular backup of the database

For any issues or questions, please open an issue in the repository.

