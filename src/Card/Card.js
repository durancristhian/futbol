import { getPlayerImage } from '../utils/getPlayerImage';
import Position from '../Positions/Position';
import PropTypes from 'prop-types';
import React from 'react';

const Card = (props) => {
  const { position, index } = props.location.state;

  return (
    <div className="flex flex-column items-center justify-center ph3 pv4 pv5-ns">
      <div className="mh3 w-100 w-40-l">
        <h3 className="b--black-20 ba bg-black-10 mv0 normal ph3 pv2 tc">
          {position['Jugador/a']}
        </h3>
        <div className="b--black-20 bl br">
          <img
            className="db w-100"
            src={getPlayerImage(position.Foto)}
            alt={position['Jugador/a']}
          />
        </div>
        <div className="b--black-20 ba bg-white-60 pa3">
          <p className="mv0">
            Posición: <span className="b">{index}</span>
          </p>
        </div>
      </div>
      <a href="/" className="color-inherit f7 f6-ns mt3" rel="noopener noreferrer">
        Volver
      </a>
    </div>
  );
};

Card.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      index: PropTypes.number.isRequired,
      position: Position.propTypes.position
    }).isRequired
  }).isRequired
};

export default Card;
