export async function getProducts() {
    const response = await fetch(
        'https://bluemarket.shop/api/getproducts',
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

export async function getProductsByIdScan(idScan) {
    const response = await fetch(
        `https://bluemarket.shop/api/getproductsidscan?idscan=${idScan}`,
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

export async function getRecommandationsForOneClient(userid) {
    const response = await fetch(
        `https://bluemarket.shop/api/getrecommendations?userid=${userid}`,
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
