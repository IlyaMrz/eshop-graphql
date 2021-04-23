import React from 'react';
import {flowRight as compose} from 'lodash';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import CheckoutPage from './checkout.component';

const GET_CART_ITEMS_AND_TOTAL = gql`
    {
        cartItems @client
        total @client
    }
`

const CheckoutPageContainer = (props) =>(
    <CheckoutPage total={props.data.total} cartItems={props.data.cartItems}/>
)

export default compose(
    graphql(GET_CART_ITEMS_AND_TOTAL)
)(CheckoutPageContainer);