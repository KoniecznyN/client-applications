$(document).ready(function () {
  let lps = ["lp", "cena", "produkt"];
  let ceny = ["5,60", "3,23", "7,45", "10,00", "3,20", "9,22", "8"];
  let produkty = ["chleb", "mąka", "masło", "kefir", "dżem", "inne", "kkk"];
  let bool = true;

  $("#btn").on("click", function () {
    if (bool) {
      $("#mainTable").addClass("mainTable");
      bool = false;
      let tr = $("<tr>");
      for (let i = 0; i < lps.length; ++i) {
        let td = $("<td>").html(lps[i]);
        tr.append(td).addClass("firstRow");
      }
      $("#mainTable").append(tr);

      tr = $("<tr>");
      for (let i = 0; i < ceny.length; ++i) {
        let tr = $("<tr>");
        for (let j = 0; j < lps.length; ++j) {
          if (j == 0) {
          }
          let td = $("<td>").html(lps[j]);
          switch (j) {
            case 0:
              td.html(i + 1);
              break;
            case 1:
              td.html(parseFloat(ceny[i].replace(",", ".")).toFixed(2));
              break;
            case 2:
              td.html(produkty[i]);
              break;
          }
          tr.append(td);
        }
        $("#mainTable").append(tr);
      }

      let wynik = 0;
      for (let i = 0; i < ceny.length; ++i) {
        temp = parseFloat(ceny[i].replace(",", "."));
        wynik += temp;
      }

      wynik = wynik.toFixed(2).toString().replace(".", ",");

      tr = $("<tr>");
      for (let i = 0; i < lps.length - 1; ++i) {
        let td = $("<td>");
        switch (i) {
          case 0:
            td.html("suma");
            break;
          case 1:
            td.html(wynik).attr("colspan", 2).addClass("wynik");
            break;
        }
        tr.append(td);
      }
      $("#mainTable").append(tr);
    }
  });
});
