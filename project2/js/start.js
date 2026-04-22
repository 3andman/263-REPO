// find the start button
const startButton = document.querySelector(".start-button");
const guideButton = document.getElementById("guide-button");
const guidePopup = document.getElementById("guide-popup");
const closeGuide = document.getElementById("close-guide");

// add click event listener
startButton.addEventListener("click", () => {
  // reset saved blind progress
  localStorage.removeItem("defeatedBlind");
  localStorage.removeItem("selectedBlind");

  // navigate to blind select screen
  window.location.href = "blind.html";
});

// open popup
guideButton.addEventListener("click", () => {
  guidePopup.classList.remove("hidden");
});

// close with X
closeGuide.addEventListener("click", () => {
  guidePopup.classList.add("hidden");
});

// close when clicking background
guidePopup.addEventListener("click", (e) => {
  if (e.target === guidePopup) {
    guidePopup.classList.add("hidden");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    guidePopup.classList.add("hidden");
  }
});