'use client';

import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import SecurityIcon from '@mui/icons-material/Security';

// Table of Contents items for Terms of Service
const termsTocItems = [
  { id: 'tos-1', label: '1. Introduction & Acceptance' },
  { id: 'tos-2', label: '2. Definitions' },
  { id: 'tos-3', label: '3. Eligibility Requirements' },
  { id: 'tos-4', label: '4. Account Registration' },
  { id: 'tos-5', label: '5. Service Description' },
  { id: 'tos-6', label: '6. User Conduct & Obligations' },
  { id: 'tos-7', label: '7. Prohibited Activities' },
  { id: 'tos-8', label: '8. Digital Documents' },
  { id: 'tos-9', label: '9. Fees & Payment Terms' },
  { id: 'tos-10', label: '10. Intellectual Property' },
  { id: 'tos-11', label: '11. Disclaimers & Warranties' },
  { id: 'tos-12', label: '12. Limitation of Liability' },
  { id: 'tos-13', label: '13. Indemnification' },
  { id: 'tos-14', label: '14. Termination' },
  { id: 'tos-15', label: '15. Dispute Resolution' },
  { id: 'tos-16', label: '16. Governing Law' },
  { id: 'tos-17', label: '17. General Provisions' },
];

// Table of Contents items for Privacy Policy
const privacyTocItems = [
  { id: 'dpp-1', label: '1. Introduction & Scope' },
  { id: 'dpp-2', label: '2. Legal Basis' },
  { id: 'dpp-3', label: '3. Information We Collect' },
  { id: 'dpp-4', label: '4. How We Use Information' },
  { id: 'dpp-5', label: '5. Information Sharing' },
  { id: 'dpp-6', label: '6. Cookies & Technologies' },
  { id: 'dpp-7', label: '7. Data Security' },
  { id: 'dpp-8', label: '8. Data Retention' },
  { id: 'dpp-9', label: '9. Your Rights & Choices' },
  { id: 'dpp-10', label: '10. Children\'s Privacy' },
  { id: 'dpp-11', label: '11. International Transfers' },
  { id: 'dpp-12', label: '12. Breach Notification' },
  { id: 'dpp-13', label: '13. Policy Updates' },
  { id: 'dpp-14', label: '14. Contact Information' },
];

export default function TermsAndPrivacyPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scrollspy effect
  useEffect(() => {
    const handleScroll = () => {
      // Filter sections based on active tab prefix
      const prefix = activeTab === 0 ? 'tos-' : 'dpp-';
      const allSections = document.querySelectorAll('.section-header');
      const sections = Array.from(allSections).filter((section) => {
        const id = section.getAttribute('id') || '';
        return id.startsWith(prefix);
      });
      
      if (sections.length === 0) return;
      
      let currentId = '';
      const threshold = 250; // pixels from top of viewport
      
      // Check if we're at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50;
      
      if (isAtBottom) {
        // If at bottom, highlight the last section for the current tab
        const lastSection = sections[sections.length - 1];
        currentId = lastSection.getAttribute('id') || '';
      } else {
        // Find the section that is closest to the top but within the viewport
        let closestSectionTop = -Infinity;
        
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          // Consider sections that have their top between -100 (slightly scrolled past) and viewport height
          if (rect.top <= threshold && rect.top > -window.innerHeight) {
            // We want the section with the largest top value that's still <= threshold
            // This means it's the most recently scrolled-to section
            if (rect.top > closestSectionTop) {
              closestSectionTop = rect.top;
              currentId = section.getAttribute('id') || '';
            }
          }
        });
      }

      setActiveSection(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set the active section
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const currentTocItems = activeTab === 0 ? termsTocItems : privacyTocItems;

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      {/* Navbar */}
      <Box
        component="nav"
        sx={{
          backgroundColor: 'white',
          borderBottom: '1px solid',
          borderColor: 'grey.200',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 64,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                component="img"
                src="/images/logo.jpg"
                alt="Barangay U.P. Campus Logo"
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'grey.800' }}>
                Barangay U.P. Campus
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Typography
                variant="caption"
                sx={{ color: 'grey.400', display: { xs: 'none', sm: 'inline' } }}
              >
                Effective: December 1, 2025
              </Typography>
              <Button
                component={Link}
                href="/register"
                startIcon={<ArrowBackIcon />}
                sx={{
                  color: '#228B22',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': { backgroundColor: 'rgba(34, 139, 34, 0.08)' },
                }}
              >
                Back to Registration
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Hero Header with Background Image */}
      <Box
        sx={{
          position: 'relative',
          pt: 8,
          pb: 4,
          overflow: 'hidden',
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
            backgroundImage: 'url(/images/hero.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 39%',
            backgroundRepeat: 'no-repeat',
            zIndex: 0,
          }}
        />

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(30, 41, 59, 0.85)',
            zIndex: 1,
          }}
        />

        {/* Hero Content */}
        <Container maxWidth="md" sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: 'white',
              mb: 2,
              fontFamily: 'Georgia, serif',
              textShadow: '2px 4px 8px rgba(0,0,0,0.3)',
            }}
          >
            Terms & Policies
          </Typography>
          <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', maxWidth: 600, mx: 'auto' }}>
            Transparency, accountability, and the rule of law are the cornerstones of our public
            service. Below you will find the comprehensive legal agreements governing your use of
            the Barangay E-Portal. Please read them carefully.
          </Typography>
        </Container>
      </Box>

      {/* Tab Navigation */}
      <Box
        sx={{
          backgroundColor: 'white',
          borderBottom: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Container maxWidth="md">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: '#228B22',
                height: 3,
              },
              '& .MuiTab-root': {
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 500,
                fontSize: '0.875rem',
                color: 'grey.500',
                '&.Mui-selected': {
                  color: '#228B22',
                  fontWeight: 600,
                },
              },
            }}
          >
            <Tab label="Terms of Service" />
            <Tab label="Privacy Policy" />
          </Tabs>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 280px' },
            gap: 6,
            maxWidth: 1200,
            mx: 'auto',
          }}
        >
          {/* Document Content */}
          <Box ref={contentRef} sx={{ maxWidth: 800 }}>
            {activeTab === 0 ? <TermsOfServiceContent /> : <PrivacyPolicyContent />}
          </Box>

          {/* Right Sidebar: Table of Contents */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
            }}
          >
            <Box
              sx={{
                position: 'sticky',
                top: 120,
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  color: 'grey.400',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  mb: 2,
                  display: 'block',
                }}
              >
                On this page
              </Typography>

              <List
                sx={{
                  borderLeft: '1px solid',
                  borderColor: 'grey.200',
                  py: 0,
                }}
              >
                {currentTocItems.map((item) => (
                  <ListItem key={item.id} disablePadding>
                    <ListItemButton
                      onClick={() => scrollToSection(item.id)}
                      sx={{
                        py: 0.75,
                        pl: 2,
                        ml: '-1px',
                        borderLeft: '2px solid',
                        borderColor: activeSection === item.id ? '#228B22' : 'transparent',
                        backgroundColor: activeSection === item.id ? 'rgba(34, 139, 34, 0.05)' : 'transparent',
                        '&:hover': {
                          borderColor: '#228B22',
                          backgroundColor: 'rgba(34, 139, 34, 0.05)',
                        },
                      }}
                    >
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: {
                            color: activeSection === item.id ? '#228B22' : 'grey.500',
                            fontWeight: activeSection === item.id ? 600 : 400,
                          },
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 3 }} />

              <Button
                onClick={scrollToTop}
                startIcon={<ArrowUpwardIcon />}
                sx={{
                  color: 'grey.400',
                  textTransform: 'uppercase',
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                  fontWeight: 700,
                  '&:hover': { color: 'grey.600' },
                }}
              >
                Back to Top
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Footer Note */}
        <Box
          sx={{
            mt: 8,
            pt: 4,
            borderTop: '1px solid',
            borderColor: 'grey.200',
            textAlign: 'center',
            maxWidth: 1200,
            mx: 'auto',
          }}
        >
          <Typography variant="caption" sx={{ color: 'grey.800' }}>
            © 2025 Barangay U.P. Campus Government Unit. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// Terms of Service Content Component
