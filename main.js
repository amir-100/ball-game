"use strict";

const onBallClick = (elBall) => {
  const step = getRandomInt(20, 60);
  const max = 400;
  const min = 100;
  const size = parseFloat(elBall.style.getPropertyValue("--size") || min);
  const nextSize = size + step;
  const newSize = nextSize > max ? min : nextSize;

  elBall.style.setProperty("--size", `${newSize}px`);
  elBall.textContent = newSize;
};
