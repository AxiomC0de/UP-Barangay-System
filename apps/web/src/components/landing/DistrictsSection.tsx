'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Barangay Captain (2023-2028): Hon. Lawrence V. Mappala
// Total Population: 47,127 (2020 Census)
// Land Area: 493 hectares (4.93 km²)

interface AreaData {
  id: number;
  name: string;
  localName: string; // Pook name
  description: string;
  sector: 'Northern' | 'Southern';
  landmarks: string[];
  status: 'active' | 'inactive';
}

// Barangay UP Campus is divided into areas (locally known as "Pook")
// The barangay spans 493 hectares with the UP Sunken Garden as the dividing point
// Northern Sector: Areas north of Sunken Garden
// Southern Sector: Areas south of Sunken Garden
const AREAS: AreaData[] = [
  { id: 1, name: 'Area 1', localName: 'Pook Amorsolo', description: 'Near C.P. Garcia Ave., University Avenue Area', sector: 'Northern', landmarks: ['Barangay Hall (Amorsolo Civic Complex)', 'C.P. Garcia Avenue', 'University Avenue'], status: 'active' },
  { id: 2, name: 'Area 2', localName: 'Pook Ricarte', description: 'Near UP Arboretum and Science Complex', sector: 'Northern', landmarks: ['UP Arboretum', 'National Institute of Physics', 'Marine Science Institute'], status: 'active' },
  { id: 3, name: 'Area 3', localName: 'Pook Aguinaldo', description: 'Engineering and Science Area', sector: 'Northern', landmarks: ['Melchor Hall', 'UP Alumni Engineers Centennial Hall', 'Institute of Mathematics'], status: 'active' },
  { id: 4, name: 'Area 4', localName: 'Pook Mabini', description: 'Near Katipunan Avenue and Academic Oval', sector: 'Northern', landmarks: ['Katipunan Avenue', 'UP Oval', 'College of Law'], status: 'active' },
  { id: 5, name: 'Area 5', localName: 'Pook Palma', description: 'AS Complex and Palma Hall Vicinity', sector: 'Northern', landmarks: ['Palma Hall (AS Building)', 'Lagoon', 'Vargas Museum'], status: 'active' },
  { id: 6, name: 'Area 6', localName: 'Pook Del Pilar', description: 'Near Shopping Center and Vinzons Hall', sector: 'Northern', landmarks: ['UP Shopping Center', 'Vinzons Hall', 'Ang Bahay ng Alumni'], status: 'active' },
  { id: 7, name: 'Area 7', localName: 'Pook Bonifacio', description: 'Near UPIS and CHE', sector: 'Northern', landmarks: ['UP Integrated School', 'College of Home Economics', 'UP Film Institute'], status: 'active' },
  { id: 8, name: 'Area 8', localName: 'Pook Jacinto', description: 'Central Campus Area', sector: 'Northern', landmarks: ['Quezon Hall', 'University Library', 'Carillon'], status: 'active' },
  { id: 9, name: 'Area 9', localName: 'Pook Luna', description: 'Near UP Health Service', sector: 'Southern', landmarks: ['UP Health Service', 'College of Music', 'Abelardo Hall'], status: 'active' },
  { id: 10, name: 'Area 10', localName: 'Pook Silang', description: 'Sunken Garden Vicinity', sector: 'Southern', landmarks: ['Sunken Garden', 'UP Diliman Amphitheater', 'University Theater'], status: 'active' },
  { id: 11, name: 'Area 11', localName: 'Pook Malvar', description: 'College of Fine Arts Area', sector: 'Southern', landmarks: ['College of Fine Arts', 'Jorge B. Vargas Museum', 'College of Architecture'], status: 'active' },
  { id: 12, name: 'Area 12', localName: 'Pook Plaridel', description: 'CMC and Mass Communication Area', sector: 'Southern', landmarks: ['College of Mass Communication', 'Plaridel Hall', 'UP Press'], status: 'active' },
  { id: 13, name: 'Area 13', localName: 'Pook Dagohoy', description: 'Residential Area near Balara', sector: 'Southern', landmarks: ['Pook Dagohoy Chapel', 'Community Center', 'Barangay Outpost'], status: 'active' },
  { id: 14, name: 'Area 14', localName: 'Pook Palaris', description: 'Residential Community', sector: 'Southern', landmarks: ['Pook Palaris Multi-Purpose Hall', 'Basketball Court', 'Health Center'], status: 'active' },
  { id: 15, name: 'Area 15', localName: 'Pook Lapu-Lapu', description: 'Faculty and Staff Housing', sector: 'Southern', landmarks: ['Faculty Housing', 'Tennis Courts', 'Community Park'], status: 'active' },
  { id: 16, name: 'Area 16', localName: 'Pook Burgos', description: 'Near Commonwealth Avenue', sector: 'Southern', landmarks: ['Commonwealth Avenue Gate', 'NIGS', 'College of Social Work'], status: 'active' },
  { id: 17, name: 'Area 17', localName: 'Pook Magdiwang', description: 'Eastern Residential Area', sector: 'Southern', landmarks: ['Community Chapel', 'Day Care Center', 'Covered Court'], status: 'active' },
  { id: 18, name: 'Area 18', localName: 'Pook Katipunan', description: 'Near Balara Filters and East Border', sector: 'Southern', landmarks: ['Balara Filters', 'UP Gate (Katipunan)', 'Commercial Strip'], status: 'active' },
];

