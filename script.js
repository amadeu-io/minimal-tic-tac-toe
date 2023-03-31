// game module
let Game = (() => {
  let gameBoard = new Array(9); // empty array of 9 undefined

  // renders gameBoard array to screen
  const renderGameBoard = () => {
    gameBoard.forEach((value, index) => {
      cells[index].innerHTML = value;
    });
  };

  // check win. returns x, o, tie or null
  const checkWin = () => {
    const winningIndexes = [
      // horizontal wins
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      // vertical wins
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      // diagonal wins
      [0, 4, 8],
      [2, 4, 6],
    ];

    count++;

    for (let i = 0; i < winningIndexes.length; i++) {
      let [a, b, c] = winningIndexes[i];
      // equal, not empty winning indexes indicate a win
      if (
        gameBoard[a] &&
        gameBoard[a] === gameBoard[b] &&
        gameBoard[a] === gameBoard[c]
      ) {
        return gameBoard[a];
      }
    }

    // if count is 9 and the previous return hasn't executed, it's a tie
    return count === 9 ? "tie" : null;
  };

  // winning message. receives the result from checkWin and returns a display message
  const endMessage = () => {
    const winner = checkWin();
    if (winner === "x") {
      return `${playerX} wins!`;
    } else if (winner === "o") {
      return `${playerO} wins!`;
    } else if (winner === "tie") {
      return "It's a tie!";
    }
    return null;
  };

  return { gameBoard, renderGameBoard, checkWin, endMessage };
})();

// program starts here

let count = 0;
let form = document.querySelector("form");
let boardContainer = document.querySelector(".board-container");
let cells = document.querySelectorAll(".cell");
let endDisplay = document.querySelector(".end-display");
let endContainer = document.querySelector(".end-container");
let playerX, playerO;

// form
form.addEventListener("submit", (e) => {
  e.preventDefault(); // do not reload the page

  // get form data and build players objects with factory
  const formData = new FormData(form);
  playerX = formData.get("player-x");
  playerO = formData.get("player-o");

  // hide form
  form.style.display = "none";

  // display game board
  boardContainer.style.display = "block";
});

// play game
let turn = true;
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    // play if the square is empty
    if (!Game.gameBoard[index]) {
      Game.gameBoard[index] = turn ? "x" : "o";
      turn ^= true;
      Game.renderGameBoard();
    }

    // assign & display end message & button
    endDisplay.innerHTML = Game.endMessage(Game.checkWin(Game.gameBoard));
    if (Game.endMessage(Game.checkWin(Game.gameBoard))) {
      endContainer.style.display = "flex";
    }
  });
});
