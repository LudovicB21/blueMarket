export async function edit(register): Object {
    const data: Object = {
        frigosize: register.email,
        password: register.address,
        firstname: register.distance,
        lastname: register.transport,
        role: register.type,
        email: register.email
    }

    console.log(JSON.stringify(data))

    const response = await fetch(
        'https://bluemarket.shop/api/regsiter',
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