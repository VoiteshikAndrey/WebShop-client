import React, {useCallback, useContext, useEffect, useState} from 'react';
// import {useHttp} from '../hooks/http.hook'
import {Header} from '../components/header/header';
import {ProductCard} from '../components/productCard/productCard';
import {MiniCart} from '../components/mini-cart/mini-cart';
import {useQuery} from "@apollo/client";
import {GET_ALL_PRODUCTS} from "../query/product"


export const MainPage = () => {
    const {data, loading, error} = useQuery(GET_ALL_PRODUCTS);
    const [products, setProducts] = useState();
    
    useEffect(()=> {
        if(!loading) {
            // setProducts(Array.from(data.getAllProducts).reverse());  Начинается бесконечное обновление
            setProducts(data.getAllProducts);
        };
    });


    console.log(products);

    return (
        <div id="wrapper" className="wrapper">
            <Header/>
            <div id="container" className="container">
                <div className="category-title">Category name</div>
                <div className="list">
                    
                    {products && products.map((product) => {
                        return <ProductCard product={product}/>
                    })}
                </div>
            </div>
            <MiniCart/>
        </div>
    )
};