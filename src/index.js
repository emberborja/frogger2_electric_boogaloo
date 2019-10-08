import setup from './frogger/setup/index';
import gameboard from './frogger/gameboard/index';

; (function () {

  let Frogger = function (containerId, containerSize = {}) {

    let canvasDetails = setup(containerId);
    if (!canvasDetails) return;

    gameboard(canvasDetails);

    /* TODO 
    create the board,
    obstacle sprites, 
    animate, 
    obstacles move
    frog sprite and frog move
    collisions
    scoring
    - make all css in-line?
    */

  };

  /* expose constructor globally */
  window.Frogger = Frogger;

})();