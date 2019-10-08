export default (canvasDetails, rowid) => {

    let { ctx, width, rowHeight } = canvasDetails;
    let x = 0;
    let y = canvasDetails.getRowY(rowid);

    ctx.fillStyle = "#9932CC";
    ctx.fillRect(x, y, width, rowHeight);

}