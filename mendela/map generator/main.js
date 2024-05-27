var firstGrid = document.getElementById("firstGrid");
var secondGrid = document.getElementById("secondGrid");
var helper;
var Style = /** @class */ (function () {
    function Style(position, flag) {
        this.image = "url('sprites.png')";
        this.size = "768px 480px";
        this.position = position;
        this.flag = flag;
    }
    return Style;
}());
var Tile = /** @class */ (function () {
    function Tile(x, y, css, flag) {
        var _this = this;
        this.x = x;
        this.y = y;
        this.css = css;
        var div = document.createElement("div");
        div.className = css;
        if (flag == "items") {
            div.className = "".concat(css, " item");
            if (this.y > 20) {
                this.x += 16;
            }
            this.style = new Style("-".concat(this.x * 24, "px -").concat(this.y * 24, "px"));
            div.style.backgroundImage = this.style["image"];
            div.style.backgroundSize = this.style["size"];
            div.style.backgroundPosition = this.style["position"];
            div.onclick = function () {
                if (helper != undefined) {
                    helper["style"] = _this.style;
                    helper["content"].style.border = ".5px dotted white";
                    helper = undefined;
                }
            };
        }
        else {
            div.onclick = function () {
                if (helper != undefined) {
                    helper["content"].style.border = ".5px dotted white";
                }
                helper = _this;
                helper["content"].style.border = ".5px dotted red";
            };
        }
        this.content = div;
    }
    return Tile;
}());
var Grid = /** @class */ (function () {
    function Grid(rows, cols, html, flag) {
        this.content = [];
        for (var i = 0; i < rows; i++) {
            this.content[i] = [];
            for (var j = 0; j < cols; j++) {
                this.content[i][j] = new Tile(j, i, "tile", flag);
            }
        }
        this.html = html;
    }
    Grid.prototype.converter = function () {
        var _this = this;
        this.html.innerHTML = "";
        this.content.forEach(function (element) {
            var row = document.createElement("div");
            row.className = "row";
            element.forEach(function (element) {
                row.append(element.content);
            });
            _this.html.append(row);
        });
    };
    return Grid;
}());
var Game = /** @class */ (function () {
    function Game() {
    }
    Game.prototype.startGame = function () {
        var _this = this;
        var tablica1 = new Grid(40, 16, firstGrid, "items");
        var tablica2 = new Grid(40, 40, secondGrid);
        console.log(tablica2);
        tablica1.converter();
        tablica2.converter();
        window.onclick = function () {
            _this.refreshGrid(tablica2.content);
        };
    };
    Game.prototype.refreshGrid = function (array) {
        array.forEach(function (element) {
            element.forEach(function (element) {
                if (element.style != undefined) {
                    element.content.style.backgroundImage = element.style["image"];
                    element.content.style.backgroundSize = element.style["size"];
                    element.content.style.backgroundPosition = element.style["position"];
                    console.log(element);
                }
            });
        });
    };
    return Game;
}());
var game = new Game();
game.startGame();
