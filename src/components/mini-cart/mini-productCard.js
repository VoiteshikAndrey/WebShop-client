import {Query} from '@apollo/client/react/components';
import {GET_PRODUCT_BY_ID} from "../../query/product";
import {useDispatch, useSelector} from 'react-redux';
import {addPrice} from '../../store/cartReduser';
import {removePrice} from '../../store/cartReduser';
import {addCount} from '../../store/cartReduser';
import {removeCount} from '../../store/cartReduser';

export const MiniProductCard = ({productList}) => {
    const dispatch = useDispatch();

    const AddCount = (product) => {
        dispatch(addCount(product.id));
        dispatch(addPrice(product.price));
    }

    const RemoveCount = (product, count) => {
        if(count > 1){
            dispatch(removeCount(product.id));
            dispatch(removePrice(product.price)); 
        }
    }


    return(<Query query = {GET_PRODUCT_BY_ID} variables = {{id: productList.productId}}>
        {({loading, data})=>{
            if(loading) return "Loading...";
            const product = data.getProduct;
            // AddToTotalPrice(product.price);
            return (<>
                <div className="mini-products">
                    <div className="mini-product">
                        <div className="info">
                            <div className="brand">
                                {product.productbrand}
                            </div>
                            <div className="product-name">
                                {product.productname}
                            </div>
                            <div className="price">
                                ${product.price}
                            </div>
                        </div>

                        <div className="amount">
                            <div className="amount-button" onClick={() => AddCount(product, productList.count)}>+</div>
                            <div className="number">{productList.count}</div>
                            <div className="amount-button" onClick={() => RemoveCount(product, productList.count)}>–</div>
                        </div>

                        <div className="image">
                            <img src={product.images[0]} alt="" />
                        </div>
                    </div>

                    
                </div>
            </>)
        }}
    </Query>)
}