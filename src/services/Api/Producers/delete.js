export async function deleteProducer(id) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    if (id) {
        urlencoded.append("userid", id);
    }

    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch("https://bluemarket.shop/api/deleteproducer", requestOptions)

    const body = await response.json()
    console.log(body)

    if (response.status === 200) {
        return {
            success: true,
            data: body.DeleteProducer
        }
    }

    return {
        success: false,
        errors: body.DeleteProducer
    }
}