function setup() {
  createCanvas(400, 600).parent("sketch-container1");
  angleMode(DEGREES);
  
}

function draw() {
  
  background(220);
  MousePosition()
  line(0, 200, 400, 200)
  line(0, 400, 400, 400)
  
  push()
//hair
  noFill()
  arc(150,100,150,200,130,270)
  arc(220,100,150,200,270,400)
  pop()
  
  //face
  push()
//fill(255,219,172)
 noFill()
  beginShape(); 
  curveVertex(184,28);
  curveVertex(184,28);
  curveVertex(135,51);
curveVertex(109,95);
curveVertex(116,134);
curveVertex(149,161);
curveVertex(179,180);
  curveVertex(228,166);
   curveVertex(255,135);
  curveVertex(258,100);
  endShape(CLOSE);
pop()
  
  
 //right ear 
  push();
  noFill()
  beginShape();
  curveVertex(245,100);
curveVertex(245,100);
  curveVertex(271,106);
  curveVertex(266,127);
  curveVertex(245,140);
    curveVertex(240,130);
  curveVertex(240,130);
  endShape();
  pop();

  //call eye function
  //all elipse in eye area
  drawEyes(255,150,100,40,55);
  drawEyes(255,185,100,45,60);
  drawEyes(0,144,110,25,35)
  drawEyes(0,175,110,25,35)
  drawEyes(255,148,103,3,10)
  drawEyes(255,178,103,3,10)
  
  //nose
  noFill()
  arc(156, 134, 10, 10, 30, 185,OPEN);
  
  //mouth
  noFill();
  strokeWeight(1);
  stroke(0);
  curve(100,100,163, 152, 175, 143,150,150 );
  
  //call body function
  drawBody(156,166,160,200,135,223,66,224,36,254,30,315,41,386,95,408,157,388,183,363);
  drawBody(225,169,223,185,236,207,267,214,303,215,327,231,343,259,361,305,353,374,315,403)
  drawBody(315,403,275,394,250,381,234,373,223,361,218,351,205,344)
 
  
  //I use for function by GPT help,(spine) to give aray for this curve. but I understand it now.
   for (let i = -40; i <= 150; i += 5) {
    drawsmallbody(169, 241, 181, 254, 206, 256, 221, 235, i);
   
  }
  
  //draw rib
  for (let i = -20; i <= 50; i += 5) {
drawsmallbody(170,240,130,260,85,320,30,340,i);
drawsmallbody(170,245,130,265,85,323,30,340,i);
drawsmallbody(215,240,255,260,300,320,355,340,i); drawsmallbody(215,245,255,265,300,323,355,340,i);
  }
  
  for (let i = 0; i <= 70; i += 5) {
drawrib(70,300,i,5,130,-10);
  drawrib(315,305,i,50,175,10);
  }
  
  
  
//call shoulder  
  let i1=0;
  let i2=10;
 //call left shoulder 
  for(let i = 0; i <= 75; i += 5){
  i1=i;
  i2+=-5; drawshoulder(40,230,135,230,i1,i2); 
  }
//call right shoulder
  for(let i = 0; i <= 75; i += 5){
  i1=i;
  i2+=5; drawshoulder2(310,230,340,230,i1,i2); 
    
    
    
    
    //draw tail
    drawBody(170,392,181,436,216,469,228,501,221,535,189,557,130,554,50,540,175,587,236,579)
    drawsmallbody(236,579,278,525,279,459,220,392,0)

  }
  
}


//define left shoulder
function drawshoulder(x1,y1,x2,y2,offset1,offset2){
line(x1,y1+offset1,x2+offset2,y2+offset1) 
}
//define right shoulder
function drawshoulder2(x1,y1,x2,y2,offset1,offset2){
line(x1+offset2,y1+offset1,x2,y2+offset1) 
}

//define rib function  
 function drawrib(x,y,offset,start,end,ro){
   push()
  translate(x,y+offset)
  rotate(ro)
  arc(0, 0, 200, 80, start, end)
   pop()
 }

//define eye function
function drawEyes(color,posX,posY,Width,Height){
fill(color)
ellipse(posX,posY,Width,Height)
}

function drawsmallbody(a1,a2,a3,a4,a5,a6,a7,alast,offset){
  strokeWeight(1);
  noFill()
  beginShape();
  curveVertex(a1,a2+offset);
  curveVertex(a1,a2+offset);
  curveVertex(a3,a4+offset);
  curveVertex(a5,a6+offset);
  curveVertex(a7,alast+offset);
  curveVertex(a7,alast+offset);
  endShape()
}

  //define body function
function drawBody(b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,b11,b12,b13,b14,b15,b16,b17,b18,b19,b20){
  strokeWeight(1);
  noFill()
  beginShape();
  curveVertex(b1,b2);
  curveVertex(b1,b2);
  curveVertex(b3,b4);
  curveVertex(b5,b6);
  curveVertex(b7,b8);
  curveVertex(b9,b10);
  curveVertex(b11,b12);
   curveVertex(b13,b14);
   curveVertex(b15,b16);
   curveVertex(b17,b18);
   curveVertex(b19,b20);
    curveVertex(b19,b20);
  endShape();
}


function MousePosition(){
   //I use this to show mouse position for curveVertext to find x,y axis point location
  fill(255)
   text( ""+mouseX+", "+mouseY, mouseX, mouseY)
}
