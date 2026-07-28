(() => {
  "use strict";

  const projects = {
    rotulo: {
      url: null,
      kicker: "PROJECT 01 · BRAND WEBSITE",
      title: "Rótulo Criativo",
      description: "Um website de marca pensado para apresentar serviços criativos com personalidade, clareza e uma experiência coerente em computador e telemóvel.",
      mission: "APRESENTAR A MARCA"
    },
    praia: {
      url: null,
      kicker: "PROJECT 02 · HOSPITALITY",
      title: "Casa da Praia",
      description: "Uma presença digital leve e acolhedora, construída para transmitir a atmosfera do espaço e facilitar a descoberta da experiência.",
      mission: "CRIAR DESEJO"
    },
    unni: {
      url: null,
      kicker: "PROJECT 03 · STUDIO",
      title: "Estúdio Unni",
      description: "Uma interface editorial equilibrada, com ritmo visual e navegação simples para comunicar a identidade, o espaço e os seus serviços.",
      mission: "ORGANIZAR CONTEÚDO"
    },
    dani: {
      url: null,
      kicker: "PROJECT 04 · ARTIST PORTFOLIO",
      title: "Dani Braga Ink",
      description: "Um portefólio visual focado no trabalho da artista, com uma experiência mobile direta e espaço para a imagem assumir o protagonismo.",
      mission: "DESTACAR O TRABALHO"
    }
  };

  const dialog = document.getElementById("projectDialog");
  const title = document.getElementById("dialogTitle");
  const kicker = document.getElementById("dialogKicker");
  const description = document.getElementById("dialogDescription");
  const mission = document.getElementById("dialogMission");

  function openProject(projectId) {
    const project = projects[projectId];
    if (!project || !dialog) return;

    if (project.url) {
      window.open(project.url, "_blank", "noopener,noreferrer");
      return;
    }

    kicker.textContent = project.kicker;
    title.textContent = project.title;
    description.textContent = project.description;
    mission.textContent = project.mission;
    dialog.showModal();
  }

  document.querySelectorAll("[data-project]").forEach(button => {
    button.addEventListener("click", () => openProject(button.dataset.project));
  });

  document.getElementById("dialogClose")?.addEventListener("click", () => dialog.close());

  dialog?.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });
})();
