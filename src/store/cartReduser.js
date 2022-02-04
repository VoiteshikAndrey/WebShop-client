import {useQuery, useMutation} from "@apollo/client";
import {GET_CART} from "../query/cart";
// const Cart = () => {
//     const {data, loading, error} = useQuery(GET_CART, {
//         variables: {
//             id: "61efcf05599eca673ae3cf24"
//         }
//     });
//     return data.getCart.productList;
// };

const defaultState = { 
    cart: localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): [],
    // cart: [],
}
  
console.log("Looook", defaultState);
// console.log("Looook", Cart());



const ADD_PRODUCT = "ADD_PRODUCT";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
  
export const cartReduser = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {...state, cart: [...state.cart, action.payload]};
        case REMOVE_PRODUCT:
            return {...state, cart: state.cart.filter(product => product.productId !== action.payload)};
        default:
        return state;
    }
}
  
export const addProductAction = (payload) => ({type: ADD_PRODUCT, payload})
export const removeProductAction = (payload) => ({type: REMOVE_PRODUCT, payload})