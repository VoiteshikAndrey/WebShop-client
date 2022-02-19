import {useQuery, useMutation} from "@apollo/client";
import {GET_CART} from "../query/cart";


// const DefaultState = async () => {
//     // const auth = JSON.parse(localStorage.getItem('auth'));
//     // console.log(auth);
//     // const { loading, error, data } =  useQuery(GET_CART, {
//     //         variables: {
//     //             input: "620f881c3c1a04ca8074736d",
//     //         }})

//     // if(auth.isAuthenticated){
//         // getCart({
//         //     variables: {
//         //         input: auth.cartId,
//         //     }
//         // }).then(({data}) => {
//         //     return {
//         //         cart: data.getCartById.cart,
//         //         totalPrice: 0
//         //     }
//         // })
//         return {
//             cart: [],
//             totalPrice: 0
//         }
//     // }
//     // else {
//     //     return { 
//     //         cart: localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): [],
//     //         totalPrice: localStorage.getItem('totalPrice')? localStorage.getItem('totalPrice'): 0,
//     //     }
//     // }
// }


// const defaultState = DefaultState();

// auth.isAuthenticated ? 
//     defaultState = {
//             cart: [],
//             totalPrice: 0
//         }
//     : defaultState = { 
//         cart: localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')): [],
//         totalPrice: localStorage.getItem('totalPrice')? localStorage.getItem('totalPrice'): 0,
//     }

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

const SET_CART = "SET_CART";
  
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
        case SET_CART:
            return {cart: action.payload.productList, totalPrice: action.payload.totalPrice};
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

export const setCart = (payload) => ({type: SET_CART, payload});