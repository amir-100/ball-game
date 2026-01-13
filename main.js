"use strict";

const MIN_SIZE = 100;

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

  const size1 = getBallSize(elBall1);
  const size2 = getBallSize(elBall2);

  const nextSize1 = size1 - step;
  const nextSize2 = size2 - step;
  const newSize1 = nextSize1 < MIN_SIZE ? MIN_SIZE : nextSize1;
  const newSize2 = nextSize2 < MIN_SIZE ? MIN_SIZE : nextSize2;

  setBallSize(elBall1, newSize1);
  setBallSize(elBall2, newSize2);
};
