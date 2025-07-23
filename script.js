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
  let cores = ["blue", "red", "green", "black", "orange", "yellow", "orange", "purple", "pink", "brown", "gray", "cyan"];
  
  function sortearNovaCorAlvo() {
    const indiceSorteado = Math.floor(Math.random() * coresSelecionadas.length);
    corAlvo = coresSelecionadas[indiceSorteado];
    document.getElementById("cor_escolha").style.backgroundColor = corAlvo;
  }
  let coresSelecionadas = pegar9Embaralhados(cores);
  let pontuacao = 0;

  
  for (let i = 0; i < 9; i++) {
    let div = document.getElementById("div" + (i + 1));
    
    div.style.backgroundColor = coresSelecionadas[i];
    div.onclick = function() {
      const corClicada = div.style.backgroundColor;
      if(corClicada == corAlvo){
        alert("parabeins")
      }
    };
  }
   sortearNovaCorAlvo();

});
