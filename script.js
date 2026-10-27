const canvas = document.querySelector("#art-canvas");
const stateLabel = document.querySelector("#state-label");
const compositionCaption = document.querySelector("#composition-caption");
const moodOptions = [...document.querySelectorAll(".mood-option")];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const moods = {
  open: { label: "Sem escolher", colors: ["#d9d49b", "#bacb72", "#8ba253", "#c5a982"], scale: 0.52, speed: 0.48, complexity: 8 },
  contentment: { label: "Serenidade", colors: ["#d6d3aa", "#a9bd7a", "#748d6a", "#c2b58e"], scale: 0.4, speed: 0.2, complexity: 5 },
  awe: { label: "Admiração", colors: ["#d8c99a", "#b9c773", "#7c9675", "#d4a980"], scale: 0.72, speed: 0.36, complexity: 11 },
  excitement: { label: "Energia", colors: ["#e1c47d", "#c6cb64", "#db986e", "#8fa650"], scale: 0.68, speed: 0.84, complexity: 12 },
  sadness: { label: "Melancolia", colors: ["#9eaeb1", "#899a9d", "#aaa2a0", "#758a88"], scale: 0.34, speed: 0.16, complexity: 7 },
  fear: { label: "Inquietação", colors: ["#bba995", "#a68d79", "#a5a16f", "#746e60"], scale: 0.3, speed: 0.68, complexity: 10 },
  amusement: { label: "Leveza", colors: ["#ddcf8f", "#b9ca70", "#e0a57b", "#9ab278"], scale: 0.62, speed: 0.58, complexity: 9 },
};

let selectedMood = "open";
let frame = 0;
let animationFrame;

function resizeArtwork(targetCanvas, moodName) {
  const bounds = targetCanvas.getBoundingClientRect();
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  targetCanvas.width = Math.round(bounds.width * pixelRatio);
  targetCanvas.height = Math.round(bounds.height * pixelRatio);
  targetCanvas.getContext("2d").setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  drawArtwork(targetCanvas, moodName, 0);
}

function resizeCanvas() {
  resizeArtwork(canvas, selectedMood);
  document.querySelectorAll(".gallery-canvas").forEach((galleryCanvas) => {
    resizeArtwork(galleryCanvas, galleryCanvas.dataset.mood);
  });
}

function drawArtwork(targetCanvas = canvas, moodName = selectedMood, phase = frame) {
  const targetContext = targetCanvas.getContext("2d");
  const width = targetCanvas.clientWidth;
  const height = targetCanvas.clientHeight;
  if (!width || !height) return;

  const mood = moods[moodName];
  const centerX = width * 0.5;
  const centerY = height * 0.5;
  const baseRadius = Math.min(width, height) * (0.14 + mood.scale * 0.1);
  const rotation = phase * (0.0007 + mood.speed * 0.005);
  const layerCount = mood.complexity;

  targetContext.clearRect(0, 0, width, height);
  for (let layer = 0; layer < layerCount; layer += 1) {
    targetContext.beginPath();
    for (let point = 0; point <= 240; point += 1) {
      const angle = (point / 240) * Math.PI * 2;
      const wave = Math.sin(angle * (3 + layer * 0.14) + rotation + layer) * (5 + mood.complexity * 1.4);
      const ripple = Math.cos(angle * 5 - rotation * 1.4) * (4 + mood.speed * 14);
      const radius = baseRadius + layer * 8 + wave + ripple;
      const direction = angle + rotation * (layer % 2 ? 1 : -1);
      const x = centerX + Math.cos(direction) * radius * (1 + layer * 0.024);
      const y = centerY + Math.sin(direction) * radius * 0.68;
      if (point === 0) targetContext.moveTo(x, y);
      else targetContext.lineTo(x, y);
    }
    targetContext.closePath();
    targetContext.strokeStyle = mood.colors[layer % mood.colors.length];
    targetContext.globalAlpha = 0.3 - layer * 0.014;
    targetContext.lineWidth = layer === 0 ? 1.5 : 0.8;
    targetContext.stroke();
  }
  targetContext.globalAlpha = 1;
}

function animateArtwork() {
  frame += 1;
  drawArtwork();
  if (!prefersReducedMotion.matches) animationFrame = window.requestAnimationFrame(animateArtwork);
}

function selectMood(moodName) {
  selectedMood = moodName;
  frame = 0;
  moodOptions.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.mood === moodName));
  });
  stateLabel.textContent = moodName === "open" ? "LIVRE" : "INSPIRADA POR VOCÊ";
  compositionCaption.textContent = moodName === "open"
    ? "Uma composição aberta, sem interpretação atribuída."
    : `Forma inspirada por “${moods[moodName].label}”. O significado é seu.`;
  window.cancelAnimationFrame(animationFrame);
  if (prefersReducedMotion.matches) drawArtwork();
  else animateArtwork();
}

moodOptions.forEach((button) => {
  button.addEventListener("click", () => selectMood(button.dataset.mood));
});

document.querySelector("#regenerate-art").addEventListener("click", () => {
  frame += 173;
  drawArtwork();
});

document.querySelectorAll(".gallery-explore").forEach((button) => {
  button.addEventListener("click", () => {
    selectMood(button.dataset.galleryMood);
    document.querySelector("#experiencia").scrollIntoView({ behavior: "smooth" });
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNav.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }
});

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
