import React, { PureComponent } from 'react';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import * as styles from './Header.module.css';
import ball from './ball.svg';

class Header extends PureComponent {
  render() {
    return (
      <div className="b--black-20 bb bg-white-80 pa3">
        <div className="center mw8">
          <h1 className="dib mv0 normal v-btm">
            <Link to="/" className="color-inherit flex items-center link">
              <LazyLoad height="100%" once={true}>
                <img
                  src={ball}
                  alt="Pelota de fútbol"
                  className={`${styles.ball} dib v-mid`}
                  title="Pelota de fútbol"
                />
              </LazyLoad>
              <span className="dib f5 f4-ns ml3 v-mid">{process.env.REACT_APP_TITLE}</span>
            </Link>
          </h1>
        </div>
      </div>
    );
  }
}

export default Header;
