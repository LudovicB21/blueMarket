import React, { useContext } from 'react'
import NavBar from '../NavBar/NavBar'
import Pate from '../../assets/img/p.jpg'
import Lait from '../../assets/img/lait.png'
import Tomate from '../../assets/img/tomate.jpg'
import Pesto from '../../assets/img/pesto.jpg'
import Bonbon from '../../assets/img/bonbon.jpg'
import Riz from '../../assets/img/riz.jpg'
import "./purchasePC.css"
import { DataContext } from '../../stores/Context'



function PurchasePC() {
    const context = useContext(DataContext)

    const products = [
        {
            id: 1,
            name: "pâte",
            size: "0",
            price: "1€",
            stockD: "15",
            stockI: "100",
            next_Delivery: "2021-04-17",
            expiration_Date: "2021-04-15",
            Ingredients: "{eau: 30%,Protéine: 10%, Gluicide: 50%, Amidon: 10%}",
            image: Pate
        },
        {
            id: 2,
            name: "lait",
            price: "0,50€",
            size: "0",
            stockD: "10",
            stockI: "50",
            next_Delivery: "2021-04-17",
            expiration_Date: "2021-07-20",
            Ingredients: "lait: 100%",
            image: Lait
        },
        {
            id: 3,
            size: "3",
            price: "1,30€",
            name: "tomate 1kg",
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
            size: "0",
            price: "2€",
            stockD: "6",
            stockI: "20",
            next_Delivery: "2021-04-17",
            expiration_Date: "2021-07-20",
            Ingredients: "{Basilic Frais: 50%, Pignons de pin: 15%, Parmesan: 25%, Huile d'olive: 7%, Ail: 3%}",
            image: Pesto
        },
        {
            id: 5,
            name: "Bonbons",
            size: "0",
            price: "3€",
            stockD: "8",
            stockI: "15",
            next_Delivery: "2021-04-17",
            expiration_Date: "2021-07-20",
            Ingredients: "{gélatine de porc: 75%, sirop de fraise: 25%} ",
            image: Bonbon
        },
        {
            id: 6,
            name: "Riz",
            price: "1€",
            size: "0",
            stockD: "7",
            stockI: "24",
            next_Delivery: "2021-04-17",
            expiration_Date: "2021-07-20",
            Ingredients: "{eau: 70%,Protéine: 3%, Gluicide: 27%}",
            image: Riz
        },

    ]

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
                                <span>Price: {item.price}</span>
                                <p>Expiration date: {item.expiration_Date}</p>
                                <button onClick={() => addCart(item.id)}>Add to cart</button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default PurchasePC
