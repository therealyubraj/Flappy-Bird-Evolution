class Obstacle {
  constructor(x_) {
    this.x = x_;
    this.gap = 150;
    this.w = 80;
    this.h = height;
    this.y = random(height / 6, 3 / 4 * height);
    this.y1 = this.y - this.gap/2 - this.h/2;
    this.y2 = this.y + this.gap/2 + this.h/2;
    this.xSpeed = -5;
  }

  show() {
    fill(0, 255, 0);
    rectMode(CENTER);
    rect(this.x, this.y1, this.w, this.h);
    rect(this.x, this.y2, this.w, this.h);
  }

  move() {
    this.x += this.xSpeed;
  }

  resetX(x_) {
    this.x = x_;
    this.y = random(height / 6, 3 / 4 * height);
    this.y1 = this.y - this.gap/2 - this.h/2;
    this.y2 = this.y + this.gap/2 + this.h/2;
  }
}
