'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BarChartIcon from '@mui/icons-material/BarChart';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VerifiedIcon from '@mui/icons-material/Verified';
import PushPinIcon from '@mui/icons-material/PushPin';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FlagIcon from '@mui/icons-material/Flag';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Post {
  id: number;
  author: {
    name: string;
    handle: string;
    avatar: string | null;
    isVerified: boolean;
    isOfficial: boolean;
    role: string;
  };
  time: string;
  content: string;
  image: string | null;
  stats: {
    comments: number;
    likes: number;
    views: number;
  };
  isLiked: boolean;
  isPinned: boolean;
  isHidden: boolean;
  postType: string;
  flagged: boolean;
  flagReason: string | null;
}

// Mock posts data
const initialPosts: Post[] = [
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
      likes: 4500,
      views: 89000,
    },
    isLiked: false,
    isPinned: true,
    isHidden: false,
    postType: 'announcement',
    flagged: false,
    flagReason: null,
  },
  {
    id: 2,
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
      likes: 34,
      views: 1200,
    },
    isLiked: true,
    isPinned: false,
    isHidden: false,
    postType: 'concern',
    flagged: true,
    flagReason: 'Possible duplicate report',
  },
  {
    id: 3,
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
      likes: 67,
      views: 890,
    },
    isLiked: false,
    isPinned: false,
    isHidden: false,
    postType: 'post',
    flagged: false,
    flagReason: null,
  },
  {
    id: 4,
    author: {
      name: 'Anonymous User',
      handle: '@anonymous123',
      avatar: null,
      isVerified: false,
      isOfficial: false,
      role: 'resident',
    },
    time: '1h',
    content: 'This is inappropriate content that has been flagged for review by moderators.',
    image: null,
    stats: {
      comments: 2,
      likes: 1,
      views: 45,
    },
    isLiked: false,
    isPinned: false,
    isHidden: true,
    postType: 'post',
    flagged: true,
    flagReason: 'Inappropriate content',
  },
  {
    id: 5,
    author: {
      name: 'Pedro Garcia',
      handle: '@pedrog',
      avatar: null,
      isVerified: false,
      isOfficial: false,
      role: 'resident',
    },
    time: '6h',
    content: 'Suggestion: Can we have more covered waiting areas at the barangay hall? It gets really hot during noon. ☀️\n\n#Suggestion #BarangayServices',
    image: null,
    stats: {
      comments: 23,
      likes: 89,
      views: 2100,
    },
    isLiked: false,
    isPinned: false,
    isHidden: false,
    postType: 'suggestion',
    flagged: false,
    flagReason: null,
  },
];

const formatNumber = (num: number) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

const getPostTypeColor = (type: string) => {
  switch (type) {
    case 'announcement':
      return '#7B1113';
    case 'concern':
      return '#FF9800';
    case 'suggestion':
      return '#2196F3';
    default:
      return '#71767b';
  }
};

