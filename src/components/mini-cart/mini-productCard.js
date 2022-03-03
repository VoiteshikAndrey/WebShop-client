import {useState, useEffect} from 'react';
import {Query} from '@apollo/client/react/components';
import {GET_PRODUCT_BY_ID} from "../../query/product";
import {useDispatch, useSelector} from 'react-redux';
import {addCount} from '../../store/cartReduser';
import {removeCount} from '../../store/cartReduser';
import {useQuery, useMutation} from "@apollo/client";

export const MiniProductCard = ({productList}) => {
    const dispatch = useDispatch();
    const settings = useSelector(state=>state.settings);
    
    const [product, setProduct] = useState();

    const {data, loading, error} = useQuery(GET_PRODUCT_BY_ID, {
        variables: {
            id: productList.productId
        }})

    const AddCount = (product) => {
        dispatch(addCount({productId: product.id, price: product.price}));
    }

    const RemoveCount = (product, count) => {
        if(count > 1){
            dispatch(removeCount({productId: product.id, price: product.price}));
        }
    }

    
    useEffect(()=> {
        if(!loading) {
            setProduct(data.getProduct);
        };
    },[data]);
    
    
    if(loading || !product) return "Loading...";
    
    return (<>
        <div className="mini-products">
            <div className="mini-product">
                <div className="info">
                    <div>
                        <div className="brand">
                            {data.getProduct.productbrand}
                        </div>
                        <div className="product-name">
                            {data.getProduct.productname}
                        </div>
                    </div>
                    <div className="price">
                        {settings.currencies[settings.selectedСurrency].symbol + " " +(data.getProduct.price*settings.currencies[settings.selectedСurrency].rate).toFixed(2)}
                    </div>
                    {Array.from(product.characteristics.variants.filter(variant => variant.id === productList.characteristic)).length ? 
                    <div className="characteristic-block">
                        <div className="characteristic">
                            {product.characteristics.variants.filter(variant => variant.id === productList.characteristic)[0].variantName}
                        </div>
                    </div> : 
                    <div>Null</div>}
                </div>

                <div className="amount">
                    <div className="amount-button" onClick={() => AddCount(data.getProduct, productList.count)}>+</div>
                    <div className="number">{productList.count}</div>
                    <div className="amount-button" onClick={() => RemoveCount(data.getProduct, productList.count)}>–</div>
                </div>

                <div className="image">
                    <img src={data.getProduct.images[0]} alt="" />
                </div>
            </div>
        </div>
    </>)
}