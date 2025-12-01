'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Link from 'next/link';
import {
  DISTRICTS,
  GENDERS,
  SUFFIXES,
  OCCUPATIONS,
  SECTORAL_GROUPS,
  RESIDENCY_TYPES,
  RELATIONSHIPS,
} from '@barangay/shared';

interface HouseholdMember {
  name: string;
  birthdate: string;
  relationship: string;
  occupation: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    middle_name: '',
    suffix: '',
    birthdate: '',
    gender: '',
    contact_number: '',
    email: '',
    occupation: '',
    occupation_other: '',
    sectoral_group: '',
    sectoral_group_other: '',
    address_area: '',
    address_block: '',
    address_unit: '',
    residency_type: '',
    password: '',
    confirmPassword: '',
    agree_terms: false,
    living_with_family: '',
    household_count: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [householdMembers, setHouseholdMembers] = useState<HouseholdMember[]>([]);
  const [customHouseholdCount, setCustomHouseholdCount] = useState('');

  const handleHouseholdCountChange = (count: string) => {
    setFormData((prev) => ({ ...prev, household_count: count }));
    
    if (count === 'other') {
      // Don't change members yet, wait for custom input
      return;
    }
    
    const numCount = parseInt(count) || 0;
    
    // Adjust household members array based on count
    if (numCount > householdMembers.length) {
      const newMembers = Array(numCount - householdMembers.length)
        .fill(null)
        .map(() => ({ name: '', birthdate: '', relationship: '', occupation: '' }));
      setHouseholdMembers([...householdMembers, ...newMembers]);
    } else if (numCount < householdMembers.length) {
      setHouseholdMembers(householdMembers.slice(0, numCount));
    }
  };

  const handleCustomHouseholdCount = (value: string) => {
    setCustomHouseholdCount(value);
    const numCount = parseInt(value) || 0;
    
    if (numCount > 0 && numCount <= 50) {
      if (numCount > householdMembers.length) {
        const newMembers = Array(numCount - householdMembers.length)
          .fill(null)
          .map(() => ({ name: '', birthdate: '', relationship: '', occupation: '' }));
        setHouseholdMembers([...householdMembers, ...newMembers]);
      } else if (numCount < householdMembers.length) {
        setHouseholdMembers(householdMembers.slice(0, numCount));
      }
    } else if (numCount === 0 || value === '') {
      setHouseholdMembers([]);
    }
  };

  const handleHouseholdMemberChange = (
    index: number,
    field: keyof HouseholdMember,
    value: string
  ) => {
    const updated = [...householdMembers];
    updated[index][field] = value;
    setHouseholdMembers(updated);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, agree_terms: e.target.checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual registration
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    alert('Registration functionality coming soon!');
  };

