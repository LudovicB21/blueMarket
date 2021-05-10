import React, { useState, useEffect } from 'react'
import NavBar from '../NavBar/NavBar'
import { Redirect } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import Select from 'react-select'
import promotion from '../../stores/promotion'

function Products() {

    const dataa = [
        {
            id: 1,
            produit: "lait",
            department_id: "1",
            expiration: "27/04/2021",
            stock: "200",
            livraison: "22/03/2021",
            promotion: 3
        },
        {
            id: 2,
            produit: "lait2",
            department_id: "1",
            expiration: "27/04/2021",
            stock: "100",
            livraison: "23/03/2021",
            promotion: 2
        },
        {
            id: 3,
            produit: "lait3",
            department_id: "1",
            expiration: "27/04/2021",
            stock: "200",
            livraison: "22/03/2021"
        },
        {
            id: 4,
            produit: "lait4",
            department_id: "1",
            expiration: "30/05/2021",
            stock: "60",
            livraison: "01/04/2021",
            promotion: 1,
        },
    ]

    useEffect(() => {
        authenticated()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setData(dataa)
    }, [])

    const [auth, setAuth] = useState("")
    const [error, setError] = useState(false)
    const [show, setShow] = useState(false);
    const [showPromotion, setShowPromotion] = useState(false);
    const [detail, setDetail] = useState([])
    const [selectedOption, setSelectOption] = useState(null)
    const [selectedOptionId, setSelectedOptionId] = useState(null)
    const [data, setData] = useState([])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowPromotion = id => {
        setSelectedOptionId(id)
        setShowPromotion(true)
    };
    const handleClosePromotion = () => setShowPromotion(false);

    const constitution = [
        {
            id: 1,
            name: "lait",
            size: "1",
            ingredient1: "ingrédient 1",
            ingredient2: "ingrédient 2",
            ingredient3: "ingrédient 3",
            ingredient4: "ingrédient 4",
            ingredient5: "ingrédient 5",
            livraison: "2021/04/17",
            expiration: "2021/07/20"
        },
        {
            id: 2,
            size: "1",
            name: "lait2",
            ingredient1: "ingrédient 1",
            ingredient2: "ingrédient 2",
            ingredient3: "ingrédient 3",
            ingredient4: "ingrédient 4",
            ingredient5: "ingrédient 5",
            livraison: "2021/04/17",
            expiration: "2021/07/20"
        },
        {
            id: 3,
            name: "lait3",
            size: "1",
            ingredient1: "ingrédient 1",
            ingredient2: "ingrédient 2",
            ingredient3: "ingrédient 3",
            ingredient4: "ingrédient 4",
            ingredient5: "ingrédient 5",
            livraison: "2021/04/17",
            expiration: "2021/07/20"
        },
        {
            id: 4,
            name: "lait4",
            size: "1",
            ingredient1: "ingrédient 1",
            ingredient2: "ingrédient 2",
            ingredient3: "ingrédient 3",
            ingredient4: "ingrédient 4",
            ingredient5: "ingrédient 5",
            livraison: "2021/04/17",
            expiration: "2021/07/20"
        },
    ]

    const authenticated = () => {
        if (localStorage.getItem('user')) {
            setAuth(JSON.parse(localStorage.getItem('user')))
        } else {
            setError(true)
        }
    }

    const details = id => {
        // Faire un fetch
        // eslint-disable-next-line array-callback-return
        constitution.map(item => {
            if (id === item.id) {
                setDetail(item)
                handleShow()
            }
        })
    }

    const removePromotion = id => {
        const items = data
        items.map(item => {
            if (item.id === id) {
                delete item.promotion
                setData(items)
            }
        })
    }

    const handleChange = selectedOption => {
        setSelectOption(selectedOption);
    };

    const addPromotion = () => {
        data.map(item => {
            if (item.id === selectedOptionId) {
                item.promotion = selectedOption.label
            }
        })
    }

    if (error === true) {
        return <Redirect to="/login" />
    } else {
        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <div className="mx-5 my-5">
                    <h1> Inventory </h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col"> Expiration Date</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Next delivery</th>
                                <th scope="col">Promotion</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(data || []).map(produits => (
                                <tr key={produits.id}>
                                    <td>
                                        {produits.produit}
                                    </td>
                                    <td> {produits.expiration} </td>
                                    <td> {produits.stock} </td>
                                    <td> {produits.livraison} </td>
                                    <td> {(promotion || null).map(item => {
                                        if (item.id === produits.promotion) {
                                            return item.label
                                        }
                                    })}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => details(produits.id)}>
                                            Details
                                    </button> &nbsp;&nbsp;&nbsp;
                                        <Modal size="lg" show={show} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title> Product's details </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div className="mx-5 my-5">
                                                    <p> Name:  {detail.name}</p>
                                                    <p> Size:  {detail.size}</p>
                                                    <p> Next delivery:  {detail.livraison}</p>
                                                    <p> Expiration date:  {detail.expiration}</p>
                                                    <p> Location:  </p>
                                                </div>
                                                <div>
                                                    <table className="table">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">{detail.ingredient1}</th>
                                                                <th scope="col">{detail.ingredient2}</th>
                                                                <th scope="col">{detail.ingredient3}</th>
                                                                <th scope="col">{detail.ingredient4}</th>
                                                                <th scope="col">{detail.ingredient5}</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    {detail.ingredient1}
                                                                </td>
                                                                <td>
                                                                    {detail.ingredient2}
                                                                </td>
                                                                <td>
                                                                    {detail.ingredient3}
                                                                </td>
                                                                <td>
                                                                    {detail.ingredient4}
                                                                </td>
                                                                <td>
                                                                    {detail.ingredient5}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                            </Button>
                                            </Modal.Footer>
                                        </Modal>

                                        {produits.promotion ? <button className="btn btn-danger" onClick={e => removePromotion(produits.id)}>
                                            X
                                    </button> : <button className="btn btn-primary" onClick={e => handleShowPromotion(produits.id)}>
                                            Promotion
                                    </button>}
                                        <Modal size="lg" show={showPromotion} onHide={handleClosePromotion}>
                                            <Modal.Header closeButton>
                                                <Modal.Title> Add new promotion </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <div className="mx-5 my-5">
                                                    <div className="col-sm form-group">
                                                        <label htmlFor="transport">Type of promotion :</label>
                                                        <Select
                                                            options={promotion}
                                                            onChange={handleChange}
                                                            value={selectedOption}
                                                        />
                                                    </div>
                                                </div>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={addPromotion}>
                                                    Add
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
                    </table>
                </div >
            </div>
        )
    }
}

export default Products