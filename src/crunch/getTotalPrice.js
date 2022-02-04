import {useQuery, useMutation} from "@apollo/client";
import {GET_PRODUCT_PRICE} from "../query/product";

export const GetTotalPrice = (cart) => {
    let totalPrice = 0;

    // const TestPromise = function (productId){
    //     return new Promise((resolve, reject) => {
    //         const {data, loading, error} = useQuery(GET_PRODUCT_PRICE, {
    //             variables: {
    //                 id: productId
    //             }
    //         });
    //     })
    // }

    const Test = (productId) => {
        const {data, loading, error} = useQuery(GET_PRODUCT_PRICE, {
            variables: {
                id: productId
            }
        });
        console.log("ID", productId);
        console.log("Data", data);
        console.log("THIS IS PRICE", data.getProduct.price);
        return Number(data.getProduct.price); 
    }

    cart.map((product) => {
        const price = Test(product.productId);
        const count = Number(product.count)
        totalPrice += price * count;
    })

    return totalPrice;
}