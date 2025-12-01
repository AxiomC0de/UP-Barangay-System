'use client';

import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { keyframes } from '@emotion/react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const scaleIn = keyframes`
  from { 
    opacity: 0; 
    transform: scale(1.1); 
  }
  to { 
    opacity: 1; 
    transform: scale(1); 
  }
`;

// Showcase data - beautiful spots in and around UP Campus
const SHOWCASE_ITEMS = [
  {
    id: 1,
    image: '/images/showcase/sunken_garden.png',
    title: 'UP Sunken Garden',
    description: 'The heart of UP Diliman, a sprawling green space perfect for picnics, concerts, and community gatherings.',
    location: 'Central Campus',
  },
  {
    id: 2,
    image: '/images/showcase/oblation.png',
    title: 'The Oblation',
    description: 'The iconic symbol of UP, representing selfless offering of oneself to the country.',
    location: 'University Avenue',
  },
  {
    id: 3,
    image: '/images/showcase/acacia_lane.png',
    title: 'Acacia Lane',
    description: 'Tree-lined paths offering shade and serenity, a favorite jogging and biking route for residents.',
    location: 'Academic Oval',
  },
  {
    id: 4,
    image: '/images/showcase/lagoon.png',
    title: 'UP Lagoon',
    description: 'A peaceful retreat where students and residents gather to unwind by the water.',
    location: 'Near AS Building',
  },
  {
    id: 5,
    image: '/images/showcase/university_ave.png',
    title: 'University Avenue',
    description: 'The main thoroughfare lined with historic buildings and lush greenery.',
    location: 'Main Entrance',
  },
];

// Gallery grid items
const GALLERY_ITEMS = [
  {
    image: '/images/showcase/community1.png',
    title: 'Community Events',
    span: 'large',
  },
  {
    image: '/images/showcase/nature1.png',
    title: 'Natural Beauty',
    span: 'small',
  },
  {
    image: '/images/showcase/culture1.png',
    title: 'Rich Culture',
    span: 'small',
  },
  {
    image: '/images/showcase/heritage1.png',
    title: 'Historic Heritage',
    span: 'medium',
  },
  {
    image: '/images/showcase/lifestyle1.png',
    title: 'Campus Life',
    span: 'medium',
  },
];

export default function CommunityShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection observer for scroll animations
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

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + SHOWCASE_ITEMS.length) % SHOWCASE_ITEMS.length);
  };

  return (
    <Box ref={sectionRef}>
      {/* Hero Carousel Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '500px', sm: '600px', md: '700px' },
          overflow: 'hidden',
          backgroundColor: '#1a1a1a',
        }}
      >
        {/* Slides */}
        {SHOWCASE_ITEMS.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: currentSlide === index ? 1 : 0,
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
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                animation: currentSlide === index ? `${scaleIn} 6s ease-out forwards` : 'none',
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
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
              }}
            />

            {/* Content */}
            <Container
              maxWidth="lg"
              sx={{
                position: 'relative',
                zIndex: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                pb: { xs: 10, md: 12 },
              }}
            >
              <Box
                sx={{
                  maxWidth: '700px',
                  opacity: currentSlide === index ? 1 : 0,
                  transform: currentSlide === index ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s ease-out 0.3s',
                }}
              >
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 0.5,
                    backgroundColor: 'rgba(34, 139, 34, 0.9)',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: 5,
                    mb: 2,
                  }}
                >
                  <LocationOnIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                    {item.location}
                  </Typography>
                </Box>
                
                <Typography
                  variant="h2"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                    mb: 2,
                    textShadow: '2px 4px 20px rgba(0,0,0,0.4)',
                    lineHeight: 1.2,
                  }}
                >
                  {item.title}
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    maxWidth: '550px',
                    lineHeight: 1.7,
                    textShadow: '1px 2px 10px rgba(0,0,0,0.3)',
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            </Container>
          </Box>
        ))}

        {/* Navigation Arrows */}
        <IconButton
          onClick={prevSlide}
          sx={{
            position: 'absolute',
            left: { xs: 10, md: 30 },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            color: 'white',
            backgroundColor: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            width: { xs: 44, md: 56 },
            height: { xs: 44, md: 56 },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.25)',
              transform: 'translateY(-50%) scale(1.1)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: { xs: 18, md: 22 } }} />
        </IconButton>
        
        <IconButton
          onClick={nextSlide}
          sx={{
            position: 'absolute',
            right: { xs: 10, md: 30 },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            color: 'white',
            backgroundColor: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            width: { xs: 44, md: 56 },
            height: { xs: 44, md: 56 },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.25)',
              transform: 'translateY(-50%) scale(1.1)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <ArrowForwardIosIcon sx={{ fontSize: { xs: 18, md: 22 } }} />
        </IconButton>

        {/* Slide Indicators */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            gap: 1.5,
          }}
        >
          {SHOWCASE_ITEMS.map((_, index) => (
            <Box
              key={index}
              onClick={() => {
                setIsAutoPlaying(false);
                setCurrentSlide(index);
              }}
              sx={{
                width: currentSlide === index ? 32 : 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: currentSlide === index ? '#228B22' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
                '&:hover': {
                  backgroundColor: currentSlide === index ? '#228B22' : 'rgba(255,255,255,0.8)',
                },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Section Title */}
      <Box
        sx={{
          py: { xs: 6, md: 8 },
          backgroundColor: '#f8f9fa',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{
              color: '#228B22',
              fontWeight: 600,
              fontSize: '0.875rem',
              letterSpacing: 2,
              mb: 1,
              display: 'block',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out',
            }}
          >
            DISCOVER
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              color: 'text.primary',
              mb: 2,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.1s',
            }}
          >
            Life in Barangay U.P. Campus
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '650px',
              mx: 'auto',
              fontSize: { xs: '0.95rem', md: '1.1rem' },
              lineHeight: 1.8,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s ease-out 0.2s',
            }}
          >
            Experience the unique blend of academic excellence, natural beauty, and vibrant community 
            life that makes our barangay truly special.
          </Typography>
        </Container>
      </Box>

      {/* Bento Grid Gallery */}
      <Box
        sx={{
          py: { xs: 4, md: 6 },
          px: { xs: 2, md: 4 },
          backgroundColor: '#f8f9fa',
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gridTemplateRows: {
                xs: 'auto',
                md: 'repeat(2, 250px)',
              },
              gap: { xs: 2, md: 3 },
            }}
          >
            {/* Large featured card */}
            <Box
              sx={{
                gridColumn: { xs: '1', sm: '1 / 2', md: '1 / 3' },
                gridRow: { xs: 'auto', md: '1 / 3' },
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                minHeight: { xs: 300, sm: 350, md: 'auto' },
                cursor: 'pointer',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.6s ease-out 0.3s',
                '&:hover': {
                  '& .overlay': {
                    backgroundColor: 'rgba(34, 139, 34, 0.7)',
                  },
                  '& .content': {
                    transform: 'translateY(0)',
                  },
                  '& img': {
                    transform: 'scale(1.1)',
                  },
                },
              }}
            >
              <Box
                component="img"
                src="/images/showcase/community1.png"
                alt="Community Events"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.6s ease',
                }}
              />
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                  transition: 'background-color 0.4s ease',
                }}
              />
              <Box
                className="content"
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: { xs: 3, md: 4 },
                  transform: 'translateY(10px)',
                  transition: 'transform 0.4s ease',
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: '#90EE90',
                    fontWeight: 600,
                    letterSpacing: 2,
                    fontSize: '0.75rem',
                  }}
                >
                  FEATURED
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: 'white',
                    fontWeight: 700,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                    mb: 1,
                  }}
                >
                  Vibrant Community Life
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: { xs: '0.875rem', md: '1rem' },
                    maxWidth: '400px',
                  }}
                >
                  From cultural festivals to sports events, our community comes together to celebrate life.
                </Typography>
              </Box>
            </Box>

            {/* Smaller cards */}
            {[
              { 
                image: '/images/showcase/nature1.png', 
                title: 'Natural Oasis', 
                subtitle: 'Green Spaces',
                delay: '0.4s',
              },
              { 
                image: '/images/showcase/culture1.png', 
                title: 'Rich Heritage', 
                subtitle: 'Arts & Culture',
                delay: '0.5s',
              },
              { 
                image: '/images/showcase/heritage1.png', 
                title: 'Historic Legacy', 
                subtitle: 'Since 1975',
                delay: '0.6s',
              },
              { 
                image: '/images/showcase/lifestyle1.png', 
                title: 'Campus Living', 
                subtitle: 'Modern Lifestyle',
                delay: '0.7s',
              },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden',
                  minHeight: { xs: 200, sm: 220 },
                  cursor: 'pointer',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.6s ease-out ${item.delay}`,
                  '&:hover': {
                    '& .card-overlay': {
                      backgroundColor: 'rgba(123, 17, 19, 0.7)',
                    },
                    '& img': {
                      transform: 'scale(1.15)',
                    },
                    '& .card-content': {
                      transform: 'translateY(-5px)',
                    },
                  },
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                />
                <Box
                  className="card-overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
                    transition: 'background-color 0.4s ease',
                  }}
                />
                <Box
                  className="card-content"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: { xs: 2, md: 2.5 },
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      fontWeight: 500,
                      letterSpacing: 1,
                      textTransform: 'uppercase',
                      fontSize: '0.65rem',
                    }}
                  >
                    {item.subtitle}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      fontSize: { xs: '1rem', md: '1.1rem' },
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Stats Bar with Background */}
      <Box
        sx={{
          position: 'relative',
          py: { xs: 8, md: 10 },
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
            backgroundImage: 'url(/images/showcase/aerial_campus.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: { xs: 'scroll', md: 'fixed' },
          }}
        />
        
        {/* Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(30, 41, 59, 0.9)',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: { xs: 4, md: 6 },
              textAlign: 'center',
            }}
          >
            {[
              { value: '493', label: 'Hectares', suffix: '' },
              { value: '47,127', label: 'Residents', suffix: '' },
              { value: '16', label: 'Pooks', suffix: '' },
              { value: '50', label: 'Years of Service', suffix: '+' },
            ].map((stat, index) => (
              <Box
                key={index}
                sx={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${0.2 + index * 0.1}s`,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: '#228B22',
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                    lineHeight: 1,
                    mb: 1,
                  }}
                >
                  {stat.value}{stat.suffix}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'rgba(255,255,255,0.85)',
                    fontWeight: 500,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
