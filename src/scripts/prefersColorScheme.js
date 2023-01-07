const defaultThemeClass = "theme--default";
const lightThemeClass = "theme--light";
const darkThemeClass = "theme--dark";

//
// toggleElements - initialized at load to elements with custom data attribute
//
const toggleElements = Array.from(
  document.querySelectorAll("[data-color-scheme-toggle")
);

//
// Get the initial color scheme state when the page loads
//
let colorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

// update the state of the toggle checkboxes to match the initial page state
updateToggleStates();

//
// for all the checkboxes, add event listeners on click to swap classes on body as appropriate.
//
toggleElements.forEach((el) => {
  el.addEventListener("click", (evt) => {
    if (evt.target.checked) {
      if (colorScheme !== "dark") {
        document.body.classList.add(darkThemeClass);
        document.body.classList.remove(lightThemeClass);
        document.body.classList.remove(defaultThemeClass);
        colorScheme = "dark";
      }
    } else {
      if (colorScheme !== "light") {
        document.body.classList.add(lightThemeClass);
        document.body.classList.remove(darkThemeClass);
        document.body.classList.remove(defaultThemeClass);
        colorScheme = "light";
      }
    }
    updateToggleStates(evt.target);
  });
});

//
// watch for changes of the system color scheme
//
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (evt) => {
    const themeDefault = document.body.classList.contains(defaultThemeClass);

    // only update the toggle state if we're on the default theme, if user has selected,
    // then keep their choice.
    if (themeDefault) {
      colorScheme = evt.matches ? "dark" : "light";
      toggleElements.forEach((el) => {
        if (colorScheme === "dark") {
          el.checked = true;
        } else {
          el.checked = false;
        }
      });
    }
  });

/**
 * updateToggleStates
 *
 * This utility iterates over all the toggle buttons on the page and updates
 * the checked state to match the one presently being clicked.
 *
 * @param {*} currentEl
 */
function updateToggleStates(currentEl) {
  toggleElements.forEach((el) => {
    if (el !== currentEl) {
      el.checked = colorScheme === "dark";
    }
  });
}
