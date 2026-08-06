WORKSHOP.register({
  id: "bnj",
  title: "Color mixer",
  author: "bnj",
  mount: function (root) {
    var accent = "#F57C00";
    var buttonColor = "#8A3B00";
    var values = { R: 245, G: 124, B: 0 };

    root.style.backgroundColor = accent;
    root.style.color = "#111";
    root.style.padding = "12px";
    root.style.borderRadius = "8px";
    root.style.boxSizing = "border-box";
    root.style.fontFamily = "system-ui, sans-serif";

    var panel = document.createElement("div");
    panel.style.backgroundColor = "#fff";
    panel.style.border = "2px solid " + accent;
    panel.style.borderRadius = "6px";
    panel.style.padding = "12px";
    panel.style.maxWidth = "360px";
    panel.style.margin = "0 auto";
    panel.style.boxSizing = "border-box";

    var heading = document.createElement("h2");
    heading.textContent = "Color mixer";
    heading.style.margin = "0 0 10px";
    heading.style.fontSize = "1.1rem";
    heading.style.color = accent;

    var swatch = document.createElement("div");
    swatch.setAttribute("aria-label", "Mixed color preview");
    swatch.style.height = "72px";
    swatch.style.borderRadius = "5px";
    swatch.style.border = "1px solid #333";
    swatch.style.marginBottom = "10px";

    var hex = document.createElement("output");
    hex.setAttribute("aria-live", "polite");
    hex.style.display = "block";
    hex.style.fontFamily = "monospace";
    hex.style.fontWeight = "700";
    hex.style.fontSize = "1.1rem";
    hex.style.marginBottom = "10px";

    var controls = document.createElement("div");

    function update() {
      var color = "rgb(" + values.R + ", " + values.G + ", " + values.B + ")";
      var hexValue = "#" + [values.R, values.G, values.B].map(function (value) {
        return value.toString(16).padStart(2, "0").toUpperCase();
      }).join("");

      swatch.style.backgroundColor = color;
      hex.textContent = hexValue;
    }

    ["R", "G", "B"].forEach(function (channel) {
      var row = document.createElement("label");
      row.style.display = "grid";
      row.style.gridTemplateColumns = "28px 1fr 42px";
      row.style.alignItems = "center";
      row.style.gap = "8px";
      row.style.marginBottom = "8px";
      row.style.color = accent;
      row.style.fontWeight = "700";

      var name = document.createElement("span");
      name.textContent = channel;

      var input = document.createElement("input");
      input.type = "range";
      input.min = "0";
      input.max = "255";
      input.value = String(values[channel]);
      input.setAttribute("aria-label", channel + " value");
      input.style.accentColor = accent;

      var value = document.createElement("output");
      value.textContent = String(values[channel]);
      value.style.color = "#111";
      value.style.textAlign = "right";
      value.style.fontVariantNumeric = "tabular-nums";

      input.addEventListener("input", function () {
        values[channel] = Number(input.value);
        value.textContent = input.value;
        update();
      });

      row.appendChild(name);
      row.appendChild(input);
      row.appendChild(value);
      controls.appendChild(row);
    });

    var reset = document.createElement("button");
    reset.type = "button";
    reset.textContent = "Reset";
    reset.style.backgroundColor = buttonColor;
    reset.style.color = "#fff";
    reset.style.border = "2px solid " + accent;
    reset.style.borderRadius = "4px";
    reset.style.padding = "6px 12px";
    reset.style.cursor = "pointer";
    reset.addEventListener("click", function () {
      values = { R: 245, G: 124, B: 0 };
      Array.prototype.forEach.call(controls.querySelectorAll("input"), function (input, index) {
        var channel = ["R", "G", "B"][index];
        input.value = String(values[channel]);
        input.parentNode.lastChild.textContent = String(values[channel]);
      });
      update();
    });

    panel.appendChild(heading);
    panel.appendChild(swatch);
    panel.appendChild(hex);
    panel.appendChild(controls);
    panel.appendChild(reset);
    root.appendChild(panel);
    update();
  },
});
