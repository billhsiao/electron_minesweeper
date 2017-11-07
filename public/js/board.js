class Board {
  constructor(length, width) {
    this.revealed = 0;
    this.length = length;
    this.width = width;
    this.area = length * width;
    this.field = [ ...Array(width).keys()];
    for (var i = 0; i < this.width; i++) {
      this.field[i] = [ ...Array(length).keys()];
      for (var j = 0; j < this.length; j++) {
        this.field[i][j] = new Cell((i * width + j));
      }
    }
  }

  getCell(id) {
    let x, y;
    y = id % this.length;
    x = (id - y) / this.width;
    //console.log(x, y, this.field)
    return this.field[x][y]
  }

  retrieveCell(x, y) {
    return this.field[x][y]
  }
  setCell(cell) {
    this.flagged = true;
    if (this.flagged === false) {
      this.flagged = false;
    }
    return cell;
  }
}
