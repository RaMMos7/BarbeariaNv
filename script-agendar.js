/* ==========================================================
   1. SEGURANÇA E VERIFICAÇÃO DE LOGIN
   (Isso roda antes de carregar a página para proteger)
   ========================================================== */
const usuarioLogado = JSON.parse(localStorage.getItem('usuario_logado'));

// Se não tiver ninguém logado, manda de volta para o cadastro
if (!usuarioLogado) {
    alert("Você precisa se cadastrar ou logar primeiro!");
    window.location.href = 'cadastro.html';
}

/* ==========================================================
   2. LÓGICA DA PÁGINA (CARREGAMENTO)
   ========================================================== */
document.addEventListener('DOMContentLoaded', function() {
    
    // --- PREENCHIMENTO AUTOMÁTICO DO NOME ---
    const inputNome = document.getElementById('input-nome');
    if(inputNome && usuarioLogado) {
        inputNome.value = usuarioLogado.nome;
        // inputNome.disabled = true; // Descomente se quiser impedir que mudem o nome
    }

    // --- LÓGICA DE SELEÇÃO DE DIA ---
    const dias = document.querySelectorAll('.day-item');
    let diaSelecionado = { numero: '2', semana: 'ter' }; // Valor padrão inicial

    dias.forEach(dia => {
        dia.addEventListener('click', function() {
            // Remove a classe 'selected' de todos
            dias.forEach(d => d.classList.remove('selected'));
            // Adiciona no que foi clicado
            this.classList.add('selected');
            
            // Salva os dados
            diaSelecionado.numero = this.querySelector('.day-circle').innerText;
            diaSelecionado.semana = this.querySelector('.day-label').innerText;
        });
    });

    // --- LÓGICA DE SELEÇÃO DE HORÁRIO ---
    const horas = document.querySelectorAll('.btn-time');
    let horaSelecionada = '14:00'; // Valor padrão inicial

    horas.forEach(hora => {
        hora.addEventListener('click', function() {
            // Se o horário estiver ocupado (classe busy), não faz nada
            if (this.classList.contains('busy')) return;

            // Remove a classe 'active' de todos
            horas.forEach(h => h.classList.remove('active'));
            // Adiciona no que foi clicado
            this.classList.add('active');
            
            horaSelecionada = this.innerText;
        });
    });

    // --- BOTÃO CONFIRMAR ---
    const btnConfirmar = document.getElementById('btn-agendar');
    
    btnConfirmar.addEventListener('click', function() {
        const nomeInput = document.getElementById('input-nome').value;
        const telefoneInput = document.getElementById('input-number').value;
        const procedimentoInput = document.getElementById('input-procedimento').value;

        // Validação simples
        if (!nomeInput) {
            alert("Por favor, verifique seu nome.");
            return;
        }

        // 1. Criar o objeto do agendamento
        const novoAgendamento = {
            id: Date.now(), // ID único do agendamento
            idUsuario: usuarioLogado.id, // Vincula o agendamento ao ID do usuário logado
            nome: nomeInput,
            telefone: telefoneInput || "Não informado",
            diaNum: diaSelecionado.numero,
            diaSem: diaSelecionado.semana,
            hora: horaSelecionada,
            procedimento: procedimentoInput || "Corte Padrão"
        };

        // 2. SALVAR NA LISTA GERAL (Para o Painel Admin)
        let listaNoBanco = JSON.parse(localStorage.getItem('bd_todos_agendamentos')) || [];
        listaNoBanco.push(novoAgendamento);
        localStorage.setItem('bd_todos_agendamentos', JSON.stringify(listaNoBanco));

        // 3. SALVAR O ATUAL (Para o Recibo)
        localStorage.setItem('bd_ultimo_agendamento', JSON.stringify(novoAgendamento));

        // Redirecionar
        alert("Agendamento realizado com sucesso!");
        window.location.href = 'confirmacao.html'; 
    });
});