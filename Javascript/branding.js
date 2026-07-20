const projects = {
  casa: {
    number: "PROJECT 01 / 04",
    title: "Casa da Árvore",
    image: "../imagens/casa-da-arvore.jpg",
    description: "Projeto de identidade visual inspirado na natureza, na proximidade e na criatividade.",
    link: "../pdf/casa-arvore.pdf"
  },
  cafe: {
    number: "PROJECT 02 / 04",
    title: "Café Tôrres",
    image: "../imagens/cafe-torres.jpg",
    description: "Identidade visual para restauração, com uma linguagem simples, acolhedora e memorável.",
    link: "../pdf/cafe-torres.pdf"
  },
  dani: {
    number: "PROJECT 03 / 04",
    title: "Dani Braga Ink",
    image: "../imagens/dani-braga-ink.jpg",
    description: "Marca pessoal para tatuagem, construída com um símbolo forte, minimalista e expressivo.",
    link: "../pdf/dani-braga-ink.pdf"
  },
  lobo: {
    number: "PROJECT 04 / 04",
    title: "Lobo Urbano",
    image: "../imagens/logo-lobo-urbano-preto.jpg",
    description: "Identidade visual para barbearia que combina o universo urbano com a personalidade marcante do lobo.",
    link: "../pdf/lobo-urbano.pdf"
  }
};

const marquee = document.getElementById("marquee");
const modal = document.getElementById("modal");
const modalImage = document.getElementById("modalImage");
const modalNumber = document.getElementById("modalNumber");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalLink = document.getElementById("modalLink");
const modalClose = document.getElementById("modalClose");
const themeButton = document.getElementById("themeBtn");
let lastFocusedCard = null;

marquee.textContent = "BRANDING WORLD  ★  SELECT A PROJECT  ★  ".repeat(18);

function openProject(id, card) {
  const project = projects[id];
  if (!project) return;

  lastFocusedCard = card;
  modalNumber.textContent = project.number;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalImage.src = project.image;
  modalImage.alt = project.title;

  if (project.link) {
    modalLink.href = project.link;
    modalLink.classList.remove("is-hidden");
  } else {
    modalLink.classList.add("is-hidden");
  }

  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeProject() {
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = "";
  lastFocusedCard?.focus();
}

document.querySelectorAll(".memory-card").forEach(card => {
  card.addEventListener("click", () => openProject(card.dataset.project, card));
});

modalClose.addEventListener("click", closeProject);
modal.addEventListener("click", event => {
  if (event.target === modal) closeProject();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeProject();
});

function setTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);
  themeButton.textContent = isDark ? "☀" : "☾";
  themeButton.setAttribute("aria-label", isDark ? "Ativar tema claro" : "Ativar tema escuro");
}

setTheme(localStorage.getItem("branding-theme") === "dark");

themeButton.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark-mode");
  setTheme(isDark);
  localStorage.setItem("branding-theme", isDark ? "dark" : "light");
});
