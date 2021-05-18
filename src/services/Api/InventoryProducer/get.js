export async function get(product_id) {
    const response = await fetch(
        `https://bluemarket.shop/api/getproductproducer?userid=${product_id}`,
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