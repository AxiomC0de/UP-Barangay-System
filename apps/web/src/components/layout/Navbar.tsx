'use client';

import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import FacebookIcon from '@mui/icons-material/Facebook';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

// Navigation links
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'News', href: '/announcements' },
  { label: 'FAQ', href: '/faq' },
];

interface NavbarProps {
  hideNavLinks?: boolean;
}

export default function Navbar({ hideNavLinks = false }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Check if link is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Top Info Bar */}
      <Box
        sx={{
          backgroundColor: '#228B22',
          position: 'relative',
          zIndex: 100,
        }}
      >
        {/* Maroon diagonal accent */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: { xs: '120px', sm: '180px', md: '250px' },
            height: '100%',
            backgroundColor: '#7B1113',
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)',
          }}
        />
        
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            px: { xs: 2, sm: 3, md: 4, lg: 5 },
            py: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'white',
              fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem' },
              textAlign: 'center',
            }}
          >
            Open Hours of Barangay U.P. Campus{' '}
            <Box component="span" sx={{ fontWeight: 700 }}>
              Mon - Fri: 8:00 am - 5:00 pm
            </Box>
          </Typography>
          
          {/* Right side: Facebook + Mobile Menu */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{
              position: 'absolute',
              right: { xs: 8, md: 20 },
            }}
          >
            <IconButton
              component="a"
              href="https://web.facebook.com/brgyupcampusqc"
              target="_blank"
              rel="noopener noreferrer"
              size="small"
              sx={{
                color: 'white',
                p: 0.5,
                '&:hover': {
                  color: '#4267B2',
                },
              }}
            >
              <FacebookIcon sx={{ fontSize: { xs: 18, md: 20 } }} />
            </IconButton>
            
            {/* Mobile menu button - only show when not scrolled */}
            <IconButton
              color="inherit"
              aria-label="open menu"
              size="small"
              onClick={handleDrawerToggle}
              sx={{
                display: { md: 'none' },
                p: 0.5,
              }}
            >
              <MenuIcon sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>
        </Box>
      </Box>

      {/* Initial Navigation Bar - Visible on hero section */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 36, md: 40 },
          left: 0,
          right: 0,
          zIndex: 99,
          opacity: scrolled ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
          pointerEvents: scrolled ? 'none' : 'auto',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 2,
              position: 'relative',
            }}
          >
            {/* Logo - Left */}
            {!hideNavLinks && (
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ zIndex: 1 }}>
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: 60, md: 75 },
                    height: { xs: 60, md: 75 },
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid rgba(255,255,255,0.3)',
                  }}
                >
                  <Image
                    src="/images/logo.jpg"
                    alt="Barangay U.P. Campus Logo"
                    fill
                    sizes="40px"
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
              </Stack>
            )}

            {/* Desktop Nav Links - Absolute Center */}
            {!hideNavLinks && (
              <Stack
                direction="row"
                spacing={0.5}
                alignItems="center"
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                {NAV_LINKS.map((link) => (
                <Button
                  key={link.label}
                  component={Link}
                  href={link.href}
                  sx={{
                    color: 'white',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    textTransform: 'none',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    },
                    '&::after': isActive(link.href) ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 4,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60%',
                      height: '3px',
                      backgroundColor: '#90EE90',
                      borderRadius: '2px',
                    } : {},
                  }}
                >
                  {link.label}
                </Button>
              ))}
              </Stack>
            )}

            {/* Get in Touch Button - Right */}
            {!hideNavLinks && (
              <Button
                component={Link}
                href="/contact"
                variant="outlined"
                endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.6)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  px: 2.5,
                  py: 1,
                  textTransform: 'none',
                  zIndex: 1,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  },
                }}
              >
                Get in Touch
              </Button>
            )}
          </Box>
        </Container>
      </Box>

      {/* Main Navigation Bar - Shows on scroll */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(34, 139, 34, 0.95)',
          backdropFilter: 'blur(10px)',
          transform: scrolled ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease-in-out',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.15)' : 'none',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 1.5,
              position: 'relative',
            }}
          >
            {/* Logo */}
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ zIndex: 1 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: 55,
                  height: 55,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2px solid rgba(255,255,255,0.2)',
                }}
              >
                <Image
                  src="/images/logo.jpg"
                  alt="Barangay U.P. Campus Logo"
                  fill
                  sizes="40px"
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  fontSize: { xs: '1rem', md: '1.125rem' },
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                Barangay U.P. Campus
              </Typography>
            </Stack>

            {/* Desktop Nav Links - Absolute Center */}
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{
                display: { xs: 'none', md: 'flex' },
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              {NAV_LINKS.map((link) => (
                <Button
                  key={link.label}
                  component={Link}
                  href={link.href}
                  sx={{
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    px: 2,
                    textTransform: 'none',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    },
                    '&::after': isActive(link.href) ? {
                      content: '""',
                      position: 'absolute',
                      bottom: 4,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '60%',
                      height: '3px',
                      backgroundColor: '#90EE90',
                      borderRadius: '2px',
                    } : {},
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Stack>

            {/* Get in Touch Button */}
            <Button
              component={Link}
              href="/contact"
              variant={isActive('/contact') ? 'contained' : 'outlined'}
              endIcon={<ArrowForwardIcon sx={{ fontSize: 18 }} />}
              sx={{
                display: { xs: 'none', md: 'flex' },
                color: 'white',
                borderColor: isActive('/contact') ? 'transparent' : 'rgba(255,255,255,0.5)',
                backgroundColor: isActive('/contact') ? 'rgba(255,255,255,0.2)' : 'transparent',
                fontSize: '0.875rem',
                fontWeight: 500,
                px: 2.5,
                py: 1,
                textTransform: 'none',
                zIndex: 1,
                '&:hover': {
                  borderColor: isActive('/contact') ? 'transparent' : 'white',
                  backgroundColor: isActive('/contact') ? 'rgba(255,255,255,0.25)' : 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Get in Touch
            </Button>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open menu"
              onClick={handleDrawerToggle}
              sx={{
                display: { md: 'none' },
                color: 'white',
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { md: 'none' },
          '& .MuiDrawer-paper': {
            width: '280px',
            backgroundColor: '#228B22',
            color: 'white',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1" fontWeight={700}>
              Barangay U.P. Campus
            </Typography>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

        <List sx={{ px: 1, py: 2 }}>
          {NAV_LINKS.map((link) => (
            <ListItemButton
              key={link.label}
              component={Link}
              href={link.href}
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                backgroundColor: isActive(link.href) ? 'rgba(255,255,255,0.15)' : 'transparent',
                borderLeft: isActive(link.href) ? '3px solid #90EE90' : '3px solid transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

        <Box sx={{ p: 2 }}>
          <Button
            component={Link}
            href="/contact"
            variant="outlined"
            fullWidth
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: 'white',
              borderColor: '#7B1113',
              borderWidth: 2,
              py: 1.5,
              fontWeight: 600,
              '&:hover': {
                borderColor: '#7B1113',
                borderWidth: 2,
                backgroundColor: '#7B1113',
              },
            }}
          >
            Get in Touch
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
