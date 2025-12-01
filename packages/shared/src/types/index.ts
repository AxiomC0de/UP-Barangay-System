/**
 * Database type definitions for Supabase
 * These types mirror the database schema
 */

import type {
  UserRole,
  Gender,
  Suffix,
  SectoralGroup,
  Occupation,
  ResidencyType,
  District,
  Relationship,
  ConcernPriority,
  ConcernStatus,
  AuditActionType,
  AuditResourceType,
  LivingSituation,
} from '../constants';

/**
 * User profile as stored in the database
 */
export interface UserProfile {
  id: string; // UUID
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  suffix: Suffix | null;
  full_name: string; // Auto-generated from name parts
  birthdate: string; // DATE as ISO string
  gender: Gender;
  contact_number: string;
  occupation: Occupation | string;
  occupation_other: string | null;
  sectoral_group: SectoralGroup | string;
  sectoral_group_other: string | null;
  address_area: District;
  address_block: string;
  address_unit: string | null;
  residency_type: ResidencyType;
  living_with: LivingSituation | null;
  household_count: number;
  valid_id_url: string | null;
  role: UserRole;
  is_verified: boolean;
  email_notifications: boolean;
  avatar_url: string | null;
  last_address_change: string | null; // TIMESTAMPTZ as ISO string
  created_at: string; // TIMESTAMPTZ as ISO string
  updated_at: string; // TIMESTAMPTZ as ISO string
}

/**
 * User profile for insertion (omitting auto-generated fields)
 */
export type UserProfileInsert = Omit<UserProfile, 'id' | 'created_at' | 'updated_at' | 'full_name'>;

/**
 * User profile for updates (all fields optional except id)
 */
export type UserProfileUpdate = Partial<Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>>;

/**
 * Household member as stored in the database
 * Can be family members or non-family (roommates, friends, partners)
 */
export interface HouseholdMember {
  id: string; // UUID
  user_id: string; // UUID
  full_name: string;
  relationship: Relationship;
  birthdate: string; // DATE as ISO string
  occupation: string | null;
  is_dependent: boolean;
  created_at: string; // TIMESTAMPTZ as ISO string
  updated_at: string; // TIMESTAMPTZ as ISO string
  last_edit_at: string | null; // For tracking edit cooldown
}

/**
 * Household member for insertion
 */
export type HouseholdMemberInsert = Omit<
  HouseholdMember,
  'id' | 'created_at' | 'updated_at' | 'last_edit_at'
>;

/**
 * Household member for updates
 */
export type HouseholdMemberUpdate = Partial<
  Omit<HouseholdMember, 'id' | 'user_id' | 'created_at'>
>;

/**
 * @deprecated Use HouseholdMember instead
 */
export type FamilyMember = HouseholdMember;

/**
 * @deprecated Use HouseholdMemberInsert instead
 */
export type FamilyMemberInsert = HouseholdMemberInsert;

/**
 * @deprecated Use HouseholdMemberUpdate instead
 */
export type FamilyMemberUpdate = HouseholdMemberUpdate;

/**
 * Announcement as stored in the database
 */
export interface Announcement {
  id: number; // BIGINT
  title: string;
  content: string;
  author_id: string; // UUID
  expires_at: string | null; // TIMESTAMPTZ as ISO string
  is_archived: boolean;
  created_at: string; // TIMESTAMPTZ as ISO string
  updated_at: string | null;
}

/**
 * Announcement for insertion
 */
export type AnnouncementInsert = Omit<
  Announcement,
  'id' | 'created_at' | 'updated_at' | 'is_archived'
>;

/**
 * Announcement for updates
 */
export type AnnouncementUpdate = Partial<
  Omit<Announcement, 'id' | 'author_id' | 'created_at'>
>;

/**
 * Concern as stored in the database
 */
export interface Concern {
  id: number; // BIGINT
  title: string;
  description: string;
  category: string;
  priority: ConcernPriority;
  template_used: string | null;
  status: ConcernStatus;
  image_urls: string[] | null;
  admin_notes: string | null;
  submitter_id: string; // UUID
  created_at: string; // TIMESTAMPTZ as ISO string
  updated_at: string | null;
}

/**
 * Concern for insertion
 */
export type ConcernInsert = Omit<
  Concern,
  'id' | 'created_at' | 'updated_at' | 'status' | 'admin_notes'
>;

/**
 * Concern for updates
 */
export type ConcernUpdate = Partial<
  Omit<Concern, 'id' | 'submitter_id' | 'created_at'>
>;

/**
 * Suggestion as stored in the database
 */
export interface Suggestion {
  id: number; // BIGINT
  title: string;
  description: string;
  author_id: string; // UUID
  created_at: string; // TIMESTAMPTZ as ISO string
}

/**
 * Suggestion for insertion
 */
export type SuggestionInsert = Omit<Suggestion, 'id' | 'created_at'>;

/**
 * Concern category as stored in the database
 */
export interface ConcernCategory {
  id: number; // BIGINT
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: string; // TIMESTAMPTZ as ISO string
}

/**
 * Concern category for insertion
 */
export type ConcernCategoryInsert = Omit<
  ConcernCategory,
  'id' | 'created_at' | 'is_active'
>;

/**
 * Concern template as stored in the database
 */
export interface ConcernTemplate {
  id: number; // BIGINT
  name: string;
  title_template: string;
  description_template: string;
  default_category: string;
  default_priority: ConcernPriority;
  is_active: boolean;
  created_at: string; // TIMESTAMPTZ as ISO string
}

/**
 * Concern template for insertion
 */
export type ConcernTemplateInsert = Omit<
  ConcernTemplate,
  'id' | 'created_at' | 'is_active'
>;

/**
 * Audit log as stored in the database
 */
export interface AuditLog {
  id: number; // BIGINT
  user_id: string; // UUID
  action_type: AuditActionType;
  resource_type: AuditResourceType;
  resource_id: string;
  old_value: string | null;
  new_value: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string; // TIMESTAMPTZ as ISO string
}

/**
 * Audit log for insertion
 */
export type AuditLogInsert = Omit<AuditLog, 'id' | 'created_at'>;

/**
 * Database schema type for Supabase client
 */
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: UserProfile;
        Insert: UserProfileInsert;
        Update: UserProfileUpdate;
      };
      family_members: {
        Row: FamilyMember;
        Insert: FamilyMemberInsert;
        Update: FamilyMemberUpdate;
      };
      announcements: {
        Row: Announcement;
        Insert: AnnouncementInsert;
        Update: AnnouncementUpdate;
      };
      concerns: {
        Row: Concern;
        Insert: ConcernInsert;
        Update: ConcernUpdate;
      };
      suggestions: {
        Row: Suggestion;
        Insert: SuggestionInsert;
      };
      concern_categories: {
        Row: ConcernCategory;
        Insert: ConcernCategoryInsert;
      };
      concern_templates: {
        Row: ConcernTemplate;
        Insert: ConcernTemplateInsert;
      };
      audit_logs: {
        Row: AuditLog;
        Insert: AuditLogInsert;
      };
    };
    Enums: {
      user_role: UserRole;
    };
  };
}
