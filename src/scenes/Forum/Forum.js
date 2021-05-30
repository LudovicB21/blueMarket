import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import { Modal, Button } from 'react-bootstrap'
import * as AiIcons from "react-icons/ai"
import { Link } from 'react-router-dom'

function Forum() {

    const [show, setShow] = useState(null)
    const [loading, setLoading] = useState(null)
    const [allCommentaries, setAllCommentaries] = useState([])
    const [newCommentary, setNewCommentary] = useState([])
    const [errors, setErrors] = useState(null)
    const [errorsCommentary, setErrorsCommentary] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
    }, [])

    const handleShow = () => {
        setShow(true)
    }
    const handleClose = () => setShow(false);

    const addNewCommentary = () => {
        setNewCommentary({ ...newCommentary, "author": user?.firstname + ' ' + user?.lastname, "status": "open", "userId": user?.user_id })
    }

    const closeCommentary = () => {
        console.log("close")
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="container mx-5 my-5">
                <h1> All commentaries :  </h1>
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
                                        <input type="text" className="form-control" onChange={e => setNewCommentary({ ...newCommentary, "object": e.target.value })}></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm form-group">
                                        <label htmlFor="text">Description  :</label>
                                        <textarea type="text-area" className="form-control" onChange={e => setNewCommentary({ ...newCommentary, "description": e.target.value })}></textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm form-group">
                                        <label htmlFor="type">Status</label>
                                        <input type="text" disabled={true} className="form-control" placeholder="Open"></input>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
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
                            <th scope="col"> Status </th>
                            <th scope="col"> Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <Link style={{ textDecoration: "none" }} to={{
                                    pathname: "/commentary",
                                    /*aboutProps: {
                                        name: produits.Depart_name,
                                        id: produits.Depart_id
                                    }*/
                                }}>
                                    <button className="btn btn-primary" data-toggle="tooltip" title="look the commentary" /*onClick={e => handleShowDetails(producer)}*/>
                                        <AiIcons.AiOutlineZoomIn />
                                    </button> &nbsp; &nbsp;
                                </Link>
                                {user?.role === 0 ? <button className="btn btn-danger" data-toggle="tooltip" title="Close status" onClick={e => closeCommentary()}>
                                    <AiIcons.AiOutlineClose />
                                </button> : null}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Forum
