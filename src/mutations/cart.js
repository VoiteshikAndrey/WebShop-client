import {gql} from "@apollo/client";

export const ADD_PRODUCT_TO_CART = gql `
    mutation addProductToCart($productId: String, $count: String) {
        addProductToCart(productId: $productId, count: $count) {
            id, 
            productList {
                productId,
                count
            }, 
            totalPrice
        }
    }
`;