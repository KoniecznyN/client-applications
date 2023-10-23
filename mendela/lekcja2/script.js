function DNA(dna) {
  let dnaA = "";
  let dnaArray = [];
  let dnaArrayB = [];

  let charsDnaArrayB = { A: "T", T: "A", C: "G", G: "C" };

  for (let i = 0; i < dna.length; i += 3) {
    dnaA = dna.slice(i, i + 3).toUpperCase();
    dnaArray.push(dnaA);
  }

  console.log(dnaArray);

  let dnaStats = [];
  for (let i = 0; i < dnaArray.length; ++i) {
    let counter = 0;
    for (let j = 0; j < dnaArray.length; ++j) {
      if (dnaArray[i] == dnaArray[j]) {
        counter += 1;
      }
      if (j == dnaArray.length - 1) {
        let dnaStatsElement = `${dnaArray[i]} - ${counter}`;
        dnaStats.push(dnaStatsElement);
      }
    }
  }

  console.log(dnaStats);
  console.log(dnaStats[2]);

  dnaArray.forEach((element) => {
    dnaArrayB.push(element.replace(/[TACG]/g, (m) => charsDnaArrayB[m]));
  });

  dnaArray = dnaArray.join();
  dnaArrayB = dnaArrayB.join();

  dnaArray = dnaArray.replace(/ATG/g, '<span class="atg">ATG</span>');
  dnaArray = dnaArray.replace(/TAA/g, '<span class="yellow">TAA</span>');
  dnaArray = dnaArray.replace(/TAG/g, '<span class="yellow">TAG</span>');
  dnaArray = dnaArray.replace(/TGA/g, '<span class="yellow">TGA</span>');

  dnaArray = dnaArray.replaceAll(",", " ");
  dnaArrayB = dnaArrayB.replaceAll(",", " ");

  let result = `${dnaArray} <br><br> ${dnaArrayB}`;

  return result;
}

let dna = prompt();
document.write(DNA(dna));
