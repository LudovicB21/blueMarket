import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import { Redirect } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { get } from '../../services/Api/InventoryProducer/get'
import * as CgIcons from "react-icons/cg"
import moment from 'moment'
import { deleteProductFromProducer } from '../../services/Api/InventoryProducer/delete'
import { editProductProducer } from '../../services/Api/InventoryProducer/update'

function Products() {

    const [productProducer, setProductProducer] = useState([])
    const [auth, setAuth] = useState("")
    const [error, setError] = useState(false)
    const [errors, setErrors] = useState(false)
    const [show, setShow] = useState(false);
    const [sucess, setSucess] = useState(false)
    const [data, setData] = useState(null)
    const [changeProduct, setChangeProduct] = useState([])
    const [details, setDetails] = useState([]);


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
    const handleShow = (product) => {
        setDetails(product)
        setShow(true);
    }
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

    const changeProductProducer = async () => {
        const newDataProducer = changeProduct
        if (newDataProducer.size === null || newDataProducer.size === undefined || newDataProducer.size === "") {
            newDataProducer.size = details.size
        }
        if (newDataProducer.ingredients === null || newDataProducer.ingredients === undefined || newDataProducer.ingredients === "") {
            newDataProducer.ingredients = details.Ingredients
        }
        const auth = JSON.parse(localStorage.getItem("user")).user_id
        //editProductProducer(newDataProducer, details.id, auth)
        const { success, errors, data } = await editProductProducer(newDataProducer, details.id, auth)
        setSucess(false)
        if (success === true) {
            setSucess(true)
            handleClose()
        } else {
            setErrors(errors)
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
                                    <td> {expiration(moment(produits.expiration_Date).format('DD-MM-YYYY'))} </td>
                                    <td> {produits.stockP} </td>
                                    <td> {moment(produits.next_Delivery).format('DD-MM-YYYY')} </td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => handleShow(produits)}>
                                            Details
                                    </button> &nbsp;&nbsp;&nbsp;
                                    <Modal size="lg" show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title> {details.name} </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div>
                                                    <form>
                                                        {errors !== null ? <p style={{ color: "red" }}>{errors}</p> : ""}
                                                        <div className="row">
                                                            <div className="col-sm form-group">
                                                                <label htmlFor="size">Size :</label>
                                                                <input type="text" className="form-control" onChange={e => setChangeProduct({ ...changeProduct, "size": e.target.value })} placeholder={details.size}></input>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm form-group">
                                                                <label htmlFor="ingredients">Ingredient :</label>
                                                                <input type="text" className="form-control" onChange={e => setChangeProduct({ ...changeProduct, "ingredients": e.target.value })} placeholder={details.Ingredients}></input>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="primary" onClick={changeProductProducer}>
                                                    Add
                                                </Button>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>

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