import React, { useState, useEffect } from 'react'
import NavBar from '../../NavBar/NavBar'
import { CircleProgress } from 'react-gradient-progress'
import { Redirect } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { getProductByUserForFridge, getProductByIdForFridge } from '../../../services/Api/Fridge/get'
import { deleteProductFromFridge } from '../../../services/Api/Fridge/delete'
import { changeQuantityProduct } from '../../../services/Api/Fridge/post'
import moment from 'moment'
import * as CgIcons from "react-icons/cg"
import CircularProgress from '@material-ui/core/CircularProgress';
import * as AiIcons from "react-icons/ai"
import * as BsFill from "react-icons/bs"

function Fridge() {

    const [progression, setProgression] = useState(0)
    const [auth, setAuth] = useState("")
    const [error, setError] = useState("")
    const [errorsAuth, setErrorAuth] = useState(false)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(null)
    const [showStat, setShowStat] = useState(false)
    const [sucess, setSucess] = useState(false)
    const [showDetails, setShowDetails] = useState(false)
    const [details, setDetails] = useState([])


    useEffect(() => {
        const authentification = JSON.parse(localStorage.getItem('user'))
        if (authentification) {
            setAuth(authentification)
            setLoading(true)
            getProductByUserForFridge(JSON.parse(localStorage.getItem("user")).user_id).then(({ data, success, errors }) => {
                if (success === true) {
                    setProducts(data)
                    setLoading(false)
                } else {
                    setError(errors)
                    setLoading(false)
                }
            })
        } else {
            setErrorAuth(true)
        }
    }, [sucess])

    const handleShowStat = () => {
        calcul()
        setShowStat(true)
    }
    const handleShowDetails = () => setShowDetails(true)
    const handleCloseDetails = () => setShowDetails(false)

    const calcul = () => {
        let total = 0
        products.forEach(item => {
            let calc1 = item.size * 100
            let calcul2 = calc1 / auth.frigo
            let calcStock = calcul2 * item.quantity
            total += Math.round(calcStock)
        });
        setProgression(total)
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

    const removeProduct = async (cartId, productId) => {
        const { success, errors, data } = await deleteProductFromFridge(auth.user_id, cartId, productId)
        setSucess(false)
        if (success === true) {
            setSucess(true)
            alert("Product successfully delete")
        } else {
            setError(errors)
            alert(errors)
        }
    }

    const decrease = async (quantity, product_id, cart_id) => {
        const newQuantity = quantity == 1 ? quantity = 1 : quantity -= 1
        const { success, errors, data } = await changeQuantityProduct(auth.user_id, product_id, cart_id, newQuantity)
        setSucess(false)
        if (success === true) {
            setSucess(true)
            alert("Quantity update success")
        } else {
            setError(errors)
            alert(errors)
        }
    }

    const getDetailsProduct = async (productId) => {
        getProductByIdForFridge(productId)
        const { success, errors, data } = await getProductByIdForFridge(productId)
        if (success === true) {
            setDetails(data)
            handleShowDetails()
        } else {
            setError(errors)
        }
    }

    const stockAlert = (stock) => {
        if (stock === 1) {
            return <div className="text-danger"> <CgIcons.CgDanger /> {stock} </div>
        } else {
            return stock
        }
    }

    if (errorsAuth === true) {
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
                    {showStat === true ? <CircleProgress percentage={progression} strokeWidth={5} /> : <button className="btn btn-primary" onClick={handleShowStat}>
                        Look stats
                    </button>}

                </div>
                <div className="mx-5 my-5">
                    <h1> In my fridge :  </h1>
                    {error !== null ? <p style={{ color: "red" }}>{error}</p> : ""}
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Expiration date</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        {loading === true ? <CircularProgress /> : <tbody>
                            {(products || []).map(produits => (
                                <tr key={produits.expiration_date}>
                                    <td>
                                        {produits.name}
                                    </td>
                                    <td> {expiration(moment(produits.expiration_date).format('DD-MM-YYYY'))} </td>
                                    {produits.quantity === 1 ? <td> {stockAlert(produits.quantity)} </td> : <td> <button className="btn btn-secondary" onClick={() => decrease(produits.quantity, produits.id, produits.Cart_id)}> - </button> {produits.quantity} </td>}
                                    <td>
                                        <button className="btn btn-primary" onClick={e => getDetailsProduct(produits.id)}>
                                            <AiIcons.AiOutlineZoomIn />
                                        </button> &nbsp; &nbsp; &nbsp;
                                    <Modal size="lg" show={showDetails} onHide={handleCloseDetails}>
                                            <Modal.Header closeButton>
                                                <Modal.Title> Product's details </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <img src={details.image} width="200px" style={{ marginLeft: "auto", marginRight: "auto", display: "flex", objectFit: "cover" }} height="250px" alt={details.name} />
                                                <div className="row">
                                                    <div className="col-sm form-group">
                                                        <label htmlFor="email">Name :</label>
                                                        <p className="form-control"> {details.name}</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm form-group">
                                                        <label htmlFor="address">Price :</label>
                                                        <p className="form-control"> {details.price} €</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm form-group">
                                                        <label htmlFor="type">Size :</label>
                                                        <p className="form-control"> {details.size} L</p>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm form-group">
                                                        <label htmlFor="type">Ingredients :</label>
                                                        <p className="form-control"> {details.Ingredients}</p>
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleCloseDetails}>
                                                    Close
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <button className="btn btn-danger" onClick={e => removeProduct(produits.Cart_id, produits.id)}>
                                            <BsFill.BsTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>}
                    </table>
                </div >
            </div>
        )
    }
}

export default Fridge
