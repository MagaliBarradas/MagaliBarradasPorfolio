const marquee = document.getElementById("marquee");
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

function updateMarquee() {
    if (!marquee) return;
    const text = window.i18n?.getLanguage() === "en"
        ? " CONTACT WORLD  ★  NEW MISSION  ★ "
        : " MUNDO CONTACTO  ★  NOVA MISSÃO  ★ ";
    marquee.textContent = text.repeat(20);
}

updateMarquee();
document.addEventListener("languagechange", updateMarquee);

emailjs.init({
    publicKey: "kVULP95u2f3tgwk2i"
});

form?.addEventListener("submit", async event => {
    event.preventDefault();

    const button = form.querySelector("button[type='submit']");
    const originalButtonContent = button.innerHTML;

    formStatus.textContent = "";
    formStatus.className = "form-status";
    button.disabled = true;
    button.innerHTML = `<i class="fa-solid fa-hourglass-half" aria-hidden="true"></i> ${window.i18n.t("contact.sending")}`;

    try {
        await emailjs.sendForm(
            "service_a99ywux",
            "template_nl67j9f",
            form
        );

        formStatus.textContent = window.i18n.t("contact.success");
        formStatus.classList.add("success");
        form.reset();
    } catch (error) {
        console.error("Erro ao enviar a mensagem:", error);
        formStatus.textContent = window.i18n.t("contact.error");
        formStatus.classList.add("error");
    } finally {
        button.disabled = false;
        button.innerHTML = originalButtonContent;
    }
});
