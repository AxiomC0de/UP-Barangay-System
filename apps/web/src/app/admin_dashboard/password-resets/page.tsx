'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RefreshIcon from '@mui/icons-material/Refresh';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import LockResetIcon from '@mui/icons-material/LockReset';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

// Type definition for password reset request
interface PasswordResetRequest {
  id: number;
  user: {
    name: string;
    email: string;
    avatar: string | null;
    district: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  requestedAt: string;
  expiresAt?: string;
  processedAt?: string;
  processedBy?: string;
  rejectionReason?: string;
  ipAddress: string;
  userAgent: string;
}

// Mock password reset requests
const mockRequests: PasswordResetRequest[] = [
  {
    id: 1,
    user: {
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      avatar: null,
      district: 'Area 5',
    },
    status: 'pending',
    requestedAt: '2025-12-01T08:30:00',
    expiresAt: '2025-12-01T20:30:00',
    ipAddress: '192.168.1.45',
    userAgent: 'Chrome 120.0 / Windows 10',
  },
  {
    id: 2,
    user: {
      name: 'Juan Dela Cruz',
      email: 'juan.delacruz@email.com',
      avatar: null,
      district: 'Area 2',
    },
    status: 'pending',
    requestedAt: '2025-12-01T07:15:00',
    expiresAt: '2025-12-01T19:15:00',
    ipAddress: '192.168.1.89',
    userAgent: 'Safari 17.0 / macOS',
  },
  {
    id: 3,
    user: {
      name: 'Ana Garcia',
      email: 'ana.garcia@email.com',
      avatar: null,
      district: 'Area 3',
    },
    status: 'pending',
    requestedAt: '2025-12-01T06:00:00',
    expiresAt: '2025-12-01T18:00:00',
    ipAddress: '192.168.1.112',
    userAgent: 'Firefox 121.0 / Windows 11',
  },
  {
    id: 4,
    user: {
      name: 'Carlos Mendoza',
      email: 'carlos.m@email.com',
      avatar: null,
      district: 'Area 12',
    },
    status: 'approved',
    requestedAt: '2025-11-30T14:30:00',
    processedAt: '2025-11-30T15:00:00',
    processedBy: 'Admin User',
    ipAddress: '192.168.1.67',
    userAgent: 'Chrome 120.0 / Android',
  },
  {
    id: 5,
    user: {
      name: 'Elena Cruz',
      email: 'elena.cruz@email.com',
      avatar: null,
      district: 'Area 8',
    },
    status: 'approved',
    requestedAt: '2025-11-29T09:00:00',
    processedAt: '2025-11-29T09:30:00',
    processedBy: 'Admin User',
    ipAddress: '192.168.1.23',
    userAgent: 'Edge 120.0 / Windows 10',
  },
  {
    id: 6,
    user: {
      name: 'Pedro Garcia',
      email: 'pedro.g@email.com',
      avatar: null,
      district: 'Area 15',
    },
    status: 'rejected',
    requestedAt: '2025-11-28T16:00:00',
    processedAt: '2025-11-28T16:30:00',
    processedBy: 'Admin User',
    rejectionReason: 'Suspicious activity detected - multiple requests from different IPs',
    ipAddress: '203.45.67.89',
    userAgent: 'Unknown',
  },
  {
    id: 7,
    user: {
      name: 'Rosa Martinez',
      email: 'rosa.m@email.com',
      avatar: null,
      district: 'Area 6',
    },
    status: 'expired',
    requestedAt: '2025-11-27T10:00:00',
    expiresAt: '2025-11-27T22:00:00',
    ipAddress: '192.168.1.156',
    userAgent: 'Chrome 119.0 / iOS',
  },
];

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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return '#FF9800';
    case 'approved':
      return '#4CAF50';
    case 'rejected':
      return '#F44336';
    case 'expired':
      return '#71767b';
    default:
      return '#71767b';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'approved':
      return 'Approved';
    case 'rejected':
      return 'Rejected';
    case 'expired':
      return 'Expired';
    default:
      return status;
  }
};

