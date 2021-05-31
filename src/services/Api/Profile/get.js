export async function getAllPurchase(userId) {
    const response = await fetch(
        `https://bluemarket.shop/api/getusercart?userid=${userId}`,
        {
            method: "GET",
        }
    )
    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
            data: body.GetUserCart || body
        }
    }

    return {
        success: false,
        errors: body
    }
}


export async function getDetailsShoppingCart(cartId) {
    const response = await fetch(
        `https://bluemarket.shop/api/getdetailsusercart?cartid=${cartId}`,
        {
            method: "GET",
        }
    )
    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
            data: body.GetDetailsUserCart || body
        }
    }

    return {
        success: false,
        errors: body
    }
}

export async function getProfile(userId) {
    const response = await fetch(
        `https://bluemarket.shop/api/getuserprofil?userid=${userId}`,
        {
            method: "GET",
        }
    )
    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
            data: body.GetUserProfil || body
        }
    }

    return {
        success: false,
        errors: body.GetUserProfil
    }
}