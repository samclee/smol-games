//jump-finished.js
var cnv = undefined
var ctx = undefined

// platforms
pls=[]
pls.push({x:0,y:470,w:640,h:20})
for(i=0;i<40;i++){
  pls.push({
    x:Math.random()*640,
    y:Math.random()*480,
    w:Math.random()*100+30,
    h:Math.random()*30+20
  });
}

// player
p={x:20,y:20,w:10,h:20,
    vx:0,vy:0,l:false,r:false,g:false}

function init(){
  cnv=document.getElementById('game')
  ctx=cnv.getContext('2d')
  document.addEventListener("keydown",keyDown);
  document.addEventListener("keyup",keyUp);  
  setInterval(gameLoop, 50)
}

function gameLoop(){
  if (p.l) p.vx=-4
  if (p.r) p.vx=4
  p.x+=p.vx
  p.y+=p.vy
  if (p.g) p.vx*=0.7
  else p.vy+=2

  p.g=false;
  for(i=0;i<pls.length;i++){
    if(p.x>pls[i].x && p.x<pls[i].x+pls[i].w &&
        p.y>pls[i].y && p.y<pls[i].y+pls[i].h) 
    {
      p.y=pls[i].y
      p.g=true
      p.vy=1
    }
  }

  draw()
}

function draw(){
  // draw bg
  ctx.fillStyle='SkyBlue'
  ctx.fillRect(0,0,640,480)

  // draw plr
  ctx.fillStyle='Yellow'
  ctx.fillRect(p.x-p.w/2,p.y-p.h,
                p.w,p.h)

  // draw plats
  ctx.fillStyle='Green'
  for(i=0;i<pls.length;i++) {
    ctx.fillRect(pls[i].x,pls[i].y,
                  pls[i].w,pls[i].h)
  }
}

function keyDown(e){
  switch(e.key){
    case 'ArrowLeft':
      p.l=true
      break
    case 'ArrowRight':
      p.r=true
      break
    case 'ArrowUp':
      if(p.g) p.vy=-14
      break;
  }
}
function keyUp(e){
  switch(e.key){
    case 'ArrowLeft':
      p.l=false
      break
    case 'ArrowRight':
      p.r=false
      break
    case 'ArrowUp':
      if(p.vy<-3) p.vy=-3
      break
  }
}