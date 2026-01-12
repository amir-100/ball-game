"use strict";

const onBallClick = (elBall) => {
  const size = parseFloat(elBall.style.getPropertyValue("--size") || 100);
  const newSize = size + 50;

  elBall.style.setProperty("--size", `${newSize}px`);
  elBall.textContent = newSize;
};
