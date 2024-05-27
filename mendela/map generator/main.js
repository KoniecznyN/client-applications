var firstGrid = document.getElementById("firstGrid");
var secondGrid = document.getElementById("secondGrid");
var pom;
var Style = /** @class */ (function () {
    function Style(position, half) {
        this.image = "url('sprites.png')";
        this.size = "768px 480px";
        this.position = position;
        this.half = half;
    }
    return Style;
}());
var Tile = /** @class */ (function () {
    function Tile(x, y, background, half) {
        var _this = this;
        this.x = x;
        this.y = y;
        this.background = background;
        var div = document.createElement("div");
        div.className = background;
        if (half == "items") {
            div.className = "".concat(background, " item");
            if (this.y > 20) {
                this.x += 16;
            }
            this.style = new Style("-".concat(this.x * 24, "px -").concat(this.y * 24, "px"));
            div.style.backgroundImage = this.style["image"];
            div.style.backgroundSize = this.style["size"];
            div.style.backgroundPosition = this.style["position"];
            div.onclick = function () {
                if (pom != undefined) {
                    pom["style"] = _this.style;
                    console.log(pom);
                }
            };
        }
        else {
            if (this.style != undefined) {
                div.style.backgroundImage = this.style["image"];
                div.style.backgroundSize = this.style["size"];
                div.style.backgroundPosition = this.style["position"];
            }
            div.onclick = function () {
                pom = _this;
                console.log(pom);
            };
        }
        this.content = div;
    }
    return Tile;
}());
var Grid = /** @class */ (function () {
    function Grid(rows, cols, name, half) {
        this.content = [];
        for (var i = 0; i < rows; i++) {
            this.content[i] = [];
            for (var j = 0; j < cols; j++) {
                this.content[i][j] = new Tile(j, i, "tile", half);
            }
        }
        this.name = name;
    }
    Grid.prototype.converter = function () {
        var _this = this;
        this.name.innerHTML = "";
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
        var tablica1 = new Grid(40, 16, firstGrid, "items");
        var tablica2 = new Grid(48, 48, secondGrid);
        console.log(tablica2);
        tablica1.converter();
        tablica2.converter();
        window.onclick = function () {
            console.log("dupa");
            tablica2.converter();
        };
    };
    return Game;
}());
var game = new Game();
game.startGame();
