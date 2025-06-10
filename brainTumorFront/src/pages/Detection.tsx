import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
  Fade,
  Grow,
  Zoom,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HistoryIcon from '@mui/icons-material/History';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, differenceInYears } from 'date-fns';

interface PatientInfo {
  name: string;
  dateOfBirth: Date | null;
  gender: string;
  contactNumber: string;
  medicalHistory: string;
}

interface FormErrors {
  name: string;
  dateOfBirth: string;
  gender: string;
  contactNumber: string;
}

const Detection = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    name: '',
    dateOfBirth: null,
    gender: '',
    contactNumber: '',
    medicalHistory: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    name: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError('');
    },
  });

  const validateForm = () => {
    const errors: FormErrors = {
      name: '',
      dateOfBirth: '',
      gender: '',
      contactNumber: '',
    };
    let isValid = true;

    if (!patientInfo.name.trim()) {
      errors.name = 'Patient name is required';
      isValid = false;
    }

    if (!patientInfo.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
      isValid = false;
    } else {
      const age = differenceInYears(new Date(), patientInfo.dateOfBirth);
      if (age < 0 || age > 120) {
        errors.dateOfBirth = 'Please enter a valid date of birth';
        isValid = false;
      }
    }

    if (!patientInfo.gender) {
      errors.gender = 'Gender is required';
      isValid = false;
    }

    if (!patientInfo.contactNumber.trim()) {
      errors.contactNumber = 'Contact number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(patientInfo.contactNumber)) {
      errors.contactNumber = 'Please enter a valid 10-digit contact number';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    setPatientInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setPatientInfo(prev => ({
      ...prev,
      dateOfBirth: date
    }));
    if (formErrors.dateOfBirth) {
      setFormErrors(prev => ({
        ...prev,
        dateOfBirth: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    if (!image) {
      setError('Please upload an image first');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('name', patientInfo.name);
      formData.append('dateOfBirth', patientInfo.dateOfBirth ? patientInfo.dateOfBirth.toISOString() : '');
      formData.append('gender', patientInfo.gender);
      formData.append('contactNumber', patientInfo.contactNumber);
      if (patientInfo.medicalHistory) {
        formData.append('medicalHistory', patientInfo.medicalHistory);
      }

      const response = await fetch('http://localhost:5000/predict_api', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.error === 'Missing required fields') {
          const missingFields = errorData.missing_fields || [];
          const errors = { ...formErrors };
          missingFields.forEach((field: string) => {
            errors[field as keyof FormErrors] = `${field} is required`;
          });
          setFormErrors(errors);
          return;
        }
        throw new Error('Failed to process image');
      }

      const data = await response.json();
      setResult({
        tumor_type: data.tumor_type,
        confidence: data.confidence,
        disease_info: data.disease_info
      });
      setShowResultDialog(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setShowResultDialog(false);
    navigate('/');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Brain Tumor Detection
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/history')}
          sx={{
            background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
            '&:hover': {
              background: 'linear-gradient(135deg, #203a43, #2c5364, #0f2027)',
            },
          }}
        >
          View History
        </Button>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        {/* Patient Information Form */}
        <Box flex={1}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Patient Information
              </Typography>
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Patient Name"
                  name="name"
                  value={patientInfo.name}
                  onChange={handleInputChange}
                  margin="normal"
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  required
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Date of Birth"
                    value={patientInfo.dateOfBirth}
                    onChange={handleDateChange}
                    maxDate={new Date()}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: 'normal',
                        error: !!formErrors.dateOfBirth,
                        helperText: formErrors.dateOfBirth,
                        required: true
                      }
                    }}
                  />
                </LocalizationProvider>
                <FormControl fullWidth margin="normal" error={!!formErrors.gender} required>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={patientInfo.gender}
                    onChange={handleInputChange}
                    label="Gender"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                  {formErrors.gender && (
                    <FormHelperText>{formErrors.gender}</FormHelperText>
                  )}
                </FormControl>
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contactNumber"
                  value={patientInfo.contactNumber}
                  onChange={handleInputChange}
                  margin="normal"
                  error={!!formErrors.contactNumber}
                  helperText={formErrors.contactNumber}
                  required
                />
                <TextField
                  fullWidth
                  label="Medical History (Optional)"
                  name="medicalHistory"
                  value={patientInfo.medicalHistory}
                  onChange={handleInputChange}
                  margin="normal"
                  multiline
                  rows={4}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Image Upload Section */}
        <Box flex={1}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upload MRI Scan
              </Typography>
              <Box
                {...getRootProps()}
                sx={{
                  border: '2px dashed',
                  borderColor: isDragActive ? 'primary.main' : 'grey.300',
                  borderRadius: 2,
                  p: 3,
                  textAlign: 'center',
                  cursor: 'pointer',
                  bgcolor: isDragActive ? 'action.hover' : 'background.paper',
                }}
              >
                <input {...getInputProps()} />
                <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography>
                  {isDragActive
                    ? 'Drop the image here'
                    : 'Drag and drop an image here, or click to select'}
                </Typography>
              </Box>

              {preview && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <img
                    src={preview}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '300px' }}
                  />
                </Box>
              )}

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              {loading && (
                <Box sx={{ mt: 2 }}>
                  <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
                  <Skeleton variant="text" height={40} sx={{ mb: 1 }} />
                  <Skeleton variant="text" height={40} sx={{ mb: 1 }} />
                  <Skeleton variant="text" height={40} sx={{ mb: 1 }} />
                </Box>
              )}

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
                disabled={loading || !image}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Analyze Image'}
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Result Dialog */}
      <Dialog
        open={showResultDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h5" component="div" align="center">
            Analysis Results
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Fade in={showResultDialog} timeout={1000}>
              <Box>
                <Grow in={showResultDialog} timeout={1500}>
                  <Card sx={{ mb: 3, background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', color: 'white' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Tumor Detection Result
                      </Typography>
                      <Typography variant="body1">
                        Type: {result?.tumor_type || 'No tumor detected'}
                      </Typography>
                      <Typography variant="body1">
                        Confidence: {result?.confidence || 0}%
                      </Typography>
                      {result?.disease_info && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Disease Information
                          </Typography>
                          <Typography variant="body2">
                            Description: {result.disease_info.description}
                          </Typography>
                          <Typography variant="body2">
                            Causes: {result.disease_info.causes}
                          </Typography>
                          <Typography variant="body2">
                            Treatment: {result.disease_info.treatment}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grow>

                <Zoom in={showResultDialog} timeout={2000}>
                  <Card sx={{ background: 'linear-gradient(135deg, #203a43, #2c5364, #0f2027)', color: 'white' }}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Patient Information
                      </Typography>
                      <Typography variant="body1">
                        Name: {patientInfo.name}
                      </Typography>
                      <Typography variant="body1">
                        Age: {patientInfo.dateOfBirth ? differenceInYears(new Date(), patientInfo.dateOfBirth) : ''} years
                      </Typography>
                      <Typography variant="body1">
                        Gender: {patientInfo.gender}
                      </Typography>
                      <Typography variant="body1">
                        Contact: {patientInfo.contactNumber}
                      </Typography>
                      {patientInfo.medicalHistory && (
                        <Typography variant="body1">
                          Medical History: {patientInfo.medicalHistory}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Zoom>
              </Box>
            </Fade>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Detection;