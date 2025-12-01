# Copilot Instructions for Barangay U.P. Campus

## Project Overview

Community portal for Barangay U.P. Campus (UP Diliman) - residents view announcements, submit concerns, engage with local governance. **Turborepo monorepo** with pnpm workspaces.

## Architecture

```
apps/web/          → Next.js 14 (App Router) + MUI v6
apps/backend/      → Supabase (PostgreSQL, Auth, Storage)
packages/shared/   → @barangay/shared (types, Zod schemas, constants)
```

**Key decisions:**
- `@barangay/shared` is the single source of truth for types/validation - never duplicate
- Supabase handles auth, DB, storage (no custom backend server)
- MUI v6 with `@mui/material-nextjs` for SSR

## Commands

```bash
pnpm dev              # Start all apps (turbo)
pnpm build            # Build all packages
pnpm lint             # Lint all packages
pnpm type-check       # TypeScript check

# Backend (from apps/backend/)
pnpm db:start         # Start local Supabase
pnpm db:reset         # Reset DB with migrations + seed
pnpm generate:types   # Regenerate TS types from schema
```

## Critical Patterns

### Imports
```typescript
// ✅ Shared package for types/constants/schemas
import { DISTRICTS, SECTORAL_GROUPS, OCCUPATIONS, userRegistrationSchema } from '@barangay/shared';

// ✅ MUI - individual imports (tree-shaking)
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ❌ Never barrel imports for MUI
import { Box, Typography } from '@mui/material';
```

### Component Pattern (Client Components)
```typescript
'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import { Navbar, Footer } from '@/components';

export default function MyPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <Box component="main">
      <Navbar />
      {/* Page content */}
      <Footer />
    </Box>
  );
}
```

### Supabase Client
```typescript
// Browser (client components)
import { createClient } from '@/lib/supabase/client';

// Server (RSC, actions, middleware)
import { createClient } from '@/lib/supabase/server';
```

### Component Organization
```
src/components/
  landing/     → Page sections (HeroSection, CTASection, etc.)
  layout/      → Navbar, Footer
  index.ts     → Barrel export
```

## Theme & Styling

- **Primary:** UP Maroon `#7B1113`
- **Secondary:** Forest Green `#228B22`
- Always use MUI `sx` prop, not external CSS
- Responsive: `sx={{ py: { xs: 4, md: 8 } }}`

## Database Schema

- **Roles:** `'resident'`, `'moderator'`, `'administrator'`
- **Concern status:** `'open'`, `'in_progress'`, `'resolved'`, `'closed'`
- **Districts:** "Area 1" through "Area 18" (use `DISTRICTS` constant)
- UUIDs link to `user_profiles.id` → `auth.users`

### Migrations
Create in `apps/backend/supabase/migrations/YYYYMMDDHHMMSS_description.sql`

## Validation (Zod)

All forms use schemas from `@barangay/shared`:
- `userRegistrationSchema` - signup with PH phone regex `/^(\+63|0)?[0-9]{10,11}$/`
- `concernSchema` - concern submission
- `passwordSchema` - min 8 chars, 1 uppercase, 1 number

## Protected Routes

Defined in `src/lib/supabase/middleware.ts`:
- **Protected:** `/dashboard`, `/profile`, `/concerns`, `/suggestions`, `/admin`
- **Auth pages:** `/login`, `/register`, `/forgot-password`, `/reset-password`
- Unauthenticated users redirect to `/login?redirectTo=...`
- Authenticated users on auth pages redirect to `/dashboard`

## Current Pages

```
/                    → Landing page
/about               → About the barangay  
/services            → Available services
/contact             → Contact form
/faq                 → FAQs
/terms-and-privacy   → Legal pages
/login               → User login
/register            → User registration
/forgot-password     → Password recovery

# User Dashboard (Twitter-like layout)
/user_dashboard              → Feed with announcements/concerns
/user_dashboard/announcements → Official announcements
/user_dashboard/concerns      → Report/view concerns
/user_dashboard/suggestions   → Community suggestions
/user_dashboard/notifications → User notifications
/user_dashboard/profile       → User profile
```

### Dashboard Layout Pattern
The dashboard uses a 3-column Twitter-like layout (`apps/web/src/app/user_dashboard/layout.tsx`):
- **Left sidebar:** Navigation with active/inactive icon pairs
- **Center:** Main content (children)
- **Right sidebar:** Trends, suggestions

Navigation items use paired icons:
```typescript
{ label: 'Home', path: '/user_dashboard', icon: HomeOutlinedIcon, activeIcon: HomeIcon }
```

## Environment Variables

`apps/web/.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```
