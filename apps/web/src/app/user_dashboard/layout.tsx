'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreIcon from '@mui/icons-material/Explore';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MailIcon from '@mui/icons-material/Mail';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CampaignIcon from '@mui/icons-material/Campaign';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const navigationItems = [
  { 
    label: 'Home', 
    path: '/user_dashboard', 
    icon: HomeOutlinedIcon, 
    activeIcon: HomeIcon 
  },
  { 
    label: 'Announcements', 
    path: '/user_dashboard/announcements', 
    icon: CampaignOutlinedIcon, 
    activeIcon: CampaignIcon 
  },
  { 
    label: 'Concerns', 
    path: '/user_dashboard/concerns', 
    icon: ReportProblemOutlinedIcon, 
    activeIcon: ReportProblemIcon 
  },
  { 
    label: 'Suggestions', 
    path: '/user_dashboard/suggestions', 
    icon: LightbulbOutlinedIcon, 
    activeIcon: LightbulbIcon 
  },
  { 
    label: 'Notifications', 
    path: '/user_dashboard/notifications', 
    icon: NotificationsOutlinedIcon, 
    activeIcon: NotificationsIcon,
    badge: 3,
  },
  { 
    label: 'Profile', 
    path: '/user_dashboard/profile', 
    icon: PersonOutlineIcon, 
    activeIcon: PersonIcon 
  },
];

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMoreMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreMenuClose = () => {
    setMoreAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('mockUser');
    router.push('/login');
  };

  const isActive = (path: string) => {
    if (path === '/user_dashboard') {
      return pathname === '/user_dashboard';
    }
    return pathname.startsWith(path);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        bgcolor: '#000',
        color: '#e7e9ea',
      }}
    >
      {/* Centered Container */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1920,
          mx: 'auto',
          display: 'flex',
        }}
      >
        {/* Left Sidebar - Navigation */}
        <Box
          sx={{
            width: 275,
            flexShrink: 0,
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            borderRight: '1px solid #2f3336',
            px: 1,
          }}
        >
        {/* Logo */}
        <Box
          onClick={() => router.push('/user_dashboard')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            pl: 1,
            pr: 1.5,
            pt: 3,
            pb: 1.5,
            mb: 1,
            cursor: 'pointer',
            borderRadius: 7.5,
            '&:hover': {
              bgcolor: 'rgba(123, 17, 19, 0.1)',
            },
          }}
        >
          <Box
            component="img"
            src="/images/logo.jpg"
            alt="Barangay U.P. Campus"
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '1rem',
              color: '#e7e9ea',
              whiteSpace: 'nowrap',
            }}
          >
            Barangay U.P. Campus
          </Typography>
        </Box>

        {/* Navigation */}
        <List sx={{ flex: 1, py: 0 }}>
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            const IconComponent = active ? item.activeIcon : item.icon;

            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  onClick={() => router.push(item.path)}
                  sx={{
                    borderRadius: 7.5,
                    py: 1.5,
                    px: 1.5,
                    '&:hover': {
                      bgcolor: 'rgba(231, 233, 234, 0.1)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <IconComponent
                      sx={{
                        fontSize: 26,
                        color: '#e7e9ea',
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '1.25rem',
                      fontWeight: active ? 700 : 400,
                      color: '#e7e9ea',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}

          {/* More */}
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              onClick={handleMoreMenuOpen}
              sx={{
                borderRadius: 7.5,
                py: 1.5,
                px: 1.5,
                '&:hover': {
                  bgcolor: 'rgba(231, 233, 234, 0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                <MoreHorizIcon sx={{ fontSize: 26, color: '#e7e9ea' }} />
              </ListItemIcon>
              <ListItemText
                primary="More"
                primaryTypographyProps={{
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  color: '#e7e9ea',
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>

        {/* User Profile */}
        <Box
          onClick={handleMenuOpen}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            p: 1.5,
            mb: 1.5,
            borderRadius: 7.5,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'rgba(231, 233, 234, 0.1)',
            },
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: '#7B1113',
              fontSize: '1rem',
              fontWeight: 600,
            }}
          >
            R
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '0.9375rem',
                color: '#e7e9ea',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              Resident User
            </Typography>
            <Typography
              sx={{
                fontSize: '0.9375rem',
                color: '#71767b',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              @resident
            </Typography>
          </Box>
          <MoreHorizIcon sx={{ color: '#e7e9ea' }} />
        </Box>

        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          PaperProps={{
            sx: {
              bgcolor: '#000',
              border: '1px solid #2f3336',
              borderRadius: 3,
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)',
              minWidth: 250,
            },
          }}
        >
          <MenuItem
            onClick={handleLogout}
            sx={{
              color: '#e7e9ea',
              py: 1.5,
              '&:hover': {
                bgcolor: 'rgba(231, 233, 234, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <LogoutIcon sx={{ color: '#e7e9ea' }} />
            </ListItemIcon>
            Log out @resident
          </MenuItem>
        </Menu>

        {/* More Menu */}
        <Menu
          anchorEl={moreAnchorEl}
          open={Boolean(moreAnchorEl)}
          onClose={handleMoreMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              bgcolor: '#000',
              border: '1px solid #2f3336',
              borderRadius: 3,
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)',
              minWidth: 250,
            },
          }}
        >
          <MenuItem
            onClick={handleMoreMenuClose}
            sx={{
              color: '#e7e9ea',
              py: 1.5,
              '&:hover': {
                bgcolor: 'rgba(231, 233, 234, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <BugReportOutlinedIcon sx={{ color: '#e7e9ea' }} />
            </ListItemIcon>
            Bug Reports
          </MenuItem>
          <MenuItem
            onClick={handleMoreMenuClose}
            sx={{
              color: '#e7e9ea',
              py: 1.5,
              '&:hover': {
                bgcolor: 'rgba(231, 233, 234, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <FeedbackOutlinedIcon sx={{ color: '#e7e9ea' }} />
            </ListItemIcon>
            Feedback
          </MenuItem>
          <MenuItem
            onClick={handleMoreMenuClose}
            sx={{
              color: '#e7e9ea',
              py: 1.5,
              '&:hover': {
                bgcolor: 'rgba(231, 233, 234, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <AutoAwesomeOutlinedIcon sx={{ color: '#e7e9ea' }} />
            </ListItemIcon>
            Feature Request
          </MenuItem>
          <MenuItem
            onClick={handleMoreMenuClose}
            sx={{
              color: '#e7e9ea',
              py: 1.5,
              '&:hover': {
                bgcolor: 'rgba(231, 233, 234, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <HelpOutlineIcon sx={{ color: '#e7e9ea' }} />
            </ListItemIcon>
            How To
          </MenuItem>
          <Divider sx={{ borderColor: '#2f3336' }} />
          <MenuItem
            onClick={handleMoreMenuClose}
            sx={{
              color: '#e7e9ea',
              py: 1.5,
              '&:hover': {
                bgcolor: 'rgba(231, 233, 234, 0.1)',
              },
            }}
          >
            <ListItemIcon>
              <SettingsIcon sx={{ color: '#e7e9ea' }} />
            </ListItemIcon>
            Settings
          </MenuItem>
        </Menu>
      </Box>

        {/* Main Content */}
        <Box sx={{ flex: 1, minWidth: 0, borderRight: '1px solid #2f3336', ml: 4, pt: 3 }}>
          {children}
        </Box>

        {/* ==================== RIGHT SIDEBAR - Info Cards ==================== */}
        <Box
          sx={{
            width: 350,
            flexShrink: 0,
            display: { xs: 'none', lg: 'block' },
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflowY: 'auto',
            p: 2,
            pt: 3,
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: '#2f3336',
              borderRadius: '4px',
            },
          }}
        >
          {/* Search */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: '#202327',
              borderRadius: 5,
              px: 2,
              py: 1,
              mb: 2,
            }}
          >
            <Box
              component="svg"
              viewBox="0 0 24 24"
              sx={{ width: 20, height: 20, fill: '#71767b', mr: 1 }}
            >
              <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" />
            </Box>
            <Box
              component="input"
              placeholder="Search"
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

          {/* ===== PAGE-SPECIFIC SIDEBAR CONTENT ===== */}
          
          {/* HOME PAGE - Default sidebar */}
          {pathname === '/user_dashboard' && (
            <>
              {/* Latest Announcement Card */}
              <Box
                sx={{
                  bgcolor: '#16181c',
                  borderRadius: 3,
                  mb: 2,
                  overflow: 'hidden',
                  border: '1px solid #2f3336',
                }}
              >
                <Box sx={{ p: 2, pb: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
                    Latest Announcement
                  </Typography>
                </Box>
                {[
                  { title: 'Community Christmas Party Announcement', time: '18 hours ago', category: 'Community' },
                  { title: 'Road Repair Schedule Released', time: '1 hour ago', category: 'Infrastructure' },
                  { title: 'Water Service Update for Area 3', time: '5 hours ago', category: 'Utilities' },
                ].map((news, index) => (
                  <Box
                    key={index}
                    sx={{
                      px: 2,
                      py: 1.5,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'rgba(231, 233, 234, 0.03)',
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: '0.8125rem', color: '#71767b' }}>
                      {news.category} · {news.time}
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', color: '#e7e9ea' }}>
                      {news.title}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* What's Happening Card */}
              <Box
                sx={{
                  bgcolor: '#16181c',
                  borderRadius: 3,
                  mb: 2,
                  overflow: 'hidden',
                  border: '1px solid #2f3336',
                }}
              >
                <Box sx={{ p: 2, pb: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
                    What&apos;s happening
                  </Typography>
                </Box>
                {[
                  { category: 'Trending in U.P. Campus', topic: 'Christmas Party', posts: '2,779 posts' },
                  { category: 'Trending in U.P. Campus', topic: 'Road Closure', posts: '1,234 posts' },
                  { category: 'Trending in U.P. Campus', topic: 'Area 3 Water', posts: '856 posts' },
                  { category: 'Community', topic: 'Barangay Clearance', posts: '445 posts' },
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      px: 2,
                      py: 1.5,
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'rgba(231, 233, 234, 0.03)',
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: '0.8125rem', color: '#71767b' }}>
                      {item.category}
                    </Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.9375rem', color: '#e7e9ea' }}>
                      {item.topic}
                    </Typography>
                    <Typography sx={{ fontSize: '0.8125rem', color: '#71767b' }}>
                      {item.posts}
                    </Typography>
                  </Box>
                ))}
                <Box
                  sx={{
                    px: 2,
                    py: 1.5,
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'rgba(231, 233, 234, 0.03)',
                    },
                  }}
                >
                  <Typography sx={{ color: '#7B1113', fontSize: '0.9375rem' }}>
                    Show more
                  </Typography>
                </Box>
              </Box>

              {/* Latest Concerns Card */}
              <Box
                sx={{
                  bgcolor: '#16181c',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid #2f3336',
                }}
              >
                <Box sx={{ p: 2, pb: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
                    Latest Concerns
                  </Typography>
                </Box>
                {[
                  { id: 1, title: 'Streetlight not working on Area 5', author: 'Maria Santos', status: 'open', time: '2 hours ago', category: 'Infrastructure' },
                  { id: 2, title: 'Noise complaint from construction site', author: 'Juan Dela Cruz', status: 'in_progress', time: '5 hours ago', category: 'Environment' },
                  { id: 3, title: 'Request for speed bump installation', author: 'Pedro Reyes', status: 'open', time: '1 day ago', category: 'Safety' },
                ].map((concern) => (
                  <Box
                    key={concern.id}
                    sx={{
                      px: 2,
                      py: 1.5,
                      cursor: 'pointer',
                      borderTop: '1px solid #2f3336',
                      '&:hover': {
                        bgcolor: 'rgba(231, 233, 234, 0.03)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                        {concern.category}
                      </Typography>
                      <Box
                        sx={{
                          px: 1,
                          py: 0.25,
                          borderRadius: 1,
                          bgcolor: concern.status === 'open' ? 'rgba(255, 193, 7, 0.2)' : 'rgba(33, 150, 243, 0.2)',
                          color: concern.status === 'open' ? '#ffc107' : '#2196f3',
                          fontSize: '0.6875rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                        }}
                      >
                        {concern.status === 'open' ? 'Open' : 'In Progress'}
                      </Box>
                    </Box>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        color: '#e7e9ea',
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {concern.title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#71767b' }}>
                      by {concern.author} · {concern.time}
                    </Typography>
                  </Box>
                ))}
                <Box
                  onClick={() => router.push('/user_dashboard/concerns')}
                  sx={{
                    px: 2,
                    py: 1.5,
                    cursor: 'pointer',
                    borderTop: '1px solid #2f3336',
                    '&:hover': {
                      bgcolor: 'rgba(231, 233, 234, 0.03)',
                    },
                  }}
                >
                  <Typography sx={{ color: '#7B1113', fontSize: '0.9375rem' }}>
                    View all concerns
                  </Typography>
                </Box>
              </Box>
            </>
          )}

          {/* ANNOUNCEMENTS PAGE - Categories sidebar */}
          {pathname === '/user_dashboard/announcements' && (
            <Box
              sx={{
                bgcolor: '#16181c',
                borderRadius: 3,
                overflow: 'hidden',
                border: '1px solid #2f3336',
              }}
            >
              <Box sx={{ p: 2, pb: 1 }}>
                <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
                  Categories
                </Typography>
              </Box>
              {[
                { name: 'All Announcements', count: 24 },
                { name: 'Community Events', count: 8 },
                { name: 'Infrastructure', count: 5 },
                { name: 'Health & Safety', count: 4 },
                { name: 'Government Services', count: 4 },
                { name: 'Utilities', count: 3 },
              ].map((category, index) => (
                <Box
                  key={index}
                  sx={{
                    px: 2,
                    py: 1.5,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:hover': {
                      bgcolor: 'rgba(231, 233, 234, 0.03)',
                    },
                  }}
                >
                  <Typography sx={{ fontSize: '0.9375rem', color: '#e7e9ea' }}>
                    {category.name}
                  </Typography>
                  <Typography sx={{ fontSize: '0.875rem', color: '#71767b' }}>
                    {category.count}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* CONCERNS PAGE - Statistics and Categories */}
          {pathname === '/user_dashboard/concerns' && (
            <>
              {/* Statistics Card */}
              <Box
                sx={{
                  bgcolor: '#16181c',
                  borderRadius: 3,
                  mb: 2,
                  overflow: 'hidden',
                  border: '1px solid #2f3336',
                }}
              >
                <Box sx={{ p: 2, pb: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
                    Statistics
                  </Typography>
                </Box>
                <Box sx={{ px: 2, pb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#71767b' }}>Total Concerns</Typography>
                    <Typography sx={{ fontSize: '0.875rem', color: '#e7e9ea', fontWeight: 600 }}>156</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#71767b' }}>Open</Typography>
                    <Typography sx={{ fontSize: '0.875rem', color: '#ffc107', fontWeight: 600 }}>42</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#71767b' }}>In Progress</Typography>
                    <Typography sx={{ fontSize: '0.875rem', color: '#2196f3', fontWeight: 600 }}>38</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: '#71767b' }}>Resolved</Typography>
                    <Typography sx={{ fontSize: '0.875rem', color: '#4caf50', fontWeight: 600 }}>76</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Categories Card */}
              <Box
                sx={{
                  bgcolor: '#16181c',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid #2f3336',
                }}
              >
                <Box sx={{ p: 2, pb: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
                    Categories
                  </Typography>
                </Box>
                {[
                  { name: 'Infrastructure', count: 45 },
                  { name: 'Safety & Security', count: 32 },
                  { name: 'Environment', count: 28 },
                  { name: 'Utilities', count: 24 },
                  { name: 'Noise', count: 18 },
                  { name: 'Others', count: 9 },
                ].map((category, index) => (
                  <Box
                    key={index}
                    sx={{
                      px: 2,
                      py: 1.5,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      '&:hover': {
                        bgcolor: 'rgba(231, 233, 234, 0.03)',
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: '0.9375rem', color: '#e7e9ea' }}>
                      {category.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.875rem', color: '#71767b' }}>
                      {category.count}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </>
          )}

          {/* SUGGESTIONS PAGE - Top Categories and Guidelines */}
          {pathname === '/user_dashboard/suggestions' && (
            <>
              {/* Top Categories Card */}
              <Box
                sx={{
                  bgcolor: '#16181c',
                  borderRadius: 3,
                  mb: 2,
                  overflow: 'hidden',
                  border: '1px solid #2f3336',
                }}
              >
                <Box sx={{ p: 2, pb: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
                    Top Categories
                  </Typography>
                </Box>
                {[
                  { name: 'Infrastructure', count: 89 },
                  { name: 'Community Programs', count: 67 },
                  { name: 'Environment', count: 45 },
                  { name: 'Safety', count: 34 },
                  { name: 'Technology', count: 23 },
                ].map((category, index) => (
                  <Box
                    key={index}
                    sx={{
                      px: 2,
                      py: 1.5,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      '&:hover': {
                        bgcolor: 'rgba(231, 233, 234, 0.03)',
                      },
                    }}
                  >
                    <Typography sx={{ fontSize: '0.9375rem', color: '#e7e9ea' }}>
                      {category.name}
                    </Typography>
                    <Typography sx={{ fontSize: '0.875rem', color: '#71767b' }}>
                      {category.count} ideas
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Guidelines Card */}
              <Box
                sx={{
                  bgcolor: '#16181c',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid #2f3336',
                }}
              >
                <Box sx={{ p: 2, pb: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
                    Suggestion Guidelines
                  </Typography>
                </Box>
                <Box sx={{ px: 2, pb: 2 }}>
                  {[
                    'Be specific and constructive',
                    'Check for duplicates first',
                    'Explain the benefit to the community',
                    'Keep it respectful and civil',
                  ].map((guideline, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#7B1113', mt: 0.75, flexShrink: 0 }} />
                      <Typography sx={{ fontSize: '0.875rem', color: '#71767b', lineHeight: 1.4 }}>
                        {guideline}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {/* NOTIFICATIONS PAGE - Preferences and Stats */}
          {pathname === '/user_dashboard/notifications' && (
            <>
              {/* Notification Preferences Card */}
              <Box
                sx={{
                  bgcolor: '#16181c',
                  borderRadius: 3,
                  mb: 2,
                  overflow: 'hidden',
                  border: '1px solid #2f3336',
                }}
              >
                <Box sx={{ p: 2, pb: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
                    Notification Preferences
                  </Typography>
                </Box>
                <Box sx={{ px: 2, pb: 2 }}>
                  <Typography sx={{ fontSize: '0.875rem', color: '#71767b', mb: 2, lineHeight: 1.5 }}>
                    Customize what notifications you receive.
                  </Typography>
                  {[
                    { label: 'Announcements', enabled: true },
                    { label: 'Concern Updates', enabled: true },
                    { label: 'Comments & Replies', enabled: true },
                    { label: 'Suggestion Votes', enabled: false },
                  ].map((pref, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 1,
                        borderBottom: index < 3 ? '1px solid #2f3336' : 'none',
                      }}
                    >
                      <Typography sx={{ fontSize: '0.875rem', color: '#e7e9ea' }}>
                        {pref.label}
                      </Typography>
                      <Box
                        sx={{
                          width: 36,
                          height: 20,
                          borderRadius: 10,
                          bgcolor: pref.enabled ? '#7B1113' : '#333',
                          position: 'relative',
                          cursor: 'pointer',
                        }}
                      >
                        <Box
                          sx={{
                            width: 16,
                            height: 16,
                            borderRadius: '50%',
                            bgcolor: '#fff',
                            position: 'absolute',
                            top: 2,
                            left: pref.enabled ? 18 : 2,
                            transition: 'left 0.2s',
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* This Week Stats Card */}
              <Box
                sx={{
                  bgcolor: '#16181c',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid #2f3336',
                }}
              >
                <Box sx={{ p: 2, pb: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
                    This Week
                  </Typography>
                </Box>
                <Box sx={{ px: 2, pb: 2 }}>
                  {[
                    { label: 'New Announcements', count: 3 },
                    { label: 'Concern Updates', count: 2 },
                    { label: 'New Likes', count: 12 },
                    { label: 'New Comments', count: 5 },
                  ].map((stat, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        py: 1,
                      }}
                    >
                      <Typography sx={{ fontSize: '0.875rem', color: '#71767b' }}>
                        {stat.label}
                      </Typography>
                      <Typography sx={{ fontSize: '0.875rem', color: '#e7e9ea', fontWeight: 600 }}>
                        {stat.count}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {/* PROFILE PAGE - Activity Summary and Account Info */}
          {pathname === '/user_dashboard/profile' && (
            <>
              {/* Activity Summary Card */}
              <Box
                sx={{
                  bgcolor: '#16181c',
                  borderRadius: 3,
                  mb: 2,
                  overflow: 'hidden',
                  border: '1px solid #2f3336',
                }}
              >
                <Box sx={{ p: 2, pb: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
                    Activity Summary
                  </Typography>
                </Box>
                <Box sx={{ px: 2, pb: 2 }}>
                  {[
                    { label: 'Posts created', value: 24, color: '#7B1113' },
                    { label: 'Concerns reported', value: 5, color: '#2196F3' },
                    { label: 'Suggestions made', value: 8, color: '#FF9800' },
                  ].map((stat, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        py: 1.5,
                        borderBottom: index < 2 ? '1px solid #2f3336' : 'none',
                      }}
                    >
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          borderRadius: '50%',
                          bgcolor: `${stat.color}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: stat.color }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: '0.875rem', color: '#71767b' }}>
                          {stat.label}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#e7e9ea' }}>
                        {stat.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Account Information Card */}
              <Box
                sx={{
                  bgcolor: '#16181c',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid #2f3336',
                }}
              >
                <Box sx={{ p: 2, pb: 1 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
                    Account Information
                  </Typography>
                </Box>
                <Box sx={{ px: 2, pb: 2 }}>
                  {[
                    { label: 'Member since', value: 'January 2023' },
                    { label: 'District', value: 'Area 2' },
                    { label: 'Account status', value: 'Verified Resident' },
                  ].map((info, index) => (
                    <Box
                      key={index}
                      sx={{
                        py: 1,
                        borderBottom: index < 2 ? '1px solid #2f3336' : 'none',
                      }}
                    >
                      <Typography sx={{ fontSize: '0.8125rem', color: '#71767b', mb: 0.25 }}>
                        {info.label}
                      </Typography>
                      <Typography sx={{ fontSize: '0.9375rem', color: '#e7e9ea' }}>
                        {info.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
