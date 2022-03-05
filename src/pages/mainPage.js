import {React, useEffect, useState} from 'react';
import {Header} from '../components/header/header';
import {ProductList} from '../components/productCard/productList'
import {Footer} from '../components/footer/footer'

export const MainPage = () => {
    const height = document.documentElement.clientHeight;

    return (
        <>
            <div id="container" className="container">
                <div style={{minHeight:height+"px"}}>
                    <Header/>
                    <ProductList/>
                </div>
            </div>
            <Footer/>
        </>
    )
};