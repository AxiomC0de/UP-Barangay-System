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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FlagIcon from '@mui/icons-material/Flag';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import BlockIcon from '@mui/icons-material/Block';

interface FlaggedContent {
  id: number;
  type: 'post' | 'comment' | 'concern' | 'suggestion';
  content: string;
  author: {
    name: string;
    handle: string;
    avatar: string | null;
  };
  flaggedAt: string;
  flaggedBy: string;
  reason: string;
  status: 'pending' | 'reviewed' | 'resolved' | 'dismissed';
  severity: 'low' | 'medium' | 'high';
}

const mockFlaggedContent: FlaggedContent[] = [
  {
    id: 1,
    type: 'post',
    content: 'This post contains inappropriate language and personal attacks against a community member.',
    author: { name: 'Anonymous User', handle: '@anon123', avatar: null },
    flaggedAt: '2025-12-01T08:30:00',
    flaggedBy: 'Auto-Detection',
    reason: 'Inappropriate content',
    status: 'pending',
    severity: 'high',
  },
  {
    id: 2,
    type: 'comment',
    content: 'This is spam! Check out my website for free stuff...',
    author: { name: 'Spam Account', handle: '@spam456', avatar: null },
    flaggedAt: '2025-12-01T07:15:00',
    flaggedBy: 'Maria Santos',
    reason: 'Spam / Advertising',
    status: 'pending',
    severity: 'medium',
  },
  {
    id: 3,
    type: 'concern',
    content: 'Duplicate concern report - same issue already reported by another resident.',
    author: { name: 'Juan Dela Cruz', handle: '@juandc', avatar: null },
    flaggedAt: '2025-11-30T16:00:00',
    flaggedBy: 'System',
    reason: 'Duplicate report',
    status: 'reviewed',
    severity: 'low',
  },
  {
    id: 4,
    type: 'post',
    content: 'Spreading misinformation about barangay services and officials.',
    author: { name: 'Troublemaker', handle: '@trouble', avatar: null },
    flaggedAt: '2025-11-30T12:00:00',
    flaggedBy: 'Pedro Garcia',
    reason: 'Misinformation',
    status: 'pending',
    severity: 'high',
  },
  {
    id: 5,
    type: 'suggestion',
    content: 'Off-topic suggestion not related to barangay services.',
    author: { name: 'Random User', handle: '@random', avatar: null },
    flaggedAt: '2025-11-29T09:00:00',
    flaggedBy: 'Ana Reyes',
    reason: 'Off-topic',
    status: 'dismissed',
    severity: 'low',
  },
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high': return '#F44336';
    case 'medium': return '#FF9800';
    case 'low': return '#71767b';
    default: return '#71767b';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return '#FF9800';
    case 'reviewed': return '#2196F3';
    case 'resolved': return '#4CAF50';
    case 'dismissed': return '#71767b';
    default: return '#71767b';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'post': return '#1d9bf0';
    case 'comment': return '#71767b';
    case 'concern': return '#FF9800';
    case 'suggestion': return '#2196F3';
    default: return '#71767b';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
};

