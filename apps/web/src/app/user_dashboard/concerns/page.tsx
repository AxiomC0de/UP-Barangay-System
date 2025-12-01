'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

const concerns = [
  {
    id: 1,
    author: {
      name: 'Ana Garcia',
      handle: '@anagarcia',
    },
    time: '30m',
    title: 'Water Supply Interruption - Area 3',
    content: 'Still no water since yesterday. Many families are affected. Can someone from the barangay please look into this urgently?',
    status: 'open',
    category: 'Utilities',
    priority: 'urgent',
    replies: 34,
    isMine: false,
  },
  {
    id: 2,
    author: {
      name: 'Juan Dela Cruz',
      handle: '@juandelacruz',
    },
    time: '5h',
    title: 'Streetlight not working - Area 2',
    content: 'The streetlight near the covered court has been out for 3 days now. It\'s very dark and dangerous at night.',
    status: 'in_progress',
    category: 'Infrastructure',
    priority: 'high',
    replies: 12,
    isMine: true, // This is user's concern
  },
  {
    id: 3,
    author: {
      name: 'Carlos Tan',
      handle: '@carlostan',
    },
    time: '4h',
    title: 'Noise complaint - Construction past 10PM',
    content: 'The construction site near our area has been operating past 10PM for the last week. This is against barangay ordinance.',
    status: 'open',
    category: 'Noise',
    priority: 'medium',
    replies: 19,
    isMine: false,
  },
  {
    id: 4,
    author: {
      name: 'Maria Santos',
      handle: '@mariasantos_up',
    },
    time: '1d',
    title: 'Stray dogs in Area 5',
    content: 'There\'s a pack of stray dogs roaming around Area 5. They\'ve been aggressive towards residents. Please send animal control.',
    status: 'resolved',
    category: 'Safety',
    priority: 'high',
    replies: 28,
    isMine: true, // This is user's concern
  },
  {
    id: 5,
    author: {
      name: 'Pedro Reyes',
      handle: '@pedroreyes',
    },
    time: '2d',
    title: 'Garbage collection missed - Area 1',
    content: 'The garbage truck didn\'t come for collection on Wednesday. Trash has been piling up.',
    status: 'resolved',
    category: 'Sanitation',
    priority: 'low',
    replies: 8,
    isMine: false,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return { bg: 'rgba(255, 152, 0, 0.15)', text: '#FF9800' };
    case 'in_progress':
      return { bg: 'rgba(33, 150, 243, 0.15)', text: '#2196F3' };
    case 'resolved':
      return { bg: 'rgba(76, 175, 80, 0.15)', text: '#4CAF50' };
    default:
      return { bg: 'rgba(158, 158, 158, 0.15)', text: '#9E9E9E' };
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'open':
      return 'Open';
    case 'in_progress':
      return 'In Progress';
    case 'resolved':
      return 'Resolved';
    default:
      return status;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return { bg: 'rgba(244, 67, 54, 0.15)', text: '#F44336' };
    case 'high':
      return { bg: 'rgba(255, 87, 34, 0.15)', text: '#FF5722' };
    case 'medium':
      return { bg: 'rgba(255, 193, 7, 0.15)', text: '#FFC107' };
    case 'low':
      return { bg: 'rgba(76, 175, 80, 0.15)', text: '#4CAF50' };
    default:
      return { bg: 'rgba(158, 158, 158, 0.15)', text: '#9E9E9E' };
  }
};

const getPriorityLabel = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return 'Urgent';
    case 'high':
      return 'High';
    case 'medium':
      return 'Medium';
    case 'low':
      return 'Low';
    default:
      return priority;
  }
};

