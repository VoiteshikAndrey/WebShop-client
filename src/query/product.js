import {gql} from "@apollo/client";

export const GET_ALL_PRODUCTS = gql `
    query {
        getAllProducts {
            id, productname, productbrand, price, category, images
        }
    }
`;

export const GET_PRODUCT_BY_ID = gql `
    query getProduct($id: ID){
        getProduct(id: $id){
            id, productname, productbrand, price, category, images
        }
    }
`

export const GET_PRODUCT_PRICE = gql `
    query getProduct($id: ID){
        getProduct(id: $id){
            price
        }
    }
`