import { sprites, ctx } from "./constants";

var logbreakpoint = [527, 621, 560];
var logstartpoint = [-87, -320, -553, -181, -508, -835, -120, -386, -652];

var breakpoint = [-27, 470, -30, 470, -50, -33, -33];

var startpoint1 = [440, -30, 440, -30, 440, 440, 440];
var startpoint2 = [613, -206, 616, -206, 636, 473, 473];
var startpoint3 = [759, -382, 792, -382, 832, 506, 506];

// moved desty , destwidth and destheight elements from Obstacle objects in obstacleArray
// to own arrays for easier manipulation
var desty = [490, 450, 410, 370, 330, 250, 210, 170, 130, 120];

//flags to check for occupied home spaces
var homeSpaceArray = [0, 0, 0, 0, 0];

var destwidth = [27, 30, 30, 30, 50, 33, 87, 181, 33, 120];

var destheight = [28, 23, 23, 27, 21, 25, 24, 24, 25, 24];

// OBSTACLES
// first row: purple yello car, right to left, slow [0]
// second row: bulldozer car, left to right, slow [1]
// third row: purple car, right to left, medium speed [2]
// fourth row: green and white car, left to right, medium speed [3]
// fifth row: freight truck car, right to left, fast [4]
// sixth row: turts x 3, slow [5]
// seventh row: small log, slow [6]
// eith row: large log, fast [7]
// ninth row: turts x 2, fast [8]
// tenth row: medium logs, medium speed [9]

var obstacleArray = [
  // road obstacles
  // car row 1
  new Obstacle(
    sprites,
    80,
    262,
    27,
    28,
    startpoint1[0],
    490,
    27,
    28,
    "from right to left",
    "slow",
    breakpoint[0]
  ),
  new Obstacle(
    sprites,
    80,
    262,
    27,
    28,
    startpoint2[0],
    490,
    27,
    28,
    "from right to left",
    "slow",
    breakpoint[0]
  ),
  new Obstacle(
    sprites,
    80,
    262,
    27,
    28,
    startpoint3[0],
    490,
    27,
    28,
    "from right to left",
    "slow",
    breakpoint[0]
  ),
  // car row 2
  new Obstacle(
    sprites,
    70,
    300,
    30,
    23,
    startpoint1[1],
    450,
    30,
    23,
    "from left to right",
    "slow",
    breakpoint[1]
  ),
  new Obstacle(
    sprites,
    70,
    300,
    30,
    23,
    startpoint2[1],
    450,
    30,
    23,
    "from left to right",
    "slow",
    breakpoint[1]
  ),
  new Obstacle(
    sprites,
    70,
    300,
    30,
    23,
    startpoint3[1],
    450,
    30,
    23,
    "from left to right",
    "slow",
    breakpoint[1]
  ),
  // car row 3
  new Obstacle(
    sprites,
    10,
    265,
    30,
    23,
    startpoint1[2],
    410,
    30,
    23,
    "from right to left",
    "medium",
    breakpoint[2]
  ),
  new Obstacle(
    sprites,
    10,
    265,
    30,
    23,
    startpoint2[2],
    410,
    30,
    23,
    "from right to left",
    "medium",
    breakpoint[2]
  ),
  new Obstacle(
    sprites,
    10,
    265,
    30,
    23,
    startpoint3[2],
    410,
    30,
    23,
    "from right to left",
    "medium",
    breakpoint[2]
  ),
  // car row 4
  new Obstacle(
    sprites,
    45,
    263,
    30,
    27,
    startpoint1[3],
    370,
    30,
    27,
    "from left to right",
    "medium",
    breakpoint[3]
  ),
  new Obstacle(
    sprites,
    45,
    263,
    30,
    27,
    startpoint2[3],
    370,
    30,
    27,
    "from left to right",
    "medium",
    breakpoint[3]
  ),
  new Obstacle(
    sprites,
    45,
    263,
    30,
    27,
    startpoint3[3],
    370,
    30,
    27,
    "from left to right",
    "medium",
    breakpoint[3]
  ),
  // car row 5
  new Obstacle(
    sprites,
    105,
    300,
    50,
    21,
    startpoint1[4],
    330,
    50,
    21,
    "from right to left",
    "fast",
    breakpoint[4]
  ),
  new Obstacle(
    sprites,
    105,
    300,
    50,
    21,
    startpoint2[4],
    330,
    50,
    21,
    "from right to left",
    "fast",
    breakpoint[4]
  ),
  new Obstacle(
    sprites,
    105,
    300,
    50,
    21,
    startpoint3[4],
    330,
    50,
    21,
    "from right to left",
    "fast",
    breakpoint[4]
  ),
  // water obstacles
  // water row 1
  new Obstacle(
    sprites,
    14,
    405,
    33,
    25,
    startpoint1[5],
    250,
    33,
    25,
    "from right to left",
    "slow",
    breakpoint[5]
  ),
  new Obstacle(
    sprites,
    14,
    405,
    33,
    25,
    startpoint2[5],
    250,
    33,
    25,
    "from right to left",
    "slow",
    breakpoint[5]
  ),
  new Obstacle(
    sprites,
    14,
    405,
    33,
    25,
    startpoint3[5],
    250,
    33,
    25,
    "from right to left",
    "slow",
    breakpoint[5]
  ),
  // water row 2
  new Obstacle(
    sprites,
    6,
    228,
    87,
    24,
    logstartpoint[0],
    210,
    87,
    24,
    "from left to right",
    "slow",
    logbreakpoint[0]
  ),
  new Obstacle(
    sprites,
    6,
    228,
    87,
    24,
    logstartpoint[1],
    210,
    87,
    24,
    "from left to right",
    "slow",
    logbreakpoint[0]
  ),
  new Obstacle(
    sprites,
    6,
    228,
    87,
    24,
    logstartpoint[2],
    210,
    87,
    24,
    "from left to right",
    "slow",
    logbreakpoint[0]
  ),
  // water row 3
  new Obstacle(
    sprites,
    6,
    164,
    181,
    24,
    logstartpoint[3],
    170,
    181,
    24,
    "from left to right",
    "fast",
    logbreakpoint[1]
  ),
  new Obstacle(
    sprites,
    6,
    164,
    181,
    24,
    logstartpoint[4],
    170,
    181,
    24,
    "from left to right",
    "fast",
    logbreakpoint[1]
  ),
  new Obstacle(
    sprites,
    6,
    164,
    181,
    24,
    logstartpoint[5],
    170,
    181,
    24,
    "from left to right",
    "fast",
    logbreakpoint[1]
  ),
  // water row 4
  new Obstacle(
    sprites,
    14,
    405,
    33,
    25,
    startpoint1[6],
    130,
    33,
    25,
    "from right to left",
    "fast",
    breakpoint[6]
  ),
  new Obstacle(
    sprites,
    14,
    405,
    33,
    25,
    startpoint2[6],
    130,
    33,
    25,
    "from right to left",
    "fast",
    breakpoint[6]
  ),
  new Obstacle(
    sprites,
    14,
    405,
    33,
    25,
    startpoint3[6],
    130,
    33,
    25,
    "from right to left",
    "fast",
    breakpoint[6]
  ),
  // water row 5
  new Obstacle(
    sprites,
    6,
    196,
    120,
    24,
    logstartpoint[6],
    90,
    120,
    24,
    "from left to right",
    "medium",
    logbreakpoint[2]
  ),
  new Obstacle(
    sprites,
    6,
    196,
    120,
    24,
    logstartpoint[7],
    90,
    120,
    24,
    "from left to right",
    "medium",
    logbreakpoint[2]
  ),
  new Obstacle(
    sprites,
    6,
    196,
    120,
    24,
    logstartpoint[8],
    90,
    120,
    24,
    "from left to right",
    "medium",
    logbreakpoint[2]
  )
];

