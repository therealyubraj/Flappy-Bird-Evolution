let bird = [];
let obstacles = [];
let obsGap, noOfObs;
let MR = 0.01;
let popnSize = 500;
let bestScore = 0,recordScore = 0, gen = 0;
let slider;

function setup() {
  createCanvas(640, 480);

  slider = createSlider(1, 20, 1);
  obsGap = width - width/4;
  noOfObs = 3;

  for(let i = 0;i < popnSize;i++){
    bird[i] = new Bird();
  }
  resetObstacles();
}


function draw() {
  background(0);
  for(let i = 0;i < slider.value();i++){
    birdFunctions();
    obstacleFunctions();

    fill(255,0,0);
    textSize(25);
    text("record Score: " + recordScore,40, 80);
    text("current best: " + bestScore,40, 120);
    text("generation: " + gen,40, 40);
  }
}

function resetObstacles() {
  for (let i = 0; i < noOfObs; i++) {
    obstacles[i] = new Obstacle(width + obsGap * i);
  }
}

function birdFunctions() {
  let reset = true;
  for(let i = 0;i < popnSize;i++){
    if(!bird[i].death){
      if(bird[i].score > bestScore){
        bestScore = bird[i].score;
      }
      if(bird[i].score > recordScore){
        recordScore = bird[i].score;
      }
      reset = false;
      bird[i].show();
      bird[i].move(obstacles);
      bird[i].checkDeath(obstacles);
    }
  }
  if(reset){
    resetObstacles();
    createPopulation();
  }
}

function obstacleFunctions() {
  for (let i = 0; i < noOfObs; i++) {
    let cur = obstacles[i];
    cur.show();
    cur.move();

    if (cur.x + cur.w/2 <= 0) {
      if (i == 0) {
        cur.resetX(obstacles[noOfObs - 1].x + obsGap);
      } else {
        cur.resetX(obstacles[i - 1].x + obsGap);
      }
    }
  }
}
