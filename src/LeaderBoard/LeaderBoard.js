import { getPlayerImage } from '../utils/getPlayerImage';
import PropTypes from 'prop-types';
import React from 'react';

function getStylesFromIndex(index) {
  return {
    // prettier-ignore
    color: !index
      ? 'rgba(255, 215, 0, 0.8)'
      : index === 1
        ? 'rgba(192, 192, 192, 0.8)'
        : 'rgba(194, 163, 79, 0.8)',
    fontSize: !index ? 'f2 f1-ns' : 'f3 f2-ns',
    order: !index ? 'order-1' : index === 1 ? 'order-0' : 'order-2',
    paddingBottom: !index ? 'pb4 pb5-ns' : index === 1 ? 'pb3 pb4-ns' : 'pb2 pb3-ns',
    paddingTop: !index ? 'pt4 pt5-ns' : index === 1 ? 'pt3 pt4-ns' : 'pt2 pt3-ns',
    // prettier-ignore
    shadowClass: !index
      ? ''
      : index === 1
        ? 'leader-board-left-shadow'
        : 'leader-board-right-shadow',
    width: !index ? 'leader-board-first' : 'leader-board-second'
  };
}

const LeaderBoard = ({ leaders }) => {
  return (
    <div className="mh3 pv4 pv5-ns">
      <div className="flex items-end justify-center">
        <ul className="b--black-20 bb flex items-end justify-center list ph3 ph4-ns mv0">
          {leaders.map((leader, index) => {
            const {
              color,
              fontSize,
              order,
              paddingBottom,
              paddingTop,
              shadowClass,
              width
            } = getStylesFromIndex(index);

            return (
              <li key={leader['Jugador/a']} className={`${order} ${width}`}>
                <div className="tc">
                  <img
                    src={getPlayerImage(leader.Foto, 'large')}
                    alt={`${leader['Jugador/a']}`}
                    className={'br-100 center db image-shadow transform-origin-bottom w2 w3-ns'}
                    style={{ transform: `scale(${index ? '1' : '1.4'})` }}
                  />
                  <h3 className="mv2 normal truncate">{leader['Jugador/a']}</h3>
                </div>
                <div
                  className={`b--black-20 ${index !== 2 ? 'bl' : ''} ${
                    index !== 1 ? 'br' : ''
                  } bt ${fontSize} overflow-hidden ${paddingBottom} pl2 pr2 ${paddingTop} relative ${shadowClass} tc`}
                  style={{ backgroundColor: color }}
                >
                  <p className={`b black-70 mv0 ${fontSize}`}>{index + 1}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

LeaderBoard.propTypes = {
  leaders: PropTypes.arrayOf(
    PropTypes.shape({
      Foto: PropTypes.string.isRequired,
      'Jugador/a': PropTypes.string.isRequired,
      Puntos: PropTypes.number.isRequired
    })
  )
};

export default LeaderBoard;
