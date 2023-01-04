let player1 = "Blue";
let player2 = "Green";
let currentPlayer = player1;
let rows = 4;
let columns = 4;
let gameOver = false;
let board;

gameBegins();

function gameBegins() {
  board = [];

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

const winConditions = [
  //horizontal win conditions
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11][(12, 13, 14, 15)],

  //vertical win conditions
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],

  //diagonal win conditions
  [0, 5, 10, 15],
  [3, 6, 9, 12],

  //anti diagonal win conditions
  [15, 10, 5, 0],
  [12, 9, 6, 3],
];

const checkWinner = function () {
  for (let i = 0; i < winConditions; i++) {}
};

function placeChip() {
  if (gameOver) {
    return;
  }
  // click function
  let coords = this.id.split("-");
  console.log(coords);
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  board[r][c] = currentPlayer;
  let circle = this;
  if (currentPlayer == player1) {
    circle.classList.add("blueChip");
    currentPlayer = player2;
  } else {
    circle.classList.add("greenChip");
    currentPlayer = player1;
  }
}
