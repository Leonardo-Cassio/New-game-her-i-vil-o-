const express = require('express');
const app = express();
const { Connection, Request } = require("tedious");

// Configurações de conexão com o banco de dados Azure SQL
const config = {
    authentication: {
        options: {
            userName: "leobank", // Substitua pelo nome de usuário do banco de dados
            password: "22052003Leo" // Substitua pela senha do banco de dados
        },
        type: "default"
    },
    server: "vaibrazilian.database.windows.net", // Substitua pelo nome do servidor do banco de dados
    options: {
        database: "fatec-projeto-nodevue", // Substitua pelo nome do banco de dados
        encrypt: true,
        trustServerCertificate: false
    }
};

// Rota para testar a conexão com o banco de dados
app.get('/', (req, res) => {
    // Cria uma nova conexão
    const connection = new Connection(config);

    // Eventos da conexão
    connection.on("connect", err => {
        if (err) {
            console.error("Erro ao conectar ao banco de dados:", err.message);
            res.status(500).send("Erro ao conectar ao banco de dados");
        } else {
            console.log("Conexão bem-sucedida ao banco de dados");
            res.status(200).send("Conexão bem-sucedida ao banco de dados");
        }
    });

    // Estabelece a conexão com o banco de dados
    connection.connect();
});

// Inicia o servidor Express
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Servidor Express está rodando na porta ${port}');
});