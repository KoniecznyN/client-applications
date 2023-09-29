function DNA(dna) {
  let dnaArray = [];
  let dnaArrayB = [];
  let charsDnaArrayB = { A: "T", T: "A", C: "G", G: "C" };
  let dnaA = "";

  for (let i = 0; i < dna.length; i += 3) {
    dnaA = dna.slice(i, i + 3).toUpperCase();
    dnaArray.push(dnaA);
  }

  dnaArray.forEach((element) => {
    dnaArrayB.push(element.replace(/[TACG]/g, (m) => charsDnaArrayB[m]));
  });

  dnaArray = dnaArray.join();
  dnaArrayB = dnaArrayB.join();

  // dnaArray = dnaArray.replace(/ATG/g, '<span class="atg">ATG</span>');
  // dnaArray = dnaArray.replace(/TAA/g, '<span class="yellow">TAA</span>');
  // dnaArray = dnaArray.replace(/TAG/g, '<span class="yellow">TAG</span>');
  // dnaArray = dnaArray.replace(/TGA/g, '<span class="yellow">TGA</span>');

  dnaArray = dnaArray.replaceAll(",", " ");
  dnaArrayB = dnaArrayB.replaceAll(",", " ");

  let result = `${dnaArray} <br><br> ${dnaArrayB}`;

  return result;
}

let dna = prompt();
document.write(DNA(dna));
