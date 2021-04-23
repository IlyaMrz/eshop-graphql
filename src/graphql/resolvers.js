// https://www.apollographql.com/docs/react/data/mutations/
// https://www.apollographql.com/docs/react/caching/cache-configuration/

import { gql } from '@apollo/client'
import { cartHiddenVar, cartItemsVar, itemCountVar, totalVar } from '..';
import { addItemToCart, 
        removeItemFromCart, 
        getCartItemCount,
        clearItemFromCart, 
        getTotalCost } from './cart.utils';

export const typeDefs = gql`
    extend type Mutation {
        ToggleCartHidden: Bollean!
        AddItemToCart(item: Item!): [Item]!
        RemoveItemInCart(item: Item!): [Item]!
        ClearItemFromCart(item: Item!): [Item]!
        SetCurrentUser(user: User!): User!
    }

    extend type Item {
        quantity: Int
    }


    extend type DateTime {
        nanoseconds: Int!
        seconds: Int!
      }
    extend type User {
        id: ID!
        displayName: String!
        email: String!
        createdAt: DateTime!
    }
`

//@client means look in a cache
// const GET_CART_HIDDEN = gql`
//     {
//         cartHidden @client 
//     }
// `

// const GET_ITEM_COUNT = gql`
//     {
//         itemCount @client
//     }
// `

// const GET_CART_ITEMS = gql`
//     {
//         cartItems @client
//     }
// `
// const GET_TOTAL_COST = gql`
//     {
//         total @client
//     }
// `

// const GET_CURRENT_USER = gql`
//   {
//     currentUser @client
//   }
// `;

const updateCartItemsRelatedQueries = (cache, newCartItems) => {
    // cache.writeQuery({
    //   query: GET_ITEM_COUNT,
    //   data: { itemCount: getCartItemCount(newCartItems) }
    // });
    itemCountVar(getCartItemCount(newCartItems))
  
    // cache.writeQuery({
    //   query: GET_TOTAL_COST,
    //   data: { total: getTotalCost(newCartItems) }
    // });
    totalVar(getTotalCost(newCartItems))
  
    cartItemsVar(newCartItems)
  };

// https://www.apollographql.com/docs/apollo-server/data/resolvers/
export const resolvers = {
    Mutation: { 
        toggleCartHidden: (_root, _args, { cache }, _info) => { // _context = {client, cache}
            // const data = cache.readQuery({
            //     query: GET_CART_HIDDEN // we can get by variables={} aswell
            // });
            // const { cartHidden } = data;
            const newcartHidden = !cartHiddenVar();
            console.log(`inside of toggle Hidden ${!newcartHidden} -> ${newcartHidden}`)
            cartHiddenVar(newcartHidden)

            return newcartHidden
        },
        
        addItemToCart: (_root, { item }, { cache }, _info) => {
            const currentCartItems = cartItemsVar()
            const newCartItems = addItemToCart(currentCartItems, item);
            console.log('newCartItems', newCartItems)
            updateCartItemsRelatedQueries(cache, newCartItems);

            return newCartItems
        },

        removeItemInCart: (_root, { item }, { cache }, _info) => {
            // const { cartItems } = cache.readQuery({
            //     query: GET_CART_ITEMS
            // });
            const currentCartItems = cartItemsVar()
            const newCartItems = removeItemFromCart(currentCartItems, item);
            updateCartItemsRelatedQueries(cache, newCartItems);
            return newCartItems
        },

        clearItemFromCart: (_root, { item }, { cache }) => {
            // const { cartItems } = cache.readQuery({
            //   query: GET_CART_ITEMS
            // });
            const currentCartItems = cartItemsVar()
            const newCartItems = clearItemFromCart(currentCartItems, item);
      
            updateCartItemsRelatedQueries(cache, newCartItems);
      
            return newCartItems;
          }
        //   ,
        //   setCurrentUser: (_root, { user }, { cache }) => {
        //     cache.writeQuery({
        //       query: GET_CURRENT_USER,
        //       data: { currentUser: user }
        //     });
      
        //     return user;
        //   }
    }
}