import React, {useState, useContext}from 'react';
// import {useHttp} from '../hooks/http.hook';
import { useNavigate } from 'react-router-dom';
import {useQuery, useMutation} from "@apollo/client";
import {CREATE_USER} from "../../mutations/user"
// import {AuthContext} from '../context/AuthContext';
import {useDispatch, useSelector} from 'react-redux';
import {loginUserAction} from '../../store/authReduser';

export const RegisterForm = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [newUser] = useMutation(CREATE_USER);
    // const auth = useContext(AuthContext);
    // const {loading, error, request} = useHttp();
    const [form, setForm] = useState({
        login: '', password: '', confirmPassword: ''
    });
    const [errors, setErrors] = useState();

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }
    const registerHandler = async () => {
        let user;

        try {
            newUser({
                variables: {
                    input: form
                }
            }).then(({data}) => {
                setErrors(JSON.parse(data.createUser.errors));
                user = (JSON.parse(data.createUser.data));
                if(user){
                    dispatch(loginUserAction(user));  
                    navigate("/main");  
                }
            })
        } catch (e) {}
    };

    function ShowPassword(){
        const oldStyle = document.getElementById('show').className;
        const newClassName = oldStyle === 'far fa-eye showPassword' ? 'far fa-eye-slash showPassword' : 'far fa-eye showPassword';
        if(newClassName == 'far fa-eye showPassword')
        {
            document.getElementById('password').type =  "text"
            document.getElementById('confirmPassword').type =  "text"
        }
        else {
            document.getElementById('password').type = "password";
            document.getElementById('confirmPassword').type = "password";
        } 
        document.getElementById('show').className =  newClassName;
      }

    return(
        <>
        <div className="form-body">
            <span className="body-title body-title-register">REGISTER</span>
            <span className="error-message">{errors}</span>
                <div className="input-container">
                    <label className="input-title" for="login">Login</label>
                    <input className="input-field" type="text" autoFocus id="login" name="login" required onChange={changeHandler}></input>
                    
                    <label className="input-title" for="password">Password</label>
                    <div className="password">
                        <input className="input-field" type="password" maxlength="40" id="password" name="password" required onChange={changeHandler}></input>
                        <i id="show" class="far fa-eye-slash showPassword" onClick={event => ShowPassword(event)}></i>
                    </div>
                    
                    <label className="input-title" for="confirmPassword">Confirm password</label>
                    <input className="input-field" type="password" maxlength="40" id="confirmPassword" name="confirmPassword" required onChange={changeHandler}></input>
                </div>
                <div className="body-buttons">
                    <button className="singin-button" type="submit" onClick={()=> registerHandler()}>SING UP</button>
                    <button className="back-button" onClick={()=>{navigate("/main")}}>BACK</button>
                </div>
        </div>

        <div className="form-footer">
            <div className="footer-title">or sing up with one of these services</div>
            <div className="footer-services footer-services-register">
                <a className="service" href="">
                    <div className="service-logo">
                        <img src="https://i.ibb.co/Wyv1rQ6/vk-logo.png" alt=""></img>
                    </div>
                    <div className="service-name">VKontakte</div>
                </a>
                <a className="service" href="">
                    <div className="service-logo">
                        <img src="https://i.ibb.co/k1K4Zsb/google-logo.png" alt=""></img>
                    </div>
                    <div className="service-name">GOOGLE</div>
                </a>
            </div>
        </div>
        </>
    );
}
