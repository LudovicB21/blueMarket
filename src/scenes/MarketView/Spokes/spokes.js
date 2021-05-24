import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../../NavBar/NavBar'
import { Redirect } from 'react-router-dom'
import { getDepartments } from '../../../services/Api/Departments/get'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Modal, Button } from 'react-bootstrap'
import { changePosition } from '../../../services/Api/Departments/post'
import * as AiIcons from "react-icons/ai"
import * as GiIcons from "react-icons/gi"
function Spokes() {

    const [connect, setConnect] = useState(false)
    const [nbs, setNbs] = useState(true)
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)
    const [department, setDepartment] = useState([])
    const [show, setShow] = useState(false);
    const [position, setPosition] = useState()
    const [confirmPosition, setConfirmePosition] = useState(null)

    useEffect(() => {
        if (localStorage.getItem('user')) {
            setTimeout(() => {
                setNbs(!nbs)
            }, 10000)
        } else {
            setConnect(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getDepartments().then(({ data, success, errors }) => {
            if (success === true) {
                setDepartment(data)
                setLoading(true)
                setConfirmePosition(null)
            } else {
                setLoading(false)
                setErrors(errors)
            }
        })
    }, [errors, loading, confirmPosition, nbs])

    const handleClose = () => setShow(false);
    const handleShow = id => {
        setPosition({ ...position, "departid": id.toString() })
        setShow(true);
    }

    const sendNewPosition = () => {
        changePosition(position).then(({ data, success, errors }) => {
            if (success === true) {
                setLoading(true)
                setConfirmePosition(true)
                handleClose()
            } else {
                setLoading(false)
                setErrors(errors)
            }
        })
    }

    const registerSpokesId = (Depart_id, Depart_name) => {
        localStorage.setItem("Depart_id", Depart_id)
        localStorage.setItem("Depart_name", Depart_name)
    }

    if (connect === true) {
        return <Redirect to="/login" />
    } else {
        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <div className="mx-5 my-5">
                    <h1> My departments </h1>
                    {
                        loading === false ? <CircularProgress />
                            : <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Position</th>
                                        <th scope="col">Nop rayon</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {(department || []).map(produits => (
                                        <tr>
                                            <td>
                                                {produits.Depart_name}
                                            </td>
                                            <td> {produits.Depart_position} </td>
                                            <td>
                                                {Math.floor(Math.random() * 30)}
                                            </td>
                                            <td>
                                                <Link style={{ textDecoration: "none" }} to={{
                                                    pathname: "/detailsSpokes",
                                                    aboutProps: {
                                                        name: produits.Depart_name,
                                                        id: produits.Depart_id
                                                    }
                                                }}>
                                                    <button className="btn btn-primary" onClick={e => registerSpokesId(produits.Depart_id, produits.Depart_name)}>
                                                        <AiIcons.AiOutlineZoomIn />

                                                    </button>&nbsp;&nbsp;&nbsp;
                                        </Link>
                                                <button className="btn btn-secondary" onClick={e => handleShow(produits.Depart_id)}>
                                                    <GiIcons.GiPositionMarker />
                                                </button>
                                                <Modal size="lg" show={show} onHide={handleClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title> New position  </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div>
                                                            <form>
                                                                {errors !== null ? <p style={{ color: "red" }}>{errors}</p> : ""}
                                                                <div className="row">
                                                                    <div className="col-sm form-group">
                                                                        <label htmlFor="email">New position :</label>
                                                                        <input type="email" className="form-control" onChange={e => setPosition({ ...position, "position": e.target.value })}></input>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="primary" onClick={sendNewPosition}>
                                                            Save
                            </Button>
                                                        <Button variant="secondary" onClick={handleClose}>
                                                            Close
                            </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    }
                </div >
            </div>
        )
    }
}

export default Spokes
