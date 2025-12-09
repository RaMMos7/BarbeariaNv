const express = require('express');
const cors = require('cors');
const path = require('path');
const rotas = require('./src/routes/rotas'); 

const app = express();
const PORT = 3000;

// 1. Configurações
app.use(cors());
app.use(express.json());

// 2. Servir Arquivos Estáticos (Frontend)
// Aponta para a pasta public onde estão seus HTMLs e a pasta js/css
app.use(express.static(path.join(__dirname, 'public')));

// 3. Rotas da API
app.use('/api', rotas);

// 4. Rota Padrão (Redireciona para o index ou login se acessar a raiz)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`💈 Barbearia rodando em: http://localhost:${PORT}`);
});