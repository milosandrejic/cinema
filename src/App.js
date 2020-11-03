import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import store from "./redux/store";
import {Provider} from 'react-redux';

import * as requestTypes from './services/requestTypeService';
import Main from "./containers/main/Main";
import MovieDetails from "./components/movie-details/MovieDetails";


function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' render={() => <Main type={requestTypes.BOTH}/>}/>
            <Route exact path='/movies' render={() => <Main type={requestTypes.MOVIE}/>}/>
            <Route exact path='/tv-shows' render={() => <Main type={requestTypes.SHOW}/>}/>
            <Route path='/details/:type/:id' component={Main} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
