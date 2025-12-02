'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import Image from 'next/image';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Quick Links data
const QUICK_LINKS = [
  { label: 'Sign In', href: '/login' },
  { label: 'Register', href: '/register' },
  { label: 'About Us', href: '/about' },
  { label: 'Privacy Policy', href: '/privacy' },
];

// Contact info
const CONTACT_INFO = {
  email: 'barangay.upcampus@gmail.com',
  phone: '(+63) 995 721 9867',
  address: 'U.P. Campus, Diliman, QC',
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      {/* Green top border */}
      <Box
        sx={{
          height: { xs: '4px', md: '6px' },
          bgcolor: '#228B22',
          width: '100%',
        }}
      />

      {/* Background Image with Overlay */}
      <Box
        sx={{
          position: 'relative',
          backgroundImage: 'url(/images/footer_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 29%',
          backgroundRepeat: 'no-repeat',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(30, 41, 59, 0.82)', // Dark blue-gray overlay (reduced opacity)
            zIndex: 1,
          },
        }}
      >
        {/* Main Footer Content */}
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 2,
            py: { xs: 4, sm: 5, md: 6 },
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Grid container spacing={{ xs: 4, md: 6 }}>
            {/* Logo & Description Column */}
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                {/* Logo and Title */}
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: { xs: 50, md: 60 },
                      height: { xs: 50, md: 60 },
                      flexShrink: 0,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      border: '2px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    <Image
                      src="/images/logo.jpg"
                      alt="Barangay U.P. Campus Logo"
                      fill
                      sizes="60px"
                      style={{
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '1.125rem', md: '1.25rem' },
                      color: '#4ADE80', // Green color for the title
                    }}
                  >
                    Barangay U.P. Campus
                  </Typography>
                </Stack>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: { xs: '0.8125rem', md: '0.875rem' },
                    lineHeight: 1.7,
                    maxWidth: { xs: '100%', md: '320px' },
                  }}
                >
                  Your digital bridge to community services in Barangay U.P. Campus. 
                  Building a stronger, more connected community together.
                </Typography>
              </Stack>
            </Grid>

            {/* Quick Links Column */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  mb: { xs: 2, md: 2.5 },
                  color: 'white',
                }}
              >
                Quick Links
              </Typography>
              <Stack spacing={{ xs: 1, md: 1.5 }}>
                {QUICK_LINKS.map((link) => (
                  <Typography
                    key={link.label}
                    component={Link}
                    href={link.href}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.75)',
                      fontSize: { xs: '0.8125rem', md: '0.875rem' },
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        color: '#4ADE80',
                      },
                      width: 'fit-content',
                    }}
                  >
                    {link.label}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            {/* Connect With Us Column */}
            <Grid item xs={12} sm={6} md={4}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: 600,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  mb: { xs: 2, md: 2.5 },
                  color: 'white',
                }}
              >
                Connect With Us
              </Typography>
              <Stack spacing={{ xs: 1.5, md: 2 }}>
                {/* Email */}
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <EmailIcon
                    sx={{
                      fontSize: { xs: 18, md: 20 },
                      color: 'rgba(255, 255, 255, 0.6)',
                    }}
                  />
                  <Typography
                    component="a"
                    href={`mailto:${CONTACT_INFO.email}`}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: { xs: '0.8125rem', md: '0.875rem' },
                      textDecoration: 'none',
                      '&:hover': {
                        color: '#4ADE80',
                      },
                    }}
                  >
                    {CONTACT_INFO.email}
                  </Typography>
                </Stack>

                {/* Phone */}
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <PhoneIcon
                    sx={{
                      fontSize: { xs: 18, md: 20 },
                      color: 'rgba(255, 255, 255, 0.6)',
                    }}
                  />
                  <Typography
                    component="a"
                    href={`tel:${CONTACT_INFO.phone.replace(/[^0-9]/g, '')}`}
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: { xs: '0.8125rem', md: '0.875rem' },
                      textDecoration: 'none',
                      '&:hover': {
                        color: '#4ADE80',
                      },
                    }}
                  >
                    {CONTACT_INFO.phone}
                  </Typography>
                </Stack>

                {/* Address */}
                <Stack direction="row" alignItems="flex-start" spacing={1.5}>
                  <LocationOnIcon
                    sx={{
                      fontSize: { xs: 18, md: 20 },
                      color: 'rgba(255, 255, 255, 0.6)',
                      mt: 0.25,
                    }}
                  />
                  <Typography
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      fontSize: { xs: '0.8125rem', md: '0.875rem' },
                    }}
                  >
                    {CONTACT_INFO.address}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>

          {/* Divider */}
          <Divider
            sx={{
              my: { xs: 3, md: 4 },
              borderColor: 'rgba(255, 255, 255, 0.15)',
            }}
          />

          {/* Bottom Copyright Section */}
          <Box
            sx={{
              textAlign: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: { xs: '0.75rem', md: '0.8125rem' },
                mb: 0.75,
              }}
            >
              © {currentYear} Barangay U.P. Campus. All rights reserved.
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: '#4ADE80',
                fontSize: { xs: '0.6875rem', md: '0.75rem' },
                fontStyle: 'italic',
              }}
            >
              Serving the community with integrity and dedication.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
