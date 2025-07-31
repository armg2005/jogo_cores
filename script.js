function sortearNovaCorAlvo(coresSelecionadas) {
  const indiceSorteado = Math.floor(Math.random() * coresSelecionadas.length);
  const corAlvo = coresSelecionadas[indiceSorteado];
  document.getElementById("cor_escolha").style.backgroundColor = corAlvo;
  return corAlvo; 
}

function pegar9Embaralhados(array) {
  let embaralhado = embaralhar(array);
  return embaralhado.slice(0, 9); 
}
function embaralhar(array) {
  let copia = array.slice(); // faz uma cópia do array original

  for (let i = copia.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]]; // troca os elementos
  }
  
  return copia;
}

function atualizar(coresSelecionadas, corAlvo, cores) {
  for (let i = 0; i < 9; i++) {
    let div = document.getElementById("div" + (i + 1));
    div.style.backgroundColor = coresSelecionadas[i];

    const novasCores = pegar9Embaralhados(cores);
    const novaCorAlvo = sortearNovaCorAlvo(novasCores);
    div.onclick = function() {
      const corClicada = div.style.backgroundColor;
      if (corClicada === corAlvo) {
        alert("Parabéns, você acertou!");
        atualizar(novasCores, novaCorAlvo,cores);
      } else {
        alert("Errou, tente novamente.");
        atualizar(novasCores, novaCorAlvo, cores);
      }

    };
  }
}

document.addEventListener("DOMContentLoaded", function() {

  let cores = ["blue", "red", "green", "black", "orange", "yellow", "orange", "purple", "pink", "brown", "gray", "cyan"];
  const botao_jogar = document.getElementById("botao_jogar");
  let pontuacao = 0;
  const temporizador = document.getElementById("temporizador");
  let intervalo;

  botao_jogar.onclick =function(){

    let tempo = 40;
    temporizador.textContent = tempo;
    clearInterval(intervalo);

    intervalo = setInterval(function () {
      tempo--;
      temporizador.textContent = "Tempo Restante:"+ tempo;

      if (tempo <= 0) {
        clearInterval(intervalo);
        alert(" Tempo esgotado!");
      }
    }, 1000);
    let coresSelecionadas = pegar9Embaralhados(cores);  
    let corAlvo =sortearNovaCorAlvo(coresSelecionadas);
    atualizar(coresSelecionadas ,corAlvo, cores)
 
  };
});
  
