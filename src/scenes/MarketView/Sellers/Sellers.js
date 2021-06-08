import React, { useState } from 'react'
import NavBar from '../../NavBar/NavBar'
import { postNewSeller } from '../../../services/Api/Sellers/post'
import CircularProgress from '@material-ui/core/CircularProgress';

function Sellers() {

    const [details, setDetails] = useState([])
    const [errors, setErrors] = useState(null)
    const [loading, setLoading] = useState(false)

    const submitHandler = e => {
        e.preventDefault();
        registerSeller()
    }

    const registerSeller = async () => {
        //postNewSeller(details)
        setLoading(true)
        setErrors(null)
        const { success, errors } = await postNewSeller(details)
        if (success === true) {
            setLoading(false)
            alert("New sellers add correctly")
        } else {
            setLoading(false)
            setErrors(errors)
        }
    }

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="mx-5 my-5">
                <h1> Add a seller </h1>
                <form onSubmit={submitHandler} >
                    <div className="row">
                        <div className="col-sm form-group">
                            <label htmlFor="firstname">Firstname :</label>
                            <input type="text" className="form-control" onChange={e => setDetails({ ...details, "firstname": e.target.value })} ></input>
                        </div>
                        <div className="col-sm form-group">
                            <label htmlFor="lastname">Lastname :</label>
                            <input type="text" className="form-control" onChange={e => setDetails({ ...details, "lastname": e.target.value })} ></input>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm form-group">
                            <label htmlFor="email">Email :</label>
                            <input type="email" className="form-control" onChange={e => setDetails({ ...details, "email": e.target.value, "fridgesize": "0", "role": "3" })}></input>
                        </div>
                        <div className="col-sm form-group">
                            <label htmlFor="password">Password :</label>
                            <input type="password" className="form-control" onChange={e => setDetails({ ...details, "password": e.target.value })}></input>
                        </div>
                    </div>
                    <div className="row">
                        {loading === true ? <CircularProgress />
                            : null}
                        {errors !== null ? <p style={{ color: "red" }}>{errors}</p> : ""}
                        <div className="col-sm form-group">
                            <button className="btn btn-primary" type="submit"> Add </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Sellers
