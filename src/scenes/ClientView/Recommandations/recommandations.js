import React, { useState, useEffect, useContext } from 'react'
import NavBar from '../../NavBar/NavBar'
import { getRecommandationsForOneClient } from '../../../services/Api/Product/get'
import { Modal, Button } from 'react-bootstrap'
import *  as FaIcons from 'react-icons/fa'
import moment from 'moment'
import promotion from '../../../stores/promotion'
import { DataContext } from '../../../stores/Context'
import { Link } from 'react-router-dom';

function Recommandations() {

    const [errorRecommendation, setErrorRecommendation] = useState(null)
    const [recommendations, setRecommendations] = useState([])
    const [show, setShow] = useState(true)

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"))
        getRecommandationsForOneClient(user.user_id).then(({ data, success, errors }) => {
            if (success === true) {
                setRecommendations(data)
            } else {
                setErrorRecommendation(errors)
            }
        })
    }, [])

    const context = useContext(DataContext)


    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div>
                {errorRecommendation !== null ? <p style={{ color: "red" }}>{errorRecommendation}</p> : ""}
                <Modal size="lg" show={show}>
                    <Modal.Header closeButton>
                        <Modal.Title> Recommandations </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Link style={{ textDecoration: "none" }} to={{ pathname: "/shoppingCart" }}>
                            <Button variant="primary">
                                Go to ShoppingCart
                            </Button>
                        </Link> &nbsp;&nbsp;
                        <Link style={{ textDecoration: "none" }} to={{ pathname: "/scan" }}>
                            <Button variant="primary">
                                Go to scan
                            </Button>
                        </Link>
                        {(recommendations || []).map(recommandation => {
                            const { addCart } = context;
                            return <div key={recommandation.name} className="card" >
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
                                            return <p key={recommendations.id} style={{ color: "red" }}> Promotion : {recommandations.label}</p>
                                        }
                                    })}
                                    <p>Price: {recommandation.price}€</p>
                                    <p>Expiration date: {moment(recommandation.expiration_Date).format('DD-MM-YYYY')}</p>
                                    <button onClick={() => addCart(recommandation)}>Add to cart</button>
                                </div>
                            </div>
                        })}
                    </Modal.Body>
                    <Modal.Footer>
                        <Link style={{ textDecoration: "none" }} to={{ pathname: "/shoppingCart" }}>
                            <Button variant="primary">
                                Go to ShoppingCart
                            </Button>
                        </Link>
                        <Link style={{ textDecoration: "none" }} to={{ pathname: "/scan" }}>
                            <Button variant="primary">
                                Go to scan
                            </Button>
                        </Link>
                    </Modal.Footer>
                </Modal>

            </div>

        </div>
    )
}

export default Recommandations
