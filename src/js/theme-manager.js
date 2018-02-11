import { getSharedDOMElements } from './shared-DOM-elements';

let isLocalStorageAvailable;

// asigna el tema indica en el DOM
function assignTheme(themeName) {
    const html = document.querySelector('html');
    const { themeTriggersEl } = getSharedDOMElements();

    // asigna el tema en el nodo HTML
    html.className = '';
    html.classList.add(themeName);

    // actualiza el tema actual en la lista de temas disponibles
    themeTriggersEl.forEach((themeTriggerEl) => {
        if (themeTriggerEl.dataset.theme === themeName) {
            themeTriggerEl.classList.remove('no-underline');
        } else {
            themeTriggerEl.classList.add('no-underline');
        }
    });
}

function getFromLocalStorage() {
    return localStorage.getItem('theme');
}

// devuelve un booleano indicando si el nombre del tema es válido o no
function isValidTheme(theme) {
    return theme === 'theme-blue' || theme === 'theme-green' || theme === 'theme-yellow';
}

// si está disponible localStorage, guarda el tema indicado y lo asigna al DOM
function saveAndAssignTheme(themeName) {
    if (isLocalStorageAvailable) {
        localStorage.setItem('theme', themeName);
    }

    assignTheme(themeName);
}

// inicializa variables necesarias y devuelve un objeto con métodos para trabajar con los temas
export function initThemeManager() {
    isLocalStorageAvailable = !!window.localStorage;

    return { assignTheme, getFromLocalStorage, isValidTheme, saveAndAssignTheme };
}
