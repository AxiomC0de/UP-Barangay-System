'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Image from 'next/image';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

export default function AboutSection() {
  return (
    <Box
      component="section"
      id="about-section"
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: '#f8f9fa',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 4, md: 6 },
          }}
        >
          {/* Left Side - Image */}
          <Box
            sx={{
              flex: { xs: '1', md: '0 0 45%' },
              position: 'relative',
              width: '100%',
              minHeight: { xs: 300, md: 450 },
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            }}
          >
            <Image
              src="/images/landing-brief-aboutus.png"
              alt="Barangay U.P. Campus Community"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{
                objectFit: 'cover',
              }}
            />
          </Box>

          {/* Right Side - Quote, Mission & Vision */}
          <Box
            sx={{
              flex: { xs: '1', md: '0 0 50%' },
            }}
          >
            {/* Quote Section */}
            <Box
              sx={{
                position: 'relative',
                mb: 4,
                pl: { xs: 2, md: 4 },
                borderLeft: '4px solid #228B22',
              }}
            >
              <FormatQuoteIcon
                sx={{
                  position: 'absolute',
                  top: -10,
                  left: { xs: -5, md: 10 },
                  fontSize: 50,
                  color: 'rgba(34, 139, 34, 0.2)',
                  transform: 'rotate(180deg)',
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontStyle: 'italic',
                  color: '#333',
                  fontSize: { xs: '1.1rem', md: '1.35rem' },
                  lineHeight: 1.6,
                  fontWeight: 500,
                }}
              >
                &ldquo;Malinis, Maaliwalas, Maayos, Maliwanag at Magandang mga Barangay ng Lungsod Quezon&rdquo;
              </Typography>
            </Box>

            {/* About Us Brief */}
            <Typography
              variant="body1"
              sx={{
                color: '#555',
                fontSize: { xs: '0.95rem', md: '1rem' },
                lineHeight: 1.8,
                mb: 4,
              }}
            >
              Barangay U.P. Campus is a thriving community located within the University of the Philippines Diliman campus in Quezon City. We are committed to providing excellent public service and fostering a safe, progressive, and harmonious environment for all our residents.
            </Typography>

            {/* Mission & Vision */}
            <Stack spacing={3}>
              {/* Mission */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#228B22',
                    fontWeight: 700,
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#7B1113',
                    }}
                  />
                  Our Mission
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666',
                    fontSize: { xs: '0.9rem', md: '0.95rem' },
                    lineHeight: 1.7,
                    pl: 2,
                  }}
                >
                  To deliver responsive, transparent, and efficient barangay services that promote the welfare, safety, and development of our community while upholding the values of integrity, accountability, and public trust.
                </Typography>
              </Box>

              {/* Vision */}
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#228B22',
                    fontWeight: 700,
                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: '#7B1113',
                    }}
                  />
                  Our Vision
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666',
                    fontSize: { xs: '0.9rem', md: '0.95rem' },
                    lineHeight: 1.7,
                    pl: 2,
                  }}
                >
                  A progressive, peaceful, and empowered Barangay U.P. Campus where every resident enjoys quality public services, sustainable development, and an improved quality of life in a clean, orderly, and inclusive community.
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
