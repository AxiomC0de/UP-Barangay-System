# Product Requirements Document: Barangay U.P. Campus

**Version:** 2.2  
**Date:** December 1, 2025  
**Status:** Active Development

**Last Updated:** December 1, 2025 - User Dashboard implementation with Twitter/X style design: Home feed, Announcements, Concerns, Suggestions, Notifications, Profile pages

## 1. Introduction

### 1.1. Problem Statement

Barangay U.P. Campus is a large geographical area covering 18 distinct districts. This size creates a significant communication and accessibility gap between barangay officials and residents. It is physically challenging for officials to consistently reach all constituents, and difficult for residents to visit the barangay hall. This leads to unheard grievances, inefficient service delivery, a lack of centralized data for aid, and a disconnect with the community's youth, who lack modern channels for engagement.

### 1.2. Proposed Solution

"Barangay U.P. Campus" is a centralized web portal designed to bridge this gap. It will provide a single, inclusive digital platform for information dissemination, issue reporting, and community interaction. By digitizing and integrating core communication and administrative processes, the system aims to create a more transparent, responsive, and connected community.

### 1.3. Goals & Objectives

- **Increase Efficiency:** Automate and streamline the process of reporting and tracking community concerns, saving time for both residents and officials.
- **Enhance Communication:** Provide a reliable and accessible channel for official announcements and resident feedback.
- **Enable Data-Driven Decisions:** Create a centralized database of community concerns to help officials identify trends, pinpoint problem areas, and allocate resources effectively.
- **Foster Community Engagement:** Empower residents, particularly the youth, to participate in local governance by providing a platform for suggestions and discussions.
- **Improve User Experience:** Offer a modern, user-friendly interface for interacting with the barangay.
- **Build a Scalable Foundation:** Architect the system to support future growth, allowing for the easy addition of new features and handling an increasing number of users without significant rework.

## 2. User Personas

The system will serve two primary user roles:

### 2.1. Resident User

**Description:** Any constituent of Barangay U.P. Campus, including students, long-term residents, and local business owners. A key focus is on engaging the youth population.

**Goals:**
- Stay informed about official barangay news and events.
- Easily report concerns (e.g., broken streetlights, waste management issues) without physically going to the barangay hall.
- Track the status and resolution of their submitted reports.
- Suggest ideas for community improvement.

**Permissions:** Can register/login, view announcements, submit concerns/suggestions, and view the status of their own submissions.

### 2.2. Moderator (Barangay Staff)

**Description:** Authorized barangay staff members who help manage day-to-day operations, particularly concern review and status updates.

**Goals:**
- Review and triage submitted resident concerns
- Update concern statuses and add administrative notes
- View analytics and reports across all districts
- Assist administrators with community management

**Permissions:** Can view all concerns, update concern statuses, add admin notes, view all user profiles, but cannot change user roles or create other moderators.

### 2.3. Administrator (Barangay Officials)

**Description:** The SK Chairperson and other authorized senior barangay personnel responsible for managing community affairs and system administration.

**Goals:**
- Disseminate information to all 18 areas of the barangay simultaneously.
- Receive, view, and manage all resident concerns in a centralized location.
- Efficiently update the status of concerns to maintain transparency.
- Analyze data on reported issues to better understand community needs.
- **Manage moderator accounts** and system user roles.
- **View comprehensive user management dashboard** with statistics and filtering.

**Permissions:** Secure login access to an administrative dashboard. Full CRUD (Create, Read, Update, Delete) access to announcements and the community idea board. Can view all resident concerns, update their status, and add internal notes. **Can create moderator accounts, view all user profiles, update user roles, and access user management dashboard with comprehensive statistics and filtering.**

## 3. Features & Functionality

### 3.1. Core Features

| Feature ID | Feature Name | User Story | Priority |
|------------|--------------|------------|----------|
| F-01 | Secure User Authentication | As a user (Resident or Admin), I want to securely register and log in to the system so that I can access features specific to my role. | High |
| F-02 | Announcements Hub | As an Admin, I want to post, edit, and delete announcements. As a Resident, I want to view a feed of these announcements to stay informed. | High |
| F-03 | Concern Reporting System | As a Resident, I want to submit a concern through a structured form, including a category, detailed description, and an optional photo upload, so my issue is clearly documented. | High |
| F-04 | Resident Dashboard & Status Tracking | As a Resident, I want a personal dashboard where I can view all my submitted concerns and track their current status (e.g., "Submitted," "Under Review," "Resolved"). | High |
| F-05 | Administrative Dashboard | As an Admin, I want a centralized dashboard to view, sort, and filter all incoming concerns by category, area, or date, so I can manage them efficiently. | High |
| F-06 | Concern Status Management | As an Admin, I want to update the status of a concern and add notes so that the resolution process is tracked and visible to the resident. | High |
| F-07 | Community Idea Board | As a Resident, I want to post suggestions for community projects. As an Admin, I want to moderate this board to foster collaborative governance. | Medium |
| F-08 | Email Notifications | As a Resident, I want to receive email notifications when my concern status changes so I stay informed about progress. | High |
| F-09 | Search & Filter Functionality | As a Resident, I want to search through announcements and filter my concerns so I can quickly find relevant information. | Medium |
| F-10 | Concern Priority & Templates | As a Resident, I want to select from predefined concern templates and set priority levels to streamline my submissions. | Medium |
| F-11 | Admin Analytics Dashboard | As an Admin, I want to view basic analytics (total concerns, announcements, user registrations) to understand community engagement. | Medium |
| F-12 | Admin Notes & Audit Trail | As an Admin, I want to add internal notes to concerns and track all status changes for accountability and coordination. | Medium |

