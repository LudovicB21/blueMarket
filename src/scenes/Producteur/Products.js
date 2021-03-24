import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'

function Products() {

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
                            <th scope="col">Prochaine livraison</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(data || []).map(produits => (
                            <tr>
                                <td>
                                    <Link to={{
                                        pathname: '/detailsProduct',
                                        aboutProps: {
                                            data: produits
                                        }
                                    }}>
                                        {produits.produit}
                                    </Link>

                                </td>
                                <td> {produits.expiration} </td>
                                <td> {produits.stock} </td>
                                <td> {produits.livraison} </td>
                                <td> Actions</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >
        </div>
    )
}

export default Products
