const PESEL = (pesel) => {
  if (pesel.length != 11) {
    return document.write("BŁĘDNE DANE");
  } else {
    let controlNumber =
      parseInt(pesel[0], 10) +
      parseInt(pesel[1], 10) * 3 +
      parseInt(pesel[2], 10) * 7 +
      parseInt(pesel[3], 10) * 9 +
      parseInt(pesel[4], 10) +
      parseInt(pesel[5], 10) * 3 +
      parseInt(pesel[6], 10) * 7 +
      parseInt(pesel[7], 10) * 9 +
      parseInt(pesel[8], 10) +
      parseInt(pesel[9], 10) * 3 +
      parseInt(pesel[10], 10);

    controlNumber = controlNumber.toString();

    if (controlNumber[controlNumber.length - 1] != 0) {
      return document.write("NIE ISTNIEJE TAKI PESEL");
    } else {
      const century = pesel[2];
      const month = pesel[3];
      switch (century) {
        case "8":
          birthYear = "18" + pesel.slice(0, 2);
          switch (month) {
            case "1":
              birthMonth = "Styczeń";
              break;
            case "2":
              birthMonth = "Luty";
              break;
            case "3":
              birthMonth = "Marzec";
              break;
            case "4":
              birthMonth = "Kwiecień";
              break;
            case "5":
              birthMonth = "Maj";
              break;
            case "6":
              birthMonth = "Czerwiec";
              break;
            case "7":
              birthMonth = "Lipiec";
              break;
            case "8":
              birthMonth = "Sierpień";
              break;
            case "9":
              birthMonth = "Wrzesień";
              break;
          }
          break;
        case "9":
          birthYear = "18" + pesel.slice(0, 2);
          switch (month) {
            case "0":
              birthMonth = "Październik";
              break;
            case "1":
              birthMonth = "Listopad";
              break;
            case "2":
              birthMonth = "Grudzień";
              break;
          }
        case "0":
          birthYear = "19" + pesel.slice(0, 2);
          switch (month) {
            case "1":
              birthMonth = "Styczeń";
              break;
            case "2":
              birthMonth = "Luty";
              break;
            case "3":
              birthMonth = "Marzec";
              break;
            case "4":
              birthMonth = "Kwiecień";
              break;
            case "5":
              birthMonth = "Maj";
              break;
            case "6":
              birthMonth = "Czerwiec";
              break;
            case "7":
              birthMonth = "Lipiec";
              break;
            case "8":
              birthMonth = "Sierpień";
              break;
            case "9":
              birthMonth = "Wrzesień";
              break;
          }
          break;
        case "1":
          birthYear = "19" + pesel.slice(0, 2);
          switch (month) {
            case "0":
              birthMonth = "Październik";
              break;
            case "1":
              birthMonth = "Listopad";
              break;
            case "2":
              birthMonth = "Grudzień";
              break;
          }
        case "2":
          birthYear = "20" + pesel.slice(0, 2);
          switch (month) {
            case "1":
              birthMonth = "Styczeń";
              break;
            case "2":
              birthMonth = "Luty";
              break;
            case "3":
              birthMonth = "Marzec";
              break;
            case "4":
              birthMonth = "Kwiecień";
              break;
            case "5":
              birthMonth = "Maj";
              break;
            case "6":
              birthMonth = "Czerwiec";
              break;
            case "7":
              birthMonth = "Lipiec";
              break;
            case "8":
              birthMonth = "Sierpień";
              break;
            case "9":
              birthMonth = "Wrzesień";
              break;
          }
          break;
        case "3":
          birthYear = "20" + pesel.slice(0, 2);
          switch (month) {
            case "0":
              birthMonth = "Październik";
              break;
            case "1":
              birthMonth = "Listopad";
              break;
            case "2":
              birthMonth = "Grudzień";
              break;
          }
        case "4":
          birthYear = "21" + pesel.slice(0, 2);
          switch (month) {
            case "1":
              birthMonth = "Styczeń";
              break;
            case "2":
              birthMonth = "Luty";
              break;
            case "3":
              birthMonth = "Marzec";
              break;
            case "4":
              birthMonth = "Kwiecień";
              break;
            case "5":
              birthMonth = "Maj";
              break;
            case "6":
              birthMonth = "Czerwiec";
              break;
            case "7":
              birthMonth = "Lipiec";
              break;
            case "8":
              birthMonth = "Sierpień";
              break;
            case "9":
              birthMonth = "Wrzesień";
              break;
          }
          break;
        case "5":
          birthYear = "21" + pesel.slice(0, 2);
          switch (month) {
            case "0":
              birthMonth = "Październik";
              break;
            case "1":
              birthMonth = "Listopad";
              break;
            case "2":
              birthMonth = "Grudzień";
              break;
          }
        case "6":
          birthYear = "2" + pesel.slice(0, 2);
          switch (month) {
            case "1":
              birthMonth = "Styczeń";
              break;
            case "2":
              birthMonth = "Luty";
              break;
            case "3":
              birthMonth = "Marzec";
              break;
            case "4":
              birthMonth = "Kwiecień";
              break;
            case "5":
              birthMonth = "Maj";
              break;
            case "6":
              birthMonth = "Czerwiec";
              break;
            case "7":
              birthMonth = "Lipiec";
              break;
            case "8":
              birthMonth = "Sierpień";
              break;
            case "9":
              birthMonth = "Wrzesień";
              break;
          }
          break;
        case "7":
          birthYear = "22" + pesel.slice(0, 2);
          switch (month) {
            case "0":
              birthMonth = "Październik";
              break;
            case "1":
              birthMonth = "Listopad";
              break;
            case "2":
              birthMonth = "Grudzień";
              break;
          }
      }
      let genderNumber = parseInt(pesel[9], 10);
      let gender = "";
      if (genderNumber % 2 == 0) {
        gender = "Płeć: Kobieta";
      } else {
        gender = "Płeć: Mężczyzna";
      }

      const birthDay = pesel[4] + pesel[5];
      const date = `Urodzony: ${birthYear} ${birthMonth} ${birthDay}`;
      document.write(date, "<br>", gender);
    }
  }
};

const pesel = prompt("Podaj pesel");
PESEL(pesel);
