'use client';

import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { keyframes } from '@emotion/react';
import { Navbar, Footer } from '@/components';

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

// News Categories
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'projects', label: 'Projects' },
  { id: 'health', label: 'Health' },
  { id: 'events', label: 'Events' },
  { id: 'safety', label: 'Safety' },
];

// Sample News Data
const NEWS_ITEMS = [
  {
    id: 1,
    category: 'announcements',
    categoryLabel: 'ANNOUNCEMENTS',
    isUrgent: true,
    title: 'Schedule of Garbage Collection for Holiday Season',
    description: 'Please be advised of the changes in the garbage collection schedule for the upcoming holidays. Segregation is strictly enforced.',
    date: 'Oct 22, 2025',
    readTime: '2 min read',
    color: '#228B22',
    image: null,
  },
  {
    id: 2,
    category: 'projects',
    categoryLabel: 'PROJECTS',
    isUrgent: false,
    title: 'Road Widening Project at Mabini Street to Begin Next Week',
    description: 'The DPWH in coordination with the Barangay Council will start the road widening project. Expect moderate traffic in the area.',
    date: 'Oct 20, 2025',
    readTime: '4 min read',
    color: '#228B22',
    image: null,
  },
  {
    id: 3,
    category: 'events',
    categoryLabel: 'EVENTS',
    isUrgent: false,
    title: 'Inter-Barangay Basketball League Registration Open',
    description: 'Calling all aspiring athletes! Registration for the 2025 Summer League is now open for Juniors and Seniors division.',
    date: 'Oct 18, 2025',
    readTime: '2 min read',
    color: '#228B22',
    image: null,
  },
  {
    id: 4,
    category: 'health',
    categoryLabel: 'HEALTH',
    isUrgent: false,
    title: 'Free Dengue Vaccination at Health Center',
    description: 'The Barangay Health Center is offering free dengue vaccinations for children ages 9-14. Bring immunization records.',
    date: 'Oct 15, 2025',
    readTime: '3 min read',
    color: '#228B22',
    image: null,
  },
  {
    id: 5,
    category: 'safety',
    categoryLabel: 'SAFETY',
    isUrgent: true,
    title: 'Fire Safety Inspection Schedule for Commercial Establishments',
    description: 'All commercial establishments are reminded to prepare documents for the upcoming fire safety inspection by the BFP.',
    date: 'Oct 12, 2025',
    readTime: '3 min read',
    color: '#228B22',
    image: null,
  },
  {
    id: 6,
    category: 'announcements',
    categoryLabel: 'ANNOUNCEMENTS',
    isUrgent: false,
    title: 'Barangay ID Renewal Period Extended',
    description: 'The deadline for barangay ID renewal has been extended until December 31, 2025. Visit the Barangay Hall to renew.',
    date: 'Oct 10, 2025',
    readTime: '2 min read',
    color: '#228B22',
    image: null,
  },
];

