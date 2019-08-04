

var s;
var scl = 20;

var food;
var myRec = new p5.SpeechRec('en-US', parseResult);
  myRec.continuous = true;
  myRec.interimResults = true;

function setup() {
  createCanvas(600, 600);
  s = new Snake();
  frameRate(10);
  pickLocation();

myRec.start();
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function mousePressed() {
  s.total++;
}

function draw() {
  background(51);

  if (s.eat(food)) {
    pickLocation();
  }
  s.death();
  s.update();
  s.show();


  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);
}





function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }




}
function parseResult()
  {
    // recognition system will often append words into phrases.
    // so hack here is to only use the last word:
    var mostrecentword = myRec.resultString.split(' ').pop();
    if(mostrecentword.indexOf("jump")!==-1) {s.dir(0, -1); }
    else if(mostrecentword.indexOf("right")!==-1) { s.dir(1, 0);}
    else if(mostrecentword.indexOf("up")!==-1) {  }
    else if(mostrecentword.indexOf("down")!==-1) { s.dir(0, 1); }
    else if(mostrecentword.indexOf("clear")!==-1) { background(255); }
    console.log(mostrecentword);
  }