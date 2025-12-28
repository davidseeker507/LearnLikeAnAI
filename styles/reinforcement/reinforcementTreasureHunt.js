// ===== STEP 1: SET UP YOUR CONSTANTS AND VARIABLES =====
// line grid size - how many rows and columns do you want?
// Hint: Use const for values that won't change
// Example: const rows = 5;
const rows = 10;
const cols = 10;

// TODO: Get references to HTML elements you'll need to update
// Hint: Use document.getElementById() for each element ID from your HTML
// You need: grid, score-display, feedback, episode-count, reset-btn, nextBtn
// Example: const gridEl = document.getElementById('grid');
let gameContainer = document.getElementById('game-container');
let gridDisplay = document.getElementById('grid');
const scoreDisplay = document.getElementById('score-display');
let feedback = document.getElementById('feedback')
let episodeCount = document.getElementById('episode-count');
const resetBtn = document.getElementById('reset-btn');
const downBtn = document.getElementById('down-btn');
const upBtn = document.getElementById('up-btn');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
const nextBtn = document.getElementById('nextBtn');
nextBtn.disabled = true;
nextBtn.style.display = 'none';

// Tracking + UI helpers
let treasureRow = null;
let treasureCol = null;
let movesThisEpisode = 0;

// lightweight info panel creation (if not present in HTML)
let hintDisplay = document.getElementById('hint-display');
let pirateDisplay = document.getElementById('pirate-warning');
let moveDisplay = document.getElementById('move-count');
if (!hintDisplay || !pirateDisplay || !moveDisplay) {
  const infoPanel = document.createElement('div');
  infoPanel.id = 'info-panel';
  infoPanel.style.marginTop = '12px';
  infoPanel.style.display = 'grid';
  infoPanel.style.gap = '6px';

  hintDisplay = hintDisplay || document.createElement('div');
  hintDisplay.id = 'hint-display';
  pirateDisplay = pirateDisplay || document.createElement('div');
  pirateDisplay.id = 'pirate-warning';
  moveDisplay = moveDisplay || document.createElement('div');
  moveDisplay.id = 'move-count';

  infoPanel.appendChild(hintDisplay);
  infoPanel.appendChild(pirateDisplay);
  infoPanel.appendChild(moveDisplay);

  const controlsEl = document.getElementById('controls') || gameContainer;
  controlsEl?.insertAdjacentElement('afterend', infoPanel);
}

let TREASURE = 100;
const StepPoints =-1;
const PIRATE_PENALTY = -50;
const PIRATE_COUNT = 5;
let gameOver = false;



let episodeNumber = 1;
let playerPoints = 0;
let playerCols = 0;
let playerRows = 0;


const grid = Array.from({length: rows}, (_,r) => 
  Array.from({length: cols}, (_,c) => ({
    type: 'empty',
    stepCost: -1,
    reward: 1,
    Element: null,
  }))
);

for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++){
    const cellEl = document.createElement('div');
    cellEl.className = 'grid-cell';
    cellEl.id = 'cell, ${r}, ${c}';
    grid[r][c].element = cellEl;
    gridDisplay.appendChild(cellEl);
  }
}

grid[playerRows][playerCols].type = 'player';
grid[playerRows][playerCols].reward = 0;

playerPoints = 0;
placeRandomTreasure();
placeRandomPirates(PIRATE_COUNT);
updateHints();

function updateCellVisual(rows, cols){
  const cell = grid[rows][cols];
  const el = cell.element || cell.Element; // handle current naming
  if (!el) return; // no DOM element yet

  el.classList.remove('player', 'treasure', 'empty', 'pirate');
  el.textContent = '';

  if (cell.type === 'player') {
    el.classList.add('player');
    el.textContent = '👤';
  } else if (cell.type === 'treasure' || cell.type === 'pirate') {
    // hide treasure/pirates from view; render as empty
    el.classList.add('empty');
  } else {
    el.classList.add('empty');
  }
}

// place a treasure at a random spot that is not the player's current cell
function placeRandomTreasure() {
  let r, c;
  do {
    r = Math.floor(Math.random() * rows);
    c = Math.floor(Math.random() * cols);
  } while (r === playerRows && c === playerCols);

  // clear any existing treasure markers
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j].type === 'treasure') {
        grid[i][j].type = 'empty';
        updateCellVisual(i, j);
      }
    }
  }

  grid[r][c].type = 'treasure';
  grid[r][c].reward = TREASURE;
  treasureRow = r;
  treasureCol = c;
  updateCellVisual(r, c);
}

// scatter a set number of pirates, avoiding player and treasure
function placeRandomPirates(count) {
  let placed = 0;
  while (placed < count) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);

    // avoid start position and treasure
    if (r === playerRows && c === playerCols) continue;
    if (grid[r][c].type === 'treasure') continue;
    if (grid[r][c].type === 'pirate') continue;

    grid[r][c].type = 'pirate';
    grid[r][c].reward = PIRATE_PENALTY;
    updateCellVisual(r, c);
    placed++;
  }
}

