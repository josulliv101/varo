import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Index from './Index/Index';
import NowPlaying from './NowPlaying/NowPlaying';
import Favorites from './Favorites/Favorites';
import UnknownPage from './UnknownPage/UnknownPage';

const Pages = () => (
  <Switch>
    <Route exact path="/" component={Index} />
    <Route exact path="/myfavorites" component={Favorites} />
    <Route exact path="/nowPlaying" component={NowPlaying} />
    <Route component={UnknownPage} />
  </Switch>
);

export default Pages;
