'use client';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * Custom hook to get current breakpoint information
 * Usage: const { isMobile, isTablet, isDesktop } = useBreakpoint();
 */
export function useBreakpoint() {
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px - 900px
  const isDesktop = useMediaQuery(theme.breakpoints.up('md')); // > 900px
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up('lg')); // > 1200px
  
  // More specific checks
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md')); // < 900px
  const isTabletOrDesktop = useMediaQuery(theme.breakpoints.up('sm')); // >= 600px
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    isMobileOrTablet,
    isTabletOrDesktop,
  };
}

/**
 * Hook to check if we're on a touch device
 */
export function useTouchDevice() {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}
