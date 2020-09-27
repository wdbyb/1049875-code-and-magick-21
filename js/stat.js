'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const FONT_GAP = 16;
const BAR_HEIGHT = 150;
const BAR_WIDTH = 40;
const BAR_GAP = 50;
const STAT_START_Y = CLOUD_Y + GAP + FONT_GAP + FONT_GAP + FONT_GAP;

const renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

const getMaxElements = function (arr) {
  let maxElement = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `#fff`);

  ctx.fillStyle = `#000`;
  ctx.font = `16px PT Mono`;
  ctx.textBaseline = `hanging`;
  ctx.fillText(`Ура вы победили!`, CLOUD_X + GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText(`Список результатов:`, CLOUD_X + GAP, CLOUD_Y + FONT_GAP + FONT_GAP);

  const maxTime = getMaxElements(times);

  for (let i = 0; i < players.length; i++) {
    ctx.fillText(
        Math.ceil(times[i]),
        CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * i,
        STAT_START_Y + BAR_HEIGHT - (BAR_HEIGHT * times[i] / maxTime)
    );
    if (players[i] === `Вы`) {
      ctx.fillStyle = `rgba(255, 0, 0, 1)`;
    } else {
      let random = getRandomNumber(1, 100);
      ctx.fillStyle = `hsl(240, ` + random + `%, 50%)`;
    }
    ctx.fillRect(
        CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * i,
        STAT_START_Y + FONT_GAP + GAP + BAR_HEIGHT - (BAR_HEIGHT * times[i] / maxTime),
        BAR_WIDTH,
        BAR_HEIGHT * times[i] / maxTime
    );
    ctx.fillStyle = `#000`;
    ctx.fillText(
        players[i],
        CLOUD_X + GAP + (BAR_WIDTH + BAR_GAP) * i,
        STAT_START_Y + FONT_GAP + GAP + BAR_HEIGHT + GAP
    );
  }
};
