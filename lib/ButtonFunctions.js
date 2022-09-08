export const StatusHandler = (event, el, svg) => {
  if (el.status) {
    el.status = false;
    event.target.className = "todoStatus__default";
    svg.className = "fa-regular fa-circle";
  } else {
    el.status = true;
    event.target.className = "todoStatus__complete";
    svg.className = "fa-solid fa-check";
  }
};
