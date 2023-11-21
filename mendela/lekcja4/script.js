const header = document.getElementById("h1");
const win = document.getElementById("win");
const lost = document.getElementById("lost");
const winButton = document.getElementById("winButton");
const lostButton = document.getElementById("lostButton");
const main = document.getElementById("main");
const cards = document.getElementById("cards");
const timeBarOutline = document.getElementById("timeBarOutline");
const timeBarP = document.getElementById("timeBarP");
const timeBar = document.getElementById("timeBar");
let time = 0;
let arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let defaultBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let selectedTiles = [];
let cookieArrayThirty = [];
let cookieArraySixty = [];
let cookieArrayNinety = [];
const userObject = {
  username: "username",
  score: "score",
};
// arr = shuffle(arr);

function toggle() {
  main.style.display = "none";
  cards.style.display = "flex";
}

function reversedToggle() {
  main.style.display = "block";
  cards.style.display = "none";
  win.style.display = "none";
  lost.style.display = "none";
  header.innerText = "MEMORY GAME";
  timeBarOutline.style.display = "none";
  tileClicked = true;
  ifInterval = false;
  counter = 0;
  selectedTiles = [];
  refresh(defaultBoard);

  addToCookie(time);
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
let ifInterval = false;
let counter = 0;

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

function startInterval(time) {
  ifInterval = true;
  timeBarOutline.style.display = "block";

  const targetTime = new Date().getTime() + time * 1000;
  let timerId;

  function updateTimer() {
    const currentTime = new Date().getTime();
    const remainingTime = targetTime - currentTime;

    if (remainingTime <= 0) {
      timeBarP.innerText = "KONIEC CZASU";
      stopTimer();
      cards.style.display = "none";
      lost.style.display = "flex";
      return "Przegrana";
    } else {
      const minutes = Math.floor(remainingTime / (1000 * 60));
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
      const milliseconds = remainingTime % 1000;

      const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}:${String(milliseconds).padStart(3, "0")}`;

      timeBar.style.width = remainingTime / time / 10 + "%";
      timeBarP.innerText = formattedTime;
    }

    if (counter < 8) {
      timerId = setTimeout(updateTimer, 1);
    } else {
      stopTimer();
      const scoreTime = time * 1000 - remainingTime;
      const minutes = Math.floor(scoreTime / (1000 * 60));
      const seconds = Math.floor((scoreTime % (1000 * 60)) / 1000);
      const milliseconds = scoreTime % 1000;

      const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}:${String(milliseconds).padStart(3, "0")}`;

      cards.style.display = "none";
      win.style.display = "flex";
      userObject.score = formattedTime;
      return formattedTime;
    }
  }

  function stopTimer() {
    clearTimeout(timerId);
  }

  updateTimer();
}

function setPlaytime(playTime) {
  time = playTime;
  const username = prompt("Podaj imie: ");
  userObject.username = username;
  refresh(defaultBoard);
  header.innerText = `MEMORY (${time}[s])`;
}

function setCookie(cname, cvalue) {
  const d = new Date();
  d.setTime(d.getTime() + 1000 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function addToCookie(time) {
  let cookieObject = JSON.stringify(userObject);
  let cookie = document.cookie;
  console.log(cookie);
  switch (time) {
    case 30:
      cookieArrayThirty.push(cookieObject);
      if (cookieArrayThirty.length <= 1 && cookie.length > 0) {
        cookieArrayThirty = cookieToArray(cookie, "30");
        cookieArrayThirty.push(cookieObject);
      }
      console.log(cookieArrayThirty);
      setCookie("30", arrayToString(cookieArrayThirty));
      break;
    case 60:
      cookieArraySixty.push(cookieObject);
      if (cookieArraySixty.length <= 1 && cookie.length > 0) {
        cookieArraySixty = cookieToArray(cookie, "60");
        cookieArraySixty.push(cookieObject);
      }
      setCookie("60", cookieArraySixty);
      break;
    case 90:
      cookieArrayNinety.push(cookieObject);
      if (cookieArrayNinety.length <= 1 && cookie.length > 0) {
        cookieArrayNinety = cookieToArray(cookie, "90");
        cookieArrayNinety.push(cookieObject);
      }
      setCookie("90", cookieArrayNinety);
      break;
  }
  console.log(document.cookie);
  console.log(cookieToArray(document.cookie));
}

function cookieToArray(string, key) {
  array = string.split(";");
  let newArray = [];
  let result = [];
  for (let i = 0; i < array.length; i++) {
    let newElement = array[i];
    newArray = newElement.split("=");
    newArray[0] = newArray[0].replaceAll(" ", "");
    let stringElement = "";
    stringElement = newArray[1];
    stringElement = stringElement.replaceAll("},{", "};{");
    stringElement = stringElement.split(";");
    if (newArray[0] == key) {
      for (let j = 0; j < stringElement.length; j++) {
        result.push(JSON.parse(stringElement[j]));
      }
    } else continue;
  }

  return result;
}

function arrayToString(array) {
  array = array.toString();
  array = array.replaceAll("[", "");
  array = array.replaceAll("]", "");
  console.log(array);
  return array;
}
