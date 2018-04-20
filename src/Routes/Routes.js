import AsyncComponent from '../Async/Async';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import React, { Component } from 'react';
import * as styles from './Routes.module.css';
import themeManager from '../utils/themeManager';

const AsyncApp = AsyncComponent({
  loader: () => import('../App/App')
});

const AsyncNotFound = AsyncComponent({
  loader: () => import('../404/404')
});

export default class Routes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: themeManager.get()
    };

    this.changeTheme = this.changeTheme.bind(this);
  }

  changeTheme(event, newTheme) {
    event.preventDefault();

    themeManager.save(newTheme);

    this.setState({
      theme: newTheme
    });
  }

  render() {
    const { theme } = this.state;
    return (
      <div
        className={`${styles['bg-main']} mid-gray ${
          styles['fade-in']
        } f6 f5-ns flex flex-column lh-copy min-vh-100 sans-serif ${theme} ${styles['transition']}`}
      >
        <div>
          <Header />
        </div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={AsyncApp} />
            <Route component={AsyncNotFound} />
          </Switch>
        </BrowserRouter>
        <div>
          <Footer currentTheme={theme} changeTheme={this.changeTheme} />
        </div>
      </div>
    );
  }
}
