const monthToString = (month) => {
  switch (month) {
    case "1":
      return "Styczeń";
    case "2":
      return "Luty";
    case "3":
      return "Marzec";
    case "4":
      return "Kwiecień";
    case "5":
      return "Maj";
    case "6":
      return "Czerwiec";
    case "7":
      return "Lipiec";
    case "8":
      return "Sierpień";
    case "9":
      return "Wrzesień";
    case "10":
      return "Październik";
    case "11":
      return "Listopad";
    case "12":
      return "Grudzień";
  }
};

function PESEL(pesel) {
  if (pesel.length != 11) {
    return document.write("BŁĘDNE DANE");
  }

  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3, 1];
  const controlNumber = weights.reduce((acc, weight, index) => {
    return acc + weight * parseInt(pesel[index]);
  }, 0);

  if (controlNumber % 10 != 0) {
    return document.write("NIE ISTNIEJE TAKI PESEL");
  }

  const century = pesel[2];
  const month = pesel[3];

  switch (century) {
    case "8":
      birthYear = "18" + pesel.slice(0, 2);
      birthMonth = monthToString(month);
      break;
    case "9":
      birthYear = "18" + pesel.slice(0, 2);
      birthMonth = monthToString(`1${month}`);
      break;
    case "0":
      birthYear = "19" + pesel.slice(0, 2);
      birthMonth = monthToString(month);
      break;
    case "1":
      birthYear = "19" + pesel.slice(0, 2);
      birthMonth = monthToString(`1${month}`);
      break;
    case "2":
      birthYear = "20" + pesel.slice(0, 2);
      birthMonth = monthToString(month);
      break;
    case "3":
      birthYear = "20" + pesel.slice(0, 2);
      birthMonth = monthToString(`1${month}`);
      break;
    case "4":
      birthYear = "21" + pesel.slice(0, 2);
      birthMonth = monthToString(month);
      break;
    case "5":
      birthYear = "21" + pesel.slice(0, 2);
      birthMonth = monthToString(`1${month}`);
      break;
    case "6":
      birthYear = "22" + pesel.slice(0, 2);
      birthMonth = monthToString(month);
      break;
    case "7":
      birthYear = "22" + pesel.slice(0, 2);
      birthMonth = monthToString(`1${month}`);
      break;
  }

  const genderNumber = parseInt(pesel[9]);
  const gender = genderNumber % 2 === 0 ? "Kobieta" : "Mężczyzna";

  const birthDay = pesel[4] + pesel[5];
  const date = `Urodzony: ${birthYear} ${birthMonth} ${birthDay}`;
  document.write(date, "<br>", `Płeć: ${gender}`);
}

const pesel = prompt("Podaj pesel");
PESEL(pesel);
