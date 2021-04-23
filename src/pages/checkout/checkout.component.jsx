import { useQuery, useReactiveVar, gql } from '@apollo/client';
import React from 'react';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import './checkout.styles.scss';

const GET_CART_ITEMS_AND_TOTAL = gql`
    {
        cartItems @client
        total @client
    }
`

const CheckoutPage = () =>{ 
  const {loading, error, data} = useQuery(GET_CART_ITEMS_AND_TOTAL)
  if (loading) return <div>loading....</div>
  console.log('checkoutPage', data)
  const { total, cartItems} = data;
  return (
  <div className='checkout-page'>
    <div className='checkout-header'>
      <div className='header-block'>
        <span>Product</span>
      </div>
      <div className='header-block'>
        <span>Description</span>
      </div>
      <div className='header-block'>
        <span>Quantity</span>
      </div>
      <div className='header-block'>
        <span>Price</span>
      </div>
      <div className='header-block'>
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map(cartItem => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className='total'>TOTAL: ${total}</div>
    <div className='test-warning'>
      *Please use the following test credit card for payments*
      <br />
      4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
    </div>
    <StripeCheckoutButton price={total} />
  </div>
)};

export default CheckoutPage;
