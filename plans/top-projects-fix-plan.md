# Top Projects Section - Analysis & Fix Plan

## Current Problem

**Root Cause**: Top Projects section uses `useProjects()` hook WITHOUT a query:
```typescript
// page.tsx line 235
const { projects: projects } = useProjects({
  language: selectedLanguage === 'all' ? undefined : selectedLanguage,
  sort: 'stars',
  order: 'desc',
  perPage: 12,
});
```

When `query` is empty/undefined, the API throws an error and returns **fallback static data**:
- `blender` (125K stars)
- `godot` (98K stars)  
- `diffusers` (28K stars)
- etc.

This is why you see:
- Very high star counts (not real-time)
- Mixed/inconsistent data
- Not actually "top" by any dynamic metric

---

## Solution Options

### Option A: Force Real GitHub Search (Recommended)
Add a default query that searches all repos sorted by stars:
```typescript
const { projects: projects } = useProjects({
  query: '', // Keep empty - API handles it differently when sort=stars
  // OR use a wildcard: query: '*',
  sort: 'stars',
  order: 'desc',
  perPage: 12,
});
```

Actually, looking at the code more carefully - the API throws on empty query BUT there's caching. The issue is the fallback data gets used.

### Option B: Remove Language Filter from Top Projects
Currently it filters by `selectedLanguage` - this means when a language is selected, it returns fewer/bifferent results. For "Top Projects" maybe we want ALL top projects regardless of language filter.

### Option C: Use Trending API Instead
The "Trending" section already fetches real-time data via `useTrendingProjects()`. We could duplicate that logic for "Top Projects" but show more/different data.

---

## Recommended Fix

**In `src/app/page.tsx` around line 235:**

Change from:
```typescript
const { projects: projects } = useProjects({
  language: selectedLanguage === 'all' ? undefined : selectedLanguage,
  sort: 'stars',
  order: 'desc',
  perPage: 12,
});
```

To:
```typescript
const { projects: projects } = useProjects({
  query: '*',  // Wildcard to force real GitHub search
  language: undefined,  // Don't filter by language for "Top Projects"
  sort: 'stars',
  order: 'desc',
  perPage: 12,
});
```

This will:
1. Force the API to make a real GitHub search request
2. Remove language filter so we get the true top 12 repos overall
3. Return live star counts from GitHub

---

## Alternative: If GitHub API is Rate Limited

If the above causes too many rate limit errors, we could:
1. Show a "Top Projects (Cached)" indicator when using fallback
2. Reduce staleTime to force more frequent refreshes
3. Add manual refresh button

---

## What This Fix Achieves

- Real-time star counts from GitHub API
- Actually "top" projects (highest stars globally)
- Consistent data (no more mixed static + dynamic)
- Removes language filter to show true top picks
