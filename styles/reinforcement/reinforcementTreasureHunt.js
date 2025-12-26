// ===== STEP 1: SET UP YOUR CONSTANTS AND VARIABLES =====
for (let i = 0; i < 100; i++){
  console.log(i)
}
// TODO: Define grid size - how many rows and columns do you want?
// Hint: Use const for values that won't change
// Example: const rows = 5;
const rows = 10;
const cols = 10;

// TODO: Get references to HTML elements you'll need to update
// Hint: Use document.getElementById() for each element ID from your HTML
// You need: grid, score-display, feedback, episode-count, reset-btn, nextBtn
// Example: const gridEl = document.getElementById('grid');
let gameContainer = document.getElementById('game-container');
let gridDisplay = document.getElementsById('grid');
const scoreDisplay = document.getElementsById('score-display');
let feedback = document.getElementById('feedback')
let episodeCount = document.getElementById('episode-count');
const resetBtn = document.getElementById('reset-btn');
const downBtn = document.getElementById('down-btn');
const upBtn = document.getElementById('up-btn');
const leftBtn = document.getElementById('left-btn');
const rightBtn = document.getElementById('right-btn');
// TODO: Define reward values as  constants
// Hint: Treasure should give positive points, steps should cost something
// Example: const TREASURE_REWARD = 100;
const TREASURE = 100;
const StepPoints =-1
const Pirates =- 50
const gameOver = false

// TODO: Create game state variables
// Hint: You need to track: grid array, player position (row and col), score, episode number, gameOver flag
// Use let for variables that will change
// Example: let playerRow = 0;
let playerPoints = 0;
let playerCol = 0;
let playerRow = 0;

// ===== STEP 2: CREATE THE GRID DATA STRUCTURE =====
// TODO: Initialize your grid as a 2D array
// Hint: Use Array.from() to create an array of a certain length
// Each cell should be an object with: type, reward, row, col, element
// The element property will store the DOM element you create later
// Example structure: grid = Array.from({ length: rows }, (_, r) => ...)
// Inside that, create another Array.from for columns
// Each cell object: { type: 'empty', reward: STEP_COST, row: r, col: c, element: null }
grid = Array.from({length: rows}, (_,r) => 
  Array.from({length: cols}), (_,c) =>
  {
  type: 'empty'
  stepCost: -1
  reward: null;
  Element: null;
  }
)
//Array.from makes an array that is the length of rows which is 10, and then it gives each different one the index of r which would just be 0 to 9 saying that the length is 10, so it goes 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. Then an arrow function to declare that from each one's one of those values from this array. Now also add an array with each different value from the array which is length columns, and then also give it a second index of columns. Then another arrow function to give each single one attribute. This creates a grid form which each one having its own corresponding value which is pretty cool.
// ===== STEP 3: CREATE VISUAL GRID CELLS =====
// TODO: Loop through your grid array (nested loops: rows, then columns)
// Hint: for (let r = 0; r < rows; r++) { for (let c = 0; c < cols; c++) { ... } }
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++){
    const cell = document.createElement('div');
    cell.id = 'cell, ${r}, ${c}'

    document.body.appendChild(cell);
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
grid[playerRow][playerCol].type = 'player'
playerPoints = 0;

grid[row - 1][col - 1].type = 'treasure'

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
function updateCellVisual(row, col){
    const cell = grid[row][col]
    const el = cell.Element
    el.classList.remove('player')
    el.textContent = ''
    
    if (cell.type === 'player'){
      el.classList.add('player');
      el.textContent = '👤';
    }
}
// TODO: Call updateCellVisual for player and treasure positions
updateCellVisual()
// ===== STEP 5: CREATE MOVEMENT FUNCTION =====
// TODO: Create a function called movePlayer that takes a direction parameter
// Function: movePlayer(direction)
// Directions will be: 'up', 'down', 'left', 'right'

function movePlayer(direction){
  if (gameOver) return

  let newRow = playerRow
  let newCol = playerCol
  let direction = ''
  if (direction === 'up'){
    newRow--;
  }
  else if (direction === 'down'){
    newRow++;
  }
  else if (direction === 'left'){
    newCol--;
  }
  else if (direction === 'right'){
    newCol++;
  }
  if ( 9 >= newRow >= 0 && 9 >= newCol >= 0 ){
    return
  } else{
    feedback.append('Cannot do action')
    console.log
  }

}

// TODO: Calculate new position based on direction
// Hint: Create variables newRow and newCol, start with current playerRow and playerCol
// Then modify based on direction:
//   up: newRow--
//   down: newRow++
//   left: newCol--
//   right: newCol++

// TODO: Check if new position is valid (within grid bounds)
// Hint: Check if newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols
// If not valid, show feedback message and return

// TODO: Get the target cell: grid[newRow][newCol]

// TODO: Remove player from old position
// Set grid[playerRow][playerCol].type back to 'empty'
// Set its reward back to STEP_COST
// Call updateCellVisual for old position

// TODO: Update player position variables
// Set playerRow = newRow and playerCol = newCol

// TODO: Mark new cell as player
// Set grid[playerRow][playerCol].type = 'player'
// Call updateCellVisual for new position

// TODO: Handle the reward/penalty (call a function you'll create next)

// ===== STEP 6: CREATE REWARD HANDLING FUNCTION =====
// TODO: Create function handleReward(cell)
// This function receives the cell the player just moved to

// TODO: Get the reward value from the cell
// Hint: const reward = cell.reward;

// TODO: Update the score
// Hint: score += reward;
// Then call a function to update the display (you'll create this next)

// TODO: Show feedback message
// If cell type is 'treasure': show success message and end episode
// Otherwise: show step taken message
// Set feedback text and color based on positive/negative reward

// TODO: Clear feedback after a delay (use setTimeout)
// Hint: setTimeout(() => { feedback.textContent = ''; }, 1500);

// ===== STEP 7: CREATE SCORE UPDATE FUNCTION =====
// TODO: Create function updateScore()
// Update the score display text: scoreDisplay.textContent = `Score: ${score}`

// TODO: Add a simple animation
// Hint: Scale it up slightly, then back down
// Use style.transform = 'scale(1.2)' then setTimeout to scale back to 1

// ===== STEP 8: CREATE EPISODE END FUNCTION =====
// TODO: Create function endEpisode()
// Set gameOver = true
// Show completion message in feedback
// Disable all movement buttons (loop through buttons, set disabled = true)
// After a delay, show the next button

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

// ===== STEP 10: ADD EVENT LISTENERS =====
// TODO: Add click listeners to all direction buttons
// Hint: document.getElementById('up-btn').addEventListener('click', () => movePlayer('up'))
// Do this for: up-btn, down-btn, left-btn, right-btn

// TODO: Add click listener to reset button
// Hint: resetBtn.addEventListener('click', resetGame)

// ===== STEP 11: INITIALIZE THE GAME =====
// TODO: Call updateScore() to set initial score display
// TODO: Set initial episode count display
// TODO: Make sure all cells are visually updated

// ===== BONUS CHALLENGES (Once basic game works) =====
// TODO: Add obstacles that give penalties
// TODO: Randomize treasure position each episode
// TODO: Track number of moves per episode
// TODO: Show best path found
// TODO: Add keyboard controls (arrow keys)
// TODO: Add visual path showing where player has been
// TODO: Add animation when moving between cells
