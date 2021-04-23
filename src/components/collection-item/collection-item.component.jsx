import { gql, useMutation } from '@apollo/client';
import React from 'react';


import CustomButton from '../custom-button/custom-button.component';

import './collection-item.styles.scss';

const ADD_ITEM_TO_CART = gql`
    mutation AddItemToCart($item: Item!) {
        addItemToCart(item: $item) @client
    }
`
const CollectionItem = ({ item }) => {
  const { name, price, imageUrl } = item;
  const [addItem] = useMutation(ADD_ITEM_TO_CART, {name:'addItemToCart',variables:{item}})
  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
      </div>
      <CustomButton onClick={(e) => {e.preventDefault(); addItem()}} inverted>
        Add to cart
      </CustomButton>
    </div>
  );
};


export default CollectionItem;
