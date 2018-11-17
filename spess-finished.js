//bird.js
var cnv = undefined
var ctx = undefined

//Part 1
function rect(x,y,w,h,s){
  this.x=x
  this.y=y
  this.w=w
  this.h=h
  this.s=s
}
p = new rect(50,50,64,64,20)
p.u=false
p.d=false

//Part 2
l=[]

//Part 3
m=[]

function init() {
  cnv = document.getElementById('game')
  ctx = cnv.getContext('2d')
  document.addEventListener('keydown',keyDown)
  document.addEventListener('keyup',keyUp)
  for(i=0;i<5;i++)
    m.push(new rect(rnd(640,740),rnd(0,440),
                    rnd(30,50),rnd(30,50),
                    rnd(10,20)))
  setInterval(gameLoop, 50)
}

function gameLoop() {
  if (p.u)
    p.y-=p.s
  else if (p.d)
    p.y+=p.s

  // cycle through meteors
  for(i=m.length-1;i>-1;i--) {
    m[i].x-=m[i].s
    if (m[i].x<-m[i].w) {
      m[i].x = rnd(640,700)
      m[i].y = rnd(0,440)
    }
  }

  // cull lasers
  for(i=l.length-1;i>-1;i--) {
    l[i].x+=l[i].s
    if (l[i].x>640)
      l.splice(i,1)
  }

  // DRAW
  draw()
}

function draw() {
  // draw bg
  ctx.fillStyle = 'Black'
  ctx.fillRect(0,0,cnv.width,cnv.height)

  // draw lasers
  ctx.fillStyle = 'LimeGreen'
  for(i=0;i<l.length;i++)
    ctx.fillRect(l[i].x,l[i].y,l[i].w,l[i].h)

  // draw plr
  ctx.fillStyle = 'White'
  ctx.fillRect(p.x,p.y,p.w,p.h)

  // draw rocks
  ctx.fillStyle = 'Grey'
  for(i=0;i<m.length;i++)
    ctx.fillRect(m[i].x,m[i].y,m[i].w,m[i].h)

  // draw score
}

function keyDown(e){
  switch(e.key){
    case 'ArrowUp':
      p.u=true
      break
    case 'ArrowDown':
      p.d=true
      break
    case ' ':
      console.log(l.length)
      l.push(new rect(p.x+p.w/2-10,p.y+p.h/2-10,20,20,20))
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
  }
}

//Handy-dandy helpers
var hit = (b1, b2) => (b1.x < b2.x + b2.w) && (b2.x < b1.x + b1.w) && (b1.y < b2.y + b2.h) && (b2.y < b1.y + b1.h)
var rnd = (min, max) => (Math.random() * (max - min) + min)
