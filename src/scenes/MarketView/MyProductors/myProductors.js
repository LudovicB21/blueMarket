import React, { useState } from 'react'
import NavBar from '../../NavBar/NavBar'
import { Modal, Button } from 'react-bootstrap'
import Select from 'react-select'
import { edit } from '../../../services/Api/Producers/edit'

function MyProductors() {

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);
    const [newProducer, setNewProducer] = useState([])
    const [producers, setProducers] = useState([])
    const [selectedOption, setSelectOption] = useState(null)

    const sendProducer = () => {
        setProducers([...producers, newProducer])
        handleClose()
    }

    const options = [
        { value: '150', label: 'Truck' },
        { value: '267', label: 'Boat' },
        { value: '360', label: 'Plane' },
        { value: '11', label: 'Train' }
    ]

    const handleChange = selectedOption => {
        setSelectOption(selectedOption);
        setNewProducer({ ...newProducer, "transport": selectedOption.value })
    };

    const addNewProducer = () => {
        edit(newProducer)
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
                                <th scope="col">Email</th>
                                <th scope="col">Address</th>
                                <th scope="col">Type of products</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(producers || []).map(producer =>
                                <tr key={producer.lastname}>
                                    <td> {producer.email || null} </td>
                                    <td>  {producer.address} </td>
                                    <td>  {producer.type || null} </td>
                                    <td>  <button className="btn btn-primary">
                                        Details
                                    </button></td>
                                </tr>
                            )}
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
                                            <label htmlFor="email">Email of your productor :</label>
                                            <input type="email" className="form-control" onChange={e => setNewProducer({ ...newProducer, "email": e.target.value })} /*placeholder={auth.email}*/></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm form-group">
                                            <label htmlFor="address">Address  :</label>
                                            <input type="text" className="form-control" onChange={e => setNewProducer({ ...newProducer, "address": e.target.value })} /*placeholder={auth.lastname}*/></input>
                                        </div>
                                        <div className="col-sm form-group">
                                            <label htmlFor="distance">Distance from market ( km ) :</label>
                                            <input type="text" className="form-control" onChange={e => setNewProducer({ ...newProducer, "distance": e.target.value })} /*placeholder={auth.lastname}*/></input>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm form-group">
                                            <label htmlFor="type">Type of products :</label>
                                            <input type="text" className="form-control" onChange={e => setNewProducer({ ...newProducer, "type": e.target.value })} /*placeholder={auth.frigo}*/></input>
                                        </div>
                                        <div className="col-sm form-group">
                                            <label htmlFor="transport">Transport :</label>
                                            <Select
                                                options={options}
                                                onChange={handleChange}
                                                value={selectedOption}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={addNewProducer}>
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