// Featured Story
const FEATURED_STORY = {
  id: 0,
  category: 'health',
  categoryLabel: 'Health',
  title: 'Barangay Annual Medical Mission 2025: Free Checkups and Medicines',
  description: 'Join us this coming Saturday at the Multi-purpose Hall for our annual medical mission. We will be offering free dental, optical, and general checkups for all residents.',
  date: 'Oct 24, 2025',
  image: '/images/showcase/community-1.jpg',
};

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');

  // Filter news based on category and search query
  const filteredNews = useMemo(() => {
    return NEWS_ITEMS.filter((news) => {
      const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;
      const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <Box component="main" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 10, md: 12 },
          pb: { xs: 8, md: 10 },
          display: 'flex',
          alignItems: 'center',
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
            backgroundColor: 'rgba(30, 41, 59, 0.92)',
            zIndex: 1,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: { xs: 5, lg: 6 },
              alignItems: { xs: 'flex-start', lg: 'center' },
            }}
          >
            {/* Left Content */}
            <Box sx={{ flex: 1 }}>
              {/* Live Updates Badge */}
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  backgroundColor: '#228B22',
                  color: 'white',
                  px: 2,
                  py: 0.75,
                  borderRadius: 50,
                  mb: 3,
                  animation: `${fadeInUp} 0.6s ease-out`,
                }}
              >
                <FiberManualRecordIcon sx={{ fontSize: 10, animation: `${pulse} 1.5s ease-in-out infinite` }} />
                <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
                  Live Updates
                </Typography>
              </Box>

              {/* Title */}
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                  fontWeight: 700,
                  color: 'white',
                  mb: 2,
                  lineHeight: 1.2,
                  textShadow: '2px 4px 8px rgba(0,0,0,0.3)',
                  animation: `${fadeInUp} 0.6s ease-out 0.1s both`,
                }}
              >
                Barangay News &<br />
                <Box component="span" sx={{ color: '#228B22' }}>Community Alerts</Box>
              </Typography>

              {/* Subtitle */}
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  color: 'rgba(255,255,255,0.8)',
                  mb: 4,
                  maxWidth: 500,
                  lineHeight: 1.7,
                  animation: `${fadeInUp} 0.6s ease-out 0.2s both`,
                }}
              >
                Your official source for barangay projects, upcoming events, emergency advisories, and stories from our vibrant community.
              </Typography>

              {/* CTA Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                  animation: `${fadeInUp} 0.6s ease-out 0.3s both`,
                }}
              >
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    backgroundColor: '#228B22',
                    color: 'white',
                    px: 3,
                    py: 1.5,
                    borderRadius: 50,
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#1a6b1a',
                    },
                  }}
                >
                  Browse Latest News
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255,255,255,0.5)',
                    color: 'white',
                    px: 3,
                    py: 1.5,
                    borderRadius: 50,
                    fontWeight: 600,
                    textTransform: 'none',
                    '&:hover': {
                      borderColor: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  View Archive
                </Button>
              </Box>
            </Box>

            {/* Right Content - Subscribe Card */}
            <Paper
              elevation={0}
              sx={{
                width: { xs: '100%', lg: 360 },
                p: 4,
                borderRadius: 4,
                backgroundColor: 'white',
                animation: `${fadeInUp} 0.6s ease-out 0.4s both`,
              }}
            >
              {/* Notification Icon */}
              <Box
                sx={{
                  position: 'absolute',
                  top: -20,
                  right: 20,
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  backgroundColor: '#228B22',
                  display: { xs: 'none', lg: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 14px rgba(34, 139, 34, 0.3)',
                }}
              >
                <NotificationsActiveIcon sx={{ color: 'white', fontSize: 24 }} />
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>
                Subscribe to Alerts
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.6 }}>
                Get real-time SMS or Email notifications for urgent barangay announcements and disaster alerts.
              </Typography>

              <Typography variant="caption" sx={{ fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', mb: 1 }}>
                Email Address
              </Typography>
              <TextField
                fullWidth
                placeholder="juan@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                sx={{
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: '#f8fafc',
                  },
                }}
              />

              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#1e293b',
                  color: 'white',
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#0f172a',
                  },
                }}
              >
                Subscribe Now
              </Button>

              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 2, textAlign: 'center' }}>
                No spam, just important updates.
              </Typography>
            </Paper>
          </Box>
        </Container>
      </Box>

      {/* Featured Story Section */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 8 },
          backgroundColor: 'white',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
              alignItems: 'stretch',
            }}
          >
            {/* Featured Image */}
            <Box
              sx={{
                flex: { xs: '1', md: '0 0 45%' },
                position: 'relative',
                borderRadius: 4,
                overflow: 'hidden',
                minHeight: { xs: 250, md: 350 },
                backgroundColor: '#228B22',
                backgroundImage: `url(${FEATURED_STORY.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Featured Badge */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: 16,
                  backgroundColor: '#1e293b',
                  color: 'white',
                  px: 2,
                  py: 0.75,
                  borderRadius: 2,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}
              >
                Featured Story
              </Box>
            </Box>

            {/* Featured Content */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                py: { xs: 0, md: 2 },
              }}
            >
              {/* Category & Date */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ color: '#228B22', fontWeight: 600 }}
                >
                  {FEATURED_STORY.categoryLabel}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  •
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {FEATURED_STORY.date}
                </Typography>
              </Box>

              {/* Title */}
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: '#228B22',
                  mb: 2,
                  lineHeight: 1.3,
                }}
              >
                {FEATURED_STORY.title}
              </Typography>

              {/* Description */}
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  mb: 3,
                  lineHeight: 1.7,
                }}
              >
                {FEATURED_STORY.description}
              </Typography>

              {/* Read More Link */}
              <Button
                endIcon={<ArrowForwardIcon />}
                sx={{
                  alignSelf: 'flex-start',
                  color: '#228B22',
                  fontWeight: 600,
                  textTransform: 'none',
                  p: 0,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                  },
                }}
              >
                Read full story
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Filter Bar */}
      <Box
        sx={{
          py: 3,
          backgroundColor: '#f8fafc',
          borderTop: '1px solid',
          borderBottom: '1px solid',
          borderColor: 'grey.200',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              alignItems: { xs: 'stretch', md: 'center' },
              justifyContent: 'space-between',
            }}
          >
            {/* Category Filters */}
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                flexWrap: 'wrap',
              }}
            >
              {CATEGORIES.map((category) => (
                <Chip
                  key={category.id}
                  label={category.label}
                  onClick={() => setSelectedCategory(category.id)}
                  sx={{
                    px: 1,
                    py: 2.25,
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    borderRadius: '50px',
                    border: '2px solid',
                    borderColor: selectedCategory === category.id ? '#228B22' : 'grey.300',
                    backgroundColor: selectedCategory === category.id ? '#228B22' : 'white',
                    color: selectedCategory === category.id ? 'white' : '#1e293b',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: selectedCategory === category.id ? '#1a6b1a' : 'grey.100',
                      borderColor: selectedCategory === category.id ? '#1a6b1a' : 'grey.400',
                    },
                  }}
                />
              ))}
            </Box>

            {/* Search */}
            <TextField
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'grey.400', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: { xs: '100%', md: 250 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'white',
                },
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* News Grid */}
      <Box
        component="section"
        sx={{
          flex: 1,
          py: { xs: 5, md: 7 },
          backgroundColor: '#f8fafc',
        }}
      >
        <Container maxWidth="lg">
          {/* Results Count */}
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', mb: 3 }}
          >
            Showing {filteredNews.length} article{filteredNews.length !== 1 ? 's' : ''}
            {selectedCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === selectedCategory)?.label}`}
            {searchQuery && ` for "${searchQuery}"`}
          </Typography>

          {/* News Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {filteredNews.map((news, index) => (
              <Paper
                key={news.id}
                elevation={0}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'column',
                  animation: `${fadeInUp} 0.5s ease-out ${index * 0.05}s both`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                  },
                }}
              >
                {/* Colored Header */}
                <Box
                  sx={{
                    height: 8,
                    backgroundColor: news.color,
                  }}
                />

                {/* Content */}
                <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Category & Urgent Badge */}
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip
                      label={news.categoryLabel}
                      size="small"
                      sx={{
                        backgroundColor: `${news.color}15`,
                        color: news.color,
                        fontWeight: 700,
                        fontSize: '0.7rem',
                        height: 24,
                      }}
                    />
                    {news.isUrgent && (
                      <Chip
                        label="URGENT"
                        size="small"
                        sx={{
                          backgroundColor: '#DC2626',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.65rem',
                          height: 24,
                        }}
                      />
                    )}
                  </Box>

                  {/* Date & Read Time */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CalendarTodayIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {news.date}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                        {news.readTime}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1rem',
                      mb: 1.5,
                      color: '#1e293b',
                      lineHeight: 1.4,
                    }}
                  >
                    {news.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      flex: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {news.description}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* No Results */}
          {filteredNews.length === 0 && (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
              }}
            >
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                No news found
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Try adjusting your search or filter criteria
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                sx={{
                  mt: 3,
                  borderColor: '#228B22',
                  color: '#228B22',
                  '&:hover': {
                    borderColor: '#1a6b1a',
                    backgroundColor: 'rgba(34, 139, 34, 0.05)',
                  },
                }}
              >
                Clear Filters
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
