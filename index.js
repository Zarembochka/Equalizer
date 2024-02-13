const field = document.querySelector(".main__field");
const btn = document.querySelector(".btn");
const audio = document.querySelector(".audio-show");
let cells;
let context;
let analyser;
let timer;

btn.addEventListener("change", showPlayer);
audio.addEventListener("play", startEqualize);
audio.addEventListener("pause", pauseEqualize);

function showPlayer() {
  audio.src = URL.createObjectURL(btn.files[0]);
  audio.load();
  getInfoAboutFile();
  clearField();
}

function getInfoAboutFile() {
  if (typeof context === "undefined") {
    context = new AudioContext();
    analyser = context.createAnalyser();
    const source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);
  }
}

function startEqualize() {
  timer = setInterval(drawVawes, 500);
}

function pauseEqualize() {
  clearInterval(timer);
}

function clearField() {
  for (let i = 0; i < 100; i += 1) {
    cells[i].classList.remove("main__field__cell-play");
  }
}

function frequencyToBarHeight(frequency) {
  const maxFr = 255;
  const maxBarHeight = 9;
  return Math.round((frequency / 255) * maxBarHeight);
}

function drawVawes() {
  const fbc_array = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(fbc_array);
  clearField();
  for (let i = 0; i < 10; i += 1) {
    const cell_height = frequencyToBarHeight(fbc_array[i * 85]);
    for (j = 0; j <= cell_height; j += 1) {
      cells[90 + i - 10 * j].classList.add("main__field__cell-play");
    }
  }
}

function drawCells() {
  const rows = 100;
  for (let i = 0; i < rows; i += 1) {
    const cell = document.createElement("div");
    cell.classList.add("main__field__cell");
    field.append(cell);
  }
  cells = document.querySelectorAll(".main__field__cell");
}

drawCells();
