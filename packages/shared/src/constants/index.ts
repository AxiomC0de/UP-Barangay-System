/**
 * Barangay U.P. Campus Districts (Areas 1-18)
 */
export const DISTRICTS = [
  'Area 1',
  'Area 2',
  'Area 3',
  'Area 4',
  'Area 5',
  'Area 6',
  'Area 7',
  'Area 8',
  'Area 9',
  'Area 10',
  'Area 11',
  'Area 12',
  'Area 13',
  'Area 14',
  'Area 15',
  'Area 16',
  'Area 17',
  'Area 18',
] as const;

export type District = (typeof DISTRICTS)[number];

/**
 * Sectoral Groups for user classification
 */
export const SECTORAL_GROUPS = [
  'Student',
  'Solo Parent',
  'Mother',
  'Senior Citizen',
  'PWD (Person with Disability)',
  'Worker/Employee',
  'Business Owner',
  'Unemployed',
  'OFW Dependent',
  'Others',
] as const;

export type SectoralGroup = (typeof SECTORAL_GROUPS)[number];

/**
 * Sectoral groups that require at least 1 family member
 */
export const PARENT_SECTORAL_GROUPS: SectoralGroup[] = [
  'Solo Parent',
  'Mother',
];

/**
 * Occupation options
 */
export const OCCUPATIONS = [
  'Student',
  'Government Employee',
  'Private Employee',
  'Self-employed/Business Owner',
  'Freelancer',
  'Healthcare Worker',
  'Teacher/Educator',
  'OFW (Overseas Filipino Worker)',
  'Retired',
  'Homemaker',
  'Unemployed',
  'Others',
] as const;

export type Occupation = (typeof OCCUPATIONS)[number];

/**
 * Family member relationships
 */
export const RELATIONSHIPS = [
  'Spouse/Partner',
  'Child',
  'Parent',
  'Sibling',
  'Grandparent',
  'Grandchild',
  'In-law',
  'Other Relative',
  'Non-relative',
] as const;

export type Relationship = (typeof RELATIONSHIPS)[number];

/**
 * Residency types
 */
export const RESIDENCY_TYPES = [
  'Owner',
  'Renter',
  'Boarder',
  'Family Member',
] as const;

export type ResidencyType = (typeof RESIDENCY_TYPES)[number];

/**
 * User roles
 */
export const USER_ROLES = ['USER', 'MODERATOR', 'ADMIN'] as const;

export type UserRole = (typeof USER_ROLES)[number];

/**
 * Gender options
 */
export const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'] as const;

export type Gender = (typeof GENDERS)[number];

/**
 * Living situation options
 */
export const LIVING_SITUATIONS = ['family', 'non-family', 'alone'] as const;

export type LivingSituation = (typeof LIVING_SITUATIONS)[number];

/**
 * Name suffixes
 */
export const SUFFIXES = ['Jr.', 'Sr.', 'II', 'III', 'IV', 'V'] as const;

export type Suffix = (typeof SUFFIXES)[number];

/**
 * Concern priorities
 */
export const CONCERN_PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'] as const;

export type ConcernPriority = (typeof CONCERN_PRIORITIES)[number];

/**
 * Concern statuses
 */
export const CONCERN_STATUSES = [
  'Submitted',
  'Under Review',
  'Resolved',
] as const;

export type ConcernStatus = (typeof CONCERN_STATUSES)[number];

/**
 * Audit log action types
 */
export const AUDIT_ACTION_TYPES = [
  'user_registered',
  'user_updated',
  'role_changed',
  'concern_created',
  'concern_updated',
  'status_update',
  'announcement_posted',
  'announcement_updated',
  'announcement_deleted',
  'suggestion_posted',
  'household_member_added',
  'household_member_updated',
] as const;

export type AuditActionType = (typeof AUDIT_ACTION_TYPES)[number];

/**
 * Audit log resource types
 */
export const AUDIT_RESOURCE_TYPES = [
  'user',
  'concern',
  'announcement',
  'suggestion',
  'household_member',
  'category',
  'template',
] as const;

export type AuditResourceType = (typeof AUDIT_RESOURCE_TYPES)[number];

/**
 * Business rule constants
 */
export const BUSINESS_RULES = {
  /** Maximum images per concern */
  MAX_IMAGES_PER_CONCERN: 3,
  /** Maximum file size per image in bytes (5MB) */
  MAX_IMAGE_SIZE_BYTES: 5 * 1024 * 1024,
  /** Allowed image formats */
  ALLOWED_IMAGE_FORMATS: ['image/jpeg', 'image/png', 'image/webp'],
  /** Maximum concerns per day per user */
  MAX_CONCERNS_PER_DAY: 5,
  /** Address change cooldown in days */
  ADDRESS_CHANGE_COOLDOWN_DAYS: 30,
  /** Household member edit cooldown in days */
  HOUSEHOLD_MEMBER_EDIT_COOLDOWN_DAYS: 12,
  /** Maximum household members */
  MAX_HOUSEHOLD_MEMBERS: 50,
  /** Minimum password length */
  MIN_PASSWORD_LENGTH: 8,
} as const;
