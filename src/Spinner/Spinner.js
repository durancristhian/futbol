import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import LazyLoad from 'react-lazyload';
import timer from './timer.svg';

class Spinner extends PureComponent {
  static propTypes = {
    message: PropTypes.string
  };

  static defaultProps = {
    message: 'Cargando...'
  };

  render() {
    const { message } = this.props;

    return (
      <div className="flex flex-column items-center justify-center pv4 pv5-ns">
        <h2 className="f4 f3-ns mb3 mt0 normal tc">{message}</h2>
        <LazyLoad height="100%" once={true}>
          <img src={timer} alt="Lesión" className={'h3 h4-ns w3 w4-ns'} />
        </LazyLoad>
      </div>
    );
  }
}

export default Spinner;
