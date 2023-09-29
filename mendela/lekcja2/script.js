function DNA(dna) {
  let dnaArray = [];
  let dnaA = "";
  for (let i = 0; i < dna.length; i += 3) {
    dnaA = dna.slice(i, i + 3).toUpperCase();
    dnaArray.push(dnaA);
  }

  dnaArray = dnaArray.join();

  dnaArray = dnaArray.replace(/ATG/g, '<span class="atg">ATG</span>');
  dnaArray = dnaArray.replace(/TAA/g, '<span class="yellow">TAA</span>');
  dnaArray = dnaArray.replace(/TAG/g, '<span class="yellow">TAG</span>');
  dnaArray = dnaArray.replace(/TGA/g, '<span class="yellow">TGA</span>');

  dnaArray = dnaArray.replaceAll(",", " ");

  let dnaArray2 = dnaArray.replace(/A/g, "T");
  // dnaArray2 = dnaArray.replace(/T/g, "A");
  return document.write(dnaArray + "<br>" + dnaArray2);
}

let dna = prompt();
document.write(DNA(dna));
