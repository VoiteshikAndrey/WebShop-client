import {useDispatch, useSelector} from 'react-redux';

export const SaveSession = (cart, totalPrice, auth) => {
    console.log('Save');
    // const cart = useSelector(state => state.cart.cart); //Get cart from Redux  
    // const totalPrice = useSelector(state => state.cart.totalPrice);
    console.log(auth);
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice);
    localStorage.setItem('auth', JSON.stringify(auth));
}