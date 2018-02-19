import aload from 'aload';
// módulo para usar una Google Spreadsheet como base de datos
import * as gsheets from 'gsheets';

import { assignThemeTriggersListeners } from './theme-triggers';
import { initThemeManager } from './theme-manager';
import { renderCovers } from './covers';
import { renderPositions } from './positions';
import { renderShirts } from './shirts';

export function init() {
    const errorEl = document.querySelector('#error');
    const loadingEl = document.querySelector('#loading');
    const mainContainerEl = document.querySelector('#main-container');
    const themeManager = initThemeManager();

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

    const dataPromises = [
        // obtenemos las posiciones
        gsheets
            .getWorksheetById(process.env.SPREADSHEET_ID, process.env.POSITIONS_WORKSHEET_ID)
            .then((worksheet) => worksheet.data),
        // obtenemos las portadas
        gsheets
            .getWorksheetById(process.env.SPREADSHEET_ID, process.env.COVERS_WORKSHEET_ID)
            .then((worksheet) => worksheet.data),
    ];

    if (process.env.SHIRTS_WORKSHEET_ID) {
        dataPromises.push(
            // obtenemos las camisetas
            gsheets
                .getWorksheetById(process.env.SPREADSHEET_ID, process.env.SHIRTS_WORKSHEET_ID)
                .then((worksheet) => worksheet.data)
        );
    }

    Promise.all(dataPromises)
        .then(([positions, covers, shirts]) => {
            setTimeout(() => {
                // renderizamos las posiciones
                renderPositions(positions);
                // renderizamos las portadas
                renderCovers(covers);
                // renderizamos las camisetas si existen
                if (shirts) renderShirts(shirts);
                // ocultamos el spinner
                loadingEl.classList.add('dn');
                // mostramos la interfaz después de haberla generado
                mainContainerEl.classList.remove('dn');

                assignThemeTriggersListeners(themeManager);

                // lazy-load de imágenes
                aload();
            });
        })
        .catch((error) => {
            // ocultamos la grilla
            loadingEl.classList.add('dn');
            // mostramos el mensaje de error genérico
            errorEl.classList.remove('dn');

            // eslint-disable-next-line no-console
            console.error(error);
        });
}
