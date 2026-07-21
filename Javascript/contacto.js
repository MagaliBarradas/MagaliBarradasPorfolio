const marquee = document.getElementById("marquee");
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const themeButton = document.getElementById("themeBtn");

if (marquee) {
    marquee.textContent = " CONTACT WORLD  ★  NEW MISSION  ★ ".repeat(20);
}

emailjs.init({
    publicKey: "kVULP95u2f3tgwk2i"
});

function updateThemeButton(isDark) {
    if (!themeButton) return;

    themeButton.innerHTML = isDark
        ? '<i class="fa-solid fa-sun" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';

    themeButton.setAttribute(
        "aria-label",
        isDark ? "Ativar tema claro" : "Ativar tema escuro"
    );
}

const savedTheme = localStorage.getItem("contact-theme");
const isDarkOnLoad = savedTheme === "dark";

document.body.classList.toggle("contact-dark", isDarkOnLoad);
updateThemeButton(isDarkOnLoad);

themeButton?.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("contact-dark");
    localStorage.setItem("contact-theme", isDark ? "dark" : "light");
    updateThemeButton(isDark);
});

form?.addEventListener("submit", async event => {
    event.preventDefault();

    const button = form.querySelector("button[type='submit']");
    const originalButtonContent = button.innerHTML;

    formStatus.textContent = "";
    formStatus.className = "form-status";
    button.disabled = true;
    button.innerHTML = '<i class="fa-solid fa-hourglass-half" aria-hidden="true"></i> ENVIANDO...';

    try {
        await emailjs.sendForm(
            "service_a99ywux",
            "template_nl67j9f",
            form
        );

        formStatus.textContent = "MISSÃO CONCLUÍDA! A mensagem foi enviada com sucesso.";
        formStatus.classList.add("success");
        form.reset();
    } catch (error) {
        console.error("Erro ao enviar a mensagem:", error);
        formStatus.textContent = "A missão falhou. Tenta novamente ou envia um e-mail direto.";
        formStatus.classList.add("error");
    } finally {
        button.disabled = false;
        button.innerHTML = originalButtonContent;
    }
});
