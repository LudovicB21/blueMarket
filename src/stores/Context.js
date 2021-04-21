import React, { Component } from 'react'

export const DataContext = React.createContext();

export class DataProvider extends Component {
    state = {
        cart: [],
        total: 0
    }

    addCart = (produits) => {
        const { cart } = this.state;
        const check = cart.every(item => {
            return item.id !== produits.id
        })
        if (check) {
            this.setState({ cart: [...cart, produits] });
        } else {
            alert("The product has been added to cart.")
        }
    }

    getTotal = () => {
        console.log("total")
        const { cart } = this.state;
        const res = cart.reduce((prev, item) => {
            return prev + (item.price * item.quantity);
        }, 0)
        this.setState({ total: res })
    };

    removeProduct = id => {
        if (window.confirm("Do you want to delete this product?")) {
            const { cart } = this.state;
            cart.forEach((item, index) => {
                if (item.id === id) {
                    cart.splice(index, 1)
                }
            })
            this.setState({ cart: cart });
            this.getTotal();
        }

    };

    reduction = id => {
        /* eslint eqeqeq: 0 */
        const { cart } = this.state;
        cart.forEach(item => {
            if (item.id === id) {
                item.quantity == 1 ? item.quantity = 1 : item.quantity -= 1;
            }
        })
        this.setState({ cart: cart });
        this.getTotal();
    };

    increase = id => {
        const { cart } = this.state;
        cart.forEach(item => {
            if (item.id === id) {
                item.quantity++;
            }
        })
        this.setState({ cart: cart });
        this.getTotal();
    };

    componentDidUpdate() {
        localStorage.setItem('dataCart', JSON.stringify(this.state.cart))
        localStorage.setItem('dataTotal', JSON.stringify(this.state.total))
    }

    componentDidMount() {
        const dataCart = JSON.parse(localStorage.getItem('dataCart'));
        if (dataCart !== null) {
            this.setState({ cart: dataCart });
        }
        const dataTotal = JSON.parse(localStorage.getItem('dataTotal'));
        if (dataTotal !== null) {
            this.setState({ total: dataTotal });
        }
    }

    render() {
        const { cart, total } = this.state;
        const { addCart, increase, reduction, removeProduct, getTotal } = this;
        return (
            <DataContext.Provider value={{ cart, addCart, total, getTotal, reduction, increase, removeProduct }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }

}