function TermsOfServiceContent() {
  return (
    <Box
      sx={{
        '& p': { mb: 3, lineHeight: 1.8, fontSize: '1.05rem', color: 'grey.700' },
        '& ul, & ol': { pl: 3, mb: 3 },
        '& li': { mb: 1.5, lineHeight: 1.7, color: 'grey.700' },
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, color: 'grey.900', mb: 3, fontFamily: 'Georgia, serif' }}>
        Terms of Service
      </Typography>

      <Typography
        variant="caption"
        sx={{
          textTransform: 'uppercase',
          fontWeight: 700,
          color: 'grey.400',
          letterSpacing: '0.1em',
          mb: 4,
          display: 'block',
        }}
      >
        Reference: LGU-BUC-TOS-2025-001 | Version 3.0 | Last Revised: December 1, 2025
      </Typography>

      <Alert
        severity="warning"
        sx={{
          mb: 4,
          backgroundColor: 'rgba(255, 152, 0, 0.08)',
          borderLeft: '4px solid #ff9800',
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          IMPORTANT LEGAL NOTICE: PLEASE READ THESE TERMS CAREFULLY BEFORE USING THE BARANGAY E-PORTAL SERVICES.
          BY ACCESSING, BROWSING, OR USING THIS PORTAL, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE
          TO BE BOUND BY THESE TERMS. IF YOU DO NOT AGREE TO THESE TERMS, YOU MUST NOT ACCESS OR USE THE SERVICES.
        </Typography>
      </Alert>

      <SectionHeader id="tos-1" title="1. Introduction and Acceptance of Agreement" />
      <Typography component="p">
        Welcome to the Barangay U.P. Campus E-Portal (&quot;Portal&quot;, &quot;Platform&quot;, &quot;Service&quot;, &quot;Website&quot;, or &quot;E-Portal&quot;),
        the official digital governance platform of the Barangay Government Unit of U.P. Campus, Diliman, Quezon City
        (&quot;Barangay&quot;, &quot;LGU&quot;, &quot;Government Unit&quot;, &quot;We&quot;, &quot;Us&quot;, or &quot;Our&quot;). This document constitutes a legally binding
        agreement (&quot;Agreement&quot; or &quot;Terms&quot;) between you (&quot;User&quot;, &quot;Resident&quot;, &quot;Citizen&quot;, &quot;You&quot;, or &quot;Your&quot;) and the
        Barangay Government Unit.
      </Typography>
      <Typography component="p">
        These Terms of Service govern your access to and use of the Barangay E-Portal, including all associated
        services, features, content, applications, and functionalities offered through or in connection with the
        Portal. By creating an account, accessing, browsing, registering for, submitting data to, or utilizing
        any part of the Service, you explicitly, voluntarily, freely, and irrevocably agree to be bound by these
        Terms of Service in their entirety.
      </Typography>
      <Typography component="p">
        These Terms apply to all visitors, users, residents, and others who access or use the Service. Your
        continued use of the Platform following the posting of any changes, modifications, or amendments to
        this Agreement constitutes your acceptance of and agreement to such changes. We reserve the right to
        modify these Terms at any time, and such modifications shall be effective immediately upon posting.
        You should review these Terms periodically to ensure familiarity with the most current version.
      </Typography>
      <Typography component="p">
        The Barangay E-Portal is designed to provide residents with convenient access to government services,
        information, and community resources. Our mission is to enhance civic engagement, streamline government
        processes, and foster a more connected and informed community through digital innovation while maintaining
        the highest standards of data privacy, security, and public service.
      </Typography>

      <SectionHeader id="tos-2" title="2. Definitions and Interpretation" />
      <Typography component="p">
        For the purposes of this Agreement, the following terms shall have the meanings ascribed to them below.
        These definitions are intended to provide clarity and ensure consistent interpretation throughout this
        document:
      </Typography>
      <Box component="ul">
        <li>
          <strong>&quot;Account&quot;</strong> refers to the unique digital identity created by a User to access the
          Portal&apos;s services, consisting of login credentials, personal information, and associated data.
        </li>
        <li>
          <strong>&quot;Authorized User&quot;</strong> means any individual who has been granted legitimate access to the
          Portal through proper registration and verification procedures.
        </li>
        <li>
          <strong>&quot;Barangay Clearance&quot;</strong> refers to an official document issued by the Barangay certifying
          that an individual is a person of good moral character and has no pending case or derogatory record
          within the Barangay.
        </li>
        <li>
          <strong>&quot;Content&quot;</strong> includes all text, graphics, images, music, software, audio, video,
          information, data, or other materials uploaded, downloaded, appearing on, or otherwise accessible
          through the Portal.
        </li>
        <li>
          <strong>&quot;Digital Certificate&quot;</strong> refers to any electronically generated official document,
          including but not limited to Barangay Clearances, Certificates of Residency, Certificates of Indigency,
          and Business Permits.
        </li>
        <li>
          <strong>&quot;Force Majeure&quot;</strong> means any event beyond the reasonable control of the Barangay,
          including but not limited to natural disasters, acts of God, war, terrorism, riots, embargoes,
          acts of civil or military authorities, fire, floods, epidemics, pandemics, power outages, or
          telecommunications failures.
        </li>
        <li>
          <strong>&quot;Personal Data&quot;</strong> refers to any information relating to an identified or identifiable
          natural person, as defined under Republic Act No. 10173 (Data Privacy Act of 2012).
        </li>
        <li>
          <strong>&quot;Services&quot;</strong> encompasses all features, functions, tools, and resources provided through
          the Portal, including document requests, complaint filing, appointment scheduling, information
          dissemination, and community engagement features.
        </li>
        <li>
          <strong>&quot;User Content&quot;</strong> means any content, information, data, text, photographs, graphics,
          messages, or other materials that you submit, upload, post, or transmit through the Portal.
        </li>
        <li>
          <strong>&quot;Verification&quot;</strong> refers to the process by which the Barangay confirms the identity,
          residency status, and eligibility of a User to access certain Services.
        </li>
      </Box>

      <SectionHeader id="tos-3" title="3. Eligibility Requirements and Residency Criteria" />
      <Typography component="p">
        The Barangay E-Portal is not a public service open to the general population. It is a specialized
        government platform intended exclusively for individuals who meet the following strict eligibility
        criteria. By registering for and using the Portal, you represent, warrant, and certify that you
        satisfy at least one of the following conditions:
      </Typography>
      <Box component="ul">
        <li>
          <strong>Bona Fide Residents:</strong> Individuals who have established their primary domicile and
          actual physical residence within the territorial jurisdiction of Barangay U.P. Campus for a continuous
          period of at least six (6) months immediately preceding their registration. Proof of residency may
          include utility bills, lease agreements, or other documentation bearing your name and address within
          the Barangay. <em>(Example: A graduate student renting an apartment on C.P. Garcia Avenue who has
          resided there since June 2025.)</em>
        </li>
        <li>
          <strong>Property Owners:</strong> Individuals who possess valid legal title, ownership rights, or
          beneficial interest in real property situated within the territorial boundaries of Barangay U.P. Campus,
          regardless of their actual place of residence. Property owners must provide proof of ownership such
          as Transfer Certificate of Title (TCT), Tax Declaration, or Deed of Absolute Sale.
          <em>(Example: A landowner residing in Makati who owns a residential property within the U.P. Campus area.)</em>
        </li>
        <li>
          <strong>Business Proprietors:</strong> Individuals, partnerships, corporations, or other legal entities
          operating a business establishment that is duly registered, licensed, and physically located within
          Barangay U.P. Campus. Business owners must provide valid Business Permits, SEC Registration, DTI
          Certificate, or Mayor&apos;s Permit as applicable.
          <em>(Example: The owner of a food establishment, convenience store, or professional service office
          operating within the Barangay.)</em>
        </li>
        <li>
          <strong>University Personnel and Affiliates:</strong> Current employees, faculty members, staff, and
          officially enrolled students of the University of the Philippines Diliman who reside or regularly
          work within the Barangay&apos;s jurisdiction. Valid University ID and employment/enrollment verification
          may be required.
        </li>
        <li>
          <strong>Legal Age and Capacity:</strong> You must be at least eighteen (18) years of age and possess
          full legal capacity to enter into binding contracts under Philippine law. Minors between thirteen (13)
          and seventeen (17) years of age may only use the Service under the direct supervision, consent, and
          responsibility of a parent or legal guardian who agrees to be bound by these Terms on the minor&apos;s behalf.
          Minors below thirteen (13) years of age are prohibited from creating accounts or using the Portal.
        </li>
      </Box>
      <Typography component="p">
        <strong>IMPORTANT WARNING ON FALSIFICATION OF DOCUMENTS:</strong> By registering for an Account and
        using the Portal, you solemnly affirm, under penalty of perjury, that all information submitted is
        true, accurate, complete, and current. The submission of false, fraudulent, or misleading information,
        including but not limited to falsified proof of billing, edited identification documents, fabricated
        lease contracts, or counterfeit government-issued documents, constitutes a criminal offense under
        <strong> Article 172 of the Revised Penal Code of the Philippines</strong> (Falsification by Private
        Individual and Use of Falsified Documents), punishable by imprisonment of prision correccional in its
        medium and maximum periods and a fine. Additionally, such acts may constitute violations of
        <strong> Republic Act No. 10175</strong> (Cybercrime Prevention Act of 2012), which provides enhanced
        penalties for crimes committed through computer systems.
      </Typography>

      <SectionHeader id="tos-4" title="4. Account Registration, Security, and User Responsibilities" />
      <Typography component="p">
        Access to certain features and functionalities of the Portal, including but not limited to Barangay
        Clearance requests, Blotter filing, appointment scheduling, and document processing, requires the
        creation of a verified User Account. In connection with your Account registration and ongoing use,
        you acknowledge and agree to the following terms and conditions:
      </Typography>
      <Box component="ol">
        <li>
          <strong>Accuracy and Completeness of Information:</strong> You agree to provide true, accurate,
          current, and complete information as prompted by the registration form and to maintain and promptly
          update such information to keep it true, accurate, current, and complete at all times. You shall
          not use a false name, alias, or pseudonym, nor provide an email address or contact information
          owned or controlled by another person without proper authorization.
        </li>
        <li>
          <strong>Account Credentials and Security:</strong> You are solely and exclusively responsible for
          safeguarding the confidentiality and security of your Account credentials, including your username,
          password, and any other authentication factors. You agree not to disclose your password or other
          access credentials to any third party under any circumstances. You shall implement reasonable
          security measures to protect your Account, including using strong, unique passwords and enabling
          multi-factor authentication where available.
        </li>
        <li>
          <strong>Liability for Account Activity:</strong> You acknowledge and agree that you are fully
          responsible and liable for all activities that occur under your Account, whether or not authorized
          by you. You shall immediately notify the Barangay of any unauthorized use of your Account, any
          breach of security, or any other suspicious activity of which you become aware. The Barangay shall
          not be liable for any loss, damage, or injury arising from your failure to comply with this section.
        </li>
        <li>
          <strong>Immediate Notification of Security Breaches:</strong> You must notify the Barangay immediately
          upon becoming aware of any security breach, unauthorized access, theft, loss, or compromise of your
          Account credentials. Failure to provide timely notification may result in your Account being suspended
          and may expose you to liability for any resulting damages.
        </li>
        <li>
          <strong>One Account Policy:</strong> Each eligible individual is entitled to register and maintain
          only one (1) Account. The creation of multiple or duplicate Accounts by the same individual, whether
          to circumvent suspensions, bans, service limitations, or for any other purpose, is strictly prohibited
          and may result in the permanent termination of all associated Accounts without prior notice.
        </li>
        <li>
          <strong>Account Verification:</strong> The Barangay reserves the right to verify your identity,
          residency status, and eligibility at any time through various means, including but not limited to
          documentary verification, physical inspection, coordination with other government agencies, or
          third-party verification services. You agree to cooperate fully with any verification procedures.
        </li>
      </Box>

      <SectionHeader id="tos-5" title="5. Description of Services and Service Scope" />
      <Typography component="p">
        The Barangay E-Portal provides a comprehensive suite of digital government services designed to enhance
        civic engagement, streamline administrative processes, and improve the delivery of public services to
        residents. The Services currently offered through the Portal include, but are not limited to:
      </Typography>
      <Box component="ul">
        <li>
          <strong>Document Request Services:</strong> Electronic submission and processing of requests for
          official Barangay documents, including Barangay Clearances, Certificates of Residency, Certificates
          of Indigency, Certificates of Good Moral Character, Business Permits, and other certifications as
          may be required.
        </li>
        <li>
          <strong>Complaint and Blotter Filing:</strong> Online submission of complaints, incident reports,
          and requests for Barangay intervention in disputes, including matters subject to the Katarungang
          Pambarangay (Barangay Justice System) under Republic Act No. 7160.
        </li>
        <li>
          <strong>Appointment Scheduling:</strong> Online booking of appointments with Barangay officials,
          including the Barangay Captain, Barangay Secretary, Barangay Treasurer, and other designated personnel.
        </li>
        <li>
          <strong>Community Announcements and Information:</strong> Dissemination of official announcements,
          notices, advisories, emergency alerts, and community information relevant to Barangay residents.
        </li>
        <li>
          <strong>Civic Engagement Features:</strong> Platforms for community discussions, feedback submission,
          surveys, and participation in Barangay programs and initiatives.
        </li>
        <li>
          <strong>Payment Processing:</strong> Electronic payment facilities for Barangay fees, dues, and
          other assessments through authorized payment channels.
        </li>
      </Box>
      <Typography component="p">
        <strong>Service Modifications:</strong> The Barangay reserves the right, in its sole discretion, to
        modify, suspend, discontinue, or terminate any aspect of the Services at any time, with or without
        notice, for any reason, including but not limited to system maintenance, upgrades, enhancements, or
        changes in applicable laws and regulations. The Barangay shall not be liable to you or any third
        party for any modification, suspension, or discontinuance of the Services.
      </Typography>
      <Typography component="p">
        <strong>Service Availability:</strong> While we strive to maintain continuous availability of the
        Portal, we do not guarantee uninterrupted access. The Services may be temporarily unavailable due to
        scheduled maintenance, system updates, technical difficulties, or circumstances beyond our reasonable
        control. We will endeavor to provide advance notice of planned maintenance whenever practicable.
      </Typography>

      <SectionHeader id="tos-6" title="6. User Conduct, Obligations, and Acceptable Use" />
      <Typography component="p">
        As a condition of your access to and use of the Portal, you agree to comply with all applicable laws,
        regulations, and these Terms of Service. You acknowledge that you are responsible for your own conduct
        and any content you submit while using the Services. In using the Portal, you agree to:
      </Typography>
      <Box component="ul">
        <li>
          Use the Services only for lawful purposes and in accordance with these Terms, all applicable Philippine
          laws and regulations, and all applicable local ordinances of Quezon City and Barangay U.P. Campus.
        </li>
        <li>
          Provide accurate, complete, and truthful information in all submissions, applications, and communications
          through the Portal.
        </li>
        <li>
          Respect the rights, dignity, and privacy of other users, Barangay officials, and personnel.
        </li>
        <li>
          Maintain the confidentiality of your Account credentials and promptly notify the Barangay of any
          unauthorized access or security breach.
        </li>
        <li>
          Cooperate with Barangay personnel in verification procedures, investigations, and other official
          processes.
        </li>
        <li>
          Review and comply with all posted notices, guidelines, and policies applicable to specific Services
          or features.
        </li>
        <li>
          Keep your contact information current and respond promptly to official communications from the Barangay.
        </li>
        <li>
          Use the Services in good faith and not for purposes of abuse, fraud, or circumvention of lawful
          government processes.
        </li>
      </Box>

      <SectionHeader id="tos-7" title="7. Prohibited Activities and Conduct" />
      <Typography component="p">
        You agree not to engage in any of the following prohibited activities while using the Portal. Violation
        of these prohibitions may result in immediate termination of your Account, legal action, and referral
        to appropriate law enforcement authorities:
      </Typography>
      <Box component="ul">
        <li>
          <strong>False Reporting and Perjury:</strong> Filing false, fraudulent, or malicious blotter reports,
          complaints, or incident reports; submitting fictitious emergency alerts; making prank calls or
          communications to Barangay hotlines or emergency services; or providing false testimony or sworn
          statements. Such acts constitute violations of the Revised Penal Code and may be prosecuted accordingly.
        </li>
        <li>
          <strong>Cybercrime and Hacking:</strong> Attempting to probe, scan, test, or breach the security or
          authentication systems of the Portal; attempting to gain unauthorized access to any portion of the
          Services, other accounts, computer systems, or networks connected to the Portal; engaging in any
          activity that disrupts, damages, or impairs the functioning of the Portal. Such acts violate
          <strong> Republic Act No. 10175</strong> (Cybercrime Prevention Act of 2012) and are punishable by
          imprisonment and substantial fines.
        </li>
        <li>
          <strong>Data Scraping and Automated Access:</strong> Using robots, spiders, crawlers, scrapers, or
          other automated means to access, collect, or harvest any data, content, or information from the Portal
          without express written authorization from the Barangay.
        </li>
        <li>
          <strong>Malware and Malicious Code:</strong> Uploading, transmitting, or distributing any files,
          software, or content that contains viruses, Trojan horses, worms, logic bombs, ransomware, spyware,
          or any other malicious code or technology designed to harm, disable, or interfere with the Portal
          or any connected systems.
        </li>
        <li>
          <strong>Harassment and Abuse:</strong> Using the Portal to harass, threaten, stalk, defame, intimidate,
          or abuse any person, including Barangay officials, employees, or other users; using profane, obscene,
          or hateful language; engaging in discrimination based on race, ethnicity, religion, gender, sexual
          orientation, disability, or any other protected characteristic.
        </li>
        <li>
          <strong>Impersonation and Identity Fraud:</strong> Impersonating any person or entity, including
          Barangay officials, employees, or other users; falsely claiming affiliation with any person, entity,
          or organization; creating accounts using another person&apos;s identity without authorization.
        </li>
        <li>
          <strong>Spam and Unsolicited Communications:</strong> Transmitting spam, chain letters, unsolicited
          promotional materials, or other forms of unauthorized solicitation through the Portal.
        </li>
        <li>
          <strong>Circumvention of Security Measures:</strong> Attempting to bypass, disable, or circumvent any
          security features, access controls, or technological protection measures implemented on the Portal.
        </li>
        <li>
          <strong>Interference with Services:</strong> Taking any action that imposes an unreasonable or
          disproportionately large load on the Portal&apos;s infrastructure; interfering with or disrupting the
          Services or servers or networks connected to the Services.
        </li>
        <li>
          <strong>Violation of Third-Party Rights:</strong> Infringing upon or violating the intellectual
          property rights, privacy rights, publicity rights, or other legal rights of any third party.
        </li>
      </Box>

      <SectionHeader id="tos-8" title="8. Digital Certificates, Documents, and Validity" />
      <Typography component="p">
        The Barangay E-Portal generates and issues official government documents in digital format. These
        documents carry the same legal weight and validity as their physical counterparts when properly
        authenticated. The following terms govern the issuance, use, and validity of digital documents:
      </Typography>
      <Typography component="p">
        <strong>8.1 Digital Authentication and Validity:</strong> Digital certificates and documents issued
        through the Portal are considered valid and authentic only when they contain a scannable, unexpired
        QR code that, when scanned, redirects to the official Barangay verification server and confirms the
        document&apos;s authenticity. Screenshots, photocopies, or digitally altered images of documents that do
        not contain verifiable QR codes or whose QR codes fail verification are invalid and shall not be
        honored by any party.
      </Typography>
      <Typography component="p">
        <strong>8.2 Verification Requirements:</strong> All digital documents are subject to verification by
        requesting parties, agencies, or institutions. The Barangay maintains a secure verification system
        accessible through the Portal that allows authorized parties to confirm the authenticity, validity
        period, and current status of any issued document.
      </Typography>
      <Typography component="p">
        <strong>8.3 Physical Printing Standards:</strong> When a physical copy of a digital document is required,
        the document must be printed on clean, white, A4-sized (210mm x 297mm) paper using a printer capable
        of producing clear, legible output. The QR code must be clearly visible, unobstructed, and scannable.
        Documents printed on colored paper, glossy photo paper, or paper smaller than A4 size, or documents
        with smudged, faded, or illegible QR codes, may be rejected by requesting parties.
      </Typography>
      <Typography component="p">
        <strong>8.4 Non-Transferability:</strong> Digital certificates and documents are issued to specific
        individuals for specific purposes as stated in the application. Documents are non-transferable and
        may not be used by any person other than the named individual. A document issued for one purpose
        (e.g., &quot;Employment&quot;) may not be used for a different purpose (e.g., &quot;Firearm License Application&quot;)
        unless the purpose specified encompasses the intended use.
      </Typography>
      <Typography component="p">
        <strong>8.5 Validity Period:</strong> Each digital document has a specified validity period, which is
        clearly indicated on the document itself. Documents become invalid upon expiration of the validity
        period and may not be used for any purpose thereafter. Users must apply for new documents before
        expiration to ensure continuous compliance with their requirements.
      </Typography>
      <Typography component="p">
        <strong>8.6 Revocation Authority:</strong> The Barangay Captain, or any duly authorized official,
        reserves the right to revoke, suspend, or invalidate any issued document at any time if: (a) the
        document was obtained through fraud, misrepresentation, or submission of false information; (b)
        subsequent information reveals that the applicant has pending cases, derogatory records, or other
        disqualifying circumstances; (c) the document was altered, modified, or tampered with after issuance;
        or (d) revocation is required by law, court order, or official directive.
      </Typography>

      <SectionHeader id="tos-9" title="9. Fees, Payment Terms, and Refund Policy" />
      <Typography component="p">
        Certain Services offered through the Portal require the payment of fees in accordance with the approved
        Barangay Revenue Code and applicable local ordinances. The following terms govern fees, payments, and
        refunds:
      </Typography>
      <Typography component="p">
        <strong>9.1 Fee Schedule:</strong> Current fees for all Services are published on the Portal and may
        be updated from time to time in accordance with Barangay resolutions and applicable regulations. You
        are responsible for reviewing the applicable fees before initiating any transaction. The Barangay
        will provide reasonable notice of any fee changes.
      </Typography>
      <Typography component="p">
        <strong>9.2 Payment Methods:</strong> Payments may be made through authorized payment channels and
        methods as indicated on the Portal, which may include online payment gateways (such as GCash, Maya/PayMaya,
        GrabPay, Landbank Link.Biz), bank transfers, and over-the-counter payments at designated locations.
        The availability of specific payment methods may vary.
      </Typography>
      <Typography component="p">
        <strong>9.3 Third-Party Payment Processors:</strong> Online payments are processed through third-party
        payment service providers. The Barangay is not responsible for any errors, delays, double charges,
        service fees, or technical issues arising from the use of these third-party payment services. Any
        disputes regarding payment processing should be directed to the relevant payment service provider.
      </Typography>
      <Typography component="p">
        <strong>9.4 Non-Refundable Fees:</strong> All fees are generally non-refundable once document processing
        has commenced. If your application is denied due to failure to meet requirements, submission of
        incomplete documents, or other reasons attributable to the applicant, the fee shall be forfeited to
        cover administrative processing costs. No refunds will be issued for fees paid more than thirty (30)
        days prior to a refund request.
      </Typography>
      <Typography component="p">
        <strong>9.5 Exceptions to Non-Refund Policy:</strong> Refunds may be granted, in the sole discretion of
        the Barangay, under the following circumstances: (a) system error resulting in duplicate charges;
        (b) service cancellation by the Barangay before processing commenced; (c) as required by applicable
        consumer protection laws.
      </Typography>
      <Typography component="p">
        <strong>9.6 Official Receipts:</strong> An electronic Official Receipt (OR) will be generated and made
        available through your Account upon successful payment verification. The electronic OR serves as valid
        proof of payment for all legal purposes. Users are encouraged to download and retain copies of all
        receipts for their records.
      </Typography>

      <SectionHeader id="tos-10" title="10. Intellectual Property Rights" />
      <Typography component="p">
        <strong>10.1 Barangay Property:</strong> The Portal and all of its contents, features, and functionality,
        including but not limited to all information, software, source code, text, displays, graphics, photographs,
        video, audio, design, presentation, selection, and arrangement, are owned by the Barangay Government Unit,
        its licensors, or other providers of such material and are protected by Philippine and international
        copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
      </Typography>
      <Typography component="p">
        <strong>10.2 Official Insignia and Branding:</strong> The Barangay Seal, official logos, emblems, and
        other official insignia are protected under applicable laws and may not be used, reproduced, or modified
        without express written permission from the Barangay. Unauthorized use of official insignia for fraudulent
        purposes, including the creation of fake identification documents or counterfeit official communications,
        is a criminal offense punishable under the Revised Penal Code and the Local Government Code.
      </Typography>
      <Typography component="p">
        <strong>10.3 Limited License:</strong> Subject to your compliance with these Terms, the Barangay grants
        you a limited, non-exclusive, non-transferable, non-sublicensable, revocable license to access and use
        the Portal solely for your personal, non-commercial use in connection with the Services. This license
        does not include the right to: (a) modify, copy, distribute, transmit, display, perform, reproduce,
        publish, license, create derivative works from, transfer, or sell any content, information, software,
        products, or services obtained from the Portal; (b) use any data mining, robots, or similar data
        gathering or extraction methods; (c) download any portion of the Portal or its contents except as
        expressly permitted.
      </Typography>
      <Typography component="p">
        <strong>10.4 User Content License:</strong> By submitting, posting, or transmitting any content through
        the Portal, you grant the Barangay a non-exclusive, royalty-free, perpetual, irrevocable, and fully
        sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from,
        distribute, and display such content throughout the world in any media for the purpose of providing
        and improving the Services.
      </Typography>

      <SectionHeader id="tos-11" title="11. Disclaimers and Warranties" />
      <Typography component="p">
        <strong>11.1 &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS:</strong> THE PORTAL AND ALL SERVICES, CONTENT, AND
        FUNCTIONALITIES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT ANY WARRANTIES OF ANY
        KIND, EITHER EXPRESS OR IMPLIED. THE BARANGAY EXPRESSLY DISCLAIMS ALL WARRANTIES, WHETHER EXPRESS,
        IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
      </Typography>
      <Typography component="p">
        <strong>11.2 No Guarantee of Availability:</strong> The Barangay does not warrant that the Portal will
        be uninterrupted, timely, secure, error-free, or free from viruses or other harmful components. The
        Barangay does not warrant that any errors or defects will be corrected or that the Portal or the servers
        that make it available are free of viruses or other harmful components.
      </Typography>
      <Typography component="p">
        <strong>11.3 Third-Party Content:</strong> The Portal may contain links to third-party websites, services,
        or resources. The Barangay does not endorse and is not responsible for the content, accuracy, or practices
        of any third-party websites or resources. Your use of third-party websites is at your own risk and subject
        to the terms and conditions of those websites.
      </Typography>
      <Typography component="p">
        <strong>11.4 Information Accuracy:</strong> While the Barangay endeavors to provide accurate and up-to-date
        information through the Portal, it does not warrant the completeness, accuracy, reliability, suitability,
        or availability of any information, products, services, or related graphics contained on the Portal for
        any purpose.
      </Typography>

      <SectionHeader id="tos-12" title="12. Limitation of Liability" />
      <Typography component="p">
        TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL THE BARANGAY GOVERNMENT UNIT, ITS
        OFFICIALS, OFFICERS, EMPLOYEES, AGENTS, CONTRACTORS, LICENSORS, OR SERVICE PROVIDERS BE LIABLE FOR ANY
        INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED
        TO DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, REGARDLESS OF WHETHER
        SUCH DAMAGES WERE FORESEEABLE AND WHETHER OR NOT THE BARANGAY WAS ADVISED OF THE POSSIBILITY OF SUCH
        DAMAGES, ARISING OUT OF OR IN CONNECTION WITH:
      </Typography>
      <Box component="ul">
        <li>Your access to or use of, or inability to access or use, the Portal or Services;</li>
        <li>Any conduct or content of any third party on the Portal;</li>
        <li>Any content obtained from the Portal;</li>
        <li>Unauthorized access, use, or alteration of your transmissions or content;</li>
        <li>Technical failures, including but not limited to system downtime, server crashes, power outages,
          telecommunications failures, or other technical problems;</li>
        <li>Delays in document processing due to volume of requests, holidays, incomplete submissions, or
          verification requirements;</li>
        <li>Loss of data resulting from user negligence, including weak passwords or compromised accounts;</li>
        <li>Actions or omissions of third-party payment processors or service providers;</li>
        <li>Force majeure events, including natural disasters, civil unrest, or government actions;</li>
        <li>Any other matter relating to the Portal or Services.</li>
      </Box>
      <Typography component="p">
        IN NO EVENT SHALL THE BARANGAY&apos;S TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES, OR CAUSES OF ACTION
        EXCEED THE AMOUNT YOU HAVE PAID TO THE BARANGAY, IF ANY, IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING
        THE EVENT GIVING RISE TO SUCH LIABILITY, OR ONE THOUSAND PESOS (₱1,000.00), WHICHEVER IS GREATER.
      </Typography>

      <SectionHeader id="tos-13" title="13. Indemnification" />
      <Typography component="p">
        You agree to indemnify, defend, and hold harmless the Barangay Government Unit, its officials, officers,
        employees, agents, contractors, licensors, and service providers from and against any and all claims,
        liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos;
        fees and litigation costs) arising out of or relating to:
      </Typography>
      <Box component="ol">
        <li>Your violation of these Terms of Service;</li>
        <li>Your use or misuse of the Portal or Services;</li>
        <li>Your violation of any applicable law, regulation, or ordinance;</li>
        <li>Your violation of any rights of any third party, including intellectual property, privacy, or
          publicity rights;</li>
        <li>Any content or information you submit, post, or transmit through the Portal;</li>
        <li>Your negligent or wrongful conduct;</li>
        <li>Any dispute between you and any third party arising from your use of the Portal.</li>
      </Box>
      <Typography component="p">
        The Barangay reserves the right, at its own expense, to assume the exclusive defense and control of any
        matter otherwise subject to indemnification by you, in which event you will cooperate with the Barangay
        in asserting any available defenses. You agree not to settle any matter subject to indemnification without
        the prior written consent of the Barangay.
      </Typography>

      <SectionHeader id="tos-14" title="14. Termination and Suspension" />
      <Typography component="p">
        <strong>14.1 Termination by User:</strong> You may terminate your Account at any time by following the
        account closure procedures provided in the Portal or by contacting the Barangay Secretary in writing.
        Upon termination, your right to access and use the Services will immediately cease.
      </Typography>
      <Typography component="p">
        <strong>14.2 Termination by Barangay:</strong> The Barangay may terminate or suspend your Account and
        access to the Services immediately, without prior notice or liability, for any reason whatsoever,
        including but not limited to: (a) breach of these Terms; (b) fraudulent, abusive, or illegal activity;
        (c) upon request by law enforcement or other government agencies; (d) unexpected technical issues or
        problems; (e) extended periods of inactivity; or (f) non-payment of any fees due.
      </Typography>
      <Typography component="p">
        <strong>14.3 Effects of Termination:</strong> Upon termination: (a) your right to use the Services will
        immediately cease; (b) any pending applications or transactions may be cancelled; (c) the Barangay may
        delete or retain your Account information in accordance with applicable data retention requirements;
        (d) you remain liable for any fees incurred prior to termination; (e) provisions of these Terms that
        by their nature should survive termination shall survive.
      </Typography>
      <Typography component="p">
        <strong>14.4 Data Retention After Termination:</strong> Notwithstanding termination, certain data,
        including transaction records, blotter entries, and financial records, may be retained in accordance
        with legal requirements, audit requirements, and data retention policies.
      </Typography>

      <SectionHeader id="tos-15" title="15. Dispute Resolution" />
      <Typography component="p">
        <strong>15.1 Informal Resolution:</strong> Before initiating any formal legal proceedings, you agree to
        first attempt to resolve any dispute, claim, or controversy arising out of or relating to these Terms
        or the Services through good-faith negotiation with the Barangay. You may initiate this process by
        sending a written notice to the Barangay Secretary describing the dispute and your proposed resolution.
      </Typography>
      <Typography component="p">
        <strong>15.2 Mandatory Mediation (Katarungang Pambarangay):</strong> For disputes that fall within the
        jurisdiction of the Katarungang Pambarangay, you agree to exhaust all administrative remedies by
        submitting the matter to the Lupong Tagapamayapa for mediation and conciliation proceedings in accordance
        with the Local Government Code of 1991 (Republic Act No. 7160) and its implementing rules and regulations.
        No court action may be filed until a Certificate to File Action has been issued.
      </Typography>
      <Typography component="p">
        <strong>15.3 Arbitration:</strong> For disputes not subject to Barangay conciliation, and if informal
        resolution is unsuccessful, either party may elect to have the dispute resolved through binding arbitration
        administered by the Philippine Dispute Resolution Center, Inc. (PDRCI) in accordance with its Arbitration
        Rules. The arbitration shall be conducted in Quezon City, Philippines, and the proceedings shall be
        conducted in English or Filipino.
      </Typography>
      <Typography component="p">
        <strong>15.4 Class Action Waiver:</strong> YOU AGREE THAT ANY DISPUTE RESOLUTION PROCEEDINGS WILL BE
        CONDUCTED ONLY ON AN INDIVIDUAL BASIS AND NOT IN A CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION.
        IF FOR ANY REASON A CLAIM PROCEEDS IN COURT RATHER THAN IN ARBITRATION, YOU WAIVE ANY RIGHT TO A
        JURY TRIAL.
      </Typography>

      <SectionHeader id="tos-16" title="16. Governing Law and Jurisdiction" />
      <Typography component="p">
        <strong>16.1 Governing Law:</strong> These Terms of Service and any dispute arising out of or related
        to these Terms or the Services shall be governed by and construed in accordance with the laws of the
        Republic of the Philippines, without regard to conflict of law principles.
      </Typography>
      <Typography component="p">
        <strong>16.2 Jurisdiction and Venue:</strong> Subject to the dispute resolution provisions above, any
        legal action or proceeding arising under these Terms shall be brought exclusively in the appropriate
        courts of Quezon City, Philippines, and you hereby irrevocably submit to the personal jurisdiction
        and venue of such courts.
      </Typography>
      <Typography component="p">
        <strong>16.3 Applicable Laws:</strong> In addition to these Terms, your use of the Portal is subject to
        all applicable Philippine laws and regulations, including but not limited to: Republic Act No. 7160
        (Local Government Code of 1991), Republic Act No. 10173 (Data Privacy Act of 2012), Republic Act No. 10175
        (Cybercrime Prevention Act of 2012), Republic Act No. 8792 (Electronic Commerce Act of 2000), and all
        applicable local ordinances of Quezon City and Barangay U.P. Campus.
      </Typography>

      <SectionHeader id="tos-17" title="17. General Provisions" />
      <Typography component="p">
        <strong>17.1 Entire Agreement:</strong> These Terms, together with any additional terms, conditions,
        policies, or guidelines posted on the Portal, constitute the entire agreement between you and the
        Barangay regarding your use of the Services and supersede all prior or contemporaneous communications,
        proposals, and agreements, whether oral or written.
      </Typography>
      <Typography component="p">
        <strong>17.2 Severability:</strong> If any provision of these Terms is held to be invalid, illegal, or
        unenforceable by a court of competent jurisdiction, such invalidity, illegality, or unenforceability
        shall not affect any other provision of these Terms, which shall remain in full force and effect. The
        invalid provision shall be modified to the minimum extent necessary to make it valid, legal, and
        enforceable while preserving the parties&apos; original intent.
      </Typography>
      <Typography component="p">
        <strong>17.3 Waiver:</strong> The failure of the Barangay to enforce any right or provision of these
        Terms shall not constitute a waiver of such right or provision unless acknowledged and agreed to in
        writing by the Barangay. Any waiver of any provision of these Terms shall be effective only if in
        writing and signed by an authorized representative of the Barangay.
      </Typography>
      <Typography component="p">
        <strong>17.4 Assignment:</strong> You may not assign or transfer these Terms or any rights or obligations
        hereunder without the prior written consent of the Barangay. The Barangay may assign these Terms without
        restriction. These Terms shall be binding upon and inure to the benefit of the parties and their
        respective successors and permitted assigns.
      </Typography>
      <Typography component="p">
        <strong>17.5 Notices:</strong> Any notices required or permitted under these Terms shall be in writing
        and shall be deemed given when delivered personally, sent by email to the address associated with your
        Account, or posted on the Portal. Notices to the Barangay should be sent to the Barangay Secretary at
        the official Barangay Hall address.
      </Typography>
      <Typography component="p">
        <strong>17.6 No Third-Party Beneficiaries:</strong> These Terms do not create any third-party beneficiary
        rights in any individual or entity that is not a party to these Terms.
      </Typography>
      <Typography component="p">
        <strong>17.7 Headings:</strong> The section headings in these Terms are for convenience only and have no
        legal or contractual effect.
      </Typography>
      <Typography component="p">
        <strong>17.8 Contact Information:</strong> For questions or concerns regarding these Terms of Service,
        please contact the Barangay Secretary at the official Barangay Hall or through the official communication
        channels provided on the Portal.
      </Typography>
    </Box>
  );
}

// Privacy Policy Content Component
function PrivacyPolicyContent() {
  return (
    <Box
      sx={{
        '& p': { mb: 3, lineHeight: 1.8, fontSize: '1.05rem', color: 'grey.700' },
        '& ul, & ol': { pl: 3, mb: 3 },
        '& li': { mb: 1.5, lineHeight: 1.7, color: 'grey.700' },
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700, color: 'grey.900', mb: 3, fontFamily: 'Georgia, serif' }}>
        Data Privacy Policy
      </Typography>

      <Typography
        variant="caption"
        sx={{
          textTransform: 'uppercase',
          fontWeight: 700,
          color: 'grey.400',
          letterSpacing: '0.1em',
          mb: 4,
          display: 'block',
        }}
      >
        Reference: LGU-BUC-DPP-2025-001 | Version 3.0 | Compliance: RA 10173 (Data Privacy Act of 2012)
      </Typography>

      <Alert
        icon={<SecurityIcon />}
        severity="info"
        sx={{
          mb: 4,
          backgroundColor: 'rgba(34, 139, 34, 0.08)',
          borderLeft: '4px solid #228B22',
          '& .MuiAlert-icon': { color: '#228B22' },
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1a5c1a', mb: 1 }}>
          Our Commitment to Your Privacy
        </Typography>
        <Typography variant="body2" sx={{ color: '#2d7a2d' }}>
          The Barangay Government Unit of U.P. Campus recognizes and upholds its responsibilities as a Personal
          Information Controller under <strong>Republic Act No. 10173</strong>, also known as the
          <strong> Data Privacy Act of 2012</strong>, and its Implementing Rules and Regulations. We are
          committed to protecting your personal data, ensuring transparency in all data processing activities,
          and upholding your fundamental right to privacy as enshrined in the Philippine Constitution.
        </Typography>
      </Alert>

      <SectionHeader id="dpp-1" title="1. Introduction and Scope of Policy" />
      <Typography component="p">
        This Data Privacy Policy (&quot;Policy&quot;) describes how the Barangay Government Unit of U.P. Campus
        (&quot;Barangay&quot;, &quot;We&quot;, &quot;Us&quot;, or &quot;Our&quot;) collects, uses, stores, shares, and protects your personal
        information when you access or use the Barangay E-Portal (&quot;Portal&quot;, &quot;Platform&quot;, or &quot;Services&quot;).
        This Policy applies to all personal data collected through the Portal, as well as personal data
        collected through other channels in connection with the Services.
      </Typography>
      <Typography component="p">
        By registering for an Account, accessing the Portal, submitting forms or applications, or utilizing
        any of our digital services, you explicitly, freely, and voluntarily consent to the collection,
        processing, use, storage, and disclosure of your personal data by the Barangay Government Unit in
        accordance with this Policy and applicable Philippine law.
      </Typography>
      <Typography component="p">
        This Policy should be read in conjunction with our Terms of Service, which governs your use of the
        Portal. Capitalized terms not defined herein shall have the meanings ascribed to them in the Terms
        of Service.
      </Typography>
      <Typography component="p">
        We encourage you to read this Policy carefully to understand our practices regarding your personal
        data. If you do not agree with the practices described in this Policy, please do not access or use
        the Portal or provide your personal information to us.
      </Typography>

      <SectionHeader id="dpp-2" title="2. Legal Basis for Data Processing" />
      <Typography component="p">
        We process your personal data based on one or more of the following lawful criteria as provided under
        Sections 12 and 13 of the Data Privacy Act of 2012:
      </Typography>
      <Box component="ul">
        <li>
          <strong>Consent:</strong> You have given your explicit consent to the processing of your personal
          data for one or more specific purposes. You may withdraw your consent at any time, subject to the
          limitations described in this Policy.
        </li>
        <li>
          <strong>Contractual Necessity:</strong> Processing is necessary for the performance of a contract
          to which you are a party, or to take steps at your request prior to entering into such a contract,
          such as processing your application for Barangay services.
        </li>
        <li>
          <strong>Legal Obligation:</strong> Processing is necessary for compliance with a legal obligation
          to which the Barangay is subject, including but not limited to obligations under the Local Government
          Code, Data Privacy Act, and other applicable laws and regulations.
        </li>
        <li>
          <strong>Vital Interests:</strong> Processing is necessary to protect your vital interests or those
          of another natural person, such as in emergency situations, disaster response, or public health
          emergencies.
        </li>
        <li>
          <strong>Public Authority:</strong> Processing is necessary for the Barangay to fulfill its mandate
          and exercise its functions as a local government unit, including the delivery of basic services,
          maintenance of peace and order, and implementation of government programs.
        </li>
        <li>
          <strong>Legitimate Interests:</strong> Processing is necessary for the legitimate interests pursued
          by the Barangay, except where such interests are overridden by your fundamental rights and freedoms.
        </li>
      </Box>

      <SectionHeader id="dpp-3" title="3. Information We Collect" />
      <Typography component="p">
        We collect personal information that is necessary and relevant for the legitimate purposes of
        providing government services. We do not collect personal data arbitrarily or beyond what is required.
        The categories of personal information we collect include:
      </Typography>
      
      <Typography variant="h6" sx={{ fontWeight: 600, color: 'grey.800', mt: 4, mb: 2 }}>
        3.1 Personal Information (General)
      </Typography>
      <Box component="ul">
        <li>
          <strong>Identity Information:</strong> Full legal name (first name, middle name, last name, suffix),
          date of birth, place of birth, sex/gender, civil status (single, married, widowed, separated,
          divorced), citizenship, and nationality.
        </li>
        <li>
          <strong>Contact Information:</strong> Residential address (including house/unit number, street,
          barangay, city, province, and postal code), mobile phone number, landline number, and email address.
        </li>
        <li>
          <strong>Emergency Contact Information:</strong> Name, relationship, contact number, and address of
          your designated emergency contact person.
        </li>
        <li>
          <strong>Household Information:</strong> Number of household members, names and relationships of
          household members, living arrangement status, and household composition details.
        </li>
        <li>
          <strong>Socio-Economic Information:</strong> Occupation, employer name and address, highest
          educational attainment, monthly income range, and employment status.
        </li>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 600, color: 'grey.800', mt: 4, mb: 2 }}>
        3.2 Sensitive Personal Information
      </Typography>
      <Typography component="p">
        We may collect certain categories of sensitive personal information when necessary for specific
        government services. Your explicit consent is required before collecting sensitive personal information:
      </Typography>
      <Box component="ul">
        <li>
          <strong>Government-Issued Identification Numbers:</strong> PhilSys/Philippine Identification Number
          (PhilID), Tax Identification Number (TIN), Social Security System (SSS) Number, Government Service
          Insurance System (GSIS) Number, Unified Multi-Purpose ID (UMID), Voter&apos;s ID Number, Passport Number,
          and Driver&apos;s License Number.
        </li>
        <li>
          <strong>Health Information:</strong> When relevant to specific services (such as health programs,
          senior citizen services, or PWD services), we may collect information about disabilities, health
          conditions, vaccination status, and medical history.
        </li>
        <li>
          <strong>Biometric Data:</strong> Photographs for identification purposes, fingerprints (where
          required for certain documents), and digital signatures.
        </li>
        <li>
          <strong>Legal and Case Records:</strong> Information related to blotter entries, complaints filed,
          mediation proceedings, and Lupon Tagapamayapa cases within the Barangay.
        </li>
        <li>
          <strong>Sectoral Group Membership:</strong> Information indicating membership in sectoral groups
          such as senior citizens, persons with disabilities (PWDs), solo parents, indigenous peoples, or
          other special categories that may qualify you for specific government programs or benefits.
        </li>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 600, color: 'grey.800', mt: 4, mb: 2 }}>
        3.3 Technical and Usage Information
      </Typography>
      <Box component="ul">
        <li>
          <strong>Device Information:</strong> Device type (computer, mobile phone, tablet), operating system
          and version, browser type and version, device identifiers, and screen resolution.
        </li>
        <li>
          <strong>Network Information:</strong> Internet Protocol (IP) address, Internet Service Provider (ISP),
          connection type, and geographic location derived from IP address.
        </li>
        <li>
          <strong>Usage Data:</strong> Pages viewed, links clicked, time spent on pages, access times and dates,
          referring URLs, and navigation patterns within the Portal.
        </li>
        <li>
          <strong>Authentication Logs:</strong> Login timestamps, logout timestamps, session duration, failed
          login attempts, password change history, and account recovery activities.
        </li>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 600, color: 'grey.800', mt: 4, mb: 2 }}>
        3.4 Uploaded Documents
      </Typography>
      <Box component="ul">
        <li>
          Scanned copies or photographs of valid government-issued identification documents
        </li>
        <li>
          Proof of residency documents such as utility bills, lease agreements, or Certificates of Land Title
        </li>
        <li>
          Supporting documents for specific applications (e.g., affidavits, certificates, certifications)
        </li>
        <li>
          Photographs required for identification purposes
        </li>
      </Box>

      <SectionHeader id="dpp-4" title="4. How We Use Your Information" />
      <Typography component="p">
        Your personal data is never used for commercial marketing or sold to third parties. We process your
        information solely for legitimate government purposes, including:
      </Typography>
      <Box component="ul">
        <li>
          <strong>Service Delivery:</strong> Processing your applications and requests for Barangay documents,
          clearances, certificates, and permits as mandated by the Local Government Code of 1991 (RA 7160).
        </li>
        <li>
          <strong>Identity Verification:</strong> Confirming your identity, verifying your residency status,
          and validating your eligibility for specific services or programs.
        </li>
        <li>
          <strong>Account Management:</strong> Creating and managing your user account, authenticating your
          access, and providing customer support.
        </li>
        <li>
          <strong>Communication:</strong> Sending you notifications about your applications, announcements
          about Barangay programs and services, emergency alerts, and other official communications.
        </li>
        <li>
          <strong>Dispute Resolution:</strong> Facilitating the Katarungang Pambarangay (Barangay Justice System)
          proceedings, including mediation, conciliation, and arbitration of disputes.
        </li>
        <li>
          <strong>Legal Compliance:</strong> Complying with directives from government agencies such as DILG,
          responding to valid court orders and subpoenas, and cooperating with law enforcement investigations.
        </li>
        <li>
          <strong>Public Safety:</strong> Supporting disaster preparedness and response, emergency evacuations,
          contact tracing during health emergencies, and other public safety initiatives.
        </li>
        <li>
          <strong>Statistical Analysis:</strong> Generating anonymized, aggregated demographic data for
          community planning, resource allocation, policy development, and reporting to oversight agencies.
          Such statistical data does not identify any individual.
        </li>
        <li>
          <strong>Service Improvement:</strong> Analyzing usage patterns to improve the Portal&apos;s functionality,
          user experience, and service delivery.
        </li>
        <li>
          <strong>Security and Fraud Prevention:</strong> Detecting, preventing, and addressing fraud, abuse,
          security threats, and technical issues.
        </li>
      </Box>

      <SectionHeader id="dpp-5" title="5. Information Sharing and Disclosure" />
      <Typography component="p">
        We maintain strict confidentiality of your personal data. We do not sell, rent, trade, or otherwise
        transfer your personal information to third parties for commercial purposes. Your data may be shared
        only under the following circumstances:
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, color: 'grey.800', mt: 4, mb: 2 }}>
        5.1 Government Agencies
      </Typography>
      <Typography component="p">
        We may share your information with other government agencies when required by law or necessary for
        inter-agency coordination:
      </Typography>
      <Box component="ul">
        <li>
          <strong>Department of the Interior and Local Government (DILG):</strong> For census data aggregation,
          compliance reporting, and local governance oversight.
        </li>
        <li>
          <strong>Philippine National Police (PNP) and National Bureau of Investigation (NBI):</strong> For
          criminal investigations, background verification for clearance issuance, and peace and order maintenance.
        </li>
        <li>
          <strong>City Health Office and Department of Health (DOH):</strong> For epidemiological surveillance,
          disease monitoring, contact tracing, and public health program implementation.
        </li>
        <li>
          <strong>Commission on Audit (COA):</strong> For fiscal accountability, audit of financial transactions,
          and verification of fee collections.
        </li>
        <li>
          <strong>Social Welfare Agencies (DSWD, SSS, GSIS):</strong> For verification of eligibility for
          social assistance programs, pension benefits, and welfare services.
        </li>
        <li>
          <strong>Philippine Statistics Authority (PSA):</strong> For national census and statistical programs.
        </li>
        <li>
          <strong>National Privacy Commission (NPC):</strong> For compliance monitoring and investigation of
          data privacy concerns.
        </li>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 600, color: 'grey.800', mt: 4, mb: 2 }}>
        5.2 Service Providers
      </Typography>
      <Typography component="p">
        We may engage trusted third-party service providers to assist in operating the Portal and delivering
        services. These providers are bound by confidentiality agreements and are prohibited from using your
        data for any purpose other than providing the contracted services:
      </Typography>
      <Box component="ul">
        <li>Cloud hosting and data storage providers</li>
        <li>Payment processing services</li>
        <li>Email and SMS notification services</li>
        <li>Technical support and maintenance providers</li>
        <li>Security and fraud prevention services</li>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 600, color: 'grey.800', mt: 4, mb: 2 }}>
        5.3 Legal Requirements
      </Typography>
      <Typography component="p">
        We may disclose your information when required by law or in response to:
      </Typography>
      <Box component="ul">
        <li>Valid subpoenas, court orders, or legal process</li>
        <li>Requests from law enforcement agencies conducting official investigations</li>
        <li>Emergency situations involving threats to life or safety</li>
        <li>Protection of our legal rights or defense against legal claims</li>
      </Box>

      <SectionHeader id="dpp-6" title="6. Cookies and Tracking Technologies" />
      <Typography component="p">
        The Portal uses cookies and similar technologies to enhance your browsing experience, maintain session
        information, and gather analytical data. By using the Portal, you consent to the use of these technologies.
      </Typography>
      <Box component="ul">
        <li>
          <strong>Essential Cookies:</strong> These cookies are strictly necessary for the Portal to function
          properly. They enable core functionalities such as security, session management, and accessibility.
          These cookies do not store any personally identifiable information and cannot be disabled.
        </li>
        <li>
          <strong>Authentication Cookies:</strong> These cookies keep you logged in as you navigate between
          pages and remember your login status. They are deleted when you close your browser or after a
          period of inactivity.
        </li>
        <li>
          <strong>Preference Cookies:</strong> These cookies remember your settings and preferences, such as
          language selection, display preferences, and your selected district or area, to provide a more
          personalized experience.
        </li>
        <li>
          <strong>Security Cookies:</strong> These cookies help detect and prevent security risks, including
          Cross-Site Request Forgery (CSRF) attacks, unauthorized access attempts, and suspicious activities.
        </li>
        <li>
          <strong>Analytics Cookies:</strong> These cookies help us understand how visitors interact with the
          Portal by collecting and reporting information anonymously. This helps us improve the Portal&apos;s
          functionality and user experience.
        </li>
      </Box>
      <Typography component="p">
        You can control cookie settings through your browser preferences. However, disabling certain cookies
        may limit your ability to use some features of the Portal.
      </Typography>

      <SectionHeader id="dpp-7" title="7. Data Security Measures" />
      <Typography component="p">
        The Barangay implements comprehensive technical, organizational, and physical security measures to
        protect your personal data against unauthorized access, alteration, disclosure, or destruction.
        Our security framework includes:
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, color: 'grey.800', mt: 4, mb: 2 }}>
        7.1 Technical Safeguards
      </Typography>
      <Box component="ul">
        <li>
          <strong>Encryption:</strong> All data transmitted between your device and our servers is encrypted
          using industry-standard SSL/TLS 1.2 or higher protocols. Sensitive data stored in our databases is
          encrypted at rest using AES-256 encryption.
        </li>
        <li>
          <strong>Password Security:</strong> User passwords are salted and hashed using secure algorithms
          (bcrypt or Argon2) and are never stored in plain text. We enforce password complexity requirements
          and support multi-factor authentication.
        </li>
        <li>
          <strong>Network Security:</strong> Our infrastructure is protected by enterprise-grade firewalls,
          intrusion detection and prevention systems (IDS/IPS), and regular vulnerability assessments.
        </li>
        <li>
          <strong>Access Controls:</strong> We implement the principle of least privilege, ensuring that
          personnel have access only to the data necessary for their specific job functions.
        </li>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 600, color: 'grey.800', mt: 4, mb: 2 }}>
        7.2 Organizational Safeguards
      </Typography>
      <Box component="ul">
        <li>
          <strong>Role-Based Access Control (RBAC):</strong> Access to personal data is strictly controlled
          based on job responsibilities. The Barangay Captain cannot view your password. Health workers cannot
          access blotter records. Only authorized personnel have access to specific data modules.
        </li>
        <li>
          <strong>Data Privacy Training:</strong> All Barangay personnel with access to personal data undergo
          regular training on data privacy principles, security best practices, and their obligations under
          the Data Privacy Act.
        </li>
        <li>
          <strong>Confidentiality Agreements:</strong> All personnel and service providers with access to
          personal data are bound by confidentiality agreements and non-disclosure obligations.
        </li>
        <li>
          <strong>Audit Trails:</strong> All access to, viewing of, modification of, and deletion of personal
          data is logged with timestamps, user identification, and IP addresses. These logs are immutable and
          retained for audit purposes.
        </li>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 600, color: 'grey.800', mt: 4, mb: 2 }}>
        7.3 Physical Safeguards
      </Typography>
      <Box component="ul">
        <li>Secure facilities with controlled access for servers and data storage equipment</li>
        <li>Environmental controls to protect against fire, flood, and other physical threats</li>
        <li>Secure disposal procedures for physical documents containing personal data</li>
        <li>Backup systems and disaster recovery procedures</li>
      </Box>

      <SectionHeader id="dpp-8" title="8. Data Retention and Disposal" />
      <Typography component="p">
        We retain your personal data only for as long as necessary to fulfill the purposes for which it was
        collected, comply with legal obligations, resolve disputes, and enforce our agreements. Our retention
        periods are as follows:
      </Typography>
      <Box component="ul">
        <li>
          <strong>Active Account Data:</strong> Retained for the duration of your account&apos;s active status
          and for five (5) years following account closure or last activity.
        </li>
        <li>
          <strong>Inactive Account Data:</strong> Accounts with no activity for five (5) consecutive years
          are archived. Archived data is retained for an additional five (5) years before permanent deletion.
        </li>
        <li>
          <strong>Transaction and Financial Records:</strong> Retained for a minimum of ten (10) years as
          required by Commission on Audit regulations and the National Archives of the Philippines guidelines.
        </li>
        <li>
          <strong>Blotter and Legal Records:</strong> Retained indefinitely as permanent public records of
          the Barangay Justice System. These records may be required for future legal proceedings, clearance
          verification, or historical reference.
        </li>
        <li>
          <strong>Authentication and Security Logs:</strong> Retained for a minimum of three (3) years for
          security auditing and forensic purposes.
        </li>
        <li>
          <strong>Backup Data:</strong> Backup copies are retained in accordance with our disaster recovery
          procedures and are securely destroyed when no longer needed.
        </li>
      </Box>
      <Typography component="p">
        <strong>Secure Disposal:</strong> When personal data is no longer required, it is disposed of securely.
        Physical records are destroyed via cross-cut shredding, pulping, or incineration. Digital records are
        securely wiped using industry-standard data erasure methods (e.g., DoD 5220.22-M standard or cryptographic
        erasure) to ensure they cannot be recovered.
      </Typography>

      <SectionHeader id="dpp-9" title="9. Your Rights and Choices" />
      <Typography component="p">
        Under the Data Privacy Act of 2012, you are entitled to the following rights with respect to your
        personal data. You may exercise these rights by contacting our Data Protection Officer:
      </Typography>
      <Box component="ul">
        <li>
          <strong>Right to Be Informed:</strong> You have the right to be informed about the collection,
          processing, and storage of your personal data before or at the time of collection. This Privacy
          Policy serves to fulfill this right.
        </li>
        <li>
          <strong>Right to Access:</strong> You have the right to request access to your personal data that
          we hold, including information about how it is being processed. You may request a copy of your
          personal data in a commonly used electronic format.
        </li>
        <li>
          <strong>Right to Object:</strong> You have the right to object to the processing of your personal
          data, including processing for direct marketing, automated processing, or profiling. However,
          objecting to the processing of data required for government services may prevent us from providing
          those services to you.
        </li>
        <li>
          <strong>Right to Erasure or Blocking:</strong> You have the right to request the deletion, removal,
          or blocking of your personal data if it is incomplete, outdated, false, unlawfully obtained, used
          for unauthorized purposes, or no longer necessary for the purpose for which it was collected.
          This right is subject to legal retention requirements.
        </li>
        <li>
          <strong>Right to Rectification:</strong> You have the right to dispute and request correction of
          any inaccurate or erroneous personal data. We will rectify such data promptly upon verification.
        </li>
        <li>
          <strong>Right to Data Portability:</strong> You have the right to obtain a copy of your personal
          data in a structured, commonly used, and machine-readable format, and to have such data transmitted
          to another controller where technically feasible.
        </li>
        <li>
          <strong>Right to Damages:</strong> You have the right to be indemnified for any damages sustained
          due to inaccurate, incomplete, outdated, false, unlawfully obtained, or unauthorized use of your
          personal data.
        </li>
        <li>
          <strong>Right to File a Complaint:</strong> You have the right to lodge a complaint with the
          National Privacy Commission if you believe your data privacy rights have been violated.
        </li>
      </Box>
      <Typography component="p">
        <strong>Limitations:</strong> Certain rights may be limited where we have overriding legitimate grounds
        for processing, where processing is necessary for the establishment, exercise, or defense of legal
        claims, or where we are required by law to retain or process the data.
      </Typography>

      <SectionHeader id="dpp-10" title="10. Children&apos;s Privacy" />
      <Typography component="p">
        The Portal is not intended for children under thirteen (13) years of age, and we do not knowingly
        collect personal information from children under 13. If you are under 13, you may not create an
        Account or provide personal information through the Portal.
      </Typography>
      <Typography component="p">
        For children between thirteen (13) and seventeen (17) years of age, parental or guardian consent is
        required before registration and use of the Portal. Parents or guardians are responsible for
        supervising their children&apos;s use of the Portal and for ensuring that any information provided is
        accurate.
      </Typography>
      <Typography component="p">
        If we become aware that we have collected personal information from a child under 13 without parental
        consent, we will take steps to delete such information as soon as possible. If you believe we have
        collected information from a child under 13, please contact our Data Protection Officer immediately.
      </Typography>

      <SectionHeader id="dpp-11" title="11. International Data Transfers" />
      <Typography component="p">
        Your personal data is primarily stored and processed within the Republic of the Philippines. However,
        in certain circumstances, your data may be transferred to, stored in, or processed in other countries
        where our service providers or cloud infrastructure are located.
      </Typography>
      <Typography component="p">
        When transferring data outside the Philippines, we ensure that adequate safeguards are in place to
        protect your personal data in accordance with the Data Privacy Act, including:
      </Typography>
      <Box component="ul">
        <li>Contractual clauses requiring recipients to protect personal data to standards equivalent to Philippine law</li>
        <li>Selection of service providers in countries with adequate data protection frameworks</li>
        <li>Obtaining your explicit consent for cross-border transfers where required</li>
        <li>Implementing technical measures such as encryption to protect data during transfer</li>
      </Box>

      <SectionHeader id="dpp-12" title="12. Data Breach Notification" />
      <Typography component="p">
        In the event of a personal data breach that is likely to result in a risk to your rights and freedoms,
        the Barangay will follow the breach notification procedures mandated by NPC Circular 16-03:
      </Typography>
      <Box component="ol">
        <li>
          <strong>Immediate Response:</strong> Upon discovery of a potential breach, our incident response
          team will immediately assess the situation, contain the breach, and begin investigation.
        </li>
        <li>
          <strong>NPC Notification:</strong> We will notify the National Privacy Commission within seventy-two
          (72) hours of becoming aware of a breach that meets the notification threshold, providing details
          about the nature of the breach, categories of data affected, and measures taken.
        </li>
        <li>
          <strong>Data Subject Notification:</strong> If the breach is likely to result in a high risk to your
          rights and freedoms, we will notify you without undue delay, informing you of the nature of the
          breach and steps you should take to protect yourself.
        </li>
        <li>
          <strong>Mitigation and Remediation:</strong> We will implement immediate measures to mitigate harm,
          such as resetting passwords, patching vulnerabilities, enhancing monitoring, and preventing recurrence.
        </li>
        <li>
          <strong>Documentation:</strong> All breaches, regardless of whether they meet the notification
          threshold, are documented and reviewed to improve our security measures.
        </li>
      </Box>

      <SectionHeader id="dpp-13" title="13. Changes to This Privacy Policy" />
      <Typography component="p">
        We may update this Privacy Policy from time to time to reflect changes in our practices, technologies,
        legal requirements, or other factors. When we make material changes to this Policy, we will:
      </Typography>
      <Box component="ul">
        <li>Post the updated Policy on the Portal with a new &quot;Last Revised&quot; date</li>
        <li>Notify you through prominent notice on the Portal or via email if you have an Account</li>
        <li>Obtain your consent to material changes where required by law</li>
      </Box>
      <Typography component="p">
        We encourage you to review this Policy periodically to stay informed about our data practices. Your
        continued use of the Portal after the posting of changes constitutes your acceptance of such changes.
      </Typography>

      <SectionHeader id="dpp-14" title="14. Contact Information and Data Protection Officer" />
      <Typography component="p">
        For any questions, concerns, or requests regarding this Privacy Policy or our data practices, or to
        exercise your data subject rights, please contact our designated Data Protection Officer:
      </Typography>

      {/* DPO Contact Box */}
      <Paper
        elevation={0}
        sx={{
          mt: 4,
          p: 4,
          backgroundColor: '#f8fafc',
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'grey.200',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'grey.900', mb: 1 }}>
          Data Protection Officer (DPO)
        </Typography>
        <Typography variant="body2" sx={{ color: 'grey.600', mb: 3 }}>
          For privacy concerns, data access requests, rectification requests, erasure requests, or to exercise
          any of your data subject rights under the Data Privacy Act of 2012, please contact our designated DPO:
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <PersonIcon sx={{ color: 'grey.500', fontSize: 20 }} />
            <Typography variant="body2">
              <strong>Data Protection Officer:</strong> Office of the Barangay Secretary
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <EmailIcon sx={{ color: 'grey.500', fontSize: 20 }} />
            <Typography variant="body2">
              <strong>Email:</strong> dpo@brgyupcampus.gov.ph
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <PhoneIcon sx={{ color: 'grey.500', fontSize: 20 }} />
            <Typography variant="body2">
              <strong>Telephone:</strong> (02) 8981-8500 local 101
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <BusinessIcon sx={{ color: 'grey.500', fontSize: 20 }} />
            <Typography variant="body2">
              <strong>Office Address:</strong> Barangay Hall, Barangay U.P. Campus, Diliman, Quezon City 1101
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <SecurityIcon sx={{ color: 'grey.500', fontSize: 20 }} />
            <Typography variant="body2">
              <strong>NPC Registration No.:</strong> PIC-BUC-2025-12345
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" sx={{ color: 'grey.600' }}>
          <strong>National Privacy Commission:</strong> If you are not satisfied with our response or believe
          your data privacy rights have been violated, you may lodge a complaint with the National Privacy
          Commission at 5th Floor, Philippine International Convention Center (PICC), Roxas Boulevard, Pasay City,
          Philippines 1307. Website: <a href="https://privacy.gov.ph" target="_blank" rel="noopener noreferrer"
          style={{ color: '#228B22' }}>https://privacy.gov.ph</a>
        </Typography>
      </Paper>
    </Box>
  );
}

// Section Header Component
function SectionHeader({ id, title }: { id: string; title: string }) {
  return (
    <Typography
      id={id}
      variant="h5"
      className="section-header"
      sx={{
        fontWeight: 700,
        color: 'grey.800',
        mt: 6,
        mb: 2,
        scrollMarginTop: '120px',
        fontFamily: 'Georgia, serif',
      }}
    >
      {title}
    </Typography>
  );
}
