import React, { useState, useEffect } from 'react'
import NavBar from '../scenes/NavBar/NavBar'
import Barilla from '../assets/img/p.jpg'

function DetailsProduct(props) {

    useEffect(() => {
        if (props.location.aboutProps) {
            setIdProduct(props.location.aboutProps.id)
        }
    })

    const product = [
        {
            id: 1,
            title: "pâtes1",
            image: "../assets/img/barilla-rigatoni.jpg",
            ingredient1: "ingrédient 1",
            ingredient2: "ingrédient 2",
            ingredient3: "ingrédient 3",
            ingredient4: "ingrédient 4",
            ingredient5: "ingrédient 5",
            livraison: "2021/04/17",
            expiration: "2021/07/20"
        }
    ]

    const stockes = [
        {
            id: 1,
            title: "pâtes1",
            image: "../assets/img/barilla-rigatoni.jpg",
            ingredient1: "ingrédient 1",
            ingredient2: "ingrédient 2",
            ingredient3: "ingrédient 3",
            ingredient4: "ingrédient 4",
            ingredient5: "ingrédient 5",
            livraison: "2021/04/17",
            expiration: "2021/07/20"
        }
    ]

    const [idProduct, setIdProduct] = useState("")
    console.log(idProduct)

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div>
                {(stockes || []).map(item => (
                    <div>
                        <h1>{item.title}</h1>
                        <img /*src={require('../assets/img/p.jpg')}*/ src={Barilla} alt="test" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DetailsProduct
