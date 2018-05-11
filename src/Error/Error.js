import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import LazyLoad from 'react-lazyload';
import injury from './injury.svg';

class Error extends PureComponent {
  static propTypes = {
    message: PropTypes.string
  };

  static defaultProps = {
    message: 'Ocurrió un error.'
  };

  render() {
    const { message } = this.props;

    return (
      <div className="flex flex-column items-center justify-center pv4 pv5-ns">
        <h2 className="f4 f3-ns mb3 mt0 normal tc">{message}</h2>
        <LazyLoad height="100%" once={true}>
          <img src={injury} alt="Lesión" className={'h3 h4-ns w3 w4-ns'} title="Lesión" />
        </LazyLoad>
        <a href="/" className="color-inherit f7 f6-ns mt3" rel="noopener noreferrer">
          Volver a intentar
        </a>
      </div>
    );
  }
}

export default Error;
