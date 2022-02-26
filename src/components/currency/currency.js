import React, {useContext} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import './currency.css';
import {setCurrencyAction} from '../../store/settingsReduser';

export const Currency = () => {

    const dispatch = useDispatch();

    const SetCurrency = (currency) => {
        dispatch(setCurrencyAction(currency));
    }

    return (
        <div id="currency-list" className="currency-list">
            <div className="currency" onClick={() => SetCurrency('USD')}>
                $ USD
            </div>
            <div className="currency" onClick={() => SetCurrency('EUR')}>
                € EUR
            </div>
            <div className="currency" onClick={() => SetCurrency('JPY')}>
                ¥ JPY
            </div>
        </div>

    );
};

