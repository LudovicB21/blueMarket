export async function postShoppingCart(cart, total, date, userId) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    let urlencoded = new URLSearchParams();
    if (cart) {
        urlencoded.append("cartlist", cart);
    }
    if (total) {
        urlencoded.append("cartprice", total);
    }
    if (date) {
        urlencoded.append("date", date);
    }
    if (userId) {
        urlencoded.append("userid", userId);
    }

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch("https://bluemarket.shop/api/settransaction", requestOptions)
    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
            data: body.SetTransaction
        }
    }
    return {
        success: false,
        errors: body.SetTransaction
    }
}