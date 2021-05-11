export async function getProducers() {
    const response = await fetch(
        'https://bluemarket.shop/api/getregister',
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
    }
}