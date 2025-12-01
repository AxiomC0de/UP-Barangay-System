-- Seed Data for Barangay U.P. Campus
-- This file contains initial data for development and testing

-- ============================================
-- CONCERN CATEGORIES
-- ============================================

INSERT INTO concern_categories (id, name, description, icon, is_active) VALUES
  (uuid_generate_v4(), 'Infrastructure', 'Roads, drainage, streetlights, and other infrastructure issues', 'construction', true),
  (uuid_generate_v4(), 'Sanitation', 'Garbage collection, cleanliness, and sanitation concerns', 'delete', true),
  (uuid_generate_v4(), 'Safety & Security', 'Crime, suspicious activities, and safety hazards', 'security', true),
  (uuid_generate_v4(), 'Noise', 'Noise disturbances and violations', 'volume_up', true),
  (uuid_generate_v4(), 'Environment', 'Trees, flooding, environmental hazards', 'eco', true),
  (uuid_generate_v4(), 'Public Services', 'Water, electricity, and other utility concerns', 'water_drop', true),
  (uuid_generate_v4(), 'Animals', 'Stray animals, pet issues, and wildlife concerns', 'pets', true),
  (uuid_generate_v4(), 'Others', 'Other concerns not covered by existing categories', 'help', true);

-- ============================================
-- CONCERN TEMPLATES
-- ============================================

-- Get the Infrastructure category ID
INSERT INTO concern_templates (category_id, title, description_template, required_fields, is_active)
SELECT 
  id,
  'Pothole Report',
  'There is a pothole located at [LOCATION]. The approximate size is [SIZE] and it has been present for [DURATION]. This poses a risk to [AFFECTED_PARTIES].',
  ARRAY['location', 'size', 'duration'],
  true
FROM concern_categories WHERE name = 'Infrastructure';

INSERT INTO concern_templates (category_id, title, description_template, required_fields, is_active)
SELECT 
  id,
  'Streetlight Issue',
  'The streetlight at [LOCATION] is [ISSUE_TYPE: not working/flickering/damaged]. This has been ongoing since [DATE]. The area becomes [DESCRIPTION] at night.',
  ARRAY['location', 'issue_type', 'date'],
  true
FROM concern_categories WHERE name = 'Infrastructure';

-- Sanitation templates
INSERT INTO concern_templates (category_id, title, description_template, required_fields, is_active)
SELECT 
  id,
  'Missed Garbage Collection',
  'Garbage collection was missed on [DATE] at [LOCATION]. The garbage has been piling up for [DURATION] days. This is causing [ISSUES].',
  ARRAY['date', 'location', 'duration'],
  true
FROM concern_categories WHERE name = 'Sanitation';

INSERT INTO concern_templates (category_id, title, description_template, required_fields, is_active)
SELECT 
  id,
  'Illegal Dumping',
  'There is illegal dumping observed at [LOCATION]. The type of waste includes [WASTE_TYPE]. This has been ongoing since [DATE].',
  ARRAY['location', 'waste_type', 'date'],
  true
FROM concern_categories WHERE name = 'Sanitation';

-- Safety templates
INSERT INTO concern_templates (category_id, title, description_template, required_fields, is_active)
SELECT 
  id,
  'Suspicious Activity',
  'I observed suspicious activity at [LOCATION] on [DATE] at approximately [TIME]. Description: [DESCRIPTION]. The individuals involved [INDIVIDUAL_DESCRIPTION].',
  ARRAY['location', 'date', 'time', 'description'],
  true
FROM concern_categories WHERE name = 'Safety & Security';

-- Noise templates
INSERT INTO concern_templates (category_id, title, description_template, required_fields, is_active)
SELECT 
  id,
  'Noise Disturbance',
  'There is a noise disturbance at [LOCATION] occurring [FREQUENCY]. The type of noise is [NOISE_TYPE]. It typically happens from [START_TIME] to [END_TIME].',
  ARRAY['location', 'frequency', 'noise_type', 'start_time', 'end_time'],
  true
FROM concern_categories WHERE name = 'Noise';

-- Environment templates
INSERT INTO concern_templates (category_id, title, description_template, required_fields, is_active)
SELECT 
  id,
  'Flooding',
  'There is flooding at [LOCATION]. The water level is approximately [WATER_LEVEL]. This occurs whenever [TRIGGER: heavy rain/etc]. It affects [AFFECTED_AREAS].',
  ARRAY['location', 'water_level', 'trigger'],
  true
FROM concern_categories WHERE name = 'Environment';

INSERT INTO concern_templates (category_id, title, description_template, required_fields, is_active)
SELECT 
  id,
  'Fallen/Hazardous Tree',
  'There is a [TREE_CONDITION: fallen/leaning/dead] tree at [LOCATION]. It poses a risk to [RISK_DESCRIPTION]. The tree has been in this condition since [DATE].',
  ARRAY['tree_condition', 'location', 'risk_description'],
  true
FROM concern_categories WHERE name = 'Environment';

-- Animals templates
INSERT INTO concern_templates (category_id, title, description_template, required_fields, is_active)
SELECT 
  id,
  'Stray Animal Report',
  'There is a stray [ANIMAL_TYPE] spotted at [LOCATION]. The animal appears to be [CONDITION]. It has been seen in the area for [DURATION].',
  ARRAY['animal_type', 'location', 'condition'],
  true
FROM concern_categories WHERE name = 'Animals';

-- ============================================
-- SAMPLE ANNOUNCEMENT (for development)
-- ============================================

-- Note: This requires an admin user to exist first
-- Uncomment and modify after creating an admin user

-- INSERT INTO announcements (title, content, category, priority, is_published, published_at)
-- VALUES (
--   'Welcome to Barangay Connect!',
--   'We are excited to launch Barangay Connect, the official community portal for Barangay UP Campus. Through this platform, you can stay updated with announcements, submit concerns, and share suggestions to improve our community. Register now to get started!',
--   'general',
--   'high',
--   true,
--   NOW()
-- );
