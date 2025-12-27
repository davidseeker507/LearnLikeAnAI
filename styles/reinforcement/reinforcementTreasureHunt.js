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
// TODO: Define reward values as  constants
// Hint: Treasure should give positive points, steps should cost something
// Example: const TREASURE_REWARD = 100;
let TREASURE = 100;
const StepPoints =-1;
const Pirates =- 50;
let gameOver = false;

// TODO: Create game state variables
// Hint: You need to track: grid array, player position (row and col), score, episode number, gameOver flag
// Use let for variables that will change
// Example: let playerRow = 0;

let episodeNumber = 1;
let playerPoints = 0;
let playerCols = 0;
let playerRows = 0;

// ===== STEP 2: CREATE THE GRID DATA STRUCTURE =====
// TODO: Initialize your grid as a 2D array
// Hint: Use Array.from() to create an array of a certain length
// Each cell should be an object with: type, reward, row, col, element
// The element property will store the DOM element you create later
// Example structure: grid = Array.from({ length: rows }, (_, r) => ...)
// Inside that, create another Array.from for columns
// Each cell object: { type: 'empty', reward: STEP_COST, row: r, col: c, element: null }
const grid = Array.from({length: rows}, (_,r) => 
  Array.from({length: cols}, (_,c) => ({
    type: 'empty',
    stepCost: -1,
    reward: 1,
    Element: null,
  }))
);
//Array.from makes an array that is the length of rows which is 10, and then it gives each different one the index of r which would just be 0 to 9 saying that the length is 10, so it goes 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. Then an arrow function to declare that from each one's one of those values from this array. Now also add an array with each different value from the array which is length columns, and then also give it a second index of columns. Then another arrow function to give each single one attribute. This creates a grid form which each one having its own corresponding value which is pretty cool.
// ===== STEP 3: CREATE VISUAL GRID CELLS =====
// TODO: Loop through your grid array (nested loops: rows, then columns)
// Hint: for (let r = 0; r < rows; r++) { for (let c = 0; c < cols; c++) { ... } }
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++){
    const cellEl = document.createElement('div');
    cellEl.className = 'grid-cell';
    cellEl.id = 'cell, ${r}, ${c}';
    grid[r][c].element = cellEl;
    gridDisplay.appendChild(cellEl);
  }
}
// TODO: Inside the loops, create a div element for each cell
// Hint: Use document.createElement('div')
// Give it a class name like 'grid-cell'
// Give it an ID like `cell-${r}-${c}` so you can find it later

// TODO: Store the element reference in your grid cell object
// Hint: grid[r][c].element = cellEl;

// TODO: Add the cell element to the grid container
// Hint: Use gridEl.appendChild(cellEl)

// ===== STEP 4: SET UP STARTING POSITIONS =====
// TODO: Mark the starting cell (0, 0) as type 'player'
// Hint: grid[playerRow][playerCol].type = 'player';
// Also set its reward to 0 (no reward for starting position)
grid[playerRows][playerCols].type = 'player';
grid[playerRows][playerCols].reward = 0;

playerPoints = 0;
grid[rows-1][cols-1].type = 'treasure';
grid[rows - 1][cols - 1].reward = TREASURE;

// TODO: Place treasure at the bottom-right corner
// Hint: Use rows - 1 and cols - 1 for the last position
// Set that cell's type to 'treasure' and reward to TREASURE_REWARD

// TODO: Create a function to update cell visuals
// Function name: updateCellVisual(row, col)
// Inside: Get the cell from grid[row][col]
// Get the cell's element (cell.element)
// Remove all type classes (classList.remove)
// Add the appropriate class based on cell.type (classList.add)
// Optionally add emoji or text: if player show '👤', if treasure show '💰'
function updateCellVisual(rows, cols){
  const cell = grid[rows][cols];
  const el = cell.element || cell.Element; // handle current naming
  if (!el) return; // no DOM element yet

  el.classList.remove('player', 'treasure', 'empty', 'pirate');
  el.textContent = '';

  if (cell.type === 'player') {
    el.classList.add('player');
    el.textContent = '👤';
  } else if (cell.type === 'treasure') {
    el.classList.add('treasure');
    el.textContent = '💰';
  } else if (cell.type === 'pirate') {
    el.classList.add('pirate');
    el.textContent = '🏴‍☠️';
  } else {
    el.classList.add('empty');
  }
}