## 4. Development Phasing & Roadmap

This project will be developed in weekly sprints with a front-end-first approach to allow for rapid prototyping and user interface refinement before implementing backend logic.

### Week 1: Foundations & User Authentication UI (Front-end) ✅ COMPLETED
**Goal:** Build the initial user-facing pages and UI components.

**Tasks:**
- ✅ Set up the front-end project structure (Next.js 14 with App Router).
- ✅ Design and build the static landing page (will serve as the announcement hub).
- ✅ Create the UI for the user sign-up and login forms as separate pages/routes.
- ✅ Develop reusable UI components (buttons, forms, cards).

**Completed Deliverables:**
- Turborepo monorepo structure with pnpm workspaces
- Next.js 14 App Router setup with MUI v6 integration
- Landing page with multiple sections: Hero, About, Quick Links, Community Showcase, Announcements Preview, Districts/Areas, CTA
- Static pages: About, Services, FAQ, Contact, Terms & Privacy
- Reusable layout components: Navbar, Footer
- Theme configuration with UP Maroon (#7B1113) and Forest Green (#228B22)
- ThemeRegistry with SSR support via `@mui/material-nextjs`
- **Login page** with split panel design (heritage background, white right panel with form), Google OAuth button, green-themed form elements, clickable logo/name linking to home
- **Registration page** with comprehensive 4-section form:
  - Personal Information (name, birthdate, gender, sectoral group, living situation)
  - Address & Contact (district, street address, phone, email)
  - Verification (valid ID upload with dashed drop zone)
  - Account Security (password with requirements)
  - Conditional Household Members section (dynamic forms for family/non-family members)
  - Clickable logo linking to home page
- **Terms & Privacy page** with:
  - Tab navigation (Terms of Service / Privacy Policy)
  - Sticky Table of Contents with scrollspy highlighting
  - Professional enterprise-grade legal content (15 ToS sections, 12 Privacy sections)
  - Hero section with background image
  - Contact information cards
- **FAQ page** with:
  - Green theme color scheme
  - Sticky sidebar with categories
  - Search functionality
  - Accordion-style Q&A
- **Contact page** with:
  - Green theme color scheme
  - Contact form with request types
  - Expandable map dialog
  - Contact info cards
- Background images: heritage1.png, acacia_lane.png, aerial_campus.png, up_entrance.png
- Barangay U.P. Campus branding with logo integration

### Week 2: Resident Dashboard & Forms UI (Front-end)
**Goal:** Build the core interface for the Resident user using mock data.

**Status:** ✅ COMPLETED

**Tasks:**
- ✅ Design and build the Resident Dashboard layout (Twitter/X style).
- ✅ Create the "Submit a Concern" form UI with priority selection and template options.
- ✅ Build the "My Submitted Concerns" page, displaying a list of static/mock concerns with different statuses.
- ✅ Implement search and filter functionality for the resident interface.
- ✅ Design UI for concern templates and category selection.

**Completed Deliverables:**
- **User Dashboard Layout** (`/user_dashboard/layout.tsx`):
  - Twitter/X style dark theme (#000 background, #e7e9ea text, #2f3336 borders)
  - Left sidebar (275px) with navigation: Home, Announcements, Concerns, Suggestions, Notifications, Profile
  - "More" menu with Bug Reports, Feedback, Feature Request, How To, Settings options
  - Account menu with logout functionality
  - Circular logo image with home navigation
  - Centered container (maxWidth: 1300) with visual balance offset
  - Post button in sidebar
  
- **Home Feed** (`/user_dashboard/page.tsx`):
  - Compose box for new posts
  - Feed with mock posts showing user content
  - Post actions: comments, likes, view statistics
  - Right sidebar with "Latest Announcement" and "Latest Concerns" preview cards
  - Sticky search bar
  
- **Announcements Page** (`/user_dashboard/announcements/page.tsx`):
  - Sticky search bar
  - Filter tabs for announcement categories
  - Announcement cards with priority badges, dates, and content
  - Right sidebar with featured/pinned announcements
  
- **Concerns Page** (`/user_dashboard/concerns/page.tsx`):
  - 5 filter tabs: All, My Concerns, Open, In Progress, Resolved (full-width)
  - "My Concerns" tab with "You" badge for user's own submissions
  - Priority/Urgency level tags (Urgent/red, High/orange, Medium/yellow, Low/green)
  - Status chips with color coding
  - Concern cards with category, status, priority, comment count, time
  - Sticky search bar
  - Right sidebar with concern statistics
  
- **Suggestions Page** (`/user_dashboard/suggestions/page.tsx`):
  - 3 filter tabs: Top, Latest, My Suggestions (full-width)
  - "My Suggestions" tab with "You" badge for user's own submissions
  - Upvote/Downvote functionality with mutual exclusion
  - Vote counts with thumbs up/down icons
  - Suggestion cards with author, content, vote stats
  - Sticky search bar
  - Right sidebar with trending topics
  
- **Notifications Page** (`/user_dashboard/notifications/page.tsx`):
  - 4 filter tabs: All, Unread, Announcements, Concerns
  - Notification types with icons (announcements, concerns, comments, likes)
  - Read/unread state indicators (unread has blue left border)
  - Mark as read functionality
  - Notification content with timestamps
  - Sticky search bar
  - Right sidebar with weekly activity stats
  
- **Profile Page** (`/user_dashboard/profile/page.tsx`):
  - Twitter-style header with banner placeholder and circular avatar
  - User info: name, handle (@username), bio, location, join date
  - Stats display: Posts, Concerns, Suggestions counts
  - Edit Profile button
  - 4 activity tabs: Posts, Concerns, Suggestions, Likes
  - Activity feed showing user's content in each tab
  - Right sidebar with Activity Summary card and Account Information card
  - Sticky search bar

### Week 3: Administrator Dashboard UI (Front-end)
**Goal:** Build the core interface for the Administrator user using mock data.

**Status:** ⬜ Not Started

**Tasks:**
- ⬜ Design and build the Administrator Dashboard layout with basic analytics widgets.
- ⬜ Create the UI for managing announcements (create/edit form, list view).
- ⬜ Build the interface for viewing and managing all resident concerns with filtering and sorting.
- ⬜ Design UI for managing concern categories and templates.
- ⬜ Create interface for viewing audit logs and adding admin notes to concerns.

### Week 4: Backend Setup & User Integration ✅ COMPLETED
**Goal:** Connect the UI to a live backend and implement user authentication.

**Tasks:**
- ✅ Set up the Supabase project and create the database schema as defined.
- ✅ Integrate the Supabase client into the Next.js application.
- ⬜ Connect the sign-up and login forms to Supabase Auth.
- ⬜ Implement logic for creating a user profile in the users table upon registration.
- ✅ Implement protected routes for authenticated users (middleware setup).

**Completed Deliverables:**
- Complete database schema with all tables: user_profiles, family_members, announcements, concerns, concern_categories, concern_templates, suggestions, suggestion_votes, concern_comments, audit_logs
- ENUM types for user_role, concern_status, concern_priority, suggestion_status, residency_type
- Row Level Security (RLS) policies for all tables
- Database functions: update_updated_at_column, generate_ticket_number, update_suggestion_votes
- Triggers for auto-updating timestamps, ticket number generation, vote counts
- Indexes for performance optimization
- Seed data for concern categories and templates
- Supabase client setup for browser (`client.ts`) and server (`server.ts`)
- Middleware for session management

### Week 5: Core Feature Backend Integration
**Goal:** Connect the main features to the database.

**Status:** ⬜ Not Started

**Tasks:**
- ⬜ Connect the "Submit a Concern" form to save data to the concerns table with new fields.
- ⬜ Implement file uploads for multiple concern images (max 3, 5MB each) to Supabase Storage.
- ⬜ Fetch and display real data in the Resident and Administrator dashboards.
- ⬜ Implement the logic for Admins to update concern statuses with audit logging.
- ⬜ Connect the Announcements Hub to the announcements table for admins to post and residents to view.
- ⬜ Implement email notification system for concern status updates.
- ⬜ Add address change cooldown logic and rate limiting for concern submissions.
- ⬜ Set up automatic announcement expiration after 30 days.

### Week 6: Finalization, Testing & Deployment Prep
**Goal:** Complete remaining features, test the application, and prepare for deployment.

**Status:** ⬜ Not Started

**Tasks:**
- ⬜ Implement the Community Idea Board feature (front-end and back-end).
- ⬜ Conduct end-to-end testing of all user flows.
- ⬜ Refine styling, ensure responsiveness, and fix any outstanding bugs.
- ⬜ Prepare build scripts and documentation for deployment.

---

## 4.1. Implementation Status Summary

### Shared Package (`@barangay/shared`) ✅ COMPLETED

| Component | Status | Notes |
|-----------|--------|-------|
| Constants (Districts, Sectoral Groups, Occupations, etc.) | ✅ Done | All constants defined with TypeScript types |
| Zod Validation Schemas | ✅ Done | userRegistrationSchema, userLoginSchema, concernSchema, announcementSchema, suggestionSchema, familyMemberSchema |
| TypeScript Types | ✅ Done | Database types for all tables with Insert/Update variants |
| Database Interface | ✅ Done | Full Supabase Database type definition |

### Frontend (`@barangay/web`) - Partial

| Component | Status | Notes |
|-----------|--------|-------|
| Project Setup | ✅ Done | Next.js 14, MUI v6, Supabase SSR |
| Theme Configuration | ✅ Done | UP Maroon & Forest Green palette, responsive typography |
| Landing Page | ✅ Done | Complete with all sections |
| About Page | ✅ Done | Officials section, history, contact info |
| Services Page | ✅ Done | Service cards, how it works section |
| FAQ Page | ✅ Done | Categorized FAQs with search, green theme, sticky sidebar |
| Contact Page | ✅ Done | Contact form, office info, map dialog, green theme |
| Terms & Privacy Page | ✅ Done | Tabbed interface, scrollspy TOC, professional legal content |
| Navbar & Footer | ✅ Done | Responsive layout components |
| Auth Pages (Login/Register) | ✅ Done | Split panel login, sectioned registration with household members, home navigation |
| User Dashboard Layout | ✅ Done | Twitter/X style with left sidebar navigation, centered container, More menu |
| User Dashboard Home | ✅ Done | Compose box, feed with posts, Latest Announcement/Concerns sidebar |
| Announcements Page | ✅ Done | Filter tabs, announcement cards, sticky search, featured sidebar |
| Concerns Page | ✅ Done | My Concerns tab, priority levels, status tracking, sticky search |
| Suggestions Page | ✅ Done | My Suggestions tab, upvote/downvote system, sticky search |
| Notifications Page | ✅ Done | Filter tabs, read/unread states, notification types with icons |
| Profile Page | ✅ Done | Twitter-style profile with activity tabs, stats, Account Info sidebar |
| Admin Dashboard | ⬜ Pending | Not yet created |
| Concern Submission Form | ⬜ Pending | Modal/page for submitting new concerns |

### Backend (`@barangay/backend`) ✅ COMPLETED

| Component | Status | Notes |
|-----------|--------|-------|
| Database Schema | ✅ Done | All tables, enums, indexes |
| RLS Policies | ✅ Done | Role-based access control |
| Database Functions | ✅ Done | Triggers, auto-generation functions |
| Seed Data | ✅ Done | Concern categories and templates |
| Supabase CLI Scripts | ✅ Done | db:start, db:reset, generate:types |

### Features Status

| Feature ID | Feature Name | Frontend | Backend | Integration |
|------------|--------------|----------|---------|-------------|
| F-01 | Secure User Authentication | ✅ | ✅ | ⬜ |
| F-02 | Announcements Hub | ✅ | ✅ | ⬜ |
| F-03 | Concern Reporting System | ✅ | ✅ | ⬜ |
| F-04 | Resident Dashboard & Status Tracking | ✅ | ✅ | ⬜ |
| F-05 | Administrative Dashboard | ⬜ | ✅ | ⬜ |
| F-06 | Concern Status Management | ✅ | ✅ | ⬜ |
| F-07 | Community Idea Board | ✅ | ✅ | ⬜ |
| F-08 | Email Notifications | ⬜ | ⬜ | ⬜ |
| F-09 | Search & Filter Functionality | ✅ | ✅ | ⬜ |
| F-10 | Concern Priority & Templates | ✅ | ✅ | ⬜ |
| F-11 | Admin Analytics Dashboard | ⬜ | ⬜ | ⬜ |
| F-12 | Admin Notes & Audit Trail | ⬜ | ✅ | ⬜ |

**Legend:** ✅ Completed | ⬜ Pending | 🔄 In Progress

## 5. System Architecture & Technical Requirements

### 5.1. Architecture Overview

The system will be built using a modern two-tier architecture leveraging a Backend-as-a-Service (BaaS) model. The client (front-end) will communicate directly and securely with the BaaS provider.

- **Client-Tier (Front-End):** A scalable web application built with Next.js, a full-stack React framework. This approach combines server-side rendering (for fast initial loads and better SEO) with a rich, client-side interactive experience, providing a robust foundation for future growth.
- **Service-Tier (Back-End):** The Supabase platform will provide all backend services, including user authentication, a PostgreSQL database, file storage, and auto-generated APIs.

### 5.2. Technical Stack (✅ IMPLEMENTED)

The project uses a **Turborepo monorepo** structure for better code organization and sharing between frontend and backend.

#### Core Technologies
- **Monorepo Tool:** Turborepo 2.2+ with pnpm 9.12+ workspaces ✅
- **Front-End Framework:** Next.js 14.2+ (App Router) with React 18.3+ ✅
- **UI Component Library:** Material UI (MUI) v6.1+ with `@mui/material-nextjs` for SSR support ✅
- **Back-End:** Supabase (PostgreSQL, Supabase Auth, Supabase Storage, Edge Functions) ✅
- **Email Service:** Gmail SMTP for transactional emails (concern status notifications) ⬜
- **Validation:** Zod 3.23+ for shared schema validation across frontend and backend ✅
- **Language:** TypeScript 5.3+ throughout all packages ✅

#### Deployment & Infrastructure
- **Frontend Hosting:** Vercel (optimized for Next.js) ⬜ Not yet deployed
- **Backend Hosting:** Supabase Cloud (free tier initially) ⬜ Not yet deployed
- **Network:** All communication via secure HTTPS API calls ⬜

#### Development Tools
- Visual Studio Code ✅
- Node.js 18+ ✅
- pnpm (package manager) ✅
- Supabase CLI 1.200+ (for local development and migrations) ✅

#### Dependencies (Implemented)

**Root (`package.json`):**
- turbo: ^2.2.0
- typescript: ^5.3.0
- prettier: ^3.1.0

**Web App (`apps/web/package.json`):**
- next: ^14.2.0
- react: ^18.3.0
- @mui/material: ^6.1.0
- @mui/icons-material: ^6.1.0
- @mui/material-nextjs: ^6.1.0
- @emotion/react: ^11.13.0
- @emotion/styled: ^11.13.0
- @supabase/ssr: ^0.5.0
- @supabase/supabase-js: ^2.45.0
- zod: ^3.23.8

**Shared Package (`packages/shared/package.json`):**
- zod: ^3.23.8
- typescript: ^5.3.0

### 5.3. Database Schema (✅ IMPLEMENTED)

The following tables have been created in the PostgreSQL database managed by Supabase. Note: The implemented schema differs slightly from the original plan to better accommodate real-world requirements.

#### ENUM Types (Implemented)
```sql
user_role: 'resident', 'moderator', 'administrator'
concern_status: 'open', 'in_progress', 'resolved', 'closed'
concern_priority: 'low', 'medium', 'high', 'critical'
suggestion_status: 'pending', 'under_review', 'approved', 'implemented', 'rejected'
residency_type: 'owner', 'renter', 'boarder', 'family_member'
```

#### Table: user_profiles (Implemented)
Stores public profile information for all users. This table has a one-to-one relationship with Supabase's built-in auth.users table.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID | Primary Key, FK to auth.users.id | The unique identifier for the user. |
| email | TEXT | Unique, Not Null | The user's email address. |
| full_name | TEXT | Not Null | The user's complete name. |
| phone_number | TEXT | | The user's contact number. |
| district | TEXT | Not Null | The specific district (Area 1-18) where the resident lives. |
| address | TEXT | Not Null | The block or street within the district. |
| address_unit | TEXT | | Unit/Apt number for multiple residents at same address. |
| residency_type | residency_type ENUM | Not Null, Default: 'owner' | Type of residency. |
| birthdate | DATE | | The user's date of birth. |
| occupation | TEXT | | The user's current occupation. |
| sectoral_group | TEXT | | The user's sectoral classification. |
| role | user_role ENUM | Not Null, Default: 'resident' | The user's role. |
| avatar_url | TEXT | | Profile picture URL. |
| is_verified | BOOLEAN | Not Null, Default: false | Email verification status. |
| email_notifications | BOOLEAN | Not Null, Default: true | Email notification preference. |
| created_at | TIMESTAMPTZ | Not Null, Default: now() | Timestamp of profile creation. |
| updated_at | TIMESTAMPTZ | Not Null, Default: now() | Timestamp of last modification. |

#### Table: family_members (Implemented)
Stores family member information linked to registered users.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID | Primary Key | The unique identifier for the family member. |
| user_id | UUID | FK to user_profiles.id, Not Null | The registered user (head of household). |
| full_name | TEXT | Not Null | The family member's complete name. |
| relationship | TEXT | Not Null | Relationship to the user. |
| birthdate | DATE | | The family member's date of birth. |
| occupation | TEXT | | The family member's occupation. |
| is_minor | BOOLEAN | Not Null, Default: false | Whether this person is a minor. |
| created_at | TIMESTAMPTZ | Not Null, Default: now() | Timestamp of record creation. |
| updated_at | TIMESTAMPTZ | Not Null, Default: now() | Timestamp of last modification. |
| last_edit_at | TIMESTAMPTZ | | For tracking 12-day edit cooldown. |

#### Table: announcements (Implemented)
Stores official announcements posted by administrators.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID | Primary Key | The unique identifier for the announcement. |
| title | TEXT | Not Null | The title of the announcement. |
| content | TEXT | Not Null | The main body of the announcement. |
| category | TEXT | Not Null, Default: 'general' | Category of the announcement. |
| priority | TEXT | Not Null, Default: 'normal' | Priority level. |
| target_districts | TEXT[] | Default: [] | Target districts (empty = all). |
| author_id | UUID | FK to user_profiles.id, Not Null | The ID of the admin who created the post. |
| is_pinned | BOOLEAN | Not Null, Default: false | Whether pinned to top. |
| is_published | BOOLEAN | Not Null, Default: false | Publication status. |
| published_at | TIMESTAMPTZ | | Publication timestamp. |
| expires_at | TIMESTAMPTZ | | Admin-defined expiration date/time. |
| attachment_urls | TEXT[] | Default: [] | Attached file URLs. |
| view_count | INTEGER | Not Null, Default: 0 | Number of views. |
| created_at | TIMESTAMPTZ | Not Null, Default: now() | Timestamp of creation. |
| updated_at | TIMESTAMPTZ | Not Null, Default: now() | Timestamp of last update. |

#### Table: concerns (Implemented)
Stores all concerns submitted by residents. This is the core operational table.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID | Primary Key | The unique identifier for the concern. |
| ticket_number | TEXT | Unique, Not Null | Auto-generated ticket (BRG-YYYY-NNNNNN). |
| category_id | UUID | FK to concern_categories.id, Not Null | Category reference. |
| template_id | UUID | FK to concern_templates.id | Template used (if any). |
| submitter_id | UUID | FK to user_profiles.id, Not Null | The resident who submitted. |
| title | TEXT | Not Null | A brief title for the concern. |
| description | TEXT | Not Null | A detailed description of the issue. |
| location | TEXT | | Specific location of the concern. |
| district | TEXT | Not Null | District where the concern is located. |
| status | concern_status ENUM | Not Null, Default: 'open' | Current status. |
| priority | concern_priority ENUM | Not Null, Default: 'medium' | Priority level. |
| is_anonymous | BOOLEAN | Not Null, Default: false | Anonymous submission flag. |
| attachment_urls | TEXT[] | Default: [] | URLs to uploaded images. |
| assigned_to | UUID | FK to user_profiles.id | Assigned staff member. |
| resolution_notes | TEXT | | Resolution details. |
| resolved_at | TIMESTAMPTZ | | Resolution timestamp. |
| created_at | TIMESTAMPTZ | Not Null, Default: now() | Submission timestamp. |
| updated_at | TIMESTAMPTZ | Not Null, Default: now() | Last update timestamp. |

#### Table: concern_comments (Implemented - Additional)
Stores comments/notes on concerns.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID | Primary Key | The unique identifier. |
| concern_id | UUID | FK to concerns.id, Not Null | The related concern. |
| author_id | UUID | FK to user_profiles.id, Not Null | Comment author. |
| content | TEXT | Not Null | Comment content. |
| is_internal | BOOLEAN | Not Null, Default: false | Staff-only visibility. |
| created_at | TIMESTAMPTZ | Not Null, Default: now() | Creation timestamp. |
| updated_at | TIMESTAMPTZ | Not Null, Default: now() | Last update timestamp. |

#### Table: suggestions (Implemented)
Stores community improvement suggestions for the idea board.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID | Primary Key | The unique identifier. |
| submitter_id | UUID | FK to user_profiles.id, Not Null | The suggestion author. |
| title | TEXT | Not Null | The title of the suggestion. |
| description | TEXT | Not Null | A detailed description. |
| category | TEXT | Not Null, Default: 'general' | Suggestion category. |
| status | suggestion_status ENUM | Not Null, Default: 'pending' | Current status. |
| is_anonymous | BOOLEAN | Not Null, Default: false | Anonymous submission. |
| upvote_count | INTEGER | Not Null, Default: 0 | Number of upvotes. |
| downvote_count | INTEGER | Not Null, Default: 0 | Number of downvotes. |
| admin_response | TEXT | | Admin response. |
| responded_by | UUID | FK to user_profiles.id | Responding admin. |
| responded_at | TIMESTAMPTZ | | Response timestamp. |
| created_at | TIMESTAMPTZ | Not Null, Default: now() | Submission timestamp. |
| updated_at | TIMESTAMPTZ | Not Null, Default: now() | Last update timestamp. |

#### Table: suggestion_votes (Implemented - Additional)
Tracks user votes on suggestions.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID | Primary Key | The unique identifier. |
| suggestion_id | UUID | FK to suggestions.id, Not Null | The suggestion. |
| user_id | UUID | FK to user_profiles.id, Not Null | The voter. |
| vote_type | TEXT | Not Null, Check: 'up' or 'down' | Vote direction. |
| created_at | TIMESTAMPTZ | Not Null, Default: now() | Vote timestamp. |
| | | UNIQUE(suggestion_id, user_id) | One vote per user per suggestion. |

#### Table: concern_categories (Implemented)
Stores configurable concern categories managed by administrators.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID | Primary Key | The unique identifier. |
| name | TEXT | Not Null, Unique | The category name. |
| description | TEXT | | Category description. |
| icon | TEXT | | MUI icon name. |
| is_active | BOOLEAN | Not Null, Default: true | Availability status. |
| created_at | TIMESTAMPTZ | Not Null, Default: now() | Creation timestamp. |

#### Table: concern_templates (Implemented)
Stores predefined templates to help residents submit concerns faster.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID | Primary Key | The unique identifier. |
| category_id | UUID | FK to concern_categories.id, Not Null | Parent category. |
| title | TEXT | Not Null | The template name/title. |
| description_template | TEXT | Not Null | Pre-filled description with placeholders. |
| required_fields | TEXT[] | Default: [] | Required field names. |
| is_active | BOOLEAN | Not Null, Default: true | Availability status. |
| created_at | TIMESTAMPTZ | Not Null, Default: now() | Creation timestamp. |

#### Table: audit_logs (Implemented)
Tracks all important system actions for accountability and security.

| Column Name | Data Type | Constraints | Description |
|-------------|-----------|-------------|-------------|
| id | UUID | Primary Key | The unique identifier. |
| actor_id | UUID | FK to user_profiles.id | The user who performed the action. |
| action | TEXT | Not Null | Action type description. |
| resource_type | TEXT | Not Null | Type of affected resource. |
| resource_id | UUID | | ID of the affected resource. |
| old_values | JSONB | | Previous values (for updates). |
| new_values | JSONB | | New values (for updates). |
| ip_address | INET | | IP address of the user. |
| user_agent | TEXT | | Browser/device information. |
| created_at | TIMESTAMPTZ | Not Null, Default: now() | Action timestamp. |

#### Database Features Implemented
- **Indexes:** Optimized queries for districts, roles, statuses, timestamps
- **Triggers:** Auto-update timestamps, auto-generate ticket numbers, auto-update vote counts
- **Functions:** `update_updated_at_column()`, `generate_ticket_number()`, `update_suggestion_votes()`
- **Row Level Security (RLS):** All tables have RLS enabled with appropriate policies

### 5.4. Project Structure (✅ IMPLEMENTED)

The project uses a Turborepo monorepo with the following structure:

```
/barangay_up_campus
├── apps/
│   ├── web/                          # Next.js frontend application
│   │   ├── src/
│   │   │   ├── app/                  # App Router pages
│   │   │   │   ├── layout.tsx        # Root layout with MUI ThemeRegistry
│   │   │   │   ├── page.tsx          # Landing page (Home)
│   │   │   │   ├── about/            # About page
│   │   │   │   ├── services/         # Services page
│   │   │   │   ├── faq/              # FAQ page
│   │   │   │   ├── contact/          # Contact page
│   │   │   │   ├── terms-and-privacy/ # Terms of Service & Privacy Policy
│   │   │   │   ├── login/            # Login page
│   │   │   │   └── register/         # Registration page
│   │   │   ├── components/           # Reusable UI components
│   │   │   │   ├── landing/          # Landing page sections
│   │   │   │   │   ├── HeroSection.tsx
│   │   │   │   │   ├── AboutSection.tsx
│   │   │   │   │   ├── QuickLinksBar.tsx
│   │   │   │   │   ├── CommunityShowcase.tsx
│   │   │   │   │   ├── AnnouncementsPreview.tsx
│   │   │   │   │   ├── DistrictsSection.tsx
│   │   │   │   │   ├── FeaturesSection.tsx
│   │   │   │   │   ├── HowItWorksSection.tsx
│   │   │   │   │   ├── StatsSection.tsx
│   │   │   │   │   ├── CTASection.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   ├── layout/           # Layout components
│   │   │   │   │   ├── Navbar.tsx
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   └── index.ts
│   │   │   │   └── index.ts          # Barrel exports
│   │   │   ├── hooks/                # Custom React hooks
│   │   │   │   └── useBreakpoint.ts
│   │   │   ├── lib/
│   │   │   │   └── supabase/         # Supabase client setup
│   │   │   │       ├── client.ts     # Browser client
│   │   │   │       ├── server.ts     # Server client
│   │   │   │       └── middleware.ts # Session management
│   │   │   ├── theme/                # MUI theme configuration
│   │   │   │   ├── theme.ts          # Theme definition
│   │   │   │   ├── ThemeRegistry.tsx # SSR provider
│   │   │   │   └── index.ts
│   │   │   └── middleware.ts         # Next.js middleware
│   │   ├── public/
│   │   │   └── images/
│   │   │       └── showcase/         # Community images
│   │   ├── next.config.js
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── backend/                      # Supabase backend assets
│       └── supabase/
│           ├── migrations/
│           │   └── 20240101000000_initial_schema.sql
│           └── seed.sql
├── packages/
│   └── shared/                       # @barangay/shared package
│       ├── src/
│       │   ├── index.ts              # Barrel exports
│       │   ├── types/                # TypeScript type definitions
│       │   │   └── index.ts
│       │   ├── schemas/              # Zod validation schemas
│       │   │   └── index.ts
│       │   └── constants/            # Shared constants
│       │       └── index.ts
│       ├── package.json
│       └── tsconfig.json
├── turbo.json                        # Turborepo configuration
├── pnpm-workspace.yaml               # pnpm workspace configuration
├── package.json                      # Root package.json
├── tsconfig.json                     # Root TypeScript config
└── PRD.md                            # This document
```

**Key Implementation Notes:**
- ✅ Turborepo with pnpm workspaces configured
- ✅ Next.js 14 with App Router (no pages/ directory)
- ✅ MUI v6 with `@mui/material-nextjs` for SSR
- ✅ Supabase SSR client for browser and server
- ✅ Shared package with Zod schemas, types, and constants
- ✅ Auth pages (login, register) with home navigation
- ✅ Terms & Privacy page with professional legal content
- ✅ FAQ and Contact pages with green theme
- ⬜ Dashboard routes not yet created
- ⬜ Edge Functions not yet created

## 6. System Rules & Data Management

### 6.1. Business Rules (✅ Constants Defined in `@barangay/shared`)

#### User Registration & Authentication
- **Email Verification:** Users must verify their email address before accessing the dashboard.
- **Password Requirements:** ✅ Minimum 8 characters (`BUSINESS_RULES.MIN_PASSWORD_LENGTH`), at least 1 uppercase letter, at least 1 number (validated via `passwordSchema`).
- **Terms of Service:** ✅ Users must agree to Terms of Service and Privacy Policy during registration (validated via `userRegistrationSchema`).
- **Phone Number:** ✅ Philippine format validation via `phoneSchema` regex: `/^(\+63|0)?[0-9]{10,11}$/`

#### Family Members
- **Required for Parent Groups:** ✅ Users selecting "Solo Parent" or "Mother" as their sectoral group must add at least 1 family member (`PARENT_SECTORAL_GROUPS` constant).
- **Edit Cooldown:** ✅ Family member information can only be edited once every 12 days (`BUSINESS_RULES.FAMILY_MEMBER_EDIT_COOLDOWN_DAYS`).

#### Address Management
- **Address Changes:** ✅ Users can change their address (district and block) only once every 30 days (`BUSINESS_RULES.ADDRESS_CHANGE_COOLDOWN_DAYS`).

#### Concerns & Submissions
- **File Upload Limits:** ✅ Constants defined
  - Maximum 3 images per concern (`BUSINESS_RULES.MAX_IMAGES_PER_CONCERN`)
  - Maximum file size: 5MB per image (`BUSINESS_RULES.MAX_IMAGE_SIZE_BYTES`)
  - Supported formats: JPEG, PNG, WebP (`BUSINESS_RULES.ALLOWED_IMAGE_FORMATS`)
- **Rate Limiting:** ✅ Users can submit a maximum of 5 concerns per day (`BUSINESS_RULES.MAX_CONCERNS_PER_DAY`).

#### Announcements
- **Expiration:** Announcements have admin-configurable expiration dates set via datetime picker. Announcements without an expiration date remain visible indefinitely.
- **Archival:** Expired announcements are automatically archived but not deleted.

#### Administration
- **Admin Creation:** Initial administrator accounts must be created manually in the database or via Supabase dashboard.
- **Role Management:** Only administrators can change user roles or create moderator accounts.

### 6.2. Data Management Policies

- **User Consent:** All users must agree to Terms of Service and Privacy Policy before account creation.
- **Data Retention:** 
  - Resolved concerns: Kept indefinitely for historical reference
  - User audit logs: Retained for 1 year
  - Expired announcements: Automatically archived but not deleted
- **Anonymity Policy:** All concern submissions require user identification (no anonymous reporting) to ensure accountability.

## 7. Constraints & Limitations (Initial Scope)

- **Platform:** The system will be web-based only and accessible via modern browsers on desktop and mobile devices. A native mobile app is not in scope for this version.
- **Communication:** Communication is asynchronous. The system does not include a real-time chat feature for instant messaging.
- **Integration:** The platform will be a standalone system and will not integrate with other city or national government systems.
- **Analytics:** The initial version will not feature advanced, auto-generated analytical reports. Administrators will view raw data from their dashboard.
- **Hosting:** The project will be hosted on Supabase's free tier, which has the following constraints:
  - **Availability:** Inactive projects are paused after one week. Regular activity is required to keep the portal online.
  - **Resources:** Limited to 500 MB database, 1 GB file storage, and basic backup options.

## 8. Success Metrics

The success of the Barangay U.P. Campus portal will be measured by:

- **Adoption Rate:** Number of registered resident users across all 18 districts.
- **Engagement:**
  - Volume of concerns submitted per month.
  - Number of suggestions posted on the community idea board.
  - Usage of concern templates and search functionality.
  - Email notification open and engagement rates.
- **Efficiency Gains:**
  - Average time from concern submission to an "Under Review" status change.
  - Reduction in duplicate or spam submissions due to templates and rate limiting.
  - Positive qualitative feedback from barangay officials regarding time saved.
- **System Health:**
  - User retention rate and repeat engagement.
  - System uptime and performance metrics.
  - Data integrity and audit trail completeness.
- **User Satisfaction:** Positive feedback collected from residents through surveys or direct feedback channels.

## 9. Future Considerations (Post-V1)

### 9.1. Post-MVP Enhancements (Can Be Added Later)

The following features are deferred to post-MVP to maintain focus on core functionality:

| Feature | Description | Priority |
|---------|-------------|----------|
| Dark Mode | MUI theme toggle for dark/light mode | Low |
| Push Notifications | Browser push notifications for real-time updates | Medium |
| Forgot Password UI | Custom forgot password page (Supabase handles backend) | Medium |
| Profile Photo Upload | Allow users to upload profile pictures | Low |
| Data Export | Export concerns/reports as CSV or PDF | Medium |
| Multi-language Support | Filipino/English language toggle | Low |

### 9.2. Phase 2 Features (Months 2-3)
- Area-specific announcements for targeted district communication.
- Advanced analytics dashboard with charts and trend analysis.
- Concern assignment system for delegating tasks to specific officials.
- Mobile-responsive PWA (Progressive Web App) capabilities.

### 9.3. Phase 3 Features (Months 4-6)
- Development of a native iOS and Android mobile application.
- Integration of a real-time chat feature for direct communication.
- Advanced analytics and reporting dashboards for officials.
- Integration with other relevant local government unit (LGU) systems.
- Upgrade to a paid Supabase plan to ensure continuous availability and expanded resources.

---

## Appendix A: System Constants & Configuration

### A.1. Sectoral Groups
```
- Student
- Solo Parent
- Mother
- Senior Citizen
- PWD (Person with Disability)
- Worker/Employee
- Business Owner
- Unemployed
- OFW Dependent
- Others (allows free text input)
```

### A.2. Occupations
```
- Student
- Government Employee
- Private Employee
- Self-employed/Business Owner
- Freelancer
- Healthcare Worker
- Teacher/Educator
- OFW (Overseas Filipino Worker)
- Retired
- Homemaker
- Unemployed
- Others (allows free text input)
```

### A.3. Family Relationships
```
- Spouse/Partner
- Child
- Parent
- Sibling
- Grandparent
- Grandchild
- In-law
- Other Relative
- Non-relative
```

### A.4. Residency Types
```
- Owner
- Renter
- Boarder
- Family Member
```

### A.5. Districts
```
- Area 1 through Area 18
```

### A.6. Concern Priorities
```
- Low
- Medium (default)
- High
- Urgent
```

### A.7. Concern Statuses
```
- Submitted (default)
- Under Review
- Resolved
```

### A.8. Gmail SMTP Configuration

The following environment variables are required for email notifications:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=barangay.up.campus.website@gmail.com
SMTP_PASS=<app-password>
SMTP_FROM=Barangay U.P. Campus <barangay.up.campus.website@gmail.com>
```

**Note:** Gmail requires an App Password (generated from Google Account settings with 2FA enabled). Regular Gmail passwords will not work for SMTP.