function setup() {
  createCanvas(600, 600).parent("sketch-container1");
  angleMode(DEGREES);
}

function draw() {
  background(0);

 
  push()
  noStroke();
  translate(width / 2, height / 2);

  //arrangement for circle posx, y use i,j
  for (let i = 0; i < 600; i++) {
    for (let j = 0; j < 900; j +=10) {
      
  // change outline color of the background circles use modulo
      let colorId = (i + j) % 3;
      if (colorId === 0) {
        stroke(255,0,0);  
      } else if (colorId === 1) {
        stroke(0,255,0);  // 
      } else if (colorId === 2) {
        stroke(0,0,255);  // 
      }

   //circle, (same diamter ellipse)  
      ellipse(i*1,j*2,30,30)
    }
    //make circles rotate
    rotate(frameCount / 50);  
  }
  pop()
  
  //text at center changing color based on second passed use modulo
  push()
  let textcolor=(second())%3;
  if(textcolor===0){fill("red")}
  else if(textcolor===1){fill("yellow")}
    else if(textcolor===2){fill("orange")}   
  textAlign(CENTER)
  textSize(32)
   stroke(0);
    textFont('Impact');
  strokeWeight(10);
  text("WELCOME to LOTTERY",width/2,height/2)
  pop()
  

}
