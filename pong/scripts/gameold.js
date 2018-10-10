var canvas;
var context;
var ballX = 10;
var ballSpeedX = 5;

window.onload = function() {
  canvas = document.querySelector('#asteroids'); 
  context = this.canvas.getContext('2d');

  var fps = 30;
  this.setInterval(function() {
    moveAll();
    renderAll();
  }, 1000/fps);
}

function moveAll() {
  ballX = ballX + ballSpeedX;
  if (ballX >= canvas.width) {
    ballSpeedX =  -5;
  }
}

function renderAll(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'black';
  context.fillRect(0,0,canvas.width, canvas.heigth);
  context.fillStyle = 'white';
  context.fillRect(0,210, 10, 100);
  context.fillStyle = 'white';
  context.fillRect(ballX,100, 10, 10);
}