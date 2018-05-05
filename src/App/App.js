import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Main from '../Main/Main';

class App extends PureComponent {
  static propTypes = {
    dataset: PropTypes.shape(Main.propTypes.main).isRequired
  };

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

export default App;
