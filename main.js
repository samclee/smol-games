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
  //accelerate player, move player, make ceiling

  //move both pipes, reset if offscreen

  //check for game over

  //draw game
  draw();
}

function draw() {
  //draw bg

  //draw player

  //draw pipes

  //draw score

}

//Handy-dandy helpers
let overlap = (b1, b2) => (b1.x < b2.x + b2.w) && (b2.x < b1.x + b1.w) && (b1.y < b2.y + b2.h) && (b2.y < b1.y + b1.h);
let random = (min, max) => (Math.random() * (max - min) + min);
