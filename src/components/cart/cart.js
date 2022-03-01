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

    const trash_icon = <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 448 512"><path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"/></svg>

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
                                        <div className="trash-icon" onClick={() => RemoveProduct(product, productList.count)}>{trash_icon}</div>
                                        {/* <i class="fas fa-trash-alt" onClick={() => RemoveProduct(product, productList.count)}></i> */}
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
