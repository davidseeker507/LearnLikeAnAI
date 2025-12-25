// ----------Constants and initial setup--------------
const row = 5;
const cols = 5;
const gridEl = document.getElementById('grid')
const scoreDisplay = document.getElementById('score-display');
const feedback = document.getElementById('feedback');
const episodeCount = document.getElementById('episode-count');
const resetBtn = document.getElementById('reset-btn');
const nextBtn = document.getElementById('next-btn');

// Reward values - constants make it easy to adjust
const TREASURE_REWARD = 100;
const STEP_COST = -1; // Small penalty for each step to encourage efficiency
const OBSTACLE_PENALY =-50; // If i add obstacles later 

// Game state variables
let grid = [] // will hold a 2d grid array of cell objects
let playerRow = 0; //player starts at the top left
let playerCol = 0;
let score = 0;
let episode = 1;
let gameOver = false;

// CREATE GRID DATA STRUCTURE!!!
//Initalize grid as 2D array with cell objects

grid = Array.from({ length: rows }, (_, r) =>
  Array.from({ length: cols }, (_, c) => ({
    type: 'empty',      // empty, player, treasure, obstacle
    reward: STEP_COST,  // Default: small penalty for moving
    row: r,             // Store position for easy reference
    col: c,
    element: null       // Will store reference to DOM element
  }))
);

// ===== CREATE VISUAL GRID =====
// Loop through each cell and create visual representation


