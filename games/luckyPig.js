const luckyPig = (() => {
  let scores, activePlayer, currentScore, playGame;
  let container, dice, score0El, score1El, current0El, current1El;
  let player0El, player1El, rollBtn, holdBtn, newBtn;

  const init = () => {
    score0El.textContent = "Score: 0";
    score1El.textContent = "Score: 0";

    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    playGame = true;

    current0El.textContent = "Current: 0";
    current1El.textContent = "Current: 0";

    player0El.classList.remove('player_winner');
    player1El.classList.remove('player_winner');
    player0El.classList.add('player_active');
    player1El.classList.remove('player_active');
  };

  const switchPlayer = () => {
    document.getElementById(`current_${activePlayer}`).textContent = "Current: 0";
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player_active');
    player1El.classList.toggle('player_active');
  };

  const rollDice = (random) => {
    dice.style.animation = 'rolling 1s';
    setTimeout(() => {
      const transforms = {
        1: 'rotateX(0deg) rotateY(0deg)',
        2: 'rotateX(-90deg) rotateY(0deg)',
        3: 'rotateX(0deg) rotateY(90deg)',
        4: 'rotateX(0deg) rotateY(-90deg)',
        5: 'rotateX(90deg) rotateY(0deg)',
        6: 'rotateX(180deg) rotateY(0deg)',
      };
      dice.style.transform = transforms[random];
      dice.style.animation = 'none';
    }, 1000);
  };

  const bindEvents = () => {
    rollBtn.addEventListener('click', () => {
      if (playGame) {
        const random = Math.floor(Math.random() * 6) + 1;
        rollDice(random);

        if (random !== 1) {
          currentScore += random;
          document.getElementById(`current_${activePlayer}`).textContent = `Current: ${currentScore}`;
        } else {
          switchPlayer();
        }
      }
    });

    holdBtn.addEventListener('click', () => {
      if (playGame) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score_${activePlayer}`).textContent = `Score: ${scores[activePlayer]}`;

        if (scores[activePlayer] >= 50) {
          playGame = false;
          document.querySelector(`.player_${activePlayer}`).classList.add('player_winner');
        } else {
          switchPlayer();
        }
      }
    });

    newBtn.addEventListener('click', init);

    backBtn.addEventListener('click', () => {
      stop();
      backToMenu();
    });
  };

  const renderUI = () => {
    container.innerHTML = `
    <div class="player-container">
      <div class="player player_0 player_active">
        <h2>Player 1</h2>
        <p id="score_0">Score: <span class="value">0</span></p>
        <p id="current_0">Current: <span class="value">0</span></p>
      </div>
      <div class="dice">
        <div class="face front"></div>
        <div class="face back"></div>
        <div class="face top"></div>
        <div class="face bottom"></div>
        <div class="face right"></div>
        <div class="face left"></div>
      </div>
      <div class="player player_1">
        <h2>Player 2</h2>
        <p id="score_1">Score: <span class="value">0</span></p>
        <p id="current_1">Current: <span class="value">0</span></p>
      </div>
    </div>
      <button class="btn_roll">Roll Dice</button>
      <button class="btn_hold">Hold</button>
      <button class="btn_new">New Game</button>
      <button class="btn_back">Back to Menu</button>
    `;

    // rebind references
    dice = container.querySelector('.dice');
    score0El = document.getElementById('score_0');
    score1El = document.getElementById('score_1');
    current0El = document.getElementById('current_0');
    current1El = document.getElementById('current_1');
    player0El = container.querySelector('.player_0');
    player1El = container.querySelector('.player_1');
    rollBtn = container.querySelector('.btn_roll');
    holdBtn = container.querySelector('.btn_hold');
    newBtn = container.querySelector('.btn_new');
    backBtn = container.querySelector('.btn_back');
  };

  const start = () => {
    container = document.getElementById('game-container');
    renderUI();
    init();
    bindEvents();
  };

  const stop = () => {
    container.innerHTML = ''; // cleanup
  };

  return { start, stop };
})();
