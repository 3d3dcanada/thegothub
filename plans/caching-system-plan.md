# Project Caching System - Detailed Plan

## Goal
Build a system where every time a project card renders, it's saved to the database. Over time, this creates a persistent cache so even when GitHub API fails/rate-limits, we have real project data to display.

---

## Architecture

### Database Schema (Prisma)
```prisma
model CachedProject {
  id          String   @id @default(cuid())
  name        String
  owner       String
  description String?
  url         String
  platform    String   // "github", "gitlab", etc
  stars       Int
  forks       Int
  language    String?
  license     String?
  avatarUrl   String?
  topics      String[] // Stored as JSON array
  lastUpdated DateTime
  
  // Metadata
  cachedAt    DateTime @default(now())
  viewCount   Int      @default(0)
  
  @@unique([platform, owner, name])
  @@index([stars(sort: Desc)])
}
```

### How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                    USER VISITS PAGE                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              useProjects() hook                              │
│  - Checks: Is data in React Query cache?                  │
│  - If yes → use cached data                                 │
│  - If no → call API                                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              /api/github/search                             │
│  - Try: Fetch from GitHub API                              │
│  - Success → return data + save to DB                      │
│  - Fail (rate limit) → read from CachedProject table       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              CachedProject Table                            │
│  - Always has data from previous visitors                  │
│  - Grows over time as people browse                        │
│  - No API calls needed for fallback                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Implementation Steps

### Step 1: Add Prisma Model
File: `prisma/schema.prisma`
```prisma
model CachedProject {
  id          String   @id @default(cuid())
  name        String
  owner       String
  description String?
  url         String
  platform    String
  stars       Int
  forks       Int
  language    String?
  license     String?
  avatarUrl   String?
  topics      String   @default("[]") // JSON string
  lastUpdated DateTime
  cachedAt    DateTime @default(now())
  viewCount   Int      @default(0)
  
  @@unique([platform, owner, name])
}
```

### Step 2: Create Cache API Endpoint
File: `src/app/api/cache/route.ts`
- POST: Save project to cache (upsert)
- GET: Get cached projects with optional filters

### Step 3: Modify GitHub Search API
File: `src/app/api/github/search/route.ts`
```typescript
// When GitHub API succeeds, save to cache:
await saveToCache(projects);

// When GitHub API fails, try cache:
const cached = await getCachedProjects({ sort: 'stars', limit: 12 });
if (cached.length > 0) return cached;
```

### Step 4: Update useProjects Hook
File: `src/hooks/useProjects.ts`
- Add mutation to save fetched projects to cache
- Already uses React Query - data persists in session

---

## Key Features

### 1. Upsert Logic
- If project exists → update stars/description
- If new → insert
- Prevents duplicates

### 2. Automatic Background Saving
- Every successful API call → saves to DB
- Doesn't block the response (fire-and-forget)
- User sees data immediately, cache updates in background

### 3. Fallback Priority
```
1. React Query cache (fastest)
2. GitHub API (real-time)
3. CachedProject table (persistent fallback)
4. Hardcoded fallback (last resort)
```

### 4. Rotation/Variety
- Track `viewCount` per project
- Sort by `viewCount ASC` for fallback (show less-seen first)
- Prevents same projects always appearing

---

## Benefits

| Problem | Solution |
|---------|----------|
| Rate limits | Cache persists, fallback uses DB |
| Empty states | DB always has some data |
| Stale data | Update on every successful fetch |
| Same projects | viewCount rotation |

---

## Time Estimate
- Prisma schema: 10 min
- API endpoints: 30 min
- Modify search API: 20 min
- Testing: 20 min

---

## Questions Before Implementation
1. Should we limit cache size? (e.g., max 1000 projects)
2. Should we auto-expire old entries? (e.g., > 30 days)
3. Should we track which projects are most popular?
