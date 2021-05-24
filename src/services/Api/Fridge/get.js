export async function getProductByUserForFridge(userId) {
    const response = await fetch(
        `https://bluemarket.shop/api/getproductfridge?userid=${userId}`,
        {
            method: "GET",
        }
    )
    const body = await response.json()

    if (response.status === 200) {
        return {
            success: true,
            data: body || body.GetProductFridge
        }
    }

    return {
        success: false,
        errors: body.GetProductFridge
    }
}

export async function getProductByIdForFridge(productId) {
    const response = await fetch(
        `https://bluemarket.shop/api/getproductbyid?productid=${productId}`,
        {
            method: "GET",
        }
    )
    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
            data: body
        }
    }

    return {
        success: false,
        errors: body
    }
}