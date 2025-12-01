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
        bgcolor: '#000',
        color: '#e7e9ea',
      }}
    >
      {/* Centered Container */}
      <Box
        sx={{
          maxWidth: 1300,
          mx: 'auto',
          display: 'flex',
          pl: { lg: '37px' }, // Offset to center content (right sidebar 350px - left sidebar 275px = 75px / 2)
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
        <Box sx={{ pl: 1, pr: 1.5, py: 1.5, mb: 1 }}>
          <IconButton
            onClick={() => router.push('/user_dashboard')}
            sx={{
              color: '#e7e9ea',
              p: 0,
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
          </IconButton>
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

        {/* Post Button */}
        <Box sx={{ px: 1, mb: 2 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: '#7B1113',
              color: 'white',
              borderRadius: 7.5,
              py: 1.5,
              fontSize: '1.0625rem',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#5a0c0e',
              },
            }}
          >
            Post
          </Button>
        </Box>

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
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
