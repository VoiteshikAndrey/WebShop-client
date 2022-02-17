import React, {useContext, useState, useEffect} from 'react';
import {NavLink, useHistory, useParams} from 'react-router-dom';
import {Loader} from '../loader/loader';
import {useQuery, useMutation} from "@apollo/client";
import {GET_PRODUCT_BY_ID} from "../../query/product";
import {ADD_PRODUCT_TO_CART} from "../../mutations/cart";

import {useDispatch, useSelector} from 'react-redux';
import {addProductAction} from '../../store/cartReduser';
import {addPrice} from '../../store/cartReduser';

import "./productInfo.css"

export const ProductInfo = () => {

    const dispatch = useDispatch();
    const cart = Array.from(useSelector(state => state.cart.cart));
    const productId = useParams().id;
    
    const [product, setProduct] = useState();
    const {data, loading, error} = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id: productId
        }});

    const [mainImage, setMainImage] = useState();

    const MakeMainImage = (e) => {
        setMainImage(e.target.src);
    };

    const AddProductToCart = (e) => {
        var found = cart.some(function (product) {
            return product.productId === productId;
        });

        if(found){
            window.flash('This item is already in the cart!', 'error')
            return;
        }
        dispatch(addProductAction({
                    productId: productId,
                    count: 1
                }));

        dispatch(addPrice(product.price));
        // addToCart({
        //     variables: {
        //         productId: productId,
        //         count: "1"
        //     }
        // })
        window.flash('Product added to cart! ', 'success')
    };

    useEffect(()=> {
        if(!loading) {
            setProduct(data.getProduct);
        };
    });

    if(!product) {
        return <div>Loading...</div>;
    }
    
    return (<>
        {product &&

        <div className="productInfo">
            <div className="product-images">
                <div className="mini-images">
                    {product.images.map(image =>{
                        return <img className="img" src={image} onClick={e=>MakeMainImage(e)}alt="" />
                    })}
                </div>
                <div className="main-image">
                    <img className="img" src={mainImage? mainImage : product.images[0]} alt="" />
                </div>
            </div>

            <div className="product-info">
                <div className="brand-name">
                    {product.productbrand}
                </div>
                <div className="product-name">
                    {product.productname}
                </div>
                <div className="specifications">
                    <div className="title">
                        SIZE:
                    </div>
                    <div className="options-list">
                        <div className="option option-active">
                            S
                        </div>
                        <div className="option option-available">
                            M
                        </div>
                        <div className="option option-available">
                            L
                        </div>
                        <div className="option option-available">
                            XL
                        </div>
                        <div className="option option-unavailable">
                            XXL
                        </div>
                    </div>
                </div>

                <div className="price">
                    <div className="title">
                        PRICE:
                    </div>
                    <div className="value">
                        ${product.price}
                    </div>
                </div>

                <div className="button" onClick={()=>AddProductToCart()}>
                    ADD TO CART
                </div>

                <div className="description">Find stunning women's cocktail dresses and party dresses. Stand out in lace and metallic cocktail dresses and party dresses from all your favorite brands.</div>
            </div>
        </div>
        }
    </>
    );
};