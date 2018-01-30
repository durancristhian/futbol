# futbolmixto

Website that shows data from a Google Spreadsheet

## Access

[futbolmixto.now.sh](https://futbolmixto.now.sh/)

## Development

```bash
# install deps
npm i

# dev mode
npm run dev

# deploy to now
now rm -y futbolmixto && now && now alias
```

## "How can I use my own Google Spreadsheet as a database like you did?"

* [Check out these easy-to-follow steps](https://support.google.com/docs/answer/37579) to publish a Google Spreadsheet and use it as a database you can get data from.
* Look into `dist/js/index.js` and change the value of `SPREADSHEET_ID` and `WORKSHEET_ID` with your Google Spreasheet's information.

## Licence

MIT
