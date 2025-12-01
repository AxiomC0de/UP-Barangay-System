'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { keyframes } from '@emotion/react';
import { Navbar, Footer } from '@/components';

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const REQUEST_TYPES = [
  'Document Request (Clearance, ID)',
  'Certificate of Indigency',
  'Business Permit Inquiry',
  'Complaint / Report',
  'General Inquiry',
  'Others',
];

const COMMON_QUESTIONS = [
  {
    question: 'Office hours on weekends?',
    answer: 'The Admin office is closed on weekends. However, the Barangay Tanod outpost is operational 24/7 for emergencies.',
  },
  {
    question: 'How do I get a Certificate of Indigency?',
    answer: 'It is free of charge. Bring a valid ID and visit the Social Services desk. You can also apply online via the Services tab.',
  },
  {
    question: 'What is the hotline for emergencies?',
    answer: `For Peace & Order: 0917-111-2222.
For Medical/Ambulance: (02) 8920-1234.`,
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    requestType: 'Document Request (Clearance, ID)',
    customRequest: '',
    message: '',
  });
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | false>('panel0');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFaqChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedFaq(isExpanded ? panel : false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    alert('Message sent successfully!');
    setFormData({
      fullName: '',
      email: '',
      requestType: 'Document Request (Clearance, ID)',
      customRequest: '',
      message: '',
    });
  };

  return (
    <Box component="main" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar hideNavLinks />

      {/* Hero Section with Curved Bottom */}
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 4, md: 5 },
          pb: { xs: 24, md: 32 },
          overflow: 'visible',
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/images/hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 0,
          }}
        />

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(30, 41, 59, 0.82)',
            zIndex: 1,
          }}
        />

        {/* Hero Content */}
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box
            sx={{
              textAlign: 'center',
              color: 'white',
              animation: `${fadeInUp} 0.8s ease-out`,
            }}
          >
            {/* Barangay Logo */}
            <Box
              sx={{
                width: { xs: 100, md: 130 },
                height: { xs: 100, md: 130 },
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid rgba(255,255,255,0.3)',
                mx: 'auto',
                mb: 2,
              }}
            >
              <Box
                component="img"
                src="/images/logo.jpg"
                alt="Barangay U.P. Campus Logo"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
                fontStyle: 'italic',
              }}
            >
              We&apos;re Here to Help
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '550px',
                mx: 'auto',
                lineHeight: 1.7,
              }}
            >
              Got a question about barangay services? Need to report an issue?
              <br />
              Reach out to us directly or find quick answers below.
            </Typography>
          </Box>
        </Container>

        {/* Curved Bottom */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: { xs: 60, md: 80 },
            backgroundColor: '#f1f5f9',
            borderTopLeftRadius: '50% 100%',
            borderTopRightRadius: '50% 100%',
            zIndex: 3,
          }}
        />
      </Box>

      {/* Contact Cards - Overlapping Hero */}
      <Box
        sx={{
          position: 'relative',
          mt: { xs: -14, md: -24 },
          zIndex: 10,
          px: 2,
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2,
              justifyContent: 'center',
            }}
          >
            {/* Visit the Hall Card */}
            <Paper
              elevation={3}
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 4,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                backgroundColor: 'white',
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <LocationOnIcon sx={{ color: '#228B22', fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Visit the Hall
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  Laurel Avenue, U.P. Campus, QC
                </Typography>
                <Button
                  size="small"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                  onClick={() => setIsMapExpanded(true)}
                  sx={{
                    color: '#228B22',
                    textTransform: 'none',
                    fontWeight: 600,
                    p: 0,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Open Map
                </Button>
              </Box>
            </Paper>

            {/* Call Us Card */}
            <Paper
              elevation={3}
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 4,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                backgroundColor: 'white',
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: '#fef3c7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <PhoneIcon sx={{ color: '#d97706', fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Call Us
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 500 }}>
                  Main Line: (02) 8981-8500
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Mon-Fri, 8:00 AM - 5:00 PM
                </Typography>
              </Box>
            </Paper>

            {/* Email Us Card */}
            <Paper
              elevation={3}
              sx={{
                flex: 1,
                p: 3,
                borderRadius: 4,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 2,
                backgroundColor: 'white',
              }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <EmailIcon sx={{ color: '#16a34a', fontSize: 24 }} />
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  Email Us
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
                  Response time: ~24 hours
                </Typography>
                <Typography
                  component="a"
                  href="mailto:secretariat@brgyupcampus.gov.ph"
                  variant="body2"
                  sx={{
                    color: '#228B22',
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  secretariat@brgyupcampus.gov.ph
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          py: { xs: 6, md: 8 },
          backgroundColor: '#f1f5f9',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: 4,
            }}
          >
            {/* Left Side - Send a Request Form */}
            <Paper
              elevation={0}
              sx={{
                flex: { xs: '1', lg: '1' },
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'grey.200',
                backgroundColor: 'white',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                Send a Request
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                Fill out the form below and the appropriate committee will get back to you.
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                {/* Name and Email Row */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    mb: 2.5,
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Full Name
                    </Typography>
                    <TextField
                      fullWidth
                      name="fullName"
                      placeholder="Juan Dela Cruz"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: <PersonIcon sx={{ color: 'grey.400', mr: 1, fontSize: 20 }} />,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#f8fafc',
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Email Address
                    </Typography>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      placeholder="juan@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: <EmailIcon sx={{ color: 'grey.400', mr: 1, fontSize: 20 }} />,
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#f8fafc',
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* I Need Help With */}
                <Box sx={{ mb: 2.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    I Need Help With...
                  </Typography>
                  <TextField
                    fullWidth
                    select
                    name="requestType"
                    value={formData.requestType}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: '#f8fafc',
                      },
                    }}
                  >
                    {REQUEST_TYPES.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>

                {/* Custom Request Input - Shows when Others is selected */}
                {formData.requestType === 'Others' && (
                  <Box sx={{ mb: 2.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Please specify
                    </Typography>
                    <TextField
                      fullWidth
                      name="customRequest"
                      placeholder="Enter your specific request..."
                      value={formData.customRequest}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#f8fafc',
                        },
                      }}
                    />
                  </Box>
                )}

                {/* Message Details */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, mb: 0.5, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Message Details
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="message"
                    placeholder="How can we help you today?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: '#f8fafc',
                      },
                    }}
                  />
                </Box>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  endIcon={<SendIcon />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: '1rem',
                    backgroundColor: '#228B22',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#1a6b1a',
                    },
                  }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </Box>
            </Paper>

            {/* Right Side - Common Questions & Location */}
            <Box sx={{ flex: { xs: '1', lg: '1' }, display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Common Questions */}
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  Common Questions
                </Typography>
                {COMMON_QUESTIONS.map((faq, index) => (
                  <Accordion
                    key={index}
                    expanded={expandedFaq === `panel${index}`}
                    onChange={handleFaqChange(`panel${index}`)}
                    elevation={0}
                    sx={{
                      mb: 1.5,
                      borderRadius: '12px !important',
                      border: '1px solid',
                      borderColor: 'grey.200',
                      backgroundColor: 'white',
                      '&:before': { display: 'none' },
                      '&.Mui-expanded': {
                        margin: '0 0 12px 0',
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{
                        borderRadius: '12px',
                        '& .MuiAccordionSummary-content': {
                          my: 1.5,
                        },
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {faq.question}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{ pt: 0, pb: 2 }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary', whiteSpace: 'pre-line' }}>
                        {faq.answer}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>

              {/* Location */}
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
                  Location
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    position: 'relative',
                    height: 220,
                  }}
                >
                  {/* Google Maps Embed */}
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.973462947761!2d121.05869631484094!3d14.657159989766956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b76e1d70d015%3A0x89e17b8f0411130d!2sBarangay%20Hall%20UP%20Campus!5e0!3m2!1sen!2sph!4v1698246371234!5m2!1sen!2sph"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  {/* View Larger Map Link */}
                  <Box
                    component="a"
                    href="https://www.google.com/maps/place/Barangay+Hall+UP+Campus/@14.6571599,121.0586963,17z"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      backgroundColor: 'white',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      color: 'text.secondary',
                      textDecoration: 'none',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      '&:hover': {
                        color: '#228B22',
                      },
                    }}
                  >
                    View larger map
                  </Box>

                  {/* Click to Expand Button */}
                  <Button
                    onClick={() => setIsMapExpanded(true)}
                    startIcon={<OpenInFullIcon sx={{ fontSize: 14 }} />}
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'white',
                      color: 'text.primary',
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      textTransform: 'none',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      '&:hover': {
                        backgroundColor: 'grey.100',
                      },
                    }}
                  >
                    Click to Expand
                  </Button>
                </Paper>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Expanded Map Dialog */}
      <Dialog
        open={isMapExpanded}
        onClose={() => setIsMapExpanded(false)}
        maxWidth={false}
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            width: '70vw',
            maxWidth: '70vw',
            height: 'auto',
            margin: '20px',
            borderRadius: 3,
            overflow: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1.5,
            py: 0.75,
            borderBottom: '1px solid',
            borderColor: 'grey.200',
            backgroundColor: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOnIcon sx={{ color: '#228B22' }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Barangay Hall Location
            </Typography>
          </Box>
          <IconButton onClick={() => setIsMapExpanded(false)} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent sx={{ p: 0, height: '70vh', overflow: 'hidden' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.973462947761!2d121.05869631484094!3d14.657159989766956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b76e1d70d015%3A0x89e17b8f0411130d!2sBarangay%20Hall%20UP%20Campus!5e0!3m2!1sen!2sph!4v1698246371234!5m2!1sen!2sph"
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </DialogContent>
      </Dialog>

      <Footer />
    </Box>
  );
}
