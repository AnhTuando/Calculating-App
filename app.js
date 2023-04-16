let plus = document.querySelector(".sum");
let minus = document.querySelector(".minus");
let mul = document.querySelector(".mul");
let divide = document.querySelector(".divide");
let calcBoard = document.querySelector(".wrap-box-2");
let title = document.querySelector(".title");
let choose = document.querySelector(".wrap-box-1");
let question = document.querySelector(".question");
let ready = document.querySelector(".ready");
let time = document.querySelector(".count-time");
let outOFTime = document.querySelector(".time-over");
let outOfTime_nextQuestionBtn = document.querySelector(".next-btn");
let input = document.querySelector(".result");
let paramA = document.querySelector(".param-a");
let paramB = document.querySelector(".param-b");
let correct = document.querySelector(".correct");
let wrong = document.querySelector(".wrong");
let nextCr = document.querySelector(".next-cr");
let wrongCr = document.querySelector(".next-wr");
let score = document.querySelector(".count-score");
let level = document.querySelector(".count-level");
let notice = document.querySelector(".score-notice");
let userScore = document.querySelector(".user-score");
let backToMenu = document.querySelector(".clear");

// count time
function countTimeInterval() {
  let countTime = 15;
  time.innerHTML = `${countTime}`;
  let interval = setInterval(function () {
    countTime--;
    time.innerHTML = `${countTime}`;
    if (countTime == 0) {
      clearInterval(interval);
      countTime = 0;
      time.innerHTML = `${countTime}`;
      outOFTime.classList.remove("none");
    }
  }, 1000);
  if (parseInt(level.innerText) == 10) {
    clearInterval(interval);
  }
  input.addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
      clearInterval(interval);
    }
  });
}
// render attention
function attention() {
  plus.onclick = function () {
    choose.classList.add("none");
    title.classList.add("none");
    question.classList.remove("none");
    calcBoard.classList.remove("none");
  };
  ready.onclick = function () {
    question.classList.add("none");
    countTimeInterval();
  };
}

// render random params
function randomParams() {
  let a = Math.floor(Math.random() * 10);
  let b = Math.floor(Math.random() * 10);
  return [a, b];
}
// render Questions
function renderQuestions() {
  let params = randomParams();
  paramA.innerHTML = `${params[0]}`;
  paramB.innerHTML = `${params[1]}`;
}
// calculate random params
function calculateParams() {
  let a = parseInt(paramA.innerText);
  let b = parseInt(paramB.innerText);
  let sum = a + b;
  return sum;
}
// check result
function checkResult() {
  // onkeydown Enter
  input.addEventListener("keydown", function (e) {
    let result = calculateParams();
    userInput = parseInt(input.value);

    if (e.keyCode === 13) {
      // Correct
      if (userInput == result) {
        correct.classList.remove("none");
      } else {
        // Incorrect
        wrong.classList.remove("none");
      }
    }
  });
}

// correct And Wrong btn
let levelCount = 1;
let scoreCount = 0;
function correctAndWrongbtn() {
  let currentLevel = 1;

  // correct next btn
  nextCr.onclick = function () {
    countTimeInterval();
    scoreCount++;
    levelCount++;
    level.innerHTML = `${levelCount}`;
    score.innerHTML = `${scoreCount}`;
    input.value = "";
    currentLevel = levelCount;
    correct.classList.add("none");
    if (levelCount > 10) {
      notice.classList.remove("none");
      userScore.innerHTML = `${scoreCount}`;
      level.innerHTML = `${levelCount - 1}`;

      // back to menu
      backToMenu.onclick = function () {
        calcBoard.classList.add("none");
        title.classList.remove("none");
        choose.classList.remove("none");
        notice.classList.add("none");
        levelCount = 1;
        level.innerHTML = `${levelCount}`;
        scoreCount = 0;
        score.innerHTML = `${scoreCount}`;
      };
    }
    renderQuestions();
  };
  // wrong next btn
  wrongCr.onclick = function () {
    countTimeInterval();
    levelCount++;
    level.innerHTML = `${levelCount}`;

    input.value = "";
    wrong.classList.add("none");
    currentLevel = levelCount;
    if (levelCount > 10) {
      notice.classList.remove("none");
      userScore.innerHTML = `${scoreCount}`;
      level.innerHTML = `${levelCount - 1}`;
      // back to menu
      backToMenu.onclick = function () {
        notice.classList.add("none");
        calcBoard.classList.add("none");
        title.classList.remove("none");
        choose.classList.remove("none");
        levelCount = 1;
        level.innerHTML = `${levelCount}`;
        scoreCount = 0;
        score.innerHTML = `${scoreCount}`;
      };
    }
    renderQuestions();
  };
  outOfTime_nextQuestionBtn.onclick = function () {
    countTimeInterval();
    outOFTime.classList.add("none");
    levelCount++;
    level.innerHTML = `${levelCount}`;
    renderQuestions();
  };
}
correctAndWrongbtn();

function main() {
  attention();

  renderQuestions();
  checkResult();

  correctAndWrongbtn();
}
main();
