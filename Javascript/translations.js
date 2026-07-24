(() => {
  "use strict";

  const translations = {
    pt: {
      "meta.home": "Magali Barradas — Portfólio Criativo",
      "meta.branding": "Branding World | Magali Barradas",
      "meta.services": "Serviços | Magali Barradas",
      "meta.contact": "Contacto | Magali Barradas",
      "language.switch": "Mudar para inglês",
      "nav.map": "MAPA",
      "home.job": "Designer Gráfico • Branding • UI/UX • Frontend",
      "home.description": "Transformo ideias em experiências visuais memoráveis, criando marcas e interfaces modernas com foco na experiência do utilizador.",
      "home.skills": "⭐ Competências",
      "home.contact": "📍 Contacto",
      "home.location": "📍 Porto • Portugal",
      "home.download": "⬇ DESCARREGAR CV",
      "home.quote": "\"Cada projeto é uma nova fase. O objetivo é sempre criar uma experiência memorável.\"",
      "home.greeting": "Olá, sou a",
      "home.intro": "Explora o meu mundo e descobre mais sobre mim!",
      "home.controls": "CONTROLOS",
      "home.move": "Mover",
      "home.interact": "Interagir",
      "home.close": "Fechar",
      "home.hint": "Explora o mapa e descobre cada área do meu portefólio!",
      "home.about": "Sobre Mim",
      "home.contactArea": "Contacto",
      "home.services": "Serviços",
      "home.moveHint": "Usa as setas<br>para mover",
      "home.nearHint": "Aproxima-te de<br>uma caixa ?",
      "home.mobileController": "Comando de jogo para telemóvel",
      "home.moveCharacter": "Mover personagem",
      "home.moveUp": "Mover para cima",
      "home.moveDown": "Mover para baixo",
      "home.moveLeft": "Mover para a esquerda",
      "home.moveRight": "Mover para a direita",
      "branding.select": "SELECIONA UM PROJETO",
      "branding.intro": "Descobre identidades visuais num tabuleiro inspirado em minijogos retro.",
      "branding.projects": "PROJETOS: 04",
      "branding.board": "Projetos de branding",
      "branding.visualIdentity": "Identidade visual",
      "branding.restaurant": "Branding e restauração",
      "branding.personalBrand": "Marca pessoal",
      "branding.view": "VER PROJETO",
      "branding.tip": "CLICA NUMA CARTA PARA DESCOBRIR O PROJETO",
      "branding.file": "FICHEIRO DO PROJETO",
      "branding.close": "Fechar projeto",
      "branding.full": "VER PROJETO COMPLETO",
      "branding.casa.description": "Projeto de identidade visual inspirado na natureza, na proximidade e na criatividade.",
      "branding.cafe.description": "Identidade visual para restauração, com uma linguagem simples, acolhedora e memorável.",
      "branding.dani.description": "Marca pessoal para tatuagem, construída com um símbolo forte, minimalista e expressivo.",
      "branding.lobo.description": "Identidade visual para barbearia que combina o universo urbano com a personalidade marcante do lobo.",
      "services.select": "SELECIONA A TUA MISSÃO",
      "services.title": "SERVIÇOS",
      "services.intro": "Mergulha nas áreas onde posso ajudar o teu projeto a ganhar vida.",
      "services.phaseInfo": "Informações da fase",
      "services.choose": "ESCOLHE UMA ÁREA",
      "services.chooseDescription": "Cada cápsula contém um conjunto de serviços. Seleciona uma missão para veres todos os detalhes.",
      "services.areas": "Áreas de serviços",
      "services.graphic.title": "DESIGN GRÁFICO",
      "services.graphic.description": "Identidade, comunicação visual e materiais que tornam a tua marca reconhecível.",
      "services.ux.description": "Experiências digitais claras, acessíveis e pensadas para os utilizadores.",
      "services.frontend.description": "Interfaces responsivas que transformam o design numa experiência funcional.",
      "services.explore": "EXPLORAR",
      "services.ready": "PRONTA PARA COMEÇAR?",
      "services.readyDescription": "Conta-me sobre o teu projeto e encontramos a solução certa.",
      "services.start": "INICIAR MISSÃO",
      "services.close": "Fechar serviços",
      "services.quote": "PEDIR ORÇAMENTO",
      "services.graphic.item1": "Identidade visual e logótipos",
      "services.graphic.item2": "Cartões de visita e papelaria",
      "services.graphic.item3": "Posts para redes sociais",
      "services.graphic.item4": "Flyers, cartazes, menus e catálogos",
      "services.graphic.item5": "Apresentações profissionais",
      "services.graphic.item6": "Banners e materiais publicitários",
      "services.graphic.item7": "E-books e infográficos",
      "services.ux.item1": "Design de sites e aplicações",
      "services.ux.item2": "Wireframes e protótipos no Figma",
      "services.ux.item3": "Landing pages",
      "services.ux.item4": "Design responsivo para computador e telemóvel",
      "services.ux.item5": "Pesquisa com utilizadores",
      "services.ux.item6": "Testes de usabilidade",
      "services.ux.item7": "Auditoria e melhoria de interfaces",
      "services.ux.item8": "Criação de design systems",
      "services.frontend.item1": "Desenvolvimento de sites responsivos",
      "services.frontend.item2": "Landing pages para empresas e campanhas",
      "services.frontend.item3": "Conversão de designs do Figma em código",
      "services.frontend.item4": "Interfaces em HTML, CSS e JavaScript",
      "services.frontend.item5": "Projetos com tecnologias frontend",
      "services.frontend.item6": "Manutenção e melhoria de sites",
      "services.frontend.item7": "Correção de problemas visuais e de responsividade",
      "services.frontend.item8": "Otimização de acessibilidade e desempenho",
      "contact.newMission": "NOVA MISSÃO",
      "contact.title": "CONTACTO",
      "contact.intro": "Vamos conversar sobre o teu próximo projeto?",
      "contact.status": "Estado da missão",
      "contact.sendTitle": "ENVIAR MENSAGEM",
      "contact.sendDescription": "Preenche os campos para completar esta missão.",
      "contact.name": "NOME DO JOGADOR",
      "contact.namePlaceholder": "O teu nome",
      "contact.message": "MENSAGEM",
      "contact.messagePlaceholder": "Conta-me sobre o teu projeto...",
      "contact.send": "ENVIAR MENSAGEM",
      "contact.avatarAlt": "Avatar de Magali Barradas",
      "contact.profile": "PERFIL DO JOGADOR",
      "contact.available": "DISPONÍVEL PARA NOVAS MISSÕES",
      "contact.links": "Contactos e redes sociais",
      "contact.linkedin": "LinkedIn — adicionar ligação",
      "contact.quote": "“Cada novo projeto é uma fase por descobrir.”",
      "contact.end": "FIM DO NÍVEL · PRIME MAPA PARA VOLTAR",
      "contact.sending": "A ENVIAR...",
      "contact.success": "MISSÃO CONCLUÍDA! A mensagem foi enviada com sucesso.",
      "contact.error": "A missão falhou. Tenta novamente ou envia um e-mail direto.",
      "music.offLabel": "Desligar música",
      "music.onLabel": "Ligar música",
      "music.title": "MÚSICA",
      "music.on": "ON · DANÇA!",
      "music.off": "OFF · ZZZ"
    },
    en: {
      "meta.home": "Magali Barradas — Creative Portfolio",
      "meta.branding": "Branding World | Magali Barradas",
      "meta.services": "Services | Magali Barradas",
      "meta.contact": "Contact | Magali Barradas",
      "language.switch": "Switch to Portuguese",
      "nav.map": "MAP",
      "home.job": "Graphic Designer • Branding • UI/UX • Frontend",
      "home.description": "I turn ideas into memorable visual experiences, creating modern brands and interfaces focused on user experience.",
      "home.skills": "⭐ Skills",
      "home.contact": "📍 Contact",
      "home.location": "📍 Porto • Portugal",
      "home.download": "⬇ DOWNLOAD CV",
      "home.quote": "\"Every project is a new level. The goal is always to create a memorable experience.\"",
      "home.greeting": "Hello, I'm",
      "home.intro": "Explore my world and discover more about me!",
      "home.controls": "CONTROLS",
      "home.move": "Move",
      "home.interact": "Interact",
      "home.close": "Close",
      "home.hint": "Explore the map and discover every area of my portfolio!",
      "home.about": "About Me",
      "home.contactArea": "Contact",
      "home.services": "Services",
      "home.moveHint": "Use the arrows<br>to move",
      "home.nearHint": "Move closer to<br>a box ?",
      "home.mobileController": "Mobile game controller",
      "home.moveCharacter": "Move character",
      "home.moveUp": "Move up",
      "home.moveDown": "Move down",
      "home.moveLeft": "Move left",
      "home.moveRight": "Move right",
      "branding.select": "SELECT A PROJECT",
      "branding.intro": "Discover visual identities on a board inspired by retro minigames.",
      "branding.projects": "PROJECTS: 04",
      "branding.board": "Branding projects",
      "branding.visualIdentity": "Visual identity",
      "branding.restaurant": "Branding & hospitality",
      "branding.personalBrand": "Personal brand",
      "branding.view": "VIEW PROJECT",
      "branding.tip": "CLICK A CARD TO DISCOVER THE PROJECT",
      "branding.file": "PROJECT FILE",
      "branding.close": "Close project",
      "branding.full": "VIEW FULL PROJECT",
      "branding.casa.description": "A visual identity project inspired by nature, closeness and creativity.",
      "branding.cafe.description": "A visual identity for hospitality with a simple, welcoming and memorable language.",
      "branding.dani.description": "A personal tattoo brand built around a strong, minimalist and expressive symbol.",
      "branding.lobo.description": "A barbershop identity combining an urban universe with the wolf's striking personality.",
      "services.select": "SELECT YOUR MISSION",
      "services.title": "SERVICES",
      "services.intro": "Dive into the areas where I can help bring your project to life.",
      "services.phaseInfo": "Level information",
      "services.choose": "CHOOSE AN AREA",
      "services.chooseDescription": "Each capsule contains a set of services. Select a mission to see all the details.",
      "services.areas": "Service areas",
      "services.graphic.title": "GRAPHIC DESIGN",
      "services.graphic.description": "Identity, visual communication and materials that make your brand recognizable.",
      "services.ux.description": "Clear, accessible digital experiences designed around users.",
      "services.frontend.description": "Responsive interfaces that turn design into a functional experience.",
      "services.explore": "EXPLORE",
      "services.ready": "READY TO START?",
      "services.readyDescription": "Tell me about your project and we'll find the right solution.",
      "services.start": "START MISSION",
      "services.close": "Close services",
      "services.quote": "REQUEST A QUOTE",
      "services.graphic.item1": "Visual identity and logos",
      "services.graphic.item2": "Business cards and stationery",
      "services.graphic.item3": "Social media posts",
      "services.graphic.item4": "Flyers, posters, menus and catalogues",
      "services.graphic.item5": "Professional presentations",
      "services.graphic.item6": "Banners and advertising materials",
      "services.graphic.item7": "E-books and infographics",
      "services.ux.item1": "Website and application design",
      "services.ux.item2": "Wireframes and prototypes in Figma",
      "services.ux.item3": "Landing pages",
      "services.ux.item4": "Responsive design for desktop and mobile",
      "services.ux.item5": "User research",
      "services.ux.item6": "Usability testing",
      "services.ux.item7": "Interface audits and improvements",
      "services.ux.item8": "Design system creation",
      "services.frontend.item1": "Responsive website development",
      "services.frontend.item2": "Landing pages for companies and campaigns",
      "services.frontend.item3": "Converting Figma designs into code",
      "services.frontend.item4": "Interfaces with HTML, CSS and JavaScript",
      "services.frontend.item5": "Projects with frontend technologies",
      "services.frontend.item6": "Website maintenance and improvement",
      "services.frontend.item7": "Fixing visual and responsive issues",
      "services.frontend.item8": "Accessibility and performance optimization",
      "contact.newMission": "NEW MISSION",
      "contact.title": "CONTACT",
      "contact.intro": "Shall we talk about your next project?",
      "contact.status": "Mission status",
      "contact.sendTitle": "SEND A MESSAGE",
      "contact.sendDescription": "Fill in the fields to complete this mission.",
      "contact.name": "PLAYER NAME",
      "contact.namePlaceholder": "Your name",
      "contact.message": "MESSAGE",
      "contact.messagePlaceholder": "Tell me about your project...",
      "contact.send": "SEND MESSAGE",
      "contact.avatarAlt": "Avatar of Magali Barradas",
      "contact.profile": "PLAYER PROFILE",
      "contact.available": "AVAILABLE FOR NEW MISSIONS",
      "contact.links": "Contacts and social media",
      "contact.linkedin": "LinkedIn — add connection",
      "contact.quote": "“Every new project is a level waiting to be discovered.”",
      "contact.end": "END OF LEVEL · PRESS MAP TO RETURN",
      "contact.sending": "SENDING...",
      "contact.success": "MISSION COMPLETE! Your message was sent successfully.",
      "contact.error": "The mission failed. Try again or send a direct email.",
      "music.offLabel": "Turn music off",
      "music.onLabel": "Turn music on",
      "music.title": "MUSIC",
      "music.on": "ON · DANCE!",
      "music.off": "OFF · ZZZ"
    }
  };

  const languageKey = "portfolio-language";
  const getLanguage = () => localStorage.getItem(languageKey) === "en" ? "en" : "pt";
  const t = (key) => translations[getLanguage()][key] ?? translations.pt[key] ?? key;

  function applyTranslations(root = document) {
    const language = getLanguage();
    document.documentElement.lang = language;

    root.querySelectorAll("[data-i18n]").forEach(element => {
      element.textContent = t(element.dataset.i18n);
    });

    root.querySelectorAll("[data-i18n-html]").forEach(element => {
      element.innerHTML = t(element.dataset.i18nHtml);
    });

    ["aria-label", "placeholder", "title", "alt"].forEach(attribute => {
      const dataAttribute = `i18n${attribute.split("-").map(part => part[0].toUpperCase() + part.slice(1)).join("")}`;
      root.querySelectorAll(`[data-${attribute === "aria-label" ? "i18n-aria-label" : `i18n-${attribute}`}]`).forEach(element => {
        element.setAttribute(attribute, t(element.dataset[dataAttribute]));
      });
    });

    root.querySelectorAll("[data-language-toggle]").forEach(button => {
      button.textContent = language === "pt" ? "EN" : "PT";
      button.setAttribute("aria-label", t("language.switch"));
      button.title = t("language.switch");
    });
  }

  function setLanguage(language) {
    localStorage.setItem(languageKey, language === "en" ? "en" : "pt");
    applyTranslations();
    document.dispatchEvent(new CustomEvent("languagechange", {
      detail: { language: getLanguage() }
    }));
  }

  document.addEventListener("click", event => {
    const button = event.target.closest("[data-language-toggle]");
    if (!button) return;
    setLanguage(getLanguage() === "pt" ? "en" : "pt");
  });

  window.i18n = { t, applyTranslations, getLanguage, setLanguage };
  applyTranslations();
})();
