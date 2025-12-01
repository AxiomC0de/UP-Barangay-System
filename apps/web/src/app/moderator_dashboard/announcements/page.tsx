'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

// Mock announcements data
const mockAnnouncements = [
  {
    id: 1,
    title: 'Community Christmas Party 2025',
    content: 'Join us for the annual Christmas celebration at the Barangay Hall on December 20, 2025. There will be games, prizes, and food for everyone! Don\'t miss out on this festive event.',
    category: 'events',
    priority: 'high',
    isPublished: true,
    isPinned: true,
    author: 'Moderator User',
    createdAt: '2025-11-28T10:00:00',
    publishedAt: '2025-11-28T10:30:00',
    expiresAt: '2025-12-21T00:00:00',
    viewCount: 1245,
    targetDistricts: [] as string[],
  },
  {
    id: 2,
    title: 'Water Interruption Notice - Area 5 & 6',
    content: 'Please be advised that there will be a scheduled water interruption on December 5, 2025 from 8:00 AM to 5:00 PM for maintenance purposes. Kindly store enough water for your needs.',
    category: 'utilities',
    priority: 'urgent',
    isPublished: true,
    isPinned: false,
    author: 'Admin User',
    createdAt: '2025-11-30T08:00:00',
    publishedAt: '2025-11-30T08:15:00',
    expiresAt: '2025-12-06T00:00:00',
    viewCount: 892,
    targetDistricts: ['Area 5', 'Area 6'],
  },
  {
    id: 3,
    title: 'New Garbage Collection Schedule',
    content: 'Starting January 2026, the garbage collection schedule will be updated. Biodegradable: Monday, Wednesday, Friday. Non-biodegradable: Tuesday, Thursday. Special waste: Saturday.',
    category: 'general',
    priority: 'normal',
    isPublished: true,
    isPinned: false,
    author: 'Moderator User',
    createdAt: '2025-11-25T14:00:00',
    publishedAt: '2025-11-25T14:30:00',
    expiresAt: '2026-01-31T00:00:00',
    viewCount: 567,
    targetDistricts: [] as string[],
  },
  {
    id: 4,
    title: 'Barangay Clearance Requirements Update',
    content: 'For faster processing of barangay clearance, please prepare the following: Valid ID, Proof of residency, 2x2 photo, and the accomplished application form available at the barangay hall.',
    category: 'services',
    priority: 'normal',
    isPublished: false,
    isPinned: false,
    author: 'Moderator User',
    createdAt: '2025-11-29T09:00:00',
    publishedAt: '',
    expiresAt: '',
    viewCount: 0,
    targetDistricts: [] as string[],
  },
  {
    id: 5,
    title: 'Emergency Hotline Numbers',
    content: 'Save these emergency numbers: Barangay Hall: (02) 8981-XXXX, Police Station: 911, Fire Department: (02) 8426-XXXX, Medical Emergency: (02) 8527-XXXX',
    category: 'emergency',
    priority: 'high',
    isPublished: true,
    isPinned: true,
    author: 'Admin User',
    createdAt: '2025-10-15T10:00:00',
    publishedAt: '2025-10-15T10:00:00',
    expiresAt: '',
    viewCount: 2341,
    targetDistricts: [] as string[],
  },
];

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'general', label: 'General' },
  { value: 'events', label: 'Events' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'services', label: 'Services' },
  { value: 'emergency', label: 'Emergency' },
];

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

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'events':
      return '#9C27B0';
    case 'utilities':
      return '#FF9800';
    case 'services':
      return '#2196F3';
    case 'emergency':
      return '#F44336';
    default:
      return '#71767b';
  }
};

