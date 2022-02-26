import React, {useContext, useState, useEffect} from 'react';
import {NavLink, useHistory, useParams} from 'react-router-dom';
import {Loader} from '../loader/loader';
import {useQuery, useMutation} from "@apollo/client";
import {GET_PRODUCT_BY_ID} from "../../query/product";

import {useDispatch, useSelector} from 'react-redux';
import {addProductAction} from '../../store/cartReduser';

import "./productInfo.css"

export const ProductInfo = () => {

    const dispatch = useDispatch();
    const productList = Array.from(useSelector(state => state.cart.productList));
    const productId = useParams().id;

    const settings = useSelector(state=>state.settings);
    const [product, setProduct] = useState();
    const [selecteСharacteristic, SetSelecteСharacteristic] = useState();
    const {data, loading, error} = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id: productId
        }})

    const [mainImage, setMainImage] = useState();

    const MakeMainImage = (e) => {
        setMainImage(e.target.src);
    };

    const AddProductToCart = (e) => {
        var found = productList.some(function (product) {
            return product.productId === productId;
        });

        if(found){
            window.flash('This item is already in the cart!', 'error')
            return;
        }
        dispatch(addProductAction({product:{
                    productId: productId,
                    characteristic: selecteСharacteristic,
                    count: 1
                }, price: product.price}));

        window.flash('Product added to cart! ', 'success')
    };

    useEffect(()=> {
        if(!loading) {
            setProduct(data.getProduct);
            SetSelecteСharacteristic(data.getProduct.characteristics.variants[0].id);
        };
    },[data]);
    
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
                        {product.characteristics.characteristicsName + ":"}
                    </div>
                    <div className="options-list">
                        {product.characteristics.variants.map((variant) =>{
                            return (
                            <div className={selecteСharacteristic === variant.id ? "option option-active" : variant.number < 1 ? "option option-unavailable": "option option-available"}
                                onClick={()=>SetSelecteСharacteristic(variant.id)}>
                                {variant.variantName}
                            </div>)
                        })}
                    </div>
                </div>

                <div className="price">
                    <div className="title">
                        PRICE:
                    </div>
                    <div className="value">
                        {settings.currencies[settings.selectedСurrency].symbol + " " +(product.price*settings.currencies[settings.selectedСurrency].rate).toFixed(2)}
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