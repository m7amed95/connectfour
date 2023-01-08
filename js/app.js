let player1 = "Blue";
let player2 = "Green";
let currentPlayer = player1;
let rows = 6;
let columns = 7;
let gameOver = false;
let board;
let currCol;

let strt = document.querySelector(".strt");
strt.addEventListener("click", gameBegins);
strt.addEventListener("click", () => {
  strt.style.display = "none";
});
document.querySelector(".reset").addEventListener("click", resetGame);

// function that creates the board
function gameBegins() {
  board = [];
  currCol = [5, 5, 5, 5, 5, 5, 5];
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      row.push(" ");
      //creating a div tag
      let circle = document.createElement("div");
      circle.id = r.toString() + "-" + c.toString();
      circle.classList.add("circle");
      circle.addEventListener("click", placeChip);
      document.getElementById("board").append(circle);
    }
    board.push(row);
  }
}

//function that Restarts the game
function resetGame() {
  currentPlayer = player1;
  gameOver = false;
  board = [];
  currCol = [5, 5, 5, 5, 5, 5, 5];
  let circle = document.querySelectorAll(".circle");
  circle.forEach((circle) => {
    circle.classList.remove("blueChip");
    circle.classList.remove("greenChip");
  });
  document.getElementById("board").innerHTML = "";
  gameBegins();
}

// function for placing the chip
function placeChip() {
  if (gameOver) {
    return;
  }

  let coords = this.id.split("-");
  console.log(coords);
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  r = currCol[c];
  if (r < 0) {
    return;
  }

  board[r][c] = currentPlayer;
  let circle = document.getElementById(r.toString() + "-" + c.toString());
  if (currentPlayer == player1) {
    circle.classList.add("blueChip");
    currentPlayer = player2;
  } else {
    circle.classList.add("greenChip");
    currentPlayer = player1;
  }
  r -= 1;
  currCol[c] = r;
  checkForWin();
}

//function that checks the winning conditions
function checkForWin() {
  //horizontal

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r][c + 1] &&
          board[r][c + 1] == board[r][c + 2] &&
          board[r][c + 2] == board[r][c + 3]
        ) {
          callWinner(r, c);
          return;
        }
      }
    }
  }
  // Vertical
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r + 1][c] &&
          board[r + 1][c] == board[r + 2][c] &&
          board[r + 2][c] == board[r + 3][c]
        ) {
          callWinner(r, c);
          return;
        }
      }
    }
  }
  // diagonal
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r - 1][c + 1] &&
          board[r - 1][c + 1] == board[r - 2][c + 2] &&
          board[r - 2][c + 2] == board[r - 3][c + 3]
        ) {
          callWinner(r, c);
          return;
        }
      }
    }
  }

  // anti diagonal
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (board[r][c] != " ") {
        if (
          board[r][c] == board[r + 1][c + 1] &&
          board[r + 1][c + 1] == board[r + 2][c + 2] &&
          board[r + 2][c + 2] == board[r + 3][c + 3]
        ) {
          callWinner(r, c);
          return;
        }
      }
    }
  }
}

// score board function
const player1ScoreElement = document.querySelector(".player1 .score");
let player1Score = 0;

function updatePlayer1Score(score) {
  player1Score = score;
  player1ScoreElement.innerHTML = score;
}

const player2ScoreElement = document.querySelector(".player2 .score");
let player2Score = 0;

function updatePlayer2Score(score) {
  player2Score = score;
  player2ScoreElement.innerHTML = score;
}

// function that calls the winner
function callWinner(r, c) {
  let winner = document.getElementById("winner");
  if (board[r][c] == player1) {
    winner.innerText = "Blue Wins";
    updatePlayer1Score(player1Score + 1);
  } else {
    winner.innerText = "Green Wins";
    updatePlayer2Score(player2Score + 1);
  }
  gameOver = true;
}
