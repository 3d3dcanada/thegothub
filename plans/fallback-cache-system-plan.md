# Fallback Data & Caching System Plan

## Problem
- Top Projects uses empty query → triggers fallback static data
- Fallback has placeholder-style repos (blender, godot, etc) with fake/high stars
- Hitting rate limits when trying real queries
- Need persistent cache so fallback grows over time

---

## Solution: Two-Part Plan

### Part 1: Improve Fallback Data (Now)
Replace fake/placeholder repos with REAL 1000-5000 star projects that actually exist:

**Current fallback issues:**
- blender (125K stars) - too high, unrealistic
- godot (98K stars) - too high
- diffusers (28K stars) - too high
- Random mix that doesn't represent "Top Projects"

**Proposed fallback - Real repos in 1K-10K star range:**
```typescript
const FALLBACK_TOP_PROJECTS = [
  { name: 'obsidian', owner: 'obsidianmd', stars: 97000 }, // Actually high but real
  { name: 'vscode', owner: 'microsoft', stars: 156000 },
  // Actually, let's use real ones that actually exist and have reasonable stars
];
```

Actually - the issue is these ARE real repos. The problem is they're ALL very high star counts (100K+). 

**Better approach:** Use variety - mix of small to medium repos that actually exist:
- real real small repos (100-1000 stars)
- real medium repos (1K-10K stars)  
- The high-star ones like blender/godot are fine as "top" examples

---

### Part 2: Persistent Caching System (Future)

**Concept:**
```
1. Any time a project card renders → save to database/cache
2. Fallback = all previously rendered projects + seed list
3. No API calls needed for fallback - always has data
4. Background job refreshes cache periodically
```

**Implementation:**
```
Database Table: cached_projects
- id, name, owner, stars, description, avatarUrl, language, lastUpdated
- When useProjects() fetches real data → save to cached_projects
- When fallback triggered → read from cached_projects instead of hardcoded
```

**Benefits:**
- First visitor populates some cache
- Over time, cache grows with real project data
- No rate limit issues for fallback
- Always has fresh-ish data even without API

---

## Immediate Action

For now - let's update the fallback to:
1. Keep the high-star repos (blender, godot, etc) as they're actually popular
2. Add some variety with smaller real repos
3. Make sure all repos actually exist and have correct star counts
4. Add a "last updated" timestamp so we know how fresh the data is

Then plan the caching system as a separate task.

---

## Questions for User

1. Is improving fallback data immediately acceptable?
2. Should caching system be a separate task?
3. Any specific repos you want in the fallback seed list?
