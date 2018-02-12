import * as basicLightbox from 'basiclightbox';

function showModal(event) {
    const modalInstance = basicLightbox.create(
        `<img src="${event.target.src}"> alt="${event.target.alt}"`,
        { className: 'zoom-out' }
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
                    <img src="${cover.Portada}"
                        alt="Tapa de Olé - ${cover.Fecha}"
                        class="db center mh-100 zoom-in"
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
