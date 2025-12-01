'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlagIcon from '@mui/icons-material/Flag';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface Suggestion {
  id: number;
  title: string;
  description: string;
  category: string;
  status: 'pending' | 'under_review' | 'approved' | 'implemented' | 'rejected';
  author: {
    name: string;
    avatar: string | null;
  };
  createdAt: string;
  votes: number;
  comments: number;
  hasVoted: boolean;
}

const mockSuggestions: Suggestion[] = [
  {
    id: 1,
    title: 'Add covered waiting areas at barangay hall',
    description: 'It gets really hot during noon when waiting for services. A covered area with benches would be very helpful.',
    category: 'Infrastructure',
    status: 'under_review',
    author: { name: 'Pedro Garcia', avatar: null },
    createdAt: '2025-12-01T06:00:00',
    votes: 89,
    comments: 23,
    hasVoted: false,
  },
  {
    id: 2,
    title: 'Extend barangay office hours on weekends',
    description: 'Many residents work during weekdays. Having weekend hours would make it easier to process documents.',
    category: 'Services',
    status: 'pending',
    author: { name: 'Maria Santos', avatar: null },
    createdAt: '2025-11-30T14:00:00',
    votes: 156,
    comments: 45,
    hasVoted: true,
  },
  {
    id: 3,
    title: 'Install CCTV cameras in dark areas',
    description: 'For improved security, especially in Areas 5, 8, and 12 where streetlights are insufficient.',
    category: 'Security',
    status: 'approved',
    author: { name: 'Juan Dela Cruz', avatar: null },
    createdAt: '2025-11-28T10:00:00',
    votes: 234,
    comments: 67,
    hasVoted: true,
  },
  {
    id: 4,
    title: 'Community garden project',
    description: 'Propose to convert the vacant lot near Area 3 into a community garden where residents can grow vegetables.',
    category: 'Environment',
    status: 'implemented',
    author: { name: 'Ana Reyes', avatar: null },
    createdAt: '2025-11-20T08:00:00',
    votes: 312,
    comments: 89,
    hasVoted: false,
  },
  {
    id: 5,
    title: 'Free WiFi in barangay hall',
    description: 'Provide free WiFi for residents waiting for services or using the barangay facilities.',
    category: 'Services',
    status: 'rejected',
    author: { name: 'Carlos Mendoza', avatar: null },
    createdAt: '2025-11-15T12:00:00',
    votes: 45,
    comments: 12,
    hasVoted: false,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return '#71767b';
    case 'under_review': return '#FF9800';
    case 'approved': return '#2196F3';
    case 'implemented': return '#4CAF50';
    case 'rejected': return '#F44336';
    default: return '#71767b';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export default function ModeratorSuggestionsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState(mockSuggestions);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, suggestion: Suggestion) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedSuggestion(suggestion);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleVote = (id: number) => {
    setSuggestions(prev =>
      prev.map(s =>
        s.id === id
          ? { ...s, hasVoted: !s.hasVoted, votes: s.hasVoted ? s.votes - 1 : s.votes + 1 }
          : s
      )
    );
  };

  const filteredSuggestions = suggestions.filter(suggestion => {
    const matchesSearch = suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (tabValue === 0) return matchesSearch;
    if (tabValue === 1) return matchesSearch && suggestion.status === 'pending';
    if (tabValue === 2) return matchesSearch && suggestion.status === 'under_review';
    if (tabValue === 3) return matchesSearch && (suggestion.status === 'approved' || suggestion.status === 'implemented');
    return matchesSearch;
  });

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
        <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#e7e9ea' }}>
          Suggestions
        </Typography>
        <Typography sx={{ fontSize: '0.8125rem', color: '#71767b' }}>
          Review community suggestions and feature requests
        </Typography>
      </Box>

      {/* Search */}
      <Box sx={{ p: 2, borderBottom: '1px solid #2f3336' }}>
        <TextField
          fullWidth
          placeholder="Search suggestions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#71767b' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              bgcolor: '#16181c',
              borderRadius: 7.5,
              color: '#e7e9ea',
              '& fieldset': { borderColor: 'transparent' },
              '&:hover fieldset': { borderColor: '#2f3336' },
              '&.Mui-focused fieldset': { borderColor: '#1d9bf0' },
            },
          }}
        />
      </Box>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={(_, v) => setTabValue(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          borderBottom: '1px solid #2f3336',
          '& .MuiTab-root': {
            color: '#71767b',
            textTransform: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            minWidth: 'auto',
            px: 2,
            '&.Mui-selected': { color: '#e7e9ea' },
          },
          '& .MuiTabs-indicator': { bgcolor: '#1d9bf0' },
        }}
      >
        <Tab label={`All (${suggestions.length})`} />
        <Tab label={`Pending (${suggestions.filter(s => s.status === 'pending').length})`} />
        <Tab label={`Under Review (${suggestions.filter(s => s.status === 'under_review').length})`} />
        <Tab label={`Approved (${suggestions.filter(s => s.status === 'approved' || s.status === 'implemented').length})`} />
      </Tabs>

      {/* Suggestions List */}
      {filteredSuggestions.map((suggestion) => (
        <Box
          key={suggestion.id}
          sx={{
            p: 2,
            borderBottom: '1px solid #2f3336',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.03)' },
          }}
        >
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {/* Vote Section */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: 50,
              }}
            >
              <IconButton
                onClick={() => handleVote(suggestion.id)}
                sx={{
                  color: suggestion.hasVoted ? '#1d9bf0' : '#71767b',
                  '&:hover': { bgcolor: 'rgba(29, 155, 240, 0.1)' },
                }}
              >
                {suggestion.hasVoted ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
              </IconButton>
              <Typography
                sx={{
                  fontWeight: 700,
                  color: suggestion.hasVoted ? '#1d9bf0' : '#e7e9ea',
                }}
              >
                {suggestion.votes}
              </Typography>
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Header */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.938rem', color: '#e7e9ea' }}>
                    {suggestion.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Avatar sx={{ width: 20, height: 20, fontSize: '0.7rem', bgcolor: '#2f3336' }}>
                      {suggestion.author.name.charAt(0)}
                    </Avatar>
                    <Typography sx={{ color: '#71767b', fontSize: '0.813rem' }}>
                      {suggestion.author.name}
                    </Typography>
                    <Typography sx={{ color: '#71767b', fontSize: '0.813rem' }}>·</Typography>
                    <Typography sx={{ color: '#71767b', fontSize: '0.813rem' }}>
                      {formatDate(suggestion.createdAt)}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, suggestion)}
                  sx={{ color: '#71767b' }}
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>

              {/* Badges */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                <Chip
                  label={suggestion.status.replace('_', ' ')}
                  size="small"
                  sx={{
                    height: 22,
                    bgcolor: `${getStatusColor(suggestion.status)}20`,
                    color: getStatusColor(suggestion.status),
                    textTransform: 'capitalize',
                  }}
                />
                <Chip
                  label={suggestion.category}
                  size="small"
                  sx={{
                    height: 22,
                    bgcolor: 'rgba(113, 118, 123, 0.2)',
                    color: '#71767b',
                  }}
                />
              </Box>

              {/* Description */}
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  color: '#e7e9ea',
                  mb: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {suggestion.description}
              </Typography>

              {/* Comments */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#71767b' }}>
                <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
                <Typography sx={{ fontSize: '0.813rem' }}>
                  {suggestion.comments} comments
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}

      {/* Action Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            bgcolor: '#000',
            border: '1px solid #2f3336',
            borderRadius: 2,
            minWidth: 180,
          },
        }}
      >
        <MenuItem
          onClick={handleMenuClose}
          sx={{ color: '#e7e9ea', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <ListItemIcon>
            <VisibilityIcon sx={{ color: '#e7e9ea', fontSize: 20 }} />
          </ListItemIcon>
          View Details
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          sx={{ color: '#4CAF50', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <ListItemIcon>
            <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
          </ListItemIcon>
          Approve
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          sx={{ color: '#FF9800', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <ListItemIcon>
            <FlagIcon sx={{ color: '#FF9800', fontSize: 20 }} />
          </ListItemIcon>
          Flag for Admin
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          sx={{ color: '#F44336', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <ListItemIcon>
            <VisibilityOffIcon sx={{ color: '#F44336', fontSize: 20 }} />
          </ListItemIcon>
          Hide
        </MenuItem>
      </Menu>
    </Box>
  );
}
