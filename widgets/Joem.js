/* Random picker — TASK-PICKER (Joem)
   Shows a random item from a small built-in list, never repeating the
   same item twice in a row. Self-contained: no libraries, no network. */
WORKSHOP.register({
  id: "Joem",
  title: "Random picker",
  author: "Joem",
  mount: function (root) {
    var ITEMS = [
      "Rock",
      "Paper",
      "Scissors",
      "Lizard",
      "Spock",
      "Dragon",
    ];

    var BG = "#F57C00";       // developer orange (widget background)
    var ACCENT = "#D32F2F";   // LN red (buttons, borders, key labels)
    var DARK = "#1a1a1a";     // readable text on the orange surface

    var lastIndex = -1;

    // Container so all our styling stays inside `root`.
    var box = document.createElement("div");
    box.style.background = BG;
    box.style.border = "2px solid " + ACCENT;
    box.style.borderRadius = "10px";
    box.style.padding = "16px";
    box.style.boxSizing = "border-box";
    box.style.width = "100%";
    box.style.maxWidth = "420px";
    box.style.margin = "0 auto";
    box.style.textAlign = "center";
    box.style.fontFamily = "system-ui, sans-serif";

    // Key label for the current pick.
    var label = document.createElement("div");
    label.textContent = "Your pick";
    label.style.color = ACCENT;
    label.style.fontWeight = "700";
    label.style.textTransform = "uppercase";
    label.style.letterSpacing = "0.05em";
    label.style.fontSize = "12px";
    label.style.marginBottom = "6px";

    // The result readout. aria-live announces each new pick to screen readers.
    var result = document.createElement("div");
    result.setAttribute("aria-live", "polite");
    result.textContent = "Press Pick to start";
    result.style.color = DARK;
    result.style.fontSize = "28px";
    result.style.fontWeight = "700";
    result.style.minHeight = "38px";
    result.style.lineHeight = "38px";
    result.style.marginBottom = "14px";
    result.style.wordBreak = "break-word";

    // The pick button — LN red with white text for contrast.
    var pick = document.createElement("button");
    pick.type = "button";
    pick.textContent = "Pick";
    pick.style.background = ACCENT;
    pick.style.color = "#ffffff";
    pick.style.border = "none";
    pick.style.borderRadius = "8px";
    pick.style.padding = "10px 22px";
    pick.style.fontSize = "16px";
    pick.style.fontWeight = "700";
    pick.style.cursor = "pointer";
    pick.style.outlineOffset = "2px";

    function choose() {
      // Pick a random index that differs from the previous one so the
      // same item never appears twice in a row. With 2+ items this always
      // terminates quickly.
      var i;
      do {
        i = Math.floor(Math.random() * ITEMS.length);
      } while (ITEMS.length > 1 && i === lastIndex);
      lastIndex = i;
      result.textContent = ITEMS[i];
    }

    pick.addEventListener("click", choose);

    box.appendChild(label);
    box.appendChild(result);
    box.appendChild(pick);
    root.appendChild(box);
  },
});
