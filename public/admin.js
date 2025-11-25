// admin.js

async function carregarMensagens() {
    const tbody = document.querySelector("#tabela-mensagens tbody");

    try {
        const resposta = await fetch("http://localhost:3000/agendamentos");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar dados");
        }

        const dados = await resposta.json();

        // Limpa a tabela
        tbody.innerHTML = "";

        // Se não tiver nenhum agendamento
        if (dados.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="3" style="text-align:center; padding: 20px;">
                        Nenhuma mensagem encontrada.
                    </td>
                </tr>
            `;
            return;
        }

        // Monta a tabela
        dados.forEach(item => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${item.nome}</td>
                <td>${item.email}</td>
                <td>${item.mensagem}</td>
            `;

            tbody.appendChild(tr);
        });

    } catch (erro) {
        console.error("Erro ao carregar mensagens:", erro);

        tbody.innerHTML = `
            <tr>
                <td colspan="3" style="color:red; text-align:center; padding: 20px;">
                    Erro ao carregar mensagens.
                </td>
            </tr>
        `;
    }
}

// Carrega automaticamente ao abrir o admin.html
carregarMensagens();
