import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import "../../assets/modal.css"

function DetailsSpokes(props) {


    useEffect(() => {
        if (props.location.aboutProps) {
            setName(props.location.aboutProps.name)
        }
    })

    const [name, setName] = useState("")
    const [modalState, setModalState] = useState(false)

    const stockes = [
        {
            id: 1,
            nom: "pâtes1",
            stockR: 15,
            stockI: 100,
            livraison: "2021/04/17",
            expiration: "2021/07/20"
        },
        {
            id: 2,
            nom: "pâtes2",
            stockR: 10,
            stockI: 50,
            livraison: "2021/04/17",
            expiration: "2021/07/20"

        },
        {
            id: 3,
            nom: "pâtes3",
            stockR: 14,
            stockI: 30,
            livraison: "2021/04/17",
            expiration: "2021/07/20"

        },
        {
            id: 4,
            nom: "pâtes4",
            stockR: 6,
            stockI: 20,
            livraison: "2021/04/17",
            expiration: "2021/07/20"

        },
        {
            id: 5,
            nom: "pâtes5",
            stockR: 8,
            stockI: 15,
            livraison: "2021/04/17",
            expiration: "2021/07/20"

        },
        {
            id: 6,
            nom: "pâtes6",
            stockR: 7,
            stockI: 24,
            livraison: "2021/04/17",
            expiration: "2021/07/20"

        },
    ]

    const manageState = () => {
        setModalState(!modalState)
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="mx-5 my-5">
                <h1> {name} </h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nom du rayon</th>
                            <th scope="col">Stock Rayon</th>
                            <th scope="col">Stock Inventaire</th>
                            <th scope="col">Livraison</th>
                            <th scope="col">Expiration</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(stockes || []).map(produits => (
                            <tr>
                                <td>
                                    {produits.nom}
                                </td>
                                <td> {produits.stockR} </td>
                                <td>
                                    {produits.stockI}
                                </td>
                                <td>
                                    {produits.livraison}
                                </td>
                                <td>
                                    {produits.expiration}
                                </td>
                                <td>
                                    <Link style={{ textDecoration: "none" }} to={{
                                        pathname: "/detailsProduct",
                                        aboutProps: {
                                            id: produits.id
                                        }
                                    }}>
                                        <button onClick={() => manageState()} className="btn btn-primary">
                                            Détails
                                    </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </div>
    )
}

export default DetailsSpokes
