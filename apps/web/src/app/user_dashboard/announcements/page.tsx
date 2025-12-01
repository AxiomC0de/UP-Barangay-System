'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VerifiedIcon from '@mui/icons-material/Verified';
import PushPinIcon from '@mui/icons-material/PushPin';
import { useRouter } from 'next/navigation';

const announcements = [
  {
    id: 1,
    isPinned: true,
    author: {
      name: 'Barangay U.P. Campus',
      handle: '@barangayupc',
      isVerified: true,
    },
    time: '13h',
    title: 'ROAD CLOSURE ADVISORY',
    content: 'Quirino Avenue will be closed for road repair from December 15-20, 2024. Please use alternative routes via C.P. Garcia or University Avenue.\n\nThank you for your understanding.',
    views: 304000,
  },
  {
    id: 2,
    isPinned: true,
    author: {
      name: 'Barangay U.P. Campus',
      handle: '@barangayupc',
      isVerified: true,
    },
    time: '1d',
    title: '🎄 COMMUNITY CHRISTMAS PARTY 🎄',
    content: 'Join us for our annual Barangay Christmas celebration!\n\n📅 Date: December 22, 2024\n🕐 Time: 4:00 PM onwards\n📍 Venue: Barangay Hall Covered Court\n\nThere will be games, raffle, and food for all residents. See you there!',
    views: 89000,
  },
  {
    id: 3,
    isPinned: false,
    author: {
      name: 'Barangay U.P. Campus',
      handle: '@barangayupc',
      isVerified: true,
    },
    time: '3d',
    title: 'Water Service Maintenance Notice',
    content: 'Maynilad will conduct scheduled maintenance on December 10, 2024 from 10:00 PM to 5:00 AM the following day.\n\nAffected areas: Area 1, Area 2, Area 3\n\nPlease store enough water for your needs.',
    views: 45000,
  },
  {
    id: 4,
    isPinned: false,
    author: {
      name: 'Barangay U.P. Campus',
      handle: '@barangayupc',
      isVerified: true,
    },
    time: '5d',
    title: 'New Online Services Available',
    content: 'Good news! You can now apply for the following documents online:\n\n✅ Barangay Clearance\n✅ Certificate of Residency\n✅ Indigency Certificate\n\nVisit our portal to get started.',
    views: 67000,
  },
  {
    id: 5,
    isPinned: false,
    author: {
      name: 'Barangay U.P. Campus',
      handle: '@barangayupc',
      isVerified: true,
    },
    time: '1w',
    title: 'Barangay Assembly Meeting',
    content: 'All residents are invited to attend the Quarterly Barangay Assembly.\n\n📅 Date: December 5, 2024\n🕐 Time: 2:00 PM\n📍 Venue: Barangay Hall\n\nAgenda includes budget updates and community projects.',
    views: 34000,
  },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export default function AnnouncementsPage() {
  const router = useRouter();

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          maxWidth: 600,
          borderRight: '1px solid #2f3336',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            bgcolor: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(12px)',
            zIndex: 10,
            borderBottom: '1px solid #2f3336',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            px: 2,
            py: 1,
          }}
        >
          <IconButton
            onClick={() => router.back()}
            sx={{
              color: '#e7e9ea',
              '&:hover': {
                bgcolor: 'rgba(231, 233, 234, 0.1)',
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#e7e9ea',
              fontSize: '1.25rem',
            }}
          >
            Announcements
          </Typography>
        </Box>

        {/* Announcements List */}
        {announcements.map((announcement) => (
          <Box
            key={announcement.id}
            sx={{
              p: 2,
              borderBottom: '1px solid #2f3336',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              '&:hover': {
                bgcolor: 'rgba(231, 233, 234, 0.03)',
              },
            }}
          >
            {/* Pinned indicator */}
            {announcement.isPinned && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, ml: 6.5 }}>
                <PushPinIcon sx={{ fontSize: 14, color: '#71767b' }} />
                <Typography sx={{ fontSize: '0.8125rem', color: '#71767b', fontWeight: 500 }}>
                  Pinned
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {/* Avatar */}
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: '#7B1113',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                B
              </Avatar>

              {/* Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.9375rem',
                      color: '#e7e9ea',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {announcement.author.name}
                  </Typography>
                  {announcement.author.isVerified && (
                    <VerifiedIcon sx={{ fontSize: 18, color: '#7B1113' }} />
                  )}
                  <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>
                    {announcement.author.handle}
                  </Typography>
                  <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>·</Typography>
                  <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>
                    {announcement.time}
                  </Typography>
                  <Box sx={{ flex: 1 }} />
                  <IconButton
                    size="small"
                    sx={{
                      color: '#71767b',
                      '&:hover': {
                        color: '#7B1113',
                        bgcolor: 'rgba(123, 17, 19, 0.1)',
                      },
                    }}
                  >
                    <MoreHorizIcon fontSize="small" />
                  </IconButton>
                </Box>

                {/* Title */}
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: '#e7e9ea',
                    mb: 0.5,
                  }}
                >
                  {announcement.title}
                </Typography>

                {/* Content */}
                <Typography
                  sx={{
                    fontSize: '0.9375rem',
                    color: '#e7e9ea',
                    whiteSpace: 'pre-line',
                    lineHeight: 1.5,
                    mb: 1,
                  }}
                >
                  {announcement.content}
                </Typography>

                {/* Views */}
                <Typography sx={{ fontSize: '0.8125rem', color: '#71767b' }}>
                  {formatNumber(announcement.views)} views
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Right Sidebar */}
      <Box
        sx={{
          width: 350,
          flexShrink: 0,
          display: { xs: 'none', lg: 'block' },
        }}
      >
        {/* Sticky Search */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            bgcolor: '#000',
            pt: 2,
            pb: 1,
            px: 2,
            zIndex: 10,
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Search announcements"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#71767b' }} />
                </InputAdornment>
              ),
            }}
            sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 5,
              bgcolor: '#202327',
              '& fieldset': {
                borderColor: 'transparent',
              },
              '&:hover fieldset': {
                borderColor: 'transparent',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#7B1113',
              },
              '& input': {
                color: '#e7e9ea',
                '&::placeholder': {
                  color: '#71767b',
                  opacity: 1,
                },
              },
            },
          }}
        />
        </Box>

        {/* Scrollable Content */}
        <Box sx={{ px: 2 }}>
        {/* Categories */}
        <Card
          sx={{
            bgcolor: '#16181c',
            borderRadius: 3,
            overflow: 'hidden',
            border: '1px solid #2f3336',
          }}
        >
          <Box sx={{ p: 2, pb: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
              Categories
            </Typography>
          </Box>
          {[
            { name: 'All Announcements', count: 45 },
            { name: 'Events', count: 12 },
            { name: 'Advisories', count: 18 },
            { name: 'Services', count: 8 },
            { name: 'Community', count: 7 },
          ].map((category, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 1.5,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'rgba(231, 233, 234, 0.03)',
                },
              }}
            >
              <Typography sx={{ fontSize: '0.9375rem', color: '#e7e9ea' }}>
                {category.name}
              </Typography>
              <Typography sx={{ fontSize: '0.875rem', color: '#71767b' }}>
                {category.count}
              </Typography>
            </Box>
          ))}
        </Card>
        </Box>
      </Box>
    </Box>
  );
}
