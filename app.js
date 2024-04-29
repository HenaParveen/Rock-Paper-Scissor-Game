/// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const yourNumber = document.querySelector(".yourScore__number");
let myScore = 0;

const compNumber = document.querySelector(".comScore__number");
let compScore = 0;

const nextButton = document.querySelector(".next__button");
const nextBtn = document.querySelector("#next__btn");

const winnerWindow = document.querySelector("#winner__window");
const mainContainer = document.querySelector("#main__container");

// BEM

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];

// Event Listener Entry Point 1
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

//2 Entry Point
function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner(choice, aichoice);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
          <div class="choice ${results[idx].name}">
            <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
          </div>
        `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  // nextBtn.classList.remove("hidden");
  // nextBtn.classList.add("Next__btn");
}

function displayWinner(myChoice, compChoice) {
  setTimeout(() => {
    compareHands(myChoice.name, compChoice.name);
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

const userWins = () => {
  resultText.innerText = "YOU WIN";
  resultDivs[0].classList.toggle("winner");

  nextBtn.classList.remove("hidden");
  nextBtn.classList.add("Next__btn");
};

const compWins = () => {
  resultText.innerText = "YOU LOSE";
  resultDivs[1].classList.toggle("winner");
};

const compareHands = (playerChoice, computerChoice) => {
  //Checking for a tie
  if (playerChoice === computerChoice) {
    resultText.innerText = "DRAW";
    return;
  }
  //Check for Rock
  if (playerChoice === "rock") {
    if (computerChoice === "scissors") {
      userWins();
      myScore++;
      updateScore();
      return;
    } else {
      compWins();
      compScore++;
      updateScore();
      return;
    }
  }
  //Check for Paper
  if (playerChoice === "paper") {
    if (computerChoice === "scissors") {
      compWins();
      compScore++;
      updateScore();
      return;
    } else {
      userWins();
      myScore++;
      updateScore();
      return;
    }
  }
  //Check for Scissors
  if (playerChoice === "scissors") {
    if (computerChoice === "rock") {
      compWins();
      compScore++;
      updateScore();
      return;
    } else {
      userWins();
      myScore++;
      updateScore();
      return;
    }
  }
};

const updateScore = () => {
  yourNumber.textContent = myScore;
  compNumber.textContent = compScore;
};

// Play Again
playAgainBtn.addEventListener("click", () => {
  playAgainFun();
});

const playAgainFun = () => {
  nextBtn.classList.add("hidden");
  nextBtn.classList.remove("Next__btn");
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
};

btnRules.addEventListener("click", () => {
  const rulesWindow = document.querySelector("#rules-note");
  rulesWindow.classList.remove("hidden");
  rulesWindow.classList.add("show");
});

btnClose.addEventListener("click", () => {
  const rulesWindow = document.querySelector("#rules-note");
  rulesWindow.classList.remove("show");
  rulesWindow.classList.add("hidden");
});

nextBtn.addEventListener("click", () => {
  mainContainer.classList.add("hidden");
  winnerWindow.classList.remove("hidden");
  winnerWindow.classList.add("trophy__container");
});

const playAgain2 = document.querySelector(".play-again__2");
playAgain2.addEventListener("click", () => {
  //Extra Window
  mainContainer.classList.remove("hidden");
  winnerWindow.classList.remove("trophy__container");
  winnerWindow.classList.add("hidden");

  //then Re-render initial setup by calling the below function
  playAgainFun();
});
