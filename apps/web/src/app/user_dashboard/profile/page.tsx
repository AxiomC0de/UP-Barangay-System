'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import VerifiedIcon from '@mui/icons-material/Verified';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BarChartIcon from '@mui/icons-material/BarChart';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

// Mock user data
const userData = {
  name: 'Juan Dela Cruz',
  handle: '@juandelacruz',
  avatar: null,
  coverPhoto: null,
  bio: 'Proud resident of Barangay U.P. Campus, Area 2. Community volunteer and advocate for local development.',
  location: 'Area 2, U.P. Campus, Diliman',
  joinedDate: 'January 2023',
  isVerified: false,
  stats: {
    posts: 24,
    concerns: 5,
    suggestions: 8,
  },
};

// Mock user posts
const userPosts = [
  {
    id: 1,
    content: 'Has anyone noticed the streetlight near Area 2 covered court is not working? It\'s been like this for 3 days now. 😔\n\n#BarangayUPCampus #Infrastructure',
    time: '5h',
    stats: {
      comments: 12,
      likes: 34,
      views: 1200,
    },
    isLiked: true,
  },
  {
    id: 2,
    content: 'Kudos to the barangay team for the quick response on my clearance application! Got it within 2 days. 👏\n\nGreat service! 🙌',
    time: '2d',
    stats: {
      comments: 8,
      likes: 67,
      views: 890,
    },
    isLiked: false,
  },
  {
    id: 3,
    content: 'Looking forward to the Community Christmas Party! See everyone there! 🎄🎉',
    time: '3d',
    stats: {
      comments: 15,
      likes: 89,
      views: 2100,
    },
    isLiked: false,
  },
];

// Mock user concerns
const userConcerns = [
  {
    id: 1,
    title: 'Streetlight not working - Area 2',
    status: 'in_progress',
    priority: 'high',
    time: '5h',
    replies: 12,
  },
  {
    id: 2,
    title: 'Stray dogs in Area 5',
    status: 'resolved',
    priority: 'high',
    time: '1d',
    replies: 28,
  },
];

