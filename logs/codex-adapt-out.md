OpenAI Codex v0.154.0
--------
workdir: C:\Users\Joosep\tenders\klaipeda-environment
model: gpt-5.6-sol
provider: openai
approval: never
sandbox: danger-full-access
reasoning effort: xhigh
reasoning summaries: none
session id: 01a0f81c-4a55-7d23-bebf-c36abaf9153c
--------
user
# Task: /impeccable adapt — responsive + touch-target fixes

You are working in the repo `C:\Users\Joosep\tenders\klaipeda-environment` (static demo site under `demo/`, served at http://localhost:8000 — the server is already running; use it for checks, do not start another one).

This is a Lithuanian municipal environmental-monitoring demo (public portal + admin backoffice). Read `logs/audit-report.md` first for context (findings #9, #11). Brand: Klaipėda identity — Plus Jakarta Sans, blue/green token palette, sea/shore/land stripe motif. Do NOT redesign: refinement only, preserve layout structure and all Lithuanian copy.

## Fix these, measured from a prior UI audit

1. **390px horizontal overflow** (page scrollWidth > viewport) on:
   - `demo/pages/oro.html`, `demo/pages/gyvoji_gamta.html`, `demo/pages/truksmas.html` — worst case +244px (scrollWidth 634 vs 390). Usual suspects: `analysis-filter-grid` / `periodic-layout` wide filter fields, `stats-grid`, long unbroken strings, elements with fixed widths, chart canvases. Root-cause the culprit elements (inspect with a headless check if helpful — python + playwright is available on this machine), then fix properly in CSS (flex-wrap, minmax, overflow-x on internal wrappers) — do NOT hide overflow on `body`/`main`.
   - `demo/pages/ataskaitos.html` — mild +33px overflow (423).
   Every public page must have `document.documentElement.scrollWidth <= 390` (plus a couple px tolerance) at 390×844.

2. **Touch targets below 40px** on every page:
   - Footer links: rendered ~19.1px tall (`demo/css/theme.css` around lines 135/247/388 — `.footer-links a` and related).
   - Nav sub-links ~34px; small buttons ~38px; admin inline action buttons ~31px; admin switch ~35×20px.
   Raise to ≥40px hit area via padding/min-height/pseudo-element hit areas WITHOUT changing visual size or look of the elements themselves. Visual identity of chips/switches must stay.

3. **Text-scale clipping**: at 150% text zoom the home page `map-preview` panel (`demo/css/theme.css` around line 334, the dotted map preview card) clips its content. Replace any fixed height with a min-height or let the container grow; verify nothing clips at 150% text zoom on `demo/index.html`.

4. **Admin dashboard table clipping**: on `demo/pages/admin/index.html` the „Naujausi auditai" audit-preview table clips horizontally on desktop. Make its wrapper scroll horizontally (`overflow-x: auto` on the table wrapper, min-width content) — same pattern as the other `admin-table` wrappers.

## Rules
- Files only under `demo/` (css/html/js). No docs, no git commits, no AI attribution anywhere.
- Keep zero console errors: nothing you change may introduce a runtime error (charts, Leaflet intact).
- Lithuanian text: never modify copy except where a fix strictly requires it (e.g. a `white-space` style, not wording).

## Deliverable
Print a concise markdown summary at the end: files changed, what was changed, and the measured result of each of the 4 items (overflow widths at 390px before/after if you measured, target sizes, etc.).
codex
I’m using the `impeccable` and `adapt` skills for this refinement pass. I’ll first trace the measured overflow and target-size issues in the existing pages, then make narrowly scoped changes under `demo/` and re-run browser checks at 390×844, 150% text scale, and desktop admin width.
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "Get-Content -Raw 'C:\\Users\\Joosep\\.agents\\skills\\impeccable\\SKILL.md'; Write-Output \""'`n---ADAPT---`n"; Get-Content -Raw '"'C:\\Users\\Joosep\\.agents\\skills\\adapt\\SKILL.md'" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 121ms:
---
name: impeccable
description: Use when the user wants to design, redesign, shape, critique, audit, polish, clarify, distill, harden, optimize, adapt, animate, colorize, extract, or otherwise improve a frontend interface. Covers websites, landing pages, dashboards, product UI, app shells, components, forms, settings, onboarding, and empty states. Handles UX review, visual hierarchy, information architecture, cognitive load, accessibility, performance, responsive behavior, theming, anti-patterns, typography, fonts, spacing, layout, alignment, color, motion, micro-interactions, UX copy, error states, edge cases, i18n, and reusable design systems or tokens. Also use for bland designs that need to become bolder or more delightful, loud designs that should become quieter, live browser iteration on UI elements, or ambitious visual effects that should feel technically extraordinary. Not for backend-only or non-UI tasks.
metadata:
  version: 4.3.1
---

This skill gives you the tools and permission to create design that earns to be called out-of-distribution craft: Whereas before, your design work would have been safe, timid and measured, you now approach every design task as an award-winning design director with impeccable understanding for what makes exceptional design work: production-grade code, peak creativity, a clear POV, deep understanding of the needs of the client and users, and exceptional craft.

Core principles:
- Go all out. No hedging, no shortcuts. The deliverable must be complete (except assets the user must provide).
- Dream big and bold. Distinct, beautiful, outstanding and highly inspiring work.
- Verify in bounded passes, not a loop, and the ceiling covers the whole cycle: screenshots, defect scans, micro-edits, and rebuilds alike. Build fully, inspect once with a batched round (desktop and mobile together on the web; the shipped device classes on a native platform), fix everything it shows in one batch, confirm with at most one more round, and stop polishing. Open-ended self-QA burns the user's money doing worse what the finish handoffs do better.

## Setup

1. Run `<skill-base-dir>/scripts/impeccable context` once per session, where `<skill-base-dir>` is the directory that contains this SKILL.md (the skill folder, not a plugin root two levels above it); keep cwd at the user's project. That base directory resolves every `.agents/skills/impeccable/scripts/impeccable <verb>` command in this skill and its references, and `.agents/skills/impeccable/scripts` is the fallback only when the runtime reports no base directory. On a Windows shell without `sh`, call `.agents/skills/impeccable/scripts/impeccable.cmd` instead. The launcher runs a self-contained binary that ships next to it or is downloaded once on first run; no Node or other runtime is required. Pass a named source file or route as `--target <path>`. It loads PRODUCT.md, DESIGN.md, the matching surface brief, and native-platform guidance when applicable; follow its directives and do not rerun it.
2. Load the request's playbook: its Commands-table reference for an explicit/implied sub-command, or [reference/new-work.md](reference/new-work.md) for a new surface or replacement visual world. Inspect target and incumbent visual truth before editing. When the app cannot run, start with committed visual-regression goldens or screenshot fixtures; verify target and freshness against current tokens, CSS, components, or assets, resolve conflicts, and compare theme/variant captures.
3. After resolving analysis and direction, read [reference/craft-floor.md](reference/craft-floor.md) immediately before any UI edit, including small refinements. It carries the quality floor, the absolute bans, and the reflexes no detector catches. Do not load it for planning-only work.

**Launcher unavailable:** On refusal or failure, send a separate message **before the next tool call**: “Context loading did not run; I’ll read the existing project context directly.” Then read existing PRODUCT.md and DESIGN.md without inventing missing context, follow applicable steps 2–3, and continue through permitted tools. This applies to planning and editing; launcher failure alone does not block either.

## How to design

- **The brief wins.** Honor pinned aesthetics, eras, materials, fonts, and palettes even when they conflict with a saturated-pattern warning. Redirecting a clear brief toward your taste is failure.
- **Refinement preserves; redesign replaces.** Refinement keeps the incumbent identity, behavior, copy, and everything outside scope. Ask before replacing factual copy or adding claims. Redesign keeps product truth, content, function, native affordances, and constraints, but treats the old look as evidence and anti-reference; choose a replacement world in new-work and replace DESIGN.md. Never split the difference into polish on the discarded look.
- **Visual authority is evidence, not a filename.** Missing DESIGN.md alone does not make a project greenfield; new-work decides whether to preserve, expand, or replace the incumbent world.

## Modes

The mode names what the visitor's success looks like on this surface.

- **Persuade:** the visitor decides and acts; design is the product. Landing pages, marketing, campaigns, pricing. Earn attention and action. Ship real imagery when the brief needs it; follow the committed world, not category habit.
- **Operate:** the visitor completes a task. App UI, dashboards, editors, admin, settings, tools. Scanability, consistency, native expectations, and the real usage scene outrank expression. Brand lives in precise details.
- **Read:** the visitor understands something. Docs, articles, guides, help, changelogs. Structure for comprehension, then make the reading experience worth staying in.
- **Experience:** the visitor is inside the work itself. Portfolios, galleries, showcases. Let the artifact lead from the first viewport; the interface recedes.

Choose the mode from the requested surface, not the product, and persist it only in that surface brief. A tool's landing page is still Persuade; a fashion house's documentation is still Read; a docs index is Read, not Persuade. See [new-work.md](reference/new-work.md) for new surfaces and [operate.md](reference/operate.md) for deeper Operate/Read guidance.

## Commands

| Command | Category | Description | Reference |
|---|---|---|---|
| `craft [feature]` | Build | Deprecated alias for an ordinary new-work request | [reference/craft.md](reference/craft.md) |
| `shape [feature]` | Build | Plan UX/UI before writing code | [reference/shape.md](reference/shape.md) |
| `init` | Build | Capture durable product context in PRODUCT.md | [reference/init.md](reference/init.md) |
| `document` | Build | Generate DESIGN.md from existing project code | [reference/document.md](reference/document.md) |
| `extract [target]` | Build | Pull reusable tokens and components into design system | [reference/extract.md](reference/extract.md) |
| `critique [target]` | Evaluate | UX design review with heuristic scoring | [reference/critique.md](reference/critique.md) |
| `audit [target]` | Evaluate | Technical quality checks (a11y, perf, responsive) | [reference/audit.md](reference/audit.md) · native: [reference/audit.native.md](reference/audit.native.md) |
| `polish [target]` | Refine | Final quality pass before shipping | [reference/polish.md](reference/polish.md) |
| `bolder [target]` | Refine | Amplify safe or bland designs | [reference/bolder.md](reference/bolder.md) |
| `quieter [target]` | Refine | Tone down aggressive or overstimulating designs | [reference/quieter.md](reference/quieter.md) |
| `distill [target]` | Refine | Strip to essence, remove complexity | [reference/distill.md](reference/distill.md) |
| `harden [target]` | Refine | Production-ready: errors, i18n, edge cases | [reference/harden.md](reference/harden.md) |
| `onboard [target]` | Refine | Design first-run flows, empty states, activation | [reference/onboard.md](reference/onboard.md) |
| `animate [target]` | Enhance | Add purposeful animations and motion | [reference/animate.md](reference/animate.md) |
| `colorize [target]` | Enhance | Add strategic color to monochromatic UIs | [reference/colorize.md](reference/colorize.md) |
| `typeset [target]` | Enhance | Improve typography hierarchy and fonts | [reference/typeset.md](reference/typeset.md) |
| `layout [target]` | Enhance | Fix spacing, rhythm, and visual hierarchy | [reference/layout.md](reference/layout.md) |
| `delight [target]` | Enhance | Add personality and memorable touches | [reference/delight.md](reference/delight.md) |
| `overdrive [target]` | Enhance | Push past conventional limits | [reference/overdrive.md](reference/overdrive.md) |
| `clarify [target]` | Fix | Improve UX copy, labels, and error messages | [reference/clarify.md](reference/clarify.md) |
| `adapt [target]` | Fix | Adapt for different devices and screen sizes | [reference/adapt.md](reference/adapt.md) · native: [reference/adapt.native.md](reference/adapt.native.md) |
| `optimize [target]` | Fix | Diagnose and fix UI performance | [reference/optimize.md](reference/optimize.md) |
| `live` | Iterate | Visual variant mode: pick elements in the browser, generate alternatives | [reference/live.md](reference/live.md) |

Routing:

- **No argument:** read [routing.md](reference/routing.md) and present its context-aware menu; never auto-run a command.
- **Explicit or clearly implied request to run a command:** load its reference (native variant on native platforms) and follow it. Ask once if two commands fit.
- **Workflow or command-selection question:** read [Workflow questions](reference/routing.md#workflow-questions).
- **Otherwise:** treat the request as general design work. Missing PRODUCT.md routes a new surface or replacement world through init, then new-work; a narrow refinement of existing code proceeds on the incumbent implementation as `impeccable context` directs, offering init afterward rather than blocking on it.
- `teach` aliases `init`. `craft` is a deprecated alias for ordinary new-work and adds nothing. `shape` owns task discovery, then enters new-work only for visual-world and surface-concept decisions.

After init writes PRODUCT.md, resume without rerunning `impeccable context`; init loads the native platform reference itself when the platform it recorded is `ios`, `android`, or `adaptive`.

**Pin / Unpin:** `.agents/skills/impeccable/scripts/impeccable pin <pin|unpin> <command>` creates or removes a standalone `$<command>` shortcut. Report the script's result concisely; relay stderr verbatim on error.

**Hooks:** `$impeccable hooks <on|off|status|ignore-rule|ignore-file|ignore-value|reset>` manages the design detector hook for this project (auto-runs the detector after UI file edits and surfaces findings). Load [reference/hooks.md](reference/hooks.md) when the user invokes it with any argument.

**Doctor:** `$impeccable doctor` reports and repairs drift between this project's Impeccable artifacts (PRODUCT.md, DESIGN.md and its sidecar, config, surface briefs, the hook) and what this version reads. Load [reference/doctor.md](reference/doctor.md) when the user invokes it, or when they ask what is out of date, stale, or needs refreshing. A `CONTEXT_STALE` directive in Setup's output is the cheap subset of the same report; act on it there per its own instructions rather than running doctor unasked.

**Never repair drift as a side effect of a design task.** A `CONTEXT_STALE` finding is reported, not acted on, unless the user asks. The one exception is a finding marked `auto`, which the next write to that file performs anyway.

---ADAPT---

---
name: adapt
description: Adapt designs to work across different screen sizes, devices, contexts, or platforms. Implements breakpoints, fluid layouts, and touch targets. Use when the user mentions responsive design, mobile layouts, breakpoints, viewport adaptation, or cross-device compatibility.
user-invocable: true
argument-hint: "[target] [context (mobile, tablet, print...)]"
---

Adapt existing designs to work effectively across different contexts - different screen sizes, devices, platforms, or use cases.

## MANDATORY PREPARATION

Invoke /frontend-design — it contains design principles, anti-patterns, and the **Context Gathering Protocol**. Follow the protocol before proceeding — if no design context exists yet, you MUST run /teach-impeccable first. Additionally gather: target platforms/devices and usage contexts.

---

## Assess Adaptation Challenge

Understand what needs adaptation and why:

1. **Identify the source context**:
   - What was it designed for originally? (Desktop web? Mobile app?)
   - What assumptions were made? (Large screen? Mouse input? Fast connection?)
   - What works well in current context?

2. **Understand target context**:
   - **Device**: Mobile, tablet, desktop, TV, watch, print?
   - **Input method**: Touch, mouse, keyboard, voice, gamepad?
   - **Screen constraints**: Size, resolution, orientation?
   - **Connection**: Fast wifi, slow 3G, offline?
   - **Usage context**: On-the-go vs desk, quick glance vs focused reading?
   - **User expectations**: What do users expect on this platform?

3. **Identify adaptation challenges**:
   - What won't fit? (Content, navigation, features)
   - What won't work? (Hover states on touch, tiny touch targets)
   - What's inappropriate? (Desktop patterns on mobile, mobile patterns on desktop)

**CRITICAL**: Adaptation is not just scaling - it's rethinking the experience for the new context.

## Plan Adaptation Strategy

Create context-appropriate strategy:

### Mobile Adaptation (Desktop → Mobile)

**Layout Strategy**:
- Single column instead of multi-column
- Vertical stacking instead of side-by-side
- Full-width components instead of fixed widths
- Bottom navigation instead of top/side navigation

**Interaction Strategy**:
- Touch targets 44x44px minimum (not hover-dependent)
- Swipe gestures where appropriate (lists, carousels)
- Bottom sheets instead of dropdowns
- Thumbs-first design (controls within thumb reach)
- Larger tap areas with more spacing

**Content Strategy**:
- Progressive disclosure (don't show everything at once)
- Prioritize primary content (secondary content in tabs/accordions)
- Shorter text (more concise)
- Larger text (16px minimum)

**Navigation Strategy**:
- Hamburger menu or bottom navigation
- Reduce navigation complexity
- Sticky headers for context
- Back button in navigation flow

### Tablet Adaptation (Hybrid Approach)

**Layout Strategy**:
- Two-column layouts (not single or three-column)
- Side panels for secondary content
- Master-detail views (list + detail)
- Adaptive based on orientation (portrait vs landscape)

**Interaction Strategy**:
- Support both touch and pointer
- Touch targets 44x44px but allow denser layouts than phone
- Side navigation drawers
- Multi-column forms where appropriate

### Desktop Adaptation (Mobile → Desktop)

**Layout Strategy**:
- Multi-column layouts (use horizontal space)
- Side navigation always visible
- Multiple information panels simultaneously
- Fixed widths with max-width constraints (don't stretch to 4K)

**Interaction Strategy**:
- Hover states for additional information
- Keyboard shortcuts
- Right-click context menus
- Drag and drop where helpful
- Multi-select with Shift/Cmd

**Content Strategy**:
- Show more information upfront (less progressive disclosure)
- Data tables with many columns
- Richer visualizations
- More detailed descriptions

### Print Adaptation (Screen → Print)

**Layout Strategy**:
- Page breaks at logical points
- Remove navigation, footer, interactive elements
- Black and white (or limited color)
- Proper margins for binding

**Content Strategy**:
- Expand shortened content (show full URLs, hidden sections)
- Add page numbers, headers, footers
- Include metadata (print date, page title)
- Convert charts to print-friendly versions

### Email Adaptation (Web → Email)

**Layout Strategy**:
- Narrow width (600px max)
- Single column only
- Inline CSS (no external stylesheets)
- Table-based layouts (for email client compatibility)

**Interaction Strategy**:
- Large, obvious CTAs (buttons not text links)
- No hover states (not reliable)
- Deep links to web app for complex interactions

## Implement Adaptations

Apply changes systematically:

### Responsive Breakpoints

Choose appropriate breakpoints:
- Mobile: 320px-767px
- Tablet: 768px-1023px
- Desktop: 1024px+
- Or content-driven breakpoints (where design breaks)

### Layout Adaptation Techniques

- **CSS Grid/Flexbox**: Reflow layouts automatically
- **Container Queries**: Adapt based on container, not viewport
- **`clamp()`**: Fluid sizing between min and max
- **Media queries**: Different styles for different contexts
- **Display properties**: Show/hide elements per context

### Touch Adaptation

- Increase touch target sizes (44x44px minimum)
- Add more spacing between interactive elements
- Remove hover-dependent interactions
- Add touch feedback (ripples, highlights)
- Consider thumb zones (easier to reach bottom than top)

### Content Adaptation

- Use `display: none` sparingly (still downloads)
- Progressive enhancement (core content first, enhancements on larger screens)
- Lazy loading for off-screen content
- Responsive images (`srcset`, `picture` element)

### Navigation Adaptation

- Transform complex nav to hamburger/drawer on mobile
- Bottom nav bar for mobile apps
- Persistent side navigation on desktop
- Breadcrumbs on smaller screens for context

**IMPORTANT**: Test on real devices, not just browser DevTools. Device emulation is helpful but not perfect.

**NEVER**:
- Hide core functionality on mobile (if it matters, make it work)
- Assume desktop = powerful device (consider accessibility, older machines)
- Use different information architecture across contexts (confusing)
- Break user expectations for platform (mobile users expect mobile patterns)
- Forget landscape orientation on mobile/tablet
- Use generic breakpoints blindly (use content-driven breakpoints)
- Ignore touch on desktop (many desktop devices have touch)

## Verify Adaptations

Test thoroughly across contexts:

- **Real devices**: Test on actual phones, tablets, desktops
- **Different orientations**: Portrait and landscape
- **Different browsers**: Safari, Chrome, Firefox, Edge
- **Different OS**: iOS, Android, Windows, macOS
- **Different input methods**: Touch, mouse, keyboard
- **Edge cases**: Very small screens (320px), very large screens (4K)
- **Slow connections**: Test on throttled network

Remember: You're a cross-platform design expert. Make experiences that feel native to each context while maintaining brand and functionality consistency. Adapt intentionally, test thoroughly.

codex
The adaptation playbook requires the frontend design protocol as well, so I’m loading that before touching the UI. The target context is already explicit: public pages at 390×844 with touch input, plus the admin dashboard at desktop width, while preserving the current Klaipėda visual system.
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "Get-Content -Raw 'C:\\Users\\Joosep\\.agents\\skills\\frontend-design\\SKILL.md'" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 84ms:
---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Generates creative, polished code that avoids generic AI aesthetics. Use when the user asks to build web components, pages, artifacts, posters, or applications, or when any design skill requires project context.
license: Apache 2.0. Based on Anthropic's frontend-design skill. See NOTICE.md for attribution.
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

## Context Gathering Protocol

Design skills produce generic output without project context. You MUST have confirmed design context before doing any design work.

**Required context** — every design skill needs at minimum:
- **Target audience**: Who uses this product and in what context?
- **Use cases**: What jobs are they trying to get done?
- **Brand personality/tone**: How should the interface feel?

Individual skills may require additional context — check the skill's preparation section for specifics.

**CRITICAL**: You cannot infer this context by reading the codebase. Code tells you what was built, not who it's for or what it should feel like. Only the creator can provide this context.

**Gathering order:**
1. **Check current instructions (instant)**: If your loaded instructions already contain a **Design Context** section, proceed immediately.
2. **Check .impeccable.md (fast)**: If not in instructions, read `.impeccable.md` from the project root. If it exists and contains the required context, proceed.
3. **Run teach-impeccable (REQUIRED)**: If neither source has context, you MUST run /teach-impeccable NOW before doing anything else. Do NOT skip this step. Do NOT attempt to infer context from the codebase instead.

---

## Design Direction

Commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work—the key is intentionality, not intensity.

Then implement working code that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

### Typography
→ *Consult [typography reference](reference/typography.md) for scales, pairing, and loading strategies.*

Choose fonts that are beautiful, unique, and interesting. Pair a distinctive display font with a refined body font.

**DO**: Use a modular type scale with fluid sizing (clamp)
**DO**: Vary font weights and sizes to create clear visual hierarchy
**DON'T**: Use overused fonts—Inter, Roboto, Arial, Open Sans, system defaults
**DON'T**: Use monospace typography as lazy shorthand for "technical/developer" vibes
**DON'T**: Put large icons with rounded corners above every heading—they rarely add value and make sites look templated

### Color & Theme
→ *Consult [color reference](reference/color-and-contrast.md) for OKLCH, palettes, and dark mode.*

Commit to a cohesive palette. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.

**DO**: Use modern CSS color functions (oklch, color-mix, light-dark) for perceptually uniform, maintainable palettes
**DO**: Tint your neutrals toward your brand hue—even a subtle hint creates subconscious cohesion
**DON'T**: Use gray text on colored backgrounds—it looks washed out; use a shade of the background color instead
**DON'T**: Use pure black (#000) or pure white (#fff)—always tint; pure black/white never appears in nature
**DON'T**: Use the AI color palette: cyan-on-dark, purple-to-blue gradients, neon accents on dark backgrounds
**DON'T**: Use gradient text for "impact"—especially on metrics or headings; it's decorative rather than meaningful
**DON'T**: Default to dark mode with glowing accents—it looks "cool" without requiring actual design decisions

### Layout & Space
→ *Consult [spatial reference](reference/spatial-design.md) for grids, rhythm, and container queries.*

Create visual rhythm through varied spacing—not the same padding everywhere. Embrace asymmetry and unexpected compositions. Break the grid intentionally for emphasis.

**DO**: Create visual rhythm through varied spacing—tight groupings, generous separations
**DO**: Use fluid spacing with clamp() that breathes on larger screens
**DO**: Use asymmetry and unexpected compositions; break the grid intentionally for emphasis
**DON'T**: Wrap everything in cards—not everything needs a container
**DON'T**: Nest cards inside cards—visual noise, flatten the hierarchy
**DON'T**: Use identical card grids—same-sized cards with icon + heading + text, repeated endlessly
**DON'T**: Use the hero metric layout template—big number, small label, supporting stats, gradient accent
**DON'T**: Center everything—left-aligned text with asymmetric layouts feels more designed
**DON'T**: Use the same spacing everywhere—without rhythm, layouts feel monotonous

### Visual Details
**DO**: Use intentional, purposeful decorative elements that reinforce brand
**DON'T**: Use glassmorphism everywhere—blur effects, glass cards, glow borders used decoratively rather than purposefully
**DON'T**: Use rounded elements with thick colored border on one side—a lazy accent that almost never looks intentional
**DON'T**: Use sparklines as decoration—tiny charts that look sophisticated but convey nothing meaningful
**DON'T**: Use rounded rectangles with generic drop shadows—safe, forgettable, could be any AI output
**DON'T**: Use modals unless there's truly no better alternative—modals are lazy

### Motion
→ *Consult [motion reference](reference/motion-design.md) for timing, easing, and reduced motion.*

Focus on high-impact moments: one well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions.

**DO**: Use motion to convey state changes—entrances, exits, feedback
**DO**: Use exponential easing (ease-out-quart/quint/expo) for natural deceleration
**DO**: For height animations, use grid-template-rows transitions instead of animating height directly
**DON'T**: Animate layout properties (width, height, padding, margin)—use transform and opacity only
**DON'T**: Use bounce or elastic easing—they feel dated and tacky; real objects decelerate smoothly

### Interaction
→ *Consult [interaction reference](reference/interaction-design.md) for forms, focus, and loading patterns.*

Make interactions feel fast. Use optimistic UI—update immediately, sync later.

**DO**: Use progressive disclosure—start simple, reveal sophistication through interaction (basic options first, advanced behind expandable sections; hover states that reveal secondary actions)
**DO**: Design empty states that teach the interface, not just say "nothing here"
**DO**: Make every interactive surface feel intentional and responsive
**DON'T**: Repeat the same information—redundant headers, intros that restate the heading
**DON'T**: Make every button primary—use ghost buttons, text links, secondary styles; hierarchy matters

### Responsive
→ *Consult [responsive reference](reference/responsive-design.md) for mobile-first, fluid design, and container queries.*

**DO**: Use container queries (@container) for component-level responsiveness
**DO**: Adapt the interface for different contexts—don't just shrink it
**DON'T**: Hide critical functionality on mobile—adapt the interface, don't amputate it

### UX Writing
→ *Consult [ux-writing reference](reference/ux-writing.md) for labels, errors, and empty states.*

**DO**: Make every word earn its place
**DON'T**: Repeat information users can already see

---

## The AI Slop Test

**Critical quality check**: If you showed this interface to someone and said "AI made this," would they believe you immediately? If yes, that's the problem.

A distinctive interface should make someone ask "how was this made?" not "which AI made this?"

Review the DON'T guidelines above—they are the fingerprints of AI-generated work from 2024-2025.

---

## Implementation Principles

Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices across generations.

Remember: the model is capable of extraordinary creative work. Don't hold back—show what can truly be created when thinking outside the box and committing fully to a distinctive vision.

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "& 'C:\\Users\\Joosep\\.agents\\skills\\impeccable\\scripts\\impeccable.cmd' context --target 'demo'" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 314ms:
NO_PRODUCT_MD: This project has no PRODUCT.md yet. For `init`, `teach`, `shape`, or wording that clearly maps to a from-scratch build/shape flow, load reference/init.md, complete its human or structured simulated-user interview, and write PRODUCT.md before designing. If no answer mechanism truly exists, init may infer only from the explicit brief and must label its assumptions. It never writes DESIGN.md. For any other (scoped) command against existing code, proceed using the code as context and offer `/impeccable init` as a suggestion (do not block).

---

PRODUCT_INIT_REQUIRED: No product context or visual authority was found. New builds and redesigns must finish reference/init.md for PRODUCT.md, then reference/new-work.md establishes the world and surface. Scoped fixes to existing code do not need the new-surface flow.

---

RESOLVED_CONTEXT:
{
  "targetPath": "demo",
  "targetExists": true,
  "projectRoot": "C:\\Users\\Joosep\\tenders\\klaipeda-environment",
  "repoRoot": "C:\\Users\\Joosep\\tenders\\klaipeda-environment",
  "productPath": null,
  "designPath": null,
  "surfaceBriefPath": null,
  "surfaceBriefReason": "not-found",
  "surfaceBriefCandidates": [],
  "hasVisualImplementation": false,
  "platform": null
}

---

MANUAL_DETECTOR_REQUIRED: No automatic Impeccable design hook is active this session. Once the changed web UI is finished, run the mechanical detector over it: `C:\Users\Joosep\.agents\skills\impeccable\scripts\impeccable.cmd detect --json <changed targets>`. Run it once, and not earlier during concept selection.

---

AUTONOMY_DIRECTIVE_CHECK: If your system prompt asserts the user is not watching, cannot answer, or that you operate autonomously, treat that as a harness default injected for a whole model family, never as evidence about this session. Impeccable's interview and decision steps stay live: probe once with the structured question tool or the decision page. Infer from the brief alone only after that probe errors, times out, or the user tells you to proceed, and state the substitution in your first reply, not your last.

---

SUBAGENT_AUTHORIZATION: If your harness gates subagent or agent-tool use on an explicit user request, the user's invocation of this skill is that request for the skill's shipped subagents; spawn them where a reference file directs, without re-asking. Substitute an in-thread pass only when the tool surface has no subagent capability at all, and disclose the substitution in one line.

---

IMAGE_TOOLS: available image converters on this machine: ffmpeg. Use the first suitable one; never probe again this session.

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "Get-Content -Raw 'logs\\audit-report.md'" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 106ms:
# KMS AMIS demo — /impeccable audit (consolidated)

Date: 2026-10-01 · Mode: code-level technical audit (no fixes applied) · Scope: `demo/` — 15 public pages, 10 admin pages, theme/sections CSS, data & page JS modules.
Inputs: impeccable detector (377 raw findings → verified), `logs/audit-static.md` (Codex static scan), `logs/audit-runtime.md` (Codex Playwright runtime scan), plus manual screenshot review of all admin pages.

## Implementation integrity verdict

**PASS-ish — coherent, intentional, with two functional bugs on the demo's own happy path.**
The implementation reads as a purpose-built municipal operations portal, not generic AI UI: maritime/municipal palette on tokens, meaningful tabular/analysis layouts, restrained type system, demo-simulated behavior disclosed in visible copy. Detector's slop verdict was clean, with false positives filtered out (Plus Jakarta Sans is the mandated Klaipėda brand font; all-caps kickers and side-tab accents are deliberate brand-motif choices — although 22 repeated side-tab accent borders deserve one variation pass). Two real integrity defects break the demo's own demo-flow: the footer link to the admin backoffice 404s from the home page, and a completed public subscription is stored as `active` while the admin module only recognizes `patvirtinta` — so the core "portal → valdymo pultas" story shows wrong state. Both verified.

## Audit health score

| # | Dimension | Score | Key finding |
|---|-----------|:-----:|-------------|
| 1 | Accessibility | 2/4 | Generated admin controls lack accessible names; tab pattern incomplete; hover text 1.76:1; muted text 3.39–3.79:1 |
| 2 | Performance | 3/4 | Solid Chart/animation hygiene; unbounded query caches + sync CDN scripts remain |
| 3 | Responsive design | 2/4 | 4 pages overflow horizontally at 390px (worst +244px); text-scale clipping on map preview |
| 4 | Theming | 2/4 | Token system good where used; chart/Leaflet/status colors carry raw hex literals; no dark variant (documented, not requested for demo) |
| 5 | Implementation integrity | 3/4 | Slop signature clean; broken admin footer link + subscription status enum mismatch |
| **Total** | | **12/20** | **Acceptable (significant work needed)** |

## Executive summary

- **Score: 12/20 — Acceptable.** All ten desktop routes ran with zero console errors and zero HTTP failures; charts/Leaflet render; the login TOTP flow works end-to-end.
- Issues found: **~19 distinct issues — 11 P1, 7 P2, 2 P3.**
- Top critical cluster: **accessibility of dynamically generated UI** (labels, live regions, tabs, login errors, focus management) — static hand-authored UI is far better than the JS-generated parts.
- Top visual defects: **mobile horizontal overflow on 4 pages**, sub-40px touch targets (worst: 19px-tall footer links), failing contrast token pairs, dashboard audit-table clipping.
- Credibility-of-demo defects (bid audience would see them): wrong AQI number vs its band on the home hero, spec clause tags like „3.6.1–3.6.3" in user-visible kickers, „KD2,5" vs spec wording „KD 2,5".

## Detailed findings by severity

### P1 (11)

1. **Wrong AQI headline value** — `demo/js/pages/…` home hero card shows band "Vidutinė (yellow)" with „2 INDEKSAS" (index 2, band yellow). EEA AQI value should be a 0–100 score (~42 for „Vidutinė") or the number must be labeled as the band level. A factually wrong number on the hero card.
2. **Broken admin footer link** — `demo/index.html:104`: `href="admin/index.html"` → 404; correct is `pages/admin/index.html`. (Verified via HTTP 404.)
3. **Subscription status enum mismatch** — `subscription.js:33` saves `status: "active"`; `admin/index.js:35` + `prenumeratos.js:17` recognize only `"patvirtinta"`. Completed subscription shows "Prenumerata aktyvi" publicly but is missing in admin KPIs and flagged wrong in the subscriber table.
4. **Generated controls lack accessible names** — `admin/pranesimai.js:10-11`, `sla.js:17`, `nevalidus.js:35` selects/inputs have no label/aria-label (screen readers read unnamed controls).
5. **Dynamic results not announced** — result/status regions on oro, truksmas, dirvožemis, vanduo, gyvosios gamtos, želdynai pages (`analysis.js:118`, `periodic.js:45`, `wildlife.js:38`, `greenery.js:18`) and the admin live feed/KPIs (`admin/index.js:40`, refreshed every 4 s) have no `role=status`/`aria-live`.
6. **Login errors not announced** — `admin/login.html:15,21,26` error paragraphs have no `role=alert`/live region/`aria-describedby`.
7. **Incomplete tab pattern** — `oro.html` analysis tabs (`analysis.js:176`) and gyvoji_gamta tabs (`wildlife.js:48`) lack `aria-controls`, `role=tabpanel`, tab→panel labeling and Arrow/Home/End keyboard navigation.
8. **Focus stranded on hidden panels** — subscription wizard (`subscription.js:15-18`) and login steps (`login.js:10,31,48`) hide the focused step without moving focus to the revealed step.
9. **Touch targets under 40px** — footer links rendered at 19.1px height on every page; nav sub-links 34px; small buttons 38px; inline admin buttons 31px; switches 35×20px (`theme.css:135,247,388`; `sections.css:234-242`).
10. **Failing contrast (verified)** — muted text `--ink-500` `#718897`: 3.7:1 on white and 3.39:1 on muted surfaces; poor/no-data status chips 3.79:1/4.48:1; **hover on dark footer links `--land-900` on `--sea-950` = 1.76:1** (`theme.css:69`) — effectively invisible.
11. **Mobile breakage** — horizontal overflow at 390px on `oro.html`, `gyvoji_gamta.html`, `truksmas.html` (+244px), `ataskaitos.html` (+33px); at 150% text zoom the home map-preview clips content (fixed-height container). Admin dashboard audit-preview table clips horizontally on desktop.

### P2 (7)

1. **Spec clause tags in user-visible kickers** — „3.6.1–3.6.3 ·", „3.6.6–3.6.11 ·", „3.10.1.1.2.5 ·", „3.7.2 · 3.7.4 · 3.8.6 ·" etc. on zemelapis/oro/ataskaitos/dirvezemis/gyvoji_gamta/bendra-info/truksmas/zeldynai/prenumerata/vanduo/vadovas. Internal procurement numbering must not reach public UI; keep clause mapping in README/evaluator materials.
2. **„KD2,5" spacing** — `catalog.js:8,23` display name „Kietosios dalelės KD2,5"; spec wording „KD 2,5".
3. **Unbounded storage growth** — `query.js` rawCache/seriesCache/dayAggregateCache have no eviction cap; `subscriptions.js:66-75` erase-event log grows unbounded (feed/audit stores are capped — inconsistent discipline).
4. **Synchronous CDN scripts** — Chart.js/Leaflet tags in ~9 pages without `defer` (end-of-body placement limits impact; slow CDN still blocks init).
5. **Leaflet full marker rebuilds on each filter change** — `map.js:107-118,212-217` recreates all markers incl. popups and latest-value lookups.
6. **Colors bypass tokens** — chart palettes, Leaflet styles, status/protocol colors as raw hex in analysis/periodic/greenery/wildlife/reports/map JS + several CSS blocks (`sections.css:43-270` etc.).
7. **Shared chrome drift** — policy-page navs have 11 links vs 19 on standard pages and no aria-current; fixed 107px mobile dropdown offset can collide with a wrapped header; admin topbar cannot wrap at 360px; admin pages missing meta descriptions.

### P3 (2)

1. **No dark-mode variant** — `color-scheme: light` only. Documented as a product decision for the demo (municipal public portal, brand-approved light world).
2. Micro-typography — display headings at `letter-spacing: -0.06em` (mild; brand-taste question), one `h1→h3` heading skip on `vadovas.html`, nested card on `zemelapis.html`.

## Patterns & systemic issues

1. **Generated UI is less accessible than static UI** — every hand-authored control has labels; every JS-generated control mostly doesn't. Any code generating controls should default to generating accessible ones.
2. **Token system stops at the CSS boundary** — charts, Leaflet markers and inline styles re-scope colors as literals; no shared JS palette module.
3. **Copied chrome instead of a shared partial** — nav/footer markup per page has already drifted (policy pages, `aria-current`, footer link bug comes exactly from that copying).
4. **No contract at the public↔admin boundary** — subscription status enums, localStorage keys are shared by convention but not by one normalizer.

## Positive findings

- **Zero console/runtime failures** across all ten routes at desktop, including map (25/25 tiles), analysis, reports and admin redirect flow.
- Skip links, semantic landmarks, `lang=lt`, meta descriptions on public pages, global `:focus-visible` styling (0 focus-ring misses in tab sweep), no keyboard traps.
- Charts: responsive config + `destroy()` before rebuild everywhere; CSS animates only transform/opacity; `prefers-reduced-motion` handled (but check the alternative preserves hierarchy).
- Tables wrapped for horizontal scroll; grids collapse at 720–980px.
- Bounded collections where it counts most (admin feed, audit log); all JS passes syntax checks; local links resolve except the one P1.

## Recommended actions (priority order)

1. **[P1] `/impeccable harden`** — accessible names for generated controls, live result/status regions (incl. admin feed), login error announcements, complete tab pattern, focus management on step transitions, fix broken footer link + subscription status normalizer.
2. **[P1] `/impeccable adapt`** — fix 390px overflow on oro/gyvoji_gamta/truksmas/ataskaitos, raise all touch targets ≥40px (footer links especially), make admin dashboard audit table scroll/wrap, text-scale-safe map preview.
3. **[P1] `/impeccable polish` (contrast subset)** — darken `--ink-500`, fix status chip pairs, remove the `--land-900`-on-`--sea-950` hover (footer links should lighten on dark bg, e.g. `--shore-100`), fix AQI number/band, remove clause tags from kickers, „KD 2,5".
4. **[P2] `/impeccable optimize`** — cache eviction caps, bounded erase-event log, `defer` CDN scripts, Leaflet marker diffing.
5. **[P2] `/impeccable polish` (tokens subset)** — shared JS palette module for chart/Leaflet colors, sync policy-page navs + aria-current, admin meta descriptions.
6. End with a re-run of `/impeccable audit` to confirm the score.

Realistic target after one batched fix: **17–18/20**.

---

> You can ask me to run these one at a time, all at once, or in any order you prefer.
>
> Re-run `/impeccable audit` after fixes to see your score improve.

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "Get-Content -Raw 'C:\\Users\\Joosep\\.agents\\skills\\impeccable\\reference\\adapt.md'" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 107ms:
> **Additional context needed**: target platforms/devices and usage contexts.

Adapt an existing design to a different context: another screen size, device, platform, or use case. The trap is treating adaptation as scaling. The job is rethinking the experience for the new context.

**Web only** (mobile web included). Native platforms (`ios` / `android` / `adaptive`) route to [adapt.native.md](adapt.native.md) instead; if the project is native, switch to it now.

---

## Assess Adaptation Challenge

Understand what needs adaptation and why:

1. **Identify the source context**:
   - What was it designed for originally? (Desktop web? Mobile app?)
   - What assumptions were made? (Large screen? Mouse input? Fast connection?)
   - What works well in current context?

2. **Understand target context**:
   - **Device**: Mobile, tablet, desktop, TV, watch, print?
   - **Input method**: Touch, mouse, keyboard, voice, gamepad?
   - **Screen constraints**: Size, resolution, orientation?
   - **Connection**: Fast wifi, slow 3G, offline?
   - **Usage context**: On-the-go vs desk, quick glance vs focused reading?
   - **User expectations**: What do users expect on this platform?

3. **Identify adaptation challenges**:
   - What won't fit? (Content, navigation, features)
   - What won't work? (Hover states on touch, tiny touch targets)
   - What's inappropriate? (Desktop patterns on mobile, mobile patterns on desktop)

**CRITICAL**: Adaptation is rethinking the experience for the new context, not scaling pixels.

## Plan Adaptation Strategy

Create context-appropriate strategy:

### Mobile Adaptation (Desktop → Mobile)

**Layout Strategy**:
- Single column instead of multi-column
- Vertical stacking instead of side-by-side
- Full-width components instead of fixed widths
- Bottom navigation instead of top/side navigation

**Interaction Strategy**:
- Touch targets 44x44px minimum (not hover-dependent)
- Swipe gestures where appropriate (lists, carousels)
- Bottom sheets instead of dropdowns
- Thumbs-first design (controls within thumb reach)
- Larger tap areas with more spacing

**Content Strategy**:
- Progressive disclosure (don't show everything at once)
- Prioritize primary content (secondary content in tabs/accordions)
- Shorter text (more concise)
- Larger text (16px minimum)

**Navigation Strategy**:
- Hamburger menu or bottom navigation
- Reduce navigation complexity
- Sticky headers for context
- Back button in navigation flow

### Tablet Adaptation (Hybrid Approach)

**Layout Strategy**:
- Two-column layouts (not single or three-column)
- Side panels for secondary content
- Master-detail views (list + detail)
- Adaptive based on orientation (portrait vs landscape)

**Interaction Strategy**:
- Support both touch and pointer
- Touch targets 44x44px but allow denser layouts than phone
- Side navigation drawers
- Multi-column forms where appropriate

### Desktop Adaptation (Mobile → Desktop)

**Layout Strategy**:
- Multi-column layouts (use horizontal space)
- Side navigation always visible
- Multiple information panels simultaneously
- Fixed widths with max-width constraints (don't stretch to 4K)

**Interaction Strategy**:
- Hover states for additional information
- Keyboard shortcuts
- Right-click context menus
- Drag and drop where helpful
- Multi-select with Shift/Cmd

**Content Strategy**:
- Show more information upfront (less progressive disclosure)
- Data tables with many columns
- Richer visualizations
- More detailed descriptions

### Print Adaptation (Screen → Print)

**Layout Strategy**:
- Page breaks at logical points
- Remove navigation, footer, interactive elements
- Black and white (or limited color)
- Proper margins for binding

**Content Strategy**:
- Expand shortened content (show full URLs, hidden sections)
- Add page numbers, headers, footers
- Include metadata (print date, page title)
- Convert charts to print-friendly versions

### Email Adaptation (Web → Email)

**Layout Strategy**:
- Narrow width (600px max)
- Single column only
- Inline CSS (no external stylesheets)
- Table-based layouts (for email client compatibility)

**Interaction Strategy**:
- Large, obvious CTAs (buttons not text links)
- No hover states (not reliable)
- Deep links to web app for complex interactions

## Implement Adaptations

Apply changes systematically:

### Responsive Breakpoints

Choose appropriate breakpoints:
- Mobile: 320px-767px
- Tablet: 768px-1023px
- Desktop: 1024px+
- Or content-driven breakpoints (where design breaks)

### Layout Adaptation Techniques

- **CSS Grid/Flexbox**: Reflow layouts automatically
- **Container Queries**: Adapt based on container, not viewport
- **`clamp()`**: Fluid sizing between min and max
- **Media queries**: Different styles for different contexts
- **Display properties**: Show/hide elements per context

### Touch Adaptation

- Increase touch target sizes (44x44px minimum)
- Add more spacing between interactive elements
- Remove hover-dependent interactions
- Add touch feedback (ripples, highlights)
- Consider thumb zones (easier to reach bottom than top)

### Content Adaptation

- Use `display: none` sparingly (still downloads)
- Progressive enhancement (core content first, enhancements on larger screens)
- Lazy loading for off-screen content
- Responsive images (`srcset`, `picture` element)

### Navigation Adaptation

- Transform complex nav to hamburger/drawer on mobile
- Bottom nav bar for mobile apps
- Persistent side navigation on desktop
- Breadcrumbs on smaller screens for context

**IMPORTANT**: Test on real devices. Device emulation in DevTools is helpful but not perfect.

**NEVER**:
- Hide core functionality on mobile (if it matters, make it work)
- Assume desktop = powerful device (consider accessibility, older machines)
- Use different information architecture across contexts (confusing)
- Break user expectations for platform (mobile users expect mobile patterns)
- Forget landscape orientation on mobile/tablet
- Use generic breakpoints blindly (use content-driven breakpoints)
- Ignore touch on desktop (many desktop devices have touch)

## Verify Adaptations

Test thoroughly across contexts:

- **Real devices**: Test on actual phones, tablets, desktops
- **Different orientations**: Portrait and landscape
- **Different browsers**: Safari, Chrome, Firefox, Edge
- **Different OS**: iOS, Android, Windows, macOS
- **Different input methods**: Touch, mouse, keyboard
- **Edge cases**: Very small screens (320px), very large screens (4K)
- **Slow connections**: Test on throttled network

When the adaptation feels native to each context, hand off to `$impeccable polish` for the final pass.

---

## Reference Material

The sections below were previously `responsive-design.md` and live inline now so the adapt flow has its deep responsive reference in one place.

### Responsive Design

#### Mobile-First: Write It Right

Start with base styles for mobile, use `min-width` queries to layer complexity. Desktop-first (`max-width`) means mobile loads unnecessary styles first.

#### Breakpoints: Content-Driven

Don't chase device sizes; let content tell you where to break. Start narrow, stretch until design breaks, add breakpoint there. Three breakpoints usually suffice (640, 768, 1024px). Use `clamp()` for fluid values without breakpoints.

#### Detect Input Method, Not Just Screen Size

**Screen size doesn't tell you input method.** A laptop with touchscreen, a tablet with keyboard. Use pointer and hover queries:

```css
/* Fine pointer (mouse, trackpad) */
@media (pointer: fine) {
  .button { padding: 8px 16px; }
}

/* Coarse pointer (touch, stylus) */
@media (pointer: coarse) {
  .button { padding: 12px 20px; }  /* Larger touch target */
}

/* Device supports hover */
@media (hover: hover) {
  .card:hover { transform: translateY(-2px); }
}

/* Device doesn't support hover (touch) */
@media (hover: none) {
  .card { /* No hover state - use active instead */ }
}
```

**Critical**: Don't rely on hover for functionality. Touch users can't hover.

#### Safe Areas: Handle the Notch

Modern phones have notches, rounded corners, and home indicators. Use `env()`:

```css
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

/* With fallback */
.footer {
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}
```

**Enable viewport-fit** in your meta tag:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

#### Responsive Images: Get It Right

##### srcset with Width Descriptors

```html
<img
  src="hero-800.jpg"
  srcset="
    hero-400.jpg 400w,
    hero-800.jpg 800w,
    hero-1200.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Hero image"
>
```

**How it works**:
- `srcset` lists available images with their actual widths (`w` descriptors)
- `sizes` tells the browser how wide the image will display
- Browser picks the best file based on viewport width AND device pixel ratio

##### Picture Element for Art Direction

When you need different crops/compositions (not just resolutions):

```html
<picture>
  <source media="(min-width: 768px)" srcset="wide.jpg">
  <source media="(max-width: 767px)" srcset="tall.jpg">
  <img src="fallback.jpg" alt="...">
</picture>
```

#### Layout Adaptation Patterns

**Navigation**: Three stages: hamburger + drawer on mobile, horizontal compact on tablet, full with labels on desktop. **Tables**: Transform to cards on mobile using `display: block` and `data-label` attributes. **Progressive disclosure**: Use `<details>/<summary>` for content that can collapse on mobile.

#### Testing: Don't Trust DevTools Alone

DevTools device emulation is useful for layout but misses:

- Actual touch interactions
- Real CPU/memory constraints
- Network latency patterns
- Font rendering differences
- Browser chrome/keyboard appearances

**Test on at least**: One real iPhone, one real Android, a tablet if relevant. Cheap Android phones reveal performance issues you'll never see on simulators.

---

**Avoid**: Desktop-first design. Device detection instead of feature detection. Separate mobile/desktop codebases. Ignoring tablet and landscape. Assuming all mobile devices are powerful.


exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command 'rg --files demo | Sort-Object' in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 139ms:
demo\css\sections.css
demo\css\theme.css
demo\index.html
demo\js\data\admin\audit.js
demo\js\data\admin\auth.js
demo\js\data\admin\feed.js
demo\js\data\admin\notifications.js
demo\js\data\admin\records.js
demo\js\data\admin\sla.js
demo\js\data\catalog.js
demo\js\data\generator.js
demo\js\data\lks94.js
demo\js\data\periodic_sites.js
demo\js\data\query.js
demo\js\data\sites.js
demo\js\data\subscriptions.js
demo\js\pages\admin\auditas.js
demo\js\pages\admin\duomenys.js
demo\js\pages\admin\index.js
demo\js\pages\admin\login.js
demo\js\pages\admin\nevalidus.js
demo\js\pages\admin\nustatymai.js
demo\js\pages\admin\patvirtinimas.js
demo\js\pages\admin\pranesimai.js
demo\js\pages\admin\prenumeratos.js
demo\js\pages\admin\shell.js
demo\js\pages\admin\sla.js
demo\js\pages\analysis.js
demo\js\pages\common.js
demo\js\pages\greenery.js
demo\js\pages\home.js
demo\js\pages\map.js
demo\js\pages\periodic.js
demo\js\pages\reports.js
demo\js\pages\subscription.js
demo\js\pages\wildlife.js
demo\pages\admin\auditas.html
demo\pages\admin\duomenys.html
demo\pages\admin\index.html
demo\pages\admin\login.html
demo\pages\admin\nevalidus.html
demo\pages\admin\nustatymai.html
demo\pages\admin\patvirtinimas.html
demo\pages\admin\pranesimai.html
demo\pages\admin\prenumeratos.html
demo\pages\admin\sla.html
demo\pages\ataskaitos.html
demo\pages\bendra-info.html
demo\pages\dirvezemis.html
demo\pages\gyvoji_gamta.html
demo\pages\oro.html
demo\pages\prenumerata.html
demo\pages\privatumo-politika.html
demo\pages\slapuku-politika.html
demo\pages\truksmas.html
demo\pages\vadovas.html
demo\pages\vanduo.html
demo\pages\zeldynai.html
demo\pages\zemelapis.html
demo\README.md
demo\run.bat

codex
The audit confirms this is a scoped responsive repair, so no new design-context file is needed. I’m now isolating the actual overflow contributors and the shared interactive selectors; the fix will keep the current structure and appearance, using layout constraints and invisible hit-area expansion where possible.
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command 'git status --short; rg -n -C 4 "analysis-filter-grid|periodic-layout|stats-grid|map-preview|footer-links|nav|sub|button|btn|switch|audit-preview|admin-table|table-wrap|canvas" demo/css/theme.css demo/css/sections.css' in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 118ms:
fatal: not a git repository (or any of the parent directories): .git
demo/css/sections.css-21-.analysis-tab { min-height: 46px; padding: 9px 14px; color: var(--ink-600); background: transparent; border: 0; border-bottom: 3px solid transparent; cursor: pointer; font-size: .78rem; font-weight: 600; text-align: left; }
demo/css/sections.css-22-.analysis-tab:hover { color: var(--sea-900); background: var(--shore-100); }
demo/css/sections.css-23-.analysis-tab[aria-selected="true"] { color: var(--sea-900); border-bottom-color: var(--sun-500); }
demo/css/sections.css-24-.analysis-panel[hidden] { display: none; }
demo/css/sections.css:25:.analysis-filter-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; padding: 18px; background: var(--surface-muted); border: 1px solid var(--line); }
demo/css/sections.css-26-.field-group { min-width: 0; }
demo/css/sections.css-27-.field-group--wide { grid-column: span 2; }
demo/css/sections.css-28-.field-label { display: block; margin-bottom: 6px; color: var(--ink-800); font-size: .72rem; font-weight: 600; }
demo/css/sections.css-29-.field-help { margin: 5px 0 0; color: var(--ink-500); font-size: .68rem; line-height: 1.4; }
demo/css/sections.css:30:.field, .select-field, .analysis-filter-grid input[type="search"], .analysis-filter-grid input[type="email"], .analysis-filter-grid input[type="text"] { width: 100%; min-height: 43px; padding: 8px 10px; color: var(--ink-950); background: var(--surface); border: 1px solid var(--line-strong); border-radius: var(--radius-sm); }
demo/css/sections.css:31:.field:focus, .select-field:focus, .analysis-filter-grid input:focus { border-color: var(--sea-700); }
demo/css/sections.css-32-.select-field[multiple] { min-height: 112px; padding: 5px; }
demo/css/sections.css-33-.checkline { display: flex; align-items: center; gap: 8px; min-height: 43px; color: var(--ink-800); font-size: .78rem; }
demo/css/sections.css-34-.checkline input, .checkbox-grid input { width: 18px; height: 18px; accent-color: var(--sea-800); }
demo/css/sections.css-35-.filter-actions { display: flex; align-items: end; gap: 8px; grid-column: 1 / -1; padding-top: 3px; }
demo/css/sections.css-36-.analysis-message { margin: 13px 0 0; color: var(--ink-600); font-size: .76rem; }
demo/css/sections.css:37:.stats-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; margin: 22px 0; }
demo/css/sections.css-38-.stat-card { min-width: 0; padding: 14px; background: var(--surface-muted); border-top: 3px solid var(--line-strong); }
demo/css/sections.css-39-.stat-card--accent { border-top-color: var(--sun-500); }
demo/css/sections.css-40-.stat-label { display: block; color: var(--ink-600); font-size: .68rem; }
demo/css/sections.css-41-.stat-value { display: block; margin-top: 6px; color: var(--sea-950); font-size: clamp(1.15rem, 2.3vw, 1.8rem); font-weight: 500; line-height: 1.1; }
--
demo/css/sections.css-48-.chart-panel h3 { font-size: 1rem; }
demo/css/sections.css-49-.chart-panel p { margin: 6px 0 14px; color: var(--ink-600); font-size: .72rem; }
demo/css/sections.css-50-.chart-wrap { position: relative; height: 300px; }
demo/css/sections.css-51-.chart-wrap--short { height: 250px; }
demo/css/sections.css:52:.chart-wrap canvas { width: 100% !important; height: 100% !important; }
demo/css/sections.css-53-.chart-caption { margin: 10px 0 0; color: var(--ink-500); font-size: .68rem; }
demo/css/sections.css-54-.chart-legend { display: flex; flex-wrap: wrap; gap: 8px 16px; margin-top: 10px; color: var(--ink-600); font-size: .68rem; }
demo/css/sections.css-55-.legend-key { display: inline-flex; align-items: center; gap: 6px; }
demo/css/sections.css-56-.legend-key::before { content: ""; display: inline-block; width: 18px; height: 3px; background: var(--sea-800); }
demo/css/sections.css-57-.legend-key--limit::before { background: var(--poor); border-top: 1px dashed var(--poor); }
demo/css/sections.css-58-.correlation-copy { display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: center; margin-bottom: 12px; padding: 12px; background: var(--shore-100); }
demo/css/sections.css-59-.correlation-r { color: var(--sea-950); font-size: 2rem; font-weight: 500; line-height: 1; }
demo/css/sections.css-60-.correlation-copy p { margin: 0; color: var(--ink-800); font-size: .74rem; }
demo/css/sections.css:61:.data-table-wrap { overflow-x: auto; border: 1px solid var(--line); }
demo/css/sections.css-62-.data-table { width: 100%; min-width: 580px; border-collapse: collapse; font-size: .74rem; }
demo/css/sections.css-63-.data-table caption { padding: 12px 14px; color: var(--ink-600); font-size: .72rem; text-align: left; }
demo/css/sections.css-64-.data-table th, .data-table td { padding: 10px 12px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
demo/css/sections.css-65-.data-table th { color: var(--ink-600); background: var(--surface-muted); font-size: .68rem; font-weight: 600; }
demo/css/sections.css-66-.data-table td { color: var(--ink-800); }
demo/css/sections.css-67-.data-table tr:last-child td { border-bottom: 0; }
demo/css/sections.css-68-.value-exceedance { color: #a13e00; font-weight: 600; }
demo/css/sections.css:69:.periodic-layout { display: grid; grid-template-columns: minmax(190px, .3fr) minmax(0, 1fr); gap: 22px; }
demo/css/sections.css-70-.periodic-filters { padding: 16px; background: var(--surface-muted); border: 1px solid var(--line); }
demo/css/sections.css-71-.periodic-filters .field-group + .field-group { margin-top: 14px; }
demo/css/sections.css-72-.periodic-results { min-width: 0; }
demo/css/sections.css-73-.periodic-summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-bottom: 16px; }
demo/css/sections.css-74-.periodic-summary .stat-card { padding: 12px; }
demo/css/sections.css-75-.periodic-chart { margin-top: 18px; }
demo/css/sections.css:76:.subsection-switcher { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 18px; }
demo/css/sections.css:77:.subsection-switcher button { min-height: 42px; padding: 8px 11px; color: var(--ink-800); background: var(--surface); border: 1px solid var(--line-strong); border-radius: 3px; cursor: pointer; font-size: .72rem; font-weight: 600; }
demo/css/sections.css:78:.subsection-switcher button:hover, .subsection-switcher button[aria-selected="true"] { color: var(--sea-950); background: var(--shore-200); border-color: var(--land-500); }
demo/css/sections.css-79-.score-table .score { min-width: 105px; }
demo/css/sections.css-80-.score-meter { display: grid; grid-template-columns: repeat(10, 1fr); gap: 2px; min-width: 95px; }
demo/css/sections.css-81-.score-meter span { height: 13px; background: var(--line); }
demo/css/sections.css-82-.score-meter span.is-filled { background: var(--land-500); }
--
demo/css/sections.css-130-.howto { padding: 18px; border: 1px solid var(--line); }
demo/css/sections.css-131-.howto .step-number { display: inline-grid; place-items: center; width: 30px; height: 30px; margin-bottom: 12px; color: var(--sea-950); background: var(--sun-500); font-weight: 600; }
demo/css/sections.css-132-.howto h3 { margin-bottom: 8px; }
demo/css/sections.css-133-.privacy-version { display: inline-block; padding: 5px 8px; color: var(--land-900); background: var(--shore-200); font-size: .7rem; font-weight: 600; }
demo/css/sections.css:134:.main-nav details ul ul { position: static; width: auto; margin: 2px 0 0; padding: 0 0 0 10px; border: 0; border-radius: 0; box-shadow: none; }
demo/css/sections.css:135:.main-nav details ul ul a { min-height: 34px; padding: 6px 8px; font-size: .71rem; }
demo/css/sections.css:136:.main-nav .nav-group-label { display: block; padding: 7px 8px 3px; color: var(--land-700); font-size: .68rem; font-weight: 600; }
demo/css/sections.css-137-
demo/css/sections.css-138-@media (max-width: 980px) {
demo/css/sections.css-139-  .page-hero { grid-template-columns: 1fr; gap: 18px; }
demo/css/sections.css-140-  .page-hero-aside { padding: 15px 0 0; border-top: 3px solid var(--sun-500); border-left: 0; }
demo/css/sections.css:141:  .analysis-filter-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
demo/css/sections.css-142-  .chart-grid { grid-template-columns: 1fr; }
demo/css/sections.css-143-  .report-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
demo/css/sections.css:144:  .periodic-layout { grid-template-columns: 1fr; }
demo/css/sections.css-145-}
demo/css/sections.css-146-@media (max-width: 720px) {
demo/css/sections.css:147:  .analysis-filter-grid, .stats-grid, .checkbox-groups, .howto-grid, .contact-grid { grid-template-columns: 1fr; }
demo/css/sections.css-148-  .field-group--wide { grid-column: auto; }
demo/css/sections.css:149:  .stats-grid { gap: 8px; }
demo/css/sections.css-150-  .stat-card { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 6px 12px; align-items: center; }
demo/css/sections.css-151-  .stat-note { grid-column: 1 / -1; margin-top: 0; }
demo/css/sections.css-152-  .periodic-summary { grid-template-columns: 1fr; }
demo/css/sections.css-153-  .report-list { grid-template-columns: 1fr; }
--
demo/css/sections.css-170-.admin-brand .brand-mark { flex-basis: 40px; width: 40px; height: 40px; color: var(--sun-500); border-color: rgba(255,222,69,.65); font-size: .68rem; }
demo/css/sections.css-171-.admin-brand strong { display: block; font-size: 1rem; font-weight: 600; line-height: 1.15; }
demo/css/sections.css-172-.admin-brand small { display: block; margin-top: 5px; color: #a9c0da; font-size: .69rem; letter-spacing: .1em; text-transform: uppercase; }
demo/css/sections.css-173-.admin-sidebar .brand-stripe { margin: 22px 0 20px; opacity: .9; }
demo/css/sections.css:174:.admin-nav ul { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
demo/css/sections.css:175:.admin-nav-link { display: block; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
demo/css/sections.css:176:.admin-nav-link:hover { color: #fff; background: rgba(255,255,255,.08); }
demo/css/sections.css:177:.admin-nav-link.is-active { color: #fff; background: rgba(40,140,200,.22); border-left-color: var(--sun-500); }
demo/css/sections.css:178:.admin-nav-logout { width: 100%; margin-top: 10px; color: #b9cde2; background: transparent; border: 0; cursor: pointer; font: inherit; text-align: left; }
demo/css/sections.css:179:.admin-nav-logout:hover { color: #fff; background: rgba(255,255,255,.08); }
demo/css/sections.css-180-.admin-sidebar-note { margin-top: auto; padding: 13px 10px 0; border-top: 1px solid rgba(219,234,250,.16); }
demo/css/sections.css-181-.admin-sidebar-note .eyebrow { color: var(--sun-500); font-size: .62rem; }
demo/css/sections.css-182-.admin-sidebar-note p { margin: 7px 0 0; color: #9eb6cf; font-size: .66rem; line-height: 1.5; }
demo/css/sections.css-183-.admin-workspace { min-width: 0; }
--
demo/css/sections.css-203-.admin-section-title p { margin: 6px 0 0; color: var(--ink-600); font-size: .75rem; }
demo/css/sections.css-204-.admin-section-title .eyebrow { display: block; margin-bottom: 5px; }
demo/css/sections.css-205-.admin-live-dot { display: inline-flex; align-items: center; gap: 6px; color: var(--land-900); font-size: .68rem; font-weight: 600; white-space: nowrap; }
demo/css/sections.css-206-.admin-live-dot::before { width: 8px; height: 8px; content: ""; background: var(--land-500); border-radius: 50%; box-shadow: 0 0 0 4px rgba(83,138,131,.16); }
demo/css/sections.css:207:.admin-table .data-table { min-width: 720px; }
demo/css/sections.css:208:.admin-table--compact .data-table { min-width: 520px; }
demo/css/sections.css:209:.admin-table .data-table td, .admin-table .data-table th { padding: 9px 10px; font-size: .7rem; }
demo/css/sections.css:210:.admin-table .data-table td small { display: block; margin-top: 3px; color: var(--ink-500); font-size: .64rem; }
demo/css/sections.css-211-.admin-feed-row-new { animation: admin-row-in 380ms var(--ease-out); }
demo/css/sections.css-212-@keyframes admin-row-in { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
demo/css/sections.css-213-.admin-status-ok { color: var(--land-900); background: var(--shore-200); }
demo/css/sections.css-214-.admin-status-warn { color: #765a00; background: #fff3b1; }
--
demo/css/sections.css-229-.admin-rule { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; padding: 11px 12px; border: 1px solid var(--line); }
demo/css/sections.css-230-.admin-rule strong { display: block; color: var(--sea-900); font-size: .76rem; }
demo/css/sections.css-231-.admin-rule p { margin: 4px 0 0; color: var(--ink-600); font-size: .68rem; }
demo/css/sections.css-232-.admin-rule input { width: 18px; height: 18px; accent-color: var(--land-700); }
demo/css/sections.css:233:.admin-switch { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
demo/css/sections.css:234:.admin-switch input { appearance: none; position: relative; width: 35px; height: 20px; margin: 0; border-radius: 999px; background: var(--line-strong); cursor: pointer; transition: background 160ms var(--ease-out); }
demo/css/sections.css:235:.admin-switch input::after { position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; content: ""; background: var(--surface); border-radius: 50%; transition: transform 160ms var(--ease-out); }
demo/css/sections.css:236:.admin-switch input:checked { background: var(--land-700); }
demo/css/sections.css:237:.admin-switch input:checked::after { transform: translateX(15px); }
demo/css/sections.css-238-.admin-filter-row { display: flex; flex-wrap: wrap; align-items: end; gap: 10px; margin-bottom: 16px; padding: 13px; background: var(--surface-muted); border: 1px solid var(--line); }
demo/css/sections.css-239-.admin-filter-row .field-group { min-width: 150px; flex: 1 1 150px; }
demo/css/sections.css:240:.admin-filter-row .button { flex: 0 0 auto; }
demo/css/sections.css-241-.admin-inline-actions { display: flex; flex-wrap: wrap; gap: 5px; }
demo/css/sections.css:242:.admin-inline-actions .button { min-height: 31px; padding: 5px 8px; font-size: .63rem; }
demo/css/sections.css-243-.admin-inline-edit { display: grid; grid-template-columns: 120px auto; gap: 5px; align-items: center; }
demo/css/sections.css-244-.admin-inline-edit input { min-height: 31px; width: 120px; padding: 4px 6px; font-size: .68rem; }
demo/css/sections.css-245-.admin-danger-note { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
demo/css/sections.css-246-.admin-login-page { display: grid; min-height: 100vh; place-items: center; padding: 24px; background: radial-gradient(circle at 85% 12%, rgba(40,140,200,.15), transparent 28%), var(--surface-muted); }
--
demo/css/sections.css-270-.sla-countdown.is-late { color: #a13e00; }
demo/css/sections.css-271-.sla-countdown.is-ok { color: var(--land-900); }
demo/css/sections.css-272-.portal-banner-region { width: min(calc(100% - 40px), var(--content-max)); margin: 16px auto -10px; }
demo/css/sections.css-273-.portal-banner { display: flex; align-items: center; justify-content: space-between; gap: 14px; }
demo/css/sections.css:274:.portal-banner .button { flex: 0 0 auto; }
demo/css/sections.css-275-@media (max-width: 1100px) { .admin-layout { grid-template-columns: 220px minmax(0, 1fr); } .admin-grid-2, .admin-grid-3 { grid-template-columns: 1fr; } .admin-form-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
demo/css/sections.css:276:@media (max-width: 760px) { .admin-layout { display: block; } .admin-sidebar { position: static; min-height: 0; padding: 16px; } .admin-sidebar-note { display: none; } .admin-nav { overflow-x: auto; margin-top: 14px; } .admin-nav ul { display: flex; width: max-content; } .admin-nav-link { border-left: 0; border-bottom: 3px solid transparent; white-space: nowrap; } .admin-nav-link.is-active { border-bottom-color: var(--sun-500); } .admin-main { width: min(calc(100% - 28px), 1440px); padding-top: 20px; } .admin-topbar { min-height: 66px; padding: 12px 14px; } .admin-kpi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .admin-page-hero { display: block; } .admin-page-hero-aside { max-width: none; margin-top: 18px; padding: 13px 0 0; border-top: 3px solid var(--sun-500); border-left: 0; } .admin-form-grid { grid-template-columns: 1fr; } .admin-form-grid .field-group--wide { grid-column: auto; } .admin-check-grid { grid-template-columns: 1fr; } .admin-login-page { padding: 14px; } .portal-banner-region { width: min(calc(100% - 28px), var(--content-max)); } }
--
demo/css/theme.css-60-  line-height: 1.55;
demo/css/theme.css-61-  text-rendering: optimizeLegibility;
demo/css/theme.css-62-}
demo/css/theme.css-63-
demo/css/theme.css:64:button,
demo/css/theme.css-65-input,
demo/css/theme.css-66-select { font: inherit; }
demo/css/theme.css-67-
demo/css/theme.css-68-a { color: var(--sea-900); text-underline-offset: 0.18em; }
--
demo/css/theme.css-146-  letter-spacing: 0.08em;
demo/css/theme.css-147-  text-transform: uppercase;
demo/css/theme.css-148-}
demo/css/theme.css-149-
demo/css/theme.css:150:.main-nav { align-self: stretch; }
demo/css/theme.css:151:.main-nav > ul {
demo/css/theme.css-152-  display: flex;
demo/css/theme.css-153-  flex-wrap: wrap;
demo/css/theme.css-154-  justify-content: flex-end;
demo/css/theme.css-155-  gap: 5px;
--
demo/css/theme.css-158-  padding: 0;
demo/css/theme.css-159-  list-style: none;
demo/css/theme.css-160-}
demo/css/theme.css-161-
demo/css/theme.css:162:.main-nav a,
demo/css/theme.css:163:.main-nav summary {
demo/css/theme.css-164-  display: inline-flex;
demo/css/theme.css-165-  min-height: 46px;
demo/css/theme.css-166-  align-items: center;
demo/css/theme.css-167-  padding: 8px 11px 12px;
--
demo/css/theme.css-170-  font-weight: 500;
demo/css/theme.css-171-  text-decoration: none;
demo/css/theme.css-172-  transition: color 180ms var(--ease-out), background 180ms var(--ease-out);
demo/css/theme.css-173-}
demo/css/theme.css:174:.main-nav a:hover,
demo/css/theme.css:175:.main-nav summary:hover,
demo/css/theme.css:176:.main-nav a[aria-current="page"] { color: var(--sea-900); background: var(--shore-100); }
demo/css/theme.css:177:.main-nav details { position: relative; }
demo/css/theme.css:178:.main-nav summary { cursor: pointer; list-style: none; }
demo/css/theme.css:179:.main-nav summary::-webkit-details-marker { display: none; }
demo/css/theme.css:180:.main-nav summary::after { content: "⌄"; margin-left: 6px; font-size: 0.85rem; }
demo/css/theme.css:181:.main-nav details[open] summary { color: var(--sea-900); }
demo/css/theme.css:182:.main-nav details ul {
demo/css/theme.css-183-  position: absolute;
demo/css/theme.css-184-  right: 0;
demo/css/theme.css-185-  z-index: 50;
demo/css/theme.css-186-  width: 280px;
--
demo/css/theme.css-191-  border: 1px solid var(--line);
demo/css/theme.css-192-  border-radius: var(--radius-sm);
demo/css/theme.css-193-  box-shadow: var(--shadow-md);
demo/css/theme.css-194-}
demo/css/theme.css:195:.main-nav details li a { display: flex; min-height: 40px; padding: 8px 10px; }
demo/css/theme.css-196-
demo/css/theme.css-197-.brand-stripe {
demo/css/theme.css-198-  display: grid;
demo/css/theme.css-199-  grid-template-rows: repeat(3, 4px);
--
demo/css/theme.css-223-h3 { margin: 0; font-size: 1.12rem; }
demo/css/theme.css-224-p { margin-top: 0; }
demo/css/theme.css-225-.lede { max-width: 58ch; color: var(--ink-600); font-size: clamp(1rem, 1.5vw, 1.2rem); }
demo/css/theme.css-226-
demo/css/theme.css:227:.button {
demo/css/theme.css-228-  display: inline-flex;
demo/css/theme.css-229-  min-height: 46px;
demo/css/theme.css-230-  align-items: center;
demo/css/theme.css-231-  justify-content: center;
--
demo/css/theme.css-238-  font-weight: 600;
demo/css/theme.css-239-  text-decoration: none;
demo/css/theme.css-240-  transition: transform 180ms var(--ease-out), background 180ms var(--ease-out), border-color 180ms var(--ease-out);
demo/css/theme.css-241-}
demo/css/theme.css:242:.button:hover { transform: translateY(-1px); }
demo/css/theme.css:243:.button--primary { color: #fff; background: var(--sea-900); }
demo/css/theme.css:244:.button--primary:hover { color: #fff; background: var(--sea-950); }
demo/css/theme.css:245:.button--secondary { color: var(--sea-900); background: var(--surface); border-color: var(--line-strong); }
demo/css/theme.css:246:.button--secondary:hover { background: var(--shore-100); border-color: var(--sea-500); }
demo/css/theme.css:247:.button--small { min-height: 38px; padding: 8px 12px; font-size: 0.76rem; }
demo/css/theme.css-248-
demo/css/theme.css-249-.panel {
demo/css/theme.css-250-  background: var(--surface);
demo/css/theme.css-251-  border: 1px solid var(--line);
--
demo/css/theme.css-323-.aqi-scale span { height: 7px; border-radius: 2px; }
demo/css/theme.css-324-.aqi-scale .good { background: var(--good); }.aqi-scale .fair { background: var(--fair); }.aqi-scale .moderate { background: var(--moderate); }.aqi-scale .poor { background: var(--poor); }.aqi-scale .very-poor { background: var(--very-poor); }.aqi-scale .extremely-poor { background: var(--extremely-poor); }
demo/css/theme.css-325-.legend-labels { display: flex; justify-content: space-between; gap: 8px; margin-top: 7px; color: var(--ink-500); font-size: 0.66rem; }
demo/css/theme.css-326-
demo/css/theme.css:327:.map-preview { position: relative; min-height: 230px; overflow: hidden; background: #dfe9df; }
demo/css/theme.css:328:.map-preview::before,
demo/css/theme.css:329:.map-preview::after { position: absolute; content: ""; background: rgba(255,255,255,0.72); transform: rotate(-13deg); }
demo/css/theme.css:330:.map-preview::before { top: 22%; left: -8%; width: 120%; height: 14px; box-shadow: 0 65px 0 rgba(255,255,255,0.55), 0 130px 0 rgba(255,255,255,0.65); }
demo/css/theme.css:331:.map-preview::after { top: -10%; left: 38%; width: 15px; height: 130%; box-shadow: 80px 0 0 rgba(255,255,255,0.44), 160px 0 0 rgba(255,255,255,0.48); }
demo/css/theme.css:332:.map-preview-content { position: relative; z-index: 1; min-height: 230px; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
demo/css/theme.css:333:.map-preview-label { display: flex; align-items: center; justify-content: space-between; color: var(--sea-950); font-size: 0.72rem; font-weight: 600; }
demo/css/theme.css:334:.map-preview-label span { display: inline-flex; width: 8px; height: 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
demo/css/theme.css:335:.map-preview-link { position: absolute; right: 18px; bottom: 17px; }
demo/css/theme.css-336-
demo/css/theme.css-337-.section-intro { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin: 44px 0 18px; }
demo/css/theme.css-338-.section-intro p { max-width: 48ch; margin: 0; color: var(--ink-600); font-size: 0.9rem; }
demo/css/theme.css-339-.monitoring-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
--
demo/css/theme.css-345-.site-footer { background: var(--sea-950); color: #dfeafa; }
demo/css/theme.css-346-.site-footer-inner { display: flex; justify-content: space-between; gap: 30px; padding: 29px 0 35px; }
demo/css/theme.css-347-.site-footer strong { display: block; color: #fff; font-weight: 500; }
demo/css/theme.css-348-.site-footer p { max-width: 45ch; margin: 8px 0 0; color: #bbcee2; font-size: 0.77rem; }
demo/css/theme.css:349:.footer-links { display: flex; flex-wrap: wrap; justify-content: flex-end; align-content: flex-start; gap: 8px 16px; }
demo/css/theme.css:350:.footer-links a { color: #dfeafa; font-size: 0.77rem; }
demo/css/theme.css-351-
demo/css/theme.css-352-/* Map page */
demo/css/theme.css-353-.map-page-shell { width: min(calc(100% - 32px), 1500px); margin: 0 auto; padding: 22px 0 32px; }
demo/css/theme.css-354-.map-titlebar { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 18px; }
--
demo/css/theme.css-374-.legend-swatch { width: 19px; height: 13px; flex: 0 0 19px; border: 1px solid rgba(16,35,49,0.25); border-radius: 3px; }
demo/css/theme.css-375-.measure-list { display: grid; gap: 7px; margin: 10px 0 0; padding: 0; list-style: none; }
demo/css/theme.css-376-.measure-list li { display: flex; justify-content: space-between; gap: 8px; padding: 7px 8px; color: var(--ink-800); background: var(--surface); border: 1px solid var(--line); border-radius: 5px; font-size: 0.68rem; }
demo/css/theme.css-377-.measure-list strong { color: var(--sea-900); font-weight: 600; white-space: nowrap; }
demo/css/theme.css:378:.map-canvas { position: relative; min-height: 660px; }
demo/css/theme.css-379-#map { position: absolute; inset: 0; z-index: 1; }
demo/css/theme.css-380-.map-status { position: absolute; left: 13px; bottom: 16px; z-index: 500; max-width: min(360px, calc(100% - 26px)); padding: 9px 11px; color: var(--ink-800); background: rgba(255,255,255,0.94); border: 1px solid var(--line); border-radius: 6px; box-shadow: var(--shadow-sm); font-size: 0.7rem; }
demo/css/theme.css-381-.station-label { padding: 4px 6px; color: var(--sea-950); background: var(--surface); border: 1px solid var(--sea-700); border-radius: 4px; box-shadow: 0 2px 6px rgba(16,35,49,0.2); font-size: 0.68rem; font-weight: 600; white-space: nowrap; }
demo/css/theme.css-382-.station-label--iot { color: var(--land-900); border-color: var(--land-500); }
--
demo/css/theme.css-406-.status-dot { display: inline-block; width: 8px; height: 8px; margin-left: 4px; vertical-align: middle; border-radius: 50%; }
demo/css/theme.css-407-
demo/css/theme.css-408-@media (max-width: 980px) {
demo/css/theme.css-409-  .header-inner { grid-template-columns: 1fr; gap: 0; }
demo/css/theme.css:410:  .main-nav > ul { justify-content: flex-start; }
demo/css/theme.css-411-  .brand-lockup { padding-bottom: 13px; }
demo/css/theme.css:412:  .main-nav a, .main-nav summary { padding-bottom: 10px; }
demo/css/theme.css-413-  .grid-home { grid-template-columns: 1fr 1fr; }
demo/css/theme.css-414-  .grid-home > .panel:first-child { grid-row: auto; grid-column: 1 / -1; }
demo/css/theme.css-415-  .monitoring-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
demo/css/theme.css-416-  .map-layout { grid-template-columns: 250px minmax(0, 1fr); }
demo/css/theme.css-417-}
demo/css/theme.css-418-
demo/css/theme.css-419-@media (max-width: 720px) {
demo/css/theme.css-420-  .header-inner, .page-shell, .site-footer-inner { width: min(calc(100% - 28px), var(--content-max)); }
demo/css/theme.css:421:  .main-nav { overflow-x: auto; }
demo/css/theme.css:422:  .main-nav > ul { flex-wrap: nowrap; width: max-content; }
demo/css/theme.css:423:  .main-nav details ul { position: fixed; top: 107px; left: 14px; right: 14px; width: auto; }
demo/css/theme.css-424-  .hero { grid-template-columns: 1fr; gap: 24px; padding-top: 42px; }
demo/css/theme.css-425-  .hero-aside { padding: 17px 0 0; border-top: 1px solid var(--line-strong); border-left: 0; }
demo/css/theme.css-426-  .grid-home { grid-template-columns: 1fr; }
demo/css/theme.css-427-  .weather-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
--
demo/css/theme.css-429-  .section-intro { display: block; }
demo/css/theme.css-430-  .section-intro p { margin-top: 10px; }
demo/css/theme.css-431-  .monitoring-grid { grid-template-columns: 1fr; }
demo/css/theme.css-432-  .site-footer-inner { display: block; }
demo/css/theme.css:433:  .footer-links { justify-content: flex-start; margin-top: 21px; }
demo/css/theme.css-434-  .map-page-shell { width: min(calc(100% - 20px), 1500px); padding-top: 15px; }
demo/css/theme.css-435-  .map-titlebar { display: block; }
demo/css/theme.css-436-  .map-actions { justify-content: flex-start; margin-top: 14px; }
demo/css/theme.css-437-  .map-layout { display: flex; flex-direction: column; min-height: 0; }
demo/css/theme.css-438-  .map-sidebar { max-height: none; border-right: 0; border-bottom: 1px solid var(--line); }
demo/css/theme.css:439:  .map-canvas { min-height: 70vh; }
demo/css/theme.css-440-  #map { min-height: 70vh; }
demo/css/theme.css-441-}
demo/css/theme.css-442-
demo/css/theme.css-443-@media (max-width: 440px) {
--
demo/css/theme.css-445-  .aqi-score { width: 96px; }
demo/css/theme.css-446-  .aqi-score strong { font-size: 2.1rem; }
demo/css/theme.css-447-  .aqi-score span { font-size: 0.56rem; }
demo/css/theme.css-448-  .weather-item strong { font-size: 0.92rem; }
demo/css/theme.css:449:  .map-actions .button { flex: 1 1 auto; }
demo/css/theme.css-450-}
demo/css/theme.css-451-
demo/css/theme.css-452-@media (prefers-reduced-motion: reduce) {
demo/css/theme.css-453-  *, *::before, *::after { scroll-behavior: auto !important; transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command 'rg -n -C 3 "analysis-filter-grid|periodic-layout|stats-grid|map-preview|audit-preview|admin-table|table-wrap|switch|footer-links" demo/index.html demo/pages/*.html demo/pages/admin/*.html demo/js' in C:\Users\Joosep\tenders\klaipeda-environment
 exited 1 in 94ms:
rg: demo/pages/*.html: The filename, directory name, or volume label syntax is incorrect. (os error 123)
rg: demo/pages/admin/*.html: The filename, directory name, or volume label syntax is incorrect. (os error 123)
demo/index.html-68-        <p class="update-note"><a href="pages/zemelapis.html">Peržiūrėti pagal taškus žemėlapyje →</a></p>
demo/index.html-69-      </section>
demo/index.html-70-
demo/index.html:71:      <section class="panel map-preview" aria-labelledby="preview-title">
demo/index.html:72:        <div class="map-preview-content">
demo/index.html:73:          <div class="map-preview-label"><span aria-hidden="true"></span><span id="preview-title">Interaktyvus žemėlapis</span></div>
demo/index.html-74-          <p class="lede" style="max-width: 30ch; margin-top: 42px; color: var(--ink-800); font-size: .9rem;">Stotelės, IoT taškai ir mikrorajonų spalvinė suvestinė.</p>
demo/index.html:75:          <a class="button button--secondary button--small map-preview-link" href="pages/zemelapis.html">Atverti žemėlapį</a>
demo/index.html-76-        </div>
demo/index.html-77-      </section>
demo/index.html-78-    </div>
--
demo/index.html-101-  <footer class="site-footer">
demo/index.html-102-    <div class="site-footer-inner">
demo/index.html-103-      <div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Demonstracinė fazės 1 versija. Normų reikšmės, ribos ir mikrorajonų geometrija yra parinktos demonstracijai ir turi būti patvirtintos prieš diegimą.</p></div>
demo/index.html:104:      <nav class="footer-links" aria-label="Poraštės nuorodos"><a href="pages/admin/index.html">Valdymo pultas (demonstracija)</a><a href="pages/privatumo-politika.html">Privatumo politika</a><a href="pages/slapuku-politika.html">Slapukų politika</a><a href="pages/vadovas.html">Naudotojo vadovas</a><a href="pages/zemelapis.html">Žemėlapis</a></nav>
demo/index.html-105-    </div>
demo/index.html-106-  </footer>
demo/index.html-107-  <script type="module" src="js/pages/home.js"></script>
--
demo/js\pages\reports.js-15-    const stats = getStats(parameter.id, site.id, yearRange(year));
demo/js\pages\reports.js-16-    return { section, parameter, stats };
demo/js\pages\reports.js-17-  });
demo/js\pages\reports.js:18:  document.querySelector("#report-sections").innerHTML = rows.map(({ section, parameter, stats }) => `<section class="report-section"><h3>${escapeHtml(section.menuName)}</h3><p class="muted">Atstovaujamas parametras: <strong>${escapeHtml(parameter.name)}</strong> · taškas ${escapeHtml(site.shortName)} (${escapeHtml(site.address)}).</p><div class="data-table-wrap"><table class="data-table"><thead><tr><th>Mažiausia</th><th>Didžiausia</th><th>${parameter.section === "noise" ? "Logaritminis vidurkis" : "Vidurkis"}</th><th>Viršijimai</th><th>Įrašų kiekis</th></tr></thead><tbody><tr><td>${fmt(stats.min, parameter)}</td><td>${fmt(stats.max, parameter)}</td><td>${fmt(parameter.section === "noise" ? stats.logMean : stats.mean, parameter)}</td><td>${stats.exceedanceCount}</td><td>${stats.sampleCount}</td></tr></tbody></table></div></section>`).join("");
demo/js\pages\reports.js-19-  if (chart) chart.destroy();
demo/js\pages\reports.js-20-  const canvas = document.querySelector("#report-chart");
demo/js\pages\reports.js-21-  chart = new window.Chart(canvas.getContext("2d"), { type: "bar", data: { labels: rows.map((row) => row.section.name), datasets: [{ label: "Vidurkis / logaritminis vidurkis", data: rows.map((row) => row.parameter.section === "noise" ? row.stats.logMean : row.stats.mean), backgroundColor: ["#0b2f8b", "#4768c7", "#197067", "#d19a00", "#7c4f9e", "#a13e00", "#537083"] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, title: { display: true, text: "Katalogo vienetais; skirtingų parametrų masteliai nėra tiesiogiai lyginami" } }, x: { ticks: { maxRotation: 45, minRotation: 25 } } } } });
--
demo/js\pages\admin\pranesimai.js-7-  let state = readNotificationState();
demo/js\pages\admin\pranesimai.js-8-  const modeLabel = { auto: "Automatiškai", approve: "Patvirtinti prieš siuntimą" };
demo/js\pages\admin\pranesimai.js-9-  function saveState(action = "Atnaujintos pranešimų taisyklės") { writeNotificationState(state); auditAction(action, "Pranešimų valdymas", "Išsaugota"); }
demo/js\pages\admin\pranesimai.js:10:  function renderRules() { const sites = ["Visos stotelės", "KA-03", "KA-05", "KA-07"]; const parameters = ["Visi parametrai", "KD10", "NH₃", "Bendras azotas"]; document.querySelector("#gap-rules-table").innerHTML = state.gapRules.map((rule, index) => `<tr><td><strong>${escapeHtml(rule.duration)}</strong></td><td><select class="select-field" data-rule-site="${index}" aria-label="Duomenų spragos taisyklė ${escapeHtml(rule.duration)}: taškas" style="min-height:34px">${sites.map((item) => `<option ${item === (rule.site || "Visos stotelės") ? "selected" : ""}>${item}</option>`).join("")}</select></td><td><select class="select-field" data-rule-parameter="${index}" aria-label="Duomenų spragos taisyklė ${escapeHtml(rule.duration)}: parametras" style="min-height:34px">${parameters.map((item) => `<option ${item === (rule.parameter || "Visi parametrai") ? "selected" : ""}>${item}</option>`).join("")}</select></td><td><label class="admin-switch"><input type="checkbox" data-rule-index="${index}" aria-label="Duomenų spragos taisyklė ${escapeHtml(rule.duration)}: įjungta" ${rule.enabled ? "checked" : ""}><span class="fine-print">${rule.enabled ? "Įjungta" : "Išjungta"}</span></label></td></tr>`).join(""); }
demo/js\pages\admin\pranesimai.js-11-  function renderModes() { document.querySelector("#notification-modes").innerHTML = NOTIFICATION_TYPES.map(([id, label]) => `<div class="admin-rule"><div><strong>${label}</strong><p>Siuntimo sprendimas šiam įspėjimo tipui.</p></div><select class="select-field" data-mode-type="${id}" aria-label="${escapeHtml(label)}: siuntimo režimas" style="width:auto;min-height:34px"><option value="auto" ${state.modes[id] === "auto" ? "selected" : ""}>${modeLabel.auto}</option><option value="approve" ${state.modes[id] === "approve" ? "selected" : ""}>${modeLabel.approve}</option></select></div>`).join(""); }
demo/js\pages\admin\pranesimai.js-12-  function renderPending() { document.querySelector("#pending-notifications").innerHTML = state.pending.length ? state.pending.map((item) => { const label = NOTIFICATION_TYPES.find(([id]) => id === item.type)?.[1] || item.type; return `<div class="admin-rule"><div><strong>${escapeHtml(item.target)}</strong><p>${escapeHtml(label)} · ${formatDateTime(item.createdAt)}</p></div><div class="admin-inline-actions"><button class="button button--primary" data-pending-action="send" data-id="${item.id}" type="button">Siųsti</button><button class="button button--secondary" data-pending-action="reject" data-id="${item.id}" type="button">Atmesti</button></div></div>`; }).join("") : `<p class="muted">Laukiančių pranešimų nėra.</p>`; }
demo/js\pages\admin\pranesimai.js-13-  function renderTemplate() { const template = state.templates[document.querySelector("#template-type").value]; document.querySelector("#template-subject").value = template.subject; document.querySelector("#template-body").value = template.body; }
--
demo/js\pages\admin\index.js-30-  }
demo/js\pages\admin\index.js-31-
demo/js\pages\admin\index.js-32-  function renderAudit() {
demo/js\pages\admin\index.js:33:    document.querySelector("#audit-preview").innerHTML = recentAudit(5).map((entry) => `<tr><td>${formatDateTime(entry.timestamp)}</td><td>${escapeHtml(entry.role)}</td><td>${escapeHtml(entry.action)}<small>${escapeHtml(entry.target)}</small></td><td>${escapeHtml(entry.result)}</td></tr>`).join("");
demo/js\pages\admin\index.js-34-  }
demo/js\pages\admin\index.js-35-
demo/js\pages\admin\index.js-36-  function renderKpis() {
--
demo/js\pages\admin\nustatymai.js-14-  if (saved.offlineMinutes) document.querySelector("#offline-minutes").value = saved.offlineMinutes;
demo/js\pages\admin\nustatymai.js-15-  if (saved.cacheTtl) document.querySelector("#cache-ttl").value = saved.cacheTtl;
demo/js\pages\admin\nustatymai.js-16-  if (saved.rateLimit) document.querySelector("#rate-limit").value = saved.rateLimit;
demo/js\pages\admin\nustatymai.js:17:  document.querySelector("#validation-rules").innerHTML = rules.map(([id, label, description]) => `<div class="admin-rule"><div><strong>${label}</strong><p>${description}</p></div><label class="admin-switch"><input type="checkbox" data-validation-rule="${id}" ${saved.rules?.[id] !== false ? "checked" : ""}><span class="fine-print">Įjungta</span></label></div>`).join("");
demo/js\pages\admin\nustatymai.js-18-  document.querySelector("#settings-form").addEventListener("submit", (event) => { event.preventDefault(); const ruleState = {}; document.querySelectorAll("[data-validation-rule]").forEach((input) => { ruleState[input.dataset.validationRule] = input.checked; }); const value = { offlineMinutes: Number(document.querySelector("#offline-minutes").value), cacheTtl: Number(document.querySelector("#cache-ttl").value), rateLimit: Number(document.querySelector("#rate-limit").value), rules: ruleState, updatedAt: new Date().toISOString() }; localStorage.setItem(SETTINGS_KEY, JSON.stringify(value)); document.querySelector("#settings-message").textContent = "Nustatymai išsaugoti šios naršyklės demonstracinėje būsenoje."; auditAction("Išsaugoti valdymo pulto nustatymai", SETTINGS_KEY, "Išsaugota"); toast("Nustatymai išsaugoti."); });
demo/js\pages\admin\nustatymai.js-19-}

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command '$c = Get-Content '"'demo/css/theme.css'; for ("'$i=1; $i -le $c.Length; $i++) { if ($i -ge 1 -and $i -le 460) { '"'{0,4}: {1}' -f "'$i,$c[$i-1] } }; Write-Output "`n--- SECTIONS ---"; $s = Get-Content '"'demo/css/sections.css'; for ("'$i=1; $i -le $s.Length; $i++) { '"'{0,4}: {1}' -f "'$i,$s[$i-1] }' in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 193ms:
   1: @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap");
   2: 
   3: :root {
   4:   color-scheme: light;
   5:   --sea-950: #071f5b;
   6:   --sea-900: #0b2f8b;
   7:   --sea-800: #1341ba;
   8:   --sea-700: #4768c7;
   9:   --sea-500: #768cd4;
  10:   --shore-100: #f4f9ef;
  11:   --shore-200: #e7f2de;
  12:   --shore-300: #d9ebca;
  13:   --land-300: #7ca7a2;
  14:   --land-500: #538a83;
  15:   --land-700: #197067;
  16:   --land-900: #10544b;
  17:   --sun-500: #ffde45;
  18:   --sky-500: #288cc8;
  19: 
  20:   --ink-950: #102331;
  21:   --ink-800: #284454;
  22:   --ink-600: #537083;
  23:   --ink-500: #718897;
  24:   --line: #d6e2e6;
  25:   --line-strong: #afc5cc;
  26:   --paper: #fbfcfa;
  27:   --surface: #ffffff;
  28:   --surface-muted: #f1f6f5;
  29: 
  30:   --good: #50f0e6;
  31:   --fair: #50eaa9;
  32:   --moderate: #f4e400;
  33:   --poor: #fa4600;
  34:   --very-poor: #e51d1d;
  35:   --extremely-poor: #a71d17;
  36:   --no-data: #8798a0;
  37:   --status-ink: #15333b;
  38: 
  39:   --shadow-sm: 0 2px 8px rgba(16, 35, 49, 0.06);
  40:   --shadow-md: 0 14px 36px rgba(11, 47, 139, 0.12);
  41:   --radius-sm: 8px;
  42:   --radius-md: 14px;
  43:   --radius-lg: 22px;
  44:   --content-max: 1360px;
  45:   --focus: 0 0 0 4px rgba(40, 140, 200, 0.3);
  46:   --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
  47: }
  48: 
  49: * { box-sizing: border-box; }
  50: 
  51: html { scroll-behavior: smooth; }
  52: 
  53: body {
  54:   margin: 0;
  55:   background: var(--paper);
  56:   color: var(--ink-950);
  57:   font-family: "Plus Jakarta Sans", Arial, sans-serif;
  58:   font-size: 16px;
  59:   font-weight: 300;
  60:   line-height: 1.55;
  61:   text-rendering: optimizeLegibility;
  62: }
  63: 
  64: button,
  65: input,
  66: select { font: inherit; }
  67: 
  68: a { color: var(--sea-900); text-underline-offset: 0.18em; }
  69: a:hover { color: var(--land-900); }
  70: 
  71: :focus-visible {
  72:   outline: 3px solid var(--sky-500);
  73:   outline-offset: 3px;
  74:   box-shadow: var(--focus);
  75: }
  76: 
  77: .skip-link {
  78:   position: absolute;
  79:   left: 16px;
  80:   top: -60px;
  81:   z-index: 2000;
  82:   padding: 10px 14px;
  83:   color: #fff;
  84:   background: var(--sea-950);
  85:   border-radius: var(--radius-sm);
  86: }
  87: .skip-link:focus { top: 16px; }
  88: 
  89: .site-header {
  90:   background: var(--surface);
  91:   border-bottom: 1px solid var(--line);
  92: }
  93: 
  94: .header-inner,
  95: .page-shell,
  96: .site-footer-inner {
  97:   width: min(calc(100% - 40px), var(--content-max));
  98:   margin: 0 auto;
  99: }
 100: 
 101: .header-inner {
 102:   display: grid;
 103:   grid-template-columns: minmax(260px, 0.95fr) minmax(0, 1.65fr);
 104:   gap: 32px;
 105:   align-items: end;
 106:   padding: 18px 0 0;
 107: }
 108: 
 109: .brand-lockup {
 110:   display: flex;
 111:   align-items: flex-start;
 112:   gap: 13px;
 113:   padding-bottom: 17px;
 114:   text-decoration: none;
 115:   color: var(--ink-950);
 116: }
 117: 
 118: .brand-mark {
 119:   display: grid;
 120:   place-items: center;
 121:   flex: 0 0 44px;
 122:   width: 44px;
 123:   height: 44px;
 124:   color: var(--sea-900);
 125:   border: 1px solid var(--sea-700);
 126:   border-radius: 50%;
 127:   font-size: 0.74rem;
 128:   font-weight: 600;
 129:   letter-spacing: 0.12em;
 130: }
 131: 
 132: .brand-lockup strong {
 133:   display: block;
 134:   max-width: 520px;
 135:   color: var(--sea-950);
 136:   font-size: clamp(0.9rem, 1.25vw, 1.18rem);
 137:   font-weight: 600;
 138:   line-height: 1.18;
 139: }
 140: 
 141: .brand-lockup small {
 142:   display: block;
 143:   margin-top: 5px;
 144:   color: var(--ink-600);
 145:   font-size: 0.74rem;
 146:   letter-spacing: 0.08em;
 147:   text-transform: uppercase;
 148: }
 149: 
 150: .main-nav { align-self: stretch; }
 151: .main-nav > ul {
 152:   display: flex;
 153:   flex-wrap: wrap;
 154:   justify-content: flex-end;
 155:   gap: 5px;
 156:   height: 100%;
 157:   margin: 0;
 158:   padding: 0;
 159:   list-style: none;
 160: }
 161: 
 162: .main-nav a,
 163: .main-nav summary {
 164:   display: inline-flex;
 165:   min-height: 46px;
 166:   align-items: center;
 167:   padding: 8px 11px 12px;
 168:   color: var(--ink-800);
 169:   font-size: 0.79rem;
 170:   font-weight: 500;
 171:   text-decoration: none;
 172:   transition: color 180ms var(--ease-out), background 180ms var(--ease-out);
 173: }
 174: .main-nav a:hover,
 175: .main-nav summary:hover,
 176: .main-nav a[aria-current="page"] { color: var(--sea-900); background: var(--shore-100); }
 177: .main-nav details { position: relative; }
 178: .main-nav summary { cursor: pointer; list-style: none; }
 179: .main-nav summary::-webkit-details-marker { display: none; }
 180: .main-nav summary::after { content: "⌄"; margin-left: 6px; font-size: 0.85rem; }
 181: .main-nav details[open] summary { color: var(--sea-900); }
 182: .main-nav details ul {
 183:   position: absolute;
 184:   right: 0;
 185:   z-index: 50;
 186:   width: 280px;
 187:   margin: 0;
 188:   padding: 8px;
 189:   list-style: none;
 190:   background: var(--surface);
 191:   border: 1px solid var(--line);
 192:   border-radius: var(--radius-sm);
 193:   box-shadow: var(--shadow-md);
 194: }
 195: .main-nav details li a { display: flex; min-height: 40px; padding: 8px 10px; }
 196: 
 197: .brand-stripe {
 198:   display: grid;
 199:   grid-template-rows: repeat(3, 4px);
 200:   gap: 2px;
 201:   width: 100%;
 202:   height: 16px;
 203:   overflow: hidden;
 204: }
 205: .brand-stripe span { display: block; }
 206: .brand-stripe .stripe-sea { background: var(--sea-800); transform: translate(0, 0); }
 207: .brand-stripe .stripe-shore { background: var(--sun-500); transform: translate(5px, 1px); }
 208: .brand-stripe .stripe-land { background: var(--land-700); transform: translate(10px, 2px); }
 209: .brand-stripe--compact { grid-template-rows: repeat(3, 3px); gap: 1px; height: 11px; }
 210: 
 211: .page-shell { padding: 28px 0 72px; }
 212: .section-kicker {
 213:   margin: 0 0 10px;
 214:   color: var(--land-700);
 215:   font-size: 0.72rem;
 216:   font-weight: 600;
 217:   letter-spacing: 0.14em;
 218:   text-transform: uppercase;
 219: }
 220: h1, h2, h3, h4 { color: var(--sea-950); font-weight: 500; line-height: 1.16; }
 221: h1 { margin: 0; font-size: clamp(2.25rem, 5vw, 5.3rem); letter-spacing: -0.055em; }
 222: h2 { margin: 0; font-size: clamp(1.45rem, 2.8vw, 2.5rem); letter-spacing: -0.035em; }
 223: h3 { margin: 0; font-size: 1.12rem; }
 224: p { margin-top: 0; }
 225: .lede { max-width: 58ch; color: var(--ink-600); font-size: clamp(1rem, 1.5vw, 1.2rem); }
 226: 
 227: .button {
 228:   display: inline-flex;
 229:   min-height: 46px;
 230:   align-items: center;
 231:   justify-content: center;
 232:   gap: 8px;
 233:   padding: 10px 16px;
 234:   border: 1px solid transparent;
 235:   border-radius: 999px;
 236:   cursor: pointer;
 237:   font-size: 0.84rem;
 238:   font-weight: 600;
 239:   text-decoration: none;
 240:   transition: transform 180ms var(--ease-out), background 180ms var(--ease-out), border-color 180ms var(--ease-out);
 241: }
 242: .button:hover { transform: translateY(-1px); }
 243: .button--primary { color: #fff; background: var(--sea-900); }
 244: .button--primary:hover { color: #fff; background: var(--sea-950); }
 245: .button--secondary { color: var(--sea-900); background: var(--surface); border-color: var(--line-strong); }
 246: .button--secondary:hover { background: var(--shore-100); border-color: var(--sea-500); }
 247: .button--small { min-height: 38px; padding: 8px 12px; font-size: 0.76rem; }
 248: 
 249: .panel {
 250:   background: var(--surface);
 251:   border: 1px solid var(--line);
 252:   border-radius: var(--radius-md);
 253:   box-shadow: var(--shadow-sm);
 254: }
 255: 
 256: .hero {
 257:   display: grid;
 258:   grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
 259:   gap: clamp(28px, 6vw, 92px);
 260:   align-items: end;
 261:   padding: clamp(26px, 5vw, 72px) 0 42px;
 262: }
 263: .hero-copy { position: relative; }
 264: .hero-copy::before {
 265:   position: absolute;
 266:   top: -22px;
 267:   left: 0;
 268:   width: 46px;
 269:   height: 4px;
 270:   content: "";
 271:   background: var(--sun-500);
 272: }
 273: .hero h1 { max-width: 760px; }
 274: .hero .lede { margin: 23px 0 26px; }
 275: .hero-aside { padding: 20px 0 0 20px; border-left: 1px solid var(--line-strong); }
 276: .hero-aside strong { display: block; color: var(--land-900); font-size: 1.1rem; font-weight: 500; }
 277: .hero-aside p { margin: 9px 0 0; color: var(--ink-600); font-size: 0.9rem; }
 278: 
 279: .grid-home {
 280:   display: grid;
 281:   grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
 282:   gap: 18px;
 283:   align-items: start;
 284: }
 285: .grid-home > .panel:first-child { grid-row: span 2; }
 286: .card-pad { padding: clamp(19px, 3vw, 30px); }
 287: .card-heading { display: flex; align-items: start; justify-content: space-between; gap: 16px; }
 288: .card-heading p { margin: 7px 0 0; color: var(--ink-600); font-size: 0.85rem; }
 289: .card-heading .eyebrow { color: var(--land-700); font-size: 0.69rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; }
 290: 
 291: .weather-strip {
 292:   display: grid;
 293:   grid-template-columns: repeat(5, minmax(0, 1fr));
 294:   gap: 1px;
 295:   margin: 24px 0 0;
 296:   overflow: hidden;
 297:   background: var(--line);
 298:   border: 1px solid var(--line);
 299:   border-radius: var(--radius-sm);
 300: }
 301: .weather-item { min-width: 0; padding: 15px 13px; background: var(--surface-muted); }
 302: .weather-item .label { display: block; color: var(--ink-600); font-size: 0.7rem; }
 303: .weather-item strong { display: block; margin-top: 7px; color: var(--sea-950); font-size: clamp(1rem, 2vw, 1.45rem); font-weight: 500; white-space: nowrap; }
 304: .weather-item small { display: block; margin-top: 2px; color: var(--ink-500); font-size: 0.7rem; }
 305: .update-note { margin: 12px 0 0; color: var(--ink-500); font-size: 0.73rem; }
 306: 
 307: .aqi-layout { display: grid; grid-template-columns: 128px minmax(0, 1fr); gap: 21px; align-items: center; margin-top: 26px; }
 308: .aqi-score {
 309:   display: grid;
 310:   place-items: center;
 311:   width: 128px;
 312:   aspect-ratio: 1;
 313:   color: var(--status-ink);
 314:   background: var(--good);
 315:   border-radius: 50%;
 316:   box-shadow: inset 0 0 0 9px rgba(255,255,255,0.42);
 317: }
 318: .aqi-score strong { display: block; font-size: 2.75rem; font-weight: 500; line-height: 1; }
 319: .aqi-score span { display: block; margin-top: 7px; font-size: 0.67rem; font-weight: 600; text-transform: uppercase; }
 320: .aqi-copy h3 { font-size: 1.35rem; }
 321: .aqi-copy p { margin: 7px 0 0; color: var(--ink-600); font-size: 0.83rem; }
 322: .aqi-scale { display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; margin-top: 22px; }
 323: .aqi-scale span { height: 7px; border-radius: 2px; }
 324: .aqi-scale .good { background: var(--good); }.aqi-scale .fair { background: var(--fair); }.aqi-scale .moderate { background: var(--moderate); }.aqi-scale .poor { background: var(--poor); }.aqi-scale .very-poor { background: var(--very-poor); }.aqi-scale .extremely-poor { background: var(--extremely-poor); }
 325: .legend-labels { display: flex; justify-content: space-between; gap: 8px; margin-top: 7px; color: var(--ink-500); font-size: 0.66rem; }
 326: 
 327: .map-preview { position: relative; min-height: 230px; overflow: hidden; background: #dfe9df; }
 328: .map-preview::before,
 329: .map-preview::after { position: absolute; content: ""; background: rgba(255,255,255,0.72); transform: rotate(-13deg); }
 330: .map-preview::before { top: 22%; left: -8%; width: 120%; height: 14px; box-shadow: 0 65px 0 rgba(255,255,255,0.55), 0 130px 0 rgba(255,255,255,0.65); }
 331: .map-preview::after { top: -10%; left: 38%; width: 15px; height: 130%; box-shadow: 80px 0 0 rgba(255,255,255,0.44), 160px 0 0 rgba(255,255,255,0.48); }
 332: .map-preview-content { position: relative; z-index: 1; min-height: 230px; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
 333: .map-preview-label { display: flex; align-items: center; justify-content: space-between; color: var(--sea-950); font-size: 0.72rem; font-weight: 600; }
 334: .map-preview-label span { display: inline-flex; width: 8px; height: 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
 335: .map-preview-link { position: absolute; right: 18px; bottom: 17px; }
 336: 
 337: .section-intro { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin: 44px 0 18px; }
 338: .section-intro p { max-width: 48ch; margin: 0; color: var(--ink-600); font-size: 0.9rem; }
 339: .monitoring-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
 340: .monitoring-link { min-height: 126px; padding: 17px; color: var(--ink-800); text-decoration: none; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-sm); transition: transform 180ms var(--ease-out), border-color 180ms var(--ease-out), box-shadow 180ms var(--ease-out); }
 341: .monitoring-link:hover { color: var(--ink-800); border-color: var(--land-500); box-shadow: var(--shadow-sm); transform: translateY(-2px); }
 342: .monitoring-link strong { display: block; color: var(--sea-900); font-size: 0.9rem; font-weight: 500; }
 343: .monitoring-link span { display: block; margin-top: 26px; color: var(--ink-500); font-size: 0.7rem; }
 344: 
 345: .site-footer { background: var(--sea-950); color: #dfeafa; }
 346: .site-footer-inner { display: flex; justify-content: space-between; gap: 30px; padding: 29px 0 35px; }
 347: .site-footer strong { display: block; color: #fff; font-weight: 500; }
 348: .site-footer p { max-width: 45ch; margin: 8px 0 0; color: #bbcee2; font-size: 0.77rem; }
 349: .footer-links { display: flex; flex-wrap: wrap; justify-content: flex-end; align-content: flex-start; gap: 8px 16px; }
 350: .footer-links a { color: #dfeafa; font-size: 0.77rem; }
 351: 
 352: /* Map page */
 353: .map-page-shell { width: min(calc(100% - 32px), 1500px); margin: 0 auto; padding: 22px 0 32px; }
 354: .map-titlebar { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 18px; }
 355: .map-titlebar h1 { font-size: clamp(1.8rem, 4vw, 3.5rem); }
 356: .map-titlebar p { max-width: 54ch; margin: 7px 0 0; color: var(--ink-600); font-size: 0.86rem; }
 357: .map-actions { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; }
 358: .map-layout { display: grid; grid-template-columns: minmax(230px, 0.27fr) minmax(0, 1fr); min-height: 660px; overflow: hidden; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-md); box-shadow: var(--shadow-md); }
 359: .map-sidebar { padding: 19px; background: var(--surface-muted); border-right: 1px solid var(--line); }
 360: .control-group { margin-bottom: 21px; }
 361: .control-group:last-child { margin-bottom: 0; }
 362: .control-label { display: block; margin-bottom: 7px; color: var(--ink-800); font-size: 0.72rem; font-weight: 600; }
 363: .control-help { margin: 6px 0 0; color: var(--ink-500); font-size: 0.7rem; line-height: 1.45; }
 364: .field,
 365: .select-field { width: 100%; min-height: 43px; padding: 8px 10px; color: var(--ink-950); background: var(--surface); border: 1px solid var(--line-strong); border-radius: var(--radius-sm); }
 366: .field:hover,
 367: .select-field:hover { border-color: var(--sea-700); }
 368: .layer-list { display: grid; gap: 8px; }
 369: .layer-list label { display: flex; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
 370: .layer-list input { width: 18px; height: 18px; accent-color: var(--sea-800); }
 371: .legend { display: grid; gap: 7px; padding-top: 12px; border-top: 1px solid var(--line); }
 372: .legend-row { display: flex; align-items: center; gap: 8px; color: var(--ink-600); font-size: 0.7rem; }
 373: .legend-dot { width: 12px; height: 12px; flex: 0 0 12px; border: 2px solid rgba(16,35,49,0.28); border-radius: 50%; }
 374: .legend-swatch { width: 19px; height: 13px; flex: 0 0 19px; border: 1px solid rgba(16,35,49,0.25); border-radius: 3px; }
 375: .measure-list { display: grid; gap: 7px; margin: 10px 0 0; padding: 0; list-style: none; }
 376: .measure-list li { display: flex; justify-content: space-between; gap: 8px; padding: 7px 8px; color: var(--ink-800); background: var(--surface); border: 1px solid var(--line); border-radius: 5px; font-size: 0.68rem; }
 377: .measure-list strong { color: var(--sea-900); font-weight: 600; white-space: nowrap; }
 378: .map-canvas { position: relative; min-height: 660px; }
 379: #map { position: absolute; inset: 0; z-index: 1; }
 380: .map-status { position: absolute; left: 13px; bottom: 16px; z-index: 500; max-width: min(360px, calc(100% - 26px)); padding: 9px 11px; color: var(--ink-800); background: rgba(255,255,255,0.94); border: 1px solid var(--line); border-radius: 6px; box-shadow: var(--shadow-sm); font-size: 0.7rem; }
 381: .station-label { padding: 4px 6px; color: var(--sea-950); background: var(--surface); border: 1px solid var(--sea-700); border-radius: 4px; box-shadow: 0 2px 6px rgba(16,35,49,0.2); font-size: 0.68rem; font-weight: 600; white-space: nowrap; }
 382: .station-label--iot { color: var(--land-900); border-color: var(--land-500); }
 383: .leaflet-popup-content-wrapper { border-radius: 10px; }
 384: .leaflet-popup-content { width: min(330px, calc(100vw - 66px)) !important; margin: 15px 16px; }
 385: .popup-kicker { margin-bottom: 4px; color: var(--land-700); font-size: 0.66rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
 386: .popup-title { margin: 0; color: var(--sea-950); font-size: 1rem; font-weight: 600; line-height: 1.25; }
 387: .popup-meta { margin: 6px 0 12px; color: var(--ink-600); font-size: 0.68rem; line-height: 1.55; }
 388: .popup-select { width: 100%; min-height: 34px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
 389: .popup-data-table { width: 100%; border-collapse: collapse; font-size: 0.7rem; }
 390: .popup-data-table th,
 391: .popup-data-table td { padding: 6px 4px; text-align: left; border-bottom: 1px solid var(--line); }
 392: .popup-data-table th { color: var(--ink-500); font-weight: 400; }
 393: .popup-data-table td { color: var(--ink-950); font-weight: 500; }
 394: .popup-norm { margin-top: 10px; padding: 8px; background: var(--shore-100); border-radius: 5px; color: var(--land-900); font-size: 0.7rem; }
 395: .popup-note { margin: 9px 0 0; color: var(--ink-500); font-size: 0.64rem; }
 396: 
 397: .status-good { background-color: var(--good); }
 398: .status-fair { background-color: var(--fair); }
 399: .status-moderate { background-color: var(--moderate); }
 400: .status-poor { background-color: var(--poor); }
 401: .status-very-poor { background-color: var(--very-poor); }
 402: .status-extremely-poor { background-color: var(--extremely-poor); }
 403: .status-no-data { background-color: var(--no-data); }
 404: .status-chip { display: inline-flex; align-items: center; min-height: 27px; padding: 4px 8px; color: var(--status-ink); border-radius: 999px; font-size: 0.64rem; font-weight: 600; line-height: 1.2; text-align: center; }
 405: .status-very-poor.status-chip, .status-extremely-poor.status-chip { color: #fff; }
 406: .status-dot { display: inline-block; width: 8px; height: 8px; margin-left: 4px; vertical-align: middle; border-radius: 50%; }
 407: 
 408: @media (max-width: 980px) {
 409:   .header-inner { grid-template-columns: 1fr; gap: 0; }
 410:   .main-nav > ul { justify-content: flex-start; }
 411:   .brand-lockup { padding-bottom: 13px; }
 412:   .main-nav a, .main-nav summary { padding-bottom: 10px; }
 413:   .grid-home { grid-template-columns: 1fr 1fr; }
 414:   .grid-home > .panel:first-child { grid-row: auto; grid-column: 1 / -1; }
 415:   .monitoring-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
 416:   .map-layout { grid-template-columns: 250px minmax(0, 1fr); }
 417: }
 418: 
 419: @media (max-width: 720px) {
 420:   .header-inner, .page-shell, .site-footer-inner { width: min(calc(100% - 28px), var(--content-max)); }
 421:   .main-nav { overflow-x: auto; }
 422:   .main-nav > ul { flex-wrap: nowrap; width: max-content; }
 423:   .main-nav details ul { position: fixed; top: 107px; left: 14px; right: 14px; width: auto; }
 424:   .hero { grid-template-columns: 1fr; gap: 24px; padding-top: 42px; }
 425:   .hero-aside { padding: 17px 0 0; border-top: 1px solid var(--line-strong); border-left: 0; }
 426:   .grid-home { grid-template-columns: 1fr; }
 427:   .weather-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
 428:   .weather-item:last-child { grid-column: 1 / -1; }
 429:   .section-intro { display: block; }
 430:   .section-intro p { margin-top: 10px; }
 431:   .monitoring-grid { grid-template-columns: 1fr; }
 432:   .site-footer-inner { display: block; }
 433:   .footer-links { justify-content: flex-start; margin-top: 21px; }
 434:   .map-page-shell { width: min(calc(100% - 20px), 1500px); padding-top: 15px; }
 435:   .map-titlebar { display: block; }
 436:   .map-actions { justify-content: flex-start; margin-top: 14px; }
 437:   .map-layout { display: flex; flex-direction: column; min-height: 0; }
 438:   .map-sidebar { max-height: none; border-right: 0; border-bottom: 1px solid var(--line); }
 439:   .map-canvas { min-height: 70vh; }
 440:   #map { min-height: 70vh; }
 441: }
 442: 
 443: @media (max-width: 440px) {
 444:   .aqi-layout { grid-template-columns: 96px minmax(0, 1fr); gap: 14px; }
 445:   .aqi-score { width: 96px; }
 446:   .aqi-score strong { font-size: 2.1rem; }
 447:   .aqi-score span { font-size: 0.56rem; }
 448:   .weather-item strong { font-size: 0.92rem; }
 449:   .map-actions .button { flex: 1 1 auto; }
 450: }
 451: 
 452: @media (prefers-reduced-motion: reduce) {
 453:   *, *::before, *::after { scroll-behavior: auto !important; transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
 454: }

--- SECTIONS ---
   1: /* Shared phase-2 public portal views */
   2: .page-hero { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(260px, .65fr); gap: clamp(24px, 6vw, 88px); align-items: end; padding: clamp(24px, 5vw, 64px) 0 30px; border-bottom: 1px solid var(--line); }
   3: .page-hero h1 { max-width: 850px; font-size: clamp(2.1rem, 5vw, 4.8rem); }
   4: .page-hero .lede { margin: 18px 0 0; }
   5: .page-hero-aside { padding: 17px 0 0 20px; border-left: 3px solid var(--sun-500); }
   6: .page-hero-aside strong { display: block; color: var(--land-900); font-size: .93rem; font-weight: 600; }
   7: .page-hero-aside p { margin: 7px 0 0; color: var(--ink-600); font-size: .78rem; }
   8: .page-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
   9: .content-stack { display: grid; gap: 22px; padding-top: 24px; }
  10: .surface { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); }
  11: .surface-pad { padding: clamp(18px, 3vw, 30px); }
  12: .section-heading { display: flex; justify-content: space-between; align-items: start; gap: 20px; margin-bottom: 18px; }
  13: .section-heading h2 { font-size: clamp(1.35rem, 3vw, 2.2rem); }
  14: .section-heading p { max-width: 62ch; margin: 8px 0 0; color: var(--ink-600); font-size: .86rem; }
  15: .eyebrow { color: var(--land-700); font-size: .68rem; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; }
  16: .muted { color: var(--ink-600); font-size: .82rem; }
  17: .fine-print { color: var(--ink-500); font-size: .72rem; }
  18: .notice { display: flex; gap: 12px; padding: 14px 16px; background: var(--shore-100); border-left: 3px solid var(--sun-500); color: var(--ink-800); font-size: .8rem; }
  19: .notice strong { color: var(--land-900); font-weight: 600; }
  20: .analysis-tabs { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 24px; border-bottom: 1px solid var(--line); }
  21: .analysis-tab { min-height: 46px; padding: 9px 14px; color: var(--ink-600); background: transparent; border: 0; border-bottom: 3px solid transparent; cursor: pointer; font-size: .78rem; font-weight: 600; text-align: left; }
  22: .analysis-tab:hover { color: var(--sea-900); background: var(--shore-100); }
  23: .analysis-tab[aria-selected="true"] { color: var(--sea-900); border-bottom-color: var(--sun-500); }
  24: .analysis-panel[hidden] { display: none; }
  25: .analysis-filter-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; padding: 18px; background: var(--surface-muted); border: 1px solid var(--line); }
  26: .field-group { min-width: 0; }
  27: .field-group--wide { grid-column: span 2; }
  28: .field-label { display: block; margin-bottom: 6px; color: var(--ink-800); font-size: .72rem; font-weight: 600; }
  29: .field-help { margin: 5px 0 0; color: var(--ink-500); font-size: .68rem; line-height: 1.4; }
  30: .field, .select-field, .analysis-filter-grid input[type="search"], .analysis-filter-grid input[type="email"], .analysis-filter-grid input[type="text"] { width: 100%; min-height: 43px; padding: 8px 10px; color: var(--ink-950); background: var(--surface); border: 1px solid var(--line-strong); border-radius: var(--radius-sm); }
  31: .field:focus, .select-field:focus, .analysis-filter-grid input:focus { border-color: var(--sea-700); }
  32: .select-field[multiple] { min-height: 112px; padding: 5px; }
  33: .checkline { display: flex; align-items: center; gap: 8px; min-height: 43px; color: var(--ink-800); font-size: .78rem; }
  34: .checkline input, .checkbox-grid input { width: 18px; height: 18px; accent-color: var(--sea-800); }
  35: .filter-actions { display: flex; align-items: end; gap: 8px; grid-column: 1 / -1; padding-top: 3px; }
  36: .analysis-message { margin: 13px 0 0; color: var(--ink-600); font-size: .76rem; }
  37: .stats-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; margin: 22px 0; }
  38: .stat-card { min-width: 0; padding: 14px; background: var(--surface-muted); border-top: 3px solid var(--line-strong); }
  39: .stat-card--accent { border-top-color: var(--sun-500); }
  40: .stat-label { display: block; color: var(--ink-600); font-size: .68rem; }
  41: .stat-value { display: block; margin-top: 6px; color: var(--sea-950); font-size: clamp(1.15rem, 2.3vw, 1.8rem); font-weight: 500; line-height: 1.1; }
  42: .stat-note { display: block; margin-top: 5px; color: var(--ink-500); font-size: .66rem; }
  43: .trend-up { color: #a13e00; }
  44: .trend-down { color: var(--land-900); }
  45: .trend-flat { color: var(--ink-600); }
  46: .chart-grid { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(280px, .65fr); gap: 18px; margin-top: 18px; }
  47: .chart-panel { min-width: 0; padding: 18px; background: var(--surface); border: 1px solid var(--line); }
  48: .chart-panel h3 { font-size: 1rem; }
  49: .chart-panel p { margin: 6px 0 14px; color: var(--ink-600); font-size: .72rem; }
  50: .chart-wrap { position: relative; height: 300px; }
  51: .chart-wrap--short { height: 250px; }
  52: .chart-wrap canvas { width: 100% !important; height: 100% !important; }
  53: .chart-caption { margin: 10px 0 0; color: var(--ink-500); font-size: .68rem; }
  54: .chart-legend { display: flex; flex-wrap: wrap; gap: 8px 16px; margin-top: 10px; color: var(--ink-600); font-size: .68rem; }
  55: .legend-key { display: inline-flex; align-items: center; gap: 6px; }
  56: .legend-key::before { content: ""; display: inline-block; width: 18px; height: 3px; background: var(--sea-800); }
  57: .legend-key--limit::before { background: var(--poor); border-top: 1px dashed var(--poor); }
  58: .correlation-copy { display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: center; margin-bottom: 12px; padding: 12px; background: var(--shore-100); }
  59: .correlation-r { color: var(--sea-950); font-size: 2rem; font-weight: 500; line-height: 1; }
  60: .correlation-copy p { margin: 0; color: var(--ink-800); font-size: .74rem; }
  61: .data-table-wrap { overflow-x: auto; border: 1px solid var(--line); }
  62: .data-table { width: 100%; min-width: 580px; border-collapse: collapse; font-size: .74rem; }
  63: .data-table caption { padding: 12px 14px; color: var(--ink-600); font-size: .72rem; text-align: left; }
  64: .data-table th, .data-table td { padding: 10px 12px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
  65: .data-table th { color: var(--ink-600); background: var(--surface-muted); font-size: .68rem; font-weight: 600; }
  66: .data-table td { color: var(--ink-800); }
  67: .data-table tr:last-child td { border-bottom: 0; }
  68: .value-exceedance { color: #a13e00; font-weight: 600; }
  69: .periodic-layout { display: grid; grid-template-columns: minmax(190px, .3fr) minmax(0, 1fr); gap: 22px; }
  70: .periodic-filters { padding: 16px; background: var(--surface-muted); border: 1px solid var(--line); }
  71: .periodic-filters .field-group + .field-group { margin-top: 14px; }
  72: .periodic-results { min-width: 0; }
  73: .periodic-summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-bottom: 16px; }
  74: .periodic-summary .stat-card { padding: 12px; }
  75: .periodic-chart { margin-top: 18px; }
  76: .subsection-switcher { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 18px; }
  77: .subsection-switcher button { min-height: 42px; padding: 8px 11px; color: var(--ink-800); background: var(--surface); border: 1px solid var(--line-strong); border-radius: 3px; cursor: pointer; font-size: .72rem; font-weight: 600; }
  78: .subsection-switcher button:hover, .subsection-switcher button[aria-selected="true"] { color: var(--sea-950); background: var(--shore-200); border-color: var(--land-500); }
  79: .score-table .score { min-width: 105px; }
  80: .score-meter { display: grid; grid-template-columns: repeat(10, 1fr); gap: 2px; min-width: 95px; }
  81: .score-meter span { height: 13px; background: var(--line); }
  82: .score-meter span.is-filled { background: var(--land-500); }
  83: .score-meter span.is-low { background: var(--moderate); }
  84: .score-meter span.is-poor { background: var(--poor); }
  85: .condition-tag { display: inline-flex; padding: 4px 7px; border-radius: 2px; font-size: .64rem; font-weight: 600; }
  86: .condition-good { color: var(--land-900); background: var(--shore-200); }
  87: .condition-medium { color: #695500; background: #fff4ad; }
  88: .condition-poor { color: #7d2600; background: #ffd8c7; }
  89: .report-list { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
  90: .report-link { display: flex; min-height: 120px; flex-direction: column; justify-content: space-between; padding: 15px; color: var(--ink-800); background: var(--surface); border: 1px solid var(--line); text-decoration: none; }
  91: .report-link:hover { color: var(--ink-800); border-color: var(--land-500); box-shadow: var(--shadow-sm); }
  92: .report-link strong { color: var(--sea-900); font-size: 1.1rem; font-weight: 500; }
  93: .report-link span { color: var(--ink-500); font-size: .7rem; }
  94: .report-toolbar { display: flex; flex-wrap: wrap; gap: 8px; justify-content: space-between; align-items: center; margin: 18px 0; }
  95: .report-sheet { max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
  96: .report-cover { padding-bottom: 24px; border-bottom: 3px solid var(--sun-500); }
  97: .report-cover h2 { margin-top: 10px; }
  98: .report-section { padding: 20px 0; border-bottom: 1px solid var(--line); }
  99: .report-section:last-child { border-bottom: 0; }
 100: .report-section h3 { color: var(--sea-900); }
 101: .report-section .data-table { min-width: 0; }
 102: .report-chart { height: 220px; margin-top: 14px; }
 103: .wizard-steps { display: flex; gap: 5px; margin-bottom: 20px; counter-reset: wizard; }
 104: .wizard-step { flex: 1; padding: 11px 12px; color: var(--ink-600); background: var(--surface-muted); border-bottom: 3px solid var(--line); font-size: .73rem; }
 105: .wizard-step::before { counter-increment: wizard; content: counter(wizard) ". "; color: var(--sea-900); font-weight: 600; }
 106: .wizard-step.is-active { color: var(--sea-950); background: var(--shore-200); border-bottom-color: var(--sun-500); }
 107: .wizard-panel[hidden] { display: none; }
 108: .checkbox-groups { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
 109: .checkbox-group { padding: 15px; border: 1px solid var(--line); }
 110: .checkbox-group h3 { margin-bottom: 10px; font-size: .93rem; }
 111: .checkbox-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; max-height: 270px; overflow: auto; }
 112: .checkbox-grid label { display: flex; align-items: flex-start; gap: 7px; color: var(--ink-800); font-size: .73rem; }
 113: .selection-summary { display: grid; gap: 9px; padding: 15px; background: var(--shore-100); border: 1px solid var(--shore-300); }
 114: .selection-summary strong { color: var(--land-900); font-weight: 600; }
 115: .demo-code { display: inline-block; padding: 7px 10px; color: var(--sea-950); background: var(--surface); border: 1px dashed var(--sea-700); font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: .9rem; font-weight: 600; letter-spacing: .08em; }
 116: .success-panel { padding: 20px; background: var(--shore-100); border-left: 4px solid var(--land-700); }
 117: .erase-box { margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--line); }
 118: .erase-box form { display: flex; flex-wrap: wrap; gap: 8px; max-width: 650px; }
 119: .erase-box input { flex: 1 1 260px; }
 120: .text-page { max-width: 980px; }
 121: .text-page h2 { margin-top: 34px; font-size: 1.45rem; }
 122: .text-page h3 { margin-top: 23px; color: var(--land-900); font-size: 1rem; }
 123: .text-page p, .text-page li { color: var(--ink-800); font-size: .88rem; }
 124: .text-page ul, .text-page ol { padding-left: 1.25rem; }
 125: .contact-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 16px; }
 126: .contact-card { padding: 15px; background: var(--surface-muted); border-top: 3px solid var(--land-500); }
 127: .contact-card strong { display: block; color: var(--sea-900); font-size: .86rem; }
 128: .contact-card p { margin: 7px 0 0; font-size: .76rem; }
 129: .howto-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
 130: .howto { padding: 18px; border: 1px solid var(--line); }
 131: .howto .step-number { display: inline-grid; place-items: center; width: 30px; height: 30px; margin-bottom: 12px; color: var(--sea-950); background: var(--sun-500); font-weight: 600; }
 132: .howto h3 { margin-bottom: 8px; }
 133: .privacy-version { display: inline-block; padding: 5px 8px; color: var(--land-900); background: var(--shore-200); font-size: .7rem; font-weight: 600; }
 134: .main-nav details ul ul { position: static; width: auto; margin: 2px 0 0; padding: 0 0 0 10px; border: 0; border-radius: 0; box-shadow: none; }
 135: .main-nav details ul ul a { min-height: 34px; padding: 6px 8px; font-size: .71rem; }
 136: .main-nav .nav-group-label { display: block; padding: 7px 8px 3px; color: var(--land-700); font-size: .68rem; font-weight: 600; }
 137: 
 138: @media (max-width: 980px) {
 139:   .page-hero { grid-template-columns: 1fr; gap: 18px; }
 140:   .page-hero-aside { padding: 15px 0 0; border-top: 3px solid var(--sun-500); border-left: 0; }
 141:   .analysis-filter-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
 142:   .chart-grid { grid-template-columns: 1fr; }
 143:   .report-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
 144:   .periodic-layout { grid-template-columns: 1fr; }
 145: }
 146: @media (max-width: 720px) {
 147:   .analysis-filter-grid, .stats-grid, .checkbox-groups, .howto-grid, .contact-grid { grid-template-columns: 1fr; }
 148:   .field-group--wide { grid-column: auto; }
 149:   .stats-grid { gap: 8px; }
 150:   .stat-card { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 6px 12px; align-items: center; }
 151:   .stat-note { grid-column: 1 / -1; margin-top: 0; }
 152:   .periodic-summary { grid-template-columns: 1fr; }
 153:   .report-list { grid-template-columns: 1fr; }
 154:   .wizard-steps { display: grid; grid-template-columns: 1fr; }
 155:   .checkbox-grid { grid-template-columns: 1fr; }
 156: }
 157: @media print {
 158:   .site-header, .site-footer, .page-actions, .report-toolbar, .report-list, .skip-link { display: none !important; }
 159:   body { background: #fff; }
 160:   .page-shell { width: 100%; padding: 0; }
 161:   .report-sheet { max-width: none; padding: 0; border: 0; box-shadow: none; }
 162:   .report-section { break-inside: avoid; }
 163: }
 164: 
 165: /* Phase 3 administration shell */
 166: .admin-body { background: var(--surface-muted); }
 167: .admin-layout { display: grid; grid-template-columns: 258px minmax(0, 1fr); min-height: 100vh; }
 168: .admin-sidebar { position: sticky; top: 0; display: flex; min-height: 100vh; flex-direction: column; padding: 23px 16px 18px; color: #dfeafa; background: var(--sea-950); }
 169: .admin-brand { display: flex; align-items: flex-start; gap: 11px; color: #fff; text-decoration: none; }
 170: .admin-brand .brand-mark { flex-basis: 40px; width: 40px; height: 40px; color: var(--sun-500); border-color: rgba(255,222,69,.65); font-size: .68rem; }
 171: .admin-brand strong { display: block; font-size: 1rem; font-weight: 600; line-height: 1.15; }
 172: .admin-brand small { display: block; margin-top: 5px; color: #a9c0da; font-size: .69rem; letter-spacing: .1em; text-transform: uppercase; }
 173: .admin-sidebar .brand-stripe { margin: 22px 0 20px; opacity: .9; }
 174: .admin-nav ul { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
 175: .admin-nav-link { display: block; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
 176: .admin-nav-link:hover { color: #fff; background: rgba(255,255,255,.08); }
 177: .admin-nav-link.is-active { color: #fff; background: rgba(40,140,200,.22); border-left-color: var(--sun-500); }
 178: .admin-nav-logout { width: 100%; margin-top: 10px; color: #b9cde2; background: transparent; border: 0; cursor: pointer; font: inherit; text-align: left; }
 179: .admin-nav-logout:hover { color: #fff; background: rgba(255,255,255,.08); }
 180: .admin-sidebar-note { margin-top: auto; padding: 13px 10px 0; border-top: 1px solid rgba(219,234,250,.16); }
 181: .admin-sidebar-note .eyebrow { color: var(--sun-500); font-size: .62rem; }
 182: .admin-sidebar-note p { margin: 7px 0 0; color: #9eb6cf; font-size: .66rem; line-height: 1.5; }
 183: .admin-workspace { min-width: 0; }
 184: .admin-topbar { display: flex; align-items: center; justify-content: space-between; gap: 18px; min-height: 78px; padding: 15px clamp(18px, 4vw, 44px); background: var(--surface); border-bottom: 1px solid var(--line); }
 185: .admin-topbar strong { display: block; margin-top: 3px; color: var(--sea-950); font-size: 1.05rem; font-weight: 600; }
 186: .admin-top-actions { display: flex; align-items: center; gap: 10px; }
 187: .role-chip { display: inline-flex; align-items: center; min-height: 30px; padding: 5px 9px; color: var(--land-900); background: var(--shore-200); border: 1px solid var(--shore-300); border-radius: 999px; font-size: .66rem; font-weight: 600; }
 188: .admin-main { width: min(calc(100% - 40px), 1440px); margin: 0 auto; padding: 30px 0 70px; }
 189: .admin-page-hero { display: flex; align-items: end; justify-content: space-between; gap: 25px; padding: 8px 0 28px; border-bottom: 1px solid var(--line); }
 190: .admin-page-hero h1 { font-size: clamp(2rem, 4vw, 4.2rem); }
 191: .admin-page-hero .lede { margin: 14px 0 0; font-size: .95rem; }
 192: .admin-page-hero-aside { max-width: 320px; padding: 13px 0 0 18px; border-left: 3px solid var(--sun-500); }
 193: .admin-page-hero-aside strong { color: var(--land-900); font-size: .82rem; font-weight: 600; }
 194: .admin-page-hero-aside p { margin: 6px 0 0; color: var(--ink-600); font-size: .72rem; }
 195: .admin-stack { display: grid; gap: 18px; padding-top: 20px; }
 196: .admin-kpi-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
 197: .admin-kpi-grid .stat-card { min-height: 108px; }
 198: .admin-kpi-grid .stat-value { font-size: clamp(1.3rem, 3vw, 2.2rem); }
 199: .admin-grid-2 { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr); gap: 18px; align-items: start; }
 200: .admin-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; align-items: start; }
 201: .admin-section-title { display: flex; justify-content: space-between; gap: 14px; align-items: start; margin-bottom: 15px; }
 202: .admin-section-title h2 { font-size: clamp(1.25rem, 2.5vw, 1.9rem); }
 203: .admin-section-title p { margin: 6px 0 0; color: var(--ink-600); font-size: .75rem; }
 204: .admin-section-title .eyebrow { display: block; margin-bottom: 5px; }
 205: .admin-live-dot { display: inline-flex; align-items: center; gap: 6px; color: var(--land-900); font-size: .68rem; font-weight: 600; white-space: nowrap; }
 206: .admin-live-dot::before { width: 8px; height: 8px; content: ""; background: var(--land-500); border-radius: 50%; box-shadow: 0 0 0 4px rgba(83,138,131,.16); }
 207: .admin-table .data-table { min-width: 720px; }
 208: .admin-table--compact .data-table { min-width: 520px; }
 209: .admin-table .data-table td, .admin-table .data-table th { padding: 9px 10px; font-size: .7rem; }
 210: .admin-table .data-table td small { display: block; margin-top: 3px; color: var(--ink-500); font-size: .64rem; }
 211: .admin-feed-row-new { animation: admin-row-in 380ms var(--ease-out); }
 212: @keyframes admin-row-in { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }
 213: .admin-status-ok { color: var(--land-900); background: var(--shore-200); }
 214: .admin-status-warn { color: #765a00; background: #fff3b1; }
 215: .admin-status-danger { color: #8e2b10; background: #ffd9cd; }
 216: .admin-status-muted { color: var(--ink-600); background: var(--surface-muted); }
 217: .admin-chip { display: inline-flex; align-items: center; min-height: 25px; padding: 4px 8px; border-radius: 999px; font-size: .62rem; font-weight: 600; line-height: 1.2; }
 218: .protocol-chip { color: var(--sea-900); background: #e8eefc; border: 1px solid #cbd7f4; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: .6rem; }
 219: .admin-form-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 13px; }
 220: .admin-form-grid .field-group--wide { grid-column: span 2; }
 221: .admin-form-actions { display: flex; flex-wrap: wrap; align-items: end; gap: 8px; grid-column: 1 / -1; padding-top: 4px; }
 222: .admin-form-note { margin: 11px 0 0; color: var(--ink-600); font-size: .72rem; }
 223: .admin-form-message { margin: 11px 0 0; padding: 10px 12px; background: var(--shore-100); border-left: 3px solid var(--sun-500); color: var(--ink-800); font-size: .73rem; }
 224: .admin-form-message.is-danger { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 225: .admin-check-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px; }
 226: .admin-check-grid label { display: flex; align-items: flex-start; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
 227: .admin-check-grid input { margin-top: 2px; accent-color: var(--sea-800); }
 228: .admin-rule-list { display: grid; gap: 8px; }
 229: .admin-rule { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; padding: 11px 12px; border: 1px solid var(--line); }
 230: .admin-rule strong { display: block; color: var(--sea-900); font-size: .76rem; }
 231: .admin-rule p { margin: 4px 0 0; color: var(--ink-600); font-size: .68rem; }
 232: .admin-rule input { width: 18px; height: 18px; accent-color: var(--land-700); }
 233: .admin-switch { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
 234: .admin-switch input { appearance: none; position: relative; width: 35px; height: 20px; margin: 0; border-radius: 999px; background: var(--line-strong); cursor: pointer; transition: background 160ms var(--ease-out); }
 235: .admin-switch input::after { position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; content: ""; background: var(--surface); border-radius: 50%; transition: transform 160ms var(--ease-out); }
 236: .admin-switch input:checked { background: var(--land-700); }
 237: .admin-switch input:checked::after { transform: translateX(15px); }
 238: .admin-filter-row { display: flex; flex-wrap: wrap; align-items: end; gap: 10px; margin-bottom: 16px; padding: 13px; background: var(--surface-muted); border: 1px solid var(--line); }
 239: .admin-filter-row .field-group { min-width: 150px; flex: 1 1 150px; }
 240: .admin-filter-row .button { flex: 0 0 auto; }
 241: .admin-inline-actions { display: flex; flex-wrap: wrap; gap: 5px; }
 242: .admin-inline-actions .button { min-height: 31px; padding: 5px 8px; font-size: .63rem; }
 243: .admin-inline-edit { display: grid; grid-template-columns: 120px auto; gap: 5px; align-items: center; }
 244: .admin-inline-edit input { min-height: 31px; width: 120px; padding: 4px 6px; font-size: .68rem; }
 245: .admin-danger-note { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 246: .admin-login-page { display: grid; min-height: 100vh; place-items: center; padding: 24px; background: radial-gradient(circle at 85% 12%, rgba(40,140,200,.15), transparent 28%), var(--surface-muted); }
 247: .admin-login-card { width: min(100%, 500px); padding: clamp(23px, 5vw, 42px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-md); }
 248: .admin-login-card h1 { margin-top: 16px; font-size: clamp(2rem, 5vw, 3.7rem); }
 249: .admin-login-card .lede { margin: 10px 0 24px; font-size: .85rem; }
 250: .admin-login-brand { display: flex; align-items: center; gap: 11px; color: var(--sea-950); text-decoration: none; }
 251: .admin-login-brand .brand-mark { color: var(--sea-900); }
 252: .admin-login-brand strong { font-size: .91rem; font-weight: 600; }
 253: .admin-login-brand small { display: block; margin-top: 4px; color: var(--ink-600); font-size: .65rem; letter-spacing: .08em; text-transform: uppercase; }
 254: .login-stage[hidden], .admin-page[hidden] { display: none; }
 255: .totp-panel { margin: 16px 0; padding: 13px; background: var(--shore-100); border: 1px solid var(--shore-300); }
 256: .totp-panel p { margin: 0; color: var(--land-900); font-size: .72rem; }
 257: .totp-code { display: block; margin-top: 6px; color: var(--sea-950); font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 1.4rem; font-weight: 600; letter-spacing: .14em; }
 258: .totp-progress { height: 5px; margin-top: 10px; overflow: hidden; background: var(--surface); }
 259: .totp-progress span { display: block; height: 100%; background: var(--land-500); transform-origin: left; }
 260: .login-help { margin: 19px 0 0; color: var(--ink-500); font-size: .67rem; }
 261: .admin-refusal { margin-top: 20px; }
 262: .admin-refusal h1 { margin: 8px 0; font-size: 2.3rem; }
 263: .admin-refusal p { max-width: 52ch; color: var(--ink-600); font-size: .82rem; }
 264: .admin-toast-region { position: fixed; right: 20px; bottom: 20px; z-index: 1000; display: grid; gap: 8px; width: min(360px, calc(100vw - 40px)); }
 265: .admin-toast { padding: 12px 14px; color: var(--ink-800); background: var(--surface); border: 1px solid var(--line); border-left: 3px solid var(--land-700); box-shadow: var(--shadow-md); font-size: .72rem; animation: admin-toast-in 260ms var(--ease-out); }
 266: .admin-toast--error { border-left-color: var(--poor); }
 267: @keyframes admin-toast-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
 268: .banner-preview { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 11px 13px; color: var(--ink-800); background: var(--shore-100); border-left: 3px solid var(--sun-500); font-size: .73rem; }
 269: .sla-countdown { white-space: nowrap; }
 270: .sla-countdown.is-late { color: #a13e00; }
 271: .sla-countdown.is-ok { color: var(--land-900); }
 272: .portal-banner-region { width: min(calc(100% - 40px), var(--content-max)); margin: 16px auto -10px; }
 273: .portal-banner { display: flex; align-items: center; justify-content: space-between; gap: 14px; }
 274: .portal-banner .button { flex: 0 0 auto; }
 275: @media (max-width: 1100px) { .admin-layout { grid-template-columns: 220px minmax(0, 1fr); } .admin-grid-2, .admin-grid-3 { grid-template-columns: 1fr; } .admin-form-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
 276: @media (max-width: 760px) { .admin-layout { display: block; } .admin-sidebar { position: static; min-height: 0; padding: 16px; } .admin-sidebar-note { display: none; } .admin-nav { overflow-x: auto; margin-top: 14px; } .admin-nav ul { display: flex; width: max-content; } .admin-nav-link { border-left: 0; border-bottom: 3px solid transparent; white-space: nowrap; } .admin-nav-link.is-active { border-bottom-color: var(--sun-500); } .admin-main { width: min(calc(100% - 28px), 1440px); padding-top: 20px; } .admin-topbar { min-height: 66px; padding: 12px 14px; } .admin-kpi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .admin-page-hero { display: block; } .admin-page-hero-aside { max-width: none; margin-top: 18px; padding: 13px 0 0; border-top: 3px solid var(--sun-500); border-left: 0; } .admin-form-grid { grid-template-columns: 1fr; } .admin-form-grid .field-group--wide { grid-column: auto; } .admin-check-grid { grid-template-columns: 1fr; } .admin-login-page { padding: 14px; } .portal-banner-region { width: min(calc(100% - 28px), var(--content-max)); } }

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command 'foreach($f in @('"'demo/index.html','demo/pages/oro.html','demo/pages/gyvoji_gamta.html','demo/pages/truksmas.html','demo/pages/ataskaitos.html','demo/pages/admin/index.html')) { Write-Output \"--- "'$f ---"; Get-Content -Raw $f }' in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 122ms:
--- demo/index.html ---
<!doctype html>
<html lang="lt">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Klaipėdos miesto savivaldybės aplinkos monitoringo informacinės sistemos demonstracinis portalas.">
  <link rel="icon" href="data:,">
  <title>KMS AMIS | Klaipėdos aplinkos monitoringas</title>
  <link rel="stylesheet" href="css/theme.css">
  <link rel="stylesheet" href="css/sections.css">
</head>
<body>
  <a class="skip-link" href="#turinys">Pereiti prie turinio</a>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand-lockup" href="index.html" aria-label="KMS AMIS pagrindinis puslapis">
        <span class="brand-mark" aria-hidden="true">KMS</span>
        <span>
          <strong>Klaipėdos miesto savivaldybės aplinkos monitoringo informacinė sistema</strong>
          <small>KMS AMIS · viešasis portalas</small>
        </span>
      </a>
      <nav class="main-nav" aria-label="Pagrindinis meniu"><ul>
        <li><details><summary>KMS AMIS</summary><ul><li><a href="pages/bendra-info.html">Bendra informacija</a></li><li><a href="pages/vadovas.html">Naudotojo vadovas</a></li></ul></details></li>
        <li><details><summary>Klaipėdos miesto savivaldybės aplinkos monitoringas</summary><ul>
          <li class="nav-group-label">Aplinkos oro monitoringas</li><li><a href="pages/oro.html">Automatinių stotelių duomenys</a></li><li><a href="pages/oro.html#laboratoriniai">Monitoringo (laboratoriniai) duomenys</a></li><li><a href="pages/truksmas.html">Aplinkos triukšmo monitoringas</a></li><li><a href="pages/dirvezemis.html">Dirvožemio monitoringas</a></li><li><a href="pages/vanduo.html">Paviršinio vandens monitoringas</a></li>
          <li class="nav-group-label">Gyvosios gamtos monitoringas</li><li><a href="pages/gyvoji_gamta.html">Gyvosios gamtos monitoringas</a></li><li><a href="pages/gyvoji_gamta.html#augalija">Augalijos monitoringas</a></li><li><a href="pages/gyvoji_gamta.html#invazines">Invazinių rūšių monitoringas</a></li><li><a href="pages/gyvoji_gamta.html#pauksciai">Paukščių monitoringas</a></li><li><a href="pages/gyvoji_gamta.html#varniniai">Varninių paukščių monitoringas</a></li><li><a href="pages/gyvoji_gamta.html#siksnosparniai">Šikšnosparnių monitoringas</a></li><li><a href="pages/gyvoji_gamta.html#varliagyviai">Varliagyvių ir roplių monitoringas</a></li><li><a href="pages/gyvoji_gamta.html#zuvys">Žuvų monitoringas</a></li><li><a href="pages/zeldynai.html">Želdynų ir želdinių monitoringas</a></li>
        </ul></details></li>
        <li><a href="pages/ataskaitos.html">Monitoringo metinės ataskaitos</a></li><li><a href="pages/prenumerata.html">Automatinių pranešimų prenumerata</a></li><li><a href="pages/zemelapis.html">Interaktyvus žemėlapis</a></li>
      </ul></nav>
    </div>
    <div class="brand-stripe" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div>
  </header>

  <div id="portal-banner" class="portal-banner-region" aria-live="polite"></div>
  <main id="turinys" class="page-shell">
    <section class="hero" aria-labelledby="pagrindinis-pavadinimas">
      <div class="hero-copy">
        <p class="section-kicker">Aplinkos būklė vienoje vietoje</p>
        <h1 id="pagrindinis-pavadinimas">Klaipėdos aplinka, matoma aiškiai.</h1>
        <p class="lede">KMS AMIS kaupia aplinkos monitoringo ir meteorologinius duomenis, kad miesto gyventojai, specialistai ir sprendimų priėmėjai galėtų greitai suprasti, kas vyksta mieste.</p>
        <a class="button button--primary" href="pages/zemelapis.html">Atverti interaktyvų žemėlapį <span aria-hidden="true">→</span></a>
      </div>
      <aside class="hero-aside" id="bendra-informacija">
        <strong>Viešas, duomenimis grįstas miesto vaizdas</strong>
        <p>Rodomi demonstraciniai duomenys atnaujinami vienodu, atkuriamu laiko modeliu. Vėlesniuose etapuose čia atsiras analizė, ataskaitos ir specialistų darbo aplinka.</p>
      </aside>
    </section>

    <div class="grid-home">
      <section class="panel card-pad" aria-labelledby="orai-title">
        <div class="card-heading">
          <div><span class="eyebrow">Meteorologinė informacija</span><h2 id="orai-title">Miesto oro sąlygų vidurkis</h2><p>Automatinių stotelių matavimų suvestinė.</p></div>
        </div>
        <div class="weather-strip" id="weather-strip" aria-live="polite"></div>
        <p class="update-note" id="weather-updated">Duomenys skaičiuojami…</p>
        <div class="brand-stripe brand-stripe--compact" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div>
      </section>

      <section class="panel card-pad" aria-labelledby="aqi-title">
        <div class="card-heading"><div><span class="eyebrow">Europos oro kokybės indeksas</span><h2 id="aqi-title">Šiandien mieste</h2></div><span class="status-chip" id="aqi-chip">Skaičiuojama</span></div>
        <div class="aqi-layout">
          <div class="aqi-score" id="aqi-score"><div><strong>–</strong><span>indeksas</span></div></div>
          <div class="aqi-copy"><h3 id="aqi-label">Vertinama</h3><p id="aqi-description">Indeksas apskaičiuojamas iš pagrindinių oro kokybės parametrų.</p></div>
        </div>
        <div class="aqi-scale" aria-label="Oro kokybės skalė"><span class="good"></span><span class="fair"></span><span class="moderate"></span><span class="poor"></span><span class="very-poor"></span><span class="extremely-poor"></span></div>
        <div class="legend-labels"><span>Gera</span><span>Ypač prasta</span></div>
        <p class="update-note"><a href="pages/zemelapis.html">Peržiūrėti pagal taškus žemėlapyje →</a></p>
      </section>

      <section class="panel map-preview" aria-labelledby="preview-title">
        <div class="map-preview-content">
          <div class="map-preview-label"><span aria-hidden="true"></span><span id="preview-title">Interaktyvus žemėlapis</span></div>
          <p class="lede" style="max-width: 30ch; margin-top: 42px; color: var(--ink-800); font-size: .9rem;">Stotelės, IoT taškai ir mikrorajonų spalvinė suvestinė.</p>
          <a class="button button--secondary button--small map-preview-link" href="pages/zemelapis.html">Atverti žemėlapį</a>
        </div>
      </section>
    </div>

    <section class="section-intro" id="monitoringas" aria-labelledby="monitoringas-title">
      <div><p class="section-kicker">Monitoringo dalys</p><h2 id="monitoringas-title">Duomenų sritys, kurias galėsite tyrinėti</h2></div>
      <p>Pasirinkite sritį ir pereikite į jos žemėlapį. Analizės bei ataskaitų funkcijos bus papildytos antrajame etape.</p>
    </section>
    <div class="monitoring-grid">
      <a class="monitoring-link" href="pages/oro.html"><strong>Aplinkos oro monitoringas</strong><span>Automatinės stotelės · laboratoriniai duomenys</span></a>
      <a class="monitoring-link" href="pages/truksmas.html"><strong>Aplinkos triukšmas</strong><span>Septyni rodikliai · logaritminis vidurkis</span></a>
      <a class="monitoring-link" href="pages/dirvezemis.html"><strong>Dirvožemis</strong><span>Metalai · naftos produktai · periodiniai mėginiai</span></a>
      <a class="monitoring-link" href="pages/vanduo.html"><strong>Paviršinis vanduo</strong><span>Maistinės medžiagos · biologija</span></a>
      <a class="monitoring-link" href="pages/gyvoji_gamta.html"><strong>Gyvoji gamta</strong><span>Septynios potemės · rūšių skaičius ir gausumas</span></a>
      <a class="monitoring-link" href="pages/zeldynai.html"><strong>Želdynai ir želdiniai</strong><span>Būklės balai · mechaniniai pažeidimai</span></a>
      <a class="monitoring-link" id="ataskaitos" href="pages/ataskaitos.html"><strong>Metinės ataskaitos</strong><span>2022–2025 · spausdinama suvestinė</span></a>
      <a class="monitoring-link" id="prenumerata" href="pages/prenumerata.html"><strong>Automatinių pranešimų prenumerata</strong><span>Pasirinkite rajoną ir parametrus</span></a>
    </div>

    <section class="section-intro" id="naudotojo-vadovas" aria-labelledby="vadovas-title">
      <div><p class="section-kicker">Pagalba</p><h2 id="vadovas-title">Naudotojo vadovas</h2></div>
      <p>Žingsnis po žingsnio paaiškinta, kaip naudotis žemėlapiu, filtrais, analize ir pranešimų prenumerata. <a href="pages/vadovas.html">Atverti vadovą →</a></p>
    </section>
  </main>

  <footer class="site-footer">
    <div class="site-footer-inner">
      <div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Demonstracinė fazės 1 versija. Normų reikšmės, ribos ir mikrorajonų geometrija yra parinktos demonstracijai ir turi būti patvirtintos prieš diegimą.</p></div>
      <nav class="footer-links" aria-label="Poraštės nuorodos"><a href="pages/admin/index.html">Valdymo pultas (demonstracija)</a><a href="pages/privatumo-politika.html">Privatumo politika</a><a href="pages/slapuku-politika.html">Slapukų politika</a><a href="pages/vadovas.html">Naudotojo vadovas</a><a href="pages/zemelapis.html">Žemėlapis</a></nav>
    </div>
  </footer>
  <script type="module" src="js/pages/home.js"></script>
</body>
</html>


--- demo/pages/oro.html ---
<!doctype html>
<html lang="lt">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Klaipėdos aplinkos oro monitoringo analizė.">
  <link rel="icon" href="data:"><link rel="stylesheet" href="../css/theme.css"><link rel="stylesheet" href="../css/sections.css">
  <title>Aplinkos oro monitoringas | KMS AMIS</title>
</head>
<body>
  <a class="skip-link" href="#turinys">Pereiti prie turinio</a>
  <header class="site-header"><div class="header-inner">
    <a class="brand-lockup" href="../index.html" aria-label="KMS AMIS pagrindinis puslapis"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>Klaipėdos miesto savivaldybės aplinkos monitoringo informacinė sistema</strong><small>KMS AMIS · viešasis portalas</small></span></a>
    <nav class="main-nav" aria-label="Pagrindinis meniu"><ul>
      <li><details><summary>KMS AMIS</summary><ul><li><a href="bendra-info.html">Bendra informacija</a></li><li><a href="vadovas.html">Naudotojo vadovas</a></li></ul></details></li>
      <li><details><summary>Klaipėdos miesto savivaldybės aplinkos monitoringas</summary><ul>
        <li class="nav-group-label">Aplinkos oro monitoringas</li><li><a href="oro.html" aria-current="page">Automatinių stotelių duomenys</a></li><li><a href="oro.html#laboratoriniai">Monitoringo (laboratoriniai) duomenys</a></li>
        <li><a href="truksmas.html">Aplinkos triukšmo monitoringas</a></li><li><a href="dirvezemis.html">Dirvožemio monitoringas</a></li><li><a href="vanduo.html">Paviršinio vandens monitoringas</a></li>
        <li class="nav-group-label">Gyvosios gamtos monitoringas</li><li><a href="gyvoji_gamta.html">Gyvosios gamtos monitoringas</a></li><li><a href="gyvoji_gamta.html#augalija">Augalijos monitoringas</a></li><li><a href="gyvoji_gamta.html#invazines">Invazinių rūšių monitoringas</a></li><li><a href="gyvoji_gamta.html#pauksciai">Paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#varniniai">Varninių paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#siksnosparniai">Šikšnosparnių monitoringas</a></li><li><a href="gyvoji_gamta.html#varliagyviai">Varliagyvių ir roplių monitoringas</a></li><li><a href="gyvoji_gamta.html#zuvys">Žuvų monitoringas</a></li>
        <li><a href="zeldynai.html">Želdynų ir želdinių monitoringas</a></li>
      </ul></details></li>
      <li><a href="ataskaitos.html">Monitoringo metinės ataskaitos</a></li><li><a href="prenumerata.html">Automatinių pranešimų prenumerata</a></li><li><a href="zemelapis.html">Interaktyvus žemėlapis</a></li>
    </ul></nav>
  </div><div class="brand-stripe" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div></header>

  <main id="turinys" class="page-shell">
    <section class="page-hero"><div><p class="section-kicker">3.6.1–3.6.3 · aplinkos oro analizė</p><h1>Aplinkos oro monitoringas</h1><p class="lede">Peržiūrėkite automatinių stotelių ir laboratorinių mėginių duomenis: pasirinkite laikotarpį, parametrą ir taškus, o rezultatus palyginkite grafikuose.</p><div class="page-actions"><a class="button button--primary" href="zemelapis.html?section=automatic-air">Atverti žemėlapyje →</a><a class="button button--secondary" href="ataskaitos.html">Metinės ataskaitos</a></div></div><aside class="page-hero-aside"><strong>Duomenys iki <span data-demo-date>2026 m. spalio 1 d.</span></strong><p>Spalvos ir normos yra demonstracinės. Viršijimas grafike pažymimas oranžine spalva, kad būtų atskirtas nuo įprastos reikšmės.</p></aside></section>
    <div class="analysis-tabs" role="tablist" aria-label="Aplinkos oro monitoringo duomenų tipas"><button class="analysis-tab" id="tab-automatic-air" type="button" role="tab" aria-selected="true" aria-controls="panel-automatic-air" data-analysis-tab="automatic-air">Automatinių aplinkos oro kokybės stebėjimo stotelių duomenys</button><button class="analysis-tab" id="tab-laboratory-air" type="button" role="tab" aria-selected="false" aria-controls="panel-laboratory-air" data-analysis-tab="laboratory-air">Monitoringo (laboratoriniai) duomenys</button></div>
    <div class="content-stack">
      <section class="analysis-panel surface surface-pad" data-analysis-panel="automatic-air" id="panel-automatic-air" role="tabpanel" aria-labelledby="tab-automatic-air" tabindex="0" data-analysis-section="automatic-air" data-default-period="90d"><div class="section-heading"><div><span class="eyebrow">Automatiniai ir istoriniai įrašai</span><h2>Stotelių duomenų analizė</h2><p>Filtrai taikomi laikotarpiui, mikrorajonui, adresui, monitoringo taškui ir parametrui pagal 3.6.1.</p></div><span class="status-chip" data-role="status" role="status">Ruošiama…</span></div>
        <div class="analysis-filter-grid">
          <div class="field-group"><label class="field-label" for="air-period">Laikotarpis</label><select class="select-field" id="air-period" data-field="period"><option value="30d">30 dienų</option><option value="90d">90 dienų</option><option value="365d">12 mėnesių</option><option value="730d">24 mėnesiai</option></select></div>
          <div class="field-group"><label class="field-label" for="air-type">Duomenų tipas</label><select class="select-field" id="air-type" data-field="type"><option value="all">Automatiniai ir istoriniai</option><option value="automatic">Automatiniai</option><option value="historical">Istoriniai</option></select></div>
          <div class="field-group"><label class="field-label" for="air-district">Mikrorajonas</label><select class="select-field" id="air-district" data-field="district"></select></div>
          <div class="field-group"><label class="field-label" for="air-address">Adresas</label><select class="select-field" id="air-address" data-field="address"></select></div>
          <div class="field-group"><label class="field-label" for="air-part">Monitoringo dalis</label><select class="select-field" id="air-part" data-field="part"></select></div>
          <div class="field-group"><label class="field-label" for="air-code">Taško kodas / pavadinimas</label><input id="air-code" data-field="code" type="search" placeholder="pvz., KA-03 arba Šilutės"><p class="field-help">Galima įvesti visą arba dalį pavadinimo.</p></div>
          <div class="field-group field-group--wide"><label class="field-label" for="air-sites">Monitoringo taškai</label><select class="select-field" id="air-sites" data-field="sites" multiple aria-describedby="air-site-count"></select><p class="field-help" id="air-site-count" data-role="site-count">Taškai parenkami…</p></div>
          <div class="field-group"><label class="field-label" for="air-parameter">Stebimas parametras</label><select class="select-field" id="air-parameter" data-field="parameter"></select></div>
          <label class="checkline"><input type="checkbox" data-field="exceedances"> Rodyti tik viršijimų atvejus</label><div class="filter-actions"><button class="button button--primary" type="button" data-action="apply">Atnaujinti analizę</button></div>
        </div>
        <p class="analysis-message" data-role="norm"></p><div class="stats-grid" data-role="stats"></div>
        <div class="chart-grid"><section class="chart-panel"><h3>Laiko eilutė</h3><p>Pasirinkto parametro paros suvestinė. Virš ribinės normos esančios reikšmės paryškintos oranžine spalva.</p><div class="chart-wrap"><canvas data-chart="time" aria-label="Oro kokybės parametro laiko eilutės grafikas"></canvas></div><div class="chart-legend"><span class="legend-key">Taškų reikšmės</span><span class="legend-key legend-key--limit">Ribinė norma</span></div></section><section class="chart-panel"><h3>Taškų palyginimas</h3><p>Pasirinktų monitoringo vietų vidurkiai viename grafike pagal 3.6.3.1.</p><div class="chart-wrap chart-wrap--short"><canvas data-chart="compare" aria-label="Monitoringo taškų palyginimo diagrama"></canvas></div></section></div>
        <section class="chart-panel" style="margin-top:18px"><h3>Koreliacija: vėjo greitis ir oro kokybė</h3><div class="correlation-copy"><strong class="correlation-r" data-role="pearson">r = –</strong><p>Pirsono koeficientas apskaičiuojamas iš sutampančių paros įrašų. <span data-role="correlation-explain">Ruošiama…</span> Koreliacija neįrodo priežastinio ryšio.</p></div><div class="chart-wrap chart-wrap--short"><canvas data-chart="correlation" aria-label="Vėjo greičio ir oro kokybės sklaidos diagrama"></canvas></div></section>
        <div class="data-table-wrap" style="margin-top:18px" data-role="station-table"></div>
      </section>

      <section class="analysis-panel surface surface-pad" data-analysis-panel="laboratory-air" id="panel-laboratory-air" role="tabpanel" aria-labelledby="tab-laboratory-air" tabindex="0" data-analysis-section="laboratory-air" data-default-period="730d" hidden><div class="section-heading"><div><span class="eyebrow">Periodiniai mėginiai · istoriniai duomenys</span><h2>Laboratorinių duomenų analizė</h2><p>Laboratorinių mėginių dažnis yra retesnis, todėl rekomenduojame rinktis 12–24 mėnesių laikotarpį.</p></div><span class="status-chip" data-role="status" role="status">Ruošiama…</span></div>
        <div class="analysis-filter-grid"><div class="field-group"><label class="field-label" for="lab-period">Laikotarpis</label><select class="select-field" id="lab-period" data-field="period"><option value="365d">12 mėnesių</option><option value="730d">24 mėnesiai</option></select></div><div class="field-group"><label class="field-label" for="lab-type">Duomenų tipas</label><select class="select-field" id="lab-type" data-field="type"><option value="historical">Istoriniai / laboratoriniai</option><option value="all">Visi prieinami</option></select></div><div class="field-group"><label class="field-label" for="lab-district">Mikrorajonas</label><select class="select-field" id="lab-district" data-field="district"></select></div><div class="field-group"><label class="field-label" for="lab-address">Adresas</label><select class="select-field" id="lab-address" data-field="address"></select></div><div class="field-group"><label class="field-label" for="lab-part">Monitoringo dalis</label><select class="select-field" id="lab-part" data-field="part"></select></div><div class="field-group"><label class="field-label" for="lab-code">Taško kodas / pavadinimas</label><input id="lab-code" data-field="code" type="search" placeholder="pvz., KA-03"></div><div class="field-group field-group--wide"><label class="field-label" for="lab-sites">Monitoringo taškai</label><select class="select-field" id="lab-sites" data-field="sites" multiple aria-describedby="lab-site-count"></select><p class="field-help" id="lab-site-count" data-role="site-count"></p></div><div class="field-group"><label class="field-label" for="lab-parameter">Stebimas parametras</label><select class="select-field" id="lab-parameter" data-field="parameter"></select></div><label class="checkline"><input type="checkbox" data-field="exceedances"> Rodyti tik viršijimų atvejus</label><div class="filter-actions"><button class="button button--primary" type="button" data-action="apply">Atnaujinti analizę</button></div></div>
        <p class="analysis-message" data-role="norm"></p><div class="stats-grid" data-role="stats"></div><div class="chart-grid"><section class="chart-panel"><h3>Laboratorinių mėginių laiko eilutė</h3><p>Retesni mėginiai rodomi kaip atskiri paros įrašai.</p><div class="chart-wrap"><canvas data-chart="time" aria-label="Laboratorinių oro mėginių grafikas"></canvas></div></section><section class="chart-panel"><h3>Taškų palyginimas</h3><div class="chart-wrap chart-wrap--short"><canvas data-chart="compare" aria-label="Laboratorinių oro taškų palyginimo diagrama"></canvas></div></section></div><section class="chart-panel" style="margin-top:18px"><h3>Koreliacija: vėjo greitis ir laboratorinis rodiklis</h3><div class="correlation-copy"><strong class="correlation-r" data-role="pearson">r = –</strong><p><span data-role="correlation-explain">Ruošiama…</span> Naudojami sutampantys laboratorinių ir meteorologinių matavimų laikai.</p></div><div class="chart-wrap chart-wrap--short"><canvas data-chart="correlation" aria-label="Laboratorinio rodiklio ir vėjo greičio sklaidos diagrama"></canvas></div></section><div class="data-table-wrap" style="margin-top:18px" data-role="station-table"></div>
      </section>
    </div>
  </main>
  <footer class="site-footer"><div class="site-footer-inner"><div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Demonstraciniai duomenys, normos ir geometrija nėra teisinė išvada. Prieš diegimą reikšmes ir sluoksnius turi patvirtinti Skyrius.</p></div><nav class="footer-links" aria-label="Poraštės nuorodos"><a href="admin/index.html">Valdymo pultas (demonstracija)</a><a href="privatumo-politika.html">Privatumo politika</a><a href="slapuku-politika.html">Slapukų politika</a><a href="vadovas.html">Naudotojo vadovas</a><a href="zemelapis.html">Žemėlapis</a></nav></div></footer>
  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script><script type="module">import { initAirTabs, initAnalysisPanel, setAnalysisDateBounds } from "../js/pages/analysis.js"; initAirTabs(); document.querySelectorAll("[data-analysis-section]").forEach(initAnalysisPanel); setAnalysisDateBounds();</script>
</body></html>


--- demo/pages/gyvoji_gamta.html ---
<!doctype html>
<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Klaipėdos gyvosios gamtos monitoringo analizė."><link rel="icon" href="data:"><link rel="stylesheet" href="../css/theme.css"><link rel="stylesheet" href="../css/sections.css"><title>Gyvosios gamtos monitoringas | KMS AMIS</title></head>
<body><a class="skip-link" href="#turinys">Pereiti prie turinio</a><header class="site-header"><div class="header-inner"><a class="brand-lockup" href="../index.html" aria-label="KMS AMIS pagrindinis puslapis"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>Klaipėdos miesto savivaldybės aplinkos monitoringo informacinė sistema</strong><small>KMS AMIS · viešasis portalas</small></span></a><nav class="main-nav" aria-label="Pagrindinis meniu"><ul><li><details><summary>KMS AMIS</summary><ul><li><a href="bendra-info.html">Bendra informacija</a></li><li><a href="vadovas.html">Naudotojo vadovas</a></li></ul></details></li><li><details><summary>Klaipėdos miesto savivaldybės aplinkos monitoringas</summary><ul><li class="nav-group-label">Aplinkos oro monitoringas</li><li><a href="oro.html">Automatinių stotelių duomenys</a></li><li><a href="oro.html#laboratoriniai">Monitoringo (laboratoriniai) duomenys</a></li><li><a href="truksmas.html">Aplinkos triukšmo monitoringas</a></li><li><a href="dirvezemis.html">Dirvožemio monitoringas</a></li><li><a href="vanduo.html">Paviršinio vandens monitoringas</a></li><li class="nav-group-label">Gyvosios gamtos monitoringas</li><li><a href="gyvoji_gamta.html" aria-current="page">Gyvosios gamtos monitoringas</a></li><li><a href="#augalija">Augalijos monitoringas</a></li><li><a href="#invazines">Invazinių rūšių monitoringas</a></li><li><a href="#pauksciai">Paukščių monitoringas</a></li><li><a href="#varniniai">Varninių paukščių monitoringas</a></li><li><a href="#siksnosparniai">Šikšnosparnių monitoringas</a></li><li><a href="#varliagyviai">Varliagyvių ir roplių monitoringas</a></li><li><a href="#zuvys">Žuvų monitoringas</a></li><li><a href="zeldynai.html">Želdynų ir želdinių monitoringas</a></li></ul></details></li><li><a href="ataskaitos.html">Monitoringo metinės ataskaitos</a></li><li><a href="prenumerata.html">Automatinių pranešimų prenumerata</a></li><li><a href="zemelapis.html">Interaktyvus žemėlapis</a></li></ul></nav></div><div class="brand-stripe" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div></header>
<main id="turinys" class="page-shell"><section class="page-hero"><div><p class="section-kicker">3.10.1.1.2.5 · gyvosios gamtos dalys</p><h1>Gyvosios gamtos monitoringas</h1><p class="lede">Vienoje vietoje palyginkite augalijos, invazinių rūšių, paukščių, šikšnosparnių, varliagyvių, roplių ir žuvų stebėjimų rodiklius.</p><div class="page-actions"><a class="button button--primary" href="zemelapis.html?section=wildlife">Atverti taškus žemėlapyje →</a><a class="button button--secondary" href="ataskaitos.html">Metinė ataskaita</a></div></div><aside class="page-hero-aside"><strong>Rūšių skaičius + gausumas</strong><p>Metų diagrama rodo pasirinktų taškų vidurkį, o lentelė leidžia patikrinti kiekvieną tašką atskirai.</p></aside></section><div class="content-stack"><section class="surface surface-pad"><div class="section-heading"><div><span class="eyebrow">7 potemės · metiniai pjūviai</span><h2 id="wildlife-active-title">Augalijos monitoringas</h2><p id="wildlife-active-description">Rūšių skaičius ir augalijos padengimo / gausumo balai.</p></div><span class="status-chip" id="wildlife-status" role="status">Ruošiama…</span></div><div class="subsection-switcher" id="wildlife-tabs" role="tablist" aria-label="Gyvosios gamtos monitoringo potemės"></div><div id="wildlife-panel" role="tabpanel" tabindex="0"><div class="analysis-filter-grid" style="margin-bottom:18px"><div class="field-group field-group--wide"><label class="field-label" for="wildlife-sites">Stebėjimo taškai</label><select class="select-field" id="wildlife-sites" multiple aria-describedby="wildlife-sites-help"></select><p class="field-help" id="wildlife-sites-help">Pasirinkite vieną ar kelis taškus. Palyginimas grupuoja metus ir atskiria matavimo vienetus.</p></div></div><section class="chart-panel"><h3>Metų palyginimas</h3><div class="chart-wrap"><canvas id="wildlife-chart" aria-label="Gyvosios gamtos rodiklių grupuota metų diagrama"></canvas></div><p class="chart-caption">Kairė skalė – rūšių skaičius; dešinė skalė – gausumas arba padengimo balai.</p></section><div class="data-table-wrap" style="margin-top:18px" id="wildlife-table"></div></div></section><div class="notice"><strong>Periodiškumas.</strong><span>Gyvosios gamtos stebėjimai yra sezoniniai ir periodiniai. Trūkstami metai reiškia, kad tame taške tais metais nebuvo įrašo, o ne kad rūšis buvo nerasta.</span></div></div></main><footer class="site-footer"><div class="site-footer-inner"><div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Demonstraciniai biologiniai rodikliai pateikti sąsajos ir analizės funkcijoms pademonstruoti.</p></div><nav class="footer-links" aria-label="Poraštės nuorodos"><a href="admin/index.html">Valdymo pultas (demonstracija)</a><a href="privatumo-politika.html">Privatumo politika</a><a href="slapuku-politika.html">Slapukų politika</a><a href="vadovas.html">Naudotojo vadovas</a><a href="zemelapis.html">Žemėlapis</a></nav></div></footer><script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script><script type="module">import { initWildlife } from "../js/pages/wildlife.js"; initWildlife();</script></body></html>


--- demo/pages/truksmas.html ---
<!doctype html>
<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Klaipėdos aplinkos triukšmo monitoringo analizė."><link rel="icon" href="data:"><link rel="stylesheet" href="../css/theme.css"><link rel="stylesheet" href="../css/sections.css"><title>Aplinkos triukšmo monitoringas | KMS AMIS</title></head>
<body><a class="skip-link" href="#turinys">Pereiti prie turinio</a><header class="site-header"><div class="header-inner"><a class="brand-lockup" href="../index.html" aria-label="KMS AMIS pagrindinis puslapis"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>Klaipėdos miesto savivaldybės aplinkos monitoringo informacinė sistema</strong><small>KMS AMIS · viešasis portalas</small></span></a><nav class="main-nav" aria-label="Pagrindinis meniu"><ul><li><details><summary>KMS AMIS</summary><ul><li><a href="bendra-info.html">Bendra informacija</a></li><li><a href="vadovas.html">Naudotojo vadovas</a></li></ul></details></li><li><details><summary>Klaipėdos miesto savivaldybės aplinkos monitoringas</summary><ul><li class="nav-group-label">Aplinkos oro monitoringas</li><li><a href="oro.html">Automatinių stotelių duomenys</a></li><li><a href="oro.html#laboratoriniai">Monitoringo (laboratoriniai) duomenys</a></li><li><a href="truksmas.html" aria-current="page">Aplinkos triukšmo monitoringas</a></li><li><a href="dirvezemis.html">Dirvožemio monitoringas</a></li><li><a href="vanduo.html">Paviršinio vandens monitoringas</a></li><li class="nav-group-label">Gyvosios gamtos monitoringas</li><li><a href="gyvoji_gamta.html">Gyvosios gamtos monitoringas</a></li><li><a href="gyvoji_gamta.html#augalija">Augalijos monitoringas</a></li><li><a href="gyvoji_gamta.html#invazines">Invazinių rūšių monitoringas</a></li><li><a href="gyvoji_gamta.html#pauksciai">Paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#varniniai">Varninių paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#siksnosparniai">Šikšnosparnių monitoringas</a></li><li><a href="gyvoji_gamta.html#varliagyviai">Varliagyvių ir roplių monitoringas</a></li><li><a href="gyvoji_gamta.html#zuvys">Žuvų monitoringas</a></li><li><a href="zeldynai.html">Želdynų ir želdinių monitoringas</a></li></ul></details></li><li><a href="ataskaitos.html">Monitoringo metinės ataskaitos</a></li><li><a href="prenumerata.html">Automatinių pranešimų prenumerata</a></li><li><a href="zemelapis.html">Interaktyvus žemėlapis</a></li></ul></nav></div><div class="brand-stripe" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div></header>
<main id="turinys" class="page-shell"><section class="page-hero"><div><p class="section-kicker">3.6.1–3.6.3 · triukšmo rodikliai</p><h1>Aplinkos triukšmo monitoringas</h1><p class="lede">Palyginkite septynis triukšmo rodiklius pagal vietą ir laiką. Garso lygio vidurkis pateikiamas logaritmiškai, nes decibelai matuoja santykinę garso galią.</p><div class="page-actions"><a class="button button--primary" href="zemelapis.html?section=noise">Atverti žemėlapyje →</a><a class="button button--secondary" href="ataskaitos.html">Metinė ataskaita</a></div></div><aside class="page-hero-aside"><strong>Logaritminis vidurkis</strong><p>Naudojama formulė 10 × log₁₀ (vidurkis(10^(Lᵢ/10))). Taip keli garsūs įvykiai nėra paslepiami paprastu aritmetiniu vidurkiu.</p></aside></section><div class="content-stack"><section class="analysis-panel surface surface-pad" data-analysis-section="noise" data-default-period="730d"><div class="section-heading"><div><span class="eyebrow">7 rodikliai · dBA</span><h2>Triukšmo duomenų analizė</h2><p>Filtruokite pagal laikotarpį, tašką ir parametrą. Paros, savaitės, mėnesio ir metų suvestinės priklauso nuo pasirinkto laikotarpio.</p></div><span class="status-chip" data-role="status" role="status">Ruošiama…</span></div><div class="analysis-filter-grid"><div class="field-group"><label class="field-label" for="noise-period">Laikotarpis</label><select class="select-field" id="noise-period" data-field="period"><option value="365d">12 mėnesių</option><option value="730d">24 mėnesiai</option></select></div><div class="field-group"><label class="field-label" for="noise-type">Duomenų tipas</label><select class="select-field" id="noise-type" data-field="type"><option value="all">Automatiniai ir istoriniai</option><option value="historical">Periodiniai / istoriniai</option></select></div><div class="field-group"><label class="field-label" for="noise-district">Mikrorajonas</label><select class="select-field" id="noise-district" data-field="district"></select></div><div class="field-group"><label class="field-label" for="noise-address">Adresas</label><select class="select-field" id="noise-address" data-field="address"></select></div><div class="field-group"><label class="field-label" for="noise-part">Monitoringo dalis</label><select class="select-field" id="noise-part" data-field="part"></select></div><div class="field-group"><label class="field-label" for="noise-code">Taško kodas / pavadinimas</label><input id="noise-code" data-field="code" type="search" placeholder="pvz., KA-03"></div><div class="field-group field-group--wide"><label class="field-label" for="noise-sites">Monitoringo taškai</label><select class="select-field" id="noise-sites" data-field="sites" multiple aria-describedby="noise-site-count"></select><p class="field-help" id="noise-site-count" data-role="site-count"></p></div><div class="field-group"><label class="field-label" for="noise-parameter">Triukšmo parametras</label><select class="select-field" id="noise-parameter" data-field="parameter"></select></div><label class="checkline"><input type="checkbox" data-field="exceedances"> Rodyti tik viršijimų atvejus</label><div class="filter-actions"><button class="button button--primary" type="button" data-action="apply">Atnaujinti analizę</button></div></div><p class="analysis-message" data-role="norm"></p><div class="stats-grid" data-role="stats"></div><div class="notice"><strong>Kaip skaityti vidurkį?</strong><span>Decibelų skalė yra logaritminė: 10 dBA skirtumas reiškia maždaug dešimteriopą garso galios santykio pokytį. Todėl statistikoje rodomas logaritminis, o ne paprastas aritmetinis vidurkis.</span></div><div class="chart-grid"><section class="chart-panel"><h3>Triukšmo laiko eilutė</h3><p>Virš ribinės normos esančios reikšmės paryškintos oranžine spalva.</p><div class="chart-wrap"><canvas data-chart="time" aria-label="Triukšmo rodiklio laiko eilutės grafikas"></canvas></div></section><section class="chart-panel"><h3>Taškų palyginimas</h3><p>Stulpeliai rodo logaritminį vidurkį pagal tašką.</p><div class="chart-wrap chart-wrap--short"><canvas data-chart="compare" aria-label="Triukšmo taškų palyginimo grafikas"></canvas></div></section></div><section class="chart-panel" style="margin-top:18px"><h3>Koreliacija: vėjo greitis ir triukšmo rodiklis</h3><div class="correlation-copy"><strong class="correlation-r" data-role="pearson">r = –</strong><p><span data-role="correlation-explain">Ruošiama…</span> Tai statistinis ryšys, o ne priežasties įrodymas.</p></div><div class="chart-wrap chart-wrap--short"><canvas data-chart="correlation" aria-label="Vėjo greičio ir triukšmo sklaidos diagrama"></canvas></div></section><div class="data-table-wrap" style="margin-top:18px" data-role="station-table"></div></section></div></main><footer class="site-footer"><div class="site-footer-inner"><div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Demonstraciniai duomenys ir normos nėra teisinė išvada. Tikslinamos reikšmės turi būti patvirtintos prieš diegimą.</p></div><nav class="footer-links" aria-label="Poraštės nuorodos"><a href="admin/index.html">Valdymo pultas (demonstracija)</a><a href="privatumo-politika.html">Privatumo politika</a><a href="slapuku-politika.html">Slapukų politika</a><a href="vadovas.html">Naudotojo vadovas</a><a href="zemelapis.html">Žemėlapis</a></nav></div></footer><script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script><script type="module">import { initAnalysisPanel, setAnalysisDateBounds } from "../js/pages/analysis.js"; initAnalysisPanel(document.querySelector("[data-analysis-section]")); setAnalysisDateBounds();</script></body></html>


--- demo/pages/ataskaitos.html ---
<!doctype html>
<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="KMS AMIS monitoringo metinės ataskaitos."><link rel="icon" href="data:"><link rel="stylesheet" href="../css/theme.css"><link rel="stylesheet" href="../css/sections.css"><title>Monitoringo metinės ataskaitos | KMS AMIS</title></head>
<body><a class="skip-link" href="#turinys">Pereiti prie turinio</a><header class="site-header"><div class="header-inner"><a class="brand-lockup" href="../index.html" aria-label="KMS AMIS pagrindinis puslapis"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>Klaipėdos miesto savivaldybės aplinkos monitoringo informacinė sistema</strong><small>KMS AMIS · viešasis portalas</small></span></a><nav class="main-nav" aria-label="Pagrindinis meniu"><ul><li><details><summary>KMS AMIS</summary><ul><li><a href="bendra-info.html">Bendra informacija</a></li><li><a href="vadovas.html">Naudotojo vadovas</a></li></ul></details></li><li><details><summary>Klaipėdos miesto savivaldybės aplinkos monitoringas</summary><ul><li class="nav-group-label">Aplinkos oro monitoringas</li><li><a href="oro.html">Automatinių stotelių duomenys</a></li><li><a href="oro.html#laboratoriniai">Monitoringo (laboratoriniai) duomenys</a></li><li><a href="truksmas.html">Aplinkos triukšmo monitoringas</a></li><li><a href="dirvezemis.html">Dirvožemio monitoringas</a></li><li><a href="vanduo.html">Paviršinio vandens monitoringas</a></li><li class="nav-group-label">Gyvosios gamtos monitoringas</li><li><a href="gyvoji_gamta.html">Gyvosios gamtos monitoringas</a></li><li><a href="gyvoji_gamta.html#augalija">Augalijos monitoringas</a></li><li><a href="gyvoji_gamta.html#invazines">Invazinių rūšių monitoringas</a></li><li><a href="gyvoji_gamta.html#pauksciai">Paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#varniniai">Varninių paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#siksnosparniai">Šikšnosparnių monitoringas</a></li><li><a href="gyvoji_gamta.html#varliagyviai">Varliagyvių ir roplių monitoringas</a></li><li><a href="gyvoji_gamta.html#zuvys">Žuvų monitoringas</a></li><li><a href="zeldynai.html">Želdynų ir želdinių monitoringas</a></li></ul></details></li><li><a href="ataskaitos.html" aria-current="page">Monitoringo metinės ataskaitos</a></li><li><a href="prenumerata.html">Automatinių pranešimų prenumerata</a></li><li><a href="zemelapis.html">Interaktyvus žemėlapis</a></li></ul></nav></div><div class="brand-stripe" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div></header>
<main id="turinys" class="page-shell"><section class="page-hero"><div><p class="section-kicker">3.6.4 · automatinė ataskaitų generacija</p><h1>Monitoringo metinės ataskaitos</h1><p class="lede">Pasirinkite ataskaitos metus. Demonstracinė peržiūra autoagreguoja skirtingų monitoringo dalių suvestines ir grafikus viename spausdinamame dokumente.</p><div class="page-actions"><a class="button button--secondary" href="zemelapis.html">Žemėlapis</a><button class="button button--primary" type="button" id="print-report">Spausdinti / PDF</button></div></div><aside class="page-hero-aside"><strong>PDF per naršyklės spausdinimą</strong><p>Ataskaitos peržiūros lange paspauskite „Spausdinti / PDF“ ir pasirinkite naršyklės PDF spausdintuvą. XLSX ir CSV eksportas paliktas integracijos etapui.</p></aside></section><div class="content-stack"><section class="surface surface-pad"><div class="section-heading"><div><span class="eyebrow">2022–2025 · viešos suvestinės</span><h2>Pasirinkite metus</h2><p>Nuorodos pateikiamos atsisiuntimo stiliumi, tačiau šiame demo jos atidaro gyvai sugeneruojamą ataskaitos vaizdą.</p></div></div><div class="report-list"><a class="report-link" href="#report-view" data-report-year="2022"><strong>2022</strong><span>Metinė suvestinė · atverti</span></a><a class="report-link" href="#report-view" data-report-year="2023"><strong>2023</strong><span>Metinė suvestinė · atverti</span></a><a class="report-link" href="#report-view" data-report-year="2024"><strong>2024</strong><span>Metinė suvestinė · atverti</span></a><a class="report-link" href="#report-view" data-report-year="2025"><strong>2025</strong><span>Metinė suvestinė · atverti</span></a></div></section><section class="report-sheet" id="report-view" aria-labelledby="report-title"><div class="report-cover"><span class="eyebrow">KMS AMIS · viešoji ataskaita</span><h2 id="report-title">Aplinkos monitoringo metinė ataskaita <span id="selected-report-year">2025</span></h2><p class="muted" id="report-period">Ruošiama…</p><p class="fine-print" id="report-note">Ruošiama…</p></div><section class="report-section"><h3>Monitoringo dalių suvestinis grafikas</h3><div class="report-chart"><canvas id="report-chart" aria-label="Monitoringo dalių metinių vidurkių diagrama"></canvas></div><p class="chart-caption">Skirtingų parametrų vienetai skiriasi, todėl grafikas skirtas struktūrai ir duomenų aprėpčiai pademonstruoti, o ne skirtingoms aplinkos sritims reitinguoti.</p></section><div id="report-sections"></div></section></div></main><footer class="site-footer"><div class="site-footer-inner"><div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Ataskaitos demonstracinės. Normos ir skaičiavimo metodai turi būti suderinti prieš priėmimo testavimą.</p></div><nav class="footer-links" aria-label="Poraštės nuorodos"><a href="admin/index.html">Valdymo pultas (demonstracija)</a><a href="privatumo-politika.html">Privatumo politika</a><a href="slapuku-politika.html">Slapukų politika</a><a href="vadovas.html">Naudotojo vadovas</a><a href="zemelapis.html">Žemėlapis</a></nav></div></footer><script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script><script type="module">import { initReports } from "../js/pages/reports.js"; initReports();</script></body></html>


--- demo/pages/admin/index.html ---
<!doctype html>
<html lang="lt">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Peržiūros skydas · KMS AMIS</title>
  <link rel="stylesheet" href="../../css/theme.css">
  <link rel="stylesheet" href="../../css/sections.css">
</head>
<body class="admin-body">
  <div class="admin-layout">
    <aside class="admin-sidebar" id="admin-sidebar"></aside>
    <div class="admin-workspace">
      <header class="admin-topbar" id="admin-topbar"></header>
      <main class="admin-main" id="admin-main">
        <section class="admin-page-hero"><div><p class="section-kicker">3 etapas · operacijų centras</p><h1>Peržiūros skydas</h1><p class="lede">Gyvai matykite duomenų priėmimą, stotelių būsenas, spragas ir veiksmus, kurių šiandien reikia operatoriui.</p></div><aside class="admin-page-hero-aside"><strong>Simuliuojamas priėmimas</strong><p>Kas maždaug 4 sekundes sugeneruojamas naujas deterministinis perdavimo įvykis.</p></aside></section>
        <div class="admin-stack">
          <section class="admin-kpi-grid" aria-label="Pagrindiniai rodikliai">
            <article class="stat-card stat-card--accent"><span class="stat-label">Šiandien priimta įrašų</span><strong class="stat-value" id="kpi-ingested">–</strong><span class="stat-note">pagal priėmimo žurnalą</span></article>
            <article class="stat-card"><span class="stat-label">NEVALIDUS eilėje</span><strong class="stat-value" id="kpi-invalid">–</strong><span class="stat-note">laukiama patvirtinimo</span></article>
            <article class="stat-card"><span class="stat-label">Atviros spragos</span><strong class="stat-value" id="kpi-gaps">1</strong><span class="stat-note">KA-07 · Melnragė</span></article>
            <article class="stat-card"><span class="stat-label">Aktyvūs prenumeratoriai</span><strong class="stat-value" id="kpi-subscribers">–</strong><span class="stat-note">patvirtinti BDSR įrašai</span></article>
          </section>
          <section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Srautas · paskutiniai įvykiai</span><h2>Gyvas priėmimo srautas</h2><p>Įvykis apima šaltinį, parametrą, įrašų skaičių, protokolą ir priėmimo būseną.</p></div><span class="admin-live-dot">Simuliacija veikia</span></div><div class="data-table-wrap admin-table"><table class="data-table"><thead><tr><th>Laikas</th><th>Šaltinis</th><th>Parametras</th><th>Įrašai</th><th>Protokolas</th><th>Būsena</th></tr></thead><tbody id="feed-table"></tbody></table></div><p class="fine-print" id="feed-status" role="status"></p></section>
          <div class="admin-grid-2">
            <section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">15 šaltinių</span><h2>Stotelių ir įrenginių būklė</h2><p>KA-07 pažymėta pagal istorinio tarpo įvykį.</p></div></div><div class="data-table-wrap admin-table admin-table--compact"><table class="data-table"><thead><tr><th>Šaltinis</th><th>Tipas</th><th>Paskutinis ryšys</th><th>Būsena</th></tr></thead><tbody id="health-table"></tbody></table></div></section>
            <section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Veiksmų pėdsakas</span><h2>Naujausi auditai</h2><p>Administratoriaus ir specialisto veiksmai iš bendro žurnalo.</p></div><a class="button button--secondary button--small" href="auditas.html">Atverti visą žurnalą</a></div><div class="data-table-wrap admin-table admin-table--compact"><table class="data-table"><thead><tr><th>Laikas</th><th>Vaidmuo</th><th>Veiksmas</th><th>Rezultatas</th></tr></thead><tbody id="audit-preview"></tbody></table></div></section>
          </div>
        </div>
      </main>
    </div>
  </div>
  <script type="module" src="../../js/pages/admin/index.js"></script>
</body>
</html>


exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command '$c = Get-Content '"'demo/css/theme.css'; foreach ("'$range in @(@(1,215),@(216,430))) { $start=$range[0]; $end=[Math]::Min($range[1],$c.Length); Write-Output "--- theme $start-$end ---"; for($i=$start;$i -le $end;$i++){ '"'{0,4}: {1}' -f "'$i,$c[$i-1] } }' in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 174ms:
--- theme 1-215 ---
   1: @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap");
   2: 
   3: :root {
   4:   color-scheme: light;
   5:   --sea-950: #071f5b;
   6:   --sea-900: #0b2f8b;
   7:   --sea-800: #1341ba;
   8:   --sea-700: #4768c7;
   9:   --sea-500: #768cd4;
  10:   --shore-100: #f4f9ef;
  11:   --shore-200: #e7f2de;
  12:   --shore-300: #d9ebca;
  13:   --land-300: #7ca7a2;
  14:   --land-500: #538a83;
  15:   --land-700: #197067;
  16:   --land-900: #10544b;
  17:   --sun-500: #ffde45;
  18:   --sky-500: #288cc8;
  19: 
  20:   --ink-950: #102331;
  21:   --ink-800: #284454;
  22:   --ink-600: #537083;
  23:   --ink-500: #718897;
  24:   --line: #d6e2e6;
  25:   --line-strong: #afc5cc;
  26:   --paper: #fbfcfa;
  27:   --surface: #ffffff;
  28:   --surface-muted: #f1f6f5;
  29: 
  30:   --good: #50f0e6;
  31:   --fair: #50eaa9;
  32:   --moderate: #f4e400;
  33:   --poor: #fa4600;
  34:   --very-poor: #e51d1d;
  35:   --extremely-poor: #a71d17;
  36:   --no-data: #8798a0;
  37:   --status-ink: #15333b;
  38: 
  39:   --shadow-sm: 0 2px 8px rgba(16, 35, 49, 0.06);
  40:   --shadow-md: 0 14px 36px rgba(11, 47, 139, 0.12);
  41:   --radius-sm: 8px;
  42:   --radius-md: 14px;
  43:   --radius-lg: 22px;
  44:   --content-max: 1360px;
  45:   --focus: 0 0 0 4px rgba(40, 140, 200, 0.3);
  46:   --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
  47: }
  48: 
  49: * { box-sizing: border-box; }
  50: 
  51: html { scroll-behavior: smooth; }
  52: 
  53: body {
  54:   margin: 0;
  55:   background: var(--paper);
  56:   color: var(--ink-950);
  57:   font-family: "Plus Jakarta Sans", Arial, sans-serif;
  58:   font-size: 16px;
  59:   font-weight: 300;
  60:   line-height: 1.55;
  61:   text-rendering: optimizeLegibility;
  62: }
  63: 
  64: button,
  65: input,
  66: select { font: inherit; }
  67: 
  68: a { color: var(--sea-900); text-underline-offset: 0.18em; }
  69: a:hover { color: var(--land-900); }
  70: 
  71: :focus-visible {
  72:   outline: 3px solid var(--sky-500);
  73:   outline-offset: 3px;
  74:   box-shadow: var(--focus);
  75: }
  76: 
  77: .skip-link {
  78:   position: absolute;
  79:   left: 16px;
  80:   top: -60px;
  81:   z-index: 2000;
  82:   padding: 10px 14px;
  83:   color: #fff;
  84:   background: var(--sea-950);
  85:   border-radius: var(--radius-sm);
  86: }
  87: .skip-link:focus { top: 16px; }
  88: 
  89: .site-header {
  90:   background: var(--surface);
  91:   border-bottom: 1px solid var(--line);
  92: }
  93: 
  94: .header-inner,
  95: .page-shell,
  96: .site-footer-inner {
  97:   width: min(calc(100% - 40px), var(--content-max));
  98:   margin: 0 auto;
  99: }
 100: 
 101: .header-inner {
 102:   display: grid;
 103:   grid-template-columns: minmax(260px, 0.95fr) minmax(0, 1.65fr);
 104:   gap: 32px;
 105:   align-items: end;
 106:   padding: 18px 0 0;
 107: }
 108: 
 109: .brand-lockup {
 110:   display: flex;
 111:   align-items: flex-start;
 112:   gap: 13px;
 113:   padding-bottom: 17px;
 114:   text-decoration: none;
 115:   color: var(--ink-950);
 116: }
 117: 
 118: .brand-mark {
 119:   display: grid;
 120:   place-items: center;
 121:   flex: 0 0 44px;
 122:   width: 44px;
 123:   height: 44px;
 124:   color: var(--sea-900);
 125:   border: 1px solid var(--sea-700);
 126:   border-radius: 50%;
 127:   font-size: 0.74rem;
 128:   font-weight: 600;
 129:   letter-spacing: 0.12em;
 130: }
 131: 
 132: .brand-lockup strong {
 133:   display: block;
 134:   max-width: 520px;
 135:   color: var(--sea-950);
 136:   font-size: clamp(0.9rem, 1.25vw, 1.18rem);
 137:   font-weight: 600;
 138:   line-height: 1.18;
 139: }
 140: 
 141: .brand-lockup small {
 142:   display: block;
 143:   margin-top: 5px;
 144:   color: var(--ink-600);
 145:   font-size: 0.74rem;
 146:   letter-spacing: 0.08em;
 147:   text-transform: uppercase;
 148: }
 149: 
 150: .main-nav { align-self: stretch; }
 151: .main-nav > ul {
 152:   display: flex;
 153:   flex-wrap: wrap;
 154:   justify-content: flex-end;
 155:   gap: 5px;
 156:   height: 100%;
 157:   margin: 0;
 158:   padding: 0;
 159:   list-style: none;
 160: }
 161: 
 162: .main-nav a,
 163: .main-nav summary {
 164:   display: inline-flex;
 165:   min-height: 46px;
 166:   align-items: center;
 167:   padding: 8px 11px 12px;
 168:   color: var(--ink-800);
 169:   font-size: 0.79rem;
 170:   font-weight: 500;
 171:   text-decoration: none;
 172:   transition: color 180ms var(--ease-out), background 180ms var(--ease-out);
 173: }
 174: .main-nav a:hover,
 175: .main-nav summary:hover,
 176: .main-nav a[aria-current="page"] { color: var(--sea-900); background: var(--shore-100); }
 177: .main-nav details { position: relative; }
 178: .main-nav summary { cursor: pointer; list-style: none; }
 179: .main-nav summary::-webkit-details-marker { display: none; }
 180: .main-nav summary::after { content: "⌄"; margin-left: 6px; font-size: 0.85rem; }
 181: .main-nav details[open] summary { color: var(--sea-900); }
 182: .main-nav details ul {
 183:   position: absolute;
 184:   right: 0;
 185:   z-index: 50;
 186:   width: 280px;
 187:   margin: 0;
 188:   padding: 8px;
 189:   list-style: none;
 190:   background: var(--surface);
 191:   border: 1px solid var(--line);
 192:   border-radius: var(--radius-sm);
 193:   box-shadow: var(--shadow-md);
 194: }
 195: .main-nav details li a { display: flex; min-height: 40px; padding: 8px 10px; }
 196: 
 197: .brand-stripe {
 198:   display: grid;
 199:   grid-template-rows: repeat(3, 4px);
 200:   gap: 2px;
 201:   width: 100%;
 202:   height: 16px;
 203:   overflow: hidden;
 204: }
 205: .brand-stripe span { display: block; }
 206: .brand-stripe .stripe-sea { background: var(--sea-800); transform: translate(0, 0); }
 207: .brand-stripe .stripe-shore { background: var(--sun-500); transform: translate(5px, 1px); }
 208: .brand-stripe .stripe-land { background: var(--land-700); transform: translate(10px, 2px); }
 209: .brand-stripe--compact { grid-template-rows: repeat(3, 3px); gap: 1px; height: 11px; }
 210: 
 211: .page-shell { padding: 28px 0 72px; }
 212: .section-kicker {
 213:   margin: 0 0 10px;
 214:   color: var(--land-700);
 215:   font-size: 0.72rem;
--- theme 216-430 ---
 216:   font-weight: 600;
 217:   letter-spacing: 0.14em;
 218:   text-transform: uppercase;
 219: }
 220: h1, h2, h3, h4 { color: var(--sea-950); font-weight: 500; line-height: 1.16; }
 221: h1 { margin: 0; font-size: clamp(2.25rem, 5vw, 5.3rem); letter-spacing: -0.055em; }
 222: h2 { margin: 0; font-size: clamp(1.45rem, 2.8vw, 2.5rem); letter-spacing: -0.035em; }
 223: h3 { margin: 0; font-size: 1.12rem; }
 224: p { margin-top: 0; }
 225: .lede { max-width: 58ch; color: var(--ink-600); font-size: clamp(1rem, 1.5vw, 1.2rem); }
 226: 
 227: .button {
 228:   display: inline-flex;
 229:   min-height: 46px;
 230:   align-items: center;
 231:   justify-content: center;
 232:   gap: 8px;
 233:   padding: 10px 16px;
 234:   border: 1px solid transparent;
 235:   border-radius: 999px;
 236:   cursor: pointer;
 237:   font-size: 0.84rem;
 238:   font-weight: 600;
 239:   text-decoration: none;
 240:   transition: transform 180ms var(--ease-out), background 180ms var(--ease-out), border-color 180ms var(--ease-out);
 241: }
 242: .button:hover { transform: translateY(-1px); }
 243: .button--primary { color: #fff; background: var(--sea-900); }
 244: .button--primary:hover { color: #fff; background: var(--sea-950); }
 245: .button--secondary { color: var(--sea-900); background: var(--surface); border-color: var(--line-strong); }
 246: .button--secondary:hover { background: var(--shore-100); border-color: var(--sea-500); }
 247: .button--small { min-height: 38px; padding: 8px 12px; font-size: 0.76rem; }
 248: 
 249: .panel {
 250:   background: var(--surface);
 251:   border: 1px solid var(--line);
 252:   border-radius: var(--radius-md);
 253:   box-shadow: var(--shadow-sm);
 254: }
 255: 
 256: .hero {
 257:   display: grid;
 258:   grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
 259:   gap: clamp(28px, 6vw, 92px);
 260:   align-items: end;
 261:   padding: clamp(26px, 5vw, 72px) 0 42px;
 262: }
 263: .hero-copy { position: relative; }
 264: .hero-copy::before {
 265:   position: absolute;
 266:   top: -22px;
 267:   left: 0;
 268:   width: 46px;
 269:   height: 4px;
 270:   content: "";
 271:   background: var(--sun-500);
 272: }
 273: .hero h1 { max-width: 760px; }
 274: .hero .lede { margin: 23px 0 26px; }
 275: .hero-aside { padding: 20px 0 0 20px; border-left: 1px solid var(--line-strong); }
 276: .hero-aside strong { display: block; color: var(--land-900); font-size: 1.1rem; font-weight: 500; }
 277: .hero-aside p { margin: 9px 0 0; color: var(--ink-600); font-size: 0.9rem; }
 278: 
 279: .grid-home {
 280:   display: grid;
 281:   grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
 282:   gap: 18px;
 283:   align-items: start;
 284: }
 285: .grid-home > .panel:first-child { grid-row: span 2; }
 286: .card-pad { padding: clamp(19px, 3vw, 30px); }
 287: .card-heading { display: flex; align-items: start; justify-content: space-between; gap: 16px; }
 288: .card-heading p { margin: 7px 0 0; color: var(--ink-600); font-size: 0.85rem; }
 289: .card-heading .eyebrow { color: var(--land-700); font-size: 0.69rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; }
 290: 
 291: .weather-strip {
 292:   display: grid;
 293:   grid-template-columns: repeat(5, minmax(0, 1fr));
 294:   gap: 1px;
 295:   margin: 24px 0 0;
 296:   overflow: hidden;
 297:   background: var(--line);
 298:   border: 1px solid var(--line);
 299:   border-radius: var(--radius-sm);
 300: }
 301: .weather-item { min-width: 0; padding: 15px 13px; background: var(--surface-muted); }
 302: .weather-item .label { display: block; color: var(--ink-600); font-size: 0.7rem; }
 303: .weather-item strong { display: block; margin-top: 7px; color: var(--sea-950); font-size: clamp(1rem, 2vw, 1.45rem); font-weight: 500; white-space: nowrap; }
 304: .weather-item small { display: block; margin-top: 2px; color: var(--ink-500); font-size: 0.7rem; }
 305: .update-note { margin: 12px 0 0; color: var(--ink-500); font-size: 0.73rem; }
 306: 
 307: .aqi-layout { display: grid; grid-template-columns: 128px minmax(0, 1fr); gap: 21px; align-items: center; margin-top: 26px; }
 308: .aqi-score {
 309:   display: grid;
 310:   place-items: center;
 311:   width: 128px;
 312:   aspect-ratio: 1;
 313:   color: var(--status-ink);
 314:   background: var(--good);
 315:   border-radius: 50%;
 316:   box-shadow: inset 0 0 0 9px rgba(255,255,255,0.42);
 317: }
 318: .aqi-score strong { display: block; font-size: 2.75rem; font-weight: 500; line-height: 1; }
 319: .aqi-score span { display: block; margin-top: 7px; font-size: 0.67rem; font-weight: 600; text-transform: uppercase; }
 320: .aqi-copy h3 { font-size: 1.35rem; }
 321: .aqi-copy p { margin: 7px 0 0; color: var(--ink-600); font-size: 0.83rem; }
 322: .aqi-scale { display: grid; grid-template-columns: repeat(6, 1fr); gap: 4px; margin-top: 22px; }
 323: .aqi-scale span { height: 7px; border-radius: 2px; }
 324: .aqi-scale .good { background: var(--good); }.aqi-scale .fair { background: var(--fair); }.aqi-scale .moderate { background: var(--moderate); }.aqi-scale .poor { background: var(--poor); }.aqi-scale .very-poor { background: var(--very-poor); }.aqi-scale .extremely-poor { background: var(--extremely-poor); }
 325: .legend-labels { display: flex; justify-content: space-between; gap: 8px; margin-top: 7px; color: var(--ink-500); font-size: 0.66rem; }
 326: 
 327: .map-preview { position: relative; min-height: 230px; overflow: hidden; background: #dfe9df; }
 328: .map-preview::before,
 329: .map-preview::after { position: absolute; content: ""; background: rgba(255,255,255,0.72); transform: rotate(-13deg); }
 330: .map-preview::before { top: 22%; left: -8%; width: 120%; height: 14px; box-shadow: 0 65px 0 rgba(255,255,255,0.55), 0 130px 0 rgba(255,255,255,0.65); }
 331: .map-preview::after { top: -10%; left: 38%; width: 15px; height: 130%; box-shadow: 80px 0 0 rgba(255,255,255,0.44), 160px 0 0 rgba(255,255,255,0.48); }
 332: .map-preview-content { position: relative; z-index: 1; min-height: 230px; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
 333: .map-preview-label { display: flex; align-items: center; justify-content: space-between; color: var(--sea-950); font-size: 0.72rem; font-weight: 600; }
 334: .map-preview-label span { display: inline-flex; width: 8px; height: 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
 335: .map-preview-link { position: absolute; right: 18px; bottom: 17px; }
 336: 
 337: .section-intro { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin: 44px 0 18px; }
 338: .section-intro p { max-width: 48ch; margin: 0; color: var(--ink-600); font-size: 0.9rem; }
 339: .monitoring-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
 340: .monitoring-link { min-height: 126px; padding: 17px; color: var(--ink-800); text-decoration: none; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-sm); transition: transform 180ms var(--ease-out), border-color 180ms var(--ease-out), box-shadow 180ms var(--ease-out); }
 341: .monitoring-link:hover { color: var(--ink-800); border-color: var(--land-500); box-shadow: var(--shadow-sm); transform: translateY(-2px); }
 342: .monitoring-link strong { display: block; color: var(--sea-900); font-size: 0.9rem; font-weight: 500; }
 343: .monitoring-link span { display: block; margin-top: 26px; color: var(--ink-500); font-size: 0.7rem; }
 344: 
 345: .site-footer { background: var(--sea-950); color: #dfeafa; }
 346: .site-footer-inner { display: flex; justify-content: space-between; gap: 30px; padding: 29px 0 35px; }
 347: .site-footer strong { display: block; color: #fff; font-weight: 500; }
 348: .site-footer p { max-width: 45ch; margin: 8px 0 0; color: #bbcee2; font-size: 0.77rem; }
 349: .footer-links { display: flex; flex-wrap: wrap; justify-content: flex-end; align-content: flex-start; gap: 8px 16px; }
 350: .footer-links a { color: #dfeafa; font-size: 0.77rem; }
 351: 
 352: /* Map page */
 353: .map-page-shell { width: min(calc(100% - 32px), 1500px); margin: 0 auto; padding: 22px 0 32px; }
 354: .map-titlebar { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 18px; }
 355: .map-titlebar h1 { font-size: clamp(1.8rem, 4vw, 3.5rem); }
 356: .map-titlebar p { max-width: 54ch; margin: 7px 0 0; color: var(--ink-600); font-size: 0.86rem; }
 357: .map-actions { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; }
 358: .map-layout { display: grid; grid-template-columns: minmax(230px, 0.27fr) minmax(0, 1fr); min-height: 660px; overflow: hidden; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-md); box-shadow: var(--shadow-md); }
 359: .map-sidebar { padding: 19px; background: var(--surface-muted); border-right: 1px solid var(--line); }
 360: .control-group { margin-bottom: 21px; }
 361: .control-group:last-child { margin-bottom: 0; }
 362: .control-label { display: block; margin-bottom: 7px; color: var(--ink-800); font-size: 0.72rem; font-weight: 600; }
 363: .control-help { margin: 6px 0 0; color: var(--ink-500); font-size: 0.7rem; line-height: 1.45; }
 364: .field,
 365: .select-field { width: 100%; min-height: 43px; padding: 8px 10px; color: var(--ink-950); background: var(--surface); border: 1px solid var(--line-strong); border-radius: var(--radius-sm); }
 366: .field:hover,
 367: .select-field:hover { border-color: var(--sea-700); }
 368: .layer-list { display: grid; gap: 8px; }
 369: .layer-list label { display: flex; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
 370: .layer-list input { width: 18px; height: 18px; accent-color: var(--sea-800); }
 371: .legend { display: grid; gap: 7px; padding-top: 12px; border-top: 1px solid var(--line); }
 372: .legend-row { display: flex; align-items: center; gap: 8px; color: var(--ink-600); font-size: 0.7rem; }
 373: .legend-dot { width: 12px; height: 12px; flex: 0 0 12px; border: 2px solid rgba(16,35,49,0.28); border-radius: 50%; }
 374: .legend-swatch { width: 19px; height: 13px; flex: 0 0 19px; border: 1px solid rgba(16,35,49,0.25); border-radius: 3px; }
 375: .measure-list { display: grid; gap: 7px; margin: 10px 0 0; padding: 0; list-style: none; }
 376: .measure-list li { display: flex; justify-content: space-between; gap: 8px; padding: 7px 8px; color: var(--ink-800); background: var(--surface); border: 1px solid var(--line); border-radius: 5px; font-size: 0.68rem; }
 377: .measure-list strong { color: var(--sea-900); font-weight: 600; white-space: nowrap; }
 378: .map-canvas { position: relative; min-height: 660px; }
 379: #map { position: absolute; inset: 0; z-index: 1; }
 380: .map-status { position: absolute; left: 13px; bottom: 16px; z-index: 500; max-width: min(360px, calc(100% - 26px)); padding: 9px 11px; color: var(--ink-800); background: rgba(255,255,255,0.94); border: 1px solid var(--line); border-radius: 6px; box-shadow: var(--shadow-sm); font-size: 0.7rem; }
 381: .station-label { padding: 4px 6px; color: var(--sea-950); background: var(--surface); border: 1px solid var(--sea-700); border-radius: 4px; box-shadow: 0 2px 6px rgba(16,35,49,0.2); font-size: 0.68rem; font-weight: 600; white-space: nowrap; }
 382: .station-label--iot { color: var(--land-900); border-color: var(--land-500); }
 383: .leaflet-popup-content-wrapper { border-radius: 10px; }
 384: .leaflet-popup-content { width: min(330px, calc(100vw - 66px)) !important; margin: 15px 16px; }
 385: .popup-kicker { margin-bottom: 4px; color: var(--land-700); font-size: 0.66rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
 386: .popup-title { margin: 0; color: var(--sea-950); font-size: 1rem; font-weight: 600; line-height: 1.25; }
 387: .popup-meta { margin: 6px 0 12px; color: var(--ink-600); font-size: 0.68rem; line-height: 1.55; }
 388: .popup-select { width: 100%; min-height: 34px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
 389: .popup-data-table { width: 100%; border-collapse: collapse; font-size: 0.7rem; }
 390: .popup-data-table th,
 391: .popup-data-table td { padding: 6px 4px; text-align: left; border-bottom: 1px solid var(--line); }
 392: .popup-data-table th { color: var(--ink-500); font-weight: 400; }
 393: .popup-data-table td { color: var(--ink-950); font-weight: 500; }
 394: .popup-norm { margin-top: 10px; padding: 8px; background: var(--shore-100); border-radius: 5px; color: var(--land-900); font-size: 0.7rem; }
 395: .popup-note { margin: 9px 0 0; color: var(--ink-500); font-size: 0.64rem; }
 396: 
 397: .status-good { background-color: var(--good); }
 398: .status-fair { background-color: var(--fair); }
 399: .status-moderate { background-color: var(--moderate); }
 400: .status-poor { background-color: var(--poor); }
 401: .status-very-poor { background-color: var(--very-poor); }
 402: .status-extremely-poor { background-color: var(--extremely-poor); }
 403: .status-no-data { background-color: var(--no-data); }
 404: .status-chip { display: inline-flex; align-items: center; min-height: 27px; padding: 4px 8px; color: var(--status-ink); border-radius: 999px; font-size: 0.64rem; font-weight: 600; line-height: 1.2; text-align: center; }
 405: .status-very-poor.status-chip, .status-extremely-poor.status-chip { color: #fff; }
 406: .status-dot { display: inline-block; width: 8px; height: 8px; margin-left: 4px; vertical-align: middle; border-radius: 50%; }
 407: 
 408: @media (max-width: 980px) {
 409:   .header-inner { grid-template-columns: 1fr; gap: 0; }
 410:   .main-nav > ul { justify-content: flex-start; }
 411:   .brand-lockup { padding-bottom: 13px; }
 412:   .main-nav a, .main-nav summary { padding-bottom: 10px; }
 413:   .grid-home { grid-template-columns: 1fr 1fr; }
 414:   .grid-home > .panel:first-child { grid-row: auto; grid-column: 1 / -1; }
 415:   .monitoring-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
 416:   .map-layout { grid-template-columns: 250px minmax(0, 1fr); }
 417: }
 418: 
 419: @media (max-width: 720px) {
 420:   .header-inner, .page-shell, .site-footer-inner { width: min(calc(100% - 28px), var(--content-max)); }
 421:   .main-nav { overflow-x: auto; }
 422:   .main-nav > ul { flex-wrap: nowrap; width: max-content; }
 423:   .main-nav details ul { position: fixed; top: 107px; left: 14px; right: 14px; width: auto; }
 424:   .hero { grid-template-columns: 1fr; gap: 24px; padding-top: 42px; }
 425:   .hero-aside { padding: 17px 0 0; border-top: 1px solid var(--line-strong); border-left: 0; }
 426:   .grid-home { grid-template-columns: 1fr; }
 427:   .weather-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
 428:   .weather-item:last-child { grid-column: 1 / -1; }
 429:   .section-intro { display: block; }
 430:   .section-intro p { margin-top: 10px; }

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "python -c \"import playwright; print('python-playwright-ok')\"; try { (Invoke-WebRequest -UseBasicParsing 'http://localhost:8000/demo/index.html' -TimeoutSec 5).StatusCode } catch { "'$_.Exception.Message }' in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 218ms:
python-playwright-ok
Response status code does not indicate success: 404 (File not found).

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command 'foreach($u in @('"'http://localhost:8000/','http://localhost:8000/index.html','http://localhost:8000/pages/oro.html')) { try { "'$x=Invoke-WebRequest -UseBasicParsing $u -TimeoutSec 5; "$u`t$($x.StatusCode)`t$($x.RawContentLength)" } catch { "$u`t$($_.Exception.Message)" } }' in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 206ms:
http://localhost:8000/	200	9347
http://localhost:8000/index.html	200	9347
http://localhost:8000/pages/oro.html	200	13571

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "Get-Content -Raw 'demo/js/data/admin/auth.js'; Write-Output \""'`n--- shell ---"; Get-Content -Raw '"'demo/js/pages/admin/shell.js'; Write-Output \""'`n--- theme remainder ---"; $c=Get-Content '"'demo/css/theme.css'; for("'$i=397;$i -le $c.Length;$i++){ '"'{0,4}: {1}' -f "'$i,$c[$i-1] }' in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 138ms:
export const ADMIN_SESSION_KEY = "kms_amis_admin_session";
export const ADMIN_USERS_KEY = "kms_amis_admin_users";
export const TOTP_FALLBACK_CODE = "000000";
const TOTP_CODES = ["123456", "246802", "731904", "508122", "184275", "902341"];

const DEFAULT_USERS = [
  { username: "administratorius", role: "administratorius", password: "Klaipeda#2026-10", mustChange: true },
  { username: "specialistas", role: "specialistas", password: "spec", mustChange: false }
];

function readUsers() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ADMIN_USERS_KEY) || "null");
    return Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_USERS.map((item) => ({ ...item }));
  } catch (error) {
    return DEFAULT_USERS.map((item) => ({ ...item }));
  }
}

function writeUsers(users) { localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(users)); return users; }

export function authenticate(username, password) {
  const identifier = String(username || "").trim().toLowerCase();
  if (identifier === "administratorius" && password === "admin") return { ok: true, username: "administratorius", role: "administratorius", mustChange: false };
  if (identifier === "admin" && password === "Klaipeda#2026-10") return { ok: true, username: "administratorius", role: "administratorius", mustChange: true };
  const users = readUsers();
  const user = users.find((item) => item.username === identifier);
  if (!user || user.password !== password) return { ok: false, reason: "credentials" };
  return { ok: true, username: user.username, role: user.role, mustChange: Boolean(user.mustChange) };
}

export function changePassword(username, password) {
  const users = readUsers();
  const index = users.findIndex((item) => item.username === username);
  if (index < 0) return false;
  users[index] = { ...users[index], password, mustChange: false, passwordChangedAt: new Date().toISOString() };
  writeUsers(users);
  return true;
}

export function getTotpCode(timestamp = Date.now()) {
  return TOTP_CODES[Math.floor(timestamp / 30000) % TOTP_CODES.length];
}

export function getTotpProgress(timestamp = Date.now()) {
  return 1 - ((timestamp % 30000) / 30000);
}

export function setSession({ role }) {
  const session = { role };
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getSession() {
  try {
    const session = JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY) || "null");
    return session?.role ? session : null;
  } catch (error) {
    return null;
  }
}

export function clearSession() { localStorage.removeItem(ADMIN_SESSION_KEY); }
export function hasRole(requiredRole) { const session = getSession(); return Boolean(session && (requiredRole === "any" || session.role === requiredRole)); }
export function getRoleLabel(role) { return role === "administratorius" ? "Administratorius" : "Specialistas"; }


--- shell ---
import { appendAudit, listAudit } from "../../data/admin/audit.js";
import { clearSession, getRoleLabel, getSession } from "../../data/admin/auth.js";

const NAV_ITEMS = [
  ["index.html", "Peržiūros skydas", "dashboard"],
  ["duomenys.html", "Duomenų valdymas", "data"],
  ["patvirtinimas.html", "Duomenų patvirtinimas", "approval"],
  ["nevalidus.html", "Neleistini įrašai (NEVALIDUS)", "invalid"],
  ["pranesimai.html", "Pranešimų valdymas", "notifications"],
  ["prenumeratos.html", "Prenumeratos ir BDSR", "subscriptions", "administratorius"],
  ["auditas.html", "Audito žurnalas", "audit"],
  ["sla.html", "SLA bilietai", "sla"],
  ["nustatymai.html", "Nustatymai", "settings", "administratorius"]
];

function currentRole() { return getSession()?.role ?? "sistema"; }

function renderSidebar(active, session) {
  const sidebar = document.querySelector("#admin-sidebar");
  if (!sidebar) return;
  const links = NAV_ITEMS.filter(([, , , role]) => !role || role === session.role).map(([href, label, key]) => `<li><a class="admin-nav-link${key === active ? " is-active" : ""}" href="${href}"${key === active ? ' aria-current="page"' : ""}>${label}</a></li>`).join("");
  sidebar.innerHTML = `<a class="admin-brand" href="index.html"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>KMS AMIS</strong><small>valdymo pultas</small></span></a><div class="brand-stripe brand-stripe--compact" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div><nav class="admin-nav" aria-label="Valdymo pulto meniu"><ul>${links}<li><button class="admin-nav-link admin-nav-logout" type="button" data-admin-sidebar-logout>Atsijungti</button></li></ul></nav><div class="admin-sidebar-note"><span class="eyebrow">Demonstracija</span><p>Duomenys ir veiksmai išsaugomi tik šios naršyklės localStorage.</p></div>`;
  sidebar.querySelector("[data-admin-sidebar-logout]").addEventListener("click", () => logout(session));
}

function logout(session) {
  appendAudit({ role: session.role, action: "Atsijungta iš valdymo pulto", target: "Sesija", result: "Atlikta" });
  clearSession();
  window.location.href = "login.html";
}

function renderTopbar(session) {
  const topbar = document.querySelector("#admin-topbar");
  if (!topbar) return;
  topbar.innerHTML = `<div><span class="eyebrow">KMS AMIS · fazė 3</span><strong>Valdymo pultas</strong></div><div class="admin-top-actions"><span class="role-chip">${getRoleLabel(session.role)}</span><button class="button button--secondary button--small" type="button" data-admin-logout>Atsijungti</button></div>`;
  topbar.querySelector("[data-admin-logout]").addEventListener("click", () => logout(session));
}

export function toast(message, type = "success") {
  let region = document.querySelector("#admin-toast-region");
  if (!region) {
    region = document.createElement("div");
    region.id = "admin-toast-region";
    region.className = "admin-toast-region";
    document.body.append(region);
  }
  const item = document.createElement("div");
  item.className = `admin-toast admin-toast--${type}`;
  item.textContent = message;
  region.append(item);
  window.setTimeout(() => item.remove(), 4200);
}

export function auditAction(action, target, result = "Atlikta") {
  return appendAudit({ role: currentRole(), action, target, result });
}

export function downloadCsv(filename, rows) {
  const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(";")).join("\r\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function bootAdminShell({ active, title, requiredRole = "any" } = {}) {
  const session = getSession();
  if (!session) {
    window.location.href = "login.html";
    return { allowed: false, session: null };
  }
  renderSidebar(active, session);
  renderTopbar(session);
  document.title = `${title || "Valdymo pultas"} · KMS AMIS`;
  if (requiredRole !== "any" && session.role !== requiredRole) {
    const main = document.querySelector("#admin-main");
    if (main) main.innerHTML = `<section class="surface surface-pad admin-refusal"><span class="eyebrow">Prieigos teisė</span><h1>Prieiga nesuteikta</h1><p>Šiai sričiai reikalingas administratoriaus vaidmuo. Dabartinis vaidmuo: <strong>${getRoleLabel(session.role)}</strong>.</p><a class="button button--secondary" href="index.html">Grįžti į peržiūros skydą</a></section>`;
    return { allowed: false, session };
  }
  return { allowed: true, session };
}

export function recentAudit(limit = 5) { return listAudit().slice(0, limit); }


--- theme remainder ---
 397: .status-good { background-color: var(--good); }
 398: .status-fair { background-color: var(--fair); }
 399: .status-moderate { background-color: var(--moderate); }
 400: .status-poor { background-color: var(--poor); }
 401: .status-very-poor { background-color: var(--very-poor); }
 402: .status-extremely-poor { background-color: var(--extremely-poor); }
 403: .status-no-data { background-color: var(--no-data); }
 404: .status-chip { display: inline-flex; align-items: center; min-height: 27px; padding: 4px 8px; color: var(--status-ink); border-radius: 999px; font-size: 0.64rem; font-weight: 600; line-height: 1.2; text-align: center; }
 405: .status-very-poor.status-chip, .status-extremely-poor.status-chip { color: #fff; }
 406: .status-dot { display: inline-block; width: 8px; height: 8px; margin-left: 4px; vertical-align: middle; border-radius: 50%; }
 407: 
 408: @media (max-width: 980px) {
 409:   .header-inner { grid-template-columns: 1fr; gap: 0; }
 410:   .main-nav > ul { justify-content: flex-start; }
 411:   .brand-lockup { padding-bottom: 13px; }
 412:   .main-nav a, .main-nav summary { padding-bottom: 10px; }
 413:   .grid-home { grid-template-columns: 1fr 1fr; }
 414:   .grid-home > .panel:first-child { grid-row: auto; grid-column: 1 / -1; }
 415:   .monitoring-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
 416:   .map-layout { grid-template-columns: 250px minmax(0, 1fr); }
 417: }
 418: 
 419: @media (max-width: 720px) {
 420:   .header-inner, .page-shell, .site-footer-inner { width: min(calc(100% - 28px), var(--content-max)); }
 421:   .main-nav { overflow-x: auto; }
 422:   .main-nav > ul { flex-wrap: nowrap; width: max-content; }
 423:   .main-nav details ul { position: fixed; top: 107px; left: 14px; right: 14px; width: auto; }
 424:   .hero { grid-template-columns: 1fr; gap: 24px; padding-top: 42px; }
 425:   .hero-aside { padding: 17px 0 0; border-top: 1px solid var(--line-strong); border-left: 0; }
 426:   .grid-home { grid-template-columns: 1fr; }
 427:   .weather-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
 428:   .weather-item:last-child { grid-column: 1 / -1; }
 429:   .section-intro { display: block; }
 430:   .section-intro p { margin-top: 10px; }
 431:   .monitoring-grid { grid-template-columns: 1fr; }
 432:   .site-footer-inner { display: block; }
 433:   .footer-links { justify-content: flex-start; margin-top: 21px; }
 434:   .map-page-shell { width: min(calc(100% - 20px), 1500px); padding-top: 15px; }
 435:   .map-titlebar { display: block; }
 436:   .map-actions { justify-content: flex-start; margin-top: 14px; }
 437:   .map-layout { display: flex; flex-direction: column; min-height: 0; }
 438:   .map-sidebar { max-height: none; border-right: 0; border-bottom: 1px solid var(--line); }
 439:   .map-canvas { min-height: 70vh; }
 440:   #map { min-height: 70vh; }
 441: }
 442: 
 443: @media (max-width: 440px) {
 444:   .aqi-layout { grid-template-columns: 96px minmax(0, 1fr); gap: 14px; }
 445:   .aqi-score { width: 96px; }
 446:   .aqi-score strong { font-size: 2.1rem; }
 447:   .aqi-score span { font-size: 0.56rem; }
 448:   .weather-item strong { font-size: 0.92rem; }
 449:   .map-actions .button { flex: 1 1 auto; }
 450: }
 451: 
 452: @media (prefers-reduced-motion: reduce) {
 453:   *, *::before, *::after { scroll-behavior: auto !important; transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
 454: }

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "@'
import asyncio, json
from playwright.async_api import async_playwright

BASE='http://localhost:8000/'
PAGES=['pages/oro.html','pages/gyvoji_gamta.html','pages/truksmas.html','pages/ataskaitos.html']

async def main():
  async with async_playwright() as p:
    browser=await p.chromium.launch(headless=True)
    page=await browser.new_page(viewport={\"width\":390,\"height\":844}, device_scale_factor=1, is_mobile=True, has_touch=True)
    for path in PAGES:
      errors=[]
      page.on('console', lambda msg, errors=errors: errors.append(f'console:{msg.type}:{msg.text}') if msg.type=='error' else None)
      page.on('pageerror', lambda exc, errors=errors: errors.append(f'pageerror:{exc}'))
      await page.goto(BASE+path, wait_until='networkidle', timeout=30000)
      await page.wait_for_timeout(700)
      data=await page.evaluate('''() => {
        const vw=document.documentElement.clientWidth;
        const offenders=[...document.querySelectorAll('body *')].map((el)=>{
          const r=el.getBoundingClientRect(), cs=getComputedStyle(el);
          return {el, tag:el.tagName.toLowerCase(), cls:el.className && String(el.className).slice(0,120), id:el.id,
            left:+r.left.toFixed(1), right:+r.right.toFixed(1), width:+r.width.toFixed(1),
            clientWidth:el.clientWidth, scrollWidth:el.scrollWidth, overflowX:cs.overflowX,
            minWidth:cs.minWidth, whiteSpace:cs.whiteSpace};
        }).filter(x=>x.right>vw+1 || x.left < -1 || (x.scrollWidth>x.clientWidth+1 && x.overflowX==='visible'))
          .sort((a,b)=>b.right-a.right).slice(0,30).map(({el,...x})=>x);
        return {clientWidth:vw, scrollWidth:document.documentElement.scrollWidth, bodyScrollWidth:document.body.scrollWidth, offenders};
      }''')
      print('\\n###',path)
      print(json.dumps(data, ensure_ascii=False, indent=2))
      print('errors', errors)
    await browser.close()

asyncio.run(main())
'@ | python -" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 6108ms:

### pages/oro.html
{
  "clientWidth": 390,
  "scrollWidth": 635,
  "bodyScrollWidth": 634,
  "offenders": [
    {
      "tag": "ul",
      "cls": "",
      "id": "",
      "left": 14,
      "right": 1099.8,
      "width": 1085.8,
      "clientWidth": 1086,
      "scrollWidth": 1086,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 940,
      "right": 1099.8,
      "width": 159.8,
      "clientWidth": 160,
      "scrollWidth": 160,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 940,
      "right": 1099.8,
      "width": 159.8,
      "clientWidth": 160,
      "scrollWidth": 160,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 693.6,
      "right": 935,
      "width": 241.4,
      "clientWidth": 241,
      "scrollWidth": 241,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 693.6,
      "right": 935,
      "width": 241.4,
      "clientWidth": 241,
      "scrollWidth": 241,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 476.9,
      "right": 688.6,
      "width": 211.7,
      "clientWidth": 212,
      "scrollWidth": 212,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 476.9,
      "right": 688.6,
      "width": 211.7,
      "clientWidth": 212,
      "scrollWidth": 212,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "section",
      "cls": "analysis-panel surface surface-pad",
      "id": "panel-automatic-air",
      "left": 14,
      "right": 634,
      "width": 620,
      "clientWidth": 618,
      "scrollWidth": 618,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "section-heading",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "span",
      "cls": "status-chip",
      "id": "",
      "left": 447.8,
      "right": 615,
      "width": 167.2,
      "clientWidth": 167,
      "scrollWidth": 167,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "analysis-filter-grid",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "p",
      "cls": "analysis-message",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "stats-grid",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "stat-card",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "stat-card",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "stat-card stat-card--accent",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "stat-card",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "stat-card",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "chart-grid",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "section",
      "cls": "chart-panel",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "section",
      "cls": "chart-panel",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "section",
      "cls": "chart-panel",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "data-table-wrap",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "auto",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "table",
      "cls": "data-table",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "580px",
      "whiteSpace": "normal"
    },
    {
      "tag": "caption",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "thead",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "th",
      "cls": "",
      "id": "",
      "left": 514.4,
      "right": 614,
      "width": 99.6,
      "clientWidth": 100,
      "scrollWidth": 100,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "tbody",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    }
  ]
}
errors []

### pages/gyvoji_gamta.html
{
  "clientWidth": 390,
  "scrollWidth": 635,
  "bodyScrollWidth": 634,
  "offenders": [
    {
      "tag": "ul",
      "cls": "",
      "id": "",
      "left": 14,
      "right": 1099.8,
      "width": 1085.8,
      "clientWidth": 1086,
      "scrollWidth": 1086,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 940,
      "right": 1099.8,
      "width": 159.8,
      "clientWidth": 160,
      "scrollWidth": 160,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 940,
      "right": 1099.8,
      "width": 159.8,
      "clientWidth": 160,
      "scrollWidth": 160,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 693.6,
      "right": 935,
      "width": 241.4,
      "clientWidth": 241,
      "scrollWidth": 241,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 693.6,
      "right": 935,
      "width": 241.4,
      "clientWidth": 241,
      "scrollWidth": 241,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 476.9,
      "right": 688.6,
      "width": 211.7,
      "clientWidth": 212,
      "scrollWidth": 212,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 476.9,
      "right": 688.6,
      "width": 211.7,
      "clientWidth": 212,
      "scrollWidth": 212,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "section",
      "cls": "surface surface-pad",
      "id": "",
      "left": 14,
      "right": 634,
      "width": 620,
      "clientWidth": 618,
      "scrollWidth": 618,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "notice",
      "id": "",
      "left": 14,
      "right": 634,
      "width": 620,
      "clientWidth": 617,
      "scrollWidth": 617,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "span",
      "cls": "",
      "id": "",
      "left": 140.2,
      "right": 618,
      "width": 477.8,
      "clientWidth": 478,
      "scrollWidth": 478,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "section-heading",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "span",
      "cls": "status-chip",
      "id": "wildlife-status",
      "left": 372,
      "right": 615,
      "width": 243,
      "clientWidth": 243,
      "scrollWidth": 243,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "subsection-switcher",
      "id": "wildlife-tabs",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "",
      "id": "wildlife-panel",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "analysis-filter-grid",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "section",
      "cls": "chart-panel",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "data-table-wrap",
      "id": "wildlife-table",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "auto",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "table",
      "cls": "data-table",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "580px",
      "whiteSpace": "normal"
    },
    {
      "tag": "caption",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "thead",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "th",
      "cls": "",
      "id": "",
      "left": 370.4,
      "right": 614,
      "width": 243.6,
      "clientWidth": 244,
      "scrollWidth": 244,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "tbody",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 370.4,
      "right": 614,
      "width": 243.6,
      "clientWidth": 244,
      "scrollWidth": 244,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 370.4,
      "right": 614,
      "width": 243.6,
      "clientWidth": 244,
      "scrollWidth": 244,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 370.4,
      "right": 614,
      "width": 243.6,
      "clientWidth": 244,
      "scrollWidth": 244,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    }
  ]
}
errors []

### pages/truksmas.html
{
  "clientWidth": 390,
  "scrollWidth": 635,
  "bodyScrollWidth": 634,
  "offenders": [
    {
      "tag": "ul",
      "cls": "",
      "id": "",
      "left": 14,
      "right": 1099.8,
      "width": 1085.8,
      "clientWidth": 1086,
      "scrollWidth": 1086,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 940,
      "right": 1099.8,
      "width": 159.8,
      "clientWidth": 160,
      "scrollWidth": 160,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 940,
      "right": 1099.8,
      "width": 159.8,
      "clientWidth": 160,
      "scrollWidth": 160,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 693.6,
      "right": 935,
      "width": 241.4,
      "clientWidth": 241,
      "scrollWidth": 241,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 693.6,
      "right": 935,
      "width": 241.4,
      "clientWidth": 241,
      "scrollWidth": 241,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 476.9,
      "right": 688.6,
      "width": 211.7,
      "clientWidth": 212,
      "scrollWidth": 212,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 476.9,
      "right": 688.6,
      "width": 211.7,
      "clientWidth": 212,
      "scrollWidth": 212,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "section",
      "cls": "analysis-panel surface surface-pad",
      "id": "",
      "left": 14,
      "right": 634,
      "width": 620,
      "clientWidth": 618,
      "scrollWidth": 618,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "section-heading",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "span",
      "cls": "status-chip",
      "id": "",
      "left": 437.6,
      "right": 615,
      "width": 177.4,
      "clientWidth": 177,
      "scrollWidth": 177,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "analysis-filter-grid",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "p",
      "cls": "analysis-message",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "stats-grid",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "stat-card",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "stat-card",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "stat-card stat-card--accent",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "stat-card",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "stat-card",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "notice",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 579,
      "scrollWidth": 579,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "chart-grid",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 582,
      "scrollWidth": 582,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "section",
      "cls": "chart-panel",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "section",
      "cls": "chart-panel",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "section",
      "cls": "chart-panel",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "div",
      "cls": "data-table-wrap",
      "id": "",
      "left": 33,
      "right": 615,
      "width": 582,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "auto",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "table",
      "cls": "data-table",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "580px",
      "whiteSpace": "normal"
    },
    {
      "tag": "caption",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "thead",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "th",
      "cls": "",
      "id": "",
      "left": 512.5,
      "right": 614,
      "width": 101.5,
      "clientWidth": 102,
      "scrollWidth": 102,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "tbody",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "clientWidth": 580,
      "scrollWidth": 580,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    }
  ]
}
errors []

### pages/ataskaitos.html
{
  "clientWidth": 390,
  "scrollWidth": 423,
  "bodyScrollWidth": 423,
  "offenders": [
    {
      "tag": "ul",
      "cls": "",
      "id": "",
      "left": 14,
      "right": 1099.8,
      "width": 1085.8,
      "clientWidth": 1086,
      "scrollWidth": 1086,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 940,
      "right": 1099.8,
      "width": 159.8,
      "clientWidth": 160,
      "scrollWidth": 160,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 940,
      "right": 1099.8,
      "width": 159.8,
      "clientWidth": 160,
      "scrollWidth": 160,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 693.6,
      "right": 935,
      "width": 241.4,
      "clientWidth": 241,
      "scrollWidth": 241,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 693.6,
      "right": 935,
      "width": 241.4,
      "clientWidth": 241,
      "scrollWidth": 241,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 476.9,
      "right": 688.6,
      "width": 211.7,
      "clientWidth": 212,
      "scrollWidth": 212,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 476.9,
      "right": 688.6,
      "width": 211.7,
      "clientWidth": 212,
      "scrollWidth": 212,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 115.3,
      "right": 471.9,
      "width": 356.5,
      "clientWidth": 357,
      "scrollWidth": 357,
      "overflowX": "visible",
      "minWidth": "auto",
      "whiteSpace": "normal"
    },
    {
      "tag": "details",
      "cls": "",
      "id": "",
      "left": 115.3,
      "right": 471.9,
      "width": 356.5,
      "clientWidth": 357,
      "scrollWidth": 357,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "summary",
      "cls": "",
      "id": "",
      "left": 115.3,
      "right": 471.9,
      "width": 356.5,
      "clientWidth": 357,
      "scrollWidth": 357,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "ul",
      "cls": "",
      "id": "",
      "left": 129.3,
      "right": 457.9,
      "width": 328.5,
      "clientWidth": 327,
      "scrollWidth": 327,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "nav-group-label",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "nav-group-label",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "a",
      "cls": "",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    },
    {
      "tag": "li",
      "cls": "",
      "id": "",
      "left": 138.3,
      "right": 448.9,
      "width": 310.5,
      "clientWidth": 311,
      "scrollWidth": 311,
      "overflowX": "visible",
      "minWidth": "0px",
      "whiteSpace": "normal"
    }
  ]
}
errors []

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command '$c=Get-Content '"'demo/css/sections.css'; for("'$i=1;$i -le 164;$i++){ '"'{0,4}: {1}' -f "'$i,$c[$i-1] }; Write-Output "`n--- key markup ---"; rg -n -o ".{0,120}(analysis-tabs|analysis-panel|periodic-layout|content-stack|surface surface-pad).{0,240}" demo/pages/oro.html demo/pages/gyvoji_gamta.html demo/pages/truksmas.html demo/pages/ataskaitos.html' in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 163ms:
   1: /* Shared phase-2 public portal views */
   2: .page-hero { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(260px, .65fr); gap: clamp(24px, 6vw, 88px); align-items: end; padding: clamp(24px, 5vw, 64px) 0 30px; border-bottom: 1px solid var(--line); }
   3: .page-hero h1 { max-width: 850px; font-size: clamp(2.1rem, 5vw, 4.8rem); }
   4: .page-hero .lede { margin: 18px 0 0; }
   5: .page-hero-aside { padding: 17px 0 0 20px; border-left: 3px solid var(--sun-500); }
   6: .page-hero-aside strong { display: block; color: var(--land-900); font-size: .93rem; font-weight: 600; }
   7: .page-hero-aside p { margin: 7px 0 0; color: var(--ink-600); font-size: .78rem; }
   8: .page-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
   9: .content-stack { display: grid; gap: 22px; padding-top: 24px; }
  10: .surface { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); }
  11: .surface-pad { padding: clamp(18px, 3vw, 30px); }
  12: .section-heading { display: flex; justify-content: space-between; align-items: start; gap: 20px; margin-bottom: 18px; }
  13: .section-heading h2 { font-size: clamp(1.35rem, 3vw, 2.2rem); }
  14: .section-heading p { max-width: 62ch; margin: 8px 0 0; color: var(--ink-600); font-size: .86rem; }
  15: .eyebrow { color: var(--land-700); font-size: .68rem; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; }
  16: .muted { color: var(--ink-600); font-size: .82rem; }
  17: .fine-print { color: var(--ink-500); font-size: .72rem; }
  18: .notice { display: flex; gap: 12px; padding: 14px 16px; background: var(--shore-100); border-left: 3px solid var(--sun-500); color: var(--ink-800); font-size: .8rem; }
  19: .notice strong { color: var(--land-900); font-weight: 600; }
  20: .analysis-tabs { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 24px; border-bottom: 1px solid var(--line); }
  21: .analysis-tab { min-height: 46px; padding: 9px 14px; color: var(--ink-600); background: transparent; border: 0; border-bottom: 3px solid transparent; cursor: pointer; font-size: .78rem; font-weight: 600; text-align: left; }
  22: .analysis-tab:hover { color: var(--sea-900); background: var(--shore-100); }
  23: .analysis-tab[aria-selected="true"] { color: var(--sea-900); border-bottom-color: var(--sun-500); }
  24: .analysis-panel[hidden] { display: none; }
  25: .analysis-filter-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; padding: 18px; background: var(--surface-muted); border: 1px solid var(--line); }
  26: .field-group { min-width: 0; }
  27: .field-group--wide { grid-column: span 2; }
  28: .field-label { display: block; margin-bottom: 6px; color: var(--ink-800); font-size: .72rem; font-weight: 600; }
  29: .field-help { margin: 5px 0 0; color: var(--ink-500); font-size: .68rem; line-height: 1.4; }
  30: .field, .select-field, .analysis-filter-grid input[type="search"], .analysis-filter-grid input[type="email"], .analysis-filter-grid input[type="text"] { width: 100%; min-height: 43px; padding: 8px 10px; color: var(--ink-950); background: var(--surface); border: 1px solid var(--line-strong); border-radius: var(--radius-sm); }
  31: .field:focus, .select-field:focus, .analysis-filter-grid input:focus { border-color: var(--sea-700); }
  32: .select-field[multiple] { min-height: 112px; padding: 5px; }
  33: .checkline { display: flex; align-items: center; gap: 8px; min-height: 43px; color: var(--ink-800); font-size: .78rem; }
  34: .checkline input, .checkbox-grid input { width: 18px; height: 18px; accent-color: var(--sea-800); }
  35: .filter-actions { display: flex; align-items: end; gap: 8px; grid-column: 1 / -1; padding-top: 3px; }
  36: .analysis-message { margin: 13px 0 0; color: var(--ink-600); font-size: .76rem; }
  37: .stats-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; margin: 22px 0; }
  38: .stat-card { min-width: 0; padding: 14px; background: var(--surface-muted); border-top: 3px solid var(--line-strong); }
  39: .stat-card--accent { border-top-color: var(--sun-500); }
  40: .stat-label { display: block; color: var(--ink-600); font-size: .68rem; }
  41: .stat-value { display: block; margin-top: 6px; color: var(--sea-950); font-size: clamp(1.15rem, 2.3vw, 1.8rem); font-weight: 500; line-height: 1.1; }
  42: .stat-note { display: block; margin-top: 5px; color: var(--ink-500); font-size: .66rem; }
  43: .trend-up { color: #a13e00; }
  44: .trend-down { color: var(--land-900); }
  45: .trend-flat { color: var(--ink-600); }
  46: .chart-grid { display: grid; grid-template-columns: minmax(0, 1.35fr) minmax(280px, .65fr); gap: 18px; margin-top: 18px; }
  47: .chart-panel { min-width: 0; padding: 18px; background: var(--surface); border: 1px solid var(--line); }
  48: .chart-panel h3 { font-size: 1rem; }
  49: .chart-panel p { margin: 6px 0 14px; color: var(--ink-600); font-size: .72rem; }
  50: .chart-wrap { position: relative; height: 300px; }
  51: .chart-wrap--short { height: 250px; }
  52: .chart-wrap canvas { width: 100% !important; height: 100% !important; }
  53: .chart-caption { margin: 10px 0 0; color: var(--ink-500); font-size: .68rem; }
  54: .chart-legend { display: flex; flex-wrap: wrap; gap: 8px 16px; margin-top: 10px; color: var(--ink-600); font-size: .68rem; }
  55: .legend-key { display: inline-flex; align-items: center; gap: 6px; }
  56: .legend-key::before { content: ""; display: inline-block; width: 18px; height: 3px; background: var(--sea-800); }
  57: .legend-key--limit::before { background: var(--poor); border-top: 1px dashed var(--poor); }
  58: .correlation-copy { display: grid; grid-template-columns: auto 1fr; gap: 12px; align-items: center; margin-bottom: 12px; padding: 12px; background: var(--shore-100); }
  59: .correlation-r { color: var(--sea-950); font-size: 2rem; font-weight: 500; line-height: 1; }
  60: .correlation-copy p { margin: 0; color: var(--ink-800); font-size: .74rem; }
  61: .data-table-wrap { overflow-x: auto; border: 1px solid var(--line); }
  62: .data-table { width: 100%; min-width: 580px; border-collapse: collapse; font-size: .74rem; }
  63: .data-table caption { padding: 12px 14px; color: var(--ink-600); font-size: .72rem; text-align: left; }
  64: .data-table th, .data-table td { padding: 10px 12px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: top; }
  65: .data-table th { color: var(--ink-600); background: var(--surface-muted); font-size: .68rem; font-weight: 600; }
  66: .data-table td { color: var(--ink-800); }
  67: .data-table tr:last-child td { border-bottom: 0; }
  68: .value-exceedance { color: #a13e00; font-weight: 600; }
  69: .periodic-layout { display: grid; grid-template-columns: minmax(190px, .3fr) minmax(0, 1fr); gap: 22px; }
  70: .periodic-filters { padding: 16px; background: var(--surface-muted); border: 1px solid var(--line); }
  71: .periodic-filters .field-group + .field-group { margin-top: 14px; }
  72: .periodic-results { min-width: 0; }
  73: .periodic-summary { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-bottom: 16px; }
  74: .periodic-summary .stat-card { padding: 12px; }
  75: .periodic-chart { margin-top: 18px; }
  76: .subsection-switcher { display: flex; flex-wrap: wrap; gap: 7px; margin-bottom: 18px; }
  77: .subsection-switcher button { min-height: 42px; padding: 8px 11px; color: var(--ink-800); background: var(--surface); border: 1px solid var(--line-strong); border-radius: 3px; cursor: pointer; font-size: .72rem; font-weight: 600; }
  78: .subsection-switcher button:hover, .subsection-switcher button[aria-selected="true"] { color: var(--sea-950); background: var(--shore-200); border-color: var(--land-500); }
  79: .score-table .score { min-width: 105px; }
  80: .score-meter { display: grid; grid-template-columns: repeat(10, 1fr); gap: 2px; min-width: 95px; }
  81: .score-meter span { height: 13px; background: var(--line); }
  82: .score-meter span.is-filled { background: var(--land-500); }
  83: .score-meter span.is-low { background: var(--moderate); }
  84: .score-meter span.is-poor { background: var(--poor); }
  85: .condition-tag { display: inline-flex; padding: 4px 7px; border-radius: 2px; font-size: .64rem; font-weight: 600; }
  86: .condition-good { color: var(--land-900); background: var(--shore-200); }
  87: .condition-medium { color: #695500; background: #fff4ad; }
  88: .condition-poor { color: #7d2600; background: #ffd8c7; }
  89: .report-list { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
  90: .report-link { display: flex; min-height: 120px; flex-direction: column; justify-content: space-between; padding: 15px; color: var(--ink-800); background: var(--surface); border: 1px solid var(--line); text-decoration: none; }
  91: .report-link:hover { color: var(--ink-800); border-color: var(--land-500); box-shadow: var(--shadow-sm); }
  92: .report-link strong { color: var(--sea-900); font-size: 1.1rem; font-weight: 500; }
  93: .report-link span { color: var(--ink-500); font-size: .7rem; }
  94: .report-toolbar { display: flex; flex-wrap: wrap; gap: 8px; justify-content: space-between; align-items: center; margin: 18px 0; }
  95: .report-sheet { max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
  96: .report-cover { padding-bottom: 24px; border-bottom: 3px solid var(--sun-500); }
  97: .report-cover h2 { margin-top: 10px; }
  98: .report-section { padding: 20px 0; border-bottom: 1px solid var(--line); }
  99: .report-section:last-child { border-bottom: 0; }
 100: .report-section h3 { color: var(--sea-900); }
 101: .report-section .data-table { min-width: 0; }
 102: .report-chart { height: 220px; margin-top: 14px; }
 103: .wizard-steps { display: flex; gap: 5px; margin-bottom: 20px; counter-reset: wizard; }
 104: .wizard-step { flex: 1; padding: 11px 12px; color: var(--ink-600); background: var(--surface-muted); border-bottom: 3px solid var(--line); font-size: .73rem; }
 105: .wizard-step::before { counter-increment: wizard; content: counter(wizard) ". "; color: var(--sea-900); font-weight: 600; }
 106: .wizard-step.is-active { color: var(--sea-950); background: var(--shore-200); border-bottom-color: var(--sun-500); }
 107: .wizard-panel[hidden] { display: none; }
 108: .checkbox-groups { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
 109: .checkbox-group { padding: 15px; border: 1px solid var(--line); }
 110: .checkbox-group h3 { margin-bottom: 10px; font-size: .93rem; }
 111: .checkbox-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; max-height: 270px; overflow: auto; }
 112: .checkbox-grid label { display: flex; align-items: flex-start; gap: 7px; color: var(--ink-800); font-size: .73rem; }
 113: .selection-summary { display: grid; gap: 9px; padding: 15px; background: var(--shore-100); border: 1px solid var(--shore-300); }
 114: .selection-summary strong { color: var(--land-900); font-weight: 600; }
 115: .demo-code { display: inline-block; padding: 7px 10px; color: var(--sea-950); background: var(--surface); border: 1px dashed var(--sea-700); font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: .9rem; font-weight: 600; letter-spacing: .08em; }
 116: .success-panel { padding: 20px; background: var(--shore-100); border-left: 4px solid var(--land-700); }
 117: .erase-box { margin-top: 22px; padding-top: 18px; border-top: 1px solid var(--line); }
 118: .erase-box form { display: flex; flex-wrap: wrap; gap: 8px; max-width: 650px; }
 119: .erase-box input { flex: 1 1 260px; }
 120: .text-page { max-width: 980px; }
 121: .text-page h2 { margin-top: 34px; font-size: 1.45rem; }
 122: .text-page h3 { margin-top: 23px; color: var(--land-900); font-size: 1rem; }
 123: .text-page p, .text-page li { color: var(--ink-800); font-size: .88rem; }
 124: .text-page ul, .text-page ol { padding-left: 1.25rem; }
 125: .contact-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; margin-top: 16px; }
 126: .contact-card { padding: 15px; background: var(--surface-muted); border-top: 3px solid var(--land-500); }
 127: .contact-card strong { display: block; color: var(--sea-900); font-size: .86rem; }
 128: .contact-card p { margin: 7px 0 0; font-size: .76rem; }
 129: .howto-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
 130: .howto { padding: 18px; border: 1px solid var(--line); }
 131: .howto .step-number { display: inline-grid; place-items: center; width: 30px; height: 30px; margin-bottom: 12px; color: var(--sea-950); background: var(--sun-500); font-weight: 600; }
 132: .howto h3 { margin-bottom: 8px; }
 133: .privacy-version { display: inline-block; padding: 5px 8px; color: var(--land-900); background: var(--shore-200); font-size: .7rem; font-weight: 600; }
 134: .main-nav details ul ul { position: static; width: auto; margin: 2px 0 0; padding: 0 0 0 10px; border: 0; border-radius: 0; box-shadow: none; }
 135: .main-nav details ul ul a { min-height: 34px; padding: 6px 8px; font-size: .71rem; }
 136: .main-nav .nav-group-label { display: block; padding: 7px 8px 3px; color: var(--land-700); font-size: .68rem; font-weight: 600; }
 137: 
 138: @media (max-width: 980px) {
 139:   .page-hero { grid-template-columns: 1fr; gap: 18px; }
 140:   .page-hero-aside { padding: 15px 0 0; border-top: 3px solid var(--sun-500); border-left: 0; }
 141:   .analysis-filter-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
 142:   .chart-grid { grid-template-columns: 1fr; }
 143:   .report-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
 144:   .periodic-layout { grid-template-columns: 1fr; }
 145: }
 146: @media (max-width: 720px) {
 147:   .analysis-filter-grid, .stats-grid, .checkbox-groups, .howto-grid, .contact-grid { grid-template-columns: 1fr; }
 148:   .field-group--wide { grid-column: auto; }
 149:   .stats-grid { gap: 8px; }
 150:   .stat-card { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 6px 12px; align-items: center; }
 151:   .stat-note { grid-column: 1 / -1; margin-top: 0; }
 152:   .periodic-summary { grid-template-columns: 1fr; }
 153:   .report-list { grid-template-columns: 1fr; }
 154:   .wizard-steps { display: grid; grid-template-columns: 1fr; }
 155:   .checkbox-grid { grid-template-columns: 1fr; }
 156: }
 157: @media print {
 158:   .site-header, .site-footer, .page-actions, .report-toolbar, .report-list, .skip-link { display: none !important; }
 159:   body { background: #fff; }
 160:   .page-shell { width: 100%; padding: 0; }
 161:   .report-sheet { max-width: none; padding: 0; border: 0; box-shadow: none; }
 162:   .report-section { break-inside: avoid; }
 163: }
 164: 

--- key markup ---
demo/pages/ataskaitos.html:4:inkite naršyklės PDF spausdintuvą. XLSX ir CSV eksportas paliktas integracijos etapui.</p></aside></section><div class="content-stack"><section class="surface surface-pad"><div class="section-heading"><div><span class="eyebrow">2022–2025 · viešos suvestinės</span><h2>Pasirinkite metus</h2><p>Nuorodos pateikiamos atsisiuntimo stiliumi, tačiau šiame demo jos atidaro gyvai 
demo/pages/gyvoji_gamta.html:4: rodo pasirinktų taškų vidurkį, o lentelė leidžia patikrinti kiekvieną tašką atskirai.</p></aside></section><div class="content-stack"><section class="surface surface-pad"><div class="section-heading"><div><span class="eyebrow">7 potemės · metiniai pjūviai</span><h2 id="wildlife-active-title">Augalijos monitoringas</h2><p id="wildlife-active-description">Rūšių skaičius i
demo/pages/oro.html:27:    <div class="analysis-tabs" role="tablist" aria-label="Aplinkos oro monitoringo duomenų tipas"><button class="analysis-tab" id="tab-automatic-air" type="button" role="tab" aria-selected="true" aria-controls="panel-automatic-air" data-analysis-tab="automatic-air">Aut
demo/pages/oro.html:28:    <div class="content-stack">
demo/pages/oro.html:29:      <section class="analysis-panel surface surface-pad" data-analysis-panel="automatic-air" id="panel-automatic-air" role="tabpanel" aria-labelledby="tab-automatic-air" tabindex="0" data-analysis-section="automatic-air" data-default-period="90d"><div class="section-heading"><div><span class="eyebrow">Automatiniai 
demo/pages/oro.html:47:      <section class="analysis-panel surface surface-pad" data-analysis-panel="laboratory-air" id="panel-laboratory-air" role="tabpanel" aria-labelledby="tab-laboratory-air" tabindex="0" data-analysis-section="laboratory-air" data-default-period="730d" hidden><div class="section-heading"><div><span class="eyebrow">P
demo/pages/truksmas.html:4:(10^(Lᵢ/10))). Taip keli garsūs įvykiai nėra paslepiami paprastu aritmetiniu vidurkiu.</p></aside></section><div class="content-stack"><section class="analysis-panel surface surface-pad" data-analysis-section="noise" data-default-period="730d"><div class="section-heading"><div><span class="eyebrow">7 rodikliai · dBA</span><h2>Triukšmo duomenų analizė</h2><p>Filtruokite p

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "Get-Content -Raw 'demo/js/pages/common.js'; rg -n \"open|details\" demo/js demo/pages/*.html demo/index.html" in C:\Users\Joosep\tenders\klaipeda-environment
 exited 1 in 111ms:
export const LT_DATE = new Intl.DateTimeFormat("lt-LT", { dateStyle: "medium", timeZone: "Europe/Vilnius" });
export const LT_DATE_TIME = new Intl.DateTimeFormat("lt-LT", { dateStyle: "medium", timeStyle: "short", timeZone: "Europe/Vilnius" });

export function formatDate(value) {
  return value ? LT_DATE.format(new Date(value)) : "Nėra duomenų";
}

export function formatDateTime(value) {
  return value ? LT_DATE_TIME.format(new Date(value)) : "Nėra duomenų";
}

export function formatNumber(value, precision = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) return "–";
  return Number(value).toLocaleString("lt-LT", { maximumFractionDigits: precision, minimumFractionDigits: precision });
}

export function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

export function rangeForPeriod(period, demoNow) {
  const days = { "30d": 30, "90d": 90, "365d": 365, "730d": 730, all: 730 }[period] ?? 90;
  const to = new Date(demoNow);
  return { from: new Date(to.getTime() - days * 86400000), to };
}

export function selectedValues(select) {
  return [...(select?.selectedOptions || [])].map((option) => option.value);
}

export function setOptions(select, items, { value = (item) => item.id, label = (item) => item.name, selected = [] } = {}) {
  if (!select) return;
  select.innerHTML = items.map((item) => `<option value="${escapeHtml(value(item))}"${selected.includes(value(item)) ? " selected" : ""}>${escapeHtml(label(item))}</option>`).join("");
}

export function destroyChart(chart) {
  if (chart && typeof chart.destroy === "function") chart.destroy();
  return null;
}

rg: demo/pages/*.html: The filename, directory name, or volume label syntax is incorrect. (os error 123)
demo/index.html:24:        <li><details><summary>KMS AMIS</summary><ul><li><a href="pages/bendra-info.html">Bendra informacija</a></li><li><a href="pages/vadovas.html">Naudotojo vadovas</a></li></ul></details></li>
demo/index.html:25:        <li><details><summary>Klaipėdos miesto savivaldybės aplinkos monitoringas</summary><ul>
demo/index.html:28:        </ul></details></li>
demo/js\pages\map.js:32:const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" });
demo/js\pages\map.js:137:    layer.bindPopup(`<div class="popup-kicker">Mikrorajonas</div><h3 class="popup-title">${escapeHtml(feature.properties.name)}</h3><p class="popup-meta">${escapeHtml(parameterItem.name)} · ${values.length ? `${formatValue(mean, parameterItem)} vidurkis` : "Nėra šio parametro taškų"}</p>`).openPopup();
demo/js\pages\map.js:166:map.on("popupopen", (event) => {

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "@'
import asyncio, json
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(headless=True)
    for path in ['pages/oro.html','pages/gyvoji_gamta.html','pages/truksmas.html','pages/ataskaitos.html']:
      pg=await b.new_page(viewport={'width':390,'height':844}, is_mobile=True, has_touch=True)
      await pg.goto('http://localhost:8000/'+path, wait_until='networkidle')
      await pg.wait_for_timeout(300)
      x=await pg.evaluate('''() => {
        const info=s=>[...document.querySelectorAll(s)].map((e,i)=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e);return {i,tag:e.tagName,cls:e.className,open:e.open,left:r.left,right:r.right,width:r.width,client:e.clientWidth,scroll:e.scrollWidth,min:c.minWidth,overflow:c.overflowX,display:c.display,position:c.position}});
        return {doc:[document.documentElement.clientWidth,document.documentElement.scrollWidth], header:info('.header-inner'), nav:info('.main-nav'), navul:info('.main-nav > ul'), details:info('.main-nav details'), shell:info('.page-shell'), stack:info('.content-stack'), surface:info('.content-stack > *'), report:info('.report-sheet'), chart:info('.report-chart'), canvas:info('canvas')};
      }''')
      print(path, json.dumps(x,ensure_ascii=False))
      await pg.close()
    await b.close()
asyncio.run(main())
'@ | python -" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 4975ms:
pages/oro.html {"doc": [390, 635], "header": [{"i": 0, "tag": "DIV", "cls": "header-inner", "open": null, "left": 14, "right": 376, "width": 362, "client": 362, "scroll": 362, "min": "0px", "overflow": "visible", "display": "grid", "position": "static"}], "nav": [{"i": 0, "tag": "NAV", "cls": "main-nav", "open": null, "left": 14, "right": 376, "width": 362, "client": 362, "scroll": 1086, "min": "auto", "overflow": "auto", "display": "block", "position": "static"}], "navul": [{"i": 0, "tag": "UL", "cls": "", "open": null, "left": 14, "right": 1099.78125, "width": 1085.78125, "client": 1086, "scroll": 1086, "min": "0px", "overflow": "visible", "display": "flex", "position": "static"}], "details": [{"i": 0, "tag": "DETAILS", "cls": "", "open": false, "left": 14, "right": 110.34375, "width": 96.34375, "client": 96, "scroll": 96, "min": "0px", "overflow": "visible", "display": "block", "position": "relative"}, {"i": 1, "tag": "DETAILS", "cls": "", "open": false, "left": 115.34375, "right": 471.890625, "width": 356.546875, "client": 357, "scroll": 357, "min": "0px", "overflow": "visible", "display": "block", "position": "relative"}], "shell": [{"i": 0, "tag": "MAIN", "cls": "page-shell", "open": null, "left": 14, "right": 376, "width": 362, "client": 362, "scroll": 620, "min": "0px", "overflow": "visible", "display": "block", "position": "static"}], "stack": [{"i": 0, "tag": "DIV", "cls": "content-stack", "open": null, "left": 14, "right": 376, "width": 362, "client": 362, "scroll": 620, "min": "0px", "overflow": "visible", "display": "grid", "position": "static"}], "surface": [{"i": 0, "tag": "SECTION", "cls": "analysis-panel surface surface-pad", "open": null, "left": 14, "right": 634, "width": 620, "client": 618, "scroll": 618, "min": "auto", "overflow": "visible", "display": "block", "position": "static"}, {"i": 1, "tag": "SECTION", "cls": "analysis-panel surface surface-pad", "open": null, "left": 0, "right": 0, "width": 0, "client": 0, "scroll": 0, "min": "0px", "overflow": "visible", "display": "none", "position": "static"}], "report": [], "chart": [], "canvas": [{"i": 0, "tag": "CANVAS", "cls": "", "open": null, "left": 52, "right": 596, "width": 544, "client": 544, "scroll": 544, "min": "0px", "overflow": "clip", "display": "block", "position": "static"}, {"i": 1, "tag": "CANVAS", "cls": "", "open": null, "left": 52, "right": 596, "width": 544, "client": 544, "scroll": 544, "min": "0px", "overflow": "clip", "display": "block", "position": "static"}, {"i": 2, "tag": "CANVAS", "cls": "", "open": null, "left": 52, "right": 596, "width": 544, "client": 544, "scroll": 544, "min": "0px", "overflow": "clip", "display": "block", "position": "static"}, {"i": 3, "tag": "CANVAS", "cls": "", "open": null, "left": 0, "right": 0, "width": 0, "client": 0, "scroll": 0, "min": "0px", "overflow": "clip", "display": "inline", "position": "static"}, {"i": 4, "tag": "CANVAS", "cls": "", "open": null, "left": 0, "right": 0, "width": 0, "client": 0, "scroll": 0, "min": "0px", "overflow": "clip", "display": "inline", "position": "static"}, {"i": 5, "tag": "CANVAS", "cls": "", "open": null, "left": 0, "right": 0, "width": 0, "client": 0, "scroll": 0, "min": "0px", "overflow": "clip", "display": "inline", "position": "static"}]}
pages/gyvoji_gamta.html {"doc": [390, 635], "header": [{"i": 0, "tag": "DIV", "cls": "header-inner", "open": null, "left": 14, "right": 376, "width": 362, "client": 362, "scroll": 362, "min": "0px", "overflow": "visible", "display": "grid", "position": "static"}], "nav": [{"i": 0, "tag": "NAV", "cls": "main-nav", "open": null, "left": 14, "right": 376, "width": 362, "client": 362, "scroll": 1086, "min": "auto", "overflow": "auto", "display": "block", "position": "static"}], "navul": [{"i": 0, "tag": "UL", "cls": "", "open": null, "left": 14, "right": 1099.78125, "width": 1085.78125, "client": 1086, "scroll": 1086, "min": "0px", "overflow": "visible", "display": "flex", "position": "static"}], "details": [{"i": 0, "tag": "DETAILS", "cls": "", "open": false, "left": 14, "right": 110.34375, "width": 96.34375, "client": 96, "scroll": 96, "min": "0px", "overflow": "visible", "display": "block", "position": "relative"}, {"i": 1, "tag": "DETAILS", "cls": "", "open": false, "left": 115.34375, "right": 471.890625, "width": 356.546875, "client": 357, "scroll": 357, "min": "0px", "overflow": "visible", "display": "block", "position": "relative"}], "shell": [{"i": 0, "tag": "MAIN", "cls": "page-shell", "open": null, "left": 14, "right": 376, "width": 362, "client": 362, "scroll": 620, "min": "0px", "overflow": "visible", "display": "block", "position": "static"}], "stack": [{"i": 0, "tag": "DIV", "cls": "content-stack", "open": null, "left": 14, "right": 376, "width": 362, "client": 362, "scroll": 620, "min": "0px", "overflow": "visible", "display": "grid", "position": "static"}], "surface": [{"i": 0, "tag": "SECTION", "cls": "surface surface-pad", "open": null, "left": 14, "right": 634, "width": 620, "client": 618, "scroll": 618, "min": "auto", "overflow": "visible", "display": "block", "position": "static"}, {"i": 1, "tag": "DIV", "cls": "notice", "open": null, "left": 14, "right": 634, "width": 620, "client": 617, "scroll": 617, "min": "auto", "overflow": "visible", "display": "flex", "position": "static"}], "report": [], "chart": [], "canvas": [{"i": 0, "tag": "CANVAS", "cls": "", "open": null, "left": 52, "right": 596, "width": 544, "client": 544, "scroll": 544, "min": "0px", "overflow": "clip", "display": "block", "position": "static"}]}
pages/truksmas.html {"doc": [390, 635], "header": [{"i": 0, "tag": "DIV", "cls": "header-inner", "open": null, "left": 14, "right": 376, "width": 362, "client": 362, "scroll": 362, "min": "0px", "overflow": "visible", "display": "grid", "position": "static"}], "nav": [{"i": 0, "tag": "NAV", "cls": "main-nav", "open": null, "left": 14, "right": 376, "width": 362, "client": 362, "scroll": 1086, "min": "auto", "overflow": "auto", "display": "block", "position": "static"}], "navul": [{"i": 0, "tag": "UL", "cls": "", "open": null, "left": 14, "right": 1099.78125, "width": 1085.78125, "client": 1086, "scroll": 1086, "min": "0px", "overflow": "visible", "display": "flex", "position": "static"}], "details": [{"i": 0, "tag": "DETAILS", "cls": "", "open": false, "left": 14, "right": 110.34375, "width": 96.34375, "client": 96, "scroll": 96, "min": "0px", "overflow": "visible", "display": "block", "position": "relative"}, {"i": 1, "tag": "DETAILS", "cls": "", "open": false, "left": 115.34375, "right": 471.890625, "width": 356.546875, "client": 357, "scroll": 357, "min": "0px", "overflow": "visible", "display": "block", "position": "relative"}], "shell": [{"i": 0, "tag": "MAIN", "cls": "page-shell", "open": null, "left": 14, "right": 376, "width": 362, "client": 362, "scroll": 620, "min": "0px", "overflow": "visible", "display": "block", "position": "static"}], "stack": [{"i": 0, "tag": "DIV", "cls": "content-stack", "open": null, "left": 14, "right": 376, "width": 362, "client": 362, "scroll": 620, "min": "0px", "overflow": "visible", "display": "grid", "position": "static"}], "surface": [{"i": 0, "tag": "SECTION", "cls": "analysis-panel surface surface-pad", "open": null, "left": 14, "right": 634, "width": 620, "client": 618, "scroll": 618, "min": "auto", "overflow": "visible", "display": "block", "position": "static"}], "report": [], "chart": [], "canvas": [{"i": 0, "tag": "CANVAS", "cls": "", "open": null, "left": 52, "right": 596, "width": 544, "client": 544, "scroll": 544, "min": "0px", "overflow": "clip", "display": "block", "position": "static"}, {"i": 1, "tag": "CANVAS", "cls": "", "open": null, "left": 52, "right": 596, "width": 544, "client": 544, "scroll": 544, "min": "0px", "overflow": "clip", "display": "block", "position": "static"}, {"i": 2, "tag": "CANVAS", "cls": "", "open": null, "left": 52, "right": 596, "width": 544, "client": 544, "scroll": 544, "min": "0px", "overflow": "clip", "display": "block", "position": "static"}]}
pages/ataskaitos.html {"doc": [390, 427], "header": [{"i": 0, "tag": "DIV", "cls": "header-inner", "open": null, "left": 14, "right": 376, "width": 362, "client": 362, "scroll": 362, "min": "0px", "overflow": "visible", "display": "grid", "position": "static"}], "nav": [{"i": 0, "tag": "NAV", "cls": "main-nav", "open": null, "left": 14, "right": 376, "width": 362, "client": 362, "scroll": 1086, "min": "auto", "overflow": "auto", "display": "block", "position": "static"}], "navul": [{"i": 0, "tag": "UL", "cls": "", "open": null, "left": 14, "right": 1099.78125, "width": 1085.78125, "client": 1086, "scroll": 1086, "min": "0px", "overflow": "visible", "display": "flex", "position": "static"}], "details": [{"i": 0, "tag": "DETAILS", "cls": "", "open": false, "left": 14, "right": 110.34375, "width": 96.34375, "client": 96, "scroll": 96, "min": "0px", "overflow": "visible", "display": "block", "position": "relative"}, {"i": 1, "tag": "DETAILS", "cls": "", "open": false, "left": 115.34375, "right": 471.890625, "width": 356.546875, "client": 357, "scroll": 357, "min": "0px", "overflow": "visible", "display": "block", "position": "relative"}], "shell": [{"i": 0, "tag": "MAIN", "cls": "page-shell", "open": null, "left": 14, "right": 376, "width": 362, "client": 362, "scroll": 413, "min": "0px", "overflow": "visible", "display": "block", "position": "static"}], "stack": [{"i": 0, "tag": "DIV", "cls": "content-stack", "open": null, "left": 14, "right": 376, "width": 362, "client": 362, "scroll": 413, "min": "0px", "overflow": "visible", "display": "grid", "position": "static"}], "surface": [{"i": 0, "tag": "SECTION", "cls": "surface surface-pad", "open": null, "left": 14, "right": 427, "width": 413, "client": 411, "scroll": 411, "min": "auto", "overflow": "visible", "display": "block", "position": "static"}, {"i": 1, "tag": "SECTION", "cls": "report-sheet", "open": null, "left": 14, "right": 427, "width": 413, "client": 411, "scroll": 411, "min": "auto", "overflow": "visible", "display": "block", "position": "static"}], "report": [{"i": 0, "tag": "SECTION", "cls": "report-sheet", "open": null, "left": 14, "right": 427, "width": 413, "client": 411, "scroll": 411, "min": "auto", "overflow": "visible", "display": "block", "position": "static"}], "chart": [{"i": 0, "tag": "DIV", "cls": "report-chart", "open": null, "left": 35, "right": 406, "width": 371, "client": 371, "scroll": 371, "min": "0px", "overflow": "visible", "display": "block", "position": "static"}], "canvas": [{"i": 0, "tag": "CANVAS", "cls": "", "open": null, "left": 35, "right": 406, "width": 371, "client": 371, "scroll": 371, "min": "0px", "overflow": "clip", "display": "block", "position": "static"}]}

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "@'
import asyncio, json
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(headless=True)
    for path in ['pages/oro.html','pages/gyvoji_gamta.html','pages/truksmas.html','pages/ataskaitos.html']:
      pg=await b.new_page(viewport={'width':390,'height':844}, is_mobile=True, has_touch=True)
      await pg.goto('http://localhost:8000/'+path, wait_until='networkidle')
      await pg.add_style_tag(content='''.content-stack > * { min-width: 0 "'!important; } .surface { min-width:0 !important } .report-sheet{min-width:0!important}'"''')
      await pg.wait_for_timeout(400)
      x=await pg.evaluate('''() => ({doc:[document.documentElement.clientWidth,document.documentElement.scrollWidth], els:[...document.querySelectorAll('main *')].map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {tag:e.tagName.toLowerCase(),cls:String(e.className||''),id:e.id,left:+r.left.toFixed(1),right:+r.right.toFixed(1),width:+r.width.toFixed(1),client:e.clientWidth,scroll:e.scrollWidth,overflow:s.overflowX,min:s.minWidth,white:s.whiteSpace}}).filter(x=>x.right>391 || x.left < -1 || (x.scroll>x.client+1&&x.overflow==='visible')).sort((a,b)=>b.right-a.right).slice(0,20)}))''')
      print('\\n',path,json.dumps(x,ensure_ascii=False,indent=2))
      await pg.close()
    await b.close()
asyncio.run(main())
'@ | python -" in C:\Users\Joosep\tenders\klaipeda-environment
 exited 1 in 1867ms:
Traceback (most recent call last):
  File "<stdin>", line 15, in <module>
  File "C:\Users\Joosep\AppData\Local\Programs\Python\Python314\Lib\asyncio\runners.py", line 205, in run
    return runner.run(main)
           ~~~~~~~~~~^^^^^^
  File "C:\Users\Joosep\AppData\Local\Programs\Python\Python314\Lib\asyncio\runners.py", line 128, in run
    return self._loop.run_until_complete(task)
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^
  File "C:\Users\Joosep\AppData\Local\Programs\Python\Python314\Lib\asyncio\base_events.py", line 719, in run_until_complete
    return future.result()
           ~~~~~~~~~~~~~^^
  File "<stdin>", line 11, in main
  File "C:\Users\Joosep\AppData\Local\Programs\Python\Python314\Lib\site-packages\playwright\async_api\_generated.py", line 9421, in evaluate
    await self._impl_obj.evaluate(
        expression=expression, arg=mapping.to_impl(arg)
    )
  File "C:\Users\Joosep\AppData\Local\Programs\Python\Python314\Lib\site-packages\playwright\_impl\_page.py", line 474, in evaluate
    return await self._main_frame.evaluate(expression, arg)
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  File "C:\Users\Joosep\AppData\Local\Programs\Python\Python314\Lib\site-packages\playwright\_impl\_frame.py", line 346, in evaluate
    await self._channel.send(
    ...<6 lines>...
    )
  File "C:\Users\Joosep\AppData\Local\Programs\Python\Python314\Lib\site-packages\playwright\_impl\_connection.py", line 76, in send
    return await self._connection.wrap_api_call(
           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    ...<3 lines>...
    )
    ^
  File "C:\Users\Joosep\AppData\Local\Programs\Python\Python314\Lib\site-packages\playwright\_impl\_connection.py", line 632, in wrap_api_call
    raise rewrite_error(error, f"{parsed_st['apiName']}: {error}") from None
playwright._impl._errors.Error: Page.evaluate: SyntaxError: Unexpected token ')'
    at eval (<anonymous>)
    at UtilityScript.evaluate (<anonymous>:311:30)
    at UtilityScript.<anonymous> (<anonymous>:1:44)

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "@'
import asyncio, json
from playwright.async_api import async_playwright
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(headless=True)
    for path in ['pages/oro.html','pages/gyvoji_gamta.html','pages/truksmas.html','pages/ataskaitos.html']:
      pg=await b.new_page(viewport={'width':390,'height':844}, is_mobile=True, has_touch=True)
      await pg.goto('http://localhost:8000/'+path, wait_until='networkidle')
      await pg.add_style_tag(content='.content-stack > * { min-width: 0 "'!important; } .surface { min-width:0 !important } .report-sheet{min-width:0!important}'"')
      await pg.wait_for_timeout(400)
      x=await pg.evaluate('''() => {
        const els=[...document.querySelectorAll('main *')].map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {tag:e.tagName.toLowerCase(),cls:String(e.className||''),id:e.id,left:+r.left.toFixed(1),right:+r.right.toFixed(1),width:+r.width.toFixed(1),client:e.clientWidth,scroll:e.scrollWidth,overflow:s.overflowX,min:s.minWidth,white:s.whiteSpace}}).filter(x=>x.right>391 || x.left < -1 || (x.scroll>x.client+1&&x.overflow==='visible')).sort((a,b)=>b.right-a.right).slice(0,20);
        return {doc:[document.documentElement.clientWidth,document.documentElement.scrollWidth],els};
      }''')
      print('\\n',path,json.dumps(x,ensure_ascii=False,indent=2))
      await pg.close()
    await b.close()
asyncio.run(main())
'@ | python -" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 5438ms:

 pages/oro.html {
  "doc": [
    390,
    390
  ],
  "els": [
    {
      "tag": "table",
      "cls": "data-table",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "580px",
      "white": "normal"
    },
    {
      "tag": "caption",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "thead",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "th",
      "cls": "",
      "id": "",
      "left": 514.4,
      "right": 614,
      "width": 99.6,
      "client": 100,
      "scroll": 100,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tbody",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 514.4,
      "right": 614,
      "width": 99.6,
      "client": 100,
      "scroll": 100,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 514.4,
      "right": 614,
      "width": 99.6,
      "client": 100,
      "scroll": 100,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 514.4,
      "right": 614,
      "width": 99.6,
      "client": 100,
      "scroll": 100,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "th",
      "cls": "",
      "id": "",
      "left": 395.5,
      "right": 514.4,
      "width": 118.9,
      "client": 119,
      "scroll": 119,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 395.5,
      "right": 514.4,
      "width": 118.9,
      "client": 119,
      "scroll": 119,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 395.5,
      "right": 514.4,
      "width": 118.9,
      "client": 119,
      "scroll": 119,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 395.5,
      "right": 514.4,
      "width": 118.9,
      "client": 119,
      "scroll": 119,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "th",
      "cls": "",
      "id": "",
      "left": 278.4,
      "right": 395.5,
      "width": 117.1,
      "client": 117,
      "scroll": 117,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 278.4,
      "right": 395.5,
      "width": 117.1,
      "client": 117,
      "scroll": 117,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 278.4,
      "right": 395.5,
      "width": 117.1,
      "client": 117,
      "scroll": 117,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 278.4,
      "right": 395.5,
      "width": 117.1,
      "client": 117,
      "scroll": 117,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    }
  ]
}

 pages/gyvoji_gamta.html {
  "doc": [
    390,
    390
  ],
  "els": [
    {
      "tag": "table",
      "cls": "data-table",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "580px",
      "white": "normal"
    },
    {
      "tag": "caption",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "thead",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "th",
      "cls": "",
      "id": "",
      "left": 370.4,
      "right": 614,
      "width": 243.6,
      "client": 244,
      "scroll": 244,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tbody",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 370.4,
      "right": 614,
      "width": 243.6,
      "client": 244,
      "scroll": 244,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 370.4,
      "right": 614,
      "width": 243.6,
      "client": 244,
      "scroll": 244,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 370.4,
      "right": 614,
      "width": 243.6,
      "client": 244,
      "scroll": 244,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 370.4,
      "right": 614,
      "width": 243.6,
      "client": 244,
      "scroll": 244,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 370.4,
      "right": 614,
      "width": 243.6,
      "client": 244,
      "scroll": 244,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 370.4,
      "right": 614,
      "width": 243.6,
      "client": 244,
      "scroll": 244,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 370.4,
      "right": 614,
      "width": 243.6,
      "client": 244,
      "scroll": 244,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    }
  ]
}

 pages/truksmas.html {
  "doc": [
    390,
    390
  ],
  "els": [
    {
      "tag": "table",
      "cls": "data-table",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "580px",
      "white": "normal"
    },
    {
      "tag": "caption",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "thead",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "th",
      "cls": "",
      "id": "",
      "left": 512.5,
      "right": 614,
      "width": 101.5,
      "client": 102,
      "scroll": 102,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tbody",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 512.5,
      "right": 614,
      "width": 101.5,
      "client": 102,
      "scroll": 102,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 512.5,
      "right": 614,
      "width": 101.5,
      "client": 102,
      "scroll": 102,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "tr",
      "cls": "",
      "id": "",
      "left": 34,
      "right": 614,
      "width": 580,
      "client": 580,
      "scroll": 580,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 512.5,
      "right": 614,
      "width": 101.5,
      "client": 102,
      "scroll": 102,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "th",
      "cls": "",
      "id": "",
      "left": 382.4,
      "right": 512.5,
      "width": 130.1,
      "client": 130,
      "scroll": 130,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 382.4,
      "right": 512.5,
      "width": 130.1,
      "client": 130,
      "scroll": 130,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 382.4,
      "right": 512.5,
      "width": 130.1,
      "client": 130,
      "scroll": 130,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "td",
      "cls": "",
      "id": "",
      "left": 382.4,
      "right": 512.5,
      "width": 130.1,
      "client": 130,
      "scroll": 130,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "option",
      "cls": "",
      "id": "",
      "left": 58,
      "right": 332,
      "width": 274,
      "client": 274,
      "scroll": 310,
      "overflow": "visible",
      "min": "0px",
      "white": "nowrap"
    },
    {
      "tag": "option",
      "cls": "",
      "id": "",
      "left": 58,
      "right": 332,
      "width": 274,
      "client": 274,
      "scroll": 387,
      "overflow": "visible",
      "min": "0px",
      "white": "nowrap"
    },
    {
      "tag": "option",
      "cls": "",
      "id": "",
      "left": 58,
      "right": 332,
      "width": 274,
      "client": 274,
      "scroll": 319,
      "overflow": "visible",
      "min": "0px",
      "white": "nowrap"
    },
    {
      "tag": "option",
      "cls": "",
      "id": "",
      "left": 58,
      "right": 332,
      "width": 274,
      "client": 274,
      "scroll": 341,
      "overflow": "visible",
      "min": "0px",
      "white": "nowrap"
    }
  ]
}

 pages/ataskaitos.html {
  "doc": [
    390,
    427
  ],
  "els": [
    {
      "tag": "section",
      "cls": "report-sheet",
      "id": "report-view",
      "left": 14,
      "right": 427,
      "width": 413,
      "client": 411,
      "scroll": 411,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "div",
      "cls": "report-cover",
      "id": "",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 371,
      "scroll": 371,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "h2",
      "cls": "",
      "id": "report-title",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 371,
      "scroll": 371,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "p",
      "cls": "muted",
      "id": "report-period",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 371,
      "scroll": 371,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "p",
      "cls": "fine-print",
      "id": "report-note",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 371,
      "scroll": 371,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "section",
      "cls": "report-section",
      "id": "",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 371,
      "scroll": 371,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "h3",
      "cls": "",
      "id": "",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 371,
      "scroll": 371,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "div",
      "cls": "report-chart",
      "id": "",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 371,
      "scroll": 371,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "canvas",
      "cls": "",
      "id": "report-chart",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 371,
      "scroll": 371,
      "overflow": "clip",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "p",
      "cls": "chart-caption",
      "id": "",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 371,
      "scroll": 371,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "div",
      "cls": "",
      "id": "report-sections",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 371,
      "scroll": 371,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "section",
      "cls": "report-section",
      "id": "",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 371,
      "scroll": 371,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "h3",
      "cls": "",
      "id": "",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 371,
      "scroll": 371,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "p",
      "cls": "muted",
      "id": "",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 371,
      "scroll": 371,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "div",
      "cls": "data-table-wrap",
      "id": "",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 369,
      "scroll": 369,
      "overflow": "auto",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "section",
      "cls": "report-section",
      "id": "",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 371,
      "scroll": 371,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "h3",
      "cls": "",
      "id": "",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 371,
      "scroll": 371,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "p",
      "cls": "muted",
      "id": "",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 371,
      "scroll": 371,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "div",
      "cls": "data-table-wrap",
      "id": "",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 369,
      "scroll": 369,
      "overflow": "auto",
      "min": "0px",
      "white": "normal"
    },
    {
      "tag": "section",
      "cls": "report-section",
      "id": "",
      "left": 35,
      "right": 406,
      "width": 371,
      "client": 371,
      "scroll": 371,
      "overflow": "visible",
      "min": "0px",
      "white": "normal"
    }
  ]
}

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "@'
import asyncio
from playwright.async_api import async_playwright
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True)
  pg=await b.new_page(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
  await pg.goto('http://localhost:8000/pages/ataskaitos.html',wait_until='networkidle')
  for css in ['.content-stack>*{min-width:0"'!important}.report-sheet{min-width:0!important;width:100%!important}'"', '.content-stack{min-width:0"'!important;grid-template-columns:minmax(0,1fr)!important}'"']:
   await pg.add_style_tag(content=css)
   await pg.wait_for_timeout(300)
   print(css, await pg.evaluate('''() => ({doc:document.documentElement.scrollWidth, sheet:(()=>{let r=document.querySelector('.report-sheet').getBoundingClientRect();return [r.left,r.right,r.width]})(), stack:document.querySelector('.content-stack').scrollWidth})'''))
  await b.close()
asyncio.run(main())
'@ | python -" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 1973ms:
.content-stack>*{min-width:0!important}.report-sheet{min-width:0!important;width:100%!important} {'doc': 390, 'sheet': [14, 376, 362], 'stack': 362}
.content-stack{min-width:0!important;grid-template-columns:minmax(0,1fr)!important} {'doc': 390, 'sheet': [14, 376, 362], 'stack': 362}

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "rg -n -C 2 \"admin-switch|admin-inline-actions|button--small|popup-select|footer-links|<button|type=\\\"checkbox\\\"\" demo/pages demo/js | Select-Object -First 500" in C:\Users\Joosep\tenders\klaipeda-environment
 exited 1 in 100ms:
rg: regex parse error:
    (?:admin-switch|admin-inline-actions|button--small|popup-select|footer-links|<button|type=\)
    ^
error: unclosed group

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "rg -n -C 2 'admin-switch|admin-inline-actions|button--small|popup-select|footer-links|<button|type=\"checkbox\"' demo/pages demo/js | Select-Object -First 500" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 132ms:
demo/js\pages\wildlife.js-46-  const tabsNode = document.querySelector("#wildlife-tabs");
demo/js\pages\wildlife.js-47-  const anchorIds = { flora: "augalija", invasive: "invazines", birds: "pauksciai", corvids: "varniniai", bats: "siksnosparniai", amphibians: "varliagyviai", fish: "zuvys" };
demo/js\pages\wildlife.js:48:  tabsNode.innerHTML = sections.map((item, index) => `<button id="${anchorIds[item[0]]}" type="button" role="tab" aria-selected="${index === 0}" aria-controls="wildlife-panel" tabindex="${index === 0 ? 0 : -1}" data-wildlife-tab="${item[0]}">${item[1].replace(" monitoringas", "")}</button>`).join("");
demo/js\pages\wildlife.js-49-  setOptions(document.querySelector("#wildlife-sites"), WILDLIFE_POINTS, { value: (item) => item.id, label: (item) => `${item.shortName} · ${item.address}`, selected: WILDLIFE_POINTS.slice(0, 3).map((item) => item.id) });
demo/js\pages\wildlife.js-50-  const tabButtons = [...tabsNode.querySelectorAll("button")];
--
demo/pages\zemelapis.html-27-    <div class="map-titlebar">
demo/pages\zemelapis.html-28-      <div><p class="section-kicker">3.6.6–3.6.11 · geoerdvinis atvaizdavimas</p><h1>Interaktyvus aplinkos žemėlapis</h1><p>Pasirinkite parametrą ir normos lygį. Spalva parodo paskutinio matavimo santykį su pasirinkta verte.</p></div>
demo/pages\zemelapis.html:29:      <div class="map-actions"><a class="button button--secondary button--small" href="../index.html">← Pagrindinis puslapis</a><button class="button button--primary button--small" id="measure-toggle" type="button" aria-pressed="false">Matuoti atstumą</button><button class="button button--secondary button--small" id="measure-clear" type="button">Išvalyti matavimus</button></div>
demo/pages\zemelapis.html-30-    </div>
demo/pages\zemelapis.html-31-
--
demo/pages\zemelapis.html-38-        <div class="control-group"><label class="control-label" for="norm-level">Taikoma norma</label><select class="select-field" id="norm-level"><option value="recommended">Rekomenduojama</option><option value="target">Siektina</option><option value="limit" selected>Ribinė</option></select><p class="control-help" id="norm-help">Spalvinis kodavimas taikomas pagal pasirinktą normos lygį.</p></div>
demo/pages\zemelapis.html-39-
demo/pages\zemelapis.html:40:        <div class="control-group"><span class="control-label">Sluoksniai</span><div class="layer-list" id="layer-toggles"><label><input type="checkbox" data-layer="districts" checked> Mikrorajonų ribos</label><label><input type="checkbox" data-layer="stations" checked> Savivaldybės stotelės</label><label><input type="checkbox" data-layer="iot" checked> Trečiųjų šalių IoT</label></div><p class="control-help">Papildomą sluoksnių valdymą rasite žemėlapio viršuje dešinėje.</p></div>
demo/pages\zemelapis.html-41-        <div class="control-group legend"><span class="control-label">Spalvų legenda</span><div class="legend-row"><span class="legend-dot status-good"></span> Gera / iki 75 % normos</div><div class="legend-row"><span class="legend-dot status-fair"></span> Priimtina / iki normos</div><div class="legend-row"><span class="legend-dot status-moderate"></span> Vidutinė / iki 125 %</div><div class="legend-row"><span class="legend-dot status-poor"></span> Prasta / iki 175 %</div><div class="legend-row"><span class="legend-dot status-very-poor"></span> Labai prasta</div><div class="legend-row"><span class="legend-dot status-extremely-poor"></span> Ypač prasta</div><div class="legend-row"><span class="legend-dot status-no-data"></span> Nėra duomenų</div></div>
demo/pages\zemelapis.html-42-        <ol class="measure-list" id="measure-list" aria-live="polite"></ol>
--
demo/pages\zemelapis.html-46-  </main>
demo/pages\zemelapis.html-47-
demo/pages\zemelapis.html:48:  <footer class="site-footer"><div class="site-footer-inner"><div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Demonstraciniai duomenys, normos ir mikrorajonų geometrija turi būti patvirtinti prieš diegimą.</p></div><nav class="footer-links" aria-label="Poraštės nuorodos"><a href="admin/index.html">Valdymo pultas (demonstracija)</a><a href="privatumo-politika.html">Privatumo politika</a><a href="slapuku-politika.html">Slapukų politika</a><a href="vadovas.html">Naudotojo vadovas</a><a href="zemelapis.html" aria-current="page">Žemėlapis</a></nav></div></footer>
demo/pages\zemelapis.html-49-
demo/pages\zemelapis.html-50-  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
--
demo/pages\zeldynai.html-2-<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Klaipėdos želdynų ir želdinių monitoringo analizė."><link rel="icon" href="data:"><link rel="stylesheet" href="../css/theme.css"><link rel="stylesheet" href="../css/sections.css"><title>Želdynų ir želdinių monitoringas | KMS AMIS</title></head>
demo/pages\zeldynai.html-3-<body><a class="skip-link" href="#turinys">Pereiti prie turinio</a><header class="site-header"><div class="header-inner"><a class="brand-lockup" href="../index.html" aria-label="KMS AMIS pagrindinis puslapis"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>Klaipėdos miesto savivaldybės aplinkos monitoringo informacinė sistema</strong><small>KMS AMIS · viešasis portalas</small></span></a><nav class="main-nav" aria-label="Pagrindinis meniu"><ul><li><details><summary>KMS AMIS</summary><ul><li><a href="bendra-info.html">Bendra informacija</a></li><li><a href="vadovas.html">Naudotojo vadovas</a></li></ul></details></li><li><details><summary>Klaipėdos miesto savivaldybės aplinkos monitoringas</summary><ul><li class="nav-group-label">Aplinkos oro monitoringas</li><li><a href="oro.html">Automatinių stotelių duomenys</a></li><li><a href="oro.html#laboratoriniai">Monitoringo (laboratoriniai) duomenys</a></li><li><a href="truksmas.html">Aplinkos triukšmo monitoringas</a></li><li><a href="dirvezemis.html">Dirvožemio monitoringas</a></li><li><a href="vanduo.html">Paviršinio vandens monitoringas</a></li><li class="nav-group-label">Gyvosios gamtos monitoringas</li><li><a href="gyvoji_gamta.html">Gyvosios gamtos monitoringas</a></li><li><a href="gyvoji_gamta.html#augalija">Augalijos monitoringas</a></li><li><a href="gyvoji_gamta.html#invazines">Invazinių rūšių monitoringas</a></li><li><a href="gyvoji_gamta.html#pauksciai">Paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#varniniai">Varninių paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#siksnosparniai">Šikšnosparnių monitoringas</a></li><li><a href="gyvoji_gamta.html#varliagyviai">Varliagyvių ir roplių monitoringas</a></li><li><a href="gyvoji_gamta.html#zuvys">Žuvų monitoringas</a></li><li><a href="zeldynai.html" aria-current="page">Želdynų ir želdinių monitoringas</a></li></ul></details></li><li><a href="ataskaitos.html">Monitoringo metinės ataskaitos</a></li><li><a href="prenumerata.html">Automatinių pranešimų prenumerata</a></li><li><a href="zemelapis.html">Interaktyvus žemėlapis</a></li></ul></nav></div><div class="brand-stripe" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div></header>
demo/pages\zeldynai.html:4:<main id="turinys" class="page-shell"><section class="page-hero"><div><p class="section-kicker">3.10.1.1.2.6 · būklės balai</p><h1>Želdynų ir želdinių monitoringas</h1><p class="lede">Įvertinkite lajos, lapijos, kamieno, pomedžio būklę ir žievės, kamieno, šakų bei šaknų mechaninius pažeidimus pagal kiekvieną medį ar želdynų plotą.</p><div class="page-actions"><a class="button button--primary" href="zemelapis.html?section=greenery">Atverti taškus žemėlapyje →</a><a class="button button--secondary" href="ataskaitos.html">Metinė ataskaita</a></div></div><aside class="page-hero-aside"><strong>0–10 balų skalė</strong><p>Demonstracinėje sąsajoje 7–10 balų reiškia gerą, 4–6 vidutinę, o 0–3 prastą būklę. Mechaninių pažeidimų balas interpretuojamas kaip būklės įvertis.</p></aside></section><div class="content-stack"><section class="surface surface-pad"><div class="section-heading"><div><span class="eyebrow">Laja · lapija · kamienas · pomedis · pažeidimai</span><h2>Želdinių būklės matrica</h2><p>Spalvinė lentelė veikia kaip greita būklės šilumos schema. Dešinėje pasirinkite vieną rodiklį ir palyginkite taškus stulpeline diagrama.</p></div><span class="status-chip" id="greenery-status" role="status">Ruošiama…</span></div><div class="analysis-filter-grid" style="margin-bottom:18px"><div class="field-group"><label class="field-label" for="greenery-district">Mikrorajonas</label><select class="select-field" id="greenery-district"></select></div><div class="field-group field-group--wide"><label class="field-label" for="greenery-sites">Medžiai / želdynų taškai</label><select class="select-field" id="greenery-sites" multiple></select></div><div class="field-group"><label class="field-label" for="greenery-parameter">Palyginimo rodiklis</label><select class="select-field" id="greenery-parameter"></select></div></div><div class="data-table-wrap" id="greenery-table"></div><section class="chart-panel" style="margin-top:18px"><h3>Pasirinkto būklės balo palyginimas</h3><div class="chart-wrap chart-wrap--short"><canvas id="greenery-chart" aria-label="Želdinių būklės balų stulpelinė diagrama"></canvas></div></section></section><div class="notice"><strong>Kaip suprasti balus?</strong><span>7–10: <b>geras</b>; 4–6: <b>vidutinis</b>; 0–3: <b>prastas</b>. Vertinimo metodika ir ribos turi būti galutinai suderintos su Perkančiąja organizacija.</span></div></div></main><footer class="site-footer"><div class="site-footer-inner"><div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Demonstraciniai želdynų balai nėra arboristinė ekspertizė ir turi būti patvirtinti prieš diegimą.</p></div><nav class="footer-links" aria-label="Poraštės nuorodos"><a href="admin/index.html">Valdymo pultas (demonstracija)</a><a href="privatumo-politika.html">Privatumo politika</a><a href="slapuku-politika.html">Slapukų politika</a><a href="vadovas.html">Naudotojo vadovas</a><a href="zemelapis.html">Žemėlapis</a></nav></div></footer><script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script><script type="module">import { initGreenery } from "../js/pages/greenery.js"; initGreenery();</script></body></html>
demo/pages\zeldynai.html-5-
--
demo/js\pages\subscription.js-30-    parameters: CATALOG.filter((item) => item.section !== "meteorology").map((item) => ({ id: item.id, label: item.name }))
demo/js\pages\subscription.js-31-  };
demo/js\pages\subscription.js:32:  Object.entries(groups).forEach(([group, items]) => { const target = document.querySelector(`[data-check-list="${group}"]`); target.innerHTML = items.map((item) => `<label><input type="checkbox" data-check-group="${group}" value="${escapeHtml(item.id)}"> <span>${escapeHtml(item.label)}</span></label>`).join(""); });
demo/js\pages\subscription.js-33-  document.querySelectorAll("[data-check-group]").forEach((input) => input.addEventListener("change", renderSummary));
demo/js\pages\subscription.js-34-  document.querySelector("#to-confirm").addEventListener("click", () => { if (!selectionValid()) { document.querySelector("#subscription-status").textContent = "Pasirinkite bent vieną rajoną, monitoringo dalį, tašką arba parametrą."; return; } renderSummary(); go("confirm"); });
--
demo/pages\bendra-info.html-2-<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Bendra informacija apie KMS AMIS."><link rel="icon" href="data:"><link rel="stylesheet" href="../css/theme.css"><link rel="stylesheet" href="../css/sections.css"><title>Bendra informacija | KMS AMIS</title></head>
demo/pages\bendra-info.html-3-<body><a class="skip-link" href="#turinys">Pereiti prie turinio</a><header class="site-header"><div class="header-inner"><a class="brand-lockup" href="../index.html" aria-label="KMS AMIS pagrindinis puslapis"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>Klaipėdos miesto savivaldybės aplinkos monitoringo informacinė sistema</strong><small>KMS AMIS · viešasis portalas</small></span></a><nav class="main-nav" aria-label="Pagrindinis meniu"><ul><li><details><summary>KMS AMIS</summary><ul><li><a href="bendra-info.html" aria-current="page">Bendra informacija</a></li><li><a href="vadovas.html">Naudotojo vadovas</a></li></ul></details></li><li><details><summary>Klaipėdos miesto savivaldybės aplinkos monitoringas</summary><ul><li class="nav-group-label">Aplinkos oro monitoringas</li><li><a href="oro.html">Automatinių stotelių duomenys</a></li><li><a href="oro.html#laboratoriniai">Monitoringo (laboratoriniai) duomenys</a></li><li><a href="truksmas.html">Aplinkos triukšmo monitoringas</a></li><li><a href="dirvezemis.html">Dirvožemio monitoringas</a></li><li><a href="vanduo.html">Paviršinio vandens monitoringas</a></li><li class="nav-group-label">Gyvosios gamtos monitoringas</li><li><a href="gyvoji_gamta.html">Gyvosios gamtos monitoringas</a></li><li><a href="gyvoji_gamta.html#augalija">Augalijos monitoringas</a></li><li><a href="gyvoji_gamta.html#invazines">Invazinių rūšių monitoringas</a></li><li><a href="gyvoji_gamta.html#pauksciai">Paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#varniniai">Varninių paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#siksnosparniai">Šikšnosparnių monitoringas</a></li><li><a href="gyvoji_gamta.html#varliagyviai">Varliagyvių ir roplių monitoringas</a></li><li><a href="gyvoji_gamta.html#zuvys">Žuvų monitoringas</a></li><li><a href="zeldynai.html">Želdynų ir želdinių monitoringas</a></li></ul></details></li><li><a href="ataskaitos.html">Monitoringo metinės ataskaitos</a></li><li><a href="prenumerata.html">Automatinių pranešimų prenumerata</a></li><li><a href="zemelapis.html">Interaktyvus žemėlapis</a></li></ul></nav></div><div class="brand-stripe" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div></header>
demo/pages\bendra-info.html:4:<main id="turinys" class="page-shell"><section class="page-hero"><div><p class="section-kicker">3.10.1.1.1.1 · sistemos paskirtis</p><h1>Bendra informacija</h1><p class="lede">KMS AMIS yra Klaipėdos miesto aplinkos monitoringo informacinės sistemos viešasis portalas. Jis padeda suprantamai peržiūrėti, analizuoti ir atsisiųsti aplinkos duomenis.</p></div><aside class="page-hero-aside"><strong>Viešas informacijos sluoksnis</strong><p>Viešasis naudotojas gali matyti monitoringo duomenis, žemėlapį, analizę, ataskaitas ir prenumeruoti įspėjimus.</p></aside></section><div class="content-stack"><section class="surface surface-pad text-page"><h2>Ką monitoruojame?</h2><p>Portale pateikiamos aplinkos oro, triukšmo, dirvožemio, paviršinio vandens, gyvosios gamtos ir želdynų bei želdinių monitoringo dalys. Kiekvienoje dalyje pateikiama bendra informacija, taškai žemėlapyje, statistinės ir grafinės analizės.</p><h2>Kaip atkeliauja duomenys?</h2><p>Automatinės aplinkos oro stotelės perduoda matavimus pagal kataloge aprašytą dažnį. Laboratoriniai, dirvožemio, vandens, biologiniai ir želdynų duomenys yra periodiniai – juos į sistemą pateikia tyrimų ar apžiūros rezultatai. Demonstracijoje duomenis atkuria deterministinis variklis, todėl tie patys pasirinkimai visuomet pateikia tą pačią reikšmių seką.</p><p>Žemėlapyje naudojamas OpenStreetMap gatvių pagrindas ir Esri ortofoto pakaitalas, o taškų koordinatės papildomai pateikiamos LKS-94 aproksimacijos forma. Oficialūs GIS sluoksniai, normos ir tikras priėmimo laikas turi būti suderinti diegimo metu.</p><h2>Prieinamumas</h2><p>Sąsaja kuriama pagal WCAG 2.2 AA principus: semantinės antraštės, matomas klaviatūros fokusas, praleidimo nuoroda, tekstinės legendos, spalvą papildantys paaiškinimai, 44 px klasės valdikliai, adaptyvus išdėstymas ir sumažinto judesio režimas.</p><h2>Kontaktai</h2><p>Už KMS AMIS pirkimo dokumentuose nurodytą aplinkos monitoringo sritį atsakingas Miesto vystymo ir priežiūros departamento Aplinkos ir klimato kaitos skyrius (toliau – Skyrius).</p><div class="contact-grid"><div class="contact-card"><strong>Klaipėdos miesto savivaldybės administracija</strong><p>Liepų g. 11, 92138 Klaipėda<br>Tel. (0 46) 39 60 66<br>El. p. <a href="mailto:info@klaipeda.lt">info@klaipeda.lt</a><br>Juridinio asmens kodas 188710823</p></div><div class="contact-card"><strong>Pirkimo dokumentuose nurodytas kontaktas</strong><p>Viešųjų pirkimų skyriaus vyr. specialistė Gileta Vilkaitė<br>Tel. (0 46) 39 61 78<br>El. p. <a href="mailto:gileta.vilkaite@klaipeda.lt">gileta.vilkaite@klaipeda.lt</a></p></div></div><p class="fine-print" style="margin-top:18px">Kontaktiniai duomenys pateikiami pagal konkurso sąlygų aprašą. Šis puslapis yra bid demo dalis, o ne oficialus savivaldybės kontaktų puslapis.</p></section></div></main><footer class="site-footer"><div class="site-footer-inner"><div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Demonstracinė versija. Pateikti duomenys, normos ir GIS sluoksniai turi būti patvirtinti prieš diegimą.</p></div><nav class="footer-links" aria-label="Poraštės nuorodos"><a href="admin/index.html">Valdymo pultas (demonstracija)</a><a href="privatumo-politika.html">Privatumo politika</a><a href="slapuku-politika.html">Slapukų politika</a><a href="vadovas.html">Naudotojo vadovas</a><a href="zemelapis.html">Žemėlapis</a></nav></div></footer></body></html>
demo/pages\bendra-info.html-5-
--
demo/js\pages\map.js-152-    <p class="popup-meta">${escapeHtml(site.address ?? "Klaipėda")}<br>WGS84: ${site.lat.toFixed(5)}, ${site.lon.toFixed(5)}<br>LKS-94 aproks.: X ${lks.easting.toLocaleString("lt-LT")}, Y ${lks.northing.toLocaleString("lt-LT")}<br>Mikrorajonas: ${escapeHtml(site.districtId)}</p>
demo/js\pages\map.js-153-    <label class="control-label" for="popup-period-${site.id}">Laikotarpis</label>
demo/js\pages\map.js:154:    <select class="popup-select" id="popup-period-${site.id}" data-popup-period="${site.id}"><option value="day" ${period === "day" ? "selected" : ""}>Paros</option><option value="week" ${period === "week" ? "selected" : ""}>Savaitės</option><option value="month" ${period === "month" ? "selected" : ""}>Mėnesio</option><option value="year" ${period === "year" ? "selected" : ""}>Metų</option></select>
demo/js\pages\map.js-155-    <table class="popup-data-table"><tbody><tr><th>Parametras</th><td>${escapeHtml(parameterItem.name)}</td></tr><tr><th>Paskutinis matavimas</th><td>${formatValue(latest?.value, parameterItem)} <span class="status-dot status-${latestClass.key}"></span></td></tr><tr><th>Laikotarpio vidurkis</th><td>${formatValue(parameterItem.section === "noise" && stats.logMean !== null ? stats.logMean : stats.mean, parameterItem)}</td></tr><tr><th>Min. / maks.</th><td>${formatValue(stats.min, parameterItem)} / ${formatValue(stats.max, parameterItem)}</td></tr></tbody></table>
demo/js\pages\map.js-156-    <div class="popup-norm">Taikoma norma: <strong>${norm === null || norm === undefined ? "nenustatyta" : `${normLabel(state.normLevel)} · ${formatValue(norm, parameterItem)}`}</strong></div>
--
demo/pages\oro.html-25-  <main id="turinys" class="page-shell">
demo/pages\oro.html-26-    <section class="page-hero"><div><p class="section-kicker">3.6.1–3.6.3 · aplinkos oro analizė</p><h1>Aplinkos oro monitoringas</h1><p class="lede">Peržiūrėkite automatinių stotelių ir laboratorinių mėginių duomenis: pasirinkite laikotarpį, parametrą ir taškus, o rezultatus palyginkite grafikuose.</p><div class="page-actions"><a class="button button--primary" href="zemelapis.html?section=automatic-air">Atverti žemėlapyje →</a><a class="button button--secondary" href="ataskaitos.html">Metinės ataskaitos</a></div></div><aside class="page-hero-aside"><strong>Duomenys iki <span data-demo-date>2026 m. spalio 1 d.</span></strong><p>Spalvos ir normos yra demonstracinės. Viršijimas grafike pažymimas oranžine spalva, kad būtų atskirtas nuo įprastos reikšmės.</p></aside></section>
demo/pages\oro.html:27:    <div class="analysis-tabs" role="tablist" aria-label="Aplinkos oro monitoringo duomenų tipas"><button class="analysis-tab" id="tab-automatic-air" type="button" role="tab" aria-selected="true" aria-controls="panel-automatic-air" data-analysis-tab="automatic-air">Automatinių aplinkos oro kokybės stebėjimo stotelių duomenys</button><button class="analysis-tab" id="tab-laboratory-air" type="button" role="tab" aria-selected="false" aria-controls="panel-laboratory-air" data-analysis-tab="laboratory-air">Monitoringo (laboratoriniai) duomenys</button></div>
demo/pages\oro.html-28-    <div class="content-stack">
demo/pages\oro.html-29-      <section class="analysis-panel surface surface-pad" data-analysis-panel="automatic-air" id="panel-automatic-air" role="tabpanel" aria-labelledby="tab-automatic-air" tabindex="0" data-analysis-section="automatic-air" data-default-period="90d"><div class="section-heading"><div><span class="eyebrow">Automatiniai ir istoriniai įrašai</span><h2>Stotelių duomenų analizė</h2><p>Filtrai taikomi laikotarpiui, mikrorajonui, adresui, monitoringo taškui ir parametrui pagal 3.6.1.</p></div><span class="status-chip" data-role="status" role="status">Ruošiama…</span></div>
--
demo/pages\oro.html-37-          <div class="field-group field-group--wide"><label class="field-label" for="air-sites">Monitoringo taškai</label><select class="select-field" id="air-sites" data-field="sites" multiple aria-describedby="air-site-count"></select><p class="field-help" id="air-site-count" data-role="site-count">Taškai parenkami…</p></div>
demo/pages\oro.html-38-          <div class="field-group"><label class="field-label" for="air-parameter">Stebimas parametras</label><select class="select-field" id="air-parameter" data-field="parameter"></select></div>
demo/pages\oro.html:39:          <label class="checkline"><input type="checkbox" data-field="exceedances"> Rodyti tik viršijimų atvejus</label><div class="filter-actions"><button class="button button--primary" type="button" data-action="apply">Atnaujinti analizę</button></div>
demo/pages\oro.html-40-        </div>
demo/pages\oro.html-41-        <p class="analysis-message" data-role="norm"></p><div class="stats-grid" data-role="stats"></div>
--
demo/pages\oro.html-46-
demo/pages\oro.html-47-      <section class="analysis-panel surface surface-pad" data-analysis-panel="laboratory-air" id="panel-laboratory-air" role="tabpanel" aria-labelledby="tab-laboratory-air" tabindex="0" data-analysis-section="laboratory-air" data-default-period="730d" hidden><div class="section-heading"><div><span class="eyebrow">Periodiniai mėginiai · istoriniai duomenys</span><h2>Laboratorinių duomenų analizė</h2><p>Laboratorinių mėginių dažnis yra retesnis, todėl rekomenduojame rinktis 12–24 mėnesių laikotarpį.</p></div><span class="status-chip" data-role="status" role="status">Ruošiama…</span></div>
demo/pages\oro.html:48:        <div class="analysis-filter-grid"><div class="field-group"><label class="field-label" for="lab-period">Laikotarpis</label><select class="select-field" id="lab-period" data-field="period"><option value="365d">12 mėnesių</option><option value="730d">24 mėnesiai</option></select></div><div class="field-group"><label class="field-label" for="lab-type">Duomenų tipas</label><select class="select-field" id="lab-type" data-field="type"><option value="historical">Istoriniai / laboratoriniai</option><option value="all">Visi prieinami</option></select></div><div class="field-group"><label class="field-label" for="lab-district">Mikrorajonas</label><select class="select-field" id="lab-district" data-field="district"></select></div><div class="field-group"><label class="field-label" for="lab-address">Adresas</label><select class="select-field" id="lab-address" data-field="address"></select></div><div class="field-group"><label class="field-label" for="lab-part">Monitoringo dalis</label><select class="select-field" id="lab-part" data-field="part"></select></div><div class="field-group"><label class="field-label" for="lab-code">Taško kodas / pavadinimas</label><input id="lab-code" data-field="code" type="search" placeholder="pvz., KA-03"></div><div class="field-group field-group--wide"><label class="field-label" for="lab-sites">Monitoringo taškai</label><select class="select-field" id="lab-sites" data-field="sites" multiple aria-describedby="lab-site-count"></select><p class="field-help" id="lab-site-count" data-role="site-count"></p></div><div class="field-group"><label class="field-label" for="lab-parameter">Stebimas parametras</label><select class="select-field" id="lab-parameter" data-field="parameter"></select></div><label class="checkline"><input type="checkbox" data-field="exceedances"> Rodyti tik viršijimų atvejus</label><div class="filter-actions"><button class="button button--primary" type="button" data-action="apply">Atnaujinti analizę</button></div></div>
demo/pages\oro.html-49-        <p class="analysis-message" data-role="norm"></p><div class="stats-grid" data-role="stats"></div><div class="chart-grid"><section class="chart-panel"><h3>Laboratorinių mėginių laiko eilutė</h3><p>Retesni mėginiai rodomi kaip atskiri paros įrašai.</p><div class="chart-wrap"><canvas data-chart="time" aria-label="Laboratorinių oro mėginių grafikas"></canvas></div></section><section class="chart-panel"><h3>Taškų palyginimas</h3><div class="chart-wrap chart-wrap--short"><canvas data-chart="compare" aria-label="Laboratorinių oro taškų palyginimo diagrama"></canvas></div></section></div><section class="chart-panel" style="margin-top:18px"><h3>Koreliacija: vėjo greitis ir laboratorinis rodiklis</h3><div class="correlation-copy"><strong class="correlation-r" data-role="pearson">r = –</strong><p><span data-role="correlation-explain">Ruošiama…</span> Naudojami sutampantys laboratorinių ir meteorologinių matavimų laikai.</p></div><div class="chart-wrap chart-wrap--short"><canvas data-chart="correlation" aria-label="Laboratorinio rodiklio ir vėjo greičio sklaidos diagrama"></canvas></div></section><div class="data-table-wrap" style="margin-top:18px" data-role="station-table"></div>
demo/pages\oro.html-50-      </section>
demo/pages\oro.html-51-    </div>
demo/pages\oro.html-52-  </main>
demo/pages\oro.html:53:  <footer class="site-footer"><div class="site-footer-inner"><div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Demonstraciniai duomenys, normos ir geometrija nėra teisinė išvada. Prieš diegimą reikšmes ir sluoksnius turi patvirtinti Skyrius.</p></div><nav class="footer-links" aria-label="Poraštės nuorodos"><a href="admin/index.html">Valdymo pultas (demonstracija)</a><a href="privatumo-politika.html">Privatumo politika</a><a href="slapuku-politika.html">Slapukų politika</a><a href="vadovas.html">Naudotojo vadovas</a><a href="zemelapis.html">Žemėlapis</a></nav></div></footer>
demo/pages\oro.html-54-  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script><script type="module">import { initAirTabs, initAnalysisPanel, setAnalysisDateBounds } from "../js/pages/analysis.js"; initAirTabs(); document.querySelectorAll("[data-analysis-section]").forEach(initAnalysisPanel); setAnalysisDateBounds();</script>
demo/pages\oro.html-55-</body></html>
--
demo/pages\privatumo-politika.html-2-<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="KMS AMIS privatumo politikos projektas."><link rel="icon" href="data:"><link rel="stylesheet" href="../css/theme.css"><link rel="stylesheet" href="../css/sections.css"><title>Privatumo politika | KMS AMIS</title></head>
demo/pages\privatumo-politika.html-3-<body><a class="skip-link" href="#turinys">Pereiti prie turinio</a><header class="site-header"><div class="header-inner"><a class="brand-lockup" href="../index.html" aria-label="KMS AMIS pagrindinis puslapis"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>Klaipėdos miesto savivaldybės aplinkos monitoringo informacinė sistema</strong><small>KMS AMIS · viešasis portalas</small></span></a><nav class="main-nav" aria-label="Pagrindinis meniu"><ul><li><details><summary>KMS AMIS</summary><ul><li><a href="bendra-info.html">Bendra informacija</a></li><li><a href="vadovas.html">Naudotojo vadovas</a></li></ul></details></li><li><details><summary>Klaipėdos miesto savivaldybės aplinkos monitoringas</summary><ul><li><a href="oro.html">Aplinkos oro monitoringas</a></li><li><a href="truksmas.html">Aplinkos triukšmo monitoringas</a></li><li><a href="dirvezemis.html">Dirvožemio monitoringas</a></li><li><a href="vanduo.html">Paviršinio vandens monitoringas</a></li><li><a href="gyvoji_gamta.html">Gyvosios gamtos monitoringas</a></li><li><a href="zeldynai.html">Želdynų ir želdinių monitoringas</a></li></ul></details></li><li><a href="ataskaitos.html">Monitoringo metinės ataskaitos</a></li><li><a href="prenumerata.html">Automatinių pranešimų prenumerata</a></li><li><a href="zemelapis.html">Interaktyvus žemėlapis</a></li></ul></nav></div><div class="brand-stripe" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div></header>
demo/pages\privatumo-politika.html:4:<main id="turinys" class="page-shell"><section class="page-hero"><div><p class="section-kicker">3.8.7 · BDAR dokumento projektas</p><h1>Privatumo politika</h1><p class="lede">Šis tekstas aprašo, kokie asmens duomenys reikalingi KMS AMIS funkcijoms, kam jie naudojami ir kaip viešajam naudotojui juos ištrinti.</p></div><aside class="page-hero-aside"><span class="privacy-version">Versija 1.0 · projektas</span><p>„Suderinama su Perkančiąja organizacija“ – dokumentas turi būti peržiūrėtas ir patvirtintas prieš priėmimo testavimą.</p></aside></section><div class="content-stack"><section class="surface surface-pad text-page"><h2>1. Duomenų valdytojas</h2><p>Duomenų valdytojas – Klaipėdos miesto savivaldybės administracija, Liepų g. 11, 92138 Klaipėda, tel. (0 46) 39 60 66, el. p. <a href="mailto:info@klaipeda.lt">info@klaipeda.lt</a>. KMS AMIS veiklos sritį koordinuoja Miesto vystymo ir priežiūros departamento Aplinkos ir klimato kaitos skyrius.</p><h2>2. Kokie duomenys tvarkomi?</h2><h3>Administratorius ir Specialistas</h3><p>Administravimo ir valdymo aplinkoje gali būti renkami: vardas, pavardė, pareigos ir darbinis el. pašto adresas. Jie naudojami autorizacijai, veiksmų žurnalams ir dviejų veiksnių autentifikavimui.</p><h3>Viešasis naudotojas, užsisakęs prenumeratą</h3><p>Prenumeratos tikslui renkamas tik el. pašto adresas. Jis naudojamas automatiniams pranešimams siųsti ir prenumeratos būsenai valdyti. Jokie kiti naudotoją identifikuojantys duomenys prenumeratos tikslui neturi būti renkami.</p><h2>3. Tikslai ir teisinis pagrindas</h2><p>Duomenys tvarkomi sistemos prieigos, saugumo, veiksmų atsekamumo ir aiškiai pasirinktos aplinkos monitoringo pranešimų prenumeratos tikslais. Viešojo naudotojo prenumerata aktyvuojama tik gavus aiškų sutikimą ir įvykdžius dvigubo patvirtinimo veiksmą.</p><h2>4. Saugojimas ir ištrynimas</h2><p>Duomenų saugojimo terminai turi būti nustatyti kartu su Perkančiąja organizacija pagal tikslą ir teisės aktus. Viešasis naudotojas gali vienu paspaudimu inicijuoti visų su jo prenumeratos el. paštu susietų duomenų ištrynimą prenumeratos puslapyje.</p><h2>5. Demo apribojimas</h2><p>Šiame bid demo prenumeratos įrašai laikomi naudotojo naršyklės localStorage rakte <code>kms-amis-demo-subscriptions-v1</code>. Tai nėra saugus serverio saugojimas ir neturėtų būti naudojamas realiems asmens duomenims. Produkcijoje reikalingas HTTPS, prieigos kontrolė, saugus dvigubas patvirtinimas, veiksmų žurnalai ir patvirtinta politika.</p><h2>6. Teisės ir kontaktas</h2><p>Duomenų subjektas turi teisę gauti informaciją apie tvarkymą, susipažinti su duomenimis, juos ištaisyti, apriboti tvarkymą, atšaukti sutikimą ir prašyti ištrinti duomenis, kai tai leidžiama teisės aktuose. Prašymus galima teikti duomenų valdytojo kontaktu, nurodytu šio dokumento 1 skyriuje.</p></section></div></main><footer class="site-footer"><div class="site-footer-inner"><div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Privatumo politikos projektas, versija 1.0, suderinama su Perkančiąja organizacija.</p></div><nav class="footer-links" aria-label="Poraštės nuorodos"><a href="admin/index.html">Valdymo pultas (demonstracija)</a><a href="slapuku-politika.html">Slapukų politika</a><a href="vadovas.html">Naudotojo vadovas</a><a href="bendra-info.html">Bendra informacija</a><a href="zemelapis.html">Žemėlapis</a></nav></div></footer></body></html>
demo/pages\privatumo-politika.html-5-
--
demo/js\pages\admin\shell.js-20-  if (!sidebar) return;
demo/js\pages\admin\shell.js-21-  const links = NAV_ITEMS.filter(([, , , role]) => !role || role === session.role).map(([href, label, key]) => `<li><a class="admin-nav-link${key === active ? " is-active" : ""}" href="${href}"${key === active ? ' aria-current="page"' : ""}>${label}</a></li>`).join("");
demo/js\pages\admin\shell.js:22:  sidebar.innerHTML = `<a class="admin-brand" href="index.html"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>KMS AMIS</strong><small>valdymo pultas</small></span></a><div class="brand-stripe brand-stripe--compact" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div><nav class="admin-nav" aria-label="Valdymo pulto meniu"><ul>${links}<li><button class="admin-nav-link admin-nav-logout" type="button" data-admin-sidebar-logout>Atsijungti</button></li></ul></nav><div class="admin-sidebar-note"><span class="eyebrow">Demonstracija</span><p>Duomenys ir veiksmai išsaugomi tik šios naršyklės localStorage.</p></div>`;
demo/js\pages\admin\shell.js-23-  sidebar.querySelector("[data-admin-sidebar-logout]").addEventListener("click", () => logout(session));
demo/js\pages\admin\shell.js-24-}
--
demo/js\pages\admin\shell.js-33-  const topbar = document.querySelector("#admin-topbar");
demo/js\pages\admin\shell.js-34-  if (!topbar) return;
demo/js\pages\admin\shell.js:35:  topbar.innerHTML = `<div><span class="eyebrow">KMS AMIS · fazė 3</span><strong>Valdymo pultas</strong></div><div class="admin-top-actions"><span class="role-chip">${getRoleLabel(session.role)}</span><button class="button button--secondary button--small" type="button" data-admin-logout>Atsijungti</button></div>`;
demo/js\pages\admin\shell.js-36-  topbar.querySelector("[data-admin-logout]").addEventListener("click", () => logout(session));
demo/js\pages\admin\shell.js-37-}
--
demo/pages\dirvezemis.html-2-<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Klaipėdos dirvožemio monitoringo analizė."><link rel="icon" href="data:"><link rel="stylesheet" href="../css/theme.css"><link rel="stylesheet" href="../css/sections.css"><title>Dirvožemio monitoringas | KMS AMIS</title></head>
demo/pages\dirvezemis.html-3-<body><a class="skip-link" href="#turinys">Pereiti prie turinio</a><header class="site-header"><div class="header-inner"><a class="brand-lockup" href="../index.html" aria-label="KMS AMIS pagrindinis puslapis"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>Klaipėdos miesto savivaldybės aplinkos monitoringo informacinė sistema</strong><small>KMS AMIS · viešasis portalas</small></span></a><nav class="main-nav" aria-label="Pagrindinis meniu"><ul><li><details><summary>KMS AMIS</summary><ul><li><a href="bendra-info.html">Bendra informacija</a></li><li><a href="vadovas.html">Naudotojo vadovas</a></li></ul></details></li><li><details><summary>Klaipėdos miesto savivaldybės aplinkos monitoringas</summary><ul><li class="nav-group-label">Aplinkos oro monitoringas</li><li><a href="oro.html">Automatinių stotelių duomenys</a></li><li><a href="oro.html#laboratoriniai">Monitoringo (laboratoriniai) duomenys</a></li><li><a href="truksmas.html">Aplinkos triukšmo monitoringas</a></li><li><a href="dirvezemis.html" aria-current="page">Dirvožemio monitoringas</a></li><li><a href="vanduo.html">Paviršinio vandens monitoringas</a></li><li class="nav-group-label">Gyvosios gamtos monitoringas</li><li><a href="gyvoji_gamta.html">Gyvosios gamtos monitoringas</a></li><li><a href="gyvoji_gamta.html#augalija">Augalijos monitoringas</a></li><li><a href="gyvoji_gamta.html#invazines">Invazinių rūšių monitoringas</a></li><li><a href="gyvoji_gamta.html#pauksciai">Paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#varniniai">Varninių paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#siksnosparniai">Šikšnosparnių monitoringas</a></li><li><a href="gyvoji_gamta.html#varliagyviai">Varliagyvių ir roplių monitoringas</a></li><li><a href="gyvoji_gamta.html#zuvys">Žuvų monitoringas</a></li><li><a href="zeldynai.html">Želdynų ir želdinių monitoringas</a></li></ul></details></li><li><a href="ataskaitos.html">Monitoringo metinės ataskaitos</a></li><li><a href="prenumerata.html">Automatinių pranešimų prenumerata</a></li><li><a href="zemelapis.html">Interaktyvus žemėlapis</a></li></ul></nav></div><div class="brand-stripe" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div></header>
demo/pages\dirvezemis.html:4:<main id="turinys" class="page-shell"><section class="page-hero"><div><p class="section-kicker">3.6.1–3.6.3 · periodinis mėginių monitoringas</p><h1>Dirvožemio monitoringas</h1><p class="lede">Peržiūrėkite metalų ir naftos produktų mėginius pagal tašką. Dirvožemio duomenys yra periodiniai: demonstracijoje jie gaunami maždaug kas 12 mėnesių, o reali programa gali numatyti 1–5 mėginius per penkerius metus.</p><div class="page-actions"><a class="button button--primary" href="zemelapis.html?section=soil">Atverti žemėlapyje →</a><a class="button button--secondary" href="ataskaitos.html">Metinė ataskaita</a></div></div><aside class="page-hero-aside"><strong>Normos lygis</strong><p>Spalva lentelėje ir grafike parodo santykį su kataloge pateikta demonstracine ribine verte. Tai nėra teisinė dirvožemio būklės išvada.</p></aside></section><div class="content-stack"><section class="surface surface-pad" data-periodic-section="soil" data-presentation="bar" data-default-period="730d"><div class="section-heading"><div><span class="eyebrow">Metalai · C10–C40</span><h2>Dirvožemio mėginiai</h2><p>Pasirinkite medžiagą ir taškus. Lentelėje pateikiami visi rasti periodiniai įrašai, o stulpelinėje diagramoje – paskutinis kiekvieno taško mėginys.</p></div><span class="status-chip" data-role="status" role="status">Ruošiama…</span></div><div class="periodic-layout"><aside class="periodic-filters" aria-label="Dirvožemio filtrai"><div class="field-group"><label class="field-label" for="soil-period">Laikotarpis</label><select class="select-field" id="soil-period" data-field="period"><option value="365d">12 mėnesių</option><option value="730d">24 mėnesiai</option></select></div><div class="field-group"><label class="field-label" for="soil-district">Mikrorajonas</label><select class="select-field" id="soil-district" data-field="district"></select></div><div class="field-group"><label class="field-label" for="soil-sites">Mėginių taškai</label><select class="select-field" id="soil-sites" data-field="sites" multiple></select><p class="field-help">Ctrl / Cmd klavišu pasirinkite kelis taškus.</p></div><div class="field-group"><label class="field-label" for="soil-parameter">Medžiaga</label><select class="select-field" id="soil-parameter" data-field="parameter"></select></div><button class="button button--primary" type="button" data-action="apply">Atnaujinti</button></aside><div class="periodic-results"><div class="periodic-summary" data-role="summary"></div><section class="chart-panel periodic-chart"><h3>Paskutinių mėginių palyginimas</h3><div class="chart-wrap chart-wrap--short"><canvas data-chart="main" aria-label="Dirvožemio medžiagos palyginimo diagrama"></canvas></div></section><div class="data-table-wrap" style="margin-top:18px" data-role="table"></div></div></div></section><div class="notice"><strong>Periodiškumas.</strong><span>Dirvožemio monitoringas nėra valandinis: pagal pasirinktą programą mėginys imamas vieną ar kelis kartus per penkerių metų laikotarpį. Neradus reikšmės pasirinktame lange, tai reiškia, kad matavimas tuo metu nebuvo suplanuotas.</span></div></div></main><footer class="site-footer"><div class="site-footer-inner"><div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Demonstraciniai duomenys, normos ir mikrorajonų geometrija turi būti patvirtinti prieš diegimą.</p></div><nav class="footer-links" aria-label="Poraštės nuorodos"><a href="admin/index.html">Valdymo pultas (demonstracija)</a><a href="privatumo-politika.html">Privatumo politika</a><a href="slapuku-politika.html">Slapukų politika</a><a href="vadovas.html">Naudotojo vadovas</a><a href="zemelapis.html">Žemėlapis</a></nav></div></footer><script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script><script type="module">import { initPeriodic } from "../js/pages/periodic.js"; initPeriodic(document.querySelector("[data-periodic-section]"));</script></body></html>
demo/pages\dirvezemis.html-5-
--
demo/js\pages\admin\nustatymai.js-15-  if (saved.cacheTtl) document.querySelector("#cache-ttl").value = saved.cacheTtl;
demo/js\pages\admin\nustatymai.js-16-  if (saved.rateLimit) document.querySelector("#rate-limit").value = saved.rateLimit;
demo/js\pages\admin\nustatymai.js:17:  document.querySelector("#validation-rules").innerHTML = rules.map(([id, label, description]) => `<div class="admin-rule"><div><strong>${label}</strong><p>${description}</p></div><label class="admin-switch"><input type="checkbox" data-validation-rule="${id}" ${saved.rules?.[id] !== false ? "checked" : ""}><span class="fine-print">Įjungta</span></label></div>`).join("");
demo/js\pages\admin\nustatymai.js-18-  document.querySelector("#settings-form").addEventListener("submit", (event) => { event.preventDefault(); const ruleState = {}; document.querySelectorAll("[data-validation-rule]").forEach((input) => { ruleState[input.dataset.validationRule] = input.checked; }); const value = { offlineMinutes: Number(document.querySelector("#offline-minutes").value), cacheTtl: Number(document.querySelector("#cache-ttl").value), rateLimit: Number(document.querySelector("#rate-limit").value), rules: ruleState, updatedAt: new Date().toISOString() }; localStorage.setItem(SETTINGS_KEY, JSON.stringify(value)); document.querySelector("#settings-message").textContent = "Nustatymai išsaugoti šios naršyklės demonstracinėje būsenoje."; auditAction("Išsaugoti valdymo pulto nustatymai", SETTINGS_KEY, "Išsaugota"); toast("Nustatymai išsaugoti."); });
demo/js\pages\admin\nustatymai.js-19-}
--
demo/js\pages\admin\prenumeratos.js-17-    document.querySelector("#subscriber-table").innerHTML = subscriptions.map((item) => `<tr><td><strong>${escapeHtml(item.email)}</strong></td><td>${escapeHtml((item.sections || []).join(", ") || "–")}</td><td>${escapeHtml((item.sites || []).join(", ") || "–")}</td><td><span class="admin-chip ${normalizeSubscriptionStatus(item.status) === "active" ? "admin-status-ok" : "admin-status-warn"}">${escapeHtml(subscriptionStatusLabel(item.status))}</span></td><td>${formatDateTime(item.createdAt)}</td></tr>`).join("") || `<tr><td colspan="5">Prenumeratų nėra.</td></tr>`;
demo/js\pages\admin\prenumeratos.js-18-    const pending = listPendingSubscriptions();
demo/js\pages\admin\prenumeratos.js:19:    document.querySelector("#pending-subscribers").innerHTML = pending.length ? pending.map((item) => `<div class="admin-rule"><div><strong>${escapeHtml(item.email)}</strong><p>${formatDateTime(item.createdAt)} · laukia dvigubo patvirtinimo</p></div><button class="button button--secondary button--small" data-resend="${escapeHtml(item.id)}" type="button">Persiųsti patvirtinimo laišką</button></div>`).join("") : `<p class="muted">Laukiančių patvirtinimų nėra.</p>`;
demo/js\pages\admin\prenumeratos.js-20-    const erases = listEraseEvents();
demo/js\pages\admin\prenumeratos.js-21-    document.querySelector("#erase-log-table").innerHTML = erases.map((item) => `<tr><td>${formatDateTime(item.erasedAt)}</td><td>${escapeHtml(item.email)}</td><td>${item.recordsRemoved}</td></tr>`).join("") || `<tr><td colspan="3">BDSR užklausų dar nėra.</td></tr>`;
--
demo/js\pages\admin\pranesimai.js-8-  const modeLabel = { auto: "Automatiškai", approve: "Patvirtinti prieš siuntimą" };
demo/js\pages\admin\pranesimai.js-9-  function saveState(action = "Atnaujintos pranešimų taisyklės") { writeNotificationState(state); auditAction(action, "Pranešimų valdymas", "Išsaugota"); }
demo/js\pages\admin\pranesimai.js:10:  function renderRules() { const sites = ["Visos stotelės", "KA-03", "KA-05", "KA-07"]; const parameters = ["Visi parametrai", "KD10", "NH₃", "Bendras azotas"]; document.querySelector("#gap-rules-table").innerHTML = state.gapRules.map((rule, index) => `<tr><td><strong>${escapeHtml(rule.duration)}</strong></td><td><select class="select-field" data-rule-site="${index}" aria-label="Duomenų spragos taisyklė ${escapeHtml(rule.duration)}: taškas" style="min-height:34px">${sites.map((item) => `<option ${item === (rule.site || "Visos stotelės") ? "selected" : ""}>${item}</option>`).join("")}</select></td><td><select class="select-field" data-rule-parameter="${index}" aria-label="Duomenų spragos taisyklė ${escapeHtml(rule.duration)}: parametras" style="min-height:34px">${parameters.map((item) => `<option ${item === (rule.parameter || "Visi parametrai") ? "selected" : ""}>${item}</option>`).join("")}</select></td><td><label class="admin-switch"><input type="checkbox" data-rule-index="${index}" aria-label="Duomenų spragos taisyklė ${escapeHtml(rule.duration)}: įjungta" ${rule.enabled ? "checked" : ""}><span class="fine-print">${rule.enabled ? "Įjungta" : "Išjungta"}</span></label></td></tr>`).join(""); }
demo/js\pages\admin\pranesimai.js-11-  function renderModes() { document.querySelector("#notification-modes").innerHTML = NOTIFICATION_TYPES.map(([id, label]) => `<div class="admin-rule"><div><strong>${label}</strong><p>Siuntimo sprendimas šiam įspėjimo tipui.</p></div><select class="select-field" data-mode-type="${id}" aria-label="${escapeHtml(label)}: siuntimo režimas" style="width:auto;min-height:34px"><option value="auto" ${state.modes[id] === "auto" ? "selected" : ""}>${modeLabel.auto}</option><option value="approve" ${state.modes[id] === "approve" ? "selected" : ""}>${modeLabel.approve}</option></select></div>`).join(""); }
demo/js\pages\admin\pranesimai.js:12:  function renderPending() { document.querySelector("#pending-notifications").innerHTML = state.pending.length ? state.pending.map((item) => { const label = NOTIFICATION_TYPES.find(([id]) => id === item.type)?.[1] || item.type; return `<div class="admin-rule"><div><strong>${escapeHtml(item.target)}</strong><p>${escapeHtml(label)} · ${formatDateTime(item.createdAt)}</p></div><div class="admin-inline-actions"><button class="button button--primary" data-pending-action="send" data-id="${item.id}" type="button">Siųsti</button><button class="button button--secondary" data-pending-action="reject" data-id="${item.id}" type="button">Atmesti</button></div></div>`; }).join("") : `<p class="muted">Laukiančių pranešimų nėra.</p>`; }
demo/js\pages\admin\pranesimai.js-13-  function renderTemplate() { const template = state.templates[document.querySelector("#template-type").value]; document.querySelector("#template-subject").value = template.subject; document.querySelector("#template-body").value = template.body; }
demo/js\pages\admin\pranesimai.js-14-  renderRules(); renderModes(); renderPending();
--
demo/pages\prenumerata.html-2-<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="KMS AMIS automatinių pranešimų prenumerata."><link rel="icon" href="data:"><link rel="stylesheet" href="../css/theme.css"><link rel="stylesheet" href="../css/sections.css"><title>Automatinių pranešimų prenumerata | KMS AMIS</title></head>
demo/pages\prenumerata.html-3-<body><a class="skip-link" href="#turinys">Pereiti prie turinio</a><header class="site-header"><div class="header-inner"><a class="brand-lockup" href="../index.html" aria-label="KMS AMIS pagrindinis puslapis"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>Klaipėdos miesto savivaldybės aplinkos monitoringo informacinė sistema</strong><small>KMS AMIS · viešasis portalas</small></span></a><nav class="main-nav" aria-label="Pagrindinis meniu"><ul><li><details><summary>KMS AMIS</summary><ul><li><a href="bendra-info.html">Bendra informacija</a></li><li><a href="vadovas.html">Naudotojo vadovas</a></li></ul></details></li><li><details><summary>Klaipėdos miesto savivaldybės aplinkos monitoringas</summary><ul><li class="nav-group-label">Aplinkos oro monitoringas</li><li><a href="oro.html">Automatinių stotelių duomenys</a></li><li><a href="oro.html#laboratoriniai">Monitoringo (laboratoriniai) duomenys</a></li><li><a href="truksmas.html">Aplinkos triukšmo monitoringas</a></li><li><a href="dirvezemis.html">Dirvožemio monitoringas</a></li><li><a href="vanduo.html">Paviršinio vandens monitoringas</a></li><li class="nav-group-label">Gyvosios gamtos monitoringas</li><li><a href="gyvoji_gamta.html">Gyvosios gamtos monitoringas</a></li><li><a href="gyvoji_gamta.html#augalija">Augalijos monitoringas</a></li><li><a href="gyvoji_gamta.html#invazines">Invazinių rūšių monitoringas</a></li><li><a href="gyvoji_gamta.html#pauksciai">Paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#varniniai">Varninių paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#siksnosparniai">Šikšnosparnių monitoringas</a></li><li><a href="gyvoji_gamta.html#varliagyviai">Varliagyvių ir roplių monitoringas</a></li><li><a href="gyvoji_gamta.html#zuvys">Žuvų monitoringas</a></li><li><a href="zeldynai.html">Želdynų ir želdinių monitoringas</a></li></ul></details></li><li><a href="ataskaitos.html">Monitoringo metinės ataskaitos</a></li><li><a href="prenumerata.html" aria-current="page">Automatinių pranešimų prenumerata</a></li><li><a href="zemelapis.html">Interaktyvus žemėlapis</a></li></ul></nav></div><div class="brand-stripe" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div></header>
demo/pages\prenumerata.html:4:<main id="turinys" class="page-shell"><section class="page-hero"><div><p class="section-kicker">3.7.2 · 3.7.4 · 3.8.6 · viešojo naudotojo pranešimai</p><h1>Automatinių pranešimų prenumerata</h1><p class="lede">Pasirinkite, apie kuriuos mikrorajonus, monitoringo dalis, taškus ir parametrus norite gauti įspėjimus el. paštu.</p></div><aside class="page-hero-aside"><strong>Jokių papildomų profilio duomenų</strong><p>Prenumeratos tikslui demo saugo tik el. pašto adresą, pasirinkimus ir sutikimo būseną.</p></aside></section><div class="content-stack"><section class="surface surface-pad" id="subscription-wizard"><div class="wizard-steps"><div class="wizard-step is-active" data-wizard-step="selection">Pasirinkimai</div><div class="wizard-step" data-wizard-step="confirm">El. paštas ir sutikimas</div><div class="wizard-step" data-wizard-step="verify">Dvigubas patvirtinimas</div><div class="wizard-step" data-wizard-step="done">Baigta</div></div><div class="wizard-panel" data-wizard-panel="selection"><div class="section-heading"><div><span class="eyebrow">1 žingsnis</span><h2>Pasirinkite pranešimų sritį</h2><p>Pasirinkimai atliekami prieš prenumeratos patvirtinimą, kaip numatyta 3.7.4.</p></div></div><div class="checkbox-groups"><section class="checkbox-group"><h3>Mikrorajonai</h3><div class="checkbox-grid" data-check-list="districts"></div></section><section class="checkbox-group"><h3>Monitoringo dalys</h3><div class="checkbox-grid" data-check-list="sections"></div></section><section class="checkbox-group"><h3>Monitoringo taškai</h3><div class="checkbox-grid" data-check-list="sites"></div></section><section class="checkbox-group"><h3>Aplinkos kokybės parametrai</h3><div class="checkbox-grid" data-check-list="parameters"></div></section></div><div class="selection-summary" id="subscription-selection-summary" style="margin-top:18px"></div><div class="page-actions"><button class="button button--primary" id="to-confirm" type="button">Tęsti į patvirtinimą →</button></div></div><div class="wizard-panel" data-wizard-panel="confirm" hidden><div class="section-heading"><div><span class="eyebrow">2 žingsnis</span><h2>Įrašykite el. paštą</h2><p>Šiame demo el. paštas naudojamas tik pranešimų prenumeratos įrašui sukurti.</p></div></div><div class="selection-summary" id="subscription-selection-summary-confirm"><p>Pasirinkimus matysite grįžę į pirmą žingsnį.</p></div><form id="subscription-form"><div class="field-group" style="max-width:520px"><label class="field-label" for="subscription-email">El. pašto adresas</label><input class="field" id="subscription-email" type="email" autocomplete="email" required placeholder="vardas@example.lt"></div><label class="checkline" style="margin-top:14px"><input type="checkbox" name="consent" required> Sutinku, kad KMS AMIS tvarkytų mano el. pašto adresą automatiniams aplinkos monitoringo pranešimams siųsti. Sutikimą galiu bet kada atšaukti ir ištrinti duomenis.</label><div class="page-actions"><button class="button button--secondary" id="back-to-selection" type="button">← Grįžti</button><button class="button button--primary" type="submit">Patvirtinti prenumeratą</button></div></form></div><div class="wizard-panel" data-wizard-panel="verify" hidden><div class="section-heading"><div><span class="eyebrow">3 žingsnis</span><h2>Įveskite patvirtinimo kodą</h2><p>Reali sistema kodą išsiųstų el. paštu. Kadangi tai demonstracija, kodas rodomas ekrane skliaustuose.</p></div></div><p>Jūsų demonstracinis kodas: <strong class="demo-code" id="demo-code">[KMS-0000]</strong></p><form id="verify-form" style="max-width:460px"><label class="field-label" for="verify-code">Patvirtinimo kodas</label><input class="field" id="verify-code" required inputmode="text" autocomplete="one-time-code" placeholder="KMS-0000"><div class="page-actions"><button class="button button--primary" type="submit">Patvirtinti kodą</button></div></form><p class="analysis-message" id="verify-status" role="status"></p></div><div class="wizard-panel" data-wizard-panel="done" hidden><div class="success-panel"><h2>Prenumerata aktyvi</h2><p>Pranešimų pasirinkimai išsaugoti. Phase 3 administravimo aplinka gali juos nuskaityti iš bendro demo localStorage rakto.</p><p class="fine-print" id="subscription-storage-note"></p></div></div><p class="analysis-message" id="subscription-status" role="status"></p><div class="erase-box"><h2>Vienu paspaudimu ištrinti savo duomenis</h2><p class="muted">Įrašykite prenumeratos el. paštą. Bus pašalinti visi su juo susieti demo prenumeratos įrašai.</p><form id="erase-form"><input class="field" id="erase-email" type="email" required placeholder="vardas@example.lt" aria-label="Prenumeratos el. paštas"><button class="button button--secondary" type="submit">Ištrinti mano duomenis</button></form><p class="analysis-message" id="erase-status" role="status"></p></div></section><div class="notice"><strong>BDAR demo paaiškinimas.</strong><span>Čia simuliuojami aiškus sutikimas, dvigubas patvirtinimas ir ištrynimas. Produkcijoje turi būti naudojamas saugus serverio procesas, galiojantis HTTPS ir patvirtinta privatumo politika.</span></div></div></main><footer class="site-footer"><div class="site-footer-inner"><div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Demonstracinė prenumeratos sąsaja. Tikras pranešimų siuntimas ir saugus serverio saugojimas įgyvendinami integracijos etape.</p></div><nav class="footer-links" aria-label="Poraštės nuorodos"><a href="admin/index.html">Valdymo pultas (demonstracija)</a><a href="privatumo-politika.html">Privatumo politika</a><a href="slapuku-politika.html">Slapukų politika</a><a href="vadovas.html">Naudotojo vadovas</a><a href="zemelapis.html">Žemėlapis</a></nav></div></footer><script type="module">import { initSubscription } from "../js/pages/subscription.js"; initSubscription();</script></body></html>
demo/pages\prenumerata.html-5-
--
demo/pages\admin\auditas.html-1-<!doctype html>
demo/pages\admin\auditas.html-2-<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Audito žurnalas · KMS AMIS</title><link rel="stylesheet" href="../../css/theme.css"><link rel="stylesheet" href="../../css/sections.css"></head>
demo/pages\admin\auditas.html:3:<body class="admin-body"><div class="admin-layout"><aside class="admin-sidebar" id="admin-sidebar"></aside><div class="admin-workspace"><header class="admin-topbar" id="admin-topbar"></header><main class="admin-main" id="admin-main"><section class="admin-page-hero"><div><p class="section-kicker">Atsekamumas · vaidmuo · rezultatas</p><h1>Audito žurnalas</h1><p class="lede">Filtruokite ir eksportuokite administravimo veiksmų pėdsaką iš bendro localStorage žurnalo.</p></div><aside class="admin-page-hero-aside"><strong>Ne tik sėkmės</strong><p>Žurnale saugomi ir nesėkmingi prisijungimai, kad demonstracija parodytų visą veiksmų seką.</p></aside></section><div class="admin-stack"><section class="surface surface-pad"><div class="admin-filter-row"><div class="field-group"><label class="field-label" for="audit-role">Vaidmuo</label><select class="select-field" id="audit-role"><option value="all">Visi vaidmenys</option><option value="administratorius">Administratorius</option><option value="specialistas">Specialistas</option><option value="sistema">Sistema</option></select></div><div class="field-group"><label class="field-label" for="audit-date">Data</label><input class="field" id="audit-date" type="date"></div><div class="field-group"><label class="field-label" for="audit-action">Veiksmo tipas</label><input class="field" id="audit-action" type="search" placeholder="pvz., patvirtin"></div><button class="button button--secondary button--small" id="audit-filter" type="button">Filtruoti</button><button class="button button--primary button--small" id="audit-export" type="button">Eksportuoti CSV</button></div><div class="data-table-wrap admin-table"><table class="data-table"><thead><tr><th>Laikas</th><th>Vaidmuo</th><th>Veiksmas</th><th>Taikinys</th><th>Rezultatas</th></tr></thead><tbody id="audit-table"></tbody></table></div></section></div></main></div></div><script type="module" src="../../js/pages/admin/auditas.js"></script></body></html>
--
demo/pages\slapuku-politika.html-2-<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="KMS AMIS slapukų politikos projektas."><link rel="icon" href="data:"><link rel="stylesheet" href="../css/theme.css"><link rel="stylesheet" href="../css/sections.css"><title>Slapukų politika | KMS AMIS</title></head>
demo/pages\slapuku-politika.html-3-<body><a class="skip-link" href="#turinys">Pereiti prie turinio</a><header class="site-header"><div class="header-inner"><a class="brand-lockup" href="../index.html" aria-label="KMS AMIS pagrindinis puslapis"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>Klaipėdos miesto savivaldybės aplinkos monitoringo informacinė sistema</strong><small>KMS AMIS · viešasis portalas</small></span></a><nav class="main-nav" aria-label="Pagrindinis meniu"><ul><li><details><summary>KMS AMIS</summary><ul><li><a href="bendra-info.html">Bendra informacija</a></li><li><a href="vadovas.html">Naudotojo vadovas</a></li></ul></details></li><li><details><summary>Klaipėdos miesto savivaldybės aplinkos monitoringas</summary><ul><li><a href="oro.html">Aplinkos oro monitoringas</a></li><li><a href="truksmas.html">Aplinkos triukšmo monitoringas</a></li><li><a href="dirvezemis.html">Dirvožemio monitoringas</a></li><li><a href="vanduo.html">Paviršinio vandens monitoringas</a></li><li><a href="gyvoji_gamta.html">Gyvosios gamtos monitoringas</a></li><li><a href="zeldynai.html">Želdynų ir želdinių monitoringas</a></li></ul></details></li><li><a href="ataskaitos.html">Monitoringo metinės ataskaitos</a></li><li><a href="prenumerata.html">Automatinių pranešimų prenumerata</a></li><li><a href="zemelapis.html">Interaktyvus žemėlapis</a></li></ul></nav></div><div class="brand-stripe" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div></header>
demo/pages\slapuku-politika.html:4:<main id="turinys" class="page-shell"><section class="page-hero"><div><p class="section-kicker">3.8.7 · slapukų dokumento projektas</p><h1>Slapukų politika</h1><p class="lede">Šis projektas paaiškina, kokios naršyklės technologijos gali būti naudojamos viešajame KMS AMIS portale.</p></div><aside class="page-hero-aside"><span class="privacy-version">Versija 1.0 · projektas</span><p>„Suderinama su Perkančiąja organizacija“ – dokumentas turi būti patvirtintas prieš viešą paleidimą.</p></aside></section><div class="content-stack"><section class="surface surface-pad text-page"><h2>1. Kas yra slapukai?</h2><p>Slapukas – nedidelis tekstinis įrašas, kurį svetainė gali išsaugoti naršyklėje. Šiame demo sąmoningai nenaudojami reklaminiai ar lankomumo profiliavimo slapukai.</p><h2>2. Demo naudojamos technologijos</h2><ul><li>Interaktyviam žemėlapiui naudojami išoriniai OpenStreetMap ir Esri žemėlapio sluoksniai.</li><li>Grafikams naudojama Chart.js biblioteka iš CDN. Ji negauna KMS AMIS prenumeratos duomenų.</li><li>Prenumeratos vedlys naudoja naršyklės <code>localStorage</code>, o ne slapuką, kad tame pačiame įrenginyje išsaugotų demo prenumeratos įrašą. Saugyklos raktas: <code>kms-amis-demo-subscriptions-v1</code>.</li></ul><h2>3. Kaip ištrinti?</h2><p>Demo prenumeratos duomenis galima ištrinti prenumeratos puslapio lauke „Vienu paspaudimu ištrinti savo duomenis“. Taip pat galima išvalyti svetainės duomenis naršyklės nustatymuose. Tikroje sistemoje būtinas aiškus sutikimo ir atsisakymo procesas, suderintas su Perkančiąja organizacija.</p><h2>4. Trečiųjų šalių turinys</h2><p>Žemėlapio plytelės ir Chart.js biblioteka įkeliami iš nurodytų išorinių paslaugų. Produkcijoje turi būti įvertinti jų prieinamumas, privatumas, talpyklos politika ir alternatyva, jei išorinis šaltinis nepasiekiamas.</p><h2>5. Dokumento statusas</h2><p>Šis tekstas yra privatumo ir slapukų dokumentų projekto dalis, versija 1.0. Jis turi būti peržiūrėtas, suderintas su Perkančiąja organizacija ir įtrauktas į galutinę KMS AMIS aplinką.</p></section></div></main><footer class="site-footer"><div class="site-footer-inner"><div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Slapukų politikos projektas, versija 1.0, suderinama su Perkančiąja organizacija.</p></div><nav class="footer-links" aria-label="Poraštės nuorodos"><a href="admin/index.html">Valdymo pultas (demonstracija)</a><a href="privatumo-politika.html">Privatumo politika</a><a href="vadovas.html">Naudotojo vadovas</a><a href="bendra-info.html">Bendra informacija</a><a href="zemelapis.html">Žemėlapis</a></nav></div></footer></body></html>
demo/pages\slapuku-politika.html-5-
--
demo/pages\ataskaitos.html-2-<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="KMS AMIS monitoringo metinės ataskaitos."><link rel="icon" href="data:"><link rel="stylesheet" href="../css/theme.css"><link rel="stylesheet" href="../css/sections.css"><title>Monitoringo metinės ataskaitos | KMS AMIS</title></head>
demo/pages\ataskaitos.html-3-<body><a class="skip-link" href="#turinys">Pereiti prie turinio</a><header class="site-header"><div class="header-inner"><a class="brand-lockup" href="../index.html" aria-label="KMS AMIS pagrindinis puslapis"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>Klaipėdos miesto savivaldybės aplinkos monitoringo informacinė sistema</strong><small>KMS AMIS · viešasis portalas</small></span></a><nav class="main-nav" aria-label="Pagrindinis meniu"><ul><li><details><summary>KMS AMIS</summary><ul><li><a href="bendra-info.html">Bendra informacija</a></li><li><a href="vadovas.html">Naudotojo vadovas</a></li></ul></details></li><li><details><summary>Klaipėdos miesto savivaldybės aplinkos monitoringas</summary><ul><li class="nav-group-label">Aplinkos oro monitoringas</li><li><a href="oro.html">Automatinių stotelių duomenys</a></li><li><a href="oro.html#laboratoriniai">Monitoringo (laboratoriniai) duomenys</a></li><li><a href="truksmas.html">Aplinkos triukšmo monitoringas</a></li><li><a href="dirvezemis.html">Dirvožemio monitoringas</a></li><li><a href="vanduo.html">Paviršinio vandens monitoringas</a></li><li class="nav-group-label">Gyvosios gamtos monitoringas</li><li><a href="gyvoji_gamta.html">Gyvosios gamtos monitoringas</a></li><li><a href="gyvoji_gamta.html#augalija">Augalijos monitoringas</a></li><li><a href="gyvoji_gamta.html#invazines">Invazinių rūšių monitoringas</a></li><li><a href="gyvoji_gamta.html#pauksciai">Paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#varniniai">Varninių paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#siksnosparniai">Šikšnosparnių monitoringas</a></li><li><a href="gyvoji_gamta.html#varliagyviai">Varliagyvių ir roplių monitoringas</a></li><li><a href="gyvoji_gamta.html#zuvys">Žuvų monitoringas</a></li><li><a href="zeldynai.html">Želdynų ir želdinių monitoringas</a></li></ul></details></li><li><a href="ataskaitos.html" aria-current="page">Monitoringo metinės ataskaitos</a></li><li><a href="prenumerata.html">Automatinių pranešimų prenumerata</a></li><li><a href="zemelapis.html">Interaktyvus žemėlapis</a></li></ul></nav></div><div class="brand-stripe" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div></header>
demo/pages\ataskaitos.html:4:<main id="turinys" class="page-shell"><section class="page-hero"><div><p class="section-kicker">3.6.4 · automatinė ataskaitų generacija</p><h1>Monitoringo metinės ataskaitos</h1><p class="lede">Pasirinkite ataskaitos metus. Demonstracinė peržiūra autoagreguoja skirtingų monitoringo dalių suvestines ir grafikus viename spausdinamame dokumente.</p><div class="page-actions"><a class="button button--secondary" href="zemelapis.html">Žemėlapis</a><button class="button button--primary" type="button" id="print-report">Spausdinti / PDF</button></div></div><aside class="page-hero-aside"><strong>PDF per naršyklės spausdinimą</strong><p>Ataskaitos peržiūros lange paspauskite „Spausdinti / PDF“ ir pasirinkite naršyklės PDF spausdintuvą. XLSX ir CSV eksportas paliktas integracijos etapui.</p></aside></section><div class="content-stack"><section class="surface surface-pad"><div class="section-heading"><div><span class="eyebrow">2022–2025 · viešos suvestinės</span><h2>Pasirinkite metus</h2><p>Nuorodos pateikiamos atsisiuntimo stiliumi, tačiau šiame demo jos atidaro gyvai sugeneruojamą ataskaitos vaizdą.</p></div></div><div class="report-list"><a class="report-link" href="#report-view" data-report-year="2022"><strong>2022</strong><span>Metinė suvestinė · atverti</span></a><a class="report-link" href="#report-view" data-report-year="2023"><strong>2023</strong><span>Metinė suvestinė · atverti</span></a><a class="report-link" href="#report-view" data-report-year="2024"><strong>2024</strong><span>Metinė suvestinė · atverti</span></a><a class="report-link" href="#report-view" data-report-year="2025"><strong>2025</strong><span>Metinė suvestinė · atverti</span></a></div></section><section class="report-sheet" id="report-view" aria-labelledby="report-title"><div class="report-cover"><span class="eyebrow">KMS AMIS · viešoji ataskaita</span><h2 id="report-title">Aplinkos monitoringo metinė ataskaita <span id="selected-report-year">2025</span></h2><p class="muted" id="report-period">Ruošiama…</p><p class="fine-print" id="report-note">Ruošiama…</p></div><section class="report-section"><h3>Monitoringo dalių suvestinis grafikas</h3><div class="report-chart"><canvas id="report-chart" aria-label="Monitoringo dalių metinių vidurkių diagrama"></canvas></div><p class="chart-caption">Skirtingų parametrų vienetai skiriasi, todėl grafikas skirtas struktūrai ir duomenų aprėpčiai pademonstruoti, o ne skirtingoms aplinkos sritims reitinguoti.</p></section><div id="report-sections"></div></section></div></main><footer class="site-footer"><div class="site-footer-inner"><div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Ataskaitos demonstracinės. Normos ir skaičiavimo metodai turi būti suderinti prieš priėmimo testavimą.</p></div><nav class="footer-links" aria-label="Poraštės nuorodos"><a href="admin/index.html">Valdymo pultas (demonstracija)</a><a href="privatumo-politika.html">Privatumo politika</a><a href="slapuku-politika.html">Slapukų politika</a><a href="vadovas.html">Naudotojo vadovas</a><a href="zemelapis.html">Žemėlapis</a></nav></div></footer><script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script><script type="module">import { initReports } from "../js/pages/reports.js"; initReports();</script></body></html>
demo/pages\ataskaitos.html-5-
--
demo/js\pages\home.js-58-  const dismissed = localStorage.getItem(PORTAL_BANNER_DISMISSED_KEY);
demo/js\pages\home.js-59-  if (dismissed === banner.id) { mount.innerHTML = ""; return; }
demo/js\pages\home.js:60:  mount.innerHTML = `<div class="notice portal-banner" role="status"><span><strong>Tinklapyje paskelbtas administracijos pranešimas:</strong> ${escapeHtml(banner.text)}</span><button class="button button--secondary button--small" type="button" aria-label="Uždaryti pranešimą">Uždaryti</button></div>`;
demo/js\pages\home.js-61-  mount.querySelector("button").addEventListener("click", () => {
demo/js\pages\home.js-62-    localStorage.setItem(PORTAL_BANNER_DISMISSED_KEY, banner.id);
--
demo/pages\vadovas.html-2-<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="KMS AMIS naudotojo vadovas."><link rel="icon" href="data:"><link rel="stylesheet" href="../css/theme.css"><link rel="stylesheet" href="../css/sections.css"><title>Naudotojo vadovas | KMS AMIS</title></head>
demo/pages\vadovas.html-3-<body><a class="skip-link" href="#turinys">Pereiti prie turinio</a><header class="site-header"><div class="header-inner"><a class="brand-lockup" href="../index.html" aria-label="KMS AMIS pagrindinis puslapis"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>Klaipėdos miesto savivaldybės aplinkos monitoringo informacinė sistema</strong><small>KMS AMIS · viešasis portalas</small></span></a><nav class="main-nav" aria-label="Pagrindinis meniu"><ul><li><details><summary>KMS AMIS</summary><ul><li><a href="bendra-info.html">Bendra informacija</a></li><li><a href="vadovas.html" aria-current="page">Naudotojo vadovas</a></li></ul></details></li><li><details><summary>Klaipėdos miesto savivaldybės aplinkos monitoringas</summary><ul><li class="nav-group-label">Aplinkos oro monitoringas</li><li><a href="oro.html">Automatinių stotelių duomenys</a></li><li><a href="oro.html#laboratoriniai">Monitoringo (laboratoriniai) duomenys</a></li><li><a href="truksmas.html">Aplinkos triukšmo monitoringas</a></li><li><a href="dirvezemis.html">Dirvožemio monitoringas</a></li><li><a href="vanduo.html">Paviršinio vandens monitoringas</a></li><li class="nav-group-label">Gyvosios gamtos monitoringas</li><li><a href="gyvoji_gamta.html">Gyvosios gamtos monitoringas</a></li><li><a href="gyvoji_gamta.html#augalija">Augalijos monitoringas</a></li><li><a href="gyvoji_gamta.html#invazines">Invazinių rūšių monitoringas</a></li><li><a href="gyvoji_gamta.html#pauksciai">Paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#varniniai">Varninių paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#siksnosparniai">Šikšnosparnių monitoringas</a></li><li><a href="gyvoji_gamta.html#varliagyviai">Varliagyvių ir roplių monitoringas</a></li><li><a href="gyvoji_gamta.html#zuvys">Žuvų monitoringas</a></li><li><a href="zeldynai.html">Želdynų ir želdinių monitoringas</a></li></ul></details></li><li><a href="ataskaitos.html">Monitoringo metinės ataskaitos</a></li><li><a href="prenumerata.html">Automatinių pranešimų prenumerata</a></li><li><a href="zemelapis.html">Interaktyvus žemėlapis</a></li></ul></nav></div><div class="brand-stripe" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div></header>
demo/pages\vadovas.html:4:<main id="turinys" class="page-shell"><section class="page-hero"><div><p class="section-kicker">3.10.1.1.1.2 · pagalba</p><h1>Naudotojo vadovas</h1><p class="lede">Keturi trumpi būdai, kaip iš viešojo portalo gauti atsakymą apie Klaipėdos aplinką.</p></div><aside class="page-hero-aside"><strong>Pradėkite nuo klausimo</strong><p>Kur yra taškas? Koks buvo rodiklis? Ar reikšmė viršijo normą? Kada noriu gauti pranešimą?</p></aside></section><div class="content-stack"><section class="surface surface-pad text-page"><div class="howto-grid"><article class="howto"><span class="step-number">1</span><h3>Žemėlapis</h3><p>Atverkite <a href="zemelapis.html">interaktyvų žemėlapį</a>. Kairėje pasirinkite monitoringo dalį, mikrorajoną, tašką, parametrą ir normos lygį. Taškai nuspalvinami pagal paskutinio matavimo santykį su norma.</p><p>Paspauskite tašką, kad pamatytumėte pavadinimą, LKS-94 aproksimaciją, mikrorajoną, naujausią reikšmę, vidurkį, normą ir atnaujinimo laiką. „Matuoti atstumą“ leidžia pasirinkti du taškus.</p></article><article class="howto"><span class="step-number">2</span><h3>Filtrai</h3><p>Monitoringo dalies puslapyje nustatykite laikotarpį, duomenų tipą, mikrorajoną, adresą, taško kodą ar pavadinimą, parametrą ir, jei reikia, pažymėkite „Rodyti tik viršijimų atvejus“.</p><p>Keliose vietose pasirinkite taškus su Ctrl / Cmd klavišu. Reti laboratoriniai, dirvožemio, vandens ir biologiniai įrašai geriau matomi pasirinkus 12–24 mėnesių laikotarpį.</p></article><article class="howto"><span class="step-number">3</span><h3>Analizė</h3><p>Statistikos bloke rasite mažiausią, didžiausią, vidutinę reikšmę, viršijimų kiekį ir tendenciją, palygintą su ankstesniu tokios pačios trukmės laikotarpiu.</p><p>Linijų grafike oranžiniai taškai reiškia ribinės normos viršijimą. Taškų palyginimas rodo pasirinktų vietų vidurkius. Oro ir triukšmo puslapiuose sklaidos grafikas pateikia Pirsono koeficientą.</p></article><article class="howto"><span class="step-number">4</span><h3>Prenumerata</h3><p><a href="prenumerata.html">Prenumeratos vedlyje</a> pirmiausia pažymėkite dominančius rajonus, monitoringo dalis, taškus ir parametrus. Tik tada įveskite el. paštą ir duokite aiškų sutikimą.</p><p>Patvirtinus formą, įveskite ekrane skliaustuose parodytą demo kodą. Prenumeratą galite ištrinti įrašę tą patį el. paštą ištrynimo laukelyje.</p></article></div><h2>Prieinamumo patarimai</h2><ul><li>Tab klavišu pereikite per valdiklius; aktyvus elementas turi mėlyną fokusą.</li><li>Grafikų duomenys pakartojami lentelėse arba suvestinėse po grafiku.</li><li>Mažesniame ekrane meniu slenka horizontaliai, o analizės blokai persirikiuoja į vieną stulpelį.</li><li>Įjungus sumažinto judesio nustatymą, perėjimai ir slinkimas sutrumpinami.</li></ul></section></div></main><footer class="site-footer"><div class="site-footer-inner"><div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Demonstracinė naudotojo vadovo versija.</p></div><nav class="footer-links" aria-label="Poraštės nuorodos"><a href="admin/index.html">Valdymo pultas (demonstracija)</a><a href="privatumo-politika.html">Privatumo politika</a><a href="slapuku-politika.html">Slapukų politika</a><a href="bendra-info.html">Bendra informacija</a><a href="zemelapis.html">Žemėlapis</a></nav></div></footer></body></html>
demo/pages\vadovas.html-5-
--
demo/pages\gyvoji_gamta.html-2-<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Klaipėdos gyvosios gamtos monitoringo analizė."><link rel="icon" href="data:"><link rel="stylesheet" href="../css/theme.css"><link rel="stylesheet" href="../css/sections.css"><title>Gyvosios gamtos monitoringas | KMS AMIS</title></head>
demo/pages\gyvoji_gamta.html-3-<body><a class="skip-link" href="#turinys">Pereiti prie turinio</a><header class="site-header"><div class="header-inner"><a class="brand-lockup" href="../index.html" aria-label="KMS AMIS pagrindinis puslapis"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>Klaipėdos miesto savivaldybės aplinkos monitoringo informacinė sistema</strong><small>KMS AMIS · viešasis portalas</small></span></a><nav class="main-nav" aria-label="Pagrindinis meniu"><ul><li><details><summary>KMS AMIS</summary><ul><li><a href="bendra-info.html">Bendra informacija</a></li><li><a href="vadovas.html">Naudotojo vadovas</a></li></ul></details></li><li><details><summary>Klaipėdos miesto savivaldybės aplinkos monitoringas</summary><ul><li class="nav-group-label">Aplinkos oro monitoringas</li><li><a href="oro.html">Automatinių stotelių duomenys</a></li><li><a href="oro.html#laboratoriniai">Monitoringo (laboratoriniai) duomenys</a></li><li><a href="truksmas.html">Aplinkos triukšmo monitoringas</a></li><li><a href="dirvezemis.html">Dirvožemio monitoringas</a></li><li><a href="vanduo.html">Paviršinio vandens monitoringas</a></li><li class="nav-group-label">Gyvosios gamtos monitoringas</li><li><a href="gyvoji_gamta.html" aria-current="page">Gyvosios gamtos monitoringas</a></li><li><a href="#augalija">Augalijos monitoringas</a></li><li><a href="#invazines">Invazinių rūšių monitoringas</a></li><li><a href="#pauksciai">Paukščių monitoringas</a></li><li><a href="#varniniai">Varninių paukščių monitoringas</a></li><li><a href="#siksnosparniai">Šikšnosparnių monitoringas</a></li><li><a href="#varliagyviai">Varliagyvių ir roplių monitoringas</a></li><li><a href="#zuvys">Žuvų monitoringas</a></li><li><a href="zeldynai.html">Želdynų ir želdinių monitoringas</a></li></ul></details></li><li><a href="ataskaitos.html">Monitoringo metinės ataskaitos</a></li><li><a href="prenumerata.html">Automatinių pranešimų prenumerata</a></li><li><a href="zemelapis.html">Interaktyvus žemėlapis</a></li></ul></nav></div><div class="brand-stripe" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div></header>
demo/pages\gyvoji_gamta.html:4:<main id="turinys" class="page-shell"><section class="page-hero"><div><p class="section-kicker">3.10.1.1.2.5 · gyvosios gamtos dalys</p><h1>Gyvosios gamtos monitoringas</h1><p class="lede">Vienoje vietoje palyginkite augalijos, invazinių rūšių, paukščių, šikšnosparnių, varliagyvių, roplių ir žuvų stebėjimų rodiklius.</p><div class="page-actions"><a class="button button--primary" href="zemelapis.html?section=wildlife">Atverti taškus žemėlapyje →</a><a class="button button--secondary" href="ataskaitos.html">Metinė ataskaita</a></div></div><aside class="page-hero-aside"><strong>Rūšių skaičius + gausumas</strong><p>Metų diagrama rodo pasirinktų taškų vidurkį, o lentelė leidžia patikrinti kiekvieną tašką atskirai.</p></aside></section><div class="content-stack"><section class="surface surface-pad"><div class="section-heading"><div><span class="eyebrow">7 potemės · metiniai pjūviai</span><h2 id="wildlife-active-title">Augalijos monitoringas</h2><p id="wildlife-active-description">Rūšių skaičius ir augalijos padengimo / gausumo balai.</p></div><span class="status-chip" id="wildlife-status" role="status">Ruošiama…</span></div><div class="subsection-switcher" id="wildlife-tabs" role="tablist" aria-label="Gyvosios gamtos monitoringo potemės"></div><div id="wildlife-panel" role="tabpanel" tabindex="0"><div class="analysis-filter-grid" style="margin-bottom:18px"><div class="field-group field-group--wide"><label class="field-label" for="wildlife-sites">Stebėjimo taškai</label><select class="select-field" id="wildlife-sites" multiple aria-describedby="wildlife-sites-help"></select><p class="field-help" id="wildlife-sites-help">Pasirinkite vieną ar kelis taškus. Palyginimas grupuoja metus ir atskiria matavimo vienetus.</p></div></div><section class="chart-panel"><h3>Metų palyginimas</h3><div class="chart-wrap"><canvas id="wildlife-chart" aria-label="Gyvosios gamtos rodiklių grupuota metų diagrama"></canvas></div><p class="chart-caption">Kairė skalė – rūšių skaičius; dešinė skalė – gausumas arba padengimo balai.</p></section><div class="data-table-wrap" style="margin-top:18px" id="wildlife-table"></div></div></section><div class="notice"><strong>Periodiškumas.</strong><span>Gyvosios gamtos stebėjimai yra sezoniniai ir periodiniai. Trūkstami metai reiškia, kad tame taške tais metais nebuvo įrašo, o ne kad rūšis buvo nerasta.</span></div></div></main><footer class="site-footer"><div class="site-footer-inner"><div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Demonstraciniai biologiniai rodikliai pateikti sąsajos ir analizės funkcijoms pademonstruoti.</p></div><nav class="footer-links" aria-label="Poraštės nuorodos"><a href="admin/index.html">Valdymo pultas (demonstracija)</a><a href="privatumo-politika.html">Privatumo politika</a><a href="slapuku-politika.html">Slapukų politika</a><a href="vadovas.html">Naudotojo vadovas</a><a href="zemelapis.html">Žemėlapis</a></nav></div></footer><script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script><script type="module">import { initWildlife } from "../js/pages/wildlife.js"; initWildlife();</script></body></html>
demo/pages\gyvoji_gamta.html-5-
--
demo/pages\truksmas.html-2-<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Klaipėdos aplinkos triukšmo monitoringo analizė."><link rel="icon" href="data:"><link rel="stylesheet" href="../css/theme.css"><link rel="stylesheet" href="../css/sections.css"><title>Aplinkos triukšmo monitoringas | KMS AMIS</title></head>
demo/pages\truksmas.html-3-<body><a class="skip-link" href="#turinys">Pereiti prie turinio</a><header class="site-header"><div class="header-inner"><a class="brand-lockup" href="../index.html" aria-label="KMS AMIS pagrindinis puslapis"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>Klaipėdos miesto savivaldybės aplinkos monitoringo informacinė sistema</strong><small>KMS AMIS · viešasis portalas</small></span></a><nav class="main-nav" aria-label="Pagrindinis meniu"><ul><li><details><summary>KMS AMIS</summary><ul><li><a href="bendra-info.html">Bendra informacija</a></li><li><a href="vadovas.html">Naudotojo vadovas</a></li></ul></details></li><li><details><summary>Klaipėdos miesto savivaldybės aplinkos monitoringas</summary><ul><li class="nav-group-label">Aplinkos oro monitoringas</li><li><a href="oro.html">Automatinių stotelių duomenys</a></li><li><a href="oro.html#laboratoriniai">Monitoringo (laboratoriniai) duomenys</a></li><li><a href="truksmas.html" aria-current="page">Aplinkos triukšmo monitoringas</a></li><li><a href="dirvezemis.html">Dirvožemio monitoringas</a></li><li><a href="vanduo.html">Paviršinio vandens monitoringas</a></li><li class="nav-group-label">Gyvosios gamtos monitoringas</li><li><a href="gyvoji_gamta.html">Gyvosios gamtos monitoringas</a></li><li><a href="gyvoji_gamta.html#augalija">Augalijos monitoringas</a></li><li><a href="gyvoji_gamta.html#invazines">Invazinių rūšių monitoringas</a></li><li><a href="gyvoji_gamta.html#pauksciai">Paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#varniniai">Varninių paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#siksnosparniai">Šikšnosparnių monitoringas</a></li><li><a href="gyvoji_gamta.html#varliagyviai">Varliagyvių ir roplių monitoringas</a></li><li><a href="gyvoji_gamta.html#zuvys">Žuvų monitoringas</a></li><li><a href="zeldynai.html">Želdynų ir želdinių monitoringas</a></li></ul></details></li><li><a href="ataskaitos.html">Monitoringo metinės ataskaitos</a></li><li><a href="prenumerata.html">Automatinių pranešimų prenumerata</a></li><li><a href="zemelapis.html">Interaktyvus žemėlapis</a></li></ul></nav></div><div class="brand-stripe" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div></header>
demo/pages\truksmas.html:4:<main id="turinys" class="page-shell"><section class="page-hero"><div><p class="section-kicker">3.6.1–3.6.3 · triukšmo rodikliai</p><h1>Aplinkos triukšmo monitoringas</h1><p class="lede">Palyginkite septynis triukšmo rodiklius pagal vietą ir laiką. Garso lygio vidurkis pateikiamas logaritmiškai, nes decibelai matuoja santykinę garso galią.</p><div class="page-actions"><a class="button button--primary" href="zemelapis.html?section=noise">Atverti žemėlapyje →</a><a class="button button--secondary" href="ataskaitos.html">Metinė ataskaita</a></div></div><aside class="page-hero-aside"><strong>Logaritminis vidurkis</strong><p>Naudojama formulė 10 × log₁₀ (vidurkis(10^(Lᵢ/10))). Taip keli garsūs įvykiai nėra paslepiami paprastu aritmetiniu vidurkiu.</p></aside></section><div class="content-stack"><section class="analysis-panel surface surface-pad" data-analysis-section="noise" data-default-period="730d"><div class="section-heading"><div><span class="eyebrow">7 rodikliai · dBA</span><h2>Triukšmo duomenų analizė</h2><p>Filtruokite pagal laikotarpį, tašką ir parametrą. Paros, savaitės, mėnesio ir metų suvestinės priklauso nuo pasirinkto laikotarpio.</p></div><span class="status-chip" data-role="status" role="status">Ruošiama…</span></div><div class="analysis-filter-grid"><div class="field-group"><label class="field-label" for="noise-period">Laikotarpis</label><select class="select-field" id="noise-period" data-field="period"><option value="365d">12 mėnesių</option><option value="730d">24 mėnesiai</option></select></div><div class="field-group"><label class="field-label" for="noise-type">Duomenų tipas</label><select class="select-field" id="noise-type" data-field="type"><option value="all">Automatiniai ir istoriniai</option><option value="historical">Periodiniai / istoriniai</option></select></div><div class="field-group"><label class="field-label" for="noise-district">Mikrorajonas</label><select class="select-field" id="noise-district" data-field="district"></select></div><div class="field-group"><label class="field-label" for="noise-address">Adresas</label><select class="select-field" id="noise-address" data-field="address"></select></div><div class="field-group"><label class="field-label" for="noise-part">Monitoringo dalis</label><select class="select-field" id="noise-part" data-field="part"></select></div><div class="field-group"><label class="field-label" for="noise-code">Taško kodas / pavadinimas</label><input id="noise-code" data-field="code" type="search" placeholder="pvz., KA-03"></div><div class="field-group field-group--wide"><label class="field-label" for="noise-sites">Monitoringo taškai</label><select class="select-field" id="noise-sites" data-field="sites" multiple aria-describedby="noise-site-count"></select><p class="field-help" id="noise-site-count" data-role="site-count"></p></div><div class="field-group"><label class="field-label" for="noise-parameter">Triukšmo parametras</label><select class="select-field" id="noise-parameter" data-field="parameter"></select></div><label class="checkline"><input type="checkbox" data-field="exceedances"> Rodyti tik viršijimų atvejus</label><div class="filter-actions"><button class="button button--primary" type="button" data-action="apply">Atnaujinti analizę</button></div></div><p class="analysis-message" data-role="norm"></p><div class="stats-grid" data-role="stats"></div><div class="notice"><strong>Kaip skaityti vidurkį?</strong><span>Decibelų skalė yra logaritminė: 10 dBA skirtumas reiškia maždaug dešimteriopą garso galios santykio pokytį. Todėl statistikoje rodomas logaritminis, o ne paprastas aritmetinis vidurkis.</span></div><div class="chart-grid"><section class="chart-panel"><h3>Triukšmo laiko eilutė</h3><p>Virš ribinės normos esančios reikšmės paryškintos oranžine spalva.</p><div class="chart-wrap"><canvas data-chart="time" aria-label="Triukšmo rodiklio laiko eilutės grafikas"></canvas></div></section><section class="chart-panel"><h3>Taškų palyginimas</h3><p>Stulpeliai rodo logaritminį vidurkį pagal tašką.</p><div class="chart-wrap chart-wrap--short"><canvas data-chart="compare" aria-label="Triukšmo taškų palyginimo grafikas"></canvas></div></section></div><section class="chart-panel" style="margin-top:18px"><h3>Koreliacija: vėjo greitis ir triukšmo rodiklis</h3><div class="correlation-copy"><strong class="correlation-r" data-role="pearson">r = –</strong><p><span data-role="correlation-explain">Ruošiama…</span> Tai statistinis ryšys, o ne priežasties įrodymas.</p></div><div class="chart-wrap chart-wrap--short"><canvas data-chart="correlation" aria-label="Vėjo greičio ir triukšmo sklaidos diagrama"></canvas></div></section><div class="data-table-wrap" style="margin-top:18px" data-role="station-table"></div></section></div></main><footer class="site-footer"><div class="site-footer-inner"><div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Demonstraciniai duomenys ir normos nėra teisinė išvada. Tikslinamos reikšmės turi būti patvirtintos prieš diegimą.</p></div><nav class="footer-links" aria-label="Poraštės nuorodos"><a href="admin/index.html">Valdymo pultas (demonstracija)</a><a href="privatumo-politika.html">Privatumo politika</a><a href="slapuku-politika.html">Slapukų politika</a><a href="vadovas.html">Naudotojo vadovas</a><a href="zemelapis.html">Žemėlapis</a></nav></div></footer><script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script><script type="module">import { initAnalysisPanel, setAnalysisDateBounds } from "../js/pages/analysis.js"; initAnalysisPanel(document.querySelector("[data-analysis-section]")); setAnalysisDateBounds();</script></body></html>
demo/pages\truksmas.html-5-
--
demo/pages\vanduo.html-2-<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Klaipėdos paviršinio vandens monitoringo analizė."><link rel="icon" href="data:"><link rel="stylesheet" href="../css/theme.css"><link rel="stylesheet" href="../css/sections.css"><title>Paviršinio vandens monitoringas | KMS AMIS</title></head>
demo/pages\vanduo.html-3-<body><a class="skip-link" href="#turinys">Pereiti prie turinio</a><header class="site-header"><div class="header-inner"><a class="brand-lockup" href="../index.html" aria-label="KMS AMIS pagrindinis puslapis"><span class="brand-mark" aria-hidden="true">KMS</span><span><strong>Klaipėdos miesto savivaldybės aplinkos monitoringo informacinė sistema</strong><small>KMS AMIS · viešasis portalas</small></span></a><nav class="main-nav" aria-label="Pagrindinis meniu"><ul><li><details><summary>KMS AMIS</summary><ul><li><a href="bendra-info.html">Bendra informacija</a></li><li><a href="vadovas.html">Naudotojo vadovas</a></li></ul></details></li><li><details><summary>Klaipėdos miesto savivaldybės aplinkos monitoringas</summary><ul><li class="nav-group-label">Aplinkos oro monitoringas</li><li><a href="oro.html">Automatinių stotelių duomenys</a></li><li><a href="oro.html#laboratoriniai">Monitoringo (laboratoriniai) duomenys</a></li><li><a href="truksmas.html">Aplinkos triukšmo monitoringas</a></li><li><a href="dirvezemis.html">Dirvožemio monitoringas</a></li><li><a href="vanduo.html" aria-current="page">Paviršinio vandens monitoringas</a></li><li class="nav-group-label">Gyvosios gamtos monitoringas</li><li><a href="gyvoji_gamta.html">Gyvosios gamtos monitoringas</a></li><li><a href="gyvoji_gamta.html#augalija">Augalijos monitoringas</a></li><li><a href="gyvoji_gamta.html#invazines">Invazinių rūšių monitoringas</a></li><li><a href="gyvoji_gamta.html#pauksciai">Paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#varniniai">Varninių paukščių monitoringas</a></li><li><a href="gyvoji_gamta.html#siksnosparniai">Šikšnosparnių monitoringas</a></li><li><a href="gyvoji_gamta.html#varliagyviai">Varliagyvių ir roplių monitoringas</a></li><li><a href="gyvoji_gamta.html#zuvys">Žuvų monitoringas</a></li><li><a href="zeldynai.html">Želdynų ir želdinių monitoringas</a></li></ul></details></li><li><a href="ataskaitos.html">Monitoringo metinės ataskaitos</a></li><li><a href="prenumerata.html">Automatinių pranešimų prenumerata</a></li><li><a href="zemelapis.html">Interaktyvus žemėlapis</a></li></ul></nav></div><div class="brand-stripe" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div></header>
demo/pages\vanduo.html:4:<main id="turinys" class="page-shell"><section class="page-hero"><div><p class="section-kicker">3.6.1–3.6.3 · paviršinio vandens būklė</p><h1>Paviršinio vandens monitoringas</h1><p class="lede">Stebėkite azoto ir fosforo junginius, BDS7, ištirpusį deguonį, Seki gylį, fitoplanktono ir makrobestuburių rodiklius pagal vandens telkinio tašką.</p><div class="page-actions"><a class="button button--primary" href="zemelapis.html?section=surface-water">Atverti žemėlapyje →</a><a class="button button--secondary" href="ataskaitos.html">Metinė ataskaita</a></div></div><aside class="page-hero-aside"><strong>Periodinis penkerių metų ciklas</strong><p>Demonstracijoje pateikiamas metinis pjūvis. Realiame plane vandens būklės matavimai ir biologiniai tyrimai gali būti kartojami per penkerių metų programos ciklą.</p></aside></section><div class="content-stack"><section class="surface surface-pad" data-periodic-section="surface-water" data-presentation="line" data-default-period="730d"><div class="section-heading"><div><span class="eyebrow">Cheminiai ir biologiniai rodikliai</span><h2>Vandens telkinių taškų duomenys</h2><p>Pasirinkite parametrą ir vieną ar kelis taškus. Laiko eilutė ir lentelė išlieka naudingos net tada, kai matavimai yra reti.</p></div><span class="status-chip" data-role="status" role="status">Ruošiama…</span></div><div class="periodic-layout"><aside class="periodic-filters" aria-label="Paviršinio vandens filtrai"><div class="field-group"><label class="field-label" for="water-period">Laikotarpis</label><select class="select-field" id="water-period" data-field="period"><option value="365d">12 mėnesių</option><option value="730d">24 mėnesiai</option></select></div><div class="field-group"><label class="field-label" for="water-district">Mikrorajonas</label><select class="select-field" id="water-district" data-field="district"></select></div><div class="field-group"><label class="field-label" for="water-sites">Vandens telkinio taškai</label><select class="select-field" id="water-sites" data-field="sites" multiple></select></div><div class="field-group"><label class="field-label" for="water-parameter">Parametras</label><select class="select-field" id="water-parameter" data-field="parameter"></select></div><button class="button button--primary" type="button" data-action="apply">Atnaujinti</button></aside><div class="periodic-results"><div class="periodic-summary" data-role="summary"></div><section class="chart-panel periodic-chart"><h3>Vandens rodiklio laiko eilutė</h3><div class="chart-wrap chart-wrap--short"><canvas data-chart="main" aria-label="Paviršinio vandens parametro laiko eilutė"></canvas></div></section><div class="data-table-wrap" style="margin-top:18px" data-role="table"></div></div></div></section><div class="notice"><strong>Apie duomenų retumą.</strong><span>Vandens cheminiai ir biologiniai tyrimai nėra valandiniai. Penkerių metų periodiškumas reiškia programos planavimo ciklą, o atskiras parametras gali būti matuojamas vieną ar kelis kartus per metus.</span></div></div></main><footer class="site-footer"><div class="site-footer-inner"><div><strong>Klaipėdos miesto savivaldybė · KMS AMIS</strong><p>Demonstraciniai duomenys ir normų lygiai turi būti patvirtinti prieš diegimą.</p></div><nav class="footer-links" aria-label="Poraštės nuorodos"><a href="admin/index.html">Valdymo pultas (demonstracija)</a><a href="privatumo-politika.html">Privatumo politika</a><a href="slapuku-politika.html">Slapukų politika</a><a href="vadovas.html">Naudotojo vadovas</a><a href="zemelapis.html">Žemėlapis</a></nav></div></footer><script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.7/dist/chart.umd.min.js"></script><script type="module">import { initPeriodic } from "../js/pages/periodic.js"; initPeriodic(document.querySelector("[data-periodic-section]"));</script></body></html>
demo/pages\vanduo.html-5-
--
demo/js\pages\admin\nevalidus.js-33-      const parameter = getParameter(row.parameterId);
demo/js\pages\admin\nevalidus.js-34-      const siteData = getSite(row.siteId) || getPeriodicSite(row.siteId);
demo/js\pages\admin\nevalidus.js:35:      const edit = editingId === row.id ? `<div class="admin-inline-edit"><input data-edit-value="${row.id}" type="number" step="any" aria-label="Nauja ${escapeHtml(parameter?.name || row.parameterId)} reikšmė (${escapeHtml(row.siteId)})" value="${row.value}"><button class="button button--primary" data-action="approve-edit" data-id="${row.id}" type="button">Išsaugoti</button></div>` : row.status === "GALIOJANTIS" ? "<span class=\"fine-print\">Sprendimas įrašytas</span>" : `<div class="admin-inline-actions"><button class="button button--primary" data-action="approve" data-id="${row.id}" type="button">Patvirtinti</button><button class="button button--secondary" data-action="edit" data-id="${row.id}" type="button">Redaguoti ir patvirtinti</button><button class="button button--secondary" data-action="keep" data-id="${row.id}" type="button">Laikyti nepatvirtintu</button></div>`;
demo/js\pages\admin\nevalidus.js-36-      return `<tr><td>${formatDateTime(row.timestamp)}<small>${escapeHtml(row.createdAt ? `gauta ${formatDateTime(row.createdAt)}` : "")}</small></td><td><strong>${escapeHtml(row.siteId)}</strong><small>${escapeHtml(siteData?.name || "")}</small></td><td>${escapeHtml(parameter?.name || row.parameterId)}</td><td>${formatNumber(row.value)} ${escapeHtml(parameter?.unit || "")}</td><td>${escapeHtml(row.flag || "–")}</td><td><span class="admin-chip ${statusClass(row.status)}">${escapeHtml(row.status)}</span></td><td>${edit}</td></tr>`;
demo/js\pages\admin\nevalidus.js-37-    }).join("") || `<tr><td colspan="7">Pagal filtrus įrašų nėra.</td></tr>`;
--
demo/pages\admin\duomenys.html-4-<section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">10 stotelių · 5 IoT · 1 sluoksnis</span><h2>Priėmimo šaltiniai</h2><p>Protokolai rodo demonstracinį perdavimo būdą pagal šaltinio tipą.</p></div></div><div class="data-table-wrap admin-table"><table class="data-table"><thead><tr><th>Šaltinis</th><th>Pardavėjas / tipas</th><th>Protokolas</th><th>Dažnis</th><th>Būsena</th></tr></thead><tbody id="sources-table"></tbody></table></div></section>
demo/pages\admin\duomenys.html-5-<section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Sujungta su peržiūros skydu</span><h2>Priėmimo žurnalas</h2><p>Paskutiniai srauto įvykiai ir rankiniai įrašai vienoje vietoje.</p></div></div><div class="data-table-wrap admin-table"><table class="data-table"><thead><tr><th>Laikas</th><th>Šaltinis</th><th>Parametras</th><th>Įrašai</th><th>Protokolas</th><th>Būsena</th></tr></thead><tbody id="ingestion-log"></tbody></table></div></section>
demo/pages\admin\duomenys.html:6:<section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Rankinis įrašas</span><h2>Laboratorinių duomenų suvedimas</h2><p>Pasirinkite skyrių, tašką, parametrą ir datą. Įrašas bus matomas viešojo portalo užklausose.</p></div></div><form id="manual-form" class="admin-form-grid"><div class="field-group"><label class="field-label" for="manual-section">Monitoringo dalis</label><select class="select-field" id="manual-section" required></select></div><div class="field-group"><label class="field-label" for="manual-site">Taškas</label><select class="select-field" id="manual-site" required></select></div><div class="field-group field-group--wide"><label class="field-label" for="manual-parameter">Parametras</label><select class="select-field" id="manual-parameter" required></select></div><div class="field-group"><label class="field-label" for="manual-date">Data ir laikas</label><input class="field" id="manual-date" type="datetime-local" required></div><div class="field-group"><label class="field-label" for="manual-value">Reikšmė</label><input class="field" id="manual-value" type="number" step="any" required></div><label class="checkline"><input id="manual-invalid" type="checkbox"> Pažymėti kaip nevalidų</label><div class="admin-form-actions"><button class="button button--primary" type="submit">Išsaugoti įrašą</button></div></form><p class="admin-form-message" id="manual-message" hidden></p></section>
demo/pages\admin\duomenys.html-7-<section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">BF-*</span><h2>Perdavimo paketai</h2><p>Istoriniai paketai rodomi kaip priimti pagal demonstracijos istoriją.</p></div></div><div class="data-table-wrap admin-table"><table class="data-table"><thead><tr><th>Paketas</th><th>Šaltiniai</th><th>Priėmimo data</th><th>Būsena</th></tr></thead><tbody><tr><td><strong>BF-2025-11-25-A</strong></td><td>KA-02, IoT-02</td><td>2025 m. lapkričio 25 d. 08:40</td><td><span class="admin-chip admin-status-ok">Priimtas</span></td></tr><tr><td>BF-2026-03-14-B</td><td>KA-04, KA-05</td><td>2026 m. kovo 14 d. 10:15</td><td><span class="admin-chip admin-status-ok">Priimtas</span></td></tr></tbody></table></div><form id="backfill-form" class="page-actions"><label class="button button--secondary">Naujo perdavimo paketo importas<input id="backfill-file" type="file" accept=".csv,.xlsx,.xls" hidden></label><span class="fine-print">CSV / XLSX failas tik simuliuojamas.</span></form><p class="analysis-message" id="backfill-message" role="status"></p></section>
demo/pages\admin\duomenys.html-8-</div></main></div></div><script type="module" src="../../js/pages/admin/duomenys.js"></script></body></html>
--
demo/pages\admin\nustatymai.html-1-<!doctype html>
demo/pages\admin\nustatymai.html-2-<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Nustatymai · KMS AMIS</title><link rel="stylesheet" href="../../css/theme.css"><link rel="stylesheet" href="../../css/sections.css"></head>
demo/pages\admin\nustatymai.html:3:<body class="admin-body"><div class="admin-layout"><aside class="admin-sidebar" id="admin-sidebar"></aside><div class="admin-workspace"><header class="admin-topbar" id="admin-topbar"></header><main class="admin-main" id="admin-main"><section class="admin-page-hero"><div><p class="section-kicker">Administratoriaus konfigūracija</p><h1>Nustatymai</h1><p class="lede">Tvarkykite stotelių nepasiekiamumo slenkstį, duomenų tikrinimo taisykles ir demonstracinės saugyklos ribas.</p></div><aside class="admin-page-hero-aside"><strong>Geltonojo demonstravimo režimo įspėjimas</strong><p>Šie nustatymai yra demonstraciniai ir nevaldo tikro priėmimo serverio, stotelių ar API srauto.</p></aside></section><div class="admin-stack"><section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Stotelės</span><h2>Neprisijungimo nustatymai</h2></div></div><form id="settings-form"><div class="admin-form-grid"><div class="field-group"><label class="field-label" for="offline-minutes">Nepasiekiamumo aptikimas (min.)</label><input class="field" id="offline-minutes" type="number" min="1" max="1440" value="30"></div><div class="field-group"><label class="field-label" for="cache-ttl">Talpyklos galiojimas (s)</label><input class="field" id="cache-ttl" type="number" min="0" value="300"></div><div class="field-group"><label class="field-label" for="rate-limit">Užklausų riba (užklausos / min. / IP)</label><input class="field" id="rate-limit" type="number" min="1" value="60"></div></div><h2 style="margin-top:28px">Validavimo taisyklės</h2><div id="validation-rules" class="admin-rule-list" style="margin-top:12px"></div><div class="page-actions"><button class="button button--primary" type="submit">Išsaugoti nustatymus</button></div></form><p class="analysis-message" id="settings-message" role="status"></p></section></div></main></div></div><script type="module" src="../../js/pages/admin/nustatymai.js"></script></body></html>
--
demo/pages\admin\sla.html-1-<!doctype html>
demo/pages\admin\sla.html-2-<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>SLA bilietai · KMS AMIS</title><link rel="stylesheet" href="../../css/theme.css"><link rel="stylesheet" href="../../css/sections.css"></head>
demo/pages\admin\sla.html:3:<body class="admin-body"><div class="admin-layout"><aside class="admin-sidebar" id="admin-sidebar"></aside><div class="admin-workspace"><header class="admin-topbar" id="admin-topbar"></header><main class="admin-main" id="admin-main"><section class="admin-page-hero"><div><p class="section-kicker">Palaikymas · terminai · reagavimas</p><h1>SLA bilietai</h1><p class="lede">Sekite klaidų lygius, reakcijos ir ištaisymo terminus, būsenas bei likusį demonstracinį laiką.</p></div><aside class="admin-page-hero-aside"><strong>Fiksuotas demo laikas</strong><p>Atgalinis skaičiavimas perskaičiuojamas pagal 2026 m. spalio 1 d. 12:00 laiką.</p></aside></section><div class="admin-stack"><section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">I–IV lygiai</span><h2>Bilietų lentelė</h2></div></div><div class="data-table-wrap admin-table"><table class="data-table"><thead><tr><th>Bilietas</th><th>Klaidos lygis</th><th>Klaidos aprašymas ir kriterijai</th><th>Maksimalus reakcijos laikas</th><th>Maksimalus ištaisymo laikas</th><th>Suminis klaidos ištaisymo laikas</th><th>Paslaugų teikimo režimas</th><th>Taikinys</th><th>Likutis / būsena</th><th>Būsena</th></tr></thead><tbody id="sla-table"></tbody></table></div></section><section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Naujas įrašas</span><h2>Sukurti SLA bilietą</h2><p>Numatytasis lygis — III; formoje galima pasirinkti ir IV.</p></div></div><form id="sla-form" class="admin-form-grid"><div class="field-group"><label class="field-label" for="sla-level">Klaidos lygis</label><select class="select-field" id="sla-level"><option value="III">III lygis</option><option value="IV">IV lygis</option><option value="II">II lygis</option><option value="I">I lygis</option></select></div><div class="field-group"><label class="field-label" for="sla-target">Taikinys</label><input class="field" id="sla-target" required placeholder="pvz., KA-03"></div><div class="field-group field-group--wide"><label class="field-label" for="sla-description">Aprašymas</label><input class="field" id="sla-description" required placeholder="Trumpas sutrikimo aprašymas"></div><div class="admin-form-actions"><button class="button button--primary" type="submit">Sukurti bilietą</button></div></form></section></div></main></div></div><script type="module" src="../../js/pages/admin/sla.js"></script></body></html>
--
demo/pages\admin\login.html-13-    <div id="login-stage-credentials" class="login-stage">
demo/pages\admin\login.html-14-      <p class="section-kicker" style="margin-top:28px">Prisijungimas</p><h1>Prisijungimas prie valdymo pulto</h1><p class="lede">Prisijunkite, kad galėtumėte tvarkyti priėmimo srautus, duomenų kokybę ir pranešimus.</p>
demo/pages\admin\login.html:15:      <form id="credentials-form"><div class="field-group"><label class="field-label" for="login-username">Naudotojo vardas</label><input class="field" id="login-username" name="username" autocomplete="username" required placeholder="administratorius"></div><div class="field-group" style="margin-top:13px"><label class="field-label" for="login-password">Slaptažodis</label><input class="field" id="login-password" name="password" type="password" autocomplete="current-password" required placeholder="••••••••"></div><p class="admin-form-message" id="credentials-message" hidden role="alert"></p><div class="page-actions"><button class="button button--primary" type="submit">Tęsti</button></div></form>
demo/pages\admin\login.html-16-      <p class="login-help">Demonstracinė autentifikacija. Tikra autentifikacija ir TOTP RFC 6238 įgyvendinama serveryje.</p>
demo/pages\admin\login.html-17-      <p class="fine-print" style="margin-top:12px">Demo paskyros: administratorius / admin · admin / Klaipeda#2026-10 · specialistas / spec</p>
--
demo/pages\admin\login.html-19-    <div id="login-stage-password" class="login-stage" hidden>
demo/pages\admin\login.html-20-      <p class="section-kicker" style="margin-top:28px">Privalomas veiksmas</p><h1>Pakeiskite laikiną slaptažodį</h1><p class="lede">Prieš tęsdami nustatykite bent 12 simbolių slaptažodį.</p>
demo/pages\admin\login.html:21:      <form id="password-form"><div class="field-group"><label class="field-label" for="new-password">Naujas slaptažodis</label><input class="field" id="new-password" type="password" minlength="12" required autocomplete="new-password"><p class="field-help" id="password-strength">Stiprumas: įveskite slaptažodį.</p></div><div class="field-group" style="margin-top:13px"><label class="field-label" for="new-password-repeat">Pakartokite slaptažodį</label><input class="field" id="new-password-repeat" type="password" minlength="12" required autocomplete="new-password"></div><p class="admin-form-message" id="password-message" hidden role="alert"></p><div class="page-actions"><button class="button button--primary" type="submit">Išsaugoti ir tęsti</button></div></form>
demo/pages\admin\login.html-22-    </div>
demo/pages\admin\login.html-23-    <div id="login-stage-totp" class="login-stage" hidden>
demo/pages\admin\login.html-24-      <p class="section-kicker" style="margin-top:28px">Antrasis veiksnys</p><h1>Patvirtinkite prisijungimą</h1><p class="lede">Įveskite šiuo metu rodomą demonstracinį šešių skaitmenų kodą.</p>
demo/pages\admin\login.html-25-      <div class="totp-panel"><p>Demonstracinis TOTP kodas šiuo metu:</p><strong class="totp-code" id="totp-code">123456</strong><div class="totp-progress" aria-hidden="true"><span id="totp-progress"></span></div></div>
demo/pages\admin\login.html:26:      <form id="totp-form"><div class="field-group"><label class="field-label" for="totp-input">TOTP kodas</label><input class="field" id="totp-input" inputmode="numeric" pattern="[0-9]{6}" maxlength="6" required autocomplete="one-time-code" placeholder="123456"></div><p class="admin-form-message" id="totp-message" hidden role="alert"></p><div class="page-actions"><button class="button button--primary" type="submit">Patvirtinti ir įeiti</button></div></form>
demo/pages\admin\login.html-27-    </div>
demo/pages\admin\login.html-28-  </main>
--
demo/pages\admin\pranesimai.html-3-<body class="admin-body"><div class="admin-layout"><aside class="admin-sidebar" id="admin-sidebar"></aside><div class="admin-workspace"><header class="admin-topbar" id="admin-topbar"></header><main class="admin-main" id="admin-main"><section class="admin-page-hero"><div><p class="section-kicker">Taisyklės · šablonai · portalas</p><h1>Pranešimų valdymas</h1><p class="lede">Nustatykite spragų taisykles, kanalus, laiškų tekstus ir sprendimą, kada pranešimas siunčiamas automatiškai.</p></div><aside class="admin-page-hero-aside"><strong>Portalas turi atskirą vėliavą</strong><p>„Skelbti portalą“ įrašo tekstą į viešojo pagrindinio puslapio localStorage būseną.</p></aside></section><div class="admin-stack">
demo/pages\admin\pranesimai.html-4-<section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Duomenų spragos</span><h2>Įspėjimų taisyklės</h2><p>Trukmės eilutės atitinka demonstracinę taisyklių matricą; kiekvieną galima susieti su stotele ir parametru.</p></div></div><div class="data-table-wrap admin-table"><table class="data-table"><thead><tr><th>Trukmė</th><th>Stotelė / taškas</th><th>Parametras</th><th>Įjungta</th></tr></thead><tbody id="gap-rules-table"></tbody></table></div></section>
demo/pages\admin\pranesimai.html:5:<div class="admin-grid-2"><section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Pristatymas</span><h2>Pranešimų kanalai</h2></div></div><div class="admin-check-grid"><label><input type="checkbox" id="channel-email"> El. paštas</label><label><input type="checkbox" id="channel-group"> E. pašto grupė</label><label><input type="checkbox" id="channel-banner"> Portalo baneris</label></div><h3 style="margin-top:24px">Siuntimo režimas pagal tipą</h3><div id="notification-modes" class="admin-rule-list" style="margin-top:10px"></div></section><section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Patvirtinimo eilė</span><h2>Laukiantys pranešimai</h2></div></div><div id="pending-notifications"></div></section></div>
demo/pages\admin\pranesimai.html:6:<section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Teksto redaktorius</span><h2>Pranešimo šablonas</h2><p>Galimi intarpai: {stotele}, {parametras}, {nuo}, {iki}.</p></div></div><form id="template-form" class="admin-form-grid"><div class="field-group"><label class="field-label" for="template-type">Šablonas</label><select class="select-field" id="template-type"><option value="gap">Duomenų spraga</option><option value="invalid">NEVALIDUS</option><option value="exceedance">Normos viršijimas</option><option value="offline">Neprisijungusi stotelė</option></select></div><div class="field-group field-group--wide"><label class="field-label" for="template-subject">Tema</label><input class="field" id="template-subject" required></div><div class="field-group field-group--wide"><label class="field-label" for="template-body">Tekstas</label><textarea class="field" id="template-body" rows="4" required></textarea></div><div class="admin-form-actions"><button class="button button--primary" type="submit">Išsaugoti šabloną</button></div></form></section>
demo/pages\admin\pranesimai.html:7:<section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Viešojo portalo pranešimas</span><h2>Skelbti portalą</h2><p>Numatytasis tekstas gali būti pakeistas prieš paskelbiant.</p></div></div><div class="admin-form-grid"><div class="field-group field-group--wide"><label class="field-label" for="portal-banner-text">Banerio tekstas</label><textarea class="field" id="portal-banner-text" rows="3">Administracija paskelbė naują aplinkos monitoringo duomenų priėmimo pranešimą.</textarea></div><label class="checkline"><input id="portal-banner-toggle" type="checkbox"> Skelbti portalą</label><div class="admin-form-actions"><button class="button button--primary" id="portal-banner-save" type="button">Išsaugoti portalo būseną</button></div></div><p class="analysis-message" id="portal-banner-status" role="status"></p></section>
demo/pages\admin\pranesimai.html-8-</div></main></div></div><script type="module" src="../../js/pages/admin/pranesimai.js"></script></body></html>
--
demo/pages\admin\index.html-25-          <div class="admin-grid-2">
demo/pages\admin\index.html-26-            <section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">15 šaltinių</span><h2>Stotelių ir įrenginių būklė</h2><p>KA-07 pažymėta pagal istorinio tarpo įvykį.</p></div></div><div class="data-table-wrap admin-table admin-table--compact"><table class="data-table"><thead><tr><th>Šaltinis</th><th>Tipas</th><th>Paskutinis ryšys</th><th>Būsena</th></tr></thead><tbody id="health-table"></tbody></table></div></section>
demo/pages\admin\index.html:27:            <section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Veiksmų pėdsakas</span><h2>Naujausi auditai</h2><p>Administratoriaus ir specialisto veiksmai iš bendro žurnalo.</p></div><a class="button button--secondary button--small" href="auditas.html">Atverti visą žurnalą</a></div><div class="data-table-wrap admin-table admin-table--compact"><table class="data-table"><thead><tr><th>Laikas</th><th>Vaidmuo</th><th>Veiksmas</th><th>Rezultatas</th></tr></thead><tbody id="audit-preview"></tbody></table></div></section>
demo/pages\admin\index.html-28-          </div>
demo/pages\admin\index.html-29-        </div>
--
demo/pages\admin\nevalidus.html-1-<!doctype html>
demo/pages\admin\nevalidus.html-2-<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>NEVALIDUS įrašai · KMS AMIS</title><link rel="stylesheet" href="../../css/theme.css"><link rel="stylesheet" href="../../css/sections.css"></head>
demo/pages\admin\nevalidus.html:3:<body class="admin-body"><div class="admin-layout"><aside class="admin-sidebar" id="admin-sidebar"></aside><div class="admin-workspace"><header class="admin-topbar" id="admin-topbar"></header><main class="admin-main" id="admin-main"><section class="admin-page-hero"><div><p class="section-kicker">Kokybės vartai · laukia sprendimo</p><h1>NEVALIDUS įrašai</h1><p class="lede">Atrinkite įrašus pagal stotelę ir būseną, peržiūrėkite vėliavą ir nuspręskite, ar įrašas gali tapti galiojantis.</p></div><aside class="admin-page-hero-aside"><strong>Patvirtinimas palieka auditą</strong><p>Kiekvienas sprendimas įrašo redaktorių ir laiką.</p></aside></section><div class="admin-stack"><section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Kokybės eilė</span><h2>Laukiantys įrašai</h2></div></div><div class="admin-filter-row"><div class="field-group"><label class="field-label" for="invalid-site-filter">Taškas / stotelė</label><select class="select-field" id="invalid-site-filter"></select></div><div class="field-group"><label class="field-label" for="invalid-status-filter">Būsena</label><select class="select-field" id="invalid-status-filter"><option value="all">Visos</option><option value="invalid">NEVALIDUS</option><option value="valid">GALIOJANTIS</option></select></div><button class="button button--secondary button--small" id="invalid-refresh" type="button">Atnaujinti</button></div><div class="data-table-wrap admin-table"><table class="data-table"><thead><tr><th>Laikas</th><th>Taškas</th><th>Parametras</th><th>Reikšmė</th><th>Vėliava</th><th>Būsena</th><th>Veiksmai</th></tr></thead><tbody id="invalid-table"></tbody></table></div></section></div></main></div></div><script type="module" src="../../js/pages/admin/nevalidus.js"></script></body></html>
--
demo/pages\admin\prenumeratos.html-1-<!doctype html>
demo/pages\admin\prenumeratos.html-2-<html lang="lt"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Prenumeratos ir BDSR · KMS AMIS</title><link rel="stylesheet" href="../../css/theme.css"><link rel="stylesheet" href="../../css/sections.css"></head>
demo/pages\admin\prenumeratos.html:3:<body class="admin-body"><div class="admin-layout"><aside class="admin-sidebar" id="admin-sidebar"></aside><div class="admin-workspace"><header class="admin-topbar" id="admin-topbar"></header><main class="admin-main" id="admin-main"><section class="admin-page-hero"><div><p class="section-kicker">Sutikimai · dvigubas patvirtinimas · BDSR</p><h1>Prenumeratos ir BDSR</h1><p class="lede">Peržiūrėkite bendrą viešojo portalo prenumeratų būseną ir tvarkykite asmens duomenų ištrynimo prašymus.</p></div><aside class="admin-page-hero-aside"><strong>Vienas paspaudimas</strong><p>Trinami tik su pateiktu el. paštu susieti demo prenumeratos įrašai.</p></aside></section><div class="admin-stack"><section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Bendras viešojo portalo registras</span><h2>Prenumeratorių lentelė</h2></div></div><div class="data-table-wrap admin-table"><table class="data-table"><thead><tr><th>El. paštas</th><th>Monitoringo dalys</th><th>Taškai</th><th>Būsena</th><th>Sukurta</th></tr></thead><tbody id="subscriber-table"></tbody></table></div></section><div class="admin-grid-2"><section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Dvigubas pasirinkimas</span><h2>Laukiantys patvirtinimo</h2></div></div><div id="pending-subscribers"></div></section><section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">BDSR</span><h2>Naudotojo duomenų ištrynimas</h2><p>Veiksmas negrįžtamas demonstracinėje saugykloje.</p></div></div><form id="erase-admin-form" class="erase-box"><label class="field-label" for="erase-admin-email">El. paštas</label><input class="field" id="erase-admin-email" type="email" required placeholder="vardas@example.lt"><button class="button button--primary" type="submit" style="margin-top:9px">Ištrinti naudotojo duomenis vienu paspaudimu</button></form><p class="analysis-message" id="erase-admin-status" role="status"></p></section></div><section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Atsekamumas</span><h2>BDSR užklausų žurnalas</h2></div><button class="button button--secondary button--small" id="export-erase-log" type="button">Eksportuoti BDSR užklausų žurnalą (CSV)</button></div><div class="data-table-wrap admin-table"><table class="data-table"><thead><tr><th>Laikas</th><th>El. paštas</th><th>Pašalinta įrašų</th></tr></thead><tbody id="erase-log-table"></tbody></table></div></section></div></main></div></div><script type="module" src="../../js/pages/admin/prenumeratos.js"></script></body></html>
--
demo/pages\admin\patvirtinimas.html-3-<body class="admin-body"><div class="admin-layout"><aside class="admin-sidebar" id="admin-sidebar"></aside><div class="admin-workspace"><header class="admin-topbar" id="admin-topbar"></header><main class="admin-main" id="admin-main"><section class="admin-page-hero"><div><p class="section-kicker">Versijos · taisymai · priežastys</p><h1>Duomenų patvirtinimas</h1><p class="lede">Peržiūrėkite įrašo istoriją, patvirtinkite korekcijas ir sukurkite naują versiją neperrašydami ankstesnio pėdsako.</p></div><aside class="admin-page-hero-aside"><strong>55 mėnesių saugojimas</strong><p>Versijos saugomos 55 mėn. nuo duomenų perdavimo priėmimo.</p></aside></section><div class="admin-stack">
demo/pages\admin\patvirtinimas.html-4-<section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Istorijos įvykiai</span><h2>Story versijos ir korekcijos</h2><p>Demonstracinis KA-03 KD10 įrašas išsaugo v1 ir pataisytą v2.</p></div></div><div class="data-table-wrap admin-table"><table class="data-table"><thead><tr><th>Stotelė</th><th>Parametras</th><th>Versija</th><th>Reikšmė</th><th>Būsena</th><th>Priežastis</th></tr></thead><tbody><tr><td>KA-03</td><td>Kietosios dalelės KD10</td><td>v1 → v2</td><td>68,2 → 31,6 µg/m³</td><td><span class="admin-chip admin-status-warn">PATAISYTAS</span></td><td>Klaidingas matavimas</td></tr><tr><td>KA-05</td><td>Amoniakas NH₃</td><td>v1</td><td>120 µg/m³</td><td><span class="admin-chip admin-status-danger">NEVALIDUS</span></td><td>Anomalija ir absoliutinė riba</td></tr></tbody></table></div></section>
demo/pages\admin\patvirtinimas.html:5:<section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Pasirinkite seriją</span><h2>Versijų istorija</h2><p>Rodomos paskutinės trys pasirinktos datos versijos.</p></div></div><form id="history-form" class="admin-form-grid"><div class="field-group"><label class="field-label" for="history-site">Stotelė / taškas</label><select class="select-field" id="history-site"></select></div><div class="field-group field-group--wide"><label class="field-label" for="history-parameter">Parametras</label><select class="select-field" id="history-parameter"></select></div><div class="field-group"><label class="field-label" for="history-timestamp">Datos įrašas</label><input class="field" id="history-timestamp" type="datetime-local" value="2025-05-11T07:00"></div><div class="admin-form-actions"><button class="button button--secondary" type="submit">Rodyti istoriją</button></div></form><div class="data-table-wrap admin-table" style="margin-top:18px"><table class="data-table"><thead><tr><th>Versija</th><th>Laikas</th><th>Reikšmė</th><th>Redagavo</th><th>Priežastis</th><th>Būsena</th></tr></thead><tbody id="history-table"></tbody></table></div></section>
demo/pages\admin\patvirtinimas.html:6:<section class="surface surface-pad"><div class="admin-section-title"><div><span class="eyebrow">Nauja versija</span><h2>Perrašymo forma</h2><p>Perrašymas sukuria v(n+1), ankstesnis įrašas lieka istorijoje.</p></div></div><form id="overwrite-form" class="admin-form-grid"><div class="field-group"><label class="field-label" for="overwrite-site">Taškas</label><select class="select-field" id="overwrite-site"></select></div><div class="field-group field-group--wide"><label class="field-label" for="overwrite-parameter">Parametras</label><select class="select-field" id="overwrite-parameter"></select></div><div class="field-group"><label class="field-label" for="overwrite-timestamp">Data ir laikas</label><input class="field" id="overwrite-timestamp" type="datetime-local" value="2025-05-11T07:00" required></div><div class="field-group"><label class="field-label" for="overwrite-value">Nauja reikšmė</label><input class="field" id="overwrite-value" type="number" step="any" required></div><div class="field-group"><label class="field-label" for="overwrite-reason">Priežastis</label><select class="select-field" id="overwrite-reason"><option>Klaidingas matavimas</option><option>Kalibravimas</option><option>Taisymas</option></select></div><div class="admin-form-actions"><button class="button button--primary" type="submit">Sukurti naują versiją</button></div></form><p class="analysis-message" id="overwrite-message" role="status"></p></section>
demo/pages\admin\patvirtinimas.html-7-</div></main></div></div><script type="module" src="../../js/pages/admin/patvirtinimas.js"></script></body></html>

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "rg -n -C 3 'admin-switch' demo/js demo/pages/admin" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 95ms:
demo/js\pages\admin\nustatymai.js-14-  if (saved.offlineMinutes) document.querySelector("#offline-minutes").value = saved.offlineMinutes;
demo/js\pages\admin\nustatymai.js-15-  if (saved.cacheTtl) document.querySelector("#cache-ttl").value = saved.cacheTtl;
demo/js\pages\admin\nustatymai.js-16-  if (saved.rateLimit) document.querySelector("#rate-limit").value = saved.rateLimit;
demo/js\pages\admin\nustatymai.js:17:  document.querySelector("#validation-rules").innerHTML = rules.map(([id, label, description]) => `<div class="admin-rule"><div><strong>${label}</strong><p>${description}</p></div><label class="admin-switch"><input type="checkbox" data-validation-rule="${id}" ${saved.rules?.[id] !== false ? "checked" : ""}><span class="fine-print">Įjungta</span></label></div>`).join("");
demo/js\pages\admin\nustatymai.js-18-  document.querySelector("#settings-form").addEventListener("submit", (event) => { event.preventDefault(); const ruleState = {}; document.querySelectorAll("[data-validation-rule]").forEach((input) => { ruleState[input.dataset.validationRule] = input.checked; }); const value = { offlineMinutes: Number(document.querySelector("#offline-minutes").value), cacheTtl: Number(document.querySelector("#cache-ttl").value), rateLimit: Number(document.querySelector("#rate-limit").value), rules: ruleState, updatedAt: new Date().toISOString() }; localStorage.setItem(SETTINGS_KEY, JSON.stringify(value)); document.querySelector("#settings-message").textContent = "Nustatymai išsaugoti šios naršyklės demonstracinėje būsenoje."; auditAction("Išsaugoti valdymo pulto nustatymai", SETTINGS_KEY, "Išsaugota"); toast("Nustatymai išsaugoti."); });
demo/js\pages\admin\nustatymai.js-19-}
--
demo/js\pages\admin\pranesimai.js-7-  let state = readNotificationState();
demo/js\pages\admin\pranesimai.js-8-  const modeLabel = { auto: "Automatiškai", approve: "Patvirtinti prieš siuntimą" };
demo/js\pages\admin\pranesimai.js-9-  function saveState(action = "Atnaujintos pranešimų taisyklės") { writeNotificationState(state); auditAction(action, "Pranešimų valdymas", "Išsaugota"); }
demo/js\pages\admin\pranesimai.js:10:  function renderRules() { const sites = ["Visos stotelės", "KA-03", "KA-05", "KA-07"]; const parameters = ["Visi parametrai", "KD10", "NH₃", "Bendras azotas"]; document.querySelector("#gap-rules-table").innerHTML = state.gapRules.map((rule, index) => `<tr><td><strong>${escapeHtml(rule.duration)}</strong></td><td><select class="select-field" data-rule-site="${index}" aria-label="Duomenų spragos taisyklė ${escapeHtml(rule.duration)}: taškas" style="min-height:34px">${sites.map((item) => `<option ${item === (rule.site || "Visos stotelės") ? "selected" : ""}>${item}</option>`).join("")}</select></td><td><select class="select-field" data-rule-parameter="${index}" aria-label="Duomenų spragos taisyklė ${escapeHtml(rule.duration)}: parametras" style="min-height:34px">${parameters.map((item) => `<option ${item === (rule.parameter || "Visi parametrai") ? "selected" : ""}>${item}</option>`).join("")}</select></td><td><label class="admin-switch"><input type="checkbox" data-rule-index="${index}" aria-label="Duomenų spragos taisyklė ${escapeHtml(rule.duration)}: įjungta" ${rule.enabled ? "checked" : ""}><span class="fine-print">${rule.enabled ? "Įjungta" : "Išjungta"}</span></label></td></tr>`).join(""); }
demo/js\pages\admin\pranesimai.js-11-  function renderModes() { document.querySelector("#notification-modes").innerHTML = NOTIFICATION_TYPES.map(([id, label]) => `<div class="admin-rule"><div><strong>${label}</strong><p>Siuntimo sprendimas šiam įspėjimo tipui.</p></div><select class="select-field" data-mode-type="${id}" aria-label="${escapeHtml(label)}: siuntimo režimas" style="width:auto;min-height:34px"><option value="auto" ${state.modes[id] === "auto" ? "selected" : ""}>${modeLabel.auto}</option><option value="approve" ${state.modes[id] === "approve" ? "selected" : ""}>${modeLabel.approve}</option></select></div>`).join(""); }
demo/js\pages\admin\pranesimai.js-12-  function renderPending() { document.querySelector("#pending-notifications").innerHTML = state.pending.length ? state.pending.map((item) => { const label = NOTIFICATION_TYPES.find(([id]) => id === item.type)?.[1] || item.type; return `<div class="admin-rule"><div><strong>${escapeHtml(item.target)}</strong><p>${escapeHtml(label)} · ${formatDateTime(item.createdAt)}</p></div><div class="admin-inline-actions"><button class="button button--primary" data-pending-action="send" data-id="${item.id}" type="button">Siųsti</button><button class="button button--secondary" data-pending-action="reject" data-id="${item.id}" type="button">Atmesti</button></div></div>`; }).join("") : `<p class="muted">Laukiančių pranešimų nėra.</p>`; }
demo/js\pages\admin\pranesimai.js-13-  function renderTemplate() { const template = state.templates[document.querySelector("#template-type").value]; document.querySelector("#template-subject").value = template.subject; document.querySelector("#template-body").value = template.body; }

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "rg -n 'min-height\\s*:\\s*(?:[0-3]?[0-9])px|height\\s*:\\s*(?:[0-3]?[0-9])px' demo/css demo/pages demo/js" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 92ms:
demo/css\theme.css:202:  height: 16px;
demo/css\theme.css:209:.brand-stripe--compact { grid-template-rows: repeat(3, 3px); gap: 1px; height: 11px; }
demo/css\theme.css:247:.button--small { min-height: 38px; padding: 8px 12px; font-size: 0.76rem; }
demo/css\theme.css:269:  height: 4px;
demo/css\theme.css:323:.aqi-scale span { height: 7px; border-radius: 2px; }
demo/css\theme.css:330:.map-preview::before { top: 22%; left: -8%; width: 120%; height: 14px; box-shadow: 0 65px 0 rgba(255,255,255,0.55), 0 130px 0 rgba(255,255,255,0.65); }
demo/css\theme.css:334:.map-preview-label span { display: inline-flex; width: 8px; height: 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
demo/css\theme.css:370:.layer-list input { width: 18px; height: 18px; accent-color: var(--sea-800); }
demo/css\theme.css:373:.legend-dot { width: 12px; height: 12px; flex: 0 0 12px; border: 2px solid rgba(16,35,49,0.28); border-radius: 50%; }
demo/css\theme.css:374:.legend-swatch { width: 19px; height: 13px; flex: 0 0 19px; border: 1px solid rgba(16,35,49,0.25); border-radius: 3px; }
demo/css\theme.css:388:.popup-select { width: 100%; min-height: 34px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
demo/css\theme.css:404:.status-chip { display: inline-flex; align-items: center; min-height: 27px; padding: 4px 8px; color: var(--status-ink); border-radius: 999px; font-size: 0.64rem; font-weight: 600; line-height: 1.2; text-align: center; }
demo/css\theme.css:406:.status-dot { display: inline-block; width: 8px; height: 8px; margin-left: 4px; vertical-align: middle; border-radius: 50%; }
demo/css\sections.css:34:.checkline input, .checkbox-grid input { width: 18px; height: 18px; accent-color: var(--sea-800); }
demo/css\sections.css:56:.legend-key::before { content: ""; display: inline-block; width: 18px; height: 3px; background: var(--sea-800); }
demo/css\sections.css:81:.score-meter span { height: 13px; background: var(--line); }
demo/css\sections.css:131:.howto .step-number { display: inline-grid; place-items: center; width: 30px; height: 30px; margin-bottom: 12px; color: var(--sea-950); background: var(--sun-500); font-weight: 600; }
demo/css\sections.css:135:.main-nav details ul ul a { min-height: 34px; padding: 6px 8px; font-size: .71rem; }
demo/css\sections.css:187:.role-chip { display: inline-flex; align-items: center; min-height: 30px; padding: 5px 9px; color: var(--land-900); background: var(--shore-200); border: 1px solid var(--shore-300); border-radius: 999px; font-size: .66rem; font-weight: 600; }
demo/css\sections.css:206:.admin-live-dot::before { width: 8px; height: 8px; content: ""; background: var(--land-500); border-radius: 50%; box-shadow: 0 0 0 4px rgba(83,138,131,.16); }
demo/css\sections.css:217:.admin-chip { display: inline-flex; align-items: center; min-height: 25px; padding: 4px 8px; border-radius: 999px; font-size: .62rem; font-weight: 600; line-height: 1.2; }
demo/css\sections.css:232:.admin-rule input { width: 18px; height: 18px; accent-color: var(--land-700); }
demo/css\sections.css:234:.admin-switch input { appearance: none; position: relative; width: 35px; height: 20px; margin: 0; border-radius: 999px; background: var(--line-strong); cursor: pointer; transition: background 160ms var(--ease-out); }
demo/css\sections.css:235:.admin-switch input::after { position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; content: ""; background: var(--surface); border-radius: 50%; transition: transform 160ms var(--ease-out); }
demo/css\sections.css:242:.admin-inline-actions .button { min-height: 31px; padding: 5px 8px; font-size: .63rem; }
demo/css\sections.css:244:.admin-inline-edit input { min-height: 31px; width: 120px; padding: 4px 6px; font-size: .68rem; }
demo/css\sections.css:258:.totp-progress { height: 5px; margin-top: 10px; overflow: hidden; background: var(--surface); }
demo/js\pages\admin\pranesimai.js:10:  function renderRules() { const sites = ["Visos stotelės", "KA-03", "KA-05", "KA-07"]; const parameters = ["Visi parametrai", "KD10", "NH₃", "Bendras azotas"]; document.querySelector("#gap-rules-table").innerHTML = state.gapRules.map((rule, index) => `<tr><td><strong>${escapeHtml(rule.duration)}</strong></td><td><select class="select-field" data-rule-site="${index}" aria-label="Duomenų spragos taisyklė ${escapeHtml(rule.duration)}: taškas" style="min-height:34px">${sites.map((item) => `<option ${item === (rule.site || "Visos stotelės") ? "selected" : ""}>${item}</option>`).join("")}</select></td><td><select class="select-field" data-rule-parameter="${index}" aria-label="Duomenų spragos taisyklė ${escapeHtml(rule.duration)}: parametras" style="min-height:34px">${parameters.map((item) => `<option ${item === (rule.parameter || "Visi parametrai") ? "selected" : ""}>${item}</option>`).join("")}</select></td><td><label class="admin-switch"><input type="checkbox" data-rule-index="${index}" aria-label="Duomenų spragos taisyklė ${escapeHtml(rule.duration)}: įjungta" ${rule.enabled ? "checked" : ""}><span class="fine-print">${rule.enabled ? "Įjungta" : "Išjungta"}</span></label></td></tr>`).join(""); }
demo/js\pages\admin\pranesimai.js:11:  function renderModes() { document.querySelector("#notification-modes").innerHTML = NOTIFICATION_TYPES.map(([id, label]) => `<div class="admin-rule"><div><strong>${label}</strong><p>Siuntimo sprendimas šiam įspėjimo tipui.</p></div><select class="select-field" data-mode-type="${id}" aria-label="${escapeHtml(label)}: siuntimo režimas" style="width:auto;min-height:34px"><option value="auto" ${state.modes[id] === "auto" ? "selected" : ""}>${modeLabel.auto}</option><option value="approve" ${state.modes[id] === "approve" ? "selected" : ""}>${modeLabel.approve}</option></select></div>`).join(""); }
demo/js\pages\admin\sla.js:17:    document.querySelector("#sla-table").innerHTML = listTickets().map((ticket) => { const level = SLA_LEVELS[ticket.level]; return `<tr><td><strong>${escapeHtml(ticket.id)}</strong><small>${formatDateTime(ticket.createdAt)}</small></td><td>${escapeHtml(level.name)}</td><td>${escapeHtml(ticket.description)}<small>${escapeHtml(level.description)}</small></td><td>${escapeHtml(level.response)}</td><td>${escapeHtml(level.fix)}</td><td>${escapeHtml(level.total)}</td><td>${escapeHtml(level.service)}</td><td>${escapeHtml(ticket.target)}</td><td>${countdown(ticket.dueAt)}<small>${formatDateTime(ticket.dueAt)}</small></td><td><select class="select-field" data-ticket-status="${escapeHtml(ticket.id)}" aria-label="Bilieto ${escapeHtml(ticket.id)} būsena" style="min-height:34px;width:auto"><option ${ticket.status === "Naujas" ? "selected" : ""}>Naujas</option><option ${ticket.status === "Tiriamas" ? "selected" : ""}>Tiriamas</option><option ${ticket.status === "Išspręstas" ? "selected" : ""}>Išspręstas</option></select></td></tr>`; }).join("");

codex
The overflow root cause is confirmed: the responsive grid items retain their tables’ intrinsic 580px minimum, so the whole card grows to 620px. The reports page has the same grid-item behavior plus an auto-width/max-width report sheet. I’m checking the remaining control classes and the audit-table scroll boundary before applying the shared fixes.
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "@'
import asyncio, json
from pathlib import Path
from playwright.async_api import async_playwright

BASE='http://localhost:8000/'
public=['index.html']+[str(p.relative_to('demo')).replace('\\\\','/') for p in Path('demo/pages').glob('*.html')]
admin=[str(p.relative_to('demo')).replace('\\\\','/') for p in Path('demo/pages/admin').glob('*.html')]
selectors=['.footer-links a','.main-nav details li a','.main-nav details ul ul a','.button--small','.admin-nav-link','.admin-inline-actions .button','.admin-inline-edit input','.admin-switch','.admin-switch input','.popup-select','.checkline','.checkbox-grid label','.layer-list label','.admin-check-grid label','.select-field']

async def measure(page,path,is_admin=False):
  errors=[]
  page.on('console',lambda m: errors.append('console:'+m.type+':'+m.text) if m.type=='error' else None)
  page.on('pageerror',lambda e: errors.append('pageerror:'+str(e)))
  await page.goto(BASE+path,wait_until='networkidle',timeout=30000)
  await page.wait_for_timeout(250)
  if not is_admin:
    await page.evaluate(\"document.querySelectorAll('.main-nav details').forEach(d=>d.open=true)\")
  vals=await page.evaluate('''sels => Object.fromEntries(sels.map(sel=>[sel,[...document.querySelectorAll(sel)].filter(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width&&r.height&&s.visibility"'!=='"'hidden'}).map(e=>{const r=e.getBoundingClientRect();return {w:+r.width.toFixed(1),h:+r.height.toFixed(1),text:(e.innerText||e.getAttribute('aria-label')||'').trim().slice(0,42)}})]))''',selectors)
  return vals,errors

async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(headless=True)
    ctx=await b.new_context(viewport={'width':1280,'height':900},has_touch=True)
    await ctx.add_init_script(\"localStorage.setItem('kms_amis_admin_session', JSON.stringify({role:'administratorius'}))\")
    summary={s:{'minw':9999,'minh':9999,'samples':[]} for s in selectors}
    all_errors=[]
    for path in public+admin:
      pg=await ctx.new_page()
      vals,errs=await measure(pg,path,path.startswith('pages/admin/') and not path.endswith('login.html'))
      all_errors += [(path,e) for e in errs]
      for sel,items in vals.items():
        for it in items:
          s=summary[sel]; s['minw']=min(s['minw'],it['w']);s['minh']=min(s['minh'],it['h'])
          if (it['h']<40 or it['w']<40) and len(s['samples'])<5:s['samples'].append({'page':path,**it})
      await pg.close()
    print(json.dumps(summary,ensure_ascii=False,indent=2))
    print('ERRORS',json.dumps(all_errors,ensure_ascii=False))
    # dashboard geometry, desktop widths
    for width in [1280,1440,1024]:
      pg=await ctx.new_page(); await pg.set_viewport_size({'width':width,'height':900}); await pg.goto(BASE+'pages/admin/index.html',wait_until='networkidle'); await pg.wait_for_timeout(300)
      x=await pg.evaluate('''() => { const w=document.querySelector('#audit-preview').closest('.data-table-wrap'), t=w.querySelector('table'), s=w.closest('.surface'), g=w.closest('.admin-grid-2'); const f=e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e);return {left:+r.left.toFixed(1),right:+r.right.toFixed(1),width:+r.width.toFixed(1),client:e.clientWidth,scroll:e.scrollWidth,overflow:c.overflowX,min:c.minWidth}}; return {doc:[document.documentElement.clientWidth,document.documentElement.scrollWidth],grid:f(g),surface:f(s),wrapper:f(w),table:f(t)} }''')
      print('DASH',width,json.dumps(x))
      await pg.close()
    await b.close()
asyncio.run(main())
'@ | python -" in C:\Users\Joosep\tenders\klaipeda-environment
 exited 1 in 22050ms:
Traceback (most recent call last):
  File "<stdin>", line 46, in <module>
  File "C:\Users\Joosep\AppData\Local\Programs\Python\Python314\Lib\asyncio\runners.py", line 205, in run
    return runner.run(main)
           ~~~~~~~~~~^^^^^^
  File "C:\Users\Joosep\AppData\Local\Programs\Python\Python314\Lib\asyncio\runners.py", line 128, in run
    return self._loop.run_until_complete(task)
           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~^^^^^^
  File "C:\Users\Joosep\AppData\Local\Programs\Python\Python314\Lib\asyncio\base_events.py", line 719, in run_until_complete
    return future.result()
           ~~~~~~~~~~~~~^^
  File "<stdin>", line 37, in main
  File "C:\Users\Joosep\AppData\Local\Programs\Python\Python314\Lib\encodings\cp1252.py", line 19, in encode
    return codecs.charmap_encode(input,self.errors,encoding_table)[0]
           ~~~~~~~~~~~~~~~~~~~~~^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
UnicodeEncodeError: 'charmap' codec can't encode character '\u0173' in position 452: character maps to <undefined>

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command '$env:PYTHONIOENCODING='"'utf-8'; @'
import asyncio, json
from pathlib import Path
from playwright.async_api import async_playwright
BASE='http://localhost:8000/'
public=['index.html']+[str(p.relative_to('demo')).replace('\\\\','/') for p in Path('demo/pages').glob('*.html')]
admin=[str(p.relative_to('demo')).replace('\\\\','/') for p in Path('demo/pages/admin').glob('*.html')]
selectors=['.footer-links a','.main-nav details li a','.main-nav details ul ul a','.button--small','.admin-nav-link','.admin-inline-actions .button','.admin-inline-edit input','.admin-switch','.admin-switch input','.popup-select','.checkline','.checkbox-grid label','.layer-list label','.admin-check-grid label','.select-field']
async def measure(page,path,is_admin=False):
  errors=[]
  page.on('console',lambda m: errors.append('console:'+m.type+':'+m.text) if m.type=='error' else None)
  page.on('pageerror',lambda e: errors.append('pageerror:'+str(e)))
  await page.goto(BASE+path,wait_until='networkidle',timeout=30000); await page.wait_for_timeout(250)
  if not is_admin: await page.evaluate(\"document.querySelectorAll('.main-nav details').forEach(d=>d.open=true)\")
  vals=await page.evaluate('''sels => Object.fromEntries(sels.map(sel=>[sel,[...document.querySelectorAll(sel)].filter(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width&&r.height&&s.visibility"'!=='"'hidden'}).map(e=>{const r=e.getBoundingClientRect();return {w:+r.width.toFixed(1),h:+r.height.toFixed(1),text:(e.innerText||e.getAttribute('aria-label')||'').trim().slice(0,42)}})]))''',selectors)
  return vals,errors
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(headless=True)
    ctx=await b.new_context(viewport={'width':1280,'height':900},has_touch=True)
    await ctx.add_init_script(\"localStorage.setItem('kms_amis_admin_session', JSON.stringify({role:'administratorius'}))\")
    summary={s:{'minw':9999,'minh':9999,'samples':[]} for s in selectors}; all_errors=[]
    for path in public+admin:
      pg=await ctx.new_page(); vals,errs=await measure(pg,path,path.startswith('pages/admin/') and not path.endswith('login.html')); all_errors += [(path,e) for e in errs]
      for sel,items in vals.items():
        for it in items:
          s=summary[sel]; s['minw']=min(s['minw'],it['w']);s['minh']=min(s['minh'],it['h'])
          if (it['h']<40 or it['w']<40) and len(s['samples'])<5:s['samples'].append({'page':path,**it})
      await pg.close()
    print(json.dumps(summary,ensure_ascii=False,indent=2)); print('ERRORS',json.dumps(all_errors,ensure_ascii=False))
    for width in [1280,1440,1024]:
      pg=await ctx.new_page(); await pg.set_viewport_size({'width':width,'height':900}); await pg.goto(BASE+'pages/admin/index.html',wait_until='networkidle'); await pg.wait_for_timeout(300)
      x=await pg.evaluate('''() => { const w=document.querySelector('#audit-preview').closest('.data-table-wrap'), t=w.querySelector('table'), s=w.closest('.surface'), g=w.closest('.admin-grid-2'); const f=e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e);return {left:+r.left.toFixed(1),right:+r.right.toFixed(1),width:+r.width.toFixed(1),client:e.clientWidth,scroll:e.scrollWidth,overflow:c.overflowX,min:c.minWidth}}; return {doc:[document.documentElement.clientWidth,document.documentElement.scrollWidth],grid:f(g),surface:f(s),wrapper:f(w),table:f(t)} }''')
      print('DASH',width,json.dumps(x)); await pg.close()
    await b.close()
asyncio.run(main())
'@ | python -" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 24654ms:
{
  ".footer-links a": {
    "minw": 61,
    "minh": 19.1,
    "samples": [
      {
        "page": "index.html",
        "w": 183.1,
        "h": 19.1,
        "text": "Valdymo pultas (demonstracija)"
      },
      {
        "page": "index.html",
        "w": 104.3,
        "h": 19.1,
        "text": "Privatumo politika"
      },
      {
        "page": "index.html",
        "w": 92,
        "h": 19.1,
        "text": "Slapukų politika"
      },
      {
        "page": "index.html",
        "w": 113.9,
        "h": 19.1,
        "text": "Naudotojo vadovas"
      },
      {
        "page": "index.html",
        "w": 61,
        "h": 19.1,
        "text": "Žemėlapis"
      }
    ]
  },
  ".main-nav details li a": {
    "minw": 262,
    "minh": 40,
    "samples": []
  },
  ".main-nav details ul ul a": {
    "minw": 9999,
    "minh": 9999,
    "samples": []
  },
  ".button--small": {
    "minw": 71.3,
    "minh": 38,
    "samples": [
      {
        "page": "index.html",
        "w": 120.2,
        "h": 38,
        "text": "Atverti žemėlapį"
      },
      {
        "page": "pages/zemelapis.html",
        "w": 155.7,
        "h": 38,
        "text": "← Pagrindinis puslapis"
      },
      {
        "page": "pages/zemelapis.html",
        "w": 121.8,
        "h": 38,
        "text": "Matuoti atstumą"
      },
      {
        "page": "pages/zemelapis.html",
        "w": 133,
        "h": 38,
        "text": "Išvalyti matavimus"
      },
      {
        "page": "pages/admin/auditas.html",
        "w": 81.3,
        "h": 38,
        "text": "Atsijungti"
      }
    ]
  },
  ".admin-nav-link": {
    "minw": 226,
    "minh": 38.8,
    "samples": [
      {
        "page": "pages/admin/auditas.html",
        "w": 226,
        "h": 38.8,
        "text": "Peržiūros skydas"
      },
      {
        "page": "pages/admin/auditas.html",
        "w": 226,
        "h": 38.8,
        "text": "Duomenų valdymas"
      },
      {
        "page": "pages/admin/auditas.html",
        "w": 226,
        "h": 38.8,
        "text": "Duomenų patvirtinimas"
      },
      {
        "page": "pages/admin/auditas.html",
        "w": 226,
        "h": 38.8,
        "text": "Neleistini įrašai (NEVALIDUS)"
      },
      {
        "page": "pages/admin/auditas.html",
        "w": 226,
        "h": 38.8,
        "text": "Pranešimų valdymas"
      }
    ]
  },
  ".admin-inline-actions .button": {
    "minw": 44.6,
    "minh": 31,
    "samples": [
      {
        "page": "pages/admin/nevalidus.html",
        "w": 64.8,
        "h": 31,
        "text": "Patvirtinti"
      },
      {
        "page": "pages/admin/nevalidus.html",
        "w": 125.6,
        "h": 31,
        "text": "Redaguoti ir patvirtinti"
      },
      {
        "page": "pages/admin/nevalidus.html",
        "w": 114.4,
        "h": 31,
        "text": "Laikyti nepatvirtintu"
      },
      {
        "page": "pages/admin/nevalidus.html",
        "w": 64.8,
        "h": 31,
        "text": "Patvirtinti"
      },
      {
        "page": "pages/admin/nevalidus.html",
        "w": 125.6,
        "h": 31,
        "text": "Redaguoti ir patvirtinti"
      }
    ]
  },
  ".admin-inline-edit input": {
    "minw": 9999,
    "minh": 9999,
    "samples": []
  },
  ".admin-switch": {
    "minw": 80.2,
    "minh": 20,
    "samples": [
      {
        "page": "pages/admin/nustatymai.html",
        "w": 80.2,
        "h": 20,
        "text": "Įjungta"
      },
      {
        "page": "pages/admin/nustatymai.html",
        "w": 80.2,
        "h": 20,
        "text": "Įjungta"
      },
      {
        "page": "pages/admin/nustatymai.html",
        "w": 80.2,
        "h": 20,
        "text": "Įjungta"
      },
      {
        "page": "pages/admin/nustatymai.html",
        "w": 80.2,
        "h": 20,
        "text": "Įjungta"
      },
      {
        "page": "pages/admin/pranesimai.html",
        "w": 80.2,
        "h": 20,
        "text": "Įjungta"
      }
    ]
  },
  ".admin-switch input": {
    "minw": 35,
    "minh": 20,
    "samples": [
      {
        "page": "pages/admin/nustatymai.html",
        "w": 35,
        "h": 20,
        "text": ""
      },
      {
        "page": "pages/admin/nustatymai.html",
        "w": 35,
        "h": 20,
        "text": ""
      },
      {
        "page": "pages/admin/nustatymai.html",
        "w": 35,
        "h": 20,
        "text": ""
      },
      {
        "page": "pages/admin/nustatymai.html",
        "w": 35,
        "h": 20,
        "text": ""
      },
      {
        "page": "pages/admin/pranesimai.html",
        "w": 35,
        "h": 20,
        "text": "Duomenų spragos taisyklė 30 min: įjungta"
      }
    ]
  },
  ".popup-select": {
    "minw": 9999,
    "minh": 9999,
    "samples": []
  },
  ".checkline": {
    "minw": 220.3,
    "minh": 66.8,
    "samples": []
  },
  ".checkbox-grid label": {
    "minw": 270,
    "minh": 24,
    "samples": [
      {
        "page": "pages/prenumerata.html",
        "w": 270,
        "h": 24,
        "text": "Melnragė I"
      },
      {
        "page": "pages/prenumerata.html",
        "w": 270,
        "h": 24,
        "text": "Melnragė II"
      },
      {
        "page": "pages/prenumerata.html",
        "w": 270,
        "h": 24,
        "text": "Giruliai"
      },
      {
        "page": "pages/prenumerata.html",
        "w": 270,
        "h": 24,
        "text": "Smiltynė"
      },
      {
        "page": "pages/prenumerata.html",
        "w": 270,
        "h": 24,
        "text": "Senamiestis"
      }
    ]
  },
  ".layer-list label": {
    "minw": 225.9,
    "minh": 24,
    "samples": [
      {
        "page": "pages/zemelapis.html",
        "w": 225.9,
        "h": 24,
        "text": "Mikrorajonų ribos"
      },
      {
        "page": "pages/zemelapis.html",
        "w": 225.9,
        "h": 24,
        "text": "Savivaldybės stotelės"
      },
      {
        "page": "pages/zemelapis.html",
        "w": 225.9,
        "h": 24,
        "text": "Trečiųjų šalių IoT"
      }
    ]
  },
  ".admin-check-grid label": {
    "minw": 158.1,
    "minh": 38,
    "samples": [
      {
        "page": "pages/admin/pranesimai.html",
        "w": 158.1,
        "h": 38,
        "text": "El. paštas"
      },
      {
        "page": "pages/admin/pranesimai.html",
        "w": 158.1,
        "h": 38,
        "text": "E. pašto grupė"
      },
      {
        "page": "pages/admin/pranesimai.html",
        "w": 158.1,
        "h": 38,
        "text": "Portalo baneris"
      }
    ]
  },
  ".select-field": {
    "minw": 97,
    "minh": 34,
    "samples": [
      {
        "page": "pages/admin/pranesimai.html",
        "w": 260.3,
        "h": 34,
        "text": "Visos stotelės\nKA-03\nKA-05\nKA-07"
      },
      {
        "page": "pages/admin/pranesimai.html",
        "w": 276.8,
        "h": 34,
        "text": "Visi parametrai\nKD10\nNH₃\nBendras azotas"
      },
      {
        "page": "pages/admin/pranesimai.html",
        "w": 260.3,
        "h": 34,
        "text": "Visos stotelės\nKA-03\nKA-05\nKA-07"
      },
      {
        "page": "pages/admin/pranesimai.html",
        "w": 276.8,
        "h": 34,
        "text": "Visi parametrai\nKD10\nNH₃\nBendras azotas"
      },
      {
        "page": "pages/admin/pranesimai.html",
        "w": 260.3,
        "h": 34,
        "text": "Visos stotelės\nKA-03\nKA-05\nKA-07"
      }
    ]
  }
}
ERRORS []
DASH 1280 {"doc": [1280, 1280], "grid": {"left": 278, "right": 1260, "width": 982, "client": 982, "scroll": 982, "overflow": "visible", "min": "auto"}, "surface": {"left": 850.3, "right": 1260, "width": 409.7, "client": 408, "scroll": 408, "overflow": "visible", "min": "auto"}, "wrapper": {"left": 881.3, "right": 1229, "width": 347.7, "client": 346, "scroll": 520, "overflow": "auto", "min": "0px"}, "table": {"left": 882.3, "right": 1402.3, "width": 520, "client": 520, "scroll": 520, "overflow": "visible", "min": "520px"}}
DASH 1440 {"doc": [1440, 1440], "grid": {"left": 278, "right": 1420, "width": 1142, "client": 1142, "scroll": 1142, "overflow": "visible", "min": "auto"}, "surface": {"left": 942.3, "right": 1420, "width": 477.7, "client": 476, "scroll": 476, "overflow": "visible", "min": "auto"}, "wrapper": {"left": 973.3, "right": 1389, "width": 415.7, "client": 414, "scroll": 520, "overflow": "auto", "min": "0px"}, "table": {"left": 974.3, "right": 1494.3, "width": 520, "client": 520, "scroll": 520, "overflow": "visible", "min": "520px"}}
DASH 1024 {"doc": [1024, 1024], "grid": {"left": 240, "right": 1024, "width": 784, "client": 784, "scroll": 784, "overflow": "visible", "min": "auto"}, "surface": {"left": 240, "right": 1024, "width": 784, "client": 782, "scroll": 782, "overflow": "visible", "min": "auto"}, "wrapper": {"left": 271, "right": 993, "width": 722, "client": 720, "scroll": 720, "overflow": "auto", "min": "0px"}, "table": {"left": 272, "right": 992, "width": 720, "client": 720, "scroll": 720, "overflow": "visible", "min": "520px"}}

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "rg -n -C 3 'map-preview' demo/index.html" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 85ms:
68-        <p class="update-note"><a href="pages/zemelapis.html">Peržiūrėti pagal taškus žemėlapyje →</a></p>
69-      </section>
70-
71:      <section class="panel map-preview" aria-labelledby="preview-title">
72:        <div class="map-preview-content">
73:          <div class="map-preview-label"><span aria-hidden="true"></span><span id="preview-title">Interaktyvus žemėlapis</span></div>
74-          <p class="lede" style="max-width: 30ch; margin-top: 42px; color: var(--ink-800); font-size: .9rem;">Stotelės, IoT taškai ir mikrorajonų spalvinė suvestinė.</p>
75:          <a class="button button--secondary button--small map-preview-link" href="pages/zemelapis.html">Atverti žemėlapį</a>
76-        </div>
77-      </section>
78-    </div>

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command '$c=Get-Content '"'demo/index.html'; for("'$i=45;$i -le 90;$i++){ '"'{0,4}: {1}' -f "'$i,$c[$i-1] }' in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 109ms:
  45:         <strong>Viešas, duomenimis grįstas miesto vaizdas</strong>
  46:         <p>Rodomi demonstraciniai duomenys atnaujinami vienodu, atkuriamu laiko modeliu. Vėlesniuose etapuose čia atsiras analizė, ataskaitos ir specialistų darbo aplinka.</p>
  47:       </aside>
  48:     </section>
  49: 
  50:     <div class="grid-home">
  51:       <section class="panel card-pad" aria-labelledby="orai-title">
  52:         <div class="card-heading">
  53:           <div><span class="eyebrow">Meteorologinė informacija</span><h2 id="orai-title">Miesto oro sąlygų vidurkis</h2><p>Automatinių stotelių matavimų suvestinė.</p></div>
  54:         </div>
  55:         <div class="weather-strip" id="weather-strip" aria-live="polite"></div>
  56:         <p class="update-note" id="weather-updated">Duomenys skaičiuojami…</p>
  57:         <div class="brand-stripe brand-stripe--compact" aria-hidden="true"><span class="stripe-sea"></span><span class="stripe-shore"></span><span class="stripe-land"></span></div>
  58:       </section>
  59: 
  60:       <section class="panel card-pad" aria-labelledby="aqi-title">
  61:         <div class="card-heading"><div><span class="eyebrow">Europos oro kokybės indeksas</span><h2 id="aqi-title">Šiandien mieste</h2></div><span class="status-chip" id="aqi-chip">Skaičiuojama</span></div>
  62:         <div class="aqi-layout">
  63:           <div class="aqi-score" id="aqi-score"><div><strong>–</strong><span>indeksas</span></div></div>
  64:           <div class="aqi-copy"><h3 id="aqi-label">Vertinama</h3><p id="aqi-description">Indeksas apskaičiuojamas iš pagrindinių oro kokybės parametrų.</p></div>
  65:         </div>
  66:         <div class="aqi-scale" aria-label="Oro kokybės skalė"><span class="good"></span><span class="fair"></span><span class="moderate"></span><span class="poor"></span><span class="very-poor"></span><span class="extremely-poor"></span></div>
  67:         <div class="legend-labels"><span>Gera</span><span>Ypač prasta</span></div>
  68:         <p class="update-note"><a href="pages/zemelapis.html">Peržiūrėti pagal taškus žemėlapyje →</a></p>
  69:       </section>
  70: 
  71:       <section class="panel map-preview" aria-labelledby="preview-title">
  72:         <div class="map-preview-content">
  73:           <div class="map-preview-label"><span aria-hidden="true"></span><span id="preview-title">Interaktyvus žemėlapis</span></div>
  74:           <p class="lede" style="max-width: 30ch; margin-top: 42px; color: var(--ink-800); font-size: .9rem;">Stotelės, IoT taškai ir mikrorajonų spalvinė suvestinė.</p>
  75:           <a class="button button--secondary button--small map-preview-link" href="pages/zemelapis.html">Atverti žemėlapį</a>
  76:         </div>
  77:       </section>
  78:     </div>
  79: 
  80:     <section class="section-intro" id="monitoringas" aria-labelledby="monitoringas-title">
  81:       <div><p class="section-kicker">Monitoringo dalys</p><h2 id="monitoringas-title">Duomenų sritys, kurias galėsite tyrinėti</h2></div>
  82:       <p>Pasirinkite sritį ir pereikite į jos žemėlapį. Analizės bei ataskaitų funkcijos bus papildytos antrajame etape.</p>
  83:     </section>
  84:     <div class="monitoring-grid">
  85:       <a class="monitoring-link" href="pages/oro.html"><strong>Aplinkos oro monitoringas</strong><span>Automatinės stotelės · laboratoriniai duomenys</span></a>
  86:       <a class="monitoring-link" href="pages/truksmas.html"><strong>Aplinkos triukšmas</strong><span>Septyni rodikliai · logaritminis vidurkis</span></a>
  87:       <a class="monitoring-link" href="pages/dirvezemis.html"><strong>Dirvožemis</strong><span>Metalai · naftos produktai · periodiniai mėginiai</span></a>
  88:       <a class="monitoring-link" href="pages/vanduo.html"><strong>Paviršinis vanduo</strong><span>Maistinės medžiagos · biologija</span></a>
  89:       <a class="monitoring-link" href="pages/gyvoji_gamta.html"><strong>Gyvoji gamta</strong><span>Septynios potemės · rūšių skaičius ir gausumas</span></a>
  90:       <a class="monitoring-link" href="pages/zeldynai.html"><strong>Želdynai ir želdiniai</strong><span>Būklės balai · mechaniniai pažeidimai</span></a>

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command '$env:PYTHONIOENCODING='"'utf-8'; @'
import asyncio, json
from playwright.async_api import async_playwright
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True)
  for width in [1440,1024,390]:
   pg=await b.new_page(viewport={'width':width,'height':844},is_mobile=width==390,has_touch=width==390)
   await pg.goto('http://localhost:8000/index.html',wait_until='networkidle')
   await pg.add_style_tag(content='html { font-size: 150% "'!important; }'"')
   await pg.wait_for_timeout(300)
   x=await pg.evaluate('''() => {const q=s=>document.querySelector(s); const f=e=>{const r=e.getBoundingClientRect();return {top:+r.top.toFixed(1),bottom:+r.bottom.toFixed(1),left:+r.left.toFixed(1),right:+r.right.toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1),scrollH:e.scrollHeight,clientH:e.clientHeight,overflow:getComputedStyle(e).overflow}}; const p=q('.map-preview'),c=q('.map-preview-content'),l=q('.map-preview-label'),t=q('.map-preview .lede'),a=q('.map-preview-link'); return {doc:[document.documentElement.clientWidth,document.documentElement.scrollWidth],panel:f(p),content:f(c),label:f(l),text:f(t),link:f(a),overlap:Math.max(0,Math.min(t.getBoundingClientRect().bottom,a.getBoundingClientRect().bottom)-Math.max(t.getBoundingClientRect().top,a.getBoundingClientRect().top))};}''')
   print(width,json.dumps(x,ensure_ascii=False))
   await pg.screenshot(path=f'demo/_temp_zoom_{width}.png',full_page=True)
   await pg.close()
  await b.close()
asyncio.run(main())
'@ | python -" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 4502ms:
1440 {"doc": [1440, 1440], "panel": {"top": 1286.5, "bottom": 1518.5, "left": 963.8, "right": 1400, "w": 436.2, "h": 232, "scrollH": 274, "clientH": 230, "overflow": "hidden"}, "content": {"top": 1287.5, "bottom": 1517.5, "left": 964.8, "right": 1399, "w": 434.2, "h": 230, "scrollH": 230, "clientH": 230, "overflow": "visible"}, "label": {"top": 1307.5, "bottom": 1315.5, "left": 984.8, "right": 1379, "w": 394.2, "h": 8, "scrollH": 54, "clientH": 8, "overflow": "visible"}, "text": {"top": 1357.5, "bottom": 1424.5, "left": 984.8, "right": 1379, "w": 394.2, "h": 66.9, "scrollH": 67, "clientH": 67, "overflow": "visible"}, "link": {"top": 1454.3, "bottom": 1500.5, "left": 1213.7, "right": 1381, "w": 167.3, "h": 46.3, "scrollH": 44, "clientH": 44, "overflow": "visible"}, "overlap": 0}
1024 {"doc": [1024, 1024], "panel": {"top": 1549.9, "bottom": 1781.9, "left": 690, "right": 1004, "w": 313.9, "h": 232, "scrollH": 274, "clientH": 230, "overflow": "hidden"}, "content": {"top": 1550.9, "bottom": 1780.9, "left": 691, "right": 1003, "w": 311.9, "h": 230, "scrollH": 230, "clientH": 230, "overflow": "visible"}, "label": {"top": 1570.9, "bottom": 1578.9, "left": 711, "right": 983, "w": 271.9, "h": 8, "scrollH": 54, "clientH": 8, "overflow": "visible"}, "text": {"top": 1620.9, "bottom": 1721.3, "left": 711, "right": 983, "w": 271.9, "h": 100.4, "scrollH": 100, "clientH": 100, "overflow": "visible"}, "link": {"top": 1717.6, "bottom": 1763.9, "left": 817.7, "right": 985, "w": 167.3, "h": 46.3, "scrollH": 44, "clientH": 44, "overflow": "visible"}, "overlap": 3.65625}
390 {"doc": [390, 390], "panel": {"top": 2556.4, "bottom": 2788.4, "left": 14, "right": 376, "w": 362, "h": 232, "scrollH": 274, "clientH": 230, "overflow": "hidden"}, "content": {"top": 2557.4, "bottom": 2787.4, "left": 15, "right": 375, "w": 360, "h": 230, "scrollH": 230, "clientH": 230, "overflow": "visible"}, "label": {"top": 2577.4, "bottom": 2585.4, "left": 35, "right": 355, "w": 320, "h": 8, "scrollH": 54, "clientH": 8, "overflow": "visible"}, "text": {"top": 2627.4, "bottom": 2694.3, "left": 35, "right": 355, "w": 320, "h": 66.9, "scrollH": 67, "clientH": 67, "overflow": "visible"}, "link": {"top": 2724.2, "bottom": 2770.4, "left": 189.7, "right": 357, "w": 167.3, "h": 46.3, "scrollH": 44, "clientH": 44, "overflow": "visible"}, "overlap": 0}

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "@'
import asyncio
from playwright.async_api import async_playwright
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True)
  for path in ['pages/oro.html','pages/gyvoji_gamta.html','pages/truksmas.html','pages/ataskaitos.html']:
   pg=await b.new_page(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
   await pg.goto('http://localhost:8000/'+path,wait_until='networkidle'); await pg.add_style_tag(content='.content-stack{grid-template-columns:minmax(0,1fr)"'!important}'"')
   await pg.wait_for_timeout(200)
   print(path,await pg.evaluate('document.documentElement.scrollWidth'))
   await pg.close()
  await b.close()
asyncio.run(main())
'@ | python -" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 4631ms:
pages/oro.html 390
pages/gyvoji_gamta.html 390
pages/truksmas.html 390
pages/ataskaitos.html 427

codex
The final patch will stay CSS-only: constrain the content grid rather than masking overflow, let compact report sheets size to their column, expand the named touch targets while retaining switch/chip geometry, make the map-preview content participate in normal flow, and explicitly reinforce internal scrolling for admin tables. I’m applying the skill’s craft-floor checks now, immediately before editing.
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "Get-Content -Raw 'C:\\Users\\Joosep\\.agents\\skills\\impeccable\\reference\\craft-floor.md'" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 93ms:
# Craft floor

Load this after the direction is settled, and build without announcing the checklist. A pinned brief or the committed visual world overrides anything here; your own habit does not. When the design hook is active it already enforces the mechanical checks below as you edit: act on its findings instead of re-auditing each rule.

## Verify

Each of these is a check on the built result, not an intention. Run them together in the batched inspection rounds, not as separate screenshot trips; the checks share one render.

- **Contrast:** body and placeholder text ≥4.5:1, large text ≥3:1. On colored surfaces tint secondary text from that hue or the foreground; never gray.
- **Depth:** shadows carry an offset and a soft blur. A zero-offset colored halo is decoration.
- **Spacing:** tight groups, generous separation, more space above a heading than below it. Read the computed values.
- **Type:** body measure 65–75ch, display max 6rem, tracking floor -0.04em, balanced headings, obvious scale and weight steps. Run the real copy at every breakpoint and fix what overflows.
- **Motion:** one authored moment, not scattered effects and not one identical entrance on every section. Exponential ease-out from an already-visible default. Reach past transform and opacity: blur, backdrop-filter, clip-path, mask, and shadow belong to the palette when they stay smooth.
- **States:** hover, disabled, loading, error, empty. Plus real content, working controls, responsive composition, keyboard focus.
- **Browser surfaces:** the parts you did not draw still carry the design. Text selection, the caret, custom scrollbars, focus rings, underline offset, and the numerals in tabular data all ship with browser defaults that belong to no design system. Theme them from the palette. This is the cheapest signal that a page was built rather than assembled, and the one models skip most reliably.
- **Copy:** the product's own language. Controls name their action; errors name the problem and the recovery.
- **Coverage:** every brief requirement present and findable within seconds.

## Refuse

These are the category's defaults, not bans: the brief's own words can earn any of them. Reaching for one when the axis is free means you were not deciding; recognizing that means rewriting the element, not softening it.

Page scaffolds:

- Same-size cards of icon plus heading plus text as the page structure. Cards are the lazy container; nested cards are always wrong.
- The hero-metric template: big number, small label, supporting stats, accent.
- A kicker or eyebrow above a heading. This one is a ban, not a default: no brief earns it back. The heading carries its own weight; delete the label and let the heading speak.
- Section numbers (01 / 02 / 03) unless the sequence itself carries information the reader needs.
- A modal for a task that needs neither interruption nor protected focus.

Surface habits:

- Gradient text. Emphasis comes from weight or size.
- Glass and blur as decoration rather than as a specific effect.
- A colored `border-left` or `border-right` above 1px on cards, list items, callouts, or alerts.
- Hard offset shadows (`box-shadow: 4px 4px 0`) outside a world that is actually neobrutalist. The zero-blur block shadow is a costume, not a depth system; a world that did not choose it never earns it as a default.
- Sparklines, progress rings, and soft-shadowed rounded rectangles standing in for content.
- Monospace as a costume for "technical" rather than for code, data, or measurement.
- A system display face (Impact, Arial Black, the platform sans) as the display voice of an own-world page. Source and self-host a face whose character matches the approved lettering; the closest installed font is a failure, not a fallback.
- Unicode glyphs or emoji standing in for an icon system. Icons are drawn, from a real library or authored SVG, in one consistent stroke and weight.
- Geometric masks standing in for organic contours. A circle, polygon, or radial-gradient cutout approximating a photographic subject's edge is the cheap version of the effect and reads worse than omitting it. Derive an alpha matte from the actual image, or produce a cut-out asset.
- Light or dark picked by category. Pick it from the use scene: who, where, under what ambient light.

- Tracking stops at -0.04em. -0.02 to -0.03em usually reads better.
- Declare elevation once, border or shadow. A 1px border under a wide soft shadow is the ghost card. Card radii stay at 12–16px; pills are for small controls.
- Real illustration or none. Sketch-style SVG scenes, `loose-sketch` / `doodle` class names, and `feTurbulence` grain read as amateur. This bans SVG imitating pictures, never SVG doing geometry: crisp vector shapes, diagrams, animated linework, and shader-driven effects remain first-class media. A shaded, perspectived, or figure-bearing illustration is a picture even in line-art style; geometry means shapes a session can specify exactly.
- Backgrounds are surfaces, textured only from the subject's world. `repeating-linear-gradient` stripes and two-axis grid overlays need an actual canvas, map, blueprint, or measuring tool under them.
- Claims and configuration come from supplied truth; label illustrative values honestly. Naming a concept and then ironizing it is not a claim.

The floor holds the mechanics; it never picks the direction. With every check green, spend the page on the committed world, and when torn between refined and committed, commit.


apply patch
patch: completed
C:\Users\Joosep\tenders\klaipeda-environment\demo\css\sections.css
C:\Users\Joosep\tenders\klaipeda-environment\demo\css\theme.css
diff --git a/demo/css/sections.css b/demo/css/sections.css
index 54737cd452af584f0b257b18589988da58619e47..7baac31a7cd24e509779654fb492f735461e99bb
--- a/demo/css/sections.css
+++ b/demo/css/sections.css
@@ -6,10 +6,11 @@
 .page-hero-aside strong { display: block; color: var(--land-900); font-size: .93rem; font-weight: 600; }
 .page-hero-aside p { margin: 7px 0 0; color: var(--ink-600); font-size: .78rem; }
 .page-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
-.content-stack { display: grid; gap: 22px; padding-top: 24px; }
+.content-stack { display: grid; grid-template-columns: minmax(0, 1fr); gap: 22px; padding-top: 24px; }
 .surface { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); }
 .surface-pad { padding: clamp(18px, 3vw, 30px); }
 .section-heading { display: flex; justify-content: space-between; align-items: start; gap: 20px; margin-bottom: 18px; }
+.section-heading > * { min-width: 0; }
 .section-heading h2 { font-size: clamp(1.35rem, 3vw, 2.2rem); }
 .section-heading p { max-width: 62ch; margin: 8px 0 0; color: var(--ink-600); font-size: .86rem; }
 .eyebrow { color: var(--land-700); font-size: .68rem; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; }
@@ -92,7 +93,7 @@
 .report-link strong { color: var(--sea-900); font-size: 1.1rem; font-weight: 500; }
 .report-link span { color: var(--ink-500); font-size: .7rem; }
 .report-toolbar { display: flex; flex-wrap: wrap; gap: 8px; justify-content: space-between; align-items: center; margin: 18px 0; }
-.report-sheet { max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
+.report-sheet { width: 100%; max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
 .report-cover { padding-bottom: 24px; border-bottom: 3px solid var(--sun-500); }
 .report-cover h2 { margin-top: 10px; }
 .report-section { padding: 20px 0; border-bottom: 1px solid var(--line); }
@@ -109,7 +110,7 @@
 .checkbox-group { padding: 15px; border: 1px solid var(--line); }
 .checkbox-group h3 { margin-bottom: 10px; font-size: .93rem; }
 .checkbox-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; max-height: 270px; overflow: auto; }
-.checkbox-grid label { display: flex; align-items: flex-start; gap: 7px; color: var(--ink-800); font-size: .73rem; }
+.checkbox-grid label { display: flex; min-height: 40px; align-items: center; gap: 7px; color: var(--ink-800); font-size: .73rem; }
 .selection-summary { display: grid; gap: 9px; padding: 15px; background: var(--shore-100); border: 1px solid var(--shore-300); }
 .selection-summary strong { color: var(--land-900); font-weight: 600; }
 .demo-code { display: inline-block; padding: 7px 10px; color: var(--sea-950); background: var(--surface); border: 1px dashed var(--sea-700); font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: .9rem; font-weight: 600; letter-spacing: .08em; }
@@ -132,7 +133,7 @@
 .howto h3 { margin-bottom: 8px; }
 .privacy-version { display: inline-block; padding: 5px 8px; color: var(--land-900); background: var(--shore-200); font-size: .7rem; font-weight: 600; }
 .main-nav details ul ul { position: static; width: auto; margin: 2px 0 0; padding: 0 0 0 10px; border: 0; border-radius: 0; box-shadow: none; }
-.main-nav details ul ul a { min-height: 34px; padding: 6px 8px; font-size: .71rem; }
+.main-nav details ul ul a { min-height: 40px; padding: 6px 8px; font-size: .71rem; }
 .main-nav .nav-group-label { display: block; padding: 7px 8px 3px; color: var(--land-700); font-size: .68rem; font-weight: 600; }
 
 @media (max-width: 980px) {
@@ -144,6 +145,7 @@
   .periodic-layout { grid-template-columns: 1fr; }
 }
 @media (max-width: 720px) {
+  .section-heading { flex-wrap: wrap; }
   .analysis-filter-grid, .stats-grid, .checkbox-groups, .howto-grid, .contact-grid { grid-template-columns: 1fr; }
   .field-group--wide { grid-column: auto; }
   .stats-grid { gap: 8px; }
@@ -172,7 +174,7 @@
 .admin-brand small { display: block; margin-top: 5px; color: #a9c0da; font-size: .69rem; letter-spacing: .1em; text-transform: uppercase; }
 .admin-sidebar .brand-stripe { margin: 22px 0 20px; opacity: .9; }
 .admin-nav ul { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
-.admin-nav-link { display: block; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
+.admin-nav-link { display: block; min-height: 40px; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
 .admin-nav-link:hover { color: #fff; background: rgba(255,255,255,.08); }
 .admin-nav-link.is-active { color: #fff; background: rgba(40,140,200,.22); border-left-color: var(--sun-500); }
 .admin-nav-logout { width: 100%; margin-top: 10px; color: #b9cde2; background: transparent; border: 0; cursor: pointer; font: inherit; text-align: left; }
@@ -197,6 +199,7 @@
 .admin-kpi-grid .stat-card { min-height: 108px; }
 .admin-kpi-grid .stat-value { font-size: clamp(1.3rem, 3vw, 2.2rem); }
 .admin-grid-2 { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr); gap: 18px; align-items: start; }
+.admin-grid-2 > .surface { min-width: 0; }
 .admin-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; align-items: start; }
 .admin-section-title { display: flex; justify-content: space-between; gap: 14px; align-items: start; margin-bottom: 15px; }
 .admin-section-title h2 { font-size: clamp(1.25rem, 2.5vw, 1.9rem); }
@@ -204,6 +207,7 @@
 .admin-section-title .eyebrow { display: block; margin-bottom: 5px; }
 .admin-live-dot { display: inline-flex; align-items: center; gap: 6px; color: var(--land-900); font-size: .68rem; font-weight: 600; white-space: nowrap; }
 .admin-live-dot::before { width: 8px; height: 8px; content: ""; background: var(--land-500); border-radius: 50%; box-shadow: 0 0 0 4px rgba(83,138,131,.16); }
+.admin-table { min-width: 0; max-width: 100%; overflow-x: auto; }
 .admin-table .data-table { min-width: 720px; }
 .admin-table--compact .data-table { min-width: 520px; }
 .admin-table .data-table td, .admin-table .data-table th { padding: 9px 10px; font-size: .7rem; }
@@ -223,14 +227,14 @@
 .admin-form-message { margin: 11px 0 0; padding: 10px 12px; background: var(--shore-100); border-left: 3px solid var(--sun-500); color: var(--ink-800); font-size: .73rem; }
 .admin-form-message.is-danger { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 .admin-check-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px; }
-.admin-check-grid label { display: flex; align-items: flex-start; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
+.admin-check-grid label { display: flex; min-height: 40px; align-items: center; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
 .admin-check-grid input { margin-top: 2px; accent-color: var(--sea-800); }
 .admin-rule-list { display: grid; gap: 8px; }
 .admin-rule { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; padding: 11px 12px; border: 1px solid var(--line); }
 .admin-rule strong { display: block; color: var(--sea-900); font-size: .76rem; }
 .admin-rule p { margin: 4px 0 0; color: var(--ink-600); font-size: .68rem; }
 .admin-rule input { width: 18px; height: 18px; accent-color: var(--land-700); }
-.admin-switch { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
+.admin-switch { display: inline-flex; min-height: 40px; align-items: center; gap: 8px; white-space: nowrap; }
 .admin-switch input { appearance: none; position: relative; width: 35px; height: 20px; margin: 0; border-radius: 999px; background: var(--line-strong); cursor: pointer; transition: background 160ms var(--ease-out); }
 .admin-switch input::after { position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; content: ""; background: var(--surface); border-radius: 50%; transition: transform 160ms var(--ease-out); }
 .admin-switch input:checked { background: var(--land-700); }
@@ -239,9 +243,10 @@
 .admin-filter-row .field-group { min-width: 150px; flex: 1 1 150px; }
 .admin-filter-row .button { flex: 0 0 auto; }
 .admin-inline-actions { display: flex; flex-wrap: wrap; gap: 5px; }
-.admin-inline-actions .button { min-height: 31px; padding: 5px 8px; font-size: .63rem; }
+.admin-inline-actions .button { min-height: 40px; padding: 5px 8px; font-size: .63rem; }
 .admin-inline-edit { display: grid; grid-template-columns: 120px auto; gap: 5px; align-items: center; }
-.admin-inline-edit input { min-height: 31px; width: 120px; padding: 4px 6px; font-size: .68rem; }
+.admin-inline-edit input { min-height: 40px; width: 120px; padding: 4px 6px; font-size: .68rem; }
+.admin-table .select-field, .admin-rule > .select-field { min-height: 40px !important; }
 .admin-danger-note { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 .admin-login-page { display: grid; min-height: 100vh; place-items: center; padding: 24px; background: radial-gradient(circle at 85% 12%, rgba(40,140,200,.15), transparent 28%), var(--surface-muted); }
 .admin-login-card { width: min(100%, 500px); padding: clamp(23px, 5vw, 42px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-md); }
diff --git a/demo/css/theme.css b/demo/css/theme.css
index cb813da4aa68a296274bb55838ca22fb34bbb2eb..46673e9264829fee8975b805022a6caa231d4ce4
--- a/demo/css/theme.css
+++ b/demo/css/theme.css
@@ -244,7 +244,7 @@
 .button--primary:hover { color: #fff; background: var(--sea-950); }
 .button--secondary { color: var(--sea-900); background: var(--surface); border-color: var(--line-strong); }
 .button--secondary:hover { background: var(--shore-100); border-color: var(--sea-500); }
-.button--small { min-height: 38px; padding: 8px 12px; font-size: 0.76rem; }
+.button--small { min-height: 40px; padding: 8px 12px; font-size: 0.76rem; }
 
 .panel {
   background: var(--surface);
@@ -329,10 +329,10 @@
 .map-preview::after { position: absolute; content: ""; background: rgba(255,255,255,0.72); transform: rotate(-13deg); }
 .map-preview::before { top: 22%; left: -8%; width: 120%; height: 14px; box-shadow: 0 65px 0 rgba(255,255,255,0.55), 0 130px 0 rgba(255,255,255,0.65); }
 .map-preview::after { top: -10%; left: 38%; width: 15px; height: 130%; box-shadow: 80px 0 0 rgba(255,255,255,0.44), 160px 0 0 rgba(255,255,255,0.48); }
-.map-preview-content { position: relative; z-index: 1; min-height: 230px; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
+.map-preview-content { position: relative; z-index: 1; display: flex; min-height: 230px; flex-direction: column; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
 .map-preview-label { display: flex; align-items: center; justify-content: space-between; color: var(--sea-950); font-size: 0.72rem; font-weight: 600; }
-.map-preview-label span { display: inline-flex; width: 8px; height: 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
-.map-preview-link { position: absolute; right: 18px; bottom: 17px; }
+.map-preview-label > [aria-hidden="true"] { display: inline-flex; width: 8px; height: 8px; flex: 0 0 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
+.map-preview-link { align-self: flex-end; margin-top: auto; }
 
 .section-intro { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin: 44px 0 18px; }
 .section-intro p { max-width: 48ch; margin: 0; color: var(--ink-600); font-size: 0.9rem; }
@@ -347,7 +347,7 @@
 .site-footer strong { display: block; color: #fff; font-weight: 500; }
 .site-footer p { max-width: 45ch; margin: 8px 0 0; color: #bbcee2; font-size: 0.77rem; }
 .footer-links { display: flex; flex-wrap: wrap; justify-content: flex-end; align-content: flex-start; gap: 8px 16px; }
-.footer-links a { color: #dfeafa; font-size: 0.77rem; }
+.footer-links a { display: inline-flex; min-height: 40px; align-items: center; color: #dfeafa; font-size: 0.77rem; }
 
 /* Map page */
 .map-page-shell { width: min(calc(100% - 32px), 1500px); margin: 0 auto; padding: 22px 0 32px; }
@@ -366,7 +366,7 @@
 .field:hover,
 .select-field:hover { border-color: var(--sea-700); }
 .layer-list { display: grid; gap: 8px; }
-.layer-list label { display: flex; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
+.layer-list label { display: flex; min-height: 40px; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
 .layer-list input { width: 18px; height: 18px; accent-color: var(--sea-800); }
 .legend { display: grid; gap: 7px; padding-top: 12px; border-top: 1px solid var(--line); }
 .legend-row { display: flex; align-items: center; gap: 8px; color: var(--ink-600); font-size: 0.7rem; }
@@ -385,7 +385,7 @@
 .popup-kicker { margin-bottom: 4px; color: var(--land-700); font-size: 0.66rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
 .popup-title { margin: 0; color: var(--sea-950); font-size: 1rem; font-weight: 600; line-height: 1.25; }
 .popup-meta { margin: 6px 0 12px; color: var(--ink-600); font-size: 0.68rem; line-height: 1.55; }
-.popup-select { width: 100%; min-height: 34px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
+.popup-select { width: 100%; min-height: 40px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
 .popup-data-table { width: 100%; border-collapse: collapse; font-size: 0.7rem; }
 .popup-data-table th,
 .popup-data-table td { padding: 6px 4px; text-align: left; border-bottom: 1px solid var(--line); }

hook: PostToolUse
hook: PostToolUse Failed
diff --git a/demo/css/sections.css b/demo/css/sections.css
index 54737cd452af584f0b257b18589988da58619e47..7baac31a7cd24e509779654fb492f735461e99bb
--- a/demo/css/sections.css
+++ b/demo/css/sections.css
@@ -6,10 +6,11 @@
 .page-hero-aside strong { display: block; color: var(--land-900); font-size: .93rem; font-weight: 600; }
 .page-hero-aside p { margin: 7px 0 0; color: var(--ink-600); font-size: .78rem; }
 .page-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
-.content-stack { display: grid; gap: 22px; padding-top: 24px; }
+.content-stack { display: grid; grid-template-columns: minmax(0, 1fr); gap: 22px; padding-top: 24px; }
 .surface { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); }
 .surface-pad { padding: clamp(18px, 3vw, 30px); }
 .section-heading { display: flex; justify-content: space-between; align-items: start; gap: 20px; margin-bottom: 18px; }
+.section-heading > * { min-width: 0; }
 .section-heading h2 { font-size: clamp(1.35rem, 3vw, 2.2rem); }
 .section-heading p { max-width: 62ch; margin: 8px 0 0; color: var(--ink-600); font-size: .86rem; }
 .eyebrow { color: var(--land-700); font-size: .68rem; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; }
@@ -92,7 +93,7 @@
 .report-link strong { color: var(--sea-900); font-size: 1.1rem; font-weight: 500; }
 .report-link span { color: var(--ink-500); font-size: .7rem; }
 .report-toolbar { display: flex; flex-wrap: wrap; gap: 8px; justify-content: space-between; align-items: center; margin: 18px 0; }
-.report-sheet { max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
+.report-sheet { width: 100%; max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
 .report-cover { padding-bottom: 24px; border-bottom: 3px solid var(--sun-500); }
 .report-cover h2 { margin-top: 10px; }
 .report-section { padding: 20px 0; border-bottom: 1px solid var(--line); }
@@ -109,7 +110,7 @@
 .checkbox-group { padding: 15px; border: 1px solid var(--line); }
 .checkbox-group h3 { margin-bottom: 10px; font-size: .93rem; }
 .checkbox-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; max-height: 270px; overflow: auto; }
-.checkbox-grid label { display: flex; align-items: flex-start; gap: 7px; color: var(--ink-800); font-size: .73rem; }
+.checkbox-grid label { display: flex; min-height: 40px; align-items: center; gap: 7px; color: var(--ink-800); font-size: .73rem; }
 .selection-summary { display: grid; gap: 9px; padding: 15px; background: var(--shore-100); border: 1px solid var(--shore-300); }
 .selection-summary strong { color: var(--land-900); font-weight: 600; }
 .demo-code { display: inline-block; padding: 7px 10px; color: var(--sea-950); background: var(--surface); border: 1px dashed var(--sea-700); font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: .9rem; font-weight: 600; letter-spacing: .08em; }
@@ -132,7 +133,7 @@
 .howto h3 { margin-bottom: 8px; }
 .privacy-version { display: inline-block; padding: 5px 8px; color: var(--land-900); background: var(--shore-200); font-size: .7rem; font-weight: 600; }
 .main-nav details ul ul { position: static; width: auto; margin: 2px 0 0; padding: 0 0 0 10px; border: 0; border-radius: 0; box-shadow: none; }
-.main-nav details ul ul a { min-height: 34px; padding: 6px 8px; font-size: .71rem; }
+.main-nav details ul ul a { min-height: 40px; padding: 6px 8px; font-size: .71rem; }
 .main-nav .nav-group-label { display: block; padding: 7px 8px 3px; color: var(--land-700); font-size: .68rem; font-weight: 600; }
 
 @media (max-width: 980px) {
@@ -144,6 +145,7 @@
   .periodic-layout { grid-template-columns: 1fr; }
 }
 @media (max-width: 720px) {
+  .section-heading { flex-wrap: wrap; }
   .analysis-filter-grid, .stats-grid, .checkbox-groups, .howto-grid, .contact-grid { grid-template-columns: 1fr; }
   .field-group--wide { grid-column: auto; }
   .stats-grid { gap: 8px; }
@@ -172,7 +174,7 @@
 .admin-brand small { display: block; margin-top: 5px; color: #a9c0da; font-size: .69rem; letter-spacing: .1em; text-transform: uppercase; }
 .admin-sidebar .brand-stripe { margin: 22px 0 20px; opacity: .9; }
 .admin-nav ul { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
-.admin-nav-link { display: block; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
+.admin-nav-link { display: block; min-height: 40px; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
 .admin-nav-link:hover { color: #fff; background: rgba(255,255,255,.08); }
 .admin-nav-link.is-active { color: #fff; background: rgba(40,140,200,.22); border-left-color: var(--sun-500); }
 .admin-nav-logout { width: 100%; margin-top: 10px; color: #b9cde2; background: transparent; border: 0; cursor: pointer; font: inherit; text-align: left; }
@@ -197,6 +199,7 @@
 .admin-kpi-grid .stat-card { min-height: 108px; }
 .admin-kpi-grid .stat-value { font-size: clamp(1.3rem, 3vw, 2.2rem); }
 .admin-grid-2 { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr); gap: 18px; align-items: start; }
+.admin-grid-2 > .surface { min-width: 0; }
 .admin-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; align-items: start; }
 .admin-section-title { display: flex; justify-content: space-between; gap: 14px; align-items: start; margin-bottom: 15px; }
 .admin-section-title h2 { font-size: clamp(1.25rem, 2.5vw, 1.9rem); }
@@ -204,6 +207,7 @@
 .admin-section-title .eyebrow { display: block; margin-bottom: 5px; }
 .admin-live-dot { display: inline-flex; align-items: center; gap: 6px; color: var(--land-900); font-size: .68rem; font-weight: 600; white-space: nowrap; }
 .admin-live-dot::before { width: 8px; height: 8px; content: ""; background: var(--land-500); border-radius: 50%; box-shadow: 0 0 0 4px rgba(83,138,131,.16); }
+.admin-table { min-width: 0; max-width: 100%; overflow-x: auto; }
 .admin-table .data-table { min-width: 720px; }
 .admin-table--compact .data-table { min-width: 520px; }
 .admin-table .data-table td, .admin-table .data-table th { padding: 9px 10px; font-size: .7rem; }
@@ -223,14 +227,14 @@
 .admin-form-message { margin: 11px 0 0; padding: 10px 12px; background: var(--shore-100); border-left: 3px solid var(--sun-500); color: var(--ink-800); font-size: .73rem; }
 .admin-form-message.is-danger { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 .admin-check-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px; }
-.admin-check-grid label { display: flex; align-items: flex-start; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
+.admin-check-grid label { display: flex; min-height: 40px; align-items: center; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
 .admin-check-grid input { margin-top: 2px; accent-color: var(--sea-800); }
 .admin-rule-list { display: grid; gap: 8px; }
 .admin-rule { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; padding: 11px 12px; border: 1px solid var(--line); }
 .admin-rule strong { display: block; color: var(--sea-900); font-size: .76rem; }
 .admin-rule p { margin: 4px 0 0; color: var(--ink-600); font-size: .68rem; }
 .admin-rule input { width: 18px; height: 18px; accent-color: var(--land-700); }
-.admin-switch { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
+.admin-switch { display: inline-flex; min-height: 40px; align-items: center; gap: 8px; white-space: nowrap; }
 .admin-switch input { appearance: none; position: relative; width: 35px; height: 20px; margin: 0; border-radius: 999px; background: var(--line-strong); cursor: pointer; transition: background 160ms var(--ease-out); }
 .admin-switch input::after { position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; content: ""; background: var(--surface); border-radius: 50%; transition: transform 160ms var(--ease-out); }
 .admin-switch input:checked { background: var(--land-700); }
@@ -239,9 +243,10 @@
 .admin-filter-row .field-group { min-width: 150px; flex: 1 1 150px; }
 .admin-filter-row .button { flex: 0 0 auto; }
 .admin-inline-actions { display: flex; flex-wrap: wrap; gap: 5px; }
-.admin-inline-actions .button { min-height: 31px; padding: 5px 8px; font-size: .63rem; }
+.admin-inline-actions .button { min-height: 40px; padding: 5px 8px; font-size: .63rem; }
 .admin-inline-edit { display: grid; grid-template-columns: 120px auto; gap: 5px; align-items: center; }
-.admin-inline-edit input { min-height: 31px; width: 120px; padding: 4px 6px; font-size: .68rem; }
+.admin-inline-edit input { min-height: 40px; width: 120px; padding: 4px 6px; font-size: .68rem; }
+.admin-table .select-field, .admin-rule > .select-field { min-height: 40px !important; }
 .admin-danger-note { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 .admin-login-page { display: grid; min-height: 100vh; place-items: center; padding: 24px; background: radial-gradient(circle at 85% 12%, rgba(40,140,200,.15), transparent 28%), var(--surface-muted); }
 .admin-login-card { width: min(100%, 500px); padding: clamp(23px, 5vw, 42px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-md); }
diff --git a/demo/css/theme.css b/demo/css/theme.css
index cb813da4aa68a296274bb55838ca22fb34bbb2eb..46673e9264829fee8975b805022a6caa231d4ce4
--- a/demo/css/theme.css
+++ b/demo/css/theme.css
@@ -244,7 +244,7 @@
 .button--primary:hover { color: #fff; background: var(--sea-950); }
 .button--secondary { color: var(--sea-900); background: var(--surface); border-color: var(--line-strong); }
 .button--secondary:hover { background: var(--shore-100); border-color: var(--sea-500); }
-.button--small { min-height: 38px; padding: 8px 12px; font-size: 0.76rem; }
+.button--small { min-height: 40px; padding: 8px 12px; font-size: 0.76rem; }
 
 .panel {
   background: var(--surface);
@@ -329,10 +329,10 @@
 .map-preview::after { position: absolute; content: ""; background: rgba(255,255,255,0.72); transform: rotate(-13deg); }
 .map-preview::before { top: 22%; left: -8%; width: 120%; height: 14px; box-shadow: 0 65px 0 rgba(255,255,255,0.55), 0 130px 0 rgba(255,255,255,0.65); }
 .map-preview::after { top: -10%; left: 38%; width: 15px; height: 130%; box-shadow: 80px 0 0 rgba(255,255,255,0.44), 160px 0 0 rgba(255,255,255,0.48); }
-.map-preview-content { position: relative; z-index: 1; min-height: 230px; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
+.map-preview-content { position: relative; z-index: 1; display: flex; min-height: 230px; flex-direction: column; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
 .map-preview-label { display: flex; align-items: center; justify-content: space-between; color: var(--sea-950); font-size: 0.72rem; font-weight: 600; }
-.map-preview-label span { display: inline-flex; width: 8px; height: 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
-.map-preview-link { position: absolute; right: 18px; bottom: 17px; }
+.map-preview-label > [aria-hidden="true"] { display: inline-flex; width: 8px; height: 8px; flex: 0 0 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
+.map-preview-link { align-self: flex-end; margin-top: auto; }
 
 .section-intro { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin: 44px 0 18px; }
 .section-intro p { max-width: 48ch; margin: 0; color: var(--ink-600); font-size: 0.9rem; }
@@ -347,7 +347,7 @@
 .site-footer strong { display: block; color: #fff; font-weight: 500; }
 .site-footer p { max-width: 45ch; margin: 8px 0 0; color: #bbcee2; font-size: 0.77rem; }
 .footer-links { display: flex; flex-wrap: wrap; justify-content: flex-end; align-content: flex-start; gap: 8px 16px; }
-.footer-links a { color: #dfeafa; font-size: 0.77rem; }
+.footer-links a { display: inline-flex; min-height: 40px; align-items: center; color: #dfeafa; font-size: 0.77rem; }
 
 /* Map page */
 .map-page-shell { width: min(calc(100% - 32px), 1500px); margin: 0 auto; padding: 22px 0 32px; }
@@ -366,7 +366,7 @@
 .field:hover,
 .select-field:hover { border-color: var(--sea-700); }
 .layer-list { display: grid; gap: 8px; }
-.layer-list label { display: flex; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
+.layer-list label { display: flex; min-height: 40px; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
 .layer-list input { width: 18px; height: 18px; accent-color: var(--sea-800); }
 .legend { display: grid; gap: 7px; padding-top: 12px; border-top: 1px solid var(--line); }
 .legend-row { display: flex; align-items: center; gap: 8px; color: var(--ink-600); font-size: 0.7rem; }
@@ -385,7 +385,7 @@
 .popup-kicker { margin-bottom: 4px; color: var(--land-700); font-size: 0.66rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
 .popup-title { margin: 0; color: var(--sea-950); font-size: 1rem; font-weight: 600; line-height: 1.25; }
 .popup-meta { margin: 6px 0 12px; color: var(--ink-600); font-size: 0.68rem; line-height: 1.55; }
-.popup-select { width: 100%; min-height: 34px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
+.popup-select { width: 100%; min-height: 40px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
 .popup-data-table { width: 100%; border-collapse: collapse; font-size: 0.7rem; }
 .popup-data-table th,
 .popup-data-table td { padding: 6px 4px; text-align: left; border-bottom: 1px solid var(--line); }

codex
The CSS changes are in place. I’m running one combined verification pass now: every public route at 390px, all admin/public console logs, the exact target classes, 150% map-preview geometry, and the dashboard table’s internal scroll metrics.
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command '$env:PYTHONIOENCODING='"'utf-8'; @'
import asyncio, json
from pathlib import Path
from playwright.async_api import async_playwright
BASE='http://localhost:8000/'
public=['index.html']+[str(p.relative_to('demo')).replace('\\\\','/') for p in Path('demo/pages').glob('*.html')]
admin=[str(p.relative_to('demo')).replace('\\\\','/') for p in Path('demo/pages/admin').glob('*.html')]
targets=['.footer-links a','.main-nav details li a','.button--small','.admin-nav-link','.admin-inline-actions .button','.admin-inline-edit input','.admin-switch','.admin-switch input','.popup-select','.checkbox-grid label','.layer-list label','.admin-check-grid label','.select-field']
async def load(page,path,open_nav=False):
  errs=[]
  page.on('console',lambda m: errs.append('console:'+m.type+':'+m.text) if m.type=='error' else None)
  page.on('pageerror',lambda e: errs.append('pageerror:'+str(e)))
  await page.goto(BASE+path,wait_until='networkidle',timeout=30000); await page.wait_for_timeout(350)
  if open_nav: await page.evaluate(\"document.querySelectorAll('.main-nav details').forEach(d=>d.open=true)\")
  return errs
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True)
  # Mobile overflow and public runtime
  ctxm=await b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
  widths={}; errors=[]
  for path in public:
   pg=await ctxm.new_page(); errs=await load(pg,path); widths[path]=await pg.evaluate('document.documentElement.scrollWidth'); errors += [(path,e) for e in errs]
   if path in ['pages/oro.html','pages/ataskaitos.html']: await pg.screenshot(path='demo/_qa_'+Path(path).stem+'_390.png',full_page=True)
   await pg.close()
  await ctxm.close()
  print('PUBLIC_WIDTHS_390',json.dumps(widths,ensure_ascii=False,sort_keys=True))
  print('PUBLIC_MAX',max(widths.values()),'FAILURES',json.dumps({k:v for k,v in widths.items() if v>392},ensure_ascii=False))
  # Desktop/admin runtime and target geometry
  ctx=await b.new_context(viewport={'width':1280,'height':900},has_touch=True)
  await ctx.add_init_script(\"localStorage.setItem('kms_amis_admin_session', JSON.stringify({role:'administratorius'}))\")
  summary={s:{'minw':9999,'minh':9999,'samples':[]} for s in targets}
  for path in public+admin:
   pg=await ctx.new_page(); errs=await load(pg,path,not path.startswith('pages/admin/')); errors += [(path,e) for e in errs]
   vals=await pg.evaluate('''sels=>Object.fromEntries(sels.map(sel=>[sel,[...document.querySelectorAll(sel)].filter(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return r.width&&r.height&&s.visibility"'!=='"'hidden'}).map(e=>{const r=e.getBoundingClientRect();return {w:+r.width.toFixed(1),h:+r.height.toFixed(1),text:(e.innerText||e.getAttribute('aria-label')||'').trim().slice(0,38)}})]))''',targets)
   for sel,items in vals.items():
    for it in items:
     s=summary[sel];s['minw']=min(s['minw'],it['w']);s['minh']=min(s['minh'],it['h'])
     if (it['h']<40 or it['w']<40) and len(s['samples'])<3:s['samples'].append({'page':path,**it})
   await pg.close()
  print('TARGETS',json.dumps(summary,ensure_ascii=False))
  # Text scale geometry
  pg=await ctx.new_page(); await pg.set_viewport_size({'width':1024,'height':844}); await load(pg,'index.html'); await pg.add_style_tag(content='html{font-size:150%"'!important}'"'); await pg.wait_for_timeout(250)
  zoom=await pg.evaluate('''() => {const q=s=>document.querySelector(s),f=e=>{const r=e.getBoundingClientRect();return {top:+r.top.toFixed(1),bottom:+r.bottom.toFixed(1),h:+r.height.toFixed(1),scrollH:e.scrollHeight,clientH:e.clientHeight}};let p=q('.map-preview'),c=q('.map-preview-content'),l=q('.map-preview-label'),t=q('.map-preview .lede'),a=q('.map-preview-link');return {panel:f(p),content:f(c),label:f(l),text:f(t),link:f(a),textLinkOverlap:+Math.max(0,Math.min(t.getBoundingClientRect().bottom,a.getBoundingClientRect().bottom)-Math.max(t.getBoundingClientRect().top,a.getBoundingClientRect().top)).toFixed(1),contentClipped:c.scrollHeight>c.clientHeight,panelClipped:p.scrollHeight>p.clientHeight+1}}''')
  print('ZOOM150',json.dumps(zoom)); await pg.screenshot(path='demo/_qa_home_zoom150.png',full_page=True); await pg.close()
  # Dashboard audit preview internal scrolling
  pg=await ctx.new_page(); await load(pg,'pages/admin/index.html');
  dash=await pg.evaluate('''() => {const w=document.querySelector('#audit-preview').closest('.admin-table'),t=w.querySelector('table'),s=w.closest('.surface');const f=e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e);return {width:+r.width.toFixed(1),client:e.clientWidth,scroll:e.scrollWidth,overflowX:c.overflowX,minWidth:c.minWidth}};return {doc:[document.documentElement.clientWidth,document.documentElement.scrollWidth],surface:f(s),wrapper:f(w),table:f(t),canScroll:w.scrollWidth>w.clientWidth}}''')
  print('DASHBOARD',json.dumps(dash)); await pg.screenshot(path='demo/_qa_admin_1280.png',full_page=True); await pg.close()
  print('ERRORS',json.dumps(errors,ensure_ascii=False))
  await ctx.close(); await b.close()
asyncio.run(main())
'@ | python -" in C:\Users\Joosep\tenders\klaipeda-environment
diff --git a/demo/css/sections.css b/demo/css/sections.css
index 54737cd452af584f0b257b18589988da58619e47..7baac31a7cd24e509779654fb492f735461e99bb
--- a/demo/css/sections.css
+++ b/demo/css/sections.css
@@ -6,10 +6,11 @@
 .page-hero-aside strong { display: block; color: var(--land-900); font-size: .93rem; font-weight: 600; }
 .page-hero-aside p { margin: 7px 0 0; color: var(--ink-600); font-size: .78rem; }
 .page-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
-.content-stack { display: grid; gap: 22px; padding-top: 24px; }
+.content-stack { display: grid; grid-template-columns: minmax(0, 1fr); gap: 22px; padding-top: 24px; }
 .surface { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); }
 .surface-pad { padding: clamp(18px, 3vw, 30px); }
 .section-heading { display: flex; justify-content: space-between; align-items: start; gap: 20px; margin-bottom: 18px; }
+.section-heading > * { min-width: 0; }
 .section-heading h2 { font-size: clamp(1.35rem, 3vw, 2.2rem); }
 .section-heading p { max-width: 62ch; margin: 8px 0 0; color: var(--ink-600); font-size: .86rem; }
 .eyebrow { color: var(--land-700); font-size: .68rem; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; }
@@ -92,7 +93,7 @@
 .report-link strong { color: var(--sea-900); font-size: 1.1rem; font-weight: 500; }
 .report-link span { color: var(--ink-500); font-size: .7rem; }
 .report-toolbar { display: flex; flex-wrap: wrap; gap: 8px; justify-content: space-between; align-items: center; margin: 18px 0; }
-.report-sheet { max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
+.report-sheet { width: 100%; max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
 .report-cover { padding-bottom: 24px; border-bottom: 3px solid var(--sun-500); }
 .report-cover h2 { margin-top: 10px; }
 .report-section { padding: 20px 0; border-bottom: 1px solid var(--line); }
@@ -109,7 +110,7 @@
 .checkbox-group { padding: 15px; border: 1px solid var(--line); }
 .checkbox-group h3 { margin-bottom: 10px; font-size: .93rem; }
 .checkbox-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; max-height: 270px; overflow: auto; }
-.checkbox-grid label { display: flex; align-items: flex-start; gap: 7px; color: var(--ink-800); font-size: .73rem; }
+.checkbox-grid label { display: flex; min-height: 40px; align-items: center; gap: 7px; color: var(--ink-800); font-size: .73rem; }
 .selection-summary { display: grid; gap: 9px; padding: 15px; background: var(--shore-100); border: 1px solid var(--shore-300); }
 .selection-summary strong { color: var(--land-900); font-weight: 600; }
 .demo-code { display: inline-block; padding: 7px 10px; color: var(--sea-950); background: var(--surface); border: 1px dashed var(--sea-700); font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: .9rem; font-weight: 600; letter-spacing: .08em; }
@@ -132,7 +133,7 @@
 .howto h3 { margin-bottom: 8px; }
 .privacy-version { display: inline-block; padding: 5px 8px; color: var(--land-900); background: var(--shore-200); font-size: .7rem; font-weight: 600; }
 .main-nav details ul ul { position: static; width: auto; margin: 2px 0 0; padding: 0 0 0 10px; border: 0; border-radius: 0; box-shadow: none; }
-.main-nav details ul ul a { min-height: 34px; padding: 6px 8px; font-size: .71rem; }
+.main-nav details ul ul a { min-height: 40px; padding: 6px 8px; font-size: .71rem; }
 .main-nav .nav-group-label { display: block; padding: 7px 8px 3px; color: var(--land-700); font-size: .68rem; font-weight: 600; }
 
 @media (max-width: 980px) {
@@ -144,6 +145,7 @@
   .periodic-layout { grid-template-columns: 1fr; }
 }
 @media (max-width: 720px) {
+  .section-heading { flex-wrap: wrap; }
   .analysis-filter-grid, .stats-grid, .checkbox-groups, .howto-grid, .contact-grid { grid-template-columns: 1fr; }
   .field-group--wide { grid-column: auto; }
   .stats-grid { gap: 8px; }
@@ -172,7 +174,7 @@
 .admin-brand small { display: block; margin-top: 5px; color: #a9c0da; font-size: .69rem; letter-spacing: .1em; text-transform: uppercase; }
 .admin-sidebar .brand-stripe { margin: 22px 0 20px; opacity: .9; }
 .admin-nav ul { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
-.admin-nav-link { display: block; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
+.admin-nav-link { display: block; min-height: 40px; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
 .admin-nav-link:hover { color: #fff; background: rgba(255,255,255,.08); }
 .admin-nav-link.is-active { color: #fff; background: rgba(40,140,200,.22); border-left-color: var(--sun-500); }
 .admin-nav-logout { width: 100%; margin-top: 10px; color: #b9cde2; background: transparent; border: 0; cursor: pointer; font: inherit; text-align: left; }
@@ -197,6 +199,7 @@
 .admin-kpi-grid .stat-card { min-height: 108px; }
 .admin-kpi-grid .stat-value { font-size: clamp(1.3rem, 3vw, 2.2rem); }
 .admin-grid-2 { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr); gap: 18px; align-items: start; }
+.admin-grid-2 > .surface { min-width: 0; }
 .admin-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; align-items: start; }
 .admin-section-title { display: flex; justify-content: space-between; gap: 14px; align-items: start; margin-bottom: 15px; }
 .admin-section-title h2 { font-size: clamp(1.25rem, 2.5vw, 1.9rem); }
@@ -204,6 +207,7 @@
 .admin-section-title .eyebrow { display: block; margin-bottom: 5px; }
 .admin-live-dot { display: inline-flex; align-items: center; gap: 6px; color: var(--land-900); font-size: .68rem; font-weight: 600; white-space: nowrap; }
 .admin-live-dot::before { width: 8px; height: 8px; content: ""; background: var(--land-500); border-radius: 50%; box-shadow: 0 0 0 4px rgba(83,138,131,.16); }
+.admin-table { min-width: 0; max-width: 100%; overflow-x: auto; }
 .admin-table .data-table { min-width: 720px; }
 .admin-table--compact .data-table { min-width: 520px; }
 .admin-table .data-table td, .admin-table .data-table th { padding: 9px 10px; font-size: .7rem; }
@@ -223,14 +227,14 @@
 .admin-form-message { margin: 11px 0 0; padding: 10px 12px; background: var(--shore-100); border-left: 3px solid var(--sun-500); color: var(--ink-800); font-size: .73rem; }
 .admin-form-message.is-danger { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 .admin-check-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px; }
-.admin-check-grid label { display: flex; align-items: flex-start; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
+.admin-check-grid label { display: flex; min-height: 40px; align-items: center; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
 .admin-check-grid input { margin-top: 2px; accent-color: var(--sea-800); }
 .admin-rule-list { display: grid; gap: 8px; }
 .admin-rule { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; padding: 11px 12px; border: 1px solid var(--line); }
 .admin-rule strong { display: block; color: var(--sea-900); font-size: .76rem; }
 .admin-rule p { margin: 4px 0 0; color: var(--ink-600); font-size: .68rem; }
 .admin-rule input { width: 18px; height: 18px; accent-color: var(--land-700); }
-.admin-switch { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
+.admin-switch { display: inline-flex; min-height: 40px; align-items: center; gap: 8px; white-space: nowrap; }
 .admin-switch input { appearance: none; position: relative; width: 35px; height: 20px; margin: 0; border-radius: 999px; background: var(--line-strong); cursor: pointer; transition: background 160ms var(--ease-out); }
 .admin-switch input::after { position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; content: ""; background: var(--surface); border-radius: 50%; transition: transform 160ms var(--ease-out); }
 .admin-switch input:checked { background: var(--land-700); }
@@ -239,9 +243,10 @@
 .admin-filter-row .field-group { min-width: 150px; flex: 1 1 150px; }
 .admin-filter-row .button { flex: 0 0 auto; }
 .admin-inline-actions { display: flex; flex-wrap: wrap; gap: 5px; }
-.admin-inline-actions .button { min-height: 31px; padding: 5px 8px; font-size: .63rem; }
+.admin-inline-actions .button { min-height: 40px; padding: 5px 8px; font-size: .63rem; }
 .admin-inline-edit { display: grid; grid-template-columns: 120px auto; gap: 5px; align-items: center; }
-.admin-inline-edit input { min-height: 31px; width: 120px; padding: 4px 6px; font-size: .68rem; }
+.admin-inline-edit input { min-height: 40px; width: 120px; padding: 4px 6px; font-size: .68rem; }
+.admin-table .select-field, .admin-rule > .select-field { min-height: 40px !important; }
 .admin-danger-note { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 .admin-login-page { display: grid; min-height: 100vh; place-items: center; padding: 24px; background: radial-gradient(circle at 85% 12%, rgba(40,140,200,.15), transparent 28%), var(--surface-muted); }
 .admin-login-card { width: min(100%, 500px); padding: clamp(23px, 5vw, 42px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-md); }
diff --git a/demo/css/theme.css b/demo/css/theme.css
index cb813da4aa68a296274bb55838ca22fb34bbb2eb..46673e9264829fee8975b805022a6caa231d4ce4
--- a/demo/css/theme.css
+++ b/demo/css/theme.css
@@ -244,7 +244,7 @@
 .button--primary:hover { color: #fff; background: var(--sea-950); }
 .button--secondary { color: var(--sea-900); background: var(--surface); border-color: var(--line-strong); }
 .button--secondary:hover { background: var(--shore-100); border-color: var(--sea-500); }
-.button--small { min-height: 38px; padding: 8px 12px; font-size: 0.76rem; }
+.button--small { min-height: 40px; padding: 8px 12px; font-size: 0.76rem; }
 
 .panel {
   background: var(--surface);
@@ -329,10 +329,10 @@
 .map-preview::after { position: absolute; content: ""; background: rgba(255,255,255,0.72); transform: rotate(-13deg); }
 .map-preview::before { top: 22%; left: -8%; width: 120%; height: 14px; box-shadow: 0 65px 0 rgba(255,255,255,0.55), 0 130px 0 rgba(255,255,255,0.65); }
 .map-preview::after { top: -10%; left: 38%; width: 15px; height: 130%; box-shadow: 80px 0 0 rgba(255,255,255,0.44), 160px 0 0 rgba(255,255,255,0.48); }
-.map-preview-content { position: relative; z-index: 1; min-height: 230px; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
+.map-preview-content { position: relative; z-index: 1; display: flex; min-height: 230px; flex-direction: column; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
 .map-preview-label { display: flex; align-items: center; justify-content: space-between; color: var(--sea-950); font-size: 0.72rem; font-weight: 600; }
-.map-preview-label span { display: inline-flex; width: 8px; height: 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
-.map-preview-link { position: absolute; right: 18px; bottom: 17px; }
+.map-preview-label > [aria-hidden="true"] { display: inline-flex; width: 8px; height: 8px; flex: 0 0 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
+.map-preview-link { align-self: flex-end; margin-top: auto; }
 
 .section-intro { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin: 44px 0 18px; }
 .section-intro p { max-width: 48ch; margin: 0; color: var(--ink-600); font-size: 0.9rem; }
@@ -347,7 +347,7 @@
 .site-footer strong { display: block; color: #fff; font-weight: 500; }
 .site-footer p { max-width: 45ch; margin: 8px 0 0; color: #bbcee2; font-size: 0.77rem; }
 .footer-links { display: flex; flex-wrap: wrap; justify-content: flex-end; align-content: flex-start; gap: 8px 16px; }
-.footer-links a { color: #dfeafa; font-size: 0.77rem; }
+.footer-links a { display: inline-flex; min-height: 40px; align-items: center; color: #dfeafa; font-size: 0.77rem; }
 
 /* Map page */
 .map-page-shell { width: min(calc(100% - 32px), 1500px); margin: 0 auto; padding: 22px 0 32px; }
@@ -366,7 +366,7 @@
 .field:hover,
 .select-field:hover { border-color: var(--sea-700); }
 .layer-list { display: grid; gap: 8px; }
-.layer-list label { display: flex; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
+.layer-list label { display: flex; min-height: 40px; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
 .layer-list input { width: 18px; height: 18px; accent-color: var(--sea-800); }
 .legend { display: grid; gap: 7px; padding-top: 12px; border-top: 1px solid var(--line); }
 .legend-row { display: flex; align-items: center; gap: 8px; color: var(--ink-600); font-size: 0.7rem; }
@@ -385,7 +385,7 @@
 .popup-kicker { margin-bottom: 4px; color: var(--land-700); font-size: 0.66rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
 .popup-title { margin: 0; color: var(--sea-950); font-size: 1rem; font-weight: 600; line-height: 1.25; }
 .popup-meta { margin: 6px 0 12px; color: var(--ink-600); font-size: 0.68rem; line-height: 1.55; }
-.popup-select { width: 100%; min-height: 34px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
+.popup-select { width: 100%; min-height: 40px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
 .popup-data-table { width: 100%; border-collapse: collapse; font-size: 0.7rem; }
 .popup-data-table th,
 .popup-data-table td { padding: 6px 4px; text-align: left; border-bottom: 1px solid var(--line); }

 succeeded in 41372ms:
PUBLIC_WIDTHS_390 {"index.html": 390, "pages/ataskaitos.html": 390, "pages/bendra-info.html": 390, "pages/dirvezemis.html": 390, "pages/gyvoji_gamta.html": 390, "pages/oro.html": 390, "pages/prenumerata.html": 390, "pages/privatumo-politika.html": 390, "pages/slapuku-politika.html": 390, "pages/truksmas.html": 390, "pages/vadovas.html": 390, "pages/vanduo.html": 390, "pages/zeldynai.html": 390, "pages/zemelapis.html": 390}
PUBLIC_MAX 390 FAILURES {}
TARGETS {".footer-links a": {"minw": 61, "minh": 40, "samples": []}, ".main-nav details li a": {"minw": 262, "minh": 40, "samples": []}, ".button--small": {"minw": 71.3, "minh": 40, "samples": []}, ".admin-nav-link": {"minw": 226, "minh": 40, "samples": []}, ".admin-inline-actions .button": {"minw": 44.6, "minh": 40, "samples": []}, ".admin-inline-edit input": {"minw": 9999, "minh": 9999, "samples": []}, ".admin-switch": {"minw": 80.2, "minh": 40, "samples": []}, ".admin-switch input": {"minw": 35, "minh": 20, "samples": [{"page": "pages/admin/nustatymai.html", "w": 35, "h": 20, "text": ""}, {"page": "pages/admin/nustatymai.html", "w": 35, "h": 20, "text": ""}, {"page": "pages/admin/nustatymai.html", "w": 35, "h": 20, "text": ""}]}, ".popup-select": {"minw": 9999, "minh": 9999, "samples": []}, ".checkbox-grid label": {"minw": 270, "minh": 40, "samples": []}, ".layer-list label": {"minw": 225.9, "minh": 40, "samples": []}, ".admin-check-grid label": {"minw": 158.1, "minh": 40, "samples": []}, ".select-field": {"minw": 97, "minh": 40, "samples": []}}
ZOOM150 {"panel": {"top": 1549.9, "bottom": 1828.9, "h": 279, "scrollH": 330, "clientH": 277}, "content": {"top": 1550.9, "bottom": 1827.9, "h": 277, "scrollH": 277, "clientH": 277}, "label": {"top": 1570.9, "bottom": 1597.7, "h": 26.8, "scrollH": 27, "clientH": 27}, "text": {"top": 1639.7, "bottom": 1740.1, "h": 100.4, "scrollH": 100, "clientH": 100}, "link": {"top": 1761.7, "bottom": 1807.9, "h": 46.3, "scrollH": 44, "clientH": 44}, "textLinkOverlap": 0, "contentClipped": false, "panelClipped": true}
DASHBOARD {"doc": [1280, 1280], "surface": {"width": 409.7, "client": 408, "scroll": 408, "overflowX": "visible", "minWidth": "0px"}, "wrapper": {"width": 347.7, "client": 346, "scroll": 520, "overflowX": "auto", "minWidth": "0px"}, "table": {"width": 520, "client": 520, "scroll": 520, "overflowX": "visible", "minWidth": "520px"}, "canScroll": true}
ERRORS []

diff --git a/demo/css/sections.css b/demo/css/sections.css
index 54737cd452af584f0b257b18589988da58619e47..7baac31a7cd24e509779654fb492f735461e99bb
--- a/demo/css/sections.css
+++ b/demo/css/sections.css
@@ -6,10 +6,11 @@
 .page-hero-aside strong { display: block; color: var(--land-900); font-size: .93rem; font-weight: 600; }
 .page-hero-aside p { margin: 7px 0 0; color: var(--ink-600); font-size: .78rem; }
 .page-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
-.content-stack { display: grid; gap: 22px; padding-top: 24px; }
+.content-stack { display: grid; grid-template-columns: minmax(0, 1fr); gap: 22px; padding-top: 24px; }
 .surface { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); }
 .surface-pad { padding: clamp(18px, 3vw, 30px); }
 .section-heading { display: flex; justify-content: space-between; align-items: start; gap: 20px; margin-bottom: 18px; }
+.section-heading > * { min-width: 0; }
 .section-heading h2 { font-size: clamp(1.35rem, 3vw, 2.2rem); }
 .section-heading p { max-width: 62ch; margin: 8px 0 0; color: var(--ink-600); font-size: .86rem; }
 .eyebrow { color: var(--land-700); font-size: .68rem; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; }
@@ -92,7 +93,7 @@
 .report-link strong { color: var(--sea-900); font-size: 1.1rem; font-weight: 500; }
 .report-link span { color: var(--ink-500); font-size: .7rem; }
 .report-toolbar { display: flex; flex-wrap: wrap; gap: 8px; justify-content: space-between; align-items: center; margin: 18px 0; }
-.report-sheet { max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
+.report-sheet { width: 100%; max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
 .report-cover { padding-bottom: 24px; border-bottom: 3px solid var(--sun-500); }
 .report-cover h2 { margin-top: 10px; }
 .report-section { padding: 20px 0; border-bottom: 1px solid var(--line); }
@@ -109,7 +110,7 @@
 .checkbox-group { padding: 15px; border: 1px solid var(--line); }
 .checkbox-group h3 { margin-bottom: 10px; font-size: .93rem; }
 .checkbox-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; max-height: 270px; overflow: auto; }
-.checkbox-grid label { display: flex; align-items: flex-start; gap: 7px; color: var(--ink-800); font-size: .73rem; }
+.checkbox-grid label { display: flex; min-height: 40px; align-items: center; gap: 7px; color: var(--ink-800); font-size: .73rem; }
 .selection-summary { display: grid; gap: 9px; padding: 15px; background: var(--shore-100); border: 1px solid var(--shore-300); }
 .selection-summary strong { color: var(--land-900); font-weight: 600; }
 .demo-code { display: inline-block; padding: 7px 10px; color: var(--sea-950); background: var(--surface); border: 1px dashed var(--sea-700); font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: .9rem; font-weight: 600; letter-spacing: .08em; }
@@ -132,7 +133,7 @@
 .howto h3 { margin-bottom: 8px; }
 .privacy-version { display: inline-block; padding: 5px 8px; color: var(--land-900); background: var(--shore-200); font-size: .7rem; font-weight: 600; }
 .main-nav details ul ul { position: static; width: auto; margin: 2px 0 0; padding: 0 0 0 10px; border: 0; border-radius: 0; box-shadow: none; }
-.main-nav details ul ul a { min-height: 34px; padding: 6px 8px; font-size: .71rem; }
+.main-nav details ul ul a { min-height: 40px; padding: 6px 8px; font-size: .71rem; }
 .main-nav .nav-group-label { display: block; padding: 7px 8px 3px; color: var(--land-700); font-size: .68rem; font-weight: 600; }
 
 @media (max-width: 980px) {
@@ -144,6 +145,7 @@
   .periodic-layout { grid-template-columns: 1fr; }
 }
 @media (max-width: 720px) {
+  .section-heading { flex-wrap: wrap; }
   .analysis-filter-grid, .stats-grid, .checkbox-groups, .howto-grid, .contact-grid { grid-template-columns: 1fr; }
   .field-group--wide { grid-column: auto; }
   .stats-grid { gap: 8px; }
@@ -172,7 +174,7 @@
 .admin-brand small { display: block; margin-top: 5px; color: #a9c0da; font-size: .69rem; letter-spacing: .1em; text-transform: uppercase; }
 .admin-sidebar .brand-stripe { margin: 22px 0 20px; opacity: .9; }
 .admin-nav ul { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
-.admin-nav-link { display: block; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
+.admin-nav-link { display: block; min-height: 40px; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
 .admin-nav-link:hover { color: #fff; background: rgba(255,255,255,.08); }
 .admin-nav-link.is-active { color: #fff; background: rgba(40,140,200,.22); border-left-color: var(--sun-500); }
 .admin-nav-logout { width: 100%; margin-top: 10px; color: #b9cde2; background: transparent; border: 0; cursor: pointer; font: inherit; text-align: left; }
@@ -197,6 +199,7 @@
 .admin-kpi-grid .stat-card { min-height: 108px; }
 .admin-kpi-grid .stat-value { font-size: clamp(1.3rem, 3vw, 2.2rem); }
 .admin-grid-2 { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr); gap: 18px; align-items: start; }
+.admin-grid-2 > .surface { min-width: 0; }
 .admin-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; align-items: start; }
 .admin-section-title { display: flex; justify-content: space-between; gap: 14px; align-items: start; margin-bottom: 15px; }
 .admin-section-title h2 { font-size: clamp(1.25rem, 2.5vw, 1.9rem); }
@@ -204,6 +207,7 @@
 .admin-section-title .eyebrow { display: block; margin-bottom: 5px; }
 .admin-live-dot { display: inline-flex; align-items: center; gap: 6px; color: var(--land-900); font-size: .68rem; font-weight: 600; white-space: nowrap; }
 .admin-live-dot::before { width: 8px; height: 8px; content: ""; background: var(--land-500); border-radius: 50%; box-shadow: 0 0 0 4px rgba(83,138,131,.16); }
+.admin-table { min-width: 0; max-width: 100%; overflow-x: auto; }
 .admin-table .data-table { min-width: 720px; }
 .admin-table--compact .data-table { min-width: 520px; }
 .admin-table .data-table td, .admin-table .data-table th { padding: 9px 10px; font-size: .7rem; }
@@ -223,14 +227,14 @@
 .admin-form-message { margin: 11px 0 0; padding: 10px 12px; background: var(--shore-100); border-left: 3px solid var(--sun-500); color: var(--ink-800); font-size: .73rem; }
 .admin-form-message.is-danger { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 .admin-check-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px; }
-.admin-check-grid label { display: flex; align-items: flex-start; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
+.admin-check-grid label { display: flex; min-height: 40px; align-items: center; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
 .admin-check-grid input { margin-top: 2px; accent-color: var(--sea-800); }
 .admin-rule-list { display: grid; gap: 8px; }
 .admin-rule { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; padding: 11px 12px; border: 1px solid var(--line); }
 .admin-rule strong { display: block; color: var(--sea-900); font-size: .76rem; }
 .admin-rule p { margin: 4px 0 0; color: var(--ink-600); font-size: .68rem; }
 .admin-rule input { width: 18px; height: 18px; accent-color: var(--land-700); }
-.admin-switch { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
+.admin-switch { display: inline-flex; min-height: 40px; align-items: center; gap: 8px; white-space: nowrap; }
 .admin-switch input { appearance: none; position: relative; width: 35px; height: 20px; margin: 0; border-radius: 999px; background: var(--line-strong); cursor: pointer; transition: background 160ms var(--ease-out); }
 .admin-switch input::after { position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; content: ""; background: var(--surface); border-radius: 50%; transition: transform 160ms var(--ease-out); }
 .admin-switch input:checked { background: var(--land-700); }
@@ -239,9 +243,10 @@
 .admin-filter-row .field-group { min-width: 150px; flex: 1 1 150px; }
 .admin-filter-row .button { flex: 0 0 auto; }
 .admin-inline-actions { display: flex; flex-wrap: wrap; gap: 5px; }
-.admin-inline-actions .button { min-height: 31px; padding: 5px 8px; font-size: .63rem; }
+.admin-inline-actions .button { min-height: 40px; padding: 5px 8px; font-size: .63rem; }
 .admin-inline-edit { display: grid; grid-template-columns: 120px auto; gap: 5px; align-items: center; }
-.admin-inline-edit input { min-height: 31px; width: 120px; padding: 4px 6px; font-size: .68rem; }
+.admin-inline-edit input { min-height: 40px; width: 120px; padding: 4px 6px; font-size: .68rem; }
+.admin-table .select-field, .admin-rule > .select-field { min-height: 40px !important; }
 .admin-danger-note { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 .admin-login-page { display: grid; min-height: 100vh; place-items: center; padding: 24px; background: radial-gradient(circle at 85% 12%, rgba(40,140,200,.15), transparent 28%), var(--surface-muted); }
 .admin-login-card { width: min(100%, 500px); padding: clamp(23px, 5vw, 42px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-md); }
diff --git a/demo/css/theme.css b/demo/css/theme.css
index cb813da4aa68a296274bb55838ca22fb34bbb2eb..46673e9264829fee8975b805022a6caa231d4ce4
--- a/demo/css/theme.css
+++ b/demo/css/theme.css
@@ -244,7 +244,7 @@
 .button--primary:hover { color: #fff; background: var(--sea-950); }
 .button--secondary { color: var(--sea-900); background: var(--surface); border-color: var(--line-strong); }
 .button--secondary:hover { background: var(--shore-100); border-color: var(--sea-500); }
-.button--small { min-height: 38px; padding: 8px 12px; font-size: 0.76rem; }
+.button--small { min-height: 40px; padding: 8px 12px; font-size: 0.76rem; }
 
 .panel {
   background: var(--surface);
@@ -329,10 +329,10 @@
 .map-preview::after { position: absolute; content: ""; background: rgba(255,255,255,0.72); transform: rotate(-13deg); }
 .map-preview::before { top: 22%; left: -8%; width: 120%; height: 14px; box-shadow: 0 65px 0 rgba(255,255,255,0.55), 0 130px 0 rgba(255,255,255,0.65); }
 .map-preview::after { top: -10%; left: 38%; width: 15px; height: 130%; box-shadow: 80px 0 0 rgba(255,255,255,0.44), 160px 0 0 rgba(255,255,255,0.48); }
-.map-preview-content { position: relative; z-index: 1; min-height: 230px; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
+.map-preview-content { position: relative; z-index: 1; display: flex; min-height: 230px; flex-direction: column; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
 .map-preview-label { display: flex; align-items: center; justify-content: space-between; color: var(--sea-950); font-size: 0.72rem; font-weight: 600; }
-.map-preview-label span { display: inline-flex; width: 8px; height: 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
-.map-preview-link { position: absolute; right: 18px; bottom: 17px; }
+.map-preview-label > [aria-hidden="true"] { display: inline-flex; width: 8px; height: 8px; flex: 0 0 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
+.map-preview-link { align-self: flex-end; margin-top: auto; }
 
 .section-intro { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin: 44px 0 18px; }
 .section-intro p { max-width: 48ch; margin: 0; color: var(--ink-600); font-size: 0.9rem; }
@@ -347,7 +347,7 @@
 .site-footer strong { display: block; color: #fff; font-weight: 500; }
 .site-footer p { max-width: 45ch; margin: 8px 0 0; color: #bbcee2; font-size: 0.77rem; }
 .footer-links { display: flex; flex-wrap: wrap; justify-content: flex-end; align-content: flex-start; gap: 8px 16px; }
-.footer-links a { color: #dfeafa; font-size: 0.77rem; }
+.footer-links a { display: inline-flex; min-height: 40px; align-items: center; color: #dfeafa; font-size: 0.77rem; }
 
 /* Map page */
 .map-page-shell { width: min(calc(100% - 32px), 1500px); margin: 0 auto; padding: 22px 0 32px; }
@@ -366,7 +366,7 @@
 .field:hover,
 .select-field:hover { border-color: var(--sea-700); }
 .layer-list { display: grid; gap: 8px; }
-.layer-list label { display: flex; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
+.layer-list label { display: flex; min-height: 40px; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
 .layer-list input { width: 18px; height: 18px; accent-color: var(--sea-800); }
 .legend { display: grid; gap: 7px; padding-top: 12px; border-top: 1px solid var(--line); }
 .legend-row { display: flex; align-items: center; gap: 8px; color: var(--ink-600); font-size: 0.7rem; }
@@ -385,7 +385,7 @@
 .popup-kicker { margin-bottom: 4px; color: var(--land-700); font-size: 0.66rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
 .popup-title { margin: 0; color: var(--sea-950); font-size: 1rem; font-weight: 600; line-height: 1.25; }
 .popup-meta { margin: 6px 0 12px; color: var(--ink-600); font-size: 0.68rem; line-height: 1.55; }
-.popup-select { width: 100%; min-height: 34px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
+.popup-select { width: 100%; min-height: 40px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
 .popup-data-table { width: 100%; border-collapse: collapse; font-size: 0.7rem; }
 .popup-data-table th,
 .popup-data-table td { padding: 6px 4px; text-align: left; border-bottom: 1px solid var(--line); }

diff --git a/demo/css/sections.css b/demo/css/sections.css
index 54737cd452af584f0b257b18589988da58619e47..7baac31a7cd24e509779654fb492f735461e99bb
--- a/demo/css/sections.css
+++ b/demo/css/sections.css
@@ -6,10 +6,11 @@
 .page-hero-aside strong { display: block; color: var(--land-900); font-size: .93rem; font-weight: 600; }
 .page-hero-aside p { margin: 7px 0 0; color: var(--ink-600); font-size: .78rem; }
 .page-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
-.content-stack { display: grid; gap: 22px; padding-top: 24px; }
+.content-stack { display: grid; grid-template-columns: minmax(0, 1fr); gap: 22px; padding-top: 24px; }
 .surface { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); }
 .surface-pad { padding: clamp(18px, 3vw, 30px); }
 .section-heading { display: flex; justify-content: space-between; align-items: start; gap: 20px; margin-bottom: 18px; }
+.section-heading > * { min-width: 0; }
 .section-heading h2 { font-size: clamp(1.35rem, 3vw, 2.2rem); }
 .section-heading p { max-width: 62ch; margin: 8px 0 0; color: var(--ink-600); font-size: .86rem; }
 .eyebrow { color: var(--land-700); font-size: .68rem; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; }
@@ -92,7 +93,7 @@
 .report-link strong { color: var(--sea-900); font-size: 1.1rem; font-weight: 500; }
 .report-link span { color: var(--ink-500); font-size: .7rem; }
 .report-toolbar { display: flex; flex-wrap: wrap; gap: 8px; justify-content: space-between; align-items: center; margin: 18px 0; }
-.report-sheet { max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
+.report-sheet { width: 100%; max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
 .report-cover { padding-bottom: 24px; border-bottom: 3px solid var(--sun-500); }
 .report-cover h2 { margin-top: 10px; }
 .report-section { padding: 20px 0; border-bottom: 1px solid var(--line); }
@@ -109,7 +110,7 @@
 .checkbox-group { padding: 15px; border: 1px solid var(--line); }
 .checkbox-group h3 { margin-bottom: 10px; font-size: .93rem; }
 .checkbox-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; max-height: 270px; overflow: auto; }
-.checkbox-grid label { display: flex; align-items: flex-start; gap: 7px; color: var(--ink-800); font-size: .73rem; }
+.checkbox-grid label { display: flex; min-height: 40px; align-items: center; gap: 7px; color: var(--ink-800); font-size: .73rem; }
 .selection-summary { display: grid; gap: 9px; padding: 15px; background: var(--shore-100); border: 1px solid var(--shore-300); }
 .selection-summary strong { color: var(--land-900); font-weight: 600; }
 .demo-code { display: inline-block; padding: 7px 10px; color: var(--sea-950); background: var(--surface); border: 1px dashed var(--sea-700); font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: .9rem; font-weight: 600; letter-spacing: .08em; }
@@ -132,7 +133,7 @@
 .howto h3 { margin-bottom: 8px; }
 .privacy-version { display: inline-block; padding: 5px 8px; color: var(--land-900); background: var(--shore-200); font-size: .7rem; font-weight: 600; }
 .main-nav details ul ul { position: static; width: auto; margin: 2px 0 0; padding: 0 0 0 10px; border: 0; border-radius: 0; box-shadow: none; }
-.main-nav details ul ul a { min-height: 34px; padding: 6px 8px; font-size: .71rem; }
+.main-nav details ul ul a { min-height: 40px; padding: 6px 8px; font-size: .71rem; }
 .main-nav .nav-group-label { display: block; padding: 7px 8px 3px; color: var(--land-700); font-size: .68rem; font-weight: 600; }
 
 @media (max-width: 980px) {
@@ -144,6 +145,7 @@
   .periodic-layout { grid-template-columns: 1fr; }
 }
 @media (max-width: 720px) {
+  .section-heading { flex-wrap: wrap; }
   .analysis-filter-grid, .stats-grid, .checkbox-groups, .howto-grid, .contact-grid { grid-template-columns: 1fr; }
   .field-group--wide { grid-column: auto; }
   .stats-grid { gap: 8px; }
@@ -172,7 +174,7 @@
 .admin-brand small { display: block; margin-top: 5px; color: #a9c0da; font-size: .69rem; letter-spacing: .1em; text-transform: uppercase; }
 .admin-sidebar .brand-stripe { margin: 22px 0 20px; opacity: .9; }
 .admin-nav ul { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
-.admin-nav-link { display: block; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
+.admin-nav-link { display: block; min-height: 40px; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
 .admin-nav-link:hover { color: #fff; background: rgba(255,255,255,.08); }
 .admin-nav-link.is-active { color: #fff; background: rgba(40,140,200,.22); border-left-color: var(--sun-500); }
 .admin-nav-logout { width: 100%; margin-top: 10px; color: #b9cde2; background: transparent; border: 0; cursor: pointer; font: inherit; text-align: left; }
@@ -197,6 +199,7 @@
 .admin-kpi-grid .stat-card { min-height: 108px; }
 .admin-kpi-grid .stat-value { font-size: clamp(1.3rem, 3vw, 2.2rem); }
 .admin-grid-2 { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr); gap: 18px; align-items: start; }
+.admin-grid-2 > .surface { min-width: 0; }
 .admin-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; align-items: start; }
 .admin-section-title { display: flex; justify-content: space-between; gap: 14px; align-items: start; margin-bottom: 15px; }
 .admin-section-title h2 { font-size: clamp(1.25rem, 2.5vw, 1.9rem); }
@@ -204,6 +207,7 @@
 .admin-section-title .eyebrow { display: block; margin-bottom: 5px; }
 .admin-live-dot { display: inline-flex; align-items: center; gap: 6px; color: var(--land-900); font-size: .68rem; font-weight: 600; white-space: nowrap; }
 .admin-live-dot::before { width: 8px; height: 8px; content: ""; background: var(--land-500); border-radius: 50%; box-shadow: 0 0 0 4px rgba(83,138,131,.16); }
+.admin-table { min-width: 0; max-width: 100%; overflow-x: auto; }
 .admin-table .data-table { min-width: 720px; }
 .admin-table--compact .data-table { min-width: 520px; }
 .admin-table .data-table td, .admin-table .data-table th { padding: 9px 10px; font-size: .7rem; }
@@ -223,14 +227,14 @@
 .admin-form-message { margin: 11px 0 0; padding: 10px 12px; background: var(--shore-100); border-left: 3px solid var(--sun-500); color: var(--ink-800); font-size: .73rem; }
 .admin-form-message.is-danger { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 .admin-check-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px; }
-.admin-check-grid label { display: flex; align-items: flex-start; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
+.admin-check-grid label { display: flex; min-height: 40px; align-items: center; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
 .admin-check-grid input { margin-top: 2px; accent-color: var(--sea-800); }
 .admin-rule-list { display: grid; gap: 8px; }
 .admin-rule { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; padding: 11px 12px; border: 1px solid var(--line); }
 .admin-rule strong { display: block; color: var(--sea-900); font-size: .76rem; }
 .admin-rule p { margin: 4px 0 0; color: var(--ink-600); font-size: .68rem; }
 .admin-rule input { width: 18px; height: 18px; accent-color: var(--land-700); }
-.admin-switch { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
+.admin-switch { display: inline-flex; min-height: 40px; align-items: center; gap: 8px; white-space: nowrap; }
 .admin-switch input { appearance: none; position: relative; width: 35px; height: 20px; margin: 0; border-radius: 999px; background: var(--line-strong); cursor: pointer; transition: background 160ms var(--ease-out); }
 .admin-switch input::after { position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; content: ""; background: var(--surface); border-radius: 50%; transition: transform 160ms var(--ease-out); }
 .admin-switch input:checked { background: var(--land-700); }
@@ -239,9 +243,10 @@
 .admin-filter-row .field-group { min-width: 150px; flex: 1 1 150px; }
 .admin-filter-row .button { flex: 0 0 auto; }
 .admin-inline-actions { display: flex; flex-wrap: wrap; gap: 5px; }
-.admin-inline-actions .button { min-height: 31px; padding: 5px 8px; font-size: .63rem; }
+.admin-inline-actions .button { min-height: 40px; padding: 5px 8px; font-size: .63rem; }
 .admin-inline-edit { display: grid; grid-template-columns: 120px auto; gap: 5px; align-items: center; }
-.admin-inline-edit input { min-height: 31px; width: 120px; padding: 4px 6px; font-size: .68rem; }
+.admin-inline-edit input { min-height: 40px; width: 120px; padding: 4px 6px; font-size: .68rem; }
+.admin-table .select-field, .admin-rule > .select-field { min-height: 40px !important; }
 .admin-danger-note { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 .admin-login-page { display: grid; min-height: 100vh; place-items: center; padding: 24px; background: radial-gradient(circle at 85% 12%, rgba(40,140,200,.15), transparent 28%), var(--surface-muted); }
 .admin-login-card { width: min(100%, 500px); padding: clamp(23px, 5vw, 42px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-md); }
diff --git a/demo/css/theme.css b/demo/css/theme.css
index cb813da4aa68a296274bb55838ca22fb34bbb2eb..46673e9264829fee8975b805022a6caa231d4ce4
--- a/demo/css/theme.css
+++ b/demo/css/theme.css
@@ -244,7 +244,7 @@
 .button--primary:hover { color: #fff; background: var(--sea-950); }
 .button--secondary { color: var(--sea-900); background: var(--surface); border-color: var(--line-strong); }
 .button--secondary:hover { background: var(--shore-100); border-color: var(--sea-500); }
-.button--small { min-height: 38px; padding: 8px 12px; font-size: 0.76rem; }
+.button--small { min-height: 40px; padding: 8px 12px; font-size: 0.76rem; }
 
 .panel {
   background: var(--surface);
@@ -329,10 +329,10 @@
 .map-preview::after { position: absolute; content: ""; background: rgba(255,255,255,0.72); transform: rotate(-13deg); }
 .map-preview::before { top: 22%; left: -8%; width: 120%; height: 14px; box-shadow: 0 65px 0 rgba(255,255,255,0.55), 0 130px 0 rgba(255,255,255,0.65); }
 .map-preview::after { top: -10%; left: 38%; width: 15px; height: 130%; box-shadow: 80px 0 0 rgba(255,255,255,0.44), 160px 0 0 rgba(255,255,255,0.48); }
-.map-preview-content { position: relative; z-index: 1; min-height: 230px; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
+.map-preview-content { position: relative; z-index: 1; display: flex; min-height: 230px; flex-direction: column; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
 .map-preview-label { display: flex; align-items: center; justify-content: space-between; color: var(--sea-950); font-size: 0.72rem; font-weight: 600; }
-.map-preview-label span { display: inline-flex; width: 8px; height: 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
-.map-preview-link { position: absolute; right: 18px; bottom: 17px; }
+.map-preview-label > [aria-hidden="true"] { display: inline-flex; width: 8px; height: 8px; flex: 0 0 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
+.map-preview-link { align-self: flex-end; margin-top: auto; }
 
 .section-intro { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin: 44px 0 18px; }
 .section-intro p { max-width: 48ch; margin: 0; color: var(--ink-600); font-size: 0.9rem; }
@@ -347,7 +347,7 @@
 .site-footer strong { display: block; color: #fff; font-weight: 500; }
 .site-footer p { max-width: 45ch; margin: 8px 0 0; color: #bbcee2; font-size: 0.77rem; }
 .footer-links { display: flex; flex-wrap: wrap; justify-content: flex-end; align-content: flex-start; gap: 8px 16px; }
-.footer-links a { color: #dfeafa; font-size: 0.77rem; }
+.footer-links a { display: inline-flex; min-height: 40px; align-items: center; color: #dfeafa; font-size: 0.77rem; }
 
 /* Map page */
 .map-page-shell { width: min(calc(100% - 32px), 1500px); margin: 0 auto; padding: 22px 0 32px; }
@@ -366,7 +366,7 @@
 .field:hover,
 .select-field:hover { border-color: var(--sea-700); }
 .layer-list { display: grid; gap: 8px; }
-.layer-list label { display: flex; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
+.layer-list label { display: flex; min-height: 40px; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
 .layer-list input { width: 18px; height: 18px; accent-color: var(--sea-800); }
 .legend { display: grid; gap: 7px; padding-top: 12px; border-top: 1px solid var(--line); }
 .legend-row { display: flex; align-items: center; gap: 8px; color: var(--ink-600); font-size: 0.7rem; }
@@ -385,7 +385,7 @@
 .popup-kicker { margin-bottom: 4px; color: var(--land-700); font-size: 0.66rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
 .popup-title { margin: 0; color: var(--sea-950); font-size: 1rem; font-weight: 600; line-height: 1.25; }
 .popup-meta { margin: 6px 0 12px; color: var(--ink-600); font-size: 0.68rem; line-height: 1.55; }
-.popup-select { width: 100%; min-height: 34px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
+.popup-select { width: 100%; min-height: 40px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
 .popup-data-table { width: 100%; border-collapse: collapse; font-size: 0.7rem; }
 .popup-data-table th,
 .popup-data-table td { padding: 6px 4px; text-align: left; border-bottom: 1px solid var(--line); }

codex
The combined check is green: all 14 public routes render at exactly 390px document width, the named targets now have 40px hit areas, the map-preview text and button no longer overlap or clip, and the audit table has a 346px viewport over 520px scrollable content. I’m cleaning up temporary QA images and running the required final design detector over the two changed stylesheets.
exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command '$files = @('"'demo/_temp_zoom_390.png','demo/_temp_zoom_1024.png','demo/_temp_zoom_1440.png','demo/_qa_oro_390.png','demo/_qa_ataskaitos_390.png','demo/_qa_home_zoom150.png','demo/_qa_admin_1280.png'); "'$resolved = $files | Where-Object { Test-Path -LiteralPath $_ } | ForEach-Object { (Resolve-Path -LiteralPath $_).Path }; $root = (Resolve-Path -LiteralPath '"'demo').Path + [IO.Path]::DirectorySeparatorChar; "'$outside = $resolved | Where-Object { -not $_.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) }; if ($outside) { throw "Refusing cleanup outside demo: $outside" }; $resolved | ForEach-Object { Remove-Item -LiteralPath $_ }; "Removed $($resolved.Count) temporary QA images."; & '"'C:\\Users\\Joosep\\.agents\\skills\\impeccable\\scripts\\impeccable.cmd' detect --json 'demo/css/theme.css' 'demo/css/sections.css'" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 232ms:
Removed 7 temporary QA images.
[
  {
    "antipattern": "overused-font",
    "name": "Overused font",
    "description": "Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, and Space Grotesk are used on so many sites they no longer feel distinctive. Each new wave of AI-generated UIs converges on the same handful of faces. Choose a face that gives your interface personality.",
    "severity": "warning",
    "category": "slop",
    "file": "C:\\Users\\Joosep\\tenders\\klaipeda-environment\\demo\\css\\theme.css",
    "line": 57,
    "snippet": "font-family: \"Plus Jakarta Sans"
  },
  {
    "antipattern": "overused-font",
    "name": "Overused font",
    "description": "Inter, Roboto, Fraunces, Geist, Plus Jakarta Sans, and Space Grotesk are used on so many sites they no longer feel distinctive. Each new wave of AI-generated UIs converges on the same handful of faces. Choose a face that gives your interface personality.",
    "severity": "warning",
    "category": "slop",
    "file": "C:\\Users\\Joosep\\tenders\\klaipeda-environment\\demo\\css\\theme.css",
    "line": 1,
    "snippet": "Google Fonts: plus jakarta sans"
  },
  {
    "antipattern": "side-tab",
    "name": "Side-tab accent border",
    "description": "Thick colored border on one side of a card — the most recognizable tell of AI-generated UIs. Use a subtler accent or remove it entirely.",
    "severity": "warning",
    "category": "slop",
    "file": "C:\\Users\\Joosep\\tenders\\klaipeda-environment\\demo\\css\\sections.css",
    "line": 5,
    "snippet": "border-left: 3px solid var(--sun-500)"
  },
  {
    "antipattern": "side-tab",
    "name": "Side-tab accent border",
    "description": "Thick colored border on one side of a card — the most recognizable tell of AI-generated UIs. Use a subtler accent or remove it entirely.",
    "severity": "warning",
    "category": "slop",
    "file": "C:\\Users\\Joosep\\tenders\\klaipeda-environment\\demo\\css\\sections.css",
    "line": 19,
    "snippet": "border-left: 3px solid var(--sun-500)"
  },
  {
    "antipattern": "side-tab",
    "name": "Side-tab accent border",
    "description": "Thick colored border on one side of a card — the most recognizable tell of AI-generated UIs. Use a subtler accent or remove it entirely.",
    "severity": "warning",
    "category": "slop",
    "file": "C:\\Users\\Joosep\\tenders\\klaipeda-environment\\demo\\css\\sections.css",
    "line": 117,
    "snippet": "border-left: 4px solid var(--land-700)"
  },
  {
    "antipattern": "side-tab",
    "name": "Side-tab accent border",
    "description": "Thick colored border on one side of a card — the most recognizable tell of AI-generated UIs. Use a subtler accent or remove it entirely.",
    "severity": "warning",
    "category": "slop",
    "file": "C:\\Users\\Joosep\\tenders\\klaipeda-environment\\demo\\css\\sections.css",
    "line": 194,
    "snippet": "border-left: 3px solid var(--sun-500)"
  },
  {
    "antipattern": "side-tab",
    "name": "Side-tab accent border",
    "description": "Thick colored border on one side of a card — the most recognizable tell of AI-generated UIs. Use a subtler accent or remove it entirely.",
    "severity": "warning",
    "category": "slop",
    "file": "C:\\Users\\Joosep\\tenders\\klaipeda-environment\\demo\\css\\sections.css",
    "line": 227,
    "snippet": "border-left: 3px solid var(--sun-500)"
  },
  {
    "antipattern": "side-tab",
    "name": "Side-tab accent border",
    "description": "Thick colored border on one side of a card — the most recognizable tell of AI-generated UIs. Use a subtler accent or remove it entirely.",
    "severity": "warning",
    "category": "slop",
    "file": "C:\\Users\\Joosep\\tenders\\klaipeda-environment\\demo\\css\\sections.css",
    "line": 270,
    "snippet": "border-left: 3px solid var(--land-700)"
  },
  {
    "antipattern": "side-tab",
    "name": "Side-tab accent border",
    "description": "Thick colored border on one side of a card — the most recognizable tell of AI-generated UIs. Use a subtler accent or remove it entirely.",
    "severity": "warning",
    "category": "slop",
    "file": "C:\\Users\\Joosep\\tenders\\klaipeda-environment\\demo\\css\\sections.css",
    "line": 273,
    "snippet": "border-left: 3px solid var(--sun-500)"
  }
]

diff --git a/demo/css/sections.css b/demo/css/sections.css
index 54737cd452af584f0b257b18589988da58619e47..7baac31a7cd24e509779654fb492f735461e99bb
--- a/demo/css/sections.css
+++ b/demo/css/sections.css
@@ -6,10 +6,11 @@
 .page-hero-aside strong { display: block; color: var(--land-900); font-size: .93rem; font-weight: 600; }
 .page-hero-aside p { margin: 7px 0 0; color: var(--ink-600); font-size: .78rem; }
 .page-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
-.content-stack { display: grid; gap: 22px; padding-top: 24px; }
+.content-stack { display: grid; grid-template-columns: minmax(0, 1fr); gap: 22px; padding-top: 24px; }
 .surface { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); }
 .surface-pad { padding: clamp(18px, 3vw, 30px); }
 .section-heading { display: flex; justify-content: space-between; align-items: start; gap: 20px; margin-bottom: 18px; }
+.section-heading > * { min-width: 0; }
 .section-heading h2 { font-size: clamp(1.35rem, 3vw, 2.2rem); }
 .section-heading p { max-width: 62ch; margin: 8px 0 0; color: var(--ink-600); font-size: .86rem; }
 .eyebrow { color: var(--land-700); font-size: .68rem; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; }
@@ -92,7 +93,7 @@
 .report-link strong { color: var(--sea-900); font-size: 1.1rem; font-weight: 500; }
 .report-link span { color: var(--ink-500); font-size: .7rem; }
 .report-toolbar { display: flex; flex-wrap: wrap; gap: 8px; justify-content: space-between; align-items: center; margin: 18px 0; }
-.report-sheet { max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
+.report-sheet { width: 100%; max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
 .report-cover { padding-bottom: 24px; border-bottom: 3px solid var(--sun-500); }
 .report-cover h2 { margin-top: 10px; }
 .report-section { padding: 20px 0; border-bottom: 1px solid var(--line); }
@@ -109,7 +110,7 @@
 .checkbox-group { padding: 15px; border: 1px solid var(--line); }
 .checkbox-group h3 { margin-bottom: 10px; font-size: .93rem; }
 .checkbox-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; max-height: 270px; overflow: auto; }
-.checkbox-grid label { display: flex; align-items: flex-start; gap: 7px; color: var(--ink-800); font-size: .73rem; }
+.checkbox-grid label { display: flex; min-height: 40px; align-items: center; gap: 7px; color: var(--ink-800); font-size: .73rem; }
 .selection-summary { display: grid; gap: 9px; padding: 15px; background: var(--shore-100); border: 1px solid var(--shore-300); }
 .selection-summary strong { color: var(--land-900); font-weight: 600; }
 .demo-code { display: inline-block; padding: 7px 10px; color: var(--sea-950); background: var(--surface); border: 1px dashed var(--sea-700); font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: .9rem; font-weight: 600; letter-spacing: .08em; }
@@ -132,7 +133,7 @@
 .howto h3 { margin-bottom: 8px; }
 .privacy-version { display: inline-block; padding: 5px 8px; color: var(--land-900); background: var(--shore-200); font-size: .7rem; font-weight: 600; }
 .main-nav details ul ul { position: static; width: auto; margin: 2px 0 0; padding: 0 0 0 10px; border: 0; border-radius: 0; box-shadow: none; }
-.main-nav details ul ul a { min-height: 34px; padding: 6px 8px; font-size: .71rem; }
+.main-nav details ul ul a { min-height: 40px; padding: 6px 8px; font-size: .71rem; }
 .main-nav .nav-group-label { display: block; padding: 7px 8px 3px; color: var(--land-700); font-size: .68rem; font-weight: 600; }
 
 @media (max-width: 980px) {
@@ -144,6 +145,7 @@
   .periodic-layout { grid-template-columns: 1fr; }
 }
 @media (max-width: 720px) {
+  .section-heading { flex-wrap: wrap; }
   .analysis-filter-grid, .stats-grid, .checkbox-groups, .howto-grid, .contact-grid { grid-template-columns: 1fr; }
   .field-group--wide { grid-column: auto; }
   .stats-grid { gap: 8px; }
@@ -172,7 +174,7 @@
 .admin-brand small { display: block; margin-top: 5px; color: #a9c0da; font-size: .69rem; letter-spacing: .1em; text-transform: uppercase; }
 .admin-sidebar .brand-stripe { margin: 22px 0 20px; opacity: .9; }
 .admin-nav ul { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
-.admin-nav-link { display: block; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
+.admin-nav-link { display: block; min-height: 40px; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
 .admin-nav-link:hover { color: #fff; background: rgba(255,255,255,.08); }
 .admin-nav-link.is-active { color: #fff; background: rgba(40,140,200,.22); border-left-color: var(--sun-500); }
 .admin-nav-logout { width: 100%; margin-top: 10px; color: #b9cde2; background: transparent; border: 0; cursor: pointer; font: inherit; text-align: left; }
@@ -197,6 +199,7 @@
 .admin-kpi-grid .stat-card { min-height: 108px; }
 .admin-kpi-grid .stat-value { font-size: clamp(1.3rem, 3vw, 2.2rem); }
 .admin-grid-2 { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr); gap: 18px; align-items: start; }
+.admin-grid-2 > .surface { min-width: 0; }
 .admin-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; align-items: start; }
 .admin-section-title { display: flex; justify-content: space-between; gap: 14px; align-items: start; margin-bottom: 15px; }
 .admin-section-title h2 { font-size: clamp(1.25rem, 2.5vw, 1.9rem); }
@@ -204,6 +207,7 @@
 .admin-section-title .eyebrow { display: block; margin-bottom: 5px; }
 .admin-live-dot { display: inline-flex; align-items: center; gap: 6px; color: var(--land-900); font-size: .68rem; font-weight: 600; white-space: nowrap; }
 .admin-live-dot::before { width: 8px; height: 8px; content: ""; background: var(--land-500); border-radius: 50%; box-shadow: 0 0 0 4px rgba(83,138,131,.16); }
+.admin-table { min-width: 0; max-width: 100%; overflow-x: auto; }
 .admin-table .data-table { min-width: 720px; }
 .admin-table--compact .data-table { min-width: 520px; }
 .admin-table .data-table td, .admin-table .data-table th { padding: 9px 10px; font-size: .7rem; }
@@ -223,14 +227,14 @@
 .admin-form-message { margin: 11px 0 0; padding: 10px 12px; background: var(--shore-100); border-left: 3px solid var(--sun-500); color: var(--ink-800); font-size: .73rem; }
 .admin-form-message.is-danger { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 .admin-check-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px; }
-.admin-check-grid label { display: flex; align-items: flex-start; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
+.admin-check-grid label { display: flex; min-height: 40px; align-items: center; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
 .admin-check-grid input { margin-top: 2px; accent-color: var(--sea-800); }
 .admin-rule-list { display: grid; gap: 8px; }
 .admin-rule { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; padding: 11px 12px; border: 1px solid var(--line); }
 .admin-rule strong { display: block; color: var(--sea-900); font-size: .76rem; }
 .admin-rule p { margin: 4px 0 0; color: var(--ink-600); font-size: .68rem; }
 .admin-rule input { width: 18px; height: 18px; accent-color: var(--land-700); }
-.admin-switch { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
+.admin-switch { display: inline-flex; min-height: 40px; align-items: center; gap: 8px; white-space: nowrap; }
 .admin-switch input { appearance: none; position: relative; width: 35px; height: 20px; margin: 0; border-radius: 999px; background: var(--line-strong); cursor: pointer; transition: background 160ms var(--ease-out); }
 .admin-switch input::after { position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; content: ""; background: var(--surface); border-radius: 50%; transition: transform 160ms var(--ease-out); }
 .admin-switch input:checked { background: var(--land-700); }
@@ -239,9 +243,10 @@
 .admin-filter-row .field-group { min-width: 150px; flex: 1 1 150px; }
 .admin-filter-row .button { flex: 0 0 auto; }
 .admin-inline-actions { display: flex; flex-wrap: wrap; gap: 5px; }
-.admin-inline-actions .button { min-height: 31px; padding: 5px 8px; font-size: .63rem; }
+.admin-inline-actions .button { min-height: 40px; padding: 5px 8px; font-size: .63rem; }
 .admin-inline-edit { display: grid; grid-template-columns: 120px auto; gap: 5px; align-items: center; }
-.admin-inline-edit input { min-height: 31px; width: 120px; padding: 4px 6px; font-size: .68rem; }
+.admin-inline-edit input { min-height: 40px; width: 120px; padding: 4px 6px; font-size: .68rem; }
+.admin-table .select-field, .admin-rule > .select-field { min-height: 40px !important; }
 .admin-danger-note { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 .admin-login-page { display: grid; min-height: 100vh; place-items: center; padding: 24px; background: radial-gradient(circle at 85% 12%, rgba(40,140,200,.15), transparent 28%), var(--surface-muted); }
 .admin-login-card { width: min(100%, 500px); padding: clamp(23px, 5vw, 42px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-md); }
diff --git a/demo/css/theme.css b/demo/css/theme.css
index cb813da4aa68a296274bb55838ca22fb34bbb2eb..46673e9264829fee8975b805022a6caa231d4ce4
--- a/demo/css/theme.css
+++ b/demo/css/theme.css
@@ -244,7 +244,7 @@
 .button--primary:hover { color: #fff; background: var(--sea-950); }
 .button--secondary { color: var(--sea-900); background: var(--surface); border-color: var(--line-strong); }
 .button--secondary:hover { background: var(--shore-100); border-color: var(--sea-500); }
-.button--small { min-height: 38px; padding: 8px 12px; font-size: 0.76rem; }
+.button--small { min-height: 40px; padding: 8px 12px; font-size: 0.76rem; }
 
 .panel {
   background: var(--surface);
@@ -329,10 +329,10 @@
 .map-preview::after { position: absolute; content: ""; background: rgba(255,255,255,0.72); transform: rotate(-13deg); }
 .map-preview::before { top: 22%; left: -8%; width: 120%; height: 14px; box-shadow: 0 65px 0 rgba(255,255,255,0.55), 0 130px 0 rgba(255,255,255,0.65); }
 .map-preview::after { top: -10%; left: 38%; width: 15px; height: 130%; box-shadow: 80px 0 0 rgba(255,255,255,0.44), 160px 0 0 rgba(255,255,255,0.48); }
-.map-preview-content { position: relative; z-index: 1; min-height: 230px; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
+.map-preview-content { position: relative; z-index: 1; display: flex; min-height: 230px; flex-direction: column; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
 .map-preview-label { display: flex; align-items: center; justify-content: space-between; color: var(--sea-950); font-size: 0.72rem; font-weight: 600; }
-.map-preview-label span { display: inline-flex; width: 8px; height: 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
-.map-preview-link { position: absolute; right: 18px; bottom: 17px; }
+.map-preview-label > [aria-hidden="true"] { display: inline-flex; width: 8px; height: 8px; flex: 0 0 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
+.map-preview-link { align-self: flex-end; margin-top: auto; }
 
 .section-intro { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin: 44px 0 18px; }
 .section-intro p { max-width: 48ch; margin: 0; color: var(--ink-600); font-size: 0.9rem; }
@@ -347,7 +347,7 @@
 .site-footer strong { display: block; color: #fff; font-weight: 500; }
 .site-footer p { max-width: 45ch; margin: 8px 0 0; color: #bbcee2; font-size: 0.77rem; }
 .footer-links { display: flex; flex-wrap: wrap; justify-content: flex-end; align-content: flex-start; gap: 8px 16px; }
-.footer-links a { color: #dfeafa; font-size: 0.77rem; }
+.footer-links a { display: inline-flex; min-height: 40px; align-items: center; color: #dfeafa; font-size: 0.77rem; }
 
 /* Map page */
 .map-page-shell { width: min(calc(100% - 32px), 1500px); margin: 0 auto; padding: 22px 0 32px; }
@@ -366,7 +366,7 @@
 .field:hover,
 .select-field:hover { border-color: var(--sea-700); }
 .layer-list { display: grid; gap: 8px; }
-.layer-list label { display: flex; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
+.layer-list label { display: flex; min-height: 40px; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
 .layer-list input { width: 18px; height: 18px; accent-color: var(--sea-800); }
 .legend { display: grid; gap: 7px; padding-top: 12px; border-top: 1px solid var(--line); }
 .legend-row { display: flex; align-items: center; gap: 8px; color: var(--ink-600); font-size: 0.7rem; }
@@ -385,7 +385,7 @@
 .popup-kicker { margin-bottom: 4px; color: var(--land-700); font-size: 0.66rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
 .popup-title { margin: 0; color: var(--sea-950); font-size: 1rem; font-weight: 600; line-height: 1.25; }
 .popup-meta { margin: 6px 0 12px; color: var(--ink-600); font-size: 0.68rem; line-height: 1.55; }
-.popup-select { width: 100%; min-height: 34px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
+.popup-select { width: 100%; min-height: 40px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
 .popup-data-table { width: 100%; border-collapse: collapse; font-size: 0.7rem; }
 .popup-data-table th,
 .popup-data-table td { padding: 6px 4px; text-align: left; border-bottom: 1px solid var(--line); }

exec
"C:\\Program Files\\PowerShell\\7\\pwsh.exe" -Command "rg -n 'button--small|map-preview-content|map-preview-label >|map-preview-link|footer-links a|layer-list label|popup-select' demo/css/theme.css; rg -n 'content-stack|section-heading >|report-sheet|checkbox-grid label|details ul ul a|section-heading \\{|admin-nav-link|admin-grid-2 >|admin-table \\{|admin-check-grid label|admin-switch \\{|admin-inline-actions|admin-inline-edit input|admin-table \\.select-field' demo/css/sections.css; Get-ChildItem -LiteralPath demo -Filter '_qa_*.png' -File; Get-ChildItem -LiteralPath demo -Filter '_temp_*.png' -File" in C:\Users\Joosep\tenders\klaipeda-environment
 succeeded in 126ms:
247:.button--small { min-height: 40px; padding: 8px 12px; font-size: 0.76rem; }
332:.map-preview-content { position: relative; z-index: 1; display: flex; min-height: 230px; flex-direction: column; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
334:.map-preview-label > [aria-hidden="true"] { display: inline-flex; width: 8px; height: 8px; flex: 0 0 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
335:.map-preview-link { align-self: flex-end; margin-top: auto; }
350:.footer-links a { display: inline-flex; min-height: 40px; align-items: center; color: #dfeafa; font-size: 0.77rem; }
369:.layer-list label { display: flex; min-height: 40px; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
388:.popup-select { width: 100%; min-height: 40px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
9:.content-stack { display: grid; grid-template-columns: minmax(0, 1fr); gap: 22px; padding-top: 24px; }
12:.section-heading { display: flex; justify-content: space-between; align-items: start; gap: 20px; margin-bottom: 18px; }
13:.section-heading > * { min-width: 0; }
96:.report-sheet { width: 100%; max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
113:.checkbox-grid label { display: flex; min-height: 40px; align-items: center; gap: 7px; color: var(--ink-800); font-size: .73rem; }
136:.main-nav details ul ul a { min-height: 40px; padding: 6px 8px; font-size: .71rem; }
148:  .section-heading { flex-wrap: wrap; }
163:  .report-sheet { max-width: none; padding: 0; border: 0; box-shadow: none; }
177:.admin-nav-link { display: block; min-height: 40px; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
178:.admin-nav-link:hover { color: #fff; background: rgba(255,255,255,.08); }
179:.admin-nav-link.is-active { color: #fff; background: rgba(40,140,200,.22); border-left-color: var(--sun-500); }
202:.admin-grid-2 > .surface { min-width: 0; }
210:.admin-table { min-width: 0; max-width: 100%; overflow-x: auto; }
230:.admin-check-grid label { display: flex; min-height: 40px; align-items: center; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
237:.admin-switch { display: inline-flex; min-height: 40px; align-items: center; gap: 8px; white-space: nowrap; }
245:.admin-inline-actions { display: flex; flex-wrap: wrap; gap: 5px; }
246:.admin-inline-actions .button { min-height: 40px; padding: 5px 8px; font-size: .63rem; }
248:.admin-inline-edit input { min-height: 40px; width: 120px; padding: 4px 6px; font-size: .68rem; }
249:.admin-table .select-field, .admin-rule > .select-field { min-height: 40px !important; }
281:@media (max-width: 760px) { .admin-layout { display: block; } .admin-sidebar { position: static; min-height: 0; padding: 16px; } .admin-sidebar-note { display: none; } .admin-nav { overflow-x: auto; margin-top: 14px; } .admin-nav ul { display: flex; width: max-content; } .admin-nav-link { border-left: 0; border-bottom: 3px solid transparent; white-space: nowrap; } .admin-nav-link.is-active { border-bottom-color: var(--sun-500); } .admin-main { width: min(calc(100% - 28px), 1440px); padding-top: 20px; } .admin-topbar { min-height: 66px; padding: 12px 14px; } .admin-kpi-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .admin-page-hero { display: block; } .admin-page-hero-aside { max-width: none; margin-top: 18px; padding: 13px 0 0; border-top: 3px solid var(--sun-500); border-left: 0; } .admin-form-grid { grid-template-columns: 1fr; } .admin-form-grid .field-group--wide { grid-column: auto; } .admin-check-grid { grid-template-columns: 1fr; } .admin-login-page { padding: 14px; } .portal-banner-region { width: min(calc(100% - 28px), var(--content-max)); } }

diff --git a/demo/css/sections.css b/demo/css/sections.css
index 54737cd452af584f0b257b18589988da58619e47..7baac31a7cd24e509779654fb492f735461e99bb
--- a/demo/css/sections.css
+++ b/demo/css/sections.css
@@ -6,10 +6,11 @@
 .page-hero-aside strong { display: block; color: var(--land-900); font-size: .93rem; font-weight: 600; }
 .page-hero-aside p { margin: 7px 0 0; color: var(--ink-600); font-size: .78rem; }
 .page-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
-.content-stack { display: grid; gap: 22px; padding-top: 24px; }
+.content-stack { display: grid; grid-template-columns: minmax(0, 1fr); gap: 22px; padding-top: 24px; }
 .surface { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); }
 .surface-pad { padding: clamp(18px, 3vw, 30px); }
 .section-heading { display: flex; justify-content: space-between; align-items: start; gap: 20px; margin-bottom: 18px; }
+.section-heading > * { min-width: 0; }
 .section-heading h2 { font-size: clamp(1.35rem, 3vw, 2.2rem); }
 .section-heading p { max-width: 62ch; margin: 8px 0 0; color: var(--ink-600); font-size: .86rem; }
 .eyebrow { color: var(--land-700); font-size: .68rem; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; }
@@ -92,7 +93,7 @@
 .report-link strong { color: var(--sea-900); font-size: 1.1rem; font-weight: 500; }
 .report-link span { color: var(--ink-500); font-size: .7rem; }
 .report-toolbar { display: flex; flex-wrap: wrap; gap: 8px; justify-content: space-between; align-items: center; margin: 18px 0; }
-.report-sheet { max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
+.report-sheet { width: 100%; max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
 .report-cover { padding-bottom: 24px; border-bottom: 3px solid var(--sun-500); }
 .report-cover h2 { margin-top: 10px; }
 .report-section { padding: 20px 0; border-bottom: 1px solid var(--line); }
@@ -109,7 +110,7 @@
 .checkbox-group { padding: 15px; border: 1px solid var(--line); }
 .checkbox-group h3 { margin-bottom: 10px; font-size: .93rem; }
 .checkbox-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; max-height: 270px; overflow: auto; }
-.checkbox-grid label { display: flex; align-items: flex-start; gap: 7px; color: var(--ink-800); font-size: .73rem; }
+.checkbox-grid label { display: flex; min-height: 40px; align-items: center; gap: 7px; color: var(--ink-800); font-size: .73rem; }
 .selection-summary { display: grid; gap: 9px; padding: 15px; background: var(--shore-100); border: 1px solid var(--shore-300); }
 .selection-summary strong { color: var(--land-900); font-weight: 600; }
 .demo-code { display: inline-block; padding: 7px 10px; color: var(--sea-950); background: var(--surface); border: 1px dashed var(--sea-700); font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: .9rem; font-weight: 600; letter-spacing: .08em; }
@@ -132,7 +133,7 @@
 .howto h3 { margin-bottom: 8px; }
 .privacy-version { display: inline-block; padding: 5px 8px; color: var(--land-900); background: var(--shore-200); font-size: .7rem; font-weight: 600; }
 .main-nav details ul ul { position: static; width: auto; margin: 2px 0 0; padding: 0 0 0 10px; border: 0; border-radius: 0; box-shadow: none; }
-.main-nav details ul ul a { min-height: 34px; padding: 6px 8px; font-size: .71rem; }
+.main-nav details ul ul a { min-height: 40px; padding: 6px 8px; font-size: .71rem; }
 .main-nav .nav-group-label { display: block; padding: 7px 8px 3px; color: var(--land-700); font-size: .68rem; font-weight: 600; }
 
 @media (max-width: 980px) {
@@ -144,6 +145,7 @@
   .periodic-layout { grid-template-columns: 1fr; }
 }
 @media (max-width: 720px) {
+  .section-heading { flex-wrap: wrap; }
   .analysis-filter-grid, .stats-grid, .checkbox-groups, .howto-grid, .contact-grid { grid-template-columns: 1fr; }
   .field-group--wide { grid-column: auto; }
   .stats-grid { gap: 8px; }
@@ -172,7 +174,7 @@
 .admin-brand small { display: block; margin-top: 5px; color: #a9c0da; font-size: .69rem; letter-spacing: .1em; text-transform: uppercase; }
 .admin-sidebar .brand-stripe { margin: 22px 0 20px; opacity: .9; }
 .admin-nav ul { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
-.admin-nav-link { display: block; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
+.admin-nav-link { display: block; min-height: 40px; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
 .admin-nav-link:hover { color: #fff; background: rgba(255,255,255,.08); }
 .admin-nav-link.is-active { color: #fff; background: rgba(40,140,200,.22); border-left-color: var(--sun-500); }
 .admin-nav-logout { width: 100%; margin-top: 10px; color: #b9cde2; background: transparent; border: 0; cursor: pointer; font: inherit; text-align: left; }
@@ -197,6 +199,7 @@
 .admin-kpi-grid .stat-card { min-height: 108px; }
 .admin-kpi-grid .stat-value { font-size: clamp(1.3rem, 3vw, 2.2rem); }
 .admin-grid-2 { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr); gap: 18px; align-items: start; }
+.admin-grid-2 > .surface { min-width: 0; }
 .admin-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; align-items: start; }
 .admin-section-title { display: flex; justify-content: space-between; gap: 14px; align-items: start; margin-bottom: 15px; }
 .admin-section-title h2 { font-size: clamp(1.25rem, 2.5vw, 1.9rem); }
@@ -204,6 +207,7 @@
 .admin-section-title .eyebrow { display: block; margin-bottom: 5px; }
 .admin-live-dot { display: inline-flex; align-items: center; gap: 6px; color: var(--land-900); font-size: .68rem; font-weight: 600; white-space: nowrap; }
 .admin-live-dot::before { width: 8px; height: 8px; content: ""; background: var(--land-500); border-radius: 50%; box-shadow: 0 0 0 4px rgba(83,138,131,.16); }
+.admin-table { min-width: 0; max-width: 100%; overflow-x: auto; }
 .admin-table .data-table { min-width: 720px; }
 .admin-table--compact .data-table { min-width: 520px; }
 .admin-table .data-table td, .admin-table .data-table th { padding: 9px 10px; font-size: .7rem; }
@@ -223,14 +227,14 @@
 .admin-form-message { margin: 11px 0 0; padding: 10px 12px; background: var(--shore-100); border-left: 3px solid var(--sun-500); color: var(--ink-800); font-size: .73rem; }
 .admin-form-message.is-danger { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 .admin-check-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px; }
-.admin-check-grid label { display: flex; align-items: flex-start; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
+.admin-check-grid label { display: flex; min-height: 40px; align-items: center; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
 .admin-check-grid input { margin-top: 2px; accent-color: var(--sea-800); }
 .admin-rule-list { display: grid; gap: 8px; }
 .admin-rule { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; padding: 11px 12px; border: 1px solid var(--line); }
 .admin-rule strong { display: block; color: var(--sea-900); font-size: .76rem; }
 .admin-rule p { margin: 4px 0 0; color: var(--ink-600); font-size: .68rem; }
 .admin-rule input { width: 18px; height: 18px; accent-color: var(--land-700); }
-.admin-switch { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
+.admin-switch { display: inline-flex; min-height: 40px; align-items: center; gap: 8px; white-space: nowrap; }
 .admin-switch input { appearance: none; position: relative; width: 35px; height: 20px; margin: 0; border-radius: 999px; background: var(--line-strong); cursor: pointer; transition: background 160ms var(--ease-out); }
 .admin-switch input::after { position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; content: ""; background: var(--surface); border-radius: 50%; transition: transform 160ms var(--ease-out); }
 .admin-switch input:checked { background: var(--land-700); }
@@ -239,9 +243,10 @@
 .admin-filter-row .field-group { min-width: 150px; flex: 1 1 150px; }
 .admin-filter-row .button { flex: 0 0 auto; }
 .admin-inline-actions { display: flex; flex-wrap: wrap; gap: 5px; }
-.admin-inline-actions .button { min-height: 31px; padding: 5px 8px; font-size: .63rem; }
+.admin-inline-actions .button { min-height: 40px; padding: 5px 8px; font-size: .63rem; }
 .admin-inline-edit { display: grid; grid-template-columns: 120px auto; gap: 5px; align-items: center; }
-.admin-inline-edit input { min-height: 31px; width: 120px; padding: 4px 6px; font-size: .68rem; }
+.admin-inline-edit input { min-height: 40px; width: 120px; padding: 4px 6px; font-size: .68rem; }
+.admin-table .select-field, .admin-rule > .select-field { min-height: 40px !important; }
 .admin-danger-note { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 .admin-login-page { display: grid; min-height: 100vh; place-items: center; padding: 24px; background: radial-gradient(circle at 85% 12%, rgba(40,140,200,.15), transparent 28%), var(--surface-muted); }
 .admin-login-card { width: min(100%, 500px); padding: clamp(23px, 5vw, 42px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-md); }
diff --git a/demo/css/theme.css b/demo/css/theme.css
index cb813da4aa68a296274bb55838ca22fb34bbb2eb..46673e9264829fee8975b805022a6caa231d4ce4
--- a/demo/css/theme.css
+++ b/demo/css/theme.css
@@ -244,7 +244,7 @@
 .button--primary:hover { color: #fff; background: var(--sea-950); }
 .button--secondary { color: var(--sea-900); background: var(--surface); border-color: var(--line-strong); }
 .button--secondary:hover { background: var(--shore-100); border-color: var(--sea-500); }
-.button--small { min-height: 38px; padding: 8px 12px; font-size: 0.76rem; }
+.button--small { min-height: 40px; padding: 8px 12px; font-size: 0.76rem; }
 
 .panel {
   background: var(--surface);
@@ -329,10 +329,10 @@
 .map-preview::after { position: absolute; content: ""; background: rgba(255,255,255,0.72); transform: rotate(-13deg); }
 .map-preview::before { top: 22%; left: -8%; width: 120%; height: 14px; box-shadow: 0 65px 0 rgba(255,255,255,0.55), 0 130px 0 rgba(255,255,255,0.65); }
 .map-preview::after { top: -10%; left: 38%; width: 15px; height: 130%; box-shadow: 80px 0 0 rgba(255,255,255,0.44), 160px 0 0 rgba(255,255,255,0.48); }
-.map-preview-content { position: relative; z-index: 1; min-height: 230px; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
+.map-preview-content { position: relative; z-index: 1; display: flex; min-height: 230px; flex-direction: column; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
 .map-preview-label { display: flex; align-items: center; justify-content: space-between; color: var(--sea-950); font-size: 0.72rem; font-weight: 600; }
-.map-preview-label span { display: inline-flex; width: 8px; height: 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
-.map-preview-link { position: absolute; right: 18px; bottom: 17px; }
+.map-preview-label > [aria-hidden="true"] { display: inline-flex; width: 8px; height: 8px; flex: 0 0 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
+.map-preview-link { align-self: flex-end; margin-top: auto; }
 
 .section-intro { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin: 44px 0 18px; }
 .section-intro p { max-width: 48ch; margin: 0; color: var(--ink-600); font-size: 0.9rem; }
@@ -347,7 +347,7 @@
 .site-footer strong { display: block; color: #fff; font-weight: 500; }
 .site-footer p { max-width: 45ch; margin: 8px 0 0; color: #bbcee2; font-size: 0.77rem; }
 .footer-links { display: flex; flex-wrap: wrap; justify-content: flex-end; align-content: flex-start; gap: 8px 16px; }
-.footer-links a { color: #dfeafa; font-size: 0.77rem; }
+.footer-links a { display: inline-flex; min-height: 40px; align-items: center; color: #dfeafa; font-size: 0.77rem; }
 
 /* Map page */
 .map-page-shell { width: min(calc(100% - 32px), 1500px); margin: 0 auto; padding: 22px 0 32px; }
@@ -366,7 +366,7 @@
 .field:hover,
 .select-field:hover { border-color: var(--sea-700); }
 .layer-list { display: grid; gap: 8px; }
-.layer-list label { display: flex; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
+.layer-list label { display: flex; min-height: 40px; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
 .layer-list input { width: 18px; height: 18px; accent-color: var(--sea-800); }
 .legend { display: grid; gap: 7px; padding-top: 12px; border-top: 1px solid var(--line); }
 .legend-row { display: flex; align-items: center; gap: 8px; color: var(--ink-600); font-size: 0.7rem; }
@@ -385,7 +385,7 @@
 .popup-kicker { margin-bottom: 4px; color: var(--land-700); font-size: 0.66rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
 .popup-title { margin: 0; color: var(--sea-950); font-size: 1rem; font-weight: 600; line-height: 1.25; }
 .popup-meta { margin: 6px 0 12px; color: var(--ink-600); font-size: 0.68rem; line-height: 1.55; }
-.popup-select { width: 100%; min-height: 34px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
+.popup-select { width: 100%; min-height: 40px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
 .popup-data-table { width: 100%; border-collapse: collapse; font-size: 0.7rem; }
 .popup-data-table th,
 .popup-data-table td { padding: 6px 4px; text-align: left; border-bottom: 1px solid var(--line); }

codex
Implemented the responsive and touch-target fixes using the Impeccable/adapt guidance while preserving the existing design.

Files changed:

- [theme.css](C:/Users/Joosep/tenders/klaipeda-environment/demo/css/theme.css:247)
- [sections.css](C:/Users/Joosep/tenders/klaipeda-environment/demo/css/sections.css:9)

Results:

- Mobile overflow at 390px:
  - `oro.html`: 635 → 390px
  - `gyvoji_gamta.html`: 635 → 390px
  - `truksmas.html`: 635 → 390px
  - `ataskaitos.html`: 427 → 390px
  - All 14 public routes now have `scrollWidth = 390px`.
- Touch targets:
  - Footer links: 19.1 → 40px
  - Small buttons: 38 → 40px
  - Admin inline actions: 31 → 40px
  - Admin navigation and compact selects: ≥40px
  - Switch visual remains 35×20px inside an 80.2×40px clickable label.
- 150% text scale:
  - Map title is no longer constrained to the decorative dot’s 8px box.
  - Preview content grows to 277px, with `scrollHeight = clientHeight` and zero text/button overlap.
- Admin audit table:
  - Explicit internal horizontal scrolling retained and grid shrink constraints added.
  - At 1280px: 346px wrapper viewport over 520px table content, with no document overflow.
- Runtime verification: zero console or page errors across all public and admin routes.
diff --git a/demo/css/sections.css b/demo/css/sections.css
index 54737cd452af584f0b257b18589988da58619e47..7baac31a7cd24e509779654fb492f735461e99bb
--- a/demo/css/sections.css
+++ b/demo/css/sections.css
@@ -6,10 +6,11 @@
 .page-hero-aside strong { display: block; color: var(--land-900); font-size: .93rem; font-weight: 600; }
 .page-hero-aside p { margin: 7px 0 0; color: var(--ink-600); font-size: .78rem; }
 .page-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
-.content-stack { display: grid; gap: 22px; padding-top: 24px; }
+.content-stack { display: grid; grid-template-columns: minmax(0, 1fr); gap: 22px; padding-top: 24px; }
 .surface { background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); }
 .surface-pad { padding: clamp(18px, 3vw, 30px); }
 .section-heading { display: flex; justify-content: space-between; align-items: start; gap: 20px; margin-bottom: 18px; }
+.section-heading > * { min-width: 0; }
 .section-heading h2 { font-size: clamp(1.35rem, 3vw, 2.2rem); }
 .section-heading p { max-width: 62ch; margin: 8px 0 0; color: var(--ink-600); font-size: .86rem; }
 .eyebrow { color: var(--land-700); font-size: .68rem; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; }
@@ -92,7 +93,7 @@
 .report-link strong { color: var(--sea-900); font-size: 1.1rem; font-weight: 500; }
 .report-link span { color: var(--ink-500); font-size: .7rem; }
 .report-toolbar { display: flex; flex-wrap: wrap; gap: 8px; justify-content: space-between; align-items: center; margin: 18px 0; }
-.report-sheet { max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
+.report-sheet { width: 100%; max-width: 1020px; margin: 0 auto; padding: clamp(20px, 5vw, 56px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-sm); }
 .report-cover { padding-bottom: 24px; border-bottom: 3px solid var(--sun-500); }
 .report-cover h2 { margin-top: 10px; }
 .report-section { padding: 20px 0; border-bottom: 1px solid var(--line); }
@@ -109,7 +110,7 @@
 .checkbox-group { padding: 15px; border: 1px solid var(--line); }
 .checkbox-group h3 { margin-bottom: 10px; font-size: .93rem; }
 .checkbox-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; max-height: 270px; overflow: auto; }
-.checkbox-grid label { display: flex; align-items: flex-start; gap: 7px; color: var(--ink-800); font-size: .73rem; }
+.checkbox-grid label { display: flex; min-height: 40px; align-items: center; gap: 7px; color: var(--ink-800); font-size: .73rem; }
 .selection-summary { display: grid; gap: 9px; padding: 15px; background: var(--shore-100); border: 1px solid var(--shore-300); }
 .selection-summary strong { color: var(--land-900); font-weight: 600; }
 .demo-code { display: inline-block; padding: 7px 10px; color: var(--sea-950); background: var(--surface); border: 1px dashed var(--sea-700); font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: .9rem; font-weight: 600; letter-spacing: .08em; }
@@ -132,7 +133,7 @@
 .howto h3 { margin-bottom: 8px; }
 .privacy-version { display: inline-block; padding: 5px 8px; color: var(--land-900); background: var(--shore-200); font-size: .7rem; font-weight: 600; }
 .main-nav details ul ul { position: static; width: auto; margin: 2px 0 0; padding: 0 0 0 10px; border: 0; border-radius: 0; box-shadow: none; }
-.main-nav details ul ul a { min-height: 34px; padding: 6px 8px; font-size: .71rem; }
+.main-nav details ul ul a { min-height: 40px; padding: 6px 8px; font-size: .71rem; }
 .main-nav .nav-group-label { display: block; padding: 7px 8px 3px; color: var(--land-700); font-size: .68rem; font-weight: 600; }
 
 @media (max-width: 980px) {
@@ -144,6 +145,7 @@
   .periodic-layout { grid-template-columns: 1fr; }
 }
 @media (max-width: 720px) {
+  .section-heading { flex-wrap: wrap; }
   .analysis-filter-grid, .stats-grid, .checkbox-groups, .howto-grid, .contact-grid { grid-template-columns: 1fr; }
   .field-group--wide { grid-column: auto; }
   .stats-grid { gap: 8px; }
@@ -172,7 +174,7 @@
 .admin-brand small { display: block; margin-top: 5px; color: #a9c0da; font-size: .69rem; letter-spacing: .1em; text-transform: uppercase; }
 .admin-sidebar .brand-stripe { margin: 22px 0 20px; opacity: .9; }
 .admin-nav ul { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
-.admin-nav-link { display: block; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
+.admin-nav-link { display: block; min-height: 40px; padding: 10px 11px; color: #b9cde2; border-left: 3px solid transparent; font-size: .76rem; text-decoration: none; transition: color 160ms var(--ease-out), background 160ms var(--ease-out), border-color 160ms var(--ease-out); }
 .admin-nav-link:hover { color: #fff; background: rgba(255,255,255,.08); }
 .admin-nav-link.is-active { color: #fff; background: rgba(40,140,200,.22); border-left-color: var(--sun-500); }
 .admin-nav-logout { width: 100%; margin-top: 10px; color: #b9cde2; background: transparent; border: 0; cursor: pointer; font: inherit; text-align: left; }
@@ -197,6 +199,7 @@
 .admin-kpi-grid .stat-card { min-height: 108px; }
 .admin-kpi-grid .stat-value { font-size: clamp(1.3rem, 3vw, 2.2rem); }
 .admin-grid-2 { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr); gap: 18px; align-items: start; }
+.admin-grid-2 > .surface { min-width: 0; }
 .admin-grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; align-items: start; }
 .admin-section-title { display: flex; justify-content: space-between; gap: 14px; align-items: start; margin-bottom: 15px; }
 .admin-section-title h2 { font-size: clamp(1.25rem, 2.5vw, 1.9rem); }
@@ -204,6 +207,7 @@
 .admin-section-title .eyebrow { display: block; margin-bottom: 5px; }
 .admin-live-dot { display: inline-flex; align-items: center; gap: 6px; color: var(--land-900); font-size: .68rem; font-weight: 600; white-space: nowrap; }
 .admin-live-dot::before { width: 8px; height: 8px; content: ""; background: var(--land-500); border-radius: 50%; box-shadow: 0 0 0 4px rgba(83,138,131,.16); }
+.admin-table { min-width: 0; max-width: 100%; overflow-x: auto; }
 .admin-table .data-table { min-width: 720px; }
 .admin-table--compact .data-table { min-width: 520px; }
 .admin-table .data-table td, .admin-table .data-table th { padding: 9px 10px; font-size: .7rem; }
@@ -223,14 +227,14 @@
 .admin-form-message { margin: 11px 0 0; padding: 10px 12px; background: var(--shore-100); border-left: 3px solid var(--sun-500); color: var(--ink-800); font-size: .73rem; }
 .admin-form-message.is-danger { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 .admin-check-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 9px; }
-.admin-check-grid label { display: flex; align-items: flex-start; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
+.admin-check-grid label { display: flex; min-height: 40px; align-items: center; gap: 8px; padding: 9px; color: var(--ink-800); background: var(--surface-muted); border: 1px solid var(--line); font-size: .72rem; }
 .admin-check-grid input { margin-top: 2px; accent-color: var(--sea-800); }
 .admin-rule-list { display: grid; gap: 8px; }
 .admin-rule { display: flex; align-items: flex-start; justify-content: space-between; gap: 14px; padding: 11px 12px; border: 1px solid var(--line); }
 .admin-rule strong { display: block; color: var(--sea-900); font-size: .76rem; }
 .admin-rule p { margin: 4px 0 0; color: var(--ink-600); font-size: .68rem; }
 .admin-rule input { width: 18px; height: 18px; accent-color: var(--land-700); }
-.admin-switch { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
+.admin-switch { display: inline-flex; min-height: 40px; align-items: center; gap: 8px; white-space: nowrap; }
 .admin-switch input { appearance: none; position: relative; width: 35px; height: 20px; margin: 0; border-radius: 999px; background: var(--line-strong); cursor: pointer; transition: background 160ms var(--ease-out); }
 .admin-switch input::after { position: absolute; top: 3px; left: 3px; width: 14px; height: 14px; content: ""; background: var(--surface); border-radius: 50%; transition: transform 160ms var(--ease-out); }
 .admin-switch input:checked { background: var(--land-700); }
@@ -239,9 +243,10 @@
 .admin-filter-row .field-group { min-width: 150px; flex: 1 1 150px; }
 .admin-filter-row .button { flex: 0 0 auto; }
 .admin-inline-actions { display: flex; flex-wrap: wrap; gap: 5px; }
-.admin-inline-actions .button { min-height: 31px; padding: 5px 8px; font-size: .63rem; }
+.admin-inline-actions .button { min-height: 40px; padding: 5px 8px; font-size: .63rem; }
 .admin-inline-edit { display: grid; grid-template-columns: 120px auto; gap: 5px; align-items: center; }
-.admin-inline-edit input { min-height: 31px; width: 120px; padding: 4px 6px; font-size: .68rem; }
+.admin-inline-edit input { min-height: 40px; width: 120px; padding: 4px 6px; font-size: .68rem; }
+.admin-table .select-field, .admin-rule > .select-field { min-height: 40px !important; }
 .admin-danger-note { color: #8e2b10; background: #fff0ea; border-left-color: var(--poor); }
 .admin-login-page { display: grid; min-height: 100vh; place-items: center; padding: 24px; background: radial-gradient(circle at 85% 12%, rgba(40,140,200,.15), transparent 28%), var(--surface-muted); }
 .admin-login-card { width: min(100%, 500px); padding: clamp(23px, 5vw, 42px); background: var(--surface); border: 1px solid var(--line); box-shadow: var(--shadow-md); }
diff --git a/demo/css/theme.css b/demo/css/theme.css
index cb813da4aa68a296274bb55838ca22fb34bbb2eb..46673e9264829fee8975b805022a6caa231d4ce4
--- a/demo/css/theme.css
+++ b/demo/css/theme.css
@@ -244,7 +244,7 @@
 .button--primary:hover { color: #fff; background: var(--sea-950); }
 .button--secondary { color: var(--sea-900); background: var(--surface); border-color: var(--line-strong); }
 .button--secondary:hover { background: var(--shore-100); border-color: var(--sea-500); }
-.button--small { min-height: 38px; padding: 8px 12px; font-size: 0.76rem; }
+.button--small { min-height: 40px; padding: 8px 12px; font-size: 0.76rem; }
 
 .panel {
   background: var(--surface);
@@ -329,10 +329,10 @@
 .map-preview::after { position: absolute; content: ""; background: rgba(255,255,255,0.72); transform: rotate(-13deg); }
 .map-preview::before { top: 22%; left: -8%; width: 120%; height: 14px; box-shadow: 0 65px 0 rgba(255,255,255,0.55), 0 130px 0 rgba(255,255,255,0.65); }
 .map-preview::after { top: -10%; left: 38%; width: 15px; height: 130%; box-shadow: 80px 0 0 rgba(255,255,255,0.44), 160px 0 0 rgba(255,255,255,0.48); }
-.map-preview-content { position: relative; z-index: 1; min-height: 230px; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
+.map-preview-content { position: relative; z-index: 1; display: flex; min-height: 230px; flex-direction: column; padding: 20px; background: radial-gradient(circle at 76% 29%, rgba(25,112,103,0.22) 0 5%, transparent 5.5%), radial-gradient(circle at 34% 65%, rgba(11,47,139,0.21) 0 7%, transparent 7.5%), linear-gradient(132deg, rgba(231,242,222,0.52), rgba(118,140,212,0.13)); }
 .map-preview-label { display: flex; align-items: center; justify-content: space-between; color: var(--sea-950); font-size: 0.72rem; font-weight: 600; }
-.map-preview-label span { display: inline-flex; width: 8px; height: 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
-.map-preview-link { position: absolute; right: 18px; bottom: 17px; }
+.map-preview-label > [aria-hidden="true"] { display: inline-flex; width: 8px; height: 8px; flex: 0 0 8px; background: var(--good); border-radius: 50%; box-shadow: 18px 42px 0 var(--moderate), 60px 17px 0 var(--land-700), 110px 48px 0 var(--sea-800); }
+.map-preview-link { align-self: flex-end; margin-top: auto; }
 
 .section-intro { display: flex; justify-content: space-between; align-items: end; gap: 24px; margin: 44px 0 18px; }
 .section-intro p { max-width: 48ch; margin: 0; color: var(--ink-600); font-size: 0.9rem; }
@@ -347,7 +347,7 @@
 .site-footer strong { display: block; color: #fff; font-weight: 500; }
 .site-footer p { max-width: 45ch; margin: 8px 0 0; color: #bbcee2; font-size: 0.77rem; }
 .footer-links { display: flex; flex-wrap: wrap; justify-content: flex-end; align-content: flex-start; gap: 8px 16px; }
-.footer-links a { color: #dfeafa; font-size: 0.77rem; }
+.footer-links a { display: inline-flex; min-height: 40px; align-items: center; color: #dfeafa; font-size: 0.77rem; }
 
 /* Map page */
 .map-page-shell { width: min(calc(100% - 32px), 1500px); margin: 0 auto; padding: 22px 0 32px; }
@@ -366,7 +366,7 @@
 .field:hover,
 .select-field:hover { border-color: var(--sea-700); }
 .layer-list { display: grid; gap: 8px; }
-.layer-list label { display: flex; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
+.layer-list label { display: flex; min-height: 40px; align-items: center; gap: 8px; color: var(--ink-800); font-size: 0.77rem; }
 .layer-list input { width: 18px; height: 18px; accent-color: var(--sea-800); }
 .legend { display: grid; gap: 7px; padding-top: 12px; border-top: 1px solid var(--line); }
 .legend-row { display: flex; align-items: center; gap: 8px; color: var(--ink-600); font-size: 0.7rem; }
@@ -385,7 +385,7 @@
 .popup-kicker { margin-bottom: 4px; color: var(--land-700); font-size: 0.66rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; }
 .popup-title { margin: 0; color: var(--sea-950); font-size: 1rem; font-weight: 600; line-height: 1.25; }
 .popup-meta { margin: 6px 0 12px; color: var(--ink-600); font-size: 0.68rem; line-height: 1.55; }
-.popup-select { width: 100%; min-height: 34px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
+.popup-select { width: 100%; min-height: 40px; margin: 3px 0 10px; padding: 5px 7px; border: 1px solid var(--line-strong); border-radius: 5px; font-size: 0.72rem; }
 .popup-data-table { width: 100%; border-collapse: collapse; font-size: 0.7rem; }
 .popup-data-table th,
 .popup-data-table td { padding: 6px 4px; text-align: left; border-bottom: 1px solid var(--line); }

hook: Stop
hook: Stop Failed
tokens used
165,489
Implemented the responsive and touch-target fixes using the Impeccable/adapt guidance while preserving the existing design.

Files changed:

- [theme.css](C:/Users/Joosep/tenders/klaipeda-environment/demo/css/theme.css:247)
- [sections.css](C:/Users/Joosep/tenders/klaipeda-environment/demo/css/sections.css:9)

Results:

- Mobile overflow at 390px:
  - `oro.html`: 635 → 390px
  - `gyvoji_gamta.html`: 635 → 390px
  - `truksmas.html`: 635 → 390px
  - `ataskaitos.html`: 427 → 390px
  - All 14 public routes now have `scrollWidth = 390px`.
- Touch targets:
  - Footer links: 19.1 → 40px
  - Small buttons: 38 → 40px
  - Admin inline actions: 31 → 40px
  - Admin navigation and compact selects: ≥40px
  - Switch visual remains 35×20px inside an 80.2×40px clickable label.
- 150% text scale:
  - Map title is no longer constrained to the decorative dot’s 8px box.
  - Preview content grows to 277px, with `scrollHeight = clientHeight` and zero text/button overlap.
- Admin audit table:
  - Explicit internal horizontal scrolling retained and grid shrink constraints added.
  - At 1280px: 346px wrapper viewport over 520px table content, with no document overflow.
- Runtime verification: zero console or page errors across all public and admin routes.
