import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const About = () => {
  const tumorTypes = [
    {
      type: 'Glioma',
      description: 'Gliomas are tumors that develop from glial cells, which are the supportive cells in the brain. They can be either benign or malignant.',
      symptoms: [
        'Headaches',
        'Seizures',
        'Personality changes',
        'Memory problems',
        'Difficulty speaking or understanding',
      ],
      treatment: [
        'Surgery',
        'Radiation therapy',
        'Chemotherapy',
        'Targeted drug therapy',
      ],
    },
    {
      type: 'Meningioma',
      description: 'Meningiomas are tumors that develop from the meninges, the membranes that surround the brain and spinal cord. They are usually benign.',
      symptoms: [
        'Headaches',
        'Vision problems',
        'Hearing loss',
        'Memory problems',
        'Weakness in limbs',
      ],
      treatment: [
        'Observation',
        'Surgery',
        'Radiation therapy',
        'Stereotactic radiosurgery',
      ],
    },
    {
      type: 'Pituitary',
      description: 'Pituitary tumors develop in the pituitary gland, which controls hormone production. They are usually benign but can affect hormone levels.',
      symptoms: [
        'Vision problems',
        'Headaches',
        'Hormonal imbalances',
        'Fatigue',
        'Weight changes',
      ],
      treatment: [
        'Medication',
        'Surgery',
        'Radiation therapy',
        'Hormone replacement therapy',
      ],
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        About Brain Tumors
      </Typography>

      <Box sx={{ mb: 6 }}>
        <Typography variant="body1" paragraph>
          Brain tumors are abnormal growths of cells in the brain. They can be either benign (non-cancerous) or malignant (cancerous). Early detection and proper treatment are crucial for better outcomes.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {tumorTypes.map((tumor) => (
          <Grid item xs={12} md={4} key={tumor.type}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {tumor.type}
                </Typography>
                <Typography variant="body1" paragraph>
                  {tumor.description}
                </Typography>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      <WarningIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Symptoms
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      {tumor.symptoms.map((symptom) => (
                        <li key={symptom}>
                          <Typography>{symptom}</Typography>
                        </li>
                      ))}
                    </ul>
                  </AccordionDetails>
                </Accordion>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                      <LocalHospitalIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                      Treatment Options
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul>
                      {tumor.treatment.map((option) => (
                        <li key={option}>
                          <Typography>{option}</Typography>
                        </li>
                      ))}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <InfoIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
              Important Information
            </Typography>
            <Typography variant="body1" paragraph>
              Our AI-powered detection system helps medical professionals identify potential brain tumors with high accuracy. However, it's important to note that:
            </Typography>
            <ul>
              <li>
                <Typography>
                  The system is designed to assist medical professionals, not replace them
                </Typography>
              </li>
              <li>
                <Typography>
                  All results should be verified by qualified medical professionals
                </Typography>
              </li>
              <li>
                <Typography>
                  Early detection and regular check-ups are crucial for better outcomes
                </Typography>
              </li>
              <li>
                <Typography>
                  If you experience any symptoms, please consult a healthcare provider immediately
                </Typography>
              </li>
            </ul>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default About; 