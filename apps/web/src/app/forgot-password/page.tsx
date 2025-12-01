'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SendIcon from '@mui/icons-material/Send';
import SecurityIcon from '@mui/icons-material/Security';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual password reset
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
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
            Locked out?
            <br />
            No worries.
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
            Don&apos;t worry, it happens to the best of us. We&apos;ll help you get back into your account in no time.
          </Typography>
        </Box>

        {/* Bottom - Copyright and Remember Password */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: 'rgba(255,255,255,0.5)' }}
          >
            © 2025 Barangay U.P. Campus. All rights reserved.
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: 'rgba(255,255,255,0.7)' }}
          >
            Remember your password?{' '}
            <Typography
              component={Link}
              href="/login"
              variant="caption"
              sx={{
                color: '#228B22',
                textDecoration: 'none',
                fontWeight: 600,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Sign In
            </Typography>
          </Typography>
        </Box>
      </Box>

      {/* Right Panel - Form */}
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
          {!isSubmitted ? (
            <>
              {/* Header with Icon */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(34, 139, 34, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <KeyIcon sx={{ color: '#228B22', fontSize: 24 }} />
                </Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, color: '#1e293b' }}
                >
                  Forgot Password?
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', mb: 4, maxWidth: 350 }}
              >
                Enter the email address or mobile number associated with your account.
              </Typography>

              <Box component="form" onSubmit={handleSubmit}>
                {/* Email Field */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      color: 'text.secondary',
                      mb: 0.5,
                      display: 'block',
                    }}
                  >
                    Email or Mobile Number
                  </Typography>
                  <TextField
                    fullWidth
                    name="email"
                    placeholder="juan@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isLoading || !email}
                  endIcon={<SendIcon />}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    fontWeight: 600,
                    fontSize: '1rem',
                    backgroundColor: '#228B22',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#1a6b1a',
                    },
                    '&:disabled': {
                      backgroundColor: 'grey.300',
                    },
                  }}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </Box>

              {/* Help Text */}
              <Paper
                elevation={0}
                sx={{
                  mt: 4,
                  p: 2,
                  backgroundColor: 'grey.50',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.200',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    display: 'block',
                    textAlign: 'center',
                    lineHeight: 1.6,
                  }}
                >
                  If you no longer have access to your email or phone, please visit the Barangay Hall with a valid ID for manual account recovery.
                </Typography>
              </Paper>
            </>
          ) : (
            /* Success State */
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(34, 139, 34, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                }}
              >
                <EmailIcon sx={{ color: '#228B22', fontSize: 40 }} />
              </Box>

              <Typography
                variant="h5"
                sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}
              >
                Check Your Inbox
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', mb: 4, maxWidth: 320, mx: 'auto' }}
              >
                We&apos;ve sent a password reset link to <strong>{email}</strong>. Please check your email and follow the instructions.
              </Typography>

              <Button
                component={Link}
                href="/login"
                variant="outlined"
                sx={{
                  borderColor: '#228B22',
                  color: '#228B22',
                  borderRadius: 2,
                  px: 4,
                  py: 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: '#1a6b1a',
                    backgroundColor: 'rgba(34, 139, 34, 0.05)',
                  },
                }}
              >
                Return to Login
              </Button>

              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  mt: 3,
                  color: 'text.secondary',
                }}
              >
                Didn&apos;t receive the email?{' '}
                <Box
                  component="button"
                  onClick={() => setIsSubmitted(false)}
                  sx={{
                    color: '#228B22',
                    fontWeight: 600,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    p: 0,
                    fontSize: 'inherit',
                  }}
                >
                  Try again
                </Box>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
