import React, { PureComponent } from 'react';
import LazyLoad from 'react-lazyload';
import injury from './injury.svg';
import { NavLink } from 'react-router-dom';

class NotFound extends PureComponent {
  render() {
    return (
      <div className="flex flex-column items-center justify-center ph3 pv4 pv5-ns">
        <h2 className="f4 f3-ns mb3 mt0 normal tc">404 - Page Not Found.</h2>
        <LazyLoad height="100%" once={true}>
          <img src={injury} alt="Lesión" className={'h3 h4-ns w3 w4-ns'} title="Lesión" />
        </LazyLoad>
        <NavLink to="/" className="color-inherit mt3" rel="noopener noreferrer">
          Volver a la página principal
        </NavLink>
      </div>
    );
  }
}

export default NotFound;
