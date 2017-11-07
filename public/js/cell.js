class Cell {
  constructor(id) {
      this.id = id;
      this.mine = false;
      this.flagged = false;
      this.number = 0;
      this.revealed = false;
      this.textContent = '';
      this.htmlClass = '';
  }
}

