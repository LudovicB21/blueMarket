
export async function updateProdile(profile, id) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    let urlencoded = new URLSearchParams();
    if (profile.email) {
        urlencoded.append("email", profile.email);
    }
    if (profile.firstname) {
        urlencoded.append("firstname", profile.firstname);
    }
    if (profile.lastname) {
        urlencoded.append("lastname", profile.lastname);
    }
    if (profile.fridge) {
        urlencoded.append("fridgesize", profile.fridge);
    }
    if (id) {
        urlencoded.append("userid", id);
    }
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch("https://bluemarket.shop/api/updateprofil", requestOptions)

    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
            data: body.UpdateProfil
        }
    }
    return {
        success: false,
        errors: body.UpdateProfil
    }
}


export async function updatePassword(password, id) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    let urlencoded = new URLSearchParams();
    if (password.currentPassword) {
        urlencoded.append("currrentPassword", password.currentPassword);
    }
    if (password.newPassword) {
        urlencoded.append("newPassword", password.newPassword);
    }
    if (id) {
        urlencoded.append("userid", id);
    }

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch("https://bluemarket.shop/api/updatepassword", requestOptions)

    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
            data: body.Updatepassword
        }
    }
    return {
        success: false,
        errors: body.Updatepassword
    }
}