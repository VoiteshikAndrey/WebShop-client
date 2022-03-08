import React, {useState, useContext} from 'react';
// import {useHttp} from '../hooks/http.hook';
// import {AuthContext} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {LOGIN_USER} from "../../mutations/user";
import {LOGIN_WITH_GOOGLE} from "../../mutations/user";
import {useDispatch, useSelector} from 'react-redux';
import {loginUserAction} from '../../store/authReduser';
import {setCart} from '../../store/cartReduser';
import GoogleLogin from 'react-google-login';
//TODO: Сделать обработку в форме! 

export const LoginForm = () => {

    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData') 
        ? JSON.parse(localStorage.getItem('loginData'))
        : null
    );

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [loginUser] = useMutation(LOGIN_USER);
    const [loginWithGoogle] = useMutation(LOGIN_WITH_GOOGLE);
    const [errors, setErrors] = useState();
    const [form, setForm] = useState({
        login: '', password: ''
    });
    
    const [flag, setFlag] = useState(false);
    
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }       

    const loginHandler = async () => {
        try {
            loginUser({
                variables: {
                    input: form
                }
            }).then(({data}) => {
                setErrors(JSON.parse(data.loginUser.errors));

                let user = JSON.parse(data.loginUser.data).user;
                let userCart = JSON.parse(data.loginUser.data).userCart;
                if(user){
                    dispatch(loginUserAction(user));  
                    dispatch(setCart(userCart));  
                    navigate("/main");  
                }
            })
        } catch (e) {}
    };

    function ShowPassword(){
        flag ? setFlag(false) : setFlag(true);
        
        flag ? 
        document.getElementById('password').type = "password":
            document.getElementById('password').type = "text";
    }
    
    const open_eye_icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z"/></svg>
    const close_eye_icon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M150.7 92.77C195 58.27 251.8 32 320 32C400.8 32 465.5 68.84 512.6 112.6C559.4 156 590.7 207.1 605.5 243.7C608.8 251.6 608.8 260.4 605.5 268.3C592.1 300.6 565.2 346.1 525.6 386.7L630.8 469.1C641.2 477.3 643.1 492.4 634.9 502.8C626.7 513.2 611.6 515.1 601.2 506.9L9.196 42.89C-1.236 34.71-3.065 19.63 5.112 9.196C13.29-1.236 28.37-3.065 38.81 5.112L150.7 92.77zM223.1 149.5L313.4 220.3C317.6 211.8 320 202.2 320 191.1C320 180.5 316.1 169.7 311.6 160.4C314.4 160.1 317.2 159.1 320 159.1C373 159.1 416 202.1 416 255.1C416 269.7 413.1 282.7 407.1 294.5L446.6 324.7C457.7 304.3 464 280.9 464 255.1C464 176.5 399.5 111.1 320 111.1C282.7 111.1 248.6 126.2 223.1 149.5zM320 480C239.2 480 174.5 443.2 127.4 399.4C80.62 355.1 49.34 304 34.46 268.3C31.18 260.4 31.18 251.6 34.46 243.7C44 220.8 60.29 191.2 83.09 161.5L177.4 235.8C176.5 242.4 176 249.1 176 255.1C176 335.5 240.5 400 320 400C338.7 400 356.6 396.4 373 389.9L446.2 447.5C409.9 467.1 367.8 480 320 480H320z"/></svg>

    const handleFailure = (result) => {
        console.log("Failyre",result);
    }

    const handleLogin = (googleData) => {
        console.log("GoogleData",googleData);
        try {
            loginWithGoogle({
                variables: {
                    input: JSON.stringify(googleData.tokenId),
                }
            }).then(({data}) => {
                let userGoogle = JSON.parse(data.loginWithGoogle.data).userGoogle
                let userCart = JSON.parse(data.loginWithGoogle.data).userCart;
                console.log("userGoogle",userGoogle);
                if(userGoogle){
                    dispatch(loginUserAction(userGoogle));  
                    dispatch(setCart(userCart));  
                    navigate("/main");  
                }
                // setErrors(JSON.parse(data.loginUser.errors));

                // user = JSON.parse(data.loginUser.data).user;
                // userCart = JSON.parse(data.loginUser.data).userCart;
                // if(user){
                //     dispatch(loginUserAction(user));  
                //     dispatch(setCart(userCart));  
                //     navigate("/main");  
                // }
            })
        } catch (e) {}

        setLoginData(googleData);
        localStorage.setItem('loginData', JSON.stringify(googleData));
    }

    const handleLogout = () => {
        localStorage.removeItem('loginData');
        setLoginData(null);
    }

    return(
        <>
        <div className="form-body">
            <span className="body-title">SIGN IN</span>
            <span className="error-message">{errors}</span>
                <div class="input-container">
                    <label className="input-title" for="login">Login</label>
                    <input className="input-field" autoFocus type="text" id="login" name="login"
                     onChange={changeHandler} required></input>
                    
                    <label className="input-title" for="password">Password</label>
                    <div className="password">
                        <input className="input-field" type="password" maxlength="40" id="password"
                        name="password" onChange={changeHandler} required></input>
                        <div id="show" class="showPassword" onClick={() => ShowPassword()}>{flag ? open_eye_icon: close_eye_icon}</div>
                    </div>
                </div>
                <div className="body-buttons">
                    <button className="singin-button" type="submit" onClick={()=>loginHandler()}>SIGN IN</button>
                    {/* <form action="http://localhost:3000/"> */}
                        <button className="back-button" onClick={()=>{navigate("/main")}}>BACK</button>
                    {/* </form> */}
                </div>
        </div>

        <div class="form-footer">
            <div class="footer-title">or sign in with one of these services</div>
            <div class="footer-services">
                <a class="service" href="#">
                    <div class="service-logo">
                        <img src="https://i.ibb.co/Wyv1rQ6/vk-logo.png" alt=""></img>
                    </div>
                    <div class="service-name">VKontakte</div>
                </a>
                {/* <a class="service" href="#">
                    <div class="service-logo">
                        <img src="https://i.ibb.co/k1K4Zsb/google-logo.png" alt=""></img>
                    </div>
                    <div class="service-name">GOOGLE</div>
                </a> */}
                {/* <a class="service" href="#"> */}
                <GoogleLogin 
                className="google-login-button"
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
                >
                </GoogleLogin>
                {/* </a> */}
            </div>
        </div>
{/* 
        {
            loginData ? (
                <div>
                    <h3>You logged in as {loginData.email}</h3>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )
            : (
                <GoogleLogin 
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={'single_host_origin'}
                >
                </GoogleLogin>
            )
        } */}

        </>
    );
};