// ===== STEP 5: CREATE MOVEMENT FUNCTION =====
// TODO: Create a function called movePlayer that takes a direction parameter
// Function: movePlayer(direction)
// Directions will be: 'up', 'down', 'left', 'right'

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

  // clear old cell
  grid[playerRows][playerCols].type = 'empty';
  updateCellVisual(playerRows, playerCols);

  // move
  playerRows = newRows;
  playerCols = newCols;
  grid[playerRows][playerCols].type = 'player';
  updateCellVisual(playerRows, playerCols);

  handleReward(grid[playerRows][playerCols]);
};

// ===== STEP 6: CREATE REWARD HANDLING FUNCTION =====
// TODO: Create function handleReward(cell)
// This function receives the cell the player just moved to
function handleReward(cell) {
  console.log(cell.reward);
  playerPoints += cell.reward;
  console.log(`playerPoints = ${playerPoints}`)
  updateScore();

  if (cell.type === 'treasure'){
    gameOver = true;
    feedback.textContent = 'YOU FOUND THE TREASURE';
  }  else{
    feedback.textContent = 'Step taken'
    if (cell.reward > 0) {
      feedback.style.color = 'green'
      feedback.textContent = 'Gained'
    } else{
      feedback.style.color = 'red'
      feedback.textContent = 'Gained'
    }
  }
  setTimeout(() =>{feedback.textContent = ''}, 1500);
}

// ===== STEP 7: CREATE SCORE UPDATE FUNCTION =====
// TODO: Create function updateScore()
// Update the score display text: scoreDisplay.textContent = `Score: ${score}`
function updateScore() {
  scoreDisplay.textContent = `Score : ${playerPoints}`
  scoreDisplay.style.transform = 'scale(1.2)'
  setTimeout(() => scoreDisplay.style.transform = 'scale(1)',1500)
}

// ===== STEP 8: CREATE EPISODE END FUNCTION =====
// TODO: Create function endEpisode()
// Set gameOver = true
// Show completion message in feedback
// Disable all movement buttons (loop through buttons, set disabled = true)
// After a delay, show the next button
function endEpisode(){
  gameOver = true;
  feedback.textContent = 'Completed'
  upBtn.disabled = true;
  downBtn.disabled = true;
  leftBtn.disabled = true;
  rightBtn.disabled = true;
  setTimeout(() => nextBtn.disabled = false, 3000);
}

// ===== STEP 9: CREATE RESET FUNCTION =====
// TODO: Create function resetGame()
// Reset score to 0
// Increment episode number
// Set gameOver = false
// Reset player position to (0, 0)
// Update old player position cell back to 'empty'
// Set new player position cell to 'player'
// Reset treasure position (in case you randomize it later)
// Update all displays (score, episode count, feedback)
// Re-enable all buttons
// Hide next button
// Call updateCellVisual for all changed cells
function resetsGame() {
  playerPoints = 0;
  episodeNumber++;
  gameOver = false;

  // clear grid types
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      grid[r][c].type = 'empty';
    }
  }

  grid[0][0].type = 'player';
  grid[0][0].reward = 0;
  grid[rows - 1][cols - 1].type = 'treasure';
  grid[rows - 1][cols - 1].reward = TREASURE;

  upBtn.disabled = downBtn.disabled = leftBtn.disabled = rightBtn.disabled = false;
  nextBtn.disabled = true;
  feedback.textContent = '';
  episodeCount.textContent = `Episode: ${episodeNumber}`;

  // redraw key cells
  updateCellVisual(0, 0);
  updateCellVisual(rows - 1, cols - 1);
  updateScore();
}

// ===== STEP 10: ADD EVENT LISTENERS =====
// TODO: Add click listeners to all direction buttons
// Hint: c
// Do this for: up-btn, down-btn, left-btn, right-btn and also for reset
document.getElementById('up-btn').addEventListener('click', () => movePlayer('up', console.log('eventclickerUP')));
document.getElementById('down-btn').addEventListener('click', () => movePlayer('down'));
document.getElementById('left-btn').addEventListener('click', () => movePlayer('left'));
document.getElementById('right-btn').addEventListener('click', () => movePlayer('right'));
document.getElementById('reset-btn').addEventListener('click', () => resetsGame());

// ===== STEP 11: INITIALIZE THE GAME =====
// TODO: Call updateScore() to set initial score display
// TODO: Set initial episode count display
// TODO: Make sure all cells are visually updated
updateScore();
episodeCount =  1;

// ===== BONUS CHALLENGES (Once basic game works) =====
// TODO: Add obstacles that give penalties
// TODO: Randomize treasure position each episode
// TODO: Track number of moves per episode
// TODO: Show best path found
// TODO: Add keyboard controls (arrow keys)
// TODO: Add visual path showing where player has been
// TODO: Add animation when moving between cells
