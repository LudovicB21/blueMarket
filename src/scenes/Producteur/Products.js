import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import { Redirect } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { get } from '../../services/Api/InventoryProducer/get'
import * as CgIcons from "react-icons/cg"
import moment from 'moment'
import { deleteProductFromProducer } from '../../services/Api/InventoryProducer/delete'
function Products() {

    const [productProducer, setProductProducer] = useState([])
    const [auth, setAuth] = useState("")
    const [error, setError] = useState(false)
    const [show, setShow] = useState(false);
    const [sucess, setSucess] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        authenticated()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        get(JSON.parse(localStorage.getItem("user")).user_id).then(({ data, success, errors }) => {
            if (success === true) {
                setProductProducer(data)
                setData(true)
            } else {
                setData(false)
            }
        })
    }, [sucess])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const authenticated = () => {
        if (localStorage.getItem('user')) {
            setAuth(JSON.parse(localStorage.getItem('user')))
        } else {
            setError(true)
        }
    }

    const expiration = (expiration) => {
        const today = (moment().format('YYYY-MM-DD'))
        const newExpirationDate = moment(expiration, 'DD-MM-YYYY').format('YYYY-MM-DD')
        if (moment(newExpirationDate).isSameOrBefore(today)) {
            return <div className="text-danger"> <CgIcons.CgDanger /> {expiration} </div>
        } else {
            return expiration
        }
    }

    const removeProduct = async (productId) => {
        const user_id = JSON.parse(localStorage.getItem("user")).user_id
        const { success, errors, data } = await deleteProductFromProducer(user_id, productId)
        setSucess(false)
        if (success === true) {
            setSucess(true)
            alert("Product successfully delete")
        } else {
            setError(errors)
            alert(errors)
        }
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
                    <h1> Inventory </h1>
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
                            {(productProducer || []).map(produits => (
                                <tr key={produits.id}>
                                    <td>
                                        {produits.name}
                                    </td>
                                    <td> {expiration(moment(produits.expiration_date).format('DD-MM-YYYY'))} </td>
                                    <td> {produits.stockP} </td>
                                    <td> {moment(produits.next_Delivery).format('DD-MM-YYYY')} </td>
                                    <td>
                                        <button className="btn btn-primary" /*onClick={() => details(produits.id)}*/>
                                            Details
                                    </button> &nbsp;&nbsp;&nbsp;
                                        {/*<Modal size="lg" show={show} onHide={handleClose}>
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
                                </Modal>*/}

                                        <button className="btn btn-danger" onClick={e => removeProduct(produits.id)}>
                                            X
                                    </button>
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