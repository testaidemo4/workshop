# AI Collaboration Working Session (45 minutes) — Claude Code & GitHub Copilot edition

Two hands-on activities, run back to back. You'll plan with an AI assistant and let a coding agent — **Claude Code** or **GitHub Copilot** — do the building, so **you don't have to write code by hand**.

> This is the Claude Code / GitHub Copilot companion to the main [README.md](README.md), which is written for ChatGPT + Codex. The activities, the widget contract, and the rules are identical — only the tool-specific steps (connecting, branching, committing, opening a PR) differ. Pick the guide that matches your agent.

| Time | Activity |
|---|---|
| 0–20 min | **Part 1 — Widget Wall.** Build one interactive widget from an assigned Issue and get it onto the shared live wall (this part commits and opens a PR). |
| 20–32 min | **Part 2 — Career Roadmap Builder.** Answer three questions about where you are and where you want to be, and let the agent build you a personalized roadmap page — a JSON plan plus a roadmap.sh-style diagram. Prompt-only, no commit. |
| 32–45 min | **Demos, overflow & debrief.** Show a few roadmaps, help stragglers, close on takeaways. |

> Part 1 uses the shared GitHub repo and ends in a pull request. Part 2 is **local only** — you build and preview in your browser and never commit. Keep the two mentally separate.

---
# Part 1 — Widget Wall
### What you'll build

The class shares one web page — the **Widget Wall** — hosted live on GitHub Pages. You will build **one interactive widget** of your own and it will appear as its own card on the wall.

Your widget lives in a single file named after your nickname:

```
widgets/<your-nickname>.js
```

The wall starts empty and fills with everyone's widgets as pull requests merge. You'll do **all the coding through prompts** to your agent — you're not expected to write JavaScript by hand.

> **New to prompting?** Read [PROMPTING_GUIDE.md](PROMPTING_GUIDE.md) first — it teaches the prompt structure used below and has the full, detailed version of every prompt here. The prompts themselves are tool-agnostic: they work the same whether you send them to Claude Code or GitHub Copilot.

---

### Choose your agent

This guide covers two agents. Use whichever you have access to.

- **Claude Code** — Anthropic's coding agent. Available as a CLI in the terminal, a desktop app, the web app at [claude.ai/code](https://claude.ai/code), and IDE extensions (VS Code, JetBrains). It works directly against a git checkout: it can create branches, edit files, run a local server, commit, push, and open PRs for you.
- **GitHub Copilot** — available as the **Copilot coding agent** (assign a GitHub Issue to Copilot and it works autonomously and opens a PR) and as **Copilot Chat in agent mode** inside VS Code / your IDE (it edits files in your working tree and you commit/push).

Where a step differs between the two, you'll see a **Claude Code** block and a **GitHub Copilot** block. Everything else is shared.

---

### Before you start

