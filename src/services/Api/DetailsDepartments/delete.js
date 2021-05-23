export async function deleteProduct(id) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    if (id) {
        urlencoded.append("productid", id);
    }

    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };
    const response = await fetch("https://bluemarket.shop/api/departmentrestetproduct", requestOptions)

    const body = await response.json()

    if (response.status === 200) {
        return {
            success: true,
        }
    }

    return {
        success: false,
        errors: body.DepartmentRestetProduct
    }
}