import { editTodo } from "../../lib/TodoFunctions.js";
import myTodos from "../../data/todos.js";

// Default Object
const userInput = {
  newTitle: "",
  newDue: "",
  newCategories: [],
};

const main = document.querySelector("main");

export const ModalFunction = (parentNodeID) => {
  const myTodo = myTodos.find((todo) => todo.id === parentNodeID);
  const categories = myTodo.category;

  //? Fix for the Modal Duplication BUG in DOM.
  main.childNodes.forEach((node) => {
    if (node.className === "modal is-active") node.remove();
  });

  let active = "is-active";

  main.insertAdjacentHTML(
    "beforeend",
    modalMarkup(active, myTodo.title, myTodo.due)
  );

  // --------------------------------------------------

  const categoriesUL = document.querySelector(".CategoryList");

  const categoriesGenerator = (array) => {
    categoriesUL.textContent = "";

    categoriesUL.childNodes.forEach((node) => {
      console.log(node);
    });

    array.forEach((el, i) => {
      let tagMarkup = `<span class="tag" data-category="${i}">${el} <button id="tagDelete" class="delete" /></span>`;
      categoriesUL.insertAdjacentHTML("beforeend", tagMarkup);
    });

    categoriesUL.addEventListener("click", (e) => {
      if (e.target.className === "delete") {
        const categoryID = e.target.parentElement.dataset.category * 1;
        categories.splice(categoryID, 1);
        categoriesGenerator(categories);
        e.target.parentElement.remove();
      }
    });
  };

  categoriesGenerator(categories);

  // --------------------------------------------------
  const newInput = document.querySelector("#categoriesInput");

  const modal = document.querySelector(".modal");
  main.addEventListener("click", (e) => {
    if (
      e.target.className === "modal-background" ||
      e.target.id === "cancel" ||
      e.target.id === "closeBtn"
    )
      modal?.remove();

    if (e.target.id === "submit") {
      userInput.newTitle = document.querySelector("#titleInput").value;
      userInput.newDue = document.querySelector("#dateInput").value;

      editTodo(myTodo, userInput, categories);
      modal?.remove();
    }

    if (e.target.id === "categoriesBtn") {
      if (newInput.value === "") return;
      categories.push(newInput?.value);
      categoriesGenerator(categories);
      newInput.value = "";
      return;
    }
  });
};

const modalMarkup = (active, title, due) => `<div class="modal ${active}">
<div class="modal-background"></div>
<div class="modal-card">
  <header class="modal-card-head">
    <div class="mh">
      <p class="modal-card-title">${title}</p>
      <p>${due}</p>
    </div>
    <button class="delete" id="closeBtn" aria-label="close"></button>
  </header>

  <section class="modal-card-body">
    <div class="field">
      <label class="label">Todo Title</label>
      <div class="control">
        <input id="titleInput" class="input" type="text" placeholder="${title}" />
      </div>
    </div>

    <div class="field">
      <label class="label">Due Date</label>
      <div class="control has-icons-left has-icons-right">
        <input
          class="input"
          type="date"
          value="bulma"
          id="dateInput"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-calendar"></i>
        </span>
      </div>
    </div>

    <div class="field">
      <label class="label">Todo Category</label>
      <div class="control formCategories">
        <input id="categoriesInput" class="input" type="text" placeholder="Text input" />
        <button id="categoriesBtn" class="button is-info">Add</button>
      </div>
      <div class="categoriesWrapper">
        <ul class="CategoryList"></ul>
      </div>
    </div>
  </section>

  <footer class="modal-card-foot">
    <div class="field is-grouped">
    <div class="control">
        <button
          class="button"
          style="background-color: #ffcf56ff; color: rgb(69, 85, 99)"
          id="submit"
        >
          Submit
        </button>
      </div>
      <div class="control">
        <button
          class="button is-ghost"
          style="color: rgb(69, 85, 99)"
          id="cancel"
        >
          Cancel
        </button>
      </div>
    </div>
  </footer>
</div>
</div>`;
