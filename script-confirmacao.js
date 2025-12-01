document.addEventListener('DOMContentLoaded', function() {
    
    // Tentar pegar os dados salvos no navegador
    const dadosSalvos = localStorage.getItem('dadosBarbearia');

    if (dadosSalvos) {
        // Converter de texto de volta para Objeto Javascript
        const dados = JSON.parse(dadosSalvos);

        // --- PREENCHER O HTML ---

        // 1. Título com o Nome
        const titulo = document.getElementById('conf-titulo');
        titulo.innerText = `Horário marcado ${dados.nome}!`;

        // 2. Dia
        document.getElementById('conf-dia-num').innerText = dados.diaNum;
        document.getElementById('conf-dia-sem').innerText = dados.diaSem;

        // 3. Horário e Período (Manhã/Tarde)
        document.getElementById('conf-hora').innerText = dados.hora;
        
        // Lógica simples para definir Manhã ou Tarde
        // Pega os 2 primeiros digitos da hora (Ex: "14:00" -> 14)
        const horaNumero = parseInt(dados.hora.substring(0, 2));
        const periodoEl = document.getElementById('conf-periodo');
        
        if (horaNumero < 12) {
            periodoEl.innerText = "Manhã";
        } else {
            periodoEl.innerText = "Tarde";
        }

        // 4. Procedimento
        document.getElementById('conf-proc').innerText = dados.procedimento;

    } else {
        // Se não tiver dados (acessou a página direto sem agendar)
        alert("Nenhum agendamento encontrado.");
        window.location.href = 'agendar.html'; // Manda de volta pra tela de agendar
    }

});