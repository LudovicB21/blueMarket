import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/NavBar'

function Profile() {

    useEffect(() => {
        getAuth()
    }, [])

    const getAuth = () => {
        setAuth(JSON.parse(localStorage.getItem('user')))
    }

    const role = () => {
        if (auth.role === 0) {
            return "Client"
        } else if (auth.role === 1) {
            return "Producteur"
        } else {
            return "Administrateur"
        }
    }

    const [auth, setAuth] = useState("")

    console.log(auth)
    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="container mx-5 my-5">
                <h1>Mon profile </h1>
                <div className="row">
                    <div className="col-sm form-group">
                        <label for="firstname">Firstname :</label>
                        <input type="text" className="form-control" value={auth.firstname}></input>
                    </div>
                    <div className="col-sm form-group">
                        <label for="email">Lastname :</label>
                        <input type="text" className="form-control" value={auth.lastname}></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm form-group">
                        <label for="email">Email :</label>
                        <input type="email" className="form-control" value={auth.email}></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm form-group">
                        <label for="fridge">Fridge ( Litre ) :</label>
                        <input type="text" className="form-control" value={auth.frigo}></input>
                    </div>
                    <div className="col-sm form-group">
                        <label for="fridge">Role :</label>
                        <input type="text" className="form-control" value={role()}></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm form-group">
                        <button className="btn btn-primary"> Change password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
