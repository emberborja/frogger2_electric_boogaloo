import grass from './grass';
import homespace from './homeSpace';
import road from './road';
import safezone from './safezone';
import scoreUI from './scoreUI';
import water from './water';
import livesUI from './livesUI';

export default (canvasDetails) => {
    let row1 = scoreUI(canvasDetails);
    let row2 = grass(canvasDetails);
    let row3_thru_7 = water(canvasDetails);
    let row8 = safezone(canvasDetails, 8);
    let row9_thru_13 = road(canvasDetails);
    let row14 = safezone(canvasDetails, 14);
    let row15 = livesUI(canvasDetails);
}
