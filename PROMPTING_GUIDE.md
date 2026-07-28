# Prompting Foundations

*Let's get started prompting and experimenting with foundation models.*

## Before you start prompting

A foundation model does exactly what your words imply — no more, no less. Codex won't guess which file you meant or what "make it work" means. The skill this workshop trains is turning a **requirement** into a prompt with one obvious interpretation and one obvious definition of done.

Three objectives, then the detailed prompts:

1. A **prompt structure** for concise, requirement-driven prompts.
2. How to make prompts **unambiguous and context-based**.
3. The **three prompt formats** — instruction, statement, question.

---

## 1. A prompt structure (concise, requirement-driven)

Concise means every line earns its place — not that it's short. Use these five blocks; drop any a task doesn't need.

| Block | Answers | Example |
|---|---|---|
| **Context** | What's being worked on, what exists? | "Branch `workshop/pagduldx`; copy `examples/example-widget.js`." |
| **Task** | The one goal, as an imperative. | "Build a tip-calculator widget in `widgets/pagduldx.js`." |
| **Constraints** | Hard must / must-not rules. | "Build only inside `root`; don't edit shared files." |
| **Output** | The deliverable and how you'll know it's done. | "One file; buttons update the total live." |
| **Verify** | How the model proves it. | "Open the PR and confirm the check passes." |

Skeleton:

```
Context: <branch / files that exist / pattern to copy / where the spec lives>
Task: <one imperative sentence>
Constraints:
- <must do>
- <must not do>
Output:
- <file / behavior / acceptance criteria>
Verify:
- <command to run; show real results, don't claim success>
```

---

## 2. Write unambiguous, context-based prompts

Same intent, very different results:

**Vague (avoid):** `Make me a calculator widget and make it look nice.`
The model must guess the file, the fields, the behavior, the styling rules, and what "nice" means.

**Unambiguous and context-based (use):**
```
Context: branch workshop/pagduldx. Copy the structure of examples/example-widget.js.
Task: build a tip calculator in widgets/pagduldx.js.
Constraints: two number inputs (bill, tip %); build all DOM inside `root`; no libraries.
Output: as either input changes, show the tip amount and the total, updated live.
Verify: after pushing, confirm the PR check passes on GitHub.
```

What removed the ambiguity: **name the specifics** (exact file, exact inputs), **give the hidden context** (which branch, which pattern to copy), **define "done" as checkable** (values update live; the PR check passes), and **state the boundaries** (inside `root`, no libraries).

---

## 3. Three prompt formats

**Instruction (imperative)** — best for getting work done:
```
Build widgets/pagduldx.js: a tip calculator with bill and tip-% inputs that show
the tip and total live. Keep it inside root, no libraries. Then open a PR so the check runs.
```

**Statement (declarative)** — best for handing over a spec:
```
I need a tip-calculator widget in widgets/pagduldx.js. It has a bill input and a
tip-% input. Whenever either changes, it shows the tip and the total. All DOM is
built inside root, with no external libraries.
```

**Question (interrogative)** — best for planning before you build:
```
Given the widget contract in example-widget.js, what's the cleanest way to build a
tip calculator that updates live inside root, and what edge cases (empty input,
non-numbers) should I handle?
```

A good rhythm: **ask** to plan, restate as a **statement** to confirm scope, then **instruct** to build.

---

## 4. The detailed prompts, step by step

Replace `<legal-id>` with yours and `#<n>` with your Issue number.

### Step 1 — Verify access (read-only)
```
Context: I've connected the GitHub connector to the shared workshop repo and opened Codex.
Task: confirm you can read the repo, then brief me.
Constraints: read-only — do not create, edit, commit, or push.
Output (numbered): 1. what the page does and how widgets appear on it;
  2. the exact object shape a widget file must register (id/title/author/mount);
  3. which files I must not edit.
```

### Step 2 — Create your branch
```
Context: the shared repo; main is the default branch.
Task: create my working branch from the latest main.
Constraints: name it exactly workshop/<legal-id>; branch from newest main;
  do not work on main; do not change files yet.
Output: confirm the branch name and that it came from the latest main.
```

### Step 3 — Read your assigned task
```
Context: pushing my branch opened an assignment Issue whose title contains <legal-id>.
Task: find it and summarize what I must build.
Constraints: read-only.
Output: which widget to build, exactly how it should behave, the id/title/mount
  contract, and the list of files I must not edit.
```

### Step 4 — Build the widget (core prompt)
```
Context:
- Shared Widget Wall page. I work only on branch workshop/<legal-id>.
- The page auto-discovers widgets/<legal-id>.js and calls mount(root) with an empty div.
- Copy the structure of examples/example-widget.js.
- Issue #<n> is the authoritative spec for what my widget must do.

Task: build my assigned widget in widgets/<legal-id>.js, exactly as Issue #<n> describes.

Constraints:
- Create only widgets/<legal-id>.js. Register exactly one widget.
- id must equal "<legal-id>"; include a title and author.
- Build all DOM inside `root`; wire up the interactions so it actually works.
- Self-contained: no external libraries, no network calls.
- Do NOT edit index.html, loader.js, styles.css, registry.js, or any other widget.
- No credentials or secrets anywhere.

Output:
- A working widget matching the Issue (controls do something visible).
- Summarize the file you created. Do not commit yet.

Verify:
- Re-read the file and confirm it registers exactly one widget with id "<legal-id>",
  and that mount() builds DOM and wires the interactions. (The PR check runs the full
  headless test automatically once you push — you install nothing locally.)
```

### Step 5 — Review the diff
```
Context: my work is on workshop/<legal-id>, not yet committed.
Task: review the full diff against this checklist; report pass/fail per item.
Constraints: do not commit; if an item fails, propose the fix, don't apply it silently.
Checklist: 1. only widgets/<legal-id>.js was added; 2. no shared file changed
  (index.html/loader.js/styles.css/registry.js); 3. no other widget changed;
  4. it registers with id = "<legal-id>" and mounts without errors.
```

### Step 6 — Commit and push
```
Context: branch workshop/<legal-id>, review passed. I install nothing locally —
  the PR check on GitHub validates my widget.
Task: commit and push only my file.
Constraints: commit only widgets/<legal-id>.js; do not push to main; do not force-push.
Output: commit message "<TASK-ID>: add <legal-id> widget"; confirm the branch was pushed.
```

### Step 7 — Open the pull request, then read the check
```
Context: workshop/<legal-id> is pushed.
Task: open a PR into main.
Constraints: title "<TASK-ID>: add /<legal-id> widget"; reference my Issue with
  "Closes #<n>"; do NOT merge.
Output: PR body with Summary, What it does, Files changed; return the PR number.
Then: the PR check runs automatically on GitHub — wait for it to go green.
```

### Bonus — When the PR check fails
```
Context: the pr-check workflow failed on my PR. Failing log:
<paste the failing step's log>
Task: diagnose and fix it on workshop/<legal-id>.
Constraints: change only my own widget file; state the root cause in one sentence first.
Verify: push again and confirm the PR check goes green.
```

---

## One habit to keep

When a prompt underperforms, fix the **block** that failed — wrong file touched → tighten *Constraints*; wrong behavior → sharpen *Output*; unearned "it works" → strengthen *Verify*.
