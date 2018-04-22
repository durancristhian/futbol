import ball from './ball.svg';
import React, { PureComponent } from 'react';
import * as styles from './Header.module.css';

class Header extends PureComponent {
  render() {
    return (
      <div className="b--black-20 bb bg-white-80 pa3">
        <div className="center mw8">
          <h1 className="flex items-center mv0 normal">
            <img src={ball} alt="Pelota de fútbol" className={`${styles.ball}`} />
            <span className="f5 f4-ns ml3">{process.env.REACT_APP_TITLE}</span>
          </h1>
        </div>
      </div>
    );
  }
}

export default Header;
