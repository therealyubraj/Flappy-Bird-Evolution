function createPopulation(){
  let newBirds = [];
  bestScore = 0;
  gen++;
  calcFitness();
  for(let i = 0;i < bird.length;i++){
    let tmp = pickOne();
    newBirds[i] = new Bird();
    newBirds[i].copyBrain(tmp);
  }
  for(let i = 0;i < bird.length;i++){
    let tmp = newBirds[i];
    bird[i] = new Bird();
    bird[i].copyBrain(tmp);
    bird[i].mutateBird(MR);
  }
}

function pickOne(){
  let index = 0;
  let r = random(1);
  while(r > 0){
    r -= bird[index].fitness;
    if(index >= popnSize - 1){
      break;
    }
    index++;
  }
  index--;
  return bird[index];
}

function calcFitness(){
  let sum = 0;

  for(let i = 0;i < bird.length;i++){
    sum += bird[i].fitness;
  }

  for(let i = 0;i < bird.length;i++){
    bird[i].fitness /= sum;
  }
}
