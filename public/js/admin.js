/* TRAVA DE SEGURANÇA */
if (localStorage.getItem('sessao_admin') !== 'ativo') {
    alert("Faça login como administrador.");
    window.location.href = 'admin-login.html';
}

document.addEventListener('DOMContentLoaded', function() {
    carregarAgendamentos();

    // Botão Sair
    const btnSair = document.getElementById('btn-sair-admin');
    if(btnSair) {
        btnSair.addEventListener('click', function() {
            localStorage.removeItem('sessao_admin');
            window.location.href = 'admin-login.html';
        });
    }
});

// --- FUNÇÃO PARA CARREGAR DO SERVIDOR ---
function carregarAgendamentos() {
    const container = document.getElementById('lista-clientes-container');
    container.innerHTML = '<p class="text-center mt-3">Carregando...</p>';

    fetch('http://localhost:3000/api/agendamentos')
    .then(response => response.json())
    .then(agendamentos => {
        container.innerHTML = '';
        
        if (agendamentos.length === 0) {
            container.innerHTML = `<div class="text-center p-5"><h4>Nenhum cliente agendado.</h4></div>`;
            return;
        }

        // Desenha a lista (do mais novo pro mais antigo)
        agendamentos.reverse().forEach((item, index) => {
            const row = document.createElement('div');
            row.classList.add('list-row'); // Certifique-se que essa classe existe no CSS
            
            // Adicionei classes do bootstrap para ajudar no layout se o CSS falhar
            row.className = "d-flex justify-content-between align-items-center p-3 border-bottom";

            row.innerHTML = `
                <div style="flex: 2;"><strong>${index + 1}. ${item.nome}</strong></div>
                <div style="flex: 1;">${item.diaSem} - ${item.hora}</div>
                <div style="flex: 1;">${item.telefone}</div>
                <div style="flex: 1;">
                    <button class="btn btn-sm btn-info text-white" onclick="alert('${item.procedimento}')">Ver</button>
                    <button class="btn btn-sm btn-danger ms-2" onclick="deletarAgendamento('${item.id}')">X</button>
                </div>
            `;
            container.appendChild(row);
        });
    })
    .catch(erro => {
        console.error(erro);
        container.innerHTML = '<p class="text-danger text-center">Erro ao conectar com o servidor.</p>';
    });
}

// --- FUNÇÃO DELETAR ---
function deletarAgendamento(id) {
    if(confirm("Tem certeza que deseja excluir?")) {
        fetch(`http://localhost:3000/api/agendamentos/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            alert(data.mensagem);
            carregarAgendamentos(); // Atualiza a lista
        })
        .catch(erro => alert("Erro ao deletar"));
    }
}