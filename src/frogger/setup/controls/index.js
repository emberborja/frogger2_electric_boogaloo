export default (container) => {

    let controlsDiv = document.createElement('DIV');

    controlsDiv.setAttribute('style',
        `text-align: center;
        position: absolute;
        z-index: 2;
        top: 90%;
        left: 40%;
        display: none;`
    );

    let gameButton = document.createElement('BUTTON');

    gameButton.innerHTML = 'NEW GAME?';

    gameButton.setAttribute('style', `
        font-family: "VT323", monospace;
        font-size: xx-large;
        color: red;
        background-color: black;
        padding: 0.25rem 0.5rem;
        border-style: none;`
    );

    controlsDiv.appendChild(gameButton);
    container.appendChild(controlsDiv);

    // newGameBtn.onclick = newGame;
}

