document.addEventListener('DOMContentLoaded', function() {

    const btnCadastrar = document.getElementById('btn-cadastrar');

    btnCadastrar.addEventListener('click', function(e) {
        e.preventDefault(); // Evita recarregar a página

        const nome = document.getElementById('cad-nome').value;
        const email = document.getElementById('cad-email').value;
        const senha = document.getElementById('cad-senha').value;

        // 1. Validação Básica
        if (nome === "" || email === "" || senha === "") {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        // 2. Verificar se o email já existe (Opcional, mas recomendado)
        const usuariosExistentes = JSON.parse(localStorage.getItem('bd_usuarios')) || [];
        const emailExiste = usuariosExistentes.find(user => user.email === email);

        if (emailExiste) {
            alert("Este e-mail já está cadastrado.");
            return;
        }

        // 3. Criar o Objeto do Usuário com ID único
        const novoUsuario = {
            id: Date.now(), // Gera um ID único numérico (ex: 169877654321)
            nome: nome,
            email: email,
            senha: senha
        };

        // 4. Salvar no Banco de Dados de Usuários
        usuariosExistentes.push(novoUsuario);
        localStorage.setItem('bd_usuarios', JSON.stringify(usuariosExistentes));

        // 5. Criar a "SESSÃO" (Login Automático)
        // Isso diz ao navegador: "Este é o usuário que está usando o site agora"
        localStorage.setItem('usuario_logado', JSON.stringify(novoUsuario));

        // 6. Redirecionar para o Agendamento
        alert("Cadastro realizado com sucesso! Redirecionando...");
        window.location.href = 'agendar.html';
    });

});