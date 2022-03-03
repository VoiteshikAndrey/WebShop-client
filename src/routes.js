import React from 'react';
import {BrowserRouter, Routes, Route, Redirect} from "react-router-dom";
import {MainPage}  from './pages/mainPage';
import {ProductPage}  from './pages/productPage';
import {ProfilePage}  from './pages/profilePage';
import {CartPage}  from './pages/cartPage';
import {AuthPage}  from './pages/authPage';
import {useSelector} from 'react-redux';

export const useRoutes = (isAuthenticated, role) => {
    
    const auth = useSelector(state => state.auth);

    return(
        <Routes>
            <Route path="/main" element={<MainPage/>}/>
            <Route path="/product/:id" element={<ProductPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
            
            {auth.isAuthenticated && <Route path="/profile" element={<ProfilePage/>}/>}
            
            <Route path='/*' element={<MainPage/>}/>
        </Routes>
    );
}