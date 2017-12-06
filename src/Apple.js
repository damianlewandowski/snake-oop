import Square from './Square';

class Apple extends Square {
  constructor(x, y, size, color) {
    super(x, y, size, color);
    this.size = size;

    this.checkEaten = this.checkEaten.bind(this);
  }

  // Check if apple's coordinates are the same as snake's head
  checkEaten(headX, headY) {
    if(headX === this.x && headY === this.y) {
      return true;
    } else {
      return false;
    }
  }
}

export default Apple;