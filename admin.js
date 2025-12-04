/* ==========================================================
   1. TRAVA DE SEGURANÇA (ADMIN)
   (Coloque isso na primeira linha)
   ========================================================== */
if (localStorage.getItem('sessao_admin') !== 'ativo') {
    alert("Área restrita! Faça login como administrador.");
    window.location.href = 'admin-login.html'; // Chuta de volta para o login
}

/* ==========================================================
   2. CARREGAMENTO DO PAINEL
   ========================================================== */
document.addEventListener('DOMContentLoaded', function() {
    
    const container = document.getElementById('lista-clientes-container'); 

    // --- LÓGICA DE LOGOUT (SAIR) ---
    // Você precisa adicionar um botão com id="btn-sair-admin" no seu HTML admin
    const btnSair = document.getElementById('btn-sair-admin');
    if(btnSair) {
        btnSair.addEventListener('click', function() {
            localStorage.removeItem('sessao_admin');
            window.location.href = 'admin-login.html';
        });
    }

    // --- LEITURA DOS AGENDAMENTOS ---
    const agendamentos = JSON.parse(localStorage.getItem('bd_todos_agendamentos')) || [];

    // Se estiver vazio
    if (agendamentos.length === 0) {
        container.innerHTML = `
            <div class="text-center p-5">
                <h4 style="color: #666;">Nenhum agendamento encontrado</h4>
                <p>O painel está aguardando novos clientes.</p>
            </div>
        `;
        // Não usamos return aqui para o botão Sair continuar funcionando se existir
    } else {
        // Limpa o container antes de desenhar
        container.innerHTML = '';

        // Loop para criar cada linha (Reverse = mais novos no topo)
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
    }

    // --- LÓGICA DO BOTÃO EXCLUIR ---
    // (Precisa estar fora do else ou reatribuído se a lista mudar)
    // O ideal é usar "event delegation" ou reatribuir sempre que desenhar
    if (agendamentos.length > 0) {
        document.querySelectorAll('.btn-excluir').forEach(btn => {
            btn.addEventListener('click', function() {
                if(confirm("Deseja realmente apagar este agendamento?")) {
                    const idParaRemover = this.getAttribute('data-id');
                    
                    // Lê o banco original de novo para filtrar corretamente
                    let listaAtual = JSON.parse(localStorage.getItem('bd_todos_agendamentos')) || [];
                    const novaLista = listaAtual.filter(item => item.id != idParaRemover);
                    
                    localStorage.setItem('bd_todos_agendamentos', JSON.stringify(novaLista));
                    window.location.reload();
                }
            });
        });
    }
});