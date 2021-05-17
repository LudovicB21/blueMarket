export async function changeQuantityProduct(user_id, product_id, cart_id, quantity) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    if (user_id) {
        urlencoded.append("userid", user_id);
    }
    if (product_id) {
        urlencoded.append("productid", product_id);
    }
    if (quantity) {
        urlencoded.append("newquantity", quantity);
    }
    if (cart_id) {
        urlencoded.append("cartid", cart_id);
    }

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch("https://bluemarket.shop/api/reducefridgequantity", requestOptions)

    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
            data: body.ReduceFridgeQuantity
        }
    }
    return {
        success: false,
        errors: body.ReduceFridgeQuantity
    }
}