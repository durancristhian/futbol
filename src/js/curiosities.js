// recibe un array con las curiosidades provenientes de la spreadsheet y dibuja la lista
export function renderCuriosities(curiosities) {
    const curiositiesContainerEl = document.querySelector('#curiosities-container');
    const curiositiesEl = document.querySelector('#curiosities');

    // agrego cada curiosidad a la lista
    curiosities.forEach((curiosity, index) => {
        const playerPicture = curiosity.Foto
            ? `https://avatars.io/${curiosity.Foto}/small`
            : 'https://placehold.it/32x32/bbbbbb?text=&nbsp;';

        curiositiesEl.insertAdjacentHTML(
            'beforeEnd',
            `<div class="pv3 pa3-l w-100 w-50-m w-33-l">
                <div class="${index % 2 ? 'ml2-m ml0-l' : 'mr2-m mr0-l'}">
                    <p class="i mb3 mt0">"${curiosity.Descripcion}"</p>
                    <div class="flex items-center">
                        <div class="mr3">
                            <div class="bg-center cover h2 w2" style="background-image: url('${playerPicture}')" data-aload>
                            </div>
                        </div>
                        <div class="f6 flex-auto">
                            <span class="b">${curiosity.Estadista}</span>, Fecha ${curiosity.Fecha}.
                        </div>
                    </div>
                </div>
            </div>`
        );
    });

    // muestro las curiosidades porque las mismas ya están en el DOM
    curiositiesContainerEl.classList.remove('dn');
}
