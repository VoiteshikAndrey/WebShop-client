import React, {useCallback, useContext, useEffect, useState} from 'react';
// import {useHttp} from '../hooks/http.hook'
import {Header} from '../components/header/header';
import {useSelector} from 'react-redux';
import {Footer} from '../components/footer/footer';

export const ProfilePage = () => {
    const auth = useSelector(state => state.auth);
    const height = document.documentElement.clientHeight;
    return (
    <>
        <div id="container" className="container">
            <div style={{minHeight:height+"px"}}>
                <Header/>
                {auth.userName}
            </div>
        </div>
        <Footer/>
    </>
    )
};