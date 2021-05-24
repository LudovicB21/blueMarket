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
            data: body
        }
    }

    return {
        success: false,
        errors: body
    }
}