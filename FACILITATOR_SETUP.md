# Facilitator Setup Guide

A front-end workshop hosted entirely on GitHub — no external host, no secrets. Each engineer ships one interactive widget to a shared page deployed on **GitHub Pages**.

## Architecture

```
Each participant (own ChatGPT + Codex)
        │  connects to
        ▼
Shared GitHub repo (one dummy account)  ── must be PUBLIC (free Pages)
        │
        ├── push branch workshop/<id>  ──► [assign-task.yml]   opens an Issue with a widget task
        ├── open PR into main          ──► [pr-check.yml]      headless mount test (jsdom)
        └── merge to main              ──► [validate-main.yml] re-checks every widget
                                       └─► [deploy-pages.yml]  rebuilds registry + deploys to Pages
                                                    │
                                                    ▼
                                        https://<owner>.github.io/<repo>/  (the live wall)
```

`index.html` + `loader.js` read `widgets/registry.js`, a generated list of widget ids, and load each `widgets/<id>.js`. Each widget self-registers and is mounted into its own card. **The deploy step regenerates the registry**, so participants never edit a shared file — that's what keeps 30 PRs conflict-free.

## 1. Accounts model (same caveats as any Codex session)

- Shared repo, each participant on their own ChatGPT/Codex, authorizing against the shared GitHub account.
- **Participants install nothing locally** — only git and Codex. The PR check runs the widget validation on GitHub's runners, so there's no Node/npm on participant machines. (The `npm` scripts are optional facilitator tooling for the dry run.)
- **Confirm everyone can see Codex in the left nav before the session** — the top day-of blocker.
- One shared login across 30 people can trip GitHub's security lockout; log in in small waves, or use a GitHub org with individual accounts. See "Scaling" below.

## 2. Push the code

From the `workshop` folder:

```bash
git init -b main
git add .
git commit -m "Widget Wall scaffold"
git remote add origin https://github.com/<owner>/<repo>.git
git push -u origin main
```

## 3. Turn on Pages, Actions, Issues  (do this — nothing works without it)

- **Settings → Pages → Build and deployment → Source: GitHub Actions.** (Not "deploy from a branch.")
- **The repo must be PUBLIC** — GitHub Pages on Free plans only serves public repos.
- **Settings → Actions** enabled; **Issues** enabled.
- Recommended: branch protection on `main` requiring a PR and requiring the **PR check** to pass.

Your live URL will be `https://<owner>.github.io/<repo>/`. The first `deploy-pages` run (triggered by your push) publishes it — allow a couple of minutes.

## 4. No secrets required

Unlike a hosted-backend setup, there is nothing to configure: no deploy hook, no database, no API keys. Pages deploys straight from the Action using the built-in token.

## 5. What each workflow does

| Workflow | Trigger | Job |
| --- | --- | --- |
| `assign-task.yml` | branch push (`workshop/*`) | picks a task from `tasks/pool.json` (stable hash of branch name) and opens the assignment Issue |
| `pr-check.yml` | PR into `main` | loads every widget in a headless DOM and asserts it registers + mounts |
| `validate-main.yml` | push to `main` / manual | same headless check across all widgets after merge |
| `deploy-pages.yml` | push to `main` / manual | assembles the site, regenerates `registry.js`, deploys to Pages |

## 6. Customizing the widget tasks

`tasks/pool.json` is the task bank — each entry has an `id`, a `title`, and a one-line `brief`. Add or edit entries to change difficulty or variety. Assignment is a stable hash of the branch name, so a given legal ID always gets the same task.

## 7. Anti-conflict design (don't remove)

- Participants only create `widgets/<id>.js` — one new file each, never a shared edit.
- `registry.js` is generated at deploy time, so it's never a merge target.
- `index.html`, `loader.js`, `styles.css` are facilitator-owned and untouched by participants.

## 8. Scaling to ~30 participants

- **Public repo is required anyway** (Pages) and also gives free, unthrottled Actions minutes — good.
- `deploy-pages` and `validate-main` use `concurrency: cancel-in-progress`, so a burst of merges collapses to one deploy. Still, **merge in a few batches**.
- Review bottleneck: lean on the required `pr-check`, merge green PRs in batches, or enable GitHub **auto-merge**.
- Shared-login risk: log in beforehand in waves, or prefer a GitHub org with individual accounts.
- 8 tasks across 30 people means several share a widget type — harmless, since each renders its own card. Expand `tasks/pool.json` for more variety.

## 9. Suggested run-of-show (~90 min)

1. 10 min — welcome; show the empty live wall and the payoff.
2. 15 min — connect GitHub + open Codex (in waves), run the Step 1 verification.
3. 10 min — create branch, read the assigned Issue.
4. 35 min — build, preview locally, review, validate (Steps 4–7).
5. 15 min — open PRs; you merge green ones in batches; watch the wall fill.
6. 5 min — everyone opens the live URL and clicks through the wall.

## 10. Troubleshooting

- **Pages 404 / no site** → Settings → Pages Source must be "GitHub Actions", and the repo must be public; check the `deploy-pages` run.
- **Assignment Issue didn't appear** → branch must match `workshop/*`; Actions + Issues enabled; see the `assign-task` log.
- **PR check red** → the widget didn't register with the right id, or `mount()` threw / produced no DOM. The log names the exact reason.
- **No Codex in the nav** → plan/visibility; pair the person with someone who has it.

## Local dry run

```bash
npm install
npm run check      # validate widgets headlessly
npm run manifest   # regenerate widgets/registry.js
npm run serve      # http://localhost:8000
```
