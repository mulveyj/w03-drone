//const movement = require('./movement.js');

class Drone {
   constructor () {
        this.initialPosition = undefined;
        this.active = false;
        this.currentPosition = undefined;
        this.speed = 0.5;
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
        return vec1.x === vec2.x && vec1.y === vec2.y;
    }

}

class Boundary {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
}



module.exports = {Boundary: Boundary, Vector: Vector, Drone: Drone};