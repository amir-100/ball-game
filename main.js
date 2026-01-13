"use strict";

const onBallClick = (elBall, maxDiameter) => {
  const step = getRandomInt(20, 60);
  const max = maxDiameter;
  const min = 100;
  const size = parseFloat(
    getComputedStyle(elBall).getPropertyValue("--size") || min
  );
  const nextSize = size + step;
  const newSize = nextSize > max ? min : nextSize;

  elBall.style.setProperty("--size", `${newSize}px`);
  elBall.textContent = newSize;
  elBall.style.backgroundColor = getRandomColor();
};
