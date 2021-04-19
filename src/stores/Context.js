import React, { Component } from 'react'

export const DataContext = React.createContext();

export class DataProvider extends Component {
    state = {
        cart: [
            {
                id: 1,
                id_product: 555444332221,
                name: "pâtes1",
                size: "0",
                price: "1.00",
                image: "../assets/img/barilla-rigatoni.jpg",
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
                id_product: 123456789012,
                name: "pâtes2",
                price: "1.00",
                size: "0",
                image: "../assets/img/barilla-rigatoni.jpg",
                ingredient1: "ingrédient 1",
                ingredient2: "ingrédient 2",
                ingredient3: "ingrédient 3",
                ingredient4: "ingrédient 4",
                livraison: "2021/05/19",
                expiration: "2021/07/24"
            }
        ],
        newCart: [],
        total: 0
    }

    addCart = (produits) => {
        const { newCart } = this.state;
        const check = newCart.every(item => {
            return item.id_product === produits.id_product
        })
        if (check) {
            this.setState({ newCart: [...newCart, ...produits] })
        } else {
            alert("The product has been added to cart.")
        }
    }

    render() {
        const { cart } = this.state;
        const { addCart } = this;
        return (
            <DataContext.Provider value={{ cart, addCart }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }

}