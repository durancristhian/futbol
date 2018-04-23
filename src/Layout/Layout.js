import AsyncComponent from '../HOC/AsyncComponent';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from '../Footer/Footer';
import * as gsheets from 'gsheets';
import Header from '../Header/Header';
import NotFound from '../404/404';
import React, { Component } from 'react';
import * as styles from './Layout.module.css';
import themeManager from '../utils/themeManager';

const AsyncApp = AsyncComponent({
  loader: () => import('../App/App')
});

const AsyncCard = AsyncComponent({
  loader: () => import('../Card/Card')
});

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: {},
      error: false,
      loading: true,
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

  componentDidMount() {
    const dataPromises = [
      gsheets
        .getWorksheetById(
          process.env.REACT_APP_SPREADSHEET_ID,
          process.env.REACT_APP_POSITIONS_WORKSHEET_ID
        )
        .then((worksheet) => worksheet.data),
      gsheets
        .getWorksheetById(
          process.env.REACT_APP_SPREADSHEET_ID,
          process.env.REACT_APP_COVERS_WORKSHEET_ID
        )
        .then((worksheet) => worksheet.data),
      gsheets
        .getWorksheetById(
          process.env.REACT_APP_SPREADSHEET_ID,
          process.env.REACT_APP_CURIOSITIES_WORKSHEET_ID
        )
        .then((worksheet) => worksheet.data)
    ];

    if (process.env.REACT_APP_SHIRTS_WORKSHEET_ID) {
      dataPromises.push(
        gsheets
          .getWorksheetById(
            process.env.REACT_APP_SPREADSHEET_ID,
            process.env.REACT_APP_SHIRTS_WORKSHEET_ID
          )
          .then((worksheet) => worksheet.data)
      );
    }

    Promise.all(dataPromises)
      .then(([positions, covers, curiosities, shirts]) => {
        this.setState({
          dataset: { positions, covers, curiosities, shirts },
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          error: true,
          loading: false
        });
      });
  }

  render() {
    const { bgMain, transition } = styles;
    const { dataset, error, loading, theme } = this.state;

    return (
      <div
        className={`${bgMain} f6 f5-ns flex flex-column lh-copy mid-gray min-vh-100 sans-serif ${theme} ${transition}`}
      >
        <Header />
        <div className="flex-auto">
          <BrowserRouter>
            <Switch>
              <Route
                exact
                path="/"
                component={() => <AsyncApp dataset={dataset} error={error} loading={loading} />}
              />
              <Route
                exact
                path="/ficha/:name"
                component={(props) => (
                  <AsyncCard
                    error={error}
                    index={
                      !loading &&
                      !error &&
                      dataset.positions.findIndex(
                        (position) =>
                          position['Jugador/a'].toLowerCase() === props.match.params.name
                      ) + 1
                    }
                    loading={loading}
                    position={
                      !loading &&
                      !error &&
                      dataset.positions.find(
                        (position) =>
                          position['Jugador/a'].toLowerCase() === props.match.params.name
                      )
                    }
                    totalPlayers={!loading && !error && dataset.positions.length}
                  />
                )}
              />
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
