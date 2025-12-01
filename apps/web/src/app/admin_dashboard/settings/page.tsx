'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SecurityIcon from '@mui/icons-material/Security';
import StorageIcon from '@mui/icons-material/Storage';
import PaletteIcon from '@mui/icons-material/Palette';
import EmailIcon from '@mui/icons-material/Email';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';
import RestoreIcon from '@mui/icons-material/Restore';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

// Mock settings data
const initialSettings = {
  general: {
    siteName: 'Barangay U.P. Campus',
    siteDescription: 'Community portal for Barangay U.P. Campus residents',
    contactEmail: 'info@barangayupcampus.gov.ph',
    contactPhone: '(02) 8981-XXXX',
    officeHours: 'Monday - Friday, 8:00 AM - 5:00 PM',
  },
  notifications: {
    emailNotifications: true,
    concernStatusUpdates: true,
    newAnnouncementAlerts: true,
    weeklyDigest: false,
    moderatorAlerts: true,
  },
  concerns: {
    autoAssignEnabled: false,
    maxImagesPerConcern: 3,
    maxFileSizeMB: 5,
    requireLocation: true,
    allowAnonymous: false,
    autoCloseAfterDays: 30,
  },
  security: {
    requireEmailVerification: true,
    sessionTimeoutMinutes: 60,
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    requireStrongPassword: true,
    twoFactorEnabled: false,
  },
  announcements: {
    autoExpireEnabled: true,
    defaultExpirationDays: 30,
    allowAttachments: true,
    maxAttachmentSizeMB: 10,
    requireApproval: false,
  },
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState(initialSettings);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (section: keyof typeof settings, field: string, value: string | number | boolean) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    // In a real app, this would save to the backend
    setUnsavedChanges(false);
    setSaveDialogOpen(false);
    setSnackbarMessage('Settings saved successfully');
    setSnackbarOpen(true);
  };

  const handleReset = () => {
    setSettings(initialSettings);
    setUnsavedChanges(false);
    setResetDialogOpen(false);
    setSnackbarMessage('Settings reset to defaults');
    setSnackbarOpen(true);
  };

  const SettingSection = ({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) => (
    <Card
      sx={{
        bgcolor: '#16181c',
        borderRadius: 3,
        border: '1px solid #2f3336',
        mb: 3,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          p: 2,
          borderBottom: '1px solid #2f3336',
          bgcolor: '#202327',
        }}
      >
        <Icon sx={{ color: '#7B1113', fontSize: 24 }} />
        <Typography sx={{ fontWeight: 700, fontSize: '1rem', color: '#e7e9ea' }}>
          {title}
        </Typography>
      </Box>
      <Box sx={{ p: 2 }}>{children}</Box>
    </Card>
  );

  const SettingRow = ({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        py: 1.5,
        borderBottom: '1px solid #2f3336',
        '&:last-child': { borderBottom: 'none' },
      }}
    >
      <Box sx={{ flex: 1, pr: 2 }}>
        <Typography sx={{ fontSize: '0.938rem', color: '#e7e9ea', fontWeight: 500 }}>
          {label}
        </Typography>
        {description && (
          <Typography sx={{ fontSize: '0.813rem', color: '#71767b', mt: 0.25 }}>
            {description}
          </Typography>
        )}
      </Box>
      <Box sx={{ flexShrink: 0 }}>{children}</Box>
    </Box>
  );

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
            <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', color: '#e7e9ea' }}>
              Settings
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<RestoreIcon />}
                onClick={() => setResetDialogOpen(true)}
                sx={{
                  borderColor: '#2f3336',
                  color: '#e7e9ea',
                  textTransform: 'none',
                  borderRadius: 5,
                  '&:hover': { borderColor: '#71767b', bgcolor: 'rgba(231, 233, 234, 0.1)' },
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={() => setSaveDialogOpen(true)}
                disabled={!unsavedChanges}
                sx={{
                  bgcolor: '#7B1113',
                  color: '#fff',
                  textTransform: 'none',
                  borderRadius: 5,
                  '&:hover': { bgcolor: '#9B1315' },
                  '&:disabled': { bgcolor: '#2f3336', color: '#71767b' },
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>

        {unsavedChanges && (
          <Alert
            severity="warning"
            sx={{
              borderRadius: 0,
              bgcolor: 'rgba(255, 152, 0, 0.1)',
              color: '#FF9800',
              '& .MuiAlert-icon': { color: '#FF9800' },
            }}
          >
            You have unsaved changes
          </Alert>
        )}
      </Box>

      <Box sx={{ p: 2 }}>
        {/* General Settings */}
        <SettingSection title="General Settings" icon={SettingsIcon}>
          <SettingRow label="Site Name" description="The name displayed across the platform">
            <TextField
              size="small"
              value={settings.general.siteName}
              onChange={(e) => handleChange('general', 'siteName', e.target.value)}
              sx={{
                width: 220,
                '& .MuiOutlinedInput-root': {
                  color: '#e7e9ea',
                  '& fieldset': { borderColor: '#2f3336' },
                  '&:hover fieldset': { borderColor: '#71767b' },
                },
              }}
            />
          </SettingRow>
          <SettingRow label="Contact Email" description="Primary contact email for the barangay">
            <TextField
              size="small"
              value={settings.general.contactEmail}
              onChange={(e) => handleChange('general', 'contactEmail', e.target.value)}
              sx={{
                width: 220,
                '& .MuiOutlinedInput-root': {
                  color: '#e7e9ea',
                  '& fieldset': { borderColor: '#2f3336' },
                  '&:hover fieldset': { borderColor: '#71767b' },
                },
              }}
            />
          </SettingRow>
          <SettingRow label="Contact Phone" description="Primary contact number">
            <TextField
              size="small"
              value={settings.general.contactPhone}
              onChange={(e) => handleChange('general', 'contactPhone', e.target.value)}
              sx={{
                width: 220,
                '& .MuiOutlinedInput-root': {
                  color: '#e7e9ea',
                  '& fieldset': { borderColor: '#2f3336' },
                  '&:hover fieldset': { borderColor: '#71767b' },
                },
              }}
            />
          </SettingRow>
          <SettingRow label="Office Hours" description="Operating hours displayed to users">
            <TextField
              size="small"
              value={settings.general.officeHours}
              onChange={(e) => handleChange('general', 'officeHours', e.target.value)}
              sx={{
                width: 220,
                '& .MuiOutlinedInput-root': {
                  color: '#e7e9ea',
                  '& fieldset': { borderColor: '#2f3336' },
                  '&:hover fieldset': { borderColor: '#71767b' },
                },
              }}
            />
          </SettingRow>
        </SettingSection>

        {/* Notification Settings */}
        <SettingSection title="Notification Settings" icon={NotificationsIcon}>
          <SettingRow label="Email Notifications" description="Send email notifications to users">
            <Switch
              checked={settings.notifications.emailNotifications}
              onChange={(e) => handleChange('notifications', 'emailNotifications', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#7B1113' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#7B1113' },
              }}
            />
          </SettingRow>
          <SettingRow label="Concern Status Updates" description="Notify users when their concern status changes">
            <Switch
              checked={settings.notifications.concernStatusUpdates}
              onChange={(e) => handleChange('notifications', 'concernStatusUpdates', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#7B1113' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#7B1113' },
              }}
            />
          </SettingRow>
          <SettingRow label="New Announcement Alerts" description="Notify users about new announcements">
            <Switch
              checked={settings.notifications.newAnnouncementAlerts}
              onChange={(e) => handleChange('notifications', 'newAnnouncementAlerts', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#7B1113' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#7B1113' },
              }}
            />
          </SettingRow>
          <SettingRow label="Weekly Digest" description="Send weekly summary emails to users">
            <Switch
              checked={settings.notifications.weeklyDigest}
              onChange={(e) => handleChange('notifications', 'weeklyDigest', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#7B1113' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#7B1113' },
              }}
            />
          </SettingRow>
          <SettingRow label="Moderator Alerts" description="Send alerts to moderators for new concerns">
            <Switch
              checked={settings.notifications.moderatorAlerts}
              onChange={(e) => handleChange('notifications', 'moderatorAlerts', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#7B1113' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#7B1113' },
              }}
            />
          </SettingRow>
        </SettingSection>

        {/* Concern Settings */}
        <SettingSection title="Concern Settings" icon={StorageIcon}>
          <SettingRow label="Auto-Assign Concerns" description="Automatically assign new concerns to available staff">
            <Switch
              checked={settings.concerns.autoAssignEnabled}
              onChange={(e) => handleChange('concerns', 'autoAssignEnabled', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#7B1113' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#7B1113' },
              }}
            />
          </SettingRow>
          <SettingRow label="Max Images per Concern" description="Maximum number of images allowed per submission">
            <TextField
              size="small"
              type="number"
              value={settings.concerns.maxImagesPerConcern}
              onChange={(e) => handleChange('concerns', 'maxImagesPerConcern', parseInt(e.target.value))}
              sx={{
                width: 100,
                '& .MuiOutlinedInput-root': {
                  color: '#e7e9ea',
                  '& fieldset': { borderColor: '#2f3336' },
                  '&:hover fieldset': { borderColor: '#71767b' },
                },
              }}
            />
          </SettingRow>
          <SettingRow label="Max File Size (MB)" description="Maximum size per uploaded file">
            <TextField
              size="small"
              type="number"
              value={settings.concerns.maxFileSizeMB}
              onChange={(e) => handleChange('concerns', 'maxFileSizeMB', parseInt(e.target.value))}
              sx={{
                width: 100,
                '& .MuiOutlinedInput-root': {
                  color: '#e7e9ea',
                  '& fieldset': { borderColor: '#2f3336' },
                  '&:hover fieldset': { borderColor: '#71767b' },
                },
              }}
            />
          </SettingRow>
          <SettingRow label="Require Location" description="Require users to provide location for concerns">
            <Switch
              checked={settings.concerns.requireLocation}
              onChange={(e) => handleChange('concerns', 'requireLocation', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#7B1113' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#7B1113' },
              }}
            />
          </SettingRow>
          <SettingRow label="Auto-Close After (Days)" description="Automatically close resolved concerns after this many days">
            <TextField
              size="small"
              type="number"
              value={settings.concerns.autoCloseAfterDays}
              onChange={(e) => handleChange('concerns', 'autoCloseAfterDays', parseInt(e.target.value))}
              sx={{
                width: 100,
                '& .MuiOutlinedInput-root': {
                  color: '#e7e9ea',
                  '& fieldset': { borderColor: '#2f3336' },
                  '&:hover fieldset': { borderColor: '#71767b' },
                },
              }}
            />
          </SettingRow>
        </SettingSection>

        {/* Security Settings */}
        <SettingSection title="Security Settings" icon={SecurityIcon}>
          <SettingRow label="Require Email Verification" description="Users must verify their email to access the platform">
            <Switch
              checked={settings.security.requireEmailVerification}
              onChange={(e) => handleChange('security', 'requireEmailVerification', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#7B1113' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#7B1113' },
              }}
            />
          </SettingRow>
          <SettingRow label="Session Timeout (Minutes)" description="Auto-logout after this period of inactivity">
            <TextField
              size="small"
              type="number"
              value={settings.security.sessionTimeoutMinutes}
              onChange={(e) => handleChange('security', 'sessionTimeoutMinutes', parseInt(e.target.value))}
              sx={{
                width: 100,
                '& .MuiOutlinedInput-root': {
                  color: '#e7e9ea',
                  '& fieldset': { borderColor: '#2f3336' },
                  '&:hover fieldset': { borderColor: '#71767b' },
                },
              }}
            />
          </SettingRow>
          <SettingRow label="Max Login Attempts" description="Lock account after this many failed attempts">
            <TextField
              size="small"
              type="number"
              value={settings.security.maxLoginAttempts}
              onChange={(e) => handleChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
              sx={{
                width: 100,
                '& .MuiOutlinedInput-root': {
                  color: '#e7e9ea',
                  '& fieldset': { borderColor: '#2f3336' },
                  '&:hover fieldset': { borderColor: '#71767b' },
                },
              }}
            />
          </SettingRow>
          <SettingRow label="Password Min Length" description="Minimum characters required for passwords">
            <TextField
              size="small"
              type="number"
              value={settings.security.passwordMinLength}
              onChange={(e) => handleChange('security', 'passwordMinLength', parseInt(e.target.value))}
              sx={{
                width: 100,
                '& .MuiOutlinedInput-root': {
                  color: '#e7e9ea',
                  '& fieldset': { borderColor: '#2f3336' },
                  '&:hover fieldset': { borderColor: '#71767b' },
                },
              }}
            />
          </SettingRow>
          <SettingRow label="Require Strong Password" description="Require uppercase, lowercase, and numbers">
            <Switch
              checked={settings.security.requireStrongPassword}
              onChange={(e) => handleChange('security', 'requireStrongPassword', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#7B1113' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#7B1113' },
              }}
            />
          </SettingRow>
          <SettingRow label="Two-Factor Authentication" description="Enable 2FA for admin accounts">
            <Switch
              checked={settings.security.twoFactorEnabled}
              onChange={(e) => handleChange('security', 'twoFactorEnabled', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#7B1113' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#7B1113' },
              }}
            />
          </SettingRow>
        </SettingSection>

        {/* Announcement Settings */}
        <SettingSection title="Announcement Settings" icon={EmailIcon}>
          <SettingRow label="Auto-Expire Announcements" description="Automatically expire announcements after a set period">
            <Switch
              checked={settings.announcements.autoExpireEnabled}
              onChange={(e) => handleChange('announcements', 'autoExpireEnabled', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#7B1113' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#7B1113' },
              }}
            />
          </SettingRow>
          <SettingRow label="Default Expiration (Days)" description="Default expiration period for announcements">
            <TextField
              size="small"
              type="number"
              value={settings.announcements.defaultExpirationDays}
              onChange={(e) => handleChange('announcements', 'defaultExpirationDays', parseInt(e.target.value))}
              sx={{
                width: 100,
                '& .MuiOutlinedInput-root': {
                  color: '#e7e9ea',
                  '& fieldset': { borderColor: '#2f3336' },
                  '&:hover fieldset': { borderColor: '#71767b' },
                },
              }}
            />
          </SettingRow>
          <SettingRow label="Allow Attachments" description="Allow file attachments in announcements">
            <Switch
              checked={settings.announcements.allowAttachments}
              onChange={(e) => handleChange('announcements', 'allowAttachments', e.target.checked)}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: '#7B1113' },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: '#7B1113' },
              }}
            />
          </SettingRow>
          <SettingRow label="Max Attachment Size (MB)" description="Maximum size per attachment">
            <TextField
              size="small"
              type="number"
              value={settings.announcements.maxAttachmentSizeMB}
              onChange={(e) => handleChange('announcements', 'maxAttachmentSizeMB', parseInt(e.target.value))}
              sx={{
                width: 100,
                '& .MuiOutlinedInput-root': {
                  color: '#e7e9ea',
                  '& fieldset': { borderColor: '#2f3336' },
                  '&:hover fieldset': { borderColor: '#71767b' },
                },
              }}
            />
          </SettingRow>
        </SettingSection>
      </Box>

      {/* Save Confirmation Dialog */}
      <Dialog
        open={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
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
          Save Settings?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#71767b', fontSize: '0.938rem' }}>
            Are you sure you want to save these settings? Changes will take effect immediately.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setSaveDialogOpen(false)}
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
            onClick={handleSave}
            variant="contained"
            sx={{
              bgcolor: '#7B1113',
              color: '#fff',
              textTransform: 'none',
              borderRadius: 5,
              '&:hover': { bgcolor: '#9B1315' },
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Reset Confirmation Dialog */}
      <Dialog
        open={resetDialogOpen}
        onClose={() => setResetDialogOpen(false)}
        PaperProps={{
          sx: {
            bgcolor: '#000',
            border: '1px solid #2f3336',
            borderRadius: 3,
            maxWidth: 400,
          },
        }}
      >
        <DialogTitle sx={{ color: '#e7e9ea', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningAmberIcon sx={{ color: '#FF9800' }} />
          Reset Settings?
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ color: '#71767b', fontSize: '0.938rem' }}>
            This will reset all settings to their default values. This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button
            onClick={() => setResetDialogOpen(false)}
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
            onClick={handleReset}
            variant="contained"
            sx={{
              bgcolor: '#FF9800',
              color: '#fff',
              textTransform: 'none',
              borderRadius: 5,
              '&:hover': { bgcolor: '#F57C00' },
            }}
          >
            Reset
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{
            bgcolor: '#16181c',
            color: '#4CAF50',
            border: '1px solid #4CAF50',
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
