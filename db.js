// importa a classe Sequelize
import { Sequelize } from "sequelize";

//Importa o pacote dotenv, que sabe ler o arquivo .env.
import dotenv from "dotenv";

//Carrega o arquivo .env automaticamente.
dotenv.config();

// Cria uma nova instância de conexão com o banco de dados
const db = new Sequelize(
    process.env.DB_NAME,  
    process.env.DB_USER, 
    process.env.DB_PASS,  
    {
        host: process.env.DB_HOST,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true, rejectUnauthorized: false
            }
        },
        logging: false,
    }     
); 

db.authenticate().then((function(){
    console.log("Conectado ao banco com sucesso")
})).catch(function(erro){
    console.log("Erro ao conectar ao banco de dados : " + erro)
});

export default db;