export default function ConcernsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const filteredConcerns = concerns.filter((concern) => {
    if (activeTab === 0) return true; // All
    if (activeTab === 1) return concern.isMine; // My Concerns
    if (activeTab === 2) return concern.status === 'open';
    if (activeTab === 3) return concern.status === 'in_progress';
    if (activeTab === 4) return concern.status === 'resolved';
    return true;
  });

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
          }}
        >
          <Box
            sx={{
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
              Concerns
            </Typography>
          </Box>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                color: '#71767b',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.8125rem',
                py: 1.5,
                minHeight: 48,
                minWidth: 0,
                px: 1,
                '&.Mui-selected': {
                  color: '#e7e9ea',
                  fontWeight: 700,
                },
                '&:hover': {
                  bgcolor: 'rgba(231, 233, 234, 0.1)',
                },
              },
              '& .MuiTabs-indicator': {
                bgcolor: '#7B1113',
                height: 4,
                borderRadius: 2,
              },
            }}
          >
            <Tab label="All" />
            <Tab label="My Concerns" />
            <Tab label="Open" />
            <Tab label="In Progress" />
            <Tab label="Resolved" />
          </Tabs>
        </Box>

        {/* Report Concern Button */}
        <Box sx={{ p: 2, borderBottom: '1px solid #2f3336' }}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: '#7B1113',
              color: 'white',
              borderRadius: 2,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 700,
              '&:hover': {
                bgcolor: '#5a0c0e',
              },
            }}
          >
            Report a Concern
          </Button>
        </Box>

        {/* Concerns List */}
        {filteredConcerns.map((concern) => {
          const statusColor = getStatusColor(concern.status);
          return (
            <Box
              key={concern.id}
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
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                {/* Avatar */}
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: '#1d9bf0',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {concern.author.name.charAt(0)}
                </Avatar>

                {/* Content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25, flexWrap: 'wrap' }}>
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
                      {concern.author.name}
                    </Typography>
                    {concern.isMine && (
                      <Chip
                        label="You"
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: '0.6875rem',
                          fontWeight: 700,
                          bgcolor: 'rgba(123, 17, 19, 0.2)',
                          color: '#7B1113',
                          '& .MuiChip-label': {
                            px: 0.75,
                          },
                        }}
                      />
                    )}
                    <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>
                      {concern.author.handle}
                    </Typography>
                    <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>·</Typography>
                    <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>
                      {concern.time}
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
                    {concern.title}
                  </Typography>

                  {/* Content */}
                  <Typography
                    sx={{
                      fontSize: '0.9375rem',
                      color: '#e7e9ea',
                      lineHeight: 1.5,
                      mb: 1.5,
                    }}
                  >
                    {concern.content}
                  </Typography>

                  {/* Tags and Status */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                    <Chip
                      icon={<FiberManualRecordIcon sx={{ fontSize: '10px !important' }} />}
                      label={getStatusLabel(concern.status)}
                      size="small"
                      sx={{
                        bgcolor: statusColor.bg,
                        color: statusColor.text,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        height: 24,
                        '& .MuiChip-icon': {
                          color: statusColor.text,
                        },
                      }}
                    />
                    <Chip
                      label={getPriorityLabel(concern.priority)}
                      size="small"
                      sx={{
                        bgcolor: getPriorityColor(concern.priority).bg,
                        color: getPriorityColor(concern.priority).text,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        height: 24,
                      }}
                    />
                    <Chip
                      label={concern.category}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: '#2f3336',
                        color: '#71767b',
                        fontSize: '0.75rem',
                        height: 24,
                      }}
                    />
                  </Box>

                  {/* Replies */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: '#71767b',
                      '&:hover': {
                        color: '#1d9bf0',
                      },
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        color: 'inherit',
                        ml: -1,
                        '&:hover': {
                          bgcolor: 'rgba(29, 155, 240, 0.1)',
                        },
                      }}
                    >
                      <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <Typography sx={{ fontSize: '0.8125rem' }}>
                      {concern.replies} replies
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}

        {/* Empty State */}
        {filteredConcerns.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ color: '#e7e9ea', fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>
              No concerns found
            </Typography>
            <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>
              There are no concerns in this category yet.
            </Typography>
          </Box>
        )}
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
            placeholder="Search concerns"
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
        {/* Stats */}
        <Card
          sx={{
            bgcolor: '#16181c',
            borderRadius: 3,
            mb: 2,
            p: 2,
            border: '1px solid #2f3336',
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea', mb: 2 }}>
            Statistics
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>Total Concerns</Typography>
            <Typography sx={{ color: '#e7e9ea', fontWeight: 700 }}>156</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>Open</Typography>
            <Typography sx={{ color: '#FF9800', fontWeight: 700 }}>23</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>In Progress</Typography>
            <Typography sx={{ color: '#2196F3', fontWeight: 700 }}>18</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>Resolved</Typography>
            <Typography sx={{ color: '#4CAF50', fontWeight: 700 }}>115</Typography>
          </Box>
        </Card>

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
            { name: 'Infrastructure', count: 45 },
            { name: 'Utilities', count: 32 },
            { name: 'Sanitation', count: 28 },
            { name: 'Safety', count: 24 },
            { name: 'Noise', count: 18 },
            { name: 'Others', count: 9 },
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
