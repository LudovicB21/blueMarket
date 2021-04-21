import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import { Redirect } from 'react-router-dom'

function Spokes() {

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setTimeout(() => {
                setNbs(!nbs)
            }, 5000)
        } else {
            setError(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [error, setError] = useState(false)
    const [nbs, setNbs] = useState(true)

    const stockes = [
        {
            id: 1,
            nom: "pâtes",
            position: "1",

        },
        {
            id: 2,
            nom: "Riz",
            position: "2",

        },
        {
            id: 3,
            nom: "Sauces",
            position: "3",

        },
        {
            id: 4,
            nom: "Légumes en conserve",
            position: "4",

        },
        {
            id: 5,
            nom: "Fruit",
            position: "5",

        },
        {
            id: 6,
            nom: "Confiserie",
            position: "6",

        }
    ]


    if (error === true) {
        return <Redirect to="/login" />
    } else {
        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <div className="mx-5 my-5">
                    <h1> My departments </h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Position</th>
                                <th scope="col">Nop rayon</th>
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
                                    <td>
                                        {Math.floor(Math.random() * 30)}
                                    </td>
                                    <td>
                                        <Link style={{ textDecoration: "none" }} to={{
                                            pathname: "/detailsSpokes",
                                            aboutProps: {
                                                name: produits.nom,
                                                id: produits.id
                                            }
                                        }}>
                                            <button className="btn btn-primary">
                                                Details
                                    </button>&nbsp;&nbsp;&nbsp;
                                    </Link>
                                        <button className="btn btn-primary">
                                            Position
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

export default Spokes
