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
import Badge from '@mui/material/Badge';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CampaignIcon from '@mui/icons-material/Campaign';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import PeopleIcon from '@mui/icons-material/People';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import BarChartOutlinedIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CategoryIcon from '@mui/icons-material/Category';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import HistoryIcon from '@mui/icons-material/History';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LockResetIcon from '@mui/icons-material/LockReset';

const navigationItems = [
  { 
    label: 'Home', 
    path: '/admin_dashboard', 
    icon: HomeOutlinedIcon, 
    activeIcon: HomeIcon 
  },
  { 
    label: 'Overview', 
    path: '/admin_dashboard/overview', 
    icon: DashboardOutlinedIcon, 
    activeIcon: DashboardIcon 
  },
  { 
    label: 'Announcements', 
    path: '/admin_dashboard/announcements', 
    icon: CampaignOutlinedIcon, 
    activeIcon: CampaignIcon 
  },
  { 
    label: 'Concerns', 
    path: '/admin_dashboard/concerns', 
    icon: ReportProblemOutlinedIcon, 
    activeIcon: ReportProblemIcon,
    badge: 12,
  },
  { 
    label: 'Suggestions', 
    path: '/admin_dashboard/suggestions', 
    icon: LightbulbOutlinedIcon, 
    activeIcon: LightbulbIcon 
  },
  { 
    label: 'Users', 
    path: '/admin_dashboard/users', 
    icon: PeopleOutlinedIcon, 
    activeIcon: PeopleIcon 
  },
  { 
    label: 'Password Resets', 
    path: '/admin_dashboard/password-resets', 
    icon: LockResetIcon, 
    activeIcon: LockResetIcon,
    badge: 3,
  },
  { 
    label: 'Analytics', 
    path: '/admin_dashboard/analytics', 
    icon: BarChartOutlinedIcon, 
    activeIcon: BarChartIcon 
  },
  { 
    label: 'Activity Logs', 
    path: '/admin_dashboard/audit-logs', 
    icon: HistoryIcon, 
    activeIcon: HistoryIcon 
  },
  { 
    label: 'Notifications', 
    path: '/admin_dashboard/notifications', 
    icon: NotificationsOutlinedIcon, 
    activeIcon: NotificationsIcon,
    badge: 5,
  },
  { 
    label: 'Settings', 
    path: '/admin_dashboard/settings', 
    icon: SettingsOutlinedIcon, 
    activeIcon: SettingsIcon 
  },
];

export default function AdminDashboardLayout({
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
    if (path === '/admin_dashboard') {
      return pathname === '/admin_dashboard';
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
          pl: { lg: '37px' },
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
              onClick={() => router.push('/admin_dashboard')}
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

          {/* Admin Badge */}
          <Box sx={{ px: 1.5, mb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                bgcolor: 'rgba(123, 17, 19, 0.2)',
                borderRadius: 2,
                px: 1.5,
                py: 0.75,
              }}
            >
              <AdminPanelSettingsIcon sx={{ color: '#7B1113', fontSize: 20 }} />
              <Typography sx={{ color: '#7B1113', fontWeight: 600, fontSize: '0.875rem' }}>
                Admin Panel
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
                              bgcolor: '#7B1113',
                              color: '#fff',
                              fontSize: '0.7rem',
                              minWidth: 18,
                              height: 18,
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
                      sx={{
                        '& .MuiListItemText-primary': {
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
                  <MoreHorizIcon sx={{ fontSize: 26, color: '#e7e9ea' }} />
                </ListItemIcon>
                <ListItemText
                  primary="More"
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '1.188rem',
                      fontWeight: 400,
                      color: '#e7e9ea',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>

          {/* User Account */}
          <Box sx={{ p: 1.5, mt: 'auto' }}>
            <Box
              onClick={handleMenuOpen}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 1.5,
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
                  fontWeight: 700,
                }}
              >
                A
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.938rem',
                    color: '#e7e9ea',
                    lineHeight: 1.2,
                  }}
                >
                  Admin User
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    color: '#71767b',
                    lineHeight: 1.2,
                  }}
                >
                  @admin
                </Typography>
              </Box>
              <MoreHorizIcon sx={{ color: '#e7e9ea', fontSize: 18 }} />
            </Box>
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
              <Typography sx={{ color: '#F4212E' }}>Log out @admin</Typography>
            </MenuItem>
          </Menu>
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            minHeight: '100vh',
            borderRight: { lg: '1px solid #2f3336' },
            maxWidth: { xs: '100%', md: 900 },
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
            router.push('/admin_dashboard/categories');
          }}
          sx={{
            py: 1.5,
            '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
          }}
        >
          <ListItemIcon>
            <CategoryOutlinedIcon sx={{ color: '#e7e9ea' }} />
          </ListItemIcon>
          <Typography sx={{ color: '#e7e9ea' }}>Categories</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleMoreMenuClose();
            router.push('/admin_dashboard/audit-logs');
          }}
          sx={{
            py: 1.5,
            '&:hover': { bgcolor: 'rgba(231, 233, 234, 0.1)' },
          }}
        >
          <ListItemIcon>
            <HistoryIcon sx={{ color: '#e7e9ea' }} />
          </ListItemIcon>
          <Typography sx={{ color: '#e7e9ea' }}>Audit Logs</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
