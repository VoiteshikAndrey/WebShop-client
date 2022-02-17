import React, {useCallback, useContext, useEffect, useState} from 'react'
// import {useHttp} from '../hooks/http.hook'
import {Header} from '../components/header/header'
import {ProductInfo} from '../components/productInfo/productInfo'

export const ProductPage = () => {
    return (
        <div className="wrapper">
            <div id="container" className="container">
                <Header/>
                <ProductInfo/>
            </div>
        </div>
    )
};