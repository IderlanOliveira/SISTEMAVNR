const validCredentials = {
    '11765919401': '23030270ji',
    '09711439433': '988391077',  // Adicione novos usuários e senhas aqui
    'user3': 'password3'
};

document.getElementById('loginButton').addEventListener('click', function() {
    const user = document.getElementById('cpf').value;
    const senha = document.getElementById('senha').value;
    const loginError = document.getElementById('loginError');

    if (validCredentials[user] && validCredentials[user] === senha) {
        localStorage.setItem('authToken', 'loggendIn')
        window.location.href = 'verificacao.html';
    } else {
        loginError.textContent = 'CPF ou SENHA incorretos. Tente novamente.';
    }
});
