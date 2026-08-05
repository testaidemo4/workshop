# Prompting Foundations

Let's get started prompting and experimenting with foundation models.

Codex is powerful, but it isn't a mind reader. It does exactly what your words imply — no more, no less. The good news: getting great results is a skill, and it's a quick one to pick up. In this guide we'll start with a lazy prompt, watch it fall short, and improve it step by step until Codex builds exactly the widget we wanted. By the end you'll have a repeatable recipe you can use for the rest of the workshop.

## Start with a naive prompt

Let's say your task is to build a small counter widget. The most natural thing to type is something like this:

```
Build me a counter widget.
```

Go ahead and try it. You'll get a result — but probably not the one you need. Codex has to guess almost everything: What file should it go in? What should the counter look like? Does it start at zero? Should there be a reset button? And because it's guessing, it might drop the code in the wrong place, invent its own naming, or even touch a shared file it shouldn't. It's not wrong, exactly — it's just generic. It built a counter, not *your* counter for this project.

That gap between "a result" and "the result you wanted" is the whole game. Let's close it.

## Give it a persona

The first easy win is to tell Codex who to be. Compare the naive prompt above with this one:

```
Act as a senior front-end engineer who writes clean, modern, dependency-free
JavaScript and keeps all code inside the container you're given.
Build me a counter widget.
```

Notice we structured that opening line in three parts:

1. **The persona** — "a senior front-end engineer."
2. **A qualifier** — "clean, modern, dependency-free JavaScript" (no surprise libraries).
3. **A boundary/format** — "keeps all code inside the container you're given."

Those few extra words nudge Codex toward the kind of answer an experienced teammate would give: tidy code, no random dependencies, and nothing sprawling outside where it belongs. Same tool, much better instinct — just from telling it who to be.

But a persona alone still leaves the *what* fuzzy. Let's give it real structure.

## A recipe you can reuse: five simple parts

Every strong prompt in this workshop answers five questions. Think of them as a checklist you fill in — drop any part your task doesn't need.

| Part | The question it answers |
|---|---|
| Context | What are we working on, and what already exists? |
| Task | What's the one thing I want, in a single sentence? |
| Constraints | What are the hard rules — what must and must not happen? |
| Output | What's the deliverable, and how will I know it's done? |
| Verify | How should Codex prove it worked? |

Here's the same counter, written with all five:

```
Context: I'm on branch workshop/dar in the Widget Wall project. The page
auto-loads widgets/dar.js and calls mount(root) with an empty container.
Copy the shape of examples/example-widget.js.

Task: build a counter widget in widgets/dar.js.

Constraints:
- Register one widget whose id is "dar".
- Build everything inside root; no libraries, no network calls.
- Don't touch index.html, loader.js, styles.css, registry.js, or anyone else's file.

Output: a number that starts at 0, a "+1" button that increases it, and a "Reset"
button that sets it back to 0.

Verify: after I push, the PR check will load the widget in a browser — make sure
it registers and mounts cleanly.
```

Look at the difference. There's nothing left to guess. Codex knows the file, the project's rules, the exact behavior, and what "done" looks like. This is the version that gives you your counter on the first try.

## Be specific — vague in, vague out

The single biggest lever is specificity. Watch what happens with two versions of the same request.

**Vague:**

```
Make me a calculator widget and make it look nice.
```

Codex has to invent the inputs, the math, the styling rules, and what "nice" means. You'll get something — but you'll spend three follow-ups fixing it.

**Specific and grounded in the project:**

```
Context: branch workshop/dar; copy examples/example-widget.js.
Task: build a tip calculator in widgets/dar.js.
Constraints: two number inputs (bill, tip %); build all DOM inside root; no libraries.
Output: whenever either input changes, show the tip amount and the total, live.
Verify: it registers with id "dar" and the PR check passes.
```

Same idea, wildly different result — because we named the specifics (exact inputs, live updates), gave the context Codex can't see (which branch, which file to copy), and defined "done" as something checkable. If you take one habit from this guide, take this one: **name the specifics.**

## Three ways to say the same thing

You can phrase a prompt as an instruction, a statement, or a question — and each is good for a different moment.

**Instruction** — best for getting work done:

```
Build widgets/dar.js: a tip calculator with bill and tip-% inputs that show
the tip and total live. Keep it inside root, no libraries.
```

**Statement** — best for handing over a spec:

```
I need a tip-calculator widget in widgets/dar.js. It has a bill input and a
tip-% input. Whenever either changes, it shows the tip and the total. All the code
lives inside root, with no external libraries.
```

**Question** — best for thinking before you build:

```
Given the widget in examples/example-widget.js, what's the cleanest way to build a
tip calculator that updates live inside root, and what edge cases (blank input,
non-numbers) should I handle?
```

A nice rhythm for the workshop: ask a **question** to plan, restate it as a **statement** to confirm the scope, then give the **instruction** to build.

## Your ready-to-use prompts

Now that the recipe makes sense, here are prompts you can copy for each step. Notice every one quietly follows the same five parts — Context, Task, Constraints, Output, Verify. Replace `<nickname>` with yours and `#<n>` with your Issue number.

### Step 1 — Verify your access (read-only)

```
I've connected GitHub and opened Codex on the workshop repo.
Confirm you can read it, then tell me, in a numbered list:
1. what the page does and how widgets show up on it,
2. the exact object a widget file must register (id, title, mount),
3. which files I must not edit.
Don't change anything.
```

### Step 3 — Understand your task

```
Find the open assignment Issue whose title contains my nickname.
Summarize which widget I need to build, exactly how it should behave, the
id/title/mount contract, and which files I'm not allowed to touch. Don't change anything.
```

### Step 4 — Build it

```
Act as a senior front-end engineer writing clean, dependency-free JavaScript.

Context: branch workshop/<nickname>; the page auto-loads widgets/<nickname>.js and
calls mount(root); copy examples/example-widget.js; my Issue #<n> is the real spec.

Task: build my assigned widget in widgets/<nickname>.js, exactly as the Issue says.

Constraints:
- Create only widgets/<nickname>.js; register one widget with id "<nickname>".
- Build everything inside root; make the interactions actually work; no libraries or network.
- Don't edit index.html, loader.js, styles.css, registry.js, or anyone else's widget.

Output: a working widget that matches the Issue. Summarize the file you created.
Don't commit yet.

Verify: re-read the file and confirm it registers with id "<nickname>" and that
mount() builds DOM and wires the buttons. (The PR check runs the full test once I push.)
```

### Step 5 — Review before you trust it

```
Show me the full diff and confirm: only widgets/<nickname>.js was added; no shared
file changed; no other widget changed; it registers with my id and mounts without
errors. Don't commit yet — if anything's off, tell me the fix first.
```

### Step 6 — Commit and push (you install nothing; the PR check validates for you)

```
Commit only widgets/<nickname>.js with the message "<TASK-ID>: add <nickname> widget",
then push workshop/<nickname>. Don't push to main and don't force-push.
```

### Step 7 — Open the PR, then read the check

```
Open a PR from workshop/<nickname> into main, titled "<TASK-ID>: add /<nickname> widget",
referencing my Issue with "Closes #<n>". Don't merge — just give me the PR number.
Then wait for the PR check to go green.
```

### When the check goes red (this will happen to someone — it's normal!)

```
The PR check failed. Here's the log:
<paste the failing log>
Tell me the root cause in one sentence, fix it in my widget file only, and push again.
```
