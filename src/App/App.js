import Error from '../Error/Error';
import Main from '../Main/Main';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Spinner from '../Spinner/Spinner';

class App extends PureComponent {
  render() {
    const { dataset, error, loading } = this.props;

    return (
      <div>
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

App.propTypes = {
  dataset: PropTypes.shape(Main.propTypes.main),
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

export default App;
