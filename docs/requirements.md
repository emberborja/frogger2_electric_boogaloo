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
* Directly above the grass lane is a 5 tileHeight tall road. The road has no sprite background but is just black. It has the height of 5 tileHeight tall and the width of the purple grass. On the 'road' is motor vehicles that can be found in frogger-sprites.png.

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

## Specific Game Mechanics
### Death
* Player can 'die' in the following ways:
	** When player collides with a motor vehicle
	** When player collides with water
	** When player is on aset of turtles that 'dip' under the water

### Dipping Turtles
* Certain rows of turtles selected randomly should 'dip' under the water. When a row of turtles 'dip' under the water the turtles stop being a surface and if Frogger is on them when they dip, he collides with the water and 'dies'.

### Obstacle and Surface Movement and Order
* Obstacles and Surfaces move from one side of the map to the other in the road rows and the water rows.

* The map should work and look exactly as described from the top row to the bottom:

	** The Finishing Area/'Home'
	** Medium Logs going from Left to Right
	** A Row of 2 Turtles going from Right to Left
	** Long Logs going from Right to Left
	** Small Logs going from Right to Left
	** A Row of 3 Turtles going from Right to Left
	** Purple Grass/Safe Zone
	** White Trucks going from Right to Left
	** White Dune Buggies going from Left to Right
	** Purple Cars going from Right to Left
	** White Bulldozers going from Left To Right
	** Yellow Taxis going from Right to Left
	** Purple Grass/Safe Zone Where Frogger Spawns

### Obstacle and Surface Speeds and Counts
* Each obstacle and surface has a different speed ranging from fast, medium, and slow.
	** The Yellow Taxis are slow
	** The White Bulldozers are slow
	** The Purple Cars are medium
	** The White Dune Buggies are fast
	** The White Trucks are fast
	** The Row of 3 Turtles are slow
	** The Row of  2 Turtles are fast
	** The Small logs are slow
	** The Long Logs are fast
	** The Medium Logs are medium

* Each obstacle and surface have a different maximum and minimum that are allowed on the screen at a time.
	** All motor vehicles should have a minimum of 2 vehicles per vehicle row and a maximum of 3.
	** Short logs should have a minimum of 2 short logs per short log row and a maximum of 3.
	** Medium logs should have a minimum of 3 medium logs per medium log row and a maximum of 3 and a half.
	** Long logs should have a minimum of 2 per long log row and a maximum of 2 and a half
	** The row of 3 turtles should have a minimum of 3 in that turtle row and maximum of 3 and a half.
	** The row of 2 turtles should have a minimum of 3 in that turtle row and a maximum of 4.


### The Safe Zones
* The purple grass safe zones are rows that don't have any obstacles or surfaces. It is just a row where Frogger can stop without fear of 'drowning' or becoming 'roadkill'.



TODO: This point and lower need to be revised.
## Player Characteristics

* Using the arrow keys the player must guide the frog between opposing lanes of traffic to avoid becoming 'roadkill' which results in the loss of one life.
** When a life is 'lost' one of the frog sprites, mentioned in game initialization, should be removed.

* When the player becomes 'roadkill' by being hit by a car or jumping in water where there is no log or turtle surface a death sprite should appear where the movable frog character was and the playable character should respawn at the beginning of the map.

* When the player reaches the end of the map and lands in one of the open spaces of 'home' he should respawn at the beginning of the map.

## Win Conditions
* Score should increment by 10 by for every row achieved.

* If frogger goes 'backwards' (back towards spawn) the score remains the same until he is back on the last row he gained points at.

* Colliding with an obstacle like a car or water should result in a death sprite onscreen but will not decrease score
	** Frog should reset at bottom of grid, and the life counter should be decremented.

* If five frogs make it to the top of the map and land in all five home open spaces a winning message should display
    ** If frog makes it to top of grid, frog stays and frogger won't be able to land in that home position anymore. 
    New frog is reset at bottom. Score does not reset.

## Lose Conditions
* If all lives are lost a Game Over Sprite should appear

* High score should be saved in local storage and displayed during every game
