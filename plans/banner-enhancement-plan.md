# Community Projects Banner Enhancement Plan

## Current State Analysis
- Header: Plain "Community Projects" with underline and font-mono
- Badges: White-bordered rounded pills (bg-white/20)
- Ko-fi: Small symbol button centered
- Overall: Feels generic, bland, lacks 2026 authority

---

## Enhancement Proposal: "Neo-Brutalist Sponsor Zone"

### 1. Speech Bubble Layout
```
┌─ "Sponsor" ─┐    ┌─ "Feed a Dev!" ─┐
│  [speech]   │───▶│    [speech]     │
└─────────────┘    └──────────────────┘
         └─ ▶ Ko-fi Button ◀ ─┘
```

**Speech Bubble Design:**
- CSS triangles pointing inward to ko-fi button
- Dark semi-transparent background with colored border
- Slight rotation (-3deg / +3deg) for organic feel
- Font: Bold, slightly larger (text-lg)

### 2. Typography Upgrades
| Element | Current | Proposed |
|---------|---------|----------|
| Header | text-3xl, underline, font-mono | text-4xl, uppercase, letter-spacing-wide, Neo-brutalist shadow |
| Badges | rounded-full, bg-white/20 | sharp corners (rounded-none or sm), offset box-shadow |
| Tagline | text-sm | text-base, font-bold |

### 3. Neo-Brutalist Elements
- **Offset borders**: `border-2 border-white translate-x-1 translate-y-1`
- **Hard shadows**: No blur, solid offset color
- **High contrast**: White text on dark, accent highlights
- **Geometric accents**: Small squares/dots as decorative elements

### 4. Micro-interactions
- Subtle pulse animation on ko-fi button
- Hover lift on speech bubbles
- Shimmer/glitter effect on header (optional)

---

## Implementation Steps

### Step 1: Replace Badge/Bubble Area
- Convert badge pills to speech bubbles
- Add CSS triangle pointers using ::before/::after
- Position flanking the ko-fi button

### Step 2: Enhance Header
- Add neo-brutalist shadow effect
- Consider gradient text or letter-spacing
- Add decorative corner elements

### Step 3: Ko-fi Button Enhancement
- Add subtle glow/pulse animation
- Frame with small geometric elements

### Step 4: Background/Flow
- Add subtle animated gradient or mesh
- Consider floating geometric shapes

---

## Technical Implementation Notes

### Speech Bubble CSS (Tailwind + arbitrary values)
```jsx
// Left bubble
<div className="relative -rotate-3">
  <span className="bg-black/60 border-2 border-white px-4 py-2 text-white">
    Sponsor
  </span>
  {/* Triangle pointing right */}
  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full 
    border-8 border-transparent border-l-white" />
</div>

// Right bubble  
<div className="relative rotate-3">
  <span className="bg-black/60 border-2 border-white px-4 py-2 text-white">
    Feed a Dev!
  </span>
  {/* Triangle pointing left */}
  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full 
    border-8 border-transparent border-r-white" />
</div>
```

---

## Approval Needed
1. Speech bubble text: "Sponsor" / "Feed a Dev!" or alternative?
2. Color scheme: Keep white/neutral or add accent color?
3. Header style preference: Bold/cropped or elegant/underlined?
4. Animation intensity: Subtle or playful?
