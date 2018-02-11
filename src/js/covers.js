function showModal(event) {
    const bodyEl = document.querySelector('body');
    const modalEl = document.querySelector('#modal');
    const modalContentEl = modalEl.querySelector('#modal-content');

    function closeModal() {
        // cierra el modal
        bodyEl.classList.remove('overflow-y-hidden');
        modalEl.classList.add('dn');
        modalEl.classList.remove('flex');

        // elimina los handlers
        modalEl.querySelector('#modal-close').removeEventListener('click', closeModal);
        window.removeEventListener('keydown', closeModalOnEscapeKey);
    }

    // cierra el modal si se presiona escape
    function closeModalOnEscapeKey(event) {
        if (event.keyCode === 27) closeModal();
    }

    // muestra el modal
    function showModal() {
        // clona el target y le modifica algunas clases
        const clone = event.target.cloneNode(true);
        clone.classList.add('default');
        clone.classList.add('shadow-5');
        clone.classList.remove('zoom-in');

        // limpia el contenido del modal y le asigna el nuevo
        modalContentEl.innerHTML = '';
        modalContentEl.appendChild(clone);

        // muestra el modal
        bodyEl.classList.add('overflow-y-hidden');
        modalEl.classList.remove('dn');
        modalEl.classList.add('flex');

        // asigna los handlers
        modalEl.querySelector('#modal-close').addEventListener('click', closeModal);
        window.addEventListener('keydown', closeModalOnEscapeKey);
    }

    showModal();
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
