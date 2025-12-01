'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import GavelIcon from '@mui/icons-material/Gavel';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
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

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

// Main Services Data
const MAIN_SERVICES = [
  {
    icon: AnnouncementIcon,
    title: 'Announcements',
    description: 'Stay updated with the latest news, events, and important notices from barangay officials.',
    color: '#7B1113',
  },
  {
    icon: ReportProblemIcon,
    title: 'Report Concerns',
    description: 'Submit concerns about infrastructure, safety, or community issues directly to officials.',
    color: '#ED6C02',
  },
  {
    icon: LightbulbIcon,
    title: 'Share Ideas',
    description: 'Propose suggestions for community improvement and vote on ideas from fellow residents.',
    color: '#228B22',
  },
  {
    icon: EventIcon,
    title: 'Community Events',
    description: 'Discover upcoming events, programs, and activities happening in our community.',
    color: '#9C27B0',
  },
  {
    icon: GroupsIcon,
    title: 'Connect',
    description: 'Engage with neighbors and participate in community discussions and initiatives.',
    color: '#00796B',
  },
];

// Document Services
const DOCUMENT_SERVICES = [
  {
    icon: DescriptionIcon,
    title: 'Barangay Clearance',
    description: 'Request barangay clearance for employment, business permits, and other legal requirements.',
    color: '#1976D2',
  },
  {
    icon: DescriptionIcon,
    title: 'Certificate of Residency',
    description: 'Obtain official proof of residency within Barangay U.P. Campus for various transactions.',
    color: '#388E3C',
  },
  {
    icon: DescriptionIcon,
    title: 'Certificate of Indigency',
    description: 'Request certificate of indigency for medical, educational, or financial assistance.',
    color: '#F57C00',
  },
  {
    icon: GavelIcon,
    title: 'Barangay Blotter',
    description: 'File incident reports and complaints for proper documentation and mediation.',
    color: '#D32F2F',
  },
  {
    icon: HealthAndSafetyIcon,
    title: 'Health Services',
    description: 'Access barangay health center services including consultations and medical assistance.',
    color: '#00897B',
  },
  {
    icon: DescriptionIcon,
    title: 'Business Permit Endorsement',
    description: 'Get barangay endorsement for business permit applications within the community.',
    color: '#5E35B1',
  },
];

// How It Works Steps
const STEPS = [
  {
    icon: PersonAddIcon,
    step: '01',
    title: 'Create Account',
    description: 'Register with your email and provide basic information to verify your residency.',
  },
  {
    icon: TouchAppIcon,
    step: '02',
    title: 'Access Services',
    description: 'Browse announcements, submit concerns, request documents, or share ideas.',
  },
  {
    icon: CheckCircleIcon,
    step: '03',
    title: 'Stay Connected',
    description: 'Track your requests, receive updates, and engage with your community.',
  },
];

