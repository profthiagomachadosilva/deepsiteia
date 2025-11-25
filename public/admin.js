async function carregarMensagens() {
    const tbody = document.querySelector("#tabela-mensagens tbody");

    try {
        const resposta = await fetch("https://deepsiteia.onrender.com/agendamentos");

        if (!resposta.ok) {
            throw new Error("Erro ao buscar dados");
        }

        const dados = await resposta.json();

        tbody.innerHTML = "";

        if (dados.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center; padding: 20px;">
                        Nenhuma mensagem encontrada.
                    </td>
                </tr>
            `;
            return;
        }

        dados.forEach(item => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${item.nome}</td>
                <td>${item.email}</td>
                <td>${item.mensagem}</td>
                <td>
                    <button onclick="deletarMensagem(${item.id})" class="btn-delete">
                        Deletar
                    </button>
                </td>
            `;

            tbody.appendChild(tr);
        });

    } catch (erro) {
        console.error("Erro ao carregar mensagens:", erro);

        tbody.innerHTML = `
            <tr>
                <td colspan="4" style="color:red; text-align:center; padding: 20px;">
                    Erro ao carregar mensagens.
                </td>
            </tr>
        `;
    }
}

async function deletarMensagem(id) {
    if (!confirm("Tem certeza que deseja deletar esta mensagem?")) return;

    try {
        const resposta = await fetch(`https://deepsiteia.onrender.com/agendamentos/${id}`, {
            method: "DELETE"
        });

        if (!resposta.ok) {
            throw new Error("Erro ao deletar mensagem");
        }

        alert("Mensagem deletada com sucesso!");
        carregarMensagens();

    } catch (erro) {
        console.error("Erro ao deletar:", erro);
        alert("Erro ao deletar a mensagem.");
    }
}

carregarMensagens();
