import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "../../store/store";
import Header from './Header/Header';
import Pages from '../Pages/Pages';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <main aria-labelledby="pageTitle" className="Main">
            <Pages />
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
