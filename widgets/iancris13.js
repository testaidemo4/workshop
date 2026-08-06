WORKSHOP.register({
  id: "iancris13",
  title: "Stopwatch",
  author: "iancris13",
  mount: function (root) {
    var elapsedMilliseconds = 0;
    var startedAt = 0;
    var timerId = null;

    var panel = document.createElement("section");
    panel.setAttribute("aria-label", "Stopwatch controls");
    panel.style.background = "#F57C00";
    panel.style.border = "3px solid #D32F2F";
    panel.style.borderRadius = "12px";
    panel.style.boxSizing = "border-box";
    panel.style.color = "#111111";
    panel.style.padding = "16px";
    panel.style.width = "100%";

    var label = document.createElement("div");
    label.textContent = "Elapsed time";
    label.style.background = "#FFFFFF";
    label.style.borderRadius = "999px";
    label.style.color = "#D32F2F";
    label.style.display = "inline-block";
    label.style.fontSize = "0.75rem";
    label.style.fontWeight = "700";
    label.style.letterSpacing = "0.06em";
    label.style.padding = "4px 9px";
    label.style.textTransform = "uppercase";

    var display = document.createElement("div");
    display.setAttribute("role", "timer");
    display.setAttribute("aria-atomic", "true");
    display.textContent = "0.0 s";
    display.style.fontSize = "clamp(2rem, 10vw, 3.5rem)";
    display.style.fontVariantNumeric = "tabular-nums";
    display.style.fontWeight = "700";
    display.style.lineHeight = "1.1";
    display.style.margin = "12px 0 16px";
    display.style.textAlign = "center";

    var controls = document.createElement("div");
    controls.style.display = "flex";
    controls.style.flexWrap = "wrap";
    controls.style.gap = "8px";

    function makeButton(text) {
      var button = document.createElement("button");
      button.type = "button";
      button.textContent = text;
      button.style.background = "#D32F2F";
      button.style.border = "2px solid #D32F2F";
      button.style.borderRadius = "8px";
      button.style.color = "#FFFFFF";
      button.style.cursor = "pointer";
      button.style.flex = "1 1 5.5rem";
      button.style.font = "inherit";
      button.style.fontWeight = "700";
      button.style.minHeight = "44px";
      button.style.padding = "9px 12px";
      return button;
    }

    var startButton = makeButton("Start");
    var stopButton = makeButton("Stop");
    var resetButton = makeButton("Reset");
    stopButton.disabled = true;

    function now() {
      return typeof performance !== "undefined" ? performance.now() : Date.now();
    }

    function currentElapsed() {
      if (timerId === null) {
        return elapsedMilliseconds;
      }
      return elapsedMilliseconds + (now() - startedAt);
    }

    function render() {
      display.textContent = (currentElapsed() / 1000).toFixed(1) + " s";
    }

    function setRunning(running) {
      startButton.disabled = running;
      stopButton.disabled = !running;
      startButton.style.opacity = running ? "0.55" : "1";
      stopButton.style.opacity = running ? "1" : "0.55";
      startButton.style.cursor = running ? "not-allowed" : "pointer";
      stopButton.style.cursor = running ? "pointer" : "not-allowed";
    }

    startButton.addEventListener("click", function () {
      if (timerId !== null) {
        return;
      }

      startedAt = now();
      timerId = window.setInterval(render, 100);
      setRunning(true);
      render();
    });

    stopButton.addEventListener("click", function () {
      if (timerId === null) {
        return;
      }

      elapsedMilliseconds = currentElapsed();
      window.clearInterval(timerId);
      timerId = null;
      setRunning(false);
      render();
    });

    resetButton.addEventListener("click", function () {
      if (timerId !== null) {
        window.clearInterval(timerId);
        timerId = null;
      }

      elapsedMilliseconds = 0;
      startedAt = 0;
      setRunning(false);
      render();
    });

    controls.appendChild(startButton);
    controls.appendChild(stopButton);
    controls.appendChild(resetButton);
    panel.appendChild(label);
    panel.appendChild(display);
    panel.appendChild(controls);
    root.appendChild(panel);

    setRunning(false);
  },
});
