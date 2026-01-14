'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SettingsIcon from '@mui/icons-material/Settings';
import CampaignIcon from '@mui/icons-material/Campaign';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import VerifiedIcon from '@mui/icons-material/Verified';

interface Notification {
  id: number;
  type: 'announcement' | 'concern_update' | 'suggestion_vote' | 'comment' | 'like' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actor?: {
    name: string;
    avatar?: string;
    isOfficial?: boolean;
  };
  link?: string;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: 'announcement',
    title: 'New Announcement',
    message: 'ROAD CLOSURE ADVISORY - Quirino Avenue will be closed for road repair from December 15-20, 2024.',
    time: '30m',
    isRead: false,
    actor: {
      name: 'Barangay U.P. Campus',
      isOfficial: true,
    },
  },
  {
    id: 2,
    type: 'concern_update',
    title: 'Concern Status Updated',
    message: 'Your concern "Streetlight not working - Area 2" has been marked as In Progress.',
    time: '2h',
    isRead: false,
    actor: {
      name: 'Barangay U.P. Campus',
      isOfficial: true,
    },
  },
  {
    id: 3,
    type: 'suggestion_vote',
    title: 'New Upvote',
    message: 'Maria Santos upvoted your suggestion "Community bulletin board app feature".',
    time: '3h',
    isRead: false,
    actor: {
      name: 'Maria Santos',
    },
  },
  {
    id: 4,
    type: 'comment',
    title: 'New Comment',
    message: 'Juan Dela Cruz commented on your concern: "I also experienced the same issue..."',
    time: '5h',
    isRead: true,
    actor: {
      name: 'Juan Dela Cruz',
    },
  },
  {
    id: 5,
    type: 'like',
    title: 'New Like',
    message: 'Ana Garcia and 5 others liked your post about the community cleanup.',
    time: '8h',
    isRead: true,
    actor: {
      name: 'Ana Garcia',
    },
  },
  {
    id: 6,
    type: 'announcement',
    title: 'New Announcement',
    message: '🎄 COMMUNITY CHRISTMAS PARTY - Join us on December 22, 2024 at 4:00 PM at the Barangay Hall.',
    time: '1d',
    isRead: true,
    actor: {
      name: 'Barangay U.P. Campus',
      isOfficial: true,
    },
  },
  {
    id: 7,
    type: 'concern_update',
    title: 'Concern Resolved',
    message: 'Your concern "Stray dogs in Area 5" has been resolved. Thank you for your report!',
    time: '1d',
    isRead: true,
    actor: {
      name: 'Barangay U.P. Campus',
      isOfficial: true,
    },
  },
  {
    id: 8,
    type: 'system',
    title: 'Welcome!',
    message: 'Welcome to Barangay U.P. Campus Portal. Complete your profile to get started.',
    time: '3d',
    isRead: true,
  },
  {
    id: 9,
    type: 'suggestion_vote',
    title: 'Suggestion Milestone',
    message: 'Your suggestion "Community garden project" reached 100 upvotes! 🎉',
    time: '4d',
    isRead: true,
  },
  {
    id: 10,
    type: 'comment',
    title: 'New Reply',
    message: 'Pedro Reyes replied to your comment: "That\'s a great idea! We should..."',
    time: '5d',
    isRead: true,
    actor: {
      name: 'Pedro Reyes',
    },
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'announcement':
      return { icon: CampaignIcon, color: '#7B1113', bg: 'rgba(123, 17, 19, 0.15)' };
    case 'concern_update':
      return { icon: ReportProblemIcon, color: '#2196F3', bg: 'rgba(33, 150, 243, 0.15)' };
    case 'suggestion_vote':
      return { icon: LightbulbIcon, color: '#FF9800', bg: 'rgba(255, 152, 0, 0.15)' };
    case 'comment':
      return { icon: ChatBubbleIcon, color: '#1d9bf0', bg: 'rgba(29, 155, 240, 0.15)' };
    case 'like':
      return { icon: FavoriteIcon, color: '#f91880', bg: 'rgba(249, 24, 128, 0.15)' };
    case 'system':
      return { icon: InfoIcon, color: '#71767b', bg: 'rgba(113, 118, 123, 0.15)' };
    default:
      return { icon: InfoIcon, color: '#71767b', bg: 'rgba(113, 118, 123, 0.15)' };
  }
};

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const markAsRead = (notificationId: number) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === 0) return true; // All
    if (activeTab === 1) return !notification.isRead; // Unread
    if (activeTab === 2) return notification.type === 'announcement'; // Announcements
    if (activeTab === 3) return notification.type === 'concern_update'; // Concerns
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(12px)',
          zIndex: 10,
          borderBottom: '1px solid #2f3336',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
          }}
        >
            <Typography
              variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#e7e9ea',
                  fontSize: '1.25rem',
                }}
              >
                Notifications
              </Typography>
            <IconButton
              sx={{
                color: '#e7e9ea',
                '&:hover': {
                  bgcolor: 'rgba(231, 233, 234, 0.1)',
                },
              }}
            >
              <SettingsIcon />
            </IconButton>
          </Box>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                color: '#71767b',
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                py: 1.5,
                minHeight: 48,
                '&.Mui-selected': {
                  color: '#e7e9ea',
                  fontWeight: 700,
                },
                '&:hover': {
                  bgcolor: 'rgba(231, 233, 234, 0.1)',
                },
              },
              '& .MuiTabs-indicator': {
                bgcolor: '#7B1113',
                height: 4,
                borderRadius: 2,
              },
            }}
          >
            <Tab label="All" />
            <Tab label={`Unread${unreadCount > 0 ? ` (${unreadCount})` : ''}`} />
            <Tab label="Announcements" />
            <Tab label="Concerns" />
          </Tabs>
        </Box>

        {/* Mark all as read */}
        {unreadCount > 0 && (
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderBottom: '1px solid #2f3336',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Typography
              onClick={markAllAsRead}
              sx={{
                color: '#7B1113',
                fontSize: '0.875rem',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Mark all as read
            </Typography>
          </Box>
        )}

        {/* Notifications List */}
        {filteredNotifications.map((notification) => {
          const iconConfig = getNotificationIcon(notification.type);
          const IconComponent = iconConfig.icon;

          return (
            <Box
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              sx={{
                display: 'flex',
                gap: 1.5,
                p: 2,
                borderBottom: '1px solid #2f3336',
                cursor: 'pointer',
                bgcolor: notification.isRead ? 'transparent' : 'rgba(29, 155, 240, 0.03)',
                transition: 'background-color 0.2s',
                '&:hover': {
                  bgcolor: 'rgba(231, 233, 234, 0.03)',
                },
              }}
            >
              {/* Icon or Avatar */}
              <Box sx={{ position: 'relative' }}>
                {notification.actor ? (
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: notification.actor.isOfficial ? '#7B1113' : '#1d9bf0',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    {notification.actor.name.charAt(0)}
                  </Avatar>
                ) : (
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: iconConfig.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconComponent sx={{ color: iconConfig.color, fontSize: 20 }} />
                  </Box>
                )}
                {/* Notification type indicator */}
                {notification.actor && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: -2,
                      right: -2,
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      bgcolor: iconConfig.bg,
                      border: '2px solid #000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <IconComponent sx={{ color: iconConfig.color, fontSize: 10 }} />
                  </Box>
                )}
              </Box>

              {/* Content */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.25 }}>
                  {notification.actor && (
                    <>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontSize: '0.9375rem',
                          color: '#e7e9ea',
                        }}
                      >
                        {notification.actor.name}
                      </Typography>
                      {notification.actor.isOfficial && (
                        <VerifiedIcon sx={{ fontSize: 16, color: '#7B1113' }} />
                      )}
                    </>
                  )}
                  <Typography sx={{ color: '#71767b', fontSize: '0.875rem' }}>
                    · {notification.time}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    fontSize: '0.9375rem',
                    color: '#e7e9ea',
                    lineHeight: 1.4,
                  }}
                >
                  {notification.message}
                </Typography>
              </Box>

              {/* Unread indicator */}
              {!notification.isRead && (
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
        })}

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography sx={{ color: '#e7e9ea', fontSize: '1.25rem', fontWeight: 700, mb: 1 }}>
              No notifications
            </Typography>
            <Typography sx={{ color: '#71767b', fontSize: '0.9375rem' }}>
              {activeTab === 1
                ? "You're all caught up! No unread notifications."
                : 'You have no notifications in this category.'}
            </Typography>
          </Box>
        )}
    </Box>
  );
}
