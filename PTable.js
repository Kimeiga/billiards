var score = 0;
var moves = 0;

function PTable(X, Y, W, holeSize){
  this.myX = X;  this.myY = Y;
  this.myW = W;  this.myH = W/2;
  this.HoleSize = holeSize;  this.BallSize = holeSize/2;
  this.balls = [];
	ellipseMode(CENTER);
  
	//setup holes
	this.holes = [
			new Hole(this.myX, this.myY, this.HoleSize),
    	new Hole(this.myX, this.myY+this.myH, this.HoleSize),
    	new Hole(this.myX+this.myW, this.myY, this.HoleSize),
    	new Hole(this.myX+this.myW, this.myY+this.myH, this.HoleSize),
    	new Hole(this.myX+this.myW/2, this.myY, this.HoleSize),
    	new Hole(this.myX+this.myW/2, this.myY+this.myH, this.HoleSize)
		];
	
	
	
  this.action = function(){
    this.collideCheck();
    for (var i = 0; i < this.balls.length; i++){
      if(this.balls[i].getX() <= this.myX + this.BallSize/2 || this.balls[i].getX() >= this.myX + this.myW - this.BallSize/2) this.balls[i].Xbounce();
      if(this.balls[i].getY() <= this.myY + this.BallSize/2 || this.balls[i].getY() >= this.myY + this.myH - this.BallSize/2) this.balls[i].Ybounce();
      this.balls[i].move();
    }
  }
  this.collideCheck = function(){
		//check ball collision
    for (var i = 0; i < this.balls.length-1; i++){
      for (var j = i + 1; j < this.balls.length; j++){
        if(this.balls[i].getLocation().dist(this.balls[j].getLocation()) <= this.BallSize){
          this.balls[i].collide(this.balls[j]);
        } 
      }
    }
		//check hole collision
		let hardnessLevel = 2; //increasing this reduces the actual hole size, making it harder to score
		for (let i = 0; i < this.balls.length; i++){ //check each ball
      for (let j = 0; j < this.holes.length; j++){ //with each hole
				
				let inTheHole = collideCircleCircle(this.balls[i].getX(),this.balls[i].getY(),this.balls[i].getSize(),
																						this.holes[j].getX(),this.holes[j].getY(),this.holes[j].getSize()/hardnessLevel);
				
				if(inTheHole && i>0){ //set the ball to be removed from the table if it is in the hole
					this.balls[i].removed = true;
					score++;
				}
				if(inTheHole && i==0){  //if cue ball goes in the hole, reset its position and speed.
					//TODO: gotta wait until all balls settle.
    			this.balls[0] = new Ball(createVector(this.myX + this.myW/4, this.myY + this.myH/2), this.BallSize, 0);

					
				}
      }
    }
		
		//remove flagged balls from table
		this.balls = this.balls.filter(function(b){
				return b.removed == false;
		});
  }
  this.display = function(){
    //the rail
    fill(200, 150, 100);
    rect(this.myX-this.HoleSize/2, this.myY-this.HoleSize/2, this.myW+this.HoleSize, this.myH+this.HoleSize);
    //the pool
    fill(40, 150, 100);
    rect(this.myX, this.myY, this.myW, this.myH);
		
		//the score number
		push();
		fill(255);
		textSize(60);
		noStroke();
		textAlign(CENTER, CENTER);
		textStyle(BOLD);
		text(score,width/2 - 50, height/2);
		text(moves,width/2 + 50, height/2);
		
		textSize(20);
		fill(200);
		textStyle(ITALIC);
		text("pockets", width/2 - 50, height/2 - 40);
		text("shots", width/2 + 50, height/2 - 40);
		pop();
    
		//draw holes
    for (var i = 0; i < this.holes.length; i++){
			this.holes[i].display();
		};
    	
    
    //the kitchen head string
    line(this.myX + this.myW/4, this.myY, this.myX + this.myW/4, this.myY + this.myH);
    //the balls
    for (var i = 0; i < this.balls.length; i++){
      this.balls[i].display();
    }
		
		
		
  }
  this.rack = function(){
    var footSpot = createVector(this.myX + 3*this.myW/4, this.myY+this.myH/2);
    this.balls[0] = new Ball(createVector(this.myX + this.myW/4, this.myY + this.myH/2), this.BallSize, 0);
    this.balls[1] = new Ball(footSpot.copy(), this.BallSize, 1);
    this.balls[2] = new Ball(footSpot.copy().add(createVector(this.BallSize*sin(PI/3), this.BallSize/2)), this.BallSize, 2);
    this.balls[3] = new Ball(footSpot.copy().add(createVector(2*this.BallSize*sin(PI/3), -this.BallSize)), this.BallSize, 3);
    this.balls[4] = new Ball(footSpot.copy().add(createVector(3*this.BallSize*sin(PI/3), 3*this.BallSize/2)), this.BallSize, 4);
    this.balls[5] = new Ball(footSpot.copy().add(createVector(4*this.BallSize*sin(PI/3), -2*this.BallSize)), this.BallSize, 5);
    this.balls[6] = new Ball(footSpot.copy().add(createVector(4*this.BallSize*sin(PI/3), this.BallSize)), this.BallSize, 6);
    this.balls[7] = new Ball(footSpot.copy().add(createVector(3*this.BallSize*sin(PI/3), -this.BallSize/2)), this.BallSize, 7);
    this.balls[8] = new Ball(footSpot.copy().add(createVector(2*this.BallSize*sin(PI/3), 0)), this.BallSize, 8);
    this.balls[9] = new Ball(footSpot.copy().add(createVector(this.BallSize*sin(PI/3), -this.BallSize/2)), this.BallSize, 9);
    this.balls[10] = new Ball(footSpot.copy().add(createVector(2*this.BallSize*sin(PI/3), this.BallSize)), this.BallSize, 10);
    this.balls[11] = new Ball(footSpot.copy().add(createVector(3*this.BallSize*sin(PI/3), -3*this.BallSize/2)), this.BallSize, 11);
    this.balls[12] = new Ball(footSpot.copy().add(createVector(4*this.BallSize*sin(PI/3), 2*this.BallSize)), this.BallSize, 12);
    this.balls[13] = new Ball(footSpot.copy().add(createVector(4*this.BallSize*sin(PI/3), -this.BallSize)), this.BallSize, 13);
    this.balls[14] = new Ball(footSpot.copy().add(createVector(3*this.BallSize*sin(PI/3), this.BallSize/2)), this.BallSize, 14);
    this.balls[15] = new Ball(footSpot.copy().add(createVector(4*this.BallSize*sin(PI/3), 0)), this.BallSize, 15);
  }
	
	
	this.madeMove = function(){
		moves++;
	}
}