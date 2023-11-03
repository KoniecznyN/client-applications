const main = document.getElementById("main");
const box = document.getElementById("box");

const radius = 200;
const centerX = container.offsetWidth / 2;
const centerY = container.offsetHeight / 2;
const speed = 1;

let angle = 0;

function animate() {
  const x = centerX + radius * Math.cos(angle);
  const y = centerY + radius * Math.sin(angle);

  box.style.left = x - box.offsetWidth / 2 + `px`;
  box.style.top = y - box.offsetHeight / 2 + `px`;

  angle += speed * 0.01;

  requestAnimationFrame(animate);
}

animate();
