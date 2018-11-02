//bird.js
var cnv = undefined
var ctx = undefined

//Part 1

//Part 2

//Part 3

function init() {
  cnv = document.getElementById('game')
  ctx = cnv.getContext('2d')
  
  setInterval(gameLoop, 50)
}

function gameLoop() {
  // MOVE PLR

  // PASS PIPES

  // GAME OVER

  // DRAW
  draw()
}

function draw() {
  // draw bg

  // draw plr

  // draw pipes

  // draw score
}

//Handy-dandy helpers
var hit = (b1, b2) => (b1.x < b2.x + b2.w) && (b2.x < b1.x + b1.w) && (b1.y < b2.y + b2.h) && (b2.y < b1.y + b1.h)
var rnd = (min, max) => (Math.random() * (max - min) + min)
