import React from 'react';
// import {Switch, Route, Router, Redirect} from 'react-router-dom';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {MainPage}  from './pages/mainPage';
import {ProductPage}  from './pages/productPage';
import {ProfilePage}  from './pages/profilePage';
import {CartPage}  from './pages/cartPage';
import {AuthPage}  from './pages/authPage';
// import {NewsPage} from './pages/newsPage';
// import {ProfilePage} from './pages/profilePage';
// import {AdminPage} from './pages/adminPage';
// import {PostPage} from './pages/postPage';
// import {EditPage} from './pages/editPage';

export const useRoutes = (isAuthenticated, role) => {
    

    return(
        <Routes>
            <Route path="/main" element={<MainPage/>}/>
            <Route path="/product/:id" element={<ProductPage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/auth" element={<AuthPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            
            {/* <Redirect to='/' /> */}
        </Routes>
    );

    // console.log("Role:",role);
    // if(isAuthenticated && role === "admin") {
    //     return(
    //         <Router>
    //             {/* <Route path="/" exact>
    //                 <NewsPage />
    //             </Route>
    //             <Route path="/profile" exact>
    //                 <ProfilePage />
    //             </Route>
    //             <Route path="/admin" exact>
    //                 <AdminPage />
    //             </Route>
    //             <Route path="/post/:id">
    //                 <PostPage />
    //             </Route>
    //             <Route path="/edit/:id">
    //                 <EditPage />
    //             </Route>
    //             <Redirect to='/' /> */}
    //         </Router>
    //     );
    // }
    // else if(isAuthenticated && role === "user") {
    //     return(
    //         <Router>
    //             {/* <Route path="/" exact>
    //                 <NewsPage />
    //             </Route>
    //             <Route path="/profile" exact>
    //                 <ProfilePage />
    //             </Route>
    //             <Route path="/post/:id">
    //                 <PostPage />
    //             </Route>
    //             <Redirect to='/' /> */}
    //         </Router>
    //     );
    // }

    // return(
    //     <Router>
    //         <Route path="/" exact>
    //             <MainPage />
    //         </Route>
    //         {/* <Route path="/" exact>
    //             <NewsPage />
    //         </Route>
    //         <Route path="/auth">
    //             <AuthPage value = {true}/>
    //         </Route>
    //         <Route path="/post/:id">
    //             <PostPage />
    //         </Route>
    //         <Redirect to='/' /> */}
    //     </Router>
    // );
}