import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import Modal from 'react-modal'
import { Redirect } from 'react-router-dom'

Modal.setAppElement('#root')

function Products() {

    useEffect(() => {
        authenticated()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [auth, setAuth] = useState("")
    const [error, setError] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const data = [
        {
            id: 1,
            produit: "lait",
            expiration: "27/04/2021",
            stock: "200",
            livraison: "22/03/2021"
        },
        {
            id: 2,
            produit: "lait2",
            expiration: "27/04/2021",
            stock: "100",
            livraison: "23/03/2021"
        },
        {
            id: 3,
            produit: "lait3",
            expiration: "27/04/2021",
            stock: "200",
            livraison: "22/03/2021"
        },
        {
            id: 4,
            produit: "lait4",
            expiration: "30/05/2021",
            stock: "60",
            livraison: "01/04/2021"
        },
    ]

    // Ludo : juste en dessous se trouve la ligne générant un warning console car "constitution" n'est pas utilisé
    /*const constitution = [
        {
            id: 1,
            produit: "lait",
            ingredient1: "ingrédient 1",
            ingredient2: "ingrédient 2",
            ingredient3: "ingrédient 3",
            ingredient4: "ingrédient 4",
            ingredient5: "ingrédient 5"
        },
        {
            id: 2,
            produit: "lait2",
            ingredient1: "ingrédient 1",
            ingredient2: "ingrédient 2",
            ingredient3: "ingrédient 3",
            ingredient4: "ingrédient 4",
            ingredient5: "ingrédient 5"
        },
        {
            id: 3,
            produit: "lait3",
            ingredient1: "ingrédient 1",
            ingredient2: "ingrédient 2",
            ingredient3: "ingrédient 3",
            ingredient4: "ingrédient 4",
            ingredient5: "ingrédient 5"
        },
        {
            id: 4,
            produit: "lait4",
            ingredient1: "ingrédient 1",
            ingredient2: "ingrédient 2",
            ingredient3: "ingrédient 3",
            ingredient4: "ingrédient 4",
            ingredient5: "ingrédient 5"
        },
    ]*/

    const authenticated = () => {
        if (localStorage.getItem('user')) {
            setAuth(JSON.parse(localStorage.getItem('user')))
        } else {
            setError(true)
        }
    }

    if (error === true) {
        return <Redirect to="/login" />
    } else {
        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <div className="mx-5 my-5">
                    <h1>Mes produits </h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nom</th>
                                <th scope="col">Date d'expiration</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Prochaines livraisons</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(data || []).map(produits => (
                                <tr>
                                    <td>
                                        {produits.produit}
                                    </td>
                                    <td> {produits.expiration} </td>
                                    <td> {produits.stock} </td>
                                    <td> {produits.livraison} </td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => setModalIsOpen(true)
                                        }>
                                            Details
                                    </button>
                                        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
                                            style={{
                                                overlay: {
                                                    backgroundColor: 'grey'
                                                }
                                            }}
                                        >
                                            <h2>Fiche de composition </h2>

                                            {produits.produit}

                                            <button onClick={() => setModalIsOpen(false)}>
                                                Close
                                        </button>
                                        </Modal>
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

export default Products
