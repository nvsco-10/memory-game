const buttons = document.querySelectorAll(".button");
const level = document.querySelector(".level");
const startButton = document.querySelector(".start-button");
const turnContainer = document.querySelector(".turn-container");
const turn = document.querySelector(".turn");
const gameOverContainer = document.querySelector(".game-over-container");
const restartButton = document.querySelector(".restart-button");
const color = document.querySelector(".color");

const gameButtons = ["red", "green", "yellow", "blue", "orange", "purple"];

let gameSequence = [];
let playerSequence = [];
let currentSequence = 0;
let currentLevel = 1;
let whoseTurn;
let gameOver;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const playerMove = e.target.id;

    const button = document.getElementById(playerMove);

    button.classList.add("pressed");
    playSound(playerMove);
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
      playSound(move);
      animateButton(move);

    }, i * 1000)
  })

  setTimeout(() => {
    displayTurn("your")
  }, (gameSequence.length) * 1000)

}

const checkSequence = () => {
  if(gameSequence[currentSequence] === playerSequence[currentSequence]) {

    if(currentSequence < gameSequence.length - 1 ){
      currentSequence++;
    } else {
      updateLevel();

      setTimeout(() => {
        displayTurn("computer");
      }, 1000)

      setTimeout(() => {
        nextSequence();
      }, 1500)
    }

  } else {
    gameOver = true;
    turnContainer.classList.remove("show");
    startButton.classList.remove("show");
    gameOverContainer.classList.add("show");
  }
  
}

const updateLevel = () => {
  currentLevel++;
  level.textContent = currentLevel;
}

const displayTurn = (player) => {
  whoseTurn = player;
  turn.textContent = `${whoseTurn} turn`;
}

const animateButton = (buttonId) => {
  const button = document.getElementById(buttonId);

  button.classList.add("pressed");
  playSound(buttonId)
  setTimeout(() => {
    button.classList.remove("pressed");
  }, 300);
}

const playSound = (btnId) => {
  const audio = new Audio(`./assets/${btnId}.mp3`);
  audio.play();
}

const randomNumber = () => {
  return Math.floor(Math.random() * 6);
};

const startGame = () => {
  resetGame();
  gameOver = false;

  startButton.classList.remove('show');
  turnContainer.classList.add('show');
  displayTurn("computer");

  setTimeout(() => {
    nextSequence();
  }, 2000);
}

const resetGame = () => {
  currentLevel = 1;
  currentSequence = 0;
  playerSequence = [];
  gameSequence = [];

  level.textContent = currentLevel;
}

restartButton.addEventListener("click", () => {
  gameOverContainer.classList.remove("show");
  startGame();
});

startButton.addEventListener("click", startGame)
