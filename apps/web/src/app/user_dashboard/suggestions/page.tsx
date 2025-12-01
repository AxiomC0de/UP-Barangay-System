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
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';

const initialSuggestions = [
  {
    id: 1,
    author: {
      name: 'Lisa Aquino',
      handle: '@lisaaquino',
    },
    time: '8h',
    title: 'Community bulletin board app feature',
    content: 'It would be great if we could have a digital bulletin board where residents can post community events, lost & found items, and local services.',
    category: 'Technology',
    upvotes: 156,
    comments: 42,
    isUpvoted: true,
    isDownvoted: false,
    isMine: true, // User's suggestion
  },
  {
    id: 2,
    author: {
      name: 'Roberto Cruz',
      handle: '@robertocruz',
    },
    time: '1d',
    title: 'Weekly community cleanup drive',
    content: 'Suggestion to organize a weekly cleanup drive every Saturday morning. This will help keep our barangay clean and promote community involvement.',
    category: 'Environment',
    upvotes: 98,
    comments: 28,
    isUpvoted: false,
    isDownvoted: false,
    isMine: false,
  },
  {
    id: 3,
    author: {
      name: 'Maria Santos',
      handle: '@mariasantos_up',
    },
    time: '2d',
    title: 'More trash bins along main roads',
    content: 'We need more public trash bins along the main roads, especially near commercial areas. This will help reduce littering.',
    category: 'Sanitation',
    upvotes: 234,
    comments: 15,
    isUpvoted: false,
    isDownvoted: false,
    isMine: false,
  },
  {
    id: 4,
    author: {
      name: 'Juan Dela Cruz',
      handle: '@juandelacruz',
    },
    time: '3d',
    title: 'Community garden project',
    content: 'Let\'s create a community garden in the vacant lot near Area 4. Residents can grow vegetables and it will beautify the area.',
    category: 'Community',
    upvotes: 187,
    comments: 56,
    isUpvoted: true,
    isDownvoted: false,
    isMine: true, // User's suggestion
  },
  {
    id: 5,
    author: {
      name: 'Ana Garcia',
      handle: '@anagarcia',
    },
    time: '4d',
    title: 'Senior citizen wellness program',
    content: 'A monthly wellness program for senior citizens including free health checkups, exercise sessions, and social activities.',
    category: 'Health',
    upvotes: 145,
    comments: 23,
    isUpvoted: false,
    isDownvoted: false,
    isMine: false,
  },
  {
    id: 6,
    author: {
      name: 'Pedro Reyes',
      handle: '@pedroreyes',
    },
    time: '5d',
    title: 'Free tutoring for students',
    content: 'Volunteer-based tutoring program for elementary and high school students in the barangay. Can be held at the barangay hall on weekends.',
    category: 'Education',
    upvotes: 167,
    comments: 34,
    isUpvoted: false,
    isDownvoted: false,
    isMine: false,
  },
];

