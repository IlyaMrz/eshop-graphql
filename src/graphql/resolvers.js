// https://www.apollographql.com/docs/react/data/mutations/
// https://www.apollographql.com/docs/react/caching/cache-configuration/

import { gql } from 'apollo-boost';
import { addItemToCart, removeItemFromCart, getCartItemCount } from './cart.utils';

export const typeDefs = gql`
    extend type Mutation {
        ToggleCartHidden: Bollean!
        AddItemToCart(item: Item!): [Item]!
    }

    extend type Item {
        quantity: Int
    }
`

//@client means look in a cache
const GET_CART_HIDDEN = gql`
    {
        cartHidden @client 
    }
`

const GET_ITEM_COUNT = gql`
    {
        itemCount @client
    }
`

const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`

// https://www.apollographql.com/docs/apollo-server/data/resolvers/
export const resolvers = {
    Mutation: { 
        toggleCartHidden: (_root, _args, { cache }, _info) => { // _context = {client, cache}
            const data = cache.readQuery({
                query: GET_CART_HIDDEN // we can get by variables={} aswell
            });
            const { cartHidden } = data;
            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: {cartHidden: !cartHidden}
            })

            return !cartHidden
        },
        
        addItemToCart: (_root, { item }, { cache }, _info) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });
            const newCartItems = addItemToCart(cartItems, item);
            cache.writeQuery({
                query: GET_ITEM_COUNT,
                data: {itemCount: getCartItemCount(newCartItems)}
            })
            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: {cartItems: newCartItems}
            })

            return newCartItems
        },

        removeItemInCart: (_root, { item }, { cache }, _info) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });
            const newCartItems = removeItemFromCart(cartItems, item);
            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: {cartItems: newCartItems}
            })

            return newCartItems
        }
    }
}