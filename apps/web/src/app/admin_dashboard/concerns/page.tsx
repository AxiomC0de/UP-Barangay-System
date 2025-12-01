'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
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
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ImageIcon from '@mui/icons-material/Image';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { useRouter } from 'next/navigation';

// Mock concerns data
const mockConcerns = [
  {
    id: 1,
    ticketNumber: 'CON-2025-001245',
    title: 'Streetlight malfunction near covered court',
    description: 'The streetlight at the corner of Acacia Lane and Mango Street has been flickering for the past 3 days and completely went out last night. This is a safety concern as the area is very dark.',
    category: 'Infrastructure',
    status: 'open',
    priority: 'high',
    author: {
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      avatar: null,
      district: 'Area 5',
    },
    location: 'Acacia Lane cor. Mango Street, Area 5',
    createdAt: '2025-12-01T08:30:00',
    updatedAt: '2025-12-01T08:30:00',
    assignedTo: null,
    images: 2,
    comments: 3,
  },
  {
    id: 2,
    ticketNumber: 'CON-2025-001244',
    title: 'Stray dogs causing disturbance',
    description: 'Several stray dogs have been roaming around the elementary school area during dismissal time. Parents are concerned about the safety of children.',
    category: 'Public Safety',
    status: 'in_progress',
    priority: 'urgent',
    author: {
      name: 'Juan Dela Cruz',
      email: 'juan.dc@email.com',
      avatar: null,
      district: 'Area 3',
    },
    location: 'Near Barangay Elementary School, Area 3',
    createdAt: '2025-11-30T14:20:00',
    updatedAt: '2025-12-01T09:15:00',
    assignedTo: 'Staff Member 1',
    images: 1,
    comments: 8,
  },
  {
    id: 3,
    ticketNumber: 'CON-2025-001243',
    title: 'Garbage not collected for 2 days',
    description: 'Our street (Sampaguita St.) has not had garbage collection for 2 days now. The garbage is piling up and starting to smell.',
    category: 'Sanitation',
    status: 'resolved',
    priority: 'medium',
    author: {
      name: 'Ana Reyes',
      email: 'ana.r@email.com',
      avatar: null,
      district: 'Area 12',
    },
    location: 'Sampaguita Street, Area 12',
    createdAt: '2025-11-28T10:00:00',
    updatedAt: '2025-11-30T16:45:00',
    assignedTo: 'Staff Member 2',
    images: 3,
    comments: 5,
  },
  {
    id: 4,
    ticketNumber: 'CON-2025-001242',
    title: 'Water pipe leak on main road',
    description: 'There is a significant water leak from an underground pipe near the basketball court. Water has been flowing for several hours.',
    category: 'Utilities',
    status: 'in_progress',
    priority: 'urgent',
    author: {
      name: 'Pedro Garcia',
      email: 'pedro.g@email.com',
      avatar: null,
      district: 'Area 7',
    },
    location: 'Main Road near Basketball Court, Area 7',
    createdAt: '2025-11-30T07:45:00',
    updatedAt: '2025-11-30T11:30:00',
    assignedTo: 'Staff Member 1',
    images: 2,
    comments: 12,
  },
  {
    id: 5,
    ticketNumber: 'CON-2025-001241',
    title: 'Noise complaint - late night karaoke',
    description: 'Neighbors at Block 15 have been having loud karaoke sessions past midnight for the past week. This is disturbing the peace of the community.',
    category: 'Noise',
    status: 'closed',
    priority: 'low',
    author: {
      name: 'Elena Cruz',
      email: 'elena.c@email.com',
      avatar: null,
      district: 'Area 8',
    },
    location: 'Block 15, Area 8',
    createdAt: '2025-11-25T22:30:00',
    updatedAt: '2025-11-28T14:00:00',
    assignedTo: 'Staff Member 3',
    images: 0,
    comments: 6,
  },
];

const categories = [
  'All Categories',
  'Infrastructure',
  'Public Safety',
  'Sanitation',
  'Utilities',
  'Noise',
  'Traffic',
  'Other',
];

