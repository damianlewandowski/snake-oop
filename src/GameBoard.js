import Snake from './Snake';
import Apple from './Apple';

class GameBoard {
  constructor() {
    // Handlers
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.pointsElement = document.getElementById("points");
    this.overlay = document.getElementById("overlay");
    this.loseMsg = document.getElementById("lose-msg");
    this.finalPoints = document.getElementById("final-points");
    this.playAgainBtn = document.getElementById("play-again-btn");

    // Set width and height of canvas element
    this.canvas.width = 600;
    this.canvas.height = 600;

    // Mid coordinates for initial head draw
    this.midX = this.canvas.width / 2;
    this.midY = this.canvas.height / 2;

    // Every square or segment will have these dimensions
    this.squareSize = 20;

    // Create snake and apple
    this.init();

    // Add keyboard onclick event handlers
    document.addEventListener("keydown", (e) => {
      // Handle head directions
      // preventDefault for preventing scrolling
      const keyCode = e.keyCode;
      switch(keyCode) {
        // Down arrow        
        case 40:
          this.snake.changeDirection({ xDir: 0, yDir: 1 })
          e.preventDefault();
          break;
        // Right arrow
        case 39:
          this.snake.changeDirection({ xDir: 1, yDir: 0 });
          e.preventDefault();
          break;          
        // Up arrow
        case 38:
          this.snake.changeDirection({ xDir: 0, yDir: -1 })
          e.preventDefault();
          break;
        // Left arrow
        case 37:
          this.snake.changeDirection({ xDir: -1, yDir: 0 });
          e.preventDefault();
          break; 
      }
    })

    // When user loses he sees a lose message and can click a button to play again
    this.playAgainBtn.onclick = () => {
      this.resetGame();
    }

    this.getRandomPos = this.getRandomPos.bind(this);    
    this.createNewApple = this.createNewApple.bind(this);    
    this.drawFrame = this.drawFrame.bind(this);
    this.runGame = this.runGame.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.init = this.init.bind(this);
  }

  // Get random apple's coordinates that fit into our game board
  getRandomPos(min, max) {
    return Math.floor(Math.floor(Math.random() * (max - min + 1) + min) / this.squareSize) * this.squareSize;
  }

  // Get new coordinates for an apple, instantiate it and draw it
  createNewApple() {
    const appleX = this.getRandomPos(0, this.canvas.width);
    const appleY = this.getRandomPos(0, this.canvas.height);
    this.apple = new Apple(appleX, appleY, this.squareSize, '#f00')
    this.apple.draw(this.ctx);
  }

  // If nothing is passed the score is set to 0
  updateScore({ score = 0 }) {
    console.log(score);
    this.score = score;
    this.pointsElement.innerHTML = this.score;
  }

  toggleLoseMsg() {
    const visible = this.overlay.style.visibility === "visible" ? true : false;
    // Hide the message
    if(visible) {
      this.overlay.style.visibility = "hidden";
      this.loseMsg.style.display = "none";
    } else {
      this.overlay.style.visibility = "visible";
      this.loseMsg.style.display = "block";
      this.finalPoints.innerHTML = this.score;
    }
  }

  handleGameLose() {
    this.toggleLoseMsg();
  }

  resetGame() {
    this.toggleLoseMsg();
    this.init();
    this.runGame(10);
    this.updateScore({});
    this.pointsElement.innerHTML = this.score;
  }

  init() {
    // Create snake
    this.snake = new Snake(this.midX, this.midY, this.squareSize);

    // Player's score
    this.score = 0;
    
    // Spawn apple and draw it
    this.apple = new Apple(this.getRandomPos(0, this.canvas.width), this.getRandomPos(0, this.canvas.width), this.squareSize, '#f00');
    this.apple.draw(this.ctx);
  }

  // This is where the actual game logic goes
  drawFrame() {
    this.clearFrame();
    this.snake.moveHead();
    if(this.snake.checkWallCollision()) {
      clearInterval(this.intervalId);
      this.handleGameLose();
    }
    this.snake.drawHead(this.ctx);

    if(this.apple.checkEaten(this.snake.getHeadX(), this.snake.getHeadY())) {
      this.createNewApple();
      this.updateScore({ score: ++this.score });
    }
    this.apple.draw(this.ctx);
  }

  // Clear each frame to allow rerendering
  clearFrame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  runGame(fps) {
    // Frames per second
    const frames = 1000 / fps;
    this.intervalId = setInterval(this.drawFrame, frames);
  }
}

export default GameBoard;