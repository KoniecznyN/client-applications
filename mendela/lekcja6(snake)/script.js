var game = {
  width: 21,
  height: 21,
  gameBoardScheme: [],
  gameBoard: [],
  init() {
    this.createBoardScheme();
    this.createBoard();
  },
  createBoardScheme() {
    for (let i = 0; i < this.height; ++i) {
      this.gameBoardScheme[i] = [];
      for (let j = 0; j < this.width; ++j) {
        if (i == 0 || i == this.width - 1 || j == 0 || j == this.width - 1) {
          this.gameBoardScheme[i][j] = 2;
        } else this.gameBoardScheme[i][j] = 0;
      }
    }
  },
  createBoard() {
    document.getElementById("gameBoard").innerHTML = "";
    for (let i = 0; i < this.height; ++i) {
      const row = document.createElement("div");
      row.id = "row";
      this.gameBoard[i] = [];
      for (let j = 0; j < this.width; ++j) {
        const el = {
          x: j,
          y: i,
          content: document.createElement("div"),
        };
        if (this.gameBoardScheme[i][j] == 2) {
          el.content.id = "wall";
        } else {
          el.content.id = "el";
        }
        this.gameBoard[i][j] = el;
        row.append(el.content);
      }
      document.getElementById("gameBoard").append(row);
    }
  },
  snake: [{ x: 10, y: 10 }],
  snakePosition: undefined,
  vec: { x: 0, y: 0 },
  interval: undefined,
  lastClckedKey: undefined,
  mainGame(e) {
    let snakeMove = () => {
      switch (e.code) {
        case "KeyW":
          if (this.lastClckedKey == "KeyS") {
            break;
          }
          this.vec = { x: 0, y: -1 };
          this.lastClckedKey = "KeyW";
          break;
        case "KeyD":
          if (this.lastClckedKey == "KeyA") {
            break;
          }
          this.vec = { x: 1, y: 0 };
          this.lastClckedKey = "KeyD";
          break;
        case "KeyS":
          if (this.lastClckedKey == "KeyW") {
            break;
          }
          this.vec = { x: 0, y: 1 };
          this.lastClckedKey = "KeyS";
          break;
        case "KeyA":
          if (this.lastClckedKey == "KeyD") {
            break;
          }
          this.vec = { x: -1, y: 0 };
          this.lastClckedKey = "KeyA";
          break;
      }

      this.snakePosition = {
        x: this.snake[0].x + this.vec.x,
        y: this.snake[0].y + this.vec.y,
      };

      this.gameBoardScheme[this.snake[this.snake.length - 1].y][
        this.snake[this.snake.length - 1].x
      ] = 0;
      this.snake.unshift(this.snakePosition);

      if (this.isApple == false) {
        this.drawApple();
        this.isApple = true;
      }
      this.gameBoardScheme[this.apple.y][this.apple.x] = 3;

      switch (this.gameBoardScheme[this.snake[0].y][this.snake[0].x]) {
        case 3:
          this.isApple = false;
          break;
        case 2:
          return this.youLoose();
        case 1:
          console.log("witam");
          return this.youLoose();
        default:
          this.snake.pop();
          break;
      }

      for (let i = 0; i < this.snake.length; i++) {
        this.gameBoardScheme[this.snake[i].y][this.snake[i].x] = 1;
      }

      this.updateBoard();
    };
    clearInterval(this.interval);
    snakeMove();
    this.interval = setInterval(snakeMove, 200);
  },
  isApple: false,
  apple: { x: 0, y: 0 },
  drawApple() {
    this.apple.x = Math.floor(Math.random() * (19 - 1) + 1);
    this.apple.y = Math.floor(Math.random() * (19 - 1) + 1);

    let isEmpty = true;
    while (isEmpty) {
      if (this.gameBoardScheme[this.apple.y][this.apple.x] == 0) {
        isEmpty = false;
      } else {
        this.apple.x = Math.floor(Math.random() * (19 - 1) + 1);
        this.apple.y = Math.floor(Math.random() * (19 - 1) + 1);
      }
    }
  },
  updateSnakeGraphic() {
    if (this.snake.length == 1) {
      this.gameBoard[this.snake[0].y][this.snake[0].x].content.id = "snakeHead";
    }
    if (this.snake.length == 2) {
      this.gameBoard[this.snake[0].y][this.snake[0].x].content.id = "snakeHead";
      this.gameBoard[this.snake[1].y][this.snake[1].x].content.id = "snakeTail";
    }
    if (this.snake.length >= 3) {
      for (let i = 0; i < this.snake.length; i++) {
        if (i == 0) {
          this.gameBoard[this.snake[i].y][this.snake[i].x].content.id =
            "snakeHead";
        } else if (i == this.snake.length - 1) {
          this.gameBoard[this.snake[i].y][this.snake[i].x].content.id =
            "snakeTail";
        } else {
          this.gameBoard[this.snake[i].y][this.snake[i].x].content.id =
            "snakeBody";
        }
      }
    }
  },
  updateBoard() {
    for (let i = 0; i < this.gameBoardScheme.length; i++) {
      for (let j = 0; j < this.gameBoardScheme[i].length; j++) {
        switch (this.gameBoardScheme[j][i]) {
          case 1:
            this.updateSnakeGraphic();
            break;
          case 0:
            this.gameBoard[j][i].content.id = "el";
            break;
          case 3:
            this.gameBoard[j][i].content.id = "apple";
            break;
          default:
            break;
        }
      }
    }
  },
  youLoose() {
    clearInterval(this.interval);
    alert("Przegrales");
    this.snake = [{ x: 10, y: 10 }];
    this.gameBoardScheme = [];
    this.gameBoard = [];
    this.init();
  },
};
