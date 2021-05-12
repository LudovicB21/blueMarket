import React, { useState, useEffect } from 'react'
import NavBar from '../../NavBar/NavBar'
import "../../../assets/modal.css"
import { Modal, Button } from 'react-bootstrap'
import moment from 'moment'
import * as CgIcons from "react-icons/cg"
import { getProductsByDepartments } from '../../../services/Api/Departments/get'
import CircularProgress from '@material-ui/core/CircularProgress';
import promotion from '../../../stores/promotion'

function DetailsSpokes(props) {


    const [name, setName] = useState("")
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)
    const [departmentProduct, setDepartmentProduct] = useState([])
    const [detailsProduct, setDetailsProduct] = useState([])

    useEffect(() => {
        if (props.location.aboutProps) {
            setName(props.location.aboutProps.name)
        }
        getProductsByDepartments(props.location.aboutProps.id).then(({ data, success, errors }) => {
            console.log(data)
            if (success === true) {
                setDepartmentProduct(data)
                setLoading(true)
            } else {
                setLoading(false)
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCloseDetails = () => setShow(false);
    const handleShowDetails = (produit) => {
        setDetailsProduct(produit)
        setShow(true)
    };

    const expiration = (expiration) => {
        const today = (moment().format('DD-MM-YYYY'))
        if (moment(expiration).isSameOrBefore(today)) {
            return <div className="text-danger"> <CgIcons.CgDanger /> {expiration} </div>
        } else {
            return expiration
        }
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="mx-5 my-5">
                <h1> {name} </h1>
                {
                    loading === false ? <CircularProgress />
                        :
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Stock Department</th>
                                    <th scope="col">Stock Inventory</th>
                                    <th scope="col">Next delivery</th>
                                    <th scope="col">Expiration date</th>
                                    <th scope="col">Promotion </th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(departmentProduct || []).map(produits => (
                                    <tr key={produits.id}>
                                        <td>
                                            {produits.name}
                                        </td>
                                        <td> {produits.stockD} </td>
                                        <td>
                                            {produits.stockI}
                                        </td>
                                        <td>
                                            {moment(produits.next_Delivery).format('DD-MM-YYYY')}
                                        </td>
                                        <td>
                                            {expiration(moment(produits.expiration_Date).format('DD-MM-YYYY'))}
                                        </td>
                                        <td>
                                            {(promotion || []).map(promo => {
                                                if (promo.id === produits.promotion) {
                                                    return promo.label
                                                } else {
                                                    return null
                                                }
                                            })}
                                        </td>
                                        <td>
                                            <button className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onClick={e => handleShowDetails(produits)}> Details</button> &nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-secondary" data-toggle="modal" data-target="#exampleModalCenter"> Order</button> &nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-success" data-toggle="modal" data-target="#exampleModalCenter"> Add Promotion</button>
                                            <Modal size="lg" show={show} onHide={handleCloseDetails}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title> Product's details </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <img src={detailsProduct.image} width="200px" style={{ marginLeft: "auto", marginRight: "auto", display: "flex", objectFit: "cover" }} height="250px" alt={detailsProduct.name} />
                                                    <div className="row">
                                                        <div className="col-sm form-group">
                                                            <label htmlFor="email">Name :</label>
                                                            <p className="form-control"> {detailsProduct.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm form-group">
                                                            <label htmlFor="address">Price :</label>
                                                            <p className="form-control"> {detailsProduct.price} €</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm form-group">
                                                            <label htmlFor="type">Size :</label>
                                                            <p className="form-control"> {detailsProduct.size} L</p>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm form-group">
                                                            <label htmlFor="type">Ingredients :</label>
                                                            <p className="form-control"> {detailsProduct.Ingredients}</p>
                                                        </div>
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleCloseDetails}>
                                                        Close
                                            </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
            </div >
        </div>
    )
}

export default DetailsSpokes
