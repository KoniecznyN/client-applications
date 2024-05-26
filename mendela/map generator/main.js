var firstGrid = document.getElementById("firstGrid");
var secondGrid = document.getElementById("secondGrid");
var Tile = /** @class */ (function () {
    function Tile(x, y, background, content) {
        this.x = x;
        this.y = y;
        this.background = background;
        var div = document.createElement("div");
        div.className = background;
        var text = document.createTextNode(content);
        div.append(text);
        div.onclick = function () {
            alert("x: ".concat(x, ", y:").concat(y));
        };
        this.content = div;
    }
    return Tile;
}());
var Grid = /** @class */ (function () {
    function Grid(rows, cols, name) {
        this.content = [];
        for (var i = 0; i < rows; i++) {
            this.content[i] = [];
            for (var j = 0; j < cols; j++) {
                this.content[i][j] = new Tile(j, i, "tile", "");
                // `x: ${j}, y:${i}`
            }
        }
        this.name = name;
    }
    Grid.prototype.converter = function () {
        var _this = this;
        this.content.forEach(function (element) {
            var row = document.createElement("div");
            row.className = "row";
            element.forEach(function (element) {
                row.append(element.content);
            });
            _this.name.append(row);
        });
    };
    return Grid;
}());
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.prototype.startGame = function () {
        var tablica1 = new Grid(32, 16, firstGrid);
        var tablica2 = new Grid(48, 48, secondGrid);
        tablica1.converter();
        tablica2.converter();
    };
    return Game;
}());
var game = new Game();
game.startGame();
