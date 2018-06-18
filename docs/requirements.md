# Frogger Requirements

## Tech
* HTML
* CSS
* JavaScript

## Wireframe

* Please See frogger.png

# Minimum Viable Product

## Game initialization
* The game should initialize on a grid with:
    ** A Movable Character
    ** Moving Obstacles
    ** A Score Counter
    ** A Highscore Counter
    ** Number Of Lives Display

## Player Characteristics
* Player should be able to move frog around the grid through arrow key input

## Win Conditions
* Score should increment for every row achieved

* Colliding with an obstacle like a car or water should result in a death sprite onscreen
	** Frog should reset at bottom of grid, and the life counter should be decremented.

* If all frogs make it to the top of the grid a winning message should display
    ** If frog makes it to top of grid, frog stays, and new frog is reset at bottom. Score does not reset.

## Lose Conditions
* If all lives are lost a Game Over Sprite should appear

* High score should be saved in local storage and displayed during every game
