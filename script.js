let wordText, hintText, refreshBtn, checkBtn, correctWord, inputField, errorLbl, successLbl, timerEl, scoreEl;
let usedWords = [];
let score = 0;
let timeLeft = 60;
let currentQuestion = 0;
let timer;

window.addEventListener("DOMContentLoaded", () => {
  wordText = document.querySelector(".word");
  hintText = document.querySelector(".hint span");
  inputField = document.querySelector(".input");
  refreshBtn = document.querySelector(".refresh-word");
  checkBtn = document.querySelector(".check-word");
  errorLbl = document.querySelector(".lblWrong");
  successLbl = document.querySelector(".lblCorrect");
  timerEl = document.querySelector(".timer");
  scoreEl = document.querySelector(".score-value");

  refreshBtn.addEventListener("click", () => {
    if (currentQuestion < 10) initGame();
  });
  checkBtn.addEventListener("click", checkWord);

  startGame();
});

function startGame() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
  initGame();
}

function clearLabelMessage() {
  errorLbl.innerText = "";
  successLbl.innerText = "";
}

function initGame() {
  clearLabelMessage();
  inputField.value = "";

  if (usedWords.length >= 10) {
    endGame();
    return;
  }

  let availableWords = words.filter(w => !usedWords.includes(w.word.toLowerCase()));
  if (availableWords.length === 0) {
    endGame();
    return;
  }

  let randomObj = availableWords[Math.floor(Math.random() * availableWords.length)];
  usedWords.push(randomObj.word.toLowerCase());

  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }

  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;
  correctWord = randomObj.word.toLowerCase();
  currentQuestion++;
}

function checkWord() {
  let userWord = inputField.value.trim().toLowerCase();
  clearLabelMessage();

  if (!userWord) {
    errorLbl.innerText = "Please enter a word to check.";
  } else if (userWord !== correctWord) {
    errorLbl.innerText = `Oops! "${userWord}" is not correct.`;
  } else {
    successLbl.innerText = `Congrats! "${userWord.toUpperCase()}" is correct!`;
    score++;
    scoreEl.textContent = score;
    setTimeout(() => {
      if (currentQuestion < 10) {
        initGame();
      } else {
        endGame();
      }
    }, 800);
  }
}

function endGame() {
  clearInterval(timer);
  wordText.innerText = "";
  document.querySelector(".game-over").style.display = "block";
  document.querySelector(".final-score").textContent = `Your Score: ${score} out of 10`;
  refreshBtn.disabled = true;
  checkBtn.disabled = true;
  inputField.disabled = true;
}

// Add Play Again button handler
document.addEventListener("DOMContentLoaded", () => {
  const playAgainBtn = document.createElement("button");
  playAgainBtn.textContent = "Play Again";
  playAgainBtn.className = "play-again";
  document.querySelector(".game-over").appendChild(playAgainBtn);

  playAgainBtn.addEventListener("click", () => {
    // Reset game state
    usedWords = [];
    score = 0;
    timeLeft = 60;
    currentQuestion = 0;
    inputField.disabled = false;
    refreshBtn.disabled = false;
    checkBtn.disabled = false;
    scoreEl.textContent = "0";
    timerEl.textContent = "60";
    document.querySelector(".game-over").style.display = "none";
    startGame();
  });
});
