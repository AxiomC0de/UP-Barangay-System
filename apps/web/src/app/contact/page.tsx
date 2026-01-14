'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    requestType: 'Document Request (Clearance, ID)',
    customRequest: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      </Box>

      {/* Curved Transition Section - Self-contained, adjust height here only */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 40, md: 50 }, // <- ADJUST CURVE HEIGHT HERE
          backgroundColor: '#f1f5f9',
          overflow: 'visible',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            backgroundImage: 'url(/images/hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 70%',
            borderBottomLeftRadius: '50% 100%',
            borderBottomRightRadius: '50% 100%',
            overflow: 'hidden',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(30, 41, 59, 0.82)',
            },
          }}
        />
        
        {/* Contact Cards - Floating on curve */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: -80, md: -100 },
            left: 0,
            right: 0,
            zIndex: 20,
            px: 2,
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
                justifyContent: 'center',
              }}
            >
            {/* Visit the Hall Card */}
            <Paper
              component="a"
              href="https://www.google.com/maps/search/?api=1&query=Barangay+Hall+UP+Campus+Quezon+City"
              target="_blank"
              rel="noopener noreferrer"
              elevation={0}
              sx={{
                flex: 1,
                minHeight: 160,
                p: 3,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: 'white',
                border: '1px solid',
                borderColor: 'grey.200',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 16px 32px rgba(0,0,0,0.12)',
                  borderColor: '#228B22',
                  '& .card-icon': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 8px 20px rgba(34, 139, 34, 0.25)',
                  },
                },
              }}
            >
              <Box
                className="card-icon"
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #228B22 0%, #1a6b1a 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 14px rgba(34, 139, 34, 0.2)',
                }}
              >
                <LocationOnIcon sx={{ color: 'white', fontSize: 26 }} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5, color: '#1e293b' }}>
                Visit Us
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.5, mb: 1 }}>
                Laurel Ave, U.P. Campus
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: '#228B22',
                  fontWeight: 600,
                  mt: 'auto',
                }}
              >
                View on Map →
              </Typography>
            </Paper>

            {/* Call Us Card */}
            <Paper
              component="a"
              href="tel:+6328981-8500"
              elevation={0}
              sx={{
                flex: 1,
                minHeight: 160,
                p: 3,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: 'white',
                border: '1px solid',
                borderColor: 'grey.200',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 16px 32px rgba(0,0,0,0.12)',
                  borderColor: '#228B22',
                  '& .card-icon': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 8px 20px rgba(34, 139, 34, 0.25)',
                  },
                },
              }}
            >
              <Box
                className="card-icon"
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #228B22 0%, #1a6b1a 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 14px rgba(34, 139, 34, 0.2)',
                }}
              >
                <PhoneIcon sx={{ color: 'white', fontSize: 26 }} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5, color: '#1e293b' }}>
                Call Us
              </Typography>
              <Typography variant="body2" sx={{ color: '#1e293b', fontWeight: 600, mb: 0.5 }}>
                (02) 8981-8500
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 'auto' }}>
                <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Mon-Fri, 8AM - 5PM
                </Typography>
              </Box>
            </Paper>

            {/* Email Us Card */}
            <Paper
              component="a"
              href="mailto:secretariat@brgyupcampus.gov.ph"
              elevation={0}
              sx={{
                flex: 1,
                minHeight: 160,
                p: 3,
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                backgroundColor: 'white',
                border: '1px solid',
                borderColor: 'grey.200',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                textDecoration: 'none',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 16px 32px rgba(0,0,0,0.12)',
                  borderColor: '#228B22',
                  '& .card-icon': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 8px 20px rgba(34, 139, 34, 0.25)',
                  },
                },
              }}
            >
              <Box
                className="card-icon"
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #228B22 0%, #1a6b1a 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 14px rgba(34, 139, 34, 0.2)',
                }}
              >
                <EmailIcon sx={{ color: 'white', fontSize: 26 }} />
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5, color: '#1e293b' }}>
                Email Us
              </Typography>
              <Typography variant="body2" sx={{ color: '#228B22', fontWeight: 600, mb: 0.5, wordBreak: 'break-all' }}>
                secretariat@brgyupcampus.gov.ph
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 'auto' }}>
                <CheckCircleOutlineIcon sx={{ fontSize: 14, color: '#228B22' }} />
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  24hr response
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Container>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          pt: { xs: 8, md: 12 },
          pb: { xs: 6, md: 8 },
          background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 50%, #f8fafc 100%)',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(34, 139, 34, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(123, 17, 19, 0.03) 0%, transparent 50%)',
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
            {/* Send a Request Form */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                border: '1px solid',
                borderColor: 'grey.200',
                backgroundColor: 'white',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Form Header */}
              <Box 
                sx={{ 
                  textAlign: 'center',
                  pb: 4,
                  mb: 4,
                  borderBottom: '1px solid',
                  borderColor: 'grey.100',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -1,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 60,
                    height: 3,
                    background: 'linear-gradient(90deg, #228B22 0%, #7B1113 100%)',
                    borderRadius: 2,
                  },
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>
                  Send a Request
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', whiteSpace: 'nowrap' }}>
                  Fill out the form below and we&apos;ll get back to you within 24 hours
                </Typography>
              </Box>

              <Box component="form" onSubmit={handleSubmit}>
                {/* Section: Personal Information */}
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="overline" 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: '#7B1113', 
                      fontWeight: 700, 
                      letterSpacing: 1.5,
                      mb: 2,
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 18 }} />
                    Your Information
                  </Typography>
                  
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: 2.5,
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Full Name *
                      </Typography>
                      <TextField
                        fullWidth
                        name="fullName"
                        placeholder="Juan Dela Cruz"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        size="medium"
                        InputProps={{
                          startAdornment: <PersonIcon sx={{ color: 'grey.400', mr: 1.5, fontSize: 20 }} />,
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: '#f8fafc',
                            minHeight: 52,
                            '&:hover': {
                              backgroundColor: '#f1f5f9',
                            },
                            '&.Mui-focused': {
                              backgroundColor: 'white',
                            },
                          },
                        }}
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Email Address *
                      </Typography>
                      <TextField
                        fullWidth
                        name="email"
                        type="email"
                        placeholder="juan@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        size="medium"
                        InputProps={{
                          startAdornment: <EmailIcon sx={{ color: 'grey.400', mr: 1.5, fontSize: 20 }} />,
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: '#f8fafc',
                            minHeight: 52,
                            '&:hover': {
                              backgroundColor: '#f1f5f9',
                            },
                            '&.Mui-focused': {
                              backgroundColor: 'white',
                            },
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>

                {/* Section: Request Details */}
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="overline" 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: '#228B22', 
                      fontWeight: 700, 
                      letterSpacing: 1.5,
                      mb: 2,
                    }}
                  >
                    <SendIcon sx={{ fontSize: 18 }} />
                    Request Details
                  </Typography>

                  {/* Request Type */}
                  <Box sx={{ mb: 2.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      I Need Help With... *
                    </Typography>
                    <TextField
                      fullWidth
                      select
                      name="requestType"
                      value={formData.requestType}
                      onChange={handleChange}
                      size="medium"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#f8fafc',
                          minHeight: 52,
                          '&:hover': {
                            backgroundColor: '#f1f5f9',
                          },
                          '&.Mui-focused': {
                            backgroundColor: 'white',
                          },
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
                      <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        Please Specify *
                      </Typography>
                      <TextField
                        fullWidth
                        name="customRequest"
                        placeholder="Enter your specific request..."
                        value={formData.customRequest}
                        onChange={handleChange}
                        required
                        size="medium"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: '#f8fafc',
                            minHeight: 52,
                            '&:hover': {
                              backgroundColor: '#f1f5f9',
                            },
                            '&.Mui-focused': {
                              backgroundColor: 'white',
                            },
                          },
                        }}
                      />
                    </Box>
                  )}

                  {/* Message Details */}
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', mb: 1, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Message Details *
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={5}
                      name="message"
                      placeholder="Please describe your request or concern in detail. Include any relevant information that will help us assist you better."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#f8fafc',
                          '&:hover': {
                            backgroundColor: '#f1f5f9',
                          },
                          '&.Mui-focused': {
                            backgroundColor: 'white',
                          },
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Submit Section */}
                <Box 
                  sx={{ 
                    pt: 3,
                    borderTop: '1px solid',
                    borderColor: 'grey.100',
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={isSubmitting}
                    endIcon={!isSubmitting && <SendIcon />}
                    sx={{
                      py: 2,
                      borderRadius: 2.5,
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      background: 'linear-gradient(135deg, #228B22 0%, #1a6b1a 100%)',
                      textTransform: 'none',
                      boxShadow: '0 6px 20px rgba(34, 139, 34, 0.35)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1a6b1a 0%, #155715 100%)',
                        boxShadow: '0 8px 28px rgba(34, 139, 34, 0.45)',
                        transform: 'translateY(-2px)',
                      },
                      '&:disabled': {
                        background: 'grey.300',
                      },
                    }}
                  >
                    {isSubmitting ? 'Sending Your Request...' : 'Submit Request'}
                  </Button>

                  {/* Trust Indicators */}
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: { xs: 1.5, sm: 3 },
                      mt: 3,
                      pt: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <CheckCircleOutlineIcon sx={{ fontSize: 16, color: '#228B22' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Secure & Encrypted
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <AccessTimeIcon sx={{ fontSize: 16, color: '#228B22' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        24-Hour Response
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                      <EmailIcon sx={{ fontSize: 16, color: '#228B22' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        Email Confirmation
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
