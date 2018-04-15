import LeaderBoard from '../LeaderBoard/LeaderBoard';
import Position from './Position';
import PropTypes from 'prop-types';
import React from 'react';

const Positions = ({ positions }) => {
  const topScore = Math.max(...positions.map((position) => position.Puntos));

  return (
    <div className="mt4 mt5-ns">
      <h2 className="f4 f3-ns tc">Tabla de posiciones</h2>
      <LeaderBoard leaders={positions.slice(0, 3)} />
      <div className="f7 flex items-center justify-end mb3 pt3">
        <span className="b">Ordenado por:</span>
        <span className="ml2">PT, PG, PJ y Nombre</span>
      </div>
      <div className="b b--black-20 bg-black-10 bl br bt flex">
        <div className="b--black-20 bb br cell-number flex justify-end pa1 pa2-ns">
          <span>#</span>
        </div>
        <div className="b--black-20 bb br cell-name pa1 pa2-ns">
          <span>Nombre</span>
        </div>
        <div className="b--black-20 bb br cell-number flex justify-end pa1 pa2-ns">
          <span>PJ</span>
        </div>
        <div className="b--black-20 bb br cell-number flex justify-end pa1 pa2-ns">
          <span>PG</span>
        </div>
        <div className="b--black-20 bb br cell-number flex justify-end pa1 pa2-ns">
          <span>PE</span>
        </div>
        <div className="b--black-20 bb br cell-number flex justify-end pa1 pa2-ns">
          <span>PP</span>
        </div>
        <div className="b--black-20 bb cell-number flex justify-end pa1 pa2-ns">
          <span>PT</span>
        </div>
      </div>
      <div className="b--black-20 bl">
        {positions.map((position, index) => (
          <Position
            key={position['Jugador/a']}
            position={position}
            index={index}
            topScore={topScore}
          />
        ))}
      </div>
    </div>
  );
};

Positions.propTypes = {
  positions: PropTypes.arrayOf(
    PropTypes.shape({
      Empatados: PropTypes.number.isRequired,
      Ganados: PropTypes.number.isRequired,
      'Jugador/a': PropTypes.string.isRequired,
      Jugados: PropTypes.number.isRequired,
      Perdidos: PropTypes.number.isRequired,
      Puntos: PropTypes.number.isRequired
    })
  )
};

export default Positions;