function hasAdjacentPirate(row, col) {
  const directions = [
    [1,0],[-1,0],[0,1],[0,-1]
  ];
  return directions.some(([dr, dc]) => {
    const nr = row + dr;
    const nc = col + dc;
    return nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc].type === 'pirate';
  });
}

function updateHints() {
  if (!hintDisplay || !pirateDisplay || !moveDisplay) return;
  if (treasureRow === null || treasureCol === null) return;

  const distance = Math.abs(playerRows - treasureRow) + Math.abs(playerCols - treasureCol);
  hintDisplay.textContent = `Treasure radar: ${distance} steps away`;

  const danger = hasAdjacentPirate(playerRows, playerCols);
  pirateDisplay.textContent = danger ? 'Pirate sensor: danger nearby!' : 'Pirate sensor: clear';

  moveDisplay.textContent = `Moves this run: ${movesThisEpisode}`;
}

function movePlayer(direction){
  if (gameOver) return;

  let newRows = playerRows;
  let newCols = playerCols;

  if (direction === 'up') newRows--;
  else if (direction === 'down') newRows++;
  else if (direction === 'left') newCols--;
  else if (direction === 'right') newCols++;

  //bounds check after movement
  if (newRows < 0 || newRows >= rows || newCols < 0 || newCols >= cols) {
    feedback.textContent = 'Cannot do action';
    setTimeout(() => (feedback.textContent = ''), 1500);
    return;
  }

  // cache target cell info before overwriting
  const targetCell = grid[newRows][newCols];
  const targetType = targetCell.type;
  const targetReward = targetCell.reward;

  // clear old cell
  grid[playerRows][playerCols].type = 'empty';
  updateCellVisual(playerRows, playerCols);

  // move
  playerRows = newRows;
  playerCols = newCols;
  grid[playerRows][playerCols].type = 'player';
  updateCellVisual(playerRows, playerCols);

  movesThisEpisode += 1;
  updateHints();

  handleReward({ type: targetType, reward: targetReward });
};

// disable movement buttons after game over
function disableMovement() {
  upBtn.disabled = true;
  downBtn.disabled = true;
  leftBtn.disabled = true;
  rightBtn.disabled = true;
}

function handleReward(cell) {
  console.log(cell.reward);
  playerPoints += cell.reward;
  console.log(`playerPoints = ${playerPoints}`)
  updateScore();

  if (cell.type === 'treasure') {
    gameOver = true;
    feedback.style.color = 'green';
    feedback.textContent = 'You found the treasure! 🎉';
    disableMovement();
    alert('You found the treasure! 🎉');
    nextBtn.disabled = false;
    nextBtn.style.display = 'inline-block';
  } else if (cell.type === 'pirate') {
    gameOver = true;
    feedback.style.color = 'red';
    feedback.textContent = 'Caught by pirates! Press Reset.';
    disableMovement();
    alert('Caught by pirates! Press Reset to try again.');
  } else {
    feedback.textContent = 'Step taken';
    feedback.style.color = cell.reward > 0 ? 'green' : 'red';
  }
  setTimeout(() => { if (!gameOver) feedback.textContent = ''; }, 1500);
}


function updateScore() {
  scoreDisplay.textContent = `Score : ${playerPoints}`
  scoreDisplay.style.transform = 'scale(1.2)'
  setTimeout(() => scoreDisplay.style.transform = 'scale(1)',1500)
}


function endEpisode(){
  gameOver = true;
  feedback.textContent = 'Completed'
  upBtn.disabled = true;
  downBtn.disabled = true;
  leftBtn.disabled = true;
  rightBtn.disabled = true;
  setTimeout(() => nextBtn.disabled = false, 3000);
}

function resetsGame() {
  playerPoints = 0;
  episodeNumber++;
  gameOver = false;
  movesThisEpisode = 0;

  // reset player position indices
  playerRows = 0;
  playerCols = 0;

  // clear grid types
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid[r][c].type = 'empty';
      updateCellVisual(r, c);
    }
  }

  // set start and treasure
  grid[0][0].type = 'player';
  grid[0][0].reward = 0;
  placeRandomTreasure();
  placeRandomPirates(PIRATE_COUNT);

  // UI and state resets
  upBtn.disabled = downBtn.disabled = leftBtn.disabled = rightBtn.disabled = false;
  nextBtn.disabled = true;
  nextBtn.style.display = 'none';
  feedback.textContent = '';
  episodeCount.textContent = `Episode: ${episodeNumber}`;

  // redraw key cells and score
  updateCellVisual(0, 0);
  updateCellVisual(rows - 1, cols - 1);
  updateScore();
  updateHints();
}

document.getElementById('up-btn').addEventListener('click', () => movePlayer('up', console.log('eventclickerUP')));
document.getElementById('down-btn').addEventListener('click', () => movePlayer('down'));
document.getElementById('left-btn').addEventListener('click', () => movePlayer('left'));
document.getElementById('right-btn').addEventListener('click', () => movePlayer('right'));
document.getElementById('reset-btn').addEventListener('click', () => resetsGame());


updateScore();
episodeCount =  1;