import Error from '../Error/Error';
import * as gsheets from 'gsheets';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Spinner from '../Spinner/Spinner';

class DataProvider extends Component {
  static propTypes = {
    Component: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(['home', 'card']).isRequired,
    name: PropTypes.string
  };

  state = {
    dataset: {},
    error: false,
    loading: true
  };

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

  getIndexFromName(dataset, name) {
    return (
      dataset.positions.findIndex((position) => position['Jugador/a'].toLowerCase() === name) + 1
    );
  }

  getPositionFromName(dataset, name) {
    return dataset.positions.find((position) => position['Jugador/a'].toLowerCase() === name) + 1;
  }

  render() {
    const { Component, mode, name } = this.props;
    const { dataset, error, loading } = this.state;

    if (loading) return <Spinner />;
    if (error) return <Error />;
    if (mode === 'home') return <Component dataset={dataset} />;
    if (mode === 'card')
      return (
        <Component
          index={this.getIndexFromName(dataset, name)}
          position={this.getPositionFromName(dataset, name)}
          totalPlayers={dataset.positions.length}
        />
      );

    return null;
  }
}

export default DataProvider;
