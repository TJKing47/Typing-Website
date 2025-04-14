// script.js
const words = [
  "programming", "challenge", "javascript", "developer",
  "keyboard", "project", "function", "variable",
  "object", "interface", "github", "portfolio"
];

let currentWord = "";
let timer;
let timeLeft = 30;
let correctChars = 0;
let totalChars = 0;
let wordCount = 0;

const wordDisplay = document.getElementById("wordDisplay");
const typedInput = document.getElementById("typedInput");
const timeSpan = document.getElementById("time");
const wpmSpan = document.getElementById("wpm");
const accuracySpan = document.getElementById("accuracy");
const restartBtn = document.getElementById("restartBtn");

function setRandomWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  wordDisplay.textContent = currentWord;
  typedInput.value = "";
}

function startGame() {
  setRandomWord();
  timeLeft = 30;
  correctChars = 0;
  totalChars = 0;
  wordCount = 0;
  timeSpan.textContent = timeLeft;
  typedInput.disabled = false;
  typedInput.focus();

  timer = setInterval(() => {
    timeLeft--;
    timeSpan.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      typedInput.disabled = true;
    }
  }, 1000);
}

typedInput.addEventListener("input", () => {
  const typed = typedInput.value;
  totalChars += 1;
  if (typed === currentWord) {
    correctChars += currentWord.length;
    wordCount++;
    setRandomWord();
  }
  updateStats();
});

function updateStats() {
  const accuracy = totalChars ? Math.round((correctChars / totalChars) * 100) : 100;
  const wpm = wordCount * 2; // simple estimation for 30s
  accuracySpan.textContent = accuracy;
  wpmSpan.textContent = wpm;
}

restartBtn.addEventListener("click", () => {
  clearInterval(timer);
  startGame();
});

window.onload = startGame;
