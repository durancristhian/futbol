let sharedElements = {};

export function getSharedDOMElements() {
    return sharedElements;
}

// inicializa un objeto con todos aquellos nodos HTML que se usan desde varios lados de la app
export function querySharedElements() {
    sharedElements = {
        errorEl: document.querySelector('#error'),
        html: document.querySelector('html'),
        loadingEl: document.querySelector('#loading'),
        rowsContainerEl: document.querySelector('#rows-container'),
        rowsEl: document.querySelector('#rows'),
        themeTriggersEl: document.querySelectorAll('[data-theme]'),
    };
}
