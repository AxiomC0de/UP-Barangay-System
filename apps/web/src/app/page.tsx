import Box from '@mui/material/Box';
import {
  Navbar,
  Footer,
  HeroSection,
  AboutSection,
  QuickLinksBar,
  CommunityShowcase,
  AreasSection,
  CTASection,
} from '@/components';

export default function HomePage() {
  return (
    <Box component="main">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Hero Section with Parallax */}
      <HeroSection />

      {/* Quick Links Bar */}
      <QuickLinksBar />

      {/* About Section - Brief intro with Mission & Vision */}
      <AboutSection />

      {/* Community Showcase - Beautiful images of UP Campus */}
      <CommunityShowcase />

      {/* Areas Section */}
      <AreasSection />

      {/* Call to Action Section */}
      <CTASection />

      {/* Footer */}
      <Footer />
    </Box>
  );
}
