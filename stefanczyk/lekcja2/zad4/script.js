$(document).ready(function () {
  $("#box").on("mousedown", function () {
    $("#box").on("mousemove", function (e) {
      console.log("x: " + e.clientX);
      let x = e.clientX;
      console.log(y);
      if (x <= 25) {
        $("#box").css("left", 0);
        x = 0;
      } else if (x >= 475) {
        $("#box").css("left", 450);
        x = 450;
      } else {
        $("#box").css("left", x - 25);
      }
      $("#box").html(x);
    });
  });
  $("#box").on("mouseup", function () {
    $("#box").off("mousemove");
  });
});
