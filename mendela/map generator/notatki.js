// interface Arr{
//     arr: number[][]
// }
// interface Rect{
//     w: number,
//     h: number,
//     name?:string
// }
// interface Point {
//     x:number,
//     y:number
// }
// interface Point3D extends Point{
//     z: number
// }
// class MapGen implements Arr, Rect{
//     arr : number[][];
//     w: number;
//     h:number;
//     pieces: Piece[] = [];
//     constructor(width:number,height:number,src:string){
//         let el=document.createElement("div");
//         el.innerText="lol"
//         this.pieces[0] = new Piece(12,12,"czerwony")
//         //let el2 = document.getElementById("w") as HTMLCanvasElement;
//         let el2 = <HTMLCanvasElement>document.getElementById("w");
//     }
//     pointSum(param:Point3D){
//         param.x = 1
//     }
//     suma(a:number, b:number) : number{
//         return 20;
//     } 
// }
// class Piece{
//     x:number
//     y:number
//     color:string
//     constructor(x:number,y:number,color:string){
//         this.x=x
//         this.y=y
//         this.color=color
//     }
// }
// console.log(new Piece(12,12,"czerwony"));
