let gameboard = ["X", "X", "O", "", "X", "O", "", "O", "X"];
let cell = document.querySelectorAll(".cell");

for (let i = 0; i < gameboard.length; i++) {
  cell[i].innerHTML = gameboard[i];
}
