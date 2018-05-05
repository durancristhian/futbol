import PropTypes from 'prop-types';
import React, { Component } from 'react';
import dataset from '../data/data.json';

class DataProvider extends Component {
  static propTypes = {
    Component: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(['home', 'card']).isRequired,
    name: PropTypes.string
  };

  state = {
    dataset
  };

  getPositionFromName(dataset, name) {
    return dataset.positions.find((position) => position['Jugador/a'].toLowerCase() === name);
  }

  render() {
    const { Component, mode, name } = this.props;
    const { dataset } = this.state;

    if (mode === 'home') return <Component dataset={dataset} />;
    if (mode === 'card') return <Component position={this.getPositionFromName(dataset, name)} />;

    return null;
  }
}

export default DataProvider;
