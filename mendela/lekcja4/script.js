// let images = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

function toggle() {
  document.getElementById("main").style.display = "none";
  document.getElementById("cards").style.display = "block";
}

function init() {
  let arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

  let refresh = () => {
    let els = document.querySelectorAll("#memoryTile img");
    for (let i = 0; i < els.length; ++i) {
      els[i].src = `images/${arr[i]}.jpg`;
    }
  };

  refresh();

  let shuffle = (arr) => {
    let pom = [];
    while (arr.length > 0) {
      const x = Math.floor(Math.random() * arr.length);
      const r = arr.splice(x, 1);
      pom.push[r[0]];
    }
    return pom;
  };
  console.log(shuffle(arr));

  console.log(refresh(arr));
  console.log(shuffle(arr));
}

function mainGame() {}
