export async function getAllStats() {
    const response = await fetch(
        `https://bluemarket.shop/api/getstatistics`,
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
        errors: body.GetStatistics
    }
}