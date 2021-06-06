import React, { useState, useEffect } from 'react'
import NavBar from '../../NavBar/NavBar'
import { Redirect } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { get } from '../../../services/Api/InventoryProducer/get'
import moment from 'moment'
import { deleteProductFromProducer } from '../../../services/Api/InventoryProducer/delete'
import { editProductProducer, changeQuantityReplenishmentProducer } from '../../../services/Api/InventoryProducer/update'
import CircularProgress from '@material-ui/core/CircularProgress';
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as CgIcons from "react-icons/cg"
import * as BsFill from "react-icons/bs"

function Products() {

    const [productProducer, setProductProducer] = useState([])
    const [auth, setAuth] = useState("")
    const [error, setError] = useState(false)
    const [errors, setErrors] = useState(false)
    const [show, setShow] = useState(false);
    const [showNewProduct, setShowNewProduct] = useState(false);
    const [sucess, setSucess] = useState(false)
    const [data, setData] = useState(null)
    const [changeProduct, setChangeProduct] = useState([])
    const [details, setDetails] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showReplenishmentProducer, setShowReplenishmentProducer] = useState(false);
    const [replenishmentQuantityProducer, setReplenishmentQuantityProducer] = useState([])


    useEffect(() => {
        authenticated()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        get(JSON.parse(localStorage.getItem("user")).user_id).then(({ data, success, errors }) => {
            if (success === true) {
                setProductProducer(data)
                setData(true)
                setLoading(true)
            } else {
                setData(false)
                setLoading(false)
            }
        })
    }, [sucess])

    const handleClose = () => setShow(false);
    const handleShow = (product) => {
        setDetails(product)
        setShow(true);
    }

    const handleCloseNewProduct = () => setShowNewProduct(false);
    const handleShowNewProduct = () => {
        setShowNewProduct(true);
    }

    const handleCloseReplenishmentProducer = () => setShowReplenishmentProducer(false);
    const handleShowReplenishmentProducer = (produit) => {
        setErrors(null)
        setDetails(produit)
        setShowReplenishmentProducer(true)
    };

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

    const stockPAlert = (stockP) => {
        if (stockP <= 1000) {
            return <div className="text-danger"> <CgIcons.CgDanger /> {stockP} </div>
        } else {
            return stockP
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
        const { success, errors, data } = await editProductProducer(newDataProducer, details.id, auth)
        setSucess(false)
        if (success === true) {
            setSucess(true)
            handleClose()
        } else {
            setErrors(errors)
        }
    }

    const changeReplenishmentQuantitiesProducer = async () => {
        setSucess(false)
        const { success, errors } = await changeQuantityReplenishmentProducer(details.id, replenishmentQuantityProducer)
        if (success === true) {
            setSucess(true)
            handleCloseReplenishmentProducer()
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
                    <button className="btn btn-primary" onClick={e => handleShowNewProduct()}> New product </button> <br></br> <br></br>
                    {loading == false ? <CircularProgress />
                        : null}
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
                                    <td> {stockPAlert(produits.stockP)} </td>
                                    <td> {moment(produits.next_Delivery).format('DD-MM-YYYY')} </td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => handleShow(produits)}>
                                            <AiIcons.AiOutlineZoomIn />
                                        </button> &nbsp;&nbsp;&nbsp;
                                    <button className="btn btn-secondary" data-toggle="tooltip" onClick={e => handleShowReplenishmentProducer(produits)} title="Replenishment Inventory"> <FaIcons.FaWarehouse /> </button> &nbsp;&nbsp;&nbsp;
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
                                        <Modal size="lg" show={showReplenishmentProducer} onHide={handleCloseReplenishmentProducer}>
                                            <Modal.Header closeButton>
                                                <Modal.Title> Send how many products you want to produce </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div className="row">
                                                    <div className="col-sm form-group">
                                                        <p> <strong> Actual stock : </strong> {details.stockP} </p>
                                                        <label htmlFor="replenishmentInventory">Quantity :</label>
                                                        {error !== null ? <p style={{ color: "red" }}>{error}</p> : ""}
                                                        <input type="text" className="form-control" onChange={e => setReplenishmentQuantityProducer({ ...replenishmentQuantityProducer, "produceprod": e.target.value })}></input>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="primary" onClick={changeReplenishmentQuantitiesProducer}>
                                                    Send
                                            </Button>
                                                <Button variant="secondary" onClick={handleCloseReplenishmentProducer}>
                                                    Close
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <Modal size="lg" show={showNewProduct} onHide={handleCloseNewProduct}>
                                            <Modal.Header closeButton>
                                                <Modal.Title> Add new product </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div className="row">
                                                    <div className="col-sm form-group">
                                                        <label htmlFor="Name"> Name :</label>
                                                        <input type="text" className="form-control"></input>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm form-group">
                                                        <label htmlFor="Expiration_Date"> Expiration Date :</label>
                                                        <input type="text" className="form-control"></input>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm form-group">
                                                        <label htmlFor="stock"> Stock :</label>
                                                        <input type="text" className="form-control"></input>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm form-group">
                                                        <label htmlFor="Next_Delivery"> Next delivery :</label>
                                                        <input type="text" className="form-control"></input>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="primary">
                                                    Send
                                            </Button>
                                                <Button variant="secondary" onClick={handleCloseNewProduct}>
                                                    Close
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <button className="btn btn-danger" onClick={e => removeProduct(produits.id)}>
                                            <BsFill.BsTrash />
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