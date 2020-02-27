class Bird {
  constructor() {
    this.x = width/4;
    this.y = height/2;
    this.ySpeed = 0;
    this.gravity = 0.5;
    this.lift = -6;
    this.d = 30;
    this.r = this.d/2;
    this.death = false;
    this.score = 0;
    this.fitness = 0;
    this.brain = new NN(6, 20, 2, 1);
    this.curIndex = 0;
  }

  show() {
    fill(255, 100);
    ellipse(this.x, this.y, this.d, this.d);
  }

  move(obsArr) {
    this.fitness++;

    this.y += this.ySpeed;
    this.ySpeed += this.gravity;

    let closest, closestDist = 9999;
    let index = 0;
    for(let i = 0;i < obsArr.length;i++){
      let cur = obsArr[i];
      let curDist = cur.x + cur.w/2 - (this.x - this.r);
      if(curDist < closestDist && curDist >= 0){
        closestDist = cur.x - this.x;
        index = i;
        closest = cur;
      }
    }

    if(index != this.curIndex){
      this.curIndex = index;
      this.score++;
    }

    let ip = [];

    ip[0] = this.y / height;
    ip[1] = this.ySpeed / 20;
    ip[2] = (closestDist + closest.w/2) / width;
    ip[3] = (closest.y1 + closest.h/2) / height;
    ip[4] = (closest.y2 - closest.h/2) / height;
    ip[5] = closest.xSpeed / 12;

    let op = this.brain.predict(ip);

    if(op[0] < op[1]){
      this.jump();
    }
  }

  jump() {
    this.ySpeed = this.lift;
  }

  checkDeath(obs) {
    for (let i = 0; i < obs.length; i++) {
      let cur = obs[i];
      if (this.x + this.r >= cur.x - cur.w/2 && this.x - this.r <= cur.x + cur.w/2) {
        if (this.y + this.r >= cur.y1 - cur.h/2 && this.y - this.r <= cur.y1 + cur.h/2) {
          this.death = true;
        }
        if (this.y + this.r >= cur.y2 - cur.h/2 && this.y - this.r <= cur.y2 + cur.h/2) {
          this.death = true;
        }
      }
    }
    if (this.y + this.r >= height || this.y - this.r <= 0) {
      this.death = true;
    }
  }

  copyBrain(toCopy){
    this.brain.copyNN(toCopy.brain);
  }

  mutateBird(mr){
    this.brain.mutateNN(mr);
  }
}
