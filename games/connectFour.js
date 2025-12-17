const connectFour = (() => {
  let matrix, currentPlayer, container, playerTurn, message;
  let gameOver = false;

  const generateRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min)) + min;

  const verifyArray = (arr) => {
    let count = 0;
    for (let val of arr) {
      if (val === currentPlayer) {
        count++;
        if (count === 4) return true;
      } else count = 0;
    }
    return false;
  };

  const winCheck = (row, col) =>
    verifyArray(matrix[row]) ||
    verifyArray(matrix.map(r => r[col])) ||
    verifyArray(getDiagonal(row, col, 1)) ||
    verifyArray(getDiagonal(row, col, -1));

  const getDiagonal = (row, col, dir) => {
    let arr = [];
    let r = row, c = col;
    while (r >= 0 && c >= 0 && c < matrix[0].length) {
      arr.unshift(matrix[r][c]);
      r--; c += dir;
    }
    r = row + 1; c = col - dir;
    while (r < matrix.length && c >= 0 && c < matrix[0].length) {
      arr.push(matrix[r][c]);
      r++; c -= dir;
    }
    return arr;
  };

  const isBoardFull = () => {
    return matrix.every(row => row.every(cell => cell !== 0));
  };


  const setPiece = (row, col) => {
    if (row < 0) return;
    if (matrix[row][col] !== 0) {
      setPiece(row - 1, col);
    } else {
      const rows = container.querySelectorAll(".grid-row");
      const cell = rows[row].querySelectorAll(".grid-box")[col];

      const playerClass = currentPlayer === 1 ? "redPlayer" : "yellowPlayer";
      cell.classList.add("filled", playerClass);
      matrix[row][col] = currentPlayer;

      if (winCheck(row, col)) {
        const playerName = currentPlayer === 1 ? "Red" : "Yellow";
        message.innerHTML = `${playerName} wins!`;
        gameOver = true;
        return;
      }

      if (isBoardFull()) {
        message.innerHTML = "It's a draw!";
        gameOver = true;
        return;
      }

      currentPlayer = currentPlayer === 1 ? 2 : 1;
      const nextPlayerName = currentPlayer === 1 ? "Red" : "Yellow";
      playerTurn.innerHTML = `${nextPlayerName}'s turn`;
    }
  };

  const fillBox = (e) => {
    if (gameOver) return;
    const col = parseInt(e.target.getAttribute("data-value"));
    setPiece(matrix.length - 1, col);
  };

  const matrixCreator = () => {
    container.innerHTML = "";
    matrix = Array.from({ length: 6 }, () => Array(7).fill(0));
    for (let i = 0; i < 6; i++) {
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("grid-row");
      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-box");
        cell.setAttribute("data-value", j);
        cell.addEventListener("click", fillBox);
        rowDiv.appendChild(cell);
      }
      container.appendChild(rowDiv);
    }
  };

  const restart = () => {
    stop();
    start();
  };

  const backToMenu = () => {
    stop();
    window.backToMenu();
  }

  const start = () => { 
    gameOver = false;
    container = document.getElementById("game-container"); 
    container.innerHTML = ""; 

    matrixCreator();

    playerTurn = document.createElement("div");
    playerTurn.id = "playerTurn";

    message = document.createElement("div");
    message.id = "message"; 

    // 🔘 Controls section
    const controls = document.createElement("div");
    controls.id = "controls";

    const restartBtn = document.createElement("button");
    restartBtn.textContent = "Restart";
    restartBtn.addEventListener("click", restart);

    const menuBtn = document.createElement("button");
    menuBtn.textContent = "Back to Menu";
    menuBtn.addEventListener("click", backToMenu);

    controls.appendChild(restartBtn);
    controls.appendChild(menuBtn);

    container.appendChild(playerTurn);
    container.appendChild(message);
    container.appendChild(controls);

    currentPlayer = generateRandomNumber(1, 3);
    playerTurn.innerHTML = `${currentPlayer === 1 ? "Red" : "Yellow"}'s turn`; 
  };

  const stop = () => {
    container.innerHTML = "";
  };

  return { start, stop, restart, backToMenu };
})();
