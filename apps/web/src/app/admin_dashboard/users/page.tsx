'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VerifiedIcon from '@mui/icons-material/Verified';
import PersonIcon from '@mui/icons-material/Person';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useRouter } from 'next/navigation';

// Mock users data
const mockUsers = [
  {
    id: 1,
    name: 'Maria Santos',
    email: 'maria.santos@email.com',
    phone: '+63 917 123 4567',
    district: 'Area 5',
    address: '123 Acacia Lane',
    role: 'resident',
    status: 'verified',
    isActive: true,
    joinedAt: '2025-01-15T10:00:00',
    lastActive: '2025-12-01T08:30:00',
    concernsCount: 5,
    suggestionsCount: 3,
  },
  {
    id: 2,
    name: 'Juan Dela Cruz',
    email: 'juan.dc@email.com',
    phone: '+63 918 234 5678',
    district: 'Area 3',
    address: '456 Mango Street',
    role: 'resident',
    status: 'verified',
    isActive: true,
    joinedAt: '2025-02-20T14:00:00',
    lastActive: '2025-11-30T16:45:00',
    concernsCount: 12,
    suggestionsCount: 8,
  },
  {
    id: 3,
    name: 'Ana Reyes',
    email: 'ana.r@email.com',
    phone: '+63 919 345 6789',
    district: 'Area 12',
    address: '789 Sampaguita St',
    role: 'resident',
    status: 'pending',
    isActive: true,
    joinedAt: '2025-11-28T09:00:00',
    lastActive: '2025-11-29T11:00:00',
    concernsCount: 1,
    suggestionsCount: 0,
  },
  {
    id: 4,
    name: 'Pedro Garcia',
    email: 'pedro.g@email.com',
    phone: '+63 920 456 7890',
    district: 'Area 7',
    address: '321 Narra Ave',
    role: 'moderator',
    status: 'verified',
    isActive: true,
    joinedAt: '2024-06-10T08:00:00',
    lastActive: '2025-12-01T09:00:00',
    concernsCount: 0,
    suggestionsCount: 2,
  },
  {
    id: 5,
    name: 'Elena Cruz',
    email: 'elena.c@email.com',
    phone: '+63 921 567 8901',
    district: 'Area 8',
    address: '654 Bamboo Road',
    role: 'resident',
    status: 'verified',
    isActive: false,
    joinedAt: '2024-08-15T10:00:00',
    lastActive: '2025-10-15T14:00:00',
    concernsCount: 3,
    suggestionsCount: 1,
  },
  {
    id: 6,
    name: 'Carlos Mendoza',
    email: 'carlos.m@email.com',
    phone: '+63 922 678 9012',
    district: 'Area 1',
    address: '987 Ipil Street',
    role: 'resident',
    status: 'pending',
    isActive: true,
    joinedAt: '2025-11-30T15:00:00',
    lastActive: '2025-11-30T15:30:00',
    concernsCount: 0,
    suggestionsCount: 0,
  },
  {
    id: 7,
    name: 'Admin User',
    email: 'admin@barangay.gov.ph',
    phone: '+63 923 789 0123',
    district: 'Area 1',
    address: 'Barangay Hall',
    role: 'administrator',
    status: 'verified',
    isActive: true,
    joinedAt: '2024-01-01T00:00:00',
    lastActive: '2025-12-01T09:30:00',
    concernsCount: 0,
    suggestionsCount: 0,
  },
];

const getRoleColor = (role: string) => {
  switch (role) {
    case 'administrator':
      return '#7B1113';
    case 'moderator':
      return '#2196F3';
    case 'resident':
      return '#4CAF50';
    default:
      return '#71767b';
  }
};

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'administrator':
      return AdminPanelSettingsIcon;
    case 'moderator':
      return SupervisorAccountIcon;
    default:
      return PersonIcon;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'verified':
      return '#4CAF50';
    case 'pending':
      return '#FF9800';
    case 'rejected':
      return '#F44336';
    default:
      return '#71767b';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatLastActive = (dateString: string) => {
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
    return formatDate(dateString);
  }
};