// Mock user suggestions
const userSuggestions = [
  {
    id: 1,
    title: 'Community bulletin board app feature',
    upvotes: 156,
    comments: 42,
    time: '8h',
  },
  {
    id: 2,
    title: 'Community garden project',
    upvotes: 187,
    comments: 56,
    time: '3d',
  },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

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

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [posts, setPosts] = useState(userPosts);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleLike = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              stats: {
                ...post.stats,
                likes: post.isLiked ? post.stats.likes - 1 : post.stats.likes + 1,
              },
            }
          : post
      )
    );
  };

  return (
    <Box>
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
              py: 1.5,
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#e7e9ea',
                  fontSize: '1.25rem',
                }}
              >
                {userData.name}
              </Typography>
              <Typography sx={{ color: '#71767b', fontSize: '0.8125rem' }}>
                {userData.stats.posts} posts
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Cover Photo */}
        <Box
          sx={{
            height: 200,
            bgcolor: '#333639',
            position: 'relative',
          }}
        >
          {userData.coverPhoto && (
            <Box
              component="img"
              src={userData.coverPhoto}
              alt="Cover"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          )}
        </Box>

        {/* Profile Info */}
        <Box sx={{ px: 2, pb: 2 }}>
          {/* Avatar and Edit Button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mt: -8,
              mb: 2,
            }}
          >
            <Avatar
              sx={{
                width: 134,
                height: 134,
                bgcolor: '#7B1113',
                fontSize: '3rem',
                fontWeight: 600,
                border: '4px solid #000',
              }}
            >
              {userData.name.charAt(0)}
            </Avatar>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              sx={{
                mt: 8,
                borderColor: '#536471',
                color: '#e7e9ea',
                borderRadius: 5,
                textTransform: 'none',
                fontWeight: 700,
                px: 2,
                '&:hover': {
                  borderColor: '#e7e9ea',
                  bgcolor: 'rgba(231, 233, 234, 0.1)',
                },
              }}
            >
              Edit profile
            </Button>
          </Box>

          {/* Name and Handle */}
          <Box sx={{ mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  color: '#e7e9ea',
                }}
              >
                {userData.name}
              </Typography>
              {userData.isVerified && (
                <VerifiedIcon sx={{ fontSize: 20, color: '#1d9bf0' }} />
              )}
            </Box>
            <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>
              {userData.handle}
            </Typography>
          </Box>

          {/* Bio */}
          <Typography
            sx={{
              color: '#e7e9ea',
              fontSize: '0.9375rem',
              lineHeight: 1.5,
              mb: 1.5,
            }}
          >
            {userData.bio}
          </Typography>

          {/* Location and Joined */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <LocationOnIcon sx={{ fontSize: 18, color: '#71767b' }} />
              <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>
                {userData.location}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarMonthIcon sx={{ fontSize: 18, color: '#71767b' }} />
              <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>
                Joined {userData.joinedDate}
              </Typography>
            </Box>
          </Box>

          {/* Stats */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography sx={{ fontWeight: 700, color: '#e7e9ea', fontSize: '0.9375rem' }}>
                {userData.stats.posts}
              </Typography>
              <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>
                Posts
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography sx={{ fontWeight: 700, color: '#e7e9ea', fontSize: '0.9375rem' }}>
                {userData.stats.concerns}
              </Typography>
              <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>
                Concerns
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography sx={{ fontWeight: 700, color: '#e7e9ea', fontSize: '0.9375rem' }}>
                {userData.stats.suggestions}
              </Typography>
              <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>
                Suggestions
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderBottom: '1px solid #2f3336',
            '& .MuiTab-root': {
              color: '#71767b',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.9375rem',
              py: 2,
              minHeight: 53,
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
          <Tab label="Posts" />
          <Tab label="Concerns" />
          <Tab label="Suggestions" />
          <Tab label="Likes" />
        </Tabs>

        {/* Tab Content */}
        {activeTab === 0 && (
          <>
            {posts.map((post) => (
              <Box
                key={post.id}
                sx={{
                  p: 2,
                  borderBottom: '1px solid #2f3336',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'rgba(231, 233, 234, 0.03)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: '#7B1113',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    {userData.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', color: '#e7e9ea' }}>
                        {userData.name}
                      </Typography>
                      <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>
                        {userData.handle}
                      </Typography>
                      <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>·</Typography>
                      <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>
                        {post.time}
                      </Typography>
                    </Box>
                    <Typography
                      sx={{
                        fontSize: '0.9375rem',
                        color: '#e7e9ea',
                        whiteSpace: 'pre-line',
                        lineHeight: 1.5,
                        mb: 1.5,
                      }}
                    >
                      {post.content}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        maxWidth: 300,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#71767b' }}>
                        <IconButton size="small" sx={{ color: 'inherit' }}>
                          <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                        <Typography sx={{ fontSize: '0.8125rem' }}>
                          {post.stats.comments}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          color: post.isLiked ? '#f91880' : '#71767b',
                        }}
                      >
                        <IconButton
                          size="small"
                          onClick={() => handleLike(post.id)}
                          sx={{ color: 'inherit' }}
                        >
                          {post.isLiked ? (
                            <FavoriteIcon sx={{ fontSize: 18 }} />
                          ) : (
                            <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                          )}
                        </IconButton>
                        <Typography sx={{ fontSize: '0.8125rem' }}>
                          {post.stats.likes}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#71767b' }}>
                        <IconButton size="small" sx={{ color: 'inherit' }}>
                          <BarChartIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                        <Typography sx={{ fontSize: '0.8125rem' }}>
                          {formatNumber(post.stats.views)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </>
        )}

        {activeTab === 1 && (
          <>
            {userConcerns.map((concern) => {
              const statusColor = getStatusColor(concern.status);
              return (
                <Box
                  key={concern.id}
                  sx={{
                    p: 2,
                    borderBottom: '1px solid #2f3336',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'rgba(231, 233, 234, 0.03)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'rgba(33, 150, 243, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <ReportProblemIcon sx={{ color: '#2196F3', fontSize: 20 }} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: '0.9375rem',
                          color: '#e7e9ea',
                          mb: 0.5,
                        }}
                      >
                        {concern.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Chip
                          label={concern.status === 'in_progress' ? 'In Progress' : 'Resolved'}
                          size="small"
                          sx={{
                            bgcolor: statusColor.bg,
                            color: statusColor.text,
                            fontWeight: 600,
                            fontSize: '0.75rem',
                            height: 24,
                          }}
                        />
                        <Typography sx={{ color: '#71767b', fontSize: '0.8125rem' }}>
                          {concern.time} · {concern.replies} replies
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </>
        )}

        {activeTab === 2 && (
          <>
            {userSuggestions.map((suggestion) => (
              <Box
                key={suggestion.id}
                sx={{
                  p: 2,
                  borderBottom: '1px solid #2f3336',
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'rgba(231, 233, 234, 0.03)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: 'rgba(255, 152, 0, 0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <LightbulbIcon sx={{ color: '#FF9800', fontSize: 20 }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.9375rem',
                        color: '#e7e9ea',
                        mb: 0.5,
                      }}
                    >
                      {suggestion.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography sx={{ color: '#71767b', fontSize: '0.8125rem' }}>
                        {suggestion.upvotes} upvotes
                      </Typography>
                      <Typography sx={{ color: '#71767b', fontSize: '0.8125rem' }}>
                        {suggestion.comments} comments
                      </Typography>
                      <Typography sx={{ color: '#71767b', fontSize: '0.8125rem' }}>
                        {suggestion.time}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </>
        )}

        {activeTab === 3 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ color: '#e7e9ea', fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>
              No likes yet
            </Typography>
            <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>
              Posts you like will appear here.
            </Typography>
          </Box>
        )}
    </Box>
  );
}
