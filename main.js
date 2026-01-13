"use strict";

const MIN_SIZE = 100;

const gState = {};
const gHistory = [];
let gHistoryIdx = -1;
let gMoveCount = 0;

let gTimeoutId = null;
let gIntervalId = null;

let gTimerId = null;
let gStartTime = null;

const onInit = () => {
  gState.balls = Array.from(document.querySelectorAll(".ball")).map(
    (elBall) => ({
      el: elBall,
      color: getBallColor(elBall),
      size: getBallSize(elBall),
    })
  );

  gState.pageColor = getComputedStyle(document.body).backgroundColor;

  saveState(true);
  updateTitleWithTime(0);
};

const saveState = (isInitial = false) => {
  gHistory.splice(gHistoryIdx + 1);

  const snapshot = {
    pageColor: getComputedStyle(document.body).backgroundColor,
    balls: gState.balls.map(({ el }) => ({
      size: getBallSize(el),
      color: getBallColor(el),
    })),
  };

  gHistory.push(snapshot);
  gHistoryIdx++;

  if (!isInitial) {
    if (gMoveCount === 0) {
      startTimer();
    }

    gMoveCount++;
  }

  updateUndoRedoButtons();
};

const updateTitleWithTime = (seconds) => {
  document.title = `The Ball Game (${gMoveCount} moves | ${seconds}s)`;
};

const startTimer = () => {
  if (gTimerId) return;

  gStartTime = Date.now();

  gTimerId = setInterval(() => {
    const elapsedMs = Date.now() - gStartTime;
    const seconds = Math.floor(elapsedMs / 1000);

    updateTitleWithTime(seconds);
  }, 1000);
};

const applyState = (state) => {
  setPageColor(state.pageColor);

  gState.balls.forEach(({ el }, idx) => {
    setBallSize(el, state.balls[idx].size);
    setBallColor(el, state.balls[idx].color);
  });
};

const updateUndoRedoButtons = () => {
  document.querySelector(".undo").disabled = gHistoryIdx <= 0;
  document.querySelector(".redo").disabled = gHistoryIdx >= gHistory.length - 1;
};

const onUndo = () => {
  if (gHistoryIdx <= 0) return;

  gHistoryIdx--;
  applyState(gHistory[gHistoryIdx]);
  updateUndoRedoButtons();
};

const onRedo = () => {
  if (gHistoryIdx >= gHistory.length - 1) return;

  gHistoryIdx++;
  applyState(gHistory[gHistoryIdx]);
  updateUndoRedoButtons();
};

const getBallSize = (elBall, minSize = MIN_SIZE) => {
  const size = parseInt(getComputedStyle(elBall).getPropertyValue("--size"));

  return Number.isNaN(size) ? minSize : size;
};

const setBallSize = (elBall, size) => {
  elBall.style.setProperty("--size", `${size}px`);
  elBall.textContent = size;
};

const getBallColor = (elBall) => getComputedStyle(elBall).backgroundColor;

const setBallColor = (elBall, color) => {
  elBall.style.backgroundColor = color;
};

const decreaseBallSize = (elBall, step) => {
  const size = getBallSize(elBall);
  const newSize = Math.max(size - step, MIN_SIZE);

  setBallSize(elBall, newSize);
};

const setPageColor = (color) => {
  document.body.style.backgroundColor = color;
};

const onBallClick = (elBall, maxDiameter) => {
  const step = getRandomInt(20, 60);
  const size = getBallSize(elBall);
  const nextSize = size + step;
  const newSize = nextSize > maxDiameter ? MIN_SIZE : nextSize;

  setBallSize(elBall, newSize);
  setBallColor(elBall, getRandomColor());

  saveState();
};

const onFirstBallClick = (elBall = document.querySelector(".ball1")) => {
  onBallClick(elBall, 450);
};

const onSecondBallClick = (elBall = document.querySelector(".ball2")) => {
  onBallClick(elBall, 500);
};

const onThirdBallClick = () => {
  const elBall1 = document.querySelector(".ball1");
  const elBall2 = document.querySelector(".ball2");

  const color1 = getBallColor(elBall1);
  const color2 = getBallColor(elBall2);

  const size1 = getBallSize(elBall1);
  const size2 = getBallSize(elBall2);

  setBallSize(elBall1, size2);
  setBallSize(elBall2, size1);

  setBallColor(elBall1, color2);
  setBallColor(elBall2, color1);

  saveState();
};

const onFourthBallClick = () => {
  const step = getRandomInt(20, 60);
  const elBall1 = document.querySelector(".ball1");
  const elBall2 = document.querySelector(".ball2");

  decreaseBallSize(elBall1, step);
  decreaseBallSize(elBall2, step);

  saveState();
};

const onFifthBallClick = () => {
  setPageColor(getRandomColor());

  saveState();
};

const onSixthBallClick = () => {
  gState.balls.forEach(({ el, color, size }) => {
    setBallColor(el, color);
    setBallSize(el, size);
  });

  setPageColor(gState.pageColor);
  saveState();
};

const onSixthBallEnter = () => {
  if (gIntervalId) return;

  let cycle = 0;

  gTimeoutId = setTimeout(() => {
    gIntervalId = setInterval(() => {
      onFirstBallClick();
      onSecondBallClick();
      onThirdBallClick();
      onFourthBallClick();

      cycle++;

      if (cycle >= 10) {
        onSixthBallLeave();
      }
    }, 2000);
  }, 2000);
};

const onSixthBallLeave = () => {
  clearTimeout(gTimeoutId);
  clearInterval(gIntervalId);

  gTimeoutId = null;
  gIntervalId = null;
};
