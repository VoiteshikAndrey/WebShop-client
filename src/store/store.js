import {createStore, combineReducers} from 'redux';
import {cartReduser} from './cartReduser';
import {authReduser} from './authReduser';
import {categoryReduser} from './categoryReduser';
import {settingsReduser} from './settingsReduser';
import {composeWithDevTools} from 'redux-devtools-extension';

const rootReduser = combineReducers({
    cart: cartReduser,
    auth: authReduser,
    category: categoryReduser,
    settings: settingsReduser
})



export const store = createStore(rootReduser, composeWithDevTools());