const staffMembers = [
  'Staff Member 1',
  'Staff Member 2',
  'Staff Member 3',
  'Staff Member 4',
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'open':
      return '#2196F3';
    case 'in_progress':
      return '#FF9800';
    case 'resolved':
      return '#4CAF50';
    case 'closed':
      return '#71767b';
    default:
      return '#71767b';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'open':
      return 'Open';
    case 'in_progress':
      return 'In Progress';
    case 'resolved':
      return 'Resolved';
    case 'closed':
      return 'Closed';
    default:
      return status;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'urgent':
      return '#F44336';
    case 'high':
      return '#FF9800';
    case 'medium':
      return '#FFC107';
    case 'low':
      return '#4CAF50';
    default:
      return '#71767b';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) {
    return 'Just now';
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

export default function AdminConcernsPage() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedConcern, setSelectedConcern] = useState<typeof mockConcerns[0] | null>(null);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [newAssignee, setNewAssignee] = useState('');
  const [concerns, setConcerns] = useState(mockConcerns);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, concern: typeof mockConcerns[0]) => {
    event.stopPropagation();
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
            ? { ...c, status: newStatus, updatedAt: new Date().toISOString() }
            : c
        )
      );
    }
    setStatusDialogOpen(false);
    setNewStatus('');
    handleMenuClose();
  };

  const handleAssign = () => {
    if (selectedConcern && newAssignee) {
      setConcerns(prev =>
        prev.map(c =>
          c.id === selectedConcern.id
            ? { ...c, assignedTo: newAssignee, updatedAt: new Date().toISOString() }
            : c
        )
      );
    }
    setAssignDialogOpen(false);
    setNewAssignee('');
    handleMenuClose();
  };

  // Filter concerns based on tab, search, and category
  const filteredConcerns = concerns.filter(concern => {
    // Tab filter
    if (tabValue === 1 && concern.status !== 'open') return false;
    if (tabValue === 2 && concern.status !== 'in_progress') return false;
    if (tabValue === 3 && concern.status !== 'resolved') return false;
    if (tabValue === 4 && concern.status !== 'closed') return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !concern.title.toLowerCase().includes(query) &&
        !concern.ticketNumber.toLowerCase().includes(query) &&
        !concern.author.name.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Category filter
    if (categoryFilter !== 'All Categories' && concern.category !== categoryFilter) {
      return false;
    }

    return true;
  });

  // Count concerns by status
  const statusCounts = {
    all: concerns.length,
    open: concerns.filter(c => c.status === 'open').length,
    in_progress: concerns.filter(c => c.status === 'in_progress').length,
    resolved: concerns.filter(c => c.status === 'resolved').length,
    closed: concerns.filter(c => c.status === 'closed').length,
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
                Concerns
              </Typography>
              <Typography sx={{ fontSize: '0.813rem', color: '#71767b' }}>
                {statusCounts.all} total · {statusCounts.open} open
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
              placeholder="Search by title, ticket number, or author..."
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
            label={`Open (${statusCounts.open})`}
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
            label={`In Progress (${statusCounts.in_progress})`}
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
            label={`Resolved (${statusCounts.resolved})`}
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
            label={`Closed (${statusCounts.closed})`}
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

      {/* Category Filter */}
      <Box sx={{ px: 2, py: 1.5, display: 'flex', gap: 1, flexWrap: 'wrap', borderBottom: '1px solid #2f3336' }}>
        {categories.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            onClick={() => setCategoryFilter(cat)}
            sx={{
              bgcolor: categoryFilter === cat ? '#7B1113' : '#202327',
              color: categoryFilter === cat ? '#fff' : '#e7e9ea',
              '&:hover': {
                bgcolor: categoryFilter === cat ? '#9B1315' : '#2f3336',
              },
            }}
          />
        ))}
      </Box>

      {/* Concerns List */}
      <Box>
        {filteredConcerns.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ color: '#71767b', fontSize: '0.938rem' }}>
              No concerns found
            </Typography>
          </Box>
        ) : (
          filteredConcerns.map((concern) => (
            <Box
              key={concern.id}
              sx={{
                p: 2,
                borderBottom: '1px solid #2f3336',
                cursor: 'pointer',
                '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.03)' },
              }}
              onClick={() => router.push(`/admin_dashboard/concerns/${concern.id}`)}
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
                  {concern.author.name.charAt(0)}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                        <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#e7e9ea' }}>
                          {concern.author.name}
                        </Typography>
                        <Typography sx={{ fontSize: '0.813rem', color: '#71767b' }}>
                          · {formatDate(concern.createdAt)}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                        {concern.ticketNumber}
                      </Typography>
                    </Box>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuOpen(e, concern)}
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
                    {concern.title}
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
                    {concern.description}
                  </Typography>

                  {/* Tags */}
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap', mb: 1.5 }}>
                    <Chip
                      label={getStatusLabel(concern.status)}
                      size="small"
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        bgcolor: `${getStatusColor(concern.status)}20`,
                        color: getStatusColor(concern.status),
                        fontWeight: 600,
                      }}
                    />
                    <Chip
                      label={concern.priority.charAt(0).toUpperCase() + concern.priority.slice(1)}
                      size="small"
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        bgcolor: `${getPriorityColor(concern.priority)}20`,
                        color: getPriorityColor(concern.priority),
                        fontWeight: 600,
                      }}
                    />
                    <Chip
                      label={concern.category}
                      size="small"
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        bgcolor: 'rgba(113, 118, 123, 0.2)',
                        color: '#71767b',
                      }}
                    />
                  </Box>

                  {/* Meta Info */}
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOnIcon sx={{ fontSize: 14, color: '#71767b' }} />
                      <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                        {concern.author.district}
                      </Typography>
                    </Box>
                    {concern.assignedTo && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PersonIcon sx={{ fontSize: 14, color: '#71767b' }} />
                        <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                          {concern.assignedTo}
                        </Typography>
                      </Box>
                    )}
                    {concern.images > 0 && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <ImageIcon sx={{ fontSize: 14, color: '#71767b' }} />
                        <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                          {concern.images}
                        </Typography>
                      </Box>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ChatBubbleOutlineIcon sx={{ fontSize: 14, color: '#71767b' }} />
                      <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                        {concern.comments}
                      </Typography>
                    </Box>
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
          onClick={() => {
            handleMenuClose();
            if (selectedConcern) {
              router.push(`/admin_dashboard/concerns/${selectedConcern.id}`);
            }
          }}
          sx={{ color: '#e7e9ea', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <VisibilityIcon sx={{ mr: 1.5, fontSize: 20 }} />
          View Details
        </MenuItem>
        <MenuItem
          onClick={() => {
            setNewStatus(selectedConcern?.status || '');
            setStatusDialogOpen(true);
          }}
          sx={{ color: '#e7e9ea', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <EditIcon sx={{ mr: 1.5, fontSize: 20 }} />
          Update Status
        </MenuItem>
        <MenuItem
          onClick={() => {
            setNewAssignee(selectedConcern?.assignedTo || '');
            setAssignDialogOpen(true);
          }}
          sx={{ color: '#e7e9ea', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <AssignmentIndIcon sx={{ mr: 1.5, fontSize: 20 }} />
          Assign Staff
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
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
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

      {/* Assign Staff Dialog */}
      <Dialog
        open={assignDialogOpen}
        onClose={() => setAssignDialogOpen(false)}
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
          Assign Staff
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <InputLabel sx={{ color: '#71767b' }}>Staff Member</InputLabel>
            <Select
              value={newAssignee}
              label="Staff Member"
              onChange={(e) => setNewAssignee(e.target.value)}
              sx={{
                color: '#e7e9ea',
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#2f3336' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#71767b' },
                '.MuiSvgIcon-root': { color: '#71767b' },
              }}
            >
              {staffMembers.map((staff) => (
                <MenuItem key={staff} value={staff}>
                  {staff}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setAssignDialogOpen(false)}
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
            onClick={handleAssign}
            variant="contained"
            sx={{
              bgcolor: '#7B1113',
              color: '#fff',
              textTransform: 'none',
              borderRadius: 5,
              '&:hover': { bgcolor: '#9B1315' },
            }}
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
