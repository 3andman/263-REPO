
const startButton = document.querySelector(".start-button");
// add click event listener to the button
startButton.addEventListener("click", () => {
  // when clicked, navigate to the blind selector screen
  window.location.href = "blind.html";
  /* changes the browser's URL to blind.html, effectively moving the user to that page */
});
