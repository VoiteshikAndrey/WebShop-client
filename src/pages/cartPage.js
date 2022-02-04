import React, {useCallback, useContext, useEffect, useState} from 'react'
// import {useHttp} from '../hooks/http.hook'
import {Header} from '../components/header/header'
import {ProductCard} from '../components/productCard/productCard'
import {Cart} from '../components/cart/cart'

export const CartPage = () => {
    return (
        <div id="wrapper" className="wrapper">
            <div className="container">
                <Header/>
                <Cart/>
            </div>
        </div>
    )
};