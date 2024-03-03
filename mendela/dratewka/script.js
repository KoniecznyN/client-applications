import { locations } from "./data/locations.js";
import { displayItem } from "./data/items.js";

console.log(locations);

const game = {
  x: 6,
  y: 3,
  init() {
    this.displayLocation();
  },
  itemCarried: { inputName: "nothing" },
  inputActions: {
    N: "NORTH",
    S: "SOUTH",
    W: "WEST",
    E: "EAST",
    T: "TAKE",
    D: "DROP",
    V: "VOCABULARY",
    G: "GOSSIP",
  },
  displayLocation() {
    let directions = locations[this.y][this.x].directions;
    let what = directions
      .map((element) => this.inputActions[element])
      .join(", ");

    let items = "";
    for (let i = 0; i < locations[this.y][this.x].item.length; i++) {
      items += locations[this.y][this.x].item[i].inputName;
      if (i < locations[this.y][this.x].item.length - 1) {
        items += ", ";
      }
    }

    const template = `
        <h2>${locations[this.y][this.x].description}</h2>
        <div id="images">
          <img id="location" src="./img/${
            locations[this.y][this.x].src
          }" style="background-color: ${
      locations[this.y][this.x].color
    }" alt="location">
          <img id="compas" src="./compas.png" alt="compas" />
          <div id="coverN"></div>
          <div id="coverS"></div>
          <div id="coverE"></div>
          <div id="coverW"></div>
        </div>
        <div id="textarea">
          <p>You can go ${what}</p>
          <p>You see ${items}</p>
          <p>You are carrying ${this.itemCarried.inputName}</p>
          <label id="eventText" for="action">What now?</label>
          <input type="text" name="action" id="action" autofocus>
        </div>
        `;

    document.getElementById("game").innerHTML = template;

    directions.forEach((element) => {
      if (element == "N") {
        document.getElementById("coverN").style.display = "none";
      }
      if (element == "S") {
        document.getElementById("coverS").style.display = "none";
      }
      if (element == "E") {
        document.getElementById("coverE").style.display = "none";
      }
      if (element == "W") {
        document.getElementById("coverW").style.display = "none";
      }
    });

    let keyPress;
    window.addEventListener(
      "keypress",
      (keyPress = (event) => {
        console.log(event.key);
        if (event.key == "Enter") {
          this.action();
          window.removeEventListener("keypress", keyPress);
        }
      })
    );

    window.onclick = () => {
      document.getElementById("action").focus();
    };
  },
  action() {
    let direction = {};
    let action = "";
    let input = document.getElementById("action").value.toUpperCase();
    input = input.split(" ");
    let possibleDirections = locations[this.y][this.x].directions;
    let canGo = false;

    Object.entries(this.inputActions).forEach((element) => {
      if (input[0] == element[0] || input[0] == element[1]) {
        input[0] = element[1];
      }
    });

    //wybranie akcji
    if (input[0] == "NORTH") {
      direction = { shortcut: "N", vector: { x: 0, y: -1 } };
    } else if (input[0] == "SOUTH") {
      direction = { shortcut: "S", vector: { x: 0, y: 1 } };
    } else if (input[0] == "EAST") {
      direction = { shortcut: "E", vector: { x: 1, y: 0 } };
    } else if (input[0] == "WEST") {
      direction = { shortcut: "W", vector: { x: -1, y: 0 } };
    }

    //take
    else if (input[0] == "TAKE") {
      let itemExist = false;
      let itemIndex = 0;
      for (let i = 0; i < locations[this.y][this.x].item.length; i++) {
        if (locations[this.y][this.x].item[i].name == input[input.length - 1]) {
          itemExist = true;
          itemIndex = i;
          break;
        }
      }
      if (itemExist) {
        if (this.itemCarried.inputName == "nothing") {
          document.getElementById("eventText").innerText = `You are taking ${
            locations[this.y][this.x].item[itemIndex].inputName
          }`;
          this.itemCarried = locations[this.y][this.x].item[itemIndex];
          locations[this.y][this.x].item.splice(itemIndex, 1);
          if (locations[this.y][this.x].item.length == 0) {
            locations[this.y][this.x].item.push({ inputName: "nothing" });
          }
        } else {
          document.getElementById(
            "eventText"
          ).innerText = `You are carrying something`;
        }
      } else {
        document.getElementById(
          "eventText"
        ).innerText = `There isn't anything like that here`;
      }
    }

    //drop
    else if (input[0] == "DROP") {
      if (this.itemCarried.inputName != "nothing") {
        if (input[input.length - 1] == this.itemCarried.name) {
          document.getElementById(
            "eventText"
          ).innerText = `You are about to drop ${this.itemCarried.inputName}`;
          if (locations[this.y][this.x].item[0].inputName != "nothing") {
            locations[this.y][this.x].item.push(this.itemCarried);
          } else {
            locations[this.y][this.x].item[0] = this.itemCarried;
          }
          this.itemCarried = { inputName: "nothing" };
        } else {
          document.getElementById(
            "eventText"
          ).innerText = `You are not carrying it`;
        }
      } else {
        document.getElementById(
          "eventText"
        ).innerText = `You are not carrying anything`;
      }
    }

    //reszta akcji
    else if (input[0] == "VOCABULARY") {
      action = "V";
    } else if (input[0] == "GOSSIP") {
      action = "G";
    } else {
      this.displayLocation();
      document.getElementById("action").focus();
      return;
    }

    //poruszanie sie
    if (direction.shortcut != undefined) {
      possibleDirections.forEach((element) => {
        if (element == direction.shortcut) {
          canGo = true;
        }
      });

      if (canGo) {
        this.x += direction.vector.x;
        this.y += direction.vector.y;
        document.getElementById(
          "eventText"
        ).innerText = `You are going ${input}`;
      } else {
        document.getElementById(
          "eventText"
        ).innerText = `You can't go that way`;
      }
    }

    //gossip i vocabulary
    if (action.length != 0) {
      let template = "";
      if (action == "V") {
        template = `
          <p>NORTH or N, SOUTH or S</p>
          <p>WEST or W, EAST or E</p>
          <p>TAKE (object) or T (object)</p>
          <p>DROP (object) or D (object)</p>
          <p>USE (object) or U (object)</p>
          <p>GOSSIPS or G, VOCABULARY or V</p>
          </br>
          <p>Press any key...</p>
          `;
      } else if (action == "G") {
        template = `
          <p>The  woodcutter lost  his home key...</p>
          <p>The butcher likes fruit... The cooper</p>
          <p>is greedy... Dratewka plans to make a</p>
          <p>poisoned  bait for the dragon...  The</p>
          <p>tavern owner is buying food  from the</p>
          <p>pickers... Making a rag from a bag...</p>
          </br>
          <p>Press any key...</p>
          `;
      }

      document.getElementById("textarea").innerHTML = template;
      let keyPress;
      window.addEventListener(
        "keypress",
        (keyPress = () => {
          this.displayLocation();
          document.getElementById("action").focus();
          window.removeEventListener("keypress", keyPress);
        })
      );
      let keyUp;
      window.addEventListener(
        "keyup",
        (keyUp = () => {
          document.getElementById("action").value = "";
          window.removeEventListener("keyup", keyUp);
        })
      );
      return;
    }

    //end
    document.getElementById("action").style.display = "none";
    setTimeout(() => {
      this.displayLocation();
      document.getElementById("action").focus();
    }, 1000);
  },
};

game.init();
