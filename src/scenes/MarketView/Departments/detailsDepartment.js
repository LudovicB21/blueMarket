import React, { useState, useEffect } from 'react'
import NavBar from '../../NavBar/NavBar'
import "../../../assets/modal.css"
import { Modal, Button } from 'react-bootstrap'
import moment from 'moment'
import * as CgIcons from "react-icons/cg"
import { getProductsByDepartments } from '../../../services/Api/Departments/get'
import { deleteProduct } from '../../../services/Api/DetailsDepartments/delete'
import { changeQuantityReplenishmentDepartment, changeQuantityReplenishmentInventory, setPromotions } from '../../../services/Api/DetailsDepartments/post'
import CircularProgress from '@material-ui/core/CircularProgress';
import { BsTrash } from "react-icons/bs";
import { BiLinkAlt } from "react-icons/bi";
import { AiOutlineZoomIn } from "react-icons/ai";
import * as AiIcons from "react-icons/ai"
import * as FaIcons from "react-icons/fa"
import { getPromotion } from "../../../services/Api/DetailsDepartments/get"
import Select from 'react-select'

function DetailsSpokes(props) {


    const [name, setName] = useState("")
    const [show, setShow] = useState(false);
    const [showReplenishment, setShowReplenishment] = useState(false);
    const [showPromotion, setShowPromotion] = useState(false);
    const [showReplenishmentInventory, setShowReplenishmentInventory] = useState(false);
    const [loading, setLoading] = useState(false)
    const [departmentProduct, setDepartmentProduct] = useState([])
    const [detailsProduct, setDetailsProduct] = useState([])
    const [replenishmentQuantity, setReplenishmentQuantity] = useState([])
    const [replenishmentQuantityInventory, setReplenishmentQuantityInventory] = useState([])
    const [error, setErrors] = useState(null)
    const [sucess, setSucess] = useState(false)
    const [promotions, setPromotion] = useState([])
    const [newPromotions, setNewPromotion] = useState([])
    const [loadingPromotion, setLoadingPromotion] = useState(false)
    const [errorPromotion, setErrorsPromotion] = useState(null)
    const [selectedOption, setSelectOption] = useState(null)
    const [productPromotion, setProductPromotion] = useState(null)

    useEffect(() => {
        if (props.location.aboutProps) {
            setName(props.location.aboutProps.name)
        }
        if (props.location.aboutProps?.id === undefined || props.location.aboutProps?.id === null) {
            getProductsByDepartments(localStorage.getItem("Depart_id")).then(({ data, success, errors }) => {
                if (success === true) {
                    setDepartmentProduct(data)
                    setLoading(true)
                    getPromotion().then(({ data, success, errors }) => {
                        if (success === true) {
                            setLoadingPromotion(true)
                            setPromotion(data)
                        } else {
                            setLoadingPromotion(false)
                            setErrorsPromotion(errors)
                        }
                    })
                } else {
                    setLoading(false)
                }
            })
        } else {
            getProductsByDepartments(props.location.aboutProps.id).then(({ data, success, errors }) => {
                if (success === true) {
                    setDepartmentProduct(data)
                    setLoading(true)
                    getPromotion().then(({ data, success, errors }) => {
                        if (success === true) {
                            setLoadingPromotion(true)
                            setPromotion(data)
                        } else {
                            setLoadingPromotion(false)
                            setErrorsPromotion(errors)
                        }
                    })
                } else {
                    setLoading(false)
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sucess, error, replenishmentQuantity, replenishmentQuantityInventory])

    const handleCloseDetails = () => setShow(false);
    const handleShowDetails = (produit) => {
        setErrors(null)
        setDetailsProduct(produit)
        setShow(true)
    };

    const handleClosePromotion = () => setShowPromotion(false);
    const handleShowPromotion = (produits) => {
        setProductPromotion(produits)
        setShowPromotion(true)
    };


    const handleCloseReplenishment = () => setShowReplenishment(false);
    const handleShowReplenishment = (produit) => {
        setErrors(null)
        setDetailsProduct(produit)
        setShowReplenishment(true)
    };

    const handleCloseReplenishmentInventory = () => setShowReplenishmentInventory(false);
    const handleShowReplenishmentInventory = (produit) => {
        setErrors(null)
        setDetailsProduct(produit)
        setShowReplenishmentInventory(true)
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
        setSucess(false)
        const { success, errors } = await deleteProduct(product_id)
        if (success === true) {
            setSucess(true)
        } else {
            setErrors(errors)
        }
    }

    const changeReplenishmentQuantities = async () => {
        setSucess(false)
        const { success, errors } = await changeQuantityReplenishmentDepartment(detailsProduct.id, replenishmentQuantity)
        if (success === true) {
            setSucess(true)
            handleCloseReplenishment()
        } else {
            setErrors(errors)
        }
    }

    const changeReplenishmentQuantitiesInventory = async () => {
        setSucess(false)
        const { success, errors } = await changeQuantityReplenishmentInventory(detailsProduct.id, replenishmentQuantityInventory)
        if (success === true) {
            setSucess(true)
            handleCloseReplenishmentInventory()
        } else {
            setErrors(errors)
        }
    }

    const addNewPromotion = async () => {
        setSucess(false)
        const { success, errors } = await setPromotions(productPromotion, newPromotions)
        if (success === true) {
            setSucess(true)
            handleClosePromotion()
        } else {
            setErrors(errors)
        }
    }

    const handleChange = selectedOption => {
        setSelectOption(selectedOption);
        setNewPromotion({ ...newPromotions, "promotionid": selectedOption.value })
    };

    const stockAlertD = (stockD) => {
        if (stockD <= 5) {
            return <div className="text-danger"> <CgIcons.CgDanger /> {stockD} </div>
        } else {
            return stockD
        }
    }

    const stockAlertP = (stockI) => {
        if (stockI <= 50) {
            return <div className="text-danger"> <CgIcons.CgDanger /> {stockI} </div>
        } else {
            return stockI
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
                                        <td> {stockAlertD(produits.stockD)} </td>
                                        <td>
                                            {stockAlertP(produits.stockI)}
                                        </td>
                                        <td>
                                            {moment(produits.next_Delivery).format('DD-MM-YYYY')}
                                        </td>
                                        <td>
                                            {expiration(moment(produits.expiration_Date).format('DD-MM-YYYY'))}
                                        </td>
                                        <td>
                                            {(promotions || []).map(promo => {
                                                if (promo.value === produits.promotion) {
                                                    return promo.label
                                                } else {
                                                    return errorPromotion !== null ? <p style={{ color: "red" }}>{errorPromotion}</p> : ""
                                                }
                                            })}
                                        </td>
                                        <td>
                                            {deleteButton(moment(produits.expiration_Date).format('DD-MM-YYYY')) === true ? <button className="btn btn-danger" data-toggle="tooltip" onClick={e => deleteProductAndReset(produits.id)} title="Delete" > <BsTrash /></button> : null}&nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-primary" data-toggle="tooltip" title="Details" onClick={e => handleShowDetails(produits)}> <AiOutlineZoomIn /></button> &nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-secondary" data-toggle="tooltip" onClick={e => handleShowReplenishment(produits)} title="Replenishment Department"> <AiIcons.AiOutlineDatabase /> </button> &nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-secondary" data-toggle="tooltip" onClick={e => handleShowReplenishmentInventory(produits)} title="Replenishment Inventory"> <FaIcons.FaWarehouse /> </button> &nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-success" data-toggle="tooltip" onClick={e => handleShowPromotion(produits.id)} title="Add Promotion"> <BiLinkAlt /></button>
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
                                            <Modal size="lg" show={showReplenishment} onHide={handleCloseReplenishment}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title> Send product from inventory to department </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div className="row">
                                                        <div className="col-sm form-group">
                                                            <p> <strong> Quantity max you have in your inventory: </strong> {detailsProduct.stockI} </p>
                                                            <label htmlFor="replenishment">Quantity :</label>
                                                            {error !== null ? <p style={{ color: "red" }}>{error}</p> : ""}
                                                            <input type="text" className="form-control" onChange={e => setReplenishmentQuantity({ ...replenishmentQuantity, "reducestocki": e.target.value })}></input>
                                                        </div>
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="primary" onClick={changeReplenishmentQuantities}>
                                                        Send
                                            </Button>
                                                    <Button variant="secondary" onClick={handleCloseReplenishment}>
                                                        Close
                                            </Button>
                                                </Modal.Footer>
                                            </Modal>
                                            <Modal size="lg" show={showReplenishmentInventory} onHide={handleCloseReplenishmentInventory}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title> Send product from producer to inventory </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div className="row">
                                                        <div className="col-sm form-group">
                                                            <p> <strong> Quantity max you can have in your inventory  : </strong> {detailsProduct.stockP} </p>
                                                            <label htmlFor="replenishmentInventory">Quantity :</label>
                                                            {error !== null ? <p style={{ color: "red" }}>{error}</p> : ""}
                                                            <input type="text" className="form-control" onChange={e => setReplenishmentQuantityInventory({ ...replenishmentQuantityInventory, "reducestockp": e.target.value })}></input>
                                                        </div>
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="primary" onClick={changeReplenishmentQuantitiesInventory}>
                                                        Send
                                            </Button>
                                                    <Button variant="secondary" onClick={handleCloseReplenishmentInventory}>
                                                        Close
                                            </Button>
                                                </Modal.Footer>
                                            </Modal>
                                            <Modal size="lg" show={showPromotion} onHide={handleClosePromotion}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title> New promotion  </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div>
                                                        {
                                                            loadingPromotion === false ? <CircularProgress />
                                                                :
                                                                <form>
                                                                    {errorPromotion !== null ? <p style={{ color: "red" }}>{errorPromotion}</p> : ""}
                                                                    <div className="row">
                                                                        <div className="col-sm form-group">
                                                                            <p> Set the reduction : </p>
                                                                            <Select
                                                                                options={promotions}
                                                                                onChange={handleChange}
                                                                                value={selectedOption}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </form>
                                                        }
                                                    </div>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="primary" onClick={e => addNewPromotion()}>
                                                        Save
                                                        </Button>
                                                    <Button variant="secondary" onClick={handleClosePromotion}>
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
