export const ModalFunction = (itemData, Wrapper) => {
  console.log(itemData, Wrapper);

  //! Grabbing Modal Elements
  const modal = document.querySelector(".modal");
  modal.classList.add("is-active");
  const cardTitle = document.querySelector(".modal-card-title");
  const cardContent = document.querySelector(".modal-card-body");
  const cardBG = document.querySelector(".modal-background");
  const cardCloseBtn = document.querySelector("#closeBtn");

  cardTitle.textContent = itemData.title;

  cardCloseBtn.addEventListener("click", () => {
    modal.classList.remove("is-active");
  });

  cardBG.addEventListener("click", () => {
    modal.classList.remove("is-active");
  });
};
