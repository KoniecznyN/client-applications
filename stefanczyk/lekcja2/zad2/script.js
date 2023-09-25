$(document).ready(function () {
  // $(window).on("mousedown", function (e) {
  //     console.log("x: " + e.clientX + ", y: " + e.clientY)
  // })
  $(".middleDiv").on("mousedown", function (e) {
    console.log("x: " + e.clientX + " y: " + e.clientY);
  });

  $(".middleDiv").on("mousedown", () => {
    $(window).on("mousemove", (e) => {
      const windowWidth = $(window).width();
      const middleWidth = $(".middleDiv").width();
      const x =
        e.clientX < 0
          ? 0
          : e.clientX > windowWidth - middleWidth / 2
          ? windowWidth - middleWidth / 2
          : e.clientX;
      let rightWidth = windowWidth - $(".leftDiv").width() - middleWidth;
      $(".leftDiv").css("width", x);
      $(".rightDiv").css("width", rightWidth);
      $(".middleDiv").css("left", x);
    });
    $(".middleDiv").on("mouseup", () => {
      $(window).off("mousemove");
    });
  });
});
