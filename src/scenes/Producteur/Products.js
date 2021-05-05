import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import { Redirect } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'

function Products() {

    useEffect(() => {
        authenticated()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [auth, setAuth] = useState("")
    const [error, setError] = useState(false)
    const [show, setShow] = useState(false);
    const [detail, setDetail] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const data = [
        {
            id: 1,
            produit: "lait",
            expiration: "27/04/2021",
            stock: "200",
            livraison: "22/03/2021"
        },
        {
            id: 2,
            produit: "lait2",
            expiration: "27/04/2021",
            stock: "100",
            livraison: "23/03/2021"
        },
        {
            id: 3,
            produit: "lait3",
            expiration: "27/04/2021",
            stock: "200",
            livraison: "22/03/2021"
        },
        {
            id: 4,
            produit: "lait4",
            expiration: "30/05/2021",
            stock: "60",
            livraison: "01/04/2021"
        },
    ]

    const constitution = [
        {
            id: 1,
            name: "lait",
            size: "1",
            ingredient1: "ingrédient 1",
            ingredient2: "ingrédient 2",
            ingredient3: "ingrédient 3",
            ingredient4: "ingrédient 4",
            ingredient5: "ingrédient 5",
            livraison: "2021/04/17",
            expiration: "2021/07/20"
        },
        {
            id: 2,
            size: "1",
            name: "lait2",
            ingredient1: "ingrédient 1",
            ingredient2: "ingrédient 2",
            ingredient3: "ingrédient 3",
            ingredient4: "ingrédient 4",
            ingredient5: "ingrédient 5",
            livraison: "2021/04/17",
            expiration: "2021/07/20"
        },
        {
            id: 3,
            name: "lait3",
            size: "1",
            ingredient1: "ingrédient 1",
            ingredient2: "ingrédient 2",
            ingredient3: "ingrédient 3",
            ingredient4: "ingrédient 4",
            ingredient5: "ingrédient 5",
            livraison: "2021/04/17",
            expiration: "2021/07/20"
        },
        {
            id: 4,
            name: "lait4",
            size: "1",
            ingredient1: "ingrédient 1",
            ingredient2: "ingrédient 2",
            ingredient3: "ingrédient 3",
            ingredient4: "ingrédient 4",
            ingredient5: "ingrédient 5",
            livraison: "2021/04/17",
            expiration: "2021/07/20"
        },
    ]

    const authenticated = () => {
        if (localStorage.getItem('user')) {
            setAuth(JSON.parse(localStorage.getItem('user')))
        } else {
            setError(true)
        }
    }

    const details = (id) => {
        // Faire un fetch
        // eslint-disable-next-line array-callback-return
        constitution.map(item => {
            if (id === item.id) {
                setDetail(item)
                handleShow()
            }
        })
    }

    if (error === true) {
        return <Redirect to="/login" />
    } else {
        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <div className="mx-5 my-5">
                    <h1> My products </h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col"> Expiration Date</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Next delivery</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(data || []).map(produits => (
                                <tr>
                                    <td>
                                        {produits.produit}
                                    </td>
                                    <td> {produits.expiration} </td>
                                    <td> {produits.stock} </td>
                                    <td> {produits.livraison} </td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => details(produits.id)}>
                                            Details
                                    </button>
                                        <Modal size="lg" show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title> Product's details </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div className="mx-5 my-5">
                                                    <p> Name:  {detail.name}</p>
                                                    <p> Size:  {detail.size}</p>
                                                    <p> Next delivery:  {detail.livraison}</p>
                                                    <p> Expiration date:  {detail.expiration}</p>
                                                    <p> Location:  </p>
                                                </div>
                                                <div>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">{detail.ingredient1}</th>
                                                                <th scope="col">{detail.ingredient2}</th>
                                                                <th scope="col">{detail.ingredient3}</th>
                                                                <th scope="col">{detail.ingredient4}</th>
                                                                <th scope="col">{detail.ingredient5}</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    {detail.ingredient1}
                                                                </td>
                                                                <td>
                                                                    {detail.ingredient2}
                                                                </td>
                                                                <td>
                                                                    {detail.ingredient3}
                                                                </td>
                                                                <td>
                                                                    {detail.ingredient4}
                                                                </td>
                                                                <td>
                                                                    {detail.ingredient5}
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div >
            </div>
        )
    }
}

export default Products
