WORKSHOP.register({
  id: "Lhyn2",
  title: "Random picker",
  author: "Lhyn2",
  mount: function (root) {
    // Small built-in list to pick from.
    var items = [
      "Rock",
      "Paper",
      "Scissors",
      "Lizard",
      "Spock",
      "Coffee",
      "Tea",
    ];

    // Index of the item shown last time, so we never repeat it in a row.
    var lastIndex = -1;

    var display = document.createElement("output");
    display.className = "count";
    display.textContent = "—";
    display.setAttribute("aria-live", "polite");
    display.setAttribute("aria-label", "Picked item");
    // Let long words wrap instead of overflowing the card.
    display.style.overflowWrap = "anywhere";
    display.style.lineHeight = "1.1";

    var hint = document.createElement("p");
    hint.className = "by";
    hint.textContent = "Pick one of " + items.length + " items — never the same one twice in a row.";
    hint.style.margin = "0";

    var pick = document.createElement("button");
    pick.type = "button";
    pick.textContent = "Pick random";

    function pickRandom() {
      var nextIndex;
      if (items.length <= 1) {
        // Only one option: nothing to vary.
        nextIndex = 0;
      } else {
        // Choose uniformly among the items that are NOT the last one.
        // Draw from [0, length - 1) then skip over lastIndex so the
        // result is always different and every other item is equally likely.
        nextIndex = Math.floor(Math.random() * (items.length - 1));
        if (nextIndex >= lastIndex) {
          nextIndex += 1;
        }
      }
      lastIndex = nextIndex;
      display.textContent = items[nextIndex];
    }

    pick.addEventListener("click", pickRandom);

    root.appendChild(hint);
    root.appendChild(display);
    root.appendChild(pick);
  },
});
