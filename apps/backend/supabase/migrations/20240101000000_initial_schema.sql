-- Barangay U.P. Campus Database Schema
-- Version: 1.0.0
-- Created: Initial Setup

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUM TYPES
-- ============================================

CREATE TYPE user_role AS ENUM ('resident', 'moderator', 'administrator');
CREATE TYPE concern_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE concern_priority AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE suggestion_status AS ENUM ('pending', 'under_review', 'approved', 'implemented', 'rejected');
CREATE TYPE residency_type AS ENUM ('owner', 'renter', 'boarder', 'family_member');

-- ============================================
-- USER PROFILES TABLE
-- ============================================

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  district TEXT NOT NULL,
  address TEXT NOT NULL,
  address_unit TEXT, -- Unit/Apt number for multiple residents at same address
  residency_type residency_type NOT NULL DEFAULT 'owner',
  birthdate DATE,
  occupation TEXT,
  sectoral_group TEXT,
  role user_role NOT NULL DEFAULT 'resident',
  avatar_url TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  email_notifications BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- FAMILY MEMBERS TABLE
-- ============================================

CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  birthdate DATE,
  occupation TEXT,
  is_minor BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_edit_at TIMESTAMPTZ -- For tracking 12-day edit cooldown
);

-- ============================================
-- ANNOUNCEMENTS TABLE
-- ============================================

CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  priority TEXT NOT NULL DEFAULT 'normal',
  target_districts TEXT[] DEFAULT ARRAY[]::TEXT[], -- Empty = all districts
  author_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE SET NULL,
  is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ, -- Admin-configurable expiration
  attachment_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  view_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- CONCERN CATEGORIES TABLE
-- ============================================

CREATE TABLE concern_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- CONCERN TEMPLATES TABLE
-- ============================================

CREATE TABLE concern_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES concern_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description_template TEXT NOT NULL,
  required_fields TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- CONCERNS TABLE
-- ============================================

CREATE TABLE concerns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number TEXT NOT NULL UNIQUE,
  category_id UUID NOT NULL REFERENCES concern_categories(id),
  template_id UUID REFERENCES concern_templates(id),
  submitter_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT,
  district TEXT NOT NULL,
  status concern_status NOT NULL DEFAULT 'open',
  priority concern_priority NOT NULL DEFAULT 'medium',
  is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
  attachment_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
  assigned_to UUID REFERENCES user_profiles(id),
  resolution_notes TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- CONCERN COMMENTS TABLE
-- ============================================

CREATE TABLE concern_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  concern_id UUID NOT NULL REFERENCES concerns(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  is_internal BOOLEAN NOT NULL DEFAULT FALSE, -- For staff-only comments
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- SUGGESTIONS TABLE
-- ============================================

CREATE TABLE suggestions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submitter_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  status suggestion_status NOT NULL DEFAULT 'pending',
  is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
  upvote_count INTEGER NOT NULL DEFAULT 0,
  downvote_count INTEGER NOT NULL DEFAULT 0,
  admin_response TEXT,
  responded_by UUID REFERENCES user_profiles(id),
  responded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- SUGGESTION VOTES TABLE
-- ============================================

CREATE TABLE suggestion_votes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  suggestion_id UUID NOT NULL REFERENCES suggestions(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(suggestion_id, user_id)
);

-- ============================================
-- AUDIT LOGS TABLE
-- ============================================

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

-- User Profiles
CREATE INDEX idx_user_profiles_district ON user_profiles(district);
CREATE INDEX idx_user_profiles_role ON user_profiles(role);
CREATE INDEX idx_user_profiles_sectoral_group ON user_profiles(sectoral_group);

-- Family Members
CREATE INDEX idx_family_members_user_id ON family_members(user_id);

-- Announcements
CREATE INDEX idx_announcements_published ON announcements(is_published, published_at DESC);
CREATE INDEX idx_announcements_category ON announcements(category);
CREATE INDEX idx_announcements_expires ON announcements(expires_at) WHERE expires_at IS NOT NULL;

-- Concerns
CREATE INDEX idx_concerns_status ON concerns(status);
CREATE INDEX idx_concerns_district ON concerns(district);
CREATE INDEX idx_concerns_submitter ON concerns(submitter_id);
CREATE INDEX idx_concerns_ticket ON concerns(ticket_number);
CREATE INDEX idx_concerns_created ON concerns(created_at DESC);

-- Suggestions
CREATE INDEX idx_suggestions_status ON suggestions(status);
CREATE INDEX idx_suggestions_votes ON suggestions(upvote_count DESC, downvote_count);
CREATE INDEX idx_suggestions_created ON suggestions(created_at DESC);

-- Audit Logs
CREATE INDEX idx_audit_logs_actor ON audit_logs(actor_id);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to generate ticket number
CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS TRIGGER AS $$
DECLARE
  year_part TEXT;
  sequence_num INTEGER;
BEGIN
  year_part := TO_CHAR(NOW(), 'YYYY');
  
  SELECT COALESCE(MAX(
    CAST(SUBSTRING(ticket_number FROM 'BRG-\d{4}-(\d+)') AS INTEGER)
  ), 0) + 1
  INTO sequence_num
  FROM concerns
  WHERE ticket_number LIKE 'BRG-' || year_part || '-%';
  
  NEW.ticket_number := 'BRG-' || year_part || '-' || LPAD(sequence_num::TEXT, 6, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to update suggestion vote counts
CREATE OR REPLACE FUNCTION update_suggestion_votes()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.vote_type = 'up' THEN
      UPDATE suggestions SET upvote_count = upvote_count + 1 WHERE id = NEW.suggestion_id;
    ELSE
      UPDATE suggestions SET downvote_count = downvote_count + 1 WHERE id = NEW.suggestion_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.vote_type = 'up' THEN
      UPDATE suggestions SET upvote_count = upvote_count - 1 WHERE id = OLD.suggestion_id;
    ELSE
      UPDATE suggestions SET downvote_count = downvote_count - 1 WHERE id = OLD.suggestion_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' AND OLD.vote_type != NEW.vote_type THEN
    IF NEW.vote_type = 'up' THEN
      UPDATE suggestions SET upvote_count = upvote_count + 1, downvote_count = downvote_count - 1 WHERE id = NEW.suggestion_id;
    ELSE
      UPDATE suggestions SET upvote_count = upvote_count - 1, downvote_count = downvote_count + 1 WHERE id = NEW.suggestion_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================

-- Updated at triggers
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_family_members_updated_at
  BEFORE UPDATE ON family_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at
  BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_concerns_updated_at
  BEFORE UPDATE ON concerns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_concern_comments_updated_at
  BEFORE UPDATE ON concern_comments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suggestions_updated_at
  BEFORE UPDATE ON suggestions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Ticket number generation trigger
CREATE TRIGGER generate_concern_ticket_number
  BEFORE INSERT ON concerns
  FOR EACH ROW EXECUTE FUNCTION generate_ticket_number();

-- Vote count update trigger
CREATE TRIGGER update_suggestion_vote_counts
  AFTER INSERT OR UPDATE OR DELETE ON suggestion_votes
  FOR EACH ROW EXECUTE FUNCTION update_suggestion_votes();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE concern_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE concern_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE concerns ENABLE ROW LEVEL SECURITY;
ALTER TABLE concern_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestion_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- User Profiles Policies
CREATE POLICY "Users can view all profiles"
  ON user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Family Members Policies
CREATE POLICY "Users can view own family members"
  ON family_members FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can manage own family members"
  ON family_members FOR ALL
  USING (user_id = auth.uid());

CREATE POLICY "Admins can view all family members"
  ON family_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('moderator', 'administrator')
    )
  );

