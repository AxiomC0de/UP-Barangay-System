'use client';

import { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BusinessIcon from '@mui/icons-material/Business';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import GavelIcon from '@mui/icons-material/Gavel';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
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

// Service Categories
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'documents', label: 'Documents' },
  { id: 'social', label: 'Social Services' },
  { id: 'business', label: 'Business' },
  { id: 'health', label: 'Health' },
  { id: 'legal', label: 'Legal' },
  { id: 'other', label: 'Other' },
];

// Services Data
const SERVICES = [
  {
    id: 1,
    icon: DescriptionIcon,
    category: 'documents',
    categoryLabel: 'DOCUMENTS',
    title: 'Barangay Clearance',
    description: 'Official document certifying your residency and good standing. Often required for employment, postal ID, and bank applications.',
    color: '#228B22',
  },
  {
    id: 2,
    icon: FavoriteIcon,
    category: 'social',
    categoryLabel: 'SOCIAL SERVICES',
    title: 'Certificate of Indigency',
    description: 'Issued to residents with low income seeking financial assistance, scholarships, or medical help from government agencies.',
    color: '#228B22',
  },
  {
    id: 3,
    icon: BusinessIcon,
    category: 'business',
    categoryLabel: 'BUSINESS',
    title: 'Business Clearance',
    description: 'Clearance required for new business registration or renewal of business permits within the barangay jurisdiction.',
    color: '#228B22',
  },
  {
    id: 4,
    icon: DescriptionIcon,
    category: 'documents',
    categoryLabel: 'DOCUMENTS',
    title: 'Certificate of Residency',
    description: 'Official proof of residency within Barangay U.P. Campus, required for school enrollment and government transactions.',
    color: '#228B22',
  },
  {
    id: 5,
    icon: HealthAndSafetyIcon,
    category: 'health',
    categoryLabel: 'HEALTH',
    title: 'Health Center Services',
    description: 'Access barangay health center for medical consultations, vaccinations, prenatal care, and basic health services.',
    color: '#228B22',
  },
  {
    id: 6,
    icon: GavelIcon,
    category: 'legal',
    categoryLabel: 'LEGAL',
    title: 'Barangay Blotter',
    description: 'File incident reports and complaints for proper documentation. Required for police reports and legal proceedings.',
    color: '#228B22',
  },
  {
    id: 7,
    icon: FavoriteIcon,
    category: 'social',
    categoryLabel: 'SOCIAL SERVICES',
    title: 'Senior Citizen ID',
    description: 'Registration and ID issuance for senior citizens (60 years and above) to avail of benefits and discounts.',
    color: '#228B22',
  },
  {
    id: 8,
    icon: BusinessIcon,
    category: 'business',
    categoryLabel: 'BUSINESS',
    title: 'Business Permit Endorsement',
    description: 'Barangay endorsement letter required for business permit applications at the city hall.',
    color: '#228B22',
  },
  {
    id: 9,
    icon: MoreHorizIcon,
    category: 'other',
    categoryLabel: 'OTHER',
    title: 'Community Events',
    description: 'Information about upcoming community events, programs, and activities organized by the barangay.',
    color: '#228B22',
  },
  {
    id: 10,
    icon: HealthAndSafetyIcon,
    category: 'health',
    categoryLabel: 'HEALTH',
    title: 'Medical Assistance',
    description: 'Financial assistance for medical expenses including hospitalization, medicines, and laboratory tests.',
    color: '#228B22',
  },
  {
    id: 11,
    icon: GavelIcon,
    category: 'legal',
    categoryLabel: 'LEGAL',
    title: 'Barangay Mediation',
    description: 'Dispute resolution services for minor conflicts between residents through the Lupong Tagapamayapa.',
    color: '#228B22',
  },
  {
    id: 12,
    icon: FavoriteIcon,
    category: 'social',
    categoryLabel: 'SOCIAL SERVICES',
    title: 'PWD Registration',
    description: 'Registration and ID issuance for persons with disabilities to access government benefits and services.',
    color: '#228B22',
  },
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter services based on category and search query
  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
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
          pt: { xs: 12, md: 14 },
          pb: { xs: 10, md: 12 },
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

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          {/* Hero Content */}
          <Box sx={{ textAlign: 'center', color: 'white', mb: 5 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
                textShadow: '2px 4px 8px rgba(0,0,0,0.3)',
                animation: `${fadeInUp} 0.6s ease-out`,
              }}
            >
              Online Barangay Services
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                color: 'rgba(255,255,255,0.9)',
                maxWidth: 600,
                mx: 'auto',
                textShadow: '1px 2px 4px rgba(0,0,0,0.2)',
                animation: `${fadeInUp} 0.6s ease-out 0.1s both`,
              }}
            >
              Fast, efficient, and transparent public service. Request documents, file complaints, or schedule appointments from the comfort of your home.
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              animation: `${fadeInUp} 0.6s ease-out 0.2s both`,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search for a service (e.g., Clearance, ID, Health)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'grey.400' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: 'white',
                borderRadius: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  py: 0.5,
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: 'grey.300',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#228B22',
                    borderWidth: 2,
                  },
                },
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Category Filters */}
      <Box
        sx={{
          py: 3,
          backgroundColor: 'white',
          borderBottom: '1px solid',
          borderColor: 'grey.100',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {CATEGORIES.map((category) => (
              <Chip
                key={category.id}
                label={category.label}
                onClick={() => setSelectedCategory(category.id)}
                sx={{
                  px: 1.5,
                  py: 2.5,
                  fontSize: '0.9rem',
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
        </Container>
      </Box>

      {/* Services Grid */}
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
            Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
            {selectedCategory !== 'all' && ` in ${CATEGORIES.find(c => c.id === selectedCategory)?.label}`}
            {searchQuery && ` for "${searchQuery}"`}
          </Typography>

          {/* Services Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {filteredServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Paper
                  key={service.id}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    minHeight: 280,
                    animation: `${fadeInUp} 0.5s ease-out ${index * 0.05}s both`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                      borderColor: service.color,
                      '& .service-icon': {
                        transform: 'scale(1.1)',
                      },
                      '& .view-link': {
                        color: service.color,
                      },
                    },
                  }}
                >
                  {/* Header Row */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2.5 }}>
                    {/* Icon */}
                    <Box
                      className="service-icon"
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: 2.5,
                        backgroundColor: `${service.color}12`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'transform 0.3s ease',
                      }}
                    >
                      <IconComponent sx={{ fontSize: 26, color: service.color }} />
                    </Box>
                    {/* Category Label */}
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 700,
                        letterSpacing: 0.5,
                        color: 'text.secondary',
                        fontSize: '0.7rem',
                      }}
                    >
                      {service.categoryLabel}
                    </Typography>
                  </Box>

                  {/* Title */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      mb: 1.5,
                      color: '#1e293b',
                    }}
                  >
                    {service.title}
                  </Typography>

                  {/* Description */}
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.7,
                      mb: 3,
                      flex: 1,
                    }}
                  >
                    {service.description}
                  </Typography>

                  {/* View Requirements Link */}
                  <Button
                    className="view-link"
                    endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
                    sx={{
                      justifyContent: 'flex-start',
                      p: 0,
                      color: '#228B22',
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    View Requirements
                  </Button>
                </Paper>
              );
            })}
          </Box>

          {/* No Results */}
          {filteredServices.length === 0 && (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
              }}
            >
              <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
                No services found
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

      {/* Need Help CTA */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 8 },
          backgroundColor: 'white',
          borderTop: '1px solid',
          borderColor: 'grey.100',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: '#1e293b',
              }}
            >
              Need Assistance?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 4,
                fontSize: '1.1rem',
              }}
            >
              Visit the Barangay Hall or contact us for inquiries about any of our services.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 3,
                justifyContent: 'center',
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  px: 4,
                  py: 3,
                  borderRadius: 3,
                  backgroundColor: '#f8fafc',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  textAlign: 'center',
                  minWidth: 200,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  },
                }}
              >
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Call us at
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#228B22' }}>
                  (02) 8981-8500
                </Typography>
              </Paper>
              <Paper
                elevation={0}
                sx={{
                  px: 4,
                  py: 3,
                  borderRadius: 3,
                  backgroundColor: '#f8fafc',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  textAlign: 'center',
                  minWidth: 200,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  },
                }}
              >
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                  Office Hours
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#228B22' }}>
                  Mon-Fri, 8AM-5PM
                </Typography>
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
