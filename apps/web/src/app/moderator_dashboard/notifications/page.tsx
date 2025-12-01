'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import FlagIcon from '@mui/icons-material/Flag';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CommentIcon from '@mui/icons-material/Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DoneAllIcon from '@mui/icons-material/DoneAll';

interface Notification {
  id: number;
  type: 'flag' | 'concern' | 'suggestion' | 'resolved' | 'comment';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'flag',
    title: 'New flagged content',
    message: 'A post has been flagged for inappropriate content',
    time: '5m ago',
    isRead: false,
  },
  {
    id: 2,
    type: 'concern',
    title: 'New concern submitted',
    message: 'Streetlight issue reported in Area 8',
    time: '15m ago',
    isRead: false,
  },
  {
    id: 3,
    type: 'suggestion',
    title: 'New suggestion received',
    message: 'Community garden project proposal',
    time: '1h ago',
    isRead: false,
  },
  {
    id: 4,
    type: 'resolved',
    title: 'Concern resolved',
    message: 'Garbage collection issue has been marked as resolved',
    time: '2h ago',
    isRead: true,
  },
  {
    id: 5,
    type: 'comment',
    title: 'New comment on flagged content',
    message: 'Admin added a comment on your flagged item',
    time: '3h ago',
    isRead: true,
  },
  {
    id: 6,
    type: 'flag',
    title: 'High priority flag',
    message: 'Content flagged as misinformation requires immediate review',
    time: '4h ago',
    isRead: true,
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'flag':
      return <FlagIcon sx={{ color: '#F44336' }} />;
    case 'concern':
      return <ReportProblemIcon sx={{ color: '#FF9800' }} />;
    case 'suggestion':
      return <LightbulbIcon sx={{ color: '#2196F3' }} />;
    case 'resolved':
      return <CheckCircleIcon sx={{ color: '#4CAF50' }} />;
    case 'comment':
      return <CommentIcon sx={{ color: '#71767b' }} />;
    default:
      return <FlagIcon sx={{ color: '#71767b' }} />;
  }
};

export default function ModeratorNotificationsPage() {
  const [tabValue, setTabValue] = useState(0);
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleMarkRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = notifications.filter(n => {
    if (tabValue === 0) return true;
    if (tabValue === 1) return !n.isRead;
    if (tabValue === 2) return n.type === 'flag';
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
          borderBottom: '1px solid #2f3336',
          zIndex: 100,
          px: 2,
          py: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#e7e9ea' }}>
              Notifications
            </Typography>
            <Typography sx={{ fontSize: '0.8125rem', color: '#71767b' }}>
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
            </Typography>
          </Box>
          {unreadCount > 0 && (
            <Button
              startIcon={<DoneAllIcon />}
              onClick={handleMarkAllRead}
              sx={{
                color: '#1d9bf0',
                textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(29, 155, 240, 0.1)' },
              }}
            >
              Mark all read
            </Button>
          )}
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
        <Tab label={`Unread (${unreadCount})`} />
        <Tab label="Flags" />
      </Tabs>

      {/* Notifications List */}
      {filteredNotifications.map((notification) => (
        <Box
          key={notification.id}
          onClick={() => handleMarkRead(notification.id)}
          sx={{
            display: 'flex',
            gap: 1.5,
            p: 2,
            borderBottom: '1px solid #2f3336',
            bgcolor: notification.isRead ? 'transparent' : 'rgba(29, 155, 240, 0.05)',
            cursor: 'pointer',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.03)' },
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              bgcolor: '#16181c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {getNotificationIcon(notification.type)}
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
              <Typography
                sx={{
                  fontWeight: notification.isRead ? 400 : 700,
                  fontSize: '0.938rem',
                  color: '#e7e9ea',
                }}
              >
                {notification.title}
              </Typography>
              {!notification.isRead && (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: '#1d9bf0',
                  }}
                />
              )}
            </Box>
            <Typography
              sx={{
                fontSize: '0.875rem',
                color: '#71767b',
                mb: 0.5,
              }}
            >
              {notification.message}
            </Typography>
            <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
              {notification.time}
            </Typography>
          </Box>

          {/* More */}
          <IconButton size="small" sx={{ color: '#71767b', alignSelf: 'flex-start' }}>
            <MoreHorizIcon />
          </IconButton>
        </Box>
      ))}

      {filteredNotifications.length === 0 && (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <CheckCircleIcon sx={{ fontSize: 48, color: '#4CAF50', mb: 2 }} />
          <Typography sx={{ color: '#e7e9ea', fontWeight: 600 }}>
            No notifications
          </Typography>
          <Typography sx={{ color: '#71767b', fontSize: '0.875rem' }}>
            You're all caught up!
          </Typography>
        </Box>
      )}
    </Box>
  );
}
