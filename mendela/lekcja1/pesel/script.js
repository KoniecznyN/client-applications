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
      birthMonth = `0${month}`;
      break;
    case "9":
      birthYear = "18" + pesel.slice(0, 2);
      birthMonth = `1${month}`;
      break;
    case "0":
      birthYear = "19" + pesel.slice(0, 2);
      birthMonth = `0${month}`;
      break;
    case "1":
      birthYear = "19" + pesel.slice(0, 2);
      birthMonth = `1${month}`;
      break;
    case "2":
      birthYear = "20" + pesel.slice(0, 2);
      birthMonth = `0${month}`;
      break;
    case "3":
      birthYear = "20" + pesel.slice(0, 2);
      birthMonth = `1${month}`;
      break;
    case "4":
      birthYear = "21" + pesel.slice(0, 2);
      birthMonth = `0${month}`;
      break;
    case "5":
      birthYear = "21" + pesel.slice(0, 2);
      birthMonth = `1${month}`;
      break;
    case "6":
      birthYear = "22" + pesel.slice(0, 2);
      birthMonth = `0${month}`;
      break;
    case "7":
      birthYear = "22" + pesel.slice(0, 2);
      birthMonth = `1${month}`;
      break;
  }

  const genderNumber = parseInt(pesel[9]);
  const gender = genderNumber % 2 === 0 ? "Kobieta" : "Mężczyzna";

  const birthDay = pesel[4] + pesel[5];
  const date = `Urodzony:  ${birthDay}.${birthMonth}.${birthYear} `;
  document.write(date, "<br>", `Płeć: ${gender}`);
}

const pesel = prompt("Podaj pesel");
PESEL(pesel);
