import React from 'react';
import { useMutation, gql, useReactiveVar } from '@apollo/client';
import { itemCountVar } from '../..';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`


const CartIcon = () =>{
  const [toggleCartHidden] = useMutation(TOGGLE_CART_HIDDEN, {name: 'toggleCartHidden'});
  const itemCount = useReactiveVar(itemCountVar)
  return(
    <div className='cart-icon' onClick={()=>toggleCartHidden()}>
      <ShoppingIcon className='shopping-icon' />
      <span className='item-count'>{itemCount}</span>
    </div>
)};



export default CartIcon;
