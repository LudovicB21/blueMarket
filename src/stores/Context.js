import React, { Component } from 'react'
import promotion from './promotion';
import { getPromotion } from "../services/Api/DetailsDepartments/get"

export const DataContext = React.createContext();

export class DataProvider extends Component {
    state = {
        cart: [],
        total: 0,
        promotions: [],
        errorPromotion: null
    }

    addCart = (produits) => {
        const { cart } = this.state;
        const check = cart.every(item => {
            return item.name !== produits.name
        })
        if (check) {
            this.setState({ cart: [...cart, produits] });
            alert("Product add to your cart")
        } else {
            alert("Product already in your cart. Increased quantity.")
        }
    }

    getTotal = () => {
        const { cart } = this.state;
        const res = cart.reduce((prev, item) => {
            let total = prev + (item.price * item.quantity);
            let calcul = promotion.map(promo => {
                if (promo.value === item.promotion) {
                    let x = Number(promo.label)
                    let pourcentage = 1 - `0.${x}`
                    return pourcentage
                }
            })
            console.log(calcul)
            return total
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

    resetCartAndTotal = () => {
        this.setState({ total: 0, cart: [] })
    }

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
        getPromotion().then(({ data, success, errors }) => {
            if (success === true) {
                this.setState({ promotions: data })
            } else {
                this.setState({ errorPromotion: errors })
            }
        })
    }

    render() {
        const { cart, total } = this.state;
        const { addCart, increase, reduction, removeProduct, getTotal, resetCartAndTotal } = this;
        return (
            <DataContext.Provider value={{ cart, addCart, total, getTotal, reduction, increase, removeProduct, resetCartAndTotal }}>
                {this.props.children}
            </DataContext.Provider>
        )
    }

}