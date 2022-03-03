import React, {useCallback, useContext, useEffect, useState} from 'react';
// import {useHttp} from '../hooks/http.hook'
import {Header} from '../components/header/header';
import {useSelector} from 'react-redux';

export const ProfilePage = () => {
    const auth = useSelector(state => state.auth);
    return (
        <div className="wrapper">
            <div id="container" className="container">
                <Header/>
                {auth.userName}
            </div>
        </div>
    )
};