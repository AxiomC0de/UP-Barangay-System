'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventIcon from '@mui/icons-material/Event';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CampaignIcon from '@mui/icons-material/Campaign';
import InfoIcon from '@mui/icons-material/Info';

const SAMPLE_ANNOUNCEMENTS = [
  {
    id: 1,
    title: 'Community Clean-Up Drive This Saturday',
    excerpt: 'Join us for our monthly barangay-wide clean-up drive. Meet at the barangay hall at 7:00 AM.',
    category: 'event',
    date: 'Dec 28, 2025',
    isNew: true,
  },
  {
    id: 2,
    title: 'Water Service Interruption Notice',
    excerpt: 'Scheduled maintenance will affect Districts 1-5. Please store water for affected period.',
    category: 'alert',
    date: 'Dec 26, 2025',
    isNew: true,
  },
  {
    id: 3,
    title: 'New Online Services Now Available',
    excerpt: 'Request barangay clearances and certificates online through our new portal.',
    category: 'general',
    date: 'Dec 24, 2025',
    isNew: false,
  },
  {
    id: 4,
    title: 'Holiday Schedule Announcement',
    excerpt: 'Barangay office will be closed Dec 25-26 and Jan 1. Emergency hotline remains active.',
    category: 'info',
    date: 'Dec 22, 2025',
    isNew: false,
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'event':
      return <EventIcon sx={{ fontSize: 18 }} />;
    case 'alert':
      return <WarningAmberIcon sx={{ fontSize: 18 }} />;
    case 'general':
      return <CampaignIcon sx={{ fontSize: 18 }} />;
    case 'info':
    default:
      return <InfoIcon sx={{ fontSize: 18 }} />;
  }
};

const getCategoryColor = (category: string): 'success' | 'error' | 'primary' | 'info' => {
  switch (category) {
    case 'event':
      return 'success';
    case 'alert':
      return 'error';
    case 'general':
      return 'primary';
    case 'info':
    default:
      return 'info';
  }
};

export default function AnnouncementsPreview() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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
        backgroundColor: 'grey.50',
      }}
    >
      <Container maxWidth="lg">
        {/* Section Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 5, md: 6 },
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
            STAY INFORMED
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
            Latest Announcements
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
            Never miss important updates from your barangay. Stay connected with the latest news and events.
          </Typography>
        </Box>

        {/* Announcements Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
            },
            gap: 3,
            mb: 5,
          }}
        >
          {SAMPLE_ANNOUNCEMENTS.map((announcement, index) => (
            <Card
              key={announcement.id}
              sx={{
                height: '100%',
                borderRadius: 3,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${index * 0.1}s`,
                '&:hover': {
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" alignItems="center" spacing={1} mb={2}>
                  <Chip
                    icon={getCategoryIcon(announcement.category)}
                    label={announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                    color={getCategoryColor(announcement.category)}
                    size="small"
                    sx={{
                      fontWeight: 500,
                      textTransform: 'capitalize',
                    }}
                  />
                  {announcement.isNew && (
                    <Chip
                      label="New"
                      size="small"
                      sx={{
                        backgroundColor: '#7B1113',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.6875rem',
                      }}
                    />
                  )}
                </Stack>

                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '1rem', md: '1.0625rem' },
                    mb: 1,
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {announcement.title}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 2,
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {announcement.excerpt}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.disabled"
                  sx={{ fontWeight: 500 }}
                >
                  {announcement.date}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* View All Button */}
        <Box
          sx={{
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.6s ease-out 0.5s',
          }}
        >
          <Button
            variant="outlined"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderColor: '#228B22',
              color: '#228B22',
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              '&:hover': {
                borderColor: '#228B22',
                backgroundColor: 'rgba(34, 139, 34, 0.04)',
              },
            }}
          >
            View All Announcements
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
