import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../../NavBar/NavBar'
import { Redirect } from 'react-router-dom'
import { getDepartments } from '../../../services/Api/Departments/get'
import CircularProgress from '@material-ui/core/CircularProgress';

function Spokes() {

    const [connect, setConnect] = useState(false)
    const [nbs, setNbs] = useState(true)
    const [errors, setErrors] = useState(null)
    const [sucess, setSucess] = useState(false)
    const [loading, setLoading] = useState(false)
    const [department, setDepartment] = useState([])

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
            } else {
                setLoading(false)
            }
        })
    }, [sucess, errors, loading])

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
                                                    <button className="btn btn-primary">
                                                        Details
                                        </button>&nbsp;&nbsp;&nbsp;
                                        </Link>
                                                <button className="btn btn-secondary">
                                                    Position
                                        </button>
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
