let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function startStop() {
  if (!timerInterval) {
    // Ensure startTime is initialized to current time only if it's the first start after reset
    if (!startTime) {
      startTime = Date.now();
    }
    timerInterval = setInterval(updateTime, 10);
    startStopBtn.textContent = 'Stop';
    lapBtn.disabled = false;
  } else {
    clearInterval(timerInterval);
    timerInterval = null;
    startStopBtn.textContent = 'Start';
    lapBtn.disabled = true;
  }
}

function updateTime() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  display.textContent = formatTime(elapsedTime);
}

function reset() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  startTime = null; // Reset startTime to null when reset
  display.textContent = '00:00:00';
  startStopBtn.textContent = 'Start';
  lapBtn.disabled = true;
  lapsList.innerHTML = '';
}

function lap() {
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapsList.appendChild(lapItem);
}

function formatTime(time) {
  const date = new Date(time);
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(date.getMilliseconds() / 10).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

reset(); // Call reset function initially to set display to "00:00:00"

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
