export default (canvasDetails) => {
    // road rows 9 - 13

    let { ctx, width, rowHeight } = canvasDetails;
    let rowid = 9;
    let x = 0;
    let y = canvasDetails.getRowY(rowid);

    ctx.fillStyle = "#404040";
    ctx.fillRect(x, y, width, rowHeight * 5);
}