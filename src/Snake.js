import Segment from './Segment';

class Snake {
  constructor(midX, midY, squareSize) {

    // midX is canvas width divided by two
    this.canvasSize = midX * 2;
    // Snake's speed and size
    this.squareSize = squareSize;

    // Snake is made of segments
    this.head = new Segment(midX, midY, this.squareSize, "#000");
    this.headDirections = { xDir: 1, yDir: 0 }
    // The tail that follows snake's head
    this.tail = [];

    this.changeDirection = this.changeDirection.bind(this);
    this.drawHead = this.drawHead.bind(this);
    this.moveHead = this.moveHead.bind(this);
    this.checkWallCollision = this.checkWallCollision.bind(this);
  }

  changeDirection(dirObj) {
    // Don't allow opposite direction changes
    const curXDir = this.headDirections.xDir;
    const curYDir = this.headDirections.yDir;
    const newXDir = dirObj.xDir;
    const newYDir = dirObj.yDir;
    if( curXDir === -1 && newXDir === 0 ||
        curXDir === 1  && newXDir === 0 ||
        curYDir === -1 && newYDir === 0 ||
        curYDir === 1  && newYDir === 0 ) {

      this.headDirections = dirObj;
    }
  }

  drawHead(ctx) {
    this.head.draw(ctx);
  }

  moveHead() {
    this.head.move(this.headDirections);
  }

  getHeadX() {
    return this.head.x;
  }

  getHeadY() {
    return this.head.y;
  }

  // If snake hits the wall return true else false
  checkWallCollision() {
    if(this.head.x < 0 || this.head.x + this.squareSize > this.canvasSize || this.head.y < 0 || this.head.y > this.canvasSize) {
      return true;
    }
    return false;
  }

}

export default Snake;