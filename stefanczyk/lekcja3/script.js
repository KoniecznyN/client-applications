$(document).ready(function () {
  const count = 5;
  let tab = [];
  let playerOne = $("<div>").addClass("playerOne");
  let playerTwo = $("<div>").addClass("playerTwo");
  $(".main").append(playerOne).append(playerTwo);

  for (let i = 0; i < count; ++i) {
    for (let j = 0; j < count; ++j) {
      let box = $("<div>").addClass("box");
      $(".main").append(box);
      $(box)
        .css("left", i * 50)
        .css("top", j * 50)
        .html(`${j}-${i}`)
        .on("click", function () {
          $(box).css("background-color", "yellow");
          tab.push({ x: $(this).css("left"), y: $(this).css("top") });
        });
    }
  }

  $("#start").on("click", function () {
    if (tab.length >= 3) {
      playerOneX = tab[0].x;
      playerOneY = tab[0].y;
      $(playerOne).css("left", playerOneX).css("top", playerOneY);
      playerTwoX = tab[tab.length - 1].x;
      playerTwoY = tab[tab.length - 1].y;
      $(playerTwo).css("left", playerTwoX).css("top", playerTwoY);
    } else {
      console.log("błędne dane");
    }
  });

  let helpyy = true;
  let helpyOne = 1;
  let helpyTwo = 2;

  $("#move").on("click", function () {
    if (helpyy) {
      playerOneX = tab[helpyOne].x;
      playerOneY = tab[helpyOne].y;
      $(playerOne).css("left", playerOneX).css("top", playerOneY);
      ++helpyOne;
    } else {
      playerTwoX = tab[tab.length - helpyTwo].x;
      playerTwoY = tab[tab.length - helpyTwo].y;
      $(playerTwo).css("left", playerTwoX).css("top", playerTwoY);
      ++helpyTwo;
    }
    helpyy = !helpyy;
  });

  $("#reset").on("click", () => {
    $(".box").css("background-color", "white");
    $(playerOne).css("left", "-50px").css("top", "0");
    $(playerTwo).css("left", "-50px").css("top", "50px");
    tab = [];
    helpyy = true;
    helpyOne = 1;
    helpyTwo = 2;
  });
});
