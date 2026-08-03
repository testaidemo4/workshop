WORKSHOP.register({
  id: "dar",
  title: "Color mixer",
  author: "dar",
  mount: function (root) {
    var channels = [
      { name: "Red", shortName: "R", value: 245 },
      { name: "Green", shortName: "G", value: 124 },
      { name: "Blue", shortName: "B", value: 0 },
    ];

    function style(element, rules) {
      Object.keys(rules).forEach(function (property) {
        element.style[property] = rules[property];
      });
    }

    root.setAttribute("aria-label", "RGB color mixer");
    style(root, {
      background: "#F57C00",
      color: "#111111",
      border: "2px solid #D32F2F",
      borderRadius: "12px",
      boxSizing: "border-box",
      display: "grid",
      gap: "14px",
      padding: "16px",
      width: "100%",
    });

    var instructions = document.createElement("p");
    instructions.textContent = "Adjust the red, green, and blue channels to mix a color.";
    style(instructions, {
      margin: "0",
      lineHeight: "1.45",
    });

    var preview = document.createElement("div");
    preview.setAttribute("role", "img");
    preview.setAttribute("aria-label", "Mixed color preview");
    style(preview, {
      border: "3px solid #D32F2F",
      borderRadius: "10px",
      boxSizing: "border-box",
      minHeight: "112px",
      width: "100%",
    });

    var hexCode = document.createElement("output");
    hexCode.setAttribute("aria-live", "polite");
    style(hexCode, {
      background: "#D32F2F",
      borderRadius: "8px",
      color: "#FFFFFF",
      display: "block",
      fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
      fontSize: "1.35rem",
      fontWeight: "700",
      letterSpacing: "0.06em",
      padding: "9px 12px",
      textAlign: "center",
    });

    var controls = document.createElement("div");
    style(controls, {
      display: "grid",
      gap: "12px",
      width: "100%",
    });

    var inputs = [];
    var valueOutputs = [];

    function toHex(value) {
      return Number(value).toString(16).padStart(2, "0").toUpperCase();
    }

    function updateColor() {
      var values = inputs.map(function (input) {
        return Number(input.value);
      });
      var hex = "#" + values.map(toHex).join("");

      preview.style.backgroundColor = hex;
      preview.setAttribute("aria-label", "Mixed color preview: " + hex);
      hexCode.value = hex;
      hexCode.textContent = hex;

      inputs.forEach(function (input, index) {
        valueOutputs[index].value = String(values[index]);
        valueOutputs[index].textContent = String(values[index]);
      });
    }

    channels.forEach(function (channel) {
      var row = document.createElement("div");
      style(row, {
        display: "grid",
        gap: "6px",
      });

      var labelLine = document.createElement("div");
      style(labelLine, {
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
      });

      var label = document.createElement("label");
      var inputId = "dar-color-" + channel.shortName.toLowerCase();
      label.htmlFor = inputId;
      label.textContent = channel.name + " (" + channel.shortName + ")";
      style(label, {
        color: "#650000",
        fontWeight: "700",
      });

      var valueOutput = document.createElement("output");
      valueOutput.setAttribute("for", inputId);
      valueOutput.value = String(channel.value);
      valueOutput.textContent = String(channel.value);
      style(valueOutput, {
        background: "#D32F2F",
        borderRadius: "6px",
        color: "#FFFFFF",
        fontWeight: "700",
        minWidth: "3ch",
        padding: "3px 7px",
        textAlign: "center",
      });

      var input = document.createElement("input");
      input.id = inputId;
      input.type = "range";
      input.min = "0";
      input.max = "255";
      input.step = "1";
      input.value = String(channel.value);
      input.setAttribute("aria-valuetext", String(channel.value));
      style(input, {
        accentColor: "#D32F2F",
        cursor: "pointer",
        margin: "0",
        width: "100%",
      });
      input.addEventListener("input", function () {
        input.setAttribute("aria-valuetext", input.value);
        updateColor();
      });

      labelLine.appendChild(label);
      labelLine.appendChild(valueOutput);
      row.appendChild(labelLine);
      row.appendChild(input);
      controls.appendChild(row);
      inputs.push(input);
      valueOutputs.push(valueOutput);
    });

    root.appendChild(instructions);
    root.appendChild(preview);
    root.appendChild(hexCode);
    root.appendChild(controls);

    updateColor();
  },
});
