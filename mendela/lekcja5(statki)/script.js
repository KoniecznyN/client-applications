let game = {
  width: 10,
  height: 10,
  playerBoardScheme: [],
  botBoardScheme: [],
  playerBoard: [],
  botBoard: [],
  init() {
    document
      .getElementById("playerBoard")
      .addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
    this.createBoardScheme("bot");
    this.createBoardScheme("player");
    this.botShipsPlacement(this.botBoardScheme);
    this.createBoard("player");
    this.createBoard("bot");
  },
  createBoardScheme(key) {
    switch (key) {
      case "player":
        for (let i = 0; i < this.height + 2; ++i) {
          this.playerBoardScheme[i] = [];
          for (let j = 0; j < this.width + 2; ++j) {
            if (
              i == 0 ||
              i == this.width + 1 ||
              j == 0 ||
              j == this.width + 1
            ) {
              this.playerBoardScheme[i][j] = 2;
            } else this.playerBoardScheme[i][j] = 0;
          }
        }
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
            el.content.onmouseenter = () => {
              this.playerShipsPlacement.bind(this)("enter", el);
            };
            el.content.onmouseleave = () => {
              this.playerShipsPlacement.bind(this)("leave", el);
            };
            el.content.onclick = () => {
              this.playerShipsPlacement.bind(this)("click", el);
            };
            el.content.oncontextmenu = () => {
              this.direction = !this.direction;
            };
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
  highlightShip(event) {
    if (this.clickedShip.parentElement == event.srcElement) {
      let shipsArray = event.srcElement.children;
      for (let i = 0; i < shipsArray.length; i++) {
        shipsArray[i].style.backgroundColor = "red";
      }
    } else {
      let shipsArray = event.srcElement.children;
      for (let i = 0; i < shipsArray.length; i++) {
        shipsArray[i].style.backgroundColor = "gray";
      }
    }
  },
  unhighlightShip(event) {
    if (this.clickedShip.parentElement == event.srcElement) {
      let shipsArray = event.srcElement.children;
      for (let i = 0; i < shipsArray.length; i++) {
        shipsArray[i].style.backgroundColor = "green";
      }
    } else {
      let shipsArray = event.srcElement.children;
      for (let i = 0; i < shipsArray.length; i++) {
        shipsArray[i].style.backgroundColor = "white";
      }
    }
  },
  clickedShip: {
    ifClicked: false,
    ship: 0,
    parentElement: undefined,
    elements: undefined,
  },
  clickShip(event) {
    if (
      this.clickedShip.ifClicked &&
      event.srcElement.parentElement != this.clickedShip.parentElement
    ) {
      for (let i = 0; i < this.clickedShip.elements.length; i++) {
        this.clickedShip.elements[i].style.backgroundColor = "white";
      }
    }

    let shipsArray = event.srcElement.parentElement.children;
    for (let i = 0; i < shipsArray.length; i++) {
      shipsArray[i].style.backgroundColor = "green";
    }
    this.clickedShip.ifClicked = true;
    this.clickedShip.ship = event.srcElement.parentElement.childElementCount;
    this.clickedShip.parentElement = event.srcElement.parentElement;
    this.clickedShip.elements = event.srcElement.parentElement.children;

    console.log(this.clickedShip);
  },
  direction: true,
  playerShipsPlacement(key, el) {
    if (this.direction) {
      if (this.clickedShip.ifClicked) {
        let canPlace = true;
        switch (key) {
          case "enter":
            for (let i = 0; i < this.clickedShip.ship; i++) {
              if (el.x + 1 + i > this.width) {
                if (
                  this.playerBoard[el.y][this.width - 1 - i].content.id ==
                    "elClicked" ||
                  this.playerBoard[el.y][this.width - 1 - i].content.id ==
                    "elDisabled"
                ) {
                  canPlace = false;
                }
              } else {
                if (
                  this.playerBoard[el.y][el.x + i].content.id == "elClicked" ||
                  this.playerBoard[el.y][el.x + i].content.id == "elDisabled"
                ) {
                  canPlace = false;
                }
              }
            }

            if (canPlace) {
              for (let i = 0; i < this.clickedShip.ship; i++) {
                if (el.x + 1 + i > this.width) {
                  this.playerBoard[el.y][
                    this.width - 1 - i
                  ].content.style.backgroundColor = "blue";
                } else {
                  this.playerBoard[el.y][
                    el.x + i
                  ].content.style.backgroundColor = "blue";
                }
              }
            } else {
              for (let i = 0; i < this.clickedShip.ship; i++) {
                if (el.x + 1 + i > this.width) {
                  this.playerBoard[el.y][
                    this.width - 1 - i
                  ].content.style.backgroundColor = "red";
                } else {
                  this.playerBoard[el.y][
                    el.x + i
                  ].content.style.backgroundColor = "red";
                }
              }
            }
            break;
          case "leave":
            this.playerBoard.forEach((elements) => {
              elements.forEach((element) => {
                if (
                  element.content.style.backgroundColor == "blue" ||
                  element.content.style.backgroundColor == "red"
                ) {
                  element.content.style.backgroundColor = "";
                }
              });
            });
            break;
          case "click":
            for (let i = 0; i < this.playerBoard.length; i++) {
              for (let j = 0; j < this.playerBoard[i].length; j++) {
                if (
                  this.playerBoard[i][j].content.style.backgroundColor == "blue"
                ) {
                  this.playerBoard[i][j].content.style.backgroundColor =
                    "black";
                  this.playerBoardScheme[i + 1][j + 1] = 1;
                }
                if (
                  this.playerBoard[i][j].content.style.backgroundColor == "red"
                ) {
                  return;
                }
              }
            }

            this.updatePlayerBoard();

            console.log(this.playerBoardScheme);

            this.clickedShip.parentElement.style.display = "none";
            this.clickedShip = {
              ifClicked: false,
              ship: 0,
              parentElement: undefined,
              elements: undefined,
            };
            break;
        }
      }
    } else {
      if (this.clickedShip.ifClicked) {
        let canPlace = true;
        switch (key) {
          case "enter":
            for (let i = 0; i < this.clickedShip.ship; i++) {
              if (el.y + 1 + i > this.height) {
                if (
                  this.playerBoard[this.height - 1 - i][el.x].content.id ==
                    "elClicked" ||
                  this.playerBoard[this.height - 1 - i][el.x].content.id ==
                    "elDisabled"
                ) {
                  canPlace = false;
                }
              } else {
                if (
                  this.playerBoard[el.y + i][el.x].content.id == "elClicked" ||
                  this.playerBoard[el.y + i][el.x].content.id == "elDisabled"
                ) {
                  canPlace = false;
                }
              }
            }

            if (canPlace) {
              for (let i = 0; i < this.clickedShip.ship; i++) {
                if (el.y + 1 + i > this.height) {
                  this.playerBoard[this.height - 1 - i][
                    el.x
                  ].content.style.backgroundColor = "blue";
                } else {
                  this.playerBoard[el.y + i][
                    el.x
                  ].content.style.backgroundColor = "blue";
                }
              }
            } else {
              for (let i = 0; i < this.clickedShip.ship; i++) {
                if (el.y + 1 + i > this.height) {
                  this.playerBoard[this.height - 1 - i][
                    el.x
                  ].content.style.backgroundColor = "red";
                } else {
                  this.playerBoard[el.y + i][
                    el.x
                  ].content.style.backgroundColor = "red";
                }
              }
            }
            break;
          case "leave":
            this.playerBoard.forEach((elements) => {
              elements.forEach((element) => {
                if (
                  element.content.style.backgroundColor == "blue" ||
                  element.content.style.backgroundColor == "red"
                ) {
                  element.content.style.backgroundColor = "";
                }
              });
            });
            break;
          case "click":
            for (let i = 0; i < this.playerBoard.length; i++) {
              for (let j = 0; j < this.playerBoard[i].length; j++) {
                if (
                  this.playerBoard[i][j].content.style.backgroundColor == "blue"
                ) {
                  this.playerBoard[i][j].content.style.backgroundColor =
                    "black";
                  this.playerBoardScheme[i + 1][j + 1] = 1;
                }
                if (
                  this.playerBoard[i][j].content.style.backgroundColor == "red"
                ) {
                  return;
                }
              }
            }

            this.updatePlayerBoard();

            console.log(this.playerBoardScheme);

            this.clickedShip.parentElement.style.display = "none";
            this.clickedShip = {
              ifClicked: false,
              ship: 0,
              parentElement: undefined,
              elements: undefined,
            };
            break;
        }
      }
    }
  },
  updatePlayerBoard() {
    for (let i = 0; i < this.playerBoardScheme.length; i++) {
      for (let j = 0; j < this.playerBoardScheme[i].length; j++) {
        if (this.playerBoardScheme[i][j] == 1) {
          for (let h = j - 1; h < j + 2; h++) {
            this.playerBoardScheme[i - 1][h] =
              this.playerBoardScheme[i - 1][h] == 1 ? 1 : 2;
            this.playerBoardScheme[i][h] =
              this.playerBoardScheme[i][h] == 1 ? 1 : 2;
            this.playerBoardScheme[i + 1][h] =
              this.playerBoardScheme[i + 1][h] == 1 ? 1 : 2;
          }
        }
      }
      for (let i = 0; i < this.playerBoard.length; i++) {
        for (let j = 0; j < this.playerBoard[i].length; j++) {
          if (this.playerBoardScheme[i + 1][j + 1] == 2) {
            this.playerBoard[i][j].content.id = "elDisabled";
          }
          if (this.playerBoardScheme[i + 1][j + 1] == 1) {
            this.playerBoard[i][j].content.id = "elClicked";
          }
        }
      }
    }
  },
  botShipsPlacement(array) {
    function getRandomInt(min, max) {
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
