import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'
import { Modal, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import "./Profile.css"
import { getAllPurchase, getDetailsShoppingCart, getProfile } from '../../services/Api/Profile/get'
import CircularProgress from '@material-ui/core/CircularProgress';
import * as AiIcons from "react-icons/ai"
import moment from 'moment'
import { updateProdile } from '../../services/Api/Profile/update'

function Profile() {

    const [auth, setAuth] = useState("")
    const [details, setDetails] = useState({});
    const [show, setShow] = useState(false);
    const [showCartDetail, setShowCartDetail] = useState(false);
    const [error, setError] = useState(false)
    const [errorDetails, setErrorsDetails] = useState(false)
    const [loading, setLoading] = useState(null)
    const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(null)
    const [historyPurchase, setHistoryPurchase] = useState([])
    const [detailsCart, setDetailsCart] = useState([])
    const [profile, setProfile] = useState([])

    useEffect(() => {
        authenticated()
        setLoading(true)
        getAllPurchase(JSON.parse(localStorage.getItem("user")).user_id).then(({ data, success, errors }) => {
            if (success === true) {
                setHistoryPurchase(data)
                setLoading(false)
            } else {
                setLoading(false)
                setError(errors)
            }
        })
    }, [loadingUpdateProfile])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShowCartDetail = (cartId) => {
        setShowCartDetail(true)
        setLoading(true)
        getDetailsShoppingCart(cartId).then(({ data, success, errors }) => {
            if (success === true) {
                setLoading(false)
                setDetailsCart(data)
            } else {
                setLoading(false)
                setErrorsDetails(errors)
            }
        })
    }

    const handleCloseCartDetail = () => setShowCartDetail(false)

    const role = () => {
        if (auth.role === 0) {
            return "Administrator"
        } else if (auth.role === 1) {
            return "Client"
        } else {
            return "Producer"
        }
    }

    const authenticated = () => {
        if (localStorage.getItem('user')) {
            setAuth(JSON.parse(localStorage.getItem('user')))
        } else {
            setError(true)
        }
    }

    const submitHandler = e => {
        e.preventDefault();
        updateProfile()
        // Appel api pour changement des données profile
    }

    const updateProfile = async () => {
        const user = JSON.parse(localStorage.getItem("user"))
        const newProfile = details
        if (newProfile.firstname === null || newProfile.firstname === undefined || newProfile.firstname === "") {
            newProfile.firstname = auth.firstname
        }
        if (newProfile.email === null || newProfile.email === undefined || newProfile.email === "") {
            newProfile.email = auth.email
        }
        if (newProfile.lastname === null || newProfile.lastname === undefined || newProfile.lastname === "") {
            newProfile.lastname = auth.lastname
        }
        if (newProfile.fridge === null || newProfile.fridge === undefined || newProfile.fridge === "") {
            newProfile.fridge = auth.fridgesize
        }
        if (newProfile.lastname === null || newProfile.lastname === undefined || newProfile.lastname === "") {
            newProfile.lastname = auth.lastname
        }
        const { success, errors } = await updateProdile(newProfile, user.user_id)
        setLoadingUpdateProfile(true)
        if (success === true) {
            //setLoadingUpdateProfile(false)
            //Ajouter la mise à jour du localStorage + de l'affichage dans auth
            const { success, errors, data } = await getProfile(user.user_id)
            setLoadingUpdateProfile(true)
            if (success === true) {
                setLoadingUpdateProfile(false)
                let profile = ({
                    email: data.user_email,
                    firstname: data.user_first,
                    lastname: data.user_last,
                    user_id: data.user_id,
                    fridgesize: data.Size_fridge,
                    role: data.user_role
                })
                localStorage.setItem("user", JSON.stringify(profile))
            } else {
                setLoadingUpdateProfile(false)
                setError(errors)
            }
        } else {
            setLoadingUpdateProfile(false)
            setError(errors)
        }
    }

    if (error === true) {
        return <Redirect to="/login" />
    } else {
        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <div className="container mx-5 my-5">
                    <h1>My profile </h1>
                    {loadingUpdateProfile == true ? <CircularProgress />
                        : null}
                    <a className="text-danger" id="removeunderline" href="foo"> <strong> To change your data fill in the fields </strong>  </a>
                    <form onSubmit={submitHandler} >
                        <div className="row">
                            <div className="col-sm form-group">
                                <label htmlFor="firstname">Firstname :</label>
                                <input type="text" className="form-control" onChange={e => setDetails({ ...details, "firstname": e.target.value })} placeholder={auth.firstname}></input>
                            </div>
                            <div className="col-sm form-group">
                                <label htmlFor="lastname">Lastname :</label>
                                <input type="text" className="form-control" onChange={e => setDetails({ ...details, "lastname": e.target.value })} placeholder={auth.lastname}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm form-group">
                                <label htmlFor="email">Email :</label>
                                <input type="email" className="form-control" onChange={e => setDetails({ ...details, "email": e.target.value })} placeholder={auth.email}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm form-group">
                                <label htmlFor="fridge">Fridge ( Litre ) :</label>
                                <input type="text" className="form-control" onChange={e => setDetails({ ...details, "fridge": e.target.value })} placeholder={auth.fridgesize}></input>
                            </div>
                            <div className="col-sm form-group">
                                <label htmlFor="role">Role :</label>
                                <input type="text" className="form-control" disabled={true} placeholder={role()}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm form-group">
                                <button className="btn btn-secondary" data-toggle="modal" data-target="#exampleModalCenter" onClick={handleShow}> Change password</button>
                                <Modal size="lg" show={show} onHide={handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Modify your password </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <label htmlFor="password">New password :</label>
                                        <input type="password" className="form-control" onChange={e => setDetails({ ...details, "password": e.target.value })}></input>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                    </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            Save It!
                                    </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm form-group">
                                <button className="btn btn-primary" type="submit"> Save</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="container mx-5 my-5">
                    <h1> Purchase history :  </h1>
                    {loading == true ? <CircularProgress />
                        : null}
                    {error !== null ? <p style={{ color: "red" }}>{error.GetUserCart}</p> : ""}
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">Cart Price</th>
                                <th scope="col"> Actions </th>
                            </tr>
                        </thead>
                        <tbody>
                            {(historyPurchase || []).map(purchase => (
                                <tr key={purchase.Cart_id}>
                                    <td>
                                        {moment(purchase.Date).format('DD-MM-YYYY')}
                                    </td>
                                    <td> {purchase.Cart_price} € </td>
                                    <td> <button className="btn btn-primary" data-toggle="tooltip" title="Details purchase" onClick={e => handleShowCartDetail(purchase.Cart_id)}> <AiIcons.AiOutlineZoomIn /> </button></td>
                                    <Modal size="lg" show={showCartDetail} onHide={handleCloseCartDetail}>
                                        <Modal.Header closeButton>
                                            <Modal.Title> Details of your shopping cart</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            {errorDetails !== null ? <p style={{ color: "red" }}>{errorDetails.GetDetailsUserCart}</p> : ""}
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Name</th>
                                                        <th scope="col">Expiration Date</th>
                                                        <th scope="col"> Price </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(detailsCart || []).map(cart => (
                                                        <tr key={cart.name}>
                                                            <td>
                                                                {cart.name}
                                                            </td>
                                                            <td> {moment(cart.expiration_Date).format('DD-MM-YYYY')}</td>
                                                            <td> {cart.price} € </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button variant="secondary" onClick={handleCloseCartDetail}>
                                                Close
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Profile
