// find the start button
const startButton = document.querySelector(".start-button");

// add click event listener
startButton.addEventListener("click", () => {
  // reset saved blind progress
  localStorage.removeItem("defeatedBlind");
  localStorage.removeItem("selectedBlind");

  // navigate to blind select screen
  window.location.href = "blind.html";
});
