import React, {useContext} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {MiniCart} from '../mini-cart/mini-cart'
import {Currency} from '../currency/currency'
// import {AuthContext} from '../context/AuthContext';
import './header.css';

export const Header = () => {

    const navigate  = useNavigate();

    const links = <>
        <NavLink className="nav-link" activeClassName="active-nav-link" to="/main">CLOSER</NavLink>
        <NavLink className="nav-link" exact activeClassName="active-nav-link" to="/">TECHNICS</NavLink>
        <NavLink className="nav-link" activeClassName="active-nav-link" to="/profile">FURNITURE</NavLink>
        {/* <button className="nav-button" >LOGOUT</button> */}
    </>

    // function blackout() {
    //     const bg = document.getElementById('blackout');
    //     bg.style.dispalay = "block";
    // };

    function ShowCurrency(){
        if(document.getElementById('currency-list').style.display == "block"){
            document.getElementById('currency-list').style.display = "none";
            document.getElementById('currency-switch').style.transform = "rotate(-45deg)";
        }
        else {
            document.getElementById('currency-list').style.display = "block";
            document.getElementById('currency-switch').style.transform = "rotate(135deg)";
        }
    }


    function Show(flag){
        if(flag) {
            document.getElementById('blackout').style.display = "block";
            document.getElementById('window').style.display = "block";

            document.getElementById('body').style.overflow = "hidden";
            document.getElementById('body').style.padding = "0 10px 0 0";
        }
        else {
            document.getElementById('blackout').style.display = "none";
            document.getElementById('window').style.display = "none";
            document.getElementById('body').style.overflow = "visible";
            document.getElementById('body').style.padding = "0 0 0 0";
        }
    }

    return (
        <header id="header">
            <div className="container">
                <div className="header-inner">
                    <nav className="header-nav">
                            {links}
                    </nav>
                    <div className="header-logo">WEBSHOP</div>
                    <div className="header-action">
                        <i class="fas fa-dollar-sign" onClick={e => ShowCurrency()}>
                            <div id="currency-switch" className="switch switch-down"></div>
                            <Currency/>
                        </i>
                        <i id="cart" href="/cart" class="fas fa-shopping-cart" onMouseOver={e => Show(true)} onMouseOut={e => Show(false)}>
                            <div id="window" className="window"><MiniCart/></div>
                        </i>
                    </div>
                </div>
            </div>

            <div className="blackout" id="blackout"></div>
        </header>
    );
};

