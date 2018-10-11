class Game {
  constructor(){
    this.canvas = document.querySelector('#asteroids'); 
    this.context = this.canvas.getContext('2d');
    this.fps = 30;
    let context = this.context;
    let canvas = this.canvas;
    this.gameEnd = {
      value: false,
      winner: ''
    };

    this.ballActions = {
      x: 5,
      y: 180,
      speedX: 20,
      speedY: 10
    };

    this.score = {
      player1: 0,
      player2: 0,
      winning: 2
    }
    
    this.paddle1Actions = {
      y: 0,
      height: 150
    };
    
    this.paddle2Actions = {
      y: 430,
      height: 150,
      centerScreen: this.y + (this.height/2)
    };

    let scope = this;
    const createBall = (obj) => ({
      ...obj,
      context: context,
      canvas: canvas,    
      x: 0,
      y: 50,
      radius: 10,
      height: 80,
      width: 50,
      color: 'red',
      render() {
        this.context.beginPath();
        this.context.arc(scope.ballActions.x, scope.ballActions.y, this.radius, 0,  Math.PI * 2, false);
        this.context.fillStyle = this.color;
        this.context.fill();
        this.context.lineWidth = 1;
        this.context.strokeStyle = this.color;
        this.context.stroke();
      }
    });
    
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

    this.ball = createBall();
    this.initGame();
  }

  initGame() {
    
    setInterval(()=> {
      this.renderS();
      this.moveBall();
    }, 1000/this.fps);
    
    this.canvas.addEventListener('mousemove',(evt) => {
      let mousePos = this.calculateMousePos(evt);
      this.paddle1Actions.y = mousePos.y - (this.paddle1Actions.height/2);
    });
    
    this.canvas.addEventListener('mousedown',(evt) => {
      if (this.gameEnd.value) {
        this.gameEnd.winner = '';
        this.gameEnd.value = false;
      }
    })
  }

  calculateMousePos(evt) {
    let rect = this.canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
      x: mouseX,
      y: mouseY
    }
  }

  clear(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  computerMove() {
    if (this.paddle2Actions.y < this.ballActions.y) {
      this.paddle2Actions.y += 5;
    } else {
      this.paddle2Actions.y -= 5;
    }
  }

  moveBall() {
    if (this.gameEnd.value) {
      this.context.fillStyle = 'green';
      this.context.font = "20px Arial";
      this.context.fillText('Click to Restart', 
          ((this.canvas.width/2) - (this.context.measureText('Click to Restart').width/2)),
          ((this.canvas.height/2) - 100) );
      return;
    }
    this.computerMove();
    this.ballActions.x += this.ballActions.speedX;
    this.ballActions.y += this.ballActions.speedY;
    
    if (this.ballActions.x >= this.canvas.width) {
      if (this.ballActions.y > this.paddle2Actions.y && 
        this.ballActions.y < (this.paddle2Actions.y + this.paddle2Actions.height)) {
            this.ballActions.speedX = -this.ballActions.speedX;
            let deltaY = this.ballActions.y - (this.paddle1Actions.y + (this.paddle1Actions.height/2));
            this.ballActions.speedY = deltaY * 0.40;
      } else {
        this.score.player1++;
        this.resetBall();
      }

    } else if (this.ballActions.x <= 0) {
      if (this.ballActions.y > this.paddle1Actions.y && 
          this.ballActions.y < (this.paddle1Actions.y + this.paddle1Actions.height)) {
            this.ballActions.speedX = -this.ballActions.speedX;
            let deltaY = this.ballActions.y - (this.paddle2Actions.y + (this.paddle2Actions.height/2));
            this.ballActions.speedY = deltaY * 0.40;
      } else {
        this.score.player2++;
        this.resetBall();
      }
      
    }
    if (this.ballActions.y >= this.canvas.height) {
      this.ballActions.speedY = - this.ballActions.speedY;
    } else if (this.ballActions.y <= 0) {
      this.ballActions.speedY = this.ballActions.speedY * -1;
    }
  }

  resetBall() {
    this.winner();
    this.ballActions.speedX = -this.ballActions.speedX;
    this.ballActions.x = this.canvas.width / 2;
    this.ballActions.y = this.canvas.height / 2;
  }

  winner() {
    if ((this.score.player1 === this.score.winning) ||
    (this.score.player2 === this.score.winning))  {
      if (this.score.player1 > this.score.player2) {
        this.gameEnd.winner = 'Player 2 WIN';
      } else {
        this.gameEnd.winner = 'Player 1 WIN';
      }
      this.gameEnd.value = true;
      this.score.player1 = 0;
      this.score.player2 = 0;
      
    } 
  }

  drawNet() {
    for (let i=0; i <= this.canvas.height; i+=20) {
      this.context.fillStyle = 'green';
      this.context.fillRect(this.canvas.width/2-1, i, 2, 10);
    }
  }

  renderS() {
    this.clear();
    this.drawNet();
    let leftStick = Object.assign({}, this.stick);
    leftStick.y = this.paddle1Actions.y;
    leftStick.height = this.paddle1Actions.height;
    leftStick.render();
    
    let ball = Object.assign({}, this.ball);
    let ball2 = Object.assign({}, this.ball);
    
    let rightStick = Object.assign({}, this.stick);
    rightStick.x = this.canvas.width - 10;
    rightStick.y = this.paddle2Actions.y;
    rightStick.height = this.paddle2Actions.height;
    rightStick.render();

    ball.x = 30;
    ball.y = 70;
    ball.render();
    
    this.context.fillStyle = "#fff";
    this.context.font = "30px Arial";
    this.context.fillText('Score: ' + this.score.player1 , 100, 100);
    this.context.fillText('Score: ' + this.score.player2, (this.canvas.width/2 + 100), 100);
    this.context.fillText(this.gameEnd.winner, 
    ((this.canvas.width/2) - (this.context.measureText(this.gameEnd.winner).width/2)),
    ((this.canvas.height/2) + 200) );
  }
}

let game = new Game();
