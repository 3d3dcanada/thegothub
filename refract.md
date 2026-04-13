You are a senior frontend architect and product designer.
You are refactoring a GitHub repository discovery platform.
The current implementation is visually AI-generic, structurally disorganized, and functionally incomplete.

Your task is to re-architect layout, UX hierarchy, styling system, and incomplete feature behavior while keeping existing API integrations intact.

1. DATA INTEGRITY FIXES (CRITICAL)
A. Repository Counts

The numbers "330M+ repos" and "4M active repos" must be validated.

If dynamic: fetch live totals from the GitHub Search API.

If static: define clearly sourced constants.

Do NOT hardcode placeholder values.

Add a fallback strategy for API rate limits.

B. Search Autocomplete Bug

Problem:

Autocomplete dropdown is being clipped or hidden behind banner.

Only two results show before disappearing.

Fix:

Implement proper z-index layering.

Use absolute positioning with controlled max-height.

Add scroll inside dropdown.

Ensure dropdown is rendered inside a portal if necessary.

Prevent overflow:hidden from parent containers.

2. COMPLETE LAYOUT RESTRUCTURE (NEW HIERARCHY)

Replace current layout entirely with this order:

TOP SECTION (Above the Fold)

Platform Selector (GitHub / GitLab / Bitbucket)

Global Search Bar (with working autocomplete)

Language Filter Bar (inline horizontal scroll chips)

Category Filter (compact tag-style chips)

Trending This Week (PRIMARY SECTION)

Trending MUST be the first content block.

Each trending item must:

Be a full card component.

Include: stars, forks, last updated, language, short description.

Include preview README snippet (rendered markdown).

Include open external link button (direct repo URL, NOT login page).

SECOND SECTION
Free to Use (Clarified)

This must:

Be a proper card section.

Explain clearly what “Free to Use” means.

Include badge indicators:

MIT

Apache

GPL

Other permissive licenses

Each repo card must visibly display license.

THIRD SECTION
Sponsored / Featured

Currently empty.

Replace placeholder with:

Large CTA card:
"Be the first featured project"

Clear call-to-action button.

No fake placeholder data.

FOURTH SECTION
Explore by Category

Replace giant buttons.

Use compact responsive chips or grid cards.

Must look professional, not oversized.

Remove “AI-looking” gradients.

FIFTH SECTION
Explore by Language

Smaller, structured chips.

Color-coded subtly (no neon green or teal overload).

BOTTOM SECTION
Top Projects (Move Up)

Top Projects should NOT be at bottom.
Move it under Trending or Free to Use.

3. DESIGN SYSTEM OVERHAUL

Current issues:

Purple looks AI-generated.

Neon green + teal looks artificial.

Panels look generic.

Replace with:

Professional Palette

Neutral dark gray (#0F172A style)

Subtle slate tones

Muted accent (blue-gray or deep indigo)

No neon

No glowing borders

UI System Requirements

Use components inspired by reactbits.dev

Use proper card depth (soft shadow, 2xl rounding)

Real spacing system (8px scale)

Typography hierarchy:

Strong H1 hero

Clean sans-serif

Reduced gradient usage

4. CARD SYSTEM STANDARDIZATION

All content must use structured cards:

Header

Metadata row

Description

Footer action row

No more floating text on background.

5. MODEL DETAIL PAGE FIXES

Problems:

Feels incomplete

README not rendered

Download button broken

Redirects to blank GitHub login

Fix:

A. README Rendering

Parse markdown properly.

Use a markdown renderer.

Apply syntax highlighting.

Respect relative links and images.

B. Download Button

Link directly to:
https://github.com/{owner}/{repo}

Open in new tab.

Never redirect to login.

If private repo, show clear message.

6. HEADER NAVIGATION REWORK

Current:

Trending / Categories / Explore labels unclear.

Replace with:

Discover

Trending

Categories

Languages

Submit Project

Each must scroll to section anchor.

7. PERFORMANCE & DATA

Add skeleton loaders.

Add rate limit fallback.

Add error boundary UI.

Ensure no fake data unless clearly labeled.

8. PROFESSIONAL FOOTER

Include:

Built by 3d3d.ca

Open source mission statement

Links

API usage disclosure

9. REMOVE AI-GENERIC LOOK

Strict rules:

No generic gradient hero

No giant glowing buttons

No oversized pill buttons

No fake stats

No placeholder featured items

The platform must look:

Developer-built

Minimal

Trustworthy

Production-grade

10. OUTPUT REQUIREMENTS

Return:

Refactored layout structure

Component breakdown

Styling system

Fixed search dropdown logic

Markdown rendering implementation

Updated routing behavior

Do NOT redesign APIs.
Do NOT remove repository aggregation logic.
Focus on UX, layout, clarity, and professional polish.