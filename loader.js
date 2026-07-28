/* Shared loader. Facilitator owns this file — participants never edit it.
   It defines WORKSHOP.register(), then loads every widget listed in
   widgets/registry.js. Each widget self-registers and is mounted into its
   own card, so widget files stay completely independent of each other. */
(function () {
  var wall = document.getElementById("wall");
  var ids = (window.WORKSHOP_WIDGET_IDS || []).slice();

  window.WORKSHOP = {
    register: function (widget) {
      if (!widget || !widget.id || !widget.title || typeof widget.mount !== "function") {
        console.error("Invalid widget registration:", widget);
        return;
      }
      var card = document.createElement("section");
      card.className = "card";

      var title = document.createElement("h2");
      title.textContent = widget.title;

      var by = document.createElement("p");
      by.className = "by";
      by.textContent = "by " + (widget.author || widget.id);

      var body = document.createElement("div");
      body.className = "widget-body";

      card.appendChild(title);
      card.appendChild(by);
      card.appendChild(body);
      wall.appendChild(card);

      try {
        widget.mount(body);
      } catch (err) {
        body.innerHTML = '<p class="err">This widget failed to load.</p>';
        console.error("Widget mount failed:", widget.id, err);
      }
    },
  };

  if (ids.length === 0) {
    wall.innerHTML = '<p class="empty">No widgets yet — be the first to ship one!</p>';
    return;
  }

  ids.forEach(function (id) {
    var s = document.createElement("script");
    s.src = "widgets/" + id + ".js";
    s.onerror = function () { console.error("Could not load widget file:", id); };
    document.body.appendChild(s);
  });
})();
