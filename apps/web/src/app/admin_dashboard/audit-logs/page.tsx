'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import PersonIcon from '@mui/icons-material/Person';
import CampaignIcon from '@mui/icons-material/Campaign';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SecurityIcon from '@mui/icons-material/Security';

// Mock activity logs data
const mockActivityLogs = [
  {
    id: 1,
    action: 'login',
    actionType: 'auth',
    description: 'Admin User logged in',
    user: { name: 'Admin User', role: 'administrator', avatar: 'A' },
    target: null,
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome 120.0 / Windows 10',
    timestamp: '2025-12-01T08:30:00',
    status: 'success',
  },
  {
    id: 2,
    action: 'create',
    actionType: 'announcement',
    description: 'Created announcement "Community Christmas Party 2025"',
    user: { name: 'Admin User', role: 'administrator', avatar: 'A' },
    target: { type: 'announcement', id: 1, name: 'Community Christmas Party 2025' },
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome 120.0 / Windows 10',
    timestamp: '2025-12-01T08:45:00',
    status: 'success',
  },
  {
    id: 3,
    action: 'publish',
    actionType: 'announcement',
    description: 'Published announcement "Community Christmas Party 2025"',
    user: { name: 'Admin User', role: 'administrator', avatar: 'A' },
    target: { type: 'announcement', id: 1, name: 'Community Christmas Party 2025' },
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome 120.0 / Windows 10',
    timestamp: '2025-12-01T08:46:00',
    status: 'success',
  },
  {
    id: 4,
    action: 'status_change',
    actionType: 'concern',
    description: 'Changed concern status from "Open" to "In Progress"',
    user: { name: 'Moderator Jane', role: 'moderator', avatar: 'M' },
    target: { type: 'concern', id: 45, name: 'Streetlight malfunction in Area 5' },
    ipAddress: '192.168.1.105',
    userAgent: 'Firefox 121.0 / macOS',
    timestamp: '2025-12-01T09:15:00',
    status: 'success',
  },
  {
    id: 5,
    action: 'verify',
    actionType: 'user',
    description: 'Verified user account',
    user: { name: 'Admin User', role: 'administrator', avatar: 'A' },
    target: { type: 'user', id: 123, name: 'Carlos Mendoza' },
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome 120.0 / Windows 10',
    timestamp: '2025-12-01T09:30:00',
    status: 'success',
  },
  {
    id: 6,
    action: 'role_change',
    actionType: 'user',
    description: 'Changed user role from "Resident" to "Moderator"',
    user: { name: 'Admin User', role: 'administrator', avatar: 'A' },
    target: { type: 'user', id: 89, name: 'Maria Santos' },
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome 120.0 / Windows 10',
    timestamp: '2025-12-01T10:00:00',
    status: 'success',
  },
  {
    id: 7,
    action: 'approve',
    actionType: 'suggestion',
    description: 'Approved suggestion "Weekly community cleanup drive"',
    user: { name: 'Moderator Jane', role: 'moderator', avatar: 'M' },
    target: { type: 'suggestion', id: 12, name: 'Weekly community cleanup drive' },
    ipAddress: '192.168.1.105',
    userAgent: 'Firefox 121.0 / macOS',
    timestamp: '2025-12-01T10:30:00',
    status: 'success',
  },
  {
    id: 8,
    action: 'delete',
    actionType: 'announcement',
    description: 'Deleted announcement "Outdated Notice"',
    user: { name: 'Admin User', role: 'administrator', avatar: 'A' },
    target: { type: 'announcement', id: 5, name: 'Outdated Notice' },
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome 120.0 / Windows 10',
    timestamp: '2025-12-01T11:00:00',
    status: 'success',
  },
  {
    id: 9,
    action: 'login_failed',
    actionType: 'auth',
    description: 'Failed login attempt',
    user: { name: 'Unknown', role: 'unknown', avatar: '?' },
    target: { type: 'user', id: null, name: 'admin@test.com' },
    ipAddress: '203.45.67.89',
    userAgent: 'Chrome 119.0 / Linux',
    timestamp: '2025-12-01T11:30:00',
    status: 'failed',
  },
  {
    id: 10,
    action: 'settings_update',
    actionType: 'settings',
    description: 'Updated system notification settings',
    user: { name: 'Admin User', role: 'administrator', avatar: 'A' },
    target: { type: 'settings', id: null, name: 'Notification Settings' },
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome 120.0 / Windows 10',
    timestamp: '2025-12-01T12:00:00',
    status: 'success',
  },
  {
    id: 11,
    action: 'logout',
    actionType: 'auth',
    description: 'Moderator Jane logged out',
    user: { name: 'Moderator Jane', role: 'moderator', avatar: 'M' },
    target: null,
    ipAddress: '192.168.1.105',
    userAgent: 'Firefox 121.0 / macOS',
    timestamp: '2025-12-01T12:30:00',
    status: 'success',
  },
  {
    id: 12,
    action: 'block',
    actionType: 'user',
    description: 'Blocked user account for policy violation',
    user: { name: 'Admin User', role: 'administrator', avatar: 'A' },
    target: { type: 'user', id: 156, name: 'Spam Account' },
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome 120.0 / Windows 10',
    timestamp: '2025-11-30T15:00:00',
    status: 'success',
  },
  {
    id: 13,
    action: 'resolve',
    actionType: 'concern',
    description: 'Marked concern as resolved',
    user: { name: 'Moderator Jane', role: 'moderator', avatar: 'M' },
    target: { type: 'concern', id: 38, name: 'Garbage not collected in Area 3' },
    ipAddress: '192.168.1.105',
    userAgent: 'Firefox 121.0 / macOS',
    timestamp: '2025-11-30T14:00:00',
    status: 'success',
  },
  {
    id: 14,
    action: 'edit',
    actionType: 'announcement',
    description: 'Edited announcement "Water Interruption Notice"',
    user: { name: 'Admin User', role: 'administrator', avatar: 'A' },
    target: { type: 'announcement', id: 2, name: 'Water Interruption Notice' },
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome 120.0 / Windows 10',
    timestamp: '2025-11-30T10:00:00',
    status: 'success',
  },
  {
    id: 15,
    action: 'reject',
    actionType: 'suggestion',
    description: 'Rejected suggestion "Build casino in barangay"',
    user: { name: 'Admin User', role: 'administrator', avatar: 'A' },
    target: { type: 'suggestion', id: 8, name: 'Build casino in barangay' },
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome 120.0 / Windows 10',
    timestamp: '2025-11-29T16:00:00',
    status: 'success',
  },
];

