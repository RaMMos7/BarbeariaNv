const bancoDadosMemoria = []; // Simula o banco de dados

class Agendamento {
    static salvar(dados) {
        const novo = { id: Date.now().toString(), ...dados };
        bancoDadosMemoria.push(novo);
        return novo;
    }

    static listarTodos() {
        return bancoDadosMemoria;
    }

    static deletar(id) {
        const index = bancoDadosMemoria.findIndex(item => item.id === id);
        if (index !== -1) {
            bancoDadosMemoria.splice(index, 1);
            return true;
        }
        return false;
    }
}

module.exports = Agendamento;