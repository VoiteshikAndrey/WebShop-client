import {gql} from "@apollo/client";

export const ADD_PRODUCT_TO_CART = gql `
    mutation addProductToCart($productId: String, $count: String, $characteristic: ID) {
        addProductToCart(productId: $productId, count: $count, characteristic:  $characteristic) {
            id, 
            productList {
                productId,
                count,
                characteristic
            }, 
            totalPrice
        }
    }
`;

export const SAVE_CART_TO_DB = gql `
    mutation saveCartToDB($input: String) {
        saveCartToDB(input: $input) {
            data, errors
        }
    }
`;