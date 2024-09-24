// Selecting all cell elements and game status & score elements
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.getElementById('status');
const scoreX = document.getElementById('scoreX');
const scoreO = document.getElementById('scoreO');
const resetButton = document.getElementById('reset');

// Initializing game board
let board = ['', '', '', '', '', '', '', '', ''];

// Setting to start with player 'X'
let currentPlayer = 'X';

// Initializing game state
let isGameActive = true;

// Intializing scores of both players
let scores = { X: 0, O: 0 };

// Storing all possible winning combinations in an array
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Fuction to handle cell clicks
function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    // We just ignore if cell is taken or game is over
    if (board[cellIndex] !== '' || !isGameActive) return;

    // Update the board state and display the current player's symbol in the cell
    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    // Checking if the current player has won using checkWin function we declared
    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        updateScore(currentPlayer);
        isGameActive = false;// Ending game
        return;
    }

    // After checking for win, checking if all cells are filled which means draw
    if (board.every(cell => cell !== '')) {
        statusText.textContent = 'Draw!';
        isGameActive = false;
        return;
    }

    // Switch turns between 'X' and 'O' after checking for win and draw
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus(currentPlayer);
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function updateStatus() {
    statusText.textContent = `Player ${currentPlayer}'s turn`;

    // Highlight the current player in the scorecard
    if (currentPlayer === 'X') {
        document.querySelector('.playerX').classList.add('active');
        document.querySelector('.playerO').classList.remove('active');
    } else {
        document.querySelector('.playerO').classList.add('active');
        document.querySelector('.playerX').classList.remove('active');
    }
}


// Function to check if current player won by checking if player has achieved any winning combinations
function checkWin() {
    let won = winningCombinations.find(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
    
    if (won) {
        // Add a class to the winning cells to animate them
        won.forEach(index => {
            cells[index].classList.add('win');
        });
        return true;
    }
    return false;
}

// Function for updating score of winning player
function updateScore(winner) {
    scores[winner]++;
    if (winner === 'X') {
        scoreX.textContent = scores.X;
    } else {
        scoreO.textContent = scores.O;
    }
}

// Function for resetting game state
function resetGame() {
    board = ['', '', '', '', '', '', '', '', '']; // Clearing board by setting all cells to empty
    currentPlayer = 'X'; // Setting player 'X' to start
    isGameActive = true; // Reactivating game
    statusText.textContent = "Player X's turn"; // Updating status text(Shows current which player turn it is)
    cells.forEach(cell => cell.textContent = ''); // Clear all cell displays
}

// Attaching click event listeners to all cells and the reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initialize the game with Player X's turn highlighted
updateStatus();  // Call this at the start to highlight Player X