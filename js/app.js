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
  r -= 1;
  currColumns[c] = r;
}
