class Game {
  constructor(){
    this.canvas = document.querySelector('#asteroids'); 
    this.context = this.canvas.getContext('2d'); 
    this.initGame();
  }

  initGame() {
    this.context.strokeStyle = 'dimgrey';
    this.context.lineWidth = 5;
    this.context.rect(75,75,250,250);
    this.context.fillStyle = 'lightgrey';
    this.context.stroke();
    this.context.fill();
    this.renderText({
      text: 'Hola soy un texto',
      x: 150,
      y: 370
    });
    this.renderFigure();
  }

  renderText(textObj) {
    this.context.lineWidth = 2;
    this.context.font = '34px Arial';
    this.context.strokeStyle = '#ff2222';
    this.context.fillStyle = '#ffaaaa';
    this.context.textAlign = 'center';
    this.context.fillText(textObj.text, textObj.x, textObj.y);  
    this.context.strokeText(textObj.text, textObj.x, textObj.y);
  }

  renderFigure() {
    this.context.beginPath(); 
    this.context.arc(200, 140, 20, 0, Math.PI * 2); 
    this.context.moveTo(200, 160); 
    this.context.lineTo(200, 220); 
    this.context.moveTo(180, 300); 
    this.context.lineTo(185, 260);
    this.context.lineTo(200, 220); 
    this.context.lineTo(215, 260);
    this.context.lineTo(220, 300); 
    this.context.moveTo(240, 130); 
    this.context.lineTo(225, 170);
    this.context.lineTo(200, 170); 
    this.context.lineTo(175, 180); 
    this.context.lineTo(170, 220); 
    this.context.stroke();
  }
}

let game = new Game();
