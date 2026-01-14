'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RepeatIcon from '@mui/icons-material/Repeat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BarChartIcon from '@mui/icons-material/BarChart';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IosShareIcon from '@mui/icons-material/IosShare';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VerifiedIcon from '@mui/icons-material/Verified';

// Mock posts data
const initialPosts = [
  {
    id: 1,
    author: {
      name: 'Barangay U.P. Campus',
      handle: '@barangayupc',
      avatar: null,
      isVerified: true,
      isOfficial: true,
    },
    time: '13h',
    content: 'ROAD CLOSURE ADVISORY\n\nQuirino Avenue will be closed for road repair from December 15-20, 2024. Please use alternative routes via C.P. Garcia or University Avenue.\n\nThank you for your understanding.',
    image: null,
    stats: {
      comments: 75,
      reposts: 2800,
      likes: 18000,
      views: 304000,
    },
    isLiked: false,
    isReposted: false,
    isBookmarked: false,
  },
  {
    id: 2,
    author: {
      name: 'Juan Dela Cruz',
      handle: '@juandelacruz',
      avatar: null,
      isVerified: false,
      isOfficial: false,
    },
    time: '5h',
    content: 'Has anyone noticed the streetlight near Area 2 covered court is not working? It\'s been like this for 3 days now. 😔\n\n#BarangayUPCampus #Infrastructure',
    image: null,
    stats: {
      comments: 12,
      reposts: 5,
      likes: 34,
      views: 1200,
    },
    isLiked: true,
    isReposted: false,
    isBookmarked: false,
  },
  {
    id: 3,
    author: {
      name: 'Barangay U.P. Campus',
      handle: '@barangayupc',
      avatar: null,
      isVerified: true,
      isOfficial: true,
    },
    time: '1d',
    content: '🎄 COMMUNITY CHRISTMAS PARTY 🎄\n\nJoin us for our annual Barangay Christmas celebration!\n\n📅 Date: December 22, 2024\n🕐 Time: 4:00 PM onwards\n📍 Venue: Barangay Hall Covered Court\n\nThere will be games, raffle, and food for all residents. See you there!',
    image: null,
    stats: {
      comments: 156,
      reposts: 892,
      likes: 4500,
      views: 89000,
    },
    isLiked: false,
    isReposted: true,
    isBookmarked: true,
  },
  {
    id: 4,
    author: {
      name: 'Maria Santos',
      handle: '@mariasantos_up',
      avatar: null,
      isVerified: false,
      isOfficial: false,
    },
    time: '3h',
    content: 'Kudos to the barangay team for the quick response on my clearance application! Got it within 2 days. 👏\n\nGreat service! 🙌',
    image: null,
    stats: {
      comments: 8,
      reposts: 3,
      likes: 67,
      views: 890,
    },
    isLiked: false,
    isReposted: false,
    isBookmarked: false,
  },
  {
    id: 5,
    author: {
      name: 'Ana Garcia',
      handle: '@anagarcia',
      avatar: null,
      isVerified: false,
      isOfficial: false,
    },
    time: '30m',
    content: '⚠️ WATER SUPPLY INTERRUPTION in Area 3 - Day 2\n\nStill no water since yesterday. Can someone from the barangay please look into this? Many families are affected.\n\n@barangayupc',
    image: null,
    stats: {
      comments: 34,
      reposts: 89,
      likes: 156,
      views: 3400,
    },
    isLiked: false,
    isReposted: false,
    isBookmarked: false,
  },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export default function UserDashboardPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostText, setNewPostText] = useState('');

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

  const handleRepost = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isReposted: !post.isReposted,
              stats: {
                ...post.stats,
                reposts: post.isReposted ? post.stats.reposts - 1 : post.stats.reposts + 1,
              },
            }
          : post
      )
    );
  };

  const handleBookmark = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
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
            px: 2,
            py: 1.5,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#e7e9ea',
              fontSize: '1.25rem',
            }}
          >
            Home
          </Typography>
        </Box>

        {/* Compose Post */}
        <Box sx={{ p: 2, borderBottom: '1px solid #2f3336' }}>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#7B1113',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              R
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                multiline
                placeholder="What's happening?"
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    color: '#e7e9ea',
                    fontSize: '1.25rem',
                    '&::placeholder': {
                      color: '#71767b',
                    },
                  },
                }}
                sx={{
                  '& .MuiInputBase-input::placeholder': {
                    color: '#71767b',
                    opacity: 1,
                  },
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mt: 2,
                  pt: 1.5,
                  borderTop: '1px solid #2f3336',
                }}
              >
                <Box sx={{ display: 'flex', gap: 0.5, ml: -1 }}>
                  <IconButton size="small" sx={{ color: '#7B1113' }}>
                    <ImageOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: '#7B1113' }}>
                    <GifBoxOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: '#7B1113' }}>
                    <PollOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: '#7B1113' }}>
                    <EmojiEmotionsOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: '#7B1113' }}>
                    <LocationOnOutlinedIcon fontSize="small" />
                  </IconButton>
                </Box>
                <Button
                  variant="contained"
                  disabled={!newPostText.trim()}
                  sx={{
                    bgcolor: '#7B1113',
                    color: 'white',
                    borderRadius: 5,
                    textTransform: 'none',
                    fontWeight: 700,
                    px: 2.5,
                    '&:hover': {
                      bgcolor: '#5a0c0e',
                    },
                    '&.Mui-disabled': {
                      bgcolor: 'rgba(123, 17, 19, 0.5)',
                      color: 'rgba(255, 255, 255, 0.5)',
                    },
                  }}
                >
                  Post
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Posts Feed */}
        {posts.map((post) => (
          <Box
            key={post.id}
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
                  bgcolor: post.author.isOfficial ? '#7B1113' : '#1d9bf0',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {post.author.name.charAt(0)}
              </Avatar>

              {/* Post Content */}
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
                    {post.author.name}
                  </Typography>
                  {post.author.isVerified && (
                    <VerifiedIcon sx={{ fontSize: 18, color: '#7B1113' }} />
                  )}
                  <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>
                    {post.author.handle}
                  </Typography>
                  <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>·</Typography>
                  <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>
                    {post.time}
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

                {/* Content */}
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

                {/* Actions */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    maxWidth: 425,
                    ml: -1,
                  }}
                >
                  {/* Comments */}
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
                        '&:hover': {
                          bgcolor: 'rgba(29, 155, 240, 0.1)',
                        },
                      }}
                    >
                      <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <Typography sx={{ fontSize: '0.8125rem' }}>
                      {formatNumber(post.stats.comments)}
                    </Typography>
                  </Box>

                  {/* Likes */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: post.isLiked ? '#f91880' : '#71767b',
                      '&:hover': {
                        color: '#f91880',
                      },
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleLike(post.id)}
                      sx={{
                        color: 'inherit',
                        '&:hover': {
                          bgcolor: 'rgba(249, 24, 128, 0.1)',
                        },
                      }}
                    >
                      {post.isLiked ? (
                        <FavoriteIcon sx={{ fontSize: 18 }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                      )}
                    </IconButton>
                    <Typography sx={{ fontSize: '0.8125rem' }}>
                      {formatNumber(post.stats.likes)}
                    </Typography>
                  </Box>

                  {/* Views */}
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
                        '&:hover': {
                          bgcolor: 'rgba(29, 155, 240, 0.1)',
                        },
                      }}
                    >
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
    </Box>
  );
}
