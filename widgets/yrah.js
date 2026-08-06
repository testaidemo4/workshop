WORKSHOP.register({
  id: "yrah",
  title: "Tip calculator",
  author: "yrah",
  mount: function (root) {
    var background = "#F57C00";
    var accent = "#D32F2F";
    var darkText = "#20130A";

    var panel = document.createElement("section");
    panel.setAttribute("aria-label", "Tip calculator controls and results");
    panel.style.background = background;
    panel.style.border = "2px solid " + accent;
    panel.style.borderRadius = "10px";
    panel.style.color = darkText;
    panel.style.padding = "0.9rem";

    var intro = document.createElement("p");
    intro.textContent = "Enter a bill and tip percentage to see the totals instantly.";
    intro.style.fontSize = "0.9rem";
    intro.style.lineHeight = "1.4";
    intro.style.margin = "0 0 0.75rem";

    var fields = document.createElement("div");
    fields.style.display = "grid";
    fields.style.gridTemplateColumns = "repeat(auto-fit, minmax(130px, 1fr))";
    fields.style.gap = "0.65rem";

    function makeField(id, labelText, prefix, suffix, value, step) {
      var field = document.createElement("div");

      var label = document.createElement("label");
      label.htmlFor = id;
      label.textContent = labelText;
      label.style.display = "block";
      label.style.fontSize = "0.82rem";
      label.style.fontWeight = "800";
      label.style.marginBottom = "0.25rem";

      var inputWrap = document.createElement("div");
      inputWrap.style.alignItems = "center";
      inputWrap.style.background = "#FFFFFF";
      inputWrap.style.border = "2px solid " + accent;
      inputWrap.style.borderRadius = "8px";
      inputWrap.style.display = "flex";
      inputWrap.style.overflow = "hidden";

      if (prefix) {
        var prefixText = document.createElement("span");
        prefixText.textContent = prefix;
        prefixText.setAttribute("aria-hidden", "true");
        prefixText.style.color = accent;
        prefixText.style.fontWeight = "800";
        prefixText.style.paddingLeft = "0.55rem";
        inputWrap.appendChild(prefixText);
      }

      var input = document.createElement("input");
      input.id = id;
      input.type = "number";
      input.inputMode = "decimal";
      input.min = "0";
      input.step = step;
      input.value = value;
      input.setAttribute("aria-describedby", "yrah-status");
      input.style.background = "transparent";
      input.style.border = "0";
      input.style.color = darkText;
      input.style.flex = "1 1 auto";
      input.style.minWidth = "0";
      input.style.outlineOffset = "-2px";
      input.style.padding = "0.55rem";
      input.style.width = "100%";

      if (suffix) {
        var suffixText = document.createElement("span");
        suffixText.textContent = suffix;
        suffixText.setAttribute("aria-hidden", "true");
        suffixText.style.color = accent;
        suffixText.style.fontWeight = "800";
        suffixText.style.paddingRight = "0.55rem";
        inputWrap.appendChild(input);
        inputWrap.appendChild(suffixText);
      } else {
        inputWrap.appendChild(input);
      }

      field.appendChild(label);
      field.appendChild(inputWrap);
      fields.appendChild(field);
      return input;
    }

    var billInput = makeField("yrah-bill", "Bill amount", "$", "", "50.00", "0.01");
    var tipInput = makeField("yrah-tip", "Tip percentage", "", "%", "20", "0.1");

    var results = document.createElement("div");
    results.style.background = "#FFF3E0";
    results.style.border = "2px solid " + accent;
    results.style.borderRadius = "8px";
    results.style.display = "grid";
    results.style.gap = "0.5rem";
    results.style.gridTemplateColumns = "repeat(2, minmax(0, 1fr))";
    results.style.marginTop = "0.75rem";
    results.style.padding = "0.7rem";

    function makeResult(labelText) {
      var result = document.createElement("div");
      result.style.minWidth = "0";

      var label = document.createElement("div");
      label.textContent = labelText;
      label.style.color = accent;
      label.style.fontSize = "0.75rem";
      label.style.fontWeight = "800";
      label.style.textTransform = "uppercase";

      var value = document.createElement("output");
      value.textContent = "$0.00";
      value.style.color = darkText;
      value.style.display = "block";
      value.style.fontSize = "clamp(1.15rem, 5vw, 1.6rem)";
      value.style.fontWeight = "800";
      value.style.overflowWrap = "anywhere";

      result.appendChild(label);
      result.appendChild(value);
      results.appendChild(result);
      return value;
    }

    var tipOutput = makeResult("Tip");
    var totalOutput = makeResult("Total");

    var status = document.createElement("p");
    status.id = "yrah-status";
    status.setAttribute("aria-live", "polite");
    status.style.fontSize = "0.8rem";
    status.style.fontWeight = "700";
    status.style.margin = "0.55rem 0 0";
    status.style.minHeight = "1.1em";

    function money(value) {
      return "$" + value.toFixed(2);
    }

    function updateTotals() {
      var bill = Number(billInput.value);
      var tipPercent = Number(tipInput.value);
      var billIsValid = billInput.value.trim() !== "" && Number.isFinite(bill) && bill >= 0;
      var tipIsValid = tipInput.value.trim() !== "" && Number.isFinite(tipPercent) && tipPercent >= 0;

      billInput.setAttribute("aria-invalid", String(!billIsValid));
      tipInput.setAttribute("aria-invalid", String(!tipIsValid));

      if (!billIsValid || !tipIsValid) {
        tipOutput.textContent = "--";
        totalOutput.textContent = "--";
        status.textContent = !billIsValid
          ? "Enter a non-negative bill amount."
          : "Enter a non-negative tip percentage.";
        status.style.color = "#5A1010";
        return;
      }

      var tip = bill * tipPercent / 100;
      tipOutput.textContent = money(tip);
      totalOutput.textContent = money(bill + tip);
      status.textContent = "Totals updated.";
      status.style.color = "#3B2415";
    }

    billInput.addEventListener("input", updateTotals);
    tipInput.addEventListener("input", updateTotals);

    panel.appendChild(intro);
    panel.appendChild(fields);
    panel.appendChild(results);
    panel.appendChild(status);
    root.appendChild(panel);

    updateTotals();
  },
});

