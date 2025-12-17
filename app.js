function clearGameArea() {
  document.getElementById('game-container').innerHTML = '';
}

function startGame(gameName) {
  clearGameArea();
  document.getElementById('menu').style.display = 'none'; 
  if (gameName === 'ticTacToe') {
     ticTacToe.start();
  } else if (gameName === 'luckyPig') {
    luckyPig.start();
  } else if (gameName === 'connectFour') {
    connectFour.start(); 
  }
}

function backToMenu() {
  clearGameArea();
  document.getElementById('menu').style.display = '';
}
