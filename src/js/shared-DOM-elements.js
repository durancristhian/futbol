let sharedElements = {};

export function getSharedDOMElements() {
    return sharedElements;
}

// inicializa un objeto con todos aquellos nodos HTML que se usan desde varios lados de la app
export function querySharedElements() {
    sharedElements = {
        themeTriggersEl: document.querySelectorAll('[data-theme]'),
    };
}
