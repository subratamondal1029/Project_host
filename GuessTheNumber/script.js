const form = document.querySelector("form");
const remainField = document.querySelector(".lastResult");
const previousField = document.querySelector(".guesses");
const hiorlow = document.querySelector(".lowOrHi");
let randomNum = Math.floor(Math.random() * 100 + 1);
let previousNums = [];
let remainNum = 10;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const guessNum = document.getElementById("guessField").value;
  if (guessNum == "" || isNaN(guessNum) || guessNum < 1) {
    alert("Enter a Valid Number");
  } else {
    checkValues(guessNum);
  }
});

function checkValues(guessNum) {
  remainNum--;
  remainField.textContent = remainNum;

  if (remainNum == 0) {
    result("Lost", randomNum);
  } else {
    previousNums.push(guessNum);
    showPrevious();

    if (guessNum == randomNum) {
      result("Won", randomNum);
    } else if (guessNum < randomNum) {
      HighorLow("Low");
    } else if (guessNum > randomNum) {
      HighorLow("High");
    }
  }
}

function result(type, num) {
  hiorlow.textContent = `You ${type} The Game, The Number Is ${num}`;

  restartGame();
}

function showPrevious() {
  const guesess = previousNums.join(",");
  previousField.textContent = guesess;
}

function HighorLow(type) {
  hiorlow.textContent = `Your Number Is Too ${type}`;
}

function restartGame() {
  previousNums = [];
  showPrevious();
  remainNum = 10;
  remainField.textContent = 10;
  document.getElementById("guessField").value = "";
  document.getElementById("guessField").disabled = true;
  randomNum = Math.floor(Math.random() * 100 + 1);
  setTimeout(() => {
    alert("New Game start");
    document.getElementById("guessField").disabled = false;
  }, 3000);
}
