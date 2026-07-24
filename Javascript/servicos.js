const services = {
    graphic: {
        level: "MISSION 01",
        title: "DESIGN GRÁFICO",
        icon: "fa-solid fa-palette",
        items: [
            "Identidade visual e logótipos",
            "Cartões de visita e papelaria",
            "Posts para redes sociais",
            "Flyers, cartazes, menus e catálogos",
            "Apresentações profissionais",
            "Banners e materiais publicitários",
            "E-books e infográficos"
        ]
    },
    ux: {
        level: "MISSION 02",
        title: "UI/UX DESIGN",
        icon: "fa-solid fa-pen-ruler",
        items: [
            "Design de sites e aplicações",
            "Wireframes e protótipos no Figma",
            "Landing pages",
            "Design responsivo para computador e telemóvel",
            "Pesquisa com utilizadores",
            "Testes de usabilidade",
            "Auditoria e melhoria de interfaces",
            "Criação de design systems"
        ]
    },
    frontend: {
        level: "MISSION 03",
        title: "FRONT-END",
        icon: "fa-solid fa-code",
        items: [
            "Desenvolvimento de sites responsivos",
            "Landing pages para empresas e campanhas",
            "Conversão de designs do Figma em código",
            "Interfaces em HTML, CSS e JavaScript",
            "Projetos com React, Vue ou tecnologias semelhantes",
            "Manutenção e melhoria de sites",
            "Correção de problemas visuais e de responsividade",
            "Otimização de acessibilidade e desempenho"
        ]
    }
};

const marquee = document.getElementById("marquee");
const modal = document.getElementById("serviceModal");
const modalLevel = document.getElementById("serviceModalLevel");
const modalTitle = document.getElementById("serviceModalTitle");
const modalIcon = document.getElementById("serviceModalIcon");
const modalList = document.getElementById("serviceModalList");
const modalClose = document.getElementById("serviceModalClose");
let lastFocusedButton = null;

if (marquee) {
    marquee.textContent = " OCEAN WORLD  •  SERVIÇOS  •  SELECT YOUR MISSION  • ".repeat(14);
}

function openService(id, trigger) {
    const service = services[id];
    if (!service) return;

    lastFocusedButton = trigger;
    modalLevel.textContent = service.level;
    modalTitle.textContent = service.title;
    modalIcon.innerHTML = `<i class="${service.icon}" aria-hidden="true"></i>`;
    modalList.replaceChildren(...service.items.map(item => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        return listItem;
    }));

    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modalClose.focus();
}

function closeService() {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    lastFocusedButton?.focus();
}

document.querySelectorAll(".open-service").forEach(button => {
    button.addEventListener("click", () => openService(button.dataset.service, button));
});

modalClose?.addEventListener("click", closeService);
modal?.addEventListener("click", event => {
    if (event.target === modal) closeService();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeService();
});
