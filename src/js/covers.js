import * as basicLightbox from 'basiclightbox';

function showModal(event) {
    // creamos una función que recibe un evento keydown y se fija si se presionó
    // la tecla escape para cerrar el modal
    const onKeydown = function(modalInstance, event) {
        if (event.keyCode === 27) modalInstance.close();
    };
    let onKeydownListener;

    const modalInstance = basicLightbox.create(
        // markup del modal
        `<img src="${event.target.src}" alt="${event.target.alt}" class="shadow-5">`,
        {
            // eliminamos el listener de keydown antes de cerrar el modal
            beforeClose: () => {
                window.removeEventListener('keydown', onKeydownListener);
            },
            // antes de mostrar el modal
            beforeShow: (instance) => {
                // generamos una función que almacenamos en una variable externa
                // para ser capaces de eliminar el listener luego
                onKeydownListener = onKeydown.bind(this, instance);

                // agregamos el listener a window
                window.addEventListener('keydown', onKeydownListener);
            },
            // clase que se agrega al modal
            className: 'zoom-out',
        }
    );

    modalInstance.show();
}

// recibe un array con las portadas provenientes de la spreadsheet y dibuja la lista
export function renderCovers(covers) {
    const coversContainerEl = document.querySelector('#covers-container');
    const coversEl = document.querySelector('#covers');

    // si hay portadas disponibles
    if (covers.length) {
        // agrego cada cover a la lista
        covers.forEach((cover) => {
            coversEl.insertAdjacentHTML(
                'beforeEnd',
                `<div class="pv3 pa3-l w-100 w-33-l">
                    <p class="mb2 mt0 tc">${cover.Fecha}</p>
                    <img data-aload="${cover.Portada}"
                        alt="Tapa de Olé - ${cover.Fecha}"
                        class="db center mh-100 shadow-5 zoom-in"
                        data-zoom
                    >
                </div>`
            );
        });

        // asigno un listener para hacer zoom en la foto
        document.querySelectorAll('[data-zoom]').forEach((image) => {
            image.addEventListener('click', showModal);
        });

        // muestro las portadas porque las mismas ya están en el DOM
        coversContainerEl.classList.remove('dn');
    }
}
