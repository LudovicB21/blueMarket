export async function forgotPassword(email) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    let urlencoded = new URLSearchParams();
    if (email.email) {
        urlencoded.append("email", email.email);
    }

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch("https://bluemarket.shop/api/resetpassword", requestOptions)

    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
        }
    }
    return {
        success: false,
        errors: body.ResetPassword
    }
}