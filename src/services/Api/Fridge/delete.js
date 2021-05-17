export async function deleteProductFromFridge(user_id, cartId, productId) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    if (user_id) {
        urlencoded.append("userid", user_id);
    }
    if (cartId) {
        urlencoded.append("cartid", cartId);
    }
    if (productId) {
        urlencoded.append("productid", productId);
    }

    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch("https://bluemarket.shop/api/deletefridgeproduct", requestOptions)

    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
            data: body.DeleteFridgeProduct
        }
    }

    return {
        success: false,
        errors: body.DeleteFridgeProduct
    }
}