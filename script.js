const buttons = document.querySelectorAll(".button");

const gameButtons = ["red", "green", "yellow", "blue", "orange", "purple"];

let gameSequence = [];

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const playerMove = e.target.id;

    const button = document.getElementById(playerMove);

    button.classList.add("pressed");
    setTimeout(() => {
      button.classList.remove("pressed");
    }, 300);
  })
})

const nextSequence = () => {
  // generate random number to represent next move in sequence
  const move = randomNumber();
  gameSequence.push(gameButtons[move]);
  
  gameSequence.forEach((move, i) => {
    setTimeout(() => {
      animateButton(move);
    }, i * 1000)
  })
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
  nextSequence();

}

startGame();