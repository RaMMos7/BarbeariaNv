document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA DE SELEÇÃO DE DIA ---
    const dias = document.querySelectorAll('.day-item');
    let diaSelecionado = { numero: '2', semana: 'ter' }; // Padrão

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
    let horaSelecionada = '14:00'; // Padrão

    horas.forEach(hora => {
        hora.addEventListener('click', function() {
            if (this.classList.contains('busy')) return;
            horas.forEach(h => h.classList.remove('active'));
            this.classList.add('active');
            horaSelecionada = this.innerText;
        });
    });

    // --- BOTÃO CONFIRMAR (CONECTADO AO SERVIDOR) ---
    const btnConfirmar = document.getElementById('btn-agendar');
    
    if(btnConfirmar) {
        btnConfirmar.addEventListener('click', function() {
            const nomeInput = document.getElementById('input-nome').value;
            const telefoneInput = document.getElementById('input-number').value;
            const procedimentoInput = document.getElementById('input-procedimento').value;

            if (!nomeInput) {
                alert("Por favor, digite seu nome.");
                return;
            }

            // Dados para enviar ao Back-end
            const dados = {
                nome: nomeInput,
                telefone: telefoneInput || "Não informado",
                diaNum: diaSelecionado.numero,
                diaSem: diaSelecionado.semana,
                hora: horaSelecionada,
                procedimento: procedimentoInput || "Corte Simples"
            };

            // Envia via Fetch API
            fetch('http://localhost:3000/api/agendar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dados)
            })
            .then(response => response.json())
            .then(data => {
                if(data.erro) {
                    alert(data.erro);
                } else {
                    // Salva no local apenas para mostrar na tela de confirmação, se quiser
                    localStorage.setItem('bd_ultimo_agendamento', JSON.stringify(data.agendamento));
                    alert("Agendamento realizado com sucesso!");
                    window.location.href = 'confirmacao.html';
                }
            })
            .catch(erro => {
                console.error(erro);
                alert("Erro ao conectar com o servidor.");
            });
        });
    }
});