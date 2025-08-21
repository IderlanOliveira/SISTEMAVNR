const validCredentials = {
    '11765919401': '23030270ji',
    '09711439433': '988391077'  // Adicione novos usuários e senhas aqui
};

// Função de login
function login() {
    const user = document.getElementById("cpf").value;
    const senha = document.getElementById("senha").value;

    if (validCredentials[user] && validCredentials[user] === senha) {
        localStorage.setItem("auth", "ok"); // aqui estava errado (localStore)
        window.location.href = "verificacao.html";
    } else {
        document.getElementById("loginError").innerText = "CPF ou SENHA incorretos!";
    }
}

// Bloqueia navegação se não estiver logado
function checkAuth() {
    if (localStorage.getItem("auth") !== "ok") {
        alert("Você precisa estar logado!");
        window.location.href = "index.html";
    }
}

// Quando clicar no botão de login → chama a função login()
document.getElementById("loginButton").addEventListener("click", login);
