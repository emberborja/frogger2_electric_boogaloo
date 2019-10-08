export default (container) => {
    let canvasElement = document.createElement('canvas');
    canvasElement.setAttribute('id', 'game');
    canvasElement.setAttribute('width', '440');
    canvasElement.setAttribute('height', '600');
    canvasElement.setAttribute('style', 'border: 1px solid black;');
    container.appendChild(canvasElement);
    return { id: 'game', width: 440, height: 600 }
}