import ball from '../assets/images/ball.png';
import React from 'react';

const Header = () => (
  <div className="b--black-20 bt bw3 ph3 pv4 pv5-ns">
    <div className="center mw8">
      <h1 className="f0 mv0 tc">
        <span className="animate-ball-path dib v-mid">
          <img src={ball} alt="Pelota de fútbol" className="db h2 rolling-ball w2" />
        </span>
        <span className="dib f3 f2-ns ml3 v-mid">{process.env.REACT_APP_TITLE}</span>
      </h1>
    </div>
  </div>
);

export default Header;
