// const movement = require('./movement.js');

class Drone {
  constructor () {
    this.initialPosition = new Vector(0, 0);
    this.active = false;
    this.currentPosition = this.initialPosition;
    this.finalPosition = undefined;
    this.speed = 0.5;
    this.boundaryIsSet = false;
    this.alerts = [];
    this.moveBy = undefined;
  }
  movement (time, dir) {
    if (this.active) {
        const degree = Math.PI / 180;
        const dirs = [Math.round(Math.sin(dir * degree) * 100), -Math.round(Math.cos(dir * degree) * 100)];
        const move = new Vector(dirs[0], dirs[1]);
        this.moveBy = move.multiply(time * this.speed / 30);
        const totalMove = move.multiply(time * this.speed);
        this.finalPosition = this.currentPosition.add(totalMove);
        if (this.finalPosition.x < this.boundary.x) {
          this.finalPosition.x = this.boundary.x;
          this.alerts.push('Boundary exceeded');
        } else if (this.finalPosition.x > this.boundary.x + this.boundary.w) {
          this.finalPosition.x = this.boundary.x + this.boundary.w;
          this.alerts.push('Boundary exceeded');
        } else {
          this.finalPosition.x = +this.finalPosition.x.toFixed(3);
        }
        if (this.finalPosition.y < this.boundary.y) {
          this.finalPosition.y = this.boundary.y;
          this.alerts.push('Boundary exceeded');
        } else if (this.finalPosition.y > this.boundary.y + this.boundary.h) {
          this.finalPosition.y = this.boundary.y + this.boundary.h;
          this.alerts.push('Boundary exceeded');
        } else {
          this.finalPosition.y = +this.finalPosition.y.toFixed(3);
        }
        // this.currentPosition = this.finalPosition; 
    }
  }

  updatePosition () {
    if (!Vector.equal(this.currentPosition, this.finalPosition)) {
      this.currentPosition = this.currentPosition.add(this.moveBy);
    }
  }

  setInitial (x, y) {
    let initial = new Vector(this.boundary.x + x, this.boundary.y + y);
    this.initialPosition = initial;
    this.currentPosition = initial;
  }
  start () {
    if (this.boundaryIsSet) {
      this.active = true;
    } else {
      this.alerts.push('Start attempted without boundary');
    }
  }
  shutdown () {
    this.active = false;
    this.boundary = undefined;
    this.boundaryIsSet = false;
  }
  restart () {
    if (this.boundaryIsSet) {
      this.initialPosition = new Vector(0, 0);
      this.active = true;
      this.currentPosition = this.initialPosition;
      this.speed = 0.5;
    } else {
      this.alerts.push('Restart attempted without boundary');
    }
  }
  setBoundary (x, y, w, h) {
    this.boundary = new Boundary(x, y, w, h);
    this.boundaryIsSet = true;
  }
  home () {
    this.currentPosition = this.initialPosition;
  }
}

class Vector {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
  add (vec) {
    return new Vector(this.x + vec.x, this.y + vec.y);
  }
  multiply (k) {
    return new Vector(k * this.x, k * this.y);
  }
  static equal (vec1, vec2) {
    return Math.abs(vec1.x - vec2.x) < 0.5 && Math.abs(vec1.y - vec2.y) < 0.5;
  }
}

class Boundary {
  constructor (x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}

let skyNet = new Drone();
skyNet.setBoundary(50, 50, 400, 400);
skyNet.setInitial(200, 200);
skyNet.start();
skyNet.movement(2, 90);


//console.log(skyNet.boundary.x, skyNet.boundary.y);
// module.exports = {Boundary: Boundary, Vector: Vector, Drone: Drone};
