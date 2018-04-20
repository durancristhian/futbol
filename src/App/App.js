import Error from '../Error/Error';
import * as gsheets from 'gsheets';
import Main from '../Main/Main';
import React, { Component } from 'react';
import Spinner from '../Spinner/Spinner';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: {},
      error: false,
      loading: true
    };
  }

  componentDidMount() {
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
        this.setState({
          dataset: { positions, covers, curiosities, shirts },
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          loading: false
        });
      });
  }

  render() {
    const { dataset, error, loading } = this.state;

    return (
      <div className="flex-auto">
        {loading && <Spinner />}
        {error && <Error />}
        {!error &&
          !loading && (
            <Main
              positions={dataset.positions}
              covers={dataset.covers}
              curiosities={dataset.curiosities}
              shirts={dataset.shirts}
            />
          )}
      </div>
    );
  }
}

export default App;