export default function ServicesPage() {
  return (
    <Box component="main">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '350px', md: '400px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
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
            backgroundColor: 'rgba(30, 41, 59, 0.85)',
            zIndex: 1,
          }}
        />

        {/* Hero Content */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            color: 'white',
            px: 2,
            animation: `${fadeIn} 0.8s ease-out`,
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
              fontWeight: 700,
              mb: 2,
              textShadow: '2px 4px 8px rgba(0,0,0,0.3)',
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', md: '1.25rem' },
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Access a wide range of barangay services and stay connected with your community
          </Typography>
        </Box>
      </Box>

      {/* Main Services Section */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 10 },
          backgroundColor: '#f8f9fa',
        }}
      >
        <Container maxWidth="lg">
          {/* Section Header */}
          <Box
            sx={{
              textAlign: 'center',
              mb: { xs: 5, md: 7 },
              animation: `${fadeIn} 0.8s ease-out`,
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: '#228B22',
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: 2,
                mb: 1,
                display: 'block',
              }}
            >
              DIGITAL SERVICES
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                fontWeight: 700,
                mb: 2,
                color: 'text.primary',
              }}
            >
              What You Can Do
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: '600px',
                mx: 'auto',
                fontSize: { xs: '0.9375rem', md: '1.0625rem' },
              }}
            >
              Access a wide range of barangay services and stay connected with your community through our digital platform.
            </Typography>
          </Box>

          {/* Service Cards Grid */}
          <Grid container spacing={{ xs: 2.5, sm: 3, md: 4 }}>
            {MAIN_SERVICES.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Grid item xs={12} sm={6} md={4} key={service.title}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      animation: `${fadeInUp} 0.6s ease-out ${index * 0.1}s both`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
                        '& .service-icon': {
                          transform: 'scale(1.1)',
                        },
                        '& .service-title': {
                          color: service.color,
                        },
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 3, md: 4 },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box
                        className="service-icon"
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: `${service.color}15`,
                          mb: 2.5,
                          transition: 'transform 0.3s ease',
                        }}
                      >
                        <IconComponent
                          sx={{
                            fontSize: 32,
                            color: service.color,
                          }}
                        />
                      </Box>
                      <Typography
                        className="service-title"
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: '1.0625rem', md: '1.125rem' },
                          mb: 1.5,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: { xs: '0.8125rem', md: '0.875rem' },
                          lineHeight: 1.7,
                          flexGrow: 1,
                        }}
                      >
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* Document Services Section */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 10 },
          backgroundColor: 'white',
        }}
      >
        <Container maxWidth="lg">
          {/* Section Header */}
          <Box
            sx={{
              textAlign: 'center',
              mb: { xs: 5, md: 7 },
              animation: `${fadeIn} 0.8s ease-out`,
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: '#7B1113',
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: 2,
                mb: 1,
                display: 'block',
              }}
            >
              BARANGAY DOCUMENTS
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                fontWeight: 700,
                mb: 2,
                color: 'text.primary',
              }}
            >
              Document Services
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: '600px',
                mx: 'auto',
                fontSize: { xs: '0.9375rem', md: '1.0625rem' },
              }}
            >
              Request official barangay documents and certificates for your various needs.
            </Typography>
          </Box>

          {/* Document Cards Grid */}
          <Grid container spacing={{ xs: 2.5, sm: 3, md: 4 }}>
            {DOCUMENT_SERVICES.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Grid item xs={12} sm={6} md={4} key={service.title}>
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      animation: `${fadeInUp} 0.6s ease-out ${index * 0.1}s both`,
                      transition: 'all 0.3s ease',
                      border: '1px solid',
                      borderColor: 'grey.200',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
                        borderColor: service.color,
                        '& .doc-icon': {
                          transform: 'scale(1.1)',
                          backgroundColor: service.color,
                          '& svg': {
                            color: 'white',
                          },
                        },
                        '& .doc-title': {
                          color: service.color,
                        },
                      },
                    }}
                  >
                    <CardContent
                      sx={{
                        p: { xs: 3, md: 4 },
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box
                        className="doc-icon"
                        sx={{
                          width: 56,
                          height: 56,
                          borderRadius: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: `${service.color}15`,
                          mb: 2.5,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <IconComponent
                          sx={{
                            fontSize: 28,
                            color: service.color,
                            transition: 'color 0.3s ease',
                          }}
                        />
                      </Box>
                      <Typography
                        className="doc-title"
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 600,
                          fontSize: { xs: '1rem', md: '1.0625rem' },
                          mb: 1.5,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: { xs: '0.8125rem', md: '0.875rem' },
                          lineHeight: 1.7,
                          flexGrow: 1,
                        }}
                      >
                        {service.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Box
        component="section"
        sx={{
          py: { xs: 8, md: 10 },
          backgroundColor: '#f8f9fa',
        }}
      >
        <Container maxWidth="lg">
          {/* Section Header */}
          <Box
            sx={{
              textAlign: 'center',
              mb: { xs: 5, md: 7 },
              animation: `${fadeIn} 0.8s ease-out`,
            }}
          >
            <Typography
              variant="overline"
              sx={{
                color: '#228B22',
                fontWeight: 600,
                fontSize: '0.875rem',
                letterSpacing: 2,
                mb: 1,
                display: 'block',
              }}
            >
              GETTING STARTED
            </Typography>
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                fontWeight: 700,
                mb: 2,
                color: 'text.primary',
              }}
            >
              How It Works
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                maxWidth: '550px',
                mx: 'auto',
                fontSize: { xs: '0.9375rem', md: '1.0625rem' },
              }}
            >
              Get started in three simple steps and enjoy seamless access to barangay services.
            </Typography>
          </Box>

          {/* Steps */}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 4, md: 0 }}
            alignItems="flex-start"
            justifyContent="center"
            sx={{
              position: 'relative',
            }}
          >
            {STEPS.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Box
                  key={step.step}
                  sx={{
                    flex: 1,
                    textAlign: 'center',
                    px: { xs: 2, md: 4 },
                    position: 'relative',
                    animation: `${fadeInUp} 0.6s ease-out ${index * 0.2}s both`,
                  }}
                >
                  {/* Connector line (desktop only) */}
                  {index < STEPS.length - 1 && (
                    <Box
                      sx={{
                        display: { xs: 'none', md: 'block' },
                        position: 'absolute',
                        top: 45,
                        right: 0,
                        width: '50%',
                        height: 2,
                        backgroundColor: '#228B22',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '100%',
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#228B22',
                        },
                      }}
                    />
                  )}

                  {/* Step Icon */}
                  <Box
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      backgroundColor: '#228B22',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      position: 'relative',
                      boxShadow: '0 8px 24px rgba(34, 139, 34, 0.3)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  >
                    <IconComponent
                      sx={{
                        fontSize: 40,
                        color: 'white',
                      }}
                    />
                    {/* Step Number Badge */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -5,
                        right: -5,
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: '#7B1113',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      }}
                    >
                      {step.step}
                    </Box>
                  </Box>

                  {/* Step Content */}
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: '1.125rem', md: '1.25rem' },
                      mb: 1.5,
                      color: 'text.primary',
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      fontSize: { xs: '0.875rem', md: '0.9375rem' },
                      lineHeight: 1.7,
                      maxWidth: '280px',
                      mx: 'auto',
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Container>
      </Box>

      {/* Contact CTA Section */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 8 },
          backgroundColor: 'white',
        }}
      >
        <Container maxWidth="md">
          <Box 
            sx={{ 
              textAlign: 'center',
              animation: `${fadeInUp} 0.6s ease-out`,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'text.primary',
              }}
            >
              Need Assistance?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 4,
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              Our barangay staff is ready to help you with any questions about our services.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#f8f9fa',
                  px: 4,
                  py: 3,
                  borderRadius: 2,
                  textAlign: 'center',
                  minWidth: 200,
                  animation: `${fadeInUp} 0.5s ease-out 0.2s both`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Call us at
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#228B22' }}>
                  995 721 9867
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: '#f8f9fa',
                  px: 4,
                  py: 3,
                  borderRadius: 2,
                  textAlign: 'center',
                  minWidth: 200,
                  animation: `${fadeInUp} 0.5s ease-out 0.35s both`,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Visit us at
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#228B22' }}>
                  Barangay Hall
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
