import { editTodo } from "../../lib/TodoFunctions.js";
import myTodos from "../../data/todos.js";

const userInput = {
  newTitle: "",
  newDue: "",
  newCategories: [],
};

export const ModalFunction = (parentNodeID) => {
  const myTodo = myTodos.find((todo) => todo.id === parentNodeID);
  const categories = myTodo.category;

  const modalWrapper = document.querySelector("main");
  //? Landon -> I had to do this loop to delete duplicated modals from event listners.
  // Comment out the loop below and watch the DOM to see the modal be duplicated in the main dom element.
  modalWrapper.childNodes.forEach((node) => {
    if (node.className === "modal is-active") node.remove();
  });

  let active = "is-active";

  //! Sick use of the Map method in this markup
  let markup = `<div class="modal ${active}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <div class="mh">
        <p class="modal-card-title">${myTodo.title}</p>
        <p>${myTodo.due}</p>
      </div>
      <button class="delete" id="closeBtn" aria-label="close"></button>
    </header>
    
    <section class="modal-card-body">
      <div class="field">
        <label class="label">Todo Title</label>
        <div class="control">
          <input id="titleInput" class="input" type="text" placeholder="${
            myTodo.title
          }" />
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
          <input class="input" type="text" placeholder="Text input" />
          <button class="button is-info">Add</button>
        </div>
        <div class="categoriesWrapper">
          <ul class="CategoryList">${categories
            .map((el, i) => {
              return `<li><span data-id=${i} class="tag is-grey">${el} <button id="tagDelete" class="delete is-small"></button></span></li>`;
            })
            .join("")}</ul>
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

  modalWrapper.insertAdjacentHTML("beforeend", markup);

  const modal = document.querySelector(".modal");

  modalWrapper.addEventListener("click", (e) => {
    if (
      e.target.className === "modal-background" ||
      e.target.id === "cancel" ||
      e.target.id === "closeBtn"
    )
      modal?.remove();

    if (e.target.id === "submit") {
      userInput.newTitle = document.querySelector("#titleInput").value;
      userInput.newDue = document.querySelector("#dateInput").value;
      userInput.newCategories = categories;

      editTodo(itemData, userInput);
      modal?.remove();
    }

    if (e.target.id === "tagDelete") {
      categories.splice(e.target.parentElement.dataset.id * 1, 1);
      e.target.parentElement.parentElement.remove();
    }
  });
};
