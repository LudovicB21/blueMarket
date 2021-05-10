export async function edit(producer): Object {
    const data: Object = {
        email: producer.email,
        address: producer.address,
        distance: producer.distance,
        transport: producer.transport,
        prodtype: producer.type
    }

    console.log(JSON.stringify(data))

    const response = await fetch(
        'https://bluemarket.shop/api/registerproducer',
        {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data)
        }
    )

    //const body = await response.json()
    console.log(response)

}