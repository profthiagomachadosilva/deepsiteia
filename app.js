// Importando biblioteca express
import express from "express";
import Agendamento from "./agendamentos.js";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors());

// Middleware para ler JSON do corpo da requisição
app.use(express.json());

// Caminho absoluto da pasta public
const __dirname = path.resolve();

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// GET - Consulta os dados cadastrados
app.get ("/agendamentos", async (req, res)=>{
    try {
        const showAgendamentos = await Agendamento.findAll();
        res.send(showAgendamentos);
    } catch (error) {
        res.send("Erro ao buscar os dados no banco:" + error);
    }
});

// POST - Cadastra novo agendamento
app.post('/agendamentos', async (req , res)=> {
    try {
        await Agendamento.create({
            nome: req.body.nome,
            email: req.body.email,
            mensagem: req.body.mensagem
        });

        return res.status(201).json({
            sucesso: true,
            mensagem: "Agendamento cadastrado com sucesso!"
        });

    } catch (error) {
        return res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao cadastrar o agendamento.",
            erro: error.message
        });
    }
});
// PATCH — atualiza agendamento existente pelo ID
app.patch("/agendamentos/:id", async (req, res) => {
    try {
        await Agendamento.update(
            {
                nome: req.body.nome,
                email: req.body.email,
                mensagem: req.body.mensagem
            },
            { where: { id: req.params.id } }
        );
        res.send("Agendamento atualizado com sucesso!");
    } catch (erro) {
        res.send("Erro ao atualizar o agendamento: " + erro);
    }
});

// DELETE — remove um agendamento pelo ID
app.delete("/agendamentos/:id", async (req, res) => {
    try {
        await Agendamento.destroy({
            where: { id: req.params.id }
        });
        res.send("Agendamento deletado com sucesso!");
    } catch (erro) {
        res.send("Erro ao deletar agendamento: " + erro);
    }
});

app.listen(3000, function(){
    console.log("O servidor está rodando na porta 3000");
});

