import React, { useState, useEffect } from 'react'
import NavBar from '../../NavBar/NavBar'
import "../../../assets/modal.css"
import { Modal, Button } from 'react-bootstrap'
import moment from 'moment'
import * as CgIcons from "react-icons/cg"
import { getProductsByDepartments } from '../../../services/Api/Departments/get'
import { deleteProduct } from '../../../services/Api/DetailsDepartments/delete'
import CircularProgress from '@material-ui/core/CircularProgress';
import promotion from '../../../stores/promotion'
import { BsBoxArrowInUp, BsTrash } from "react-icons/bs";
import { BiLinkAlt } from "react-icons/bi";
import { AiOutlineZoomIn } from "react-icons/ai";

function DetailsSpokes(props) {


    const [name, setName] = useState("")
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)
    const [departmentProduct, setDepartmentProduct] = useState([])
    const [detailsProduct, setDetailsProduct] = useState([])
    const [errors, setErrors] = useState(null)
    const [sucess, setSucess] = useState(false)

    useEffect(() => {
        if (props.location.aboutProps) {
            setName(props.location.aboutProps.name)
        }
        if (props.location.aboutProps?.id === undefined || props.location.aboutProps?.id === null) {
            getProductsByDepartments(localStorage.getItem("Depart_id")).then(({ data, success, errors }) => {
                if (success === true) {
                    setDepartmentProduct(data)
                    setLoading(true)
                } else {
                    setLoading(false)
                }
            })
        } else {
            getProductsByDepartments(props.location.aboutProps.id).then(({ data, success, errors }) => {
                if (success === true) {
                    setDepartmentProduct(data)
                    setLoading(true)
                } else {
                    setLoading(false)
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sucess, errors])

    const handleCloseDetails = () => setShow(false);
    const handleShowDetails = (produit) => {
        setDetailsProduct(produit)
        setShow(true)
    };

    const expiration = (expiration) => {
        const today = (moment().format('YYYY-MM-DD'))
        const newExpirationDate = moment(expiration, 'DD-MM-YYYY').format('YYYY-MM-DD')
        if (moment(newExpirationDate).isSameOrBefore(today)) {
            return <div className="text-danger"> <CgIcons.CgDanger /> {expiration} </div>
        } else {
            return expiration
        }
    }

    const deleteButton = (expiration) => {
        const today = (moment().format('YYYY-MM-DD'))
        const newExpirationDate = moment(expiration, 'DD-MM-YYYY').format('YYYY-MM-DD')
        if (moment(newExpirationDate).isSameOrBefore(today)) {
            return true
        } else {
            return false
        }
    }

    const deleteProductAndReset = async (product_id) => {
        const { success, errors } = await deleteProduct(product_id)
        if (success === true) {
            setSucess(true)
        } else {
            setErrors(errors)
        }
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="mx-5 my-5">
                <h1> {name || localStorage.getItem("Depart_name")} </h1>
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
                                            {deleteButton(moment(produits.expiration_Date).format('DD-MM-YYYY')) === true ? <button className="btn btn-danger" data-toggle="tooltip" onClick={e => deleteProductAndReset(produits.id)} title="Delete" > <BsTrash /></button> : null}&nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-primary" data-toggle="tooltip" title="Details" onClick={e => handleShowDetails(produits)}> <AiOutlineZoomIn /></button> &nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-secondary" data-toggle="tooltip" title="Replenishment"> <BsBoxArrowInUp /> </button> &nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-success" data-toggle="tooltip" title="Add Promotion"> <BiLinkAlt /></button>
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
