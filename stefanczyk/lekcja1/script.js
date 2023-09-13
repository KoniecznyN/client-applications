$(document).ready(() => {
  let button = true;
  $("#btn").on("click", () => {
    if (button) {
      $("#btn").css("background", "red").css("border", "2px solid black");
      $("#h1").html("obsługa zdarzeń <br>dodana");
      $("#box").on("mousemove", () => {
        $("#box")
          .css("background", "red")
          .html(
            "<p style=\"font-size: 45px; font-family: 'Courier New', Courier, monospace; text-align: center; color: white;\"><b>tekst bold</b><br> <i>tekst italic</i></p>"
          );
      });
      $("#box").on("mouseleave", () => {
        $("#box").css("background", "grey").html(null);
        console.log("chu");
      });
    } else {
      $("#btn").css("background", "grey").css("border", "none");
      $("#h1").html("obsługa zdarzeń <br>usunięta");
      $("#box").off("mousemove").off("mouseleave");
    }
    button = !button;
  });
});