export default function AreasSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedArea, setSelectedArea] = useState<AreaData>(AREAS[0]);
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredAreas = AREAS.filter((area) =>
    area.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.localName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    area.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      ref={sectionRef}
      sx={{
        py: { xs: 8, sm: 10, md: 12 },
        backgroundColor: '#f8fafc',
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(34, 139, 34, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(123, 17, 19, 0.03) 0%, transparent 50%)',
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
            OUR JURISDICTION
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
            18 Areas, One Community
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
            Explore our diverse puroks. Click on an area below to view local leadership,
            demographics, and key landmarks.
          </Typography>
        </Box>

        {/* Main Content - Two Column Layout */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s ease-out 0.2s',
          }}
        >
          {/* Left Panel - Area List */}
          <Paper
            elevation={0}
            sx={{
              flex: { xs: '1', md: '0 0 280px' },
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'grey.200',
              overflow: 'hidden',
              backgroundColor: 'white',
            }}
          >
            {/* Search Box */}
            <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'grey.100' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search Area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'grey.400', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: 'grey.50',
                    '& fieldset': {
                      borderColor: 'grey.200',
                    },
                    '&:hover fieldset': {
                      borderColor: 'grey.300',
                    },
                  },
                }}
              />
            </Box>

            {/* Area List */}
            <List
              sx={{
                py: 0,
                maxHeight: { xs: 250, md: 400 },
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'grey.100',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'grey.300',
                  borderRadius: '3px',
                },
              }}
            >
              {filteredAreas.map((area, index) => (
                <Box key={area.id}>
                  <ListItemButton
                    selected={selectedArea.id === area.id}
                    onClick={() => setSelectedArea(area)}
                    sx={{
                      py: 1.5,
                      px: 2,
                      '&.Mui-selected': {
                        backgroundColor: 'primary.50',
                        borderLeft: '3px solid',
                        borderLeftColor: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'primary.50',
                        },
                      },
                      '&:hover': {
                        backgroundColor: 'grey.50',
                      },
                    }}
                  >
                    <ListItemText
                      primary={area.name}
                      secondary={area.localName}
                      primaryTypographyProps={{
                        fontWeight: selectedArea.id === area.id ? 600 : 500,
                        fontSize: '0.9375rem',
                        color: selectedArea.id === area.id ? 'primary.main' : 'text.primary',
                      }}
                      secondaryTypographyProps={{
                        fontSize: '0.75rem',
                        color: 'text.secondary',
                      }}
                    />
                    <ChevronRightIcon
                      sx={{
                        fontSize: 20,
                        color: selectedArea.id === area.id ? 'primary.main' : 'grey.400',
                      }}
                    />
                  </ListItemButton>
                  {index < filteredAreas.length - 1 && (
                    <Divider sx={{ mx: 2 }} />
                  )}
                </Box>
              ))}
            </List>
          </Paper>

          {/* Right Panel - Area Details */}
          <Paper
            elevation={0}
            sx={{
              flex: 1,
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'grey.200',
              p: { xs: 3, md: 4 },
              backgroundColor: 'white',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Status Badge & Icon */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Chip
                label={selectedArea.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
                size="small"
                sx={{
                  backgroundColor: selectedArea.status === 'active' ? '#dcfce7' : 'grey.100',
                  color: selectedArea.status === 'active' ? '#16a34a' : 'grey.600',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  letterSpacing: 0.5,
                }}
              />
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  backgroundColor: 'primary.50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <GroupsIcon sx={{ color: 'primary.main', fontSize: 28 }} />
              </Box>
            </Box>

            {/* Area Name & Location */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                mb: 0.5,
                color: 'text.primary',
              }}
            >
              {selectedArea.name}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'primary.main',
                fontWeight: 500,
                mb: 1,
              }}
            >
              {selectedArea.localName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 3 }}>
              <LocationOnIcon sx={{ fontSize: 18, color: '#ef4444' }} />
              <Typography variant="body2" color="text.secondary">
                {selectedArea.description}
              </Typography>
            </Box>

            {/* Barangay Captain & Sector Info */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                mb: 3,
                p: 2,
                backgroundColor: 'grey.50',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.100',
              }}
            >
              {/* Barangay Captain */}
              <Box sx={{ flex: 1, borderRight: { sm: '1px solid' }, borderColor: { sm: 'grey.200' }, pr: { sm: 2 } }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    letterSpacing: 1,
                    display: 'block',
                    mb: 0.5,
                  }}
                >
                  BARANGAY CAPTAIN
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      backgroundColor: 'grey.200',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <PersonIcon sx={{ fontSize: 20, color: 'grey.500' }} />
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      Hon. Lawrence V. Mappala
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'primary.main' }}>
                      Term: 2023-2028
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Sector & Barangay Info */}
              <Box sx={{ flex: 1 }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                    letterSpacing: 1,
                    display: 'block',
                    mb: 0.5,
                  }}
                >
                  BARANGAY INFO
                </Typography>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {selectedArea.sector}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Sector
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      47,127
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Total Population
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Key Landmarks */}
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  mb: 1.5,
                  color: 'text.primary',
                }}
              >
                Key Landmarks & Highlights
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedArea.landmarks.map((landmark, index) => (
                  <Chip
                    key={index}
                    label={landmark}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: 'grey.300',
                      color: 'text.secondary',
                      fontSize: '0.8125rem',
                      '&:hover': {
                        borderColor: 'primary.main',
                        backgroundColor: 'primary.50',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* View Full Profile Link */}
            <Box
              component="a"
              href={`/areas/${selectedArea.id}`}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                color: 'primary.main',
                fontWeight: 600,
                fontSize: '0.9375rem',
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                  '& .arrow-icon': {
                    transform: 'translateX(4px)',
                  },
                },
              }}
            >
              View Full Area Profile
              <ArrowForwardIcon
                className="arrow-icon"
                sx={{
                  fontSize: 18,
                  transition: 'transform 0.2s ease',
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
