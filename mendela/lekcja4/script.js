const header = document.getElementById("h1");
const win = document.getElementById("win");
const lost = document.getElementById("lost");
const winButton = document.getElementById("winButton");
const lostButton = document.getElementById("lostButton");
const main = document.getElementById("main");
const cards = document.getElementById("cards");
const timeBarOutline = document.getElementById("timeBarOutline");
const timeBar = document.getElementById("timeBar");
let arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let defaultBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let selectedTiles = [];
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
  selectedTiles = [];
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

function tile(tileIndex, arr) {
  let tile = document.querySelectorAll("#memoryTile");

  if (!ifInterval) {
    startInterval(time);
  }

  if (!tileClicked || !tile[tileIndex - 1].src.includes("images/0.jpg")) {
    return;
  }

  let tileSource = (tile[tileIndex - 1].src = `images/${
    arr[tileIndex - 1]
  }.jpg`);

  if (
    (selectedTiles.length == 1 && selectedTiles[0][1] != tileIndex) ||
    selectedTiles.length == 0
  ) {
    selectedTiles.push([tileSource, tileIndex]);
  }

  if (selectedTiles.length < 2) {
    return;
  }

  if (selectedTiles[0][0] == selectedTiles[1][0]) {
    counter++;
    selectedTiles = [];
  } else {
    tileClicked = false;
    setTimeout(() => {
      tile[selectedTiles[0][1] - 1].src = `images/0.jpg`;
      tile[selectedTiles[1][1] - 1].src = `images/0.jpg`;
      selectedTiles = [];
      tileClicked = true;
    }, 500);
  }
}

let dupa = new Date();
console.log(dupa);
dupa.setSeconds(10);
console.log(dupa.getSeconds());
console.log(dupa);

function startInterval(time) {
  ifInterval = true;
  let interval = window.setInterval(() => {
    time -= 1;
    // header.innerText = time;
    console.log(time);
    if (time == 0) {
      cards.style.display = "none";
      lost.style.display = "flex";
      // lostButton.style.display = "block";
      window.clearInterval(interval);
    }
    if (counter == 8) {
      cards.style.display = "none";
      win.style.display = "flex";
      window.clearInterval(interval);
    }
  }, 1000);
}

let time = 0;

function mainGame(gameTime) {
  time = gameTime;
  refresh(defaultBoard);
  header.innerText = time + "[s]";
}
