import React, { useState } from 'react'

function Details(props) {
    const dataProduct = props.location.aboutProps?.data

    const [produits, setProduit] = useState(dataProduct)

    return (
        <div className="mx-5 my-5">
            <h1> {produits.produit} </h1>
            <div>
                <img src="https://www.sodiaalfoodexperts.com/media/lait_demi_ecreme_viva.png" alt={produits.produit} style={{ width: "200px", height: "200px" }} />
            </div>

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
                    <tr>
                        <td> {produits.produit}</td>
                        <td> {produits.expiration} </td>
                        <td> {produits.stock} </td>
                        <td> {produits.livraison} </td>
                        <td> Actions</td>
                    </tr>
                </tbody>
            </table>
        </div >
    )
}

export default Details
