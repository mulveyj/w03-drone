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
        const dirs = [Math.sin(dir * degree), Math.cos(dir * degree)]
        const move = new Vector(dirs[0], dirs[1]);
        this.moveBy = move.multiply(time * this.speed / 30);
        const totalMove = move.multiply(time * this.speed);
        this.finalPosition = this.currentPosition.add(totalMove);
        if (this.finalPosition.x < 0) {
          this.finalPosition.x = 0;
          this.alerts.push('Boundary exceeded');
        } else if (this.finalPosition.x > this.boundary.x) {
          this.finalPosition.x = this.boundary.x;
          this.alerts.push('Boundary exceeded');
        } else {
          this.finalPosition.x = +this.finalPosition.x.toFixed(3);
        }
        if (this.finalPosition.y < 0) {
          this.finalPosition.y = 0;
          this.alerts.push('Boundary exceeded');
        } else if (this.finalPosition.y > this.boundary.y) {
          this.finalPosition.y = this.boundary.y;
          this.alerts.push('Boundary exceeded');
        } else {
          this.finalPosition.y = +this.finalPosition.y.toFixed(3);
        }
        this.currentPosition = this.finalPosition; 
    }
  }

  updatePosition () {
    if (!Vector.equal(this.currentPosition, this.finalPosition)) {
      this.currentPosition = this.currentPosition.add(moveBy);
    }
  }

  setInitial (x, y) {
    let initial = new Vector(x, y);
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
  setBoundary (x, y) {
    this.boundary = new Boundary(x, y);
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
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
}

module.exports = {Boundary: Boundary, Vector: Vector, Drone: Drone};
