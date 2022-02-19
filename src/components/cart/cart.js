import React, {useContext, useState, useEffect} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {useQuery, useMutation} from "@apollo/client";
import {GET_CART} from "../../query/cart";
import {GET_PRODUCT_BY_ID} from "../../query/product";
import {GET_ALL_PRODUCTS} from "../../query/product"
import {Query} from '@apollo/client/react/components';
import {useDispatch, useSelector} from 'react-redux';
import {addPrice} from '../../store/cartReduser';
import {removePrice} from '../../store/cartReduser';
import {removeProductAction} from '../../store/cartReduser';
import {addCount} from '../../store/cartReduser';
import {removeCount} from '../../store/cartReduser';

import './cart.css';

export const Cart = () => {
    document.getElementById('body').style.overflow = "visible";
    document.getElementById('body').style.padding = "0 0 0 0";

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.cart); //Get cart from Redux
    console.log("FASDASDASDasd");
    const cartReverse = Array.from(cart).reverse();

    const RemoveProduct = (product, count) => { //Удаляет все одинаковые предметы, если их больше 2
        console.log("PID", product);
        dispatch(removeProductAction(product.id));
        dispatch(removePrice(product.price*count)); 
    }

    
    const AddCount = (product) => {
        dispatch(addCount(product.id));
        dispatch(addPrice(product.price));
    }

    const RemoveCount = (product, count) => {
        if(count > 1){
            dispatch(removeCount(product.id));
            dispatch(removePrice(product.price)); 
        }
    }

    return(
    <div className="cart">
        <div className="category-title">Cart</div>
        <Query query = {GET_CART} variables = {{id: "61efcf05599eca673ae3cf24"}}>
            {({loading, data})=> {
                if(loading) return "Loading...";
                // const cart = data.getCart;
                    
                if(cartReverse){
                    console.log("cartReverse",cartReverse);
                    
                return cartReverse.map((productList) => {
                    return (
                        <Query query = {GET_PRODUCT_BY_ID} variables = {{id: productList.productId}}>
                            {({loading, data})=>{
                            if(loading) return "Loading...";
                            const product = data.getProduct;
                            
                            return (<>
                            <div className="product-list">
                                <div className="cart-product">
                                    <div className="info">
                                        <div className="brand">
                                            {product.productbrand}
                                        </div>
                                        <div className="product-name">
                                            {product.productname}
                                        </div>
                                        <div className="price">
                                            ${product.price}
                                        </div>
                                        <i class="fas fa-trash-alt" onClick={() => RemoveProduct(product, productList.count)}></i>
                                    </div>
                
                                    <div className="amount">
                                        <div className="amount-button" onClick={() => AddCount(product)}>+</div>
                                        <div className="number">{productList.count}</div>
                                        <div className="amount-button" onClick={() => RemoveCount(product,  productList.count)}>–</div>
                                    </div>
                
                                    <div className="image">
                                        <div className="switch switch-left"></div>
                                        <div className="switch switch-right"></div>
                                        <img src={product.images[0]} alt="" />
                                    </div>
                                </div>
                            </div>
                            </>)}}
                        </Query>
                        
                    )
                })}
            }}
        </Query>
    </div>)
};
