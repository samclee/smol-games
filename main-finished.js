//main.js
let cnv = undefined;
let ctx = undefined;

//Part 1
let player = {x: 100, y: 50, w: 50, h: 50, vy: 0};
let gravity = 2;

//Part 2
let bottomPipe = {x: 0, y: 0, w: 80, h: 480, vx: -5};
let topPipe = {x: 0, y: 0, w: 80, h: 480, vx: -5};
let gap = 150;

function resetPipes() {
  bottomPipe.y = random(gap, cnv.height); 
  topPipe.y = bottomPipe.y - gap - topPipe.h;
  bottomPipe.x = cnv.width;
  topPipe.x = cnv.width;
}

//Part 3
let score = 0;

function init() {
  cnv = document.getElementById('game');
  ctx = cnv.getContext('2d');
  document.addEventListener('keydown', ()=>{player.vy = -15});
  resetPipes();
  ctx.font = '40px Courier';
  
  setInterval(gameLoop, 50);
}

function gameLoop() {
  //accelerate player, move player, make ceiling
  player.vy += gravity;
  player.y += player.vy;
  player.y = Math.max(player.y, 0);

  //move both pipes, reset if offscreen
  bottomPipe.x += bottomPipe.vx;
  topPipe.x += topPipe.vx;
  if(bottomPipe.x < -bottomPipe.w) {
    resetPipes();
    score += 10;
  }

  //check for game over
  if(player.y > cnv.height || overlap(player, bottomPipe) || overlap(player, topPipe)) {
    player.y = 50;
    player.vy = 0;
    resetPipes();
    score = 0;
  }

  //draw game
  draw();
}

function draw() {
  //draw bg
  ctx.fillStyle = 'SkyBlue';
  ctx.fillRect(0, 0, cnv.width, cnv.height);

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

//Handy-dandy helpers
let overlap = (b1, b2) => (b1.x < b2.x + b2.w) && (b2.x < b1.x + b1.w) && (b1.y < b2.y + b2.h) && (b2.y < b1.y + b1.h);
let random = (min, max) => (Math.random() * (max - min) + min);