export default function ModeratorFlaggedPage() {
  const [tabValue, setTabValue] = useState(0);
  const [flaggedContent, setFlaggedContent] = useState(mockFlaggedContent);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedContent, setSelectedContent] = useState<FlaggedContent | null>(null);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<'resolve' | 'dismiss' | 'hide' | 'delete'>('resolve');
  const [actionNote, setActionNote] = useState('');

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, content: FlaggedContent) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedContent(content);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const openActionDialog = (type: 'resolve' | 'dismiss' | 'hide' | 'delete') => {
    setActionType(type);
    setActionDialogOpen(true);
    handleMenuClose();
  };

  const handleAction = () => {
    if (selectedContent) {
      if (actionType === 'delete') {
        setFlaggedContent(prev => prev.filter(c => c.id !== selectedContent.id));
      } else {
        setFlaggedContent(prev =>
          prev.map(c =>
            c.id === selectedContent.id
              ? { ...c, status: actionType === 'dismiss' ? 'dismissed' : 'resolved' as FlaggedContent['status'] }
              : c
          )
        );
      }
    }
    setActionDialogOpen(false);
    setActionNote('');
  };

  const filteredContent = flaggedContent.filter(content => {
    if (tabValue === 0) return true;
    if (tabValue === 1) return content.status === 'pending';
    if (tabValue === 2) return content.status === 'reviewed';
    if (tabValue === 3) return content.status === 'resolved' || content.status === 'dismissed';
    return true;
  });

  const pendingCount = flaggedContent.filter(c => c.status === 'pending').length;

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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#e7e9ea' }}>
            Flagged Content
          </Typography>
          {pendingCount > 0 && (
            <Chip
              label={`${pendingCount} pending`}
              size="small"
              sx={{
                bgcolor: 'rgba(244, 67, 54, 0.2)',
                color: '#F44336',
                fontWeight: 600,
              }}
            />
          )}
        </Box>
        <Typography sx={{ fontSize: '0.8125rem', color: '#71767b' }}>
          Review and take action on flagged content
        </Typography>
      </Box>

      {/* Stats */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          p: 2,
          borderBottom: '1px solid #2f3336',
          overflowX: 'auto',
        }}
      >
        <Box sx={{ bgcolor: '#16181c', borderRadius: 2, p: 2, minWidth: 120, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#F44336' }}>
            {flaggedContent.filter(c => c.severity === 'high' && c.status === 'pending').length}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>High Priority</Typography>
        </Box>
        <Box sx={{ bgcolor: '#16181c', borderRadius: 2, p: 2, minWidth: 120, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF9800' }}>
            {flaggedContent.filter(c => c.status === 'pending').length}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>Pending Review</Typography>
        </Box>
        <Box sx={{ bgcolor: '#16181c', borderRadius: 2, p: 2, minWidth: 120, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: '#4CAF50' }}>
            {flaggedContent.filter(c => c.status === 'resolved').length}
          </Typography>
          <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>Resolved</Typography>
        </Box>
      </Box>

      {/* Tabs */}
      <Tabs
        value={tabValue}
        onChange={(_, v) => setTabValue(v)}
        sx={{
          borderBottom: '1px solid #2f3336',
          '& .MuiTab-root': {
            color: '#71767b',
            textTransform: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            '&.Mui-selected': { color: '#e7e9ea' },
          },
          '& .MuiTabs-indicator': { bgcolor: '#1d9bf0' },
        }}
      >
        <Tab label="All" />
        <Tab label="Pending" />
        <Tab label="Reviewed" />
        <Tab label="Resolved" />
      </Tabs>

      {/* Flagged Content List */}
      {filteredContent.map((content) => (
        <Box
          key={content.id}
          sx={{
            p: 2,
            borderBottom: '1px solid #2f3336',
            bgcolor: content.severity === 'high' && content.status === 'pending'
              ? 'rgba(244, 67, 54, 0.05)'
              : 'transparent',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.03)' },
          }}
        >
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            {/* Severity Indicator */}
            <Box
              sx={{
                width: 4,
                borderRadius: 1,
                bgcolor: getSeverityColor(content.severity),
                alignSelf: 'stretch',
              }}
            />

            <Box sx={{ flex: 1, minWidth: 0 }}>
              {/* Header */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FlagIcon sx={{ fontSize: 18, color: getSeverityColor(content.severity) }} />
                  <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#e7e9ea' }}>
                    {content.reason}
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, content)}
                  sx={{ color: '#71767b' }}
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>

              {/* Badges */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                <Chip
                  label={content.type}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.65rem',
                    bgcolor: `${getTypeColor(content.type)}20`,
                    color: getTypeColor(content.type),
                    textTransform: 'capitalize',
                  }}
                />
                <Chip
                  label={content.status}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.65rem',
                    bgcolor: `${getStatusColor(content.status)}20`,
                    color: getStatusColor(content.status),
                    textTransform: 'capitalize',
                  }}
                />
                <Chip
                  label={content.severity}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.65rem',
                    bgcolor: `${getSeverityColor(content.severity)}20`,
                    color: getSeverityColor(content.severity),
                    textTransform: 'capitalize',
                  }}
                />
              </Box>

              {/* Content Preview */}
              <Box
                sx={{
                  bgcolor: '#16181c',
                  borderRadius: 2,
                  p: 1.5,
                  mb: 1,
                  borderLeft: `3px solid ${getSeverityColor(content.severity)}`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: '#e7e9ea',
                    fontStyle: 'italic',
                  }}
                >
                  "{content.content}"
                </Typography>
              </Box>

              {/* Author Info */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: '#2f3336' }}>
                  {content.author.name.charAt(0)}
                </Avatar>
                <Typography sx={{ fontSize: '0.813rem', color: '#e7e9ea' }}>
                  {content.author.name}
                </Typography>
                <Typography sx={{ fontSize: '0.813rem', color: '#71767b' }}>
                  {content.author.handle}
                </Typography>
              </Box>

              {/* Footer */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                  Flagged by {content.flaggedBy}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                  {formatDate(content.flaggedAt)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}

      {filteredContent.length === 0 && (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 48, color: '#4CAF50', mb: 2 }} />
          <Typography sx={{ color: '#e7e9ea', fontWeight: 600 }}>
            No flagged content
          </Typography>
          <Typography sx={{ color: '#71767b', fontSize: '0.875rem' }}>
            All content has been reviewed
          </Typography>
        </Box>
      )}

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
          onClick={() => openActionDialog('resolve')}
          sx={{ color: '#4CAF50', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <ListItemIcon>
            <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 20 }} />
          </ListItemIcon>
          Mark Resolved
        </MenuItem>
        <MenuItem
          onClick={() => openActionDialog('dismiss')}
          sx={{ color: '#71767b', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <ListItemIcon>
            <VisibilityIcon sx={{ color: '#71767b', fontSize: 20 }} />
          </ListItemIcon>
          Dismiss Flag
        </MenuItem>
        <MenuItem
          onClick={() => openActionDialog('hide')}
          sx={{ color: '#FF9800', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <ListItemIcon>
            <VisibilityOffIcon sx={{ color: '#FF9800', fontSize: 20 }} />
          </ListItemIcon>
          Hide Content
        </MenuItem>
        <MenuItem
          onClick={() => openActionDialog('delete')}
          sx={{ color: '#F44336', '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' } }}
        >
          <ListItemIcon>
            <DeleteIcon sx={{ color: '#F44336', fontSize: 20 }} />
          </ListItemIcon>
          Delete Content
        </MenuItem>
      </Menu>

      {/* Action Dialog */}
      <Dialog
        open={actionDialogOpen}
        onClose={() => setActionDialogOpen(false)}
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
            {actionType === 'delete' ? (
              <WarningIcon sx={{ color: '#F44336' }} />
            ) : (
              <CheckCircleIcon sx={{ color: '#4CAF50' }} />
            )}
            {actionType === 'resolve' && 'Mark as Resolved'}
            {actionType === 'dismiss' && 'Dismiss Flag'}
            {actionType === 'hide' && 'Hide Content'}
            {actionType === 'delete' && 'Delete Content'}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Typography sx={{ color: '#71767b', mb: 2, fontSize: '0.875rem' }}>
            {actionType === 'delete'
              ? 'This action cannot be undone. The content will be permanently removed.'
              : 'Add a note about this action (optional).'}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Add a note..."
            value={actionNote}
            onChange={(e) => setActionNote(e.target.value)}
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
          <Button onClick={() => setActionDialogOpen(false)} sx={{ color: '#71767b' }}>
            Cancel
          </Button>
          <Button
            onClick={handleAction}
            variant="contained"
            sx={{
              bgcolor: actionType === 'delete' ? '#F44336' : '#1d9bf0',
              '&:hover': { bgcolor: actionType === 'delete' ? '#D32F2F' : '#1a8cd8' },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
