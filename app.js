let listaDeNumerosSorteados = [];
let numeroLimite = 10; // Valor padrão
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    if (campo) {
        campo.innerHTML = texto;
    } else {
        console.error(`Elemento com a tag ${tag} não encontrado.`);
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Adivinhe o <span class='container__texto-azul'>número secreto</span>");
    exibirTextoNaTela("p.texto__paragrafo", `Escolha um número entre 1 e ${numeroLimite}`);
}

function configurarDificuldade() {
    let dificuldade = document.getElementById("dificuldade").value;
    numeroLimite = parseInt(dificuldade);
    reiniciarJogo();
}

function verificarChute() {
    let chute = parseInt(document.getElementById("chute").value);

    if (isNaN(chute) || chute < 1 || chute > numeroLimite) {
        exibirTextoNaTela("p.texto__paragrafo", `Por favor, insira um número válido entre 1 e ${numeroLimite}.`);
        return;
    }
    
    if (chute === numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`; 
        exibirTextoNaTela("p.texto__paragrafo", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) { 
            exibirTextoNaTela("p.texto__paragrafo", "O número secreto é menor");
        } else {
            exibirTextoNaTela("p.texto__paragrafo", "O número secreto é maior");
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista === numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    let chute = document.getElementById("chute");
    if (chute) {
        chute.value = "";
    } else {
        console.error("Campo de entrada não encontrado.");
    }
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

// Inicializa o jogo
exibirMensagemInicial();
