import {createStore, combineReducers} from 'redux';
import {cartReduser} from './cartReduser';
import {authReduser} from './authReduser';
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReduser = combineReducers({
    cart: cartReduser,
    auth: authReduser
})



export const store = createStore(rootReduser, composeWithDevTools());

