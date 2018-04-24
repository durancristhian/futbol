import { getPlayerImage } from '../utils/getPlayerImage';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import * as styles from './Positions.module.css';

class Position extends PureComponent {
  static propTypes = {
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

  render() {
    const { position, index, topScore } = this.props;
    const isTop = this.props.position.Puntos === topScore;

    return (
      <Link
        to={{
          pathname: `/ficha/${position['Jugador/a'].toLowerCase()}`
        }}
        className="color-inherit link"
      >
        <div className="b--moon-gray bb br bg-white-60 flex relative shadow-hover z-0">
          <div
            className={`b--black-20 br ${
              styles.cellNumber
            } flex items-center justify-end pa1 pa2-ns`}
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
            <span className={'truncate ' + (isTop && 'b')}>{position['Jugador/a']}</span>
          </div>
          <div
            className={`b--black-20 br ${
              styles.cellNumber
            } flex items-center justify-end pa1 pa2-ns`}
          >
            <span>{position.Jugados}</span>
          </div>
          <div
            className={`b--black-20 br ${
              styles.cellNumber
            } flex items-center justify-end pa1 pa2-ns`}
          >
            <span>{position.Ganados}</span>
          </div>
          <div
            className={`b--black-20 br ${
              styles.cellNumber
            } flex items-center justify-end pa1 pa2-ns`}
          >
            <span>{position.Empatados}</span>
          </div>
          <div
            className={`b--black-20 br ${
              styles.cellNumber
            } flex items-center justify-end pa1 pa2-ns`}
          >
            <span>{position.Perdidos}</span>
          </div>
          <div
            className={`b b--black-20 ${
              styles.cellNumber
            } flex items-center justify-end pa1 pa2-ns`}
          >
            <span>{position.Puntos}</span>
          </div>
        </div>
      </Link>
    );
  }
}

export default Position;
