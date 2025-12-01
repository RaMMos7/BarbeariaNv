// Espera o site carregar todo
document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DE SELEÇÃO DE DIA ---
    const dias = document.querySelectorAll('.day-item');
    let diaSelecionado = {
        numero: '2', // Valor padrão inicial
        semana: 'ter'
    };

    dias.forEach(dia => {
        dia.addEventListener('click', function() {
            // Remove a classe 'selected' de todos
            dias.forEach(d => d.classList.remove('selected'));
            // Adiciona no clicado
            this.classList.add('selected');
            
            // Salva os dados do dia clicado
            // Pegamos o texto dentro da div .day-circle e do span .day-label
            diaSelecionado.numero = this.querySelector('.day-circle').innerText;
            diaSelecionado.semana = this.querySelector('.day-label').innerText;
        });
    });

    // --- LÓGICA DE SELEÇÃO DE HORÁRIO ---
    const horas = document.querySelectorAll('.btn-time');
    let horaSelecionada = '14:00'; // Valor padrão inicial

    horas.forEach(hora => {
        hora.addEventListener('click', function() {
            // Se estiver ocupado (busy), não faz nada
            if (this.classList.contains('busy')) return;

            // Remove a classe 'active' de todos
            horas.forEach(h => h.classList.remove('active'));
            // Adiciona no clicado
            this.classList.add('active');

            horaSelecionada = this.innerText;
        });
    });

    // --- BOTÃO CONFIRMAR ---
    const btnConfirmar = document.getElementById('btn-agendar');
    
    btnConfirmar.addEventListener('click', function() {
        const nomeInput = document.getElementById('input-nome').value;
        const procedimentoInput = document.getElementById('input-procedimento').value;

        // Validação simples (obriga colocar o nome)
        if (nomeInput.trim() === "") {
            alert("Por favor, digite seu nome completo.");
            return;
        }

        // Criar objeto com todos os dados
        const agendamento = {
            nome: nomeInput,
            diaNum: diaSelecionado.numero,
            diaSem: diaSelecionado.semana,
            hora: horaSelecionada,
            procedimento: procedimentoInput || "Corte padrão" // Se não digitar nada, vai padrão
        };

        // Salvar no Navegador (LocalStorage)
        // Convertemos o objeto em texto (JSON) para salvar
        localStorage.setItem('dadosBarbearia', JSON.stringify(agendamento));

        // Redirecionar para a página de confirmação
        window.location.href = 'confirmacao.html';
    });

});