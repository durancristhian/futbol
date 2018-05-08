require('isomorphic-fetch');
const gsheets = require('gsheets');

async function generateData() {
  const data = await gsheets
    .getWorksheetById('1W5ihCnbzRV3UHa9lMCcJNOtFKWHVUI_0P5SKcdF4wig', 'okjza4n')
    .then((worksheet) => worksheet.data);

  const nombresJugadores = Array.from(new Set(data.map((jugador) => jugador.nombre)));

  const estadisticasPorJugador = nombresJugadores.map((nombre) =>
    data.reduce(
      (prev, curr) => {
        if (curr.nombre === nombre) {
          prev.victorias += curr.victorias;
          prev.empates += curr.empates;
          prev.derrotas += curr.derrotas;
        }

        return prev;
      },
      { nombre, victorias: 0, empates: 0, derrotas: 0 }
    )
  );

  const estadisticasFinalesPorJugador = estadisticasPorJugador
    .map((estadisticas) => {
      return Object.assign({}, estadisticas, {
        puntos: estadisticas.victorias * 3 + estadisticas.empates,
        jugados: estadisticas.victorias + estadisticas.empates + estadisticas.derrotas
      });
    })
    .sort((j1, j2) => {
      const tieneMejorPuntaje =
        j2.puntos > j1.puntos || j2.victorias > j1.victorias || j2.jugados > j1.jugados;
      const tieneMismoPuntajePeroNombre =
        j2.puntos === j1.puntos &&
        j2.victorias === j1.victorias &&
        j2.jugados === j1.jugados &&
        j2.nombre < j1.nombre;

      return tieneMejorPuntaje || tieneMismoPuntajePeroNombre;
    });

  console.log(JSON.stringify(estadisticasFinalesPorJugador, null, 2));
}

generateData();
