# Section Enhancement Plan - All Sections

## Current Sections Identified

1. **Community Projects** (already done)
   - Header: `▸ Community Projects ◂`
   - Value: `🚀 Get your project Noticed by thousands daily`
   - Features: `⏱ 1 week exposure` `💰 donate what you can` `🎯 only 4 spots.`
   - CTA: `✉ Get on the waitlist now!`
   - Sponsor: `💎 Sponsor ➤ [ko-fi] ➤ Feed a Dev! 💸`

2. **Trending Now** (line ~668)
   - Current: `🔥 Trending Now` + `Discover today's hottest projects`
   - SUGGESTED UPGRADE:
     - Header: `▸ Trending Now ◂` (brutalist)
     - Value: `⚡ Hot repos blowing up right now`
     - Facts: `📈 Updated hourly` `🎯 8 fresh picks` `🔥 Real-time data`
     - No CTA needed - content speaks for itself

3. **Top Projects** (line ~763)
   - Current: `⭐ Top Projects` + `Curated picks from the community`
   - SUGGESTED UPGRADE:
     - Header: `▸ Top Projects ◂` (brutalist)  
     - Value: `🏆 The cream of the crop`
     - Facts: `⭐ Hand-picked` `💎 Quality verified` `🌟 100% legit`
     - No CTA - content drives clicks

4. **Free to Use** (line ~839)
   - Current: `🎁 Free to Use` + `Not open source — just free!`
   - SUGGESTED UPGRADE:
     - Header: `▸ Free to Use ◂` (brutalist)
     - Value: `💸 Free tools that actually work`
     - Facts: `🔓 No licenses` `🆓 100% free` `⚖️ Terms vary`
     - Note: "Not open source" is important to keep

5. **Promote Your Project** (line ~882)
   - Current: `Promote Your Project` + `Get featured and reach thousands of developers`
   - SUGGESTED UPGRADE:
     - Header: `▸ Promote Your Project ◂` (brutalist)
     - Value: `📢 Get your work in front of 10K+ devs`
     - Facts: `🎯 1 week` `💰 Pay what you want` `⚡ Fast turnaround`
     - Already has Ko-fi link - keep as is

---

## Style Spec (consistent across all)

```
Header: text-4xl font-black text-white tracking-wider uppercase
        style={{ textShadow: '3px 3px 0 rgba(0,0,0,0.3)' }}

Value:  px-4 py-1.5 bg-black/50 text-white text-base font-bold 
        border-2 border-white/70 shadow-[4px_4px_0_rgba(255,255,255,0.3)]

Facts: px-3 py-1 bg-black/40 text-white text-sm font-semibold 
       border border-white/50
```

---

## Implementation Order

1. Trending Now
2. Top Projects  
3. Free to Use
4. Promote Your Project

Each section gets the same brutalist treatment as Community Projects.

---

## Approval Needed

- [ ] Confirm section order
- [ ] Confirm "facts" for each section (or suggest edits)
- [ ] Confirm alt-style emojis are good (using: ▸ ◂ ⏱ 💰 🎯 🚀 ⭐ 💎 ⚡ 📈 🎁 🔓 ⚖️ 📢)
