const map = document.getElementById("map");
const char = document.getElementById("char");
const miniDot = document.getElementById("miniDot");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const marquee = document.getElementById("marquee");
const hintBubble = document.getElementById("hintBubble");

if (marquee) marquee.textContent = "MEU PORTFÓLIO • ".repeat(40);

const SECTIONS = {
  sobre: { title: "Sobre Mim", body: "" },
  ux: { title: "UI/UX Frontend", url: "./paginas/frontend.html" },
  branding: { title: "Branding", url: "./paginas/Branding.html" },
  contacto: { title: "Contacto", url: "./paginas/contacto.html" },
  servicos: { title: "Serviços", url: "./paginas/servicos.html" }
};

let pos = { x: 45, y: 72 };
let hasMoved = false;

function render() {
  if (!char) return;
  char.style.left = `${pos.x}%`;
  char.style.top = `${pos.y}%`;

  if (miniDot) {
    miniDot.style.left = `${pos.x}%`;
    miniDot.style.top = `${pos.y}%`;
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

function getCoinPosition(coin) {
  const mapRect = map.getBoundingClientRect();
  const coinRect = coin.getBoundingClientRect();

  return {
    id: coin.dataset.id,
    x: ((coinRect.left + coinRect.width / 2 - mapRect.left) / mapRect.width) * 100,
    y: ((coinRect.top + coinRect.height / 2 - mapRect.top) / mapRect.height) * 100
  };
}

function openSection(id) {
  const section = SECTIONS[id];
  if (!section) return;

  if (section.url) {
    window.location.href = section.url;
    return;
  }

  if (!modal || !modalTitle || !modalBody) return;
  modalTitle.textContent = section.title;

  if (id === "sobre") {
    const about = document.getElementById("aboutContent");
    modalBody.innerHTML = about ? about.innerHTML : section.body;
  } else {
    modalBody.innerHTML = section.body;
  }

  modal.hidden = false;
}

function closeModal() {
  if (modal) modal.hidden = true;
}

function interactWithNearestSection() {
  const coins = [...document.querySelectorAll(".coin")].map(getCoinPosition);
  let nearest = null;
  let nearestDistance = Infinity;

  for (const coin of coins) {
    const distance = Math.hypot(coin.x - pos.x, coin.y - pos.y);
    if (distance < nearestDistance) {
      nearest = coin;
      nearestDistance = distance;
    }
  }

  if (nearest && nearestDistance < 15) {
    openSection(nearest.id);
    return;
  }

  if (hintBubble) {
    hintBubble.innerHTML = "Aproxima-te de<br>uma caixa ?";
    hintBubble.style.display = "block";
    window.setTimeout(() => { hintBubble.style.display = "none"; }, 1600);
  }
}

document.getElementById("modalClose")?.addEventListener("click", closeModal);

modal?.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", event => {
  const key = event.key.toLowerCase();

  if (key === "escape") {
    closeModal();
    return;
  }

  if (modal && !modal.hidden) return;

  if (["arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d", "enter"].includes(key)) {
    event.preventDefault();
  }

  if (["arrowup", "w"].includes(key)) move(0, -2);
  else if (["arrowdown", "s"].includes(key)) move(0, 2);
  else if (["arrowleft", "a"].includes(key)) move(-2, 0);
  else if (["arrowright", "d"].includes(key)) move(2, 0);
  else if (key === "enter") interactWithNearestSection();
});

document.querySelectorAll(".mobile-gamepad [data-dir]").forEach(button => {
  button.addEventListener("click", () => {
    const direction = button.dataset.dir;
    if (direction === "up") move(0, -4);
    if (direction === "down") move(0, 4);
    if (direction === "left") move(-4, 0);
    if (direction === "right") move(4, 0);
  });
});

document.querySelectorAll('[data-action="interact"]').forEach(button => {
  button.addEventListener("click", interactWithNearestSection);
});

document.querySelectorAll(".coin").forEach(coin => {
  coin.addEventListener("click", () => openSection(coin.dataset.id));
});

const themeBtn = document.getElementById("themeBtn");
themeBtn?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

render();
