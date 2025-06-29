// GAME

// SOUND EFFECTS
const clickSound = new Audio('sounds/click.mp3');
const winSound = new Audio('sounds/win.mp3');
const loseSound1 = new Audio('sounds/lose1.mp3');
const loseSound2 = new Audio('sounds/lose2.mp3');

function playLoseSequence() {
  loseSound1.play();
  loseSound1.onended = () => {
    loseSound2.play();
  };
}

function playSound(type) {
  switch (type) {
    case 'click':
      clickSound.play();
      break;
    case 'win':
      winSound.play();
      break;
    case 'lose':
      playLoseSequence();
      break;
  }
}

let playerScore = 0
let computerScore = 0
let roundWinner = ''

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    roundWinner = 'tie'
  }
  if (
    (playerSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
    (playerSelection === 'SCISSORS' && computerSelection === 'PAPER') ||
    (playerSelection === 'PAPER' && computerSelection === 'ROCK')
  ) {
    playerScore++
    roundWinner = 'player'
  }
  if (
    (computerSelection === 'ROCK' && playerSelection === 'SCISSORS') ||
    (computerSelection === 'SCISSORS' && playerSelection === 'PAPER') ||
    (computerSelection === 'PAPER' && playerSelection === 'ROCK')
  ) {
    computerScore++
    roundWinner = 'computer'
  }
  updateScoreMessage(roundWinner, playerSelection, computerSelection)
}

function getRandomChoice() {
  let randomNumber = Math.floor(Math.random() * 3)
  switch (randomNumber) {
    case 0:
      return 'ROCK'
    case 1:
      return 'PAPER'
    case 2:
      return 'SCISSORS'
  }
}

function isGameOver() {
  return playerScore === 5 || computerScore === 5
}

// UI

const scoreInfo = document.getElementById('scoreInfo')
const scoreMessage = document.getElementById('scoreMessage')
const playerScorePara = document.getElementById('playerScore')
const computerScorePara = document.getElementById('computerScore')
const playerSign = document.getElementById('playerSign')
const computerSign = document.getElementById('computerSign')
const rockBtn = document.getElementById('rockBtn')
const paperBtn = document.getElementById('paperBtn')
const scissorsBtn = document.getElementById('scissorsBtn')
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

rockBtn.addEventListener('click', () => handleClick('ROCK'))
paperBtn.addEventListener('click', () => handleClick('PAPER'))
scissorsBtn.addEventListener('click', () => handleClick('SCISSORS'))
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

function handleClick(playerSelection) {
  playSound('click');
  if (isGameOver()) {
    openEndgameModal()
    return
  }

  const computerSelection = getRandomChoice()
  playRound(playerSelection, computerSelection)
  updateChoices(playerSelection, computerSelection)
  updateScore()

  if (isGameOver()) {
    openEndgameModal()
    setFinalMessage()
  }
}

function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case 'ROCK':
      playerSign.textContent = '✊'
      break
    case 'PAPER':
      playerSign.textContent = '✋'
      break
    case 'SCISSORS':
      playerSign.textContent = '✌'
      break
  }
  playerSign.style.fontSize = '60px'
  playerSign.style.transition = 'transform 0.3s ease'
  playerSign.style.transform = 'scale(1.2)'
  setTimeout(() => {
    playerSign.style.transform = 'scale(1)'
  }, 300)

  switch (computerSelection) {
    case 'ROCK':
      computerSign.textContent = '✊'
      break
    case 'PAPER':
      computerSign.textContent = '✋'
      break
    case 'SCISSORS':
      computerSign.textContent = '✌'
      break
  }
  computerSign.style.fontSize = '60px'
  computerSign.style.transition = 'transform 0.3s ease'
  computerSign.style.transform = 'scale(1.2)'
  setTimeout(() => {
    computerSign.style.transform = 'scale(1)'
  }, 300)
}

function updateScore() {
  if (roundWinner === 'tie') {
    scoreInfo.textContent = "It's a tie!"
  } else if (roundWinner === 'player') {
    scoreInfo.textContent = 'You won!'
  } else if (roundWinner === 'computer') {
    scoreInfo.textContent = 'You lost!'
  }

  playerScorePara.textContent = `Player: ${playerScore}`
  computerScorePara.textContent = `Computer: ${computerScore}`
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
  if (winner === 'player') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} beats ${computerSelection.toLowerCase()}`
    return
  }
  if (winner === 'computer') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} is beaten by ${computerSelection.toLowerCase()}`
    return
  }

  scoreMessage.textContent = `${capitalizeFirstLetter(
    playerSelection
  )} ties with ${computerSelection.toLowerCase()}`
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function openEndgameModal() {
  endgameModal.classList.add('active')
  overlay.classList.add('active')
}

function closeEndgameModal() {
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}

function setFinalMessage() {
  if (playerScore > computerScore) {
    endgameMsg.textContent = '🎉 You Won the Game! 🎉'
  } else {
    endgameMsg.textContent = '😞 You Lost the Game... Try Again!'
  }
  endgameMsg.style.fontSize = '32px'
  endgameMsg.style.fontWeight = 'bold'
  if (playerScore > computerScore) {
    playSound('win');
  } else {
    playLoseSequence();
  }
}

function restartGame() {
  playerScore = 0
  computerScore = 0
  scoreInfo.textContent = 'Choose your weapon'
  scoreMessage.textContent = 'First to score 5 points wins the game'
  playerScorePara.textContent = 'Player: 0'
  computerScorePara.textContent = 'Computer: 0'
  playerSign.textContent = '❔'
  computerSign.textContent = '❔'
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}
// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();