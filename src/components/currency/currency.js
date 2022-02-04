import React, {useContext} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {MiniCart} from '../mini-cart/mini-cart'
// import {AuthContext} from '../context/AuthContext';
import './currency.css';

export const Currency = () => {

    return (
        <div id="currency-list" className="currency-list">
            <div className="currency">
                $ USD
            </div>
            <div className="currency">
                € EUR
            </div>
            <div className="currency">
                ¥ JPY
            </div>
        </div>

    );
};

