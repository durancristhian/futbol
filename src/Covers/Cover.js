import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import * as styles from './Covers.module.css';

class Cover extends PureComponent {
  render() {
    const { cover, index, onClick } = this.props;

    return (
      <div className="pv3 pa3-l w-100 w-50-m w-33-l">
        <div className={index % 2 ? 'ml2-m ml0-l' : 'mr2-m mr0-l'}>
          <p className="mb2 mt0 tc">{cover.Fecha}</p>
          <img
            src={cover.Portada}
            alt={`Tapa de Olé - ${cover.Fecha}`}
            className={`db center ${styles.mh100} ${styles.zoomIn}`}
            onClick={(event) => onClick(event, index)}
          />
        </div>
      </div>
    );
  }
}

Cover.propTypes = {
  cover: PropTypes.shape({
    Fecha: PropTypes.string.isRequired,
    Portada: PropTypes.string.isRequired
  }),
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Cover;
