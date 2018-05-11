import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import LazyLoad from 'react-lazyload';
import * as styles from './Covers.module.css';

class Cover extends PureComponent {
  static propTypes = {
    cover: PropTypes.shape({
      Fecha: PropTypes.string.isRequired,
      Portada: PropTypes.string.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
  };

  render() {
    const { cover, index, onClick } = this.props;

    return (
      <div className="pv3 pa3-l w-100 w-50-m w-33-l">
        <div className={index % 2 ? 'ml2-m ml0-l' : 'mr2-m mr0-l'}>
          <p className="mb2 mt0 tc">{cover.Fecha}</p>
          <LazyLoad height="100%" once={true}>
            <img
              src={cover.Portada}
              alt={`Tapa de Olé - ${cover.Fecha}`}
              className={`db center ${styles.mh100} ${styles.zoomIn}`}
              title={`Tapa de Olé - ${cover.Fecha}`}
              onClick={(event) => onClick(event, index)}
            />
          </LazyLoad>
        </div>
      </div>
    );
  }
}

export default Cover;
