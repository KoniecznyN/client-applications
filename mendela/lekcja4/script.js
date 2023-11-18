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
  bool = true;
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

let bool = true;
let counter = 0;
let gameStarted = false;
async function tile(number, arr) {
  let tile = document.querySelectorAll("#memoryTile");
  if (bool && tile[number - 1].src.includes("images/0.jpg")) {
    let temp = (tile[number - 1].src = `images/${arr[number - 1]}.jpg`);
    if (
      (sources.length == 1 && sources[0][1] != number) ||
      sources.length == 0
    ) {
      sources.push([temp, number]);
    }
    if (sources.length >= 2) {
      if (sources[0][0] == sources[1][0]) {
        counter++;
        if (counter == 8) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          cards.style.display = "none";
          win.style.display = "flex";
        }
        sources = [];
      } else {
        bool = false;
        await new Promise((resolve) => setTimeout(resolve, 1000));
        tile[sources[0][1] - 1].src = `images/0.jpg`;
        tile[sources[1][1] - 1].src = `images/0.jpg`;
        sources = [];
        bool = true;
      }
    }
  }
}

function mainGame(time) {
  let playTime = time;
  let visiblePlayTime = parseFloat(time);

  refresh(defaultBoard);
  header.innerText = time + "[s]";
  let temp = window.setInterval(() => {
    playTime -= 1;
    // header.innerText = playTime;
    console.log(playTime);
    if (playTime == 0) {
      cards.style.display = "none";
      lost.style.display = "flex";
      // lostButton.style.display = "block";
      window.clearInterval(temp);
    }
  }, 1000);
}
