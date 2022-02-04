import {gql} from "@apollo/client";

export const GET_CART = gql `
    query getCart($id: ID){
        getCart(id: $id){
            id, 
            productList {
                productId,
                count
            }, 
            totalPrice
        }
    }
`;
