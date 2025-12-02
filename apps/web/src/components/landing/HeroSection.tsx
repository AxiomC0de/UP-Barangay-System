'use client';

import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContent = () => {
    const nextSection = document.getElementById('features-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '700px', md: '750px', lg: '800px' },
        minHeight: { xs: '500px', md: '600px' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
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

      {/* Main Content Container */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1200px',
          mx: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: { xs: 8, md: 4 },
          px: { xs: 2, sm: 3, md: 4 },
          gap: { md: 4 },
        }}
      >
        {/* Left Side - Text Content */}
        <Box
          sx={{
            flex: { xs: '1', md: '0 0 50%' },
            textAlign: { xs: 'center', md: 'left' },
            color: 'white',
          }}
        >
            {/* Animated Title */}
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                fontWeight: 700,
                mb: { xs: 2, md: 3 },
                lineHeight: 1.15,
                textShadow: '2px 4px 8px rgba(0,0,0,0.2)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              Welcome to Barangay U.P. Campus
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="h5"
              component="p"
              sx={{
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1.125rem' },
                fontWeight: 400,
                mb: { xs: 3, md: 4 },
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.9)',
                textShadow: '1px 2px 4px rgba(0,0,0,0.2)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s',
              }}
            >
              Serving our community with transparency, efficiency, and dedication. 
              Access barangay services, connect with officials, and stay informed 
              about community updates.
            </Typography>

            {/* Tagline */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                fontStyle: 'italic',
                color: '#FFD700',
                textShadow: '1px 2px 4px rgba(0,0,0,0.3)',
                mb: { xs: 3, md: 4 },
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
              }}
            >
              &ldquo;Malinis, Maaliwalas, Maayos, Maliwanag at Magandang mga Barangay ng Lungsod Quezon&rdquo;
            </Typography>

            {/* CTA Buttons */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              alignItems={{ xs: 'center', md: 'flex-start' }}
              sx={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s',
                position: 'relative',
                zIndex: 10,
              }}
            >
              <Button
                component={Link}
                href="/register"
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: 'white',
                  color: '#228B22',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 600,
                  px: { xs: 4, md: 5 },
                  py: { xs: 1.25, md: 1.5 },
                  borderRadius: 2,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                  '&:hover': {
                    backgroundColor: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Get Started
              </Button>
              <Button
                component={Link}
                href="/login"
                variant="outlined"
                size="large"
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.6)',
                  borderWidth: 2,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 600,
                  px: { xs: 4, md: 5 },
                  py: { xs: 1.25, md: 1.5 },
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  '&:hover': {
                    borderColor: 'white',
                    borderWidth: 2,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign In
              </Button>
            </Stack>
        </Box>

        {/* Right Side - SK Chairman Image */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flex: '0 0 45%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            height: { md: 450, lg: 500 },
          }}
        >
          {/* White Circle - stays same size */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { md: '350px', lg: '430px' },
              height: { md: '350px', lg: '430px' },
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '50%',
              zIndex: 0,
            }}
          />
          {/* SK Chairman Image - scaled up */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              opacity: isVisible ? 1 : 0,
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
              transform: { md: 'scale(5) translateY(60px)', lg: 'scale(3.5) translateY(50px)' },
              zIndex: 1,
            }}
          >
            <Image
              src="/images/chairman.svg"
              alt="Barangay Chairman"
              fill
              sizes="(max-width: 1024px) 300px, 400px"
              style={{
                objectFit: 'contain',
              }}
              priority
            />
          </Box>
        </Box>
      </Box>

      {/* Mobile SK Chairman Image */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'absolute',
          bottom: 120,
          left: '50%',
          transform: 'translateX(-50%)',
          justifyContent: 'center',
          zIndex: 2,
          width: 300,
          height: 300,
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.3s',
        }}
      >
        <Image
          src="/images/chairman.svg"
          alt="Barangay Chairman"
          fill
          sizes="300px"
          style={{
            objectFit: 'contain',
          }}
          priority
        />
      </Box>

      {/* Scroll Indicator */}
      <Box
        onClick={scrollToContent}
        sx={{
          position: 'absolute',
          bottom: { xs: 80, md: 100 },
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          cursor: 'pointer',
          opacity: isVisible ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.8s',
          animation: 'bounce 2s infinite',
          '@keyframes bounce': {
            '0%, 20%, 50%, 80%, 100%': {
              transform: 'translateX(-50%) translateY(0)',
            },
            '40%': {
              transform: 'translateX(-50%) translateY(-10px)',
            },
            '60%': {
              transform: 'translateX(-50%) translateY(-5px)',
            },
          },
        }}
      >
        <KeyboardArrowDownIcon
          sx={{
            fontSize: 40,
            color: 'white',
            opacity: 0.8,
            '&:hover': {
              opacity: 1,
            },
          }}
        />
      </Box>
    </Box>
  );
}
