# AI Collaboration Working Session (45 minutes)

Two hands-on activities, run back to back. You'll plan with an AI assistant and let a coding agent (Codex) do the building, so **you don't have to write code by hand**.

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

The wall starts empty and fills with everyone's widgets as pull requests merge. You'll do **all the coding through Codex prompts** — you're not expected to write JavaScript by hand.

> **New to prompting?** Read [PROMPTING_GUIDE.md](PROMPTING_GUIDE.md) first — it teaches the prompt structure used below and has the full, detailed version of every prompt here.

---


### Before you start

1. **Your own ChatGPT with Codex** (the agent that edits code and opens PRs — the plain GitHub connector only reads). Confirm you can see **Codex** in the ChatGPT left nav.
2. **The shared GitHub credentials** from the facilitator — everyone connects Codex to the same repo.
3. **Your nickname** (e.g. `dar`) — used for your branch and your file name.

You do **not** need to install Node, npm, or anything else on your machine — just git and Codex. GitHub runs the tests for you on every pull request.

> Never paste passwords or tokens into a prompt or into code.

---

### Step 1 — Connect and verify (read-only)

In ChatGPT: **Settings → Apps → GitHub**, authorize with the shared credentials, grant the repo, then open **Codex**. Verify:

```
Confirm you can access the workshop repository.
Read README.md and examples/example-widget.js and tell me:
1. what the page does and how widgets appear on it
2. the exact shape a widget file must register
3. which files I must not edit.
Do not modify anything.
```

---
## Step 2 — Create your branch (this triggers your task)

Create a branch named `workshop/<your-nickname>` from `main`. In ChatGPT, send this to the GitHub connector:

```
@github create workshop/<your-nickname> from main
```

> **If your nickname is already taken:** branch names must be unique. If a branch named `workshop/<your-nickname>` already exists, append a number to your nickname (e.g. `workshop/<your-nickname>2`, then `3`, and so on) until the branch name is free. Use this same numbered nickname for your file name (`widgets/<your-nickname>2.js`) and everywhere else this guide references your nickname.

### Other options

Prefer the GitHub web interface? You can create the branch there instead:

