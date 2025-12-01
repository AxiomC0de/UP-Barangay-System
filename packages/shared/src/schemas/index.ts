import { z } from 'zod';
import {
  GENDERS,
  SUFFIXES,
  SECTORAL_GROUPS,
  OCCUPATIONS,
  DISTRICTS,
  RESIDENCY_TYPES,
  RELATIONSHIPS,
  CONCERN_PRIORITIES,
  CONCERN_STATUSES,
  BUSINESS_RULES,
} from '../constants';

/**
 * Password validation schema
 */
export const passwordSchema = z
  .string()
  .min(
    BUSINESS_RULES.MIN_PASSWORD_LENGTH,
    `Password must be at least ${BUSINESS_RULES.MIN_PASSWORD_LENGTH} characters`
  )
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

/**
 * Email validation schema
 */
export const emailSchema = z.string().email('Please enter a valid email address');

/**
 * Phone number validation schema (Philippine format)
 */
export const phoneSchema = z
  .string()
  .min(10, 'Please enter a valid phone number')
  .regex(
    /^(\+63|0)?[0-9]{10,11}$/,
    'Please enter a valid Philippine phone number'
  );

/**
 * User registration form schema
 */
export const userRegistrationSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    middle_name: z.string().optional(),
    suffix: z.enum(SUFFIXES).optional(),
    birthdate: z.string().min(1, 'Birthdate is required'),
    gender: z.enum(GENDERS, { required_error: 'Gender is required' }),
    contact_number: phoneSchema,
    occupation: z.enum(OCCUPATIONS, { required_error: 'Occupation is required' }),
    occupation_other: z.string().optional(),
    sectoral_group: z.enum(SECTORAL_GROUPS, {
      required_error: 'Sectoral group is required',
    }),
    sectoral_group_other: z.string().optional(),
    address_area: z.enum(DISTRICTS, { required_error: 'Area is required' }),
    address_block: z.string().min(1, 'Block/Street is required'),
    address_unit: z.string().optional(),
    residency_type: z.enum(RESIDENCY_TYPES, {
      required_error: 'Residency type is required',
    }),
    agree_terms: z.literal(true, {
      errorMap: () => ({
        message: 'You must agree to the Terms of Service and Privacy Policy',
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .refine(
    (data) =>
      data.occupation !== 'Others' ||
      (data.occupation_other && data.occupation_other.length > 0),
    {
      message: 'Please specify your occupation',
      path: ['occupation_other'],
    }
  )
  .refine(
    (data) =>
      data.sectoral_group !== 'Others' ||
      (data.sectoral_group_other && data.sectoral_group_other.length > 0),
    {
      message: 'Please specify your sectoral group',
      path: ['sectoral_group_other'],
    }
  );

export type UserRegistrationInput = z.infer<typeof userRegistrationSchema>;

/**
 * User login form schema
 */
export const userLoginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});

export type UserLoginInput = z.infer<typeof userLoginSchema>;

/**
 * Family member schema
 */
export const familyMemberSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  relationship: z.enum(RELATIONSHIPS, {
    required_error: 'Relationship is required',
  }),
  birthdate: z.string().min(1, 'Birthdate is required'),
  occupation: z.string().optional(),
  is_dependent: z.boolean().default(true),
});

export type FamilyMemberInput = z.infer<typeof familyMemberSchema>;

/**
 * Family members array schema (for registration with parent sectoral groups)
 */
export const familyMembersSchema = z.array(familyMemberSchema);

/**
 * Concern submission schema
 */
export const concernSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must not exceed 200 characters'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(5000, 'Description must not exceed 5000 characters'),
  category: z.string().min(1, 'Category is required'),
  priority: z.enum(CONCERN_PRIORITIES).default('Medium'),
  template_used: z.string().optional(),
});

export type ConcernInput = z.infer<typeof concernSchema>;

/**
 * Concern status update schema (for admins/moderators)
 */
export const concernStatusUpdateSchema = z.object({
  status: z.enum(CONCERN_STATUSES),
  admin_notes: z.string().optional(),
});

export type ConcernStatusUpdateInput = z.infer<typeof concernStatusUpdateSchema>;

/**
 * Announcement schema
 */
export const announcementSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must not exceed 200 characters'),
  content: z
    .string()
    .min(10, 'Content must be at least 10 characters')
    .max(10000, 'Content must not exceed 10000 characters'),
  expires_at: z.string().optional(),
});

export type AnnouncementInput = z.infer<typeof announcementSchema>;

/**
 * Suggestion schema
 */
export const suggestionSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must not exceed 200 characters'),
  description: z
    .string()
    .min(20, 'Description must be at least 20 characters')
    .max(5000, 'Description must not exceed 5000 characters'),
});

export type SuggestionInput = z.infer<typeof suggestionSchema>;

/**
 * Concern category schema (for admins)
 */
export const concernCategorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  description: z.string().optional(),
});

export type ConcernCategoryInput = z.infer<typeof concernCategorySchema>;

/**
 * Concern template schema (for admins)
 */
export const concernTemplateSchema = z.object({
  name: z.string().min(2, 'Template name is required'),
  title_template: z.string().min(5, 'Title template is required'),
  description_template: z.string().min(10, 'Description template is required'),
  default_category: z.string().min(1, 'Default category is required'),
  default_priority: z.enum(CONCERN_PRIORITIES).default('Medium'),
});

export type ConcernTemplateInput = z.infer<typeof concernTemplateSchema>;

/**
 * User profile update schema
 */
export const userProfileUpdateSchema = z.object({
  contact_number: phoneSchema.optional(),
  occupation: z.enum(OCCUPATIONS).optional(),
  occupation_other: z.string().optional(),
  address_area: z.enum(DISTRICTS).optional(),
  address_block: z.string().optional(),
  address_unit: z.string().optional(),
  residency_type: z.enum(RESIDENCY_TYPES).optional(),
});

export type UserProfileUpdateInput = z.infer<typeof userProfileUpdateSchema>;
