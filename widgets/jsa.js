/* Random picker — assignment TASK-PICKER (jsa).
   A button picks a random item from a small built-in list and never repeats
   the same item twice in a row. Self-contained: no libraries, no network.
   Visuals per AGENTS.md: developer-orange surface (#F57C00), LN red accent
   (#D32F2F) on button/borders/key labels, readable text, keyboard-accessible,
   responsive. All DOM is built inside `root`. */
WORKSHOP.register({
  id: "jsa",
  title: "Random picker",
  author: "jsa",
  mount: function (root) {
    var ITEMS = [
      "Teams",
      "Zoom",
      "Webex",
      "Slack",
      "Google Meet",
      "RingCentral",
    ];

    // --- Layout container -------------------------------------------------
    var wrap = document.createElement("div");
    wrap.style.background = "#F57C00";
    wrap.style.border = "2px solid #D32F2F";
    wrap.style.borderRadius = "10px";
    wrap.style.padding = "16px";
    wrap.style.maxWidth = "320px";
    wrap.style.boxSizing = "border-box";
    wrap.style.display = "flex";
    wrap.style.flexDirection = "column";
    wrap.style.gap = "12px";
    wrap.style.fontFamily =
      "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif";

    // --- Key label --------------------------------------------------------
    var label = document.createElement("div");
    label.textContent = "Pick a collaboration tool";
    label.style.color = "#D32F2F"; // LN accent on a key label
    label.style.fontWeight = "700";
    label.style.fontSize = "14px";
    // Dark red on orange has adequate contrast; keep it as the key label.

    // --- Result display ---------------------------------------------------
    var result = document.createElement("div");
    result.setAttribute("role", "status"); // announce updates to screen readers
    result.setAttribute("aria-live", "polite");
    result.textContent = "Press the button to pick";
    result.style.background = "#ffffff";
    result.style.color = "#111111"; // black text on white for readability
    result.style.border = "2px solid #D32F2F";
    result.style.borderRadius = "8px";
    result.style.padding = "12px";
    result.style.minHeight = "24px";
    result.style.textAlign = "center";
    result.style.fontSize = "18px";
    result.style.fontWeight = "600";
    result.style.wordBreak = "break-word";

    // --- Pick button ------------------------------------------------------
    var button = document.createElement("button");
    button.type = "button";
    button.textContent = "Pick random";
    button.style.background = "#D32F2F"; // LN accent
    button.style.color = "#ffffff"; // white text on red for contrast
    button.style.border = "2px solid #B71C1C";
    button.style.borderRadius = "8px";
    button.style.padding = "10px 14px";
    button.style.fontSize = "15px";
    button.style.fontWeight = "700";
    button.style.cursor = "pointer";
    // Visible keyboard focus ring (accessibility).
    button.style.outlineOffset = "2px";
    button.addEventListener("focus", function () {
      button.style.outline = "3px solid #111111";
    });
    button.addEventListener("blur", function () {
      button.style.outline = "none";
    });

    // --- Behavior: random, never the same twice in a row ------------------
    var lastIndex = -1;
    function pick() {
      var i;
      if (ITEMS.length <= 1) {
        i = 0; // nothing to avoid when the list has one item
      } else {
        do {
          i = Math.floor(Math.random() * ITEMS.length);
        } while (i === lastIndex);
      }
      lastIndex = i;
      result.textContent = ITEMS[i];
    }

    button.addEventListener("click", pick);

    wrap.appendChild(label);
    wrap.appendChild(result);
    wrap.appendChild(button);
    root.appendChild(wrap);
  },
});
