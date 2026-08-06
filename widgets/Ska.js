WORKSHOP.register({
  id: "Ska",
  title: "Random picker",
  author: "Ska",
  mount: function (root) {
    var items = ["Blueberry", "Coconut", "Mango", "Peach", "Pineapple"];
    var previousIndex = -1;

    var result = document.createElement("div");
    result.className = "count";
    result.textContent = "Click Pick to choose an item";

    var pick = document.createElement("button");
    pick.textContent = "Pick";
    pick.addEventListener("click", function () {
      var index = Math.floor(Math.random() * items.length);

      while (items.length > 1 && index === previousIndex) {
        index = Math.floor(Math.random() * items.length);
      }

      previousIndex = index;
      result.textContent = items[index];
    });

    var reset = document.createElement("button");
    reset.className = "secondary";
    reset.textContent = "Reset";
    reset.addEventListener("click", function () {
      previousIndex = -1;
      result.textContent = "Click Pick to choose an item";
    });

    root.appendChild(result);
    root.appendChild(pick);
    root.appendChild(reset);
  },
});
