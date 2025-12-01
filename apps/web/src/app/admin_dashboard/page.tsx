'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BarChartIcon from '@mui/icons-material/BarChart';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VerifiedIcon from '@mui/icons-material/Verified';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReportIcon from '@mui/icons-material/Report';
import BlockIcon from '@mui/icons-material/Block';

// Mock posts data with admin controls
const initialPosts = [
  {
    id: 1,
    author: {
      name: 'Barangay U.P. Campus',
      handle: '@barangayupc',
      avatar: null,
      isVerified: true,
      isOfficial: true,
      role: 'official',
    },
    time: '2h',
    content: '🎄 COMMUNITY CHRISTMAS PARTY 2025 🎄\n\nJoin us for our annual Barangay Christmas celebration!\n\n📅 Date: December 22, 2025\n🕐 Time: 4:00 PM onwards\n📍 Venue: Barangay Hall Covered Court\n\nThere will be games, raffle, and food for all residents. See you there!',
    image: null,
    stats: {
      comments: 156,
      reposts: 892,
      likes: 4500,
      views: 89000,
    },
    isLiked: false,
    isReposted: false,
    isBookmarked: true,
    isPinned: true,
    isHidden: false,
    postType: 'announcement',
    priority: 'high',
  },
  {
    id: 2,
    author: {
      name: 'Barangay U.P. Campus',
      handle: '@barangayupc',
      avatar: null,
      isVerified: true,
      isOfficial: true,
      role: 'official',
    },
    time: '13h',
    content: 'ROAD CLOSURE ADVISORY\n\nQuirino Avenue will be closed for road repair from December 15-20, 2025. Please use alternative routes via C.P. Garcia or University Avenue.\n\nThank you for your understanding.',
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
    isPinned: false,
    isHidden: false,
    postType: 'announcement',
    priority: 'urgent',
  },
  {
    id: 3,
    author: {
      name: 'Juan Dela Cruz',
      handle: '@juandelacruz',
      avatar: null,
      isVerified: false,
      isOfficial: false,
      role: 'resident',
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
    isPinned: false,
    isHidden: false,
    postType: 'concern',
    priority: 'normal',
  },
  {
    id: 4,
    author: {
      name: 'Maria Santos',
      handle: '@mariasantos_up',
      avatar: null,
      isVerified: false,
      isOfficial: false,
      role: 'resident',
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
    isPinned: false,
    isHidden: false,
    postType: 'post',
    priority: 'normal',
  },
  {
    id: 5,
    author: {
      name: 'Ana Garcia',
      handle: '@anagarcia',
      avatar: null,
      isVerified: false,
      isOfficial: false,
      role: 'resident',
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
    isPinned: false,
    isHidden: false,
    postType: 'concern',
    priority: 'high',
    flagged: true,
    flagReason: 'Urgent community issue',
  },
  {
    id: 6,
    author: {
      name: 'Spam Account',
      handle: '@spammer123',
      avatar: null,
      isVerified: false,
      isOfficial: false,
      role: 'resident',
    },
    time: '1h',
    content: 'Buy my products! Visit www.spam-link.com for amazing deals! 🛒💰\n\n#BestDeals #Shopping',
    image: null,
    stats: {
      comments: 0,
      reposts: 0,
      likes: 2,
      views: 150,
    },
    isLiked: false,
    isReposted: false,
    isBookmarked: false,
    isPinned: false,
    isHidden: true,
    postType: 'post',
    priority: 'normal',
    flagged: true,
    flagReason: 'Spam content',
  },
];

const formatNumber = (num: number): string => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return '#F44336';
    case 'high':
      return '#FF9800';
    case 'normal':
      return '#2196F3';
    case 'low':
      return '#4CAF50';
    default:
      return '#71767b';
  }
};

const getPostTypeColor = (type: string) => {
  switch (type) {
    case 'announcement':
      return '#7B1113';
    case 'concern':
      return '#FF9800';
    case 'post':
      return '#71767b';
    default:
      return '#71767b';
  }
};

export default function AdminHomePage() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPostText, setNewPostText] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPost, setSelectedPost] = useState<typeof initialPosts[0] | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [showHidden, setShowHidden] = useState(false);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, post: typeof initialPosts[0]) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedPost(post);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
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



  const handlePin = () => {
    if (selectedPost) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === selectedPost.id ? { ...post, isPinned: !post.isPinned } : post
        )
      );
    }
    handleMenuClose();
  };

  const handleHide = () => {
    if (selectedPost) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === selectedPost.id ? { ...post, isHidden: !post.isHidden } : post
        )
      );
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedPost) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== selectedPost.id));
    }
    setDeleteDialogOpen(false);
    handleMenuClose();
  };

  const handlePost = () => {
    if (!newPostText.trim()) return;

    const newPost = {
      id: Date.now(),
      author: {
        name: 'Barangay U.P. Campus',
        handle: '@barangayupc',
        avatar: null,
        isVerified: true,
        isOfficial: true,
        role: 'official' as const,
      },
      time: 'Just now',
      content: newPostText,
      image: null,
      stats: {
        comments: 0,
        reposts: 0,
        likes: 0,
        views: 0,
      },
      isLiked: false,
      isReposted: false,
      isBookmarked: false,
      isPinned: false,
      isHidden: false,
      postType: 'post',
      priority: 'normal',
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  // Sort posts: pinned first, then by time
  const sortedPosts = [...posts]
    .filter(post => showHidden || !post.isHidden)
    .sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });

  const hiddenCount = posts.filter(p => p.isHidden).length;

  return (
    <Box sx={{ minHeight: '100vh' }}>
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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {hiddenCount > 0 && (
              <Button
                size="small"
                startIcon={showHidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
                onClick={() => setShowHidden(!showHidden)}
                sx={{
                  color: showHidden ? '#7B1113' : '#71767b',
                  textTransform: 'none',
                  fontSize: '0.813rem',
                  '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
                }}
              >
                {showHidden ? 'Hide hidden' : `Show hidden (${hiddenCount})`}
              </Button>
            )}
          </Box>
        </Box>
      </Box>

      {/* Compose Post - Admin Version */}
      <Box sx={{ p: 2, borderBottom: '1px solid #2f3336' }}>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: '#7B1113',
              fontSize: '1.25rem',
              fontWeight: 600,
            }}
          >
            A
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <TextField
              placeholder="Share an update with the community..."
              multiline
              minRows={2}
              maxRows={6}
              fullWidth
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#e7e9ea',
                  fontSize: '1.188rem',
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': { border: 'none' },
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#71767b',
                  opacity: 1,
                },
              }}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pt: 1,
                borderTop: '1px solid #2f3336',
                mt: 1,
              }}
            >
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton size="small" sx={{ color: '#7B1113' }}>
                  <ImageOutlinedIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: '#7B1113' }}>
                  <PollOutlinedIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: '#7B1113' }}>
                  <EmojiEmotionsOutlinedIcon />
                </IconButton>
                <IconButton size="small" sx={{ color: '#7B1113' }}>
                  <ScheduleIcon />
                </IconButton>
              </Box>
              <Button
                variant="contained"
                disabled={!newPostText.trim()}
                onClick={handlePost}
                sx={{
                  bgcolor: '#7B1113',
                  color: '#fff',
                  borderRadius: 5,
                  fontWeight: 700,
                  textTransform: 'none',
                  px: 2.5,
                  '&:hover': { bgcolor: '#9B1315' },
                  '&:disabled': { bgcolor: '#4a0a0b', color: '#6b6b6b' },
                }}
              >
                Post
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Posts Feed */}
      {sortedPosts.map((post) => (
        <Box
          key={post.id}
          sx={{
            p: 2,
            borderBottom: '1px solid #2f3336',
            opacity: post.isHidden ? 0.5 : 1,
            bgcolor: post.isHidden ? 'rgba(244, 67, 54, 0.05)' : 'transparent',
            '&:hover': { bgcolor: post.isHidden ? 'rgba(244, 67, 54, 0.08)' : 'rgba(231, 233, 234, 0.03)' },
          }}
        >
          {/* Pinned indicator */}
          {post.isPinned && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, ml: 6 }}>
              <PushPinIcon sx={{ fontSize: 14, color: '#71767b' }} />
              <Typography sx={{ fontSize: '0.75rem', color: '#71767b', fontWeight: 500 }}>
                Pinned
              </Typography>
            </Box>
          )}

          {/* Hidden indicator */}
          {post.isHidden && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, ml: 6 }}>
              <VisibilityOffIcon sx={{ fontSize: 14, color: '#F44336' }} />
              <Typography sx={{ fontSize: '0.75rem', color: '#F44336', fontWeight: 500 }}>
                Hidden from users
              </Typography>
            </Box>
          )}

          {/* Flagged indicator */}
          {post.flagged && !post.isHidden && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, ml: 6 }}>
              <ReportIcon sx={{ fontSize: 14, color: '#FF9800' }} />
              <Typography sx={{ fontSize: '0.75rem', color: '#FF9800', fontWeight: 500 }}>
                Flagged: {post.flagReason}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {/* Avatar */}
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: post.author.isOfficial ? '#7B1113' : '#2f3336',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              {post.author.isOfficial ? (
                <Box
                  component="img"
                  src="/images/logo.jpg"
                  alt="Barangay"
                  sx={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                post.author.name.charAt(0)
              )}
            </Avatar>

            {/* Content */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Header */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25, flexWrap: 'wrap' }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.938rem',
                    color: '#e7e9ea',
                  }}
                >
                  {post.author.name}
                </Typography>
                {post.author.isVerified && (
                  <VerifiedIcon sx={{ fontSize: 18, color: '#1d9bf0' }} />
                )}
                {post.author.isOfficial && (
                  <Chip
                    label="Official"
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: '0.65rem',
                      bgcolor: 'rgba(123, 17, 19, 0.2)',
                      color: '#7B1113',
                      fontWeight: 600,
                    }}
                  />
                )}
                <Typography sx={{ color: '#71767b', fontSize: '0.938rem' }}>
                  {post.author.handle}
                </Typography>
                <Typography sx={{ color: '#71767b', fontSize: '0.938rem' }}>·</Typography>
                <Typography sx={{ color: '#71767b', fontSize: '0.938rem' }}>
                  {post.time}
                </Typography>
                <Box sx={{ flex: 1 }} />
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, post)}
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

              {/* Badges Row */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5, flexWrap: 'wrap' }}>
                {/* Post Type Badge */}
                <Chip
                  label={post.postType.charAt(0).toUpperCase() + post.postType.slice(1)}
                  size="small"
                  sx={{
                    height: 18,
                    fontSize: '0.6rem',
                    bgcolor: `${getPostTypeColor(post.postType)}20`,
                    color: getPostTypeColor(post.postType),
                  }}
                />
                {post.priority !== 'normal' && (
                  <Chip
                    label={post.priority.charAt(0).toUpperCase() + post.priority.slice(1)}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: '0.6rem',
                      bgcolor: `${getPriorityColor(post.priority)}20`,
                      color: getPriorityColor(post.priority),
                    }}
                  />
                )}
                {/* Role Badge for non-official */}
                {!post.author.isOfficial && (
                  <Chip
                    label={post.author.role.charAt(0).toUpperCase() + post.author.role.slice(1)}
                    size="small"
                    sx={{
                      height: 16,
                      fontSize: '0.6rem',
                      bgcolor: 'rgba(113, 118, 123, 0.2)',
                      color: '#71767b',
                    }}
                  />
                )}
              </Box>

              {/* Post Content */}
              <Typography
                sx={{
                  fontSize: '0.938rem',
                  color: '#e7e9ea',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {post.content}
              </Typography>

              {/* Actions */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 1.5,
                  maxWidth: 425,
                }}
              >
                {/* Comments */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: '#71767b',
                    '&:hover': { color: '#1d9bf0' },
                    cursor: 'pointer',
                  }}
                >
                  <IconButton size="small" sx={{ color: 'inherit' }}>
                    <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                  <Typography sx={{ fontSize: '0.813rem' }}>
                    {formatNumber(post.stats.comments)}
                  </Typography>
                </Box>

                {/* Likes */}
                <Box
                  onClick={() => handleLike(post.id)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: post.isLiked ? '#f91880' : '#71767b',
                    '&:hover': { color: '#f91880' },
                    cursor: 'pointer',
                  }}
                >
                  <IconButton size="small" sx={{ color: 'inherit' }}>
                    {post.isLiked ? (
                      <FavoriteIcon sx={{ fontSize: 18 }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                    )}
                  </IconButton>
                  <Typography sx={{ fontSize: '0.813rem' }}>
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
                    '&:hover': { color: '#1d9bf0' },
                    cursor: 'pointer',
                  }}
                >
                  <IconButton size="small" sx={{ color: 'inherit' }}>
                    <BarChartIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                  <Typography sx={{ fontSize: '0.813rem' }}>
                    {formatNumber(post.stats.views)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}

      {/* Admin Actions Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        disableScrollLock
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            bgcolor: '#000',
            border: '1px solid #2f3336',
            borderRadius: 3,
            minWidth: 220,
            boxShadow: '0 0 15px rgba(255,255,255,0.2)',
          },
        }}
      >
        {selectedPost && (
          <>
            <MenuItem
              onClick={handlePin}
              sx={{
                py: 1.5,
                '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
              }}
            >
              <ListItemIcon>
                {selectedPost.isPinned ? (
                  <PushPinIcon sx={{ color: '#7B1113' }} />
                ) : (
                  <PushPinOutlinedIcon sx={{ color: '#e7e9ea' }} />
                )}
              </ListItemIcon>
              <Typography sx={{ color: '#e7e9ea' }}>
                {selectedPost.isPinned ? 'Unpin post' : 'Pin to top'}
              </Typography>
            </MenuItem>

            <MenuItem
              onClick={handleHide}
              sx={{
                py: 1.5,
                '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
              }}
            >
              <ListItemIcon>
                {selectedPost.isHidden ? (
                  <VisibilityIcon sx={{ color: '#4CAF50' }} />
                ) : (
                  <VisibilityOffIcon sx={{ color: '#FF9800' }} />
                )}
              </ListItemIcon>
              <Typography sx={{ color: '#e7e9ea' }}>
                {selectedPost.isHidden ? 'Show to users' : 'Hide from users'}
              </Typography>
            </MenuItem>

            {selectedPost.author.isOfficial && (
              <MenuItem
                sx={{
                  py: 1.5,
                  '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
                }}
              >
                <ListItemIcon>
                  <EditIcon sx={{ color: '#e7e9ea' }} />
                </ListItemIcon>
                <Typography sx={{ color: '#e7e9ea' }}>Edit post</Typography>
              </MenuItem>
            )}

            <Divider sx={{ borderColor: '#2f3336' }} />

            {!selectedPost.author.isOfficial && (
              <MenuItem
                sx={{
                  py: 1.5,
                  '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
                }}
              >
                <ListItemIcon>
                  <BlockIcon sx={{ color: '#FF9800' }} />
                </ListItemIcon>
                <Typography sx={{ color: '#FF9800' }}>Block user</Typography>
              </MenuItem>
            )}

            <MenuItem
              onClick={() => setDeleteDialogOpen(true)}
              sx={{
                py: 1.5,
                '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.1)' },
              }}
            >
              <ListItemIcon>
                <DeleteIcon sx={{ color: '#F44336' }} />
              </ListItemIcon>
              <Typography sx={{ color: '#F44336' }}>Delete post</Typography>
            </MenuItem>
          </>
        )}
      </Menu>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#000',
            border: '1px solid #2f3336',
            borderRadius: 3,
            maxWidth: 320,
          },
        }}
      >
        <DialogTitle sx={{ color: '#e7e9ea', fontWeight: 700 }}>
          Delete post?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#71767b', fontSize: '0.875rem' }}>
            This can't be undone and it will be removed from the feed permanently.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{
              color: '#e7e9ea',
              textTransform: 'none',
              borderRadius: 5,
              '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            sx={{
              bgcolor: '#F44336',
              color: '#fff',
              textTransform: 'none',
              borderRadius: 5,
              fontWeight: 700,
              '&:hover': { bgcolor: '#d32f2f' },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
