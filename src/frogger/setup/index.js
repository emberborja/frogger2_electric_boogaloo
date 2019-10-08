import checkForCanvas from "./canvas/checkForCanvas";
import createCanvasElement from './canvas/createCanvasElement';
import addControlsUi from './controls/index';

export default (containerId) => {

    let container = document.getElementById(containerId);

    if (typeof (container) != 'undefined' && container != null) {

        container.setAttribute('style',
            `text-align: center;
            position: relative;
            z-index: 1;`
        );

        let canvasElementExists = checkForCanvas(container);

        const canvasDetails = canvasElementExists || createCanvasElement(container);

        addControlsUi(container);

        canvasDetails.rowHeight = canvasDetails.height / 15;

        canvasDetails.colWidth = canvasDetails.width / 10;

        canvasDetails.ctx = canvasDetails.canvas.getContext("2d");

        canvasDetails.getRowY = function (rowid) { return (this.rowHeight * rowid) - this.rowHeight };

        canvasDetails.getColX = function (colid) { return (this.colWidth * colid) - this.colWidth };

        return canvasDetails;

    } else {
        console.log('to use Frogger you need to use a <div> with id= game-div');
    }

}
