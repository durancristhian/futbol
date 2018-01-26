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
                        <div class="absolute bottom-0 b--black-20 left-0 o-30 right-0 top-0" style="background-color: ${
                            playerStats.Puntos === maxPoints ? '#62A87C' : '#FFE45E'
                        }; width: ${statBarWidth}%; z-index: -1;"></div>
                        <div class="black-50 cell-1 pa2 tr">${index + 1}</div>
                        <div class="b cell-2 flex items-center pa2 truncate">
                            ${
                                playerStats.Twitter
                                    ? `<img src="https://avatars.io/twitter/${
                                          playerStats.Twitter
                                      }" alt="${playerStats['Jugador/a']}" class="h2 mr2 w2" />`
                                    : '<span class="h2 lh-double mr2 tc w2">😊</span>'
                            }
                            ${playerStats['Jugador/a']}${!statBarWidth ? ' 💀' : ''}
                        </div>
                        <div class="cell-3 pa2">${playerStats.Jugados}</div>
                        <div class="cell-4 pa2">${playerStats.Ganados}</div>
                        <div class="cell-5 pa2">${playerStats.Empatados}</div>
                        <div class="cell-6 pa2">${playerStats.Perdidos}</div>
                        <div class="b cell-7 pa2">${playerStats.Puntos}</div>
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
