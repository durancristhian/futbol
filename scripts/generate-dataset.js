require('isomorphic-fetch');
const gsheets = require('gsheets');

// Lista de IDs de las worksheets de la planilla que tienen los datos por fecha
const worksheetsIDs = [
  'o2hhf1q', // Fecha 1
  'of1a6hw', // Fecha 2
  'off4s01', // Fecha 3
  'o8drnce', // Fecha 4
  'o82vgxg', // Fecha 5
  'oua9csk', // Fecha 6
  'owf8s4d', // Fecha 7
  'oj78hmg', // Fecha 8
  'ogvoa1i', // Fecha 9
  'o1izkvp', // Fecha 10
  'ojj8b8k', // Fecha 11
  'oxnfbuu', // Fecha 12
  'o4rm9fv', // Fecha 13
  'o85xyi5', // Fecha 14
  'oiflb6v', // Fecha 15
  'oh68d57' // Fecha 16
];

async function generateDataset() {
  // array de promesas al contenido de cada una de las worksheets
  const dataPromises = worksheetsIDs.map((worksheetsID) =>
    gsheets
      .getWorksheetById('1cQr0m6ZThrbfkUm0limFK6kDFki6RYXrIUPTM84-rnA', worksheetsID)
      .then((worksheet) => worksheet.data)
  );

  // obtenemos el array de datos de las worksheets
  const dataArrays = await Promise.all(dataPromises);
  // hacemos un `flatten` del array para obtener todos las filas de todas las worksheets (fechas)
  // en una sola colección
  const data = []
    .concat(...dataArrays)
    // y filtramos posibles filas vacías
    .filter(
      (jugador) => jugador.Nombre !== undefined && jugador.Nombre !== null && jugador.Nombre !== ''
    );

  // Lista SIN REPETICIONES de nombre de jugadores (en mayúscula para comparar alfabéticamente)
  const nombresJugadores = Array.from(new Set(data.map((jugador) => jugador.Nombre.toUpperCase())));

  // console.log(nombresJugadores);

  // por cada jugador
  const estadisticasPorJugador = nombresJugadores.map((nombre) =>
    // recorremos el array de resultados completos
    data.reduce(
      (prev, curr) => {
        // si el jugador actual que estamos iterando es el mismo de la fila de resultados
        if (curr.Nombre === nombre) {
          // agregamos los resultados a su objeto
          prev.Ganados += parseInt(curr.Ganados, 10);
          prev.Empatados += parseInt(curr.Empatados, 10);
          prev.Perdidos += parseInt(curr.Perdidos, 10);
        }

        return prev;
      },
      // estado inicial para el jugador
      { nombre, Ganados: 0, Empatados: 0, Perdidos: 0 }
    )
  );

  // Funciones para ordenar las estadisticas de los jugadores
  const tieneMasJugados = (j1, j2) => j1.Jugados < j2.Jugados;
  const tieneIgualJugados = (j1, j2) => j1.Jugados === j2.Jugados;
  const tieneMasGanados = (j1, j2) => j1.Ganados < j2.Ganados;
  const tieneIgualGanados = (j1, j2) => j1.Ganados === j2.Ganados;
  const ordenarNombre = (j1, j2) => (j1.nombre < j2.nombre ? -1 : 1);
  const tieneMasPuntos = (j1, j2) => j1.Puntos < j2.Puntos;
  const tieneMismosPuntos = (j1, j2) => j1.Puntos === j2.Puntos;

  const ordenarJugadosNombre = (j1, j2) =>
    tieneMasJugados(j1, j2) ? 1 : tieneIgualJugados(j1, j2) ? ordenarNombre(j1, j2) : -1;

  const ordenarGanadosJugadosNombre = (j1, j2) =>
    tieneMasGanados(j1, j2) ? 1 : tieneIgualGanados(j1, j2) ? ordenarJugadosNombre(j1, j2) : -1;

  const ordenarPuntosGanadosJugadosNombre = (j1, j2) =>
    tieneMasPuntos(j1, j2)
      ? 1
      : tieneMismosPuntos(j1, j2)
        ? ordenarGanadosJugadosNombre(j1, j2)
        : -1;

  const estadisticasFinalesPorJugador = estadisticasPorJugador
    // por cada jugador calculamos sus puntos y lo partidos jugados
    .map((estadisticas) => {
      return Object.assign({}, estadisticas, {
        Puntos: parseInt(estadisticas.Ganados * 3 + estadisticas.Empatados, 10),
        Jugados: parseInt(estadisticas.Ganados + estadisticas.Empatados + estadisticas.Perdidos, 10)
      });
    })
    // ordenamos por:
    //    - Puntos DESC
    //    - Ganados DESC
    //    - Jugados DESC
    //    - Nombre ASC
    .sort(ordenarPuntosGanadosJugadosNombre);

  console.log(JSON.stringify(estadisticasFinalesPorJugador, null, 2));
}

generateDataset();
