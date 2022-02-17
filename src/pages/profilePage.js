import React, {useCallback, useContext, useEffect, useState} from 'react';
// import {useHttp} from '../hooks/http.hook'
import {Header} from '../components/header/header';
import {ProductInfo} from '../components/productInfo/productInfo';
import {useSelector} from 'react-redux';
export const ProfilePage = () => {
    const auth = useSelector(state => state.auth);
    return (
        <div className="wrapper">
            <div id="container" className="container">
                {auth.userName}
            </div>
        </div>
    )
};