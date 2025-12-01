'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
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
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';

// Mock suggestions data
const mockSuggestions = [
  {
    id: 1,
    title: 'Install more streetlights along Acacia Lane',
    description: 'The area near the elementary school is very dark at night. Installing additional streetlights would improve safety for residents walking home from work and students attending evening activities.',
    author: {
      name: 'Maria Santos',
      avatar: null,
      district: 'Area 5',
    },
    status: 'under_review',
    category: 'Infrastructure',
    upvotes: 156,
    downvotes: 12,
    comments: 24,
    createdAt: '2025-11-28T10:00:00',
  },
  {
    id: 2,
    title: 'Weekly community cleanup drive',
    description: 'Organize a weekly community cleanup every Saturday morning. This would help keep our streets clean and foster community spirit among residents.',
    author: {
      name: 'Juan Dela Cruz',
      avatar: null,
      district: 'Area 3',
    },
    status: 'approved',
    category: 'Community',
    upvotes: 234,
    downvotes: 8,
    comments: 45,
    createdAt: '2025-11-25T14:30:00',
  },
  {
    id: 3,
    title: 'Create a community garden in Area 7',
    description: 'The vacant lot near the basketball court could be transformed into a community garden. Residents could grow vegetables and herbs, promoting sustainability and healthy eating.',
    author: {
      name: 'Ana Reyes',
      avatar: null,
      district: 'Area 12',
    },
    status: 'implemented',
    category: 'Environment',
    upvotes: 312,
    downvotes: 5,
    comments: 67,
    createdAt: '2025-10-15T09:00:00',
  },
  {
    id: 4,
    title: 'Online appointment booking for barangay services',
    description: 'Implement an online system where residents can book appointments for barangay clearance, certificates, and other services to reduce waiting time.',
    author: {
      name: 'Pedro Garcia',
      avatar: null,
      district: 'Area 7',
    },
    status: 'pending',
    category: 'Services',
    upvotes: 89,
    downvotes: 3,
    comments: 12,
    createdAt: '2025-11-30T16:00:00',
  },
  {
    id: 5,
    title: 'Free WiFi in public areas',
    description: 'Provide free WiFi access in the barangay hall, covered courts, and parks. This would help students who don\'t have internet access at home.',
    author: {
      name: 'Elena Cruz',
      avatar: null,
      district: 'Area 8',
    },
    status: 'rejected',
    category: 'Technology',
    upvotes: 178,
    downvotes: 45,
    comments: 32,
    createdAt: '2025-11-20T11:00:00',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return '#71767b';
    case 'under_review':
      return '#2196F3';
    case 'approved':
      return '#4CAF50';
    case 'implemented':
      return '#7B1113';
    case 'rejected':
      return '#F44336';
    default:
      return '#71767b';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'under_review':
      return 'Under Review';
    case 'approved':
      return 'Approved';
    case 'implemented':
      return 'Implemented';
    case 'rejected':
      return 'Rejected';
    default:
      return status;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved':
    case 'implemented':
      return CheckCircleIcon;
    case 'rejected':
      return CancelIcon;
    default:
      return PendingIcon;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    return 'Today';
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

export default function AdminSuggestionsPage() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<typeof mockSuggestions[0] | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [suggestions, setSuggestions] = useState(mockSuggestions);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, suggestion: typeof mockSuggestions[0]) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setSelectedSuggestion(suggestion);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleStatusChange = () => {
    if (selectedSuggestion && newStatus) {
      setSuggestions(prev =>
        prev.map(s =>
          s.id === selectedSuggestion.id ? { ...s, status: newStatus } : s
        )
      );
    }
    setStatusDialogOpen(false);
    setNewStatus('');
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedSuggestion) {
      setSuggestions(prev => prev.filter(s => s.id !== selectedSuggestion.id));
    }
    setDeleteDialogOpen(false);
    handleMenuClose();
  };

  // Filter suggestions based on tab and search
  const filteredSuggestions = suggestions.filter(suggestion => {
    // Tab filter
    if (tabValue === 1 && suggestion.status !== 'pending') return false;
    if (tabValue === 2 && suggestion.status !== 'under_review') return false;
    if (tabValue === 3 && suggestion.status !== 'approved' && suggestion.status !== 'implemented') return false;
    if (tabValue === 4 && suggestion.status !== 'rejected') return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !suggestion.title.toLowerCase().includes(query) &&
        !suggestion.author.name.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    return true;
  });

  // Count by status
  const statusCounts = {
    all: suggestions.length,
    pending: suggestions.filter(s => s.status === 'pending').length,
    under_review: suggestions.filter(s => s.status === 'under_review').length,
    approved: suggestions.filter(s => s.status === 'approved' || s.status === 'implemented').length,
    rejected: suggestions.filter(s => s.status === 'rejected').length,
  };

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(12px)',
          zIndex: 100,
          borderBottom: '1px solid #2f3336',
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
                Suggestions
              </Typography>
              <Typography sx={{ fontSize: '0.813rem', color: '#71767b' }}>
                {statusCounts.all} total · {statusCounts.pending + statusCounts.under_review} need review
              </Typography>
            </Box>
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
              placeholder="Search suggestions..."
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
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTabs-indicator': {
              bgcolor: '#7B1113',
            },
          }}
        >
          <Tab
            label={`All (${statusCounts.all})`}
            sx={{
              color: tabValue === 0 ? '#e7e9ea' : '#71767b',
              textTransform: 'none',
              fontWeight: tabValue === 0 ? 700 : 400,
              fontSize: '0.875rem',
              minWidth: 'auto',
              px: 2,
              '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
            }}
          />
          <Tab
            label={`Pending (${statusCounts.pending})`}
            sx={{
              color: tabValue === 1 ? '#e7e9ea' : '#71767b',
              textTransform: 'none',
              fontWeight: tabValue === 1 ? 700 : 400,
              fontSize: '0.875rem',
              minWidth: 'auto',
              px: 2,
              '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
            }}
          />
          <Tab
            label={`Under Review (${statusCounts.under_review})`}
            sx={{
              color: tabValue === 2 ? '#e7e9ea' : '#71767b',
              textTransform: 'none',
              fontWeight: tabValue === 2 ? 700 : 400,
              fontSize: '0.875rem',
              minWidth: 'auto',
              px: 2,
              '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
            }}
          />
          <Tab
            label={`Approved (${statusCounts.approved})`}
            sx={{
              color: tabValue === 3 ? '#e7e9ea' : '#71767b',
              textTransform: 'none',
              fontWeight: tabValue === 3 ? 700 : 400,
              fontSize: '0.875rem',
              minWidth: 'auto',
              px: 2,
              '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
            }}
          />
          <Tab
            label={`Rejected (${statusCounts.rejected})`}
            sx={{
              color: tabValue === 4 ? '#e7e9ea' : '#71767b',
              textTransform: 'none',
              fontWeight: tabValue === 4 ? 700 : 400,
              fontSize: '0.875rem',
              minWidth: 'auto',
              px: 2,
              '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
            }}
          />
        </Tabs>
      </Box>

      {/* Suggestions List */}
      <Box>
        {filteredSuggestions.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ color: '#71767b', fontSize: '0.938rem' }}>
              No suggestions found
            </Typography>
          </Box>
        ) : (
          filteredSuggestions.map((suggestion) => {
            const StatusIcon = getStatusIcon(suggestion.status);
            return (
              <Box
                key={suggestion.id}
                sx={{
                  p: 2,
                  borderBottom: '1px solid #2f3336',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.03)' },
                }}
              >
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: '#2f3336',
                      fontSize: '0.938rem',
                      fontWeight: 600,
                    }}
                  >
                    {suggestion.author.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#e7e9ea' }}>
                            {suggestion.author.name}
                          </Typography>
                          <Typography sx={{ fontSize: '0.813rem', color: '#71767b' }}>
                            · {formatDate(suggestion.createdAt)}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                          {suggestion.author.district}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, suggestion)}
                        sx={{ color: '#71767b' }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Title */}
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: '0.938rem',
                        color: '#e7e9ea',
                        mb: 0.5,
                      }}
                    >
                      {suggestion.title}
                    </Typography>

                    {/* Description Preview */}
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
                      {suggestion.description}
                    </Typography>

                    {/* Tags */}
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap', mb: 1.5 }}>
                      <Chip
                        icon={<StatusIcon sx={{ fontSize: '14px !important' }} />}
                        label={getStatusLabel(suggestion.status)}
                        size="small"
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          bgcolor: `${getStatusColor(suggestion.status)}20`,
                          color: getStatusColor(suggestion.status),
                          '& .MuiChip-icon': {
                            color: getStatusColor(suggestion.status),
                          },
                        }}
                      />
                      <Chip
                        label={suggestion.category}
                        size="small"
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          bgcolor: 'rgba(113, 118, 123, 0.2)',
                          color: '#71767b',
                        }}
                      />
                    </Box>

                    {/* Vote Stats */}
                    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ThumbUpIcon sx={{ fontSize: 16, color: '#4CAF50' }} />
                        <Typography sx={{ fontSize: '0.813rem', color: '#4CAF50', fontWeight: 600 }}>
                          {suggestion.upvotes}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ThumbDownIcon sx={{ fontSize: 16, color: '#F44336' }} />
                        <Typography sx={{ fontSize: '0.813rem', color: '#F44336', fontWeight: 600 }}>
                          {suggestion.downvotes}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                        {suggestion.comments} comments
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })
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
          onClick={() => {
            handleMenuClose();
            // View details
          }}
          sx={{ color: '#e7e9ea', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <VisibilityIcon sx={{ mr: 1.5, fontSize: 20 }} />
          View Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            setNewStatus(selectedSuggestion?.status || '');
            setStatusDialogOpen(true);
          }}
          sx={{ color: '#e7e9ea', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <EditIcon sx={{ mr: 1.5, fontSize: 20 }} />
          Update Status
        </MenuItem>
        <MenuItem
          onClick={() => setDeleteDialogOpen(true)}
          sx={{ color: '#F44336', '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.1)' } }}
        >
          <DeleteIcon sx={{ mr: 1.5, fontSize: 20 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Update Status Dialog */}
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
        <DialogTitle sx={{ color: '#e7e9ea', fontWeight: 700 }}>
          Update Status
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel sx={{ color: '#71767b' }}>Status</InputLabel>
            <Select
              value={newStatus}
              label="Status"
              onChange={(e) => setNewStatus(e.target.value)}
              sx={{
                color: '#e7e9ea',
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#2f3336' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#71767b' },
                '.MuiSvgIcon-root': { color: '#71767b' },
              }}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="under_review">Under Review</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="implemented">Implemented</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setStatusDialogOpen(false)}
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
            onClick={handleStatusChange}
            variant="contained"
            sx={{
              bgcolor: '#7B1113',
              color: '#fff',
              textTransform: 'none',
              borderRadius: 5,
              '&:hover': { bgcolor: '#9B1315' },
            }}
          >
            Update
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
          Delete Suggestion?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#71767b', fontSize: '0.938rem' }}>
            This action cannot be undone. The suggestion will be permanently deleted.
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
