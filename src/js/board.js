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
}

module.exports = Board;
