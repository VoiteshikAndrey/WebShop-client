let auth = true;
try {
    auth = JSON.parse(localStorage.getItem('auth'));

} catch (e) {
    auth = false;
}

const defaultState = { 
    isAuthenticated: auth ? auth.isAuthenticated : false,
    token: auth ? auth.token : null,
    userId: auth ? auth.userId : null,
    cartId: auth ? auth.cartId : null,
    userRole: auth ? auth.userRole : "guest",
    userName: auth ? auth.userName : "guest",
    userAvatar: auth ? auth.userAvatar : "",
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
  
export const authReduser = (state = defaultState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            console.log("action",action);
            return {...state, isAuthenticated: true, userId: action.payload._id, userName: action.payload.userName, 
                role: action.payload.role, userAvatar: action.payload.avatar, cartId: action.payload.cartId};
        case LOGOUT_USER:
            return logoutState;
        default:
        return state;
    }
}
  
export const loginUserAction = (payload) => ({type: LOGIN_USER, payload});
export const logoutUserAction = (payload) => ({type: LOGOUT_USER, payload});
