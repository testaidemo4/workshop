# Activity 2 — Career Roadmap Builder (agent preferences)

Purpose: turn a participant's own answers into a personalized 3–5 year career roadmap,
rendered as a single self-contained HTML page with two tabs — the plan as JSON, and a
roadmap.sh-style visual roadmap drawn from that same JSON.

## How to work with the participant
1. Ask three things (or read them if already provided):
   - their current role,
   - what they are actually doing day to day right now,
   - what they want to achieve 3–5 years from now.
2. Produce a structured PLAN as JSON first (see schema in README.md). Keep it honest and
   specific to their answers — real skills and a sensible order, not filler.
3. Then build the page from that exact JSON, so the two tabs always agree.

## Output
- ONE self-contained file: `career-roadmap.html`.
- The PLAN JSON is embedded in the page (a `const PLAN = {...}`), so the JSON tab and the
  roadmap tab render from the same source of truth.
- The page opens with a double-click — no server, no build step, no network calls.
- Use `examples/career-roadmap.html` as the visual target: two tabs, a vertical "career
  line" with milestone stages, topic nodes branching off it, level tags
  (core / grow / explore), a progress bar with checkable nodes, and smooth entrance motion.

## Style
- Clean, professional, responsive, readable on a projector.
- One bold accent color for the career line; level tags as tints, not a rainbow.
- Respect reduced-motion.

## Scope
- Local preview only. Do NOT commit, push, or open a pull request.
