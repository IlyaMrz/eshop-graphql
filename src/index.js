import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ApolloProvider, 
        ApolloClient, 
        InMemoryCache, 
        gql, makeVar, createHttpLink } from '@apollo/client';

import { store, persistor } from './redux/store';

import './index.css';
import App from './App';
import { resolvers, typeDefs } from './graphql/resolvers';

const httpLink = createHttpLink({
  uri: 'https://crwn-clothing.com/'
});

const cache = new InMemoryCache({
  typePolicies:{
    Query: {
      fields: {
        cartItems() {
          return cartItemsVar();
        },
        cartHidden() {
          return cartHiddenVar();
        },
        itemCount() {
          return itemCountVar();
        },
        total() {
          return totalVar();
        },
        currentUser() {
          return currentUserVar();
        }
      }
    }
  }
});
const client = new ApolloClient({
  link: httpLink,
  cache,
  resolvers,
  typeDefs
})


export const cartItemsVar = cache.makeVar([])
export const cartHiddenVar = cache.makeVar(true)
export const itemCountVar = cache.makeVar(0)
export const totalVar = cache.makeVar(0)
export const currentUserVar = cache.makeVar(null)

client.query({
  query: gql`{
    getCollectionsByTitle(title: "Hats") {
      title
      items {
        imageUrl
      }
    }
  }
  `
}).then(res =>console.log('resdata',res.data))
client.query({
  query: gql`{
    total
  }
  `
}).then(res =>console.log('total',res.data))



ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
