// Marquee content
document.getElementById("marquee").textContent = ("MEU PORTFOLIO • ").repeat(40);

const map = document.getElementById("map");
const char = document.getElementById("char");
const miniDot = document.getElementById("miniDot");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

const SECTIONS = {
    sobre: { title: "Sobre Mim", body: "Sou a Magali Barradas, Diretora Criativa & Designer. Transformo ideias em experiências visuais memoráveis." },
    ux: { title: "UI/UX Design Web", body: "Design de interfaces web centradas no utilizador — do wireframe ao pixel perfeito." },
    branding: { title: "Branding", body: "Identidades visuais completas: logo, sistema, tipografia e narrativa de marca." },
    contacto: { title: "Contacto", body: "magalicsbarradas@gmail.com • Porto - Portugal • Telemóvel: 351 932 455 443" }
};

const COINS = [
    { id: "sobre", x: 22, y: 68 }, { id: "ux", x: 62, y: 62 },
    { id: "branding", x: 70, y: 82 }, { id: "contacto", x: 82, y: 38 }
];

let pos = { x: 45, y: 72 };

function render() {
    char.style.left = pos.x + "%";
    char.style.top = pos.y + "%";
    miniDot.style.left = pos.x + "%";
    miniDot.style.top = pos.y + "%";
}
function move(dx, dy) {
    pos.x = Math.min(95, Math.max(5, pos.x + dx));
    pos.y = Math.min(90, Math.max(15, pos.y + dy));
    render();
}
function openSection(id) {
    const s = SECTIONS[id]; if (!s) return;
    modalTitle.textContent = s.title;
    modalBody.textContent = s.body;
    modal.hidden = false;
}
function closeModal() { modal.hidden = true; }

// Keyboard
document.addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    if (["arrowup", "w"].includes(k)) move(0, -2);
    else if (["arrowdown", "s"].includes(k)) move(0, 2);
    else if (["arrowleft", "a"].includes(k)) move(-2, 0);
    else if (["arrowright", "d"].includes(k)) move(2, 0);
    else if (k === "escape") closeModal();
    else if (k === "enter") {
        const near = COINS.find(c => Math.hypot(c.x - pos.x, c.y - pos.y) < 8);
        if (near) openSection(near.id);
    }
});

// D-pad
document.querySelectorAll(".dpad button").forEach(b => {
    b.addEventListener("click", () => {
        const d = b.dataset.dir;
        if (d === "up") move(0, -4); if (d === "down") move(0, 4);
        if (d === "left") move(-4, 0); if (d === "right") move(4, 0);
    });
});

// Coin clicks
document.querySelectorAll(".coin").forEach(c => {
    c.addEventListener("click", () => openSection(c.dataset.id));
});

// Modal
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

render();

// ===============================
// MODO NOTURNO
// ===============================

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    // Guarda a preferência
    if(document.body.classList.contains("dark-mode")){
        localStorage.setItem("theme", "dark");
    }else{
        localStorage.setItem("theme", "light");
    }

});

// Ao abrir o site
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
}

/* ======================================================
   DETETA SE O DISPOSITIVO POSSUI ECRÃ TÁTIL
   ====================================================== */

// Verifica se o utilizador está num telemóvel ou tablet.
// 'ontouchstart' existe na maioria dos dispositivos touch.
// navigator.maxTouchPoints verifica quantos toques simultâneos o dispositivo suporta.
const isMobile =
    ('ontouchstart' in window) ||
    navigator.maxTouchPoints > 0;


/* ======================================================
   ESCONDER O D-PAD NO TELEMÓVEL
   ====================================================== */

// Seleciona o D-Pad pelo nome da classe.
const dpad = document.querySelector(".dpad");

// Se for um dispositivo móvel...
if (isMobile) {

    // ...esconde completamente o D-Pad.
    dpad.style.display = "none";

}


/* ======================================================
   ATIVAR MOVIMENTO POR TOQUE
   ====================================================== */

function enableTouchMovement() {

    // Se não for um dispositivo touch,
    // termina imediatamente esta função.
    if (!isMobile) return;

    // Seleciona o mapa onde a personagem se movimenta.
    const map = document.getElementById("map");

    // Seleciona a personagem.
    const char = document.getElementById("char");

    // Variável que indica se o dedo está atualmente no ecrã.
    let dragging = false;


    /* ------------------------------------------
       QUANDO O UTILIZADOR TOCA NO MAPA
       ------------------------------------------ */

    map.addEventListener("touchstart", (event) => {

        // O utilizador começou a arrastar.
        dragging = true;

        // Move imediatamente a personagem
        // para a posição do dedo.
        moveCharacter(event.touches[0]);

    });


    /* ------------------------------------------
       ENQUANTO O UTILIZADOR ARRASTA O DEDO
       ------------------------------------------ */

    map.addEventListener("touchmove", (event) => {

        // Se o dedo já não estiver a arrastar,
        // não faz nada.
        if (!dragging) return;

        // Impede o navegador de fazer scroll
        // ou zoom durante o gesto.
        event.preventDefault();

        // Move continuamente a personagem.
        moveCharacter(event.touches[0]);

    }, { passive: false });


    /* ------------------------------------------
       QUANDO O UTILIZADOR LEVANTA O DEDO
       ------------------------------------------ */

    map.addEventListener("touchend", () => {

        // O movimento termina.
        dragging = false;

    });

}


/* ======================================================
   MOVIMENTAR A PERSONAGEM
   ====================================================== */

function moveCharacter(touch) {

    // Obtém novamente os elementos.
    const map = document.getElementById("map");
    const char = document.getElementById("char");

    // Obtém as dimensões e posição do mapa.
    const rect = map.getBoundingClientRect();


    /* ------------------------------------------
       POSIÇÃO DO DEDO DENTRO DO MAPA
       ------------------------------------------ */

    // Calcula a posição horizontal do dedo.
    let x = touch.clientX - rect.left;

    // Calcula a posição vertical do dedo.
    let y = touch.clientY - rect.top;


    /* ------------------------------------------
       IMPEDIR QUE SAIA DO MAPA
       ------------------------------------------ */

    // Limita a posição horizontal.
    x = Math.max(0, Math.min(rect.width, x));

    // Limita a posição vertical.
    y = Math.max(0, Math.min(rect.height, y));


    /* ------------------------------------------
       CONVERTER PARA PERCENTAGEM
       ------------------------------------------ */

    // Como o mapa é responsivo,
    // utilizamos percentagens em vez de pixels.

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;


    /* ------------------------------------------
       MOVER A PERSONAGEM
       ------------------------------------------ */

    char.style.left = percentX + "%";
    char.style.top = percentY + "%";

}


/* ======================================================
   INICIAR O SISTEMA TOUCH
   ====================================================== */

// Ativa toda a navegação por toque.
enableTouchMovement();