export const StatusHandler = (event, el) => {
  if (el.status) {
    el.status = false;
    event.target.className = "todoStatus__default";
  } else {
    el.status = true;
    event.target.className = "todoStatus__complete";
  }
  console.log(el);
};
