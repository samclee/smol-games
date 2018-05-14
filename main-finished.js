//main.js
let canv = null;
let ctx = null;

let player = {x: 100, y: 50, w: 50, h: 50, vy: 0};
let gravity = 2;

function block(x, y, w, h, vx) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.vx = vx;
}

let bottomBlock = new block(0, 0, 80, 480, -5);
let topBlock = new block(0, 0, 80, 480, -5);
let gap = 150;

function resetBlocks() {
  let range = canv.height - gap;
  bottomBlock.y = (Math.random() * range) + gap; 
  topBlock.y = bottomBlock.y - gap - topBlock.h;
  bottomBlock.x = canv.width;
  topBlock.x = canv.width;
}

let score = 0;

function init() {
  canv = document.getElementById('game');
  ctx = canv.getContext('2d');
  document.addEventListener('keydown', ()=>{player.vy = -15});
  ctx.font = '40px Courier';

  resetBlocks();
  setInterval(gameLoop, 50);
}

function gameLoop() {
  //move player
  player.vy += gravity;
  player.y += player.vy;
  player.y = Math.max(player.y, 0);

  //move blocks
  bottomBlock.x += bottomBlock.vx;
  topBlock.x += topBlock.vx;
  if(bottomBlock.x < -bottomBlock.w) {
    resetBlocks();
    score += 10;
  }

  //check for game over
  if(player.y > canv.height || collision(player, bottomBlock) || collision(player, topBlock)) {
    player.y = 50;
    player.vy = 0;
    resetBlocks();
    score = 0;
  }

  //draw game
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canv.width, canv.height);

  //draw bg
  ctx.fillStyle = 'SkyBlue';
  ctx.fillRect(0, 0, canv.width, canv.height);

  //draw player
  ctx.fillStyle = 'Yellow';
  ctx.fillRect(player.x, player.y, player.w, player.h);

  //draw blocks
  ctx.fillStyle = 'Green';
  ctx.fillRect(bottomBlock.x, bottomBlock.y, bottomBlock.w, bottomBlock.h);
  ctx.fillRect(topBlock.x, topBlock.y, topBlock.w, topBlock.h);

  //draw score
  ctx.fillStyle = 'Black';
  ctx.fillText('Score: ' + score, 30, 50);
}

//Handy-dandy helper
function collision(b1, b2) {
  return ((b1.x < b2.x + b2.w) && (b2.x < b1.x + b1.w) && (b1.y < b2.y + b2.h) && (b2.y < b1.y + b1.h));
}