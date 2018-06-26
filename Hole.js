function Hole(x, y, holeSize){
	this.holeSize = holeSize;
	this.x = x;
	this.y = y;

	this.display = function(){
		fill(0);
		ellipse(this.x, this.y, this.holeSize -10, this.holeSize -10);	
	}
	this.getX = function(){
    return this.x;
  }
  this.getY = function(){
    return this.y;
  }
	this.getSize = function(){
		return this.holeSize;
  }
}