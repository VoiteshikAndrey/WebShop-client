import {createStore, combineReducers} from 'redux';
import {cartReduser} from './cartReduser';
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReduser = combineReducers({
    cart: cartReduser,
})

export const store = createStore(rootReduser, composeWithDevTools());