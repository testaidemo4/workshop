/* PR / post-merge check. For every widget file it: checks syntax, loads it in a
   headless DOM, confirms it registers a valid widget whose id matches the file
   name, and confirms mount() runs and produces DOM. Exits non-zero on failure. */
import { readdirSync, readFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { JSDOM } from "jsdom";

const dir = "widgets";
const files = readdirSync(dir).filter((f) => f.endsWith(".js") && f !== "registry.js");

let failed = 0;
for (const file of files) {
  const id = file.slice(0, -3);
  const path = `${dir}/${file}`;

  try {
    execSync(`node --check ${path}`, { stdio: "pipe" });
  } catch (e) {
    console.error(`x ${id}: syntax error\n${e.stderr}`);
    failed++; continue;
  }

  const dom = new JSDOM("<!doctype html><body></body>", { runScripts: "outside-only" });
  const { window } = dom;
  let captured = null;
  window.WORKSHOP = { register: (w) => { captured = w; } };

  try {
    window.eval(readFileSync(path, "utf8"));
  } catch (e) {
    console.error(`x ${id}: threw while loading — ${e.message}`); failed++; continue;
  }
  if (!captured) { console.error(`x ${id}: never called WORKSHOP.register(...)`); failed++; continue; }

  const problems = [];
  if (captured.id !== id) problems.push(`id must equal "${id}" (got "${captured.id}")`);
  if (!captured.title) problems.push("missing title");
  if (typeof captured.mount !== "function") problems.push("missing mount(root)");
  if (problems.length) { console.error(`x ${id}: ${problems.join("; ")}`); failed++; continue; }

  const root = window.document.createElement("div");
  try {
    captured.mount(root);
  } catch (e) {
    console.error(`x ${id}: mount() threw — ${e.message}`); failed++; continue;
  }
  if (!root.hasChildNodes()) { console.error(`x ${id}: mount() produced no DOM`); failed++; continue; }

  console.log(`ok ${id}: registers and mounts — "${captured.title}"`);
}

if (failed) { console.error(`\n${failed} widget(s) failed.`); process.exit(1); }
console.log(`\nAll ${files.length} widget(s) valid.`);
