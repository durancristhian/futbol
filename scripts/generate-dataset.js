require('isomorphic-fetch');
const gsheets = require('gsheets');

// Lista de IDs de las worksheets de la planilla que tienen los datos por fecha
const worksheetsIDs = [
  'ojqokn' // Fecha 2
  // 'od6xkhl' // Fecha 3
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
  const data = [].concat(...dataArrays);

  // Lista SIN REPETICIONES de jugadores
  const nombresJugadores = Array.from(new Set(data.map((jugador) => jugador['Jugador/a'])));

  // por cada jugador
  const estadisticasPorJugador = nombresJugadores.map((nombre) =>
    // recorremos el array de resultados completos
    data.reduce(
      (prev, curr) => {
        // si el jugador actual que estamos iterando es el mismo de la fila de resultados
        if (curr['Jugador/a'] === nombre) {
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
    //    - Jugador/a ASC
    .sort((j1, j2) => {
      console.log(j1.nombre, j2.nombre);

      const tieneMasPuntos = j1.Puntos < j2.Puntos;
      const tieneMismosPuntos = j1.Puntos === j2.Puntos;

      console.log('');
      console.log('');
      console.log('');
      console.log('tieneMasPuntos', tieneMasPuntos);
      console.log('tieneMismosPuntos', tieneMismosPuntos);

      if (tieneMasPuntos) {
        return true;
      } else if (tieneMismosPuntos) {
        const tieneMasGanados = j1.Ganados < j2.Ganados;
        const tieneIgualGanados = j1.Ganados === j2.Ganados;

        console.log('tieneMasGanados', tieneMasGanados);
        console.log('tieneIgualGanados', tieneIgualGanados);

        if (tieneMasGanados) {
          return true;
        } else if (tieneIgualGanados) {
          const tieneMasJugados = j1.Jugados < j2.Jugados;
          const tieneIgualJugados = j1.Jugados === j2.Jugados;

          console.log('tieneMasJugados', tieneMasJugados);
          console.log('tieneIgualJugados', tieneIgualJugados);

          if (tieneMasJugados) {
            return true;
          } else if (tieneIgualJugados) {
            console.log('Está antes', j1.nombre < j2.nombre);

            // orden alfabético
            return j1.nombre < j2.nombre;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    });

  console.log(JSON.stringify(estadisticasFinalesPorJugador, null, 2));
}

generateDataset();
