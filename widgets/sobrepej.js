WORKSHOP.register({
  id: "sobrepej",
  title: "Stopwatch",
  author: "sobrepej",
  mount: function (root) {
    var elapsedMilliseconds = 0;
    var startedAt = null;
    var timer = null;

    var display = document.createElement("div");
    display.className = "count";
    display.textContent = "0.0 seconds";
    display.setAttribute("aria-live", "polite");

    var start = document.createElement("button");
    start.textContent = "Start";

    var stop = document.createElement("button");
    stop.className = "secondary";
    stop.textContent = "Stop";
    stop.disabled = true;

    var reset = document.createElement("button");
    reset.className = "secondary";
    reset.textContent = "Reset";

    function render() {
      var currentElapsed = elapsedMilliseconds;
      if (startedAt !== null) {
        currentElapsed += Date.now() - startedAt;
      }
      display.textContent = (currentElapsed / 1000).toFixed(1) + " seconds";
    }

    start.addEventListener("click", function () {
      if (timer !== null) {
        return;
      }

      startedAt = Date.now();
      timer = setInterval(render, 100);
      start.disabled = true;
      stop.disabled = false;
      render();
    });

    stop.addEventListener("click", function () {
      if (timer === null) {
        return;
      }

      elapsedMilliseconds += Date.now() - startedAt;
      startedAt = null;
      clearInterval(timer);
      timer = null;
      start.disabled = false;
      stop.disabled = true;
      render();
    });

    reset.addEventListener("click", function () {
      if (timer !== null) {
        clearInterval(timer);
      }

      elapsedMilliseconds = 0;
      startedAt = null;
      timer = null;
      start.disabled = false;
      stop.disabled = true;
      render();
    });

    root.appendChild(display);
    root.appendChild(start);
    root.appendChild(stop);
    root.appendChild(reset);
  },
});
