let player1 = "Blue";
let player2 = "Green";
let currentPlayer = player1;
let rows = 4;
let columns = 4;
let gameOver = false;
let board;
let currColumns;

gameBegins();

function gameBegins() {
  board = [];
  currColumns = [3, 3, 3, 3];
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

function placeChip() {
  if (gameOver) {
    return;
  }

  let coords = this.id.split("-");
  console.log(coords);
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  r = currColumns[c];
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
  //updating the height for the column
  r -= 1;
  // update the array
  currColumns[c] = r;
  checkForWin();
}

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

function callWinner(r, c) {
  let winner = document.getElementById("winner");
  if (board[r][c] == player1) {
    winner.innerText = "Blue Wins";
  } else {
    winner.innerText = "Green Wins";
  }
  gameOver = true;
}
