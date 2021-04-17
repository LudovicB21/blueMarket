import React, { useState, useEffect } from 'react'
import NavBar from '../scenes/NavBar/NavBar'
import Barilla from '../assets/img/p.jpg'
import { Grid, TextField } from "@material-ui/core"
import '../components/detailsProduct.css'
function DetailsProduct(props) {

    useEffect(() => {
        if (props.location.aboutProps) {
            setIdProduct(props.location.aboutProps.id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const product = [
        {
            id: 1,
            name: "pâtes1",
            size: "0",
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
                {(product || []).map(details => (
                    <Grid container style={{ minHeight: '100%' }}>
                        <Grid container item xs={12} sm={12} alignItems="center" direction="column" justify="space-between" style={{ paddingTop: 100 }}>
                            <div>
                                <div style={{ display: "flex", flexDirection: "column", maxWidth: 400, minWidth: 300 }}>
                                    <Grid container justify="center">
                                        <img src={Barilla} width={200} alt="logo" />
                                    </Grid>
                                    <TextField label={`Name: ${details.name}`} margin="normal" disabled={true} /*onChange={e => setDetails({ ...details, username: e.target.value })}*/ />
                                    <TextField label={`Size: ${details.size}`} disabled={true} type="email" margin="normal" /*onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email}*/ />
                                    <TextField label={`Livraison: ${details.livraison}`} disabled={true} type="email" margin="normal" /*onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email}*/ />
                                    <TextField label={`Expiration: ${details.expiration}`} disabled={true} margin="normal" /*onChange={e => setDetails({ ...details, firstname: e.target.value })} value={details.firstname}*/ />
                                    <div style={{ height: 20 }} />
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">{details.ingredient1}</th>
                                                <th scope="col">{details.ingredient2}</th>
                                                <th scope="col">{details.ingredient3}</th>
                                                <th scope="col">{details.ingredient4}</th>
                                                <th scope="col">{details.ingredient5}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {details.ingredient1}
                                                </td>
                                                <td>
                                                    {details.ingredient2}
                                                </td>
                                                <td>
                                                    {details.ingredient3}
                                                </td>
                                                <td>
                                                    {details.ingredient4}
                                                </td>
                                                <td>
                                                    {details.ingredient5}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                ))}
            </div>
        </div>
    )
}

export default DetailsProduct
