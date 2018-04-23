import Main from '../Main/Main';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class App extends PureComponent {
  render() {
    const { dataset } = this.props;

    return (
      <Main
        positions={dataset.positions}
        covers={dataset.covers}
        curiosities={dataset.curiosities}
        shirts={dataset.shirts}
      />
    );
  }
}

App.propTypes = {
  dataset: PropTypes.shape(Main.propTypes.main)
};

export default App;
