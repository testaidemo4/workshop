WORKSHOP.register({
  id: "Mike",
  title: "Click counter",
  author: "Mike",
  mount: function (root) {
    var count = 0;

    var display = document.createElement("div");
    display.className = "count";
    display.textContent = "0";

    var increment = document.createElement("button");
    increment.textContent = "Increment";
    increment.addEventListener("click", function () {
      count += 1;
      display.textContent = String(count);
    });

    var reset = document.createElement("button");
    reset.className = "secondary";
    reset.textContent = "Reset";
    reset.addEventListener("click", function () {
      count = 0;
      display.textContent = "0";
    });

    root.appendChild(display);
    root.appendChild(increment);
    root.appendChild(reset);
  },
});