export default function ModeratorDashboardPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPost, setSelectedPost] = useState<typeof initialPosts[0] | null>(null);
  const [showHidden, setShowHidden] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [flagDialogOpen, setFlagDialogOpen] = useState(false);
  const [flagReason, setFlagReason] = useState('');
  const [newPostText, setNewPostText] = useState('');

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

  const handleFlag = () => {
    if (selectedPost && flagReason.trim()) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === selectedPost.id
            ? { ...post, flagged: true, flagReason: flagReason.trim() }
            : post
        )
      );
    }
    setFlagDialogOpen(false);
    setFlagReason('');
    handleMenuClose();
  };

  const handleUnflag = () => {
    if (selectedPost) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === selectedPost.id
            ? { ...post, flagged: false, flagReason: null }
            : post
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

  const visiblePosts = showHidden ? posts : posts.filter((post) => !post.isHidden);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #2f3336',
          zIndex: 100,
          px: 2,
          py: 1.5,
        }}
      >
        <Typography
          sx={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#e7e9ea',
          }}
        >
          Home
        </Typography>
        <Typography sx={{ fontSize: '0.8125rem', color: '#71767b' }}>
          Review and moderate community content
        </Typography>
      </Box>

      {/* Compose Post */}
      <Box sx={{ p: 2, borderBottom: '1px solid #2f3336' }}>
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: '#228B22',
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            M
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <TextField
              fullWidth
              multiline
              placeholder="Share an update with the community..."
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
                <IconButton size="small" sx={{ color: '#228B22' }}>
                  <ImageOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: '#228B22' }}>
                  <GifBoxOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: '#228B22' }}>
                  <PollOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: '#228B22' }}>
                  <EmojiEmotionsOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" sx={{ color: '#228B22' }}>
                  <LocationOnOutlinedIcon fontSize="small" />
                </IconButton>
              </Box>
              <Button
                variant="contained"
                disabled={!newPostText.trim()}
                sx={{
                  bgcolor: '#228B22',
                  color: 'white',
                  borderRadius: 5,
                  textTransform: 'none',
                  fontWeight: 700,
                  px: 2.5,
                  '&:hover': {
                    bgcolor: '#1a6b1a',
                  },
                  '&.Mui-disabled': {
                    bgcolor: 'rgba(34, 139, 34, 0.5)',
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

      {/* Show Hidden Toggle */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          px: 2,
          py: 1,
          borderBottom: '1px solid #2f3336',
        }}
      >
        <Chip
          icon={showHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
          label={showHidden ? 'Showing hidden posts' : 'Hidden posts not shown'}
          onClick={() => setShowHidden(!showHidden)}
          sx={{
            bgcolor: showHidden ? 'rgba(244, 67, 54, 0.2)' : 'rgba(113, 118, 123, 0.2)',
            color: showHidden ? '#F44336' : '#71767b',
            '& .MuiChip-icon': {
              color: 'inherit',
            },
          }}
        />
      </Box>

      {/* Posts Feed */}
      {visiblePosts.map((post) => (
        <Box
          key={post.id}
          sx={{
            p: 2,
            borderBottom: '1px solid #2f3336',
            opacity: post.isHidden ? 0.6 : 1,
            bgcolor: post.flagged ? 'rgba(244, 67, 54, 0.05)' : 'transparent',
            '&:hover': {
              bgcolor: post.flagged ? 'rgba(244, 67, 54, 0.08)' : 'rgba(255, 255, 255, 0.03)',
            },
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
              <FlagIcon sx={{ fontSize: 14, color: '#FF9800' }} />
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
                      color: '#1d9bf0',
                      bgcolor: 'rgba(29, 155, 240, 0.1)',
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

      {/* Moderation Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
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
            mt: 0.5,
          },
        }}
      >
        {selectedPost && (
          <>
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
                {selectedPost.isHidden ? 'Show post' : 'Hide post'}
              </Typography>
            </MenuItem>

            {selectedPost.flagged ? (
              <MenuItem
                onClick={handleUnflag}
                sx={{
                  py: 1.5,
                  '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
                }}
              >
                <ListItemIcon>
                  <CheckCircleIcon sx={{ color: '#4CAF50' }} />
                </ListItemIcon>
                <Typography sx={{ color: '#e7e9ea' }}>Remove flag</Typography>
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  setFlagDialogOpen(true);
                }}
                sx={{
                  py: 1.5,
                  '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
                }}
              >
                <ListItemIcon>
                  <FlagIcon sx={{ color: '#FF9800' }} />
                </ListItemIcon>
                <Typography sx={{ color: '#e7e9ea' }}>Flag for review</Typography>
              </MenuItem>
            )}

            <MenuItem
              onClick={() => {
                handleMenuClose();
                setDeleteDialogOpen(true);
              }}
              sx={{
                py: 1.5,
                '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
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

      {/* Flag Dialog */}
      <Dialog
        open={flagDialogOpen}
        onClose={() => setFlagDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#000',
            border: '1px solid #2f3336',
            borderRadius: 3,
            minWidth: 400,
          },
        }}
      >
        <DialogTitle sx={{ color: '#e7e9ea', borderBottom: '1px solid #2f3336' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FlagIcon sx={{ color: '#FF9800' }} />
            Flag Content
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography sx={{ color: '#71767b', mb: 2, fontSize: '0.875rem' }}>
            Provide a reason for flagging this content for admin review.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Enter reason for flagging..."
            value={flagReason}
            onChange={(e) => setFlagReason(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#e7e9ea',
                '& fieldset': { borderColor: '#2f3336' },
                '&:hover fieldset': { borderColor: '#1d9bf0' },
                '&.Mui-focused fieldset': { borderColor: '#1d9bf0' },
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setFlagDialogOpen(false)}
            sx={{ color: '#71767b' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleFlag}
            disabled={!flagReason.trim()}
            variant="contained"
            sx={{
              bgcolor: '#FF9800',
              '&:hover': { bgcolor: '#F57C00' },
              '&:disabled': { bgcolor: '#2f3336' },
            }}
          >
            Flag Content
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#000',
            border: '1px solid #2f3336',
            borderRadius: 3,
            minWidth: 400,
          },
        }}
      >
        <DialogTitle sx={{ color: '#e7e9ea', borderBottom: '1px solid #2f3336' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningIcon sx={{ color: '#F44336' }} />
            Delete Post
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography sx={{ color: '#e7e9ea' }}>
            Are you sure you want to delete this post? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            sx={{ color: '#71767b' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="contained"
            sx={{
              bgcolor: '#F44336',
              '&:hover': { bgcolor: '#D32F2F' },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
