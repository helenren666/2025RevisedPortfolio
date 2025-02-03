function setup() {
    // createCanvas(400, 400);
   createCanvas(400, 400).parent("sketch-container1");
    blendMode(BLEND)
  }
  
  function draw() {
    background(220);
    
    //lunchbox frame white
    stroke(255)
    strokeWeight(2)
    
    line(70,140,95,132)
    line(290,140,260,130)
    line(70,230,190,190)
    line(190,190,290,230)
    line(190,190,190,155)
    
    
    
  //left and right side  filling
  fill(0,230,230)
   quad(170,160,290,120,290,110,170,150) 
   quad(170,150,70,110,70,120,170,160)
    
    
    
    push()
    fill(255)
    stroke('#2196F3')
   //lid blue line frame
   line(70,120,170,160)
    line(170,160,290,120) 
    line(290,120,290,110)
    line(170,150,290,110)
    line(170,150,170,160)
    line(170,150,70,110) 
    line(70,110,70,120) 
    line(70,110,190,80)
    line(190,80,290,110)
    //lid left handle line frame
    line(100,128,100,145)
    line(128,140,128,158)
    line(100,128,128,140,)
    line(100,145,128,158)
    //lid right handle line frame
    line(200,145,200,160)
    line(245,130,245,145)
    line(200,145,245,130)
    line(200,160,245,145)
    pop()
    
  //blue lid fill
  push()
  fill(0,255,255)
  noStroke()
    //top fill
  quad(70, 110, 170, 150, 290, 110, 190, 80)
    //left fill
  quad(100, 128, 100, 145, 128, 158, 128, 140) 
    //right rill
  quad(200,145, 200, 160, 245, 145,245,130)  
    pop()
    
    //container frame
    line(70,140,70,230)
    line(70,230,170,280)
    line(170,280,290,230)
    line(70,140,170,180)
     line(170,180,170,280)
    line(170,180,290,140)
    line(290,140,290,230)
    
  
    //text lunch box
   push()
    fill(0,0,0);
    angleMode(DEGREES)
    translate(60,250)
    rotate(30)
    textSize(32);
    noStroke()
    text('Lunch Box', 0, 0);
  pop()
  
    
   
    
    
  }