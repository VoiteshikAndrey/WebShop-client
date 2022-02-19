import {gql} from "@apollo/client";

export const GET_CART = gql `
    query getCartById($id: ID){
        getCartById(id: $id){
            id, 
            productList {
                productId,
                count
            }, 
            totalPrice
        }
    }
`;
