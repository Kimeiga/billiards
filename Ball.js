function Ball(location, SIZE, COLOR){
  this.myLocation = location;
  this.myForce = createVector(0, 0);
  this.S = SIZE;
  this.C = COLOR;
	this.removed = false; //set true if collides with a hole
  this.move = function(){
    this.myLocation.add(this.myForce);
    if(this.myForce.mag() > .02) this.myForce.setMag(this.myForce.mag()-0.02);
    else this.myForce = createVector();
  }
  this.Xbounce = function(){
    if(this.getX() > width/2)
    this.myForce.x = -abs(this.myForce.x);
    else this.myForce.x = abs(this.myForce.x);
  }
  this.Ybounce = function(){
    if(this.getY() > height/2)
    this.myForce.y = -abs(this.myForce.y);
    else this.myForce.y = abs(this.myForce.y);
  }
  this.polar = function(radius, angle){
    return createVector(radius*cos(angle), radius*sin(angle));
  }
  this.hit = function(force, theta){
    this.myForce.add(this.polar(force, theta));
  }
  this.collide = function(that){
    var a = this.getLocation().copy().sub(that.getLocation()).heading();
    this.myLocation = that.getLocation().copy().add(this.polar(this.S, a));
    var A1 = this.myForce.heading() - a;
    var A2 = that.myForce.heading() - a;
    var V1 = this.polar(this.myForce.mag()*cos(A1), a);
    var V2 = this.polar(that.myForce.mag()*cos(A2), a);
    this.myForce.sub(V1).add(V2);
    that.myForce.sub(V2).add(V1);
  }
  this.display = function(){
			filler(this.C);
			ellipse(this.myLocation.x, this.myLocation.y, this.S, this.S);
  }
  this.getForce = function(){
    return this.myForce;
  }
  this.setForce = function(V){
    this.myForce = V;
  }
  this.getLocation = function(){
    return this.myLocation;
  }
  this.setLocation = function(L){
    this.myLocation = L;
  }
  this.getX = function(){
    return this.myLocation.x;
  }
  this.getY = function(){
    return this.myLocation.y;
  }
	this.getSize = function(){
    return this.S;
  }
}
function filler(Color){
  switch(Color){
    case 0: fill(255); break;
    case 1: fill(150, 150, 0); break;
    case 2: fill(0, 0, 150); break;
    case 3: fill(150, 0, 0); break;
    case 4: fill(150, 0, 150); break;
    case 5: fill(250, 150, 0); break;
    case 6: fill(0, 150, 0); break;
    case 7: fill(150, 100, 50); break;
    case 8: fill(0); break;
    case 9: fill(250, 250, 50); break;
    case 10: fill(100, 100, 250); break;
    case 11: fill(250, 50, 50); break;
    case 12: fill(250, 50, 250); break;
    case 13: fill(255, 200, 50); break;
    case 14: fill(100, 250, 100); break;
    case 15: fill(200, 150, 100); break;
    default: fill(255, 0, 0);
  }
}