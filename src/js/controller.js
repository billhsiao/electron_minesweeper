module.exports = {
  gamePlay, flag
}
function gamePlay(cell) {
    console.log(`opening ${cell}`)
    if (cell.revealed) {
        console.log('cell already revealed');
    }
    if (!cell.revealed) {
        cell.revealed = true;
        cell.htmlClass = 'revealed';
        game.revealed = game.revealed + 1;
        if (cell.number === 0) {
          render(cell);
            adjCellOpen(gamePlay, adjacenters(...parse(cell.id)));
        }
        if (!cell.mine) {
          cell.textContent = cell.number;
          render(cell);
        }
        if (cell.mine) {
            cell.textContent = "B";
            cell.htmlClass = 'focusBomb';
            render(cell);
            gameOver();
        }
    }
    winCheck();
}
function flag(cell) {
  if (!cell.flagged && !cell.revealed) {
      cell.textContent = 'F';
      cell.htmlClass = 'flagged';
      cell.flagged = true;
      render(cell);
  } else if (cell.flagged && !cell.revealed) {
    cell.textContent = '';
    cell.htmlClass = '';
    cell.flagged = false;
    render(cell);
  } else {
      console.log('can\'t do that')
  }
}
