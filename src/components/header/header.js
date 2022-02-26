import React, {useState, useContext, useEffect} from 'react';
import {NavLink, useNavigate, useParams} from 'react-router-dom';
import {MiniCart} from '../mini-cart/mini-cart'
import {Currency} from '../currency/currency'
import './header.css';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUserAction} from '../../store/authReduser';
import {clearCart} from '../../store/cartReduser';
import {SAVE_CART_TO_DB} from "../../mutations/cart"
import {useMutation} from "@apollo/client";
import {setCategoryAction} from '../../store/categoryReduser';

export const Header = () => {
    
    const [saveCart] = useMutation(SAVE_CART_TO_DB);
    const category = useSelector(state => state.category);
    const settings = useSelector(state => state.settings);
    const [activeBtn, setActiveBtn] = useState(category.selectedСategory);
    const auth = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);
    const navigate  = useNavigate();
    const dispatch = useDispatch();
    const productId = useParams();

    console.log("PARAM",productId);

    const SetCategory = (category) => {
        dispatch(setCategoryAction(category));
        setActiveBtn(category)
    }

    const categoryHandler = (category) => {
        SetCategory(category);
        navigate("/main");
    }

    const links = <nav className="header-nav">
        <div className={activeBtn === "All" ? "active-nav-link nav-link":"nav-link"} onClick={()=>categoryHandler("All")}>ALL</div>
        <div className={activeBtn === "Clothes" ? "active-nav-link nav-link":"nav-link"} onClick={()=>categoryHandler("Clothes")}>CLOTHES</div>
        <div className={activeBtn === "Technics" ? "active-nav-link nav-link":"nav-link"} onClick={()=>categoryHandler("Technics")}>TECHNICS</div>
    </nav>

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
     
    const Logout = () => {
        dispatch(logoutUserAction(""));
        dispatch(clearCart(""));
        saveCart({
            variables: {
                input: JSON.stringify(cart)
            }
        });
        navigate('/auth')
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

    const user = []
    auth.isAuthenticated ?
        user.push(<>
        <i class="fa-solid fa-user" onClick={()=>{navigate('/profile')}}></i>
        <i class="fa-solid fa-arrow-right-from-bracket" onClick={()=>Logout()}></i>
        </>)
        :user.push(<i class="fa-solid fa-arrow-right-to-bracket" onClick={()=>navigate('/auth')}></i>)

    console.log("HEADER");

    return (
        <header id="header">
                <div className="header-inner">
                    
                    {links}
                    
                    <div className="header-logo">WEBSHOP</div>
                    <div className="header-action">
                        <i className="fas" onClick={e => ShowCurrency()}>
                            {settings.currencies[settings.selectedСurrency].symbol}
                            <div id="currency-switch" className="switch switch-down"></div>
                            <Currency/>
                        </i>
                        <i id="cart" href="/cart" class="fas fa-shopping-cart" onMouseOver={() => Show(true)} onMouseOut={() => Show(false)}>
                            <div id="window" className="window"><MiniCart/></div>
                        </i>
                        
                        {user}

                    </div>
                </div>

            <div className="blackout" id="blackout"></div>
        </header>
    );
};

