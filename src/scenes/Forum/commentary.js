import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import moment from 'moment'
import { getAnswersForOneCommentary } from "../../services/Api/Forum/get"
import CircularProgress from '@material-ui/core/CircularProgress';
import { postAnswer } from "../../services/Api/Forum/post"

function Commentary(props) {

    const [answer, setAnswer] = useState([])
    const [show, setShow] = useState(null)
    const [loading, setLoading] = useState(null)
    const [loadingNewAnswer, setLoadingNewAnswer] = useState(null)
    const [allCommentaries, setAllCommentaries] = useState([])
    const [errors, setErrors] = useState(null)
    const [errorsCommentary, setErrorsCommentary] = useState(null)
    const [user, setUser] = useState(null)
    const [commentaryData, setCommentaryData] = useState({})
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        if (props.location.aboutProps) {
            setCommentaryData(props.location.aboutProps.commentary)
        } else {
            setCommentaryData(JSON.parse(localStorage.getItem("Commentary_data")))
        }
        setUser(JSON.parse(localStorage.getItem("user")))
        setLoading(false)
        setErrorsCommentary(null)
        getAnswersForOneCommentary(props.location.aboutProps?.commentary.id || JSON.parse(localStorage.getItem("Commentary_data")).id).then(({ data, success, errors }) => {
            if (success === true) {
                setAllCommentaries(data)
                setLoading(true)
            } else {
                setErrorsCommentary(errors)
                setLoading(true)
            }
        })
    }, [success])

    const sendAnswer = async () => {
        setLoadingNewAnswer(false)
        const { success, errors } = await postAnswer(answer)
        setSuccess(null)
        if (success === true) {
            setSuccess(true)
            setLoadingNewAnswer(true)
        } else {
            setErrors(errors)
            setLoadingNewAnswer(true)
        }
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="container mx-5 my-5">
                <h2> Commentary : </h2>
                {loading == false ? <CircularProgress />
                    : null}
                <div class="card">
                    <div class="card-header">
                        {commentaryData.author} - {moment(commentaryData.creation_date).format('DD-MM-YYYY')}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{commentaryData.subject}</h5>
                        <p class="card-text">{commentaryData.contenu}</p>
                    </div>
                </div>
            </div>
            <div className="container mx-5 my-5">
                <h2>Answers : </h2>
            </div>
            {(allCommentaries || []).map(answers => (
                <div key={answers.answer_creation_date} className="container mx-5 my-5">
                    <div class="card">
                        <div class="card-header">
                            {answers.answer_author} - {moment(answers.answer_creation_date).format('DD-MM-YYYY')}
                        </div>
                        <div class="card-body">
                            <p class="card-text">{answers.answer_contenu}</p>
                        </div>
                    </div>
                </div>

            ))}
            <div className="container mx-5 my-5">
                {errorsCommentary !== null ? <p style={{ color: "red" }}>{errorsCommentary}</p> : ""}
                <textarea type="text-area" className="form-control" onChange={e => setAnswer({ ...answer, "contenu": e.target.value, "author": user?.firstname + ' ' + user?.lastname, "comid": props.location.aboutProps?.commentary.id || JSON.parse(localStorage.getItem("Commentary_data")).id, "userid": user.user_id })}></textarea> <br></br>
                {loadingNewAnswer === false ? <CircularProgress />
                    : null}
                <button className="btn btn-primary" onClick={sendAnswer}> Send  </button>
            </div>
        </div >
    )
}

export default Commentary
