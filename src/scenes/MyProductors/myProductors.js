import React, { useState } from 'react'
import NavBar from '../NavBar/NavBar'
import { Modal, Button } from 'react-bootstrap'

function MyProductors() {

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [newProducer, setNewProducer] = useState([])
    const [producers, setProducers] = useState([])

    const sendProducer = () => {
        console.log(newProducer)
        //handleClose()
        setProducers(newProducer)
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="mx-5 my-5">
                <h1> All my producers  </h1>
                <button className="btn btn-primary" onClick={handleShow}> Add a producer </button> <br></br> <br></br>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                                <th scope="col">Type of products</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                                <td>  </td>
                            </tr>
                        </tbody>
                    </table>
                    <Modal size="lg" show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title> New producer  </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <form>
                                    <div className="row">
                                        <div className="col-sm form-group">
                                            <label htmlFor="lastname">Lastname :</label>
                                            <input type="text" className="form-control" onChange={e => setNewProducer({ ...newProducer, "lastname": e.target.value })} /*placeholder={auth.lastname}*/></input>
                                        </div>
                                        <div className="col-sm form-group">
                                            <label htmlFor="adresse">Location :</label>
                                            <input type="text" className="form-control" onChange={e => setNewProducer({ ...newProducer, "location": e.target.value })} /*placeholder={auth.lastname}*/></input>
                                        </div>
                                        <div className="col-sm form-group">
                                            <label htmlFor="distance">Distance ( km ) :</label>
                                            <input type="text" className="form-control" onChange={e => setNewProducer({ ...newProducer, "distance": e.target.value })} /*placeholder={auth.lastname}*/></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm form-group">
                                            <label htmlFor="email">Email :</label>
                                            <input type="email" className="form-control" onChange={e => setNewProducer({ ...newProducer, "email": e.target.value })} /*placeholder={auth.email}*/></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm form-group">
                                            <label htmlFor="type">Type of products :</label>
                                            <input type="text" className="form-control" onChange={e => setNewProducer({ ...newProducer, "type": e.target.value })} /*placeholder={auth.frigo}*/></input>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={sendProducer}>
                                Add
                            </Button>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div >
    )
}

export default MyProductors
