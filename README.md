# Widget Wall — Codex + GitHub Workshop

A shared web page (hosted on **GitHub Pages**) where each engineer ships one
interactive widget, built entirely through Codex prompts, via pull request.

- **Participants:** [PARTICIPANT_GUIDE.md](PARTICIPANT_GUIDE.md)
- **Facilitators:** [FACILITATOR_SETUP.md](FACILITATOR_SETUP.md)
- **Prompting foundations & detailed prompts:** [PROMPTING_GUIDE.md](PROMPTING_GUIDE.md)

Each participant adds one file — `widgets/<legal-id>.js` — that registers a widget:

```js
WORKSHOP.register({
  id: "<legal-id>", title: "My Widget", author: "<legal-id>",
  mount: function (root) { /* build DOM inside root, wire up behavior */ },
});
```

The shared page loads every widget from `widgets/registry.js` (auto-generated at
deploy time) and mounts each into its own card.

**Participants install nothing** — just git and Codex. Validation runs automatically
as the PR check on GitHub; there's no local setup to do.

Optional local tooling (facilitators only, needs Node/npm):

```bash
npm install
npm run manifest   # rebuild widgets/registry.js
npm run serve      # http://localhost:8000
npm run check      # validate every widget mounts headlessly
```