function Obstacle(
  source,
  sourcex,
  sourcey,
  sourcewidth,
  sourceheight,
  destx,
  desty,
  destwidth,
  destheight,
  direction,
  speed,
  reset
) {
  this.s = source;
  this.sx = sourcex;
  this.sy = sourcey;
  this.sw = sourcewidth;
  this.sh = sourceheight;
  this.dx = destx;
  this.dy = desty;
  this.dw = destwidth;
  this.dh = destheight;
  this.direction = direction;
  this.speed = speed;
  this.resetAtXvalue = reset;
  // draws the obstacle
  this.draw = function() {
    ctx.drawImage(
      this.s,
      this.sx,
      this.sy,
      this.sw,
      this.sh,
      this.dx,
      this.dy,
      this.dw,
      this.dh
    );
  };
  // updates the obstacle to show movement
  this.update = function() {
    if (this.direction == "from left to right") {
      if (this.speed == "slow") {
        this.dx += 0.5;
        if (
          this.dx > this.resetAtXvalue &&
          this.resetAtXvalue === logbreakpoint[0]
        ) {
          this.dx = -174;
        }
        if (
          this.dx > this.resetAtXvalue &&
          this.resetAtXvalue != logbreakpoint[0]
        ) {
          this.dx = -30;
        }
      }
      if (this.speed == "medium") {
        this.dx += 1;
        if (
          this.dx > this.resetAtXvalue &&
          this.resetAtXvalue === logbreakpoint[2]
        ) {
          this.dx = -240;
        }
        if (
          this.dx > this.resetAtXvalue &&
          this.resetAtXvalue != logbreakpoint[2]
        ) {
          this.dx = -30;
        }
      }
      if (this.speed == "fast") {
        this.dx += 1.25;
        if (
          this.dx > this.resetAtXvalue &&
          this.resetAtXvalue === logbreakpoint[1]
        ) {
          this.dx = -362;
        }
        if (
          this.dx > this.resetAtXvalue &&
          this.resetAtXvalue != logbreakpoint[1]
        ) {
          this.dx = -30;
        }
      }
    }
    if (this.direction == "from right to left") {
      if (this.speed == "slow") {
        this.dx -= 0.5;
        if (this.dx < this.resetAtXvalue) {
          this.dx = 470;
        }
      }
      if (this.speed == "medium") {
        this.dx -= 1;
        if (this.dx < this.resetAtXvalue) {
          this.dx = 470;
        }
      }
      if (this.speed == "fast") {
        this.dx -= 1.25;
        if (this.dx < this.resetAtXvalue) {
          this.dx = 490;
        }
      }
    }
    this.draw();
  };
}

export {
  logbreakpoint,
  logstartpoint,
  breakpoint,
  startpoint1,
  startpoint2,
  startpoint3,
  desty,
  homeSpaceArray,
  destwidth,
  destheight,
  obstacleArray
};
