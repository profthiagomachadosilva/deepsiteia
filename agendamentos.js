import db from "./db.js";
import { Sequelize } from "sequelize";

const Agendamento = db.define("agendamentos", {
    nome: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mensagem: {
        type: Sequelize.STRING,
        allowNull: false
    },
} );

Agendamento.sync({force:false});

export default Agendamento;
