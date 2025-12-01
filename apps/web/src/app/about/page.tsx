'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import PersonIcon from '@mui/icons-material/Person';
import { keyframes } from '@emotion/react';
import Image from 'next/image';
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
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// Barangay Officials Data
const BARANGAY_CAPTAIN = {
  name: 'Lawrence V. Mappala',
  position: 'Punong Barangay',
};

const COUNCILORS = [
  { name: 'Danilo J. Arceo', position: 'Barangay Councilor', image: '/images/Danilo.png' },
  { name: 'Warren S. Gloria', position: 'Barangay Councilor', image: '/images/Warren.png' },
  { name: 'Rowell P. Lectura', position: 'Barangay Councilor', image: '/images/Rowell.png' },
  { name: 'Jewelle Peter A. Cabrera', position: 'Barangay Councilor', image: '/images/Jewelle.png' },
  { name: 'Edwin C. Dela Paz', position: 'Barangay Councilor', image: '/images/Edwin.png' },
  { name: 'Ana S. Falcon', position: 'Barangay Councilor', image: '/images/Ana.png' },
  { name: 'Khim Gerbert A. Castro', position: 'Barangay Councilor', image: '/images/Khim.png' },
];

const SK_CHAIRPERSON = {
  name: 'Angelica Anne B. Cayabyab',
  position: 'SK Chairperson',
};

