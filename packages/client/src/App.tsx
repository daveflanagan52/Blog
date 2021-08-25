import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import store from './Store';

import './App.scss';

import Home from './Views/Blog/Home';
import NoMatch from './Views/Blog/NoMatch';
import About from './Views/Blog/About';
import Post from './Views/Blog/Post';
import Category from './Views/Blog/Category';
import Country from './Views/Blog/Country';
import ScrollToTop from './Components/ScrollToTop';

const App: React.FC = () => (
  <Provider store={store}>
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/post/:post">
          <Post />
        </Route>

        <Route path="/category/:category">
          <Category />
        </Route>

        <Route path="/country/:country">
          <Country />
        </Route>

        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  </Provider>
);

export default App;
