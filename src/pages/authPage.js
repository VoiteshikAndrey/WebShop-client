import React, {useCallback, useContext, useEffect, useState} from 'react'
// import {useHttp} from '../hooks/http.hook'
import {Header} from '../components/header/header'
import {ProductCard} from '../components/productCard/productCard'
import {Cart} from '../components/cart/cart'
import {LoginForm} from '../components/auth/loginForm'
import {RegisterForm} from '../components/auth/registerForm'

import '../components/auth/auth.css';

export const AuthPage = () => {

    document.getElementById('body').style.overflow = "block";
    document.getElementById('body').style.padding = "0 0 0 0";

    const [isLoginForm, setLoginForm] = useState(true);
    let selForm;
    let formHeader;

    if(isLoginForm) {
        selForm = <LoginForm/>
        formHeader = <div className="form-header">  
                        <span className="form-button">SING IN</span>
                        <button className="slide-button slide-button-right" onClick={() => setLoginForm(false)}>
                            <div className="form-button">REGISTER</div>
                        </button>
                     </div>
    }
    else{
        selForm = <RegisterForm/>
        formHeader = <div className="form-header">
                        <button className="slide-button slide-button-left" onClick={() => setLoginForm(true)}>
                            <span className="form-button">SING IN</span>
                        </button>
                        <span className="form-button">REGISTER</span>
                    </div>
    }
    
    return (
        <div id="bgColor">

        <div class="section-auth">
            <div class="logo">
                WebShop
            </div>

            <div class="singin-form">
                {formHeader}
                {selForm}
            </div>
            
        </div>
            
        </div>
    )
};
