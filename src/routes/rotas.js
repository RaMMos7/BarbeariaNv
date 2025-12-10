const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/AgendamentoController');

// Define os caminhos da API
router.post('/agendar', AgendamentoController.criar);
router.get('/agendamentos', AgendamentoController.listar);
router.delete('/agendamentos/:id', AgendamentoController.deletar);

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../public/index.html'));
}   );

router.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/admin-login.html'));
});

router.post('/api/agendar', agendamentoController.criar);

module.exports = router;