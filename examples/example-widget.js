/* TEMPLATE — this file is NOT loaded on the wall.
   Copy it to widgets/<your-legal-id>.js and change the id to your legal ID.
   Rules: register exactly one widget; id must equal your file name;
   build everything inside `root`; keep it self-contained (no libraries). */
WORKSHOP.register({
  id: "example-widget",          // change to your legal ID (must match the file name)
  title: "Click Counter",        // your card's title
  author: "example-widget",      // your legal ID
  mount: function (root) {
    var n = 0;

    var display = document.createElement("div");
    display.className = "count";
    display.textContent = "0";

    var add = document.createElement("button");
    add.textContent = "Click me";
    add.addEventListener("click", function () {
      n += 1;
      display.textContent = String(n);
    });

    var reset = document.createElement("button");
    reset.className = "secondary";
    reset.textContent = "Reset";
    reset.addEventListener("click", function () {
      n = 0;
      display.textContent = "0";
    });

    root.appendChild(display);
    root.appendChild(add);
    root.appendChild(reset);
  },
});
