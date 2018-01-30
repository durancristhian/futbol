// módulo para usar una Google Spreadsheet como base de datos
import * as gsheets from 'gsheets';

import { getSharedDOMElements } from './shared-DOM-elements';
import { initThemeManager } from './theme-manager';

const SPREADSHEET_ID = '1W5ihCnbzRV3UHa9lMCcJNOtFKWHVUI_0P5SKcdF4wig';
const WORKSHEET_ID = 'oce51o4';

let themeManager;

// asigna a los elementos que permiten cambiar el tema una función que:
//      - evita que esos links cambien la URL
//      - actualiza el tema en la app
function assignThemeTriggersListeners() {
    const { themeTriggersEl } = getSharedDOMElements();

    // recibe el evento, lo cancela y actualiza el tema
    function themeTriggerListener(event) {
        event.preventDefault();

        themeManager.saveAndAssignTheme(event.target.dataset.theme);
    }

    // por cada uno de los links asigna el listener
    themeTriggersEl.forEach((themeTriggerEl) => {
        themeTriggerEl.addEventListener('click', themeTriggerListener);
    });
}

// recibe un array con los resultados provenientes de la planilla y dibuja la grilla
function render(playersStats) {
    const { rowsEl } = getSharedDOMElements();

    // número máximo de partidos jugados por un jugador
    const maximumOfGamesPlayed = Math.max(
        ...playersStats.map((playerStats) => playerStats.Jugados)
    );
    // puntaje más alto que puede estar compartido entre varios jugadores
    const topScore = Math.max(...playersStats.map((playerStats) => playerStats.Puntos));

    // limpiamos la grilla
    rowsEl.innerHTML = '';

    playersStats.forEach((playerStats, index) => {
        // está primero?
        const isTop = playerStats.Puntos === topScore;
        // indice para mostrar
        const playerIndex = index + 1;
        // construimos la URL para mostrar su foto de perfil o ponemos una por defecto
        const playerPicture = playerStats.Foto
            ? `https://avatars.io/${playerStats.Foto}`
            : 'https://placehold.it/32x32/bbbbbb?text=&nbsp;';
        // usamos un color diferente si el jugador está primero
        const scoreBackgroundColor = isTop ? 'bg-secondary' : 'bg-black-05';
        // calculamos el ancho de la barra de progreso usada como fondo de cada fila en base
        // a los puntos ganados por el jugador en base al total de partidos
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

export function init() {
    const { errorEl, loadingEl, rowsContainerEl } = getSharedDOMElements();
    themeManager = initThemeManager();

    // obtenemos el tema de localStorage
    const theme = themeManager.getFromLocalStorage();

    // si el tema es válido (puede no existir la primera vez o haber sido cambiado)
    if (themeManager.isValidTheme(theme)) {
        // lo asignamos al DOM
        themeManager.assignTheme(theme);
    } else {
        // el tema no es válido. Guardamos uno por defecto y lo asignamos al DOM
        themeManager.saveAndAssignTheme('theme-yellow');
    }

    // obtenemos los datos de la planilla
    gsheets
        .getWorksheetById(SPREADSHEET_ID, WORKSHEET_ID)
        .then((worksheet) => worksheet.data)
        .then((playersStats) => {
            // hack para dibujar la grilla en el próximo tick
            setTimeout(() => {
                render(playersStats);

                loadingEl.classList.add('dn');
                // mostramos la grilla después de haberla generado
                rowsContainerEl.classList.remove('dn');

                assignThemeTriggersListeners();
            }, 0);
        })
        .catch((error) => {
            loadingEl.classList.add('dn');
            errorEl.classList.remove('dn');

            // eslint-disable-next-line no-console
            console.error(error);
        });
}
