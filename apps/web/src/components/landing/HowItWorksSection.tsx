'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

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

export default function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 8, sm: 10, md: 12 },
        backgroundColor: 'white',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 7 },
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease-out',
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
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.6s ease-out ${index * 0.2}s`,
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
                      backgroundColor: isVisible ? '#228B22' : 'grey.200',
                      transition: `all 0.6s ease-out ${(index + 1) * 0.2}s`,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '100%',
                        width: '100%',
                        height: '100%',
                        backgroundColor: isVisible ? '#228B22' : 'grey.200',
                        transition: `all 0.6s ease-out ${(index + 1) * 0.2}s`,
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
  );
}
