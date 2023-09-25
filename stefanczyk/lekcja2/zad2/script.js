$(document).ready(function () {
  // $(window).on("mousedown", function (e) {
  //     console.log("x: " + e.clientX + ", y: " + e.clientY)
  // })
  $(".middleDiv").on("mousedown", function (e) {
    console.log("x: " + e.clientX + " y: " + e.clientY);
  });

  $(".middleDiv").on("mousedown", () => {
    $(window).on("mousemove", (e) => {
      let offsetLeftDiv = $(".leftDiv").offset().left;
      let rightWidth =
        $(window).width() - $(".leftDiv").width() - $(".middleDiv").width();
      $(".leftDiv").css("width", e.clientX - offsetLeftDiv);
      $(".rightDiv").css("width", rightWidth);
      $(".middleDiv").css("left", e.clientX - offsetLeftDiv);
    });
    $(".middleDiv").on("mouseup", () => {
      $(window).off("mousemove");
    });
  });
});
