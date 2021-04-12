import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

function Spokes() {

    const [modalIsOpen, setModalIsOpen] = useState(false)

    const stockes = [
        {
            nom: "pâtes",
            position: "1",

        },
        {
            nom: "Riz",
            position: "2",

        },
        {
            nom: "Sauces",
            position: "3",

        },
        {
            nom: "Légumes en conserve",
            position: "4",

        },
        {
            nom: "Fruit",
            position: "5",

        },
        {
            nom: "Confiserie",
            position: "6",

        }
    ]

    console.log(Math.random())

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="mx-5 my-5">
                <h1>Mes Rayons </h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nom du rayon</th>
                            <th scope="col">Position du rayon</th>
                            <th scope="col">Nbp rayon</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(stockes || []).map(produits => (
                            <tr>
                                <td>
                                    {produits.nom}
                                </td>
                                <td> {produits.position} </td>
                                <td> 58 </td>
                                <td>
                                    <button onClick={() => setModalIsOpen(true)
                                    }>
                                        Details
                                    </button>
                                    {/*<Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}
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
                                    </Modal> */}
                                    <button onClick={() => setModalIsOpen(true)
                                    }>
                                        Ordre
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

export default Spokes
