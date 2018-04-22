import AsyncComponent from '../HOC/AsyncComponent';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import NotFound from '../404/404';
import React, { Component } from 'react';
import * as styles from './Layout.module.css';
import themeManager from '../utils/themeManager';

const AsyncApp = AsyncComponent({
  loader: () => import('../App/App')
});

class Layout extends Component {
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
    const { bgMain, transition } = styles;
    const { theme } = this.state;

    return (
      <div
        className={`${bgMain} f6 f5-ns flex flex-column lh-copy mid-gray min-vh-100 sans-serif ${theme} ${transition}`}
      >
        <Header />
        <div className="flex-auto relative">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={() => <AsyncApp />} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </div>
        <Footer currentTheme={theme} changeTheme={this.changeTheme} />
      </div>
    );
  }
}

export default Layout;
