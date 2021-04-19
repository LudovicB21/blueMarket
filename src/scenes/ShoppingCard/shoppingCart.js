import React, { Component } from 'react'
import NavBar from '../NavBar/NavBar'
import { DataContext } from '../../stores/Context'

export class ShoppingCart extends Component {
    static contextType = DataContext;

    render() {
        const { cart } = this.context
        console.log(cart)
        return (
            <div>
                <div>
                    <NavBar />
                </div>
            </div>
        )
    }
}

export default ShoppingCart
