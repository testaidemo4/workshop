WORKSHOP.register({
  id: "Mike",
  title: "Click counter",
  author: "Mike",
  mount: function (root) {
    var count = 0;
    var accent = "#D32F2F";

    var panel = document.createElement("section");
    panel.setAttribute("aria-label", "Mike click counter");
    panel.style.boxSizing = "border-box";
    panel.style.width = "100%";
    panel.style.maxWidth = "320px";
    panel.style.padding = "16px";
    panel.style.border = "2px solid " + accent;
    panel.style.borderRadius = "12px";
    panel.style.background = "#F57C00";
    panel.style.color = "#000000";
    panel.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

    var label = document.createElement("div");
    label.textContent = "LN · Developer";
    label.style.marginBottom = "8px";
    label.style.fontSize = "12px";
    label.style.fontWeight = "700";
    label.style.letterSpacing = "0.04em";
    label.style.color = accent;

    var display = document.createElement("output");
    display.className = "count";
    display.setAttribute("aria-live", "polite");
    display.setAttribute("aria-label", "Current count");
    display.textContent = "0";
    display.style.display = "block";
    display.style.marginBottom = "12px";
    display.style.fontSize = "40px";
    display.style.fontWeight = "800";
    display.style.lineHeight = "1";

    var controls = document.createElement("div");
    controls.style.display = "flex";
    controls.style.flexWrap = "wrap";
    controls.style.gap = "8px";

    function styleButton(button) {
      button.style.flex = "1 1 120px";
      button.style.minHeight = "40px";
      button.style.padding = "8px 12px";
      button.style.border = "2px solid " + accent;
      button.style.borderRadius = "8px";
      button.style.background = accent;
      button.style.color = "#FFFFFF";
      button.style.font = "inherit";
      button.style.fontWeight = "700";
      button.style.cursor = "pointer";
    }

    var increment = document.createElement("button");
    increment.type = "button";
    increment.textContent = "Increment";
    styleButton(increment);
    increment.addEventListener("click", function () {
      count += 1;
      display.textContent = String(count);
    });

    var reset = document.createElement("button");
    reset.type = "button";
    reset.textContent = "Reset";
    styleButton(reset);
    reset.style.background = "#FFFFFF";
    reset.style.color = accent;
    reset.addEventListener("click", function () {
      count = 0;
      display.textContent = "0";
    });

    controls.appendChild(increment);
    controls.appendChild(reset);
    panel.appendChild(label);
    panel.appendChild(display);
    panel.appendChild(controls);
    root.appendChild(panel);
  },
});
