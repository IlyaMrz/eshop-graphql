import React from 'react';
import { graphql } from 'react-apollo'; //compose was removed from React Apollo 
import {flowRight as compose} from 'lodash';
import { gql } from 'apollo-boost';

import CartIcon from './cart-icon.component';

const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`

const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`

const CartIconContainer = (props) =>{
    console.log('cartIconProps',props)
    return (
    <CartIcon itemCount={props.data.itemCount} 
        toggleCartHidden={props.toggleCartHidden}/>   
)}

export default compose(
    graphql(GET_ITEM_COUNT),
    graphql(TOGGLE_CART_HIDDEN, {name: 'toggleCartHidden'})
)(CartIconContainer);