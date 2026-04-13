# Featured Projects Section - Implementation Plan

## Current State
- Hardcoded `SPONSORED_PROJECTS` in `src/app/page.tsx` (lines 281-337)
- Shows Meta/Corp projects (facebook/react, microsoft/typescript)
- Static, no rotation, no tracking

## Requirements
1. **Rotating** - Different featured projects over time
2. **Unclickable** - No links, just display
3. **"Reserve Your Spot" overlay** - Half-opaque with CTA button
4. **Click tracking** - Count clicks/impressions
5. **Prioritize indie/small projects** - No Meta/Corp unless paid
6. **Live stats always visible**

## Implementation

### 1. Database Schema (Prisma)
```prisma
model FeaturedProject {
  id            String   @id @default(cuid())
  name          String   // Display name
  owner         String   // GitHub owner
  repo          String   // GitHub repo slug
  description   String?
  avatarUrl     String?
  imageUrl      String?  // Custom banner
  website       String?  // External link (optional)
  priority      Int      @default(0)  // Lower = shown first
  isActive      Boolean  @default(true)
  isCorporate   Boolean  @default(false)  // true = Meta, Google, etc
  clickCount    Int      @default(0)
  impressionCount Int    @default(0)
  createdAt    DateTime @default(now())
  
  @@index([priority])
  @@index([isActive])
}
```

### 2. API Endpoints
- `GET /api/featured` - List active featured projects
- `POST /api/featured` - Add new featured project (admin)
- `PUT /api/featured/[id]` - Update featured project
- `DELETE /api/featured/[id]` - Remove featured project
- `POST /api/featured/[id]/click` - Track click

### 3. Frontend Component
- Fetch featured projects on mount
- Show "Reserve Your Spot" overlay on empty spots
- Display click count stats
- Prioritize non-corporate projects

### 4. Click Tracking
- Each featured spot tracks clicks
- Stats visible in admin or footer

## File Changes

| File | Change |
|------|--------|
| `prisma/schema.prisma` | Add FeaturedProject model |
| `src/app/api/featured/route.ts` | CRUD endpoints |
| `src/app/api/featured/[id]/route.ts` | Single project + click tracking |
| `src/hooks/useFeaturedProjects.ts` | New hook |
| `src/components/home/featured-section.tsx` | New component |
| `src/app/page.tsx` | Replace SPONSORED_PROJECTS with dynamic |

## Priority Order
1. Indie/small projects (isCorporate: false)
2. Corporate projects (isCorporate: true) - only if paid
3. Empty spots show "Reserve Your Spot" overlay