const getActionIcon = (action: string, actionType: string) => {
  switch (action) {
    case 'login':
      return <LoginIcon sx={{ fontSize: 18 }} />;
    case 'logout':
      return <LogoutIcon sx={{ fontSize: 18 }} />;
    case 'login_failed':
      return <BlockIcon sx={{ fontSize: 18 }} />;
    case 'create':
      return <AddIcon sx={{ fontSize: 18 }} />;
    case 'edit':
      return <EditIcon sx={{ fontSize: 18 }} />;
    case 'delete':
      return <DeleteIcon sx={{ fontSize: 18 }} />;
    case 'publish':
    case 'approve':
      return <CheckCircleIcon sx={{ fontSize: 18 }} />;
    case 'verify':
      return <CheckCircleIcon sx={{ fontSize: 18 }} />;
    case 'block':
      return <BlockIcon sx={{ fontSize: 18 }} />;
    case 'role_change':
      return <AdminPanelSettingsIcon sx={{ fontSize: 18 }} />;
    case 'status_change':
    case 'resolve':
      return <CheckCircleIcon sx={{ fontSize: 18 }} />;
    case 'settings_update':
      return <SettingsIcon sx={{ fontSize: 18 }} />;
    case 'reject':
      return <BlockIcon sx={{ fontSize: 18 }} />;
    default:
      return <VisibilityIcon sx={{ fontSize: 18 }} />;
  }
};

