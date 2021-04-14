import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import { Modal, Button } from 'react-bootstrap'

function Profile() {

    useEffect(() => {
        getAuth()
    }, [])

    const [auth, setAuth] = useState("")
    const [details, setDetails] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getAuth = () => {
        setAuth(JSON.parse(localStorage.getItem('user')))
    }

    const role = () => {
        if (auth.role === 0) {
            return "Client"
        } else if (auth.role === 1) {
            return "Producteur"
        } else {
            return "Administrateur"
        }
    }

    const submitHandler = e => {
        e.preventDefault();

        console.log(details)
        // Appel api pour changement des données profile
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="container mx-5 my-5">
                <h1>Mon profile </h1>
                <a className="text-danger"> <strong> Pour changer vos données remplissez les champs </strong>  </a>
                <form onSubmit={submitHandler} >
                    <div className="row">
                        <div className="col-sm form-group">
                            <label for="firstname">Firstname :</label>
                            <input type="text" className="form-control" onChange={e => setDetails({ ...details, "firstname": e.target.value })} placeholder={auth.firstname}></input>
                        </div>
                        <div className="col-sm form-group">
                            <label for="lastname">Lastname :</label>
                            <input type="text" className="form-control" onChange={e => setDetails({ ...details, "lastname": e.target.value })} placeholder={auth.lastname}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm form-group">
                            <label for="email">Email :</label>
                            <input type="email" className="form-control" onChange={e => setDetails({ ...details, "email": e.target.value })} placeholder={auth.email}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm form-group">
                            <label for="fridge">Fridge ( Litre ) :</label>
                            <input type="text" className="form-control" onChange={e => setDetails({ ...details, "fridge": e.target.value })} placeholder={auth.frigo}></input>
                        </div>
                        <div className="col-sm form-group">
                            <label for="role">Role :</label>
                            <input type="text" className="form-control" disabled="true" placeholder={role()}></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm form-group">
                            <button className="btn btn-secondary" data-toggle="modal" data-target="#exampleModalCenter" onClick={handleShow}> Change password</button>
                            <Modal size="lg" show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modification de votre mot de passe </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <label for="password">New password :</label>
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
                            <button className="btn btn-primary"> Enregistrer</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile
