import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import CookieConsent from "react-cookie-consent";
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import store from './Store';

import './App.scss';

import ScrollToTop from './Components/ScrollToTop';
import Header from './Components/Header';
import Footer from './Components/Footer';
import GoogleAnalytics from './Components/GoogleAnalytics';

import Home from './Views/Home';
import NoMatch from './Views/NoMatch';
import About from './Views/About';
import Post from './Views/Post';
import Category from './Views/Category';
import Country from './Views/Country';
import Privacy from './Views/Privacy';

const rollbarConfig = {
  accessToken: 'df02a0c0a7b940a599eacb1e67f33337',
  environment: 'production',
};

const App: React.FC = () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <CookieConsent
            disableStyles={true}
            buttonClasses="ms-auto btn btn-primary"
            containerClasses="cookie d-flex align-items-center p-2 bg-dark text-light"
            contentClasses=""
            buttonText="OK"
            buttonWrapperClasses="ms-auto"
          >
            Cookies are used to improve your expierience on this site. To find out more, read the <Link to='/privacy'>Privacy Policy</Link>.
          </CookieConsent>
          <ScrollToTop />
          <Header />
          <Switch>
            <Route exact path="/" component={GoogleAnalytics(Home)} />
            <Route path="/about" component={GoogleAnalytics(About)} />
            <Route path="/privacy" component={GoogleAnalytics(Privacy)} />
            <Route path="/post/:post" component={GoogleAnalytics(Post)} />
            <Route path="/category/:category" component={GoogleAnalytics(Category)} />
            <Route path="/country/:country" component={GoogleAnalytics(Country)} />
            <Route path="*" component={GoogleAnalytics(NoMatch)} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default App;
