export async function getAllCommentaries() {
    const response = await fetch(
        `https://bluemarket.shop/api/getcommentaryall`,
        {
            method: "GET",
        }
    )
    const body = await response.json()

    if (response.status === 200) {
        return {
            success: true,
            data: body || body.GetCommentaryAll
        }
    }

    return {
        success: false,
        errors: body.GetCommentaryAll
    }
}


export async function getAnswersForOneCommentary(commentaryId) {
    console.log(commentaryId)
    const response = await fetch(
        `https://bluemarket.shop/api/getanswerbycomment?comid=${commentaryId}`,
        {
            method: "GET",
        }
    )
    const body = await response.json()

    if (response.status === 200) {
        return {
            success: true,
            data: body || body.GetAnswerByComment
        }
    }

    return {
        success: false,
        errors: body.GetAnswerByComment
    }
}
