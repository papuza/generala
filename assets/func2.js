let laGenerala = {
  dadosImgs: ["dado1.svg", "dado2.svg", "dado3.svg", "dado4.svg", "dado5.svg", "dado6.svg"],
  dadosGuardados: [],
  dadosTirados: [],
  turnosCounterxJug: 0,
  turnoJugador: 1,
  turnosCounter: 0,
  generalasCounter1: 0,
  generalasCounter2: 0,
  throwBtn: document.getElementById("throw"),
  tablero: document.querySelectorAll(".cell"),
}
laGenerala.throwBtn.addEventListener("click", throwDados);
let startBtn = document.getElementById("startbtn");
let playBtn = document.getElementById("playbtn");
startBtn.addEventListener("click", showElection);
playBtn.addEventListener("click", startGame);

/*******EMPEZAR JUEGO*******/

function showElection() {
  let msjDiv = document.getElementById("msjDiv");
  let electionMsj = document.getElementById("election");
  msjDiv.style.display = "none"
  let jug1 = document.getElementById("jug1");
  let jug2 = document.getElementById("jug2");
  electionMsj.style.display = "flex";
  jug1.addEventListener("click", throwOneDado)
  jug2.addEventListener("click", throwOneDado)
}

function startGame() {
  let electionMsj = document.getElementById("election");
  let jug1value = parseInt(document.getElementById("jug1").innerHTML);
  let jug2value = parseInt(document.getElementById("jug2").innerHTML);
  electionMsj.style.display = "none";
  if (jug1value > jug2value) {
    laGenerala.turnoJugador = 1;
  } else {
    laGenerala.turnoJugador = 2;
  }
  for (let i = 0; i < 5; i++) {
    laGenerala.dadosGuardados[i] = laGenerala.dadosImgs[i];
  }
}

function throwOneDado() {
  this.innerHTML = Math.floor((Math.random() * 6) + 1);
  this.removeEventListener("click", throwOneDado);
}

/*******GUARDAR DADO*******/
function saveDado() {
  if (laGenerala.turnosCounterxJug < 3) {
    let dadosContainer = document.getElementById("dados");
    if (document.getElementById("cubilete-torcido") != null) {
      changeCubilete("parado");
    }
    laGenerala.dadosGuardados.push(this);
    dadosContainer.removeChild(this);
    laGenerala.throwBtn.addEventListener("click", throwDados);
  }
}

/*******TIRAR DADOS*******/
function throwDados() {
  if (laGenerala.turnosCounterxJug < 3) {
    let dadosContainer = document.getElementById("dados");
    changeCubilete("torcido");
    for (let i = 0; i < laGenerala.dadosGuardados.length; i++) {
      let new_dado = document.createElement("img");
      let random = Math.floor((Math.random() * 6) + 1);
      new_dado.setAttribute("src", "assets/img/dado" + random + ".svg");
      new_dado.setAttribute("data-value", random);
      new_dado.addEventListener("click", saveDado);
      new_dado.classList.add("dado");
      dadosContainer.appendChild(new_dado);
    }
    let dadosTirados = document.querySelectorAll(".dado");
    dadosTirados.forEach((unDado, i) => laGenerala.dadosTirados[i] = parseInt(unDado.dataset.value));
    laGenerala.dadosTirados.sort(naturalSort);
    laGenerala.dadosGuardados = [];
    laGenerala.throwBtn.removeEventListener("click", throwDados);
    asignarValores();
    laGenerala.turnosCounterxJug++;
    laGenerala.turnosCounter++;
  }
}

/*******CAMBIAR CUBILETE*******/
function changeCubilete(pos) {
  if (pos == "parado") {
    let cubilete = document.getElementById("cubilete-torcido");
    cubilete.setAttribute("id", "cubilete-parado");
    cubilete.setAttribute("src", "assets/img/cubilete parado.png");
  }
  else if (pos == "torcido") {
    let cubilete = document.getElementById("cubilete-parado");
    cubilete.setAttribute("id", "cubilete-torcido");
    cubilete.setAttribute("src", "assets/img/cubilete torcido.png");
  }
}

/*******CHECKEAR LOS JUEGOS DE NUMEROS*******/
function checkSum(param) {
  let dadosParam = document.querySelectorAll(".dado[data-value='" + param + "']");
  let total = param * dadosParam.length
  return total;
}

/*******CHECKEAR LA ESCALERA*******/
function checkEscalera() {
  if (/12345|23456|34561/.test(dadosComoString())) {
    if (laGenerala.turnosCounterxJug == 0) {
      return 25;
    }
    else {
      return 20;
    }
  } else {
    return 0;
  }
}

function checkFull() {
  let expRegFull = /1{3}(22|33|44|55|66)|2{3}(33|44|55|66)|3{3}(44|55|66)|4{3}(55|66)|5{3}(66)|1{2}(222|333|444|555|666)|2{2}(333|444|555|666)|3{2}(444|555|666)|4{2}(555|666)|5{2}(666)/;
  if (expRegFull.test(dadosComoString())) {
    if (laGenerala.turnosCounterxJug == 0) {
      return 35;
    }
    else {
      return 30;
    }
  } else {
    return 0;
  }
}

