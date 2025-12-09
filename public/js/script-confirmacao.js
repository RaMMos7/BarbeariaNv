document.addEventListener('DOMContentLoaded', function() {
    
    // Tenta pegar o último agendamento salvo
    const dadosSalvos = localStorage.getItem('bd_ultimo_agendamento');

    if (dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);

        // --- PREENCHER O HTML ---
        const titulo = document.getElementById('conf-titulo');
        // Pega só o primeiro nome para ficar mais pessoal
        const primeiroNome = dados.nome.split(' ')[0];
        titulo.innerText = `Horário marcado, ${primeiroNome}!`; 

        document.getElementById('conf-dia-num').innerText = dados.diaNum;
        document.getElementById('conf-dia-sem').innerText = dados.diaSem;
        document.getElementById('conf-hora').innerText = dados.hora;
        
        // Lógica simples para escrever Manhã ou Tarde
        const horaNumero = parseInt(dados.hora.substring(0, 2));
        const periodoEl = document.getElementById('conf-periodo');
        
        if (horaNumero < 12) {
            periodoEl.innerText = "Manhã";
        } else {
            periodoEl.innerText = "Tarde";
        }

        document.getElementById('conf-proc').innerText = dados.procedimento;

    } else {
        // Se a pessoa abrir essa página sem agendar nada antes
        alert("Nenhum agendamento encontrado.");
        window.location.href = 'agendar.html';
    }
});