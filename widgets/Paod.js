/* Tip calculator — TASK-TIP (Paod)
   Self-contained widget: builds everything inside `root`, no libraries,
   no network calls. Developer/LN styling per AGENTS.md:
   background developer orange (#F57C00), LN red accent (#D32F2F). */
WORKSHOP.register({
  id: "Paod",
  title: "Tip calculator",
  author: "Paod",
  mount: function (root) {
    var ORANGE = "#F57C00";   // widget background (developer)
    var RED = "#D32F2F";      // LN business-unit accent

    // ---- container ---------------------------------------------------
    root.style.background = ORANGE;
    root.style.color = "#000";
    root.style.padding = "16px";
    root.style.borderRadius = "10px";
    root.style.border = "2px solid " + RED;
    root.style.boxSizing = "border-box";
    root.style.maxWidth = "360px";
    root.style.fontFamily =
      "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";

    // ---- helpers -----------------------------------------------------
    function makeField(labelText, opts) {
      var wrap = document.createElement("label");
      wrap.style.display = "block";
      wrap.style.margin = "0 0 12px";
      wrap.style.fontWeight = "600";
      wrap.style.color = "#000";

      var span = document.createElement("span");
      span.textContent = labelText;
      span.style.display = "block";
      span.style.marginBottom = "4px";

      var input = document.createElement("input");
      input.type = "number";
      input.inputMode = "decimal";
      input.min = "0";
      input.step = opts.step;
      input.value = opts.value;
      input.placeholder = opts.placeholder;
      input.style.width = "100%";
      input.style.boxSizing = "border-box";
      input.style.padding = "8px 10px";
      input.style.fontSize = "16px";
      input.style.border = "2px solid " + RED;
      input.style.borderRadius = "6px";
      input.style.background = "#fff";
      input.style.color = "#000";

      wrap.appendChild(span);
      wrap.appendChild(input);
      return { wrap: wrap, input: input };
    }

    var bill = makeField("Bill amount", {
      step: "0.01",
      value: "",
      placeholder: "0.00",
    });
    var tipPct = makeField("Tip %", {
      step: "1",
      value: "15",
      placeholder: "15",
    });

    // ---- quick tip % presets (accent buttons) ------------------------
    var presetsWrap = document.createElement("div");
    presetsWrap.style.display = "flex";
    presetsWrap.style.flexWrap = "wrap";
    presetsWrap.style.gap = "6px";
    presetsWrap.style.margin = "0 0 14px";

    [10, 15, 18, 20].forEach(function (p) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = p + "%";
      b.style.flex = "1 1 auto";
      b.style.minWidth = "56px";
      b.style.padding = "8px 6px";
      b.style.fontSize = "14px";
      b.style.fontWeight = "700";
      b.style.color = "#fff";
      b.style.background = RED;
      b.style.border = "2px solid " + RED;
      b.style.borderRadius = "6px";
      b.style.cursor = "pointer";
      b.addEventListener("click", function () {
        tipPct.input.value = String(p);
        recalc();
      });
      presetsWrap.appendChild(b);
    });

    // ---- results -----------------------------------------------------
    function makeResultRow(labelText, accent) {
      var row = document.createElement("div");
      row.style.display = "flex";
      row.style.justifyContent = "space-between";
      row.style.alignItems = "baseline";
      row.style.padding = "6px 0";

      var lbl = document.createElement("span");
      lbl.textContent = labelText;
      lbl.style.fontWeight = "600";
      lbl.style.color = accent ? RED : "#000";

      var val = document.createElement("span");
      val.textContent = "$0.00";
      val.style.fontWeight = "700";
      val.style.fontVariantNumeric = "tabular-nums";
      val.style.color = "#000";

      row.appendChild(lbl);
      row.appendChild(val);
      return { row: row, val: val };
    }

    var results = document.createElement("div");
    results.setAttribute("aria-live", "polite");
    results.style.marginTop = "8px";
    results.style.paddingTop = "10px";
    results.style.borderTop = "2px solid " + RED;

    var tipRow = makeResultRow("Tip", false);
    var totalRow = makeResultRow("Total", true);
    totalRow.val.style.fontSize = "18px";
    results.appendChild(tipRow.row);
    results.appendChild(totalRow.row);

    // ---- calculation -------------------------------------------------
    function money(n) {
      return "$" + n.toFixed(2);
    }

    function recalc() {
      var b = parseFloat(bill.input.value);
      var p = parseFloat(tipPct.input.value);
      if (!isFinite(b) || b < 0) b = 0;
      if (!isFinite(p) || p < 0) p = 0;
      var tip = b * (p / 100);
      var total = b + tip;
      tipRow.val.textContent = money(tip);
      totalRow.val.textContent = money(total);
    }

    bill.input.addEventListener("input", recalc);
    tipPct.input.addEventListener("input", recalc);

    // ---- assemble ----------------------------------------------------
    root.appendChild(bill.wrap);
    root.appendChild(tipPct.wrap);
    root.appendChild(presetsWrap);
    root.appendChild(results);

    recalc();
  },
});
