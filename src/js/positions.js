// recibe un array con las posiciones provenientes de la spreadsheet y dibuja la grilla
export function renderPositions(positions) {
    const positionsEl = document.querySelector('#positions');

    // número máximo de partidos jugados por persona
    const maximumOfGamesPlayed = Math.max(...positions.map((playerStats) => playerStats.Jugados));
    // puntaje más alto que puede estar compartido entre varias personas
    const topScore = Math.max(...positions.map((playerStats) => playerStats.Puntos));

    positions.forEach((playerStats, index) => {
        // está primerx?
        const isTop = playerStats.Puntos === topScore;
        // indice para mostrar
        const playerIndex = index + 1;
        // construimos la URL para mostrar su foto de perfil o ponemos una por defecto
        const playerPicture = playerStats.Foto
            ? `https://avatars.io/${playerStats.Foto}`
            : 'https://placehold.it/32x32/bbbbbb?text=&nbsp;';
        // usamos un color diferente si la persona está primerx
        const scoreBackgroundColor = isTop ? 'bg-secondary' : 'bg-black-05';
        // calculamos el ancho de la barra de progreso usada como fondo de cada fila en base
        // a los puntos ganados por la persona en base al total de partidos
        const scoreBackgroundWidth = Number(
            (playerStats.Puntos / (maximumOfGamesPlayed * 3) * 100).toFixed(2)
        );

        positionsEl.insertAdjacentHTML(
            'beforeEnd',
            `<div class="b--moon-gray bb br bg-white-60 flex relative z-0">
                <div class="${scoreBackgroundColor} absolute bottom-0 left-0 right-0 top-0" style="width: ${scoreBackgroundWidth}%; z-index: -1;">
                </div>
                <div class="b--black-20 br cell-number flex items-center justify-end pa1 pa2-ns">
                    <span>${playerIndex}</span>
                </div>
                <div class="b--black-20 br cell-name flex items-center pa1 pa2-ns">
                    <div class="h2 mr1 mr3-ns w2">
                        <div class="bg-center cover h2 w2" style="background-image: url('${playerPicture}')">
                        </div>
                    </div>
                    <span class="${isTop ? 'b' : ''} truncate">${playerStats['Jugador/a']}</span>
                </div>
                <div class="b--black-20 br cell-number flex items-center justify-end pa1 pa2-ns">
                    <span>${playerStats.Jugados}</span>
                </div>
                <div class="b--black-20 br cell-number flex items-center justify-end pa1 pa2-ns">
                    <span>${playerStats.Ganados}</span>
                </div>
                <div class="b--black-20 br cell-number flex items-center justify-end pa1 pa2-ns">
                    <span>${playerStats.Empatados}</span>
                </div>
                <div class="b--black-20 br cell-number flex items-center justify-end pa1 pa2-ns">
                    <span>${playerStats.Perdidos}</span>
                </div>
                <div class="b b--black-20 cell-number flex items-center justify-end pa1 pa2-ns">
                    <span>${playerStats.Puntos}</span>
                </div>
            </div>`
        );
    });
}
