# Activity 2 — Career Roadmap Builder

You answer three questions — current role, what you do now, and where you want to be in
3–5 years — and the agent builds you a personalized roadmap page. It first writes a
structured **plan** as JSON, then renders a **roadmap.sh-style** diagram from that same
JSON. Two tabs, one source of truth. **Nothing here is committed.**

Open `examples/career-roadmap.html` in a browser to see the target you're building.

## The PLAN JSON schema

The agent produces an object shaped like this, then draws the roadmap from it:

```json
{
  "profile": {
    "role": "Network Engineer",
    "current_focus": "On-prem routing, switching, firewall changes",
    "goal": "Cloud Network Architect",
    "horizon": "3–5 years"
  },
  "stages": [
    {
      "title": "Now",
      "timeframe": "0–6 months",
      "nodes": [
        { "title": "Cloud networking basics", "level": "core",
          "topics": ["VPC/VNet", "Subnets & routing", "Load balancers"] }
      ]
    }
  ]
}
```

- `stages` are ordered milestones along the career line (Now → Year 1 → Years 2–3 → …).
- Each `node` is a topic to learn, with:
  - `level`: `core` (do this), `grow` (recommended), or `explore` (optional),
  - `topics`: a few concrete sub-skills shown as chips.

## The one rule

Keep it truthful to the participant's answers. No credentials or private data in prompts.
