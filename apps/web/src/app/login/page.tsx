'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import Alert from '@mui/material/Alert';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from 'next/link';

// Mock users for testing
const MOCK_USERS = [
  { username: 'user', password: 'user', role: 'resident', redirect: '/user_dashboard' },
  { username: 'admin', password: 'admin', role: 'administrator', redirect: '/admin_dashboard' },
  { username: 'mod', password: 'mod', role: 'moderator', redirect: '/moderator_dashboard' },
];

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    // Check mock credentials
    const user = MOCK_USERS.find(
      (u) => u.username === formData.email && u.password === formData.password
    );
    
    if (user) {
      // Store mock session in localStorage
      localStorage.setItem('mockUser', JSON.stringify({
        username: user.username,
        role: user.role,
        name: user.username === 'user' ? 'Juan Dela Cruz' : user.username === 'admin' ? 'Admin User' : 'Moderator User',
      }));
      router.push(user.redirect);
    } else {
      setError('Invalid username or password. Try: user/user, admin/admin, or mod/mod');
    }
    
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Left Panel - Image Section */}
      <Box
        sx={{
          flex: { xs: 'none', md: '0 0 50%' },
          minHeight: { xs: '200px', md: '100vh' },
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: { xs: 3, md: 5, lg: 6 },
        }}
      >
        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/images/showcase/heritage1.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />

        {/* Dark Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(30, 58, 138, 0.75), rgba(0, 0, 0, 0.85))',
            zIndex: 1,
          }}
        />

        {/* Top - Logo & Title */}
        <Box sx={{ position: 'relative', zIndex: 2 }}>
          <Box
            component={Link}
            href="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
              '&:hover': {
                opacity: 0.85,
              },
            }}
          >
            <Box
              component="img"
              src="/images/logo.jpg"
              alt="Barangay U.P. Campus Logo"
              sx={{
                width: { xs: 36, md: 44 },
                height: { xs: 36, md: 44 },
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{ color: 'white', fontWeight: 600, fontSize: { xs: '0.9rem', md: '1rem' } }}
            >
              Barangay U.P. Campus
            </Typography>
          </Box>
        </Box>

        {/* Center Content - Hidden on mobile */}
        <Box sx={{ position: 'relative', zIndex: 2, display: { xs: 'none', md: 'block' } }}>
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontWeight: 700,
              fontSize: { md: '2.5rem', lg: '3rem', xl: '3.5rem' },
              lineHeight: 1.2,
              mb: 3,
            }}
          >
            Welcome back,
            <br />
            Ka-Barangay!
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.8,
              fontSize: { md: '1rem', lg: '1.1rem' },
              maxWidth: 450,
            }}
          >
            Access e-services, file reports, and stay updated with the latest community announcements. Your digital gateway to barangay services.
          </Typography>
        </Box>

        {/* Bottom - Copyright */}
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255,255,255,0.5)',
            position: 'relative',
            zIndex: 2,
            display: { xs: 'none', md: 'block' },
          }}
        >
          © 2025 Barangay U.P. Campus. All rights reserved.
        </Typography>
      </Box>

      {/* Right Panel - Login Form */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: { xs: 3, sm: 4, md: 5, lg: 6 },
          minHeight: { xs: 'auto', md: '100vh' },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}
          >
            Sign In
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', mb: 3 }}
          >
            Please enter your credentials to continue.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {/* Email Field */}
            <Box sx={{ mb: 2.5 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: 'text.secondary',
                  mb: 0.5,
                  display: 'block',
                }}
              >
                Username or Email
              </Typography>
              <TextField
                fullWidth
                name="email"
                placeholder="user"
                value={formData.email}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: 'grey.400', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#228B22',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#228B22',
                    },
                  },
                }}
              />
            </Box>

            {/* Password Field */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                <Typography
                  variant="caption"
                  sx={{ fontWeight: 600, color: 'text.secondary' }}
                >
                  Password
                </Typography>
                <Typography
                  component={Link}
                  href="/forgot-password"
                  variant="caption"
                  sx={{
                    color: '#228B22',
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Forgot Password?
                </Typography>
              </Box>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: 'grey.400', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon sx={{ fontSize: 20 }} />
                        ) : (
                          <VisibilityIcon sx={{ fontSize: 20 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: '#228B22',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#228B22',
                    },
                  },
                }}
              />
            </Box>

            {/* Login Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                fontSize: '1rem',
                backgroundColor: '#228B22',
                textTransform: 'none',
                mb: 3,
                '&:hover': {
                  backgroundColor: '#1e7b1e',
                },
              }}
            >
              {isLoading ? 'Signing in...' : 'Log In'}
            </Button>

            {/* Divider */}
            <Divider sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Or continue with
              </Typography>
            </Divider>

            {/* Social Login Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                }
                sx={{
                  py: 1.25,
                  borderRadius: 2,
                  borderColor: 'grey.300',
                  color: 'text.primary',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: 'grey.400',
                    backgroundColor: 'grey.50',
                  },
                }}
              >
                Google
              </Button>
              <Button
                variant="outlined"
                fullWidth
                startIcon={<FacebookIcon sx={{ color: '#1877F2' }} />}
                sx={{
                  py: 1.25,
                  borderRadius: 2,
                  borderColor: 'grey.300',
                  color: 'text.primary',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    borderColor: 'grey.400',
                    backgroundColor: 'grey.50',
                  },
                }}
              >
                Facebook
              </Button>
            </Box>

            {/* Register Link */}
            <Typography
              variant="body2"
              sx={{ textAlign: 'center', color: 'text.secondary' }}
            >
              Don&apos;t have an account?{' '}
              <Typography
                component={Link}
                href="/register"
                variant="body2"
                sx={{
                  color: '#228B22',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Register Resident
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
