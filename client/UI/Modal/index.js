export const ModalFunction = (itemData, Wrapper) => {
  // const categories = itemData.category;

  const modalWrapper = document.querySelector(".modal-wrapper");

  let active = "is-active";

  let markup = `<div class="modal ${active}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">${itemData.title}</p>
      <button class="delete" id="closeBtn" aria-label="close"></button>
    </header>
    
    <section class="modal-card-body">
      <div class="field">
        <label class="label">Todo Title</label>
        <div class="control">
          <input class="input" type="text" placeholder="Text input" />
        </div>
      </div>

      <div class="field">
        <label class="label">Due Date</label>
        <div class="control has-icons-left has-icons-right">
          <input
            class="input"
            type="date"
            placeholder="Text input"
            value="bulma"
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

  modalWrapper.insertAdjacentHTML("beforeend", markup);

  modalWrapper.addEventListener("click", (e) => {
    if (e.target.id === "closeBtn") {
      const card = e.target.parentElement.parentElement.parentElement;
      card.remove();
    } else if (e.target.className === "modal-background") {
      const card = e.target.parentElement;
      card.remove();
    } else if (e.target.id === "submit") {
      console.log(e.target);
    } else if (e.target.id === "cancel") {
      const card =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement;
      card.remove();
    }
  });
};
