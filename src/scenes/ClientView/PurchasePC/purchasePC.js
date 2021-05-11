import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../../NavBar/NavBar'
import Pate from '../../../assets/img/p.jpg'
import Lait from '../../../assets/img/lait.png'
import Tomate from '../../../assets/img/tomate.jpg'
import Pesto from '../../../assets/img/pesto.jpg'
import Bonbon from '../../../assets/img/bonbon.jpg'
import Riz from '../../../assets/img/riz.jpg'
import "./purchasePC.css"
import { DataContext } from '../../../stores/Context'
import promotion from '../../../stores/promotion'
import { getProducts } from '../../../services/Api/Product/get'

function PurchasePC() {

    useEffect(() => {
        getProducts().then(({ data, success }) => {
            console.log(data)
        })
    }, [])


    const context = useContext(DataContext)

    const products = [
        {
            id: 1,
            name: "pâte",
            id_product: 123456789012,
            size: "0",
            price: "1",
            quantity: "1",
            stockD: "15",
            department_id: "1",
            stockI: "100",
            promotion: 1,
            next_Delivery: "2021-04-17",
            expiration_Date: "2021-04-15",
            Ingredients: "eau: 30%,Protéine: 10%, Gluicide: 50%, Amidon: 10%",
            image: Pate
        },
        {
            id: 2,
            name: "lait",
            id_product: 123456789012,
            price: "0.50",
            quantity: "1",
            size: "0",
            stockD: "10",
            department_id: "1",
            stockI: "50",
            next_Delivery: "2021-04-17",
            expiration_Date: "2021-07-20",
            Ingredients: "lait: 100%",
            image: Lait
        },
        {
            id: 3,
            size: "3",
            id_product: 123456789012,
            price: "1.30",
            quantity: "1",
            promotion: 3,
            name: "tomate 1kg",
            department_id: "1",
            stockD: "14",
            stockI: "30",
            next_Delivery: "2021-04-17",
            expiration_Date: "2021-07-20",
            Ingredients: "Tomate: 100%",
            image: Tomate
        },
        {
            id: 4,
            name: "Pesto",
            id_product: 123456789012,
            size: "0",
            price: "2",
            quantity: "1",
            promotion: 2,
            department_id: "1",
            stockD: "6",
            stockI: "20",
            next_Delivery: "2021-04-17",
            expiration_Date: "2021-07-20",
            Ingredients: "Basilic Frais: 50%, Pignons de pin: 15%, Parmesan: 25%, Huile d'olive: 7%, Ail: 3%",
            image: Pesto
        },
        {
            id: 5,
            name: "Bonbons",
            id_product: 123456789012,
            size: "0",
            price: "3",
            quantity: "1",
            department_id: "1",
            promotion: 2,
            stockD: "8",
            stockI: "15",
            next_Delivery: "2021-04-17",
            expiration_Date: "2021-07-20",
            Ingredients: "gélatine de porc: 75%, sirop de fraise: 25% ",
            image: Bonbon
        },
        {
            id: 6,
            name: "Riz",
            price: "1",
            id_product: 123456789012,
            quantity: "1",
            department_id: "1",
            promotion: 1,
            size: "0",
            stockD: "7",
            stockI: "24",
            next_Delivery: "2021-04-17",
            expiration_Date: "2021-07-20",
            Ingredients: "eau: 70%, Protéine: 3%, Gluicide: 27% ",
            image: Riz
        },
    ]

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
            <div id="product">
                {
                    products.map(item => {
                        const { addCart } = context;
                        return <div className="card" key={item.id}>
                            <img src={item.image} alt="" />
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
                                <p>Expiration date: {item.expiration_Date}</p>
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
            </div>
        </div>
    )
}

export default PurchasePC
