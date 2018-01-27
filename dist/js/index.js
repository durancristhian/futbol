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
                        <div class="absolute bottom-0 left-0 o-20 right-0 top-0" style="background-color: ${
                            playerStats.Puntos === topScore ? '#357EDD' : 'rgba(0, 0, 0, 0.2)'
                        }; width: ${scoreBackgroundWidth}%; z-index: -1;"></div>
                        <div class="b--black-20 br cell-1 flex items-center justify-end pa1 pa2-ns">
                            <span>${index + 1}</span>
                        </div>
                        <div class="b--black-20 br cell-2 flex fw5 items-center pa1 pa2-ns">
                            <img src="${
                                playerStats.Twitter
                                    ? `https://avatars.io/twitter/${playerStats.Twitter}`
                                    : 'https://placehold.it/32x32/AAAAAA?text=&nbsp;'
                            }" alt="${playerStats['Jugador/a']}" class="h2 mr1 mr3-ns w2"/>
                            <span class="truncate">${playerStats['Jugador/a']}</span>
                        </div>
                        <div class="b--black-20 br cell-3 flex items-center pa1 pa2-ns">
                            <span>${playerStats.Jugados}</span>
                        </div>
                        <div class="b--black-20 br cell-4 flex items-center pa1 pa2-ns">
                            <span>${playerStats.Ganados}</span>
                        </div>
                        <div class="b--black-20 br cell-5 flex items-center pa1 pa2-ns">
                            <span>${playerStats.Empatados}</span>
                        </div>
                        <div class="b--black-20 br cell-6 flex items-center pa1 pa2-ns">
                            <span>${playerStats.Perdidos}</span>
                        </div>
                        <div class="b--black-20 br cell-7 flex fw5 items-center pa1 pa2-ns">
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
