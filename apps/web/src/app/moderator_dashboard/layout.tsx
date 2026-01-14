'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CampaignIcon from '@mui/icons-material/Campaign';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HistoryIcon from '@mui/icons-material/History';
import ShieldIcon from '@mui/icons-material/Shield';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const navigationItems = [
  { 
    label: 'Home', 
    path: '/moderator_dashboard', 
    icon: HomeOutlinedIcon, 
    activeIcon: HomeIcon 
  },
  { 
    label: 'Announcements', 
    path: '/moderator_dashboard/announcements', 
    icon: CampaignOutlinedIcon, 
    activeIcon: CampaignIcon 
  },
  { 
    label: 'Concerns', 
    path: '/moderator_dashboard/concerns', 
    icon: ReportProblemOutlinedIcon, 
    activeIcon: ReportProblemIcon,
    badge: 8,
  },
  { 
    label: 'Suggestions', 
    path: '/moderator_dashboard/suggestions', 
    icon: LightbulbOutlinedIcon, 
    activeIcon: LightbulbIcon,
    badge: 3,
  },
  { 
    label: 'Flagged Content', 
    path: '/moderator_dashboard/flagged', 
    icon: FlagOutlinedIcon, 
    activeIcon: FlagIcon,
    badge: 5,
  },
  { 
    label: 'Notifications', 
    path: '/moderator_dashboard/notifications', 
    icon: NotificationsOutlinedIcon, 
    activeIcon: NotificationsIcon,
    badge: 4,
  },
  { 
    label: 'Settings', 
    path: '/moderator_dashboard/settings', 
    icon: SettingsOutlinedIcon, 
    activeIcon: SettingsIcon 
  },
];

export default function ModeratorDashboardLayout({
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
    if (path === '/moderator_dashboard') {
      return pathname === '/moderator_dashboard';
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
          maxWidth: 3840,
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
            onClick={() => router.push('/moderator_dashboard')}
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

          {/* Moderator Badge */}
          <Box sx={{ px: 1.5, mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: 'rgba(29, 155, 240, 0.15)',
                borderRadius: 2,
                px: 1.5,
                py: 0.75,
              }}
            >
              <ShieldIcon sx={{ color: '#1d9bf0', fontSize: 18 }} />
              <Typography
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: '#1d9bf0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                Moderator Panel
              </Typography>
            </Box>
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
                      {item.badge ? (
                        <Badge
                          badgeContent={item.badge}
                          color="error"
                          sx={{
                            '& .MuiBadge-badge': {
                              bgcolor: '#1d9bf0',
                              color: '#fff',
                              fontSize: '0.65rem',
                              minWidth: 16,
                              height: 16,
                            },
                          }}
                        >
                          <IconComponent
                            sx={{
                              fontSize: 26,
                              color: active ? '#e7e9ea' : '#e7e9ea',
                            }}
                          />
                        </Badge>
                      ) : (
                        <IconComponent
                          sx={{
                            fontSize: 26,
                            color: active ? '#e7e9ea' : '#e7e9ea',
                          }}
                        />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        sx: {
                          fontSize: '1.188rem',
                          fontWeight: active ? 700 : 400,
                          color: '#e7e9ea',
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}

            {/* More Menu */}
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
                  <MoreHorizIcon
                    sx={{
                      fontSize: 26,
                      color: '#e7e9ea',
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary="More"
                  primaryTypographyProps={{
                    sx: {
                      fontSize: '1.188rem',
                      fontWeight: 400,
                      color: '#e7e9ea',
                    },
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
                bgcolor: '#228B22',
                fontSize: '1rem',
                fontWeight: 600,
              }}
            >
              M
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
                Moderator User
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
                @moderator
              </Typography>
            </Box>
            <MoreHorizIcon sx={{ color: '#e7e9ea' }} />
          </Box>

          {/* Account Menu */}
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
                minWidth: 250,
                boxShadow: '0 0 15px rgba(255,255,255,0.2)',
              },
            }}
          >
            <MenuItem
              onClick={() => {
                handleMenuClose();
                handleLogout();
              }}
              sx={{
                py: 1.5,
                '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
              }}
            >
              <ListItemIcon>
                <LogoutIcon sx={{ color: '#F4212E' }} />
              </ListItemIcon>
              <Typography sx={{ color: '#F4212E' }}>Log out @moderator</Typography>
            </MenuItem>
          </Menu>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            minHeight: '100vh',
            minWidth: 0,
            pt: 3,
          }}
        >
          {children}
        </Box>
      </Box>

      {/* More Menu - Outside container for proper positioning */}
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
            minWidth: 250,
            boxShadow: '0 0 15px rgba(255,255,255,0.2)',
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleMoreMenuClose();
            router.push('/moderator_dashboard/activity');
          }}
          sx={{
            py: 1.5,
            '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
          }}
        >
          <ListItemIcon>
            <HistoryIcon sx={{ color: '#e7e9ea' }} />
          </ListItemIcon>
          <Typography sx={{ color: '#e7e9ea' }}>My Activity</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMoreMenuClose();
            router.push('/moderator_dashboard/guidelines');
          }}
          sx={{
            py: 1.5,
            '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
          }}
        >
          <ListItemIcon>
            <HelpOutlineIcon sx={{ color: '#e7e9ea' }} />
          </ListItemIcon>
          <Typography sx={{ color: '#e7e9ea' }}>Moderation Guidelines</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
