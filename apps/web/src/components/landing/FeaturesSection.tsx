'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';

const FEATURES = [
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

export default function FeaturesSection() {
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
            OUR SERVICES
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

        {/* Feature Cards Grid */}
        <Grid container spacing={{ xs: 2.5, sm: 3, md: 4 }}>
          {FEATURES.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Grid item xs={12} sm={6} md={4} key={feature.title}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                    transition: `all 0.6s ease-out ${index * 0.1}s`,
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
                      '& .feature-icon': {
                        transform: 'scale(1.1)',
                      },
                      '& .feature-title': {
                        color: feature.color,
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
                      className="feature-icon"
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: `${feature.color}15`,
                        mb: 2.5,
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <IconComponent
                        sx={{
                          fontSize: 32,
                          color: feature.color,
                        }}
                      />
                    </Box>
                    <Typography
                      className="feature-title"
                      variant="h6"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: '1.0625rem', md: '1.125rem' },
                        mb: 1.5,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {feature.title}
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
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
