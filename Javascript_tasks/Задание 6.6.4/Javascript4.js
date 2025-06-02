function drawTicTacToe() {
  const fieldSize = 3;
  for (let i = 0; i < fieldSize; i++) {
    let row = "";
    for (let j = 0; j < fieldSize; j++) {
      if ((i + j) % 2 === 0) {
        row += "x ";
      } else {
        row += "o ";
      }
    }
    console.log(row);
  }
}

drawTicTacToe();