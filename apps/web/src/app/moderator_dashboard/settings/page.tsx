'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import SecurityIcon from '@mui/icons-material/Security';
import PersonIcon from '@mui/icons-material/Person';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import KeyIcon from '@mui/icons-material/Key';

export default function ModeratorSettingsPage() {
  const [notifications, setNotifications] = useState({
    newFlags: true,
    newConcerns: true,
    newSuggestions: true,
    statusUpdates: true,
    emailDigest: false,
  });
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

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
        <Typography sx={{ fontSize: '1.25rem', fontWeight: 700, color: '#e7e9ea' }}>
          Settings
        </Typography>
        <Typography sx={{ fontSize: '0.8125rem', color: '#71767b' }}>
          Manage your moderator preferences
        </Typography>
      </Box>

      {/* Profile Section */}
      <Box sx={{ p: 2, borderBottom: '1px solid #2f3336' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <PersonIcon sx={{ color: '#1d9bf0' }} />
          <Typography sx={{ fontWeight: 700, color: '#e7e9ea' }}>Profile</Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: '#1d9bf0',
              fontSize: '1.5rem',
              fontWeight: 700,
            }}
          >
            M
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 700, color: '#e7e9ea' }}>Moderator User</Typography>
            <Typography sx={{ color: '#71767b', fontSize: '0.875rem' }}>@moderator</Typography>
            <Typography sx={{ color: '#1d9bf0', fontSize: '0.75rem', mt: 0.5 }}>
              Moderator since November 2024
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Notifications Section */}
      <Box sx={{ p: 2, borderBottom: '1px solid #2f3336' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <NotificationsIcon sx={{ color: '#1d9bf0' }} />
          <Typography sx={{ fontWeight: 700, color: '#e7e9ea' }}>Notifications</Typography>
        </Box>

        {[
          { key: 'newFlags', label: 'New flagged content', desc: 'Get notified when content is flagged' },
          { key: 'newConcerns', label: 'New concerns', desc: 'Get notified when new concerns are submitted' },
          { key: 'newSuggestions', label: 'New suggestions', desc: 'Get notified when new suggestions are submitted' },
          { key: 'statusUpdates', label: 'Status updates', desc: 'Get notified when content status changes' },
        ].map((item) => (
          <Box
            key={item.key}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 1.5,
            }}
          >
            <Box>
              <Typography sx={{ color: '#e7e9ea', fontSize: '0.938rem' }}>
                {item.label}
              </Typography>
              <Typography sx={{ color: '#71767b', fontSize: '0.813rem' }}>
                {item.desc}
              </Typography>
            </Box>
            <Switch
              checked={notifications[item.key as keyof typeof notifications]}
              onChange={(e) =>
                setNotifications((prev) => ({ ...prev, [item.key]: e.target.checked }))
              }
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#1d9bf0',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  bgcolor: '#1d9bf0',
                },
              }}
            />
          </Box>
        ))}
      </Box>

      {/* Email Section */}
      <Box sx={{ p: 2, borderBottom: '1px solid #2f3336' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <EmailIcon sx={{ color: '#1d9bf0' }} />
          <Typography sx={{ fontWeight: 700, color: '#e7e9ea' }}>Email Preferences</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1.5,
          }}
        >
          <Box>
            <Typography sx={{ color: '#e7e9ea', fontSize: '0.938rem' }}>
              Daily email digest
            </Typography>
            <Typography sx={{ color: '#71767b', fontSize: '0.813rem' }}>
              Receive a daily summary of moderation activity
            </Typography>
          </Box>
          <Switch
            checked={notifications.emailDigest}
            onChange={(e) =>
              setNotifications((prev) => ({ ...prev, emailDigest: e.target.checked }))
            }
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#1d9bf0',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                bgcolor: '#1d9bf0',
              },
            }}
          />
        </Box>
      </Box>

      {/* Security Section */}
      <Box sx={{ p: 2, borderBottom: '1px solid #2f3336' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <SecurityIcon sx={{ color: '#1d9bf0' }} />
          <Typography sx={{ fontWeight: 700, color: '#e7e9ea' }}>Security</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1.5,
          }}
        >
          <Box>
            <Typography sx={{ color: '#e7e9ea', fontSize: '0.938rem' }}>
              Change password
            </Typography>
            <Typography sx={{ color: '#71767b', fontSize: '0.813rem' }}>
              Update your account password
            </Typography>
          </Box>
          <Button
            startIcon={<KeyIcon />}
            onClick={() => setPasswordDialogOpen(true)}
            sx={{
              color: '#1d9bf0',
              textTransform: 'none',
              '&:hover': { bgcolor: 'rgba(29, 155, 240, 0.1)' },
            }}
          >
            Change
          </Button>
        </Box>

        <Box sx={{ py: 1.5 }}>
          <Typography sx={{ color: '#e7e9ea', fontSize: '0.938rem', mb: 0.5 }}>
            Session info
          </Typography>
          <Typography sx={{ color: '#71767b', fontSize: '0.813rem' }}>
            Last login: December 1, 2025, 8:30 AM
          </Typography>
          <Typography sx={{ color: '#71767b', fontSize: '0.813rem' }}>
            IP: 192.168.1.***
          </Typography>
        </Box>
      </Box>

      {/* Appearance Section */}
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <DarkModeIcon sx={{ color: '#1d9bf0' }} />
          <Typography sx={{ fontWeight: 700, color: '#e7e9ea' }}>Appearance</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1.5,
          }}
        >
          <Box>
            <Typography sx={{ color: '#e7e9ea', fontSize: '0.938rem' }}>
              Dark mode
            </Typography>
            <Typography sx={{ color: '#71767b', fontSize: '0.813rem' }}>
              Currently using dark theme
            </Typography>
          </Box>
          <Switch
            checked={true}
            disabled
            sx={{
              '& .MuiSwitch-switchBase.Mui-checked': {
                color: '#1d9bf0',
              },
              '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                bgcolor: '#1d9bf0',
              },
            }}
          />
        </Box>
      </Box>

      {/* Change Password Dialog */}
      <Dialog
        open={passwordDialogOpen}
        onClose={() => setPasswordDialogOpen(false)}
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
          Change Password
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            fullWidth
            type="password"
            label="Current Password"
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: '#e7e9ea',
                '& fieldset': { borderColor: '#2f3336' },
                '&:hover fieldset': { borderColor: '#1d9bf0' },
                '&.Mui-focused fieldset': { borderColor: '#1d9bf0' },
              },
              '& .MuiInputLabel-root': { color: '#71767b' },
            }}
          />
          <TextField
            fullWidth
            type="password"
            label="New Password"
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: '#e7e9ea',
                '& fieldset': { borderColor: '#2f3336' },
                '&:hover fieldset': { borderColor: '#1d9bf0' },
                '&.Mui-focused fieldset': { borderColor: '#1d9bf0' },
              },
              '& .MuiInputLabel-root': { color: '#71767b' },
            }}
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm New Password"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#e7e9ea',
                '& fieldset': { borderColor: '#2f3336' },
                '&:hover fieldset': { borderColor: '#1d9bf0' },
                '&.Mui-focused fieldset': { borderColor: '#1d9bf0' },
              },
              '& .MuiInputLabel-root': { color: '#71767b' },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setPasswordDialogOpen(false)} sx={{ color: '#71767b' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: '#1d9bf0', '&:hover': { bgcolor: '#1a8cd8' } }}
          >
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
