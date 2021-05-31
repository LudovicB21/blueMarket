export async function post(user) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    if (user.email) {
        urlencoded.append("email", user.email);
    }
    if (user.firstname) {
        urlencoded.append("firstname", user.firstname);
    }
    if (user.lastname) {
        urlencoded.append("lastname", user.lastname);
    }
    if (user.fridgesize) {
        urlencoded.append("fridgesizesize", user.fridgesize);
    }
    if (user.password) {
        urlencoded.append("password", user.password);
    }
    if (user.role) {
        urlencoded.append("role", user.role);
    }

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch("https://bluemarket.shop/api/register", requestOptions)

    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
        }
    }

    return {
        success: false,
        errors: body.Register
    }
}