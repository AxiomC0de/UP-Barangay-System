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
import CampaignIcon from '@mui/icons-material/Campaign';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CommentIcon from '@mui/icons-material/Comment';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoIcon from '@mui/icons-material/Info';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'concern',
    title: 'New concern submitted',
    message: 'Maria Santos reported "Streetlight malfunction in Area 5"',
    read: false,
    priority: 'high',
    createdAt: '2025-12-01T08:30:00',
    icon: ReportProblemIcon,
    iconColor: '#FF9800',
  },
  {
    id: 2,
    type: 'user',
    title: 'New user registration',
    message: 'Carlos Mendoza registered and is pending verification',
    read: false,
    priority: 'normal',
    createdAt: '2025-12-01T07:45:00',
    icon: PersonAddIcon,
    iconColor: '#2196F3',
  },
  {
    id: 3,
    type: 'concern',
    title: 'Urgent concern reported',
    message: 'Juan Dela Cruz reported "Water pipe leak on main road" with urgent priority',
    read: false,
    priority: 'urgent',
    createdAt: '2025-11-30T16:20:00',
    icon: WarningAmberIcon,
    iconColor: '#F44336',
  },
  {
    id: 4,
    type: 'suggestion',
    title: 'New suggestion received',
    message: 'Ana Reyes suggested "Weekly community cleanup drive" with 45 votes',
    read: true,
    priority: 'normal',
    createdAt: '2025-11-30T14:00:00',
    icon: LightbulbIcon,
    iconColor: '#4CAF50',
  },
  {
    id: 5,
    type: 'system',
    title: 'Announcement published',
    message: 'Your announcement "Community Christmas Party 2025" is now live',
    read: true,
    priority: 'normal',
    createdAt: '2025-11-28T10:30:00',
    icon: CampaignIcon,
    iconColor: '#7B1113',
  },
  {
    id: 6,
    type: 'concern',
    title: 'Concern resolved',
    message: 'Concern "Garbage not collected" has been marked as resolved',
    read: true,
    priority: 'normal',
    createdAt: '2025-11-28T09:00:00',
    icon: CheckCircleIcon,
    iconColor: '#4CAF50',
  },
  {
    id: 7,
    type: 'comment',
    title: 'New comment on concern',
    message: 'Pedro Garcia commented on "Noise complaint - late night karaoke"',
    read: true,
    priority: 'normal',
    createdAt: '2025-11-27T20:15:00',
    icon: CommentIcon,
    iconColor: '#9C27B0',
  },
  {
    id: 8,
    type: 'system',
    title: 'Weekly report ready',
    message: 'Your weekly analytics report is ready to view',
    read: true,
    priority: 'normal',
    createdAt: '2025-11-25T08:00:00',
    icon: InfoIcon,
    iconColor: '#71767b',
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

export default function AdminNotificationsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  // Filter notifications based on tab
  const filteredNotifications = notifications.filter(notification => {
    if (tabValue === 1 && notification.read) return false;
    if (tabValue === 2 && notification.type !== 'concern') return false;
    if (tabValue === 3 && notification.type !== 'user') return false;
    if (tabValue === 4 && notification.type !== 'system' && notification.type !== 'suggestion') return false;
    return true;
  });

  // Counts
  const unreadCount = notifications.filter(n => !n.read).length;
  const concernCount = notifications.filter(n => n.type === 'concern').length;
  const userCount = notifications.filter(n => n.type === 'user').length;
  const otherCount = notifications.filter(n => n.type === 'system' || n.type === 'suggestion' || n.type === 'comment').length;

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
                Notifications
              </Typography>
              <Typography sx={{ fontSize: '0.813rem', color: '#71767b' }}>
                {unreadCount} unread
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
                sx={{
                  color: '#e7e9ea',
                  '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
                  '&:disabled': { color: '#71767b' },
                }}
                title="Mark all as read"
              >
                <DoneAllIcon />
              </IconButton>
              <IconButton
                onClick={handleClearAll}
                disabled={notifications.length === 0}
                sx={{
                  color: '#e7e9ea',
                  '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
                  '&:disabled': { color: '#71767b' },
                }}
                title="Clear all"
              >
                <DeleteSweepIcon />
              </IconButton>
            </Box>
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
            label={`All (${notifications.length})`}
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
            label={`Unread (${unreadCount})`}
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
            label={`Concerns (${concernCount})`}
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
            label={`Users (${userCount})`}
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
            label={`Other (${otherCount})`}
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

      {/* Notifications List */}
      <Box>
        {filteredNotifications.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography sx={{ color: '#71767b', fontSize: '0.938rem' }}>
              No notifications
            </Typography>
          </Box>
        ) : (
          filteredNotifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <Box
                key={notification.id}
                onClick={() => handleMarkAsRead(notification.id)}
                sx={{
                  display: 'flex',
                  gap: 1.5,
                  p: 2,
                  borderBottom: '1px solid #2f3336',
                  cursor: 'pointer',
                  bgcolor: notification.read ? 'transparent' : 'rgba(123, 17, 19, 0.05)',
                  borderLeft: notification.read ? 'none' : '3px solid #7B1113',
                  '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.03)' },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: `${notification.iconColor}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <IconComponent sx={{ color: notification.iconColor, fontSize: 20 }} />
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
                    <Typography
                      sx={{
                        fontWeight: notification.read ? 500 : 700,
                        fontSize: '0.875rem',
                        color: '#e7e9ea',
                      }}
                    >
                      {notification.title}
                    </Typography>
                    {notification.priority === 'urgent' && (
                      <Chip
                        label="Urgent"
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: '0.65rem',
                          bgcolor: 'rgba(244, 67, 54, 0.2)',
                          color: '#F44336',
                        }}
                      />
                    )}
                    {notification.priority === 'high' && (
                      <Chip
                        label="High"
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: '0.65rem',
                          bgcolor: 'rgba(255, 152, 0, 0.2)',
                          color: '#FF9800',
                        }}
                      />
                    )}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '0.813rem',
                      color: '#71767b',
                      mb: 0.5,
                    }}
                  >
                    {notification.message}
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                    {formatTime(notification.createdAt)}
                  </Typography>
                </Box>
                {!notification.read && (
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: '#7B1113',
                      flexShrink: 0,
                      mt: 1,
                    }}
                  />
                )}
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
}
