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
    totalPrice: localStorage.getItem('totalPrice')? localStorage.getItem('totalPrice'): 0,
}
  
const ADD_PRODUCT = "ADD_PRODUCT";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";

const ADD_PRICE = "ADD_PRICE";
const REMOVE_PRICE = "REMOVE_PRICE";
  
const ADD_COUNT = "ADD_COUNT";
const REMOVE_COUNT = "REMOVE_COUNT";
  
export const cartReduser = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {...state, cart: [...state.cart, action.payload]};
        case REMOVE_PRODUCT:
            return {...state, cart: state.cart.filter(product => product.productId !== action.payload)};
        case ADD_PRICE:
            return {...state, totalPrice: Number(state.totalPrice) + Number(action.payload)};
        case REMOVE_PRICE:
            return {...state, totalPrice: Number(state.totalPrice) - Number(action.payload)};
        case ADD_COUNT:
            state.cart.map(product => {if(product.productId === action.payload){product.count += 1}});
            let addCount = state.cart.concat();
            return {...state, cart: addCount};
        case REMOVE_COUNT:
            state.cart.map(product => {if(product.productId === action.payload){product.count -= 1}});
            let removeCount = state.cart.concat();
            return {...state, cart: removeCount};
        default:
        return state;
    }
}
  
export const addProductAction = (payload) => ({type: ADD_PRODUCT, payload});
export const removeProductAction = (payload) => ({type: REMOVE_PRODUCT, payload});

export const addPrice = (payload) => ({type: ADD_PRICE, payload});
export const removePrice = (payload) => ({type: REMOVE_PRICE, payload});

export const addCount = (payload) => ({type: ADD_COUNT, payload});
export const removeCount = (payload) => ({type: REMOVE_COUNT, payload});