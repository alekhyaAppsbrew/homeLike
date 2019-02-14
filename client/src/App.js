import React, {Component} from 'react';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import client from './ApolloClient';
import store from './store/configureStore';

import HomeView from './views/pages/HomeView';
import LocationsView from './views/pages/LocationsView';
import ApartmentView from "./views/pages/ApartmentView";
import SearchView from "./views/pages/SearchView";

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Router>
            <div>
              <Route exact path="/" component={HomeView}/>
              <Route exact path="/apartments/:apartmentId" component={ApartmentView}/>
              <Route exact path="/locations" component={LocationsView}/>
              <Route exact path="/search" component={SearchView}/>
            </div>
          </Router>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