const formatDate = (dateString: string | null) => {
  if (!dateString) return 'Not set';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

export default function ModeratorAnnouncementsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<typeof mockAnnouncements[0] | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    category: 'general',
    priority: 'normal',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, announcement: typeof mockAnnouncements[0]) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedAnnouncement(announcement);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleTogglePublish = () => {
    if (selectedAnnouncement) {
      setAnnouncements(prev =>
        prev.map(a =>
          a.id === selectedAnnouncement.id
            ? { ...a, isPublished: !a.isPublished, publishedAt: !a.isPublished ? new Date().toISOString() : '' }
            : a
        )
      );
    }
    handleMenuClose();
  };

  const handleTogglePin = () => {
    if (selectedAnnouncement) {
      setAnnouncements(prev =>
        prev.map(a =>
          a.id === selectedAnnouncement.id ? { ...a, isPinned: !a.isPinned } : a
        )
      );
    }
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedAnnouncement) {
      setAnnouncements(prev => prev.filter(a => a.id !== selectedAnnouncement.id));
    }
    setDeleteDialogOpen(false);
    handleMenuClose();
  };

  const handleCreateAnnouncement = () => {
    if (newAnnouncement.title.trim() && newAnnouncement.content.trim()) {
      const newId = Math.max(...announcements.map(a => a.id)) + 1;
      setAnnouncements(prev => [
        {
          id: newId,
          title: newAnnouncement.title,
          content: newAnnouncement.content,
          category: newAnnouncement.category,
          priority: newAnnouncement.priority,
          isPublished: false,
          isPinned: false,
          author: 'Moderator User',
          createdAt: new Date().toISOString(),
          publishedAt: '',
          expiresAt: '',
          viewCount: 0,
          targetDistricts: [],
        },
        ...prev,
      ]);
      setNewAnnouncement({ title: '', content: '', category: 'general', priority: 'normal' });
      setCreateDialogOpen(false);
    }
  };

  const handleEditAnnouncement = () => {
    if (selectedAnnouncement && newAnnouncement.title.trim() && newAnnouncement.content.trim()) {
      setAnnouncements(prev =>
        prev.map(a =>
          a.id === selectedAnnouncement.id
            ? {
                ...a,
                title: newAnnouncement.title,
                content: newAnnouncement.content,
                category: newAnnouncement.category,
                priority: newAnnouncement.priority,
              }
            : a
        )
      );
      setNewAnnouncement({ title: '', content: '', category: 'general', priority: 'normal' });
      setEditDialogOpen(false);
      handleMenuClose();
    }
  };

  const openEditDialog = () => {
    if (selectedAnnouncement) {
      setNewAnnouncement({
        title: selectedAnnouncement.title,
        content: selectedAnnouncement.content,
        category: selectedAnnouncement.category,
        priority: selectedAnnouncement.priority,
      });
      setEditDialogOpen(true);
    }
  };

  // Filter announcements based on tab, search, and category
  const filteredAnnouncements = announcements.filter(announcement => {
    // Tab filter
    if (tabValue === 1 && !announcement.isPublished) return false;
    if (tabValue === 2 && announcement.isPublished) return false;
    if (tabValue === 3 && !announcement.isPinned) return false;

    // Search filter
    if (searchQuery && !announcement.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Category filter
    if (categoryFilter !== 'all' && announcement.category !== categoryFilter) {
      return false;
    }

    return true;
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
          zIndex: 100,
          borderBottom: '1px solid #2f3336',
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
                Announcements
              </Typography>
              <Typography sx={{ fontSize: '0.8125rem', color: '#71767b' }}>
                Create and manage announcements
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setCreateDialogOpen(true)}
              sx={{
                bgcolor: '#1d9bf0',
                color: '#fff',
                textTransform: 'none',
                borderRadius: 5,
                px: 2,
                '&:hover': { bgcolor: '#1a8cd8' },
              }}
            >
              New
            </Button>
          </Box>
        </Box>

        {/* Search Bar */}
        <Box sx={{ px: 2, pb: 1.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: '#202327',
              borderRadius: '9999px',
              px: 2,
              py: 1,
              gap: 1,
            }}
          >
            <SearchIcon sx={{ color: '#71767b', fontSize: 20 }} />
            <Box
              component="input"
              placeholder="Search announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                flex: 1,
                bgcolor: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#e7e9ea',
                fontSize: '0.938rem',
                '&::placeholder': {
                  color: '#71767b',
                },
              }}
            />
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              bgcolor: '#1d9bf0',
            },
          }}
        >
          <Tab
            label="All"
            sx={{
              color: tabValue === 0 ? '#e7e9ea' : '#71767b',
              textTransform: 'none',
              fontWeight: tabValue === 0 ? 700 : 400,
              fontSize: '0.875rem',
              '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
            }}
          />
          <Tab
            label="Published"
            sx={{
              color: tabValue === 1 ? '#e7e9ea' : '#71767b',
              textTransform: 'none',
              fontWeight: tabValue === 1 ? 700 : 400,
              fontSize: '0.875rem',
              '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
            }}
          />
          <Tab
            label="Drafts"
            sx={{
              color: tabValue === 2 ? '#e7e9ea' : '#71767b',
              textTransform: 'none',
              fontWeight: tabValue === 2 ? 700 : 400,
              fontSize: '0.875rem',
              '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
            }}
          />
          <Tab
            label="Pinned"
            sx={{
              color: tabValue === 3 ? '#e7e9ea' : '#71767b',
              textTransform: 'none',
              fontWeight: tabValue === 3 ? 700 : 400,
              fontSize: '0.875rem',
              '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
            }}
          />
        </Tabs>
      </Box>

      {/* Category Filter */}
      <Box sx={{ px: 2, py: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap', borderBottom: '1px solid #2f3336' }}>
        {categories.map((cat) => (
          <Chip
            key={cat.value}
            label={cat.label}
            onClick={() => setCategoryFilter(cat.value)}
            sx={{
              bgcolor: categoryFilter === cat.value ? '#1d9bf0' : '#202327',
              color: categoryFilter === cat.value ? '#fff' : '#e7e9ea',
              '&:hover': {
                bgcolor: categoryFilter === cat.value ? '#1a8cd8' : '#2f3336',
              },
            }}
          />
        ))}
      </Box>

      {/* Announcements List */}
      <Box>
        {filteredAnnouncements.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ color: '#71767b', fontSize: '0.938rem' }}>
              No announcements found
            </Typography>
          </Box>
        ) : (
          filteredAnnouncements.map((announcement) => (
            <Box
              key={announcement.id}
              sx={{
                p: 2,
                borderBottom: '1px solid #2f3336',
                '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.03)' },
              }}
            >
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Box sx={{ flex: 1 }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                    {announcement.isPinned && (
                      <PushPinIcon sx={{ fontSize: 16, color: '#1d9bf0' }} />
                    )}
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: '#e7e9ea',
                        flex: 1,
                      }}
                    >
                      {announcement.title}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, announcement)}
                      sx={{ color: '#71767b' }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* Content Preview */}
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: '#e7e9ea',
                      mb: 1.5,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {announcement.content}
                  </Typography>

                  {/* Tags */}
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap', mb: 1.5 }}>
                    <Chip
                      label={announcement.isPublished ? 'Published' : 'Draft'}
                      size="small"
                      icon={announcement.isPublished ? <VisibilityIcon sx={{ fontSize: '14px !important' }} /> : <VisibilityOffIcon sx={{ fontSize: '14px !important' }} />}
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        bgcolor: announcement.isPublished ? 'rgba(76, 175, 80, 0.2)' : 'rgba(113, 118, 123, 0.2)',
                        color: announcement.isPublished ? '#4CAF50' : '#71767b',
                        '& .MuiChip-icon': {
                          color: announcement.isPublished ? '#4CAF50' : '#71767b',
                        },
                      }}
                    />
                    <Chip
                      label={announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                      size="small"
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        bgcolor: `${getPriorityColor(announcement.priority)}20`,
                        color: getPriorityColor(announcement.priority),
                      }}
                    />
                    <Chip
                      label={announcement.category.charAt(0).toUpperCase() + announcement.category.slice(1)}
                      size="small"
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        bgcolor: `${getCategoryColor(announcement.category)}20`,
                        color: getCategoryColor(announcement.category),
                      }}
                    />
                    {announcement.targetDistricts.length > 0 && (
                      <Chip
                        label={announcement.targetDistricts.join(', ')}
                        size="small"
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          bgcolor: 'rgba(33, 150, 243, 0.2)',
                          color: '#2196F3',
                        }}
                      />
                    )}
                  </Box>

                  {/* Meta Info */}
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                      By: {announcement.author}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                      Created: {formatDate(announcement.createdAt)}
                    </Typography>
                    {announcement.publishedAt && (
                      <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                        Published: {formatDate(announcement.publishedAt)}
                      </Typography>
                    )}
                    <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                      👁 {announcement.viewCount.toLocaleString()} views
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* Action Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
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
          onClick={openEditDialog}
          sx={{ color: '#e7e9ea', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <EditIcon sx={{ mr: 1.5, fontSize: 20 }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={handleTogglePublish}
          sx={{ color: '#e7e9ea', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          {selectedAnnouncement?.isPublished ? (
            <>
              <VisibilityOffIcon sx={{ mr: 1.5, fontSize: 20 }} />
              Unpublish
            </>
          ) : (
            <>
              <VisibilityIcon sx={{ mr: 1.5, fontSize: 20 }} />
              Publish
            </>
          )}
        </MenuItem>
        <MenuItem
          onClick={handleTogglePin}
          sx={{ color: '#e7e9ea', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          {selectedAnnouncement?.isPinned ? (
            <>
              <PushPinOutlinedIcon sx={{ mr: 1.5, fontSize: 20 }} />
              Unpin
            </>
          ) : (
            <>
              <PushPinIcon sx={{ mr: 1.5, fontSize: 20 }} />
              Pin
            </>
          )}
        </MenuItem>
        <MenuItem
          onClick={() => {
            setDeleteDialogOpen(true);
          }}
          sx={{ color: '#F44336', '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.1)' } }}
        >
          <DeleteIcon sx={{ mr: 1.5, fontSize: 20 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Create Announcement Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            bgcolor: '#000',
            border: '1px solid #2f3336',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ color: '#e7e9ea', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Create New Announcement
          <IconButton onClick={() => setCreateDialogOpen(false)} sx={{ color: '#71767b' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={newAnnouncement.title}
            onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
            sx={{
              mt: 1,
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: '#e7e9ea',
                '& fieldset': { borderColor: '#2f3336' },
                '&:hover fieldset': { borderColor: '#1d9bf0' },
                '&.Mui-focused fieldset': { borderColor: '#1d9bf0' },
              },
              '& .MuiInputLabel-root': { color: '#71767b' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#1d9bf0' },
            }}
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={4}
            value={newAnnouncement.content}
            onChange={(e) => setNewAnnouncement(prev => ({ ...prev, content: e.target.value }))}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: '#e7e9ea',
                '& fieldset': { borderColor: '#2f3336' },
                '&:hover fieldset': { borderColor: '#1d9bf0' },
                '&.Mui-focused fieldset': { borderColor: '#1d9bf0' },
              },
              '& .MuiInputLabel-root': { color: '#71767b' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#1d9bf0' },
            }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: '#71767b' }}>Category</InputLabel>
              <Select
                value={newAnnouncement.category}
                label="Category"
                onChange={(e) => setNewAnnouncement(prev => ({ ...prev, category: e.target.value }))}
                sx={{
                  color: '#e7e9ea',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2f3336' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1d9bf0' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1d9bf0' },
                  '& .MuiSvgIcon-root': { color: '#71767b' },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: { bgcolor: '#16181c', border: '1px solid #2f3336' },
                  },
                }}
              >
                <MenuItem value="general" sx={{ color: '#e7e9ea' }}>General</MenuItem>
                <MenuItem value="events" sx={{ color: '#e7e9ea' }}>Events</MenuItem>
                <MenuItem value="utilities" sx={{ color: '#e7e9ea' }}>Utilities</MenuItem>
                <MenuItem value="services" sx={{ color: '#e7e9ea' }}>Services</MenuItem>
                <MenuItem value="emergency" sx={{ color: '#e7e9ea' }}>Emergency</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: '#71767b' }}>Priority</InputLabel>
              <Select
                value={newAnnouncement.priority}
                label="Priority"
                onChange={(e) => setNewAnnouncement(prev => ({ ...prev, priority: e.target.value }))}
                sx={{
                  color: '#e7e9ea',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2f3336' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1d9bf0' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1d9bf0' },
                  '& .MuiSvgIcon-root': { color: '#71767b' },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: { bgcolor: '#16181c', border: '1px solid #2f3336' },
                  },
                }}
              >
                <MenuItem value="low" sx={{ color: '#e7e9ea' }}>Low</MenuItem>
                <MenuItem value="normal" sx={{ color: '#e7e9ea' }}>Normal</MenuItem>
                <MenuItem value="high" sx={{ color: '#e7e9ea' }}>High</MenuItem>
                <MenuItem value="urgent" sx={{ color: '#e7e9ea' }}>Urgent</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
            Note: Announcements are saved as drafts. You can publish them later.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setCreateDialogOpen(false)}
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
            onClick={handleCreateAnnouncement}
            variant="contained"
            disabled={!newAnnouncement.title.trim() || !newAnnouncement.content.trim()}
            sx={{
              bgcolor: '#1d9bf0',
              color: '#fff',
              textTransform: 'none',
              borderRadius: 5,
              '&:hover': { bgcolor: '#1a8cd8' },
              '&.Mui-disabled': { bgcolor: 'rgba(29, 155, 240, 0.5)', color: 'rgba(255, 255, 255, 0.5)' },
            }}
          >
            Create Draft
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Announcement Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            bgcolor: '#000',
            border: '1px solid #2f3336',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ color: '#e7e9ea', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Edit Announcement
          <IconButton onClick={() => setEditDialogOpen(false)} sx={{ color: '#71767b' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={newAnnouncement.title}
            onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
            sx={{
              mt: 1,
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: '#e7e9ea',
                '& fieldset': { borderColor: '#2f3336' },
                '&:hover fieldset': { borderColor: '#1d9bf0' },
                '&.Mui-focused fieldset': { borderColor: '#1d9bf0' },
              },
              '& .MuiInputLabel-root': { color: '#71767b' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#1d9bf0' },
            }}
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={4}
            value={newAnnouncement.content}
            onChange={(e) => setNewAnnouncement(prev => ({ ...prev, content: e.target.value }))}
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: '#e7e9ea',
                '& fieldset': { borderColor: '#2f3336' },
                '&:hover fieldset': { borderColor: '#1d9bf0' },
                '&.Mui-focused fieldset': { borderColor: '#1d9bf0' },
              },
              '& .MuiInputLabel-root': { color: '#71767b' },
              '& .MuiInputLabel-root.Mui-focused': { color: '#1d9bf0' },
            }}
          />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: '#71767b' }}>Category</InputLabel>
              <Select
                value={newAnnouncement.category}
                label="Category"
                onChange={(e) => setNewAnnouncement(prev => ({ ...prev, category: e.target.value }))}
                sx={{
                  color: '#e7e9ea',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2f3336' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1d9bf0' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1d9bf0' },
                  '& .MuiSvgIcon-root': { color: '#71767b' },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: { bgcolor: '#16181c', border: '1px solid #2f3336' },
                  },
                }}
              >
                <MenuItem value="general" sx={{ color: '#e7e9ea' }}>General</MenuItem>
                <MenuItem value="events" sx={{ color: '#e7e9ea' }}>Events</MenuItem>
                <MenuItem value="utilities" sx={{ color: '#e7e9ea' }}>Utilities</MenuItem>
                <MenuItem value="services" sx={{ color: '#e7e9ea' }}>Services</MenuItem>
                <MenuItem value="emergency" sx={{ color: '#e7e9ea' }}>Emergency</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: '#71767b' }}>Priority</InputLabel>
              <Select
                value={newAnnouncement.priority}
                label="Priority"
                onChange={(e) => setNewAnnouncement(prev => ({ ...prev, priority: e.target.value }))}
                sx={{
                  color: '#e7e9ea',
                  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2f3336' },
                  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1d9bf0' },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1d9bf0' },
                  '& .MuiSvgIcon-root': { color: '#71767b' },
                }}
                MenuProps={{
                  PaperProps: {
                    sx: { bgcolor: '#16181c', border: '1px solid #2f3336' },
                  },
                }}
              >
                <MenuItem value="low" sx={{ color: '#e7e9ea' }}>Low</MenuItem>
                <MenuItem value="normal" sx={{ color: '#e7e9ea' }}>Normal</MenuItem>
                <MenuItem value="high" sx={{ color: '#e7e9ea' }}>High</MenuItem>
                <MenuItem value="urgent" sx={{ color: '#e7e9ea' }}>Urgent</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setEditDialogOpen(false)}
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
            onClick={handleEditAnnouncement}
            variant="contained"
            disabled={!newAnnouncement.title.trim() || !newAnnouncement.content.trim()}
            sx={{
              bgcolor: '#1d9bf0',
              color: '#fff',
              textTransform: 'none',
              borderRadius: 5,
              '&:hover': { bgcolor: '#1a8cd8' },
              '&.Mui-disabled': { bgcolor: 'rgba(29, 155, 240, 0.5)', color: 'rgba(255, 255, 255, 0.5)' },
            }}
          >
            Save Changes
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
            maxWidth: 400,
          },
        }}
      >
        <DialogTitle sx={{ color: '#e7e9ea', fontWeight: 700 }}>
          Delete Announcement?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#71767b', fontSize: '0.938rem' }}>
            This action cannot be undone. The announcement &quot;{selectedAnnouncement?.title}&quot; will be permanently deleted.
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
