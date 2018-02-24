# futbol

[![Build Status](https://travis-ci.org/durancristhian/futbol.svg?branch=master)](https://travis-ci.org/durancristhian/futbol)

🏆 Generador de los sitios estáticos para mostrar las estadísticas del fútbol de la comunidad desde una Google Spreadsheet.

[futboljs.now.sh](https://futboljs.now.sh/) <br>
[futbolmixto.now.sh](https://futbolmixto.now.sh/)

## Development
* Install deps

    ```bash
    npm i
    ```

* Get the spreadsheet id from the sheet url and execute the following to get the worksheets id

    ```bash
    SPREADSHEET_ID=<your-id> node src/list-worksheets.js
    ```

* Duplicate `template.env`, rename it as `local.env` and complete it with the right information.
* Start the server:

    ```bash
    # dev mode
    npm run start-local
    ```
* Access `http://localhost:2468/`

## "How can I use my own Google Spreadsheet as a database like you did?"

* [Check out these easy-to-follow steps](https://support.google.com/docs/answer/37579) to publish a Google Spreadsheet and use it as a database you can get data from.
* Look into `local.env` and change the corresponding values (`SPREADSHEET_ID`, `WORKSHEET_ID`, etc.) with your Google Spreasheet's information.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/4248944?v=4" width="100px;"/><br /><sub><b>Cristhian Duran</b></sub>](https://durancristhian.github.io/)<br />[💻](https://github.com/durancristhian/futbol/commits?author=durancristhian "Code") [🎨](#design-durancristhian "Design") [🤔](#ideas-durancristhian "Ideas, Planning, & Feedback") [🚇](#infra-durancristhian "Infrastructure (Hosting, Build-Tools, etc)") | [<img src="https://avatars0.githubusercontent.com/u/25598400?v=4" width="100px;"/><br /><sub><b>Mateo Silguero</b></sub>](https://github.com/mateosilguero)<br />[💻](https://github.com/durancristhian/futbol/commits?author=mateosilguero "Code") | [<img src="https://avatars0.githubusercontent.com/u/2634059?v=4" width="100px;"/><br /><sub><b>Hernan Rajchert</b></sub>](https://github.com/hrajchert)<br />[💻](https://github.com/durancristhian/futbol/commits?author=hrajchert "Code") [📖](https://github.com/durancristhian/futbol/commits?author=hrajchert "Documentation") |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Licence

MIT
