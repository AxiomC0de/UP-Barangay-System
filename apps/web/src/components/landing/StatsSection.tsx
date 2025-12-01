'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PeopleIcon from '@mui/icons-material/People';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import VerifiedIcon from '@mui/icons-material/Verified';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const STATS = [
  {
    icon: LocationCityIcon,
    value: 18,
    label: 'Districts',
    suffix: '',
  },
  {
    icon: PeopleIcon,
    value: 10000,
    label: 'Residents',
    suffix: '+',
  },
  {
    icon: VerifiedIcon,
    value: 30,
    label: 'Years of Service',
    suffix: '+',
  },
  {
    icon: SupportAgentIcon,
    value: 24,
    label: 'Hour Support',
    suffix: '/7',
  },
];

// Animated counter hook
function useCounter(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

function StatItem({ icon: Icon, value, label, suffix, isVisible }: {
  icon: typeof PeopleIcon;
  value: number;
  label: string;
  suffix: string;
  isVisible: boolean;
}) {
  const count = useCounter(value, 2000, isVisible);

  return (
    <Stack
      alignItems="center"
      spacing={1}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.6s ease-out',
      }}
    >
      <Icon
        sx={{
          fontSize: { xs: 36, md: 44 },
          color: '#228B22',
          mb: 0.5,
        }}
      />
      <Typography
        variant="h3"
        component="div"
        sx={{
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
          fontWeight: 700,
          color: 'text.primary',
          lineHeight: 1,
        }}
      >
        {count.toLocaleString()}{suffix}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: '0.8125rem', md: '0.9375rem' },
          color: 'text.secondary',
          fontWeight: 500,
          textAlign: 'center',
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
}

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      id="stats-section"
      ref={sectionRef}
      sx={{
        py: { xs: 6, sm: 8, md: 10 },
        backgroundColor: 'white',
        borderBottom: '1px solid',
        borderColor: 'grey.100',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-around"
          alignItems="center"
          spacing={{ xs: 4, sm: 2, md: 4 }}
          sx={{
            flexWrap: 'wrap',
          }}
        >
          {STATS.map((stat, index) => (
            <Box
              key={stat.label}
              sx={{
                flex: { xs: '1 1 50%', sm: '1 1 25%' },
                maxWidth: { xs: '50%', sm: '25%' },
                transitionDelay: `${index * 0.1}s`,
              }}
            >
              <StatItem {...stat} isVisible={isVisible} />
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
