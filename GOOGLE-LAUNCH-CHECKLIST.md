# Visual Decompiler Google Launch Checklist

Last updated: 2026-05-28

## Goal

Get `https://www.visualdecompiler.com` reliably crawled, indexed, and positioned for commercial-intent searches around ad analysis, creative intelligence, and competitor ad research.

## Current Status

Already in place:
- XML sitemap at `https://www.visualdecompiler.com/sitemap.xml`
- Global metadata, Open Graph, Twitter tags, and JSON-LD organization schema
- `robots` indexing allowed in root metadata
- Content section under `/intelligence`
- Persona landing pages for multiple audience segments

Fixed in this pass:
- Added a real `robots.txt` endpoint via `src/app/robots.ts`
- Unified canonical site URLs to `https://www.visualdecompiler.com`
- Added stronger search metadata to the homepage
- Added product-page metadata
- Added pricing-page title, description, and canonical tags

## Immediate Actions

### 1. Google Search Console

- Add and verify the **Domain property** for `visualdecompiler.com`
- Submit the sitemap:
  - `https://www.visualdecompiler.com/sitemap.xml`
- Use URL Inspection and request indexing for:
  - `/`
  - `/product`
  - `/pricing`
  - `/sample`
  - `/intelligence`
  - 3 to 5 strongest briefing pages

### 2. Confirm Crawlability

Check these live URLs after deploy:
- `https://www.visualdecompiler.com/robots.txt`
- `https://www.visualdecompiler.com/sitemap.xml`

Make sure:
- homepage returns `200`
- key landing pages return `200`
- there are no accidental redirects between `www` and non-`www` that conflict with canonical intent

### 3. Priority Pages To Rank

These are the first pages worth treating as search-entry pages:
- `/`
  Target intent: `ad analysis software`, `creative analysis tool`
- `/product`
  Target intent: `how ad analysis works`, `creative intelligence software`
- `/pricing`
  Target intent: `ad analysis software pricing`, `creative review tool pricing`
- `/sample`
  Target intent: `ad analysis example`, `creative audit sample`
- `/intelligence`
  Target intent: informational discovery and linkable thought leadership

## Content Priorities

### Commercial Pages

Strengthen copy around phrases real buyers may use:
- `ad analysis software`
- `creative analysis tool`
- `ad creative intelligence`
- `competitor ad analysis`
- `creative strategy software`
- `advertising intelligence platform`

Use them naturally in:
- page titles
- H1/H2s
- intro paragraphs
- CTA context

### Informational Pages

Publish or refine articles around:
- `how to analyze an ad creative`
- `competitor ad analysis framework`
- `how creative teams defend design decisions`
- `how to present creative rationale to clients`
- `creative audit template`

These should internally link to:
- `/product`
- `/pricing`
- `/sample`

## Authority Building

Google will index the site faster with Search Console, but rankings will move more with authority and links.

Focus on:
- podcast appearances
- design and creative ops newsletters
- agency founder writeups
- product directories
- founder-led LinkedIn posts that link to useful briefing content
- partnerships or case studies that earn citations

## Tracking

Set up inside Search Console:
- Performance report for clicks, impressions, CTR, and queries
- Page indexing report
- Sitemap report

Check weekly:
- which URLs are indexed
- what queries are generating impressions
- whether `/product`, `/pricing`, and `/sample` are appearing

## Next SEO Upgrades

- Add page-specific metadata to more commercial pages if needed
- Add richer schema for articles and potentially software/product pages
- Create one or two dedicated SEO landing pages for highest-intent terms
- Review internal linking from homepage and briefings into money pages
- Tighten title tags once real Search Console query data appears
