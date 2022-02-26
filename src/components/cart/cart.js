import React from 'react';
import {GET_PRODUCT_BY_ID} from "../../query/product";
import {Query} from '@apollo/client/react/components';
import {useDispatch, useSelector} from 'react-redux';
import {removeProductAction} from '../../store/cartReduser';
import {addCount} from '../../store/cartReduser';
import {removeCount} from '../../store/cartReduser';

import './cart.css';

export const Cart = () => {
    document.getElementById('body').style.overflow = "visible";
    document.getElementById('body').style.padding = "0 0 0 0";

    const dispatch = useDispatch();
    const settings = useSelector(state=>state.settings);
    const cart = useSelector(state => state.cart); //Get cart from Redux
    const productListReverse = Array.from(cart.productList).reverse();

    const RemoveProduct = (product, count) => {
        console.log("PID", product);
        dispatch(removeProductAction({productId: product.id, price: product.price*count}));
    }

    
    const AddCount = (product) => {
        dispatch(addCount({productId: product.id, price: product.price}));
    }

    const RemoveCount = (product, count) => {
        if(count > 1){
            dispatch(removeCount({productId: product.id, price: product.price}));
        }
    }

    return(
    <div className="cart">
        <div className="category-title">Cart</div>
        {productListReverse.map((productList) => {
                return (
                    <Query query = {GET_PRODUCT_BY_ID} variables = {{id: productList.productId}}>
                        {({loading, data})=>{
                        if(loading) return "Loading...";
                        const product = data.getProduct;
                        
                        return (<>
                        <div className="product-list">
                            <div className="cart-product">
                                <div className="info">
                                    <div>
                                        <div className="brand">
                                            {product.productbrand}
                                        </div>
                                        <div className="product-name">
                                            {product.productname}
                                        </div>
                                    </div>
                                    <div className="price">
                                        {settings.currencies[settings.selectedСurrency].symbol + " " +(product.price*settings.currencies[settings.selectedСurrency].rate).toFixed(2)}
                                    </div>

                                    <div className="cart-option">
                                        <div className="option">
                                            {Array.from(product.characteristics.variants.filter(variant => variant.id === productList.characteristic)).length ? 
                                                product.characteristics.variants.filter(variant => variant.id === productList.characteristic)[0].variantName: 
                                                null
                                            }
                                        </div>
                                        <i class="fas fa-trash-alt" onClick={() => RemoveProduct(product, productList.count)}></i>
                                    </div>

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
    </div>)
};
