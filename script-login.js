document.addEventListener('DOMContentLoaded', function() {

    const btnEntrar = document.getElementById('btn-entrar');

    btnEntrar.addEventListener('click', function(e) {
        e.preventDefault(); // Evita recarregar a página

        // 1. Pegar os dados digitados
        const nomeDigitado = document.getElementById('login-nome').value;
        const senhaDigitada = document.getElementById('login-senha').value;

        // 2. Validação: Ver se está vazio
        if (nomeDigitado === "" || senhaDigitada === "") {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // 3. Buscar a lista de usuários no LocalStorage
        const listaUsuarios = JSON.parse(localStorage.getItem('bd_usuarios')) || [];

        // 4. PROCURAR O USUÁRIO (A Lógica de Login)
        // O método .find procura alguém que tenha o mesmo nome E a mesma senha
        const usuarioEncontrado = listaUsuarios.find(user => 
            user.nome === nomeDigitado && user.senha === senhaDigitada
        );

        if (usuarioEncontrado) {
            // SUCESSO: Usuário existe e senha bateu!
            
            // Salva na sessão que ele está logado
            localStorage.setItem('usuario_logado', JSON.stringify(usuarioEncontrado));
            
            alert(`Bem-vindo de volta, ${usuarioEncontrado.nome}!`);
            window.location.href = 'agendar.html';
        } else {
            // ERRO: Não achou ninguém ou senha errada
            alert("Usuário ou senha incorretos! Tente novamente ou faça o cadastro.");
        }
    });

});