export default function SuggestionsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [suggestions, setSuggestions] = useState(initialSuggestions);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleUpvote = (suggestionId: number) => {
    setSuggestions((prev) =>
      prev.map((suggestion) =>
        suggestion.id === suggestionId
          ? {
              ...suggestion,
              isUpvoted: !suggestion.isUpvoted,
              // If upvoting, remove downvote
              isDownvoted: suggestion.isUpvoted ? suggestion.isDownvoted : false,
              upvotes: suggestion.isUpvoted
                ? suggestion.upvotes - 1
                : suggestion.upvotes + 1,
            }
          : suggestion
      )
    );
  };

  const handleDownvote = (suggestionId: number) => {
    setSuggestions((prev) =>
      prev.map((suggestion) =>
        suggestion.id === suggestionId
          ? {
              ...suggestion,
              isDownvoted: !suggestion.isDownvoted,
              // If downvoting, remove upvote
              isUpvoted: suggestion.isDownvoted ? suggestion.isUpvoted : false,
              upvotes: suggestion.isDownvoted
                ? suggestion.upvotes
                : suggestion.isUpvoted
                ? suggestion.upvotes - 1
                : suggestion.upvotes,
            }
          : suggestion
      )
    );
  };

  const sortedSuggestions = [...suggestions]
    .filter((suggestion) => {
      if (activeTab === 2) return suggestion.isMine; // My Suggestions
      return true;
    })
    .sort((a, b) => {
      if (activeTab === 0) return b.upvotes - a.upvotes; // Top
      if (activeTab === 1) return 0; // Latest (already sorted by time)
      if (activeTab === 2) return b.upvotes - a.upvotes; // My Suggestions sorted by upvotes
      return 0;
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
              Suggestions
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
                fontSize: '0.875rem',
                py: 1.5,
                minHeight: 48,
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
            <Tab label="Top" />
            <Tab label="Latest" />
            <Tab label="My Suggestions" />
          </Tabs>
        </Box>

        {/* Submit Suggestion Button */}
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
            Submit a Suggestion
          </Button>
        </Box>

        {/* Suggestions List */}
        {sortedSuggestions.map((suggestion) => (
          <Box
            key={suggestion.id}
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
              {/* Upvote Column */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: 48,
                }}
              >
                <IconButton
                  onClick={() => handleUpvote(suggestion.id)}
                  sx={{
                    color: suggestion.isUpvoted ? '#7B1113' : '#71767b',
                    '&:hover': {
                      color: '#7B1113',
                      bgcolor: 'rgba(123, 17, 19, 0.1)',
                    },
                  }}
                >
                  {suggestion.isUpvoted ? (
                    <ThumbUpIcon />
                  ) : (
                    <ThumbUpOutlinedIcon />
                  )}
                </IconButton>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    color: suggestion.isUpvoted ? '#7B1113' : '#e7e9ea',
                  }}
                >
                  {suggestion.upvotes}
                </Typography>
                <IconButton
                  onClick={() => handleDownvote(suggestion.id)}
                  sx={{
                    color: suggestion.isDownvoted ? '#71767b' : '#71767b',
                    '&:hover': {
                      color: '#71767b',
                      bgcolor: 'rgba(113, 118, 123, 0.1)',
                    },
                  }}
                >
                  {suggestion.isDownvoted ? (
                    <ThumbDownIcon />
                  ) : (
                    <ThumbDownOutlinedIcon />
                  )}
                </IconButton>
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {/* Header */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                  <Avatar
                    sx={{
                      width: 20,
                      height: 20,
                      bgcolor: '#1d9bf0',
                      fontSize: '0.625rem',
                      fontWeight: 600,
                    }}
                  >
                    {suggestion.author.name.charAt(0)}
                  </Avatar>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '0.8125rem',
                      color: '#71767b',
                      '&:hover': {
                        textDecoration: 'underline',
                        color: '#e7e9ea',
                      },
                    }}
                  >
                    {suggestion.author.name}
                  </Typography>
                  {suggestion.isMine && (
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
                  <Typography sx={{ color: '#71767b', fontSize: '0.8125rem' }}>·</Typography>
                  <Typography sx={{ color: '#71767b', fontSize: '0.8125rem' }}>
                    {suggestion.time}
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
                    '&:hover': {
                      color: '#7B1113',
                    },
                  }}
                >
                  {suggestion.title}
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
                  {suggestion.content}
                </Typography>

                {/* Category and Comments */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip
                    label={suggestion.category}
                    size="small"
                    sx={{
                      bgcolor: 'rgba(123, 17, 19, 0.15)',
                      color: '#7B1113',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      height: 24,
                    }}
                  />
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
                    <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
                    <Typography sx={{ fontSize: '0.8125rem' }}>
                      {suggestion.comments}
                    </Typography>
                  </Box>
                </Box>
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
            placeholder="Search suggestions"
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
        {/* Top Categories */}
        <Card
          sx={{
            bgcolor: '#16181c',
            borderRadius: 3,
            mb: 2,
            overflow: 'hidden',
            border: '1px solid #2f3336',
          }}
        >
          <Box sx={{ p: 2, pb: 1 }}>
            <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
              Top Categories
            </Typography>
          </Box>
          {[
            { name: 'Environment', count: 45, color: '#4CAF50' },
            { name: 'Community', count: 38, color: '#2196F3' },
            { name: 'Technology', count: 32, color: '#9C27B0' },
            { name: 'Health', count: 28, color: '#F44336' },
            { name: 'Education', count: 24, color: '#FF9800' },
            { name: 'Sanitation', count: 18, color: '#795548' },
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: category.color,
                  }}
                />
                <Typography sx={{ fontSize: '0.9375rem', color: '#e7e9ea' }}>
                  {category.name}
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '0.875rem', color: '#71767b' }}>
                {category.count}
              </Typography>
            </Box>
          ))}
        </Card>

        {/* Guidelines */}
        <Card
          sx={{
            bgcolor: '#16181c',
            borderRadius: 3,
            p: 2,
            border: '1px solid #2f3336',
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#e7e9ea', mb: 1.5 }}>
            Suggestion Guidelines
          </Typography>
          <Typography sx={{ fontSize: '0.875rem', color: '#71767b', lineHeight: 1.6 }}>
            • Be specific and constructive{'\n'}
            • Check for similar suggestions{'\n'}
            • Provide context and reasoning{'\n'}
            • Stay respectful and positive{'\n'}
            • Upvote existing suggestions you support
          </Typography>
        </Card>
        </Box>
      </Box>
    </Box>
  );
}
