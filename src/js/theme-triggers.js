import { getSharedDOMElements } from './shared-DOM-elements';

// asigna funcionalidad a los elementos que permiten cambiar el tema
export function assignThemeTriggersListeners(themeManager) {
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
