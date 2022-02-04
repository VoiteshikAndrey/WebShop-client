import React, {useContext} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
// import {AuthContext} from '../context/AuthContext';
import "./productCard.css"

export const ProductCard = ({product}) => {
    const navigate = useNavigate();
    console.log("Дошло", product);

    return (
        <div onClick={()=>navigate(`/product/${product.id}`)} className="product-card">
            <div className="product">
                <div className="image">
                    <div className="card-basket">
                        <i className="fas fa-shopping-cart"></i>
                    </div>
                    <img className="img" src={product.images[0]} alt="" />
                </div>
                <div className="content">
                    <div className="product-name">
                        {product.productbrand}
                        {product.productname}
                    </div>
                    <div className="price">${product.price}</div>
                </div>
            </div>
        </div>
    );
};

