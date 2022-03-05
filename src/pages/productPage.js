import React, {useCallback, useContext, useEffect, useState} from 'react'
// import {useHttp} from '../hooks/http.hook'
import {Header} from '../components/header/header'
import {ProductInfo} from '../components/productInfo/productInfo'
import {Footer} from '../components/footer/footer';

export const ProductPage = () => {
    const height = document.documentElement.clientHeight;
    return (
        <>
            <div id="container" className="container">
                <div style={{minHeight:height+"px"}}>
                    <Header/>
                    <ProductInfo/>
                </div>
            </div>
            <Footer/>
        </>
    )
};