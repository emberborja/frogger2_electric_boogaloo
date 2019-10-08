export default (canvasDetails) => {

    let { ctx, width, rowHeight } = canvasDetails;

    // grass is second row from the top
    let rowid = 2;
    let x = 0;
    let y = canvasDetails.getRowY(rowid);

    ctx.fillStyle = 'green';
    ctx.fillRect(x, y, width, rowHeight);
}