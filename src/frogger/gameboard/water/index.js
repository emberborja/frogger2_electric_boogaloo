export default (canvasDetails) => {
    // water rows 3 through 7

    let { ctx, rowHeight, width } = canvasDetails;
    let x = 0;
    let y = canvasDetails.getRowY(3);

    ctx.fillStyle = "#4d94ff";
    ctx.fillRect(x, y, width, rowHeight * 5);
}