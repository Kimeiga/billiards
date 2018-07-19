// var sketch = function(p) {
// 	p.setup = setup();
// };
// new p5(sketch, 'container');


function sleep(milliseconds) {
	var startTime = new Date().getTime();
	while (new Date().getTime() < startTime + milliseconds);
}
function vh(v) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h) / 100;
}

function vw(v) {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  return (v * w) / 100;
}

function vmin(v) {
  return Math.min(vh(v), vw(v));
}

function vmax(v) {
  return Math.max(vh(v), vw(v));
}
// function parentWidth(elem) {
//     return elem.parentElement.clientWidth;
// }
// var screen_width = parentWidth(document.getElementById('container'));
// function parentHeight(elem) {
//     return elem.parentElement.clientHeight;
// }
// var screen_height = parentWidth(document.getElementById('container'));

if(window.devicePixelRatio !== undefined) {
    dpr = window.devicePixelRatio;
} else {
    dpr = 1;
}

var screen_width = window.screen.width * dpr;
var screen_height = window.screen.height * dpr;

function setup(){
	
	// var myCanvas = createCanvas(1240, 640);
	if(window.innerWidth > window.innerHeight){
		//desktop
		var myCanvas = createCanvas(window.innerWidth * .98, window.innerWidth * .98 * 0.5 + 20);
		myCanvas.parent("billiards");
		myTable = new PTable(20, 20, (window.innerWidth * .98) - 40, (window.innerWidth * .98) / 20);
	}
	else{
		//mobile, rotate entire game board
		
		// sleep(1000);
		displayHeight = displayHeight - 80;
		var correctHeight = displayHeight;
		if(displayHeight / displayWidth > 2){
			correctHeight = displayWidth * 2 - 40;
		}
		print(displayWidth + " " + displayHeight + " " + correctHeight);

		var myCanvas = createCanvas(displayHeight, displayWidth);
		// rotate(PI/2);
		// translate(0,-height/2 - 20);
		myCanvas.parent("billiards");
		
		myTable = new PTable(20, 20, correctHeight - 40, correctHeight / 20);
	}

	
	
    myTable.rack();
	myTable.display();
	
	// noLoop();
}

var canMove = true;

function draw(){
	
	// if(window.innerWidth <= window.innerHeight){
	// 	//mobile
	// 	rotate(PI/2);
	// 	translate(0,-height/2 - 20);
	// }

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

		if(window.innerWidth <= window.innerHeight){
			//mobile
			// push();
			// rotate(-PI/2);
			// arrow(myTable.balls[0].getX(), myTable.balls[0].getY(), window.innerWidth-mouseX, window.innerHeight - mouseY);
			// arrow(myTable.balls[0].getX(), myTable.balls[0].getY(), window.innerHeight - mouseY, mouseX);
			if(touches[0] != null){
				arrow(myTable.balls[0].getX(), myTable.balls[0].getY(), mouseY, displayWidth - mouseX);
			}
			// pop();
		}
		else{
			//desktop
			arrow(myTable.balls[0].getX(), myTable.balls[0].getY(), mouseX, mouseY);
		}
		
		pop();
	}
	
}

function mouseReleased(){
	if(canMove == true){
		if(window.innerWidth <= window.innerHeight){
			//mobile
			var mover = createVector(mouseY - myTable.balls[0].getX(), displayWidth - mouseX - myTable.balls[0].getY());
		}
		else{
			// desktop
			var mover = createVector(mouseX - myTable.balls[0].getX(), mouseY - myTable.balls[0].getY());
		}
		
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