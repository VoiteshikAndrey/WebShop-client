import {useQuery, useMutation} from "@apollo/client";


const defaultState = { 
    isAuthenticated: localStorage.getItem('isAuthenticated') ? localStorage.getItem('isAuthenticated') : false,
    token: localStorage.getItem('isAuthenticated') ? localStorage.getItem('isAuthenticated') : null,
    userId: localStorage.getItem('userId') ? localStorage.getItem('userId') : null,
    userRole: localStorage.getItem('userRole') ? localStorage.getItem('userRole') : "guest",
    userName: localStorage.getItem('userName') ? localStorage.getItem('userName') : "guest",
    userAvatar: localStorage.getItem('userAvatar') ? localStorage.getItem('userAvatar') : "",
}
  
const logoutState = {
    isAuthenticated: false,
    token: null,
    userId: null,
    userRole: "guest",
    userName: "guest",
    userAvatar: ""
}

const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";

// const ADD_PRICE = "ADD_PRICE";
// const REMOVE_PRICE = "REMOVE_PRICE";
  
// const ADD_COUNT = "ADD_COUNT";
// const REMOVE_COUNT = "REMOVE_COUNT";
  
export const authReduser = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, isAuthenticated: true, userId: action.payload._id, userName: action.payload.userName, 
                role: action.payload.role, userAvatar: action.payload.avatar};
        case LOGOUT_USER:
            return logoutState;
        default:
        return state;
    }
}
  
export const loginUserAction = (payload) => ({type: LOGIN_USER, payload});
export const logoutUserAction = (payload) => ({type: LOGOUT_USER, payload});

// export const addPrice = (payload) => ({type: ADD_PRICE, payload});
// export const removePrice = (payload) => ({type: REMOVE_PRICE, payload});

// export const addCount = (payload) => ({type: ADD_COUNT, payload});
// export const removeCount = (payload) => ({type: REMOVE_COUNT, payload});