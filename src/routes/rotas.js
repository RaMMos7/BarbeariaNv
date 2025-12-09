const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/AgendamentoController');

// Define os caminhos da API
router.post('/agendar', AgendamentoController.criar);
router.get('/agendamentos', AgendamentoController.listar);
router.delete('/agendamentos/:id', AgendamentoController.deletar);

module.exports = router;