import React, {useContext, useState, useEffect} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {useQuery, useMutation} from "@apollo/client";
import {GET_CART} from "../../query/cart";
import {GET_PRODUCT_BY_ID} from "../../query/product";
import {GET_ALL_PRODUCTS} from "../../query/product"
import {Query} from '@apollo/client/react/components';
import {useDispatch, useSelector} from 'react-redux';

import { GetTotalPrice } from '../../crunch/getTotalPrice';

import './cart.css';

export const Cart = () => {
    const cartId = "61efcf05599eca673ae3cf24";
    // const [cart, setCart] = useState();
    const cart = useSelector(state => state.cart.cart); //Get cart from Redux
    const cartReverse = Array.from(cart).reverse();
    // const [totalPrice, setTotalPrice] = useState(0);

    // let totalPrice = 0;
    const totalPrice = GetTotalPrice(cartReverse);
    console.log("TP", totalPrice);

    // const AddPrice = (price) => {
    //     console.log("TotalPrice ",totalPrice, "Price ", Number(price));
    //     totalPrice = totalPrice + Number(price);
    //     console.log("TotalPrice ",totalPrice);
    //     // localStorage.setItem('totalPrice', totalPrice);
    // }
    // const {data, loading, error} = useQuery(GET_CART, {
    //     variables: {
    //         id: "61efcf05599eca673ae3cf24"
    //     }
    // });

    // console.log("data", data);

    // useEffect(()=> {
    //     if(!loading) {
    //         console.log("Cart", cart);
    //         console.log("data", data);
    //         setCart(data.getCart);
    //     };
    // });

    return(
    <div className="cart">
        <div className="category-title">Cart</div>
        <Query query = {GET_CART} variables = {{id: "61efcf05599eca673ae3cf24"}}>
            {({loading, data})=> {
                if(loading) return "Loading...";
                // const cart = data.getCart;
                if(cartReverse){
                return cartReverse.map((productList) => {
                    return (
                        <Query query = {GET_PRODUCT_BY_ID} variables = {{id: productList.productId}}>
                            {({loading, data})=>{
                            if(loading) return "Loading...";
                            const product = data.getProduct;
                            // console.log("BEFORE", totalPrice);
                            // AddPrice(product.price);
                            // setTotalPrice(totalPrice + Number(product.price));
                            // console.log("AFTER", totalPrice);
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
                                    </div>
                
                                    <div className="amount">
                                        <div className="amount-button">+</div>
                                        <div className="number">1</div>
                                        <div className="amount-button">–</div>
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
