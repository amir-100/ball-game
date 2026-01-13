"use strict";

const MIN_SIZE = 100;

const gState = {};

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

const onBallClick = (elBall, maxDiameter) => {
  const step = getRandomInt(20, 60);
  const size = getBallSize(elBall);
  const nextSize = size + step;
  const newSize = nextSize > maxDiameter ? MIN_SIZE : nextSize;

  setBallSize(elBall, newSize);
  setBallColor(elBall, getRandomColor());
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
  document.body.style.backgroundColor = getRandomColor();
};

const onSixthBallClick = () => {
  gState.balls.forEach(({ el, color, size }) => {
    setBallColor(el, color);
    setBallSize(el, size);
  });

  document.body.style.backgroundColor = gState.pageColor;
};
