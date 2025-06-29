let gameSeq = [];
let userSeq = [];
const btns = ["yellow" , "red" , "purple" , "green"];
let h2 = document.querySelector("h2");

let started = false;
let level = 0;
let highScore = localStorage.getItem("highScore") || 0; //jab game start hoga toh agar local storage mai pahale se koi highscore pada hai toh usko highScore mai save karlo, otherwise 0.

function startGame() {
  if(started === false) {
    console.log("Game started");
    started = true;
    levelUp();
  }
}

document.addEventListener("keypress", startGame);
document.querySelector("#start-btn").addEventListener("click", startGame);

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function() {
    btn.classList.remove("flash");
  },250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function() {
    btn.classList.remove("userflash");
  },250);
}
function levelUp() {

  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  //random btn choose
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randbtn = document.querySelector(`.${randColor}`);
  // console.log(randIdx);
  // console.log(randColor);
  // console.log(randbtn);
  gameSeq.push(randColor);
  gameFlash(randbtn);
}

function checkAns(idx) {
  if(userSeq[idx] === gameSeq[idx]) {
    if(userSeq.length === gameSeq.length) {
      setTimeout(levelUp,1000);
    }
  }
  else{
    if(level > highScore) {
      highScore = level;
      localStorage.setItem("highScore", highScore);
    }
    h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br>High Score: <b>${highScore}</b> <br>Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function() {
      document.querySelector("body").style.backgroundColor = "white";
    },150);
    reset();
  }
}

function btnPress() {
  let btn = this; // which button is pressed
  userFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length-1);

}

let allbtns = document.querySelectorAll(".btn");

for(let btn of allbtns) {
  btn.addEventListener("click" , btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
