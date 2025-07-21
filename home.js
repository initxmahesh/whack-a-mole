let score = 0;
let secondsRemaining = 30;
let moleIntervalId = null;
let timerIntervalId = null;

const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const holes = Array.from(document.getElementsByClassName('hole'));
const gameArea = document.getElementById('whack-a-mole');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
function handleClick(e) {
  if (e.target.matches('.mole')) {
    e.target.classList.remove('mole');
    score++;
    scoreDisplay.innerText = 'Moles whacked: ' + score;
  }
}
function showMoles() {
  moleIntervalId = setInterval(() => {
    const randomHoleIndex = Math.floor(Math.random() * holes.length);
    holes[randomHoleIndex].classList.toggle('mole');
  }, 300);
}
function startTimer() {
  timerDisplay.innerText = 'Time remaining: ' + formatTime(secondsRemaining);
  timerIntervalId = setInterval(() => {
    secondsRemaining--;
    timerDisplay.innerText = 'Time remaining: ' + formatTime(secondsRemaining);
    if (secondsRemaining <= 0) {
      stopGame();
    }
  }, 1000);
}
function startGame() {
  score = 0;
  secondsRemaining = 30;
  scoreDisplay.innerText = 'Moles whacked: 0';
  timerDisplay.innerText = 'Time remaining: ' + formatTime(secondsRemaining);
  gameArea.addEventListener('click', handleClick);
  showMoles();
  startTimer();
}
function stopGame() {
  clearInterval(timerIntervalId);
  clearInterval(moleIntervalId);
  gameArea.removeEventListener('click', handleClick);
  holes.forEach(hole => hole.classList.remove('mole'));
}
function resetGame() {
  stopGame();
  score = 0;
  secondsRemaining = 30;
  scoreDisplay.innerText = 'Moles whacked: 0';
  timerDisplay.innerText = 'Time remaining: ' + formatTime(secondsRemaining);
}
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);
