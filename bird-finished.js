//mbird-finished.js
var cnv = undefined
var ctx = undefined

//Part 1
var p = {x:100, y:50, w:50, h:50, vy:0}

//Part 2
var btmP = {x:0, y:0, w:80, h:480, vx:-8}
var topP = {x:0, y:0, w:80, h:480, vx:-8}
var gap = 150

function resetPipes() {
  btmP.y = rnd(gap, cnv.height) 
  topP.y = btmP.y - gap - topP.h

  btmP.x = cnv.width
  topP.x = cnv.width
}

//Part 3
var score = 0

function init() {
  cnv = document.getElementById('game')
  ctx = cnv.getContext('2d')
  document.addEventListener('keydown', ()=>{p.vy = -15})
  resetPipes()
  ctx.font = '40px Courier'
  
  setInterval(gameLoop, 50)
}

function gameLoop() {
  // MOVE p
  p.vy += 2
  p.y += p.vy
  p.y = Math.max(p.y, 0)

  // MOVE PIPES
  btmP.x += btmP.vx
  topP.x += topP.vx
  if (btmP.x < -btmP.w) {
    resetPipes()
    score += 10
  }

  // GAME OVER
  if (p.y > cnv.height || hit(p, btmP) || hit(p, topP)) {
    p.y = 50
    p.vy = 0
    resetPipes()
    score = 0
  }

  // DRAW
  draw()
}

function draw() {
  // draw bg
  ctx.fillStyle = 'SkyBlue'
  ctx.fillRect(0, 0, cnv.width, cnv.height)

  // draw p
  ctx.fillStyle = 'Yellow'
  ctx.fillRect(p.x, p.y, p.w, p.h)

  // draw pipes
  ctx.fillStyle = 'Green'
  ctx.fillRect(btmP.x, btmP.y, btmP.w, btmP.h)
  ctx.fillRect(topP.x, topP.y, topP.w, topP.h)

  // draw score
  ctx.fillStyle = 'Black'
  ctx.fillText('Score: ' + score, 30, 50)
}

//Handy-dandy helpers
var hit = (b1, b2) => (b1.x < b2.x + b2.w) && (b2.x < b1.x + b1.w) && (b1.y < b2.y + b2.h) && (b2.y < b1.y + b1.h)
var rnd = (min, max) => (Math.rnd() * (max - min) + min)
