import React from 'react';
import  {useNavigate} from 'react-router-dom';
import {GET_CART} from "../../query/cart";
import {Query} from '@apollo/client/react/components';
import './mini-cart.css';
import {useDispatch, useSelector} from 'react-redux';
import { MiniProductCard } from './mini-productCard';
import { SaveSession } from '../../Utils/SaveSession';
import {SAVE_CART_TO_DB} from "../../mutations/cart"
import {useMutation} from "@apollo/client";

export const MiniCart = () => {
    const navigate = useNavigate();
    
    const cart = useSelector(state => state.cart); //Get cart from Redux  
    const totalPrice = useSelector(state => state.cart.totalPrice); //Get cart from Redux  Заменить потом чуть что расчёт в Redux
    const auth = useSelector(state => state.auth);
    const settings = useSelector(state=>state.settings);
    const [saveCart] = useMutation(SAVE_CART_TO_DB);
    const productListReverse = Array.from(cart.productList).reverse();
    const productNumber = Object.keys(cart.productList).length;
    
    window.addEventListener('beforeunload', function (e) { // Узнать куда можно перенести 
        console.log('Save session', cart);
        SaveSession(cart, auth);
        Save();
        console.log("Сохранили в локал");
    }) 
    
    const Save = async () => {
        try {
            saveCart({
                variables: {
                    input: JSON.stringify(cart)
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const Test = async () => {
        SaveSession(cart, auth);
        Save();
    }

    let content = [];
    if(productListReverse.length <= 2) {
        for(let i = 0; i < productListReverse.length; i++) {
            const productList = productListReverse[i]
            content.push(
                <MiniProductCard productList={productList}/>
            )
        }
    }
    else if (productListReverse.length > 2){
        for(let i = 0; i < 2; i++) {
            const productList = productListReverse[i]
            content.push(
                <MiniProductCard productList={productList}/>
            )
        }
        content.push(
            <div className="additionally">
                <div className="text">and {productNumber - 2} more</div>
            </div>
        )
    }

    console.log("MINICART");

    return (
        <>
        <div className="mini-cart">
        <div className="container">
            <div className="title">
                My Bag, <span className="items">{productNumber} items</span>
            </div>

            {content}

            <div className="total">
                Total <span className="price">{settings.currencies[settings.selectedСurrency].symbol + " " 
                +(totalPrice*settings.currencies[settings.selectedСurrency].rate).toFixed(2)}</span>
            </div>

            <div className="buttons">
                <div className="second-button button" onClick={() => navigate("/cart")}>
                    VIEW BAG
                </div>
                <div onClick={()=>Test()}className="button">
                    CHECK OUT
                </div>
            </div>
        </div>
        </div>
        </>
    );
};
