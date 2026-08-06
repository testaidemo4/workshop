/* Temperature converter — widget for the Widget Wall (Issue #28, TASK-TEMP).
   Type Celsius and Fahrenheit updates live, and the reverse.
   Self-contained: builds all DOM inside `root`, no libraries, no network. */
WORKSHOP.register({
  id: "joanne",
  title: "Temperature converter",
  author: "joanne",
  mount: function (root) {
    // ---- palette (AGENTS.md: developer-orange background, LN red accent) ----
    var ORANGE = "#F57C00"; // widget background
    var LN_RED = "#D32F2F"; // business-unit accent: buttons, borders, key labels
    var INK = "#1a1a1a";    // black text — readable on the orange surface

    // Scoped styles so focus/hover behave well without leaking to the page.
    var style = document.createElement("style");
    style.textContent = [
      ".tc-joanne{background:" + ORANGE + ";color:" + INK + ";padding:16px;",
      "  border-radius:10px;box-sizing:border-box;font:14px/1.4 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;}",
      ".tc-joanne .tc-row{display:flex;flex-wrap:wrap;gap:12px;}",
      ".tc-joanne .tc-field{flex:1 1 140px;min-width:120px;display:flex;flex-direction:column;gap:4px;}",
      ".tc-joanne label{font-weight:700;color:" + INK + ";}",
      ".tc-joanne input{width:100%;box-sizing:border-box;padding:8px 10px;font-size:15px;",
      "  color:" + INK + ";background:#fff;border:2px solid " + LN_RED + ";border-radius:6px;}",
      ".tc-joanne input:focus-visible{outline:3px solid " + INK + ";outline-offset:1px;}",
      ".tc-joanne .tc-actions{margin-top:12px;}",
      ".tc-joanne button{font:inherit;font-weight:700;color:#fff;background:" + LN_RED + ";",
      "  border:2px solid " + LN_RED + ";border-radius:6px;padding:8px 14px;cursor:pointer;}",
      ".tc-joanne button:hover{filter:brightness(0.92);}",
      ".tc-joanne button:focus-visible{outline:3px solid " + INK + ";outline-offset:2px;}",
      ".tc-joanne .tc-hint{margin:10px 0 0;font-size:12px;color:" + INK + ";opacity:0.85;}",
    ].join("");

    var wrap = document.createElement("div");
    wrap.className = "tc-joanne";

    var row = document.createElement("div");
    row.className = "tc-row";

    // Build one labelled number input; returns the <input> element.
    function makeField(id, labelText, unit) {
      var field = document.createElement("div");
      field.className = "tc-field";

      var label = document.createElement("label");
      label.setAttribute("for", id);
      label.textContent = labelText;

      var input = document.createElement("input");
      input.type = "number";
      input.id = id;
      input.step = "any";
      input.inputMode = "decimal";
      input.autocomplete = "off";
      input.placeholder = "0";
      input.setAttribute("aria-label", labelText + " (" + unit + ")");

      field.appendChild(label);
      field.appendChild(input);
      row.appendChild(field);
      return input;
    }

    var celsius = makeField("tc-joanne-c", "Celsius", "°C");
    var fahrenheit = makeField("tc-joanne-f", "Fahrenheit", "°F");

    // Round to at most 2 decimals and drop trailing zeros for a clean display.
    function fmt(n) {
      return String(Math.round(n * 100) / 100);
    }

    // When one field changes, recompute the other. Empty/invalid clears it.
    function convert(from, to, transform) {
      var raw = from.value.trim();
      if (raw === "" || isNaN(parseFloat(raw))) {
        to.value = "";
        return;
      }
      to.value = fmt(transform(parseFloat(raw)));
    }

    celsius.addEventListener("input", function () {
      convert(celsius, fahrenheit, function (c) { return c * 9 / 5 + 32; });
    });
    fahrenheit.addEventListener("input", function () {
      convert(fahrenheit, celsius, function (f) { return (f - 32) * 5 / 9; });
    });

    var actions = document.createElement("div");
    actions.className = "tc-actions";
    var reset = document.createElement("button");
    reset.type = "button";
    reset.textContent = "Reset";
    reset.addEventListener("click", function () {
      celsius.value = "";
      fahrenheit.value = "";
      celsius.focus();
    });
    actions.appendChild(reset);

    var hint = document.createElement("p");
    hint.className = "tc-hint";
    hint.textContent = "Type in either box — the other updates live.";

    wrap.appendChild(style);
    wrap.appendChild(row);
    wrap.appendChild(actions);
    wrap.appendChild(hint);
    root.appendChild(wrap);
  },
});
