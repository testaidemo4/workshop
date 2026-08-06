WORKSHOP.register({
  id: "Len",
  title: "Dice roller",
  author: "Len",
  mount: function (root) {
    var rolls = [];

    var result = document.createElement("div");
    result.className = "count";
    result.textContent = "–";
    result.setAttribute("aria-live", "polite");

    var rollButton = document.createElement("button");
    rollButton.textContent = "Roll";

    var historyLabel = document.createElement("div");
    historyLabel.textContent = "Recent rolls";
    historyLabel.style.marginTop = "12px";
    historyLabel.style.fontWeight = "600";

    var history = document.createElement("div");
    history.textContent = "No rolls yet";
    history.setAttribute("aria-live", "polite");
    history.style.marginTop = "6px";

    rollButton.addEventListener("click", function () {
      var roll = Math.floor(Math.random() * 6) + 1;
      rolls.unshift(roll);
      rolls = rolls.slice(0, 5);

      result.textContent = String(roll);
      history.textContent = rolls.join(" · ");
    });

    root.appendChild(result);
    root.appendChild(rollButton);
    root.appendChild(historyLabel);
    root.appendChild(history);
  },
});
