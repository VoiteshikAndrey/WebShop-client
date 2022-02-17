import React, {useState, useContext} from 'react';
// import {useHttp} from '../hooks/http.hook';
// import {AuthContext} from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {LOGIN_USER} from "../../mutations/user";
import {useDispatch, useSelector} from 'react-redux';
import {loginUserAction} from '../../store/authReduser';
//TODO: Сделать обработку в форме! 

export const LoginForm = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [loginUser] = useMutation(LOGIN_USER);
    const [errors, setErrors] = useState();
    const [form, setForm] = useState({
        login: '', password: ''
    });
    
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }       

    const loginHandler = async () => {
        let user;

        console.log('Form', form);

        try {
            loginUser({
                variables: {
                    input: form
                }
            }).then(({data}) => {
                setErrors(JSON.parse(data.loginUser.errors));
                user = (JSON.parse(data.loginUser.data));
                if(user){
                    dispatch(loginUserAction(user));  
                    navigate("/main");  
                }
            })
        } catch (e) {}
    };

    // const ShowPassword = (event) => {
    //     event.toggle('fa-eye-slash');
    //     event.toggle('fa-eye');
    // }
    function ShowPassword(){
        const oldStyle = document.getElementById('show').className;
        const newClassName = oldStyle === 'far fa-eye showPassword' ? 'far fa-eye-slash showPassword' : 'far fa-eye showPassword';
        newClassName == 'far fa-eye showPassword'? 
            document.getElementById('password').type =  "text":
            document.getElementById('password').type = "password";
        document.getElementById('show').className =  newClassName;
      }

    return(
        <>
        <div className="form-body">
            <span className="body-title">SING IN</span>
            <span className="error-message">{errors}</span>
                <div class="input-container">
                    <label className="input-title" for="login">Login</label>
                    <input className="input-field" autoFocus type="text" id="login" name="login"
                     onChange={changeHandler} required></input>
                    
                    <label className="input-title" for="password">Password</label>
                    <div className="password">
                        <input className="input-field" type="password" maxlength="40" id="password"
                        name="password" onChange={changeHandler} required></input>
                        <i id="show" class="far fa-eye-slash showPassword" onClick={event => ShowPassword(event)}></i>
                    </div>
                </div>
                <div className="body-buttons">
                    <button className="singin-button" type="submit" onClick={()=>loginHandler()}>SING IN</button>
                    <form action="http://localhost:3000/">
                        <button className="back-button" onClick={()=>{navigate("/main")}}>BACK</button>
                    </form>
                </div>
        </div>

        <div class="form-footer">
            <div class="footer-title">or sing in with one of these services</div>
            <div class="footer-services">
                <a class="service" href="#">
                    <div class="service-logo">
                        <img src="https://i.ibb.co/Wyv1rQ6/vk-logo.png" alt=""></img>
                    </div>
                    <div class="service-name">VKontakte</div>
                </a>
                <a class="service" href="#">
                    <div class="service-logo">
                        <img src="https://i.ibb.co/k1K4Zsb/google-logo.png" alt=""></img>
                    </div>
                    <div class="service-name">GOOGLE</div>
                </a>
            </div>
        </div>
        </>
    );
};
