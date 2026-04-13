# Free to Use Section - Dynamic Rotation Plan

## Problem
- Current FREE_TO_USE_PROJECTS has hardcoded data with wrong owner/repo names causing 404 errors
- User wants: random rotating projects that change on every page refresh
- Minimum 100 stars, no upper limit (unlike Featured which is <1000)
- No paid placements - all random

## Solution
Create a new API endpoint `/api/free-to-use` that fetches random free software from GitHub using topics like:
- `free-software`
- `freeware`
- `open-source` (but we'll filter out typical OSS to focus on "free as in beer")

## Implementation Plan

### Step 1: Create API endpoint
- New file: `src/app/api/free-to-use/route.ts`
- Use GitHub Search API to find repos with topics like `free-software`, `freeware`
- Filter: stars >= 100, exclude corporate owners
- Return random selection (like Featured does)

### Step 2: Create hook
- Add `useFreeToUseProjects` to `src/hooks/useProjects.ts`
- Similar structure to `useFeaturedProjects`

### Step 3: Update page.tsx
- Replace hardcoded FREE_TO_USE_PROJECTS with dynamic data from API
- Use the same card rendering logic

### Step 4: Remove old data
- Delete FREE_TO_USE_PROJECTS constant from page.tsx

## GitHub Search Queries
```
topic:free-software stars:>100
topic:freeware stars:>100  
topic:gratis stars:>100
```

## Technical Notes
- Cache results for a shorter period than Featured (maybe 1 hour)
- Use same project structure so ProjectCard works without changes
- The `repo` field handling is already in place from earlier fixes
