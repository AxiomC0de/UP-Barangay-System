'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import HistoryIcon from '@mui/icons-material/History';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapIcon from '@mui/icons-material/Map';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';

const QUICK_LINKS = [
  { icon: HistoryIcon, label: 'History' },
  { icon: GroupsIcon, label: 'Officials' },
  { icon: LocationCityIcon, label: '16 Pooks' },
  { icon: MapIcon, label: '493 Hectares' },
  { icon: PeopleIcon, label: '47,127 Residents' },
  { icon: EventIcon, label: 'Est. 1975' },
];

export default function QuickLinksBar() {
  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 10,
        mt: { xs: -6, md: -8 },
        mb: { xs: 4, md: 6 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: { xs: 2, md: 3 },
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            py: { xs: 3, md: 4 },
            px: { xs: 2, md: 4 },
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            flexWrap="wrap"
            sx={{
              gap: { xs: 2, md: 0 },
            }}
          >
            {QUICK_LINKS.map((item) => {
              const IconComponent = item.icon;
              return (
                <Box
                  key={item.label}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    px: { xs: 1.5, sm: 2, md: 3 },
                    py: 1,
                    borderRadius: 2,
                    minWidth: { xs: 80, sm: 100 },
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      '& .icon': {
                        color: '#228B22',
                        transform: 'scale(1.1)',
                      },
                      '& .label': {
                        color: '#228B22',
                      },
                    },
                  }}
                >
                  <IconComponent
                    className="icon"
                    sx={{
                      fontSize: { xs: 36, sm: 44, md: 52 },
                      color: '#0ea5e9',
                      mb: 1,
                      transition: 'all 0.3s ease',
                    }}
                  />
                  <Typography
                    className="label"
                    variant="body2"
                    sx={{
                      fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
                      fontWeight: 500,
                      color: '#334155',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
