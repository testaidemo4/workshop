/* Stopwatch widget (TASK-STOPWATCH).
   Start / Stop / Reset buttons showing elapsed seconds, updating live.
   Self-contained: no external libraries or network calls.
   Style follows AGENTS.md — LN business unit:
     background = developer orange (#F57C00), accent = LN red (#D32F2F). */
WORKSHOP.register({
  id: "DancelH",
  title: "Stopwatch",
  author: "DancelH",
  mount: function (root) {
    var ORANGE = "#F57C00"; // widget background (developer)
    var RED = "#D32F2F"; // LN accent: buttons, borders, key labels
    var INK = "#1a1a1a"; // dark text for contrast on the orange surface

    var elapsed = 0; // accumulated ms while stopped
    var startedAt = 0; // performance.now() when the current run began
    var running = false;
    var timer = null;

    // --- container -----------------------------------------------------
    var box = document.createElement("div");
    box.style.background = ORANGE;
    box.style.border = "2px solid " + RED;
    box.style.borderRadius = "10px";
    box.style.padding = "16px";
    box.style.boxSizing = "border-box";
    box.style.maxWidth = "100%";
    box.style.fontFamily = "system-ui, sans-serif";

    // --- time display --------------------------------------------------
    var display = document.createElement("div");
    display.setAttribute("role", "timer");
    display.setAttribute("aria-live", "polite");
    display.setAttribute("aria-label", "Elapsed time in seconds");
    display.style.font =
      "700 2.4rem/1.1 ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace";
    display.style.color = INK;
    display.style.textAlign = "center";
    display.style.padding = "4px 0 14px";
    display.style.letterSpacing = "0.02em";

    // --- controls ------------------------------------------------------
    var controls = document.createElement("div");
    controls.style.display = "flex";
    controls.style.flexWrap = "wrap";
    controls.style.gap = "8px";
    controls.style.justifyContent = "center";

    function makeButton(label) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = label;
      b.style.flex = "1 1 auto";
      b.style.minWidth = "84px";
      b.style.padding = "10px 14px";
      b.style.border = "2px solid " + RED;
      b.style.borderRadius = "8px";
      b.style.background = RED;
      b.style.color = "#ffffff"; // white text for contrast on red
      b.style.font = "600 0.95rem system-ui, sans-serif";
      b.style.cursor = "pointer";
      // Keep the browser's default focus ring for keyboard accessibility.
      return b;
    }

    var startBtn = makeButton("Start");
    var stopBtn = makeButton("Stop");
    var resetBtn = makeButton("Reset");

    function currentMs() {
      return running ? elapsed + (performance.now() - startedAt) : elapsed;
    }

    function render() {
      display.textContent = (currentMs() / 1000).toFixed(1) + " s";
    }

    // Reflect state on the buttons: disable what can't be used, and
    // give disabled buttons a muted look while staying readable.
    function syncButtons() {
      startBtn.disabled = running;
      stopBtn.disabled = !running;
      // Reset is available whenever there is time to clear.
      resetBtn.disabled = running === false && elapsed === 0;
      [startBtn, stopBtn, resetBtn].forEach(function (b) {
        b.style.opacity = b.disabled ? "0.45" : "1";
        b.style.cursor = b.disabled ? "default" : "pointer";
      });
    }

    function start() {
      if (running) return;
      running = true;
      startedAt = performance.now();
      timer = setInterval(render, 50); // live update
      syncButtons();
      render();
    }

    function stop() {
      if (!running) return;
      elapsed += performance.now() - startedAt;
      running = false;
      clearInterval(timer);
      timer = null;
      syncButtons();
      render();
    }

    function reset() {
      running = false;
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      elapsed = 0;
      syncButtons();
      render();
    }

    startBtn.addEventListener("click", start);
    stopBtn.addEventListener("click", stop);
    resetBtn.addEventListener("click", reset);

    controls.appendChild(startBtn);
    controls.appendChild(stopBtn);
    controls.appendChild(resetBtn);
    box.appendChild(display);
    box.appendChild(controls);
    root.appendChild(box);

    syncButtons();
    render();
  },
});
