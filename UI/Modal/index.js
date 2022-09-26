export const ModalFunction = (itemData, Wrapper) => {
  console.log(itemData)
  return

  const categories = itemData.category;

  //! Grabbing Modal Elements
  const modal = document.querySelector(".modal");
  modal.classList.add("is-active");
  const cardTitle = document.querySelector(".modal-card-title");
  const cardBG = document.querySelector(".modal-background");
  const cardCloseBtn = document.querySelector("#closeBtn");
  const categoryList = document.querySelector(".CategoryList");
  categoryList.textContent = "";
  cardTitle.textContent = itemData.title;

  categories.forEach((el, i, arr) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.className = "tag";
    span.style = `
      background-color: rgb(69,85,99);
      color: white;
    `;
    span.textContent = el;
    const btn = document.createElement("button");
    btn.className = "delete";
    btn.ariaLabel = "close";

    btn.addEventListener("click", () => {
      categories.splice(i, 1);
      categoryList.textContent = "";
      if (arr.length === 0) return;
      categoryList.appendChild(li);
    });

    span.appendChild(btn);
    li.appendChild(span);
    categoryList.appendChild(li);
  });

  cardCloseBtn.addEventListener("click", () => {
    modal.classList.remove("is-active");
  });

  cardBG.addEventListener("click", () => {
    modal.classList.remove("is-active");
  });
};
