import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../../NavBar/NavBar'
import "./purchasePC.css"
import { DataContext } from '../../../stores/Context'
import promotion from '../../../stores/promotion'
import { getProducts } from '../../../services/Api/Product/get'
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment'

function PurchasePC() {

    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts().then(({ data, success, errors }) => {
            if (success === true) {
                setProducts(data)
                setLoading(true)
            } else {
                setErrors(errors)
                setLoading(false)
            }
        })
    }, [errors, loading])

    const context = useContext(DataContext)

    const addPromotionToCard = (itemPromotion) => {
        const { addCart } = context;
        const newItem = { ...itemPromotion }
        const newName = " promotion"
        newItem.name = itemPromotion.name.concat(newName)
        if (itemPromotion.promotion === 1) {
            newItem.price = itemPromotion.price * 2
            newItem.id = itemPromotion.id + 0.1
        } else if (itemPromotion.promotion === 2) {
            newItem.price = itemPromotion.price * 3
            newItem.id = itemPromotion.id + 0.1
        } else if (itemPromotion.promotion === 3) {
            newItem.id = itemPromotion.id + 0.1
        }

        addCart(newItem)
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>
            {
                loading === false ? <CircularProgress />
                    :
                    <div id="product">
                        {
                            products.map(item => {
                                const { addCart } = context;
                                return <div className="card" key={item.id}>
                                    <img src={item.image} alt={item.name} />
                                    <div className="content">
                                        <h3>
                                            {item.name}
                                        </h3>
                                        {promotion.map(items => {
                                            if (items.id === item.promotion) {
                                                return <p style={{ color: "red" }}> Promotion : {items.label}</p>
                                            }
                                        })}
                                        <p>Price: {item.price}€</p>
                                        <p>Expiration date: {moment(item.expiration_Date).format('DD-MM-YYYY')}</p>
                                        {promotion.map(items => {
                                            if (items.id === item.promotion) {
                                                return <button onClick={() => addPromotionToCard(item)}> Use promotion </button>
                                            }
                                        })
                                        }
                                        <button onClick={() => addCart(item)}>Add to cart</button>
                                    </div>
                                </div>
                            })
                        }
                    </div>}
        </div>
    )
}

export default PurchasePC
