export default class frog {
  constructor() {
    // Original Frog Size from Sprite Sheet
    this.frog = {
      width: 30,
      height: 22,
      x: 200,
      y: 530,
      status: "up"
    };
  }

  // Frog movement
  move(keypress) {
    if (keypress == 37 && isMoveOnScreen(frogX - rowHeight, frogY)) {
      frogX -= rowHeight;
      status = "left";
    } else if (keypress == 38 && isMoveOnScreen(frogX, frogY - rowHeight)) {
      frogY -= rowHeight;
      status = "up";
      currentScore += 10;
    } else if (keypress == 39 && isMoveOnScreen(frogX + rowHeight, frogY)) {
      frogX += rowHeight;
      status = "right";
    } else if (keypress == 40 && isMoveOnScreen(frogX, frogY + rowHeight)) {
      frogY += rowHeight;
      status = "down";
      currentScore -= 10;
    } else if (keypress == 32) {
      frogY = frogY;
      status = "up";
    }
  }
}
