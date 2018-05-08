import React, { PureComponent } from 'react';
import { Pie } from 'react-chartjs-2';
import LazyLoad from 'react-lazyload';
import Position from '../Positions/Position';
import { FONT_FAMILY } from '../utils/constants';

const pieDatasetOptions = {
  backgroundColor: ['#19A974', '#96CCFF', '#FF725C'],
  hoverBackgroundColor: ['#19A974', '#96CCFF', '#FF725C'],
  borderColor: 'rgba(0, 0, 0, 0.5)',
  borderWidth: 1
};
const pieOptions = {
  legend: {
    labels: {
      boxWidth: 20,
      fontColor: '#555',
      fontFamily: FONT_FAMILY,
      fontSize: 12
    },
    position: 'bottom'
  },
  tooltips: {
    enabled: false
  }
};

class Card extends PureComponent {
  static propTypes = {
    position: Position.propTypes.position.isRequired
  };

  render() {
    const { position } = this.props;

    return (
      <div className="fadeIn ph3">
        <div className="center mw8">
          <div className="flex flex-column items-center justify-center pv4 pv5-ns">
            <div className="w-100 w-40-l">
              <h3 className="b--black-20 ba bg-black-10 mv0 normal ph3 pv2 tc">
                {position['Jugador/a']}
              </h3>
              <div className="b--black-20 bl br">
                <LazyLoad height="100%" once={true}>
                  <img className="db w-100" src={position.Foto} alt={position['Jugador/a']} />
                </LazyLoad>
              </div>
              <div className="b--black-20 ba bg-white-60 pa3">
                <p className="mb1 mt0">Posición:</p>
                <p className="b f4 mv0">
                  <span className="b">{position.Posicion}</span>
                </p>
                <p className="mb1 mt4">Puntos obtenidos:</p>
                <p className="b f4 mb4 mt0">
                  <span className="b">{position.Puntos}</span>
                  <span className="black-30">
                    {' '}
                    en {position.Jugados} partido{position.Jugados !== 1 && 's'}
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
                        ...pieDatasetOptions
                      }
                    ]
                  }}
                  options={pieOptions}
                />
                <p className="mb1 mt4">Efectividad:</p>
                <p className="b f4 mv0">
                  {Number(position.Puntos * 100 / (position.Jugados * 3)).toFixed(2)} %
                </p>
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

export default Card;
