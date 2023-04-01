// initial state
const initialState = {
  count: 0,
  players: [],
  turn: true,
  winner: null,
};

// game module
let Game = (() => {
  let gameBoard = new Array(9).fill(null); // empty array of 9 null

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
  const createEndMessage = (winner) => {
    if (winner === "x") {
      return `${players[0]} wins!`;
    } else if (winner === "o") {
      return `${players[1]} wins!`;
    } else if (winner === "tie") {
      return "It's a tie!";
    }
    return null;
  };

  return { gameBoard, renderGameBoard, checkWin, createEndMessage };
})();

// program starts here

let { count, players, turn, winner } = { ...initialState };
let form = document.querySelector("form");
let boardContainer = document.querySelector(".board-container");
let cells = document.querySelectorAll(".cell");
let endMessage = document.querySelector(".end-message");
let endDisplay = document.querySelector(".end-display");
let endReset = document.querySelector(".end-reset");

// form
form.addEventListener("submit", (e) => {
  e.preventDefault(); // do not reload the page

  // get form data and assign to players
  const formData = new FormData(form);
  players = [formData.get("player-x"), formData.get("player-o")];

  // hide form
  form.style.display = "none";

  // show game board
  boardContainer.style.display = "block";
});

// play game
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    // play if the square is empty and there is no winner
    if (!Game.gameBoard[index] && !winner) {
      Game.gameBoard[index] = turn ? "x" : "o";
      turn ^= true;
      Game.renderGameBoard();
    }

    winner = Game.checkWin(Game.gameBoard);

    // assign & display end message & button
    endMessage.innerHTML = Game.createEndMessage(winner);
    if (Game.createEndMessage(winner)) {
      endDisplay.style.display = "flex";
    }
  });
});

// reset
endReset.addEventListener("click", () => {
  // reset variables to initial state
  ({ count, players, turn, winner } = { ...initialState });

  // reset & show form
  form.reset();
  form.style.display = "block";

  // reset & hide game board
  boardContainer.style.display = "none";
  Game.gameBoard.fill(null);
  Game.renderGameBoard();

  // reset & hide end display
  endMessage.innerHTML = "";
  endDisplay.style.display = "none";
});
