require('isomorphic-fetch');
const gsheets = require('gsheets');

const sheetID = process.env.SPREADSHEET_ID;
const getSpreadsheet = gsheets.getSpreadsheet.bind(gsheets);

Promise.resolve(sheetID)
  .then(
    (sheetID) =>
      typeof sheetID === 'undefined'
        ? Promise.reject('You have to specify a sheet as the env SPREADSHEET_ID')
        : Promise.resolve(sheetID)
  )
  .then(getSpreadsheet)
  .then((response) => response.worksheets)
  // eslint-disable-next-line
  .then((worksheets) => worksheets.forEach((w) => console.log(`${w.title}: ${w.id}`)))
  // eslint-disable-next-line
  .catch((err) => console.error(`There is a problem with the spreadsheet (${sheetID}): ${err}`));
