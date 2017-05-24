const expect = require('chai').expect;
const {Boundary: Boundary, Vector: Vector, Drone: Drone} = require('../drone.js');


describe('drone', function () {
    it('creates a new drone', function () {
        let skyNet = new Drone();
        expect(skyNet.active).to.equal(false);
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



/*
describe('boundary', function () {
    it('should set a constant given boundary', function () {
        let newBoundary = new Boundary({0:0, 10:10});
        expect(newBoundary.boundary).to.eql({0:0, 10:10});
    });
});

describe('movement', function () {
    it('should change the current position of the drone', function () {
        let moveRight = movement({4:'west'});
        let skyNet = new Drone({0:0});
        expect(moveRight).to.eql();
        expect(skyNet.currentPosition).to.eql({0:2});
    });
});
*/