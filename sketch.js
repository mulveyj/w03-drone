function setup () {
    createCanvas(640, 480);
    background(255, 10, 45);

}

function draw () {
    background(255, 10, 45);
    noFill();
    rect(skyNet.boundary.x, skyNet.boundary.y, skyNet.boundary.w, skyNet.boundary.h);
    fill(125,56,87);
    ellipse(skyNet.currentPosition.x, skyNet.currentPosition.y, 15, 15);
    
    skyNet.updatePosition();
}