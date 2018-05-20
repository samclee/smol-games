//main.js
let canv = null;
let ctx = null;

function init() {
  canv = document.getElementById('game');
  ctx = canv.getContext('2d');
  
  setInterval(gameLoop, 50);
}

function gameLoop() {
  //move player

  //move pipes

  //check for game over

  //draw game
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canv.width, canv.height);

  //draw bg

  //draw player

  //draw pipes

  //draw score
  
}

//Handy-dandy helper
collision = (b1, b2) => ((b1.x < b2.x + b2.w) && (b2.x < b1.x + b1.w) && (b1.y < b2.y + b2.h) && (b2.y < b1.y + b1.h));
