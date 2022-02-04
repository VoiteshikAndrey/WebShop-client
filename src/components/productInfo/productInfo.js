import React, {useContext, useState, useEffect} from 'react';
import {NavLink, useHistory, useParams} from 'react-router-dom';
import {Loader} from '../loader/loader';
import {useQuery, useMutation} from "@apollo/client";
import {GET_PRODUCT_BY_ID} from "../../query/product";
import {ADD_PRODUCT_TO_CART} from "../../mutations/cart";

import {useDispatch, useSelector} from 'react-redux';
import {addProductAction} from '../../store/cartReduser';

import "./productInfo.css"

export const ProductInfo = () => {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    console.log("YEEEES", cart);
    console.log("YEEEES");

    const productId = useParams().id;
    const [addToCart] = useMutation(ADD_PRODUCT_TO_CART);
    const [product, setProduct] = useState();
    const {data, loading, error} = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id: productId
        }});

    console.log(data);

    const [mainImage, setMainImage] = useState();

    const MakeMainImage = (e) => {
        setMainImage(e.target.src);
    };

    const AddProductToCart = (e) => {
        console.log("Start!!!");
        dispatch(addProductAction({
                    productId: productId,
                    count: "1"
                }))
        // addToCart({
        //     variables: {
        //         productId: productId,
        //         count: "1"
        //     }
        // })
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
        <div className="container">

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

        </div>
}
    </>
    );
};