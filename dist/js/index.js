const SPREADSHEET_ID = '1W5ihCnbzRV3UHa9lMCcJNOtFKWHVUI_0P5SKcdF4wig';
const WORKSHEET_ID = 'oce51o4';

const errorEl = document.querySelector('#error');
const html = document.querySelector('html');
const loadingEl = document.querySelector('#loading');
const rowsContainerEl = document.querySelector('#rows-container');
const rowsEl = document.querySelector('#rows');
const themeTriggersEl = document.querySelectorAll('[data-theme]');

const theme = localStorage.getItem('theme');
assignTheme(theme ? theme : 'theme-yellow');

window.addEventListener('load', init);

function init() {
    gsheets
        .getWorksheetById(SPREADSHEET_ID, WORKSHEET_ID)
        .then(worksheet => worksheet.data)
        .then(playersStats => {
            render([...playersStats]);

            loadingEl.classList.add('dn');
            rowsContainerEl.classList.remove('dn');

            assignThemeTriggersListeners();

        })
        .catch(error => {
            loadingEl.classList.add('dn');
            errorEl.classList.remove('dn');

            console.error(error);
        });
}

function render(playersStats) {
    const maximumOfGamesPlayed = Math.max(...playersStats.map(playerStats => playerStats.Jugados));
    const topScore = Math.max(...playersStats.map(playerStats => playerStats.Puntos));

    rowsEl.innerHTML = '';

    playersStats.forEach((playerStats, index) => {
        const isTop = playerStats.Puntos === topScore;
        const playerIndex = index + 1;
        const playerPicture = playerStats.Foto
            ? `https://avatars.io/${playerStats.Foto}`
            : 'https://placehold.it/32x32/bbbbbb?text=&nbsp;';
        const scoreBackgroundColor = isTop ? 'bg-secondary' : 'bg-black-05';
        const scoreBackgroundWidth = Number(
            (playerStats.Puntos / (maximumOfGamesPlayed * 3) * 100).toFixed(2)
        );

        rowsEl.insertAdjacentHTML(
            'beforeEnd',
            `<div class="b--black-20 bb br bg-white-60 flex relative z-0">
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

function assignThemeTriggersListeners() {
    themeTriggersEl.forEach(themeTriggerEl => {
        themeTriggerEl.addEventListener('click', event => {
            event.preventDefault();

            html.className = '';
            html.classList.add(event.target.dataset.theme);
            localStorage.setItem('theme', event.target.dataset.theme);

            themeTriggersEl.forEach(el => {
                el.classList.add('no-underline');
            });

            themeTriggerEl.classList.remove('no-underline');
        });
    });
}

function assignTheme(theme) {
    html.className = '';
    html.classList.add(theme);

    themeTriggersEl.forEach(themeTriggerEl => {
        if(themeTriggerEl.dataset.theme === theme) {
            themeTriggerEl.classList.remove('no-underline');
        } else {
            themeTriggerEl.classList.add('no-underline');
        }
    });
}
