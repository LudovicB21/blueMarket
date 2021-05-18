export async function deleteProductFromProducer(user_id, product_Id) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    if (user_id) {
        urlencoded.append("userid", user_id);
    }
    if (product_Id) {
        urlencoded.append("productid", product_Id);
    }

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch("https://bluemarket.shop/api/deleteproducerproduct", requestOptions)

    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
            data: body.DeleteProducerProduct
        }
    }

    return {
        success: false,
        errors: body.DeleteProducerProduct
    }
}