require('isomorphic-fetch');
const fs = require('fs');
const gsheets = require('gsheets');
const path = require('path');

const addInfoToCuriosities = function(curiosities) {
  // agregarmos la foto de perfil a las curiosidad
  return curiosities.map((curiosity) =>
    Object.assign({}, curiosity, {
      Foto: getPlayerImage(curiosity.Foto)
    })
  );
};

const addInfoToPositions = function(positions) {
  // devolvemos un nuevo array compuesto de:
  //    - la información de los jugadores que ya tenemos
  //    - la posición calculada
  //    - la foto de perfil
  return positions.map((position) =>
    Object.assign({}, position, {
      Foto: getPlayerImage(position.Foto),
      Posicion: getPositionNumberFromName(positions, position['Jugador/a'])
    })
  );
};

// generamos la URL de la foto del jugador
const getPlayerImage = function(pictureURL) {
  return pictureURL
    ? `https://avatars.io/${pictureURL}/large`
    : 'https://placehold.it/32x32/bbbbbb/bbbbbb;';
};

// obtenemos la posición del jugador especificado por nombre
const getPositionNumberFromName = function(positions, name) {
  let currentIndex = 1;
  let previousPosition = null;

  // `positions` es un array de jugadores ordenados por:
  //    - Puntos (DESC)
  //    - Ganados (DESC)
  //    - Jugados (DESC)
  //    - Nombre (ASC)
  // esto nos sirve para poder usar `some` y comparar si jugadores consecutivos en el array
  // tienen los mismos puntos, partidos ganados y jugados, en ese caso, uno va a estar abajo del
  // otro en las posiciones por el orden alfabético. En ese caso, queremos que la posición sea
  // la misma
  positions.some((currentPosition, index) => {
    if (previousPosition) {
      if (
        currentPosition.Puntos !== previousPosition.Puntos ||
        currentPosition.Ganados !== previousPosition.Ganados ||
        currentPosition.Jugados !== previousPosition.Jugados
      ) {
        currentIndex = currentIndex + 1;
      }
    }

    previousPosition = currentPosition;

    return currentPosition['Jugador/a'] === name;
  });

  return currentIndex;
};

async function generateData() {
  const dataPromises = [
    gsheets
      .getWorksheetById(
        process.env.REACT_APP_SPREADSHEET_ID,
        process.env.REACT_APP_POSITIONS_WORKSHEET_ID
      )
      .then((worksheet) => worksheet.data),
    gsheets
      .getWorksheetById(
        process.env.REACT_APP_SPREADSHEET_ID,
        process.env.REACT_APP_COVERS_WORKSHEET_ID
      )
      .then((worksheet) => worksheet.data),
    gsheets
      .getWorksheetById(
        process.env.REACT_APP_SPREADSHEET_ID,
        process.env.REACT_APP_CURIOSITIES_WORKSHEET_ID
      )
      .then((worksheet) => worksheet.data)
  ];

  if (process.env.REACT_APP_SHIRTS_WORKSHEET_ID) {
    dataPromises.push(
      gsheets
        .getWorksheetById(
          process.env.REACT_APP_SPREADSHEET_ID,
          process.env.REACT_APP_SHIRTS_WORKSHEET_ID
        )
        .then((worksheet) => worksheet.data)
    );
  }

  Promise.all(dataPromises)
    .then(([positions, covers, curiosities, shirts]) => {
      // guardo la información en disco para ser usado desde la app
      fs.writeFileSync(
        path.resolve('./', 'src', 'dataset.json'),
        JSON.stringify(
          {
            positions: addInfoToPositions(positions),
            covers,
            curiosities: addInfoToCuriosities(curiosities),
            shirts
          },
          null,
          2
        )
      );

      console.log('spreadsheet generated successfully 😎');
    })
    .catch(console.error);
}

generateData();
