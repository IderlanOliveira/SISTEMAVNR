// Credenciais válidas (em um caso real, isso viria de um servidor)
const validCredentials = {
    '11765919401': '23030270j1',
    '09711439433': '988391077'
};

// Função para aplicar máscara de CPF
function formatarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
}

// Função de login
function login() {
    const user = document.getElementById("cpf").value.replace(/\D/g, '');
    const senha = document.getElementById("senha").value;

    if (validCredentials[user] && validCredentials[user] === senha) {
        localStorage.setItem("auth", "ok");
        // Usando replace para não manter a página de login no histórico
        window.location.replace("verificacao.html");
    } else {
        document.getElementById("loginError").innerText = "CPF ou SENHA incorretos!";
    }
}

// Adiciona máscara ao CPF enquanto o usuário digita
document.getElementById("cpf").addEventListener("input", function(e) {
    e.target.value = formatarCPF(e.target.value);
});

// Permite login ao clicar no botão
document.getElementById("loginButton").addEventListener("click", login);

// Permite login ao pressionar Enter
document.getElementById("senha").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        login();
    }
});