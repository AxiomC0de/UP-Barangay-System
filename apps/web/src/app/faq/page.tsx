'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SearchIcon from '@mui/icons-material/Search';
import QuizIcon from '@mui/icons-material/Quiz';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PaymentIcon from '@mui/icons-material/Payment';
import ReportIcon from '@mui/icons-material/Report';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import { keyframes } from '@emotion/react';
import { Navbar, Footer } from '@/components';

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Categories with icons
const CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: QuizIcon },
  { id: 'documents', label: 'Documents', icon: DescriptionIcon },
  { id: 'account', label: 'Account', icon: AccountCircleIcon },
  { id: 'payments', label: 'Payments', icon: PaymentIcon },
  { id: 'blotter', label: 'Blotter & Complaints', icon: ReportIcon },
];

// FAQ Data organized by category
const FAQ_DATA = [
  {
    id: 'documents',
    category: 'Documents',
    questions: [
      {
        question: 'How do I request a Barangay Clearance online?',
        answer: 'To request a Barangay Clearance online, log in to your account, navigate to "Request Documents", select "Barangay Clearance", fill out the required information, upload necessary documents (valid ID, proof of residency), and submit your request. You will receive a notification once your clearance is ready for pickup.',
      },
      {
        question: 'What are the requirements for a Certificate of Indigency?',
        answer: 'For a Certificate of Indigency, you need: Valid government-issued ID, proof of residency (utility bill or lease contract), and a written request stating the purpose. Additional requirements may include proof of income or lack thereof. The certificate is typically used for medical, educational, or financial assistance applications.',
      },
      {
        question: 'How long does it take to process documents?',
        answer: 'Processing times vary by document type. Barangay Clearance: 1-2 business days. Certificate of Residency: 1-2 business days. Certificate of Indigency: 2-3 business days. Business Clearance: 3-5 business days. You will receive updates on your request status through the portal.',
      },
      {
        question: 'Can I track my document request status?',
        answer: 'Yes, you can track your document request status by logging into your account and visiting the "My Requests" section. You will see the current status of all your pending and completed requests, along with any additional instructions or requirements.',
      },
    ],
  },
  {
    id: 'account',
    category: 'Account',
    questions: [
      {
        question: 'Who can register on this website?',
        answer: 'Registration is open to all residents of Barangay U.P. Campus. To register, you must provide proof of residency within the barangay boundaries. Non-residents may have limited access to certain features and services.',
      },
      {
        question: 'My account is "Pending Verification". What does this mean?',
        answer: 'A "Pending Verification" status means your account registration is being reviewed by barangay staff. This process typically takes 1-3 business days. We verify your residency information and submitted documents. You will receive an email notification once your account is verified.',
      },
      {
        question: 'How do I reset my password?',
        answer: 'To reset your password, click "Forgot Password" on the login page, enter your registered email address, and follow the instructions sent to your email. If you do not receive the email, check your spam folder or contact our support team.',
      },
      {
        question: 'How do I update my profile information?',
        answer: 'To update your profile, log in to your account, go to "Profile Settings", and edit the information you wish to change. Some changes (like address) may require re-verification. Contact the barangay office if you need assistance.',
      },
    ],
  },
  {
    id: 'payments',
    category: 'Payments',
    questions: [
      {
        question: 'Can I pay for my documents online?',
        answer: 'Currently, online payment is being developed. For now, payments are made in person at the Barangay Hall when you pick up your documents. We accept cash payments. We will notify registered users once online payment becomes available.',
      },
      {
        question: 'How much do the certifications cost?',
        answer: 'Certification fees vary: Barangay Clearance: ₱50-100 (depending on purpose). Certificate of Residency: ₱50. Certificate of Indigency: Free. Business Clearance: ₱200-500 (depending on business type). Fees are subject to change. Please verify current rates at the Barangay Hall.',
      },
      {
        question: 'Are there any discounts available?',
        answer: 'Yes, discounts are available for senior citizens (20% discount), persons with disabilities (20% discount), and solo parents (as applicable). Please present your valid ID or supporting documents to avail of these discounts.',
      },
      {
        question: 'Can I get a refund if my request is denied?',
        answer: 'If your document request is denied before processing, you may be eligible for a refund. Please visit the Barangay Hall with your receipt and the denial notice to process your refund request. Processing fees are non-refundable.',
      },
    ],
  },
  {
    id: 'blotter',
    category: 'Blotter & Complaints',
    questions: [
      {
        question: 'How do I file a complaint (Blotter) online?',
        answer: 'To file a complaint online, log in to your account, go to "Report Concerns" or "File Blotter", fill out the incident report form with details including date, time, location, persons involved, and a description of the incident. You may also upload supporting evidence. A barangay official will contact you for follow-up.',
      },
      {
        question: 'Is my report confidential?',
        answer: 'Yes, all reports and complaints filed through our system are treated with confidentiality. Your personal information is protected and will only be shared with authorized barangay officials handling your case. However, for legal proceedings, certain information may need to be disclosed as required by law.',
      },
      {
        question: 'What happens after I file a complaint?',
        answer: 'After filing a complaint: 1) You receive a reference number for tracking. 2) A barangay official reviews your complaint within 24-48 hours. 3) You may be contacted for additional information. 4) Mediation or appropriate action is scheduled. 5) You receive updates on the resolution progress.',
      },
      {
        question: 'Can I withdraw my complaint?',
        answer: 'Yes, you may withdraw your complaint by submitting a written request to the Barangay Hall or through your online account. However, once mediation or legal proceedings have started, withdrawal may require additional procedures. Contact the barangay office for assistance.',
      },
    ],
  },
];

