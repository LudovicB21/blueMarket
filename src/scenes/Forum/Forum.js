import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import { Modal, Button } from 'react-bootstrap'
import * as AiIcons from "react-icons/ai"
import { Link } from 'react-router-dom'
import { getAllCommentaries } from '../../services/Api/Forum/get'
import CircularProgress from '@material-ui/core/CircularProgress'
import { postCommentary } from '../../services/Api/Forum/post'
import moment from 'moment'

function Forum() {

    const [show, setShow] = useState(null)
    const [loading, setLoading] = useState(null)
    const [loadingAddCommentary, setLoadingAddCommentary] = useState(null)
    const [allCommentaries, setAllCommentaries] = useState([])
    const [newCommentary, setNewCommentary] = useState([])
    const [errors, setErrors] = useState(null)
    const [errorsCommentary, setErrorsCommentary] = useState(null)
    const [user, setUser] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
        setLoading(true)
        getAllCommentaries().then(({ data, success, errors }) => {
            if (success === true) {
                setAllCommentaries(data)
                setLoading(false)
            } else {
                setErrorsCommentary(errors)
                setLoading(false)
            }
        })
    }, [success])

    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => setShow(false);

    const addNewCommentary = async () => {
        const user = JSON.parse(localStorage.getItem("user"))
        const { success, errors } = await postCommentary(newCommentary)
        setLoadingAddCommentary(true)
        setSuccess(null)
        if (success === true) {
            handleClose()
            setSuccess(true)
            setLoadingAddCommentary(false)
        } else {
            setErrors(errors)
            setLoadingAddCommentary(false)
        }
    }

    const registerInLocalStorageCommentary = (commentaries) => {
        localStorage.setItem("Commentary_data", JSON.stringify(commentaries))
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="container mx-5 my-5">
                <h1> All commentaries :  </h1>
                {loading == true ? <CircularProgress />
                    : null}
                {errorsCommentary !== null ? <p style={{ color: "red" }}>{errorsCommentary}</p> : ""}
                <button className="btn btn-primary" onClick={handleShow}> New commentary </button> <br></br> <br></br>
                <Modal size="lg" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> New commentary  </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <form>
                                {errors !== null ? <p style={{ color: "red" }}>{errors}</p> : ""}
                                <div className="row">
                                    <div className="col-sm form-group">
                                        <label htmlFor="email">Author</label>
                                        <input type="email" disabled={true} className="form-control" placeholder={user?.firstname + ' ' + user?.lastname}></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm form-group">
                                        <label htmlFor="text">Object  :</label>
                                        <input type="text" className="form-control" onChange={e => setNewCommentary({ ...newCommentary, "subjectcommentary": e.target.value, "author": user?.firstname + ' ' + user?.lastname, "userId": user?.user_id })}></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm form-group">
                                        <label htmlFor="text">Description  :</label>
                                        <textarea type="text-area" className="form-control" onChange={e => setNewCommentary({ ...newCommentary, "contenu": e.target.value })}></textarea>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {loadingAddCommentary == true ? <CircularProgress />
                            : null}
                        <Button variant="primary" onClick={addNewCommentary}>
                            Add
                            </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                            </Button>
                    </Modal.Footer>
                </Modal>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Author</th>
                            <th scope="col">Object</th>
                            <th scope="col"> Date</th>
                            <th scope="col"> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(allCommentaries || []).map(commentaries => (
                            <tr key={commentaries.id}>
                                <td>{commentaries.author}</td>
                                <td>{commentaries.subject}</td>
                                <td>{moment(commentaries.creation_date).format('DD-MM-YYYY')}</td>
                                <td>
                                    <Link style={{ textDecoration: "none" }} to={{
                                        pathname: "/commentary",
                                        aboutProps: {
                                            commentary: commentaries
                                        }
                                    }}>
                                        <button className="btn btn-primary" data-toggle="tooltip" title="look the commentary" onClick={e => registerInLocalStorageCommentary(commentaries)}>
                                            <AiIcons.AiOutlineZoomIn />
                                        </button> &nbsp; &nbsp;
                                        </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Forum
