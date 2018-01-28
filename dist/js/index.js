const errorEl = document.querySelector('#error');
const loadingEl = document.querySelector('#loading');
const rowsContainerEl = document.querySelector('#rows-container');
const rowsEl = document.querySelector('#rows');

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
                    `<div class="b--black-20 bb bg-white flex relative z-0">
                        <div class="${
                            playerStats.Puntos === topScore ? 'bg-washed-yellow' : 'bg-black-05'
                        } absolute bottom-0 left-0 right-0 top-0" style="width: ${scoreBackgroundWidth}%; z-index: -1;"></div>
                        <div class="b--black-20 br cell-number flex items-center justify-end pa1 pa2-ns">
                            <span>${index + 1}</span>
                        </div>
                        <div class="b--black-20 br cell-name flex items-center pa1 pa2-ns">
                            <div class="h2 mr1 mr3-ns w2">
                                <div class="bg-center cover h2 w2" style="background-image: url('${
                                    playerStats.Twitter
                                        ? `https://avatars.io/twitter/${playerStats.Twitter}`
                                        : 'https://placehold.it/32x32/b9d7ea?text=&nbsp;'
                                }')">
                                </div>
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
            rowsContainerEl.classList.remove('dn');
        })
        .catch(function(error) {
            loadingEl.classList.add('dn');
            errorEl.classList.remove('dn');

            console.error(error);
        });
}
