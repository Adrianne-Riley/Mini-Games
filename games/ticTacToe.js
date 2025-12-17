const ticTacToe = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let gameOver = false;

  function render() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
      <h2>Tic Tac Toe</h2>
      <p id="status"></p>
      <div id="board" style="display:grid;grid-template-columns:repeat(3,100px);gap:5px;"></div>
      <button id="reset">Reset Game</button>
      <button id="backToMenu">Back to Menu</button>
    `;
    const boardDiv = document.getElementById('board');
    board.forEach((cell, i) => {
      const btn = document.createElement('button');
      btn.textContent = cell;
      btn.style.height = "100px";
      btn.style.fontSize = "2em";
      btn.onclick = () => makeMove(i);
      boardDiv.appendChild(btn);
    });

    // Update status
    const status = document.getElementById('status');
    if (gameOver) {
      status.textContent = `Player ${currentPlayer === "X" ? "X" : "O"} Wins!`;
    } else if (board.every(cell => cell !== "")) {
      status.textContent = "It's a Draw!";
    } else {
      status.textContent = `Player ${currentPlayer}'s Turn`;
    }

    // Reset button
    document.getElementById('reset').onclick = start;

    // Back to Menu button
    document.getElementById('backToMenu').onclick = backToMenu;
  }

  function makeMove(i) {
    if (board[i] === "" && !gameOver) {
      board[i] = currentPlayer;
      if (checkWinner()) {
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
      render();
    }
  }

  function checkWinner() {
    const winningCombos = [
      [0,1,2],[3,4,5],[6,7,8], // rows
      [0,3,6],[1,4,7],[2,5,8], // cols
      [0,4,8],[2,4,6]          // diagonals
    ];
    return winningCombos.some(combo =>
      combo.every(index => board[index] === currentPlayer)
    );
  }

  function start() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    render();
  }

  return { start };
})();
