let dados = ["dado1.svg", "dado2.svg", "dado3.svg", "dado4.svg", "dado5.svg", "dado6.svg"];
dadosGuardados = [];
let throwBtn = document.getElementById("throw");
let generalasCounter;
let jugador = 2;
let turnosCounter = 0;


throwBtn.addEventListener("click", throwDados);

function startGame() {
  for (let i = 0; i < 5; i++) {
    let random = Math.floor((Math.random() * 6) + 1);
    dadosGuardados[i] = dados[random];
  }
  generalasCounter = 0;
}

function saveDado(dado) {
  if (turnosCounter < 3) {
    let one_dado = dado.target;
    let dados = document.getElementById("dados");
    if (document.getElementById("cubilete-torcido") != null) {
      changeCubilete("parado");
    }
    if (!dadosGuardados.includes(one_dado)) {
      dadosGuardados.push(one_dado);
    }
    dados.removeChild(one_dado);
    throwBtn.addEventListener("click", throwDados);
  }
}

function throwDados(btn) {
  let dadosTirados = document.querySelectorAll("#dados .dado");
  let dados = document.getElementById("dados");

  if (turnosCounter < 3) {
    let throwBtn = btn.target;
    changeCubilete("torcido");
    for (let i = 0; i < dadosGuardados.length; i++) {
      let new_dado = document.createElement("img");
      let random = Math.floor((Math.random() * 6) + 1);
      new_dado.setAttribute("src", "dado" + random + ".svg");
      new_dado.setAttribute("data-value", random);
      new_dado.addEventListener("click", saveDado);
      new_dado.classList.add("dado");
      dados.appendChild(new_dado);
    }
    dadosGuardados = [];
    throwBtn.removeEventListener("click", throwDados);
    asignarValores();
    turnosCounter++;
  }


}

function changeCubilete(pos) {
  if (pos == "parado") {
    let cubilete = document.getElementById("cubilete-torcido");
    cubilete.setAttribute("id", "cubilete-parado");
    cubilete.setAttribute("src", "cubilete parado.png");
  } else if (pos == "torcido") {
    let cubilete = document.getElementById("cubilete-parado");
    cubilete.setAttribute("id", "cubilete-torcido");
    cubilete.setAttribute("src", "cubilete torcido.png");
  }
}

function checkSum(param) {
  let dadosTirados = document.querySelectorAll(".dado[data-value='" + param + "']");
  let total = param * dadosTirados.length
  return total;
}

function checkEscalera() {
  let escaleras = [[1, 2, 3, 4, 5], [2, 3, 4, 5, 6], [3, 4, 5, 6, 1]]
  let dadosTirados = document.querySelectorAll(".dado");
  let values = [];
  for (let i = 0; i < dadosTirados.length; i++) {
    let value = parseInt(dadosTirados[i].getAttribute("data-value"));
    values.push(value);
  }
  values.sort(naturalSort);
  if (escaleras.some(comb => {
    return comb.every(num => {
      if (values.indexOf(num) != -1) {
        return true;
      }
    });
  })) {
    return 25;
  } else {
    return 0;
  }
}

function checkPoker() {
  let Losdados = [1, 2, 3, 4, 5, 6];
  if (Losdados.some(value => {
    if (checkGame("poker", value) || (checkGame("generala", value))) {
      return true
    }
  })) {
    return 40;
  } else {
    return 0;
  }
}

function checkGenerala() {
  let Losdados = [1, 2, 3, 4, 5, 6];
  if (Losdados.some(value => {
    if (checkGame("generala", value)) {
      return true
    }
  })) {
    generalasCounter++;
    return 50;
  } else {
    return 0;
  }
}

function checkDobleGenerala() {
  if (generalasCounter == 2) {
    return 100;
  } else {
    return 0;
  }
}

function checkGame(game, param) {
  let dadosTirados = document.querySelectorAll(".dado");
  let values = [];
  let gameValues = [];
  for (let i = 0; i < dadosTirados.length; i++) {
    let value = parseInt(dadosTirados[i].getAttribute("data-value"));
    values.push(value);
  }
  values.forEach(value => {
    if (value == param) {
      gameValues.push(value);
    }
  });
  if (game == "poker" && gameValues.length == 4) {
    return true;
  } else if (game == "generala" && gameValues.length == 5) {
    return true;
  } else {
    return false;
  }
}


function checkFull() {
  return 0;
}

function asignarValores(cellSelect) {
  let rows = [checkSum(1), checkSum(2), checkSum(3), checkSum(4), checkSum(5), checkSum(6), checkEscalera(), checkFull(), checkPoker(), checkGenerala(), checkDobleGenerala()];
  let start = jugador == 1 ? 5 : 6;
  let fin = jugador == 1 ? 36 : 40;
  let celdas = document.querySelectorAll(".cell");
  let total = 0;
  let j = 0;
  for (let i = start - 1; i < fin - 1; i += 3) {
    if (rows[j] == 0) {
      celdas[i].innerHTML = "-";
    } else {
      celdas[i].innerHTML = rows[j];
    }
    celdas[i].classList.add("valueselected");
    j++;
  }
  j = 0;
  for (let j = start - 1; j < fin - 1; j += 3) {
    total += parseInt(celdas[j].innerHTML);
  }
  celdas[(celdas.length) - (jugador == 1 ? 2 : 1)].innerHTML = total;
}


function naturalSort(a, b) {
  return new Intl.Collator(undefined, { numeric: true, sensitivity: "base" }).compare(a, b);
}