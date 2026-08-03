WORKSHOP.register({
  id: "iancris",
  title: "Mini to-do list",
  author: "iancris",
  mount: function (root) {
    var itemCount = 0;

    root.style.background = "#F57C00";
    root.style.color = "#111111";
    root.style.border = "2px solid #D32F2F";
    root.style.borderRadius = "8px";
    root.style.padding = "12px";
    root.style.boxSizing = "border-box";

    var style = document.createElement("style");
    style.textContent = [
      ".iancris-todo { display: grid; gap: 10px; font-family: system-ui, sans-serif; }",
      ".iancris-todo__label { color: #111111; font-weight: 700; font-size: 0.9rem; }",
      ".iancris-todo__form { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px; }",
      ".iancris-todo__input { min-width: 0; border: 2px solid #D32F2F; border-radius: 6px; padding: 8px; font: inherit; }",
      ".iancris-todo__button { border: 2px solid #D32F2F; border-radius: 6px; background: #D32F2F; color: #ffffff; cursor: pointer; font: inherit; font-weight: 700; padding: 8px 10px; }",
      ".iancris-todo__button:hover, .iancris-todo__button:focus-visible { background: #B71C1C; border-color: #B71C1C; outline: 2px solid #ffffff; outline-offset: 2px; }",
      ".iancris-todo__button--remove { padding: 6px 8px; }",
      ".iancris-todo__list { display: grid; gap: 8px; list-style: none; margin: 0; padding: 0; }",
      ".iancris-todo__item { align-items: center; background: #ffffff; border: 2px solid #D32F2F; border-radius: 6px; display: grid; gap: 8px; grid-template-columns: auto minmax(0, 1fr) auto; padding: 8px; }",
      ".iancris-todo__checkbox { accent-color: #D32F2F; height: 18px; width: 18px; }",
      ".iancris-todo__text { overflow-wrap: anywhere; }",
      ".iancris-todo__checkbox:checked + .iancris-todo__text { color: #4a4a4a; text-decoration: line-through; }",
      ".iancris-todo__empty { background: rgba(255, 255, 255, 0.88); border-left: 4px solid #D32F2F; border-radius: 4px; margin: 0; padding: 8px; }",
      "@media (max-width: 420px) { .iancris-todo__form { grid-template-columns: 1fr; } .iancris-todo__button { width: 100%; } }"
    ].join("\n");

    var container = document.createElement("section");
    container.className = "iancris-todo";

    var label = document.createElement("label");
    label.className = "iancris-todo__label";
    label.htmlFor = "iancris-todo-input";
    label.textContent = "Add a task";

    var form = document.createElement("form");
    form.className = "iancris-todo__form";

    var input = document.createElement("input");
    input.className = "iancris-todo__input";
    input.id = "iancris-todo-input";
    input.type = "text";
    input.placeholder = "New task";
    input.autocomplete = "off";

    var addButton = document.createElement("button");
    addButton.className = "iancris-todo__button";
    addButton.type = "submit";
    addButton.textContent = "Add";

    var empty = document.createElement("p");
    empty.className = "iancris-todo__empty";
    empty.textContent = "No tasks yet.";

    var list = document.createElement("ul");
    list.className = "iancris-todo__list";

    function updateEmptyState() {
      empty.hidden = list.children.length > 0;
    }

    function addItem(text) {
      itemCount += 1;

      var item = document.createElement("li");
      item.className = "iancris-todo__item";

      var checkbox = document.createElement("input");
      checkbox.className = "iancris-todo__checkbox";
      checkbox.type = "checkbox";
      checkbox.id = "iancris-task-" + itemCount;

      var itemLabel = document.createElement("label");
      itemLabel.className = "iancris-todo__text";
      itemLabel.htmlFor = checkbox.id;
      itemLabel.textContent = text;

      var removeButton = document.createElement("button");
      removeButton.className = "iancris-todo__button iancris-todo__button--remove";
      removeButton.type = "button";
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", function () {
        item.remove();
        updateEmptyState();
        input.focus();
      });

      item.appendChild(checkbox);
      item.appendChild(itemLabel);
      item.appendChild(removeButton);
      list.appendChild(item);
      updateEmptyState();
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var value = input.value.trim();
      if (!value) {
        input.focus();
        return;
      }

      addItem(value);
      input.value = "";
      input.focus();
    });

    form.appendChild(input);
    form.appendChild(addButton);
    container.appendChild(label);
    container.appendChild(form);
    container.appendChild(empty);
    container.appendChild(list);
    root.appendChild(style);
    root.appendChild(container);
    updateEmptyState();
  },
});
