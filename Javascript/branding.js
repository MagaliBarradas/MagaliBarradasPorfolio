const projects = {
  casa: {
    number: "PROJECT 01 / 04",
    title: "Casa da Árvore",
    image: "../imagens/casa-da-arvore.webp",
    descriptionKey: "branding.casa.description",
    link: "../pdf/casa-arvore.pdf"
  },
  cafe: {
    number: "PROJECT 02 / 04",
    title: "Café Tôrres",
    image: "../imagens/cafe-torres.webp",
    descriptionKey: "branding.cafe.description",
    link: "../pdf/cafe-torres.pdf"
  },
  dani: {
    number: "PROJECT 03 / 04",
    title: "Dani Braga Ink",
    image: "../imagens/dani-braga-ink.webp",
    descriptionKey: "branding.dani.description",
    link: "../pdf/dani-braga-ink.pdf"
  },
  lobo: {
    number: "PROJECT 04 / 04",
    title: "Lobo Urbano",
    image: "../imagens/logo-lobo-urbano-preto.webp",
    descriptionKey: "branding.lobo.description",
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
let lastFocusedCard = null;

function updateMarquee() {
  const text = window.i18n?.getLanguage() === "en"
    ? " LOGOFOLIO • BRANDING • VISUAL IDENTITY • "
    : " LOGOFOLIO • BRANDING • IDENTIDADE VISUAL • ";
  marquee.textContent = text.repeat(18);
}

updateMarquee();

function openProject(id, card) {
  const project = projects[id];
  if (!project) return;

  lastFocusedCard = card;
  modalNumber.textContent = project.number;
  modalTitle.textContent = project.title;
  modalDescription.dataset.i18n = project.descriptionKey;
  modalDescription.textContent = window.i18n.t(project.descriptionKey);
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

document.addEventListener("languagechange", updateMarquee);
