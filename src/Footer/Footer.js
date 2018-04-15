import PropTypes from 'prop-types';
import React from 'react';

const Footer = ({ currentTheme, changeTheme }) => (
  <div className="b--black-20 bb bw3 ph3 pv4 pv5-ns">
    <div className="f7 flex items-center justify-center">
      <span className="b">Apariencia:</span>
      <a
        href="#!"
        className={`color-inherit ml2 pa0 ${currentTheme === 'theme-yellow' ? '' : 'no-underline'}`}
        onClick={(event) => changeTheme(event, 'theme-yellow')}
      >
        Amarillito
      </a>
      <span className="ml2">|</span>
      <a
        href="#!"
        className={`color-inherit ml2 pa0 ${currentTheme === 'theme-blue' ? '' : 'no-underline'}`}
        onClick={(event) => changeTheme(event, 'theme-blue')}
      >
        Azulcito
      </a>
      <span className="ml2">|</span>
      <a
        href="#!"
        className={`color-inherit ml2 pa0 ${currentTheme === 'theme-green' ? '' : 'no-underline'}`}
        onClick={(event) => changeTheme(event, 'theme-green')}
      >
        Verdecito
      </a>
    </div>
    <p className="f7 flex items-center justify-center mb0 mt3">
      <span className="b mr2">Version:</span>
      <span>{process.env.REACT_APP_VERSION}</span>
      <span className="mh2">|</span>
      <a
        href="https://github.com/durancristhian/futbol"
        target="_blank"
        className="color-inherit no-underline"
        rel="noopener noreferrer"
      >
        Código fuente
      </a>
    </p>
  </div>
);

Footer.propTypes = {
  currentTheme: PropTypes.string.isRequired,
  changeTheme: PropTypes.func.isRequired
};

export default Footer;
