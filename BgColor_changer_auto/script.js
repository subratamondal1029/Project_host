let start;
function randomColor() {
  const red = Math.floor(Math.random() * 255 + 1);
  const green = Math.floor(Math.random() * 255 + 1);
  const blue = Math.floor(Math.random() * 255 + 1);
  const a = Math.random().toFixed(2)

  return `rgba(${red}, ${green}, ${blue}, ${a})`;
}

function changeBgColor() {
  const bgColor = randomColor();
  document.body.style.backgroundColor = bgColor;
}

document.getElementById("start").addEventListener("click", () => {
  start = setInterval(changeBgColor, 1000);
});

document
  .getElementById("stop")
  .addEventListener("click", () => clearInterval(start));
