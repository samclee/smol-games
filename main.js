//main.js
let cnv = undefined;
let ctx = undefined;

//Part 1

//Part 2

//Part 3

function init() {
  cnv = document.getElementById('game');
  ctx = cnv.getContext('2d');
  
  setInterval(gameLoop, 50);
}

function gameLoop() {
  //move player

  //move/reset pipes

  //check for game over

  //draw game
  draw();
}

function draw() {
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  //draw bg

  //draw player

  //draw pipes

  //draw score

}

//Handy-dandy helper
let coll = (b1, b2) => (b1.x < b2.x + b2.w) && (b2.x < b1.x + b1.w) && (b1.y < b2.y + b2.h) && (b2.y < b1.y + b1.h);