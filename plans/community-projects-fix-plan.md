# Community Projects Section - Fix Plan

## User-Provided API Tokens
- **GitLab:** `glpat-rO3xwmqIzsgt5kMY6e9a2m86MQp1OmtueTh6Cw.01.1210f0d99`
- **HuggingFace:** `REDACTED`
- **SourceForge:** Static data (no API needed)

---

## Current State Analysis

### What Works
- ✅ Featured projects fetch from GitHub API (not static images)
- ✅ Star range filter `stars:<1000` is correct (100-1000 range)
- ✅ 5-minute cache is acceptable
- ✅ Projects show click counts
- ✅ "Reserve Your Spot" overlays work

### What Needs Fixing

| Issue | Location | Fix Required |
|-------|----------|--------------|
| **1. Auto-switching** | `page.tsx` lines 215-226 (Trending) | Add similar interval-based cycling for Community Projects |
| **2. Default fallback projects** | `src/lib/featured-projects.ts` lines 22-87 | Replace hardcoded projects (Obsidian, PostHog, etc - all 10K+ stars) with real 100-1000 star projects |
| **3. Platform diversity** | `api/featured/route.ts` | Add GitLab, SourceForge (static), HuggingFace support |
| **4. Banner context** | `page.tsx` lines 443-446 | Add more descriptive text about the program |

---

## Implementation Plan

### Step 1: Fix Default Fallback Projects
**File:** `src/lib/featured-projects.ts`

Replace current hardcoded projects with real projects in 100-1000 star range.

### Step 2: Add Auto-Switching Interval
**File:** `src/app/page.tsx`

Add useEffect to cycle through featured projects every 30 seconds (matching trending section).

### Step 3: Multi-Platform Support
**File:** `src/app/api/featured/route.ts`

Add sources:
1. **GitHub** - Existing (using GitHub token from env)
2. **GitLab** - NEW using provided token `glpat-rO3xwmqIzsgt5kMY6e9a2m86MQp1OmtueTh6Cw.01.1210f0d99`
3. **HuggingFace** - NEW using provided token `REDACTED`
4. **SourceForge** - Static data (hardcoded)

### Step 4: Enhance Banner Context
**File:** `src/app/page.tsx` lines 443-446

Add more context about the program.

---

## Files to Modify

| Priority | File | Change |
|----------|------|--------|
| 1 | `src/lib/featured-projects.ts` | Replace default projects with 100-1000 star range projects |
| 2 | `src/app/page.tsx` | Add auto-switching interval + enhance banner text |
| 3 | `src/app/api/featured/route.ts` | Add GitLab, SourceForge, HuggingFace support |

---

## Data Flow

```
GitHub API ─┐
GitLab API  ├─> api/featured/route.ts ─> useFeaturedProjects() ─> page.tsx
HF API      │                                          │
SourceForge (static) ──────────────────────────────────┘
                                                              ↓
                                              [Auto-switch every 30 seconds]
                                                              ↓
                                              Display 4 project cards
```

---

## Success Criteria

1. ✅ Featured projects are REAL (fetched from APIs)
2. ✅ Star range: 100-1000 stars (verified in API query)
3. ✅ Auto-switch: Projects rotate every 30 seconds
4. ✅ Platforms: GitHub, GitLab, SourceForge (static), HuggingFace
5. ✅ Banner: Clear context about what Community Projects offers
6. ✅ Fallback: If API fails, show real 100-1000 star projects (not 10K+)

---

## Notes

- 5-minute cache is acceptable per user agreement
- Focus on GitHub primarily, add others as enhancement
- SourceForge uses static data (no API)
