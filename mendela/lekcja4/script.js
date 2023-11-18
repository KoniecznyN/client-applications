const header = document.getElementById("h1");
const win = document.getElementById("win");
const lost = document.getElementById("lost");
const winButton = document.getElementById("winButton");
const lostButton = document.getElementById("lostButton");
const main = document.getElementById("main");
const cards = document.getElementById("cards");
let arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let defaultBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let sources = [];
arr = shuffle(arr);

function toggle() {
  main.style.display = "none";
  cards.style.display = "block";
}

function reversedToggle() {
  main.style.display = "block";
  cards.style.display = "none";
  win.style.display = "none";
  lost.style.display = "none";
  header.innerText = "MEMORY GAME";
  tileClicked = true;
  ifInterval = false;
  counter = 0;
  sources = [];
  refresh(defaultBoard);
}

function shuffle(arr) {
  let secondArr = [];
  while (arr.length > 0) {
    const randomElement = Math.floor(Math.random() * arr.length);
    const element = arr.splice(randomElement, 1);
    secondArr.push(element[0]);
  }
  return secondArr;
}

function refresh(arr) {
  let element = document.querySelectorAll("#memoryTile");
  for (let i = 0; i < element.length; ++i) {
    element[i].src = `images/${arr[i]}.jpg`;
  }
}

let tileClicked = true;
let counter = 0;
let ifInterval = false;

async function tile(number, arr) {
  let tile = document.querySelectorAll("#memoryTile");
  if (!ifInterval) {
    startInterval(time);
  }
  if (tileClicked && tile[number - 1].src.includes("images/0.jpg")) {
    let tileSource = (tile[number - 1].src = `images/${arr[number - 1]}.jpg`);
    if (
      (sources.length == 1 && sources[0][1] != number) ||
      sources.length == 0
    ) {
      sources.push([tileSource, number]);
    }
    if (sources.length >= 2) {
      if (sources[0][0] == sources[1][0]) {
        counter++;
        sources = [];
      } else {
        tileClicked = false;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        tile[sources[0][1] - 1].src = `images/0.jpg`;
        tile[sources[1][1] - 1].src = `images/0.jpg`;
        sources = [];
        tileClicked = true;
      }
    }
  }
}

function startInterval(time) {
  ifInterval = true;
  let temp = window.setInterval(() => {
    time -= 1;
    // header.innerText = time;
    console.log(time);
    if (time == 0) {
      cards.style.display = "none";
      lost.style.display = "flex";
      // lostButton.style.display = "block";
      window.clearInterval(temp);
    }
    if (counter == 8) {
      cards.style.display = "none";
      win.style.display = "flex";
      window.clearInterval(temp);
    }
  }, 1000);
}

let time = 0;

function mainGame(gameTime) {
  time = gameTime;
  refresh(defaultBoard);
  header.innerText = time + "[s]";
}
