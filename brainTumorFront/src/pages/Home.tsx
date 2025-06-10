import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import ScienceIcon from '@mui/icons-material/Science';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionAccordion = motion(Accordion);
const MotionPaper = motion(Paper);

const Home = () => {
  const navigate = useNavigate();

  // Sample data for pie charts
  const tumorTypeData = [
    { name: 'Glioma', value: 35 },
    { name: 'Meningioma', value: 25 },
    { name: 'Pituitary', value: 20 },
    { name: 'No Tumor', value: 20 },
  ];

  const accuracyData = [
    { name: 'Correct Predictions', value: 85 },
    { name: 'Incorrect Predictions', value: 15 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const faqs = [
    {
      question: 'What is Brain Tumor Detection?',
      answer: 'Brain Tumor Detection is an AI-powered system that analyzes MRI scans to detect and classify brain tumors. It uses advanced machine learning algorithms to provide accurate diagnoses and detailed information about detected tumors.'
    },
    {
      question: 'How accurate is the detection system?',
      answer: 'Our system has an accuracy rate of over 85% in detecting and classifying brain tumors. However, it should be used as a supplementary tool alongside professional medical diagnosis.'
    },
    {
      question: 'What types of brain tumors can be detected?',
      answer: 'The system can detect and classify three main types of brain tumors: Glioma, Meningioma, and Pituitary tumors. It can also confirm when no tumor is present.'
    },
    {
      question: 'How do I use the system?',
      answer: 'Simply upload an MRI scan image, fill in the required patient information, and click "Analyze Image". The system will process the image and provide detailed results about any detected tumors.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes, we take data security seriously. All patient information and medical images are encrypted and stored securely. We comply with healthcare data protection regulations.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <MotionBox
      textAlign="center"
      mb={6}
      px={4}
      py={6}
      borderRadius={4}
      sx={{
        background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', // Blue-Black gradient
        color: 'white',
        boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(4px)',
      }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Brain Tumor Detection System
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Typography variant="h6" color="text.secondary" paragraph sx={{ color: '#ccc' }}>
          Advanced AI-powered detection and analysis of brain tumors using MRI scans
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/detection')}
          sx={{
            mt: 2,
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #00c9ff, #92fe9d)',
            color: '#000',
            borderRadius: '30px',
            boxShadow: '0 0 20px rgba(0, 201, 255, 0.6)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 0 25px rgba(0, 201, 255, 0.9)',
            },
          }}
        >
          Start Analysis
        </Button>
      </motion.div>
    </MotionBox>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <MotionCard sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <ScienceIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h6">Advanced AI Technology</Typography>
                </Box>
                <Typography>
                  Utilizing state-of-the-art machine learning algorithms for accurate tumor detection
                </Typography>
              </CardContent>
            </MotionCard>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <MotionCard sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <SpeedIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h6">Quick Results</Typography>
                </Box>
                <Typography>
                  Get detailed analysis and results within seconds of uploading your MRI scan
                </Typography>
              </CardContent>
            </MotionCard>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <MotionCard sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <SecurityIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  <Typography variant="h6">Secure & Private</Typography>
                </Box>
                <Typography>
                  Your data is encrypted and stored securely, ensuring complete privacy
                </Typography>
              </CardContent>
            </MotionCard>
          </motion.div>
        </Box>
      </Container>

      {/* Statistics Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <MotionCard sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Tumor Type Distribution
                </Typography>
                <Box height={300}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={tumorTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {tumorTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </MotionCard>
          </motion.div>
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <MotionCard sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  System Accuracy
                </Typography>
                <Box height={300}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={accuracyData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {accuracyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </MotionCard>
          </motion.div>
        </Box>
      </Container>

      {/* FAQ Section */}
      <MotionBox
        mb={6}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <MotionAccordion
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </MotionAccordion>
        ))}
      </MotionBox>

      {/* Copyright Section */}
      <MotionPaper
        sx={{ p: 3, mt: 4 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Brain Tumor Detection System. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          This system is designed to assist medical professionals and should not be used as a substitute for professional medical advice.
        </Typography>
      </MotionPaper>
    </Container>
  );
};

export default Home; 