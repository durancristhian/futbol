import { getPlayerImage } from '../utils/getPlayerImage';
import PropTypes from 'prop-types';
import React from 'react';
import * as styles from './Positions.module.css';

const Position = ({ position, index, topScore }) => {
  const isTop = position.Puntos === topScore;

  return (
    <div className="b--moon-gray bb br bg-white-60 flex relative z-0">
      <div
        className={`b--black-20 br ${styles.cellNumber} flex items-center justify-end pa1 pa2-ns`}
      >
        <span>{index + 1}</span>
      </div>
      <div className={`b--black-20 br ${styles.cellName} flex items-center pa1 pa2-ns`}>
        <div className="mr1 mr3-ns">
          <div
            className="bg-center cover h2 w2"
            style={{ backgroundImage: `url(${getPlayerImage(position.Foto)})` }}
          />
        </div>
        <span className={'truncate ' + (isTop ? 'b' : '')}>{position['Jugador/a']}</span>
      </div>
      <div
        className={`b--black-20 br ${styles.cellNumber} flex items-center justify-end pa1 pa2-ns`}
      >
        <span>{position.Jugados}</span>
      </div>
      <div
        className={`b--black-20 br ${styles.cellNumber} flex items-center justify-end pa1 pa2-ns`}
      >
        <span>{position.Ganados}</span>
      </div>
      <div
        className={`b--black-20 br ${styles.cellNumber} flex items-center justify-end pa1 pa2-ns`}
      >
        <span>{position.Empatados}</span>
      </div>
      <div
        className={`b--black-20 br ${styles.cellNumber} flex items-center justify-end pa1 pa2-ns`}
      >
        <span>{position.Perdidos}</span>
      </div>
      <div
        className={`b b--black-20 ${styles.cellNumber} flex items-center justify-end pa1 pa2-ns`}
      >
        <span>{position.Puntos}</span>
      </div>
    </div>
  );
};

Position.propTypes = {
  index: PropTypes.number.isRequired,
  position: PropTypes.shape({
    Empatados: PropTypes.number.isRequired,
    Ganados: PropTypes.number.isRequired,
    'Jugador/a': PropTypes.string.isRequired,
    Jugados: PropTypes.number.isRequired,
    Perdidos: PropTypes.number.isRequired,
    Puntos: PropTypes.number.isRequired
  }),
  topScore: PropTypes.number.isRequired
};

export default Position;
