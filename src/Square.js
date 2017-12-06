class Square {
  constructor(x, y, size, color) { 
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;

    this.draw = this.draw.bind(this);
   }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

export default Square;