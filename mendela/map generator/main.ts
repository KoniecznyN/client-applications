const firstGrid = document.getElementById("firstGrid") as HTMLBodyElement
const secondGrid = document.getElementById("secondGrid") as HTMLBodyElement

let helper: object | undefined

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
                    helper["style"] = this.style
                    helper["content"].style.border = ".5px dotted white"
                    helper = undefined
                }
            }
        } else {
            div.onclick = () => {
                if (helper != undefined) {
                    helper["content"].style.border = ".5px dotted white"
                }
                helper = this
                helper["content"].style.border = ".5px dotted red"
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

    converter(){
        this.html.innerHTML = ""
        this.content.forEach(element => {
            const row = document.createElement("div")
            row.className = "row"
            element.forEach(element => {
                row.append(element.content)
            });
            this.html.append(row)
        });
    }
}

class Game {
    startGame(){
        var tablica1 = new Grid(40,16,firstGrid, "items")
        var tablica2 = new Grid(40,40,secondGrid)
        console.log(tablica2);
        tablica1.converter()
        tablica2.converter()

        window.onclick = ()=>{
            this.refreshGrid(tablica2.content)
        }
    }
    refreshGrid(array:Tile[][]){
        array.forEach(element => {
            element.forEach(element => {
                if (element.style != undefined) {
                    element.content.style.backgroundImage = element.style["image"]
                    element.content.style.backgroundSize = element.style["size"]
                    element.content.style.backgroundPosition = element.style["position"]
                    console.log(element);
                    
                }

            });
        });
    }
}


const game = new Game();
game.startGame()