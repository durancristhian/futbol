import { Pie } from 'react-chartjs-2';
import { getPlayerImage } from '../utils/getPlayerImage';
import Position from '../Positions/Position';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';

class Card extends PureComponent {
  render() {
    const { position, index, totalPlayers } = this.props.location.state;

    return (
      <div className="ph3">
        <div className="center mw8">
          <div className="flex flex-column items-center justify-center pv4 pv5-ns">
            <div className="w-100 w-40-l">
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
                  <span className="black-30"> de {totalPlayers}</span>
                </p>
                <p className="mv3">
                  Récord: <span className="b">{position.Puntos} puntos</span>
                  <span className="black-30"> en {position.Jugados} partidos</span>
                </p>
                <p className="mv3">
                  Efectividad:{' '}
                  <span className="b">
                    {Number(position.Puntos * 100 / (position.Jugados * 3)).toFixed(2)} %
                  </span>
                </p>
                <Pie
                  data={{
                    labels: [
                      `Ganados (${position.Ganados})`,
                      `Empatados (${position.Empatados})`,
                      `Perdidos (${position.Perdidos})`
                    ],
                    datasets: [
                      {
                        data: [position.Ganados, position.Empatados, position.Perdidos],
                        backgroundColor: ['#19A974', '#96CCFF', '#FF725C'],
                        hoverBackgroundColor: ['#19A974', '#96CCFF', '#FF725C'],
                        borderColor: 'rgba(0, 0, 0, 0.5)',
                        borderWidth: 1
                      }
                    ]
                  }}
                  options={{
                    legend: {
                      labels: {
                        boxWidth: 20,
                        fontColor: '#555',
                        fontFamily:
                          '-apple-system, BlinkMacSystemFont, "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif',
                        fontSize: 12
                      },
                      position: 'bottom'
                    },
                    tooltips: {
                      enabled: false
                    }
                  }}
                />
              </div>
            </div>
            <a href="/" className="color-inherit f7 f6-ns mt3" rel="noopener noreferrer">
              Volver
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      index: PropTypes.number.isRequired,
      position: Position.propTypes.position,
      totalPlayers: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export default Card;
