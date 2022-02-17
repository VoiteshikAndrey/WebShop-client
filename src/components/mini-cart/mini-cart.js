import React from 'react';
import  {useNavigate} from 'react-router-dom';
import {GET_CART} from "../../query/cart";
import {Query} from '@apollo/client/react/components';
import './mini-cart.css';
import {useDispatch, useSelector} from 'react-redux';
import { MiniProductCard } from './mini-productCard';

export const MiniCart = () => {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart.cart); //Get cart from Redux  
    const totalPrice = useSelector(state => state.cart.totalPrice); //Get cart from Redux  Заменить потом чуть что расчёт в Redux

    const cartReverse = Array.from(cart).reverse();
    const productNumber = Object.keys(cart).length;

    // window.addEventListener('beforeunload', function (e) { // Узнать куда можно перенести 
    //     localStorage.setItem('cart', JSON.stringify(cart));
    //     localStorage.setItem('totalPrice', totalPrice)
    // }) 

    const Test = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('totalPrice', totalPrice);
    }

    return (
        <>
        <div className="mini-cart">
        <div className="container">
            <div className="title">
                My Bag, <span className="items">{productNumber} items</span>
            </div>
            <Query query = {GET_CART} variables = {{id: "61efcf05599eca673ae3cf24"}}>
            {({loading, data}) => {
                if(loading && !cart) return "Loading...";
                console.log("cartReverse", cartReverse);
                if(cartReverse.length <= 2) {
                    let content = []
                    for(let i = 0; i < cartReverse.length; i++) {
                        const productList = cartReverse[i]
                        content.push(
                            <MiniProductCard productList={productList}/>
                        )
                    }
                    return content;
                }
                else if (cartReverse.length > 2){
                    let content = []
                    for(let i = 0; i < 2; i++) {
                        const productList = cartReverse[i]
                        content.push(
                            <MiniProductCard productList={productList}/>
                        )
                    }
                    content.push(
                        <div className="additionally">
                            <div className="text">and {productNumber - 2} more</div>
                        </div>
                    )
                    return content;
                }
            }}
            </Query>
            

            <div className="total">
                Total <span className="price">${totalPrice}</span>
            </div>

            <div className="buttons">
                <div className="second-button button" onClick={() => navigate("/cart")}>
                    VIEW BAG
                </div>
                <div onClick={() =>{window.flash('record has been created successfully!', 'error')}}className="button">
                    CHECK OUT
                </div>
                
            </div>
        </div>
        </div>
        </>
    );
};
