export async function changeQuantityReplenishmentDepartment(product_id, reducestocki) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    if (reducestocki) {
        urlencoded.append("reducestocki", reducestocki.reducestocki);
    }
    if (product_id) {
        urlencoded.append("productid", product_id);
    }

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch("https://bluemarket.shop/api/departmentreplenishment", requestOptions)

    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
        }
    }
    return {
        success: false,
        errors: body.DepartmentReplenishment
    }
}

export async function changeQuantityReplenishmentInventory(product_id, reducestockp) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    if (reducestockp) {
        urlencoded.append("reducestockp", reducestockp.reducestockp);
    }
    if (product_id) {
        urlencoded.append("productid", product_id);
    }

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch("https://bluemarket.shop/api/departmentorderproduct", requestOptions)

    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
        }
    }
    return {
        success: false,
        errors: body.DepartmentOrderProduct
    }
}