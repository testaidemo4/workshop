# Widget Wall Workshop — Participant Guide

## What you'll build

The class shares one web page — the **Widget Wall** — hosted live on GitHub Pages. You will build **one interactive widget** of your own and it will appear as its own card on the wall.

Your widget lives in a single file named after your legal ID:

```
widgets/<your-legal-id>.js
```

The wall starts empty and fills with everyone's widgets as pull requests merge. You'll do **all the coding through Codex prompts** — you're not expected to write JavaScript by hand.

> **New to prompting?** Read [PROMPTING_GUIDE.md](PROMPTING_GUIDE.md) first — it teaches the prompt structure used below and has the full, detailed version of every prompt here.

---

## The widget contract

Every widget file registers exactly one widget:

```js
WORKSHOP.register({
  id: "pagduldx",          // must equal your file name
  title: "Click Counter",  // shown on your card
  author: "pagduldx",
  mount: function (root) {
    // build your widget's DOM inside `root` and wire up the behavior
  },
});
```

The shared page auto-discovers your file and calls `mount(root)` with an empty container. Everything you build goes inside `root`. Copy `examples/example-widget.js` — a complete working template (it isn't shown on the wall itself).

---

## Before you start

1. **Your own ChatGPT with Codex** (the agent that edits code and opens PRs — the plain GitHub connector only reads). Confirm you can see **Codex** in the ChatGPT left nav.
2. **The shared GitHub credentials** from the facilitator — everyone connects Codex to the same repo.
3. **Your legal ID** (e.g. `pagduldx`) — used for your branch and your file name.

You do **not** need to install Node, npm, or anything else on your machine — just git and Codex. GitHub runs the tests for you on every pull request.

> Never paste passwords or tokens into a prompt or into code.

---

## Step 1 — Connect and verify (read-only)

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

Create `workshop/<your-legal-id>` from `main` (easiest: GitHub web UI → branch dropdown → type the name → create). Pushing it fires an Action that opens your **assignment Issue** within a minute.

---

## Step 3 — Read your task

Open **Issues** and find the one whose title ends with `(<your-legal-id>)`. It names the widget to build (e.g. a tip calculator), repeats the contract, and lists the rules. Have Codex restate it:

```
Find the open assignment Issue whose title contains my legal ID.
Summarize: which widget I must build, exactly what it should do,
the id/title/mount contract, and which files I must not edit.
Do not modify any files.
```

---

## Step 4 — Build your widget with Codex

```
Build my assigned widget on branch workshop/<your-legal-id>.
- Create only widgets/<your-legal-id>.js, mirroring examples/example-widget.js.
- Register one widget whose id equals "<your-legal-id>".
- Build all DOM inside `root`; keep it self-contained (no libraries, no network).
- Make it actually work per the Issue (buttons/inputs do something visible).
- Do NOT edit index.html, loader.js, styles.css, registry.js, or others' widgets.
Summarize the file you created. Do not commit yet.
```

---

## Step 5 — Review the diff

```
Show the full diff for my branch and confirm:
1. Only widgets/<my-legal-id>.js was added.
2. No shared file (index.html, loader.js, styles.css, registry.js) changed.
3. No other engineer's widget changed.
4. The widget registers with id = my legal ID and mounts without errors.
Do not commit yet.
```

---

## Step 6 — Commit and push

You don't need to install or run anything on your machine. The automated **PR check** on GitHub is what validates your widget — you'll see the result in the next step.

```
Commit only widgets/<my-legal-id>.js with message:
"<TASK-ID>: add <my-legal-id> widget"
Push workshop/<my-legal-id>. Do not push to main. Do not force-push.
```

---

## Step 7 — Open the pull request and let the check run

```
Open a PR from workshop/<my-legal-id> into main.
Title: "<TASK-ID>: add /<my-legal-id> widget"
Reference my Issue with "Closes #<n>". Do not merge. Return the PR number.
```

On the PR page, the **PR check** runs automatically and loads your widget in a headless browser to confirm it registers and works. Wait for the green check.

**If it goes red,** open the failed check, copy the log, and hand it to Codex:

```
The PR check failed on my pull request. Here is the failing log:
<paste the log>
Diagnose the cause and fix it on branch workshop/<my-legal-id>.
Change only my widget file. Then push again.
```

Repeat until the check is green.

---

## Step 8 — See it live

After the facilitator merges, GitHub Actions rebuilds the wall and redeploys it to Pages. Refresh the live URL — your card is now on the wall alongside everyone else's.

---

## Rules & checklist

- One widget, in `widgets/<legal-id>.js`; `id` must equal your file name.
- Build only inside `root`; self-contained; no libraries or network calls.
- Never edit `index.html`, `loader.js`, `styles.css`, `registry.js`, or others' widgets.
- No credentials or secrets anywhere.

- [ ] Connected GitHub + opened Codex
- [ ] Created `workshop/<legal-id>`
- [ ] Read my assignment Issue
- [ ] Built my widget via Codex
- [ ] Reviewed the diff (only my file changed)
- [ ] Committed, pushed, opened a PR (did not merge)
- [ ] PR check went green (paste the log to Codex if red)
- [ ] Saw my card on the live wall
