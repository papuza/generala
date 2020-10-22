

let startBtn = document.getElementById("startbtn");
let playBtn = document.getElementById("playbtn");
startBtn.addEventListener("click", showElection);
playBtn.addEventListener("click", startGame);

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

function throwOneDado() {
  this.innerHTML = Math.floor((Math.random() * 6) + 1);
  this.removeEventListener("click", throwOneDado);
}