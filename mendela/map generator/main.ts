const firstGrid = document.getElementById("firstGrid") as HTMLBodyElement
const secondGrid = document.getElementById("secondGrid") as HTMLBodyElement

class Tile{
    x:number
    y:number
    background:string
    content:HTMLDivElement

    constructor(x:number, y:number, background:string, content:string){
        this.x = x
        this.y = y
        this.background = background
        
        const div = document.createElement("div")
        div.className = background
        let text = document.createTextNode(content)
        div.append(text)

        div.onclick = ()=>{
            alert(`x: ${x}, y:${y}`)
        }

        this.content = div
    }
}

class Grid{
    rows:number
    cols:number
    name:HTMLBodyElement
    content:Tile[][] = []
    constructor(rows:number, cols:number, name:HTMLBodyElement){
        for (let i = 0; i < rows; i++) {
            this.content[i]=[]
           for (let j = 0; j < cols; j++) {
            this.content[i][j] = new Tile(j,i,"tile","")
            // `x: ${j}, y:${i}`
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
        let tablica1 = new Grid(32,16,firstGrid)
        let tablica2 = new Grid(48,48,secondGrid)
        tablica1.converter()
        tablica2.converter()
    }
}

const game = new Game();
game.startGame()