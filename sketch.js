let inc = 0.1;
  let noiseMax = 3;
  let phase = 0;
  let zoff = 0;
  let myFishes = [];
  let startingTime = 0;
  let offset = 0;
  //ok so we need a koi array
  //and we need to update every koi in the array and not make new kois unless the hour strikes
  //if the hour hits 1, we delete all koi and make a new koi
  //if it is night time, we use night mode water


function setup(){
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
	textAlign(CENTER, CENTER);
  frameRate(20);
  mainpos = windowWidth - minute()*windowWidth/60;
  startingTime = hour()%12;
  if(hour()==0)
  {
    startingTime = 11;
  }
  for (var i = 0; i< startingTime; i++)
  {
    myFishes.push(new koi(20*i, 300, 0.2, 200));
  }

 myFish = new koi(mainpos-90, 300, 0.2, 200);
 console.log(myFishes);

 
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  console.log(minute());

  if (hour()%12 != startingTime)
  {
    startingTime = hour()%12;
    myFishes.push(new koi(20*offset, 300, 0.2, 200));
    offset = offset+1;
  }
  if (hour()%12==1)
  {
    startingTime = 1;
    myFishes = [];
    myFishes.push(new koi(20, 300, 0.2, 200));
    offset=0;
  }

  section = windowWidth/60;
  background(1,20);
  noFill();
  strokeWeight(2);
  mainpos = windowWidth - 600 - minute()*(windowWidth-600)/60;
  
  for(var x=windowWidth+100; x>-section;x=x-section){
    for(var y=windowHeight+100; y>-section; y=y-section){
      fill(153,190 + x/section,241);
      strokeWeight(3);
      stroke(133,190 + x/40,241);
      rect(x,y,75,75,0,180);
      noStroke();
      fill(133,190 + x/40,241);
      circle(x+40, y+40, section);
    }
    }
for (var g = 0; g < myFishes.length; g++)
{
  myFishes[g].display();
  myFishes[g].move();
}

scale(3);
if(hour()<=5 || hour()>17)
{
  fill(57,42,222,75);
  rect(0,0, windowWidth, windowHeight)
}

}

class koi{
  x=0;
  y=0;
  yvals = [0, 5, 10, 15, 20, 25,30, 35, 40, 45, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5];
  pos = 0;
  ran = random(6);
  filler = random(30, 200);
  xset = random(70);
  yset = random(-5,5);
  xsize = random(8,30);
  ysize = random(8,20);
  mainfill1 = random (0, 122);
  mainfill2 = random(0, 255);
  saveval = 0;
  mainfill3 = random(0, 152);
  scalefactor = 1;

 constructor(x, y, scalefactor, startpos)
 {
   this.saveval = x;
   this.x = windowWidth - 120 - minute()*windowWidth/60 + this.saveval;
   this.y = floor(random( windowHeight));
   this.scalefactor = scalefactor;
   this.pos = startpos%19;
   for (let a = 0; a<this.yvals.length; a++)
   {
     this.yvals[a]=this.yvals[a]*scalefactor-25;
   }
 }
 
 display()
 {
  //rotate(90);
   this.x = this.x%windowWidth;
   fill(227, this.mainfill2, 34);
   strokeWeight(0);
   triangle(this.x-15, this.y+10-this.yvals[this.pos%19]-15, this.x - 20, this.y+20-15-this.yvals[this.pos%19], 
       this.x-10, this.y+10-this.yvals[this.pos%19] -15);
   triangle(this.x-15, this.y-10-this.yvals[this.pos%19]-25-5, this.x - 20, this.y-25-20-5-this.yvals[this.pos%19], 
         this.x-10, this.y-10-this.yvals[this.pos%19]- 25 -5);
   circle(this.x, this.y-25-this.yvals[this.pos%19], 50);
   //rect(this.x, this.y-25, 55, 50);
   for (let i = 0; i<11; i++)
   {
     let fact = 1;
     let offset = 0
     if (i>4)
     {
       fact = 1-0.1*(i-3);
       offset = (1-fact)*25;
     }
     rect(this.x+10*i, this.y - 50 - this.yvals[(this.pos+i)%19]+offset, 10, fact*50);
   }

  triangle (this.x+100, this.y-25-this.yvals[(this.pos+11)%19], this.x+150, this.y -this.yvals[(this.pos+11)%19], 
  this.x+150, this.y-50-this.yvals[(this.pos+11)%19]);
  triangle (this.x+10, this.y-25-this.yvals[(this.pos+3)%19], this.x+50, this.y + 20 -this.yvals[(this.pos+3)%19], 
  this.x+50, this.y-70-this.yvals[(this.pos+3)%19]);
  this.makespots();
  fill(227, (this.mainfill2+50)%255, 34);
  ellipse(this.x, this.y-46-this.yvals[this.pos%19], 10,5);
  ellipse(this.x, this.y-4-this.yvals[this.pos%19], 10,5);

 }
 
 makespots(filler, xset, yset, xsize, ysize)
 {
   for (let x = 0; x < this.ran; x++)
   {
     fill(227, this.filler+20*x, 34);
     ellipse(this.x+this.xset+4*x, this.y - this.yvals[(this.pos+x)%19]+ this.yset-0.5*x -24, this.xsize, this.ysize);
   }
 }

 move(mainpos)
 {
   this.pos = this.pos+1;
   this.x =  windowWidth - minute()*windowWidth/60 - this.saveval;
 }

}