function checkPoker() {
  if (/1{4}|2{4}|3{4}|4{4}|5{4}|6{4}/.test(dadosComoString())) {
    if (laGenerala.turnosCounterxJug == 0) {
      return 45;
    } else {
      return 40;
    }
  } else {
    return 0;
  }
}

function checkPoker() {
  if (/1{4}|2{4}|3{4}|4{4}|5{4}|6{4}/.test(dadosComoString())) {
    if (laGenerala.turnosCounterxJug == 0) {
      return 45;
    } else {
      return 40;
    }
  } else {
    return 0;
  }
}

function checkGenerala() {
  if (/1{5}|2{5}|3{5}|4{5}|5{5}|6{5}/.test(dadosComoString())) {
    laGenerala.generalasCounter++;
    checkDobleGenerala();
    if (laGenerala.turnosCounterxJug == 0) {
      return 55;
    } else {
      return 50;
    }
  } else {
    return 0;
  }
}

/*******CHECKEAR LA DOBLE GENERALA*******/
function checkDobleGenerala() {
  if (laGenerala.generalasCounter == 2) {
    return 100;
  } else {
    return 0;
  }
}

function dadosComoString() {
  return laGenerala.dadosTirados.join('');
}


/*******ESCRIBIR VALORES EN TABLERO*******/
function asignarValores() {
  let rowsValues = [checkSum(1), checkSum(2), checkSum(3), checkSum(4), checkSum(5), checkSum(6), checkEscalera(), checkFull(), checkPoker(), checkGenerala(), checkDobleGenerala()];
  let start = laGenerala.turnoJugador == 1 ? 5 : 6;
  let fin = laGenerala.turnoJugador == 1 ? 36 : 37;
  let j = 0;
  for (let i = start - 1; i < fin - 1; i += 3) {
    if (!laGenerala.tablero[i].classList.contains("gameselected")) {
      if (rowsValues[j] == 0) {
        laGenerala.tablero[i].innerHTML = "-";
      } else {
        laGenerala.tablero[i].innerHTML = rowsValues[j];
      }
      laGenerala.tablero[i].classList.add("valueselected");
      laGenerala.tablero[i].addEventListener("click", selectGame);
    }
    j++;
  }
}

function selectGame() {
  let start = laGenerala.turnoJugador == 1 ? 5 : 6;
  let fin = laGenerala.turnoJugador == 1 ? 36 : 40;
  let total = laGenerala.turnoJugador == 1 ? document.querySelector(".cell[data-total = jug1]") : document.querySelector(".cell[data-total = jug2]");
  let totalvalue = total.innerHTML;
  totalvalue = parseInt(total.innerHTML);
  this.classList.add("gameselected");
  for (let i = start - 1; i < fin - 1; i += 3) {
    if (laGenerala.tablero[i] != this && !laGenerala.tablero[i].classList.contains("gameselected")) {
      laGenerala.tablero[i].innerHTML = null;
    }
    if (laGenerala.tablero[i] == this && laGenerala.tablero[i].innerHTML != "-") {
      totalvalue += parseInt(laGenerala.tablero[i].innerHTML);
    }
    laGenerala.tablero[i].removeEventListener("click", selectGame);
    laGenerala.tablero[i].classList.remove("valueselected");
  }
  total.innerHTML = totalvalue;
  changeTurn();
  if (laGenerala.turnosCounter == 22) {
    checkWin();
  }
}

function changeTurn() {
  laGenerala.turnoJugador == 1 ? laGenerala.turnoJugador = 2 : laGenerala.turnoJugador = 1;
  laGenerala.turnosCounterxJug = 0;
  let dadosTirados = document.getElementById("dados");
  dadosTirados.innerHTML = null;
  for (let i = 0; i < 5; i++) {
    laGenerala.dadosGuardados[i] = laGenerala.dadosImgs[i];
  }
  changeCubilete("parado");
  laGenerala.throwBtn.addEventListener("click", throwDados);
}

function checkWin() {
  let total1 = parseInt(document.querySelector(".cell[data-total = jug1]").innerHTML);
  let total2 = parseInt(document.querySelector(".cell[data-total = jug2]").innerHTML);
  let msjDiv = document.getElementById("msjDiv");
  let msj = document.getElementById("msj");
  let startBtn = document.getElementById("startbtn");
  startBtn.innerHTML = "Play Again";
  if (total1 > total2) {
    msj.innerHTML = "Ganó Jugador 1!"
  } else if (total1 < total2) {
    msj.innerHTML = "Ganó Jugador 2!"
  } else {
    msj.innerHTML = "Empate!"
  }
  msjDiv.style.display = "flex";
}

//Funcion para ordenar de menor a mayor
function naturalSort(a, b) {
  return new Intl.Collator(undefined, { numeric: true, sensitivity: "base" }).compare(a, b);
}