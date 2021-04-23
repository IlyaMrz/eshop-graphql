import React from 'react';
import { gql, useMutation} from '@apollo/client';

import './checkout-item.styles.scss';
// import CustomButton from '../custom-button/custom-button.component';


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


// const CheckoutItem = ({ item }) => {
//   const { name, price, imageUrl } = item;
//   const [addItem] = useMutation(ADD_ITEM_TO_CART, {name:'addItemToCart',variables:{item}})
//   return (
//     <div className='collection-item'>
//       <div
//         className='image'
//         style={{
//           backgroundImage: `url(${imageUrl})`
//         }}
//       />
//       <div className='collection-footer'>
//         <span className='name'>{name}</span>
//         <span className='price'>{price}</span>
//       </div>
//       <CustomButton onClick={(e) => {e.preventDefault(); addItem()}} inverted>
//         Add to cart
//       </CustomButton>
//     </div>
//   );
// };

const CheckoutItem = ( {cartItem} ) => { // WHY WORKS WITH ITEM BUT NOT WITH cartItem???? bc of variables!
  // console.log(cartItem)
  const { name, imageUrl, price, quantity } = cartItem;
  const [addItem] = useMutation(ADD_ITEM_TO_CART, {name:'addItemToCart',variables:{item: cartItem}})
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
