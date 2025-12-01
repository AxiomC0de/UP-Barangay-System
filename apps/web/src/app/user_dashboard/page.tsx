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
import SearchIcon from '@mui/icons-material/Search';
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

// Trending topics
const trendingTopics = [
  { category: 'Trending in U.P. Campus', topic: 'Christmas Party', posts: '2,779 posts' },
  { category: 'Trending in U.P. Campus', topic: 'Road Closure', posts: '1,234 posts' },
  { category: 'Trending in U.P. Campus', topic: 'Area 3 Water', posts: '856 posts' },
  { category: 'Community', topic: 'Barangay Clearance', posts: '445 posts' },
  { category: 'Community', topic: '#UPDiliman', posts: '6,889 posts' },
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
    <Box sx={{ display: 'flex' }}>
      {/* Main Feed */}
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

      {/* Right Sidebar */}
      <Box
        sx={{
          width: 350,
          flexShrink: 0,
          display: { xs: 'none', lg: 'block' },
          ml: 4,
        }}
      >
        {/* Sticky Search */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            bgcolor: '#000',
            pt: 1,
            pb: 1,
            zIndex: 10,
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Search"
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
        <Box sx={{ pt: 1 }}>
        {/* Latest Announcement */}
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
              Latest Announcement
            </Typography>
          </Box>
          {[
            { title: 'Community Christmas Party Announcement', time: '18 hours ago', category: 'Community' },
            { title: 'Road Repair Schedule Released', time: '1 hour ago', category: 'Infrastructure' },
            { title: 'Water Service Update for Area 3', time: '5 hours ago', category: 'Utilities' },
          ].map((news, index) => (
            <Box
              key={index}
              sx={{
                px: 2,
                py: 1.5,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'rgba(231, 233, 234, 0.03)',
                },
              }}
            >
              <Typography sx={{ fontSize: '0.8125rem', color: '#71767b' }}>
                {news.category} · {news.time}
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', color: '#e7e9ea' }}>
                {news.title}
              </Typography>
            </Box>
          ))}
        </Card>

        {/* What's Happening */}
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
              What&apos;s happening
            </Typography>
          </Box>
          {trendingTopics.map((item, index) => (
            <Box
              key={index}
              sx={{
                px: 2,
                py: 1.5,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'rgba(231, 233, 234, 0.03)',
                },
              }}
            >
              <Typography sx={{ fontSize: '0.8125rem', color: '#71767b' }}>
                {item.category}
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', color: '#e7e9ea' }}>
                {item.topic}
              </Typography>
              <Typography sx={{ fontSize: '0.8125rem', color: '#71767b' }}>
                {item.posts}
              </Typography>
            </Box>
          ))}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'rgba(231, 233, 234, 0.03)',
              },
            }}
          >
            <Typography sx={{ color: '#7B1113', fontSize: '0.9375rem' }}>
              Show more
            </Typography>
          </Box>
        </Card>

        {/* Latest Concerns */}
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
              Latest Concerns
            </Typography>
          </Box>
          {[
            {
              id: 1,
              title: 'Streetlight not working on Area 5',
              author: 'Maria Santos',
              status: 'open',
              time: '2 hours ago',
              category: 'Infrastructure',
            },
            {
              id: 2,
              title: 'Noise complaint from construction site',
              author: 'Juan Dela Cruz',
              status: 'in_progress',
              time: '5 hours ago',
              category: 'Environment',
            },
            {
              id: 3,
              title: 'Request for speed bump installation',
              author: 'Pedro Reyes',
              status: 'open',
              time: '1 day ago',
              category: 'Safety',
            },
          ].map((concern) => (
            <Box
              key={concern.id}
              sx={{
                px: 2,
                py: 1.5,
                cursor: 'pointer',
                borderTop: '1px solid #2f3336',
                '&:hover': {
                  bgcolor: 'rgba(231, 233, 234, 0.03)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                  {concern.category}
                </Typography>
                <Box
                  sx={{
                    px: 1,
                    py: 0.25,
                    borderRadius: 1,
                    bgcolor: concern.status === 'open' ? 'rgba(255, 193, 7, 0.2)' : 'rgba(33, 150, 243, 0.2)',
                    color: concern.status === 'open' ? '#ffc107' : '#2196f3',
                    fontSize: '0.6875rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                  }}
                >
                  {concern.status === 'open' ? 'Open' : 'In Progress'}
                </Box>
              </Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  color: '#e7e9ea',
                  mb: 0.5,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {concern.title}
              </Typography>
              <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                by {concern.author} · {concern.time}
              </Typography>
            </Box>
          ))}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              cursor: 'pointer',
              borderTop: '1px solid #2f3336',
              '&:hover': {
                bgcolor: 'rgba(231, 233, 234, 0.03)',
              },
            }}
          >
            <Typography sx={{ color: '#7B1113', fontSize: '0.9375rem' }}>
              View all concerns
            </Typography>
          </Box>
        </Card>
        </Box>
      </Box>
    </Box>
  );
}
