import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import { CircleProgress } from 'react-gradient-progress'
import { Redirect } from 'react-router-dom'

function Fridge() {

    const items = [
        {
            id: 50,
            nom: "item1",
            size: 2,
            stock: 2,
            expiration: "20/04/2021"
        },
        {
            id: 24,
            nom: "item2",
            size: 30,
            stock: 1,
            expiration: "14/04/2021"
        },
        {
            id: 2,
            nom: "item3",
            size: 22,
            stock: 5,
            expiration: "15/04/2021"
        }
    ]

    const [progression, setProgression] = useState(0)
    const [auth, setAuth] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('user'))) {
            setAuth(JSON.parse(localStorage.getItem('user')))
            if (JSON.parse(localStorage.getItem('user')).frigo) {
                calcul()
            }
        } else {
            setError(true)
        }
        // eslint-disable-next-line
    }, [])

    //const [panier, setPanier] = useState(0)
    console.log(auth)

    const calcul = () => {
        let total = 0
        let frigo = JSON.parse(localStorage.getItem('user')).frigo
        items.forEach(item => {
            let calc1 = item.size * 100
            let calcul2 = calc1 / frigo
            let calcStock = calcul2 * item.stock
            total += Math.round(calcStock)
        });
        setProgression(total)
    }

    if (error === true) {
        return <Redirect to="/login" />
    } else {
        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <div>

                </div>
                <div className="mx-5 my-5">
                    <h1>Utilisation de votre frigo </h1>
                    <CircleProgress percentage={progression} strokeWidth={5} />

                </div>
                <div className="mx-5 my-5">
                    <button className="btn btn-primary">
                        Voir l'historique d'achat
                    </button>
                </div>
                <div className="mx-5 my-5">
                    <h1>Dans mon frigo :  </h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nom</th>
                                <th scope="col">Date d'expiration</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(items || []).map(produits => (
                                <tr>
                                    <td>
                                        {produits.nom}
                                    </td>
                                    <td> {produits.expiration} </td>
                                    <td> {produits.stock} </td>
                                    <td>
                                        <button className="btn btn-primary">
                                            Details
                                    </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div >
            </div>
        )
    }
}

export default Fridge
