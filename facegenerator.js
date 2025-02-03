let r
let g
let b
let ellipseHeight=0
let arcHeight = 0;  // give a number to the arc height

function setup() {
  createCanvas(400, 400).parent("sketch-container1");
}

//change background color randomly
  function mousePressed(){
  r=random(0,255);
  g=random(0,255);
  b=random(0,255);
   background(r,g,b);
}



function draw() {

  //circle of face
  push()
  fill(255,255,0);
  circle(200,150,290);
  pop()

  //mouth
noFill();         
strokeWeight(7);        
// mouseY stay between 100-300,archeight variable only appear in this range
if (mouseY >= 100 & mouseY <= 300) {
// upward: mouse moving higher, face sadder,curve bigger
if (mouseY < 200) {
arcHeight = 200 - mouseY;
arc(200, 200, 80, arcHeight, PI, TWO_PI);  
} 
// downward:mouse moving lower, face happier,curve bigger
else if(mouseY >= 200) {
arcHeight = mouseY - 200;
arc(200, 200, 80, arcHeight, 0, PI); 
}
}
//if move too high/low, not affect to the arc
else if(mouseY>300){
  arcHeight=100;
  arc(200, 200, 80, arcHeight, TWO_PI, PI);
}
  else if(mouseY<100){
  arcHeight=100;
  arc(200, 200, 80, arcHeight, PI, TWO_PI);
}
 
//the eye's shape curve intensity should follow the mouth curve intensity, max ellipseheight=80,  max arc height=100, ellpise=arc*(80/100) ratio
  
ellipseHeight=  arcHeight*(80/100);
fill(0);
ellipse(110, 130, 40, ellipseHeight);
ellipse(290, 130, 40, ellipseHeight);
  
}