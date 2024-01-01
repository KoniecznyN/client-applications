var game = {
  width: 10,
  height: 10,
  playerBoardScheme: [],
  botBoardScheme: [],
  playerBoard: [],
  botBoard: [],
  init() {
    this.createBoardScheme("bot");
    console.log(this.botBoardScheme);
    this.botShipsPlacement(this.botBoardScheme);
    this.createBoard("player");
    this.createBoard("bot");
    console.log(this.botBoard);
  },
  createBoardScheme(key) {
    switch (key) {
      case "player":
        break;
      case "bot":
        for (let i = 0; i < this.height + 2; ++i) {
          this.botBoardScheme[i] = [];
          for (let j = 0; j < this.width + 2; ++j) {
            if (
              i == 0 ||
              i == this.width + 1 ||
              j == 0 ||
              j == this.width + 1
            ) {
              this.botBoardScheme[i][j] = 2;
            } else this.botBoardScheme[i][j] = 0;
          }
        }
        break;
    }
  },
  createBoard(key) {
    switch (key) {
      case "player":
        for (let i = 0; i < this.height; ++i) {
          const row = document.createElement("div");
          row.id = "row";
          this.playerBoard[i] = [];
          for (let j = 0; j < this.width; ++j) {
            const el = {
              x: j,
              y: i,
              content: document.createElement("div"),
            };
            el.content.id = "el";
            el.content.onclick = this.tileClicked(i, j);
            this.playerBoard[i][j] = el;
            row.append(el.content);
          }
          document.getElementById("playerBoard").append(row);
        }
        break;
      case "bot":
        for (let i = 0; i < this.height; ++i) {
          const row = document.createElement("div");
          row.id = "row";
          this.botBoard[i] = [];
          for (let j = 0; j < this.width; ++j) {
            const el = {
              x: j,
              y: i,
              content: document.createElement("div"),
            };
            el.content.id = "el";
            el.content.onclick = this.tileClicked(i, j);
            if (this.botBoardScheme[el.y + 1][el.x + 1] == 1) {
              el.content.classList.add("ship");
            }
            this.botBoard[i][j] = el;
            row.append(el.content);
          }
          document.getElementById("botBoard").append(row);
        }
        break;
    }
  },
  tileClicked(x, y) {
    return () => {
      this.botBoardScheme[y + 1][x + 1] = 3;
      console.log(this.botBoardScheme);
      console.log(x + 1, y + 1);
    };
  },
  botShipsPlacement(array) {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    data = {
      size: 10,
      ships: [4, 3, 3, 2, 2, 2, 1, 1, 1, 1],
    };

    while (data.ships.length > 0) {
      let x = getRandomInt(1, data.size - data.ships[0] + 2);
      let y = getRandomInt(1, data.size - data.ships[0] + 2);
      let direction = getRandomInt(1, 3);
      switch (data.ships[0]) {
        case 4:
          switch (direction) {
            case 1:
              if (
                array[y - 1][x - 1] != 1 &&
                array[y][x - 1] != 1 &&
                array[y + 1][x - 1] != 1 &&
                array[y - 1][x] != 1 &&
                array[y][x] != 1 &&
                array[y + 1][x] != 1 &&
                array[y - 1][x + 1] != 1 &&
                array[y][x + 1] != 1 &&
                array[y + 1][x + 1] != 1 &&
                array[y - 1][x + 2] != 1 &&
                array[y][x + 2] != 1 &&
                array[y + 1][x + 2] != 1 &&
                array[y - 1][x + 3] != 1 &&
                array[y][x + 3] != 1 &&
                array[y + 1][x + 3] != 1 &&
                array[y - 1][x + 4] != 1 &&
                array[y][x + 4] != 1 &&
                array[y + 1][x + 4] != 1
              ) {
                for (let i = 0; i < 4; i++) {
                  array[y][x + i] = 1;
                }
                data.ships.shift();
              } else continue;
              break;
            case 2:
              if (
                array[y - 1][x - 1] != 1 &&
                array[y - 1][x] != 1 &&
                array[y - 1][x + 1] != 1 &&
                array[y][x - 1] != 1 &&
                array[y][x] != 1 &&
                array[y][x + 1] != 1 &&
                array[y + 1][x - 1] != 1 &&
                array[y + 1][x] != 1 &&
                array[y + 1][x + 1] != 1 &&
                array[y + 2][x - 1] != 1 &&
                array[y + 2][x] != 1 &&
                array[y + 2][x + 1] != 1 &&
                array[y + 3][x - 1] != 1 &&
                array[y + 3][x] != 1 &&
                array[y + 3][x + 1] != 1 &&
                array[y + 4][x - 1] != 1 &&
                array[y + 4][x] != 1 &&
                array[y + 4][x + 1] != 1
              ) {
                for (let i = 0; i < 4; i++) {
                  array[y + i][x] = 1;
                }
                data.ships.shift();
              } else continue;
              break;
          }
          break;
        case 3:
          switch (direction) {
            case 1:
              if (
                array[y - 1][x - 1] != 1 &&
                array[y][x - 1] != 1 &&
                array[y + 1][x - 1] != 1 &&
                array[y - 1][x] != 1 &&
                array[y][x] != 1 &&
                array[y + 1][x] != 1 &&
                array[y - 1][x + 1] != 1 &&
                array[y][x + 1] != 1 &&
                array[y + 1][x + 1] != 1 &&
                array[y - 1][x + 2] != 1 &&
                array[y][x + 2] != 1 &&
                array[y + 1][x + 2] != 1 &&
                array[y - 1][x + 3] != 1 &&
                array[y][x + 3] != 1 &&
                array[y + 1][x + 3] != 1
              ) {
                for (let i = 0; i < 3; i++) {
                  array[y][x + i] = 1;
                }
                data.ships.shift();
              } else continue;
              break;
            case 2:
              if (
                array[y - 1][x - 1] != 1 &&
                array[y - 1][x] != 1 &&
                array[y - 1][x + 1] != 1 &&
                array[y][x - 1] != 1 &&
                array[y][x] != 1 &&
                array[y][x + 1] != 1 &&
                array[y + 1][x - 1] != 1 &&
                array[y + 1][x] != 1 &&
                array[y + 1][x + 1] != 1 &&
                array[y + 2][x - 1] != 1 &&
                array[y + 2][x] != 1 &&
                array[y + 2][x + 1] != 1 &&
                array[y + 3][x - 1] != 1 &&
                array[y + 3][x] != 1 &&
                array[y + 3][x + 1] != 1
              ) {
                for (let i = 0; i < 3; i++) {
                  array[y + i][x] = 1;
                }
                data.ships.shift();
              } else continue;
              break;
          }
          break;
        case 2:
          switch (direction) {
            case 1:
              if (
                array[y - 1][x - 1] != 1 &&
                array[y][x - 1] != 1 &&
                array[y + 1][x - 1] != 1 &&
                array[y - 1][x] != 1 &&
                array[y][x] != 1 &&
                array[y + 1][x] != 1 &&
                array[y - 1][x + 1] != 1 &&
                array[y][x + 1] != 1 &&
                array[y + 1][x + 1] != 1 &&
                array[y - 1][x + 2] != 1 &&
                array[y][x + 2] != 1 &&
                array[y + 1][x + 2] != 1
              ) {
                for (let i = 0; i < 2; i++) {
                  array[y][x + i] = 1;
                }
                data.ships.shift();
              } else continue;
              break;
            case 2:
              if (
                array[y - 1][x - 1] != 1 &&
                array[y - 1][x] != 1 &&
                array[y - 1][x + 1] != 1 &&
                array[y][x - 1] != 1 &&
                array[y][x] != 1 &&
                array[y][x + 1] != 1 &&
                array[y + 1][x - 1] != 1 &&
                array[y + 1][x] != 1 &&
                array[y + 1][x + 1] != 1 &&
                array[y + 2][x - 1] != 1 &&
                array[y + 2][x] != 1 &&
                array[y + 2][x + 1] != 1
              ) {
                for (let i = 0; i < 2; i++) {
                  array[y + i][x] = 1;
                }
                data.ships.shift();
              } else continue;
              break;
          }
          break;
        case 1:
          if (
            array[y - 1][x - 1] != 1 &&
            array[y - 1][x] != 1 &&
            array[y - 1][x + 1] != 1 &&
            array[y][x - 1] != 1 &&
            array[y][x] != 1 &&
            array[y][x + 1] != 1 &&
            array[y + 1][x - 1] != 1 &&
            array[y + 1][x] != 1 &&
            array[y + 1][x + 1] != 1
          ) {
            array[y][x] = 1;
            data.ships.shift();
          } else continue;
          break;
        default:
          break;
      }
    }
  },
};

game.init();
