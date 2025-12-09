const Agendamento = require('../models/Agendamento');

const AgendamentoController = {
    criar: (req, res) => {
        const dados = req.body;
        // Validação básica
        if (!dados.nome || !dados.hora) {
            return res.status(400).json({ erro: "Dados incompletos: Nome e Hora são obrigatórios." });
        }
        const novo = Agendamento.salvar(dados);
        res.status(201).json({ mensagem: "Sucesso!", agendamento: novo });
    },

    listar: (req, res) => {
        res.json(Agendamento.listarTodos());
    },

    deletar: (req, res) => {
        const { id } = req.params;
        const resultado = Agendamento.deletar(id);
        if(resultado) {
            res.json({ mensagem: "Agendamento deletado com sucesso" });
        } else {
            res.status(404).json({ erro: "Agendamento não encontrado" });
        }
    }
};

module.exports = AgendamentoController;