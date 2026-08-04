WORKSHOP.register({
  id: "Jaime",
  title: "Random picker",
  author: "Jaime",
  mount: function (root) {
    var items = [
      "Code review",
      "Debugging",
      "Documentation",
      "Pair programming",
      "Automated testing",
    ];
    var lastIndex = -1;

    var panel = document.createElement("section");
    panel.setAttribute("aria-label", "LN random developer task picker");
    Object.assign(panel.style, {
      width: "100%",
      maxWidth: "30rem",
      boxSizing: "border-box",
      padding: "1rem",
      border: "2px solid #D32F2F",
      borderRadius: "0.75rem",
      background: "#F57C00",
      color: "#111111",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    });

    var unitLabel = document.createElement("div");
    unitLabel.textContent = "LN · DEVELOPER";
    Object.assign(unitLabel.style, {
      display: "inline-block",
      marginBottom: "0.75rem",
      padding: "0.25rem 0.5rem",
      borderRadius: "999px",
      background: "#D32F2F",
      color: "#FFFFFF",
      fontSize: "0.75rem",
      fontWeight: "700",
      letterSpacing: "0.04em",
    });

    var instructions = document.createElement("p");
    instructions.textContent = "Pick a developer task. Consecutive picks will always be different.";
    Object.assign(instructions.style, {
      margin: "0 0 0.75rem",
      lineHeight: "1.45",
    });

    var result = document.createElement("output");
    result.setAttribute("aria-live", "polite");
    result.setAttribute("aria-atomic", "true");
    result.textContent = "Ready to pick";
    Object.assign(result.style, {
      display: "block",
      minHeight: "1.5rem",
      marginBottom: "0.75rem",
      padding: "0.75rem",
      boxSizing: "border-box",
      border: "2px solid #D32F2F",
      borderRadius: "0.5rem",
      background: "#FFFFFF",
      color: "#111111",
      fontWeight: "700",
      textAlign: "center",
      overflowWrap: "anywhere",
    });

    var pickButton = document.createElement("button");
    pickButton.type = "button";
    pickButton.textContent = "Pick a task";
    Object.assign(pickButton.style, {
      width: "100%",
      minHeight: "2.75rem",
      padding: "0.65rem 1rem",
      border: "2px solid #8E0000",
      borderRadius: "0.5rem",
      background: "#D32F2F",
      color: "#FFFFFF",
      font: "inherit",
      fontWeight: "700",
      cursor: "pointer",
    });

    pickButton.addEventListener("click", function () {
      var nextIndex;

      if (lastIndex === -1) {
        nextIndex = Math.floor(Math.random() * items.length);
      } else {
        nextIndex = Math.floor(Math.random() * (items.length - 1));
        if (nextIndex >= lastIndex) {
          nextIndex += 1;
        }
      }

      lastIndex = nextIndex;
      result.textContent = items[nextIndex];
    });

    panel.appendChild(unitLabel);
    panel.appendChild(instructions);
    panel.appendChild(result);
    panel.appendChild(pickButton);
    root.appendChild(panel);
  },
});
