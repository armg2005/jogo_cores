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
document.addEventListener("DOMContentLoaded", function() {

  function atualizar(coresSelecionadas, corAlvo, cores) {
    for (let i = 0; i < 9; i++) {
      let div = document.getElementById("div" + (i + 1));
      div.style.backgroundColor = coresSelecionadas[i];

      div.onclick = function() {
        const corClicada = div.style.backgroundColor;

        if (corClicada === corAlvo) {
          resultado.textContent = "Acertou!";
          jogador.pontuacao += 20;
        } else {
          resultado.textContent = "Errou!";
          jogador.pontuacao -= 10;
        }
        pontosDisplay.textContent = "Pontuação: " + jogador.pontuacao;

        const novasCores = pegar9Embaralhados(cores);
        const novaCorAlvo = sortearNovaCorAlvo(novasCores);
        
        
        atualizar(novasCores, novaCorAlvo,cores);
    };
    }
  }

  
  let cores = ["blue", "red", "green", "black", "orange", "yellow", "orange", "purple", "pink", "brown", "gray", "cyan"];
  const botao_jogar = document.getElementById("botao_jogar");
  let pontuacao = 0;
  const temporizador = document.getElementById("temporizador");
  let intervalo;
  const rankingList = document.getElementById("rankingList");
  let jogador = { nome: "Jogador", pontuacao: 0 };
  const resultado = document.getElementById("resultado");
  const pontosDisplay = document.getElementById("pontos");

  function exibirRanking() {
    const ranking = JSON.parse(localStorage.getItem('gameRanking')) || [];
    rankingList.innerHTML = '';
    ranking.forEach(jogador => {
      const li = document.createElement('li');
      li.textContent = `${jogador.nome} - ${jogador.pontuacao} pontos`;
      rankingList.appendChild(li);
    });
  }

  function salvarPontuacao() {
    const nomeJogador = prompt("Tempo esgotado! Digite seu nome para salvar no ranking:", "Jogador");
    if (nomeJogador) { // Verifica se o jogador não cancelou o prompt
      jogador.nome = nomeJogador;
    } else {
      jogador.nome = "Anônimo";
    }
    const ranking = JSON.parse(localStorage.getItem('gameRanking')) || [];

    ranking.push({ nome: jogador.nome, pontuacao: jogador.pontuacao });

    ranking.sort((a, b) => b.pontuacao - a.pontuacao);

    const top10 = ranking.slice(0, 10);

    localStorage.setItem('gameRanking', JSON.stringify(top10));

    exibirRanking();
  }

  botao_jogar.onclick =function(){

    jogador.pontuacao = 0;
    pontosDisplay.textContent = "Pontuação: 0";
    resultado.textContent = "";

    let tempo = 40;
    jogador.pontuacao = 0;
    pontosDisplay.textContent = "Pontuação: 0";
    resultado.textContent = "Boa sorte!";

    temporizador.textContent = tempo;
    clearInterval(intervalo);

    intervalo = setInterval(function () {
      tempo--;
      temporizador.textContent = "Tempo Restante:"+ tempo;

      if (tempo <= 0) {
        clearInterval(intervalo);
        temporizador.textContent = "Tempo Esgotado!";
        salvarPontuacao();
      }
    }, 1000);
    let coresSelecionadas = pegar9Embaralhados(cores);  
    let corAlvo =sortearNovaCorAlvo(coresSelecionadas);
    atualizar(coresSelecionadas, corAlvo, cores)
 
  };
  exibirRanking();
});
  
