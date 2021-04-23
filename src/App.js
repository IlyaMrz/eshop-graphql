import React, {useState, useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useMutation, useQuery, gql } from '@apollo/client';
import { currentUserVar } from './index'

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component'; //

import Header from './components/header/header.component'; //

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import Spinner from './components/spinner/spinner.component';

const SET_CURRENT_USER = gql`
  mutation SetCurrentUser($user: User!) {
    setCurrentUser(user: $user) @client
  }
`;

const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`;


const App = () => {

  useEffect(()=>{
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        console.log('auth App')
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          currentUserVar({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }
    });
      return () => (
        unsubscribeFromAuth())
    }, [])
    
    const { data } = useQuery(GET_CURRENT_USER)
    // if (loading) return <Spinner />
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              data.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
}


export default App;
