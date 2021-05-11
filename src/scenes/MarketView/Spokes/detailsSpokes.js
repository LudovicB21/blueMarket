import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../../NavBar/NavBar'
import "../../../assets/modal.css"
import { Modal, Button } from 'react-bootstrap'
import Barilla from '../../../assets/img/p.jpg'
import moment from 'moment'
import * as CgIcons from "react-icons/cg"

function DetailsSpokes(props) {

    useEffect(() => {
        if (props.location.aboutProps) {
            setName(props.location.aboutProps.name)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [name, setName] = useState("")
    const [show, setShow] = useState(false);

    const stockes = [
        {
            id: 1,
            nom: "pâtes1",
            stockR: 15,
            stockI: 100,
            livraison: "2021-04-17",
            expiration: "2021-04-15"
        },
        {
            id: 2,
            nom: "pâtes2",
            stockR: 10,
            stockI: 50,
            livraison: "2021-04-17",
            expiration: "2021-07-20"

        },
        {
            id: 3,
            nom: "pâtes3",
            stockR: 14,
            stockI: 30,
            livraison: "2021-04-17",
            expiration: "2021-07-20"

        },
        {
            id: 4,
            nom: "pâtes4",
            stockR: 6,
            stockI: 20,
            livraison: "2021-04-17",
            expiration: "2021-07-20"

        },
        {
            id: 5,
            nom: "pâtes5",
            stockR: 8,
            stockI: 15,
            livraison: "2021-04-17",
            expiration: "2021-07-20"

        },
        {
            id: 6,
            nom: "pâtes6",
            stockR: 7,
            stockI: 24,
            livraison: "2021-04-17",
            expiration: "2021-07-20"

        },
    ]

    const product = [
        {
            id: 1,
            name: "pâtes1",
            size: "0",
            image: "../assets/img/barilla-rigatoni.jpg",
            ingredient1: "ingrédient 1",
            ingredient2: "ingrédient 2",
            ingredient3: "ingrédient 3",
            ingredient4: "ingrédient 4",
            ingredient5: "ingrédient 5",
            livraison: "2021/04/17",
            expiration: "2021/07/20"
        }
    ]

    // Modale jamais utilisé ;) 
    /*const manageState = () => {
        setModalState(!modalState)
    }*/

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const expiration = (expiration) => {
        if (moment(expiration).isSameOrBefore('2021-04-16')) {
            return <div className="text-danger"> <CgIcons.CgDanger /> {expiration} </div>
        } else {
            return expiration
        }
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="mx-5 my-5">
                <h1> {name} </h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Stock Department</th>
                            <th scope="col">Stock Inventory</th>
                            <th scope="col">Next delivery</th>
                            <th scope="col">Expiration date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(stockes || []).map(produits => (
                            <tr>
                                <td>
                                    {produits.nom}
                                </td>
                                <td> {produits.stockR} </td>
                                <td>
                                    {produits.stockI}
                                </td>
                                <td>
                                    {produits.livraison}
                                </td>
                                <td>
                                    {expiration(produits.expiration)}
                                </td>
                                <td>
                                    <Link style={{ textDecoration: "none" }} to={{
                                        pathname: "/detailsProduct",
                                        aboutProps: {
                                            id: produits.id
                                        }
                                    }}>
                                        {/*<button onClick={() => manageState()} className="btn btn-primary">
                                            Détails
                                    </button> */}
                                    </Link>
                                    <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick={handleShow}> Details</button> &nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-secondary" data-toggle="modal" data-target="#exampleModalCenter" onClick={handleShow}> Order</button>
                                    <Modal size="lg" show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title> Product's details </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            {(product || []).map(details => (
                                                <div>
                                                    <div>
                                                        <img src={Barilla} width={200} alt="logo" />
                                                    </div>
                                                    <div className="mx-5 my-5">
                                                        <p> Name:  {details.name}</p>
                                                        <p> Size:  {details.size}</p>
                                                        <p> Next delivery:  {details.livraison}</p>
                                                        <p> Expiration date:  {details.expiration}</p>
                                                    </div>
                                                    <div>
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">{details.ingredient1}</th>
                                                                    <th scope="col">{details.ingredient2}</th>
                                                                    <th scope="col">{details.ingredient3}</th>
                                                                    <th scope="col">{details.ingredient4}</th>
                                                                    <th scope="col">{details.ingredient5}</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>
                                                                        {details.ingredient1}
                                                                    </td>
                                                                    <td>
                                                                        {details.ingredient2}
                                                                    </td>
                                                                    <td>
                                                                        {details.ingredient3}
                                                                    </td>
                                                                    <td>
                                                                        {details.ingredient4}
                                                                    </td>
                                                                    <td>
                                                                        {details.ingredient5}
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            ))}
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

export default DetailsSpokes
