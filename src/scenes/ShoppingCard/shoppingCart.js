import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import { DataContext } from '../../stores/Context'

export class ShoppingCart extends Component {
    static contextType = DataContext;

    render() {
        const { cart, increase, removeProduct, total, reduction } = this.context
        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <div>
                    <div className="mx-5 my-5">
                        <h1> Mon panier </h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(cart || []).map(produits => (
                                    <tr key={produits.id}>
                                        <td>
                                            {produits.name}
                                        </td>
                                        <td> {produits.price * produits.quantity} € </td>
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
                            <h3>Total: {total} €</h3>
                        </div>
                    </div >
                </div>
            </div>
        )
    }
}

export default ShoppingCart
