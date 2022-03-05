import React, {useCallback, useContext, useEffect, useState} from 'react'
// import {useHttp} from '../hooks/http.hook'
import {Header} from '../components/header/header'
import {Footer} from '../components/footer/footer';
import {Cart} from '../components/cart/cart'

export const CartPage = () => {
    const height = document.documentElement.clientHeight;
    document.getElementById('body').style.overflow = "visible";
    document.getElementById('body').style.padding = "0 0 0 0";
    
    return (
        <>
        <div className="container">
            <div style={{minHeight:height+"px"}}>
                <Header/>
                <Cart/>
            </div>
        </div>
        <Footer/>
        </>
    )
};