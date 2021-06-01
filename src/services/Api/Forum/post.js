export async function postCommentary(commentary) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    if (commentary.author) {
        urlencoded.append("author", commentary.author);
    }
    if (commentary.contenu) {
        urlencoded.append("contenu", commentary.contenu);
    }
    if (commentary.subjectcommentary) {
        urlencoded.append("subject", commentary.subjectcommentary);
    }
    if (commentary.userId) {
        urlencoded.append("userid", commentary.userId);
    }

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch("https://bluemarket.shop/api/addcomment", requestOptions)

    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
        }
    }
    return {
        success: false,
        errors: body.RegisterProducer
    }
}

export async function postAnswer(answer) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    if (answer.comid) {
        urlencoded.append("comid", answer.comid);
    }
    if (answer.contenu) {
        urlencoded.append("contenu", answer.contenu);
    }
    if (answer.author) {
        urlencoded.append("author", answer.author);
    }
    if (answer.userid) {
        urlencoded.append("userid", answer.userid);
    }

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    const response = await fetch("https://bluemarket.shop/api/addanswer", requestOptions)

    const body = await response.json()
    if (response.status === 200) {
        return {
            success: true,
        }
    }
    return {
        success: false,
        errors: body.RegisterProducer
    }
}