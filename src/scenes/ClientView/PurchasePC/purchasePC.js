import React, { useContext, useEffect, useState } from 'react'
import NavBar from '../../NavBar/NavBar'
import "./purchasePC.css"
import { DataContext } from '../../../stores/Context'
import promotion from '../../../stores/promotion'
import { getProducts, getRecommandationsForOneClient } from '../../../services/Api/Product/get'
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment'
import *  as FaIcons from 'react-icons/fa'
import { Modal, Button } from 'react-bootstrap'

function PurchasePC() {

    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [show, setShow] = useState(false)
    const [errorRecommendation, setErrorRecommendation] = useState(null)
    const [recommendations, setRecommendations] = useState([])
    const [check, setCheck] = useState(false)

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"))
        getProducts().then(({ data, success, errors }) => {
            if (success === true) {
                setProducts(data)
                setLoading(true)
                getRecommandationsForOneClient(user.user_id).then(({ data, success, errors }) => {
                    if (success === true) {
                        setRecommendations(data)
                        if (check === false && (localStorage.getItem('disableRecommandation') !== "null" || localStorage.getItem('disableRecommandation') === undefined || localStorage.getItem('disableRecommandation') === null)) {
                            handleShow()
                        }
                    } else {
                        setErrorRecommendation(errors)
                    }
                })
            } else {
                setErrors(errors)
                setLoading(false)
            }
        })
    }, [errors, loading])


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const context = useContext(DataContext)

    const addPromotionToCard = (itemPromotion) => {
        const { addCart } = context;
        const newItem = { ...itemPromotion }
        const newName = " promotion"
        newItem.name = itemPromotion.name.concat(newName)
        if (itemPromotion.promotion === 1) {
            newItem.price = itemPromotion.price * 2
            newItem.id = itemPromotion.id + 0.1
        } else if (itemPromotion.promotion === 2) {
            newItem.price = itemPromotion.price * 3
            newItem.id = itemPromotion.id + 0.1
        } else if (itemPromotion.promotion === 3) {
            newItem.id = itemPromotion.id + 0.1
        }

        addCart(newItem)
    }

    const disabledRecommendations = () => {
        localStorage.setItem("disableRecommandation", "null")
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="container mx-2 my-3">
                <button className="btn btn-primary" data-toggle="tooltip" title="Details purchase" onClick={e => handleShow()}> Show recommandations </button>
            </div>
            {
                loading === false ? <CircularProgress />
                    :
                    <div id="product">
                        {
                            products.map(item => {
                                const { addCart } = context;
                                return <div className="card" key={item.id}>
                                    <img src={item.image} alt={item.name} />
                                    <div className="content">
                                        <p style={{ color: item.carbonfootprint <= 3000 ? "green" : null }}>
                                            <strong> {item.name} </strong>
                                            <a> {item.carbonfootprint <= 1000 ? <div> <FaIcons.FaLeaf /> <FaIcons.FaLeaf /> <FaIcons.FaLeaf /> </div> :
                                                item.carbonfootprint > 1000 && item.carbonfootprint <= 2000 ? <div> <FaIcons.FaLeaf /> <FaIcons.FaLeaf /> </div> :
                                                    item.carbonfootprint > 2000 && item.carbonfootprint <= 3000 ? <div> <FaIcons.FaLeaf />  </div> : null}</a>
                                        </p>
                                        {promotion.map(items => {
                                            if (items.id === item.promotion) {
                                                return <p style={{ color: "red" }}> Promotion : {items.label}</p>
                                            }
                                        })}
                                        <p>Price: {item.price}€</p>
                                        <p>Expiration date: {moment(item.expiration_Date).format('DD-MM-YYYY')}</p>
                                        <button onClick={() => addCart(item)}>Add to cart</button>
                                    </div>
                                    <Modal size="lg" show={show} onHide={handleClose}>
                                        <Modal.Header closeButton>
                                            <Modal.Title> Recommandations </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="container mx-3">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={() => disabledRecommendations()} />
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Don't either show me recommandations
                                                </label>
                                            </div>
                                            {(recommendations || []).map(recommandation => (
                                                <div className="card" >
                                                    <img src={recommandation.image} alt={recommandation.name} />
                                                    <div className="content">
                                                        <p style={{ color: recommandation.carbonfootprint <= 3000 ? "green" : null }}>
                                                            <strong> {recommandation.name} </strong>
                                                            <a> {recommandation.carbonfootprint <= 1000 ? <div> <FaIcons.FaLeaf /> <FaIcons.FaLeaf /> <FaIcons.FaLeaf /> </div> :
                                                                recommandation.carbonfootprint > 1000 && recommandation.carbonfootprint <= 2000 ? <div> <FaIcons.FaLeaf /> <FaIcons.FaLeaf /> </div> :
                                                                    recommandation.carbonfootprint > 2000 && recommandation.carbonfootprint <= 3000 ? <div> <FaIcons.FaLeaf />  </div> : null}</a>
                                                        </p>
                                                        {promotion.map(recommandations => {
                                                            if (recommandations.id === recommandation.promotion) {
                                                                return <p style={{ color: "red" }}> Promotion : {recommandations.label}</p>
                                                            }
                                                        })}
                                                        <p>Price: {recommandation.price}€</p>
                                                        <p>Expiration date: {moment(recommandation.expiration_Date).format('DD-MM-YYYY')}</p>
                                                        <button onClick={() => addCart(recommandation)}>Add to cart</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </Modal.Body>
                                        <Modal.Footer>
                                            {errorRecommendation !== null ? <p style={{ color: "red" }}>{errorRecommendation}</p> : ""}
                                            <Button variant="secondary" onClick={handleClose}>
                                                Close
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>

                                </div>
                            })
                        }
                    </div>
            }
        </div >
    )
}

export default PurchasePC
