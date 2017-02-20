## Northcoders Drone

At Northcoders we want to have an office drone, so we thought we would ask our students to write a program make it fly autonomously. What could go wrong?

Using the Object Oriented Programming skills you learned this week, we want you to implement a Drone class (and all the auxiliary classes you could need) following these specifications:

- The drone has a single speed of 0.5 m/s, which you can assume it reaches instantaneously and it operates at a fixed height of 2 meters.
- The drone can move in different directions depending on its navigation module.
- The drone should support two different navigation modes: basic and advanced. Basic only supports movement in angles of 0, 90, 180 and 270 degrees. The advanced mode supports movement in full 360 degrees.
- The drone should have a series of features controlled through a command interface:

### Management Commands
- Start: starts the drone
- Boundary (x, y): defines the drone's navigable, rectangular border where (x, y) is the top-right corner and (0, 0) is the lower-left corner (origin).
- Initial Position (x, y): define the initial position of the drone (defaults to (0, 0)).
- Restart: restart the drone, losing boundary and initial postition
- Shutdown: shutdown the drone

The system must be started and a boundary must be set before any Action commands can be issued.

#### Action Commands
- Toggle lights: turns the lights on/off
- Flash lights: flash the lights
- Alert (t): sound the horn for t seconds
- Home: navigate Home
- Move (t, d): move t seconds in d direction.

The Drone should accept any Move instruction but it should never go beyond the configured Boundary.

If it receives an instruction that results in it crossing the boundary it will go as far as it can and then sound the horn 3 times.

Boundary detection relies on the Drone tracking its movement and knowing its current coordinates in relation to the boundaries.

### Goals

- Spend time designing your object constructors. Identify all the "things" in the problem and decide if they should have their own constructor. Think about which objects share methods and how would you  implement that.
- Research the problem domain. Familiarise yourself with the Maths required to solve different problems.
- Implement the Drone software logic, providing a test suite, that uses the Command Interface and asserts using the state of the Drone.

We recommend implementing the movement logic synchronously first (Day 1) and refactor it later to be asynchronous (Day 2).

### Extra Credit

- Refactor your Move functionality to optionally accept an array of movement commands to be executed in series, making the drone follow a path.
- How could you visualise the drone's movement? Research visualisation libraries (like [P5.js](http://p5js.org/) or [Paper.js](http://paperjs.org/)) and see if you can learn the basics.
- Think about what other features you could add to the drone. Get creative (please don't make it fire missiles).

### Learning Objectives

- Practice the OOP skills you've learned this week. Learn to plan a Class hierarchy and design objects interfaces.
- Get introduced to asynchronous programming.
- Learn how to explore a problem's domain.
- Familiarise yourself with some vector maths, trigonometry and kinematics.
