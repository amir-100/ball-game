"use strict";

const onBallClick = (elBall, maxDiameter) => {
  const step = getRandomInt(20, 60);
  const max = maxDiameter;
  const min = 100;
  const size = parseInt(
    getComputedStyle(elBall).getPropertyValue("--size") || min
  );
  const nextSize = size + step;
  const newSize = nextSize > max ? min : nextSize;

  elBall.style.setProperty("--size", `${newSize}px`);
  elBall.textContent = newSize;
  elBall.style.backgroundColor = getRandomColor();
};

const onThirdBallClick = () => {
  const elBall1 = document.querySelector(".ball1");
  const elBall2 = document.querySelector(".ball2");

  const style1 = getComputedStyle(elBall1);
  const style2 = getComputedStyle(elBall2);

  const { backgroundColor: color1 } = style1;
  const { backgroundColor: color2 } = style2;

  const size1 = parseInt(style1.getPropertyValue("--size"));
  const size2 = parseInt(style2.getPropertyValue("--size"));

  elBall1.style.setProperty("--size", `${size2}px`);
  elBall2.style.setProperty("--size", `${size1}px`);

  elBall1.textContent = size2;
  elBall2.textContent = size1;

  elBall1.style.backgroundColor = color2;
  elBall2.style.backgroundColor = color1;
};
