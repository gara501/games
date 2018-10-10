class Game {
  constructor(){
    this.canvas = document.querySelector('#asteroids'); 
    this.context = this.canvas.getContext('2d');
    let scope = this;
    this.ballActions = {
      x: 5,
      speed: 10
    };  
    let context = this.context;
    let canvas = this.canvas;
    
    this.stick = {
      context: context,
      x: 0,
      y: 200,
      height: 150,
      width: 10,
      color: '#fff',
      render() {
        this.context.fillStyle = this.color;
        this.context.fillRect(this.x, this.y, this.width, this.height);
      }
    };

    this.ball = {
      context: context,
      canvas: canvas,    
      x: 30,
      y: 30,
      radius: 10,
      height: 80,
      width: 50,
      color: 'red',
      render() {
        this.context.beginPath();
        this.context.arc(scope.ballActions.x, this.y, this.radius, 0,  Math.PI * 2, false);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.lineWidth = 1;
        this.context.strokeStyle = this.color;
        this.context.stroke();
      }
    };
    this.fps = 30;
    this.initGame();
  }

  
  initGame() {
    this.context.fillStyle = 'lightgrey';
    this.context.stroke();
    this.context.fill();
    setInterval(()=> {
      this.moveBall();
      this.renderS();
    }, 1000/this.fps);
  }

  clear(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  moveBall() {
    this.ballActions.x += this.ballActions.speed;
    if (this.ballActions.x >= this.canvas.width) {
      this.ballActions.speed = -this.ballActions.speed;
    } else if (this.ballActions.x <= 0) {
      this.ballActions.speed = this.ballActions.speed * -1;
    }
  }

  renderS() {
    this.clear();
    let leftStick = Object.assign({}, this.stick);
    let rightStick = Object.assign({}, this.stick);
    let ball = Object.assign({}, this.ball);
    let ball2 = Object.assign({}, this.ball);
    rightStick.x = 790;
    leftStick.render();
    rightStick.render();
    ball.color = 'green';
    ball.x = 30;
    ball.y = 70;
    ball.render();
    
    ball2.color = 'white';
    ball2.render();
    
    
    
  }
}

let game = new Game();