export default function AdminUsersPage() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [users, setUsers] = useState(mockUsers);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: typeof mockUsers[0]) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleRoleChange = () => {
    if (selectedUser && newRole) {
      setUsers(prev =>
        prev.map(u =>
          u.id === selectedUser.id ? { ...u, role: newRole } : u
        )
      );
    }
    setRoleDialogOpen(false);
    setNewRole('');
    handleMenuClose();
  };

  const handleVerify = () => {
    if (selectedUser) {
      setUsers(prev =>
        prev.map(u =>
          u.id === selectedUser.id ? { ...u, status: 'verified' } : u
        )
      );
    }
    setVerifyDialogOpen(false);
    handleMenuClose();
  };

  const handleToggleActive = () => {
    if (selectedUser) {
      setUsers(prev =>
        prev.map(u =>
          u.id === selectedUser.id ? { ...u, isActive: !u.isActive } : u
        )
      );
    }
    handleMenuClose();
  };

  // Filter users based on tab and search
  const filteredUsers = users.filter(user => {
    // Tab filter
    if (tabValue === 1 && user.role !== 'resident') return false;
    if (tabValue === 2 && user.role !== 'moderator') return false;
    if (tabValue === 3 && user.role !== 'administrator') return false;
    if (tabValue === 4 && user.status !== 'pending') return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !user.name.toLowerCase().includes(query) &&
        !user.email.toLowerCase().includes(query) &&
        !user.district.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    return true;
  });

  // Count users by role/status
  const counts = {
    all: users.length,
    residents: users.filter(u => u.role === 'resident').length,
    moderators: users.filter(u => u.role === 'moderator').length,
    admins: users.filter(u => u.role === 'administrator').length,
    pending: users.filter(u => u.status === 'pending').length,
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
                Users
              </Typography>
              <Typography sx={{ fontSize: '0.813rem', color: '#71767b' }}>
                {counts.all} total · {counts.pending} pending verification
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
              placeholder="Search by name, email, or district..."
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
            label={`All (${counts.all})`}
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
            label={`Residents (${counts.residents})`}
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
            label={`Moderators (${counts.moderators})`}
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
            label={`Admins (${counts.admins})`}
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
            label={`Pending (${counts.pending})`}
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

      {/* Users List */}
      <Box>
        {filteredUsers.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ color: '#71767b', fontSize: '0.938rem' }}>
              No users found
            </Typography>
          </Box>
        ) : (
          filteredUsers.map((user) => {
            const RoleIcon = getRoleIcon(user.role);
            return (
              <Box
                key={user.id}
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
                      width: 48,
                      height: 48,
                      bgcolor: getRoleColor(user.role),
                      fontSize: '1.125rem',
                      fontWeight: 600,
                    }}
                  >
                    {user.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    {/* Header */}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.5 }}>
                      <Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: '0.938rem', color: '#e7e9ea' }}>
                            {user.name}
                          </Typography>
                          {user.status === 'verified' && (
                            <VerifiedIcon sx={{ fontSize: 16, color: '#4CAF50' }} />
                          )}
                          {!user.isActive && (
                            <Chip
                              label="Inactive"
                              size="small"
                              sx={{
                                height: 18,
                                fontSize: '0.65rem',
                                bgcolor: 'rgba(244, 67, 54, 0.2)',
                                color: '#F44336',
                              }}
                            />
                          )}
                        </Box>
                        <Typography sx={{ fontSize: '0.813rem', color: '#71767b' }}>
                          {user.email}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, user)}
                        sx={{ color: '#71767b' }}
                      >
                        <MoreVertIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    {/* Tags */}
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap', mb: 1.5 }}>
                      <Chip
                        icon={<RoleIcon sx={{ fontSize: '14px !important' }} />}
                        label={user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        size="small"
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          bgcolor: `${getRoleColor(user.role)}20`,
                          color: getRoleColor(user.role),
                          '& .MuiChip-icon': {
                            color: getRoleColor(user.role),
                          },
                        }}
                      />
                      <Chip
                        label={user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        size="small"
                        icon={user.status === 'verified' ? <CheckCircleIcon sx={{ fontSize: '14px !important' }} /> : <PendingIcon sx={{ fontSize: '14px !important' }} />}
                        sx={{
                          height: 24,
                          fontSize: '0.75rem',
                          bgcolor: `${getStatusColor(user.status)}20`,
                          color: getStatusColor(user.status),
                          '& .MuiChip-icon': {
                            color: getStatusColor(user.status),
                          },
                        }}
                      />
                    </Box>

                    {/* Meta Info */}
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOnIcon sx={{ fontSize: 14, color: '#71767b' }} />
                        <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                          {user.district}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarTodayIcon sx={{ fontSize: 14, color: '#71767b' }} />
                        <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                          Joined {formatDate(user.joinedAt)}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                        Last active: {formatLastActive(user.lastActive)}
                      </Typography>
                    </Box>

                    {/* Activity Stats */}
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                      <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                        <Box component="span" sx={{ color: '#e7e9ea', fontWeight: 600 }}>{user.concernsCount}</Box> concerns
                      </Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                        <Box component="span" sx={{ color: '#e7e9ea', fontWeight: 600 }}>{user.suggestionsCount}</Box> suggestions
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
            if (selectedUser) {
              router.push(`/admin_dashboard/users/${selectedUser.id}`);
            }
          }}
          sx={{ color: '#e7e9ea', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <PersonIcon sx={{ mr: 1.5, fontSize: 20 }} />
          View Profile
        </MenuItem>
        {selectedUser?.status === 'pending' && (
          <MenuItem
            onClick={() => setVerifyDialogOpen(true)}
            sx={{ color: '#4CAF50', '&:hover': { bgcolor: 'rgba(76, 175, 80, 0.1)' } }}
          >
            <CheckCircleIcon sx={{ mr: 1.5, fontSize: 20 }} />
            Verify User
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setNewRole(selectedUser?.role || '');
            setRoleDialogOpen(true);
          }}
          sx={{ color: '#e7e9ea', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <SupervisorAccountIcon sx={{ mr: 1.5, fontSize: 20 }} />
          Change Role
        </MenuItem>
        <MenuItem
          onClick={handleToggleActive}
          sx={{
            color: selectedUser?.isActive ? '#F44336' : '#4CAF50',
            '&:hover': {
              bgcolor: selectedUser?.isActive ? 'rgba(244, 67, 54, 0.1)' : 'rgba(76, 175, 80, 0.1)',
            },
          }}
        >
          <BlockIcon sx={{ mr: 1.5, fontSize: 20 }} />
          {selectedUser?.isActive ? 'Deactivate' : 'Activate'}
        </MenuItem>
      </Menu>

      {/* Change Role Dialog */}
      <Dialog
        open={roleDialogOpen}
        onClose={() => setRoleDialogOpen(false)}
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
          Change Role
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#71767b', fontSize: '0.875rem', mb: 2 }}>
            Change role for {selectedUser?.name}
          </Typography>
          <FormControl fullWidth>
            <InputLabel sx={{ color: '#71767b' }}>Role</InputLabel>
            <Select
              value={newRole}
              label="Role"
              onChange={(e) => setNewRole(e.target.value)}
              sx={{
                color: '#e7e9ea',
                '.MuiOutlinedInput-notchedOutline': { borderColor: '#2f3336' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#71767b' },
                '.MuiSvgIcon-root': { color: '#71767b' },
              }}
            >
              <MenuItem value="resident">Resident</MenuItem>
              <MenuItem value="moderator">Moderator</MenuItem>
              <MenuItem value="administrator">Administrator</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setRoleDialogOpen(false)}
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
            onClick={handleRoleChange}
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

      {/* Verify User Dialog */}
      <Dialog
        open={verifyDialogOpen}
        onClose={() => setVerifyDialogOpen(false)}
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
          Verify User?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#71767b', fontSize: '0.938rem' }}>
            Are you sure you want to verify {selectedUser?.name}? This will grant them full access to the platform.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setVerifyDialogOpen(false)}
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
            onClick={handleVerify}
            variant="contained"
            sx={{
              bgcolor: '#4CAF50',
              color: '#fff',
              textTransform: 'none',
              borderRadius: 5,
              '&:hover': { bgcolor: '#388E3C' },
            }}
          >
            Verify
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
