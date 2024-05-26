const firstGrid = document.getElementById("firstGrid") as HTMLBodyElement
const secondGrid = document.getElementById("secondGrid") as HTMLBodyElement

class Style {
    image:string
    size:string
    position:string
    half?:string
    constructor(position:string, half?:string) {
        this.image = "url('sprites.png')"
        this.size = "768px 480px"
        this.position = position
        this.half = half
    }
}

class Tile {
    x:number
    y:number
    background:string
    content:HTMLDivElement
    style:object

    constructor(x:number, y:number, background:string, half?: string){
        this.x = x
        this.y = y
        this.background = background
        
        const div = document.createElement("div")
        div.className = background

        if (half == "items"){
            div.className = `${background} item`
            if (this.y > 20) {
                this.x += 16
            }

            this.style = new Style(`-${this.x*24}px -${this.y*24}px`)

            div.style.backgroundImage = this.style["image"];
            div.style.backgroundSize = this.style["size"];
            div.style.backgroundPosition = this.style["position"]

        } else {
            div.onclick = ()=>{
                alert(`x: ${this.x}, y:${this.y}`)
            }
        }


        this.content = div
    }
}

class Grid{
    rows:number
    cols:number
    name:HTMLBodyElement
    content:Tile[][] = []
    constructor(rows:number, cols:number, name:HTMLBodyElement, half?:string){
        for (let i = 0; i < rows; i++) {
            this.content[i]=[]
           for (let j = 0; j < cols; j++) {
            this.content[i][j] = new Tile(j,i,"tile", half)
           } 
        }

        this.name = name
    }

    converter(){
        this.content.forEach(element => {
            const row = document.createElement("div")
            row.className = "row"
            element.forEach(element => {
                row.append(element.content)
            });
            this.name.append(row)
        });
    }
}

class Game {
    startGame(){
        let tablica1 = new Grid(40,16,firstGrid, "items")
        let tablica2 = new Grid(48,48,secondGrid)
        tablica1.converter()
        tablica2.converter()
    }
}

const game = new Game();
game.startGame()