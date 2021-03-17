import React, { useState } from 'react';
import "../../assets/form/form.css"
import Checkbox from '@material-ui/core/Checkbox';
import HomePage from "../HomePage/homePage"
import { Redirect } from "react-router-dom"

function Login() {

    const [details, setDetails] = useState({ email: "", password: "" });
    const [checked, setChecked] = useState(false)
    const [user, setUser] = useState({ email: "" });
    const [error, setError] = useState("");

    const adminUser = {
        email: "admin@admin.com",
        password: "admin123"
    }

    const submitHandler = e => {
        e.preventDefault();

        loginForm(details)

    }

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const loginForm = details => {
        if (details.email === adminUser.email && details.password === adminUser.password) {
            setUser({
                name: details.name,
                email: details.email
            });
        } else {
            setError("Details not match ! ")
        }
    }

    return (
        <div>
            {(user.email !== "") ? (
                <div>
                    <Redirect to="/homePage" />
                </div>
            ) : (
                <form onSubmit={submitHandler}>
                    <div className="App">
                        <div className="form-inner">
                            <h2> Login for your Eshop </h2>
                            {(error !== "") ? (<div className="error">{error}</div>) : ""}
                            <div className="form-group">
                                <label htmlFor="email"> Email: </label>
                                <input type="email" email="email" id="email" onChange={e => setDetails({ ...details, email: e.target.value })} value={details.email} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password"> Password: </label>
                                <input type="password" password="password" id="password" onChange={e => setDetails({ ...details, password: e.target.value })} value={details.password} />
                            </div>
                            <div className="form-group">
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                /> Remember me
                            </div>
                            <input type="submit" value="Login" /> <br />
                            <button>
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    )
}

export default Login