export default function FAQPage() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  // Filter FAQ data based on selected category and search query
  const getFilteredFAQData = () => {
    let questions = selectedCategory === 'all' 
      ? FAQ_DATA.flatMap(cat => cat.questions)
      : FAQ_DATA.find(cat => cat.id === selectedCategory)?.questions || [];
    
    if (searchQuery.trim()) {
      questions = questions.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return questions;
  };
  
  const filteredFAQData = getFilteredFAQData();

  return (
    <Box component="main">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '350px', md: '400px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            backgroundPosition: 'center',
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
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            color: 'white',
            px: 2,
            animation: `${fadeIn} 0.8s ease-out`,
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
              textShadow: '2px 4px 8px rgba(0,0,0,0.3)',
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '0.95rem', md: '1.1rem' },
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
              maxWidth: '550px',
              mx: 'auto',
              mb: 4,
            }}
          >
            Find answers to common questions about our barangay services
          </Typography>

          {/* Search Bar */}
          <Box sx={{ maxWidth: 500, mx: 'auto', animation: `${fadeInUp} 0.6s ease-out 0.3s both` }}>
            <TextField
              fullWidth
              placeholder="Search for a question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'grey.500' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'white',
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: 'transparent',
                  },
                  '&:hover fieldset': {
                    borderColor: '#228B22',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#228B22',
                  },
                },
                '& .MuiInputBase-input': {
                  py: 1.5,
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* FAQ Section with Sidebar */}
      <Box
        component="section"
        sx={{
          py: { xs: 4, md: 6 },
          backgroundColor: '#f5f7fa',
          minHeight: '60vh',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 3, md: 4 },
            }}
          >
            {/* Sidebar */}
            <Box
              sx={{
                width: { xs: '100%', md: '280px' },
                flexShrink: 0,
                animation: `${fadeInUp} 0.6s ease-out`,
                alignSelf: 'flex-start',
                position: { xs: 'static', md: 'sticky' },
                top: { md: 100 },
              }}
            >
              {/* Categories Card */}
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    px: 2.5,
                    py: 1.5,
                    backgroundColor: 'grey.50',
                    borderBottom: '1px solid',
                    borderColor: 'grey.200',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: 'text.secondary',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      fontSize: '0.75rem',
                    }}
                  >
                    Categories
                  </Typography>
                </Box>
                <List disablePadding>
                  {CATEGORIES.map((category) => {
                    const IconComponent = category.icon;
                    const isSelected = selectedCategory === category.id;
                    return (
                      <ListItemButton
                        key={category.id}
                        selected={isSelected}
                        onClick={() => setSelectedCategory(category.id)}
                        sx={{
                          py: 1.5,
                          px: 2.5,
                          borderLeft: '3px solid',
                          borderLeftColor: isSelected ? '#228B22' : 'transparent',
                          backgroundColor: isSelected ? 'rgba(34, 139, 34, 0.08)' : 'transparent',
                          '&:hover': {
                            backgroundColor: isSelected 
                              ? 'rgba(34, 139, 34, 0.12)' 
                              : 'grey.50',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <IconComponent
                            sx={{
                              fontSize: 20,
                              color: isSelected ? '#228B22' : 'grey.500',
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={category.label}
                          primaryTypographyProps={{
                            fontSize: '0.9rem',
                            fontWeight: isSelected ? 600 : 500,
                            color: isSelected ? '#228B22' : 'text.primary',
                          }}
                        />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Paper>

              {/* Need Help Card */}
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  p: 2.5,
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 1,
                    fontSize: '0.95rem',
                  }}
                >
                  Need immediate help?
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    mb: 2,
                    fontSize: '0.85rem',
                    lineHeight: 1.6,
                  }}
                >
                  Our barangay hall is open from 8:00 AM to 5:00 PM, Mondays to Fridays.
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 1.5,
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 18, color: '#d32f2f' }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#d32f2f',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                    }}
                  >
                    Emergency: 911 / Local Hotline
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <PhoneIcon sx={{ fontSize: 18, color: '#228B22' }} />
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#228B22',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                    }}
                  >
                    Barangay: 995 721 9867
                  </Typography>
                </Box>
              </Paper>
            </Box>

            {/* FAQ Content */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {filteredFAQData.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {filteredFAQData.map((faq, index) => {
                    const panelId = `panel-${index}`;
                    return (
                      <Accordion
                        key={index}
                        expanded={expanded === panelId}
                        onChange={handleChange(panelId)}
                        elevation={0}
                        disableGutters
                        sx={{
                          backgroundColor: 'white',
                          border: '1px solid',
                          borderColor: 'grey.200',
                          borderRadius: '8px !important',
                          overflow: 'hidden',
                          animation: `${fadeInUp} 0.5s ease-out ${index * 0.05}s both`,
                          '&::before': {
                            display: 'none',
                          },
                          '&.Mui-expanded': {
                            margin: 0,
                            borderColor: 'grey.300',
                          },
                        }}
                      >
                        <AccordionSummary
                          expandIcon={
                            <ExpandMoreIcon 
                              sx={{ 
                                color: 'grey.400',
                                fontSize: 22,
                              }} 
                            />
                          }
                          sx={{
                            px: 3,
                            py: 0.5,
                            minHeight: 64,
                            '&.Mui-expanded': {
                              minHeight: 64,
                            },
                            '& .MuiAccordionSummary-content': {
                              my: 1.5,
                            },
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 500,
                              fontSize: { xs: '0.9rem', md: '0.95rem' },
                              color: 'text.primary',
                              pr: 2,
                            }}
                          >
                            {faq.question}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails
                          sx={{
                            px: 3,
                            pb: 3,
                            pt: 0,
                            borderTop: '1px solid',
                            borderColor: 'grey.100',
                          }}
                        >
                          <Typography
                            sx={{
                              color: 'text.secondary',
                              fontSize: { xs: '0.875rem', md: '0.9rem' },
                              lineHeight: 1.8,
                              pt: 2,
                            }}
                          >
                            {faq.answer}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </Box>
              ) : (
                <Paper
                  elevation={0}
                  sx={{
                    textAlign: 'center',
                    py: 8,
                    px: 3,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    backgroundColor: 'white',
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: 'text.secondary', mb: 1 }}
                  >
                    No questions found
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Try selecting a different category
                  </Typography>
                </Paper>
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box
        component="section"
        sx={{
          py: { xs: 6, md: 8 },
          backgroundColor: 'white',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center', animation: `${fadeInUp} 0.6s ease-out` }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'text.primary',
              }}
            >
              Still have questions?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                mb: 4,
                fontSize: { xs: '0.95rem', md: '1rem' },
              }}
            >
              Can&apos;t find the answer you&apos;re looking for? You can reach out to our support team.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component="a"
                href="mailto:barangay.upcampus@gmail.com"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  backgroundColor: '#228B22',
                  color: 'white',
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#1a6b1a',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(34, 139, 34, 0.3)',
                  },
                }}
              >
                <EmailIcon sx={{ fontSize: 20 }} />
                Contact Support
              </Box>
              <Box
                component="a"
                href="https://web.facebook.com/brgyupcampusqc"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  backgroundColor: 'white',
                  color: '#1877f2',
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  border: '1px solid',
                  borderColor: 'grey.300',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                    borderColor: '#1877f2',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 12px rgba(24, 119, 242, 0.2)',
                  },
                }}
              >
                <FacebookIcon sx={{ fontSize: 20 }} />
                Message on FB
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
