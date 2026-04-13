# Banner Restructure Plan

## Objective
Remove all 3 remaining Banner components (TrendingBanner, FeaturedBanner, FreeToUseBanner) and integrate them as centered headers within their respective sections, similar to the Community Projects section.

## Current Structure

### 1. Trending Section (lines 571-607)
- **Banner**: `<TrendingBanner dateRange={trendingDateRange} />`
- **Section**: `border-rose-300 dark:border-rose-700 bg-rose-50/30 dark:bg-rose-950/10`
- **Theme**: Rose/Pink

### 2. Top Projects Section (lines 610-644)
- **Banner**: `<FeaturedBanner title="Top Projects" />`
- **Section**: `border-violet-300 dark:border-violet-700 bg-violet-50/30 dark:bg-violet-950/10`
- **Theme**: Violet/Purple

### 3. Free to Use Section (lines 646-669+)
- **Banner**: `<FreeToUseBanner />`
- **Section**: `border-emerald-300 dark:border-emerald-700 bg-emerald-50/30 dark:bg-emerald-950/10`
- **Theme**: Emerald/Teal

## Implementation Steps

### Step 1: TRENDING Section
**File**: `src/app/page.tsx` (lines 571-607)

**Changes**:
- Remove: `<TrendingBanner dateRange={trendingDateRange} />`
- Merge into section wrapper with integrated header
- Use rose/pink theme colors
- Add floating icons: TrendingUp, Zap, Flame, Fire, Activity, Gauge
- Text: "🔥 Trending Now" + "Today's hottest projects" + Daily/Weekly/Monthly pills

**Structure**:
```jsx
<section className="container mx-auto px-4 pb-8">
  <div className="relative rounded-3xl border-2 border-rose-300 dark:border-rose-700 bg-gradient-to-br from-rose-50/80 to-pink-50/80 dark:from-rose-950/40 dark:to-pink-950/40 overflow-hidden px-6 pb-6">
    {/* Floating icons */}
    <div className="absolute inset-0...">{/* rose icons */}</div>
    
    {/* Header */}
    <div className="relative z-10 py-6 text-center">
      <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100">🔥 Trending Now</h2>
      <p className="text-rose-700 dark:text-rose-300 mb-4">Discover today's hottest projects</p>
      {/* Date range pills */}
    </div>
    
    {/* Project cards continue below */}
  </div>
</section>
```

### Step 2: TOP PROJECTS Section
**File**: `src/app/page.tsx` (lines 610-644)

**Changes**:
- Remove: `<FeaturedBanner title="Top Projects" />`
- Use violet/purple theme colors
- Add floating icons: Star, Trophy, Crown, Medal, Sparkles, Gem
- Text: "⭐ Top Projects" + "Curated picks from the community" + "Updated daily"

### Step 3: FREE TO USE Section
**File**: `src/app/page.tsx` (lines 646-669+)

**Changes**:
- Remove: `<FreeToUseBanner />`
- Use emerald/teal theme colors
- Add floating icons: Gift, Heart, Sparkles, CheckCircle, Download, Package
- Text: "🎁 Free to Use" + "Not open source — just free!" + "No ads, forever"

## Design Requirements

### Floating Icons (for each section):
- Use Lucide icons appropriate to theme
- 8-10 icons per section
- Animation: y-float, x-sway, scale-pulse, opacity-fade
- Light opacity (0.15-0.35) for ghost effect
- Different sizes (w-6 h-6 to w-10 h-10)

### Colors (Light Mode):
- Rose: `from-rose-50/80 to-pink-50/80`
- Violet: `from-violet-50/80 to-purple-50/80`
- Emerald: `from-emerald-50/80 to-teal-50/80`

### Colors (Dark Mode):
- Rose: `from-rose-950/40 to-pink-950/40`
- Violet: `from-violet-950/40 to-purple-950/40`
- Emerald: `from-emerald-950/40 to-teal-950/40`

### Text Colors:
- Light: `text-rose-900`, `text-rose-700`
- Dark: `text-rose-100`, `text-rose-300`

### Container Styling:
- `rounded-3xl` for fully rounded corners
- `px-6 pb-6` for padding inside
- `border-2` with theme color
- Gradient background

### Icons to Use:
- **Trending**: TrendingUp, Zap, Flame, Fire, Activity, Gauge, BarChart2, Target
- **Top Projects**: Star, Trophy, Crown, Medal, Sparkles, Gem, Award, Hexagon
- **Free to Use**: Gift, Heart, Sparkles, CheckCircle, Download, Package, LockOpen, HandHeart

## Testing Checklist
- [ ] Light mode: gradient background visible
- [ ] Dark mode: gradient background visible  
- [ ] Text readable in both modes
- [ ] Floating icons animate smoothly
- [ ] Border rounds properly (rounded-3xl)
- [ ] Section connects to next section cleanly
- [ ] No white/light backgrounds visible
