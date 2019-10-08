export default (canvasDetails) => {
    console.log(canvasDetails)
    let { ctx, width, rowHeight, colWidth } = canvasDetails;

    // row 1 black stripe
    let rowid = 1;
    let x = 0;
    let y = canvasDetails.getRowY(rowid);

    ctx.fillStyle = "#000";
    ctx.fillRect(x, y, width, rowHeight);

    //  Score and high score text
    ctx.font = `bold ${rowHeight / 2} VT323`;
    ctx.fillStyle = "white";

    // score in second column, middle of top row
    ctx.fillText("SCORE", canvasDetails.getColX(2), rowHeight / 2);

    // high score in 9th of 10 column, middle of top row
    ctx.fillText("HIGH SCORE", canvasDetails.getColX(9), rowHeight / 2);
}