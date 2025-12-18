# Mini-Games 🎮
A collection of two-player games: Connect Four, Tic Tac Toe, and Lucky Pig.

## Tech
- HTML
- CSS
- JavaScript

## Features
- **Connect Four**: Classic 7x6 grid game.
- **Tic Tac Toe**: Simple 3x3 board.
- **Lucky Pig**: Dice-based press-your-luck game.

## How It's Made
Originally, each game lived on its own page. I combined them into a single hub:
- Removed duplicate HTML files.
- Condensed multiple CSS files into one stylesheet.
- Created `app.js` for the game options menu.
- Wrote a dedicated JS file for each game’s logic.

## Lessons Learned
- Small mistakes caused the biggest roadblocks, but debugging taught me patience.
- Using minimal global scope prevented conflicts between games.
- Naming elements differently across games helped manage unique styling needs.
- I learned how to refactor code for modularity and maintainability.

## Future Plans
- Add more games.
- Improve styling and accessibility.
- Rebuild the game hub using React.
