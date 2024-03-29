import React, { Component } from 'react'
import NavBar from '../../NavBar/NavBar'
import { DataContext } from '../../../stores/Context'
import promotion from '../../../stores/promotion'
import moment from 'moment'
import { postShoppingCart } from '../../../services/Api/ShoopingCart/post'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from "react-router-dom"
import { Modal, Button } from 'react-bootstrap'
import { getPromotion } from "../../../services/Api/DetailsDepartments/get"

export class ShoppingCart extends Component {
    static contextType = DataContext;
    state = {
        error: null,
        loading: null,
        success: null,
        successSend: null,
        show: null,
        promotions: [],
        errorPromotion: null
    }

    componentDidMount() {
        this.context.getTotal()
        if (localStorage.getItem("user") === null || localStorage.getItem("user") === undefined) {
            this.setState({ success: false })
        } else {
            this.setState({ success: true })
        }
        getPromotion().then(({ data, success, errors }) => {
            if (success === true) {
                this.setState({ promotions: data })
            } else {
                this.setState({ errorPromotion: errors })
            }
        })
    }

    handleClose = () => this.setState({ show: false });
    handleShow = () => {
        this.setState({ show: true });
    }

    payment = async (cart, total) => {
        this.setState({ loading: true })
        const today = (moment().format('YYYY-MM-DD H:m:s'))
        const userId = JSON.parse(localStorage.getItem("user")).user_id
        const idValues = [];
        for (let i = 0; i < cart.length; i++) {
            idValues[i] = cart[i]["id"];
        }
        const quantityValues = []
        for (let i = 0; i < cart.length; i++) {
            quantityValues[i] = cart[i]["quantity"];
        }
        const obj = {}
        for (let i = 0; i < idValues.length; i++) {
            obj[idValues[i]] = quantityValues[i]
        }
        const strObj = JSON.stringify(obj)
        //postShoppingCart(strObj, total, today, userId)
        const { success, errors, data } = await postShoppingCart(strObj, total, today, userId)
        this.setState({ loading: true })
        this.setState({ error: true })
        if (success === true) {
            this.context.resetCartAndTotal()
            localStorage.removeItem("dataCart")
            localStorage.removeItem("dataTotal")
            this.setState({ loading: false })
            this.setState({ successSend: true })
        } else {
            this.setState({ error: errors || data })
            this.setState({ loading: false })
        }
    }

    render() {
        const { cart, increase, removeProduct, total, reduction } = this.context
        const { payment } = this;

        if (this.state.success === false) {
            return <Redirect to="/login" />
        }
        if (this.state.successSend === true) {
            return <Redirect to="/fridge" />
        }
        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <div>
                    <div className="mx-5 my-5">
                        <h1> My shopping cart </h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col"> Promotion</th>
                                    <th scope="col">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(cart || []).map(produits => (
                                    <tr key={produits.name}>
                                        <td>
                                            {produits.name}
                                        </td>
                                        <td> {Math.round(produits.price * produits.quantity * 100) / 100} € </td>
                                        <td>
                                            {produits.promotion === 1 ? null :
                                                <p key={produits.value} style={{ color: "red" }}>
                                                    {(this.state.promotions || []).map(promo => {
                                                        if (promo.value === produits.promotion) {
                                                            return promo.label
                                                        } else {
                                                            return this.state.errorPromotion !== null ? <p style={{ color: "red" }}>{this.state.errorPromotion}</p> : ""
                                                        }
                                                    })} %
                                                </p>
                                            }
                                        </td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => reduction(produits.id)}> - </button>
                                            <span>{produits.quantity}</span> &nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-primary" onClick={() => increase(produits.id)}> + </button> &nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-danger" onClick={() => removeProduct(produits.id)}> X </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            <h3>Total: {Math.round(total * 100) / 100} €</h3>
                            <h3>Carbon footprint : {Math.round(total * (0.584))} eqCO2 / €</h3>
                        </div> <br></br>
                        {this.state.error !== null ? <p style={{ color: "red" }}>{this.state.error}</p> : ""}
                        {this.state.loading == true ? <CircularProgress />
                            : null}
                        <button className="btn btn-primary" onClick={/*() => payment(cart, total)*/ this.handleShow}>
                            Payment
                        </button>
                        <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title> Payment </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <p style={{ color: "red" }}> <strong> You will receive your order in less than an hour when you have paid </strong> </p>
                                    <form>
                                        <div className="row">
                                            <div className="col-sm form-group">
                                                <label htmlFor="delivery">Delivery address :</label>
                                                <input type="text" className="form-control" placeholder="11 rue du test"></input>
                                            </div>
                                            <div className="col-sm form-group">
                                                <label htmlFor="Phone">Phone :</label>
                                                <input type="text" className="form-control" placeholder="07 58 71 93 46"></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm form-group">
                                                <label htmlFor="Cart">Cart number :</label>
                                                <input type="text" className="form-control" placeholder="4111 1111 1111 1111"></input>
                                            </div>
                                            <div className="col-sm form-group">
                                                <label htmlFor="possessor">Possessor of the card :</label>
                                                <input type="text" className="form-control" placeholder="Jane Doe"></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm form-group">
                                                <label htmlFor="Expiration">Expiration :</label>
                                                <input type="text" className="form-control" placeholder="10/17"></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm form-group">
                                                <label htmlFor="Cryptogramme">Cryptogramme :</label>
                                                <input type="text" className="form-control" placeholder="303"></input>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={() => payment(cart, total)}>
                                    Pay
                                                </Button>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </div >
                </div>
            </div>
        )
    }
}

export default ShoppingCart
