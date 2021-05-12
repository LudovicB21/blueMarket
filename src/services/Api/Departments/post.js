export async function changePosition(producer) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    if (producer.departid) {
        urlencoded.append("departid", producer.departid);
    }
    if (producer.position) {
        urlencoded.append("position", producer.position);
    }

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch("https://bluemarket.shop/api/reversedeptposition", requestOptions)

    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
            data: body.ReverseDeptPosition
        }
    }
    return {
        success: false,
        errors: body.ReverseDeptPosition
    }
}