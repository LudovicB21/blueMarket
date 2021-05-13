import React, { useState, useEffect } from 'react'
import NavBar from '../../NavBar/NavBar'
import { CircleProgress } from 'react-gradient-progress'
import { Redirect } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'

function Fridge() {

    const items = [
        {
            id: 50,
            nom: "item1",
            size: 2,
            stock: 2,
            expiration: "20/04/2021"
        },
        {
            id: 24,
            nom: "item2",
            size: 30,
            stock: 1,
            expiration: "14/04/2021"
        },
        {
            id: 2,
            nom: "item3",
            size: 22,
            stock: 5,
            expiration: "15/04/2021"
        }
    ]

    const [progression, setProgression] = useState(0)
    const [auth, setAuth] = useState("")
    const [error, setError] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user'))) {
            setAuth(JSON.parse(localStorage.getItem('user')))
            if (JSON.parse(localStorage.getItem('user')).frigo) {
                calcul()
            }
        } else {
            setError(true)
        }
        // eslint-disable-next-line
    }, [])

    const calcul = () => {
        let total = 0
        let frigo = JSON.parse(localStorage.getItem('user')).frigo
        items.forEach(item => {
            let calc1 = item.size * 100
            let calcul2 = calc1 / frigo
            let calcStock = calcul2 * item.stock
            total += Math.round(calcStock)
        });
        setProgression(total)
    }

    if (error === true) {
        return <Redirect to="/login" />
    } else {
        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <div>

                </div>
                <div className="mx-5 my-5">
                    <h1> Use of your fridge </h1>
                    <CircleProgress percentage={progression} strokeWidth={5} />

                </div>
                <div className="mx-5 my-5">
                    <button className="btn btn-primary" onClick={handleShow}>
                        Purchase history
                    </button>
                </div>
                <div className="mx-5 my-5">
                    <h1> In my fridge :  </h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Expiration date</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(items || []).map(produits => (
                                <tr key={produits.id}>
                                    <td>
                                        {produits.nom}
                                    </td>
                                    <td> {produits.expiration} </td>
                                    <td> {produits.stock} </td>
                                    <td>
                                        <button className="btn btn-primary">
                                            Details
                                    </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div >
                <Modal size="lg" show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title> Purchase history  </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Carbon footprint</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                        </td>
                                        <td>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Fridge
