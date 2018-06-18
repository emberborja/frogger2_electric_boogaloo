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
    ** A Movable Frog Character
    ** Moving Obstacles.
    ** A Score Counter
    ** A Highscore Counter
    ** 3 frog sprites depicting number of lives
* Each line in the grid should be the same height that we will call TODO:tileHeight and be 16 TODO:tileWidth wide.

## Map Characteristics

### 1) Frog Character Starting Location
* The frog will start at the bottom of the screen before a road of moving vehicles in a safe strip of purple grass found in frogger-sprites.png.

### 2) The Road
* Directly above the grass lane is a 6 vehicle wide road. The road has no sprite background but is just black. It has the height of 6 tileHeight tall and the width of the purple grass. On the 'road' is motor vehicles that can be found in frogger-sprites.png.

#### Motor Vehicles
* purple cars
* white semi-trucks
* white dune buggies
* white bulldozers
* yellow taxis

### 3) Another Line Of Purple Grass
* After the 6 lane road there should be another safe strip of purple grass.

### 4) Water
* Directly above the second safe strip of grass there is a body of 'water' that is 5 tileHeight tall and is the same width as the rest of the map. The water has no sprite background but is a dark blue. By jumping on swiftly moving logs and the backs of turtles the player can guide frogger to the safety of his 'home'.

#### Water Surfaces
* 3 Turtles wide turtle lines
* 2 Turtles wide turtle lines
* Short Logs
* Medium Logs
* Long Logs

### 5) Finishing Area/'Home'
* At the very top of the map is the finishing area/'home'. Using the green grass area with 5 empty spaces. In between each space is a lilly pad which is found in TODO:file.png

## Game Screen Around The Map
* Right above the map there should be a the string 'SCORE' on the left and 'HIGH SCORE' on the right. Right below the 'SCORE' should be the current score and below the 'HIGH SCORE' should be the high score that is saved in local storage.
* Right below the map on the left should be the 3 frog sprite player lives.

TODO: Add Game Mechanics like the dipping turtles, the obstacle/surface movement, and the ways to die.

TODO: This point and lower need to be revised.
## Player Characteristics

* Using the arrow keys the player must guide the frog between opposing lanes of traffic to avoid becoming 'roadkill' which results in the loss of one life.
** When a life is 'lost' one of the frog sprites, mentioned in game initialization, should be removed

* When the player becomes 'roadkill' by being hit by a car or jumping in water where there is no log or turtle surface a death sprite should appear where the movable frog character was.

## Win Conditions
* Score should increment for every row achieved

* Colliding with an obstacle like a car or water should result in a death sprite onscreen
	** Frog should reset at bottom of grid, and the life counter should be decremented.

* If all frogs make it to the top of the grid a winning message should display
    ** If frog makes it to top of grid, frog stays, and new frog is reset at bottom. Score does not reset.

## Lose Conditions
* If all lives are lost a Game Over Sprite should appear

* High score should be saved in local storage and displayed during every game
