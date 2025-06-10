# Brain Tumor Detection System 🧠

A modern web application that uses artificial intelligence to detect and classify brain tumors from MRI scans. Built with React, TypeScript, and Flask, this system provides an intuitive interface for medical professionals to analyze brain MRI images.

![Brain Tumor Detection](brainTumorFront/public/brain-icon.svg)

## 🌟 Features

- **AI-Powered Detection**: Utilizes YOLO (You Only Look Once) model for accurate brain tumor detection
- **Real-time Analysis**: Quick and efficient processing of MRI scans
- **User-friendly Interface**: Modern, responsive design built with Material-UI
- **Patient Management**: Store and manage patient information securely
- **Analysis History**: Track and review past analyses
- **Detailed Reports**: Comprehensive information about detected tumors
- **Multiple Tumor Types**: Detection of various brain tumor types:
  - Glioma
  - Meningioma
  - Pituitary tumors

## 🛠️ Tech Stack

### Frontend
- React 19
- TypeScript
- Material-UI
- Vite
- Chart.js
- React Router
- Axios

### Backend
- Python 3.11
- Flask
- YOLO (Ultralytics)
- OpenCV
- SQLite

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python 3.11
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Melal-F/MRI-brain-tumor-detection-.git
   cd MRI-brain-tumor-detection-
   ```

2. **Set up the Backend**
   ```bash
   cd brainTumor_YOLO/Brain-Tumor-Detection
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Set up the Frontend**
   ```bash
   cd brainTumorFront
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd brainTumor_YOLO/Brain-Tumor-Detection
   python app.py
   ```

2. **Start the Frontend Development Server**
   ```bash
   cd brainTumorFront
   npm run dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
MRI-brain-tumor-detection/
├── brainTumorFront/           # Frontend React application
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   └── assets/          # Static assets
│   └── public/              # Public assets
│
└── brainTumor_YOLO/         # Backend Flask application
    └── Brain-Tumor-Detection/
        ├── app.py           # Main Flask application
        ├── uploads/         # Temporary storage for uploaded images
        └── templates/       # HTML templates
```

## 🔒 Security Features

- Secure file upload handling
- Input validation and sanitization
- CORS protection
- SQLite database with proper data handling
- Temporary file cleanup

## 📊 API Endpoints

- `POST /predict_api`: Upload and analyze MRI images
- `GET /history`: Retrieve analysis history
- `DELETE /history/<id>`: Delete specific analysis record

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## ⚠️ Disclaimer

This application is designed to assist medical professionals and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.

## 👥 Authors

- **MELAL FEYISA** - *Initial work* - [GitHub](https://github.com/Melal-F)

## 🙏 Acknowledgments

- YOLO (You Only Look Once) for the detection model
- Material-UI for the beautiful components
- The open-source community for their invaluable tools and libraries 