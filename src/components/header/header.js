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
        console.log("Logout");
        saveCart({
            variables: {
                input: JSON.stringify(cart)
            }
        });
        dispatch(logoutUserAction(""));
        dispatch(clearCart(""));
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

    const cart_icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="cart-icon icon"><path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z"/></svg>
    const profile_icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="profile-icon icon"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"/></svg>
    const logout_icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="logout-icon icon"><path d="M160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64c17.67 0 32-14.33 32-32S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256c0 53.02 42.98 96 96 96h64c17.67 0 32-14.33 32-32S177.7 416 160 416zM502.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L402.8 224H192C174.3 224 160 238.3 160 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C515.1 266.1 515.1 245.9 502.6 233.4z"/></svg>
    const login_icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="logout-icon icon"><path d="M416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32zM342.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L242.8 224H32C14.31 224 0 238.3 0 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C355.1 266.1 355.1 245.9 342.6 233.4z"/></svg>
    
    const user = []
    auth.isAuthenticated ?
        user.push(<>
        <div onClick={()=>{navigate('/profile')}}>{profile_icon}</div>
        {/* <i class="fa-solid fa-user" onClick={()=>{navigate('/profile')}}></i> */}
        {/* <i class="fa-solid fa-arrow-right-from-bracket" onClick={()=>Logout()}></i> */}
        <div onClick={()=>Logout()}>{logout_icon}</div>
        </>)
        :user.push(<div onClick={()=>navigate('/auth')}>{login_icon}</div>)

    return (
        <header id="header">
            <div className="header-inner">
                
                {links}
                
                <div className="header-logo">WEBSHOP</div>
                <div className="header-action">
                    <i className="currensy-icon" onClick={e => ShowCurrency()}>
                        {settings.currencies[settings.selectedСurrency].symbol}
                        <div id="currency-switch" className="switch switch-down"></div>
                        <Currency/>
                    </i>
                    <div id="cart" className="cart-icon icon" onMouseOver={() => Show(true)} onMouseOut={() => Show(false)}>{cart_icon}<div id="window" className="window"><MiniCart/></div></div>
                    {/* {cart_icon}
                    <i id="cart" href="/cart" class="fas fa-shopping-cart" onMouseOver={() => Show(true)} onMouseOut={() => Show(false)}>
                        <div id="window" className="window"><MiniCart/></div>
                    </i> */}
                    
                    {user}

                </div>
            </div>

            <div className="blackout" id="blackout"></div>
        </header>
    );
};

