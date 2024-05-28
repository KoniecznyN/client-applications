const firstGrid = document.getElementById("firstGrid") as HTMLBodyElement
const secondGrid = document.getElementById("secondGrid") as HTMLBodyElement

let helper: object | undefined

class Static {
    static tablica1:Grid
    static tablica2:Grid
    constructor() {
        Static.tablica1 = new Grid(40,16,firstGrid, "items")
        Static.tablica2 = new Grid(48,48,secondGrid)
    }
}

class Style {
    image:string
    size:string
    position:string
    flag?:string
    constructor(position:string, flag?:string) {
        this.image = "url('sprites.png')"
        this.size = "768px 480px"
        this.position = position
        this.flag = flag
    }
}

class Tile {
    x:number
    y:number
    css:string
    content:HTMLDivElement
    style?:object

    constructor(x:number, y:number, css:string, flag?: string){
        this.x = x
        this.y = y
        this.css = css
        
        const div = document.createElement("div")
        div.className = css

        if (flag == "items"){
            div.className = `${css} item`
            if (this.y > 20) {
                this.x += 16
            }

            this.style = new Style(`-${this.x*24}px -${this.y*24}px`)

            div.style.backgroundImage = this.style["image"];
            div.style.backgroundSize = this.style["size"];
            div.style.backgroundPosition = this.style["position"]

            div.onclick = () => {
                if (helper != undefined) {
                    Static.tablica2.content[helper["y"]][helper["x"]].content.style.border = ".5px dotted white"
                    Static.tablica2.content[helper["y"]][helper["x"]].style = this.style
                    Static.tablica2.refreshGrid(Static.tablica2)
                    helper = undefined
                }
            }
        } else {
            div.onclick = () => {
                this.content.style.border = ".5px dotted red"
                helper = {x: this.x, y: this.y}
            }
        }

        this.content = div
    }
}

class Grid{
    rows:number
    cols:number
    html:HTMLBodyElement
 
    content:Tile[][] = []
    constructor(rows:number, cols:number, html:HTMLBodyElement, flag?:string){
        for (let i = 0; i < rows; i++) {
            this.content[i]=[]
           for (let j = 0; j < cols; j++) {
            this.content[i][j] = new Tile(j,i,"tile", flag)
           } 
        }

        this.html = html

    }
    public refreshGrid(grid:Grid){
        grid.content.forEach(element => {
            element.forEach(element => {
                if (element.style != undefined) {
                    element.content.style.backgroundImage = element.style["image"]
                    element.content.style.backgroundSize = element.style["size"]
                    element.content.style.backgroundPosition = element.style["position"]
                }

            });
        });
    }

    public converter(){
        this.html.innerHTML = ""
        this.content.forEach(element => {
            const row = document.createElement("div")
            row.className = "row"
            element.forEach(element => {
                row.append(element.content)
            });
            this.html.append(row)
            //Game.tablica1
        });
    }
}

class Game {
    private startGame(){
        Static.tablica1.converter()
        Static.tablica2.converter()
        let kordy:object = {}
        
        secondGrid.onmousedown = (e:MouseEvent) => {
            kordy = {x: e.clientX, y: e.clientY}
            console.log(e);
            console.log(e.clientX);
            const div = document.createElement("div")

            div.style.top = kordy.y.toString()
            div.style.left = kordy.x.toString()

            div.style.backgroundColor = "yellow"
            div.style.opacity = "50%"

            div.id = "selector"
            secondGrid.append(div)
        }

        secondGrid.onmousemove = (e:MouseEvent) => {
            const div = document.getElementById("selector") as HTMLDivElement
            div.style.width = `${e.clientX - kordy.x}px`
            div.style.height = `${e.clientY - kordy.y}px`

            console.log(div.style.width);
            console.log(div.style.height);
            
        }

        secondGrid.onmouseup = (e:MouseEvent) => {
            e.preventDefault()
        }
    }
    constructor(){
        this.startGame();
    }
}

new Static()
new Game();