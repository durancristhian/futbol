import * as vanillaTilt from 'vanilla-tilt';

// recibe un array con las estadísticas de las camisetas proveniente de la spreadsheet y dibuja la lista
export function renderShirts(shirts) {
    const shirtsContainerEl = document.querySelector('#shirts-container');
    const shirtsEl = document.querySelector('#shirts');

    // agrego cada camiseta a la lista
    shirts.forEach((shirt) => {
        const teamName = shirt.Nombre;

        shirtsEl.insertAdjacentHTML(
            'beforeEnd',
            `<div class="b--black-20 ba bg-white-60 ma3 w-100 w-33-l">
                <h3 class="bg-black-10 mv0 ph3 pv2 tc">${teamName}</h3>
                <div class="b--black-20 bt pa3">
                    <img src="/assets/images/tshirt-${teamName.toLowerCase()}.svg" alt="Camiseta de ${teamName}" class="center db mw5" data-tilt data-tilt-axis="x"
                        data-tilt-reverse="true" data-tilt-scale="1.05">
                    <div class="flex justify-center tc">
                        <div class="mh3">
                            <p class="b f2 mv0">${shirt.Victorias}</p>
                            <p class="black-50 mv0">Victoria${shirt.Victorias === 1 ? '' : 's'}</p>
                        </div>
                        <div class="mh3">
                            <p class="b f2 mv0">${shirt.Empates}</p>
                            <p class="black-50 mv0">Empate${shirt.Empates === 1 ? '' : 's'}</p>
                        </div>
                        <div class="mh3">
                            <p class="b f2 mv0">${shirt.Derrotas}</p>
                            <p class="black-50 mv0">Derrota${shirt.Derrotas === 1 ? '' : 's'}</p>
                        </div>
                    </div>
                </div>
            </div>`
        );
    });

    // cada camiseta tiene un efecto divertido en el hover
    vanillaTilt.init(document.querySelectorAll('[data-tilt]'));

    // muestro las portadas porque las mismas ya están en el DOM
    shirtsContainerEl.classList.remove('dn');
}
