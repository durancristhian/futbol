require('isomorphic-fetch');
const fs = require('fs');
const gsheets = require('gsheets');
const path = require('path');
const { calculatePositions, getPlayerImage } = require('./calculate-positions');

const addPlayerImageToCuriosities = function(curiosities) {
  return curiosities.map((curiosity) =>
    Object.assign({}, curiosity, {
      Foto: getPlayerImage(curiosity.Foto)
    })
  );
};

function generateDataset() {
  const dataPromises = [
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
    .then(async ([covers, curiosities, shirts]) => {
      // guardo la información en disco para ser usado desde la app
      fs.writeFileSync(
        path.resolve('./', 'src', 'dataset.json'),
        JSON.stringify(
          {
            positions: await calculatePositions(),
            covers,
            curiosities: addPlayerImageToCuriosities(curiosities),
            shirts
          },
          null,
          2
        )
      );

      console.log('dataset generated successfully 😎');
    })
    .catch((error) => {
      console.error(error);

      process.exit(1);
    });
}

generateDataset();
