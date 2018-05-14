//main.js
let canv = null;
let ctx = null;

let player = {x: 100, y: 50, w: 50, h: 50, vy: 0};
let gravity = 2;

function pipe(x, y, w, h, vx) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.vx = vx;
}

let bottomPipe = new pipe(0, 0, 80, 480, -5);
let topPipe = new pipe(0, 0, 80, 480, -5);
let gap = 150;

function resetPipes() {
  let range = canv.height - gap;
  bottomPipe.y = (Math.random() * range) + gap; 
  topPipe.y = bottomPipe.y - gap - topPipe.h;
  bottomPipe.x = canv.width;
  topPipe.x = canv.width;
}

let score = 0;

function init() {
  canv = document.getElementById('game');
  ctx = canv.getContext('2d');
  document.addEventListener('keydown', ()=>{player.vy = -15});
  ctx.font = '40px Courier';

  resetPipes();
  setInterval(gameLoop, 50);
}

function gameLoop() {
  //move player
  player.vy += gravity;
  player.y += player.vy;
  player.y = Math.max(player.y, 0);

  //move pipes
  bottomPipe.x += bottomPipe.vx;
  topPipe.x += topPipe.vx;
  if(bottomPipe.x < -bottomPipe.w) {
    resetPipes();
    score += 10;
  }

  //check for game over
  if(player.y > canv.height || collision(player, bottomPipe) || collision(player, topPipe)) {
    player.y = 50;
    player.vy = 0;
    resetPipes();
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

  //draw pipes
  ctx.fillStyle = 'Green';
  ctx.fillRect(bottomPipe.x, bottomPipe.y, bottomPipe.w, bottomPipe.h);
  ctx.fillRect(topPipe.x, topPipe.y, topPipe.w, topPipe.h);

  //draw score
  ctx.fillStyle = 'Black';
  ctx.fillText('Score: ' + score, 30, 50);
}

//Handy-dandy helper
function collision(b1, b2) {
  return ((b1.x < b2.x + b2.w) && (b2.x < b1.x + b1.w) && (b1.y < b2.y + b2.h) && (b2.y < b1.y + b1.h));
}