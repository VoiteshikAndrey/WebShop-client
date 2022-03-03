import {React, useEffect, useState} from 'react';
// import {useHttp} from '../hooks/http.hook'
import {Header} from '../components/header/header';
import {ProductList} from '../components/productCard/productList'
import {MiniCart} from '../components/mini-cart/mini-cart';

export const MainPage = () => {
    
    return (
        <div id="wrapper" className="wrapper">
            <div id="container" className="container">
                <Header/>
                <ProductList/>
            </div>
        </div>
    )
};