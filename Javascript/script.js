// ===============================
// ELEMENTOS
// ===============================
const map        = document.getElementById("map");
const char       = document.getElementById("char");
const miniDot    = document.getElementById("miniDot");
const modal      = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody  = document.getElementById("modalBody");
const marquee    = document.getElementById("marquee");
const hintBubble = document.getElementById("hintBubble"); // balão "use as setas" (se existir)

// Marquee
if (marquee) marquee.textContent = "MEU PORTFOLIO • ".repeat(40);

// ===============================
// DADOS
// ===============================
const SECTIONS = {
  sobre:    { title: "Sobre Mim",         body: "" }, // usa #aboutContent
  ux:       { title: "UI/UX Design Web",  body: "Design de interfaces web centradas no utilizador — do wireframe ao pixel perfeito." },
  branding: { title: "Branding",          body: "Identidades visuais completas: logo, sistema, tipografia e narrativa de marca." },
  contacto: { title: "Contacto",          body: "magalicsbarradas@gmail.com • Porto - Portugal • Telemóvel: +351 932 455 443" }
};

const COINS = [
  { id: "sobre",    x: 22, y: 68 },
  { id: "ux",       x: 62, y: 62 },
  { id: "branding", x: 70, y: 82 },
  { id: "contacto", x: 82, y: 38 }
];

let pos      = { x: 45, y: 72 };
let hasMoved = false;

// ===============================
// RENDER / MOVIMENTO
// ===============================
function render() {
  char.style.left = pos.x + "%";
  char.style.top  = pos.y + "%";
  if (miniDot) {
    miniDot.style.left = pos.x + "%";
    miniDot.style.top  = pos.y + "%";
  }
}

function markMoved() {
  if (hasMoved) return;
  hasMoved = true;
  if (hintBubble) hintBubble.style.display = "none";
}

function move(dx, dy) {
  pos.x = Math.min(95, Math.max(5, pos.x + dx));
  pos.y = Math.min(90, Math.max(15, pos.y + dy));
  markMoved();
  render();
}

// ===============================
// MODAL
// ===============================
function openSection(id) {
  const s = SECTIONS[id];
  if (!s) return;

  modalTitle.textContent = s.title;

  if (id === "sobre") {
    const about = document.getElementById("aboutContent");
    modalBody.innerHTML = about ? about.innerHTML : s.body;
  } else {
    modalBody.innerHTML = s.body;
  }

  modal.hidden = false;
}

function openSection(id) {
  if (id === "contacto") {
    window.location.href = "paginas/contacto.html";
    return;                  // não abre modal
  }
  // ... resto do modal
}

function openSection(id) {
  if (id === "branding") {
    window.location.href = "paginas/Branding.html";
    return;                  // não abre modal
  }
  // ... resto do modal
}


function openSection(id) {
  if (id === "frontend") {
    window.location.href = "paginas/Frontend.html";
    return;                  // não abre modal
  }
  // ... resto do modal
}

function closeModal() {
  modal.hidden = true;
}

// Botão de fechar (se existir no HTML com id="modalClose")
const modalClose = document.getElementById("modalClose");
if (modalClose) modalClose.addEventListener("click", closeModal);

// Clicar fora do conteúdo fecha
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// ===============================
// TECLADO
// ===============================
document.addEventListener("keydown", (e) => {
  const k = e.key.toLowerCase();

  // ESC funciona SEMPRE, mesmo com modal aberto
  if (k === "escape" || e.key === "Escape") {
    closeModal();
    return;
  }

  if (["arrowup", "w"].includes(k))         move(0, -2);
  else if (["arrowdown", "s"].includes(k))  move(0, 2);
  else if (["arrowleft", "a"].includes(k))  move(-2, 0);
  else if (["arrowright", "d"].includes(k)) move(2, 0);
  else if (k === "enter") {
    
    // encontra a moeda MAIS PRÓXIMA dentro de um raio maior
    let best = null, bestDist = Infinity;
    for (const c of COINS) {
        const d = Math.hypot(c.x - pos.x, c.y - pos.y);
        if (d < bestDist) { bestDist = d; best = c; }
    }
    if (best && bestDist < 15) openSection(best.id);
}
});

// ===============================
// D-PAD
// ===============================
document.querySelectorAll(".dpad button").forEach(b => {
  b.addEventListener("click", () => {
    const d = b.dataset.dir;
    if (d === "up")    move(0, -4);
    if (d === "down")  move(0,  4);
    if (d === "left")  move(-4, 0);
    if (d === "right") move( 4, 0);
  });
});

// ===============================
// MOEDAS
// ===============================
document.querySelectorAll(".coin").forEach(c => {
  c.addEventListener("click", () => openSection(c.dataset.id));
});

// ===============================
// MODO NOTURNO
// ===============================

const themeBtn = document.getElementById("themeBtn");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
  });
}
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

// ===============================
// DETEÇÃO TOUCH
// ===============================
const isMobile = ("ontouchstart" in window) || navigator.maxTouchPoints > 0;

const dpad = document.querySelector(".dpad");
if (isMobile && dpad) dpad.style.display = "none";

// ===============================
// MOVIMENTO POR TOQUE
// ===============================
function enableTouchMovement() {
  if (!isMobile) return;

  let dragging = false;

  function updateFromTouch(touch) {
    const rect = map.getBoundingClientRect();
    let x = Math.max(0, Math.min(rect.width,  touch.clientX - rect.left));
    let y = Math.max(0, Math.min(rect.height, touch.clientY - rect.top));
    pos.x = (x / rect.width)  * 100;
    pos.y = (y / rect.height) * 100;
    markMoved();
    render();
  }

  map.addEventListener("touchstart", (e) => {
    dragging = true;
    updateFromTouch(e.touches[0]);
  }, { passive: true });

  map.addEventListener("touchmove", (e) => {
    if (!dragging) return;
    e.preventDefault();
    updateFromTouch(e.touches[0]);
  }, { passive: false });

  map.addEventListener("touchend", () => { dragging = false; });
}

enableTouchMovement();
render();
