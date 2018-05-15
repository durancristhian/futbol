require('isomorphic-fetch');
const gsheets = require('gsheets');

const worksheetsIDs = [
  // Fecha 2
  'ojqokn',
  // Fecha 3
  'od6xkhl'
];

async function generateData() {
  const dataPromises = worksheetsIDs.map((worksheetsID) =>
    gsheets
      .getWorksheetById('1cQr0m6ZThrbfkUm0limFK6kDFki6RYXrIUPTM84-rnA', worksheetsID)
      .then((worksheet) => worksheet.data)
  );

  const dataArrays = await Promise.all(dataPromises);
  const data = [].concat(...dataArrays);

  console.log(data);

  const nombresJugadores = Array.from(new Set(data.map((jugador) => jugador['Jugador/a'])));

  const estadisticasPorJugador = nombresJugadores.map((nombre) =>
    data.reduce(
      (prev, curr) => {
        if (curr['Jugador/a'] === nombre) {
          prev.Ganados += curr.Ganados;
          prev.Empatados += curr.Empatados;
          prev.Perdidos += curr.Perdidos;
        }

        return prev;
      },
      { nombre, victorias: 0, empates: 0, derrotas: 0 }
    )
  );

  const estadisticasFinalesPorJugador = estadisticasPorJugador
    .map((estadisticas) => {
      return Object.assign({}, estadisticas, {
        Puntos: estadisticas.Ganados * 3 + estadisticas.Empatados,
        Jugados: estadisticas.Ganados + estadisticas.Empatados + estadisticas.Perdidos
      });
    })
    .sort((j1, j2) => {
      const tieneMejorPuntaje =
        j2.Puntos > j1.Puntos || j2.Ganados > j1.Ganados || j2.Jugados > j1.Jugados;
      const tieneMismoPuntajePeroNombre =
        j2.Puntos === j1.Puntos &&
        j2.Ganados === j1.Ganados &&
        j2.Jugados === j1.Jugados &&
        j2['Jugador/a'] < j1['Jugador/a'];

      return tieneMejorPuntaje || tieneMismoPuntajePeroNombre;
    });

  console.log(JSON.stringify(estadisticasFinalesPorJugador, null, 2));
}

generateData();