1. Open the repository’s [Branches page](https://github.com/testaidemo4/workshop/branches).
2. Select **New branch**.
3. Enter `workshop/<your-nickname>` as the branch name.
4. Select `main` as the source branch.
5. Select **Create new branch**.

Pushing or creating the branch triggers a GitHub Action that should open your **assignment Issue** within approximately one minute.

### If Codex says it's on `master`/`main` and stops

Creating the branch on GitHub only changes the **remote**. Codex opens its workspace from a default snapshot, so it can still be sitting on `master` (often with "no commits yet") and won't see your branch. You don't need to install anything — git is already in the Codex environment, so the commands below just point its existing checkout at your branch. Send this to Codex:

```
Do not build anything yet. Run these and show the raw output:
git fetch origin
git checkout workshop/<your-nickname>
git pull --ff-only origin workshop/<your-nickname>
git branch --show-current
```

The last line must print `workshop/<your-nickname>`. Notes:

- If checkout says the branch doesn't exist, the `git fetch origin` just before it is what pulls it down — run the block as-is. Still missing? Run `git branch -r`; if `origin/workshop/<your-nickname>` isn't listed, the branch was created on the wrong remote.
- If `git remote -v` doesn't name `testaidemo4/workshop`, Codex isn't in the shared repo at all. Re-open Codex and select **`testaidemo4/workshop`** as the working project, then run the block above.
- **Best fix:** when you start a Codex task, set the environment's **base branch** to `workshop/<your-nickname>` so Codex opens on your branch from the first second and the branch guard passes immediately.


---

## Step 3 — Read your task

Open the repository’s [Issues page](https://github.com/testaidemo4/workshop/issues) and find the open Issue whose title ends with `(<your-nickname>)`.

The Issue identifies the widget you must build—for example, a tip calculator—and provides the requirements, contract, and rules.

Ask Codex to restate the assignment:

```
Find the open assignment Issue whose title ends with my nickname: (<your-nickname>).

Summarize:
- Which widget I must build
- Exactly what the widget should do
- The required id, title, and mount contract
- Which files I must not edit

Do not modify any files.
```
---
## Step 4 — Create your temporary `AGENTS.md`

Use `AGENTS.md` to give Codex persistent preferences for this lab. This file is temporary workshop scaffolding and must not be included in your pull request.

> **Important:** The repository’s anti-conflict design requires your pull request to contain only `widgets/<your-nickname>.js`. Delete `AGENTS.md` before committing, then confirm that it does not appear in the diff.

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

Replace the placeholders below with your actual nickname and business unit before giving the prompt to Codex.

```
Create AGENTS.md in the repository root using the provided template.

My nickname is <your-nickname>.
My business unit is <LN | Elsevier | Risk | Exhibitions>.

Replace the nickname and business-unit placeholders with these values.

This file is temporary workshop scaffolding. It must not be committed or pushed.

After creating the file, summarize the visual and scope rules Codex will follow.
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
# Step 5 — Build the widget

Use one reliable, bounded prompt to complete the initial implementation before beginning the prompting exercise.

> **The branch guard below is intentional.** If Codex reports it's on `master`/`main` and stops without building, that's the guard doing its job — get Codex onto your branch using the fix in [Step 2 → *If Codex says it's on `master`/`main` and stops*](#if-codex-says-its-on-mastermain-and-stops), then re-run this prompt. Also remember to replace every `<your-nickname>` with your actual nickname — leaving the placeholder in is a common reason the guard trips.

## Copy build prompt

Replace `<your-nickname>` with your actual nickname before giving this prompt to Codex.

```
Read:
- My open assignment Issue
- examples/example-widget.js
- AGENTS.md

Build my assigned widget now.

Before editing:
- Confirm that the current branch is workshop/<your-nickname>.
- If the current branch is different, stop and tell me. Do not modify any files.

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

## Fast finishers

After the initial widget is working, try these follow-up prompts one at a time:

- Ask Codex to test keyboard interaction and empty or invalid input states.
- Ask Codex for one visual refinement that preserves `AGENTS.md` and the assigned behavior.
- Ask Codex to explain the most important implementation choice using exact line references from `widgets/<your-nickname>.js`.
---


### Step 6 — Preview and test locally with Codex

Before committing or opening a pull request, have Codex run the Widget Wall locally and verify your widget in a browser. No package installation is required.

Replace `<your-nickname>` with your actual nickname before giving this prompt to Codex.

```
Preview and test my widget locally before committing.

Rules:
- Do not install packages, dependencies, extensions, or other software.
- Do not commit or push.
- Do not edit shared files, AGENTS.md, or another participant's widget.
- If a fix is needed, edit only widgets/<your-nickname>.js.

Preview:
1. Start a temporary local HTTP server from the repository root using an
   already available runtime. On Windows, prefer:
   py -m http.server 8000
2. If that command is unavailable, use another already installed local
   runtime. Do not install anything.
3. Open the local Widget Wall in Codex's browser preview if available.
   Otherwise, give me the localhost URL to open in my browser.

Verify:
- My widget appears on the wall and mounts without console errors.
- The assigned interaction visibly works.
- Keyboard interaction works.
- Empty or invalid inputs are handled appropriately, when applicable.
- Text remains readable and the layout works at narrow and wide widths.

If you find a problem, fix only widgets/<your-nickname>.js and repeat the
preview checks. Then summarize the results, show the changed-file list, and
stop the temporary server. Do not commit or push yet.
```

---

### Step 7 — Clean the diff, then commit and push

`AGENTS.md` helped guide the implementation, but the workshop’s anti-conflict design requires your pull request to contain only `widgets/<your-nickname>.js`.

### Copy cleanup prompt

Replace `<your-nickname>` with your actual nickname before giving this prompt to Codex.

```
Clean, verify, commit, and push my widget.

Before committing:

1. Confirm the current branch is workshop/<your-nickname>.
   - If it is not, stop without modifying anything and tell me.

2. Delete the temporary AGENTS.md from the repository root.

3. Show:
   - The complete git status
   - The changed-file list
   - The full diff

4. Confirm that only this file remains changed:
   widgets/<your-nickname>.js

5. Confirm that:
   - No shared file was changed.
   - No other participant's widget was changed.
   - The widget registers exactly once.
   - Both id and author equal <your-nickname>.
   - mount(root) creates visible DOM inside root.
   - The assigned interaction is wired and visibly works.
   - No external libraries or network calls are used.

Do not commit, discard, overwrite, or repair unexpected changes if any check fails. Stop and report the problem instead.

If every check passes:

1. Commit only widgets/<your-nickname>.js with this message:
   Add <your-nickname> widget

2. Push the branch to origin:
   workshop/<your-nickname>

3. Show the final status and confirm:
   - The working tree is clean.
   - AGENTS.md was not committed.
   - The branch diff against main contains only widgets/<your-nickname>.js.
   - The commit and push succeeded.
```
---

### Step 8 — Open the pull request and let the check run

```
Open a PR from workshop/<my-nickname> into main.
Title: "<TASK-ID>: add /<my-nickname> widget"
Reference my Issue with "Closes #<n>". Do not merge. Return the PR number.
```

On the PR page, the **PR check** runs automatically and loads your widget in a headless browser to confirm it registers and works. Wait for the green check.

**If it goes red,** open the failed check, copy the log, and hand it to Codex:

```
The PR check failed on my pull request. Here is the failing log:
<paste the log>
Diagnose the cause and fix it on branch workshop/<my-nickname>.
Change only my widget file. Then push again.
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

- [ ] Connected GitHub + opened Codex
- [ ] Created `workshop/<nickname>`
- [ ] Read my assignment Issue
- [ ] Built my widget via Codex
- [ ] Previewed and tested my widget locally with Codex
- [ ] Reviewed the diff (only my widget file changed)
- [ ] Committed, pushed, opened a PR (did not merge)
- [ ] PR check went green (paste the log to Codex if red)
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
- Open the `activity2/` folder in Codex.
- This part is **local only**: no branch, no commit, no push, no PR.
- Answer honestly — the roadmap is only as useful as what you tell it. No private or company-confidential detail is needed.

## Step 1 — Open the folder and study the target (read-only)

Point Codex at the `activity2/` folder, then send:

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

## Step 3 — Generate the plan (JSON first)

Make the agent think in structure before it draws anything:

```
Turn my answers into a PLAN using the JSON schema in README.md.

Rules:
- 4 stages that move from "Now" to my 3–5 year goal, each with a timeframe.
- Each stage has 3–4 nodes (topics to learn), and each node has:
  - a level: core (do this), grow (recommended), or explore (optional),
  - 2–3 concrete sub-skills as topics.
- Make it specific to MY answers and put things in a sensible order —
  foundations before advanced, no filler.

Show me the PLAN JSON and give me a two-sentence summary of the path.
Do not build the page yet.
```

Skim the JSON: does the order make sense, and does it actually lead to your goal? If a stage feels off, say so in one sentence and ask the agent to revise the PLAN before building.

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
