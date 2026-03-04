---
name: popvisly-working-style
description: Working style, preferences, and cross-project conventions for Popvisly (the user). Use this in any Popvisly project to understand how we work together.
---

# Popvisly Working Style

## The Two Active Projects

| Project | What it is | Stack | Path |
|---------|-----------|-------|------|
| **Visual Decompiler** | SaaS ad intelligence platform | Next.js 15, Supabase, Anthropic | `/Volumes/850EVO/visual-decompiler` |
| **VAL v2** | IP Pitch site for Villains at Large | Next.js 15, Vanilla CSS | `/Volumes/850EVO/VILLAINS AT LARGE/val-v2` |

## Cross-Project Conventions

### Tech Stack Defaults

- **Framework:** Next.js 15 App Router always
- **Styling:** Vanilla CSS only — never Tailwind unless explicitly requested
- **Language:** TypeScript throughout
- **Images:** Always `next/image` (`<Image>`)
- **Comments in JSX:** Use `{/* */}` — never `//` inside JSX elements (ESLint error)
- **`//` in text content:** Write as `{"//"}` to avoid ESLint false positives

### Code Style

- Server Components by default — only add `"use client"` when genuinely needed
- Keep components focused; extract sub-components if a function exceeds ~150 lines
- Service logic in `src/lib/` — not in components or route handlers
- All CSS in a single `globals.css` — CSS variables for the design system

## How We Work Together

### Communication Style

- User is direct, gets to the point quickly
- Prefers seeing things work over lengthy explanations
- Often shares screenshots and screengrab context — use them
- Will say "lock it in" when approving a direction = proceed without further confirmation
- Says "dont worry about X" = deprioritise/drop that thing, move on

### Planning vs Execution

- For new features: brief implementation plan → user approval → execute
- For bug fixes: just fix it, document what changed
- For overnight / async work: list what will be done, execute it, write a walkthrough

### Deployment Approach

- **Visual Decompiler:** Deploys on Vercel from main branch — build must be clean
- **VAL v2:** Dev offline; V1 stays live until V2 is polished and ready to ship
- Always verify `npm run dev` compiles before wrapping up a session

### Asset Management

- Assets live on the 850EVO drive: `/Volumes/850EVO/VILLAINS AT LARGE/_ASSETS/`
- If an image doesn't update in Next.js → delete `.next/` and restart
- Transparent PNGs: always `width: auto` + `max-height` in CSS to prevent stretching

## The Overlords Domain (Hydeout Hunt System)

A Python-based local AI system powering the Red Claw Vault game:

- **Path:** `/Volumes/850EVO/VILLAINS AT LARGE/overlords-domain/`
- **Main script:** `sentinel.py` (runs with Ollama + Llama 3.2)
- **Start:** `cd "/Volumes/850EVO/VILLAINS AT LARGE/overlords-domain/" && python3 sentinel.py`
- **Backend:** Google Apps Script (cloud, always live)
- **LOOT_TABLE** and Google Script `targets` array must always be kept in sync

## Project Landscape Reference

Full Popvisly project overview: `/Users/minimac/.gemini/antigravity/brain/90e02dc7-86da-440d-b9ee-bdbc1f050567/popvisly_project_landscape.md`

VAL master context (lore + brand): `/Users/minimac/.gemini/antigravity/brain/90e02dc7-86da-440d-b9ee-bdbc1f050567/val_master_context.md`
