import React from 'react';
import { gql, useMutation} from '@apollo/client';

import './checkout-item.styles.scss';


const ADD_ITEM_TO_CART = gql`
    mutation AddItemToCart($item: Item!) {
        addItemToCart(item: $item) @client
    }
`
const REMOVE_ITEM_FROM_CART = gql`
  mutation RemoveItemInCart($item: Item!) {
    removeItemInCart(item: $item) @client
  }
`;
const CLEAR_ITEM_FROM_CART = gql`
  mutation ClearItemFromCart($item: Item!) {
    clearItemFromCart(item: $item) @client
  }
`;


const CheckoutItem = ( {cartItem} ) => { 
  const { name, imageUrl, price, quantity } = cartItem;
  const [addItem] = useMutation(ADD_ITEM_TO_CART, 
    {name:'addItemToCart',variables:{item: cartItem}} // watch out for a variables!!
    )
  const [removeItem] = useMutation(REMOVE_ITEM_FROM_CART, {name:'removeItemInCart',variables:{item: cartItem}})
  const [clearItem] = useMutation(CLEAR_ITEM_FROM_CART, {name:'clearItemFromCart',variables:{item: cartItem}})
  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='item' />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={(e) =>{e.preventDefault(); removeItem()}}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={(e) => {e.preventDefault(); addItem()}}>
          &#10095;
        </div>
      </span>
      <span className='price'>{price}</span>
      <div className='remove-button' onClick={(e) =>{e.preventDefault(); clearItem()}}>
        &#10005;
      </div>
    </div>
  );
};


export default CheckoutItem;
