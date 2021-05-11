export async function edit(producer) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    if (producer.email) {
        urlencoded.append("email", producer.email);
    }
    if (producer.address) {
        urlencoded.append("address", producer.address);
    }
    if (producer.distance) {
        urlencoded.append("distance", producer.distance);
    }
    if (producer.transport) {
        urlencoded.append("transport", producer.transport);
    }
    if (producer.type) {
        urlencoded.append("prodtype", producer.type);
    }

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch("https://bluemarket.shop/api/registerproducer", requestOptions)

    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
            data: body.RegisterProducer
        }
    }
    return {
        success: false,
        errors: body.RegisterProducer
    }
}