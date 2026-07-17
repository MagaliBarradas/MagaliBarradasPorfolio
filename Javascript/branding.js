const projetos = {

    casa:{

        titulo:"Casa da Árvore",

        imagem:"../img/logos/casa-arvore.png",

        descricao:"Criação completa da identidade visual da marca.",

        pdf:"../pdf/casa-arvore.pdf"

    },

    cafe:{

        titulo:"Café Torres",

        imagem:"../img/logos/cafe-torres.png",

        descricao:"Redesign da identidade visual.",

        pdf:"../pdf/cafe-torres.pdf"

    },

    rotulo:{

        titulo:"Rótulo Criativo",

        imagem:"../img/logos/rotulo.png",

        descricao:"Identidade visual da minha marca.",

        pdf:"../pdf/rotulo.pdf"

    },

    projeto4:{

        titulo:"Projeto 4",

        imagem:"../img/logos/projeto4.png",

        descricao:"Projeto em desenvolvimento.",

        pdf:"#"

    }

};

document.querySelectorAll(".project-card").forEach(card=>{

    card.addEventListener("click",()=>{

        const projeto=projetos[card.dataset.id];

        abrirModal(projeto);

    });

});