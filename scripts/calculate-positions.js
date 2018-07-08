require('isomorphic-fetch');
const gsheets = require('gsheets');

async function calculatePositions() {
  const positionsWorksheetsIDs = process.env.REACT_APP_POSITIONS_WORKSHEETS_IDS.split(',');
  const dataPromises = positionsWorksheetsIDs.map((worksheetsID) =>
    gsheets
      .getWorksheetById(process.env.REACT_APP_SPREADSHEET_ID, worksheetsID)
      .then((worksheet) => worksheet.data)
  );
  const personas = await gsheets
    .getWorksheetById(
      process.env.REACT_APP_SPREADSHEET_ID,
      process.env.REACT_APP_USERS_WORKSHEET_ID
    )
    .then((worksheet) => worksheet.data);

  const dataArrays = await Promise.all(dataPromises);
  const data = [].concat(...dataArrays).filter((persona) =>
    // Excluimos a las personas que no están activas según la tabla de personas
    isPersonActive(personas, persona.Nombre)
  );

  // Lista SIN REPETICIONES de nombre de personas
  const nombresPersonas = Array.from(new Set(data.map((persona) => persona.Nombre)));

  const estadisticasPorPersona = nombresPersonas.map((nombre) =>
    data.reduce(
      (prev, curr) => {
        if (curr.Nombre === nombre) {
          prev.Ganados += parseInt(curr.Ganados, 10);
          prev.Empatados += parseInt(curr.Empatados, 10);
          prev.Perdidos += parseInt(curr.Perdidos, 10);
        }

        return prev;
      },
      { Nombre: nombre, Ganados: 0, Empatados: 0, Perdidos: 0 }
    )
  );

  const estadisticasFinalesPorPersona = estadisticasPorPersona
    .map((estadisticas) => {
      return Object.assign({}, estadisticas, {
        Puntos: parseInt(estadisticas.Ganados * 3 + estadisticas.Empatados, 10),
        Jugados: parseInt(
          estadisticas.Ganados + estadisticas.Empatados + estadisticas.Perdidos,
          10
        ),
        Foto: personas.find((person) => person.Nombre === estadisticas.Nombre).Foto
      });
    })
    // Ordenamos por:
    //    - Puntos DESC
    //    - Ganados DESC
    //    - Jugados DESC
    //    - Nombre ASC
    .sort(ordenarPuntosGanadosJugadosNombre)
    .map((estadisticas, _, arr) => {
      return Object.assign({}, estadisticas, {
        Posicion: getPositionNumberFromName(arr, estadisticas.Nombre),
        Foto: getPlayerImage(estadisticas.Foto)
      });
    });

  return estadisticasFinalesPorPersona;
}

const getPlayerImage = function(pictureURL) {
  return pictureURL
    ? `https://avatars.io/${pictureURL}/large`
    : 'https://placehold.it/32x32/bbbbbb/bbbbbb;';
};

// Obtenemos la posición del jugador especificado por nombre
const getPositionNumberFromName = function(positions, name) {
  let currentIndex = 1;
  let previousPosition = null;

  // `positions` es un array de jugadores ordenados por:
  //    - Puntos (DESC)
  //    - Ganados (DESC)
  //    - Jugados (DESC)
  //    - Nombre (ASC)
  // Esto nos sirve para poder usar `some` y comparar si jugadores consecutivos en el array
  // tienen los mismos puntos, partidos ganados y jugados, en ese caso, uno va a estar abajo del
  // otro en las posiciones por el orden alfabético pero queremos que la posición sea
  // la misma
  positions.some((currentPosition) => {
    if (previousPosition) {
      if (currentPosition.Puntos !== previousPosition.Puntos) {
        currentIndex = currentIndex + 1;
      }
    }

    previousPosition = currentPosition;

    return currentPosition.Nombre === name;
  });

  return currentIndex;
};

const isPersonActive = function(people, name) {
  return people.find((person) => person.Nombre === name).Estado;
};

const tieneMasJugados = (p1, p2) => p1.Jugados < p2.Jugados;
const tieneIgualJugados = (p1, p2) => p1.Jugados === p2.Jugados;
const tieneMasGanados = (p1, p2) => p1.Ganados < p2.Ganados;
const tieneIgualGanados = (p1, p2) => p1.Ganados === p2.Ganados;
const ordenarPorNombre = (p1, p2) => (p1.Nombre < p2.Nombre ? -1 : 1);
const tieneMasPuntos = (p1, p2) => p1.Puntos < p2.Puntos;
const tieneMismosPuntos = (p1, p2) => p1.Puntos === p2.Puntos;

const ordenarJugadosNombre = (p1, p2) =>
  tieneMasJugados(p1, p2) ? 1 : tieneIgualJugados(p1, p2) ? ordenarPorNombre(p1, p2) : -1;

const ordenarGanadosJugadosNombre = (p1, p2) =>
  tieneMasGanados(p1, p2) ? 1 : tieneIgualGanados(p1, p2) ? ordenarJugadosNombre(p1, p2) : -1;

const ordenarPuntosGanadosJugadosNombre = (p1, p2) =>
  tieneMasPuntos(p1, p2) ? 1 : tieneMismosPuntos(p1, p2) ? ordenarGanadosJugadosNombre(p1, p2) : -1;

module.exports = {
  calculatePositions,
  getPlayerImage
};
