let errorEl = document.querySelector('#error');
let loadingEl = document.querySelector('#loading');
let resultsEl = document.querySelector('#results');
let rowsEl = document.querySelector('#rows');

window.addEventListener('load', init);

function init() {
    gsheets
        .getWorksheetById('1W5ihCnbzRV3UHa9lMCcJNOtFKWHVUI_0P5SKcdF4wig', 'oce51o4')
        .then(function(worksheet) {
            return worksheet.data;
        })
        .then(function(playersStats) {
            errorEl.classList.add('dn');
            loadingEl.classList.add('dn');

            const maxPlayedMatch = Math.max(
                ...playersStats.map(function(playerStats) {
                    return playerStats.Jugados;
                })
            );

            const maxPoints = Math.max(
                ...playersStats.map(function(playerStats) {
                    return playerStats.Puntos;
                })
            );

            playersStats.forEach(function(playerStats, index) {
                const statBarWidth = Number(
                    (playerStats.Puntos / (maxPlayedMatch * 3) * 100).toFixed(2)
                );

                rowsEl.insertAdjacentHTML(
                    'beforeEnd',
                    `<div class="b--black-20 bb flex relative">
                        <div class="absolute bottom-0 b--black-20 left-0 o-20 right-0 top-0" style="background-color: ${
                            playerStats.Puntos === maxPoints ? '#357EDD' : 'rgba(0, 0, 0, 0.2)'
                        }; width: ${statBarWidth}%; z-index: -1;"></div>
                        <div class="cell-1 flex items-center justify-end pa1 pa3-ns">
                            <span>${index + 1}</span>
                        </div>
                        <div class="cell-2 flex fw5 items-center pa1 pa3-ns">
                            ${
                                playerStats.Twitter
                                    ? `<img src="https://avatars.io/twitter/${
                                          playerStats.Twitter
                                      }" alt="${
                                          playerStats['Jugador/a']
                                      }" class="h2 mr1 mr3-ns w2" />`
                                    : '<span class="h2 lh-double mr1 mr3-ns tc w2">😊</span>'
                            }
                            <span class="truncate">${playerStats['Jugador/a']}</span>
                            ${
                                playerStats.Puntos === maxPoints
                                    ? '<span class="h2 lh-double ml1 ml3-ns tc w2">🏆</span>'
                                    : ''
                            }
                        </div>
                        <div class="cell-3 flex items-center pa1 pa3-ns">
                            <span>${playerStats.Jugados}</span>
                        </div>
                        <div class="cell-4 flex items-center pa1 pa3-ns">
                            <span>${playerStats.Ganados}</span>
                        </div>
                        <div class="cell-5 flex items-center pa1 pa3-ns">
                            <span>${playerStats.Empatados}</span>
                        </div>
                        <div class="cell-6 flex items-center pa1 pa3-ns">
                            <span>${playerStats.Perdidos}</span>
                        </div>
                        <div class="cell-7 flex fw5 items-center pa1 pa3-ns">
                            <span>${playerStats.Puntos}</span>
                        </div>
                    </div>`
                );
            });

            resultsEl.classList.remove('visibility-hidden');
        })
        .catch(function(error) {
            loadingEl.classList.add('dn');
            errorEl.classList.remove('visibility-hidden');

            console.error(error);
        });
}
