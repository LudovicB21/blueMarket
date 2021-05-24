import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import { Modal, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import "./Profile.css"
import { getAllPurchase } from '../../services/Api/Profile/get'
import CircularProgress from '@material-ui/core/CircularProgress';
import * as AiIcons from "react-icons/ai"

function Profile() {

    const [auth, setAuth] = useState("")
    const [details, setDetails] = useState({});
    const [show, setShow] = useState(false);
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(null)
    const [historyPurchase, setHistoryPurchase] = useState([])

    useEffect(() => {
        authenticated()
        setLoading(true)
        getAllPurchase(JSON.parse(localStorage.getItem("user")).user_id).then(({ data, success, errors }) => {
            if (success === true) {
                setHistoryPurchase(data)
                setLoading(false)
            } else {
                setLoading(false)
                setError(errors)
            }
        })
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const role = () => {
        if (auth.role === 0) {
            return "Client"
        } else if (auth.role === 1) {
            return "Producteur"
        } else {
            return "Administrateur"
        }
    }

    const authenticated = () => {
        if (localStorage.getItem('user')) {
            setAuth(JSON.parse(localStorage.getItem('user')))
        } else {
            setError(true)
        }
    }

    const submitHandler = e => {
        e.preventDefault();
        // Appel api pour changement des données profile
    }

    if (error === true) {
        return <Redirect to="/login" />
    } else {
        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <div className="container mx-5 my-5">
                    <h1>My profile </h1>
                    <a className="text-danger" id="removeunderline" href="foo"> <strong> To change your data fill in the fields </strong>  </a>
                    <form onSubmit={submitHandler} >
                        <div className="row">
                            <div className="col-sm form-group">
                                <label htmlFor="firstname">Firstname :</label>
                                <input type="text" className="form-control" onChange={e => setDetails({ ...details, "firstname": e.target.value })} placeholder={auth.firstname}></input>
                            </div>
                            <div className="col-sm form-group">
                                <label htmlFor="lastname">Lastname :</label>
                                <input type="text" className="form-control" onChange={e => setDetails({ ...details, "lastname": e.target.value })} placeholder={auth.lastname}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm form-group">
                                <label htmlFor="email">Email :</label>
                                <input type="email" className="form-control" onChange={e => setDetails({ ...details, "email": e.target.value })} placeholder={auth.email}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm form-group">
                                <label htmlFor="fridge">Fridge ( Litre ) :</label>
                                <input type="text" className="form-control" onChange={e => setDetails({ ...details, "fridge": e.target.value })} placeholder={auth.frigo}></input>
                            </div>
                            <div className="col-sm form-group">
                                <label htmlFor="role">Role :</label>
                                <input type="text" className="form-control" disabled={true} placeholder={role()}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm form-group">
                                <button className="btn btn-secondary" data-toggle="modal" data-target="#exampleModalCenter" onClick={handleShow}> Change password</button>
                                <Modal size="lg" show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Modify your password </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <label htmlFor="password">New password :</label>
                                        <input type="password" className="form-control" onChange={e => setDetails({ ...details, "password": e.target.value })}></input>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                    </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            Save It!
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm form-group">
                                <button className="btn btn-primary"> Save</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="container mx-5 my-5">
                    <h1> Purchase history :  </h1>
                    {loading == true ? <CircularProgress />
                        : null}
                    {error !== null ? <p style={{ color: "red" }}>{error.GetUserCart}</p> : ""}
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Cart Price</th>
                                <th scope="col"> Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {(historyPurchase || []).map(purchase => (
                                <tr key={purchase.Cart_id}>
                                    <td>
                                        {purchase.Date}
                                    </td>
                                    <td> {purchase.Cart_price} </td>
                                    <td> <button className="btn btn-primary" data-toggle="tooltip" title="Details purchase"> <AiIcons.AiOutlineZoomIn /> </button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Profile
