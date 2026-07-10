// Inicializa o EmailJS
emailjs.init({
    publicKey: "kVULP95u2f3tgwk2i"
});

const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const button = form.querySelector("button");

    button.disabled = true;
    button.innerHTML = "⏳ Enviando...";

    emailjs.sendForm(
        "service_a99ywux",
        "template_nl67j9f",
        form
    )

    .then(() => {

        alert("🎉 Missão enviada com sucesso!\n\nObrigado pelo contacto. Responderei o mais breve possível.");

        form.reset();

    })

    .catch((error) => {

        console.error("Erro:", error);

        alert("❌ Não foi possível enviar a mensagem.\nVerifica a consola (F12) para mais detalhes.");

    })

    .finally(() => {

        button.disabled = false;
        button.innerHTML = "🚀 ENVIAR MISSÃO";

    });

});