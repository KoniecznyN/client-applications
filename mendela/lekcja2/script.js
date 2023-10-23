function DNA(dna) {
  let dnaA = "";
  let dnaArray = [];
  let dnaArrayB = [];
  let charsDnaArrayB = { A: "T", T: "A", C: "G", G: "C" };

  dna = dna.replaceAll(/[^a-z]/gi, "");

  for (let i = 0; i < dna.length; i += 3) {
    dnaA = dna.slice(i, i + 3).toUpperCase();
    dnaArray.push(dnaA);
  }

  dnaArray.forEach((element) => {
    dnaArrayB.push(element.replace(/[TACG]/g, (n) => charsDnaArrayB[n]));
  });

  let dnaStats = [];
  for (let i = 0; i < dnaArray.length; ++i) {
    let counter = 0;
    for (let j = 0; j < dnaArray.length; ++j) {
      if (dnaArray[i] == dnaArray[j]) {
        counter += 1;
      }
      if (j == dnaArray.length - 1) {
        let dnaStatsElement = { kodon: dnaArray[i], count: counter };
        dnaStats.push(dnaStatsElement);
      }
    }
  }

  let dnaStatsA = [];
  for (let i = 0; i < dnaStats.length; ++i) {
    if (dnaStats[i].count != -1) {
      dnaStatsA.push(JSON.parse(JSON.stringify(dnaStats[i])));
    }
    let kodon = dnaStats[i].kodon;
    for (let j = i; j < dnaStats.length; ++j) {
      if (kodon == dnaStats[j].kodon) {
        dnaStats[j].count = -1;
      }
    }
  }

  dnaStatsA.sort((a, b) => (a.count < b.count ? 1 : -1));

  dnaArray = dnaArray.join();
  dnaArrayB = dnaArrayB.join();

  dnaArray = dnaArray.replace(/ATG/g, '<span class="atg">ATG</span>');
  dnaArray = dnaArray.replace(/TAA/g, '<span class="yellow">TAA</span>');
  dnaArray = dnaArray.replace(/TAG/g, '<span class="yellow">TAG</span>');
  dnaArray = dnaArray.replace(/TGA/g, '<span class="yellow">TGA</span>');

  dnaArray = dnaArray.replaceAll(",", " ");
  dnaArrayB = dnaArrayB.replaceAll(",", " ");

  document.write(`${dnaArray} <br><br> ${dnaArrayB}`);

  let color = "";
  for (let i = 0; i < dnaStatsA.length; ++i) {
    if (i % 5 == 0) {
      const R = Math.round(Math.random() * 255);
      const G = Math.round(Math.random() * 255);
      const B = Math.round(Math.random() * 255);
      color = `${R}, ${G}, ${B}`;
    }
    document.write(
      `<p style="background-color: rgb(${color}); padding: 5px; margin: 0;">${dnaStatsA[i].kodon} - ${dnaStatsA[i].count}</p>`
    );
  }
}

let dna = prompt();
DNA(dna);
