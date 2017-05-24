const expect = require('chai').expect;
const {Boundary: Boundary, Vector: Vector, Drone: Drone} = require('../drone.js');

describe('drone', function () {
    it('creates a new drone', function () {
        let skyNet = new Drone(false);
        expect(skyNet.active).to.equal(false);
    });
    it('should initialise start position', function () {
        let skyNet = new Drone(false);
        skyNet.setInitial(3, 2);
        expect(skyNet.initialPosition.x).to.equal(3);
        expect(skyNet.initialPosition.y).to.equal(2);
        expect(skyNet.currentPosition.x).to.equal(3);
        expect(skyNet.currentPosition.y).to.equal(2);
    });
    it('should change the current position of the drone', function () {
        let skyNet = new Drone(false);
        skyNet.setInitial(3, 2);
        skyNet.setBoundary(5,5);
        skyNet.start();
        skyNet.movement(2,'E');
        expect(skyNet.currentPosition.x).to.equal(4);
        expect(skyNet.currentPosition.y).to.equal(2);
        skyNet.movement(3,'N');
        expect(skyNet.currentPosition.x).to.equal(4);
        expect(skyNet.currentPosition.y).to.equal(3.5);
        skyNet.movement(4,'W');
        expect(skyNet.currentPosition.x).to.equal(2);
        expect(skyNet.currentPosition.y).to.equal(3.5);
        skyNet.movement(2,'S');
        expect(skyNet.currentPosition.x).to.equal(2);
        expect(skyNet.currentPosition.y).to.equal(2.5);
    });
    it('should not move until started', function () {
        let skyNet = new Drone(false);
        skyNet.setInitial(3, 2);
        skyNet.movement(2,'E');
        expect(skyNet.currentPosition.x).to.equal(3);
        expect(skyNet.currentPosition.y).to.equal(2);
        skyNet.setBoundary(5,5);
        skyNet.start();
        skyNet.movement(3,'N');
        expect(skyNet.currentPosition.x).to.equal(3);
        expect(skyNet.currentPosition.y).to.equal(3.5);
    });
    it('should not move after being shutdown', function () {
        let skyNet = new Drone(false);
        skyNet.setInitial(3, 2);
        skyNet.setBoundary(5,5);
        skyNet.start();
        skyNet.movement(2,'E');
        expect(skyNet.currentPosition.x).to.equal(4);
        expect(skyNet.currentPosition.y).to.equal(2);
        skyNet.movement(3,'N');
        expect(skyNet.currentPosition.x).to.equal(4);
        expect(skyNet.currentPosition.y).to.equal(3.5);
        skyNet.shutdown();
        skyNet.movement(4,'W');
        expect(skyNet.currentPosition.x).to.equal(4);
        expect(skyNet.currentPosition.y).to.equal(3.5);
    });
    it('should default to (0, 0) to start', function () {
        let skyNet = new Drone(false);
        skyNet.setBoundary(5,5);
        skyNet.start();
        skyNet.movement(2,'E');
        expect(skyNet.currentPosition.x).to.equal(1);
        expect(skyNet.currentPosition.y).to.equal(0);
        skyNet.movement(3,'N');
        expect(skyNet.currentPosition.x).to.equal(1);
        expect(skyNet.currentPosition.y).to.equal(1.5);
        expect(skyNet.initialPosition.x).to.equal(0);
        expect(skyNet.initialPosition.y).to.equal(0);
    });
    it('should restart with default initial position', function () {
        let skyNet = new Drone(false);
        skyNet.setInitial(3, 2);
        skyNet.setBoundary(5,5);
        skyNet.start();
        skyNet.movement(2,'E');
        skyNet.movement(3,'N');
        skyNet.shutdown();
        skyNet.movement(4,'W');
        skyNet.setBoundary(5,5);
        skyNet.restart();
        expect(skyNet.initialPosition.x).to.equal(0);
        expect(skyNet.initialPosition.y).to.equal(0);
        expect(skyNet.currentPosition.x).to.equal(0);
        expect(skyNet.currentPosition.y).to.equal(0);
        expect(skyNet.active).to.equal(true);
        expect(skyNet.speed).to.equal(0.5);
    });
    it('should alert the user if boundary not set', function () {
        let skyNet = new Drone(false);
        skyNet.start();
        skyNet.movement(2,'E');
        skyNet.movement(3,'N');
        skyNet.movement(4,'W');
        expect(skyNet.alerts.length).to.equal(1);
    });
    it('should alert if boundary exceeded and limit movement', function () {
        let skyNet = new Drone(false);
        skyNet.setInitial(3, 2);
        skyNet.setBoundary(5,5);
        skyNet.start();
        skyNet.movement(12,'W');
        expect(skyNet.currentPosition.x).to.equal(0);
        skyNet.movement(12, 'N');
        expect(skyNet.currentPosition.y).to.equal(5);
        skyNet.movement(12, 'E');
        expect(skyNet.currentPosition.x).to.equal(5);
        skyNet.movement(12, 'S');
        expect(skyNet.currentPosition.y).to.equal(0);
    });
    it('goes home if told to', function () {
        let skyNet = new Drone(false);
        skyNet.setInitial(3, 2);
        skyNet.setBoundary(10,10);
        skyNet.start();
        skyNet.movement(4,'E');
        skyNet.movement(6,'N');
        skyNet.home();
        expect(skyNet.currentPosition.x).to.equal(3);
        expect(skyNet.currentPosition.y).to.equal(2);
    });
    it('should work for movements given in degrees', function () {
        let skyNet = new Drone(true);
        skyNet.setInitial(0, 0);
        skyNet.setBoundary(10,10);
        skyNet.start();
        skyNet.movement(4, 30);
        expect(skyNet.currentPosition.x).to.be.within(0.999, 1.001);
    });
    it('should work for multiple movement calls given in degrees', function () {
        let skyNet = new Drone(true);
        skyNet.setInitial(0, 0);
        skyNet.setBoundary(100,100);
        skyNet.start();
        skyNet.movement(4, 30);
        skyNet.movement(4, 60);
        skyNet.movement(4, 90);
        skyNet.movement(4, 180);
        expect(skyNet.currentPosition.x).to.be.within(4.7, 4.8);
    });
});

describe('boundary', function () {
    it('has a Boundary class that creates a new boundary', function () {
        let boundary = new Boundary(5, 6);
        expect(boundary).to.be.instanceOf(Boundary);
        expect(boundary).to.have.property('x', 5);
        expect(boundary).to.have.property('y', 6);
    }); 
});

describe('vector', function (){
    it('has a Vector class that creates a vector', function () {
        let vec1 = new Vector(2, 4);
        let vec2 = new Vector(-3, 5);
        let vec3 = new Vector(-3, 5);
        let vec4 = vec1.multiply(2);
        let vec5 = vec1.add(vec2);
        expect(vec1).to.be.instanceOf(Vector);
        expect(vec1).to.have.property('x', 2);
        expect(vec1).to.have.property('y', 4);
        expect(Vector.equal(vec2, vec3)).to.equal(true);
        expect(vec4.x).to.equal(4);
        expect(vec4.y).to.equal(8);
        expect(vec5.x).to.equal(-1);
        expect(vec5.y).to.equal(9);
    });
});
