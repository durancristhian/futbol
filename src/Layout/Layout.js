import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from '../404/404';
import DataProvider from '../DataProvider/DataProvider';
import Footer from '../Footer/Footer';
import AsyncComponent from '../HOC/AsyncComponent';
import Header from '../Header/Header';
import themeManager from '../utils/themeManager';
import * as styles from './Layout.module.css';

const AsyncApp = AsyncComponent({
  loader: () => import('../App/App')
});

const AsyncCard = AsyncComponent({
  loader: () => import('../Card/Card')
});

class Layout extends Component {
  state = {
    theme: themeManager.get()
  };

  changeTheme = (event, newTheme) => {
    event.preventDefault();

    themeManager.save(newTheme);

    this.setState({
      theme: newTheme
    });
  };

  render() {
    const { bgMain, transition } = styles;
    const { theme } = this.state;

    return (
      <BrowserRouter>
        <div
          className={`${bgMain} f6 f5-ns flex flex-column lh-copy mid-gray min-vh-100 sans-serif ${theme} ${transition}`}
        >
          <Header />
          <div className="flex-auto">
            <Switch>
              <Route
                exact
                path="/"
                component={() => <DataProvider Component={AsyncApp} mode="home" />}
              />
              <Route
                exact
                path="/ficha/:name"
                component={(props) => (
                  <DataProvider Component={AsyncCard} mode="card" name={props.match.params.name} />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer currentTheme={theme} changeTheme={this.changeTheme} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Layout;