const getActionTypeIcon = (actionType: string) => {
  switch (actionType) {
    case 'auth':
      return <SecurityIcon sx={{ fontSize: 16, color: '#71767b' }} />;
    case 'announcement':
      return <CampaignIcon sx={{ fontSize: 16, color: '#71767b' }} />;
    case 'concern':
      return <ReportProblemIcon sx={{ fontSize: 16, color: '#71767b' }} />;
    case 'suggestion':
      return <LightbulbIcon sx={{ fontSize: 16, color: '#71767b' }} />;
    case 'user':
      return <PersonIcon sx={{ fontSize: 16, color: '#71767b' }} />;
    case 'settings':
      return <SettingsIcon sx={{ fontSize: 16, color: '#71767b' }} />;
    default:
      return null;
  }
};

const getActionColor = (action: string, status: string) => {
  if (status === 'failed') return '#F44336';
  
  switch (action) {
    case 'login':
    case 'create':
    case 'publish':
    case 'approve':
    case 'verify':
    case 'resolve':
      return '#4CAF50';
    case 'logout':
      return '#71767b';
    case 'edit':
    case 'status_change':
    case 'role_change':
    case 'settings_update':
      return '#2196F3';
    case 'delete':
    case 'block':
    case 'reject':
    case 'login_failed':
      return '#F44336';
    default:
      return '#71767b';
  }
};

const getRoleColor = (role: string) => {
  switch (role) {
    case 'administrator':
      return '#7B1113';
    case 'moderator':
      return '#2196F3';
    default:
      return '#71767b';
  }
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) {
    return 'Just now';
  } else if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

const formatFullTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export default function AuditLogsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [actionTypeFilter, setActionTypeFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Filter logs based on tab and filters
  const filteredLogs = mockActivityLogs.filter(log => {
    // Tab filter
    if (tabValue === 1 && log.actionType !== 'auth') return false;
    if (tabValue === 2 && log.actionType !== 'announcement') return false;
    if (tabValue === 3 && log.actionType !== 'concern') return false;
    if (tabValue === 4 && log.actionType !== 'user') return false;
    if (tabValue === 5 && !['settings', 'suggestion'].includes(log.actionType)) return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesDescription = log.description.toLowerCase().includes(query);
      const matchesUser = log.user.name.toLowerCase().includes(query);
      const matchesTarget = log.target?.name?.toLowerCase().includes(query);
      if (!matchesDescription && !matchesUser && !matchesTarget) return false;
    }

    // Action type filter
    if (actionTypeFilter !== 'all' && log.actionType !== actionTypeFilter) return false;

    return true;
  });

  // Counts
  const allCount = mockActivityLogs.length;
  const authCount = mockActivityLogs.filter(l => l.actionType === 'auth').length;
  const announcementCount = mockActivityLogs.filter(l => l.actionType === 'announcement').length;
  const concernCount = mockActivityLogs.filter(l => l.actionType === 'concern').length;
  const userCount = mockActivityLogs.filter(l => l.actionType === 'user').length;
  const otherCount = mockActivityLogs.filter(l => ['settings', 'suggestion'].includes(l.actionType)).length;

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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
                Activity Logs
              </Typography>
              <Typography sx={{ fontSize: '0.813rem', color: '#71767b' }}>
                Track all admin and moderator actions
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                sx={{
                  color: '#e7e9ea',
                  '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
                }}
                title="Refresh"
              >
                <RefreshIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: '#e7e9ea',
                  '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
                }}
                title="Export logs"
              >
                <DownloadIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Search */}
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <TextField
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#71767b', fontSize: 20 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: '#202327',
                  borderRadius: 5,
                  '& fieldset': { border: 'none' },
                  '&:hover fieldset': { border: 'none' },
                  '&.Mui-focused fieldset': { border: '1px solid #7B1113' },
                },
                '& .MuiInputBase-input': {
                  color: '#e7e9ea',
                  fontSize: '0.875rem',
                  py: 1,
                  '&::placeholder': { color: '#71767b', opacity: 1 },
                },
              }}
            />
            <IconButton
              onClick={() => setShowFilters(!showFilters)}
              sx={{
                color: showFilters ? '#7B1113' : '#e7e9ea',
                bgcolor: showFilters ? 'rgba(123, 17, 19, 0.1)' : 'transparent',
                '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
              }}
            >
              <FilterListIcon />
            </IconButton>
          </Box>

          {/* Filters */}
          {showFilters && (
            <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel sx={{ color: '#71767b' }}>Action Type</InputLabel>
                <Select
                  value={actionTypeFilter}
                  onChange={(e) => setActionTypeFilter(e.target.value)}
                  label="Action Type"
                  sx={{
                    color: '#e7e9ea',
                    bgcolor: '#202327',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: '#2f3336' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#71767b' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#7B1113' },
                    '& .MuiSvgIcon-root': { color: '#71767b' },
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        bgcolor: '#000',
                        border: '1px solid #2f3336',
                        '& .MuiMenuItem-root': {
                          color: '#e7e9ea',
                          '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
                          '&.Mui-selected': { bgcolor: 'rgba(123, 17, 19, 0.2)' },
                        },
                      },
                    },
                  }}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="auth">Authentication</MenuItem>
                  <MenuItem value="announcement">Announcements</MenuItem>
                  <MenuItem value="concern">Concerns</MenuItem>
                  <MenuItem value="user">Users</MenuItem>
                  <MenuItem value="suggestion">Suggestions</MenuItem>
                  <MenuItem value="settings">Settings</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
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
            label={`All (${allCount})`}
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
            label={`Auth (${authCount})`}
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
            label={`Announcements (${announcementCount})`}
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
            label={`Concerns (${concernCount})`}
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
            label={`Users (${userCount})`}
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
          <Tab
            label={`Other (${otherCount})`}
            sx={{
              color: tabValue === 5 ? '#e7e9ea' : '#71767b',
              textTransform: 'none',
              fontWeight: tabValue === 5 ? 700 : 400,
              fontSize: '0.875rem',
              minWidth: 'auto',
              px: 2,
              '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
            }}
          />
        </Tabs>
      </Box>

      {/* Activity Logs List */}
      <Box>
        {filteredLogs.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ color: '#71767b', fontSize: '0.938rem' }}>
              No activity logs found
            </Typography>
          </Box>
        ) : (
          filteredLogs.map((log) => (
            <Box
              key={log.id}
              sx={{
                display: 'flex',
                gap: 1.5,
                p: 2,
                borderBottom: '1px solid #2f3336',
                '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.03)' },
              }}
            >
              {/* Action Icon */}
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: `${getActionColor(log.action, log.status)}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  color: getActionColor(log.action, log.status),
                }}
              >
                {getActionIcon(log.action, log.actionType)}
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                {/* Description */}
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.5 }}>
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      color: '#e7e9ea',
                      flex: 1,
                    }}
                  >
                    {log.description}
                  </Typography>
                  {log.status === 'failed' && (
                    <Chip
                      label="Failed"
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

                {/* User & Target Info */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Avatar
                      sx={{
                        width: 18,
                        height: 18,
                        bgcolor: getRoleColor(log.user.role),
                        fontSize: '0.625rem',
                        fontWeight: 700,
                      }}
                    >
                      {log.user.avatar}
                    </Avatar>
                    <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                      {log.user.name}
                    </Typography>
                    <Chip
                      label={log.user.role}
                      size="small"
                      sx={{
                        height: 16,
                        fontSize: '0.6rem',
                        bgcolor: `${getRoleColor(log.user.role)}30`,
                        color: getRoleColor(log.user.role),
                        textTransform: 'capitalize',
                      }}
                    />
                  </Box>
                  {log.target && (
                    <>
                      <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>•</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {getActionTypeIcon(log.actionType)}
                        <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                          {log.target.name}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>

                {/* Meta Info */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }} title={formatFullTime(log.timestamp)}>
                    {formatTime(log.timestamp)}
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#536471' }}>
                    IP: {log.ipAddress}
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#536471' }}>
                    {log.userAgent}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* Load More */}
      {filteredLogs.length > 0 && (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Button
            sx={{
              color: '#7B1113',
              textTransform: 'none',
              '&:hover': { bgcolor: 'rgba(123, 17, 19, 0.1)' },
            }}
          >
            Load more logs
          </Button>
        </Box>
      )}
    </Box>
  );
}
