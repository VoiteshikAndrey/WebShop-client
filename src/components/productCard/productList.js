import {React, useEffect, useState} from 'react';
import "./productCard.css"
import { useSelector } from 'react-redux';
import {useQuery} from "@apollo/client";
import {GET_PRODUCTS_BY_CATEGORY} from "../../query/product"
import {ProductCard} from './productCard';

export const ProductList = () => {
    const category = useSelector(state => state.category);

    let query = GET_PRODUCTS_BY_CATEGORY;

    const {data, loading} = useQuery(query, {
                variables: {
                    category: category.selectedСategory
                }});
    const [products, setProducts] = useState();
    
    useEffect(()=> {
        if(!loading) {
            setProducts(Array.from(data.getProductsByCategory).reverse());
        };
    },[data]);

    return (
        <>
            <div className="category-title">{category.selectedСategory}</div>
                <div className="list">
                    {products && products.map((product) => {
                        return <ProductCard product={product}/>
                    })}
                </div>
        </>
    );
};

