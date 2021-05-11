export async function getDepartments() {
    const response = await fetch(
        'https://bluemarket.shop/api/getdepartments',
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