import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'


import HomePage from "./pages/home";
import InfoPage from "./pages/info";
import CallbackPage from "./pages/callback";
import Auth from "./components/Auth";


const client = new ApolloClient({
  // uri: process.env.REACT_APP_GRAPHQL_URI || '/graphql',
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Auth>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/info" component={InfoPage}/>
          <Route path="/callback" component={CallbackPage}/>
        </Switch>
      </Router>
      </Auth>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

