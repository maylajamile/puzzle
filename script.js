function iniciarJogo(){

    document.getElementById('botao').style.display = 'none';
    document.getElementById('quebra-cabeca').style.display = 'block';
    document.getElementById('imagem').style.display = 'block';

    const quebra_cabeca = document.getElementById("quebra-cabeca");

    for(var i = 0; i < 8; i++){
        for(var j = 0; j < 12; j++){
            var novaPeca = document.createElement("div");
            novaPeca.id="x"+j+"y"+i;
            novaPeca.style.top=i*50+"px";
            novaPeca.style.left=j*50+"px";
            novaPeca.style.backgroundPositionX=((j*25/(12-1))*100)+"%";
            novaPeca.style.backgroundPositionY=((i*25/(8-1))*100)+"%";
            novaPeca.setAttribute("onclick", "clicarPeca(this)");
            quebra_cabeca.appendChild(novaPeca);
        }
    }

   embaralhar(100);

}

var escolhido = null;
var escolhido2 = null;

function clicarPeca(elemento){
    if (escolhido == null){
        escolhido = elemento;
    } else if (escolhido2 == null) {
        escolhido2 = elemento;
        trocarPeca();
    }
}

function embaralhar(iteracoes) {
    for (var i = 0; i < iteracoes; i++){
        var escolhidoX = 0;
        var escolhidoY = 0;
        var escolhido2X = 0;
        var escolhido2Y = 0;

        while (escolhidoX == escolhido2X && escolhidoY == escolhido2Y){
            escolhidoX = Math.round(Math.random() * (12 - 1));
            escolhidoY = Math.round(Math.random() * (8 - 1));

            escolhido2X = Math.round(Math.random() * (12 - 1));
            escolhido2Y = Math.round(Math.random() * (8 - 1));
        }

        escolhido = document.getElementById("x"+escolhidoX+"y"+escolhidoY);
        escolhido2 = document.getElementById("x"+escolhido2X+"y"+escolhido2Y);
        trocarPeca();
    }
}

function trocarPeca(){
    var escolhidoTrocadoTop = escolhido.style.top;
    var escolhidoTrocadoLeft = escolhido.style.left;
    escolhido.style.top = escolhido2.style.top;
    escolhido.style.left = escolhido2.style.left;
    escolhido2.style.top = escolhidoTrocadoTop;
    escolhido2.style.left = escolhidoTrocadoLeft;
    escolhido = null;
    escolhido2 = null;
    validar();
}

function validar(){
    var quebraCabecaOk = true;
    for (var i = 0; i < 8; i++){
        for (var j = 0; j < 12; j++){
            var posicaoXEsperada = j * 50 + "px";
            var posicaoYEsperada = i * 50 + "px";

            var pecaVerificada = document.getElementById("x"+j+"y"+i);
            if (pecaVerificada.style.left != posicaoXEsperada || pecaVerificada.style.top != posicaoYEsperada){
                quebraCabecaOk = false;
            }
        }
    }

    if(quebraCabecaOk){
        window.alert("Parabéns, você finalizou o quebra-cabeça!")
    }
}