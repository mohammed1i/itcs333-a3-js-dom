// ITCS333 A3 starter — implement the to-do app per README.
// You may wrap everything in a DOMContentLoaded handler or an IIFE.
// Requirements: add / toggle-complete / delete / filter / counter,
// using event delegation on #todo-list.

// TODO: your code here
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const list = document.getElementById("todo-list");
  const error = document.getElementById("error-msg");
  const counter = document.getElementById("counter");

  let filter = "all";

  function updateCounter() {
    let count = 0;

    for (let item of list.children) {
      if (!item.classList.contains("completed")) {
        count++;
      }
    }

    counter.textContent = count + " item(s) left";
  }

  function showItems() {
    for (let item of list.children) {
      if (filter === "all") {
        item.style.display = "";
      } else if (filter === "active") {
        item.style.display = item.classList.contains("completed") ? "none" : "";
      } else {
        item.style.display = item.classList.contains("completed") ? "" : "none";
      }
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let text = input.value.trim();

    if (text === "") {
      error.classList.remove("hidden");
      return;
    }

    error.classList.add("hidden");

    let li = document.createElement("li");
    let span = document.createElement("span");
    let button = document.createElement("button");

    span.textContent = text;
    button.textContent = "Delete";
    button.className = "delete-btn";

    li.appendChild(span);
    li.appendChild(button);
    list.appendChild(li);

    input.value = "";

    updateCounter();
    showItems();
  });

  list.addEventListener("click", function (event) {
    let item = event.target.closest("li");

    if (!item) {
      return;
    }

    if (event.target.classList.contains("delete-btn")) {
      item.remove();
    } else {
      item.classList.toggle("completed");
    }

    updateCounter();
    showItems();
  });

  document.getElementById("filter-all").addEventListener("click", function () {
    filter = "all";
    showItems();
  });

  document.getElementById("filter-active").addEventListener("click", function () {
    filter = "active";
    showItems();
  });

  document.getElementById("filter-done").addEventListener("click", function () {
    filter = "done";
    showItems();
  });

  updateCounter();

});
