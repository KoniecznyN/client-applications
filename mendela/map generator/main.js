var firstGrid = document.getElementById("firstGrid");
var secondGrid = document.getElementById("secondGrid");
var helper;
var Static = /** @class */ (function () {
    function Static() {
        Static.tablica1 = new Grid(40, 16, firstGrid, "items");
        Static.tablica2 = new Grid(48, 48, secondGrid);
    }
    return Static;
}());
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
            div.className = css + " item";
            if (this.y > 20) {
                this.x += 16;
            }
            this.style = new Style("-" + this.x * 24 + "px -" + this.y * 24 + "px");
            div.style.backgroundImage = this.style["image"];
            div.style.backgroundSize = this.style["size"];
            div.style.backgroundPosition = this.style["position"];
            div.onclick = function () {
                if (helper != undefined) {
                    Static.tablica2.content[helper["y"]][helper["x"]].content.style.border = ".5px dotted white";
                    Static.tablica2.content[helper["y"]][helper["x"]].style = _this.style;
                    Static.tablica2.refreshGrid(Static.tablica2);
                    helper = undefined;
                }
            };
        }
        else {
            div.onclick = function () {
                _this.content.style.border = ".5px dotted red";
                helper = { x: _this.x, y: _this.y };
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
    Grid.prototype.refreshGrid = function (grid) {
        grid.content.forEach(function (element) {
            element.forEach(function (element) {
                if (element.style != undefined) {
                    element.content.style.backgroundImage = element.style["image"];
                    element.content.style.backgroundSize = element.style["size"];
                    element.content.style.backgroundPosition = element.style["position"];
                }
            });
        });
    };
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
            //Game.tablica1
        });
    };
    return Grid;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.startGame();
    }
    Game.prototype.startGame = function () {
        Static.tablica1.converter();
        Static.tablica2.converter();
        var kordy = {};
        secondGrid.onmousedown = function (e) {
            kordy = { x: e.clientX, y: e.clientY };
            console.log(e);
            console.log(e.clientX);
            var div = document.createElement("div");
            div.style.top = kordy.y.toString();
            div.style.left = kordy.x.toString();
            div.style.backgroundColor = "yellow";
            div.style.opacity = "50%";
            div.id = "selector";
            secondGrid.append(div);
        };
        secondGrid.onmousemove = function (e) {
            var div = document.getElementById("selector");
            div.style.width = e.clientX - kordy.x + "px";
            div.style.height = e.clientY - kordy.y + "px";
            console.log(div.style.width);
            console.log(div.style.height);
        };
        secondGrid.onmouseup = function (e) {
            e.preventDefault();
        };
    };
    return Game;
}());
new Static();
new Game();