export default function PasswordResetsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [requests, setRequests] = useState<PasswordResetRequest[]>(mockRequests);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRequest, setSelectedRequest] = useState<PasswordResetRequest | null>(null);
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, request: PasswordResetRequest) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedRequest(request);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleApprove = () => {
    if (selectedRequest) {
      setRequests(prev =>
        prev.map(r =>
          r.id === selectedRequest.id
            ? {
                ...r,
                status: 'approved',
                processedAt: new Date().toISOString(),
                processedBy: 'Admin User',
              }
            : r
        )
      );
    }
    setApproveDialogOpen(false);
    handleMenuClose();
  };

  const handleReject = () => {
    if (selectedRequest && rejectionReason.trim()) {
      setRequests(prev =>
        prev.map(r =>
          r.id === selectedRequest.id
            ? {
                ...r,
                status: 'rejected',
                processedAt: new Date().toISOString(),
                processedBy: 'Admin User',
                rejectionReason: rejectionReason,
              }
            : r
        )
      );
    }
    setRejectDialogOpen(false);
    setRejectionReason('');
    handleMenuClose();
  };

  const handleDelete = () => {
    if (selectedRequest) {
      setRequests(prev => prev.filter(r => r.id !== selectedRequest.id));
    }
    handleMenuClose();
  };

  // Filter requests based on tab and search
  const filteredRequests = requests.filter(request => {
    // Tab filter
    if (tabValue === 1 && request.status !== 'pending') return false;
    if (tabValue === 2 && request.status !== 'approved') return false;
    if (tabValue === 3 && request.status !== 'rejected') return false;
    if (tabValue === 4 && request.status !== 'expired') return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = request.user.name.toLowerCase().includes(query);
      const matchesEmail = request.user.email.toLowerCase().includes(query);
      if (!matchesName && !matchesEmail) return false;
    }

    return true;
  });

  // Counts
  const allCount = requests.length;
  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;
  const expiredCount = requests.filter(r => r.status === 'expired').length;

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
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
                Password Reset Requests
              </Typography>
              <Typography sx={{ fontSize: '0.813rem', color: '#71767b' }}>
                Manage user password reset requests
              </Typography>
            </Box>
            <IconButton
              sx={{
                color: '#e7e9ea',
                '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
              }}
              title="Refresh"
            >
              <RefreshIcon />
            </IconButton>
          </Box>

          {/* Search */}
          <TextField
            placeholder="Search by name or email..."
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
              mb: 1,
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
            label={`Pending (${pendingCount})`}
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
            label={`Approved (${approvedCount})`}
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
            label={`Rejected (${rejectedCount})`}
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
            label={`Expired (${expiredCount})`}
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

      {/* Requests List */}
      <Box>
        {filteredRequests.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <LockResetIcon sx={{ fontSize: 48, color: '#2f3336', mb: 2 }} />
            <Typography sx={{ color: '#71767b', fontSize: '0.938rem' }}>
              No password reset requests found
            </Typography>
          </Box>
        ) : (
          filteredRequests.map((request) => (
            <Box
              key={request.id}
              sx={{
                p: 2,
                borderBottom: '1px solid #2f3336',
                '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.03)' },
              }}
            >
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    bgcolor: '#7B1113',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                  }}
                >
                  {request.user.name.charAt(0)}
                </Avatar>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  {/* User Info */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.938rem', color: '#e7e9ea' }}>
                      {request.user.name}
                    </Typography>
                    <Chip
                      label={getStatusLabel(request.status)}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.7rem',
                        bgcolor: `${getStatusColor(request.status)}20`,
                        color: getStatusColor(request.status),
                        fontWeight: 600,
                      }}
                    />
                  </Box>

                  {/* Email */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
                    <EmailIcon sx={{ fontSize: 14, color: '#71767b' }} />
                    <Typography sx={{ fontSize: '0.813rem', color: '#71767b' }}>
                      {request.user.email}
                    </Typography>
                  </Box>

                  {/* District */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <PersonIcon sx={{ fontSize: 14, color: '#71767b' }} />
                    <Typography sx={{ fontSize: '0.813rem', color: '#71767b' }}>
                      {request.user.district}
                    </Typography>
                  </Box>

                  {/* Time Info */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <AccessTimeIcon sx={{ fontSize: 14, color: '#71767b' }} />
                      <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }} title={formatFullTime(request.requestedAt)}>
                        Requested {formatTime(request.requestedAt)}
                      </Typography>
                    </Box>
                    {request.status === 'pending' && request.expiresAt && (
                      <Typography sx={{ fontSize: '0.75rem', color: '#FF9800' }}>
                        Expires: {formatFullTime(request.expiresAt)}
                      </Typography>
                    )}
                    {request.processedAt && (
                      <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                        Processed by {request.processedBy} · {formatTime(request.processedAt)}
                      </Typography>
                    )}
                  </Box>

                  {/* Rejection Reason */}
                  {request.status === 'rejected' && request.rejectionReason && (
                    <Box sx={{ mt: 1, p: 1.5, bgcolor: 'rgba(244, 67, 54, 0.1)', borderRadius: 2 }}>
                      <Typography sx={{ fontSize: '0.813rem', color: '#F44336' }}>
                        Reason: {request.rejectionReason}
                      </Typography>
                    </Box>
                  )}

                  {/* IP & User Agent */}
                  <Box sx={{ mt: 1, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Typography sx={{ fontSize: '0.7rem', color: '#536471' }}>
                      IP: {request.ipAddress}
                    </Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: '#536471' }}>
                      {request.userAgent}
                    </Typography>
                  </Box>

                  {/* Action Buttons for Pending */}
                  {request.status === 'pending' && (
                    <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        variant="contained"
                        startIcon={<CheckCircleIcon />}
                        onClick={() => {
                          setSelectedRequest(request);
                          setApproveDialogOpen(true);
                        }}
                        sx={{
                          bgcolor: '#4CAF50',
                          color: '#fff',
                          textTransform: 'none',
                          borderRadius: 2,
                          fontSize: '0.813rem',
                          '&:hover': { bgcolor: '#43A047' },
                        }}
                      >
                        Approve
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={() => {
                          setSelectedRequest(request);
                          setRejectDialogOpen(true);
                        }}
                        sx={{
                          borderColor: '#F44336',
                          color: '#F44336',
                          textTransform: 'none',
                          borderRadius: 2,
                          fontSize: '0.813rem',
                          '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.1)', borderColor: '#F44336' },
                        }}
                      >
                        Reject
                      </Button>
                    </Box>
                  )}
                </Box>

                {/* Menu Button */}
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, request)}
                  sx={{ color: '#71767b', alignSelf: 'flex-start' }}
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Box>
          ))
        )}
      </Box>

      {/* Context Menu */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            bgcolor: '#000',
            border: '1px solid #2f3336',
            borderRadius: 3,
            minWidth: 200,
            boxShadow: '0 0 15px rgba(255,255,255,0.2)',
          },
        }}
      >
        <MenuItem
          onClick={() => {
            if (selectedRequest) {
              navigator.clipboard.writeText(selectedRequest.user.email);
            }
            handleMenuClose();
          }}
          sx={{
            py: 1.5,
            '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
          }}
        >
          <ListItemIcon>
            <ContentCopyIcon sx={{ color: '#e7e9ea' }} />
          </ListItemIcon>
          <Typography sx={{ color: '#e7e9ea' }}>Copy email</Typography>
        </MenuItem>
        {selectedRequest?.status === 'pending' && (
          <>
            <MenuItem
              onClick={() => {
                setApproveDialogOpen(true);
              }}
              sx={{
                py: 1.5,
                '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
              }}
            >
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: '#4CAF50' }} />
              </ListItemIcon>
              <Typography sx={{ color: '#4CAF50' }}>Approve request</Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                setRejectDialogOpen(true);
              }}
              sx={{
                py: 1.5,
                '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
              }}
            >
              <ListItemIcon>
                <CancelIcon sx={{ color: '#F44336' }} />
              </ListItemIcon>
              <Typography sx={{ color: '#F44336' }}>Reject request</Typography>
            </MenuItem>
          </>
        )}
        <MenuItem
          onClick={handleDelete}
          sx={{
            py: 1.5,
            '&:hover': { bgcolor: 'rgba(244, 67, 54, 0.1)' },
          }}
        >
          <ListItemIcon>
            <DeleteIcon sx={{ color: '#F44336' }} />
          </ListItemIcon>
          <Typography sx={{ color: '#F44336' }}>Delete request</Typography>
        </MenuItem>
      </Menu>

      {/* Approve Dialog */}
      <Dialog
        open={approveDialogOpen}
        onClose={() => setApproveDialogOpen(false)}
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
          Approve Password Reset?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#71767b', fontSize: '0.875rem', mb: 2 }}>
            This will send a password reset link to:
          </Typography>
          <Box sx={{ p: 2, bgcolor: '#16181c', borderRadius: 2 }}>
            <Typography sx={{ color: '#e7e9ea', fontWeight: 600 }}>
              {selectedRequest?.user.name}
            </Typography>
            <Typography sx={{ color: '#71767b', fontSize: '0.875rem' }}>
              {selectedRequest?.user.email}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setApproveDialogOpen(false)}
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
            onClick={handleApprove}
            variant="contained"
            sx={{
              bgcolor: '#4CAF50',
              color: '#fff',
              textTransform: 'none',
              borderRadius: 5,
              fontWeight: 700,
              '&:hover': { bgcolor: '#43A047' },
            }}
          >
            Approve & Send Link
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog
        open={rejectDialogOpen}
        onClose={() => {
          setRejectDialogOpen(false);
          setRejectionReason('');
        }}
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
          Reject Password Reset?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#71767b', fontSize: '0.875rem', mb: 2 }}>
            Please provide a reason for rejecting this request:
          </Typography>
          <TextField
            placeholder="Enter rejection reason..."
            multiline
            rows={3}
            fullWidth
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#e7e9ea',
                bgcolor: '#16181c',
                '& fieldset': { borderColor: '#2f3336' },
                '&:hover fieldset': { borderColor: '#71767b' },
                '&.Mui-focused fieldset': { borderColor: '#7B1113' },
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#71767b',
                opacity: 1,
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => {
              setRejectDialogOpen(false);
              setRejectionReason('');
            }}
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
            onClick={handleReject}
            variant="contained"
            disabled={!rejectionReason.trim()}
            sx={{
              bgcolor: '#F44336',
              color: '#fff',
              textTransform: 'none',
              borderRadius: 5,
              fontWeight: 700,
              '&:hover': { bgcolor: '#d32f2f' },
              '&:disabled': { bgcolor: '#4a1a1a', color: '#6b6b6b' },
            }}
          >
            Reject Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