1. **Access to your agent.**
   - *Claude Code:* installed and signed in (CLI, IDE extension, or [claude.ai/code](https://claude.ai/code)).
   - *GitHub Copilot:* an active Copilot subscription with the coding agent enabled, and/or the Copilot Chat extension in VS Code with **agent mode**.
2. **The shared GitHub credentials / repo access** from the facilitator — everyone works against the same repo, `testaidemo4/workshop`.
3. **Your nickname** (e.g. `dar`) — used for your branch and your file name.

You do **not** need to install Node, npm, or anything else on your machine — just git and your agent. GitHub runs the tests for you on every pull request.

> Never paste passwords or tokens into a prompt or into code.

---

### Step 1 — Connect and verify (read-only)

Point your agent at the shared repository, then verify it can read the project.

**Claude Code:** open the repo (`claude` in the repo directory, or open the folder in your IDE, or start a session on the web against `testaidemo4/workshop`). Then send:

**GitHub Copilot:** open the repo in VS Code with Copilot Chat in **agent mode** (or open the repo on github.com to use the coding agent). Then send:

```
Confirm you can access the workshop repository.
Read README.md and examples/example-widget.js and tell me:
1. what the page does and how widgets appear on it
2. the exact shape a widget file must register
3. which files I must not edit.
Do not modify anything.
```

You should hear back that: the page is the shared **Widget Wall**; each widget is one file `widgets/<nickname>.js` that calls `WORKSHOP.register({ id, title, author, mount })` exactly once and builds its DOM inside `root`; and that you must **not** edit `index.html`, `loader.js`, `styles.css`, `registry.js`, or anyone else's widget.

---
## Step 2 — Create your branch (this triggers your task)

Create a branch named `workshop/<your-nickname>` from `main`.

**Claude Code:**

```
Create a branch named workshop/<your-nickname> from main and switch to it.
Show me the output of: git branch --show-current
Do not build anything yet.
```

**GitHub Copilot (agent mode / CLI):**

```
Create a branch named workshop/<your-nickname> off main and check it out.
Then run: git branch --show-current
Do not build anything yet.
```

> **Prefer the GitHub web interface?** You can create the branch there instead:
> 1. Open the repository's [Branches page](https://github.com/testaidemo4/workshop/branches).
> 2. Select **New branch**.
> 3. Enter `workshop/<your-nickname>` as the branch name.
> 4. Select `main` as the source branch.
> 5. Select **Create new branch**.

> **If your nickname is already taken:** branch names must be unique. If a branch named `workshop/<your-nickname>` already exists, append a number to your nickname (e.g. `workshop/<your-nickname>2`, then `3`, and so on) until the branch name is free. Use this same numbered nickname for your file name (`widgets/<your-nickname>2.js`) and everywhere else this guide references your nickname.

Pushing or creating the branch triggers a GitHub Action that should open your **assignment Issue** within approximately one minute.

### If your agent is on `master`/`main` and doesn't see your branch

Creating the branch on GitHub only changes the **remote**. Your agent may still be sitting on the default branch. Git is already available in both Claude Code and Copilot's environment, so these commands just point the existing checkout at your branch:

```
Do not build anything yet. Run these and show the raw output:
git fetch origin
git checkout workshop/<your-nickname>
git pull --ff-only origin workshop/<your-nickname>
git branch --show-current
```

The last line must print `workshop/<your-nickname>`. Notes:

- If checkout says the branch doesn't exist, the `git fetch origin` just before it is what pulls it down — run the block as-is. Still missing? Run `git branch -r`; if `origin/workshop/<your-nickname>` isn't listed, the branch was created on the wrong remote.
- If `git remote -v` doesn't name `testaidemo4/workshop`, your agent isn't in the shared repo at all. Re-open the agent against **`testaidemo4/workshop`** and run the block above.
- **Best fix:** start your agent session with `workshop/<your-nickname>` as the base/working branch so it opens on your branch from the first second and the branch guard passes immediately.

---

## Step 3 — Read your task

Open the repository's [Issues page](https://github.com/testaidemo4/workshop/issues) and find the open Issue whose title ends with `(<your-nickname>)`.

The Issue identifies the widget you must build — for example, a tip calculator — and provides the requirements, contract, and rules.

Ask your agent to restate the assignment:

```
Find the open assignment Issue whose title ends with my nickname: (<your-nickname>).

Summarize:
- Which widget I must build
- Exactly what the widget should do
- The required id, title, and mount contract
- Which files I must not edit

Do not modify any files.
```

> **GitHub Copilot coding agent:** you can also just **assign the Issue to Copilot** on github.com. It will read the Issue, create a branch, build the widget, and open a PR on its own. If you go that route, review its PR against the checklist in Step 7a before merging — the anti-conflict rule (only `widgets/<your-nickname>.js` changes) still applies.

---
## Step 4 — Create your temporary `AGENTS.md`

Use `AGENTS.md` to give your agent persistent preferences for this lab. Both Claude Code and GitHub Copilot read `AGENTS.md` from the repo root. This file is temporary workshop scaffolding and must not be included in your pull request.

> **Important:** The repository's anti-conflict design requires your pull request to contain only `widgets/<your-nickname>.js`. Delete `AGENTS.md` before committing, then confirm that it does not appear in the diff.

### `AGENTS.md` template

```
## Widget preferences

- Role: Developer.
- Business unit: <LN | Elsevier | Risk | Exhibitions>.
- Widget background: developer orange (#F57C00).
- Business-unit accent:
  - LN: red (#D32F2F)
  - Elsevier: orange (#F57C00); use a darker orange for buttons
  - Risk: deep red (#B71C1C)
  - Exhibitions: yellow (#F9A825)
- Use the business-unit accent for buttons, borders, and key labels.
- Choose black or white text based on contrast. Readability wins over an exact shade.
- Keep the widget compact, professional, keyboard-accessible, and responsive.
- Follow the assigned Issue exactly.
- Scope: edit only widgets/<your-nickname>.js. Never edit shared files or other widgets.
- Before commit: remove this AGENTS.md and confirm it is not in the diff.
```

### Copy prompt

Replace the placeholders below with your actual nickname and business unit before giving the prompt to your agent.

```
Create AGENTS.md in the repository root using the provided template.

My nickname is <your-nickname>.
My business unit is <LN | Elsevier | Risk | Exhibitions>.

Replace the nickname and business-unit placeholders with these values.

This file is temporary workshop scaffolding. It must not be committed or pushed.

After creating the file, summarize the visual and scope rules the agent will follow.
Do not build the widget yet.
```

### Business-unit accents

|Unit|Accent|Suggested use|
|---|---|---|
|LN|Red (`#D32F2F`)|Buttons, borders, and active states|
|Elsevier|Orange (`#F57C00`)|Use a darker orange for buttons on the orange surface|
|Risk|Deep red (`#B71C1C`)|Buttons, warnings, and result emphasis|
|Exhibitions|Yellow (`#F9A825`)|Accent elements with dark text for contrast|

---
## Step 5 — Build the widget

Use one reliable, bounded prompt to complete the initial implementation before beginning the prompting exercise.

### Copy build prompt

Replace `<your-nickname>` with your actual nickname before giving this prompt to your agent.

```
Read:
- My open assignment Issue
- examples/example-widget.js
- AGENTS.md

Build my assigned widget now.

Before editing:
- Use only the branch workshop/<your-nickname>.

Requirements:
- Create only widgets/<your-nickname>.js.
- Register exactly one widget.
- Set both the widget id and author to <your-nickname>.
- Build all DOM elements inside root.
- Use no external libraries or network calls.
- Follow AGENTS.md for the background, business-unit accent, readable text, keyboard accessibility, and responsive layout.
- Do not edit index.html, loader.js, styles.css, registry.js, AGENTS.md, or any other widget.
- Implement every behavior required by the assignment Issue.
- Make the assigned interaction visibly work.

After editing:
- Verify that only widgets/<your-nickname>.js was created or modified.
- Summarize what you changed and how the interaction works.
- Do not commit or push yet.
```

### Fast finishers

After the initial widget is working, try these follow-up prompts one at a time:

- Ask your agent to test keyboard interaction and empty or invalid input states.
- Ask for one visual refinement that preserves `AGENTS.md` and the assigned behavior.
- Ask your agent to explain the most important implementation choice using exact line references from `widgets/<your-nickname>.js`.

---

## Step 6 — Preview and test locally

Before committing or opening a pull request, have your agent run the Widget Wall locally and verify your widget in a browser. No package installation is required.

Replace `<your-nickname>` with your actual nickname before giving this prompt to your agent.

```
Preview and test my widget locally before committing.

Rules:
- Do not install packages, dependencies, extensions, or other software.
- Do not commit or push.
- Do not edit shared files, AGENTS.md, or another participant's widget.
- If a fix is needed, edit only widgets/<your-nickname>.js.

Preview:
1. Start a temporary local HTTP server from the repository root using an
   already available runtime, e.g.:
   python3 -m http.server 8000
   (on Windows, prefer: py -m http.server 8000)
2. If that command is unavailable, use another already installed local
   runtime. Do not install anything.
3. Give me the localhost URL to open in my browser, including
   ?preview=<your-nickname>.

Verify:
- My widget appears on the wall and mounts without console errors.
- The assigned interaction visibly works.
- Keyboard interaction works.
- Empty or invalid inputs are handled appropriately, when applicable.
- Text remains readable and the layout works at narrow and wide widths.

If you find a problem, fix only widgets/<your-nickname>.js and repeat the
preview checks. Then summarize the results and show the changed-file list.

Keep the preview server running and give me the URL (including
?preview=<your-nickname>) so I can inspect it in my browser. Do not stop the
server. Do not commit or push yet.
```

> **If the preview "disappears," the server was stopped.** The prompt above keeps it running on purpose. If your browser tab points at `http://127.0.0.1:8000/` with nothing serving it, just say **"restart the preview server and keep it running"** and your agent will bring it back (usually at `http://127.0.0.1:8000/?preview=<your-nickname>`). When you're done inspecting, tell the agent **"stop the preview server."**

---
## Step 7 — Verify, then commit your widget

`AGENTS.md` helped guide the implementation, but the workshop's anti-conflict design requires your pull request to contain only `widgets/<your-nickname>.js`.

Both Claude Code and GitHub Copilot work directly against a real git checkout, so committing and pushing is straightforward — no API-only workaround is needed. The only rule: **only `widgets/<your-nickname>.js` may be in the diff**, and `AGENTS.md` must be deleted first.

### 7a — Verify the widget is clean (don't commit yet)

Replace `<your-nickname>` with your actual nickname.

```
Verify my widget before I commit it. Do not commit or push.

1. Show git status, the changed-file list, and the full diff.
2. Confirm only widgets/<your-nickname>.js is new or changed.
3. Confirm:
   - No shared file (index.html, loader.js, styles.css, registry.js) was changed.
   - No other participant's widget was changed.
   - The widget registers exactly once; id and author both equal <your-nickname>.
   - mount(root) creates visible DOM inside root and the interaction works.
   - No external libraries or network calls are used.

If any check fails, stop and tell me the problem — do not fix, discard, or commit.
```

### 7b — Commit and push

Replace `<your-nickname>` with your actual nickname.

```
Confirm git branch --show-current prints workshop/<your-nickname> and git remote -v
names testaidemo4/workshop. If not, stop and tell me.

Then:
- Delete AGENTS.md from the repo root.
- Stage and commit only widgets/<your-nickname>.js with message "Add <your-nickname> widget".
- Push with: git push -u origin workshop/<your-nickname>.

Show the final git status and git log --oneline -3, and confirm the branch is now one
commit ahead of main and that AGENTS.md is not in the diff.

If the push fails with an auth or permission error, stop and tell me the exact error.
```

> **GitHub Copilot coding agent:** if you assigned the Issue to Copilot in Step 3, it has already committed and pushed to its own branch. Just confirm the branch contains only `widgets/<your-nickname>.js` before moving on.

---
## Step 8 — Open the pull request and let the check run

Ask your agent to open the PR:

```
Open a PR in testaidemo4/workshop from workshop/<your-nickname> into main,
title "<TASK-ID>: add /<your-nickname> widget", body "Closes #<n>".
Do not merge. Return the PR number.
```

> **Claude Code** can open the PR directly (via the GitHub integration / `gh`). **GitHub Copilot coding agent** opens the PR automatically when it finishes the Issue; in **agent mode** you can ask it to open the PR, or use the GitHub web **Compare & pull request** button.

On the PR page, the **PR check** runs automatically and loads your widget in a headless browser to confirm it registers and works — it doesn't care how the file got committed. Wait for the green check.

**If it goes red,** open the failed check, copy the log, and fix the file. Edit `widgets/<your-nickname>.js`, then update the same branch:

```
The PR check failed. Here is the failing log:
<paste the log>
Tell me the root cause in one sentence and give me a corrected widgets/<your-nickname>.js.
Then commit and push the fix to workshop/<your-nickname>.
```

Repeat until the check is green.

---

### Step 9 — See it live

After the facilitator merges, GitHub Actions rebuilds the wall and redeploys it to Pages. Refresh the live URL — your card is now on the wall alongside everyone else's.

---

### Rules & checklist

- One widget, in `widgets/<nickname>.js`; `id` must equal your file name.
- Build only inside `root`; self-contained; no libraries or network calls.
- Never edit `index.html`, `loader.js`, `styles.css`, `registry.js`, or others' widgets.
- No credentials or secrets anywhere.

- [ ] Connected Claude Code or GitHub Copilot to the repo
- [ ] Created `workshop/<nickname>`
- [ ] Read my assignment Issue
- [ ] Built my widget via the agent
- [ ] Previewed and tested my widget locally
- [ ] Reviewed the diff (only my widget file changed; no `AGENTS.md`)
- [ ] Committed, pushed, opened a PR (did not merge)
- [ ] PR check went green (paste the log to the agent if red)
- [ ] Saw my card on the live wall

---

# Part 2 — Career Roadmap Builder

Part 1 was about *your data*. Part 2 is about *you*. You'll answer three short questions — where you are now and where you want to be in a few years — and the agent will turn that into a personalized **career roadmap**: first a structured **plan (JSON)**, then a **roadmap.sh-style diagram** drawn from that same plan. Two tabs on one page, one source of truth.

Nothing in Part 2 is committed. The goal is a working `career-roadmap.html` you can open in a browser and actually keep.

## What you'll build

A single file, `career-roadmap.html`, with two tabs:
- **Plan JSON** — the structured plan the agent generated from your answers.
- **Roadmap** — a visual path with milestone stages, topic nodes branching off a central "career line," level tags (core / grow / explore), and a progress bar you can tick off.

It opens with a double-click — no server, no build step — and has smooth entrance animation.

## Before you start

- Your facilitator has staged an `activity2/` folder containing `AGENTS.md`, a `README.md` with the plan schema, and `examples/career-roadmap.html` — a finished reference you're aiming to match.
- Open the `activity2/` folder in Claude Code or GitHub Copilot.
- This part is **local only**: no branch, no commit, no push, no PR.
- Answer honestly — the roadmap is only as useful as what you tell it. No private or company-confidential detail is needed.

## Step 1 — Open the folder and study the target (read-only)

Point your agent at the `activity2/` folder, then send:

```
Confirm you can see this folder.
Read AGENTS.md and README.md, and open examples/career-roadmap.html.
Tell me:
1. the two tabs the finished page has and what each shows,
2. the shape of the PLAN JSON it renders from,
3. what the "level" tags (core / grow / explore) mean.
Do not build anything yet and do not modify any files.
```

Open `examples/career-roadmap.html` in your own browser too, so you know what "done" looks like.

## Step 2 — Answer the three questions

This is the whole input to your roadmap. Replace the bracketed parts and send:

```
Here are my answers for my career roadmap:

1. My current role: [e.g. Network Engineer]
2. What I actually do day to day right now: [2–3 concrete sentences —
   the systems I work in, the problems I solve, the tools I use]
3. What I want to achieve 3–5 years from now: [a role, a scope, or a
   specialization — e.g. "Cloud Network Architect" or "lead a platform team"]

Hold these. Do not build anything yet — wait for my next instruction.
```

## Step 3 — Generate the plan as a directory tree

After answering the three career questions, use the following prompt to generate a structured roadmap before building the page.

### Prompt

```text
Turn my answers into a career PLAN using the schema and level definitions in README.md.

Present the result as a directory-style text tree, not as a JSON code block.

Structure:
- The root is my 3–5 year career goal.
- The root has 4 ordered stage branches, progressing from "Now" to the goal.
- Include a timeframe beside each stage.
- Each stage contains 3–4 learning topics.
- Prefix every topic with its level:
  - [CORE] = essential; do this
  - [GROW] = recommended
  - [EXPLORE] = optional
- Each topic contains 2–3 concrete sub-skills as leaf nodes.

Use directory-tree characters so the result looks like this:

Goal
├── Stage
│   ├── [CORE] Topic
│   │   ├── Sub-skill
│   │   └── Sub-skill
│   └── [GROW] Topic
│       ├── Sub-skill
│       └── Sub-skill
└── Final stage
    └── [CORE] Topic
        ├── Sub-skill
        └── Sub-skill

Make the roadmap specific to my role, current work, and goal. Put foundations before advanced topics, avoid filler, and ensure every branch contributes meaningfully to the goal.

After the tree, give me exactly two sentences summarizing the path and confirm whether its branches and ordering make sense.

Do not build the page or modify any files yet.
```

### Expected output

```text
DevOps Engineer (3–5 year goal)
├── Now (0–6 months)
│   ├── [CORE] Systems foundations
│   │   ├── Linux administration
│   │   ├── Bash and Python scripting
│   │   └── Processes, filesystems, and networking
│   └── [CORE] Infrastructure as code
│       ├── Reusable Terraform modules
│       ├── Remote state and locking
│       └── Testing and policy validation
├── Year 1 (6–18 months)
│   └── ...
├── Years 2–3 (18–36 months)
│   └── ...
└── Years 3–5 (36–60 months)
    └── ...
```

Review the tree before building:

- Does every topic support the career goal?
- Are foundational skills placed before advanced skills?
- Does each stage represent a realistic progression?
- Are optional topics marked as `EXPLORE` rather than treated as requirements?

Ask the agent to revise any weak or misplaced branch before continuing. If a stage feels off, say so in one sentence and ask the agent to revise the PLAN before building.

## Step 4 — Build the roadmap page

Once the plan looks right:

```
Build the page now as a single file named career-roadmap.html.

Requirements:
- Match the layout and behavior of examples/career-roadmap.html:
  two tabs (Plan JSON and Roadmap), a central career line with milestone
  stages, topic nodes branching off it, core/grow/explore tags, and a
  progress bar with checkable nodes.
- Embed my PLAN inline as `const PLAN = {...}` so both tabs render from the
  same data. No server, no external data calls.
- Smooth entrance animation; responsive; readable on a projector;
  respect reduced-motion.
- Header shows my role and my 3–5 year goal.

After building, give me the file path and tell me how to open it.
Do not commit or push.
```

## Step 5 — Preview and test locally

Double-click `career-roadmap.html` (or use the path the agent gives you) and check:

- both tabs work, and the JSON tab matches what's drawn on the Roadmap tab,
- the stages read in a sensible order toward your goal,
- ticking nodes updates the progress bar,
- it's readable at projector size and has no console errors.

If something's off, describe exactly what you see and let the agent fix **only** `career-roadmap.html`, then re-open it.

## Fast finishers

Add one at a time:
- A "Resources" line on each node (ask the agent to suggest a doc, course, or keyword to search — no fake links).
- Estimated hours or effort per stage, with a total.
- A short "Why this order?" note the agent generates for your specific path.
- A print / export-to-PDF button so you can keep the roadmap.
- A second goal: ask the agent for an *alternative* branch if you went a different direction.

## Rules & checklist — Part 2

- Answer the three questions honestly; the plan is only as good as the input.
- Make the agent write the **PLAN JSON first**, then render from it.
- One output file: `career-roadmap.html`, self-contained, opens on a double-click.
- Local only — no commit, push, or PR.

- [ ] Opened the `activity2/` folder and viewed the reference page
- [ ] Answered the three questions
- [ ] Reviewed the generated PLAN JSON
- [ ] Built `career-roadmap.html`
- [ ] Previewed it and ticked a few nodes
- [ ] (optional) Added one enhancement

---
