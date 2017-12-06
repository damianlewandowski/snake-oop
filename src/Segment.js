import Square from './Square';

class Segment extends Square {
  constructor(x, y, size, color) {
    super(x, y, size, color);
    // Save coordinates to move it later
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    
    this.move = this.move.bind(this);
  }

  // Move the segment in particular direction
  move({ xDir, yDir }) {
    // Moving left
    if(xDir === -1) {
      this.x -= this.size;
    } else if(xDir === 1) {
      this.x += this.size;
    } else if(yDir === -1) {
      this.y -= this.size;
    } else {
      this.y += this.size;
    }
  }
}

export default Segment;