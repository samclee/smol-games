//bird.js
var cnv
var ctx

//Part 1
function circ(x,y,r,c,s){
  this.x=x
  this.y=y
  this.r=r
  this.c=c
  this.s=s
}
p = new circ(100,100,30,'Red',10)
p.u=false
p.d=false
p.l=false
p.r=false

function init() {
  cnv = document.getElementById('game')
  ctx = cnv.getContext('2d')
  document.addEventListener('keydown',keyDown)
  document.addEventListener('keyup',keyUp)

  setInterval(gameLoop, 50)
}

function gameLoop() {
  if (p.u)
    p.y-=p.s
  else if (p.d)
    p.y+=p.s
  
  if (p.l)
    p.x-=p.s
  else if (p.r)
    p.x+=p.s

  // DRAW
  draw()
}

function draw() {
  // draw bg
  //ctx.fillStyle = 'Black'
  //ctx.fillRect(0,0,cnv.width,cnv.height)
  
  // draw plr
  ctx.fillStyle = p.c
  ctx.fillRect(p.x,p.y,p.w,p.h)

}

function keyDown(e){
  switch(e.key){
    case 'ArrowUp':
      p.u=true
      break
    case 'ArrowDown':
      p.d=true
      break
    case 'ArrowLeft':
      p.l=true
      break
    case 'ArrowRight':
      p.r=true
      break
  }
}

function keyUp(e){
  switch(e.key){
    case 'ArrowUp':
      p.u=false
      break
    case 'ArrowDown':
      p.d=false
      break
    case 'ArrowLeft':
      p.l=false
      break
    case 'ArrowRight':
      p.r=false
      break
  }
}

//Handy-dandy helpers
var hit = (b1, b2) => (b1.x < b2.x + b2.w) && (b2.x < b1.x + b1.w) && (b1.y < b2.y + b2.h) && (b2.y < b1.y + b1.h)
var rnd = (min, max) => (Math.random() * (max - min) + min)
