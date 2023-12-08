var game = {
  width: 10,
  height: 10,
  boardScheme: [],
  actualBoard: [],
  board: document.getElementById("board"),
  init() {
    this.createBoard();
    console.log(this.boardScheme);
  },
  createBoard() {
    for (let i = 0; i < this.height + 2; ++i) {
      this.boardScheme[i] = [];
      for (let j = 0; j < this.width + 2; ++j) {
        if (i == 0 || i == this.width + 1 || j == 0 || j == this.width + 1) {
          this.boardScheme[i][j] = 2;
        } else this.boardScheme[i][j] = 0;
      }
    }
    for (let i = 0; i < this.height; ++i) {
      const row = document.createElement("div");
      row.id = "row";
      for (let j = 0; j < this.width; ++j) {
        const el = document.createElement("div");
        el.id = "el";
        el.innerText = `${i}, ${j}`;
        el.onclick = this.tileClicked(i, j);
        row.append(el);
      }
      this.board.append(row);
    }
  },
  tileClicked(x, y) {
    return () => {
      this.boardScheme[y + 1][x + 1] = 3;
      console.log(x, y);
    };
  },
};

game.init();
