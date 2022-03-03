const cart = JSON.parse(localStorage.getItem('cart'));
const defaultState = { 
    productList: cart ? cart.productList : [],
    totalPrice: cart ? cart.totalPrice : 0,
    cartId: cart ? cart.cartId : 0,
}
  
const clearState = {
    productList: [],
    totalPrice: 0
}

const ADD_PRODUCT = "ADD_PRODUCT";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
  
const ADD_COUNT = "ADD_COUNT";
const REMOVE_COUNT = "REMOVE_COUNT";

const SET_CART = "SET_CART";
const CLEAR_CART = "CLEAR_CART";
  
export const cartReduser = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            return {...state, productList: [...state.productList, action.payload.product], 
                totalPrice: state.totalPrice + action.payload.price};
        case REMOVE_PRODUCT:
            return {...state, productList: state.productList.filter(product => product.productId !== action.payload.productId),
                 totalPrice: state.totalPrice - action.payload.price};
        case ADD_COUNT:
            state.productList.map(product => {if(product.productId === action.payload.productId){product.count += 1}});
            let addCount = state.productList.concat();
            return {...state, productList: addCount, totalPrice: state.totalPrice + action.payload.price};
        case REMOVE_COUNT:
            state.productList.map(product => {if(product.productId === action.payload.productId){product.count -= 1}});
            let removeCount = state.productList.concat();
            return {...state, productList: removeCount, totalPrice: state.totalPrice - action.payload.price};
        case SET_CART:
            return {productList: action.payload.productList, totalPrice: action.payload.totalPrice, cartId: action.payload._id};
        case CLEAR_CART: 
            return clearState;
        default:
        return state;
    }
}
  
export const addProductAction = (payload) => ({type: ADD_PRODUCT, payload});
export const removeProductAction = (payload) => ({type: REMOVE_PRODUCT, payload});

export const addCount = (payload) => ({type: ADD_COUNT, payload});
export const removeCount = (payload) => ({type: REMOVE_COUNT, payload});

export const setCart = (payload) => ({type: SET_CART, payload});
export const clearCart = (payload) => ({type: CLEAR_CART, payload});