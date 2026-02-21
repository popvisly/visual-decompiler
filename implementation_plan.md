# Milestone 6: Competitor Libraries (Brand Tagging + Sidebars)

Improve the competitor benchmarking experience by fully integrating brand confirmed tags and updating the brand profile pages to the premium charcoal aesthetic.

## Proposed Changes

### 🎨 Theme & UI Overhaul (Dashboard)

Update component styling to match the new #FBF7EF (cream) and #141414 (charcoal) theme.

#### [MODIFY] [brand] [page.tsx](src/app/dashboard/brand/%5Bname%5D/page.tsx)

- Replace `bg-surface` with `bg-white`.
- Replace `text-txt-on-dark` with `text-[#141414]`.
- Replace `text-accent` stats with `#141414` bolded.
- Update progress bars to use `#141414`.
- Ensure AdList inherits the correct theme.

### 🛠️ Logic Refinements

Ensure brand filtering is robust across all entry points.

#### [MODIFY] [brands.ts](src/lib/brands.ts)

- Update `.or()` filters to safely handle brand names with spaces or special characters.

## Verification Plan

### Manual Verification

1. Navigate to Dashboard Sidebar.
2. Click a brand in "Market Pulse".
3. Verify the Brand Profile page loads with the new cream/charcoal theme.
4. Verify the "Decompiled Archive" in the brand profile is filtered correctly to that brand.
5. Search for a brand in the Sidebar Filter input and verify results.
