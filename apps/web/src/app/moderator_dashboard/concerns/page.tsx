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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import FlagIcon from '@mui/icons-material/Flag';

interface Concern {
  id: number;
  title: string;
  description: string;
  category: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  location: string;
  author: {
    name: string;
    avatar: string | null;
  };
  createdAt: string;
  updatedAt: string;
  responses: number;
}

const mockConcerns: Concern[] = [
  {
    id: 1,
    title: 'Streetlight not working near Area 2',
    description: 'The streetlight near the covered court in Area 2 has been broken for 3 days.',
    category: 'Infrastructure',
    status: 'open',
    priority: 'high',
    location: 'Area 2, Near Covered Court',
    author: { name: 'Juan Dela Cruz', avatar: null },
    createdAt: '2025-12-01T05:30:00',
    updatedAt: '2025-12-01T05:30:00',
    responses: 2,
  },
  {
    id: 2,
    title: 'Stray dogs in Area 5',
    description: 'Multiple stray dogs have been roaming around Area 5. They have become aggressive.',
    category: 'Public Safety',
    status: 'in_progress',
    priority: 'urgent',
    location: 'Area 5, Main Road',
    author: { name: 'Maria Santos', avatar: null },
    createdAt: '2025-11-30T14:00:00',
    updatedAt: '2025-12-01T09:00:00',
    responses: 5,
  },
  {
    id: 3,
    title: 'Garbage collection delayed',
    description: 'Garbage has not been collected for 2 days in our area.',
    category: 'Sanitation',
    status: 'resolved',
    priority: 'normal',
    location: 'Area 8',
    author: { name: 'Pedro Garcia', avatar: null },
    createdAt: '2025-11-29T08:00:00',
    updatedAt: '2025-11-30T16:00:00',
    responses: 3,
  },
  {
    id: 4,
    title: 'Noisy construction at night',
    description: 'Construction work happening past 10 PM disturbing residents.',
    category: 'Noise Complaint',
    status: 'open',
    priority: 'normal',
    location: 'Area 12',
    author: { name: 'Ana Reyes', avatar: null },
    createdAt: '2025-12-01T07:00:00',
    updatedAt: '2025-12-01T07:00:00',
    responses: 0,
  },
  {
    id: 5,
    title: 'Pothole on main road',
    description: 'Large pothole causing accidents near the barangay hall.',
    category: 'Infrastructure',
    status: 'in_progress',
    priority: 'high',
    location: 'Main Road, Near Barangay Hall',
    author: { name: 'Carlos Mendoza', avatar: null },
    createdAt: '2025-11-28T10:00:00',
    updatedAt: '2025-12-01T08:00:00',
    responses: 8,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open': return '#2196F3';
    case 'in_progress': return '#FF9800';
    case 'resolved': return '#4CAF50';
    case 'closed': return '#71767b';
    default: return '#71767b';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'open': return <PendingIcon sx={{ fontSize: 16 }} />;
    case 'in_progress': return <AutorenewIcon sx={{ fontSize: 16 }} />;
    case 'resolved': return <CheckCircleIcon sx={{ fontSize: 16 }} />;
    default: return <PendingIcon sx={{ fontSize: 16 }} />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent': return '#F44336';
    case 'high': return '#FF9800';
    case 'normal': return '#2196F3';
    case 'low': return '#71767b';
    default: return '#71767b';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export default function ModeratorConcernsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [concerns, setConcerns] = useState(mockConcerns);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedConcern, setSelectedConcern] = useState<Concern | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, concern: Concern) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedConcern(concern);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleStatusChange = () => {
    if (selectedConcern && newStatus) {
      setConcerns(prev =>
        prev.map(c =>
          c.id === selectedConcern.id
            ? { ...c, status: newStatus as Concern['status'], updatedAt: new Date().toISOString() }
            : c
        )
      );
    }
    setStatusDialogOpen(false);
    setNewStatus('');
    handleMenuClose();
  };

  const filteredConcerns = concerns.filter(concern => {
    const matchesSearch = concern.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concern.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (tabValue === 0) return matchesSearch;
    if (tabValue === 1) return matchesSearch && concern.status === 'open';
    if (tabValue === 2) return matchesSearch && concern.status === 'in_progress';
    if (tabValue === 3) return matchesSearch && concern.status === 'resolved';
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
          Concerns
        </Typography>
        <Typography sx={{ fontSize: '0.8125rem', color: '#71767b' }}>
          Review and moderate resident concerns
        </Typography>
      </Box>

      {/* Search */}
      <Box sx={{ p: 2, borderBottom: '1px solid #2f3336' }}>
        <TextField
          fullWidth
          placeholder="Search concerns..."
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
        <Tab label={`All (${concerns.length})`} />
        <Tab label={`Open (${concerns.filter(c => c.status === 'open').length})`} />
        <Tab label={`In Progress (${concerns.filter(c => c.status === 'in_progress').length})`} />
        <Tab label={`Resolved (${concerns.filter(c => c.status === 'resolved').length})`} />
      </Tabs>

      {/* Concerns List */}
      {filteredConcerns.map((concern) => (
        <Box
          key={concern.id}
          sx={{
            p: 2,
            borderBottom: '1px solid #2f3336',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.03)' },
          }}
        >
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: '#2f3336',
                fontSize: '1rem',
              }}
            >
              {concern.author.name.charAt(0)}
            </Avatar>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Header */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.938rem', color: '#e7e9ea' }}>
                    {concern.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Typography sx={{ color: '#71767b', fontSize: '0.813rem' }}>
                      by {concern.author.name}
                    </Typography>
                    <Typography sx={{ color: '#71767b', fontSize: '0.813rem' }}>·</Typography>
                    <Typography sx={{ color: '#71767b', fontSize: '0.813rem' }}>
                      {formatDate(concern.createdAt)}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, concern)}
                  sx={{ color: '#71767b' }}
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>

              {/* Badges */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                <Chip
                  icon={getStatusIcon(concern.status)}
                  label={concern.status.replace('_', ' ')}
                  size="small"
                  sx={{
                    height: 22,
                    bgcolor: `${getStatusColor(concern.status)}20`,
                    color: getStatusColor(concern.status),
                    '& .MuiChip-icon': { color: 'inherit' },
                    textTransform: 'capitalize',
                  }}
                />
                <Chip
                  label={concern.priority}
                  size="small"
                  sx={{
                    height: 22,
                    bgcolor: `${getPriorityColor(concern.priority)}20`,
                    color: getPriorityColor(concern.priority),
                    textTransform: 'capitalize',
                  }}
                />
                <Chip
                  label={concern.category}
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
                {concern.description}
              </Typography>

              {/* Footer */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#71767b' }}>
                  <LocationOnIcon sx={{ fontSize: 14 }} />
                  <Typography sx={{ fontSize: '0.75rem' }}>{concern.location}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#71767b' }}>
                  <AccessTimeIcon sx={{ fontSize: 14 }} />
                  <Typography sx={{ fontSize: '0.75rem' }}>
                    Updated {formatDate(concern.updatedAt)}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '0.75rem', color: '#1d9bf0' }}>
                  {concern.responses} responses
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
          onClick={() => {
            handleMenuClose();
            // View details logic
          }}
          sx={{ color: '#e7e9ea', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <ListItemIcon>
            <VisibilityIcon sx={{ color: '#e7e9ea', fontSize: 20 }} />
          </ListItemIcon>
          View Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            setNewStatus(selectedConcern?.status || '');
            setStatusDialogOpen(true);
            handleMenuClose();
          }}
          sx={{ color: '#e7e9ea', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <ListItemIcon>
            <EditIcon sx={{ color: '#e7e9ea', fontSize: 20 }} />
          </ListItemIcon>
          Update Status
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
      </Menu>

      {/* Status Update Dialog */}
      <Dialog
        open={statusDialogOpen}
        onClose={() => setStatusDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#000',
            border: '1px solid #2f3336',
            borderRadius: 3,
            minWidth: 350,
          },
        }}
      >
        <DialogTitle sx={{ color: '#e7e9ea', borderBottom: '1px solid #2f3336' }}>
          Update Concern Status
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel sx={{ color: '#71767b' }}>Status</InputLabel>
            <Select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              label="Status"
              sx={{
                color: '#e7e9ea',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2f3336' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#1d9bf0' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#1d9bf0' },
              }}
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setStatusDialogOpen(false)} sx={{ color: '#71767b' }}>
            Cancel
          </Button>
          <Button
            onClick={handleStatusChange}
            variant="contained"
            sx={{ bgcolor: '#1d9bf0', '&:hover': { bgcolor: '#1a8cd8' } }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
