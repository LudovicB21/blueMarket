import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import { Modal, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import "./Profile.css"

function Profile() {

    useEffect(() => {
        authenticated()
        /*fetch('https://bluemarket.shop/api/login',
            {
                method: "GET",
            }).then(response => response.json())
            .then(data => console.log(data));*/
    }, [])

    const [auth, setAuth] = useState("")
    const [error, setError] = useState(false)
    const [details, setDetails] = useState({});
    const [show, setShow] = useState(false);

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

        console.log(details)
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
            </div>
        )
    }
}

export default Profile
