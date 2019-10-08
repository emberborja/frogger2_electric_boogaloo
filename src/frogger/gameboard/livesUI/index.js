export default (canvasDetails) => {

    let { ctx, width, rowHeight } = canvasDetails;

    // row 15 black stripe
    let rowid = 15;
    let x = 0;
    let y = canvasDetails.getRowY(rowid);

    ctx.fillStyle = "#000";
    ctx.fillRect(x, y, width, rowHeight);

}