// ==============================
// PROJETOS
// ==============================

const projetos = [

    {
        titulo: "Casa da Árvore",
        categoria: "identidade",
        imagem: "img/branding/casa-arvore.jpg",
        descricao: "Criação completa da identidade visual da marca.",
        pdf: "pdf/casa-arvore.pdf"
    },

    {
        titulo: "Café Torres",
        categoria: "rebranding",
        imagem: "img/branding/cafe-torres.jpg",
        descricao: "Redesign da identidade visual do Café Torres.",
        pdf: "pdf/cafe-torres.pdf"
    },

    {
        titulo: "Rótulo Criativo",
        categoria: "logo",
        imagem: "img/branding/rotulo.jpg",
        descricao: "Identidade visual da minha marca pessoal.",
        pdf: "pdf/rotulo-criativo.pdf"
    },

    {
        titulo: "Studio One",
        categoria: "identidade",
        imagem: "img/branding/studio.jpg",
        descricao: "Projeto de branding completo.",
        pdf: "pdf/studio.pdf"
    }

];


// ==============================
// ELEMENTOS
// ==============================

const grid = document.getElementById("portfolioGrid");

const modal = document.getElementById("modal");

const modalImage = document.getElementById("modalImage");

const modalTitle = document.getElementById("modalTitle");

const modalDescription = document.getElementById("modalDescription");

const pdfButton = document.getElementById("pdfButton");

const close = document.querySelector(".close");


// ==============================
// GERAR CARDS
// ==============================

function mostrarProjetos(categoria = "all") {

    grid.innerHTML = "";

    let lista = projetos;

    if (categoria !== "all") {

        lista = projetos.filter(projeto => projeto.categoria === categoria);

    }

    lista.forEach(projeto => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `

            <img src="${projeto.imagem}" alt="${projeto.titulo}">

            <div class="card-info">

                <h3>${projeto.titulo}</h3>

                <p>${projeto.descricao}</p>

                <span>${projeto.categoria}</span>

            </div>

            <div class="ver-projeto">

                📄

            </div>

        `;

        card.addEventListener("click", () => abrirModal(projeto));

        grid.appendChild(card);

    });

}

mostrarProjetos();


// ==============================
// FILTROS
// ==============================

const botoes = document.querySelectorAll(".filtros button");

botoes.forEach(botao => {

    botao.addEventListener("click", () => {

        botoes.forEach(btn => btn.classList.remove("active"));

        botao.classList.add("active");

        mostrarProjetos(botao.dataset.filter);

    });

});


// ==============================
// MODAL
// ==============================

function abrirModal(projeto){

    modal.classList.add("show");

    modalImage.src = projeto.imagem;

    modalTitle.textContent = projeto.titulo;

    modalDescription.textContent = projeto.descricao;

    pdfButton.href = projeto.pdf;

}


// ==============================
// FECHAR
// ==============================

close.addEventListener("click", () => {

    modal.classList.remove("show");

});


modal.addEventListener("click",(e)=>{

    if(e.target === modal){

        modal.classList.remove("show");

    }

});


// ==============================
// ESC
// ==============================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        modal.classList.remove("show");

    }

});