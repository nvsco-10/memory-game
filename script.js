const buttons = document.querySelectorAll(".button");
const level = document.querySelector(".level");
const gameOver = document.querySelector(".game-over")
const restartButton = document.querySelector(".restart-button");
const color = document.querySelector(".color");

const gameButtons = ["red", "green", "yellow", "blue", "orange", "purple"];

let gameSequence = [];
let playerSequence = [];
let currentSequence = 0;
let currentLevel = 0;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const playerMove = e.target.id;

    const button = document.getElementById(playerMove);

    button.classList.add("pressed");
    setTimeout(() => {
      button.classList.remove("pressed");
    }, 300);

    playerSequence.push(playerMove)
    checkSequence();
  })
})

const nextSequence = () => {
  // clear player sequence
  playerSequence = [];
  currentSequence = 0;

  // generate random number to represent next move in sequence
  const move = randomNumber();
  gameSequence.push(gameButtons[move]);
  
  // 1s delay in between each sequence
  gameSequence.forEach((move, i) => {
    setTimeout(() => {
      animateButton(move);
    }, i * 1000)
  })
}

const checkSequence = () => {
  if(gameSequence[currentSequence] === playerSequence[currentSequence]) {

    if(currentSequence < gameSequence.length - 1 ){
      currentSequence++;
    } else {
      updateLevel();
      setTimeout(() => {
        nextSequence();
      }, 1000)
    }

  } else {
    console.log("game over")
    restartButton.style.visibility = "visible";
    gameOver.style.visibility = "visible";
  }
  
}

const updateLevel = () => {
  currentLevel++;
  level.textContent = currentLevel;
}

const animateButton = (buttonId) => {
  const button = document.getElementById(buttonId);

  button.classList.add("pressed");
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 300);
}

const randomNumber = () => {
  return Math.floor(Math.random() * 6);
};

const startGame = () => {
  resetGame();

  setTimeout(() => {
    nextSequence();
  }, 2000);
}

const resetGame = () => {
  currentLevel = 0;
  currentSequence = 0;
  playerSequence = [];
  gameSequence = [];

  level.textContent = currentLevel;
  restartButton.style.visibility = "hidden";
  gameOver.style.visibility = "hidden";
}

restartButton.addEventListener("click", () => {
  startGame();
});

startGame();