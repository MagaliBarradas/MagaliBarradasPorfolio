const services = {
    graphic: {
        level: "MISSION 01",
        titleKey: "services.graphic.title",
        icon: "fa-solid fa-palette",
        items: [
            "services.graphic.item1",
            "services.graphic.item2",
            "services.graphic.item3",
            "services.graphic.item4",
            "services.graphic.item5",
            "services.graphic.item6",
            "services.graphic.item7"
        ]
    },
    ux: {
        level: "MISSION 02",
        title: "UI/UX DESIGN",
        icon: "fa-solid fa-pen-ruler",
        items: [
            "services.ux.item1",
            "services.ux.item2",
            "services.ux.item3",
            "services.ux.item4",
            "services.ux.item5",
            "services.ux.item6",
            "services.ux.item7",
            "services.ux.item8"
        ]
    },
    frontend: {
        level: "MISSION 03",
        title: "FRONT-END",
        icon: "fa-solid fa-code",
        items: [
            "services.frontend.item1",
            "services.frontend.item2",
            "services.frontend.item3",
            "services.frontend.item4",
            "services.frontend.item5",
            "services.frontend.item6",
            "services.frontend.item7",
            "services.frontend.item8"
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

function updateMarquee() {
    if (!marquee) return;
    const text = window.i18n?.getLanguage() === "en"
        ? " OCEAN WORLD  •  SERVICES  •  SELECT YOUR MISSION  • "
        : " OCEAN WORLD  •  SERVIÇOS  •  SELECIONA A TUA MISSÃO  • ";
    marquee.textContent = text.repeat(14);
}

updateMarquee();
document.addEventListener("languagechange", updateMarquee);

function openService(id, trigger) {
    const service = services[id];
    if (!service) return;

    lastFocusedButton = trigger;
    modalLevel.textContent = service.level;
    if (service.titleKey) {
        modalTitle.dataset.i18n = service.titleKey;
        modalTitle.textContent = window.i18n.t(service.titleKey);
    } else {
        modalTitle.removeAttribute("data-i18n");
        modalTitle.textContent = service.title;
    }
    modalIcon.innerHTML = `<i class="${service.icon}" aria-hidden="true"></i>`;
    modalList.replaceChildren(...service.items.map(itemKey => {
        const listItem = document.createElement("li");
        listItem.dataset.i18n = itemKey;
        listItem.textContent = window.i18n.t(itemKey);
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