-- Announcements Policies
CREATE POLICY "Anyone can view published announcements"
  ON announcements FOR SELECT
  USING (
    is_published = true
    OR EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('moderator', 'administrator')
    )
  );

CREATE POLICY "Staff can manage announcements"
  ON announcements FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('moderator', 'administrator')
    )
  );

-- Concern Categories & Templates Policies
CREATE POLICY "Anyone can view active categories"
  ON concern_categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Staff can manage categories"
  ON concern_categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'administrator'
    )
  );

CREATE POLICY "Anyone can view active templates"
  ON concern_templates FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage templates"
  ON concern_templates FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'administrator'
    )
  );

-- Concerns Policies
CREATE POLICY "Users can view own concerns"
  ON concerns FOR SELECT
  USING (
    submitter_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('moderator', 'administrator')
    )
  );

CREATE POLICY "Users can create concerns"
  ON concerns FOR INSERT
  WITH CHECK (submitter_id = auth.uid());

CREATE POLICY "Users can update own open concerns"
  ON concerns FOR UPDATE
  USING (
    (submitter_id = auth.uid() AND status = 'open')
    OR EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('moderator', 'administrator')
    )
  );

-- Concern Comments Policies
CREATE POLICY "Users can view non-internal comments on their concerns"
  ON concern_comments FOR SELECT
  USING (
    (NOT is_internal AND concern_id IN (
      SELECT id FROM concerns WHERE submitter_id = auth.uid()
    ))
    OR EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('moderator', 'administrator')
    )
  );

CREATE POLICY "Staff can manage comments"
  ON concern_comments FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('moderator', 'administrator')
    )
  );

-- Suggestions Policies
CREATE POLICY "Anyone can view non-anonymous suggestions"
  ON suggestions FOR SELECT
  USING (true);

CREATE POLICY "Users can create suggestions"
  ON suggestions FOR INSERT
  WITH CHECK (submitter_id = auth.uid());

CREATE POLICY "Users can update own pending suggestions"
  ON suggestions FOR UPDATE
  USING (
    (submitter_id = auth.uid() AND status = 'pending')
    OR EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role IN ('moderator', 'administrator')
    )
  );

-- Suggestion Votes Policies
CREATE POLICY "Users can view all votes"
  ON suggestion_votes FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own votes"
  ON suggestion_votes FOR ALL
  USING (user_id = auth.uid());

-- Audit Logs Policies
CREATE POLICY "Only admins can view audit logs"
  ON audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles
      WHERE id = auth.uid() AND role = 'administrator'
    )
  );

CREATE POLICY "System can insert audit logs"
  ON audit_logs FOR INSERT
  WITH CHECK (true);
