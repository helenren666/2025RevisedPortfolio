let hourAngle = 0;
let minuteAngle = 0;
let hourSpeed = 1; // Hour hand speed: 1 degree per frame
let minuteSpeed = 12; // Minute hand speed: 12 degrees per frame

//let FrameCount = 0; // Custom frame counter for the sun

function setup() {
  createCanvas(600, 600).parent("sketch-container1");
  angleMode(DEGREES);
  frameRate(60); // Set frame rate to 60 frames per second
}



function draw() {
  
  
  
 // After 720 frames, stop cycle unless restart draw pressed again
  if (frameCount >= 720) {
  noLoop();
  }
  
  //draw background as base
 drawbackground();
 
  // Draw the sun first so that it is behind the horizon
  drawSun();

  // Draw the horizon (black rectangle), which will cover the sun when necessary
  drawHorizon();

  // Draw the clock
  drawClock();
}



function drawbackground(){
  let bgcolor=0;

//when time=6am-12pm becomes brighter
  if(frameCount>180&&frameCount<360){
   bgcolor=map(frameCount,180,360,0,255);
}
//when time=12-9pm become darker
  if(frameCount>=360&&frameCount<630){ bgcolor=map(frameCount,360,630,255,0);
}
  background(bgcolor);
}




//draw the ground
function drawHorizon() {
  fill(210,180,140);
  rect(0, height - 100, width, 100); 
}





function drawSun(){
  
 let sunRadius = 50; 
let sunX = width / 2
let sunY

//sun below ground,Sun's top edge touches the horizon
  if (frameCount >= 0 && frameCount < 100) {
    sunY = height - sunRadius; 
  } 
   // Sun rising from completely below the horizon to the top (100 to 360 frames)
  else if (frameCount >= 100 && frameCount < 360) {
 // Sun rising from completely below the horizon to the top (100 to 360 frames)
  sunY = map(frameCount, 100, 360, height - sunRadius, 50); 
  } 
  // Sun setting from the top to half below horizon (360 to 540 frames)
  else if (frameCount >= 360 && frameCount < 540) {
    sunY = map(frameCount, 360, 540, 50, height - sunRadius / 2); 
  } 
  // Sun stays at half below horizon (540 to 570 frames)
  else if (frameCount >= 540 && frameCount < 570) {
    sunY = height - sunRadius / 2;
  } 
  // Keep sun halfway hidden
  else if (frameCount >= 570 && frameCount < 630) {
    sunY = map(frameCount, 570, 630, height - sunRadius / 2, height - sunRadius); 
  } 
  // Sun fully below horizon
  // Sun continues to fully disappear below the horizon (570 to 630 frames)
  else if (frameCount >= 630 && frameCount < 720) {
    sunY = height - sunRadius; 
  } 
   // Sun stays completely below the horizon (630 to 720 frames)
  // Sun's top edge just below the horizon
  
// Draw the sun as a yellow circle
  fill(255, 204, 0);
  noStroke();
  ellipse(sunX, sunY, sunRadius * 2, sunRadius * 2); // Sun has a diameter of 100
  
}






function drawClock() {
  translate(70, 70);
  rotate(-90); // Rotate to make 12 o'clock at the top 
  
// Draw circle
  stroke(0, 255, 200);
  fill(224,255,255);
  strokeWeight(5);
  circle(0, 0, 100);
  
  // Draw hour hand
  stroke(0, 0, 255);
  strokeWeight(6);
  push();
  rotate(hourAngle);
  line(0, 0, 30, 0); // Hour hand length
  pop();

  // Draw minute hand
  stroke(0, 255, 0);
  strokeWeight(4);
  push();
  rotate(minuteAngle);
  line(0, 0, 40, 0); // Minute hand length
  pop();

  // Draw the center point of the clock
  stroke(0);
  strokeWeight(8);
  point(0, 0);
  

  // Update angles
  hourAngle += hourSpeed;   // Increment the hour angle
  minuteAngle += minuteSpeed; // Increment the minute angle
}