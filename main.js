"use strict";

const MIN_SIZE = 100;

const gState = {};

let gTimeoutId = null;
let gIntervalId = null;

const onInit = () => {
  gState.balls = Array.from(document.querySelectorAll(".ball")).map(
    (elBall) => ({
      el: elBall,
      color: getBallColor(elBall),
      size: getBallSize(elBall),
    })
  );

  gState.pageColor = getComputedStyle(document.body).backgroundColor;
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
};

const onFourthBallClick = () => {
  const step = getRandomInt(20, 60);
  const elBall1 = document.querySelector(".ball1");
  const elBall2 = document.querySelector(".ball2");

  decreaseBallSize(elBall1, step);
  decreaseBallSize(elBall2, step);
};

const onFifthBallClick = () => {
  setPageColor(getRandomColor());
};

const onSixthBallClick = () => {
  gState.balls.forEach(({ el, color, size }) => {
    setBallColor(el, color);
    setBallSize(el, size);
  });

  setPageColor(gState.pageColor);
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
