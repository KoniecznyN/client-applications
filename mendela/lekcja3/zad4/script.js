const main = document.getElementById("main");
const box = document.getElementById("box");

let centerX = main.clientWidth / 2;
let centerY = main.clientHeight / 2;

const radius = 100;
const angularSpeed = 5;
let angle = 0;
let dupa = 1;

function moveInCircle() {
  let boxPosition = { top: box.style.top, left: box.style.left };

  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);

  box.style.left = x - box.clientWidth / 2 + "px";
  box.style.top = y - box.clientWidth / 2 + "px";

  angle += angularSpeed * 0.01;
  // console.log(box.style.left);
  // console.log(box.style.top);

  requestAnimationFrame(moveInCircle);
}

moveInCircle();