  const SectionHeader = ({ number, title }: { number: number; title: string }) => (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1.5, 
        mb: 2.5, 
        mt: number > 1 ? 3 : 0,
        pb: 1.5,
        borderBottom: '2px solid',
        borderColor: 'rgba(34, 139, 34, 0.2)',
      }}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: '#228B22',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.875rem',
          fontWeight: 600,
          boxShadow: '0 2px 4px rgba(34, 139, 34, 0.3)',
        }}
      >
        {number}
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600, color: '#1e293b' }}>
        {title}
      </Typography>
    </Box>
  );

  const FieldLabel = ({ children, required = false }: { children: React.ReactNode; required?: boolean }) => (
    <Typography
      variant="caption"
      sx={{
        fontWeight: 600,
        color: 'text.secondary',
        mb: 0.5,
        display: 'block',
      }}
    >
      {children}
      {required && <span style={{ color: '#ef4444' }}> *</span>}
    </Typography>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      {/* Left Panel - Image Section (Fixed) */}
      <Box
        sx={{
          flex: { xs: 'none', md: '0 0 40%', lg: '0 0 45%' },
          minHeight: { xs: '180px', md: '100vh' },
          position: { xs: 'relative', md: 'fixed' },
          top: 0,
          left: 0,
          width: { md: '40%', lg: '45%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: { xs: 3, md: 4, lg: 5 },
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
            backgroundImage: 'url(/images/showcase/aerial_campus.png)',
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
              fontSize: { md: '2rem', lg: '2.5rem', xl: '3rem' },
              lineHeight: 1.2,
              mb: 3,
            }}
          >
            Join Our
            <br />
            Community
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.8,
              fontSize: { md: '0.95rem', lg: '1rem' },
              maxWidth: 380,
              mb: 3,
            }}
          >
            Register as a resident to access online barangay services, file reports, and stay updated with community announcements.
          </Typography>

          {/* Quote */}
          <Box
            sx={{
              borderLeft: '3px solid #FFD700',
              pl: 2,
              py: 1,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: '#FFD700',
                fontStyle: 'italic',
                fontSize: '0.85rem',
                lineHeight: 1.6,
              }}
            >
              &ldquo;Malinis, Maaliwalas, Maayos, Maliwanag at Magandang mga Barangay ng Lungsod Quezon&rdquo;
            </Typography>
          </Box>
        </Box>

        {/* Bottom - Copyright and Sign In */}
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
            Already have an account?{' '}
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

      {/* Right Panel - Registration Form (Scrollable) */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#fafafa',
          ml: { xs: 0, md: '40%', lg: '45%' },
          minHeight: { xs: 'auto', md: '100vh' },
          overflowY: 'auto',
          // Hide scrollbar but keep functionality
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
          '&::-webkit-scrollbar': {
            display: 'none', // Chrome, Safari, Opera
          },
        }}
      >
        <Box
          sx={{
            maxWidth: 700,
            mx: 'auto',
            p: { xs: 3, sm: 4, md: 5 },
          }}
        >
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}
            >
              Resident Registration
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary' }}
            >
              Fill out the form below to create your account. Fields marked with * are required.
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
          {/* Section 1: Personal Information */}
          <SectionHeader number={1} title="Personal Information" />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <Box>
              <FieldLabel required>First Name</FieldLabel>
              <TextField
                fullWidth
                name="first_name"
                placeholder="Juan"
                value={formData.first_name}
                onChange={handleChange}
                required
                size="small"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
              />
            </Box>
            <Box>
              <FieldLabel required>Last Name</FieldLabel>
              <TextField
                fullWidth
                name="last_name"
                placeholder="Dela Cruz"
                value={formData.last_name}
                onChange={handleChange}
                required
                size="small"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
              />
            </Box>
            <Box>
              <FieldLabel>Middle Name</FieldLabel>
              <TextField
                fullWidth
                name="middle_name"
                placeholder="Santos"
                value={formData.middle_name}
                onChange={handleChange}
                size="small"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
              />
            </Box>
            <Box>
              <FieldLabel>Suffix</FieldLabel>
              <FormControl fullWidth size="small">
                <Select
                  value={formData.suffix}
                  onChange={(e) => handleSelectChange('suffix', e.target.value)}
                  displayEmpty
                  sx={{ borderRadius: 1.5 }}
                  MenuProps={{ disableScrollLock: true }}
                >
                  <MenuItem value="">None</MenuItem>
                  {SUFFIXES.map((suffix) => (
                    <MenuItem key={suffix} value={suffix}>
                      {suffix}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FieldLabel required>Birthdate</FieldLabel>
              <TextField
                fullWidth
                name="birthdate"
                type="date"
                value={formData.birthdate}
                onChange={handleChange}
                required
                size="small"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
              />
            </Box>
            <Box>
              <FieldLabel required>Gender</FieldLabel>
              <FormControl fullWidth size="small">
                <Select
                  value={formData.gender}
                  onChange={(e) => handleSelectChange('gender', e.target.value)}
                  displayEmpty
                  required
                  sx={{ borderRadius: 1.5 }}
                  MenuProps={{ disableScrollLock: true }}
                >
                  <MenuItem value="" disabled>Select Gender</MenuItem>
                  {GENDERS.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FieldLabel required>Occupation</FieldLabel>
              <FormControl fullWidth size="small">
                <Select
                  value={formData.occupation}
                  onChange={(e) => handleSelectChange('occupation', e.target.value)}
                  displayEmpty
                  required
                  sx={{ borderRadius: 1.5 }}
                  MenuProps={{ disableScrollLock: true }}
                >
                  <MenuItem value="" disabled>Select Occupation</MenuItem>
                  {OCCUPATIONS.map((occupation) => (
                    <MenuItem key={occupation} value={occupation}>
                      {occupation}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FieldLabel required>Sectoral Group</FieldLabel>
              <FormControl fullWidth size="small">
                <Select
                  value={formData.sectoral_group}
                  onChange={(e) => handleSelectChange('sectoral_group', e.target.value)}
                  displayEmpty
                  required
                  sx={{ borderRadius: 1.5 }}
                  MenuProps={{ disableScrollLock: true }}
                >
                  <MenuItem value="" disabled>Select Sectoral Group</MenuItem>
                  {SECTORAL_GROUPS.map((group) => (
                    <MenuItem key={group} value={group}>
                      {group}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            {formData.occupation === 'Others' && (
              <Box sx={{ gridColumn: { sm: '1 / -1' } }}>
                <FieldLabel required>Please specify your occupation</FieldLabel>
                <TextField
                  fullWidth
                  name="occupation_other"
                  placeholder="Enter your occupation"
                  value={formData.occupation_other}
                  onChange={handleChange}
                  required
                  size="small"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                />
              </Box>
            )}
            {formData.sectoral_group === 'Others' && (
              <Box sx={{ gridColumn: { sm: '1 / -1' } }}>
                <FieldLabel required>Please specify your sectoral group</FieldLabel>
                <TextField
                  fullWidth
                  name="sectoral_group_other"
                  placeholder="Enter your sectoral group"
                  value={formData.sectoral_group_other}
                  onChange={handleChange}
                  required
                  size="small"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                />
              </Box>
            )}
            
            {/* Living Situation Question */}
            <Box sx={{ gridColumn: { sm: '1 / -1' } }}>
              <FieldLabel required>Who do you live with?</FieldLabel>
              <FormControl fullWidth size="small">
                <Select
                  value={formData.living_with_family}
                  onChange={(e) => {
                    handleSelectChange('living_with_family', e.target.value);
                    // Reset household data when changing to alone
                    if (e.target.value === 'alone') {
                      setFormData((prev) => ({ ...prev, household_count: '' }));
                      setHouseholdMembers([]);
                      setCustomHouseholdCount('');
                    }
                  }}
                  displayEmpty
                  required
                  sx={{ borderRadius: 1.5 }}
                  MenuProps={{ disableScrollLock: true }}
                >
                  <MenuItem value="" disabled>Select an option</MenuItem>
                  <MenuItem value="family">With family members (spouse, children, parents, siblings, relatives)</MenuItem>
                  <MenuItem value="non-family">With non-family (roommates, friends, partner)</MenuItem>
                  <MenuItem value="alone">I live alone</MenuItem>
                </Select>
              </FormControl>
              <FormHelperText>
                Only include people sharing the same household unit with you, not other tenants in the building.
              </FormHelperText>
            </Box>
            
            {/* Household Count - Only show if living with others */}
            {(formData.living_with_family === 'family' || formData.living_with_family === 'non-family') && (
              <Box>
                <FieldLabel required>Number of People in Your Household</FieldLabel>
                <FormControl fullWidth size="small">
                  <Select
                    value={formData.household_count}
                    onChange={(e) => handleHouseholdCountChange(e.target.value)}
                    displayEmpty
                    required
                    sx={{ borderRadius: 1.5 }}
                    MenuProps={{ disableScrollLock: true }}
                  >
                    <MenuItem value="" disabled>Select number</MenuItem>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <MenuItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'person' : 'people'}
                      </MenuItem>
                    ))}
                    <MenuItem value="other">More than 10 (specify)</MenuItem>
                  </Select>
                </FormControl>
                <FormHelperText>People sharing your household unit, excluding yourself</FormHelperText>
              </Box>
            )}
            
            {/* Custom Household Count */}
            {(formData.living_with_family === 'family' || formData.living_with_family === 'non-family') && formData.household_count === 'other' && (
              <Box>
                <FieldLabel required>Specify Number</FieldLabel>
                <TextField
                  fullWidth
                  type="number"
                  placeholder="Enter number"
                  value={customHouseholdCount}
                  onChange={(e) => handleCustomHouseholdCount(e.target.value)}
                  inputProps={{ min: 1, max: 50 }}
                  size="small"
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                />
                <FormHelperText>Maximum of 50 members</FormHelperText>
              </Box>
            )}
          </Box>

          {/* Household Members Section */}
          {(formData.living_with_family === 'family' || formData.living_with_family === 'non-family') && householdMembers.length > 0 && (
            <Box
              sx={{
                mt: 3,
                p: 3,
                border: '1px solid',
                borderColor: 'grey.200',
                borderRadius: 2,
                backgroundColor: '#fafafa',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#228B22', mb: 0.5 }}>
                Household Members Information
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 3 }}>
                {formData.living_with_family === 'family' 
                  ? 'Please provide details for each family member living with you.'
                  : 'Please provide details for each person sharing your household unit (roommates, friends, partner).'}
              </Typography>

              {householdMembers.map((member, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    mb: 2,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'grey.200',
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#228B22', mb: 2, display: 'block' }}>
                    Member {index + 1}
                  </Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                      gap: 2,
                    }}
                  >
                    <Box>
                      <FieldLabel required>Full Name</FieldLabel>
                      <TextField
                        fullWidth
                        placeholder="e.g. Maria Dela Cruz"
                        value={member.name}
                        onChange={(e) => handleHouseholdMemberChange(index, 'name', e.target.value)}
                        required
                        size="small"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                      />
                    </Box>
                    <Box>
                      <FieldLabel required>Relationship</FieldLabel>
                      <FormControl fullWidth size="small">
                        <Select
                          value={member.relationship}
                          onChange={(e) => handleHouseholdMemberChange(index, 'relationship', e.target.value)}
                          displayEmpty
                          required
                          sx={{ borderRadius: 1.5 }}
                          MenuProps={{ disableScrollLock: true }}
                        >
                          <MenuItem value="" disabled>Select Relationship</MenuItem>
                          {RELATIONSHIPS.map((rel) => (
                            <MenuItem key={rel} value={rel}>
                              {rel}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <FieldLabel required>Birthdate</FieldLabel>
                      <TextField
                        fullWidth
                        type="date"
                        value={member.birthdate}
                        onChange={(e) => handleHouseholdMemberChange(index, 'birthdate', e.target.value)}
                        required
                        size="small"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
                      />
                    </Box>
                    <Box>
                      <FieldLabel required>Occupation</FieldLabel>
                      <FormControl fullWidth size="small">
                        <Select
                          value={member.occupation}
                          onChange={(e) => handleHouseholdMemberChange(index, 'occupation', e.target.value)}
                          displayEmpty
                          required
                          sx={{ borderRadius: 1.5 }}
                          MenuProps={{ disableScrollLock: true }}
                        >
                          <MenuItem value="" disabled>Select Occupation</MenuItem>
                          {OCCUPATIONS.map((occ) => (
                            <MenuItem key={occ} value={occ}>
                              {occ}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {/* Section 2: Address & Contact */}
          <SectionHeader number={2} title="Address & Contact" />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <Box sx={{ gridColumn: { sm: '1 / -1' } }}>
              <FieldLabel required>Purok / Zone</FieldLabel>
              <FormControl fullWidth size="small">
                <Select
                  value={formData.address_area}
                  onChange={(e) => handleSelectChange('address_area', e.target.value)}
                  displayEmpty
                  required
                  sx={{ borderRadius: 1.5 }}
                  MenuProps={{ disableScrollLock: true }}
                >
                  <MenuItem value="" disabled>Select your Area</MenuItem>
                  {DISTRICTS.map((district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ gridColumn: { sm: '1 / -1' } }}>
              <FieldLabel required>Street Address / House No.</FieldLabel>
              <TextField
                fullWidth
                name="address_block"
                placeholder="e.g. #123 Laurel Avenue"
                value={formData.address_block}
                onChange={handleChange}
                required
                size="small"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
              />
            </Box>
            <Box>
              <FieldLabel>Unit / Apartment (Optional)</FieldLabel>
              <TextField
                fullWidth
                name="address_unit"
                placeholder="e.g. Unit 4B"
                value={formData.address_unit}
                onChange={handleChange}
                size="small"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
              />
            </Box>
            <Box>
              <FieldLabel required>Residency Type</FieldLabel>
              <FormControl fullWidth size="small">
                <Select
                  value={formData.residency_type}
                  onChange={(e) => handleSelectChange('residency_type', e.target.value)}
                  displayEmpty
                  required
                  sx={{ borderRadius: 1.5 }}
                  MenuProps={{ disableScrollLock: true }}
                >
                  <MenuItem value="" disabled>Select Type</MenuItem>
                  {RESIDENCY_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FieldLabel required>Mobile Number</FieldLabel>
              <TextField
                fullWidth
                name="contact_number"
                placeholder="0912 345 6789"
                value={formData.contact_number}
                onChange={handleChange}
                required
                size="small"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
              />
            </Box>
            <Box>
              <FieldLabel required>Email Address</FieldLabel>
              <TextField
                fullWidth
                name="email"
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                size="small"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
              />
            </Box>
          </Box>

          {/* Section 3: Verification */}
          <SectionHeader number={3} title="Verification" />

          <Box
            sx={{
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: 2,
              p: 3,
              backgroundColor: '#fafafa',
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.5 }}>
              Upload Valid ID / Proof of Residency
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 2 }}>
              Accepted: <span style={{ color: '#228B22' }}>Voter&apos;s ID</span>, <span style={{ color: '#dc2626' }}>Driver&apos;s License</span>, <span style={{ color: '#ca8a04' }}>Utility Bill</span>, or <span style={{ color: '#16a34a' }}>Old Barangay ID</span>.
            </Typography>
            
            <Box
              sx={{
                width: '100%',
                border: '2px dashed',
                borderColor: 'grey.300',
                borderRadius: 2,
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backgroundColor: 'white',
                transition: 'all 0.2s',
                '&:hover': {
                  borderColor: '#228B22',
                  backgroundColor: 'rgba(34, 139, 34, 0.02)',
                },
              }}
              component="label"
            >
              <input
                type="file"
                accept="image/*,.pdf"
                hidden
                onChange={handleFileChange}
              />
              
              <CloudUploadIcon sx={{ fontSize: 32, color: 'grey.400', mb: 1 }} />
              
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                {uploadedFile ? (
                  <span style={{ color: '#16a34a', fontWeight: 600 }}>{uploadedFile.name}</span>
                ) : (
                  <>
                    <span style={{ color: '#228B22', fontWeight: 500 }}>Click to upload</span> or drag and drop
                  </>
                )}
              </Typography>
              
              <Typography variant="caption" sx={{ color: 'grey.400' }}>
                SVG, PNG, JPG (MAX. 5MB)
              </Typography>
            </Box>
          </Box>

          {/* Section 4: Account Security */}
          <SectionHeader number={4} title="Account Security" />

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <Box>
              <FieldLabel required>Password</FieldLabel>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
              />
              <FormHelperText>Min 8 chars, 1 uppercase, 1 number</FormHelperText>
            </Box>
            <Box>
              <FieldLabel required>Confirm Password</FieldLabel>
              <TextField
                fullWidth
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        size="small"
                      >
                        {showConfirmPassword ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 1.5 } }}
              />
            </Box>
          </Box>

          {/* Terms Agreement */}
          <Box sx={{ mt: 3 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agree_terms}
                  onChange={handleCheckboxChange}
                  size="small"
                  sx={{
                    '&.Mui-checked': {
                      color: '#228B22',
                    },
                  }}
                />
              }
              label={
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  I agree to the{' '}
                  <Link href="/terms-and-privacy" style={{ color: '#228B22', textDecoration: 'underline' }}>
                    Terms of Service & Data Privacy Policy
                  </Link>
                  .
                </Typography>
              }
            />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mt: 4, mb: 4 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !formData.agree_terms}
              sx={{
                px: 4,
                py: 1.25,
                borderRadius: 2,
                fontWeight: 600,
                backgroundColor: '#228B22',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#1a6b1a',
                },
              }}
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </Button>
            <Button
              component={Link}
              href="/login"
              variant="outlined"
              sx={{
                px: 4,
                py: 1.25,
                borderRadius: 2,
                fontWeight: 600,
                borderColor: 'grey.300',
                color: 'text.primary',
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'grey.400',
                  backgroundColor: 'grey.50',
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
        </Box>
      </Box>
    </Box>
  );
}
