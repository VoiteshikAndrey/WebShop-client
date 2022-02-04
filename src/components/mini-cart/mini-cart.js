import React, {useContext, useState, useEffect, useCallback} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {GET_CART} from "../../query/cart";
import {GET_PRODUCT_BY_ID} from "../../query/product";
import {Query} from '@apollo/client/react/components';
import {useQuery, useMutation} from "@apollo/client";
// import {AuthContext} from '../context/AuthContext';
import './mini-cart.css';
import { createPortal } from 'react-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addProductAction} from '../../store/cartReduser';

import { GetTotalPrice } from '../../crunch/getTotalPrice';


export const MiniCart = () => {

    const navigate = useNavigate();
    const cart = useSelector(state => state.cart.cart); //Get cart from Redux  
    // const {data, loading, error, refetch} = useQuery(GET_CART, {
    //     variables: {
    //         id: "61efcf05599eca673ae3cf24"
    //     }
    // });
    const cartReverse = Array.from(cart).reverse();
    console.log("CL", cartReverse);
    const productNumber = Object.keys(cart).length;
    // let totalPrice = 0;
    // const AddToTotalPrice = (price) => {
    //     totalPrice += Number(price);
    //     console.log("Total", totalPrice);
    // }
    //Save cart to localstorage, when user close page
    window.addEventListener('beforeunload', function (e) {localStorage.setItem('cart', JSON.stringify(cart))}) 

    const totalPrice = GetTotalPrice(cartReverse);

    const Test = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
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
                if(cartReverse.length) {
                    let content = []
                    for(let i = 0; i < 2; i++){
                        const productList = cartReverse[i]
                        content.push(
                            <Query query = {GET_PRODUCT_BY_ID} variables = {{id: productList.productId}}>
                            {({loading, data})=>{
                            if(loading) return "Loading...";
                            const product = data.getProduct;
                            // AddToTotalPrice(product.price);
                            return (<>
                        <div className="mini-products">
                            <div className="mini-product">
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
                                </div>
            
                                <div className="amount">
                                    <div className="amount-button">+</div>
                                    <div className="number">1</div>
                                    <div className="amount-button">–</div>
                                </div>
            
                                <div className="image">
                                    <img src={product.images[0]} alt="" />
                                </div>
                            </div>
            
                            
                        </div>
                            </>)
                            }}
                        </Query>
                        )
                    }
                    return content;
                }
                // return cart.map((productList) => {
                //     return (
                //         <Query query = {GET_PRODUCT_BY_ID} variables = {{id: productList.productId}}>
                //             {({loading, data})=>{
                //             if(loading) return "Loading...";
                //             const product = data.getProduct;
                            
                //             return (<>
                //         <div className="mini-products">
                //             <div className="mini-product">
                //                 <div className="info">
                //                     <div className="brand">
                //                         {product.productbrand}
                //                     </div>
                //                     <div className="product-name">
                //                         {product.productname}
                //                     </div>
                //                     <div className="price">
                //                         ${product.price}
                //                     </div>
                //                 </div>
            
                //                 <div className="amount">
                //                     <div className="amount-button">+</div>
                //                     <div className="number">1</div>
                //                     <div className="amount-button">–</div>
                //                 </div>
            
                //                 <div className="image">
                //                     <img src={product.images[0]} alt="" />
                //                 </div>
                //             </div>
            
                            
                //         </div>
                //             </>)
                //             }}
                //         </Query>)})
                // }
                else {
                    return "Empty";
                }
            }}
            </Query>
            <div className="section">
                <div className="additionally">  
                    <div className="text">and {productNumber - 2} more</div>
                </div>
            </div>

            <div className="total">
                Total <span className="price">${totalPrice}</span>
            </div>

            <div className="buttons">
                <div className="second-button button" onClick={() => navigate("/cart")}>
                    VIEW BAG
                </div>
                <div onClick={() => Test()}   className="button">
                    CHECK OUT
                </div>
            </div>
        </div>
        </div>
        </>
    );
};
