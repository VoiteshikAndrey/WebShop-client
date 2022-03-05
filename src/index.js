import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';

import {Provider} from 'react-redux';
import {store} from './store/store';

const client = new ApolloClient({
  // uri: 'http://206.189.55.151:80/graphql',
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})



ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode> 
    </ApolloProvider>
  </Provider>,


  document.getElementById('root')
);

reportWebVitals();
