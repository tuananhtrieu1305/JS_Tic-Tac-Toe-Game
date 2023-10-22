const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const cells = $$(".cell");
const statusText = $("#statusText");
const restartBtn = $("#restartBtn");
let winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let running = false;
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
initializeGame();
function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  statusText.textContent = `${currentPlayer}'s turn`;
  restartBtn.addEventListener("click", restartGame);
  running = true;
}
function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex");
  if (options[cellIndex] != "" || !running) {
    return;
  }
  updateCell(this, cellIndex);
  checkWinner();
}
function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}
function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer}'s turn`;
}
function checkWinner() {
  let roundWin = false;
  for (let i = 0; i < winCondition.length; i++) {
    const condition = winCondition[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    } else if (cellA == cellB && cellB == cellC) {
      roundWin = true;
      break;
    }
  }
  if (roundWin) {
    statusText.textContent = `${currentPlayer} wins`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = "Draw";
    running = false;
  } else {
    changePlayer();
  }
}
function restartGame() {
  running = true;
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  cells.forEach((cell) => (cell.textContent = ""));
}
