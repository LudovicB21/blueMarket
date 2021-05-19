export async function editProductProducer(producer, product_id, user_id) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    let urlencoded = new URLSearchParams();
    if (producer.size) {
        urlencoded.append("size", producer.size);
    }
    if (producer.ingredients) {
        urlencoded.append("ingredients", producer.ingredients);
    }
    if (product_id) {
        urlencoded.append("productid", product_id);
    }
    if (user_id) {
        urlencoded.append("userid", user_id);
    }

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch("https://bluemarket.shop/api/updateproducerproduct", requestOptions)

    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
            data: body.UpdateProducerProduct
        }
    }
    return {
        success: false,
        errors: body.UpdateProducerProduct
    }
}