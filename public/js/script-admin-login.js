document.addEventListener('DOMContentLoaded', function() {

    const btn = document.getElementById('btn-entrar-admin');

    btn.addEventListener('click', function() {
        const user = document.getElementById('admin-user').value;
        const pass = document.getElementById('admin-pass').value;

        // --- AQUI VOCÊ DEFINE O LOGIN E SENHA DO ADMIN ---
        const LOGIN_CERTO = "admin";
        const SENHA_CERTA = "admin123";

        if (user === LOGIN_CERTO && pass === SENHA_CERTA) {
            
            // Cria a "Sessão" do admin
            localStorage.setItem('sessao_admin', 'ativo');
            
            alert("Bem-vindo, Chefe!");
            window.location.href = 'admin.html'; // Manda para o painel
            
        } else {
            alert("Acesso Negado! Usuário ou senha incorretos.");
        }
    });

});