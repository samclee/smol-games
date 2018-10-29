//jump-finished.js
var cnv = undefined
var ctx = undefined

// platforms

// player

function init(){
  cnv=document.getElementById('game')
  ctx=cnv.getContext('2d')

  setInterval(gameLoop, 50)
}

function gameLoop(){

  draw()
}

function draw(){
  // draw bg

  // draw plr

  // draw plats
}