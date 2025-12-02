document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DE SELEÇÃO DE DIA ---
    const dias = document.querySelectorAll('.day-item');
    let diaSelecionado = { numero: '2', semana: 'ter' }; // Valor padrão inicial

    dias.forEach(dia => {
        dia.addEventListener('click', function() {
            dias.forEach(d => d.classList.remove('selected'));
            this.classList.add('selected');
            
            diaSelecionado.numero = this.querySelector('.day-circle').innerText;
            diaSelecionado.semana = this.querySelector('.day-label').innerText;
        });
    });

    // --- LÓGICA DE SELEÇÃO DE HORÁRIO ---
    const horas = document.querySelectorAll('.btn-time');
    let horaSelecionada = '14:00'; // Valor padrão inicial

    horas.forEach(hora => {
        hora.addEventListener('click', function() {
            if (this.classList.contains('busy')) return;
            horas.forEach(h => h.classList.remove('active'));
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
            alert("Por favor, digite seu nome completo.");
            return;
        }

        // 1. Criar o objeto do agendamento
        const novoAgendamento = {
            id: Date.now(), // Cria um ID único
            nome: nomeInput,
            telefone: telefoneInput || "Não informado",
            diaNum: diaSelecionado.numero,
            diaSem: diaSelecionado.semana,
            hora: horaSelecionada,
            procedimento: procedimentoInput || "Corte Padrão"
        };

        // 2. SALVAR NA LISTA GERAL (Para o Painel Admin)
        // Pega o que já tem salvo ou cria um array vazio
        let listaNoBanco = JSON.parse(localStorage.getItem('bd_todos_agendamentos')) || [];
        listaNoBanco.push(novoAgendamento);
        localStorage.setItem('bd_todos_agendamentos', JSON.stringify(listaNoBanco));

        // 3. SALVAR O ATUAL (Para a página de confirmação imediata)
        localStorage.setItem('bd_ultimo_agendamento', JSON.stringify(novoAgendamento));

        // Redirecionar
        alert("Agendamento realizado com sucesso!");
        window.location.href = 'confirmacao.html'; 
    });
});