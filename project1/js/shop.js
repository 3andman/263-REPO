// get the jokers to appear in the shop
import { jokers } from "./jokers.js";

const nextButton = document.getElementById("next-blind-button");

// click listener
nextButton.addEventListener("click", () => {
  window.location.href = "blind.html";
});
