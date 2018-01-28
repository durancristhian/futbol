let errorEl = document.querySelector('#error');
let headersEl = document.querySelector('#headers');
let loadingEl = document.querySelector('#loading');
let rowsContainerEl = document.querySelector('#rows-container');
let rowsEl = document.querySelector('#rows');

window.addEventListener('load', init);

function init() {
    gsheets
        .getWorksheetById('1W5ihCnbzRV3UHa9lMCcJNOtFKWHVUI_0P5SKcdF4wig', 'oce51o4')
        .then(function(worksheet) {
            return worksheet.data;
        })
        .then(function(playersStats) {
            const maximumOfGamesPlayed = Math.max(
                ...playersStats.map(function(playerStats) {
                    return playerStats.Jugados;
                })
            );

            const topScore = Math.max(
                ...playersStats.map(function(playerStats) {
                    return playerStats.Puntos;
                })
            );

            playersStats.forEach(function(playerStats, index) {
                const scoreBackgroundWidth = Number(
                    (playerStats.Puntos / (maximumOfGamesPlayed * 3) * 100).toFixed(2)
                );

                rowsEl.insertAdjacentHTML(
                    'beforeEnd',
                    `<div class="b--black-20 bb flex relative">
                        <div class="absolute bottom-0 left-0 right-0 top-0" style="background-color: ${
                            playerStats.Puntos === topScore ? '#D3EBF2' : 'rgba(0, 0, 0, 0.05)'
                        }; width: ${scoreBackgroundWidth}%; z-index: -1;"></div>
                        <div class="b--black-20 br cell-number flex items-center justify-end pa1 pa2-ns">
                            <span>${index + 1}</span>
                        </div>
                        <div class="b--black-20 br flex flex-auto items-center pa1 pa2-ns">
                            <div class="h2 mr1 mr3-ns overlay-blue w2">
                                <img src="${
                                    playerStats.Twitter
                                        ? `https://avatars.io/twitter/${playerStats.Twitter}`
                                        : 'https://placehold.it/32x32/AAAAAA?text=&nbsp;'
                                }" alt="${playerStats['Jugador/a']}" class="grayscale"/>
                            </div>
                            <span class="${playerStats.Puntos === topScore ? 'b' : ''} truncate">${
                        playerStats['Jugador/a']
                    }</span>
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
                        <div class="b b--black-20 br cell-number flex items-center justify-end pa1 pa2-ns">
                            <span>${playerStats.Puntos}</span>
                        </div>
                    </div>`
                );
            });

            loadingEl.classList.add('dn');
            headersEl.classList.remove('dn');
            rowsContainerEl.classList.remove('dn');
        })
        .catch(function(error) {
            loadingEl.classList.add('dn');
            errorEl.classList.remove('dn');

            console.error(error);
        });
}
