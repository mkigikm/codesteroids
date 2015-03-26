# Codesteroids

[live link](http://www.matthicks.us/codesteroids)

## Description
Codesteroids is an HTML5 canvas arcade game inspired by the classic Asteroids.
The story (from the opening splash screen)
  Your javascript engine is out of control! Destroy the rogue keywords before
  they destroy you.
You pilot a ship around a circuit board, shooting at rotating keywords. When you
hit one, the character is eliminated and the word splits. Each word has its own
AI with varying levels of aggression. They will also shoot semicolons at you if
you get too close. To shoot a guided shot hit z, a spread shot with x, and use
the arrow keys to navigate.

## Design Choices
Some cool implementation details:
* Movement code is DRYed up by having all the game actors (the ship, enemies,
  and bullets) inherit from the same constructor.
* A custom vector object handles positions and headings, and has the logic for
  rotations, adding/subtracting, and other vector operations.
* Keywords coordinate movements through a doubly linked list, with the left-most
  element choosing what to do.
* Enemy AI is implemented using finite-state machines.
* All the actors have physical limitations, so they can only accelerate and turn
  so fast.

## Libraries
The only dependencies are [keymaster](https://github.com/madrobby/keymaster) for
getting input and [underscore](http://underscorejs.org/) for the array
functional helpers.

## How to Run
Go to the [live link](http://www.matthicks.us/codesteroids) or download the repo
and navigate to the file on your computer.

## Todo
I want to add `TypeError`, `SyntaxError`, etc. enemies that shoot messages like
`undefined is not a function` at the ship. I also want to add infinite loops that
suck the ship toward them.
