var arr = [[], [], [], [], [], [], [], [], []];

// Get references to Sudoku grid cells
for (var i = 0; i < 9; i++) {
  for (var j = 0; j < 9; j++) {
    arr[i][j] = document.getElementById(i * 9 + j);
  }
}

// Initial empty board
var board = Array.from({ length: 9 }, () => Array(9).fill(0));

// Predefined puzzles
const puzzles = [
  [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ],
  [
    [0, 0, 0, 2, 6, 0, 7, 0, 1],
    [6, 8, 0, 0, 7, 0, 0, 9, 0],
    [1, 9, 0, 0, 0, 4, 5, 0, 0],
    [8, 2, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [0, 5, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 4, 0, 0, 5, 0, 0, 3, 6],
    [7, 0, 3, 0, 1, 8, 0, 0, 0],
  ],
  [
    [0, 0, 0, 2, 4, 0, 5, 0, 1],
    [3, 7, 0, 0, 8, 0, 0, 9, 0],
    [1, 5, 0, 0, 0, 6, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 4, 0],
    [0, 0, 4, 6, 0, 2, 9, 0, 0],
    [7, 4, 0, 0, 0, 3, 0, 2, 8],
    [0, 0, 9, 3, 0, 0, 0, 7, 4],
    [0, 0, 0, 0, 5, 0, 0, 8, 6],
    [7, 0, 0, 0, 1, 0, 0, 0, 0],
  ],
  [
	[5, 3, 0, 0, 7, 0, 0, 0, 0],
	[6, 0, 0, 0, 9, 5, 0, 0, 0],
	[0, 9, 8, 0, 0, 0, 0, 6, 0],
	[8, 0, 0, 0, 6, 0, 0, 0, 3],
	[4, 0, 0, 8, 0, 3, 0, 0, 1],
	[7, 0, 0, 0, 2, 0, 0, 0, 6],
	[0, 6, 0, 0, 0, 0, 2, 8, 0],
	[0, 0, 0, 4, 1, 9, 0, 0, 5],
	[0, 0, 0, 0, 8, 0, 0, 7, 9]
  ],
  [
	[0, 0, 0, 2, 6, 0, 7, 0, 1],
	[6, 8, 0, 0, 7, 0, 0, 9, 0],
	[1, 9, 0, 0, 0, 4, 5, 0, 0],
	[8, 2, 0, 1, 0, 0, 0, 4, 0],
	[0, 0, 4, 6, 0, 2, 9, 0, 0],
	[0, 5, 0, 0, 0, 3, 0, 2, 8],
	[0, 0, 9, 3, 0, 0, 0, 7, 4],
	[0, 4, 0, 0, 5, 0, 0, 3, 6],
	[7, 0, 3, 0, 1, 8, 0, 0, 0]
  ]
];

// Function to fill the board on the HTML grid
function FillBoard(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] !== 0) {
        arr[i][j].innerText = board[i][j];
      } else {
        arr[i][j].innerText = '';
      }
    }
  }
}

// Function to check if placing a number is valid
function isSafe(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
}

// Sudoku solving function
function SudokuSolver(board, row, col) {
  if (row === 9) return true;

  if (col === 9) return SudokuSolver(board, row + 1, 0);

  if (board[row][col] !== 0) return SudokuSolver(board, row, col + 1);

  for (let num = 1; num <= 9; num++) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num;

      if (SudokuSolver(board, row, col + 1)) return true;

      board[row][col] = 0;
    }
  }

  return false;
}

// Get buttons
let GetPuzzle = document.getElementById('GetPuzzle');
let SolvePuzzle = document.getElementById('SolvePuzzle');

// Handle "Get Puzzle" button
GetPuzzle.onclick = function () {
  
  const randomIndex = Math.floor(Math.random() * puzzles.length);
  board = puzzles[randomIndex].map(row => [...row]);
  FillBoard(board);
  document.querySelector('.Heading').classList.remove('hidden');
  document.querySelector('.Heading').textContent = 'Sudoku Solver';};

// Handle "Solve Puzzle" button
SolvePuzzle.onclick = function () {
  if (SudokuSolver(board, 0, 0)) {
    FillBoard(board);
    document.querySelector('.Heading').textContent = 'Solved!';
  } else {
    // document.querySelector('.Heading').textContent = 'No possible Solution!';
    // GetPuzzle.classList.remove('Buttons');
    // GetPuzzle.classList.add('hidden');
    // alert('No solution Exists');
    // document.querySelector('.Heading').classList.add('hidden');

    document.querySelector('.Heading').textContent = 'No Possible Solution!';
  }
};
// SolvePuzzle.onclick = function () {
// if(!SudokuSolver(board, 0, 0)) {
//   document.getElementById('SolvePuzzle').textContent = 'No Solution exists';
// }
// }
