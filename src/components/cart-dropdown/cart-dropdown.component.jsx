import React from 'react';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';

import './cart-dropdown.styles.scss';
import { useMutation, useQuery, gql } from '@apollo/client';

const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`
const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`

const CartDropdown = ({ history, }) =>{ 
  const {data} = useQuery(GET_CART_ITEMS)
  // console.log(data,'data in dropdown')
  const [toggleCartHidden] = useMutation(TOGGLE_CART_HIDDEN, {name: 'toggleCartHidden'});
  return (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {data.cartItems.length ? (
        data.cartItems.map(cartItem => (
          <CartItem key={cartItem.id} item={cartItem} />
        ))
      ) : (
        <span className='empty-message'>Your cart is empty</span>
      )}
    </div>
    <CustomButton 
      onClick={() => {
        history.push('/checkout');
        toggleCartHidden();
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
)};


export default withRouter(CartDropdown);
