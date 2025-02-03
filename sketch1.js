
let row=7//chart mon-sun
let column=24//  0am-23pm
let rectwidth=64
let rectheight=22
let chartmove=30

let week=[]
let time=[]
let washhanddata=[]

function setup() {
  createCanvas(600, 600).parent("sketch-container1");
  week=["M","T","W","Th","F","Sa","S"]
  time = ["0am", "1am", "2am", "3am", "4am", "5am", "6am", "7am", "8am", "9am", "10am", "11am", "12pm", "13pm", "14pm", "15pm", "16pm", "17pm", "18pm", "19pm", "20pm", "21pm", "22pm", "23pm"];
  
  //array(mon-sun's + 0-23pm's) wash hand iteration data
  //null=no wash hand
  //true= use soap
  //false=no use soap
  washhanddata = [
  [null, null, null, null, null, null, null, null, false, false, null, true, null, false, null, null, null, null, null, false, null, null, null, null], // Monday
  [null, null, null, null, null, null, null, null, null, true, null, false, null, null, null, false, null, null, true, null, null, null, null, true], // Tuesday
  [null, null, null, null, null, null, null, null, false, true, false, null, null, null, null, null, null, null, true, null, null, false, null, null], // Wednesday
  [true, null, null, null, null, null, null, null, false, null, null, false, null, null, null, true, null, null, null, true, null, null, true, null], // Thursday
  [null, null, null, null, null, null, null, true, true, null, null, true, null, false, null, false, null, true, null, null, false, null, true], // Friday
    
[null, null, null, null, null, null, null, null, null, null, true, null, null, true, null, null, null, false, true, true, true, true, null,true], // Saturday
[null, null, null, null, null, null, null, null, null, true, true, null, null, null, null, null, null, null, true, null, false, null, null,true] // Sunday

];
}

function draw() {
  background(220,240,0);
  drawchart()
  
  push()
   fill(0)
  textSize(20)
  rotate(HALF_PI)
  textAlign(CENTER)
  text("Hand Wash Schedule",300,-500)
  pop()
  
  
  //text explain nosoap,use soap,no hand wash
  push()
  fill(0)
  text("used soap",170,580)
  text("no soap",50,580)
  text("no wash hand",300,580)
  pop()
  
 //red green white grid explain 
  fill(255,0,0)
  rect(100,570,rectwidth,rectheight)
   fill(0,255,0)
  rect(230,570,rectwidth,rectheight)
    fill(255)
  rect(380,570,rectwidth,rectheight)
  
 
  
  fill(0)
  //Mon-Sun top line
  for(let i=0; i<week.length;i++){
    text(week[i],chartmove+i*rectwidth+ rectwidth/2,chartmove-5)
  }
  
  //0-23pm side line
 for(let i=0; i<time.length;i++){
text(time[i],0,rectheight/2+chartmove+i*rectheight)}
  
    
}


//chart grid
function drawchart(){
  
  for(let i=0;i<row;i++){
    for(let j=0; j<column;j++){
    
      //fill different color
      if(washhanddata[i][j]===true){fill(0,255,0)}//use soap=green
      else if(washhanddata[i][j]===false){fill(255,0,0)}//no use soap=red
      else{fill(255)} //no wash hand=white
      
      //all rectangle grid 
   let rectx=chartmove+i*rectwidth
   let recty=chartmove+j*rectheight
      rect(rectx,recty,rectwidth,rectheight) 
    }
  }


}