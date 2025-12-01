-- Migration: Update User Profiles Schema for Enhanced Registration
-- Version: 1.1.0
-- Created: November 30, 2025
-- Description: Adds new fields for comprehensive user registration including
--              separate name fields, gender, living situation, and household tracking

-- ============================================
-- NEW ENUM TYPES
-- ============================================

-- Gender enum
CREATE TYPE gender AS ENUM ('Male', 'Female', 'Other', 'Prefer not to say');

-- Living situation enum
CREATE TYPE living_situation AS ENUM ('family', 'non-family', 'alone');

-- ============================================
-- UPDATE USER_PROFILES TABLE
-- ============================================

-- Add new columns to user_profiles
ALTER TABLE user_profiles
  -- Split full_name into separate fields
  ADD COLUMN IF NOT EXISTS first_name TEXT,
  ADD COLUMN IF NOT EXISTS last_name TEXT,
  ADD COLUMN IF NOT EXISTS middle_name TEXT,
  ADD COLUMN IF NOT EXISTS suffix TEXT,
  
  -- Add gender
  ADD COLUMN IF NOT EXISTS gender gender,
  
  -- Living situation tracking
  ADD COLUMN IF NOT EXISTS living_with living_situation,
  ADD COLUMN IF NOT EXISTS household_count INTEGER DEFAULT 0,
  
  -- Other specification fields
  ADD COLUMN IF NOT EXISTS occupation_other TEXT,
  ADD COLUMN IF NOT EXISTS sectoral_group_other TEXT,
  
  -- Verification document
  ADD COLUMN IF NOT EXISTS valid_id_url TEXT,
  
  -- Track last address change for cooldown
  ADD COLUMN IF NOT EXISTS last_address_change TIMESTAMPTZ;

-- Rename existing columns for consistency
ALTER TABLE user_profiles 
  RENAME COLUMN phone_number TO contact_number;

ALTER TABLE user_profiles 
  RENAME COLUMN district TO address_area;

ALTER TABLE user_profiles 
  RENAME COLUMN address TO address_block;

-- Update full_name to be a generated column based on name parts
-- First, drop the NOT NULL constraint temporarily
ALTER TABLE user_profiles 
  ALTER COLUMN full_name DROP NOT NULL;

-- Create a function to generate full name
CREATE OR REPLACE FUNCTION generate_full_name(
  first_name TEXT,
  middle_name TEXT,
  last_name TEXT,
  suffix TEXT
) RETURNS TEXT AS $$
BEGIN
  RETURN TRIM(
    COALESCE(first_name, '') || ' ' ||
    COALESCE(NULLIF(middle_name, ''), '') || ' ' ||
    COALESCE(last_name, '') ||
    CASE WHEN suffix IS NOT NULL AND suffix != '' THEN ' ' || suffix ELSE '' END
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create trigger to auto-update full_name
CREATE OR REPLACE FUNCTION update_full_name()
RETURNS TRIGGER AS $$
BEGIN
  NEW.full_name := generate_full_name(NEW.first_name, NEW.middle_name, NEW.last_name, NEW.suffix);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_full_name
  BEFORE INSERT OR UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_full_name();

-- ============================================
-- RENAME & UPDATE FAMILY_MEMBERS TO HOUSEHOLD_MEMBERS
-- ============================================

-- Rename table to be more inclusive (includes non-family roommates)
ALTER TABLE family_members RENAME TO household_members;

-- Rename is_minor to is_dependent for clarity
ALTER TABLE household_members 
  RENAME COLUMN is_minor TO is_dependent;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_household_members_user_id 
  ON household_members(user_id);

-- ============================================
-- UPDATE RLS POLICIES
-- ============================================

-- Drop old policies if they reference the old table name
DROP POLICY IF EXISTS "Users can view own family members" ON household_members;
DROP POLICY IF EXISTS "Users can insert own family members" ON household_members;
DROP POLICY IF EXISTS "Users can update own family members" ON household_members;
DROP POLICY IF EXISTS "Users can delete own family members" ON household_members;

-- Create new policies for household_members
CREATE POLICY "Users can view own household members"
  ON household_members FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own household members"
  ON household_members FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own household members"
  ON household_members FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own household members"
  ON household_members FOR DELETE
  USING (auth.uid() = user_id);

-- Admins and moderators can view all household members
CREATE POLICY "Staff can view all household members"
  ON household_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE user_profiles.id = auth.uid()
      AND user_profiles.role IN ('administrator', 'moderator')
    )
  );

-- ============================================
-- ADD CONSTRAINTS
-- ============================================

-- Ensure household_count is non-negative
ALTER TABLE user_profiles
  ADD CONSTRAINT check_household_count_positive 
  CHECK (household_count >= 0 AND household_count <= 50);

-- Ensure first_name and last_name are required for new records
-- (applied after migration to allow existing data)
-- ALTER TABLE user_profiles
--   ALTER COLUMN first_name SET NOT NULL,
--   ALTER COLUMN last_name SET NOT NULL;

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON COLUMN user_profiles.first_name IS 'User first name';
COMMENT ON COLUMN user_profiles.last_name IS 'User last name/surname';
COMMENT ON COLUMN user_profiles.middle_name IS 'User middle name (optional)';
COMMENT ON COLUMN user_profiles.suffix IS 'Name suffix like Jr., Sr., III, etc. (optional)';
COMMENT ON COLUMN user_profiles.gender IS 'User gender identity';
COMMENT ON COLUMN user_profiles.living_with IS 'Who the user lives with: family, non-family (roommates), or alone';
COMMENT ON COLUMN user_profiles.household_count IS 'Number of people in the household (excluding the user)';
COMMENT ON COLUMN user_profiles.occupation_other IS 'Custom occupation if "Others" is selected';
COMMENT ON COLUMN user_profiles.sectoral_group_other IS 'Custom sectoral group if "Others" is selected';
COMMENT ON COLUMN user_profiles.valid_id_url IS 'URL to uploaded valid ID or proof of residency';
COMMENT ON COLUMN user_profiles.last_address_change IS 'Timestamp of last address change for cooldown tracking';

COMMENT ON TABLE household_members IS 'Members living in the same household unit as the user (family or non-family)';
COMMENT ON COLUMN household_members.is_dependent IS 'Whether the member is a dependent (minor or not working)';
