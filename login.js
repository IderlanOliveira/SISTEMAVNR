const validCredentials = {
    '11765919401': '23030270ji',
    '09711439433': '988391077',  // Adicione novos usuários e senhas aqui
};

// Função de login
funcion login(user,senha){
    if (validCredentials[user] && validCredentials[user] === senha) {
        localStore.setItem("auth", "ok");
        window.location.href = "verificacao.html;
    } else {
        alert("CPF ou SENHA incorretos!");
    }
}

// Bloqueia navegação se não estiver logado
function checkAuth(){
    if(localStorage.getItem("auth") !== "ok") {
        alert("Você precisa estar logado!");
        window.location.href = "index.html";

    }
}
