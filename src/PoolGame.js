function setup(){
  createCanvas(1041, 541);
  myTable = new PTable(20, 20, 1000, 40);
  myTable.rack();
  myTable.display();
}

var canMove = true;

function draw(){
	
  myTable.action();
  myTable.display();
	
	canMove = true;
	for (var i = 0; i < myTable.balls.length; i++){
		if(myTable.balls[i].myForce.mag() != 0){
			canMove = false;
		}
  }
	
	if(canMove){
		push();
		colorMode(HSB);
		var dist = Math.sqrt( Math.pow((myTable.balls[0].getX() - mouseX), 2) + Math.pow((myTable.balls[0].getY() - mouseY), 2) );
		var guideHue = dist.map(0,1040,0,360);
		var guideColor = color(guideHue,100,90);
		var guideWidth = dist.map(0,1040,1,7);
		colorMode(RGB);
			
		stroke(guideColor);
		strokeWeight(guideWidth);
		arrow(myTable.balls[0].getX(), myTable.balls[0].getY(), mouseX, mouseY);
		pop();
	}
	
}
function mouseReleased(){
	if(canMove == true){
		var mover = createVector(mouseX - myTable.balls[0].getX(), mouseY - myTable.balls[0].getY());
		myTable.balls[0].hit(mover.mag()/25, mover.heading());
		canMove = false;
		this.myTable.madeMove();
	}
}

function arrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
  push();
  translate(x2, y2);
  var a = atan2(x1-x2, y2-y1);
  rotate(a);
  line(0, 0, -10, -10);
  line(0, 0, 10, -10);
  pop();
} 
		
Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}