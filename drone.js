//const movement = require('./movement.js');

class Drone {
   constructor () {
        this.initialPosition = new Vector (0, 0);
        this.active = false;
        this.currentPosition = this.initialPosition;
        this.speed = 0.5;
        this.boundaryIsSet = false;
        this.alerts = [];
    }
    movement (time, dir) {
        if (this.active) {
            const dirs = {'N':[0,1], 'S':[0,-1],'E':[1,0], 'W':[-1,0]};
            const move = new Vector(dirs[dir][0], dirs[dir][1]);
            const moveBy = move.multiply(time * this.speed);
            const finalPosition = this.currentPosition.add(moveBy);
            if (finalPosition.x < 0) {
                finalPosition.x = 0;
                this.alerts.push('Boundary exceeded');
            } else if (finalPosition.x > this.boundary.x) {
                finalPosition.x = this.boundary.x;
                this.alerts.push('Boundary exceeded');
            }
            if (finalPosition.y < 0) {
                finalPosition.y = 0;
                this.alerts.push('Boundary exceeded');
            } else if (finalPosition.y > this.boundary.y) {
                finalPosition.y = this.boundary.y;
                this.alerts.push('Boundary exceeded');
            }
            this.currentPosition = finalPosition;
        }
    }
    setInitial (x,y) {
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
            this.initialPosition = new Vector (0, 0);
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