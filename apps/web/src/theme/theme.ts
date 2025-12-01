'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Breakpoint values (in pixels)
// xs: 0-599 (mobile phones)
// sm: 600-899 (tablets portrait)
// md: 900-1199 (tablets landscape, small laptops)
// lg: 1200-1535 (desktops)
// xl: 1536+ (large desktops)

const baseTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#7B1113', // UP Maroon
      light: '#A23234',
      dark: '#570C0D',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#228B22', // Forest Green for community/nature
      light: '#4CAF50',
      dark: '#1B5E20',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: '#666666',
    },
    success: {
      main: '#2E7D32',
      light: '#4CAF50',
      dark: '#1B5E20',
    },
    warning: {
      main: '#ED6C02',
      light: '#FF9800',
      dark: '#E65100',
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
    },
    info: {
      main: '#0288D1',
      light: '#03A9F4',
      dark: '#01579B',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    // Responsive typography - will be enhanced by responsiveFontSizes
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  // Responsive spacing helper
  spacing: 8,
  components: {
    // Global baseline styles
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch', // Smooth scrolling on iOS
        },
        body: {
          overflowX: 'hidden', // Prevent horizontal scroll on mobile
        },
      },
    },
    // Container - responsive padding
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
      styleOverrides: {
        root: ({ theme }) => ({
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
          },
          [theme.breakpoints.up('md')]: {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
          },
        }),
      },
    },
    // Button - responsive sizing
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: theme.shape.borderRadius,
          // Mobile: larger touch targets
          padding: '12px 20px',
          fontSize: '0.9375rem',
          minHeight: '44px', // Apple's recommended touch target
          [theme.breakpoints.up('sm')]: {
            padding: '10px 20px',
            fontSize: '0.875rem',
          },
          [theme.breakpoints.up('md')]: {
            padding: '8px 20px',
            minHeight: 'auto',
          },
        }),
        sizeSmall: ({ theme }) => ({
          padding: '8px 16px',
          fontSize: '0.8125rem',
          minHeight: '36px',
          [theme.breakpoints.up('md')]: {
            padding: '6px 14px',
            minHeight: 'auto',
          },
        }),
        sizeLarge: ({ theme }) => ({
          padding: '14px 28px',
          fontSize: '1rem',
          [theme.breakpoints.up('md')]: {
            padding: '12px 24px',
          },
        }),
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    // Card - responsive padding and shadows
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          borderRadius: theme.shape.borderRadius,
          // Less shadow on mobile for performance
          [theme.breakpoints.down('sm')]: {
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.08)',
          },
        }),
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2),
          [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(2.5),
          },
          [theme.breakpoints.up('md')]: {
            padding: theme.spacing(3),
          },
          '&:last-child': {
            paddingBottom: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
              paddingBottom: theme.spacing(2.5),
            },
            [theme.breakpoints.up('md')]: {
              paddingBottom: theme.spacing(3),
            },
          },
        }),
      },
    },
    // Paper
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          [theme.breakpoints.down('sm')]: {
            borderRadius: theme.shape.borderRadius * 0.75,
          },
        }),
      },
    },
    // AppBar - responsive height
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: '56px',
          paddingLeft: theme.spacing(2),
          paddingRight: theme.spacing(2),
          [theme.breakpoints.up('sm')]: {
            minHeight: '64px',
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
          },
        }),
      },
    },
    // TextField - responsive sizing
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'medium',
        fullWidth: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          // Larger input on mobile for better touch
          '& .MuiInputBase-input': {
            padding: '14px 16px',
            fontSize: '1rem',
            [theme.breakpoints.up('md')]: {
              padding: '12px 14px',
              fontSize: '0.875rem',
            },
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.15)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgba(0, 0, 0, 0.3)',
          },
        }),
      },
    },
    // Dialog - responsive sizing
    MuiDialog: {
      styleOverrides: {
        paper: ({ theme }) => ({
          margin: theme.spacing(2),
          width: `calc(100% - ${theme.spacing(4)})`,
          maxWidth: '600px',
          borderRadius: theme.shape.borderRadius * 1.5,
          [theme.breakpoints.up('sm')]: {
            margin: theme.spacing(4),
            width: 'auto',
            minWidth: '400px',
          },
        }),
        paperFullScreen: {
          borderRadius: 0,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2, 2.5),
          fontSize: '1.125rem',
          fontWeight: 600,
          [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(2.5, 3),
            fontSize: '1.25rem',
          },
        }),
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2, 2.5),
          [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(2.5, 3),
          },
        }),
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2, 2.5),
          gap: theme.spacing(1),
          [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(2, 3, 2.5),
          },
          // Stack buttons on mobile
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column-reverse',
            '& > :not(:first-of-type)': {
              marginLeft: 0,
              marginBottom: theme.spacing(1),
              width: '100%',
            },
            '& > :first-of-type': {
              width: '100%',
            },
          },
        }),
      },
    },
    // Drawer - responsive width
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          width: '100%',
          maxWidth: '320px',
          [theme.breakpoints.up('sm')]: {
            maxWidth: '360px',
          },
        }),
      },
    },
    // Table - responsive
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(1.5),
          fontSize: '0.875rem',
          [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(2),
          },
        }),
        head: {
          fontWeight: 600,
        },
      },
    },
    // Chip - responsive
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontWeight: 500,
          height: '32px',
          [theme.breakpoints.down('sm')]: {
            height: '28px',
            fontSize: '0.75rem',
          },
        }),
        sizeSmall: {
          height: '24px',
        },
      },
    },
    // Tabs - responsive
    MuiTabs: {
      styleOverrides: {
        root: ({ theme }) => ({
          minHeight: '48px',
          [theme.breakpoints.down('sm')]: {
            minHeight: '44px',
          },
        }),
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
          minHeight: '48px',
          padding: theme.spacing(1.5, 2),
          [theme.breakpoints.down('sm')]: {
            minHeight: '44px',
            padding: theme.spacing(1, 1.5),
            fontSize: '0.8125rem',
            minWidth: 'auto',
          },
        }),
      },
    },
    // IconButton - larger touch target on mobile
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(1.5),
          [theme.breakpoints.up('md')]: {
            padding: theme.spacing(1),
          },
        }),
        sizeSmall: ({ theme }) => ({
          padding: theme.spacing(1),
          [theme.breakpoints.up('md')]: {
            padding: theme.spacing(0.5),
          },
        }),
      },
    },
    // List items - better spacing on mobile
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingTop: theme.spacing(1.5),
          paddingBottom: theme.spacing(1.5),
          [theme.breakpoints.up('md')]: {
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(1),
          },
        }),
      },
    },
    // Breadcrumbs - scrollable on mobile
    MuiBreadcrumbs: {
      styleOverrides: {
        root: ({ theme }) => ({
          [theme.breakpoints.down('sm')]: {
            '& .MuiBreadcrumbs-ol': {
              flexWrap: 'nowrap',
            },
          },
        }),
      },
    },
    // Pagination - compact on mobile
    MuiPagination: {
      defaultProps: {
        size: 'medium',
        siblingCount: 0,
        boundaryCount: 1,
      },
    },
    // Tooltip - touch-friendly
    MuiTooltip: {
      defaultProps: {
        enterTouchDelay: 0,
        leaveTouchDelay: 3000,
      },
    },
  },
});

// Apply responsive font sizes automatically
const theme = responsiveFontSizes(baseTheme, {
  breakpoints: ['sm', 'md', 'lg'],
  factor: 2, // How much to scale fonts
});

export default theme;

// Export common responsive spacing values for custom use
export const responsiveSpacing = {
  section: { xs: 4, sm: 6, md: 8, lg: 10 },
  container: { xs: 2, sm: 3, md: 4 },
  card: { xs: 2, sm: 2.5, md: 3 },
  gap: { xs: 2, sm: 2.5, md: 3 },
};

// Export responsive font sizes for custom use
export const responsiveFontSize = {
  hero: { xs: '1.75rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
  title: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
  subtitle: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
  body: { xs: '0.875rem', sm: '0.9375rem', md: '1rem' },
};
