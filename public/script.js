// Captura o formulário pelo ID (ajuste se necessário)
const form = document.getElementById("form-agendamento");

form.addEventListener("submit", async function (event) {
    event.preventDefault(); // impede o reload da página

    // Coleta dos dados
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    // Monta o objeto enviado ao backend
    const dados = {
        nome,
        email,
        mensagem
    };

    try {
        const resposta = await fetch("http://localhost:3000/agendamentos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao enviar dados para o servidor.");
        }

        const resultado = await resposta.json();
        console.log("Resposta do servidor:", resultado);

        alert("Mensagem enviada com sucesso!");

        // Limpa o formulário
        form.reset();
    } catch (erro) {
        console.error("Erro:", erro);
        alert("Ocorreu um erro ao enviar sua mensagem.");
    }
});