export default function AboutPage() {
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
            animation: `${fadeInUp} 0.8s ease-out`,
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
              animation: `${fadeInUp} 0.8s ease-out`,
            }}
          >
            About Us
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '1rem', md: '1.25rem' },
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
              maxWidth: '600px',
              mx: 'auto',
              animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
            }}
          >
            Learn more about Barangay U.P. Campus, our officials, and our rich history
          </Typography>
        </Box>
      </Box>

      {/* Officials Section */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 8 },
          backgroundColor: '#f8f9fa',
        }}
      >
        <Container maxWidth="lg">
          {/* Punong Barangay - Featured */}
          <Box 
            sx={{ 
              mb: 5,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 3, md: 6 },
              animation: `${fadeIn} 0.8s ease-out`,
            }}
          >
            {/* Chairman Image */}
            <Box
              sx={{
                position: 'relative',
                width: { xs: 280, md: 380 },
                height: { xs: 280, md: 380 },
                flexShrink: 0,
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                animation: `${slideInLeft} 0.8s ease-out`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.18)',
                },
              }}
            >
              <Image
                src="/images/chairman_aboutus.png"
                alt="Punong Barangay Lawrence V. Mappala"
                fill
                style={{ objectFit: 'contain' }}
              />
            </Box>

            {/* Text Content */}
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, flex: 1, maxWidth: '600px', animation: `${slideInRight} 0.8s ease-out` }}>
              <Typography
                variant="overline"
                sx={{
                  color: '#228B22',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  letterSpacing: 2,
                  display: 'block',
                  mb: 1,
                }}
              >
                Punong Barangay
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                  fontWeight: 700,
                  color: 'text.primary',
                  mb: 2,
                }}
              >
                {BARANGAY_CAPTAIN.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: { xs: '0.95rem', md: '1.05rem' },
                  lineHeight: 1.8,
                  textAlign: { xs: 'center', md: 'justify' },
                }}
              >
                Punong Barangay {BARANGAY_CAPTAIN.name} leads Barangay U.P. Campus with dedication 
                to public service and community development. Under his leadership, the barangay 
                continues to serve its residents with transparency, efficiency, and commitment 
                to progress.
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Barangay Council */}
          <Box sx={{ mb: 5 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 3,
                color: 'text.primary',
                animation: `${fadeInUp} 0.6s ease-out`,
              }}
            >
              Barangay Council
            </Typography>
            <Grid container spacing={2}>
              {COUNCILORS.map((councilor, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      textAlign: 'center',
                      border: '1px solid',
                      borderColor: 'grey.200',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      animation: `${scaleIn} 0.5s ease-out ${index * 0.1}s both`,
                      '&:hover': {
                        borderColor: '#228B22',
                        boxShadow: '0 4px 20px rgba(34, 139, 34, 0.1)',
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardContent sx={{ py: 2.5 }}>
                      {councilor.image ? (
                        <Box
                          sx={{
                            width: 200,
                            height: 200,
                            mx: 'auto',
                            mb: 1.5,
                            borderRadius: 2,
                            overflow: 'hidden',
                            position: 'relative',
                          }}
                        >
                          <Image
                            src={councilor.image}
                            alt={councilor.name}
                            fill
                            style={{ objectFit: 'contain' }}
                          />
                        </Box>
                      ) : (
                        <Avatar
                          sx={{
                            width: 50,
                            height: 50,
                            mx: 'auto',
                            mb: 1.5,
                            bgcolor: '#7B1113',
                          }}
                        >
                          <PersonIcon sx={{ fontSize: 26 }} />
                        </Avatar>
                      )}
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                      >
                        {councilor.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary' }}
                      >
                        {councilor.position}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* SK Chairperson */}
          <Box sx={{ animation: `${fadeInUp} 0.6s ease-out` }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 3,
                color: 'text.primary',
              }}
            >
              Sangguniang Kabataan
            </Typography>
            <Card
              elevation={0}
              sx={{
                maxWidth: 250,
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                animation: `${scaleIn} 0.5s ease-out`,
                '&:hover': {
                  borderColor: '#228B22',
                  boxShadow: '0 4px 20px rgba(34, 139, 34, 0.1)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ py: 2.5 }}>
                <Box
                  sx={{
                    width: 200,
                    height: 200,
                    mx: 'auto',
                    mb: 1.5,
                    borderRadius: 2,
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <Image
                    src="/images/Angelica.png"
                    alt={SK_CHAIRPERSON.name}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, fontSize: '0.875rem' }}
                >
                  {SK_CHAIRPERSON.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: '#7B1113', fontWeight: 500 }}
                >
                  {SK_CHAIRPERSON.position}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>

      {/* History Section */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 8 },
          backgroundColor: 'white',
        }}
      >
        <Container maxWidth="lg">
          {/* Section Title */}
          <Box sx={{ textAlign: 'center', mb: 4, animation: `${fadeInUp} 0.6s ease-out` }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                fontWeight: 700,
                color: 'text.primary',
                mb: 1,
              }}
            >
              History of Barangay U.P. Campus
            </Typography>
            
            <Divider sx={{ mx: 'auto', maxWidth: 100, borderColor: '#228B22', borderWidth: 2 }} />
          </Box>

          {/* History Content - Clean paragraph layout */}
          <Box sx={{ maxWidth: '900px', mx: 'auto', animation: `${fadeIn} 0.8s ease-out 0.2s both` }}>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                lineHeight: 1.9,
                mb: 3,
                textAlign: 'justify',
              }}
            >
              Barangay U.P. Campus was officially established on <strong style={{ color: '#1a1a1a' }}>June 25, 1975</strong> under 
              Executive Order No. 24 issued by then Quezon City Mayor <strong style={{ color: '#1a1a1a' }}>Hon. Norberto S. Amoranto</strong>. 
              The said Executive Order was issued pursuant to Presidential Decree 557 dated September 21, 1974, 
              decreed by President Ferdinand E. Marcos, which converted all existing barrios into barangays 
              and abolished the system of zone organization of barangays in Quezon City.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                lineHeight: 1.9,
                mb: 3,
                textAlign: 'justify',
              }}
            >
              The barangay operates as a duly recognized basic political unit in Area 23, Fourth District 
              of Quezon City. It has a total land area of <strong style={{ color: '#1a1a1a' }}>493 hectares (4.93 square kilometers)</strong> and 
              is divided into 16 political jurisdictions known as &ldquo;Pook.&rdquo; These pooks are further 
              categorized into two sectors: the first sector includes the pooks belonging to the Northern 
              portion of the barangay, while the second sector belongs to the Southern portion, with the 
              UP Sunken Garden serving as the point of reference.
            </Typography>

            {/* Image - UP Campus aerial view */}
            <Box
              sx={{
                my: 4,
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
                height: { xs: 220, md: 350 },
                backgroundColor: 'grey.100',
                animation: `${fadeInUp} 0.6s ease-out 0.3s both`,
              }}
            >
              <Image
                src="/images/aerial_up.png"
                alt="Aerial view of Barangay U.P. Campus and UP Diliman"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                lineHeight: 1.9,
                mb: 3,
                textAlign: 'justify',
              }}
            >
              The political boundaries of Barangay U.P. Campus are defined as follows: to the <strong style={{ color: '#1a1a1a' }}>North</strong>, 
              it is bounded by the U.P. Compound and the boundary line of Barangay Culiat; to the <strong style={{ color: '#1a1a1a' }}>East</strong>, 
              by Katipunan Avenue extending to the boundary line of Balara Filter; to the <strong style={{ color: '#1a1a1a' }}>Southeast</strong>, 
              by the U.P. Compound and the boundary line of Barangay Loyola Heights; and to the <strong style={{ color: '#1a1a1a' }}>Southwest</strong>, 
              by the U.P. Compound and the boundary lines of Barangay Krus na Ligas, U.P. Village, and 
              San Vicente towards Culiat Creek.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                lineHeight: 1.9,
                mb: 3,
                textAlign: 'justify',
              }}
            >
              It is important to distinguish that Barangay U.P. Campus is a separate entity from the 
              University of the Philippines Diliman campus. While a large part of the barangay is occupied 
              by the UP Diliman campus, the barangay itself is a <strong style={{ color: '#1a1a1a' }}>Local Government Unit (LGU)</strong> headed 
              by a Punong Barangay (Barangay Captain), whereas UP Diliman is an academic institution headed 
              by a Chancellor. The UP Diliman campus extends beyond Barangay U.P. Campus and covers seven 
              other barangays in Quezon City, namely: Krus na Ligas, San Vicente, Botocan, Culiat, Old 
              Capitol Site, Pansol, and Vasra.
            </Typography>

            {/* Image - Barangay Hall or Community */}
            <Box
              sx={{
                my: 4,
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
                height: { xs: 220, md: 350 },
                backgroundColor: 'grey.100',
                animation: `${fadeInUp} 0.6s ease-out 0.4s both`,
              }}
            >
              <Image
                src="/images/barangay_upcampus_hall.png"
                alt="Barangay U.P. Campus Hall and Community"
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                lineHeight: 1.9,
                mb: 3,
                textAlign: 'justify',
              }}
            >
              Today, Barangay U.P. Campus serves a vibrant and diverse community. According to the 
              2020 Census of Population and Housing conducted by the Philippine Statistics Authority, 
              the barangay has a total population of <strong style={{ color: '#1a1a1a' }}>47,127 residents</strong>. The community comprises 
              approximately <strong style={{ color: '#1a1a1a' }}>9,932 households</strong> with an average household size of 3.7 members. 
              The barangay also has <strong style={{ color: '#1a1a1a' }}>16,631 registered voters</strong> and 4,770 SK voters as of the latest 
              COMELEC records.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                fontSize: { xs: '0.95rem', md: '1.05rem' },
                lineHeight: 1.9,
                mb: 4,
                textAlign: 'justify',
              }}
            >
              The barangay continues to serve its constituents through various programs and services 
              aimed at promoting community welfare, peace and order, health, education, and sustainable 
              development. The Barangay Hall is located at <strong style={{ color: '#1a1a1a' }}>Amorsolo Civic Complex, C.P. Garcia Avenue, 
              Quezon City</strong>, and remains committed to providing accessible and responsive local governance 
              to all residents of Barangay U.P. Campus.
            </Typography>

            {/* Logos */}
            <Box
              sx={{
                mt: 6,
                pt: 4,
                borderTop: '1px solid',
                borderColor: 'grey.200',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: { xs: 4, sm: 6, md: 10 },
                animation: `${fadeInUp} 0.6s ease-out 0.5s both`,
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 80, sm: 100, md: 120 },
                  height: { xs: 80, sm: 100, md: 120 },
                  flexShrink: 0,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Image
                  src="/images/qc_logo.png"
                  alt="Quezon City Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 80, sm: 100, md: 120 },
                  height: { xs: 80, sm: 100, md: 120 },
                  flexShrink: 0,
                  mt: 2.1,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Image
                  src="/images/bayan.png"
                  alt="Barangay U.P. Campus Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Box>
              <Box
                sx={{
                  position: 'relative',
                  width: { xs: 80, sm: 100, md: 120 },
                  height: { xs: 80, sm: 100, md: 120 },
                  flexShrink: 0,
                  mt: 3.1,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Image
                  src="/images/up_logo.png"
                  alt="University of the Philippines Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                />
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
