import React, { Component } from 'react'
import NavBar from '../../NavBar/NavBar'
import { DataContext } from '../../../stores/Context'
import promotion from '../../../stores/promotion'
import moment from 'moment'
import { postShoppingCart } from '../../../services/Api/ShoopingCart/post'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from "react-router-dom"

export class ShoppingCart extends Component {
    static contextType = DataContext;
    state = {
        error: null,
        loading: null,
        success: null,
        successSend: null
    }

    componentDidMount() {
        this.context.getTotal()
        if (localStorage.getItem("user") === null || localStorage.getItem("user") === undefined) {
            this.setState({ success: false })
        } else {
            this.setState({ success: true })
        }
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
                                            {promotion.map(promotionInfo => {
                                                if (promotionInfo.id === produits.promotion) {
                                                    return promotionInfo.label
                                                }
                                            })}
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
                        <button className="btn btn-primary" onClick={() => payment(cart, total)}>
                            Payment
                        </button>
                    </div >
                </div>
            </div>
        )
    }
}

export default ShoppingCart
