document.addEventListener('DOMContentLoaded', function() {
    
    // CORREÇÃO AQUI: O ID no seu HTML é 'lista-clientes-container'
    const container = document.getElementById('lista-clientes-container'); 
    
    // 1. Ler a lista de todos os agendamentos
    const agendamentos = JSON.parse(localStorage.getItem('bd_todos_agendamentos')) || [];

    // Se estiver vazio
    if (agendamentos.length === 0) {
        container.innerHTML = `
            <div class="text-center p-5">
                <h4 style="color: #666;">Nenhum agendamento encontrado</h4>
                <p>Realize um agendamento na tela inicial para testar.</p>
            </div>
        `;
        return;
    }

    // Limpa o container antes de desenhar
    container.innerHTML = '';

    // 2. Loop para criar cada linha (mostrando os mais novos primeiro)
    agendamentos.reverse().forEach((item, index) => {
        
        const row = document.createElement('div');
        row.classList.add('list-row');

        row.innerHTML = `
            <div class="col-nome">
                <span class="client-index">${index + 1}</span>
                <span class="client-name">${item.nome}</span>
            </div>
            
            <div class="col-dia">
                <div class="admin-date-circle">${item.diaNum}</div>
                <span class="admin-week-day">${item.diaSem}</span>
            </div>

            <div class="col-hora">
                <div class="admin-time-badge">${item.hora}</div>
            </div>

            <div class="col-ver">
                <button class="btn-ver-detalhe" onclick="alert('Procedimento: ${item.procedimento}')">
                    Ver
                </button>
            </div>

            <div class="col-tel phone-display">
                ${item.telefone}
            </div>
            
            <div class="col-acao ms-2">
                <button class="btn btn-sm btn-danger btn-excluir" data-id="${item.id}" style="border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">
                    <i class="fa-solid fa-times">X</i>
                </button>
            </div>
        `;

        container.appendChild(row);
    });

    // 3. Lógica do Botão Excluir
    document.querySelectorAll('.btn-excluir').forEach(btn => {
        btn.addEventListener('click', function() {
            if(confirm("Deseja realmente apagar este agendamento?")) {
                const idParaRemover = this.getAttribute('data-id');
                
                // Filtra removendo o item clicado
                // Precisamos ler do localStorage de novo para garantir que estamos filtrando a lista original (sem o reverse)
                let listaAtual = JSON.parse(localStorage.getItem('bd_todos_agendamentos')) || [];
                const novaLista = listaAtual.filter(item => item.id != idParaRemover);
                
                // Salva a nova lista e recarrega a página
                localStorage.setItem('bd_todos_agendamentos', JSON.stringify(novaLista));
                window.location.reload();
            }
        });
    });
});